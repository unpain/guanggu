import { opInfo } from "./request"

const deleteUserApi = (id) => {
  return opInfo({
    url: `/users/${id}`,
    method: 'DELETE'
  })
}

export { deleteUserApi }
