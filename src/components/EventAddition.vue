<template>
  <el-menu-item index="3" v-permission="['user']" @click="showForm">报告路况</el-menu-item>
  <div class="container" v-if="formVisible">
    <div class="event-title">
      <h3>报告路况</h3>
      <i class="iconfont icon-close" @click="hideForm"></i>
    </div>
    <div class="event-main">
      <el-form ref="ruleFormRef" label-width="120px" :model="ruleForm" :size="default" status-icon style="width: 95%"
        :rules=" rules " class="add-event">
        <el-form-item label="事件类型" prop="type">
          <el-select v-model=" ruleForm.type " placeholder="选择事件类型">
            <el-option label="碰撞" value="01" />
            <el-option label="刮擦" value="02" />
            <el-option label="追尾" value="03" />
            <el-option label="碾压" value="04" />
            <el-option label="翻车" value="05" />
            <el-option label="失火" value="06" />
            <el-option label="其他" value="07" />
          </el-select>
        </el-form-item>
        <el-form-item label="事件地址" prop="address">
          <el-input v-model=" ruleForm.address " placeholder="请输入路况地址，包含事故路段" />
        </el-form-item>
        <el-form-item label="建筑标识" prop="architecture">
          <el-input v-model=" ruleForm.architecture " placeholder="请输入事故最近的建筑标识" />
        </el-form-item>
        <el-form-item label="发生时间" required>
          <el-col :span=" 11 ">
            <el-form-item prop="date1">
              <el-date-picker v-model=" ruleForm.date1 " type="date" label="选择日期" placeholder="选择日期"
                style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col class="text-center" :span=" 2 ">
            <span class="text-gray-500">-</span>
          </el-col>
          <el-col :span=" 11 ">
            <el-form-item prop="date2">
              <el-time-picker v-model=" ruleForm.date2 " label="选择时间" placeholder="选择时间" style="width: 100%" />
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="事件描述" prop="desc">
          <el-input v-model=" ruleForm.desc " type="textarea" />
        </el-form-item>
      </el-form>
    </div>
    <div class="event-footer">
      <el-form-item>
        <el-button type="primary" @click=" submitEvent "> 确认 </el-button>
        <el-button @click="resetForm($refs.ruleFormRef)">重置</el-button>
      </el-form-item>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { reactive, ref, toRefs, onBeforeMount } from 'vue'
import { useUserStore } from '@/stores/user'
import { useEventStore } from '@/stores/event'
import { getEventApi, postNewEventApi } from '@/api/event'
let { user } = toRefs(useUserStore())
let { eventId } = toRefs(useEventStore())
const ruleForm = reactive({
  type: '',
  address: '',
  architecture: '',
  date1: '',
  date2: '',
  desc: '',
})
let eventList = ref([])
function submitEvent() {
  eventList.value = {
    event_id: eventId.value,
    user_id: user.value.user_id,
    event_type: ruleForm.type,
    event_addr: ruleForm.address,
    event_mark: ruleForm.architecture,
    event_time: time,
    event_describe: ruleForm.address,
    event_status: 0
  }
  hideForm()
  postNewEventApi(eventList.value).then(res => {
    console.log(res.data)
  })
}
var time = computed(() => {
  const date = ruleForm.date2.getDate()
  const year = ruleForm.date2.getFullYear()
  const month = ruleForm.date2.getMonth()
  const hour = ruleForm.date2.getHours()
  const minute = ruleForm.date2.getMinutes()
  const second = ruleForm.date2.getSeconds()
  return `${year}-${month}-${date} ${hour}:${minute}:${second}`
})
const rules = reactive({
  type: [
    {
      required: true,
      message: '请选择事件类型',
      trigger: 'blur',
    },
  ],
  address: [{ required: true, message: '请输入事故位置', trigger: 'blur' }],
})
// 重置表单
const resetForm = (formEl) => {
  console.log(formEl)
  if (!formEl) return
  formEl.resetFields()
}
const formVisible = ref(false)
const showForm = () => {
  formVisible.value = true // 显示表单
}
const hideForm = () => {
  formVisible.value = false // 隐藏表单
}

onBeforeMount(() => {
  getEventApi().then(res => {
    eventId.value = Math.max(...res.data.event.map(item => item.event_id)) + 1
    // console.log(Math.max(...res.data.event.map(item => item.event_id)))
  })
})
</script>
<style scoped>
@import url(https://at.alicdn.com/t/c/font_4027375_y6nc9axxdw.css);

.container {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 400px;
  border-radius: 5px;
  transform: translate(-50%, -50%);
  background-color: #fff;
  z-index: 100;
  /* display: none; */
}

.container .event-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  border-bottom: 1px solid #999;
}

.container .event-title h3 {
  color: #666;
}

.container .event-title .iconfont {
  cursor: pointer;
}

.container .event-main {
  padding: 10px 10px 10px 0;
  border-bottom: 1px solid #999;
}

.container .event-footer {
  padding: 15px 20px;
  padding-bottom: 0;
}
</style>
