import request from '@/api/request.js'

// 获取班级
export function getStuList(data) {
  return request.post('class/getStudent', data)
}

// 根据学号获取学生信息
export function getStuInfo(data) {
  return request.post('class/getStuInfo', data)
}

// 添加学生
export function addStudent(data) {
  return request.post('class/addStudent', data)
}

// 删除学生
export function delStudent(data) {
  return request.post('class/delStudent', data)
}
