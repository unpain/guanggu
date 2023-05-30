/** @format */

const Mock = require('mockjs')
const fs = require('fs')
// 生成 8-16 位的随机密码数组
const randomPhone = Mock.mock(/^1[3456789]\d{9}$/)
const passwords = new Set()
for (let i = 0; i < 104; i++) {
  let password = ''
  let letter = Mock.Random.character(
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  )
  password += letter
  letter = Mock.Random.character(
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  )
  password += letter
  const num = Mock.Random.string('0123456789', 6, 14)
  password += num
  passwords.add(password)
}
const types = ['admin', 'department', 'user']
const state = [true, false]
const state1 = [0, 1]
const admin = [
  {
    user_id: 1001,
    user_name: 'admin',
    user_password: 'Admin123',
    user_type: 'admin',
    user_onlinestatus: Mock.Random.pick(state),
    user_other: 1
  },
  {
    user_id: 1,
    user_name: Mock.Random.cname(),
    user_password: [...passwords][0],
    user_type: types[0],
    user_onlinestatus: Mock.Random.pick(state),
    user_other: 1
  }
]
const trafficDepartment = [
  {
    user_id: 1003,
    user_name: 'part',
    user_password: 'Part123',
    user_type: types[1],
    user_onlinestatus: Mock.Random.pick(state),
    user_other: 1
  },
  {
    user_id: 2,
    user_name: Mock.Random.cname(),
    user_password: [...passwords][1],
    user_type: 'department',
    user_onlinestatus: Mock.Random.pick(state),
    user_other: 1
  }
]
const event = Mock.mock({
  'event|20': [
    {
      'event_id|+1': 1,
      'user_id|1-20': 1,
      'event_type|+1': ['碰撞', '刮擦', '追尾', '碾压', '翻车', '失火', '其他'],
      event_addr: '@csentence(5)',
      event_mark: '@csentence(5)',
      event_time: '@datetime()',
      event_describe: '@csentence(8)',
      'event_status|0-2': 1
    }
  ]
})
const notice = Mock.mock({
  'notice|20': [
    {
      'notice_id|+1': 2,
      'user_id|1-100': 1,
      notice_title: '@ctitle()',
      notice_content: '@cparagraph(3)',
      'notice_addr|5': [{ name: '@csentence(8)', tel: randomPhone }],
      notice_time: '@datetime()'
    }
  ]
})
module.exports = () => {
  const user = [
    {
      user_id: 1002,
      user_name: 'user',
      user_password: 'User123',
      user_type: 'user',
      user_onlinestatus: Mock.Random.pick(state),
      user_other: 1
    }
  ]
  let i = 2
  passwords.forEach((password, index) => {
    if (index < 2) {
      return
    }
    user.push({
      user_id: ++i,
      user_name: Mock.Random.cname(),
      user_password: password,
      user_type: types[2],
      user_onlinestatus: Mock.Random.pick(state),
      user_other: Mock.Random.pick(state1)
    })
  })
  fs.writeFile(
    './src/data/data.json',
    JSON.stringify({
      user: user,
      admin: admin,
      trafficDepartment: trafficDepartment,
      event: Object.values(event).flat(),
      notice: Object.values(notice).flat()
    }),
    'utf8',
    err => {
      if (err) {
        console.error('写入文件发生错误', err)
      } else {
        console.log('数据写入成功')
      }
    }
  )
  return {
    user: user,
    admin: admin,
    trafficDepartment: trafficDepartment,
    event: Object.values(event).flat(),
    notice: Object.values(notice).flat()
  }
}
