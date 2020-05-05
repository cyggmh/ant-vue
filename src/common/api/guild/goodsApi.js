import { EzPost } from '../../util/request/EzRequest'

export default {
  // 商品列表
  goodsList (param) {
    return EzPost('goodsList', param, 'obj')
  },
  // 商品详情
  goodsInfo (param) {
    return EzPost('goodsInfo', param, 'obj')
  },
  // 商品新增
  goodsAdd (param) {
    return EzPost('goodsAdd', param, 'obj')
  },
  // 商品更新
  goodsUpdate (param) {
    return EzPost('goodsUpdate', param, 'obj')
  },
  // 商品删除
  goodsDel (param) {
    return EzPost('goodsDel', param, 'obj')
  },
  // 商品库存修改
  goodsNum (param) {
    return EzPost('goodsNum', param, 'obj')
  }
}
