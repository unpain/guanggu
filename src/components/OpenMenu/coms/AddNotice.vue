<template>
  <el-menu-item index="8" v-permission="['user']">查看公告</el-menu-item>
  <el-sub-menu index="8" expand-close-icon="none" expand-open-icon="none">
    <template #title>公告管理</template>
    <el-menu-item index="8-1" v-permission="['department', 'admin']" @click="startDrawBuffer">发布公告</el-menu-item>
    <el-menu-item index="8-2" v-permission="['department', 'admin']" @click="viewNotice">查看公告</el-menu-item>
  </el-sub-menu>
  <el-card v-if="addNoticeVisible"
    :style="{ width: '800px', hieght: '800px', position: 'fixed', top: '20%', left: '50%', transform: 'translate(' + '-50%,' + '0)', 'z-index': '100', textAlign: 'center' }">
    <el-icon :style="{ position: 'fixed', right: '30px', cursor: 'pointer' }" size="20" @click="cancelSubmitNotice">
      <CloseBold />
    </el-icon>
    <div class="title" :style="{ 'padding-bottom': '20px' }"><span>发布公告</span></div>
    <el-table :data="tableData" :style="{ 'min-height': '300px' }" :cell-style="{ height: '43px' }" border="true">
      <el-table-column prop="name" label="影响地点" resizable="true" align="center"></el-table-column>
      <el-table-column prop="tel" label="电话" resizable="true" align="center"></el-table-column>
    </el-table>
    <el-pagination :current-page="currentPage" :page-sizes="[5, 10]" :page-size="pageSize"
      layout="sizes, prev, pager, next, jumper" :total="totalAddr" @size-change="handleSizeChangeOfAddr"
      @current-change="handleCurrentChangeOfAddr"></el-pagination>
    <div class="input-container"
      :style="{ display: 'flex', flexDirection: 'column', marginTop: '20px', marginBottom: '20px', justifyContent: 'center', alignItems: 'center', gap: '20px' }">
      <el-input v-model="title" placeholder="请输入公告名称"></el-input>
      <el-input v-model="content" :rows="6" type="textarea" placeholder="请输入公告内容"></el-input>
    </div>
    <div class="button-group" :style="{ display: 'flex', justifyContent: 'start', alignItems: 'center' }">
      <el-button @click="issueNotice" color="#5aabfc" size="large" :dark="isDark" plain>发布</el-button>
      <el-button @click="cancelSubmitNotice" color="#ff5353" size="large" :dark="isDark" plain>取消</el-button>
    </div>
  </el-card>
  <el-card v-if="viewNoticeVisible" :stripe="true"
    :style="{ width: '1200px', hieght: '800px', position: 'fixed', top: '20%', left: '50%', transform: 'translate(' + '-50%,' + '0)', 'z-index': '100', textAlign: 'center' }">
    <el-icon :style="{ position: 'fixed', right: '30px', cursor: 'pointer' }" size="20" @click="closeNoticeTable">
      <CloseBold />
    </el-icon>
    <el-text :style="{ 'text-align': center,fontSize:'20px' }">公告详情</el-text>
    <el-table :data="tableData" height="600" :style="{ 'min-height': '300px', width: '1100px',marginTop:'20px' }" :border="true"
      :cell-style="{ height: '100px', fontSize: '20px' }">
      <el-table-column type="expand" :border="true">
        <template #default="props">
          <div m="4"
            :style="{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'start', gap: '20px' }">
            <div class="content" :style="{ width: '1100px' }">
              <h3 :style="{ marginLeft: '20px' }">公告内容:<br></h3>
              <p m="t-0 b-2" :style="{ marginLeft: '20px', wordWrap: 'break-word', fontWeight: 'normal' }">{{
                props.row.notice_content }}</p>
            </div>
            <h3 :style="{ marginLeft: '20px', width: '50%', fontWeight: 'bold' }">影响地点:<br>
              <el-table :data="props.row.notice_addr" :style="{ fontWeight: 'normal', color: '#000' }" :border="true"
                :row-style="{ backgroundColor: '#fabef5' }"
                :header-cell-style="{ backgroundColor: '#81c5fc', color: '#000' }">
                <el-table-column label="地点" prop="name" :border="true" />
                <el-table-column label="电话" prop="tel" :border="true" />
              </el-table>
            </h3>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="notice_title" label="标题" resizable="true" align="center" :border="true"></el-table-column>
      <el-table-column prop="notice_time" label="电话" resizable="true" align="center" :border="true"></el-table-column>
    </el-table>
    <el-pagination :current-page="currentPage" :page-sizes="[5, 10]" :page-size="pageSize"
      layout="sizes, prev, pager, next, jumper" :total="totalNotice" @size-change="handleSizeChangeOfNotice"
      @current-change="handleCurrentChangeOfNotice" :style="{ marginTop: '20px' }"></el-pagination>
  </el-card>
