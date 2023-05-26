<template>
  <el-menu router="true" :default-active="defaultIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
    <el-menu-item index="/home">光谷智慧交通用户管理系统</el-menu-item>
    <el-menu-item index="/admin/user">普通用户</el-menu-item>
    <el-menu-item index="/admin/traffic">交管部门</el-menu-item>
    <el-menu-item>
      <el-input v-model="key" :style="{height:'45px','margin-top':'10px','box-sizing':'border-box'}" placeholder="请输入关键词搜索" @input="searchUser(key, type)"></el-input>
    </el-menu-item>
  </el-menu>
  <el-main>
    <RouterView />
  </el-main>
</template>
<script setup>
import { ref, toRefs, onBeforeMount, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { searchInfoApi } from '@/api/opUser'
import { getInfoApi } from '@/api/login'
let $router = useRouter()
let $route = useRoute()
let type = ref('')
let defaultIndex = ref('/admin/user')
let { key, userList } = toRefs(useUserStore())

const searchUser = (key, type) => {
  if (key) {
    searchInfoApi(key, type).then(res => {
      userList.value = res.data.userArr
    })
  } else {
    getInfoApi().then(res => {
      userList.value = res.data[type]
    })
  }
}
watch($route, () => {
  type.value = $route.path.split('/')[2]
})
onBeforeMount(() => {
  type.value = $route.path.split('/')[2]
})
</script>
<style scoped>
.el-card {
  cursor: pointer;
  user-select: none;
}
</style>
