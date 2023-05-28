<template>
  <div id="map"></div>
</template>
<script setup>
import { app } from '../main'
import { gaode_vector, gaode_image } from '../tianditu_libs/gaode'
import {
  TiandiMap_vec,
  TiandiMap_cva,
  TiandiMap_img,
  TiandiMap_cia,
  TiandiMap_ter,
  TiandiMap_cta
} from '../tianditu_libs/tianditu'
import { onMounted, ref, toRefs } from 'vue'

const docLayer = new Zondy.Map.Doc('', 'guanggu', {})
onMounted(() => {
  const docLayer = new Zondy.Map.Doc('', 'guanggu', {
    crossOrigin: 'Anonymous'
  })
  const map = new ol.Map({
    target: 'map',
    // layers: [gaode_image,gaode_vector, docLayer],
    layers: [gaode_vector, gaode_image, docLayer],
    view: new ol.View({
      center: [114.38, 30.49],
      zoom: 13,
      projection: 'EPSG:4326'
    })
  })
  // setTimeout(() => {
  //   map.getView().animate({
  //     center: [114.40088809833583, 30.4663210497187],
  //     zoom: 14,
  //   })
  // }, 1000)
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
