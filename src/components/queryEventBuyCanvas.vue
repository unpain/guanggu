<!-- @format -->

<template>
  <el-menu-item
    @click="queryEvent"
    index="6"
    v-permission="['department', 'admin']"
    >事件查询</el-menu-item
  >
  <EventList
    @handleEventDiagram="creatEventDiagram"
    @handleHeatMap="creatHeatMap"
    @sourceClear="clearAllSource"
    :queryData="queryData[0]"
  ></EventList>
  <el-dialog v-model="dialogTableVisible" title="事件统计图">
    <EventDiagram
      :eventTypes="eventTypes"
      :monthlyStatistics="monthlyStatistics"
    ></EventDiagram>
  </el-dialog>
</template>
<script setup>
import { ref, onMounted, inject } from 'vue'
import { createDraw } from '../untils/createDraw'
import { Query } from '../untils/Query'
import EventList from '../components/EventList.vue'
import EventDiagram from '../components/EventDiagram.vue'
let queryData = ref([])
const dialogTableVisible = ref(false)

var source = new ol.source.Vector({})
var heatMapsource = new ol.source.Vector({})
var layer = new ol.layer.Vector({
  source
})
let draw = null
let $map
const eventData = ref([])
const eventTypes = ref([])
const monthlyStatistics = ref([])
let arr = ref([])
onMounted(() => {
  $map = inject('$map')
  $map.addLayer(layer)
})
function queryEvent() {
  draw = createDraw({
    type: 'Box',
    source,
    callback: handleDraw
  })
  $map.addInteraction(draw)
}
function handleDraw(feature) {
  queryData.value = []
  $map.removeInteraction(draw)
  source.clear()
  arr.value = []
  arr = [
    {
      name: 'guanggu',
      layerId: 2
    }
  ]
  arr.map(item => {
    Query.queryByLayer({
      feature,
      service: item,
      callback: handleQuery
    })
  })
}
function handleQuery(res) {
  if (res) {
    queryData.value.push(res.map(item => item.values_.values_))
  } else {
    queryData.value.push(null)
  }
}
function handleQueryFeature(res) {
  heatMapsource.addFeatures(res)
}
function handleAllFeature(res) {
  eventData.value = res
  let arr = eventData.value.map(item => {
    item.values_.values_
    return {
      事件类型: item.values_.values_.事件类型,
      发生时间: item.values_.values_.发生时间
    }
  })
  const result = Object.entries(
    arr.reduce((acc, curr) => {
      if (acc[curr.事件类型]) {
        acc[curr.事件类型]++
      } else {
        acc[curr.事件类型] = 1
      }
      return acc
    }, {})
  ).map(([name, value]) => ({
    name,
    value
  }))

  eventTypes.value = result

  const result1 = arr.reduce((acc, curr) => {
    const date = new Date(curr.发生时间)
    const month = date.getMonth() + 1 // 因为月份是从0开始，需要加1
    if (acc[month]) {
      acc[month]++
    } else {
      acc[month] = 1
    }
    return acc
  }, {})

  const eventCountsArray = Object.entries(result1).map(([name, value]) => {
    return { name, value }
  })

  monthlyStatistics.value = eventCountsArray
}
function clearAllSource() {
  source.clear()
  heatMapsource.clear()
}
function creatHeatMap() {
  source.clear()
  Query.queryByLayer({
    service: {
      name: 'guanggu',
      layerId: 2
    },
    callback: handleQueryFeature
  })
  var vector = new ol.layer.Heatmap({
    //矢量数据源（读取本地的KML数据）
    source: heatMapsource,
    //热点半径
    radius: parseInt(10, 10),
    //模糊尺寸
    blur: parseInt(8, 10)
  })
  $map.addLayer(vector)
}
function creatEventDiagram(a) {
  dialogTableVisible.value = a
  source.clear()
  Query.queryByLayer({
    service: {
      name: 'guanggu',
      layerId: 2
    },
    callback: handleAllFeature
  })
}
</script>
<style scoped></style>
