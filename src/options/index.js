import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/global.css'
import GlobalFunction from '@/utils/utils-index'

import NET from '../utils/net'
import AppComponent from './App/App.vue'
import router from './App/router'
import store from './App/store'

// import SocketioPlugin from "./App/Socket.io.plugin";

Vue.component('app-component', AppComponent)
Vue.use(GlobalFunction)
Vue.use(ElementUI)
Vue.prototype.NET = NET

// Vue.use(SocketioPlugin, {
//   connection: "http://localhost:8010/",
//   options: {
//     autoConnect: false, //关闭自动连接
//     // ...其它选项
//   },
// });

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router,
  store,
  async created() {
    this.$root.$options.store.dispatch('asyncGetConfig')
  },
  render: (createElement) => createElement(AppComponent),
})
