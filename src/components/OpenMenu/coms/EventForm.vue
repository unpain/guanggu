<template>
  <el-form label-width="90px" ref="ruleForms" :model="evtForm" :rules="rules">
    <el-form-item label="事件编号" prop="evtNum">
      <el-input placeholder="请输入事件编号" v-model="evtForm.evtNum" />
    </el-form-item>
    <el-form-item label="事件类型" prop="evtType">
      <el-select placeholder="请选择事件类型" v-model="evtForm.evtType">
        <el-option
          v-for="item in evtTypes"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="事件等级" prop="evtLevel">
      <el-select placeholder="请选择事件等级" v-model.number="evtForm.evtLevel">
        <el-option
          v-for="item in evtLevels"
          :key="item.id"
          :label="item.type"
          :value="item.id"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="发生时间" prop="evtTime">
      <el-date-picker
        type="datetime"
        placeholder="请选择日期"
        format="YYYY.M.DD H:mm"
        value-format="YYYY.M.DD H:mm"
        v-model="evtForm.evtTime"
      />
    </el-form-item>
    <el-form-item label="发生地点" prop="evtScene">
      <el-input placeholder="请输入发生地点" v-model="evtForm.evtScene" />
    </el-form-item>
    <el-form-item label="车牌号" prop="evtCarNum">
      <el-input placeholder="请输入车牌号" v-model="evtForm.evtCarNum" />
    </el-form-item>
    <el-form-item label="驾驶员" prop="evtDriver">
      <el-input placeholder="请输入驾驶员姓名" v-model="evtForm.evtDriver" />
    </el-form-item>
    <el-form-item label="处理状态" prop="evtState">
      <el-select v-model.number="evtForm.evtState">
        <el-option
          v-for="item in evtStates"
          :key="item.id"
          :label="item.state"
          :value="item.id"
        />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">提交</el-button>
      <el-button @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref, defineEmits } from 'vue'
import { ElMessage } from 'element-plus'

const evtForm = ref({
  evtNum: '',
  evtType: '',
  evtLevel: '',
  evtTime: '',
  evtScene: '',
  evtCarNum: '',
  evtDriver: '',
  evtState: 0
})

const ruleForms = ref(null)
const evtTypes = ref(['碰撞', '刮擦', '追尾', '碾压', '翻车', '失火', '其他'])
const evtLevels = ref([
  {
    id: 1,
    type: '轻微事故'
  },
  {
    id: 2,
    type: '一般事故'
  },
  {
    id: 3,
    type: '重大事故'
  },
  {
    id: 4,
    type: '特大事故'
  }
])
const evtStates = ref([
  {
    id: 0,
    state: '待处理'
  },
  {
    id: 1,
    state: '处理中'
  },
  {
    id: 2,
    state: '已归档'
  }
])
const rules = ref({
  evtNum: [
    {
      required: true,
      message: '不能为空',
      trigger: 'blur'
    }
  ],
  evtType: [
    {
      required: true,
      message: '不能为空',
      trigger: 'change'
    }
  ],
  evtLevel: [
    {
      required: true,
      message: '不能为空',
      trigger: 'change'
    }
  ],
  evtTime: [
    {
      required: true,
      message: '不能为空',
      trigger: 'change'
    }
  ],
  evtScene: [
    {
      required: true,
      message: '不能为空',
      trigger: 'blur'
    }
  ],
  evtCarNum: [
    {
      required: true,
      message: '不能为空',
      trigger: 'blur'
    }
  ],
  evtDriver: [
    {
      required: true,
      message: '不能为空',
      trigger: 'blur'
    }
  ],
  evtState: [
    {
      required: true,
      message: '不能为空',
      trigger: 'change'
    }
  ]
})

const emit = defineEmits(['submit', 'cancel'])
const submit = () => {
  ruleForms.value.validate(valid => {
    if (valid) {
      emit('submit', evtForm.value)
      ruleForms.value.resetFields()
    } else {
      ElMessage.success('添加失败')
    }
  })
}
const cancel = () => {
  emit('cancel')
  ruleForms.value.resetFields()
}
</script>

<style scoped></style>
