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
  <ThePopup @popup="handlePopup">
    <template #title>摄像头:{{ tableData[0].number }}</template>
    <el-table :data="tableData" border style="width: 200px">
      <el-table-column prop="id">
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
import { ref, inject, onMounted, computed } from 'vue'
import { useQuery } from '../hooks/useQuery'
import ThePopup from './ThePopup.vue'

let $map
const tableData = ref([{ id: '', number: ' ', url: '', location: '' }])

onMounted(() => {
  $map = inject('$map')
})

const { Query } = useQuery()
//查看监控
const checkMonitor = () => {
  $map.on('click', mapClick)
}
//取消查看
const offMonitor = () => {
  $map.un('click', mapClick)
}

const mapClick = e => {
  const position = e.coordinate
  const service = {
    name: 'guanggu',
    layerId: 3
  }
  //点查询
  Query.queryByPnt({
    position,
    service,
    callback: queryRes
  })
}

//popup子组件传过来的用来激活弹窗
let $popup
const handlePopup = popup => {
  $popup = popup
}

const queryRes = e => {
  if (e) {
    console.log(e)
    const position = e[0].getGeometry().flatCoordinates
    $popup.setPosition(position)
    const attr = e[0].values_.values_
    tableData.value[0] = {
      id: attr.ID,
      number: attr['编号'],
      url: attr.URL,
      location: attr['位置']
    }
  } else {
    //点击空白处关闭弹窗
    $popup.setPosition(undefined)
  }
}
</script>

<style scoped>
.video {
  width: 100px;
}
::v-deep .el-table .cell {
  color: #333;
}
::v-deep .el-table .cell span {
  font-weight: 500;
}
</style>
