<!-- @format -->

<template>
  <div v-permission="['department', 'admin']">
    <button>
      <el-icon
        :class="[drawer ? 'disappear' : 'directory-open']"
        type="primary"
        @click="drawer = true"
        ><DArrowRight
      /></el-icon>
    </button>

    <el-drawer
      v-model="drawer"
      direction="ltr"
      :close-on-click-modal="false"
      :modal="false"
      title="I am the title"
      modal-class="cover"
      :show-close="false"
      class="draw"
      size="270px"
    >
      <template #header>
        <h3>图层目录</h3>
      </template>
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
      <button>
        <el-icon class="directory-close" type="primary" @click="drawer = false"
          ><DArrowLeft
        /></el-icon>
      </button>
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
  let active = b.checkedKeys.some((item) => item == a.id);
  $map
    .getLayers()
    .array_[2].setLayerStatus(a.id, active ? 'include' : 'exclude');
  if (a.id == 6 || a.id == 5) {
    $map
      .getLayers()
      .array_[2].setLayerStatus(
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
  top: 39%;
}
.directory-close {
  position: absolute;
  top: 50vh;
  right: 20px;
  top: 39%;
}
.disappear {
  display: none;
}
:deep .draw {
  height: 80vh;
  background-color: rgba(251, 249, 249, 0.8);
  margin: auto 0;
  color: black;
}
:deep .cover {
  width: 0;
  background-color: aliceblue;
}
:deep .tree {
  width: 225px;
  float: left;

  background-color: rgba(164, 205, 255, 0);
}

.directory-open {
  box-shadow: inset 0px 1px 0px 0px #efdcfb;
 
  background-color: #bc80ea;
  border-radius: 6px;
  border: 1px solid #c584f3;
  display: inline-block;
  cursor: pointer;
  color: #ffffff;
  font-family: Arial;
  font-size: 15px;
  font-weight: bold;
  padding: 32px 0px;
  text-decoration: none;
  text-shadow: 0px 1px 0px #9752cc;
   position: absolute;
  right: 20px;
  top: 39%;
}
.directory-open:hover {
  background-color: #dfbdfa;
  position: absolute;
  right: 20px;
   top: 39%;
}
.directory-open:active {
  position: relative;
  top: 1px;
  position: absolute;
  right: 20px;
  top: 39%;
}
.directory-close{
  box-shadow: inset 0px 1px 0px 0px #efdcfb;
  background-color: #bc80ea;
  border-radius: 6px;
  border: 1px solid #c584f3;
  display: inline-block;
  cursor: pointer;
  color: #ffffff;
  font-family: Arial;
  font-size: 15px;
  font-weight: bold;
  padding: 32px 0px;
  text-decoration: none;
  text-shadow: 0px 1px 0px #9752cc;
   position: absolute;
  right: 20px;
  top: 39%;
}
.directory-close:hover {
  background-color: #dfbdfa;
   position: absolute;
  right: 20px;
   top: 39%;
}
.directory-close:active {
  position: relative;
  top: 1px;
  position: absolute;
  right: 20px;
   top: 39%;
}
</style>
