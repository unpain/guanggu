import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNoticeStore = defineStore('notice', () => {
  let noticeArr = ref([])
  return { noticeArr }
})
