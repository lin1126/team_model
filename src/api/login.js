import request from '@/api/service.js'

export function login(data) {
  return request.post('login', data)
}
