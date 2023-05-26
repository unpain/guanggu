<template>
  <RouterView />
</template>
<script setup>
</script>
<style>
*{
  margin: 0;
  padding: 0;
}
</style>
<!-- <template>
  <div>
    <el-table :data="tableData" :header-cell-style="{ background: '#f5f7fa', color: '#333' }">
      <el-table-column prop="name" label="Name"></el-table-column>
      <el-table-column prop="age" label="Age"></el-table-column>
      <el-table-column prop="address" label="Address"></el-table-column>
    </el-table>
    <el-pagination :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize"
      layout="sizes, prev, pager, next, jumper" :total="totalItems" @size-change="handleSizeChange"
      @current-change="handleCurrentChange"></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage: 1, // 当前页数
      pageSize: 10, // 每页显示的条数
      totalItems: 0, // 总条数
      tableData: [], // 表格数据
    };
  },
  methods: {
    // 处理每页显示条数变化
    handleSizeChange(val) {
      this.pageSize = val;
      this.fetchData();
    },
    // 处理当前页数变化
    handleCurrentChange(val) {
      this.currentPage = val;
      this.fetchData();
    },
    // 模拟获取数据
    fetchData() {
      // 模拟异步请求获取数据，根据 currentPage 和 pageSize 进行分页查询
      // 假设请求返回的数据结构为 { total: 100, items: [] }
      // 其中 total 表示总条数，items 表示当前页的数据
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      const items = this.mockData.slice(start, end);
      this.tableData = items;
    },
  },
  created() {
    // 初始化数据
    this.mockData = [
      { name: 'John', age: 28, address: '123 Street' },
      { name: 'Jane', age: 32, address: '456 Avenue' },
      // ...
      { name: 'Tom', age: 24, address: '789 Road' },
      { name: 'John', age: 28, address: '123 Street' },
      { name: 'Jane', age: 32, address: '456 Avenue' },
      // ...
      { name: 'Tom', age: 24, address: '789 Road' },
      { name: 'John', age: 28, address: '123 Street' },
      { name: 'Jane', age: 32, address: '456 Avenue' },
      // ...
      { name: 'Tom', age: 24, address: '789 Road' },
      { name: 'John', age: 28, address: '123 Street' },
      { name: 'Jane', age: 32, address: '456 Avenue' },
      // ...
      { name: 'Tom', age: 24, address: '789 Road' },
      { name: 'John', age: 28, address: '123 Street' },
      { name: 'Jane', age: 32, address: '456 Avenue' },
      // ...
      { name: 'Tom', age: 24, address: '789 Road' },
      { name: 'John', age: 28, address: '123 Street' },
      { name: 'Jane', age: 32, address: '456 Avenue' },
      // ...
      { name: 'Tom', age: 24, address: '789 Road' },
      { name: 'John', age: 28, address: '123 Street' },
      { name: 'Jane', age: 32, address: '456 Avenue' },
      // ...
      { name: 'Tom', age: 24, address: '789 Road' },
      { name: 'John', age: 28, address: '123 Street' },
      { name: 'Jane', age: 32, address: '456 Avenue' },
      // ...
      { name: 'Tom', age: 24, address: '789 Road' },
      { name: 'John', age: 28, address: '123 Street' },
      { name: 'Jane', age: 32, address: '456 Avenue' },
      // ...
      { name: 'Tom', age: 24, address: '789 Road' },
      { name: 'John', age: 28, address: '123 Street' },
      { name: 'Jane', age: 32, address: '456 Avenue' },
      // ...
      { name: 'Tom', age: 24, address: '789 Road' },
      { name: 'John', age: 28, address: '123 Street' },
      { name: 'Jane', age: 32, address: '456 Avenue' },
      // ...
      { name: 'Tom', age: 24, address: '789 Road' },
      { name: 'John', age: 28, address: '123 Street' },
      { name: 'Jane', age: 32, address: '456 Avenue' },
      // ...
      { name: 'Tom', age: 24, address: '789 Road' },
      { name: 'John', age: 28, address: '123 Street' },
      { name: 'Jane', age: 32, address: '456 Avenue' },
      // ...
      { name: 'Tom', age: 24, address: '789 Road' },
      { name: 'John', age: 28, address: '123 Street' },
      { name: 'Jane', age: 32, address: '456 Avenue' },
      // ...
      { name: 'Tom', age: 24, address: '789 Road' },
      { name: 'John', age: 28, address: '123 Street' },
      { name: 'Jane', age: 32, address: '456 Avenue' },
      // ...
      { name: 'Tom', age: 24, address: '789 Road' },
    ];

    this.totalItems = this.mockData.length;

    this.fetchData();
  },
};
</script> -->
