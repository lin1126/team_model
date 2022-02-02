import request from '@/api/request.js'

// 获取班级
export function getStuList(data) {
  return request.post('class/getStudent', data)
}

// 根据学号获取学生信息
export function getStuInfo(data) {
  return request.post('class/getStuInfo', data)
}
