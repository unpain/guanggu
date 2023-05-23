import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ()=>import('@/views/LoginView.vue'),
      redirect:'/login'
    },
    {
      path: '/login',
      name: 'login',
      component: ()=>import('@/views/LoginView.vue'),
    },
  ]
})

export default router
