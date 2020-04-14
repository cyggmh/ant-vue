export function showEzLoading (tishi) {
  const idKey = uuid()
  var str = '<div id="' + idKey + '" class="ez-loading"\n' +
    '     style="height: 100%;width: 100%;position: fixed;background-color: rgba(47,49,50,0.53);top: 0px;z-index: 10000">\n' +
    '  <div style="display: flex;height: 100%">\n' +
    '    <div style="flex: 1"></div>\n' +
    '    <div style="height: 100%;display: flex;flex-direction: column">\n' +
    '      <div style="flex: 1"></div>\n' +
    '      <div style="display: flex">\n' +
    '        <div style="flex: 1"></div>\n' +
    '        <div style="height: 86px;width: 86px;background-color: rgba(69,74,80,0.85);padding-top: 36px;border-radius: 10px;padding-left: 10px">\n' +
    '          <div class="ez-loading-item"></div>\n' +
    '          <div class="ez-loading-item"></div>\n' +
    '          <div class="ez-loading-item"></div>\n' +
    '          <div class="ez-loading-item"></div>\n' +
    '          <div class="ez-loading-item"></div>\n' +
    '        </div>\n' +
    '        <div style="flex: 1"></div>\n' +
    '      </div>\n' +
    '      <div style="color: #f3f3f3;font-size: 14px;margin-top: 10px;font-weight: 500;padding: 10px;background-color: rgba(69,74,80,0.85);border-radius: 5px">\n' +
    '        ' + (tishi || '数据处理中,请稍后...') +
    '      </div>\n' +
    '      <div style="height: 60px"></div>\n' +
    '      <div style="flex: 1"></div>\n' +
    '    </div>\n' +
    '    <div style="flex: 1"></div>\n' +
    '  </div>\n' +
    '</div>'
  const dom = document.getElementsByTagName('body')[0]
  dom.insertAdjacentHTML('beforeEnd', str)
  return idKey
}
export function closeEzLoading (idKey) {
  var box = document.getElementById(idKey)
  if (box) {
    box.remove()
  }
}
function uuid () {
  var s = []
  var hexDigits = '0123456789abcdef'
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }
  s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = '-'

  var uuid = s.join('')
  return uuid
}
