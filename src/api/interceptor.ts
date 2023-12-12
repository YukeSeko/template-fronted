import axios from 'axios';
import {Message, Modal} from '@arco-design/web-vue';
import {useUserStore} from '@/store';
import {getToken} from '@/utils/auth';

export interface HttpResponse<T = unknown> {
    message: string;
    code: number;
    data: T;
}

//设置基本请求路径
const request = axios.create({
    baseURL: 'http://localhost:8090'
})

/**
 * 请求拦截器
 */
request.interceptors.request.use(
    (config) => {
        //携带用户token
        const token = getToken();
        if (token) {
            // if (!config.headers) {
            //   config.headers = null;
            // }
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        // do something
        return Promise.reject(error);
    }
);


// 响应拦截器
request.interceptors.response.use(
    (response) => {
        const res = response.data;
        // if the custom code is not 0, it is judged as an error.
        if (res.code !== 0) {
            Message.error({
                content: res.message || 'Error',
                duration: 5 * 1000,
                closable: true
            });
            // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
            // if (
            //     [50008, 50012, 50014].includes(res.code) &&
            //     response.config.url !== '/api/user/info'
            // ) {
            //     const userStore = useUserStore();
            //
            //     userStore.logout();
            //     window.location.reload();
            //     // Modal.error({
            //     //     title: 'Confirm logout',
            //     //     content:res.message,
            //     //     okText: '重新登录',
            //     //     async onOk() {
            //     //         const userStore = useUserStore();
            //     //
            //     //         await userStore.logout();
            //     //         window.location.reload();
            //     //     },
            //     // });
            // }
            // return Promise.reject(new Error(res.message || 'Error'));
        } else {
            Message.success({
                content: res.message || '操作成功',
                duration: 5 * 1000,
                closable: true
            });
        }
        return res;
    }
    // },
    // (error) => {
    //     Message.error({
    //         content: error.message || 'Request Error',
    //         duration: 5 * 1000,
    //         closable: true
    //     });
    //     return Promise.reject(error);
    // }
);

export default request;
