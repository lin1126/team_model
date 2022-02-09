import request from '@/api/request.js'

// 根据学号和课程号获取相应的课程通知
export function getCourseNotice(data) {
  return request.get('/notice/getTeaNotice', data)
}

// 添加课程通知
export function addCourseNotice(data) {
  return request.post('/notice/addNotice', data)
}

// 修改课程状态
export function changeCourseState(data) {
  return request.post('/course/chageState', data)
}

// 删除课程
export function delCourse(data) {
  return request.post('/course/delCourse', data)
}
