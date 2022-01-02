import request from '@/api/request.js'
// 获取课程列表
export function getCourse(data) {
  return request.get('/notice/getNotice', data)
}
// 将课程通知状态修改为已读
export function readCourseNotice(id) {
  const data = {
    _id: id,
    _state: 'true',
  }
  return request.post('/notice/readNotice', data)
}
// 一键已读
export function readAllCourseNotice(ID) {
  const data = {
    _ID: ID,
  }
  return request.post('/notice/readAllNotice', data)
}

// 删除一条通知
export function delCourseNotice(id) {
  const data = {
    _id: id,
  }
  return request.post('/notice/delNotice', data)
}

// 删除选中的课程
export function delCheckedNotice(id) {
  const data = {
    _id: id,
  }
  return request.post('/notice/delCheckedNotice', data)
}
