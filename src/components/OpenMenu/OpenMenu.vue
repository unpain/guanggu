<!-- @format -->

<template>
  <el-menu
    :default-active="activeIndex2"
    class="el-menu-demo"
    mode="horizontal"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    @select="handleSelect"
    :ellipsis="false"
    menu-trigger="click"
  >
    <h4 class="log">光谷智慧交通系统</h4>
    <el-menu-item @click="getRoadConditions" index="1">实时路况</el-menu-item>
    <el-menu-item index="2" v-permission="['user']">查看公告</el-menu-item>
    <el-menu-item index="3" v-permission="['user']">报告路况</el-menu-item>
    <VideoMonitor />
    <AddEvent />
    <el-menu-item index="6" v-permission="['department', 'admin']"
      >事件查询</el-menu-item
    >
    <el-menu-item index="7" v-permission="['department', 'admin']"
      >事件更新</el-menu-item
    >
    <el-menu-item index="8" v-permission="['department', 'admin']"
      >发布公告</el-menu-item
    >
    <el-menu-item index="9" v-permission="['department', 'admin']"
      >路况信息</el-menu-item
    >
    <el-sub-menu index="10">
      <template #title>工具箱</template>
      <el-menu-item index="10-1">测量距离</el-menu-item>
      <el-menu-item index="10-2">测量面积</el-menu-item>
      <el-menu-item index="10-2">关闭测量</el-menu-item>
      <el-menu-item index="10-2">导出图片</el-menu-item>
      <el-sub-menu index="10-4">
        <template #title>查询</template>
        <el-menu-item index="10-4-1">item one</el-menu-item>
        <el-menu-item index="10-4-2">item two</el-menu-item>
        <el-menu-item index="10-4-3">item three</el-menu-item>
      </el-sub-menu>
    </el-sub-menu>

    <el-menu-item class="scerch">
      <el-input
        placeholder="请输入查询的交通事故信息"
        class="input-with-select"
      >
        <template #append>
          <el-button>查询</el-button>
        </template>
      </el-input>
    </el-menu-item>
    <el-select placeholder="用户" style="width: 73px">
      <el-option label="退出登录" value="1" />
      <el-option label="修改密码" value="2" />
      <el-option v-permission="['admin']" label="用户管理" value="2" />
    </el-select>
  </el-menu>
</template>

<script setup>
import VideoMonitor from './coms/VideoMonitor.vue'
import AddEvent from './coms/AddEvent.vue'
</script>
<style scoped>
.el-menu-demo {
  align-items: center;
  white-space: nowrap;
}
.log {
  margin: 0 0 0 20px;
}
::v-deep .el-sub-menu__title {
  padding: 0 20px;
}
</style>
