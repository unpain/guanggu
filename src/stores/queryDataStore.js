import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const queryDataStore = defineStore('data', () => {
  let queryData = ref([]);
  function setqueryData(a) {
    queryData.value = a;
  }
  return {
    queryData,
    setqueryData
  };
});
