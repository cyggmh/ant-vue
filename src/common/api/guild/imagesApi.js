import { EzPost } from '../../util/request/EzRequest'

export default {
  // 图片列表
  imagesList (param) {
    return EzPost('imagesList', param, 'obj')
  },
  // 商品图片列表
  imagesGoods (param) {
    return EzPost('imagesGoods', param, 'obj')
  }
}
