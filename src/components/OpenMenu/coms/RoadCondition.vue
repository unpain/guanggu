<template>
  <el-sub-menu index="2" expand-close-icon="none" expand-open-icon="none">
    <template #title><i class="iconfont icon-road-conditions_line"></i> 实时路况</template>
    <el-menu-item index="2-1" @click="checkRoadConditions"
      >查看路况</el-menu-item
    >
    <el-menu-item index="2-2" @click="clearRoadConditions"
      >清除路况</el-menu-item
    >
  </el-sub-menu>
  <div class="road-tag" v-if="roadTag">
    <el-tag type="info" effect="dark" color="#b22222">拥堵</el-tag>
    <el-tag type="info" effect="dark" color="#ff7f24">缓行</el-tag>
    <el-tag type="info" effect="dark" color="#228b22">畅通</el-tag>
  </div>
</template>

<script setup>
import {  onMounted, inject, toRefs } from 'vue'
import { useQuery } from '../hooks/useQuery'
import { useEventStore } from '../../../stores/event'

let $map
const { Query } = useQuery()
const service = {
  name: 'guanggu',
  layerId: 1
}
const source = new ol.source.Vector({})
const layer = new ol.layer.Vector({
  class: 666,
  name: 'roadCondition',
  source
})
onMounted(() => {
  $map = inject('$map')
})
const { roadTag } = toRefs(useEventStore())
const { setRoadTag } = useEventStore()
const checkRoadConditions = () => {
  Query.queryByLayer({
    service,
    callback: getQueryRes
  })
  setRoadTag(true)
  $map.addLayer(layer)
}
const getQueryRes = e => {
  source.addFeatures(e)
  source.forEachFeature(e => {
    let color
    let flow = e.values_.values_['车流量']
    if (flow < 1000) {
      color = 'rgb(34,139,34)'
    } else if (flow >= 1000 && flow < 1500) {
      color = 'rgb(255,127,36)'
    } else if (flow >= 1500) {
      color = 'rgb(178,34,34)'
    }
    let stateStyle = new ol.style.Style({
      stroke: new ol.style.Stroke({
        color,
        width: 6
      })
    })
    e.setStyle(stateStyle)
  })
}

const clearRoadConditions = () => {
  setRoadTag(false)
  $map.removeLayer(layer)
}
</script>

<style scoped>
.road-tag {
  display: flex;
  gap: 10px;
  position: fixed;
  top: 80px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