</template>
<script setup>
import { onMounted, inject, toRefs, ref, watch } from 'vue';
import { createDraw } from '@/untils/createDraw';
import { Buffer } from '@/untils/Buffer'
import { useNoticeStore } from '@/stores/notice'
import { postNoticeApi, getNoticeApi, deleteNoticeApi } from '@/api/notice'
import { computed } from 'vue';
import { ElMessage } from 'element-plus';
let { addrArr, noticeArr } = toRefs(useNoticeStore())
let draw
let $map
let addNoticeVisible = ref(false)
let viewNoticeVisible = ref(false)
let currentPage = ref(1) // 当前页数
let pageSize = ref(5) // 每页显示的条数
let totalAddr = ref(0) // 总条数
let totalNotice = ref(0) // 总条数
let tableData = ref([]) // 表格数据
let title = ref('')
let content = ref('')
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

const showNotice = () => {
  fetchAddr()
  addNoticeVisible.value = true
}

const viewNotice = () => {
  getNoticeApi().then(res => {
    noticeArr.value = res.data.notice
    fetchNotice()
    viewNoticeVisible.value = true
  })
}

function handleDraw(e) {
  $map.removeInteraction(draw)
  const points = e.feature.getGeometry().getCoordinates();
  const arc_points = points.map((item) => {
    return new Zondy.Object.Point2D(item[0], item[1]);
  });
  Buffer.singleBuffAnalysis({ radius: 0.001, arc_points: arc_points, $map: $map, arr: addrArr.value, loadData: showNotice })
}

const handleSizeChangeOfAddr = val => {
  pageSize.value = val
  fetchAddr()
}
const handleCurrentChangeOfAddr = val => {
  currentPage.value = val
  fetchAddr()
}
const handleSizeChangeOfNotice = val => {
  pageSize.value = val
  fetchNotice()
}
const handleCurrentChangeOfNotice = val => {
  currentPage.value = val
  fetchNotice()
}
const fetchAddr = () => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  const items = addrArr.value.slice(start, end)
  totalAddr.value = addrArr.value.length
  tableData.value = items
}

const fetchNotice = () => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  const items = noticeArr.value.slice(start, end)
  totalNotice.value = noticeArr.value.length
  tableData.value = items
}

const cancelSubmitNotice = () => {
  addrArr.value = []
  addNoticeVisible.value = false
}

const issueNotice = () => {
  let id = Number(JSON.parse(localStorage.getItem('userPermission')).userId)
  postNoticeApi({
    id: id,
    title: title.value,
    content: content.value,
    addr: addrArr.value.map(item => { return { name: item.name, tel: item.tel } }),
    time: time.value
  }).then(res => {
    if (res.data.status === 'success') {
      addrArr.value = []
      addNoticeVisible.value = false
      ElMessage.success('发布公告成功!')
    }
  })
}

const closeNoticeTable = () => {
  viewNoticeVisible.value = false
  noticeArr.value = []
}

const time = computed((time = +new Date()) => {
  var date = new Date(time + 8 * 3600 * 1000); // 增加8小时
  return date.toJSON().substr(0, 19).replace('T', ' ');
})
watch(addrArr, () => {
  totalAddr.value = addrArr.value.length
  fetchAddr()
})
watch(noticeArr, () => {
  totalNotice.value = noticeArr.value.length
  fetchNotice()
})
onMounted(() => {
  $map = inject('$map');
  $map.addLayer(layer);
});
</script>
<style scoped>
i {
  color: #81c5fc;
}
</style>
