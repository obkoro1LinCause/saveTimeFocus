import { createApp } from 'vue';
import App from './App.vue'

import './content-global.css'



const id = `app_vue_${Date.now()}`
const root = document.createElement('div')
root.id = id
document.body.appendChild(root)

const app = createApp(App).mount(`#${id}`);



