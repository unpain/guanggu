<template>
  <el-sub-menu
    v-permission="['department', 'admin']"
    index="4"
    expand-close-icon="none"
    expand-open-icon="none"
  >
    <template #title>视频监控</template>
    <el-menu-item index="4-1" @click="checkMonitor">查看监控</el-menu-item>
    <el-menu-item index="4-2">取消查看</el-menu-item>
  </el-sub-menu>
</template>

<script setup>
import { inject, onMounted } from 'vue'

let $map

onMounted(() => {
  
})

const checkMonitor = () => {
  console.log($map)
}
</script>

<style scoped></style>
