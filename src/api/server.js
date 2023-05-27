// const { event } = require('jquery');
const jsonServer = require('json-server');
const database = require('./data.js')();
const jsonwebtoken = require('jsonwebtoken')
// 创建JSON Server实例
const server = jsonServer.create();
const router = jsonServer.router(database)
const middlewares = jsonServer.defaults()
// 使用中间件
server.use(middlewares);
server.use(jsonServer.bodyParser);

// 添加自定义路由处理
/* user 请求 */
//登录
server.post(`/all`, (req, res) => {
  const { username, password, op } = req.body;
  const user = database.user.find(
    (u) => u.user_name === username && u.user_password === password
  ) || database.admin.find(
    (u) => u.user_name === username && u.user_password === password
  ) || database.trafficDepartment.find(
    (u) => u.user_name === username && u.user_password === password
  );
  const userIndex = database.user.findIndex(
    (u) => u.user_name === username && u.user_password === password
  ) || database.admin.findIndex(
    (u) => u.user_name === username && u.user_password === password
  ) || database.trafficDepartment.findIndex(
    (u) => u.user_name === username && u.user_password === password
  );
  if (user && op === 'login') {
    // 登录成功，生成JWT令牌并返回给客户端
    const token = jsonwebtoken.sign({ username, role: user.user_role }, 'secret');
    if (user.user_type == 'user' && userIndex !== -1) {
      database.user[userIndex].user_onlinestatus = true
    } else if (user.user_type == 'admin' && userIndex !== -1) {
      database.admin[userIndex].user_onlinestatus = true
    } else if (user.user_type == 'trafficDepartment' && userIndex !== -1) {
      database.trafficDepartment[userIndex].user_onlinestatus = true
    }
    res.json({ token, user, data: database });
  } else if (!user && op === 'login') {
    // 登录失败，返回错误信息
    res.status(401).json({ error: 'Invalid credentials' });
  } else if (!user && op === 'register') {
    database.user.push({
      user_id: Math.max(...database.user.map(item => Number(item.user_id))) + 1,
      user_name: req.body.username,
      user_password: req.body.password,
      user_type: 'user',
      user_onlinestatus: 1,
      user_other: 1
    })
    res.json({ data: database });
  }
});
//获取用户信息
server.get(`/all`, (req, res, next) => {
  let keywords 
  let type
  if (req.query.params) {
    keywords = JSON.parse(req.query.params).key
    type = JSON.parse(req.query.params).type
  }
  if (keywords && type == 'user') {
    const userArr = database.user.filter(item => (item.user_id.toString() + item.user_name.toString() + item.user_onlinestatus.toString()).includes(keywords))
    res.json({ userArr: userArr })
    next()
  } else if (keywords && type == 'traffic') {
    const userArr = database.trafficDepartment.filter(item => (item.user_id.toString() + item.user_name.toString() + item.user_onlinestatus.toString()).includes(keywords))
    res.json({ userArr: userArr })
    next()
  } else {
    res.json({ user: database.user, traffic: database.trafficDepartment })
    next()
  }
});
//普通用户升级
server.patch(`/user/:id`, (req, res, next) => {
  if (req.body.op === 'upgrade') {
    const userId = req.params.id
    const user = database.user.find(item => item.user_id == userId)
    const userIndex = database.user.findIndex(item => item.user_id == userId)
    database.user.splice(userIndex, 1)
    database.trafficDepartment.push({
      user_id: user.user_id,
      user_name: user.user_name,
      user_password: user.user_password,
      user_type: 'department',
      user_onlinestatus: user.user_onlinestatus,
      user_other: user.user_other
    })
    database.user = database.user.reduce(function (result, current) {
      var inserted = false;
      for (var i = 0; i < result.length; i++) {
        if (current.user_id < result[i].user_id) {
          result.splice(i, 0, current);
          inserted = true;
          break;
        }
      }

      if (!inserted) {
        result.push(current);
      }
      return result;
    }, [])
    database.trafficDepartment = database.trafficDepartment.reduce(function (result, current) {
      var inserted = false;
      for (var i = 0; i < result.length; i++) {
        if (current.user_id < result[i].user_id) {
          result.splice(i, 0, current);
          inserted = true;
          break;
        }
      }

      if (!inserted) {
        result.push(current);
      }
      return result;
    }, [])
    res.json({ status: 'success' })
    next()
  } else if (req.body.op === 'status') {
    const userId = req.params.id
    const userIndex = database.user.findIndex(item => item.user_id == userId)
    database.user[userIndex].user_onlinestatus = req.body.status
    res.json({ status: 'success' })
    next()
  } else if (req.body.op === 'modify') {
    const user = req.body.user
    const userId = req.params.id
    const userIndex = database.user.findIndex(item => item.user_id == userId)
    database.user[userIndex].user_name = user.username
    database.user[userIndex].user_password = user.password
    res.json({ status: 'success' })
    next()
  }
})
//交管部门降级
server.patch(`/trafficDepartment/:id`, (req, res, next) => {
  if (req.body.op === 'degrade') {
    const trafficDepartmentId = req.params.id
    const trafficDepartment = database.trafficDepartment.find(item => item.user_id == trafficDepartmentId)
    const trafficDepartmentIndex = database.trafficDepartment.findIndex(item => item.user_id == trafficDepartmentId)
    database.trafficDepartment.splice(trafficDepartmentIndex, 1)
    database.user.push({
      // user_id: Math.max(...database.user.map(item => Number(item.user_id))) + 1,
      user_id: trafficDepartment.user_id,
      user_name: trafficDepartment.user_name,
      user_password: trafficDepartment.user_password,
      user_type: 'user',
      user_onlinestatus: trafficDepartment.user_onlinestatus,
      user_other: trafficDepartment.user_other
    })
    database.user = database.user.reduce(function (result, current) {
      var inserted = false;
      for (var i = 0; i < result.length; i++) {
        if (current.user_id < result[i].user_id) {
          result.splice(i, 0, current);
          inserted = true;
          break;
        }
      }

      if (!inserted) {
        result.push(current);
      }
      return result;
    }, [])
    database.trafficDepartment = database.trafficDepartment.reduce(function (result, current) {
      var inserted = false;
      for (var i = 0; i < result.length; i++) {
        if (current.user_id < result[i].user_id) {
          result.splice(i, 0, current);
          inserted = true;
          break;
        }
      }

      if (!inserted) {
        result.push(current);
      }
      return result;
    }, [])
    res.json({ status: 'success' })
    next()
  } else if (req.body.op === 'status') {
    const userId = req.params.id
    const userIndex = database.trafficDepartment.findIndex(item => item.user_id == userId)
    database.trafficDepartment[userIndex].user_onlinestatus = req.body.status
    res.json({ status: 'success' })
    next()
  } else if (req.body.op === 'modify') {
    const user = req.body.user
    const userId = req.params.id
    const userIndex = database.trafficDepartment.findIndex(item => item.user_id == userId)
    database.trafficDepartment[userIndex].user_name = user.username
    database.trafficDepartment[userIndex].user_password = user.password
    res.json({ status: 'success' })
    next()
  }
})
//删除普通用户或交管部门
server.delete(`/user/:id`, (req, res, next) => {
  const userId = req.params.id
  const userIndex = database.user.findIndex(item => item.user_id == userId)
  database.user.splice(userIndex, 1)
  res.json({ status: 'success' })
  next()
});
server.delete(`/trafficDepartment/:id`, (req, res, next) => {
  const userId = req.params.id
  const userIndex = database.trafficDepartment.findIndex(item => item.user_id == userId)
  database.trafficDepartment.splice(userIndex, 1)
  res.json({ status: 'success' })
  next()
});



