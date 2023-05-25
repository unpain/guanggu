<template>
  <div id="mapCon">
    <div id="menu">
      <label>Geometry type &nbsp;</label>
      <button @click="measureLine">测量距离</button>
      <button @click="measureArea">测量面积</button>
      <select id="type">
        <option value="length">Length</option>
        <option value="area">Area</option>
      </select>
    </div>
  </div>
</template>
<script setup>
import { inject, onMounted, ref } from 'vue'
var $map
var source = new ol.source.Vector({})
var vector = new ol.layer.Vector({
  source: source,
})
onMounted(() => {
  $map = inject('$map')
  

  $map.addLayer(vector)
})
function measureLine() {
  var type = 'LineString'
  measure({ $map, source ,type})
}
function measureArea() {
  var type = 'Polygon'
  measure({ $map, source,type })
}
</script>

<style scoped>
#mapCon {
  width: 100%;
  height: 95%;
  position: relative;
}

#menu {
  float: left;
  position: absolute;
  bottom: 10px;
  left: 10px;
  /* z-index: 2000; */
}

.checkbox {
  left: 20px;
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
  color: black;
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
