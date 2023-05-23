<template>
  <div class="user">
    username:<el-input v-model="username" id="username"></el-input>
    password:<el-input v-model="password" id="password"></el-input>
  </div>
</template>
<script setup>
import { useUserStore } from '@/stores/user'
import { toRefs, onBeforeMount } from 'vue';
import { getInfoApi } from '@/api/login'
let { username, password } = toRefs(useUserStore())
const login = () => {
  getInfoApi().then(res => {
    console.log(res)
  })
}
onBeforeMount(() => {
  login()
})
</script>
<style scoped>
</style>
