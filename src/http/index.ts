import axios from "axios"
import serverConfig from "./config"

const serviceAxios = axios.create({
  baseURL: serverConfig.baseURL,
  timeout: 5000,
  headers: {
    "Content-type":"application/json"
  }
})

serviceAxios.interceptors.request.use((config) => {
  config.headers = config.headers || {}
  // if (serverConfig.useTokenAuthorization) {
  //     config.headers["Authorization"] = 'Bearer ' + localStorage.getItem("token")
  //   }
    return config
  })


serviceAxios.interceptors.response.use((response) => {
    return response.data
  },
  (error) => {
    return Promise.reject(error)
  }
)
export default serviceAxios