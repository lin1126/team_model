import request from '@/api/request.js'

// 查询温湿度数据
export const getHumidifierAPILi = (page, limit) => {
  return new Promise((resolve, reject) => {
    const data = {
      _page: page,
      _limit: limit,
    }
    resolve(request.get('humiture/get', data))
  })
}
