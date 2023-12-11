import {RouteLocationNormalized, RouteRecordRaw} from 'vue-router';
import {useUserStore} from '@/store';

export default function usePermission() {
    const userStore = useUserStore();
    return {
        /**
         * 检查当前路由是否有对应权限
         * @param route
         */
        accessRouter(route: RouteLocationNormalized | RouteRecordRaw) {
            if (route.meta?.requiresAuth){
                return route.meta?.roles === userStore.userRole
            }else {
                return route.meta?.requiresAuth;
            }
        },
        findFirstPermissionRoute(_routers: any, role = 'admin') {
            const cloneRouters = [..._routers];
            while (cloneRouters.length) {
                const firstElement = cloneRouters.shift();
                if (
                    firstElement?.meta?.roles?.find((el: string[]) => {
                        return el.includes('*') || el.includes(role);
                    })
                )
                    return {name: firstElement.name};
                if (firstElement?.children) {
                    cloneRouters.push(...firstElement.children);
                }
            }
            return null;
        },
        // You can add any rules you want
    };
}
