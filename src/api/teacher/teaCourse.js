import request from '@/api/request.js'
// 获取课程
export function getTeaCourse(data) {
  return request.get('course/getTeachCourse', data)
}
// 获取年级
export function getGrade() {
  return request.get('student/getGrade')
}
// 获取专业
export function getCareer(data) {
  return request.get('student/getCareer', data)
}
// 获取班级
export function getClass(data) {
  return request.get('student/getClass', data)
}
