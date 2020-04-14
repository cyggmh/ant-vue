import { EzPost } from '../../util/request/EzRequest'

export default {
  getList (param) {
    return EzPost('sys/ez-role/getlistAndMember', param, 'obj')
  },
  add (param) {
    return EzPost('sys/ez-role/add', param, 'jstr', { loading: { show: true, text: '正在保存...' } })
  },
  getDetail (param) {
    return EzPost('sys/ez-role/getdetail', param, 'obj')
  },
  update (param) {
    return EzPost('sys/ez-role/update', param, 'jstr', { loading: { show: true, text: '正在保存修改数据...' } })
  }
}
