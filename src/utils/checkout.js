import { ElMessage } from 'element-plus'
export function checkout({
  username,
  password,
  captcha,
  userCaptcha

}){
  let errorMessage = "";
  if(captcha.value !=userCaptcha.value){
    errorMessage='验证码错误'
    ElMessage.error(errorMessage)
    return false
  }
   // 校验账号
 if (!username.value || username.value.trim().length === 0) {
  errorMessage='账号不能为空'
  ElMessage.error(errorMessage)
  return false;
} else if (username.value.trim().length < 1 || username.value.trim().length > 16) {
  errorMessage="账号长度应在1-16位之间"
  ElMessage.error(errorMessage)
  return false;
} else if (username.value.startsWith(" ")) {
  errorMessage="用户名不能以空格开头" 
  ElMessage.error(errorMessage)
  return false;
}
// 校验密码
if (password.value.length < 6 || password.value.length > 16) {
  errorMessage="密码长度应在6-16位之间" 
  ElMessage.error(errorMessage)
  return false;
  }
  if (!/[A-Z]/.test(password.value) || !/[a-z]/.test(password.value)) {
    errorMessage = '密码应包含大小写字母'
    ElMessage.error(errorMessage)
    return false
  }

  return true // 返回 true 表示校验通过
}
