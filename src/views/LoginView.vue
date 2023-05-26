<template>
  username:<el-input v-model="username" id="username-input" required></el-input>
  password:<el-input type="password" v-model="password" id="password-input" required></el-input>
  <el-button @click="handleLogin">登录</el-button>
  <el-button @click="register">注册</el-button>
  <el-button @click="deleteUser(1)">删除</el-button>
</template>
<script setup>
import { useUserStore } from '@/stores/user'
import { toRefs, onBeforeMount } from 'vue'
import { getInfoApi, postInfoApi } from '@/api/login'
import { useRouter } from 'vue-router'

const { login } = useUserStore()
let { username, password, user } = toRefs(useUserStore())
const $router = useRouter()
const handleLogin = () => {
  postInfoApi({
    username: username.value,
    password: password.value,
    op: 'login'
  })
    .then(res => {
      const token = res.data.token
      const permission = res.data.user.user_type
      user.value = res.data.user
      login({
        permission,
        token
      })
      $router.push('/home')
    })
    .catch(err => {
      console.error(err)
    })
}
const register = () => {
  postInfoApi({
    username: username.value,
    password: password.value,
    op: 'register'
  }).then(res => {
  })
}
const deleteUser = id => {
  deleteUserApi(id).then(res => {
    console.log(id)
  })
}
onBeforeMount(() => {
  login()
})
</script>
<style scoped>
</style>
