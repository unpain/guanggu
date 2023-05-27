<!-- @format -->

<template>
  <div v-permission="['department', 'admin']">
    <el-icon
      :class="[drawer ? 'disappear' : 'directory-open']"
      type="primary"
      @click="drawer = true"
      ><DArrowRight
    /></el-icon>
    <el-drawer
      v-model="drawer"
      title="图层目录"
      direction="ltr"
      :close-on-click-modal="false"
      :modal="false"
      modal-class="cover"
      :show-close="false"
      custom-class="draw"
      size="270px"
    >
      <el-tree
        class="tree"
        :data="data"
        show-checkbox
        node-key="id"
        :default-expanded-keys="[5, 6]"
        :default-checked-keys="[0, 1, 2, 3, 4]"
        :props="defaultProps"
        @check="handelClick"
      />
      <el-icon class="directory-close" type="primary" @click="drawer = false"
        ><DArrowLeft
      /></el-icon>
    </el-drawer>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, inject } from 'vue';
const catalogTree = ref([]);
const drawer = ref(false);
let $map;
onMounted(() => {
  $map = inject('$map');
});
const defaultProps = {
  children: 'children',
  label: 'name',
};
const docCatalog = new Zondy.Catalog.MapDoc({
  docName: 'guanggu',
});
docCatalog.getLayersInfo((data) => {
  var layer = data.value;
  catalogTree.value = layer.map((item) => {
    return { id: item.LayerIndex, name: item.Name };
  });
  console.log(catalogTree.value);
});
const data = ref([
  {
    id: 5,
    name: '地图文档',
    children: [
      {
        id: 6,
        name: '光谷智慧交通',
        children: catalogTree,
      },
    ],
  },
]);
function handelClick(a, b) {
  console.log(a, b);
  let active = b.checkedKeys.some((item) => item == a.id);
  $map
    .getLayers()
    .array_[1].setLayerStatus(a.id, active ? 'include' : 'exclude');
  if (a.id == 6 || a.id == 5) {
    $map
      .getLayers()
      .array_[1].setLayerStatus(
        [0, 1, 2, 3, 4],
        active ? 'include' : 'exclude'
      );
  }
}
</script>
<style scoped>
.directory-open {
  position: absolute;
  top: 50vh;
  left: 40px;
}
.directory-close {
  position: absolute;
  right: 20px;
  top: 50%;
}
.disappear {
  display: none;
}
::v-deep .draw {
  height: 80vh;

  margin: auto 0;
}
::v-deep .cover {
  width: 0;
  background-color: aliceblue;
}
::v-deep .tree {
  width: 225px;
  float: left;
}
</style>
