<template>
  <el-sub-menu
    index="7"
    v-permission="['department', 'admin']"
    expand-close-icon="none"
    expand-open-icon="none"
  >
    <template #title>事件更新</template>
    <el-menu-item index="7-1" @click="checkEvent">选择事件</el-menu-item>
    <el-menu-item index="7-2" @click="offUpdate">取消更新</el-menu-item>
  </el-sub-menu>
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
import { useEventStore } from '../../../stores/event'

let $map
let docLayer

const markStyleRed = new ol.style.Style({
  image: new ol.style.Icon({
    anchor: [0.5, 19],
    anchorOrigin: 'center',
    anchorXUnits: 'fraction',
    anchorYUnits: 'pixels',
    offsetOrigin: 'center',
    // offset:[0,10],
    //图标缩放比例
    scale: 1.5,
    //透明度
    opacity: 0.75,
    //图标的url
    src: 'src/assets/images/map-marker-red.svg'
  })
})
const markStyleYellow = new ol.style.Style({
  image: new ol.style.Icon({
    anchor: [0.5, 19],
    anchorOrigin: 'center',
    anchorXUnits: 'fraction',
    anchorYUnits: 'pixels',
    offsetOrigin: 'center',
    // offset:[0,10],
    //图标缩放比例
    scale: 1.5,
    //透明度
    opacity: 0.75,
    //图标的url
    src: 'src/assets/images/map-marker-yellow.svg'
  })
})
const markStyleGreen = new ol.style.Style({
  image: new ol.style.Icon({
    anchor: [0.5, 19],
    anchorOrigin: 'center',
    anchorXUnits: 'fraction',
    anchorYUnits: 'pixels',
    offsetOrigin: 'center',
    // offset:[0,10],
    //图标缩放比例
    scale: 1.5,
    //透明度
    opacity: 0.75,
    //图标的url
    src: 'src/assets/images/map-marker-green.svg'
  })
})
const source = new ol.source.Vector({})
const layer = new ol.layer.Vector({
  source
})
const { Query } = useQuery()
const service = {
  name: 'guanggu',
  layerId: 2
}

onMounted(() => {
  $map = inject('$map')
  docLayer = $map.getLayers().getArray()[2]
  Query.queryByLayer({
    service,
    callback: res => {
      source.addFeatures(res)
      source.fore
  }})
})

let $popup
const handlePopup = popup => {
  $popup = popup
}

const { getMapEvent } = useEventStore()
const checkEvent = () => {
  let key = $map.on('click', mapClick)
  getMapEvent(key)
}
const offUpdate = () => {
  $map.un('click', mapClick)
}

const mapClick = e => {
  const position = e.coordinate
  //点查询
  Query.queryByPnt({
    position,
    service,
    callback: getQueryRes
  })
}

const evtForm = ref({})
let fid
let position
const getQueryRes = e => {
  if (e) {
    position = e[0].getGeometry().flatCoordinates
    fid = e[0].id_
    evtForm.value = e[0].values_.values_
    $popup.setPosition(position)
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
}
const cancelUpdate = () => {
  $popup.setPosition(undefined)
}
</script>

<style scoped></style>
