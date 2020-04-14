import axiosxs from 'axios'
import qs from 'qs'
import defParam from '@/config/defParam'
import { showEzLoading, closeEzLoading } from '../EzLoading'
import Antd from 'ant-design-vue'
import store from '../../../store'
// import Vue from 'vue'

var axios = axiosxs.create()
axios.defaults.timeout = 10000
axios.defaults.baseURL = ''

// var hostaddress = 'http://t9801.vsites.cn/jiedai/'
var hostaddress = defParam.serveUrl

/**
 * 处理返回jsonObj参数
 * @param data
 * @returns qs.stringify(data)
 */
function getdata (data) {
  return qs.stringify(data, { indices: false })
}

/**
 * 处理返回jsonStr参数
 * @param data
 * @returns JSON.stringify(data)
 */
function getdataJson (data) {
  return JSON.stringify(data)
}

// 拼装路由
function geturl (url) {
  return (url.substr(0, 4) === 'http') ? url : (hostaddress + url)
}

// 拦截封装header
axios.interceptors.request.use(
  config => {
    // console.log(store.modules.base.login.state.accesstoken)
    // let token = store.state.base.login.accesstoken
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 参数类型
var pmtype = {
  jsonObj: 'obj',
  jsonStr: 'jstr'
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function EzPost (url, param, paramtype, config) {
  let headers = {}
  if (store.getters.accessToken && store.getters.accessToken.length > 0) {
    headers = {
      accessToken: store.getters.accessToken
    }
    // config.headers.accessToken = token
  }
  let loadingIdKey = ''
  let showEzl = false
  if (config) {
    if (config.loading.show) {
      showEzl = true
      loadingIdKey = showEzLoading(config.loading.text)
    }
  }
  const data = param['data']
  var pdata = paramtype === pmtype.jsonStr ? getdataJson(data) : getdata(data)
  return new Promise((resolve, reject) => {
    axios.post(geturl(url), pdata,
      { headers: Object.assign(headers, {
        'content-type': paramtype === pmtype.jsonStr
          ? 'application/json' : 'application/x-www-form-urlencoded;charset=UTF-8' }) })
      .then(response => {
        if (showEzl && loadingIdKey) {
          setTimeout(function () {
            closeEzLoading(loadingIdKey)
          }, 500)
        }
        response.data = Object.assign({ config: config }, response.data)
        if (param.success) {
          if (response.data.code === 0) {
            // param.success(JSON.parse(JSON.stringify(response.data)))
            setTimeout(param.success(JSON.parse(JSON.stringify(response.data))), 10)
          }
        }
        // resultFilter(response.data)
        resolve(response.data)
      }, err => {
        if (showEzl && loadingIdKey) {
          setTimeout(function () {
            closeEzLoading(loadingIdKey)
          }, 500)
        }
        resolve(err)
      }).catch(err => {
        if (showEzl && loadingIdKey) {
          setTimeout(function () {
            closeEzLoading(loadingIdKey)
          }, 500)
        }
        resolve(err.data)
      })
  })
}
