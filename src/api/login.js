import { opInfo } from "./request";

const getInfoApi = () => {
  return opInfo({
    url: '/user'||'/admin'||'/department',
    method: 'GET'
  })
}
const postInfoApi = (data) => {
  return opInfo({ 
    url: '/user'||'/admin'||'/department',
    method: 'POST',
    data: data
  })
}
export { getInfoApi, postInfoApi }
