import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import UserLoginIndex from "@/views/login/LoginIndex.vue";
const routes: Array<RouteRecordRaw> = [
    {
        path: "/user",
        name: "用户",
        children: [
            {
                path: "/user/login",
                name: "用户登录",
                component: UserLoginIndex,
            },
        ],
        meta: {
            hideInMenu: true,
        },
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
