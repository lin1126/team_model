import request from '@/api/request.js'

// 根据学号和课程号获取相应的课程通知
export function getCourseNotice(data) {
  return request.get('/notice/getTeaNotice', data)
}

// 添加课程通知
export function addCourseNotice(data) {
  return request.post('/notice/addNotice', data)
}
