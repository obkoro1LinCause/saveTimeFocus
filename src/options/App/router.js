import VueRouter from 'vue-router'
import Vue from 'vue'
import stopScenePage from './stopScene/index.vue'
import focusScenePage from './focusScene/index.vue'
import kalendarScenePage from './kalendarScene/index.vue'

Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    redirect: '/kalendar',
  },
  {
    path: '/stop',
    name: 'stopScenePage',
    component: stopScenePage,
  },
  {
    path: '/focus',
    name: 'focusScenePage',
    component: focusScenePage,
  },
  {
    path: '/kalendar',
    name: 'kalendarScenePage',
    component: kalendarScenePage,
  },
]

const router = new VueRouter({
  mode: 'hash',
  routes,
})

export default router
