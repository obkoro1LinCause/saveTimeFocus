import { createRouter,RouteRecordRaw,createWebHashHistory } from 'vue-router';

const routes:RouteRecordRaw[] = [
  {
    path:'/',
    redirect:'/user'
  },
  {
    component:()=>import('./page/user/index.vue'),
    path:'/user',
    name:'userPage'
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
