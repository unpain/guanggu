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
  TiandiMap_cta,
} from '../tianditu_libs/tianditu'
import { onMounted } from 'vue'
onMounted(() => {
  const map = new ol.Map({
    target: 'map',
    layers: [gaode_vector],
    view: new ol.View({
      center: [114.40088809833583, 30.4663210497187],
      zoom: 8,
      projection: 'EPSG:4326',
    }),
  })
  setTimeout(() => {
    map.getView().animate({
      center: [114.40088809833583, 30.4663210497187],
      zoom: 14,
    })
  }, 1000)
  app.provide('$map', map)
})
</script>
<style scoped>
#map {
  width: 100vw;
  height: 100vh;
}
</style>
