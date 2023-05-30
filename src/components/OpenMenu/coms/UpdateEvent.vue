<template>
  <el-menu-item index="5-2" @click="checkEvent">事件更新</el-menu-item>
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
import { usePoint } from '../hooks/usePoint'
import { useMark } from '../hooks/useMark'
import { ElMessage } from 'element-plus'
import { useEventStore } from '../../../stores/event'

let $map
let docLayer
const { markLayer, markSource, setStyle } = useMark()
const service = {
  name: 'guanggu',
  layerId: 2
}

onMounted(() => {
  $map = inject('$map')
  docLayer = $map.getLayers().getArray()[2]
})

let $popup
const handlePopup = popup => {
  $popup = popup
}

const { getMapEvent } = useEventStore()
const { Query } = useQuery()
const checkEvent = () => {
  Query.queryByLayer({
    service,
    callback: res => {
      markSource.addFeatures(res)
      setStyle()
    }
  })
  $map.addLayer(markLayer)
  let eventKey = $map.on('click', mapClick)
  getMapEvent(eventKey)
}

const mapClick = e => {
  const feature = $map.forEachFeatureAtPixel(e.pixel, function (feature) {
    return feature
  })
  if (feature) {
    const fids = [feature.id_]
    Query.queryByFID({
      fids,
      service,
      callback: getQueryRes
    })
  }
}

const evtForm = ref({})
let fid
let position
const getQueryRes = e => {
  evtForm.value = e[0].values_.values_
  fid = e[0].id_
  position = e[0].getGeometry().flatCoordinates
  $popup.setPosition(position)
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
  setStyle(evtForm.evtState, fid)
  $popup.setPosition(undefined)
  ElMessage.success('更新成功')
}
const cancelUpdate = () => {
  $popup.setPosition(undefined)
}
</script>

<style scoped></style>
