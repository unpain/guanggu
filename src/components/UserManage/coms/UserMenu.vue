<template>
  <el-card class="container"
    :style="{ 'max-height': '1200px', width: '1600px', position: 'fixed', left: '50%', transform: 'translateX(' + '-50%' + ')' }">
    <div class="title"><span>普通用户信息表</span></div>
    <el-table :data="tableData" :style="{ 'min-height': '300px', width: '1500px' }"
      :header-cell-style="{ background: '#f5f7fa', color: '#333', 'font-size': '20px' }"
      :cell-style="{ height: '45px', width: '500px', 'font-size': '20px' }" border="true">
      <el-table-column prop="user_id" label="用户id" resizable="true" align="center"></el-table-column>
      <el-table-column prop="user_name" label="用户姓名" resizable="true" align="center"></el-table-column>
      <el-table-column prop="user_type" label="用户类型" resizable="true" align="center"></el-table-column>
      <el-table-column prop="user_onlinestatus" label="用户在线状态" resizable="true" align="center">
        <template v-slot="{ row }">
          <el-switch v-model="row.user_onlinestatus" @change="switchStatus(row.user_id, row.user_onlinestatus)"
            size="normal"></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="event_status" label="操作" align="center">
        <template v-slot="{ row }">
          <el-button color="#5aabfc" size="big" :dark="isDark" plain @click="upgradeUser(row.user_id)">
            <Top style="width: 1em; height: 1em; margin-right: 8px" />升级
          </el-button>
          <el-button color="#ff7eea" size="big" :dark="isDark" plain
            @click="modifyStart(row.user_id, row.user_name, row.user_password)">
            <Edit style="width: 1em; height: 1em; margin-right: 8px" />修改
          </el-button>
          <el-button color="#ff5353" size="big" :dark="isDark" plain @click="deleteUser(row.user_id)">
            <Delete style="width: 1em; height: 1em; margin-right: 8px" />删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination :current-page="currentPage" :page-sizes="[5, 10, 15, 20]" :page-size="pageSize"
      layout="sizes, prev, pager, next, jumper" :total="totalItems" @size-change="handleSizeChange"
      @current-change="handleCurrentChange"></el-pagination>
  </el-card>
  <el-card v-if="modifyFlag"
    :style="{ width: '300px', height: '230px', position: 'fixed', top: '20%', left: '50%', transform: 'translate(' + '-50%,' + '0)', 'z-index': '10000' }"
    :body-style="{ display: 'flex', 'flex-direction': 'column', 'justify-content': 'center', 'align-items': 'center', gap: '20px' }">
    <div class="name">姓名<el-input v-model="username" width="200px"></el-input></div>
    <div class="password">密码<el-input v-model="password" width="200px"></el-input></div>
    <div class="button-group">
      <el-button size="normal" color="#faaaed" :dark="isDark" plain @click="modifyFinish">确定</el-button>
      <el-button size="normal" color="#ff5353" :dark="isDark" plain @click="modifyCancle">取消</el-button>
    </div>
  </el-card>
</template>
<script setup>
import { getInfoApi } from '@/api/login'
import { setUserStatusApi, upgradeUserApi, deleteUserApi, modifyUserInfoApi } from '@/api/opUser'
import { useUserStore } from '@/stores/user'
import { toRefs, onBeforeMount, ref } from 'vue';

let username = ref('')
let password = ref('')
let userId = ref(0)
let { userList } = toRefs(useUserStore())
let currentPage = ref(1) // 当前页数
let pageSize = ref(5) // 每页显示的条数
let totalItems = ref(0) // 总条数
let tableData = ref([])// 表格数据
let modifyFlag = ref(false)
const switchStatus = (id, status) => {
  setUserStatusApi(id, status).then((res) => {
    if (res.data.status === 'success') {
      getInfoApi().then(res => {
        userList.value = res.data.user
      })
    }
  })
}
const handleSizeChange = (val) => {
  pageSize.value = val;
  fetchData();
}
const handleCurrentChange = (val) => {
  currentPage.value = val;
  fetchData();
}
const fetchData = () => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  const items = userList.value.slice(start, end);
  tableData.value = items;
}

const upgradeUser = (id) => {
  upgradeUserApi(id).then(res => {
    if (res.data.status === 'success') {
      getInfoApi().then(res => {
        userList.value = res.data.user
        totalItems.value = userList.value.length
        fetchData()
      })
    }
  })
}

const deleteUser = (id) => {
  deleteUserApi(id).then(res => {
    if (res.data.status === 'success') {
      getInfoApi().then(res => {
        userList.value = res.data.user
        totalItems.value = userList.value.length
        fetchData()
      })
    }
  })
}

const modifyStart = (id, name, key) => {
  modifyFlag.value = true
  userId.value = id
  username.value = name
  password.value = key
}

const modifyFinish = () => {
  modifyUserInfoApi(userId.value, {
    username: username.value,
    password: password.value
  }).then(res => {
    if (res.data.status == 'success') {
      getInfoApi().then(res => {
        userList.value = res.data.user
        totalItems.value = userList.value.length
        fetchData()
      })
    }
  })
  modifyFlag.value = false
}

const modifyCancle = () => {
  modifyFlag.value = false
}
onBeforeMount(() => {
  getInfoApi().then(res => {
    userList.value = res.data.user
    totalItems.value = userList.value.length
    fetchData()
  })
})
</script>
<style scoped>
.container {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: fade-in-animation 0.5s;
}

.title {
  font-size: 30px;
  padding-bottom: 20px;
}
</style>
