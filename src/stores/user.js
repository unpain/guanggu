import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('auth', () => {
  let username = ref('')
  let password = ref('')
  const userPermission = ref(
    localStorage.getItem('userPermission') === undefined?JSON.parse(localStorage.getItem('userPermission')):null
  )
  // 判断是否用拥有权限
  const hasPermission = computed(() => {
    return permission => {
      return (
        userPermission.value &&
        permission.includes(userPermission.value.permission)
      )
    }
  })
  const login = info => {
    // 登录方法，存储用户信息和权限信息
    localStorage.setItem('userPermission', JSON.stringify(info))
    userPermission.value = info
  }
  const logout = () => {
    // 登出方法，清空用户信息和权限信息
    localStorage.removeItem('userPermission')
    userPermission.value = null
  }

  return {
    userPermission,
    hasPermission,
    login,
    logout,
    username,
    password
  }
})
