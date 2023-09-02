import  { createApp } from 'vue';
import { createPinia } from 'pinia'
import router from './router/index';
import App from './App.vue';
import ElementPlus from 'element-plus';
// import i18n from '@/locales';


import 'element-plus/theme-chalk/dark/css-vars.css'; //黑暗模式
import 'element-plus/theme-chalk/index.css';    //白天模式

// 修改element的样式
import '@/styles/index.scss';


const app = createApp(App);
app.use(createPinia())
app.use(ElementPlus);
app.use(router);
// app.use(i18n);
app.mount('#app');








