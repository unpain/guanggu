import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNoticeStore = defineStore('notice', () => {
  let addrArr = ref([])
  let noticeArr = ref([])
  return { addrArr, noticeArr }
})
