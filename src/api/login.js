import { opInfo } from "./request";

const getInfoApi = () => {
  return opInfo({
    url: '/user',
    methods: 'GET'
  })
}
export { getInfoApi }
