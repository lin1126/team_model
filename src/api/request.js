import service from './service'

function request(url, params, method) {
  return new Promise((resolve, reject) => {
    let data = {}
    // get请求使用params字段
    if (method === 'get') data = { params }
    // post 请求使用params字段
    if (method === 'post') data = { data: params }
    service({
      url,
      method,
      ...data,
    })
      .then((res) => {})
      .catch((error) => {
        console.log(error)
      })
  })
}
// 封装GET请求
function get(url, params) {
  return request(url, params, 'get')
}
// 封装POST请求
function post(url, params) {
  return request(url, params, 'post')
}
export default {
  get,
  post,
}
