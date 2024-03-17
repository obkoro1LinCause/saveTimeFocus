import { createApp } from 'vue';
import App from './App.vue'

import './content-global.css'



const id = `app_vue_${Date.now()}`;
const root = document.createElement('div');
root.id = id;
document.body.appendChild(root);

const app = createApp(App);
app.mount(`#${id}`);



chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    console.log(request, sender, sendResponse);
    sendResponse('我收到你的消息了：'+JSON.stringify("request"));
    console.log('保存成功');
});



const storage = window.localStorage;






