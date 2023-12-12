import type {Router, LocationQueryRaw} from 'vue-router';
import {useUserStore} from "@/store";
import usePermission from "@/hooks/permission";
import {isLogin} from "@/utils/auth";


export default function routerInterceptor(router: Router) {
    router.beforeEach(async (to, from, next) => {
        const userStore = useUserStore();

        async function crossroads() {
            const Permission = usePermission();
            if (Permission.accessRouter(to)) {
                await next();
            } else {
                // 前往404。
                await next('notFound');
            }
        }

        console.log(to.meta.requiresAuth)
        console.log("是否登录："+isLogin())
        if (isLogin() || to.meta.requiresAuth) { // 判断用户是否登录
            console.log("进来了")
            //todo 存在循环，需要解决
            if (userStore.userRole) { // 有角色信息表示当前用户已经登录且获取过用户信息
                crossroads();
            } else {
                try {
                    await userStore.info(); // 获取用户角色信息后再进行后续跳转处理
                    crossroads();
                } catch (error) {
                    next(`/user/login?redirect=${to.fullPath}`);
                }
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
        next();
    });
}