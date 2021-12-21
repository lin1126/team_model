import request from '@/api/request.js'
// 获取课程列表
export function getCourse(data) {
  return request.get('/course/getCourse', data)
}
