import { createRouter, createWebHistory } from 'vue-router'

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
      ],
      beforeEnter:(to, from, next)=>{
        const token = localStorage.getItem('user-token');
        if(!token){
          return next();
        }
        return next('/app/home');
      }
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
      ],
      beforeEnter:(to, from, next)=>{
        const token = localStorage.getItem('user-token');
        if(!token){
          return next('/app/user')
        }
        return next();
      }
    },
  ]
});

// router.beforeEach((to,from,next)=>{
//   const token = localStorage.getItem('user-token');
//   console.log(token,'===token====')
//   if(!token){
//     return next('/app/user')
//   }
//   return next();
// })


export default router;
