import { EzPost } from '../../util/request/EzRequest'

export default {
  // 公会奖励列表
  rewardList (param) {
    return EzPost('rewardList', param, 'obj')
  },
  // 公会奖励详情
  rewardInfo (param) {
    return EzPost('rewardInfo', param, 'obj')
  },
  // 公会奖励新增
  rewardAdd (param) {
    return EzPost('rewardAdd', param, 'obj')
  },
  // 公会奖励更新
  rewardUpdate (param) {
    return EzPost('rewardUpdate', param, 'obj')
  },
  // 公会奖励删除
  rewardDel (param) {
    return EzPost('rewardDel', param, 'obj')
  },
  // 公会奖励生成兑换码
  rewardCode (param) {
    return EzPost('rewardCode', param, 'obj')
  },
  // 公会奖励生成兑换码列表
  rewardCodeList (param) {
    return EzPost('rewardCodeList', param, 'obj')
  },
  // 公会奖励生成兑换码列表
  rewardUseCodeList (param) {
    return EzPost('rewardUseCodeList', param, 'obj')
  }
}
