import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
import router from '../router';
import {
  VueAxios
} from './axios'
import {
  Modal,
  notification
} from 'ant-design-vue'
import {
  ACCESS_TOKEN,
  TENANT_ID
} from '@/store/mutation-types'

/**
 * 【指定 axios的 baseURL】
 * 如果手工指定 baseURL: '/edu-boot'
 * 则映射后端域名，通过 vue.config.js
 * @type {*|string}
 */
let apiBaseUrl = window._CONFIG['domianURL'] || ''
// console.log("apiBaseUrl= ",apiBaseUrl)
// 创建 axios 实例
const service = axios.create({
  // baseURL: '/edu-boot',
  baseURL: apiBaseUrl, // api base_url
  timeout: 2000000 // 请求超时时间
})
let hasShownTokenExpiredModal=false;
const err = (error) => {
  if (error.response) {
    let that = this
    let data = error.response.data
    const token = Vue.ls.get(ACCESS_TOKEN)
    switch (error.response.status) {
      case 403:
        notification.error({
          message: '系统提示',
          description: '拒绝访问',
          duration: 4
        })
        break
      case 500:
        // update-begin- --- author:liusq ------ date:20200910 ---- for:处理Blob情况----
        let type = error.response.request.responseType
        if (type === 'blob') {
          blobToJson(data)
          break
        }
        if (token && data.message.includes('Token失效') &&!hasShownTokenExpiredModal) {
			hasShownTokenExpiredModal=true;
          Modal.error({
            title: '登录已过期',
            content: '很抱歉，登录已过期，请重新登录',
            okText: '重新登录',
            mask: false,
            onOk: () => {
              store.dispatch('user/Logout').then(() => {
                Vue.ls.remove(ACCESS_TOKEN)
                router.push({path:'/user'})
              })
            }
          })
        }else{
			 router.push({path:'/user'})
		}
        break
      case 404:
        notification.error({
          message: '系统提示',
          description: '很抱歉，资源未找到!',
          duration: 4
        })
        break
      case 504:
        notification.error({
          message: '系统提示',
          description: '网络超时'
        })
        break
      case 401:
        notification.error({
          message: '系统提示',
          description: '未授权，请重新登录',
          duration: 4
        })
        if (token) {
          store.dispatch('user/Logout').then(() => {
            setTimeout(() => {
              window.location.reload()
            }, 1500)
          })
        }
        break
      default:
        notification.error({
          message: '系统提示',
          description: data.message,
          duration: 4
        })
        break
    }
  }
  return Promise.reject(error)
}

// request interceptor
service.interceptors.request.use(config => {
  const token = Vue.ls.get(ACCESS_TOKEN)
  if (token) {
    config.headers['X-Access-Token'] = token // 让每个请求携带自定义 token 请根据实际情况自行修改
  }
  // update-begin-author:taoyan date:2020707 for:多租户
  let tenantid = Vue.ls.get(TENANT_ID)
  if (!tenantid) {
    tenantid = 0
  }
  config.headers['tenant_id'] = tenantid
  // update-end-author:taoyan date:2020707 for:多租户
  if (config.method == 'get') {
    if (config.url.indexOf('sys/dict/getDictItems') < 0) {
      config.params = {
        _t: Date.parse(new Date()) / 1000,
        ...config.params
      }
    }
  }

  if (config.url == '/sys/permission/getUserPermissionByToken' || config.url == '/sys/sLogin' || config.url == '/sys/logout' || config.url == '/sys/convertSystem') {
    // config.baseURL = '/edu-boot' // 内网公共登录
    // config.baseURL = 'http://159.75.200.65:9000' // 公网公共登录 2021-05-23
    // config.baseURL = 'http://114.115.180.62:6101' // 公网公共登录

    
    // config.baseURL = 'http://159.75.200.65:9000'

    // http://172.16.20.53:6102/ 内网消息中心
    // http://114.115.180.62:6102/ 公网消息中心
  }

  return config
}, (error) => {
  return Promise.reject(error)
})

// response interceptor
service.interceptors.response.use((response) => {
  return response.data
}, err)

const installer = {
  vm: {},
  install(Vue, router = {}) {
    Vue.use(VueAxios, router, service)
  }
}
/**
 * Blob解析
 * @param data
 */
function blobToJson(data) {
  let fileReader = new FileReader()
  let token = Vue.ls.get(ACCESS_TOKEN)
  fileReader.onload = function () {
    try {
      let jsonData = JSON.parse(this.result) // 说明是普通对象数据，后台转换失败
      console.log('jsonData', jsonData)
      if (jsonData.status === 500) {
        console.log('token----------》', token)
        if (token && jsonData.message.includes('Token失效')) {
          Modal.error({
            title: '登录已过期',
            content: '很抱歉，登录已过期，请重新登录',
            okText: '重新登录',
            mask: false,
            onOk: () => {
              store.dispatch('user/Logout').then(() => {
                Vue.ls.remove(ACCESS_TOKEN)
                window.location.reload()
              })
            }
          })
        }
      }
    } catch (err) {
      // 解析成对象失败，说明是正常的文件流
      console.log('blob解析fileReader返回err', err)
    }
  }
  fileReader.readAsText(data)
}

export {
  installer as VueAxios,
  service as axios
}