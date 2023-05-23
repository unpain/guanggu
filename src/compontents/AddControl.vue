<template>
    <div id="mouse-position"></div>
</template>
<script setup>
import { gaode_image, gaode_vector } from '../tianditu_libs/gaode'
import { inject, onMounted } from 'vue'
let $map
onMounted(() => {
  $map = inject('$map')
  navControl()
  mousePositionControl()
  zoomslider()
  scaleLineControl()
  overviewMapControl()
})
// 添加导航控件
function navControl() {
  const navControl = new ol.control.ZoomToExtent({
    extent: [114.3364, 30.439, 114.4653, 30.4983],
  })
  $map.addControl(navControl)
}
// 添加鼠标位置控件
function mousePositionControl() {
  var mousePositionControl = new ol.control.MousePosition({
    //坐标格式
    coordinateFormat: ol.coordinate.createStringXY(4),
    //地图投影坐标系（若未设置则输出为默认投影坐标系下的坐标）
    projection: 'EPSG:4326',
    //坐标信息显示样式类名，默认是'ol-mouse-position'
    className: 'custom-mouse-position',
    //显示鼠标位置信息的目标容器
    target: document.getElementById('mouse-position'),
    //未定义坐标的标记
    undefinedHTML: '&nbsp;',
  })
  $map.addControl(mousePositionControl)
}
// 添加缩放控件
function zoomslider() {
  var zoomslider = new ol.control.ZoomSlider()
  $map.addControl(zoomslider)
}
// 添加比例尺控件
function scaleLineControl() {
  var scaleLineControl = new ol.control.ScaleLine({
    //设置比例尺单位，degrees、imperial、us、nautical、metric（度量单位）
    units: 'metric',
  })
  $map.addControl(scaleLineControl)
}
function overviewMapControl() {
  var overviewMapControl = new ol.control.OverviewMap({
    //鹰眼控件样式（see in overviewmap-custom.html to see the custom CSS used）
    className: 'ol-overviewmap ol-custom-overviewmap',
    //鹰眼中加载同坐标系下不同数据源的图层
    layers: [ gaode_vector],

    //鹰眼控件展开时功能按钮上的标识（网页的JS的字符编码）
    collapseLabel: '\u00BB',
    //鹰眼控件折叠时功能按钮上的标识（网页的JS的字符编码）
    label: '\u00AB',
    //初始为展开显示方式
    collapsed: false,
    view: new ol.View({
      projection: 'EPSG:4326',
      minZoom: 8,
      maxZoom: 18,
    }),
  })
  $map.addControl(overviewMapControl)
}
</script>
<style scoped>
/* 鼠标位置控件层样式设置 */
#mouse-position {
  position: fixed;
  left: 150px;
  bottom: 5px;
  width: 200px;
  height: 20px;
  /*在地图容器中的层，要设置z-index的值让其显示在地图上层*/
  z-index: 2000;
}
/* 鼠标位置信息自定义样式设置 */
.custom-mouse-position {
  color: rgb(0, 0, 0);
  font-size: 16px;
  font-family: '微软雅黑';
}

.ol-overviewmap {
    right: 0.5em;
    bottom: 0.5em;
}
</style>
