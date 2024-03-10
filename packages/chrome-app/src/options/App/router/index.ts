import { createRouter, createWebHashHistory } from 'vue-router'
import { useUserStore } from '../stores/user';
import i18n from '@/locales/index';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path:'/',
      redirect:'/app/home/:lang'
    },
    {
      path:'/app/home/:lang',
      name: 'HomePage',
      component: () => import('../views/home/index.vue'),
      redirect:'/app/home/life/:lang',
      children:[
        {
          path: '/app/home/life/:lang',
          component: () => import('../views/home/life/index.vue'),
          name:'LifePage'
        },
        {
          path: '/app/home/invest/:lang',
          component: () => import('../views/home/invest/index.vue'),
          name:'InvestPage'
        },
        {
          path: '/app/home/admin/:lang',
          component: () => import('../views/home/admin/index.vue'),
          name:'AdminPage'
        }
      ],
    },
    {
      path: '/app/user/:lang',
      component: () => import('../views/user/index.vue'),
      redirect:'/app/user/:lang',
      children:[
        {
          path: '/app/user/:lang',
          name: 'LoginOrSignPage',
          component: () => import('../views/user/loginOrSign.vue')
        },
        {
          path:`/app/user/forget/:lang`,
          name: 'ForgetPage',
          component: () => import('../views/user/forget.vue')
        },
      ],
    },
  ]
});


router.beforeEach(async (to, from, next) => {

  const lang = i18n.global.locale.value;
  const userStore = useUserStore()
  const token = localStorage.getItem('user-token');
  const user = await userStore.getUserInfo(token);


  if(to?.fullPath?.includes('user') && !user){
    return next();
  }else if(!to?.fullPath?.includes('user') && !user){
    return next({
      name:'LoginOrSignPage',
      params:{
        lang
      }
    })
  }else{
    userStore.setUser(user);
    return next();
  }
})


export default router;
