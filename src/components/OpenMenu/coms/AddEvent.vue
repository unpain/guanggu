<template>
  <el-menu-item
    index="5"
    v-permission="['department', 'admin']"
    @click="addEvent"
    >事件添加</el-menu-item
  >
</template>

<script setup>
import { inject } from 'vue'
import { onMounted } from 'vue'
import { useDraw } from '../hooks/useDraw'
import { usePoint } from '../hooks/usePoint'

let $map
let $docLayer
const source = new ol.source.Vector({})
const layer = new ol.layer.Vector({
  source
})

onMounted(() => {
  $map = inject('$map')
  $map.addLayer(layer)
  $docLayer = $map.getLayers().getArray()[1]
})

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

const { Point } = usePoint()
const service = {
  name: 'guanggu',
  layerId: 2
}
var attr = [
  { name: '事件编号', value: 'SJ201812090006', type: 'string' },
  { name: '事件类型', value: '碰撞', type: 'string' },
  { name: '事件等级', value: 3, type: 'int' },
  { name: '发生时间', value: '2018.11.11 9:45', type: 'string' },
  { name: '发生地点', value: '民去大道', type: 'string' },
  { name: '车牌号', value: '鄂A00004', type: 'string' },
  { name: '驾驶员', value: '黄强辉', type: 'string' },
  { name: '处理状态', value: 0, type: 'int' }
]
const handleDraw = e => {
  source.clear()
  $map.removeInteraction(draw)
  var position = e.feature.getGeometry().getCoordinates()
  Point.add({
    position,
    attr,
    service,
    docLayer: $docLayer
  })
}
</script>

<style scoped></style>
