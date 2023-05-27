<template>
  <div class="login">
    <div class="cont">
      <div class="form sign-in">
        <h2>光谷智慧交通</h2>
        <label>
          <span>username</span>
          <div class="username">
            <input type="text" v-model="username" />
          </div>
        </label>
        <label>
          <span>Password</span>
          <div class="password">
            <input
              :type="passwordVisible ? 'text' : 'password'"
              v-model="password"
            />
            <i
              :class="
                passwordVisible ? ' iconfont icon-eye' : 'iconfont icon-eye1'
              "
              @click="togglePasswordVisibility"
            ></i>
          </div>
        </label>
        <p class="forgot-pass">忘记密码?</p>
        <button type="button" class="submit" @click="handleLogin">登录</button>
      </div>
      <div class="sub-cont">
        <div class="img">
          <div class="img__text m--up">
            <h2>智慧交通</h2>
            <p>登陆体验便利、快捷的交通网络</p>
          </div>
          <div class="img__text m--in">
            <h2>加入我们！</h2>
            <p>如果你已经拥有账号，那赶快去登录把！</p>
          </div>
          <div class="img__btn" @click="goToSignUp">
            <span class="m--up">注册</span>
            <span class="m--in">登录</span>
          </div>
        </div>
        <div class="form sign-up">
          <h2>让交通更加畅通</h2>
          <label>
            <span>Username</span>
            <div class="username">
              <input type="text" v-model="username" />
            </div>
          </label>
          <label>
            <span>Password</span>
            <div class="password">
              <input
                :type="passwordVisible ? 'text' : 'password'"
                v-model="password"
              />
              <i
                :class="
                  passwordVisible ? ' iconfont icon-eye' : 'iconfont icon-eye1'
                "
                @click="togglePasswordVisibility"
              ></i>
            </div>
          </label>
          <button type="button" class="submit" @click="register">注册</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useUserStore } from '@/stores/user'
import { toRefs, onBeforeMount, ref } from 'vue'
import { getInfoApi, postInfoApi } from '@/api/login'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { checkout } from '../utils/checkout'
const { login } = useUserStore()
let passwordVisible = ref(false)
let { username, password } = toRefs(useUserStore())
const $router = useRouter()
// 登陆函数
const handleLogin = () => {
  // 校验账号与密码是否符合要求
  const isValid = checkout({
    username,
    password,
  })
  if (!isValid) {
    // 校验不通过，直接返回，不执行 postInfoApi
    return
  }
  postInfoApi({
    username: username.value,
    password: password.value,
    op: 'login',
  })
    .then((res) => {
      const token = res.data.token
      const permission = res.data.user.user_type
      const userName = res.data.user.user_name
      login({
        permission,
        token,
        userName: userName.toString()
      })
      $router.push('/home')
    })
    .catch((err) => {
      if ((err.response.status = 401)) {
        ElMessage.error('账号或密码存在问题，请检查后在登录')
      }
    })
}
// 注册函数
const register = () => {
  // 校验账号与密码是否符合要求
  const isValid = checkout({
    username,
    password,
  })

  if (!isValid) {
    // 校验不通过，直接返回，不执行 postInfoApi
    return
  }
  postInfoApi({
    username: username.value,
    password: password.value,
    op: 'register',
  })
    .then((res) => {
      if (res.data.error) {
        // 注册过程中出现问题
        const errorMessage = res.data.message
        ElMessage.error(errorMessage)
        // 可以将错误信息显示给用户或进行相应的处理
      } else {
        // 注册成功
        ElMessage({
          message: '注册成功，赶快去登录吧！',
          type: 'success',
        })
      }
    })
    .catch((err) => {
      // 处理其他错误
      console.error(err)
    })
}
// 注册与登陆切换时，将值清空
const goToSignUp = () => {
  username.value = ''
  password.value = ''
}
onMounted(() => {
  // 获取DOM，实现登陆与注册左右滑动的效果
  document.querySelector('.img__btn').addEventListener('click', function () {
    document.querySelector('.cont').classList.toggle('s--signup')
  })
})
// 实现密码显隐的函数
const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value
}
</script>
<style scoped>
@import url(../assets/style.css);
@import url('https://at.alicdn.com/t/c/font_4027375_qbadyjgwaun.css');
.login {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(../assets/images/bg.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
.password {
  display: flex;
  align-items: center;
  border-bottom: 2px solid rgba(0, 0, 0, 0.5);
}
.password .iconfont {
  font-size: 20px;
}
.username {
  border-bottom: 2px solid rgba(0, 0, 0, 0.5);
}
</style>
