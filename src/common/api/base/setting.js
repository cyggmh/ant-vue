import { EzPost } from '../../util/request/EzRequest'

export default {
  // 获取字典code集合
  getDictCodeList (param) {
    return EzPost('sys/setting/sys-datadictionary-code/getlist', param, 'obj', { loading: { show: false, text: '正在获取字典CODE集合，请稍等...' } })
  },
  // 根据字典code集合 获取字典数据集合
  getSysDatadVListByDCodes (codes, success) {
    return EzPost('sys/setting/sys-datadictionary-value/getSysDatadVListByDCodes', { data: { codes: JSON.stringify(codes) }, success: success }, 'obj', { loading: { show: false, text: '正在获取字典数据集合，请稍等...' } })
  },
  // 根据字典code 获取字典数据集合
  getSysDatadVListByDCode (code, success) {
    return EzPost('sys/setting/sys-datadictionary-value/getSysDatadVListByDCode', { data: { code: code }, success: success }, 'obj', { loading: { show: false, text: '正在获取字典数据集合，请稍等...' } })
  }
}
