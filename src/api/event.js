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
    data: data
  })
}

const modifyEventStatusApi = (id, data) => {
  return opInfo({
    url: `/event/${id}`,
    method: 'PATCH',
    data: data
  })
}
export { getEventApi, modifyEventStatusApi, postNewEventApi }
