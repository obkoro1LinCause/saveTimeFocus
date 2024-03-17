import { createApp } from 'vue';
import AppComponent from './App/popup.vue';
import GlobalPlugin from '@/utils';
import i18n from '@/locales';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import router from '../options/App/router/index';
import { createPinia } from 'pinia'

const app = createApp(AppComponent);

app.use(i18n);
app.component('app-component',AppComponent);
app.use(GlobalPlugin)
app.use(Antd)
app.use(router)
app.use(createPinia())


app.mount('#app');






