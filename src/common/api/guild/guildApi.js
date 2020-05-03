import { EzPost } from '../../util/request/EzRequest'

export default {
  // 公会详情
  guildInfo (param) {
    return EzPost('guildInfo', param, 'obj')
  }
}
