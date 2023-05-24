<template>
  username:<el-input v-model="username" id="username-input" required></el-input>
  password:<el-input type="password" v-model="password" id="password-input" required></el-input>
  <el-button @click="login">登录</el-button>
  <el-button @click="register">注册</el-button>
</template>
<script setup>
import { useUserStore } from '@/stores/user'
import { toRefs, onBeforeMount } from 'vue';
import { getInfoApi, postInfoApi } from '@/api/login'
let { username, password, capcha } = toRefs(useUserStore())
const login = () => {
  postInfoApi({
    username: username.value,
    password: password.value,
    op: "login"
  }).then(res => {
    const token = res.data.token
    // console.log(res)
    localStorage.setItem('token', token)
  }).catch(err => {
    console.error(err)
  })
  getInfoApi().then(res => {
    console.log(res.data)
  })
}
const register = () => {
  postInfoApi({
    username: username.value,
    password: password.value,
    op: "register"
  }).then(res => {
    console.log(res)
  })
}
</script>
<style scoped>
</style>
