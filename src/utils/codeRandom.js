/*************
 * 生成验证码随机数
 * 传入需要生成验证码的长度
 *************/

const checkCodeofRandom = function (codeLength) {
  let randomCode = ''
  const codeStr = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  for (var i = 0; i < codeLength; i++) {
    const randomIndex = codeStr.length - 1
    randomCode += codeStr[Math.floor(Math.random() * randomIndex)]
  }
  return randomCode
}

module.exports = {
  checkCodeofRandom,
}
