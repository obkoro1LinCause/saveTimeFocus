import { createApp } from 'vue';
import AppComponent from './App/popup.vue';

import '@/global.css'


const app = createApp(AppComponent).mount('#app');
app.component('app-component',AppComponent);

