import { opInfo } from './request'
const getEventApi = () => {
  return opInfo({
    url: '/event',
    method: 'GET'
  })
}

const postNewEventApi = (data) => {
  return opInfo({
    url: '/event',
    method: 'POST',
    data: {
      event: data
    }
  })
}

const modifyEventStatusApi = (id, status) => {
  return opInfo({
    url: `/event/${id}`,
    method: 'PATCH',
    data: {
      status: status
    }
  })
}

const deleteEventApi = (id) => {
  return opInfo({
    url: `/event/${id}`,
    method: 'DELETE'
  })
}
export { getEventApi, modifyEventStatusApi, postNewEventApi, deleteEventApi }
