<template>
  <el-input
    v-model="keyword"
    placeholder="请输入查询的交通事故信息"
    class="input-with-select"
  >
    <template #append>
      <el-button @click="queryByAttribute">查询</el-button>
    </template>
  </el-input>
  <ThePopup :popupId="'1011'" @popup="handlePopup">
    <template #title>事件详细信息</template>
    <table>
      <tr v-for="(value, key) in eventListData">
        <th>{{ key }}</th>
        <td>{{ value }}</td>
      </tr>
    </table>
  </ThePopup>
</template>
<script setup>
import { onMounted, inject, ref, toRefs } from 'vue'
import { Query } from '../untils/Query'
import { setCanvas } from '../untils/setCanvas'
import { useEventStore } from '@/stores/event'

import ThePopup from './OpenMenu/coms/ThePopup.vue'
let { clickEvent } = toRefs(useEventStore())
let $popup
const eventListData = ref({})

Query.queryByLayer({
  service: {
    name: 'guanggu',
    layerId: 2
  },
  callback: handleAllFeature
})
function handleAllFeature(res) {
  let arr = res.map(item => {
    return item.values_.values_
  })
}

let type = JSON.parse(localStorage.getItem('userPermission')).permission
let keyword = ref([])

function queryByAttribute() {
  var queryStruct = new Zondy.Service.QueryFeatureStruct()

  queryStruct.IncludeGeometry = true

  queryStruct.IncludeAttribute = true

  queryStruct.IncludeWebGraphic = false

  var queryParam = new Zondy.Service.QueryParameter({
    resultFormat: 'json',
    struct: queryStruct
  })

  queryParam.pageIndex = 0

  queryParam.recordNumber = 2000

  var condition
  if (type == 'user') {
    condition =
      "处理状态 != 2 AND (事件类型 LIKE '%" +
      keyword.value +
      "%' OR 发生地点 LIKE '%" +
      keyword.value +
      "%')"
  } else {
    condition =
      "发生地点 LIKE '%" +
      keyword.value +
      "%' OR 事件类型 LIKE '%" +
      keyword.value +
      "%'OR 发生时间 LIKE '%" +
      keyword.value +
      "%'OR 驾驶员 LIKE '%" +
      keyword.value +
      "%'"
  }
  queryParam.where = condition

  var queryService = new Zondy.Service.QueryDocFeature(
    queryParam,
    'guanggu',
    2,
    {}
  )

  queryService.query(querySuccess, queryError)
}
let map
let source
let layer

onMounted(() => {
  map = inject('$map')
  source = new ol.source.Vector({})
  layer = new ol.layer.Vector({
    source,
    id: 777
  })
  map.addLayer(layer)
})

function querySuccess(res) {
  if (keyword.value == '') {
  } else {
    source.clear()
    /* 将查询的数据转化为需要的数据 */
    var format = new Zondy.Format.PolygonJSON()
    var ol_features = format.read(res)

    if (ol_features != null) {
      let canvas = setCanvas(map)
      let style1 = new ol.style.Style({
        image: new ol.style.Icon({
          img: canvas,
          imgSize: [canvas.width, canvas.height]
        })
      })

      source.addFeatures(ol_features)
      layer.setStyle(style1)

      let setPosit = map.on('click', function (event) {
        var pixel = event.pixel
        // 检查坐标位置是否有要素
        map.forEachFeatureAtPixel(pixel, function (feature, layer) {
          // 处理被点击的要素
          eventListData.value = feature.values_.values_
          if (type == 'user') {
            delete eventListData.value.mpLayer
            delete eventListData.value.事件类型
            delete eventListData.value.车牌号
            delete eventListData.value.驾驶员
          }
          let position = feature.getGeometry().flatCoordinates
          $popup.setPosition(position)
        })
      })
      clickEvent.value = setPosit
    }
  }

  keyword.value = ''
}
function queryError(res) {}

const handlePopup = popup => {
  $popup = popup
}
</script>
<style scoped>
table {
  border-spacing: 0;
  border: 1px solid #ebeef5;
  border-collapse: separate;
}
th,
td {
  border: 1px solid #ebeef5;
  padding: 8px 15px;
}
.el-menu--horizontal > .el-menu-item.is-active {
  border-bottom: none;
}
.el-menu--horizontal > .el-menu-item {
  margin: 0 20px;
  padding: 0;
}
</style>
