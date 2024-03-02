import { createApp } from 'vue';
import AppComponent from './App/popup.vue';
import GlobalPlugin from '@/utils';
import i18n from '@/locales';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import router from '../options/App/router/index';

const app = createApp(AppComponent);


app.component('app-component',AppComponent);
app.use(GlobalPlugin).use(Antd).use(router).use(i18n);

app.mount('#app');






