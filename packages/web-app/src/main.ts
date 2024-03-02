import  { createApp } from 'vue';
import { createPinia } from 'pinia'
import router from './router/index';
import App from './App.vue';
import Antd from 'ant-design-vue';
// import i18n from '@/locales';



import '@/styles/index.scss';
import 'ant-design-vue/dist/reset.css';


const app = createApp(App);
app.use(createPinia())
app.use(router);
// app.use(i18n)
app.use(Antd)

app.mount('#app');








