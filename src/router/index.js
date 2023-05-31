import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
      props: true,
      meta: {
        requiresAuth: true,
        role: 'admin'
      }
    },
    {
      path: '/',
      name: 'admin',
      component: () => import('@/views/AdminView.vue'),
      children: [
        {
          path: 'admin',
          redirect: 'admin/user'
        },
        {
          path: 'admin/user',
          name: 'user',
          component: () => import('@/components/UserManage/coms/UserMenu.vue')
        },
        {
          path: 'admin/traffic',
          name: 'traffic',
          component: () => import('@/components/UserManage/coms/TrafficMenu.vue')
        }
      ]
    }
  ],
})
router.beforeEach((to, from, next) => {
  if (to.path == '/admin/user') {
    if (localStorage.getItem('userPermission')) {
      let token = JSON.parse(localStorage.getItem('userPermission')).token
      if (token) {
        next()
      } else {
        next({ path: '/login' })
      }
    } else {
      next({ path: '/login' })
    }
  } else {
    next()
  }
})
export default router
