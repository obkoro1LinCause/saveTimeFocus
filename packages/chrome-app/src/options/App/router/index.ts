import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path:'/',
      redirect:'/app/home'
    },
    {
      path:'/app/home',
      name: 'HomePage',
      component: () => import('../views/home/index.vue'),
      redirect:'/app/home/life',
      children:[
        {
          path: '/app/home/life',
          component: () => import('../views/home/life/index.vue'),
          name:'LifePage'
        },
        {
          path: '/app/home/invest',
          component: () => import('../views/home/invest/index.vue'),
          name:'InvestPage'
        },
        {
          path: '/app/home/admin',
          component: () => import('../views/home/admin/index.vue'),
          name:'AdminPage'
        }
      ]
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
      // beforeEnter:(to, from, next)=>{
      //   const token = localStorage.getItem('user-token');
      //   if(!token){
      //     return next();
      //   }
      //   return next('/app/home');
      // }
    },
  ]
});


export default router;
