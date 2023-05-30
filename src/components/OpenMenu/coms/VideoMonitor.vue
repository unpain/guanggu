<template>
  <el-sub-menu
    v-permission="['department', 'admin']"
    index="4"
    expand-close-icon="none"
    expand-open-icon="none"
  >
    <template #title>视频监控</template>
    <el-menu-item index="4-1" @click="checkMonitor">查看监控</el-menu-item>
    <el-menu-item index="4-2" @click="offMonitor">取消查看</el-menu-item>
  </el-sub-menu>
  <ThePopup :popupId="'monitor'" @popup="handlePopup">
    <template #title>摄像头:{{ tableData[0].number }}</template>
    <el-table :data="tableData" border style="width: 200px">
      <el-table-column>
        <template #header>
          位置: <span>{{ tableData[0].location }}</span></template
        >
        <template #default>
          <video
            class="video"
            src="../../../data/video/莲花新洲路口正中（190.192.11.133）.mp4"
            controls
            autoplay
            muted
          ></video>
        </template>
      </el-table-column>
    </el-table>
  </ThePopup>
</template>

<script setup>
import { ref, inject, onMounted } from 'vue'
import { useQuery } from '../hooks/useQuery'
import { useMark } from '../hooks/useMark'
import ThePopup from './ThePopup.vue'
import { useEventStore } from '../../../stores/event'

let $map
const markStyle = new ol.style.Style({
  image: new ol.style.Icon({
    anchor: [0.5, 19],
    anchorOrigin: 'top-right',
    anchorXUnits: 'fraction',
    anchorYUnits: 'pixels',
    offsetOrigin: 'top-right',
    //图标缩放比例
    scale: 1.5,
    //透明度
    opacity: 1,
    //图标的url
    src: 'src/assets/images/monitoring.svg'
  }),
  fill: new ol.style.Fill({
    color: 'raba(0,0,0,1)'
  }),
  stroke: new ol.style.Stroke({
    color: 'rgba(255, 255, 255, 1)',
    width: 100
  })
})
const { markLayer, markSource } = useMark()
const tableData = ref([{ id: '', number: '', location: '' }])
const { Query } = useQuery()
const service = {
  name: 'guanggu',
  layerId: 3
}
onMounted(() => {
  $map = inject('$map')
})
//popup子组件传过来的用来激活弹窗
let $popup
const handlePopup = popup => {
  $popup = popup
}

const { getMapEvent } = useEventStore()
//查看监控
const checkMonitor = () => {
  Query.queryByLayer({
    service,
    callback: res => {
      markLayer.setStyle(markStyle)
      markSource.addFeatures(res)
    }
  })
  $map.addLayer(markLayer)
  let eventKey = $map.on('click', mapClick)
  getMapEvent(eventKey)
}
//取消查看
const offMonitor = () => {
  $map.un('click', mapClick)
  $map.removeLayer(markLayer)
}
const mapClick = e => {
  const feature = $map.forEachFeatureAtPixel(e.pixel, function (feature) {
    return feature
  })
  if (feature) {
    const position = feature.getGeometry().flatCoordinates
    $popup.setPosition(position)
    const fids = [feature.id_]
    Query.queryByFID({
      fids,
      service,
      callback: getQueryRes
    })
  }
}
const getQueryRes = e => {
  // 点查询返回的数据
  const attr = e[0].values_.values_
  tableData.value[0] = {
    id: attr.ID,
    number: attr['编号'],
    location: attr['位置']
  }
}
</script>

<style scoped>
.video {
  width: 100px;
}
:deep .el-table .cell {
  color: #333;
}
:deep .el-table .cell span {
  font-weight: 500;
}
</style>
