<!-- @format -->

<template>
  <el-menu
    :default-active="activeIndex2"
    class="el-menu-demo"
    mode="horizontal"
    :background-color="color"
    text-color="#fff"
    active-text-color="#ffd04b"
    @select="handleSelect"
    :ellipsis="false"
    menu-trigger="click"
  >
    <h4 class="log">光谷智慧交通系统</h4>
    <RoadCondition />
    <EventAddition />
    <VideoMonitor />
    <AddEvent />
    <UpdateEvent />
    <queryEventBuyCanvas />
    <AddNotice />
    <el-menu-item
      index="9"
      v-permission="['department', 'admin']"
      @click="showRoadCondition"
      >路况信息</el-menu-item
    >
    <MapToolbox />
    <el-menu-item class="search" index="10">
      <el-input
        placeholder="请输入查询的交通事故信息"
        class="input-with-select"
      >
        <template #append>
          <el-button>查询</el-button>
        </template>
      </el-input>
    </el-menu-item>
    <el-select :placeholder="userPermission.userName" style="width: 90px">
      <el-option label="退出登录" value="1" @click="toLogin" />
      <el-option label="修改密码" value="2" @click="modifyPassword" />
      <el-option
        v-permission="['admin']"
        label="用户管理"
        value="2"
        @click="toManage"
      />
    </el-select>
    <el-color-picker v-model="color" />
  </el-menu>
  <transition name="fade">
    <el-card
      class="container"
      v-if="roadFlag"
      :style="{ 'max-height': '1000px' }"
    >
      <div class="title"><span>路况信息表</span></div>
      <el-table
        :data="tableData"
        :style="{ 'min-height': '300px' }"
        :header-cell-style="{ background: '#f5f7fa', color: '#333' }"
        :cell-style="{ height: '43px' }"
        border="true"
      >
        <el-table-column
          width="80"
          prop="event_id"
          label="事件id"
          resizable="true"
        ></el-table-column>
        <el-table-column
          width="80"
          prop="user_id"
          label="用户id"
          resizable="true"
        ></el-table-column>
        <el-table-column
          width="100"
          prop="event_type"
          label="事件类型"
          :filters="[
            { text: '碰撞', value: '碰撞' },
            { text: '刮擦', value: '刮擦' },
            { text: '追尾', value: '追尾' },
            { text: '碾压', value: '碾压' },
            { text: '翻车', value: '翻车' },
            { text: '失火', value: '失火' },
            { text: '其他', value: '其他' }
          ]"
          :filter-method="filterHandler"
          resizable="true"
        ></el-table-column>
        <el-table-column
          width="180"
          prop="event_addr"
          label="事件地址"
          resizable="true"
        ></el-table-column>
        <el-table-column
          width="180"
          prop="event_mark"
          label="事件标识"
          resizable="true"
        ></el-table-column>
        <el-table-column
          width="180"
          prop="event_time"
          label="发生时间"
          resizable="true"
        ></el-table-column>
        <el-table-column
          width="300"
          prop="event_describe"
          label="事件描述"
          resizable="true"
        ></el-table-column>
        <el-table-column
          width="180"
          prop="event_status"
          label="事件状态"
          :filters="[
            { text: '未处理', value: '未处理' },
            { text: '已完成', value: '已完成' },
            { text: '已忽略', value: '已忽略' }
          ]"
          :filter-method="filterHandler"
          resizable="true"
          align="center"
        >
          <template v-slot="{ row }">
            <el-button
              v-if="row.event_status == '未处理'"
              type="success"
              size="small"
              @click="changeEventStatus(row.event_id, 1)"
              >完成</el-button
            >
            <el-button
              v-if="row.event_status == '未处理'"
              type="warning"
              size="small"
              @click="changeEventStatus(row.event_id, 2)"
              >忽略</el-button
            >
            <div class="delete" v-if="row.event_status == '已忽略'">
              {{ row.event_status }}
              <el-button
                type="danger"
                size="small"
                @click="deleteEvent(row.event_id)"
                >删除</el-button
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="currentPage"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pageSize"
        layout="sizes, prev, pager, next, jumper"
        :total="totalItems"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      ></el-pagination>
      <el-button
        @click="closeRoadTable"
        class="close-button"
        type="danger"
        size="small"
        >关闭</el-button
      >
    </el-card>
  </transition>
  <el-card
    v-if="modifyFlag"
    :style="{
      width: '400px',
      position: 'fixed',
      top: '20%',
      left: '50%',
      transform: 'translate(' + '-50%,' + '0)',
      'z-index': '100',
      textAlign: 'center'
    }"
  >
    <ul
      :style="{
        listStyle: 'none',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: start,
        alignItems: center,
        gap: '20px',
        marginTop: '20px',
        textAlign: 'left'
      }"
    >
      <li>
        <el-input
          :style="{ width: '100%' }"
          placeholder="请输入密码"
          v-model="password"
        ></el-input>
      </li>
      <li>
        <el-input
          :style="{ width: '100%' }"
          placeholder="请输入确认密码"
          v-model="confirmPassword"
        ></el-input>
      </li>
    </ul>
    <ul
      :style="{
        listStyle: 'none',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: start,
        alignItems: center,
        gap: '20px',
        marginTop: '20px'
      }"
    >
      <li :style="{ display: 'inline-block' }">
        <el-button
          color="#ff7eea"
          size="normal"
          :dark="isDark"
          plain
          @click="submitModify"
          >确定</el-button
        >
      </li>
      <li :style="{ display: 'inline-block' }">
        <el-button
          color="#ff5353"
          size="normal"
          :dark="isDark"
          plain
          @click="cancelModify"
          >取消</el-button
        >
      </li>
    </ul>
  </el-card>
