import  { createApp } from 'vue';
import { createPinia } from 'pinia'
import App from './App/App.vue';
import GlobalPlugin from '@/utils';
import router from './App/router';
import i18n from '@/locales';
import Antd from 'ant-design-vue';

import 'ant-design-vue/dist/reset.css';
import '@/styles/index.scss';

const app = createApp(App);

app.use(GlobalPlugin).use(Antd).use(router).use(createPinia()).use(i18n);

app.mount('#app');








