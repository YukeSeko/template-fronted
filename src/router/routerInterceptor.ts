import type {Router} from 'vue-router';
import {useUserStore} from "@/store";
import {getToken, isLogin} from "@/utils/auth";


export default function routerInterceptor(router: Router) {
    router.beforeEach(async (to, from, next) => {
        const userStore = useUserStore();
        //如果已经登录了，不能够再次访问登录页面
        if (getToken() && to.path ==='/user/login'){
            next('/');
            return;
        }
        //如果前往的不需要权限认证，直接进行跳转
        if (!to.meta.requiresAuth) {
            next();
            return;
        }
        if (isLogin()) { // 判断用户是否登录
            const cloneRouters = to.meta?.roles as Array<string>;
            if (cloneRouters.some(el => el === userStore.userRole)) {
                //存在对应的权限，允许跳转
                next();
                return;
            } else {
                //权限不足，跳转至404页面
                next('notFound');
                return;
            }
        } else {
            // 如果未登录则重定向到登录页面
            if (to.path === '/user/login') {
                next();
                return;
            }
            next(`/user/login?redirect=${to.fullPath}`);
            return;
        }
    });
}