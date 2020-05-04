import { EzPost } from '../../util/request/EzRequest'

export default {
  // 图片列表
  imagesList (param) {
    return EzPost('imagesList', param, 'obj')
  }
}
