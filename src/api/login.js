import request from '@/api/request.js'

export function login(data) {
  return request.post('login', data)
}
