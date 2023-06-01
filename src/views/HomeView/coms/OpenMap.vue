<template>
  <div id="map"></div>
</template>
<script setup>
import { app } from '@/main'
import { gaode_vector, gaode_image } from '@/tianditu_libs/gaode'
import {
  TiandiMap_vec,
  TiandiMap_cva,
  TiandiMap_img,
  TiandiMap_cia,
  TiandiMap_ter,
  TiandiMap_cta
} from '@/tianditu_libs/tianditu'
import { onMounted, ref, toRefs } from 'vue'

const docLayer = new Zondy.Map.Doc('', 'guanggu', {})
onMounted(() => {
  const docLayer = new Zondy.Map.Doc('', 'guanggu', {
    crossOrigin: 'Anonymous'
  })
  const map = new ol.Map({
    target: 'map',
    // layers: [gaode_image,gaode_vector, docLayer],
    layers: [gaode_image, gaode_vector, docLayer],
    view: new ol.View({
      center: [114.38, 30.49],
      zoom: 13,
      projection: 'EPSG:4326'
    })
  })
  map.on('pointermove', function (e) {
    var pixel = map.getEventPixel(e.originalEvent)
    var hit = map.hasFeatureAtPixel(pixel)
    map.getTargetElement().style.cursor = hit ? 'pointer' : ''
  })
  app.provide('$map', map)
})
</script>
<style scoped>
#map {
  position: fixed;
  bottom: 0px;
  width: 100vw;
  height: calc(100vh - 60px);
  position: fixed;
  bottom: 0;
}
</style>
