import vue,{ createApp } from 'vue';
import { createPinia } from 'pinia'
import App from './App/App.vue';
import GlobalPlugin from '@/utils';
import router from './App/router';
import i18n from '@/locales';
import Antd from 'ant-design-vue';
import loadingDirective from './App/directive/loading';

import 'ant-design-vue/dist/reset.css';
import '@/styles/index.scss';

import 'uno.css';

const app = createApp(App);

app.use(i18n);
app.use(GlobalPlugin)
app.use(Antd)
app.use(router)
app.use(createPinia())
app.use(loadingDirective)

app.mount('#app');


export default app;







