import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect:'/app/today'
    },
    {
      path: '/app/:id',
      name: 'TodoListPage',
      component: () => import('../views/todoList/index.vue')
    }
  ]
})

export default router
