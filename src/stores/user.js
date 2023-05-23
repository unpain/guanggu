import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  let username = ref('')
  let password = ref('')
  let captcha = ref('')
  return { username, password, captcha }
})
