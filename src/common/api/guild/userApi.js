import { EzPost } from '../../util/request/EzRequest'

export default {
  // 用户列表
  userList (param) {
    return EzPost('userList', param, 'obj')
  },
  // 用户详情
  userInfo (param) {
    return EzPost('userInfo', param, 'obj')
  }
}
