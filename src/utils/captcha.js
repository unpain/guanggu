export const UseCaptcha = () => {
  class Captcha {
    static creatCaptcha({
      captcha,
      canvas
    }) {
      // 绘制验证码
        // var canvas = document.getElementById('captchaCanvas')
        var context = canvas.getContext('2d')
        // var captchaLength = 4 // 验证码长度
        var captchaText = this.generateRandomString(captcha)
        // 清除画布
        context.clearRect(0, 0, canvas.width, canvas.height)
        // 设置绘制样式
        context.font = 'bold 100px Arial'
        context.textAlign = 'center'
        context.textBaseline = 'middle'

        // 绘制验证码文本
        for (i = 0; i < captchaText.length; i++) {
          var randomColor = this.generateRandomColor()
          context.fillStyle = randomColor
          context.fillText(
            captchaText[i],
            canvas.width / 8 + i * 80,
            canvas.height / 2
          )
        }
        // 添加干扰线
        for (var i = 0; i < 8; i++) {
          context.beginPath()
          context.moveTo(
            Math.random() * canvas.width,
            Math.random() * canvas.height
          )
          context.lineTo(
            Math.random() * canvas.width,
            Math.random() * canvas.height
          )
          context.strokeStyle = '#666'
          context.lineWidth = 3
          context.stroke()
        }
      
    }
     // 生成随机字符
    static generateRandomString(captcha) {
      var charSet =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      var randomString = ''
      for (var i = 0; i < 4; i++) {
        var randomIndex = Math.floor(Math.random() * charSet.length)
        randomString += charSet.charAt(randomIndex)
      }
      captcha.value = randomString
      return randomString
    }
    static generateRandomColor() {
      var letters = '0123456789ABCDEF'
      var color = '#'
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
      }
      return color
    }
  }
  return {Captcha}
}
