import request from '@/api/request.js'

// 获取相应课程的留言
export function getCourseMessage(data) {
  return request.get('/message/getMessage', data)
}