</template>

<script setup>
import VideoMonitor from './coms/VideoMonitor.vue'
import AddEvent from './coms/AddEvent.vue'
import UpdateEvent from './coms/UpdateEvent.vue'
import RoadCondition from './coms/RoadCondition.vue'
import EventAddition from '../EventAddition.vue'
import AddNotice from './coms/AddNotice.vue'
import { onMounted, onBeforeMount, ref, toRefs, inject } from 'vue'
import MapToolbox from '../MapToolbox.vue'
import queryEventBuyCanvas from '../queryEventBuyCanvas.vue'
import {
  getEventApi,
  modifyEventStatusApi,
  deleteEventApi
} from '../../api/event'
import { modifyUserApi } from '@/api/opUser'
import { useEventStore } from '@/stores/event'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const $router = useRouter()
let roadFlag = ref(false)
let { eventList, mapEvent } = toRefs(useEventStore())
let { setRoadTag } = useEventStore()
let { userPermission } = toRefs(useUserStore())
let currentPage = ref(1) // 当前页数
let pageSize = ref(5) // 每页显示的条数
let totalItems = ref(0) // 总条数
let tableData = ref([]) // 表格数据
let modifyFlag = ref(false)
let password = ref('')
let confirmPassword = ref('')
let color = ref('#3E83CC')

const showRoadCondition = () => {
  roadFlag.value = true
}
const changeEventStatus = (id, status) => {
  modifyEventStatusApi(id, status).then(() => {
    getEventApi().then(res => {
      eventList.value = res.data.event.map(item => {
        return {
          event_id: item.event_id,
          user_id: item.user_id,
          event_type: item.event_type,
          event_addr: item.event_addr,
          event_mark: item.event_mark,
          event_time: item.event_time,
          event_describe: item.event_describe,
          event_status:
            item.event_status == 0
              ? '未处理'
              : item.event_status == 1
              ? '已完成'
              : item.event_status == 2
              ? '已忽略'
              : null
        }
      })
      totalItems.value = eventList.value.length
      fetchData()
    })
  })
}
const handleSizeChange = val => {
  pageSize.value = val
  fetchData()
}
const handleCurrentChange = val => {
  currentPage.value = val
  fetchData()
}
const fetchData = () => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  const items = eventList.value.slice(start, end)
  tableData.value = items
}
const filterHandler = (value, row, column) => {
  const property = column['property']
  return row[property] === value
}
const closeRoadTable = () => {
  roadFlag.value = false
}
const toManage = () => {
  $router.push('/admin')
}

