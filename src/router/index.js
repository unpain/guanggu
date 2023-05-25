import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: ()=>import('@/views/LoginView.vue'),
    },
    {
      path: '/home',
      name: 'home',
      component: ()=>import('@/views/HomeView.vue'),
      props:true,
      meta:{
        requiresAuth:true,
        role:'admin'
      }
    },
  ]
})

export default router
