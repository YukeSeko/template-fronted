import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import UserLoginIndex from "@/views/login/LoginIndex.vue";
import index from "@/views/index.vue";
import notFound from "@/views/not-found/index.vue";
import routerInterceptor from "@/router/routerInterceptor";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "首页",
        component: index,
        meta: {
            requiresAuth: true,
            roles: 'user',
        }
    },
    {
        path: "/user",
        name: "login",
        children: [
            {
                path: "/user/login",
                name: "用户登录",
                component: UserLoginIndex,
            },
        ],
        meta: {
            hideInMenu: true,
            requiresAuth: false
        },
    },
    {
        path: "/404",
        name: "notFound",
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
