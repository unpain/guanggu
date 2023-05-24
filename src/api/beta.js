/** @format */

const mockjs = require('mockjs');
const { Random } = require('mockjs');
module.exports = () => {
  return mockjs.mock({
    /* list|10 设置十条数据 */
    'list|10': [
      {
        /* id|+1  id值自增加1 */
        'id|+1': 4000,
        /* 设置中文,只有8位 */
        title: '@ctitle(8)',
      },
    ],
  });
};
