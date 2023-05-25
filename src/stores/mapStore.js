import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useMapStore = defineStore('map', () => {
  let catalogTree = ref([]);
  

  return {
    catalogTree,
    
  };
})
