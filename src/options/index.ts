import  { createApp } from 'vue';
import App from './App/App.vue';
import ElementPlus from 'element-plus';

import 'element-plus/theme-chalk/dark/css-vars.css'; //黑暗模式
import 'element-plus/theme-chalk/index.css';    //白天模式

// 修改element的样式
import '@/styles/index.scss';

import GlobalPlugin from '@/utils';
import router from './App/router';
import i18n from '@/locales';



const app = createApp(App);
app.use(ElementPlus);
app.use(GlobalPlugin);
app.use(router);
app.use(i18n);

app.mount('#app');