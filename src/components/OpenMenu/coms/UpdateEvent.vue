<template>
  <el-menu-item
    index="7"
    v-permission="['department', 'admin']"
    @click="updateEvent"
    >事件更新</el-menu-item
  >
  <ThePopup :popupId="'update'" @popup="handlePopup">
    <template #title>更新事件</template>
    <EventForm
      :evtForm="evtForm"
      @submit="submitUpdate"
      @cancel="cancelUpdate"
    />
  </ThePopup>
</template>

<script setup>
import { ref, inject, onMounted } from 'vue'
import EventForm from './EventForm.vue'
import ThePopup from './ThePopup.vue'
import { useQuery } from '../hooks/useQuery'
import { usePoint } from '../hooks/usePoint.JS'
import { ElMessage } from 'element-plus'

let $map
let docLayer
onMounted(() => {
  $map = inject('$map')
  docLayer = $map.getLayers().getArray()[2]
  console.log(docLayer)
})

let $popup
const handlePopup = popup => {
  $popup = popup
}

const updateEvent = () => {
  $map.on('click', mapClick)
}

const service = {
  name: 'guanggu',
  layerId: 2
}
const { Query } = useQuery()
const mapClick = e => {
  const position = e.coordinate
  //点查询
  Query.queryByPnt({
    position,
    service,
    callback: queryRes
  })
}

const evtForm = ref({})
let fid
let position
const queryRes = e => {
  if (e) {
    position = e[0].getGeometry().flatCoordinates
    fid = e[0].id_
    evtForm.value = e[0].values_.values_
    $popup.setPosition(position)
  } else {
    //点击空白处关闭弹窗
    $popup.setPosition(undefined)
  }
}
const { Point } = usePoint()
const attr = [{ name: '处理状态', value: 0, type: 'int' }]
const submitUpdate = evtForm => {
  attr[0].value = evtForm.evtState
  Point.update({
    fid,
    attr,
    position,
    service,
    docLayer
  })
  $popup.setPosition(undefined)
  ElMessage.success('更新成功')
  $map.un('click', mapClick)
}
const cancelUpdate = () => {
  $popup.setPosition(undefined)
  $map.un('click', mapClick)
}
</script>

<style scoped></style>
