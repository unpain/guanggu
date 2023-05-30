<!-- @format -->

<template>
  <el-button @click="setOption(monthlyStatistics)" type="success"
    >按月份统计</el-button
  >
  <el-button @click="setOption(eventTypes)" type="success"
    >按类型统计</el-button
  >
  <div id="main" style="width: 600px; height: 400px"></div>
</template>
<script setup>
import * as echarts from 'echarts';
import { onMounted, watch, ref } from 'vue';
var chartDom;
var myChart;
const option = ref({});
const props = defineProps({
  monthlyStatistics: {
    type: Array,
  },
  eventTypes: {
    type: Array,
  },
  eventNumber: {
    type: Number,
  },
});
watch(
  option,
  () => {
    myChart.setOption(option.value);
  },
  { deep: true }
);
watch(props, () => {
  option.value = {
    title: {
      text: `交通事故   (${props.eventNumber}起)`,
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'vertical',
      left: 'right',
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: props.eventTypes,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };
  myChart.setOption(option.value);
});

onMounted(() => {
  chartDom = document.getElementById('main');
  myChart = echarts.init(chartDom);

  option.value;

  myChart.setOption(option.value);
});
function setOption(a) {
  option.value = {
    title: {
      text: `交通事故   (${props.eventNumber}起)`,
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'vertical',
      left: 'right',
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: a,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };
}
</script>
<style scoped></style>
