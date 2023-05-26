<template>
  <el-menu-item
    index="7"
    v-permission="['department', 'admin']"
    @click="updateEvent"
    >事件更新</el-menu-item
  >
</template>

<script setup>
import { inject, onMounted } from 'vue'

let $map
onMounted(() => {
  $map = inject('$map')
})

const updateEvent = () => {



}
</script>

<style scoped></style>
