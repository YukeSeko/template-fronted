import {defineStore} from 'pinia';


import {setToken, clearToken} from '@/utils/auth';
// import { removeRouteListener } from '@/utils/route-listener';
import {UserState} from './types';

import {
    login as userLogin,
    logout as userLogout,
    getUserInfo,
    LoginData
} from "@/api/user";
// import useAppStore from '../app';

const useUserStore = defineStore('user', {
    state: (): UserState => ({
        userAccount: undefined,
        email: undefined,
        id: undefined,
        userName: undefined,
        userAvatar: undefined,
        userProfile: undefined,
        userRole: 'user',
        token: '',
    }),

    getters: {
        userInfo(state: UserState): UserState {
            return {...state};
        },
    },

    actions: {
        switchRoles() {
            return new Promise((resolve) => {
                this.userRole = this.userRole === 'user' ? 'admin' : 'user';
                resolve(this.userRole);
            });
        },
        // Set user's information
        setInfo(partial: Partial<UserState>) {
            this.$patch(partial);
        },

        // Reset user's information
        resetInfo() {
            this.$reset();
        },

        // Get user's information
        async info() {
            const res = await getUserInfo();

            this.setInfo(res.data);
        },

        // Login
        async login(loginForm: LoginData) {
            try {
                const res = await userLogin(loginForm);
                setToken(res.data.token);
                this.setInfo(res.data)
            } catch (err) {
                clearToken();
            }
        },
        logoutCallBack() {
            // const appStore = useAppStore();
            this.resetInfo();
            clearToken();
            // removeRouteListener();
            // appStore.clearServerMenu();
        },
        // Logout
        async logout() {
            try {
                await userLogout();
            } finally {
                this.logoutCallBack();
            }
        },
    },
});

export default useUserStore;
