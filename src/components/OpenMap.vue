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
import { onMounted,ref,toRefs } from 'vue'


const  docLayer = new Zondy.Map.Doc('', 'guanggu', {});
onMounted(() => {
  const map = new ol.Map({
    target: 'map',
    layers: [gaode_vector,docLayer],
    view: new ol.View({
      center: [114.30, 30.50],
      zoom: 8,
      projection: 'EPSG:4326',
    }),
  })
  setTimeout(() => {
    map.getView().animate({
      center: [114.3750, 30.4897],
      zoom: 14,
    })
  }, 1000)
  app.provide('$map', map)
})

     
</script>
<style scoped>
#map {
  width: 100vw;
  height: calc(100vh - 60px);
  position: fixed;
  bottom: 0;
  
}
</style>
