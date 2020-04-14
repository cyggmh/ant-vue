export function GetPageData (res, pageData) {
  pageData.pageNo = res.data.current
  pageData.pageSize = res.data.size
  pageData.total = res.data.total
  return res.data.records
}
