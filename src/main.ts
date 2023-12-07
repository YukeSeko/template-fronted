import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ArcoVue from "@arco-design/web-vue";
import "@arco-design/web-vue/dist/arco.css";
import ArcoVueIcon from "@arco-design/web-vue/es/icon";
import store from "@/store";

createApp(App)
    .use(router)
    .use(ArcoVue)
    .use(ArcoVueIcon)
    .use(store)
    .mount('#app')
