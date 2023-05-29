<template>
  <el-menu-item
    index="5"
    v-permission="['department', 'admin']"
    @click="addEvent"
    >事件添加</el-menu-item
  >
  <ThePopup
    :popupId="'add'"
    :source="source"
    @popup="handlePopup"
  >
    <template #title>添加事件</template>
    <EventForm @submit="submitAdd" @cancel="cancelAdd" />
  </ThePopup>
</template>
<script setup>
import EventForm from './EventForm.vue'
import ThePopup from './ThePopup.vue'
import { onMounted, inject, ref } from 'vue'
import { useDraw } from '../hooks/useDraw'
import { usePoint } from '../hooks/usePoint'
import { ElMessage } from 'element-plus'

let $map
let docLayer
//画布
const source = new ol.source.Vector({})
const layer = new ol.layer.Vector({
  source
})
onMounted(() => {
  $map = inject('$map')
  $map.addLayer(layer)
  docLayer = $map.getLayers().getArray()[2]
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
  source.clear()
  $map.removeInteraction(draw)
  position = e.feature.getGeometry().flatCoordinates
  $popup.setPosition(position)
}

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
const submitAdd = evtForm => {
  const evtFormValue = Object.values(evtForm) // 获取 obj 对象的属性值数组
  evtFormValue.forEach((item, index) => {
    attr[index].value = item
  })
  Point.add({
    position,
    attr,
    service,
    docLayer
  })
  $map.removeInteraction(draw)
  source.clear()
  $popup.setPosition(undefined)
  ElMessage.success('添加成功')
}
const cancelAdd = () => {
  $map.removeInteraction(draw)
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
