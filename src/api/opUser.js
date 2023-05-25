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

const upgradeUserApi = (id, data) => {
  return opInfo({
    url: `/user/${id}`,
    method: 'PATCH',
    data: data
  })
}
const degradeUserApi = (id, data) => {
  return opInfo({
    url: `/trafficDepartment/${id}`,
    method: 'PATCH',
    data: data
  })
}

export { deleteUserApi, deleteTrafficDepartmentApi, upgradeUserApi, degradeUserApi }
