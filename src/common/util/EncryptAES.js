var crypto = require('crypto')
// 加密
var defkey = 'ezlijinwei980127'
function encryption (data, key) {
  if (!key || key === '' || key.length < 16) {
    key = defkey
  }
  var iv = ''
  var clearEncoding = 'utf8'
  var cipherEncoding = 'base64'
  var cipherChunks = []
  var cipher = crypto.createCipheriv('aes-128-ecb', key, iv)
  cipher.setAutoPadding(true)

  cipherChunks.push(cipher.update(data, clearEncoding, cipherEncoding))
  cipherChunks.push(cipher.final(cipherEncoding))

  return cipherChunks.join('')
}
// 解密
function decryption (data, key) {
  if (!key || key === '') {
    key = defkey
  }
  var iv = ''
  var clearEncoding = 'utf8'
  var cipherEncoding = 'base64'
  var cipherChunks = []
  var decipher = crypto.createCipheriv('aes-128-ecb', key, iv)
  decipher.setAutoPadding(true)

  cipherChunks.push(decipher.update(data, cipherEncoding, clearEncoding))
  cipherChunks.push(decipher.final(clearEncoding))

  return cipherChunks.join('')
}
export {
  encryption,
  decryption
}
