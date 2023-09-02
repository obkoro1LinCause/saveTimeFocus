import { createApp } from 'vue';
import AppComponent from './App/popup.vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import GlobalPlugin from '@/utils';
import i18n from '@/locales';


const app = createApp(AppComponent);

app.component('app-component',AppComponent);
app.use(ElementPlus);
app.use(GlobalPlugin);
app.use(i18n);
app.mount('#app');


