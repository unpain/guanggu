import { opInfo } from "./request"

const deleteUserApi = (id) => {
  return opInfo({
    url: `/user/${id}`,
    method: 'DELETE'
  })
}
const deleteTrafficDepartmentApi = (id) => {
  return opInfo({
    url: `/trafficDepartment/${id}`,
    method: 'DELETE'
  })
}

const upgradeUserApi = (id) => {
  return opInfo({
    url: `/user/${id}`,
    method: 'PATCH',
    data: {
      op: 'upgrade'
    }
  })
}
const degradeTrafficDepartmentApi = (id) => {
  return opInfo({
    url: `/trafficDepartment/${id}`,
    method: 'PATCH',
    data: {
      op: 'degrade'
    }
  })
}

const setTrafficStatusApi = (id, status) => {
  return opInfo({
    url: `/trafficDepartment/${id}`,
    method: 'PATCH',
    data: {
      op: 'status',
      status: status
    }
  })
}
const setUserStatusApi = (id, status) => {
  return opInfo({
    url: `/user/${id}`,
    method: 'PATCH',
    data: {
      op: 'status',
      status: status
    }
  })
}

const modifyTrafficInfoApi = (id, user) => {
  return opInfo({
    url: `/trafficDepartment/${id}`,
    method: 'PATCH',
    data: {
      op: 'modify',
      user: user
    }
  })
}

const modifyUserInfoApi = (id, user) => {
  return opInfo({
    url: `/user/${id}`,
    method: 'PATCH',
    data: {
      op: 'modify',
      user: user
    }
  })
}

const searchInfoApi = (key,type)=>{
  return opInfo({
    url:`/all?params={"key":"${key}","type":"${type}"}`,
    method:'GET'
  })
}
export {
  deleteUserApi,
  deleteTrafficDepartmentApi,
  upgradeUserApi,
  degradeTrafficDepartmentApi,
  setTrafficStatusApi,
  setUserStatusApi,
  modifyUserInfoApi,
  modifyTrafficInfoApi,
  searchInfoApi
}
