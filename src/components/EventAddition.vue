<template>
  <!-- <button>点击添加事件</button> -->
  <el-form v-if="false"
    label-width="120px"
    :model="ruleForm"
    :size="default"
    status-icon
    style="width: 40%"
    :rules="rules"
    class="add-event"

  >
    <el-form-item label="事件类型" prop="type">
      <el-select v-model="ruleForm.region" placeholder="选择事件类型">
        <el-option label="碰撞事故" value="01" />
        <el-option label="单车事故" value="02" />
        <el-option label="行人事故" value="03" />
        <el-option label="自行车事故" value="04" />
        <el-option label="机动车与非机动车事故" value="05" />
        <el-option label="多车连环事故" value="06" />
        <el-option label="侧翻事故" value="07" />
        <el-option label="违规事故" value="08" />
        <el-option label="酒驾事故" value="09" />
        <el-option label="非机动车与行人事故" value="10" />
      </el-select>
    </el-form-item>
    <el-form-item label="事件地址" prop="address">
      <el-input
        v-model="ruleForm.address"
        placeholder="请输入路况地址，包含事故路段"
      />
    </el-form-item>
    <el-form-item label="建筑标识" prop="name">
      <el-input
        v-model="ruleForm.architecture"
        placeholder="请输入事故最近的建筑标识"
      />
    </el-form-item>
    <el-form-item label="发生时间" required>
      <el-col :span="11">
        <el-form-item prop="date1">
          <el-date-picker
            v-model="ruleForm.date1"
            type="date"
            label="选择日期"
            placeholder="选择日期"
            style="width: 100%"
          />
        </el-form-item>
      </el-col>
      <el-col class="text-center" :span="2">
        <span class="text-gray-500">-</span>
      </el-col>
      <el-col :span="11">
        <el-form-item prop="date2">
          <el-time-picker
            v-model="ruleForm.date2"
            label="选择时间"
            placeholder="选择时间"
            style="width: 100%"
          />
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item label="事件描述" prop="desc">
      <el-input v-model="ruleForm.desc" type="textarea" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary"> 确认 </el-button>
      <el-button>重置</el-button>
    </el-form-item>
  </el-form>
</template>
<script setup>
import { reactive } from 'vue'
// import  { FormInstance, FormRules } from 'element-plus'
const ruleForm = reactive({
  type: '',
  address: '',
  architecture: '',
  date1: '',
  date2: '',
  desc: '',
})
const rules = reactive({
  type:[
    {
      required: true, message: '请选择事件类型', trigger: 'blur'
    }
  ],
  address:[
    {required:true,message:'请输入事故位置',trigger: 'blur'}
  ]
})
</script>
<style scoped>
.add-event{
position:fixed;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
background-color: #fff;
  /* display: none; */
}
</style>
