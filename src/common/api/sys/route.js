import { EzPost } from '../../util/request/EzRequest'

export default {
  getList (param) {
    return EzPost('sys/ez-route/getlist', { data: param }, 'obj')
  },
  getList2 (param) {
    return EzPost('sys/ez-route/getlist', param, 'obj')
  },
  add (param) {
    return EzPost('sys/ez-route/add', { data: param }, 'jstr', { loading: { show: true, text: '正在保存...' } })
  },
  update (param) {
    return EzPost('sys/ez-route/update', { data: param }, 'jstr', { loading: { show: true, text: '正在提交数据...' } })
  },
  del (id) {
    return EzPost('sys/ez-route/del', { data: { id: id } }, 'obj', { loading: { show: true, text: '正在删除...' } })
  }
}
