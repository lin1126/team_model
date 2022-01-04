import request from '@/api/request.js'

// 获取相应课程的留言
export function getCourseMessage(data) {
  return request.get('/message/getMessage', data)
}

// 留言
export function setCourseMessage(data) {
  return request.post('/message/setMessage', data)
}

// 回复留言的子留言
export function setCourseMesChildren(data) {
  return request.post('/MessChildren/setMessChildren', data)
}
