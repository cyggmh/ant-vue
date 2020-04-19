// 导入自己需要的组件
import { Table, TableColumn, Rate } from 'element-ui'
const element = {
  install: function (Vue) {
    Vue.use(Table)
    Vue.use(TableColumn)
    Vue.use(Rate)
  }
}
export default element