/* event 请求 */
/* 获取所有事件 */
server.get(`/event`, (req, res, next) => {
  res.json({ event: database.event })
  next()
})
//添加事件
server.post(`/event`, (req, res, next) => {
  const event = req.body.event
  database.event.push(event)
  res.json({ event: database.event })
  next()
})
//修改事件状态
server.patch(`/event/:id`, (req, res, next) => {
  const eventId = req.params.id
  const eventIndex = database.event.findIndex(item => item.event_id == eventId)
  database.event[eventIndex].event_status = req.body.status
  res.json({ event: database.event })
  next()
})

//删除事件
server.delete(`/event/:id`, (req, res, next) => {
  const eventId = req.params.id
  const eventIndex = database.event.findIndex(item => item.event_id == eventId)
  database.event.splice(eventIndex, 1)
  res.json({ status: 'success' })
  next()
})
/* notice 请求 */

/* 获取公告 */
server.get('/notice', (req, res, next) => {
  res.json({ notice: database.notice })
  next()
})

/* 添加公告 */
server.post('/notice', (req, res, next) => {
  const notice = req.body.notice
  database.notice.push(notice)
  next()
})

/* 删除公告 */
server.delete('/notice/:id', (req, res, next) => {
  const noticeId = req.params.id
  const noticeIndex = database.notice.findIndex(item => item.notice_id == noticeId)
  database.notice.splice(noticeIndex, 1)
  next()
})
// 拦截需要验证的请求，并验证JWT令牌
server.use((req, res, next) => {
  if (req.headers.authorization && req.body.op === 'login') {
    const token = req.headers.authorization.replace('Bearer ', '');
    try {
      const decoded = jsonwebtoken.verify(token, 'secret');
      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).json({ error: 'Invalid token' });
    }
  } else if (req.headers.authorization && req.body.op === 'login') {
    res.status(401).json({ error: 'Token not provided' });
  } else if (req.body.op === 'register') {
    next()
  }
});

//修改事件
// 将路由挂载到JSON Server实例
server.use(router);

// 启动JSON Server
server.listen(5050, () => {
  console.log('JSON Server is running');
});
