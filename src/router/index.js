import { createRouter, createWebHistory } from 'vue-router'
// import {jsonwebtoken} from '../api/server'
// console.log(jsonwebtoken)

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
      component: () => import('@/views/HomeView/HomeView.vue'),
      props: true,
      meta: {
        requiresAuth: true,
        role: 'admin'
      }
    },
    {
      path: '/',
      name: 'admin',
      component: () => import('@/views/AdminView/AdminView.vue'),
      children: [
        {
          path: 'admin',
          redirect: 'admin/user'
        },
        {
          path: 'admin/user',
          name: 'user',
          component: () =>
            import('@/views/AdminView/coms/UserManage/coms/UserMenu.vue')
        },
        {
          path: 'admin/traffic',
          name: 'traffic',
          component: () =>
            import('@/views/AdminView/coms/UserManage/coms/TrafficMenu.vue')
        }
      ]
    }
  ]
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
