import { opInfo } from "./request";

const getInfoApi = () => {
  return opInfo({
    url: '/all',
    method: 'GET'
  })
}
const postInfoApi = (data) => {
  return opInfo({ 
    url: '/all',
    method: 'POST',
    data: data
  })
}
export { getInfoApi, postInfoApi }
