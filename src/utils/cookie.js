// time为销毁的时间，以s为单位
export function setCookie(key, value, time) {
  var date = new Date()
  date.setTime(date.getTime() + time * 1000)
  document.cookie = `${key}=${value};expires="${date.toUTCString()}`
}
// 获取cookie中相应key的值，若有的话返回值，没有的话返回false
export function getCookie(cname) {
  if (document.cookie.length > 0) {
    let ctart = document.cookie.indexOf(cname + '=')
    if (ctart !== -1) {
      ctart = ctart + cname.length + 1
      let cend = document.cookie.indexOf(';', ctart)
      if (cend === -1) {
        cend = document.cookie.length
      }
      return unescape(document.cookie.substring(ctart, cend))
    }
  }
  return false
}
