import { ref } from 'vue'
import { defineStore } from 'pinia'

export const usePopupStore = defineStore('popup', () => {
  const isReset = ref()
  const setIsReset = () => {
    isReset.value = Math.random()
  }

  return {
    isReset,
    setIsReset
  }
})
