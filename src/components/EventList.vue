<!-- @format -->

<template>
  <el-card
    :class="active1 ? '' : 'dispppear'"
    class="box-card"
    body-style="width: 75%; margin: -12px auto; min-width: 1000px"
  >
    <template #header >
      <div class="card-header" >
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
             <el-icon><ArrowDownBold /></el-icon
          >
          </el-button>
          <el-button
            type="success"
            :class="active ? '' : 'dispppear'"
            @click="setActive"
            style="margin-left: 16px"
          > <el-icon><ArrowUpBold /></el-icon>
           </el-button>
          <el-button
            type="primary"
            @click="setTableDisappear"
            style="margin-left: 10px"
          >
            <el-icon><CloseBold /></el-icon>
          </el-button>
        </div>
      </div>
    </template>

    <div :class="active ? 'dispppear' : ''">
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
        <div class="demonstration" :current-page="currentPage">Jump to</div>
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :total="totalItems"
          layout="total,sizes,prev, pager, next, jumper"
          :disabled="disabled"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          pager-count="6"
          :page-sizes="[pageSize]"
        />
      </div>
    </div>
  </el-card>
</template>

<script setup>
const active1 = ref(false);

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
const pageSize = 4;
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
    active1.value = true;
    setActive()
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
  active1.value = false;
  emit('sourceClear');
}
function creatHeatMap() {
  setActive();
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
.card-header {
  display: flex;
  align-items: center;

  justify-content: space-between;
  padding: 10px 200px 3px 0px;
  border-top: 5px solid #86acd2;
}
.box-card {
  position: absolute;
  bottom: -90vh;
  left: 50%;
  transform: translateX(-50%);
}
</style>
