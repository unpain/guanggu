<template>
  username:<el-input v-model="username" id="username-input" required></el-input>
  password:<el-input type="password" v-model="password" id="password-input" required></el-input>
  <el-button @click="login">登录</el-button>
  <el-button @click="register">注册</el-button>
  <el-button @click="getUser">获取用户信息</el-button>
  <el-button @click="deleteUser(1)">删除</el-button>
  <el-button @click="upgradeUser(2)">升级</el-button>
  <el-button @click="degradeUser(6)">降级</el-button>
  <el-button @click="getAllEvent">获取事件</el-button>
</template>
<script setup>
import { useUserStore } from '@/stores/user'
import { toRefs, onBeforeMount } from 'vue';
import { getInfoApi, postInfoApi } from '@/api/login'
import { deleteUserApi, upgradeUserApi, degradeUserApi } from '@/api/opUser'
import { getEventApi } from '@/api/event'
let { username, password } = toRefs(useUserStore())
const login = () => {
  postInfoApi({
    username: username.value,
    password: password.value,
    op: "login"
  }).then(res => {
    const token = res.data.token
    console.log(res)
    localStorage.setItem('token', token)
  }).catch(err => {
    console.error(err)
  })
}
const register = () => {
  postInfoApi({
    username: username.value,
    password: password.value,
    op: "register"
  }).then((res) => {
    console.log(res.data)
  })
}

const getUser = ()=>{
  getInfoApi().then(res=>{
    console.log(res.data)
  })
}
const deleteUser = (id) => {
  deleteUserApi(id).then(res => {
    console.log(id)
    console.log(res.data)
  })
}
const upgradeUser = (id) => {
  upgradeUserApi(id, { op: 'upgrade' }).then(res => {
    console.log(res.data)
  })
}
const degradeUser = (id) => {
  degradeUserApi(id, { op: 'degrade' }).then(res => {
    console.log(res.data)
  })
}

const getAllEvent = () => {
  getEventApi().then(res => {
    console.log(res.data)
  })
}
onBeforeMount(() => {
  // login()
})
</script>
<style scoped>
</style>
