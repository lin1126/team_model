import request from '@/api/request.js'

export function getTeaCourse(data) {
  return request.get('course/getTeachCourse', data)
}
