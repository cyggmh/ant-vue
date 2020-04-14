import { EzPost } from '../../util/request/EzRequest'

export default {
  // 字典code 管理 =======================
  getDictionaryCodePage (param) {
    console.log(param)
    return EzPost('sys/setting/sys-datadictionary-code/getpage', { data: param }, 'obj')
  },
  delCodeById (id) {
    return EzPost('sys/setting/sys-datadictionary-code/del', { data: { id: id } }, 'obj', { loading: { show: true, text: '正在删除字典CODE...' } })
  },
  addCode (param) {
    return EzPost('sys/setting/sys-datadictionary-code/add', param, 'jstr', { loading: { show: true, text: '创建字典CODE数据...' } })
  },
  updateCode (param) {
    return EzPost('sys/setting/sys-datadictionary-code/update', param, 'jstr', { loading: { show: true, text: '更新字典VALUE数据...' } })
  },
  // 字典value 管理 =======================
  getDictionaryValuePage (param) {
    console.log(param)
    return EzPost('sys/setting/sys-datadictionary-value/getpage', { data: param }, 'obj')
  },
  delValueById (id) {
    return EzPost('sys/setting/sys-datadictionary-value/del', { data: { id: id } }, 'obj', { loading: { show: true, text: '正在删除字典VALUE...' } })
  },
  addValue (param) {
    return EzPost('sys/setting/sys-datadictionary-value/add', param, 'jstr', { loading: { show: true, text: '创建字典VALUE数据...' } })
  },
  updateValue (param) {
    return EzPost('sys/setting/sys-datadictionary-value/update', param, 'jstr', { loading: { show: true, text: '更新字典VALUE数据...' } })
  }
}
