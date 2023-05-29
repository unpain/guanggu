<template>
  <el-menu-item index="8" v-permission="['department', 'admin']" @click="startDrawBuffer">发布公告</el-menu-item>
  <el-card >
    
  </el-card>
</template>
<script setup>
import { onMounted, inject, toRefs } from 'vue';
import { createDraw } from '@/untils/createDraw';
import { Buffer } from '@/untils/Buffer'
import { useNoticeStore } from '@/stores/notice'
let { noticeArr } = toRefs(useNoticeStore())
let draw
let $map
let source = new ol.source.Vector({})
let layer = new ol.layer.Vector({
  source: source
})
const startDrawBuffer = () => {
  draw = createDraw({
    type: 'LineString',
    source,
    callback: handleDraw
  })
  $map.addInteraction(draw)
}

function handleDraw(e) {
  $map.removeInteraction(draw)
  const points = e.feature.getGeometry().getCoordinates();
  const arc_points = points.map((item) => {
    return new Zondy.Object.Point2D(item[0], item[1]);
  });
  Buffer.singleBuffAnalysis({ radius: 0.001, arc_points: arc_points, $map: $map, arr: noticeArr.value });
}

onMounted(() => {
  $map = inject('$map');
  $map.addLayer(layer);
});
</script>
<style scoped>
</style>
