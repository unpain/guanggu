import axios from "axios";

const opInfo = axios.create({
  baseURL: 'http://localhost:5050',
  timeout: 3000
})

export { opInfo }
