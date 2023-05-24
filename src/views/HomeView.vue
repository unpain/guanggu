<template>
  <div>
    <button>公共</button>
    <button v-permission="['user']">user</button>
    <button v-permission="['admin']">admin</button>
    <button v-permission="['user', 'admin']">user+admin</button>
  </div>
</template>
<script setup>
import { useUserStore } from '../stores/user'
import { app } from '../main'

const { hasPermission } = useUserStore()
app.directive('permission', {
  mounted(el, binding) {
    // 判断是否有按钮权限
    if (!hasPermission(binding.value)) {
      el.style.display = 'none'
    }
  }
})
</script>
<style scoped></style>
