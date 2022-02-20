import request from '@/api/request.js'

// 查询设备记录数据
export function getEquipmentAPI(page, limit) {
  const data = {
    _page: page,
    _limit: limit,
  }
  return request.get('equipment/get', data)
}

// 有时间区间的设备记录查询
export function getTimeEquipmentAPI(page, limit, start, end) {
  const data = {
    _page: page,
    _limit: limit,
    _start: start,
    _end: end,
  }
  return request.get('equipment/gettime', data)
}

// 查询设备使用日志长度
export function getEquipmentLength() {
  return request.get('equipment/getLength')
}
