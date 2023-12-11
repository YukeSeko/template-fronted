import type { Router, LocationQueryRaw } from 'vue-router';
import {useUserStore} from "@/store";
import usePermission from "@/hooks/permission";
import {isLogin} from "@/utils/auth";


export default function routerInterceptor(router: Router) {
    router.beforeEach(async (to, from, next) => {
        const userStore = useUserStore();

        next();
    });
}