<!-- @format -->

<template>
  <el-menu-item
    @click="queryEvent"
    index="6"
    v-permission="['department', 'admin']"
    >事件查询</el-menu-item
  >
  <!-- 查询事件表格组件 -->
  <!-- 下面三个函数监听子组件的之定义事件 -->
  <EventList
    @handleEventDiagram="creatEventDiagram"
    @handleHeatMap="creatHeatMap"
    @sourceClear="clearAllSource"
    :queryData="queryData[0]"
  ></EventList>
  <el-dialog style="width:650px ;" v-model="dialogTableVisible" title="事件统计图">
    <!-- Echarts图表组件 -->
    <EventDiagram
      :eventTypes="eventTypes"
      :monthlyStatistics="monthlyStatistics"
      :eventNumber="eventNumber"
    ></EventDiagram>
  </el-dialog>
</template>
<script setup>

import { ElMessage } from 'element-plus'
import { ref, onMounted, inject,h } from 'vue';
import { createDraw } from '../untils/createDraw';
import { Query } from '../untils/Query';
import EventList from '../components/EventList.vue';
import EventDiagram from '../components/EventDiagram.vue';
import {getEchartsData} from '../components/OpenMenu/hooks/getEchartsData'
import {useMark} from '../components/OpenMenu/hooks/useMark'
let {markSource,markLayer,setStyle}=useMark()
let queryData = ref([]);
const dialogTableVisible = ref(false);
var source = new ol.source.Vector({});
var heatMapsource = new ol.source.Vector({});
let eventNumber=ref(0)
var layer = new ol.layer.Vector({
  source,
});
let draw = null;
let $map;
const eventData = ref([]);
const eventTypes = ref([]);
const monthlyStatistics = ref([]);
let arr = ref([]);
onMounted(() => {
  $map = inject('$map');
  $map.addLayer(layer);

});
/* 激活查询事件创建画笔 */
function queryEvent() {
  if ($map.getInteractions().array_.length == 9) {
    draw = createDraw({
      type: 'Box',
      source,
      callback: handleDraw,
    });

    $map.addInteraction(draw);
  }
}
/* 消息提示 */

const open = () => {
   ElMessage({
    message: '该区域未发生过交通事故',
    type: 'success',
  })
}

/* 获取查询事件的要素 */
function handleDraw(feature) {
  queryData.value = [];
  $map.removeInteraction(draw);
  source.clear();
  arr.value = [];
  arr = [
    {
      name: 'guanggu',
      layerId: 2,
    },
  ];
  arr.map((item) => {
    Query.queryByGeom({
      feature,
      service: item,
      callback: handleQuery,
    });
  });
}
/*  将查询的要素放入queryData中，绑定给 <EventList>组件进行列表渲染*/
function handleQuery(res) {
  if (res) {
    queryData.value.push(res.map((item) => item.values_.values_));
    markSource.addFeatures(res)
    setStyle()
      $map.addLayer(markLayer);
  } else {
    open()
    queryData.value.push(null);
  }
}
function clearAllSource() {
  source.clear();
  heatMapsource.clear();
  markSource.clear();
}
/* 创建热力图 */
function creatHeatMap() {
  clearAllSource()
  Query.queryByLayer({
    service: {
      name: 'guanggu',
      layerId: 2,
    },
    callback: handleQueryFeature,
  });
  var vector = new ol.layer.Heatmap({
    //矢量数据源（读取本地的KML数据）
    source: heatMapsource,
    //热点半径
    radius: parseInt(10, 10),
    //模糊尺寸
    blur: parseInt(8, 10),
  });
  $map.addLayer(vector);
}
/* 给力图层添加要素 */
function handleQueryFeature(res) {
  heatMapsource.addFeatures(res);
}

/* 创建echarts图表函数 ，获取所有的要素*/
function creatEventDiagram(a) {
  dialogTableVisible.value = a;
  source.clear();
  Query.queryByLayer({
    service: {
      name: 'guanggu',
      layerId: 2,
    },
    callback: handleAllFeature,
  });
}
/* 获取所有的事件要素 */
function handleAllFeature(res) {
  eventData.value = res;
  eventNumber.value=res.length
  let arr = eventData.value.map((item) => {
    item.values_.values_;
    return {
      事件类型: item.values_.values_.事件类型,
      发生时间: item.values_.values_.发生时间,
    };
  });
  /* 将数据转化为按月统计和按事件类型统计所需要的数据给是，传递给 <EventDiagram>组件进行渲染 */
  let {eventType,monthlyStatistic}=getEchartsData(arr)
   eventTypes.value = eventType;
   monthlyStatistics.value = monthlyStatistic;
}

</script>
<style scoped>
 
</style>
