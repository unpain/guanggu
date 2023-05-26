<template>
  <el-menu router="true" :default-active="defaultIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
    <el-card color="red" @click="toMap">光谷智慧交通用户管理系统</el-card>
    <el-menu-item index="/admin/user" >普通用户</el-menu-item>
    <el-menu-item index="/admin/traffic" >交管部门</el-menu-item>
  </el-menu>
  <el-main>
    <RouterView />
  </el-main>
</template>
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
let $router = useRouter()
let defaultIndex = ref('/admin/user')
const toMap = () => {
  $router.back()
}
</script>
<style scoped>
.el-card{
  cursor: pointer;
  user-select: none;
}
</style>
