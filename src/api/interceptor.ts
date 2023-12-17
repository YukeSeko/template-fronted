import axios from 'axios';
import {Message} from '@arco-design/web-vue';
import {useUserStore} from '@/store';
import {getToken} from '@/utils/auth';

export interface HttpResponse<T = unknown> {
    message: string;
    code: number;
    data: T;
}

//设置基本请求路径
const request = axios.create({
    baseURL: 'http://localhost:8090',
    withCredentials:true
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
            config.headers.Authorization = `${token}`;
        }
        return config;
    }
);


// 响应拦截器
request.interceptors.response.use(
    (response) => {
        const res = response.data;
        // if the custom code is not 0, it is judged as an error.
        if (res.code !== 0) {
            //50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
            if ([50008, 50012, 50014,40100].includes(res.code)) {
                const userStore = useUserStore();
                userStore.logout();
            }else {
                Message.error({
                    content: res.message || 'Error',
                    duration: 5 * 1000,
                    closable: true
                });
            }
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
);

export default request;
