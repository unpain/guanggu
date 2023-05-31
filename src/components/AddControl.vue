<template>
  <div id="mouse-position"></div>
  <i class="iconfont icon-tuceng" @click="toggleLayer"></i>
  <div class="change-layer" style="display: none">
    <img
      src="../assets/images/vector.png"
      alt=""
      class="pic"
      @click="displayVector"
    />
    <img
      src="../assets/images/image.png"
      alt=""
      class="pic"
      @click="displayImage"
    />
  </div>
</template>
<script setup>
import { watch, ref } from 'vue'
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
    extent: [114.2564, 30.4312, 114.5035, 30.5488]
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
    undefinedHTML: '&nbsp;'
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
    units: 'metric'
  })
  $map.addControl(scaleLineControl)
}
function overviewMapControl() {
  var overviewMapControl = new ol.control.OverviewMap({
    //鹰眼控件样式（see in overviewmap-custom.html to see the custom CSS used）
    className: 'ol-overviewmap ol-custom-overviewmap',
    //鹰眼中加载同坐标系下不同数据源的图层
    layers: [gaode_image, gaode_vector],

    //鹰眼控件展开时功能按钮上的标识（网页的JS的字符编码）
    collapseLabel: '\u00BB',
    //鹰眼控件折叠时功能按钮上的标识（网页的JS的字符编码）
    label: '\u00AB',
    //初始为展开显示方式
    collapsed: false,
    view: new ol.View({
      projection: 'EPSG:4326',
      minZoom: 8,
      maxZoom: 18
    })
  })
  $map.addControl(overviewMapControl)
}
let isVisible = ref(true)
// 展示矢量图层
function displayVector() {
  isVisible.value = true
}
// 展示影像图层
function displayImage() {
  isVisible.value = false
}
// 监听器,监听图层是否变化
watch(
  isVisible,
  () => {
    let res = $map.getLayers().getArray()
    let imageLayer = res[0]
    let vectorLayer = res[1]
    vectorLayer.setVisible(isVisible.value)
    imageLayer.setVisible(!isVisible.value)
  },
  {
    immediate: false
  }
)
// 控制图层的显隐
function toggleLayer() {
  var layerDiv = document.querySelector('.change-layer')
  if (layerDiv.style.display === 'none') {
    layerDiv.style.display = 'block' // 显示
  } else {
    layerDiv.style.display = 'none' // 隐藏
  }
}
</script>
<style scoped>
@import url('https://at.alicdn.com/t/c/font_4027375_tr6z98gbjj.css');
/* 鼠标位置控件层样式设置 */
#mouse-position {
  position: fixed;
  left: 5px;
  bottom: 50px;
  width: 150px;
  height: 25px;
  color: #fff;
  text-align: center;
  line-height: 25px;
  border: 1px solid #fff;
  border-radius: 10px;
  background-color: rgba(114, 161, 219, 0.7);

  /*在地图容器中的层，要设置z-index的值让其显示在地图上层*/
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
.iconfont {
  position: fixed;
  top: 80px;
  right: 30px;
  font-size: 40px;
  color: #000;
  cursor: pointer;
}
.change-layer {
  position: fixed;
  top: 80px;
  right: 60px;
}
.change-layer .pic {
  width: 100px;
  height: 100px;
  margin-right: 10px;
  cursor: pointer;
}
</style>
