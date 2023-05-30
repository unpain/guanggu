import { opInfo } from "./request"

const getNoticeApi = () => {
  return opInfo({
    url: '/notice',
    method: 'GET',
  })
}

const postNoticeApi = (data) => {
  return opInfo({
    url: '/notice',
    method: 'POST',
    data: {
      info:data
    }
  })
}

const deleteNoticeApi = (id) => {
  return opInfo({
    url: `/notice/${id}`,
    method: 'DELETE'
  })
}

export { getNoticeApi, deleteNoticeApi, postNoticeApi }
