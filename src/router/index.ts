import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import UserLoginIndex from "@/views/login/LoginIndex.vue";
import notFound from "@/views/not-found/index.vue";
import home from "@/views/home/index.vue";
import routerInterceptor from "@/router/routerInterceptor";
import userInfo from "@/views/user/userInfo.vue"
export const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "首页",
        component:home,
        meta: {
            requiresAuth: false,
            hideInMenu: false
        }
    },
    {
        path: "/user/login",
        name: "用户登录",
        component: UserLoginIndex,
        meta: {
            hideInMenu: true,
            requiresAuth: false
        },
    },
    {
        path:"/user/Info",
        name:"个人中心",
        component:userInfo,
        meta:{
            hideInMenu: false,
            requiresAuth: true,
            roles:['user','admin']
        }
    },
    {
        path: "/404",
        name: "404",
        component: notFound,
        meta: {
            requiresAuth: false,
            hideInMenu: true,
        }
    },
]


const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})
// 注册路由拦截器
routerInterceptor(router);
export default router
