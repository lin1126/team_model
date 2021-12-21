import axios from 'axios'
import { Message, Loading } from 'element-ui'
// 引入过去cookie的函数
import { getCookie } from '@/utils/cookie.js'

// const configBaseURL = 'http://39.105.106.13:3000/api/'
const configBaseURL = 'http://127.0.0.1:3000/api/'
let loadingInstance = null

// 创建axios实例,并导出
const Service = axios.create({
  timeout: 10000, // 请求超时时间
  baseURL: configBaseURL,
  headers: {
    post: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
  },
})
// 添加请求拦截器
Service.interceptors.request.use((config) => {
  // 显示加载图标层
  loadingInstance = Loading.service({
    lock: true,
    text: '拼命加载中',
  })
  // 添加token头部
  const token = getCookie('Token')
  if (token) {
    config.headers.authorization = token // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
  }
  return config
})
// 添加响应拦截器
Service.interceptors.response.use(
  (response) => {
    loadingInstance.close()
    return response.data
  },
  (error) => {
    console.log('TCL: error', error)
    const msg = error.Message !== undefined ? error.Message : ''
    Message({
      message: '网络错误' + msg,
      type: 'error',
      duration: 3 * 1000,
    })
    loadingInstance.close()
    return Promise.reject(error)
  }
)

export default Service
