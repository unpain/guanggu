<template>
  <div>
    <OpenMap />
    <AddControl />
    <EventAddition />
  </div>
</template>
<script setup>
import OpenMap from '../compontents/OpenMap.vue'
import AddControl from '../compontents/AddControl.vue'
import EventAddition from '../compontents/EventAddition.vue'
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
