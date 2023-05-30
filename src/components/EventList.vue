<!-- @format -->

<template>
  <el-drawer
    v-model="drawer"
    direction="btt"
    :close-on-click-modal="false"
    :modal="false"
    :show-close="false"
    :with-header="false"
    :size="active ? '55%' : '12%'"
     :append-to-body="false"
    style="width: 75%; margin: 0 auto; min-width: 1000px;"
  >
    <div class="button">
      <div class="item">
        <el-button
          @click="creatHeatMap"
          type="success"
          style="margin-left: 16px"
        >
          生成事件热力图 </el-button
        ><el-button
          @click="creatEventDiagram"
          type="primary"
          style="margin-left: 10px"
        >
          生成事件统计表
        </el-button>
      </div>
      <div class="item">
        <el-button
          type="success"
          :class="active ? 'dispppear' : ''"
          @click="setActive"
          style="margin-left: 16px"
        >
          <el-icon><ArrowUpBold /></el-icon>
        </el-button>
        <el-button
          type="success"
          :class="active ? '' : 'dispppear'"
          @click="setActive"
          style="margin-left: 16px"
        >
          <el-icon><ArrowDownBold /></el-icon
        ></el-button>
        <el-button
          type="primary"
          @click="setTableDisappear"
          style="margin-left: 10px"
        >
          <el-icon><CloseBold /></el-icon>
        </el-button>
      </div>
    </div>
    <div :class="active ? 'container' : 'dispppear'">
      <div class="example-pagination-block">
        <div class="example-demonstration">
          <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column
              v-for="(value, key) in arr"
              :prop="key"
              :label="key"
            />
          </el-table>
        </div>
        <el-pagination
          :current-page="currentPage"
          :page-size="5"
          :total="totalItems"
          layout="prev, pager, next"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </el-drawer>
</template>

<script setup>
const drawer = ref(false);

import { onMounted, ref, watch } from 'vue';
const props = defineProps({
  queryData: {
    type: Array,
  },
});
const dialogTableVisible = ref(null);

let active = ref(1);
const tableData = ref([]);
const arr = ref({});
const currentPage = ref(1);
const pageSize = 5;
const totalItems = ref(null);
const mockDate = ref([]);
watch(props, () => {
  if (props.queryData) {
    tableData.value = props.queryData;
    mockDate.value = tableData.value;
    
    totalItems.value = mockDate.value.length;
    props.queryData.map((item) => {
      arr.value = item;
      return arr.value;
    });

    fetchDate();
    drawer.value = true;
  }
});

function handleSizeChange(val) {
  currentPage.value = val;
  fetchDate();
}
function handleCurrentChange(val) {
  currentPage.value = val;
  fetchDate();
}

function fetchDate() {
  const start = (currentPage.value - 1) * pageSize;
  const end = start + pageSize;
  const items = mockDate.value.slice(start, end);
  tableData.value = items;
}
function setActive() {
  if (active.value) {
    active.value = 0;
  } else {
    active.value = 1;
  }
}
/* 定义自定义事件 */
const emit = defineEmits([
  'sourceClear',
  'handleHeatMap',
  'handleEventDiagram',
]);
function setTableDisappear() {
  drawer.value = false;
  emit('sourceClear');
}
function creatHeatMap() {
  emit('handleHeatMap');
}
function creatEventDiagram() {
  dialogTableVisible.value = true;
  emit('handleEventDiagram', dialogTableVisible.value);
}
</script>
<style scoped>
.dispppear {
  display: none;
}
.button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 200px 3px 200px;
  border-top: 5px solid #86acd2;
}

</style>
