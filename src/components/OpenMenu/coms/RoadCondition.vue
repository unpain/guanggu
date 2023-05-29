<template>
  <el-sub-menu index="1" expand-close-icon="none" expand-open-icon="none">
    <template #title>实时路况</template>
    <el-menu-item index="1-1" @click="checkRoadConditions"
      >查看路况</el-menu-item
    >
    <el-menu-item index="1-2" @click="clearRoadConditions"
      >清除路况</el-menu-item
    >
  </el-sub-menu>
</template>

<script setup>
import { onMounted, inject } from 'vue'
import { useQuery } from '../hooks/useQuery'

let $map
const { Query } = useQuery()
const service = {
  name: 'guanggu',
  layerId: 1
}

const source = new ol.source.Vector({})
const layer = new ol.layer.Vector({
  source,
  // style
})
onMounted(() => {
  $map = inject('$map')
  Query.queryByLayer({
    service,
    callback: getQueryRes
  })
})
const getQueryRes = e => {
  source.addFeatures(e)
  source.forEachFeature(e => {
    let color
    let flow = e.values_.values_['车流量']
    if (flow < 1000) {
      color = 'rgb(34,139,34)'
    } else if (flow >= 1000 && flow < 1500) {
      color = 'rgb(255,127,36)'
    } else if (flow >= 1500 ) {
      color = 'rgb(178,34,34)'
    }
    let stateStyle = new ol.style.Style({
      stroke: new ol.style.Stroke({
        color,
        width: 10
      })
    })
    e.setStyle(stateStyle)
  })
}
const checkRoadConditions = () => {
  $map.addLayer(layer)
}
const clearRoadConditions = () => {
  $map.removeLayer(layer)
}
</script>

<style scoped></style>
