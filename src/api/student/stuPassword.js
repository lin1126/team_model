import request from '@/api/request.js'
// 修改用户密码
export function updatePwd(id, oldPwd, newPwd) {
  const msg = { _id: id, _old: oldPwd, _new: newPwd }
  return request.post('/student/updatePwd', msg)
}
