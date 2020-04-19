/**
 * *********************************** /状态/格式/常量/公共函数/ 统一管理 ****************************
 **/
// 判断是否为空
export function isNotEmpty (str) {
  if (str !== null && str !== undefined && str !== '') {
    return true
  }
  return false
}
// 格式转化
export function statusFormat (arr, status) {
  const thisData = arr.find((data) => {
    return data.value === status + '' ? data : ''
  })
  return thisData !== undefined ? thisData.label : ''
}
// 常量 处方状态
export const presStatusList = [
  { value: '', label: '全部' },
  { value: '0', label: '其他' },
  { value: '1', label: '待处理' },
  { value: '2', label: '待受理' },
  { value: '3', label: '待审批' },
  { value: '4', label: '待支付' },
  { value: '5', label: '支付中' },
  { value: '6', label: '已支付' },
  { value: '7', label: '购药中' },
  { value: '8', label: '已完成' },
  { value: '9', label: '已拒绝' },
  { value: '10', label: '已失效' }
]
export function formatPresStatusHandel (val) {
  return statusFormat(presStatusList, val)
}

// ----------------------------------格式化单位----------------------------------------------------
export const DRUG_DOSAGE_UNIT = [
  { value: '0', label: '盒' },
  { value: '1', label: '瓶' },
  { value: '2', label: '粒' },
  { value: '3', label: '包' }
]
export function formatUnitHandel (val) {
  return statusFormat(DRUG_DOSAGE_UNIT, val)
}
// ----------------------------------格式化类型----------------------------------------------------
export const typeList = [ { value: '0', label: '院内' }, { value: '1', label: '院外' } ]
export function formatTypeHandel (val) {
  return statusFormat(typeList, val)
}
// ----------------------------------购药方式----------------------------------------------------
export const BuyMedicineType = [
  { value: '', label: '全部' },
  { value: '1', label: '到店购药' },
  { value: '2', label: '付费自取' },
  { value: '3', label: '付费配送' }
]
export function formatBuyMedicineType (val) {
  return statusFormat(BuyMedicineType, val)
}
// ----------------------------------配药单状态----------------------------------------------------
export const dispStatusList = [
  { value: '', label: '全部' },
  { value: '0', label: '其他' },
  { value: '1', label: '待受理' },
  { value: '2', label: '待审核' },
  { value: '3', label: '待支付' },
  { value: '4', label: '已支付' },
  { value: '5', label: '待发货' },
  { value: '6', label: '待取药' },
  { value: '7', label: '待收货' },
  { value: '8', label: '已完成' },
  { value: '9', label: '已取消' },
  { value: '10', label: '已失效' }
]
export function formatdispStatus (val) {
  return statusFormat(dispStatusList, val)
}
// ----------------------------------购药状态----------------------------------------------------
export const buyStatusList = [ { value: '0', label: '未购' }, { value: '1', label: '已购' } ]
export function formatBuyStatus (val) {
  return statusFormat(buyStatusList, val)
}

// -----------------------------------性别转换---------------------------------------------------
export const genderList = [ { value: '0', label: '男' }, { value: '1', label: '女' } ]
export function getGender (gender) {
  return statusFormat(genderList, gender)
}

// 分页数量
export const PAGE_SIZE = [10, 50, 150]

// -----------------------------------是否有效---------------------------------------------------
export const validList = [ { value: '0', label: '无效' }, { value: '1', label: '有效' } ]
export function formatValidStatus (val) {
  return statusFormat(validList, val)
}

// -----------------------------------是否维护价格---------------------------------------------------
export const isPriceList = [ { value: '0', label: '否' }, { value: '1', label: '是' } ]
export function formatisPrice (val) {
  return statusFormat(isPriceList, val)
}

// -----------------------------------医师账号是否激活---------------------------------------------------
export const accountStatusList = [ { value: '0', label: '未激活' }, { value: '1', label: '已激活' } ]
export function formatAccountStatus (val) {
  return statusFormat(accountStatusList, val)
}

// -----------------------------------是否与APP账号绑定---------------------------------------------------
export const appAccountStatusList = [ { value: '0', label: '未绑定' }, { value: '1', label: '已绑定' } ]
export function formatappAccountStatusList (val) {
  return statusFormat(appAccountStatusList, val)
}

// -----------------------------------医保目录---------------------------------------------------
export const miDirectoryList = [ { value: '0', label: '是' }, { value: '1', label: '否' } ]
export function formatmiDirectory (val) {
  return statusFormat(miDirectoryList, val)
}

// -----------------------------------医院签约状态---------------------------------------------------
export const signList = [ { value: '0', label: '未签约' }, { value: '1', label: '已签约' } ]
export function formatHospitalSign (val) {
  return statusFormat(signList, val)
}
