import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { useUserStore } from './stores/user'

export const app = createApp(App)

app.use(createPinia()).use(router).use(ElementPlus).mount('#app')

const { hasPermission } = useUserStore()
app.directive('permission', {
  mounted(el, binding) {
    // 判断是否有按钮权限
    if (!hasPermission(binding.value)) {
      el.style.display = 'none'
    }
  }
})
