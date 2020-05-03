import { EzPost } from '../../util/request/EzRequest'

export default {
  // 任务信息列表
  taskList (param) {
    return EzPost('taskList', param, 'obj')
  },
  // 任务信息详情
  taskInfo (param) {
    return EzPost('taskInfo', param, 'obj')
  },
  // 任务信息新增
  taskAdd (param) {
    return EzPost('taskAdd', param, 'obj')
  },
  // 任务信息更新
  taskUpdate (param) {
    return EzPost('taskUpdate', param, 'obj')
  },
  // 任务信息删除
  taskDel (param) {
    return EzPost('taskDel', param, 'obj')
  },
  // 任务记录列表
  taskRecordList (param) {
    return EzPost('taskRecordList', param, 'obj')
  }
}
