<template>
  <el-card class="container"
    :style="{ 'max-height': '1200px', width: '1200px', position: 'fixed', left: '50%', transform: 'translateX(' + '-50%' + ')' }">
    <div class="title"><span>交管部门信息表</span></div>
    <el-table :data="tableData" :style="{ 'min-height': '300px', width: '1100px' }"
      :header-cell-style="{ background: '#f5f7fa', color: '#333', 'font-size': '20px' }"
      :cell-style="{ height: '45px', width: '100px', 'font-size': '20px' }" border="true">
      <el-table-column width="200" prop="user_id" label="用户ID" resizable="true" align="center"></el-table-column>
      <el-table-column width="200" prop="user_name" label="用户名" resizable="true" align="center"></el-table-column>
      <el-table-column width="200" prop="user_type" label="权限" resizable="true" align="center"><template v-slot="{ row }">{{
        row.user_type == 'department' ? '交管部门' : null }}</template></el-table-column>
      <el-table-column width="200" prop="user_onlinestatus" label="在线状态" resizable="true" align="center">
        <template v-slot="{ row }">
          <el-switch v-model="row.user_onlinestatus" @change="switchStatus(row.user_id, row.user_onlinestatus)"
            size="large"></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="event_status" label="操作" align="center">
        <template v-slot="{ row }">
          <el-button color="#fc8d4d" size="big" :dark="isDark" plain @click="degradeTrafficDepartment(row.user_id)">
            <Bottom style="width: 1em; height: 1em; margin-right: 8px" />降级
          </el-button>
          <el-button color="#ff7eea" size="big" :dark="isDark" plain
            @click="modifyStart(row.user_id, row.user_name, row.user_password)">
            <Edit style="width: 1em; height: 1em; margin-right: 8px" />修改
          </el-button>
          <el-button color="#ff5353" size="big" :dark="isDark" plain @click="deleteTrafficDepartment(row.user_id)">
            <Delete style="width: 1em; height: 1em; margin-right: 8px" />删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination :current-page="currentPage" :page-sizes="[5, 10]" :page-size="pageSize"
      layout="sizes, prev, pager, next, jumper" :total="totalItems" @size-change="handleSizeChange"
      @current-change="handleCurrentChange"></el-pagination>
  </el-card>
  <el-card v-if="modifyFlag"
    :style="{ width: '300px', height: '250px', position: 'fixed', top: '20%', left: '50%', transform: 'translate(' + '-50%,' + '0)', 'z-index': '10000' }"
    :body-style="{ display: 'flex', 'flex-direction': 'column', 'justify-content': 'center', 'align-items': 'center', gap: '20px' }">
    <div class="name">姓名<el-input v-model="username" width="200px"></el-input></div>
    <div class="password">密码<el-input v-model="password" width="200px"></el-input></div>
    <div class="button-group">
      <el-button size="large" color="#faaaed" :dark="isDark" plain @click="modifyFinish">确定</el-button>
      <el-button size="large" color="#ff5353" :dark="isDark" plain @click="modifyCancle">取消</el-button>
    </div>
  </el-card>
</template>
<script setup>
import { getInfoApi } from '@/api/login'
import { setTrafficStatusApi, degradeTrafficDepartmentApi, deleteTrafficDepartmentApi, modifyTrafficInfoApi } from '@/api/opUser'
import { useUserStore } from '@/stores/user'
import { toRefs, onBeforeMount, ref, watch } from 'vue';
import { ElMessage } from 'element-plus'
let { userList, addSuccess } = toRefs(useUserStore())
let username = ref('')
let password = ref('')
let userId = ref(0)
let currentPage = ref(1) // 当前页数
let pageSize = ref(5) // 每页显示的条数
let totalItems = ref(0) // 总条数
let tableData = ref([])// 表格数据
let modifyFlag = ref(false)
const switchStatus = (id, status) => {
  setTrafficStatusApi(id, status).then((res) => {
    if (res.data.status === 'success') {
      getInfoApi().then(res => {
        userList.value = res.data.traffic
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

const degradeTrafficDepartment = (id) => {
  degradeTrafficDepartmentApi(id).then(res => {
    if (res.data.status === 'success') {
      getInfoApi().then(res => {
        userList.value = res.data.traffic
        totalItems.value = userList.value.length
        fetchData()
        ElMessage.success('降级成功!')
      })
    }
  })
}
const deleteTrafficDepartment = (id) => {
  deleteTrafficDepartmentApi(id).then(res => {
    if (res.data.status == 'success') {
      getInfoApi().then(res => {
        userList.value = res.data.traffic
        totalItems.value = userList.value.length
        fetchData()
        ElMessage.success('删除成功!')
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
  modifyTrafficInfoApi(userId.value, {
    username: username.value,
    password: password.value
  }).then(res => {
    if (res.data.status == 'success') {
      getInfoApi().then(res => {
        userList.value = res.data.traffic
        totalItems.value = userList.value.length
        fetchData()
      })
      ElMessage.success('修改成功!')
    }
  })
  modifyFlag.value = false
}
const modifyCancle = () => {
  modifyFlag.value = false
}
watch(userList, () => {
  totalItems.value = userList.value.length
  fetchData()
})

watch(addSuccess, () => {
  getInfoApi().then(res => {
    userList.value = res.data.traffic
    totalItems.value = userList.value.length
    fetchData()
  })
})
onBeforeMount(() => {
  getInfoApi().then(res => {
    userList.value = res.data.traffic
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
