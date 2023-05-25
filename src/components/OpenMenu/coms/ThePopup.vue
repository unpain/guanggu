<template>
  <!-- popup弹窗 -->
  <div id="popup" class="ol-popup">
    <header>
      <slot name="title"></slot>
      <a
        href="#"
        id="popup-closer"
        class="ol-popup-closer"
        @click="closePopup"
      ></a>
    </header>
    <div id="popup-content">
     
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { onMounted, inject, defineEmits } from 'vue'

let popup
const emit = defineEmits(['popop'])
onMounted(() => {
  const $map = inject('$map')
  var container = document.getElementById('popup')
  popup = new ol.Overlay({
    //要转换成overlay的HTML元素
    element: container,
    //当前窗口可见
    autoPan: true,
    //Popup放置的位置
    positioning: 'bottom-center',
    //是否应该停止事件传播到地图窗口
    stopEvent: true,
    autoPanAnimation: {
      //当Popup超出地图边界时，为了Popup全部可见，地图移动的速度
      duration: 250
    }
  })
  $map.addOverlay(popup)
  emit('popup', popup)
})

// 添加关闭按钮的单击事件（隐藏popup）
const closePopup = () => {
  popup.setPosition(undefined)
  //失去焦点
  //   closer.blur()
}
</script>

<style scoped>
.ol-popup {
  position: absolute;
  background-color: white;
  -webkit-filter: drop-shadow(0 1px 4px rgba(0, 0, 0, 0.2));
  filter: drop-shadow(0 1px 4px rgba(0, 0, 0, 0.2));
  border-radius: 5px;
  border: 1px solid #cccccc;
  bottom: 30px;
  left: -50px;
  white-space: nowrap;
  /* overflow: hidden; */
  z-index: 999;
  box-shadow: 1px 1px 1px ;
}
header {
  padding: 8px;
  background: #1f98ee;
  font-size: 14px;
  font-family: '微软雅黑';
  color: #fff;
  border-radius: 5px 5px 0 0 ;
}
.ol-popup:after,
.ol-popup:before {
  top: 100%;
  border: solid transparent;
  content: ' ';
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
}
.ol-popup:after {
  border-top-color: white;
  border-width: 10px;
  left: 48px;
  margin-left: -10px;
  z-index: 999;
}
.ol-popup:before {
  border-top-color: #cccccc;
  border-width: 11px;
  left: 48px;
  margin-left: -11px;
}
.ol-popup-closer {
  text-decoration: none;
  position: absolute;
  top: 8px;
  right: 8px;
}
.ol-popup-closer:after {
  content: '✖';
  color: #fff;
}
#popup-content {
  padding: 15px;
  font-size: 14px;
  font-family: '微软雅黑';
}
</style>
