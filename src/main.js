// with polyfills
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import { VueAxios } from './utils/request'
import moment from 'moment'
// mock
// WARNING: `mockjs` NOT SUPPORT `IE` PLEASE DO NOT USE IN `production` ENV.
import './mock'

import bootstrap from './core/bootstrap'
import './core/lazy_use'
import './permission' // permission control
import './utils/filter' // global filter
import './components/antpro/global.less'
import EzView from './components/ezui/ezview'
import EzImgUpload from './components/ezui/ezimgupload'
import { toTreeData } from './common/util/Data2Tree'
import SettingApi from './common/api/base/setting'
import { showEzLoading, closeEzLoading } from './common/util/EzLoading'
import 'element-ui/lib/theme-chalk/index.css'
import element from './config/element'
import defParam from './config/defParam'

Vue.use(element)

Vue.config.productionTip = false
// mount axios Vue.$http and this.$http
Vue.use(VueAxios)
Vue.use(EzView)
Vue.use(EzImgUpload)
Vue.prototype.$ez = {
  param: {
    serveUrl: defParam.serveUrl,
    dateFormat: 'YYYY-MM-DD',
    dateTimeFormat: 'YYYY-MM-DD HH:mm:ss'
  },
  fun: {
    // 获取字典code 列表
    getDictCode (param) {
      return SettingApi.getDictCodeList(param)
    },
    // 根据字典code集合 获取字典数据集合
    getDictVByCodes (codes, success) {
      return SettingApi.getSysDatadVListByDCodes(codes, success)
    },
    // 根据字典code 获取字典数据集合
    getDictVByCode (code, success) {
      return SettingApi.getSysDatadVListByDCode(code, success)
    },
    // 根据(data1和data2相同字段)将data2的 赋值 给 data1
    copySameKeyV (data1, data2) {
      Object.keys(data1).forEach(key => { data1[key] = data2[key] })
    },
    showEzLoading (showText) {
      return showEzLoading(showText)
    },
    closeEzLoading (idKey) {
      return closeEzLoading(idKey)
    },
    // Ant 日期控件使用
    moment,
    formDataFormat (data, formatList) {
      for (const item of formatList) {
        if (data[item]) {
          data[item] = data[item].format('YYYY-MM-DD HH:mm:ss')
        }
      }
    },
    // 根据传进来的参数返回图片正确地址
    getImg (urlStr) {
      const url = urlStr.substr(0, 4) === 'http' ? urlStr : Vue.prototype.$ez.param.serveUrl + urlStr
      return url
    },
    // 普通list数据转树形数据结构
    data2Tree: (data, pid) => toTreeData(data, pid)
  }
}

new Vue({
  router,
  store,
  created: bootstrap,
  render: h => h(App)
}).$mount('#app')
