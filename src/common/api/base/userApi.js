import { EzPost } from '../../util/request/EzRequest'

export default {
  // 用户登录接口
  doLogin (param) {
    return EzPost('auth/login/dologin', param, 'obj', { loading: { show: true, text: '正在登录，请稍等...' } })
  },
  // 获取用户菜单接口
  getUserRoute (param) {
    return EzPost('auth/user/getUserRoute', param, 'obj', { loading: { show: true, text: '正在拉去菜单信息，请稍等...' } })
  },
  // 获取用户信息接口
  getUserInfo (param) {
    return EzPost('auth/user/getUserInfo', param, 'obj', { loading: { show: true, text: '正在获取用户信息，请稍等...' } })
  },
  getTest (param) {
    return EzPost('http://foshanbeta.shmedia.tech/media-basic-live/api/live/activity/detail', param, 'obj', { loading: { show: true, text: '正在获取佛山测试，请稍等...' } })
  }
}
