<template>
  <el-menu-item
    index="5"
    v-permission="['department', 'admin']"
    @click="addEvent"
    >事件添加</el-menu-item
  >
  <ThePopup :popupId="'addEvent'" @popup="handlePopup">
    <template #title>添加事件</template>
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
        <el-select
          placeholder="请选择事件等级"
          v-model.number="evtForm.evtLevel"
        >
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
        <el-select disabled v-model.number="evtForm.evtState">
          <el-option
            v-for="item in evtStates"
            :key="item.id"
            :label="item.state"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitAdd">提交</el-button>
        <el-button @click="cancleAdd">取消</el-button>
      </el-form-item>
    </el-form>
  </ThePopup>
</template>

<script setup>
import { inject, ref } from 'vue'
import { onMounted } from 'vue'
import { useDraw } from '../hooks/useDraw'
import { usePoint } from '../hooks/usePoint'
import ThePopup from './ThePopup.vue'
import { ElMessage } from 'element-plus'

let $map
let $docLayer
//画布
const source = new ol.source.Vector({})
const layer = new ol.layer.Vector({
  source
})
onMounted(() => {
  $map = inject('$map')
  $map.addLayer(layer)
  $docLayer = $map.getLayers().getArray()[1]
})

// 拿到popup
let $popup
const handlePopup = popup => {
  $popup = popup
}

const { createDraw } = useDraw()
let draw
const addEvent = () => {
  draw = createDraw({
    source,
    type: 'Point',
    callback: handleDraw
  })
  $map.addInteraction(draw)
}

let position
const handleDraw = e => {
  $map.removeInteraction(draw)
  position = e.feature.getGeometry().getCoordinates()
  $popup.setPosition(position)
}

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

const { Point } = usePoint()
const attr = [
  { name: '事件编号', value: '', type: 'string' },
  { name: '事件类型', value: '', type: 'string' },
  { name: '事件等级', value: '', type: 'int' },
  { name: '发生时间', value: '', type: 'string' },
  { name: '发生地点', value: '', type: 'string' },
  { name: '车牌号', value: '', type: 'string' },
  { name: '驾驶员', value: '', type: 'string' },
  { name: '处理状态', value: 0, type: 'int' }
]
const service = {
  name: 'guanggu',
  layerId: 2
}
const submitAdd = () => {
  ruleForms.value.validate(valid => {
    if (valid) {
      const evtFormValue = Object.values(evtForm.value) // 获取 obj 对象的属性值数组
      evtFormValue.forEach((item, index) => {
        attr[index].value = item
      })
      Point.add({
        position,
        attr,
        service,
        docLayer: $docLayer
      })
      source.clear()
      $popup.setPosition(undefined)
      ElMessage.success('添加成功')
    }
    // else {
    //   console.log(evtForm.value)
    //   ElMessage.error('添加失败')
    // }
  })
}
const cancleAdd = () => {
  $popup.setPosition(undefined)
  source.clear()
}
</script>

<style scoped>
::v-deep .el-form-item__label {
  justify-content: flex-start;
  padding: 0 0 0 15px;
}
</style>
