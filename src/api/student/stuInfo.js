import request from '@/api/request.js'
// 修改用户信息
export function updateInfo(id, filed, data) {
  const msg = { _id: id, _field: filed, _data: data }
  return request.get('/student/update', msg)
}