const toLogin = () => {
  localStorage.removeItem('userPermission')
  $router.push('/login')
}

const submitModify = () => {
  let id = JSON.parse(localStorage.getItem('userPermission')).userId
  if (password.value == confirmPassword.value) {
    modifyUserApi({
      password: password.value,
      id: Number(id),
      op: 'modify'
    }).then(res => {
      if (res.data.status === 'success') {
        modifyFlag.value = false
        password.value = ''
        confirmPassword.value = ''
        $router.push('/login')
        ElMessage.success('修改成功,请重新登录')
      }
    })
  } else {
    ElMessage.error('修改失败')
  }
}

const cancelModify = () => {
  modifyFlag.value = false
  password.value = ''
  confirmPassword.value = ''
}

const modifyPassword = () => {
  modifyFlag.value = true
}
const deleteEvent = id => {
  deleteEventApi(id).then(res => {
    if (res.data.status === 'success') {
      getEventApi().then(res => {
        eventList.value = res.data.event.map(item => {
          return {
            event_id: item.event_id,
            user_id: item.user_id,
            event_type: item.event_type,
            event_addr: item.event_addr,
            event_mark: item.event_mark,
            event_time: item.event_time,
            event_describe: item.event_describe,
            event_status:
              item.event_status == 0
                ? '未处理'
                : item.event_status == 1
                ? '已完成'
                : item.event_status == 2
                ? '已忽略'
                : null
          }
        })
        totalItems.value = eventList.value.length
        fetchData()
      })
    }
  })
}
onBeforeMount(() => {
  getEventApi().then(res => {
    eventList.value = res.data.event.map(item => {
      return {
        event_id: item.event_id,
        user_id: item.user_id,
        event_type: item.event_type,
        event_addr: item.event_addr,
        event_mark: item.event_mark,
        event_time: item.event_time,
        event_describe: item.event_describe,
        event_status:
          item.event_status == 0
            ? '未处理'
            : item.event_status == 1
            ? '已完成'
            : item.event_status == 2
            ? '已忽略'
            : null
      }
    })
    totalItems.value = eventList.value.length
    fetchData()
  })
})
let $map
onMounted(() => {
  $map = inject('$map')
})

const handleSelect = () => {
  setRoadTag(false)
  ol.Observable.unByKey(mapEvent.value)
  const allDraws = $map.interactions.array_
  $map.removeInteraction(allDraws[9])
  const allLayers = $map.getLayers().getArray()
  allLayers.forEach(layer => {
    if (layer.values_.class == 666) {
      $map.removeLayer(layer)
    }
  })
}
</script>
<style scoped>
.el-menu-demo {
  align-items: center;
  white-space: nowrap;
}

.container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: fade-in-animation 0.5s;
}

@keyframes fade-in-animation {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

VideoMonitor.vueVideoMonitor.vueVideoMonitor.vue .log {
  margin: 0 0 0 20px;
}

:deep .el-sub-menu__title {
  padding: 0 20px;
}
.el-menu--horizontal > .el-menu-item.is-active {
  border-bottom: none;
  color: var(--el-menu-active-color);
}
.search {
  padding: 0;
}
.close-button {
  position: fixed;
  right: 40px;
  bottom: 10px;
}

.title {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 20px;
  font-weight: bold;
}

.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-leave-to {
  opacity: 0;
}
</style>
