import { EzPost } from '../../util/request/EzRequest'

export default {
  getUserPage (param) {
    console.log(param)
    return EzPost('sys/ez-user/getpage', { data: param }, 'obj')
  },
  Home (param) {
    console.log(param)
    return EzPost('home', { data: param }, 'obj')
  },
  addUser (param) {
    return EzPost('sys/ez-user/add', { data: param }, 'jstr', { loading: { show: true, text: '正在保存...' } })
  },
  updUser (param) {
    return EzPost('sys/ez-user/update', { data: param }, 'jstr', { loading: { show: true, text: '正在更改用户信息...' }, passStatus: [400] })
  },
  getById (id) {
    return EzPost('sys/ez-user/getDetail', { data: { id: id } }, 'obj')
  },
  delById (id) {
    return EzPost('sys/ez-user/del', { data: { id: id } }, 'obj', { loading: { show: true, text: '正在删除用户...' } })
  }
}
