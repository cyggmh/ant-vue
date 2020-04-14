import axiosxs from 'axios'
import qs from 'qs'
import defParam from '@/config/defParam'
import { showEzLoading, closeEzLoading } from '../EzLoading'
import Antd from 'ant-design-vue'
import store from '../../../store'
// import Router from 'vue-router'
// import router from '../../../router'
// import Vue from 'vue'

var axios = axiosxs.create()
axios.defaults.timeout = 60000
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
        try {
          resultFilter(response.data)
        } catch (e) {
          console.error(e)
        }
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

/**
 * todo 拦截判断
 *
 */

// eslint-disable-next-line no-unused-vars
function resultFilter (res) {
  switch (res.code) {
    case 0:
      break
    case 500:
      // Message.error('服务器端数据异常，请联系管理人员！')
      // Notice.error({
      //   title: '服务器端数据异常',
      //   desc: '系统异常请刷新后重试或请联系管理人员！'
      // })
      break
    case 401:
      Antd.message.error('认证失败,或认证过期！请重新登录！')
      store.commit('base/user/LOGIN_OUT')
      // Message.error('认证失败,或认证过期！请重新登录！')
      // store.commit('base/login/UPTOLOGINOUT')
      // Route.push({ name: 'baselogin' })
      break
    case 400:
      if (res.config.passStatus && res.config.passStatus.indexOf(400) > -1) {
        break
      }
      Antd.message.error(res.msg)
      // window.message.error('This is a message of error')
      break
    case 402:
      Antd.message.error(res.msg)
  }
  return res
}

/**
 * todo 拦截处理请求返回数据
 */
axios.interceptors.response.use(
  data => {
    switch (data.data.code) {
      case 0:
        break
      case 500:
        // Message.error('服务器端数据异常，请联系管理人员！')
        // Notice.error({
        //   title: '服务器端数据异常',
        //   desc: '系统异常请刷新后重试或请联系管理人员！'
        // })
        break
      case 401:
        // Antd.message.error('认证失败,或认证过期！请重新登录！')
        // store.commit('base/user/LOGIN_OUT')
        // Message.error('认证失败,或认证过期！请重新登录！')
        // store.commit('base/login/UPTOLOGINOUT')
        // Route.push({ name: 'baselogin' })
        break
      case 400:
        // window.message.error('This is a message of error')
        break
    }
    return data
  },
  error => {
    // Message.error('服务器端数据异常，请联系管理人员！')
    // Notice.error({
    //   title: '服务器端数据异常',
    //   desc: '系统异常请刷新后重试或请联系管理人员！'
    // })
    Antd.message.error('Sorry！服务器端异常，请稍后再试！')
    try {
      // window.$ez.$router.push({ path: '/500' })
    } catch (e) {
      console.log(e)
    }
    return Promise.reject(error)
    // if (error.response === null || error.response === 'undefined') {
    //   console.log(error.response)
    //   if (error.response.status === 404) {
    //     alert('请求无效提示')
    //   } else if (error.response.status === 403) {
    //     alert('权限不足,请联系管理员!提示')
    //   } else if (error.response.status === 502) {
    //     location.href = '/login'
    //   } else {
    //     alert('服务器错误!提示')
    //   }
    // }
    // return Promise.reject(error)
  }
)
