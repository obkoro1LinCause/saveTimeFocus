import  { createApp } from 'vue';
import { createPinia } from 'pinia'
import router from './router/index';
import App from './App.vue';
import BSComponent,{ Antd,AntdIcons }  from '@bs/component';


// import i18n from '@/locales';
import '@/styles/index.scss';


const app = createApp(App);
app.use(createPinia())
app.use(router);
app.use(BSComponent)
app.use(Antd)

// 全局注册
for(const key in AntdIcons){
    app.component(key,AntdIcons[key])
}

// app.use(i18n);

console.log('===appp===',app)

app.mount('#app');








