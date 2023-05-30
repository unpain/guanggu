import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { useUserStore } from './stores/user'

export const app = createApp(App)

app.use(createPinia()).use(router).use(ElementPlus).mount('#app')

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

const { hasPermission } = useUserStore()
// 自定义指令 全局v-permission
app.directive('permission', {
  mounted(el, binding) {
    // 判断是否有按钮权限
    if (!hasPermission(binding.value)) {
      el.style.display = 'none'
    }
  }
})
