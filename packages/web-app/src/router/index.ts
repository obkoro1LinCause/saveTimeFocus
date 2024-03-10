import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect:'/app/home'
    },
    {
      path: '/app/user',
      name: 'UserPage',
      component: () => import('../views/user/index.vue'),
      redirect:'/app/user',
      children:[
        {
          path: '/app/user',
          name: 'LoginOrSignPage',
          component: () => import('../views/user/loginOrSign.vue')
        },
        {
          path: '/app/user/forget',
          name: 'ForgetPage',
          component: () => import('../views/user/forget.vue')
        },
      ]
    },
    {
      path:'/app/home',
      name: 'HomePage',
      component: () => import('../views/home/index.vue'),
      redirect:'/app/home/life',
      children:[
        {
          path:'/app/home/life',
          name: 'LifePage',
          component: () => import('../views/home/life/index.vue'),
        },
        {
          path:'/app/home/invest',
          name: 'InvestPage',
          component: () => import('../views/home/invest/index.vue'),
        },
        {
          path:'/app/home/calendar',
          name: 'CalendarPage',
          component: () => import('../views/home/calendar/index.vue'),
        },
        {
          path:'/app/home/habit',
          name: 'HabitPage',
          component: () => import('../views/home/habit/index.vue'),
        },
        {
          path:'/app/home/time',
          name: 'TimePage',
          component: () => import('../views/home/time/index.vue'),
        },
        {
          path:'/app/home/block',
          name: 'BlockPage',
          component: () => import('../views/home/time/index.vue'),
        },
        {
          path:'/app/home/admin',
          name: 'AdminPage',
          component: () => import('../views/home/admin/index.vue'),
        }
      ]
    },
  ]
});


router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()
  const token = localStorage.getItem('user-token');
  const user = await userStore.getUserInfo(token);
  
  if(to?.fullPath?.includes('user') && !user){
    return next();
  }else if(!to?.fullPath?.includes('user') && !user){
    return next('/app/user');
  }else{
    userStore.setUser(user);
    return next();
  }
})


export default router;
