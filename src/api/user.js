/** @format */

const Mock = require('mockjs');
const fs = require('fs')
// 生成 8-16 位的随机密码数组
const passwords = new Set();
for (let i = 0; i < 10; i++) {
  let password = '';
  let letter = Mock.Random.character(
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  );
  password += letter;
  letter = Mock.Random.character(
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  );
  password += letter;
  const num = Mock.Random.string('0123456789', 6, 14);
  password += num;
  passwords.add(password);
}
const types = [
  'admin',
  'department',
  'department',
  'user',
  'user',
  'user',
  'user',
  'user',
  'user',
  'user',
  'user',
  'user',
  'user',
  'user',
  'user',
  'user',
  'user',
  'user',
  'user',
  'user',
];
const state = [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0];
const state1 = [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0];
const admin = [
  {
    user_id: 0,
    user_name: 'admin',
    user_password: "123456",
    user_type: 'admin',
    user_onlinestatus: 1,
    user_other: 1,
  }
  ,
  {
    user_id: 1,
    user_name: Mock.Random.cname(),
    user_password: [...passwords][0],
    user_type: 'admin',
    user_onlinestatus: 1,
    user_other: 1,
  }];
const trafficDepartment = [{
  user_id: 2,
  user_name: Mock.Random.cname(),
  user_password: [...passwords][1],
  user_type: 'department',
  user_onlinestatus: 1,
  user_other: 1,
}];

module.exports = () => {
  const users = [];
  let i = 0;
  passwords.forEach((password, index) => {
    if (index < 2) {
      return;
    }
    users.push({
      user_id: ++i,
      user_name: Mock.Random.cname(),
      user_password: password,
      user_type: Mock.Random.pick(types),
      user_onlinestatus: Mock.Random.pick(state),
      user_other: Mock.Random.pick(state1),
    });
  });
  fs.writeFile('./src/data/data.json', JSON.stringify({ users: users, admin: admin, trafficDepartment: trafficDepartment }), 'utf8', (err) => {
    if (err) {
      console.error('写入文件发生错误', err)
    } else {
      console.log('数据写入成功')
    }
  })
  return { users: users, admin: admin, trafficDepartment: trafficDepartment };
};
