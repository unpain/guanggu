import { opInfo } from "./request";

const getInfoApi = () => {
  return opInfo({
    url: '/users',
    methods: 'GET'
  })
}
const postInfoApi = (data) => {
  return opInfo({
    url: '/users',
    method: 'POST',
    data: data
  })
}
export { getInfoApi, postInfoApi }
