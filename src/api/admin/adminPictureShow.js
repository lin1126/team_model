import request from '@/api/request.js'
// 获取教室采集图片
export function getPictureApi(page, limit) {
  const data = {
    _skip: page,
    _limit: limit,
  }

  return request.get('picture/get', data)
}

// 获取教室采集图片
export function getPictureByTimeApi(start, stop, page, limit) {
  const data = {
    _start: start,
    _stop: stop,
    _skip: page,
    _limit: limit,
  }

  return request.get('picture/getForTime', data)
}
