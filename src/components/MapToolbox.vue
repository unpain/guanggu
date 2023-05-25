<template>
  <el-sub-menu index="10">
    <template #title>工具箱</template>
    <el-menu-item index="10-1" @click="measureLine">测量距离</el-menu-item>
    <el-menu-item index="10-2" @click="measureArea">测量面积</el-menu-item>
    <el-menu-item index="10-2" @click="closeMeasure">关闭测量</el-menu-item>
    <el-menu-item index="10-2" @click="saveImage">导出图片</el-menu-item>
    <el-sub-menu index="10-4">
      <template #title>查询</template>
      <el-menu-item index="10-4-1">item one</el-menu-item>
      <el-menu-item index="10-4-2">item two</el-menu-item>
      <el-menu-item index="10-4-3">item three</el-menu-item>
    </el-sub-menu>
  </el-sub-menu>
  <!-- <div id="mapCon"></div> -->
</template>
<script setup>
import { inject, onMounted } from 'vue'
var $map
var source = new ol.source.Vector({})
var vector = new ol.layer.Vector({
  source: source,
})

onMounted(() => {
  $map = inject('$map')
  console.log($map.getInteractions())

  $map.addLayer(vector)
})
function measureLine() {
  var type = 'LineString'
  measure({ $map, source, type })
}
function measureArea() {
  var type = 'Polygon'
  measure({ $map, source, type })
}
function closeMeasure() {
  source.clear()
  const res = $map.getInteractions().array_[9]
  $map.removeInteraction(res)
  const element = document.querySelectorAll('.tooltip')
  element.forEach(item=>item.remove())
}
function saveImage() {
  $map.once('postcompose', function (event) {
    var canvas = event.context.canvas
    canvas.toBlob(function (blob) {
      saveAs(blob, 'map.png')
    })
  })
  $map.renderSync()
}
</script>

<style scoped>
#mapCon {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 60px;
}
/**
        * 提示框的样式信息
        */
.tooltip {
  position: relative;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  color: white;
  padding: 4px 8px;
  opacity: 0.7;
  white-space: nowrap;
}

.tooltip-measure {
  opacity: 1;
  font-weight: bold;
}

.tooltip-static {
  background-color: #ffcc33;
  color: white;
  border: 1px solid white;
}

.tooltip-measure:before,
.tooltip-static:before {
  border-top: 6px solid rgba(0, 0, 0, 0.5);
  border-right: 6px solid transparent;
  border-left: 6px solid transparent;
  content: '';
  position: absolute;
  bottom: -6px;
  margin-left: -7px;
  left: 50%;
}

.tooltip-static:before {
  border-top-color: #ffcc33;
}
</style>
