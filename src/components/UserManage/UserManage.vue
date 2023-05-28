<template>
  <el-menu router="true" :default-active="defaultIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
    <el-menu-item index="/home">光谷智慧交通用户管理系统</el-menu-item>
    <el-menu-item index="/admin/user">普通用户</el-menu-item>
    <el-menu-item index="/admin/traffic">交管部门</el-menu-item>
    <el-menu-item @click="showAdd">
      添加用户
    </el-menu-item>
    <el-menu-item>
      <el-input v-model="key" :style="{ height: '45px', 'margin-top': '6px', 'box-sizing': 'border-box' }"
        placeholder="请输入关键词搜索" @input="searchUser(key, type)"></el-input>
    </el-menu-item>
  </el-menu>
  <el-card v-if="addFlag"
    :style="{ width: '400px', position: 'fixed', top: '20%', left: '50%', transform: 'translate(' + '-50%,' + '0)', 'z-index': '100', textAlign: 'center' }">
    添加用户
    <ul
      :style="{ listStyle: 'none', display: 'flex', flexDirection: 'column', justifyContent: start, alignItems: center, gap: '20px', marginTop: '20px', textAlign: 'left' }">
      <li>
        <el-input :style="{ width: '100%' }" v-model="username" placeholder="请输入用户名"></el-input><br>
      </li>
      <li>
        <el-input :style="{ width: '100%' }" v-model="password" placeholder="请输入密码"></el-input><br>
      </li>
      <li>
        <el-select v-model="usertype" placeholder="用户类型" :style="{ 'user-select': 'none', width: '100px' }">
          <el-option label="普通用户" value="user" />
          <el-option label="交管部门" value="trafficDepartment" />
        </el-select>
      </li>
    </ul>
    <ul
      :style="{ listStyle: 'none', display: 'flex', flexDirection: 'row', justifyContent: start, alignItems: center, gap: '20px', marginTop: '20px' }">
      <li :style="{ display: 'inline-block' }"><el-button color="#ff7eea" size="normal" :dark="isDark" plain
          @click="addUser">添加</el-button></li>
      <li :style="{ display: 'inline-block' }"><el-button color="#ff5353" size="normal" :dark="isDark" plain
          @click="cancleAdd">取消</el-button></li>
    </ul>
  </el-card>
  <el-main>
    <RouterView />
  </el-main>
</template>
<script setup>
import { ref, toRefs, onBeforeMount, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { searchInfoApi, addUserApi } from '@/api/opUser'
import { getInfoApi } from '@/api/login'
import { ElMessage } from 'element-plus'
let $route = useRoute()
let type = ref('')
let addFlag = ref(false)
let defaultIndex = ref('/admin/user')
let { key, userList, username, password, usertype, addSuccess } = toRefs(useUserStore())

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

const showAdd = () => {
  addFlag.value = true
  addSuccess.value = false
}

const cancleAdd = () => {
  addFlag.value = false
  ElMessage.warning('取消添加用户!')
}

const addUser = () => {
  if (username.value && password.value && usertype.value) {
    addUserApi({
      username: username.value,
      password: password.value,
      type: usertype.value
    }).then(res => {
      if (res.data.status === 'success') {
        username.value = ''
        password.value = ''
        usertype.value = ''
        type.value = ''
        addFlag.value = false
        addSuccess.value = true
        ElMessage.success('添加成功!')
      } else {
        ElMessage.success('添加失败!')
      }
    })
  } else {
    ElMessage.error('请输入完整信息!')
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
