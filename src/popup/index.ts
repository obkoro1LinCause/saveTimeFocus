import { createApp } from 'vue';
import AppComponent from './App/popup.vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import GlobalPlugin from '@/utils';


const app = createApp(AppComponent);

app.component('app-component',AppComponent);
app.use(ElementPlus);
app.use(GlobalPlugin,{t:1});
app.mount('#app');


