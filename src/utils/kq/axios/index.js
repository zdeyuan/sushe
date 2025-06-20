/*
 * @Descripttion:
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2020-07-09 11:14:39
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-03-02 16:17:40
 */
import Vue from 'vue'
import axios from 'axios';
import store from '@/store'
import {
  ACCESS_TOKEN,
  TENANT_ID
} from '@/store/mutation-types'
import router from '../../../router';
const axiosConfig = {
  baseURL: process.env.VUE_APP_API_BASE_URL, // url = base url + request url
  timeout: 15000 // request timeout
};
const service = axios.create(axiosConfig);
// 统一失败拦截器
service.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
/* 统一失败拦截器 */
service.interceptors.response.use(
  response => {
    const res = response.data;
    if (res && res.code) {
      //如果有值 并且有code的
      if (res.code == 0 || res.code == 200) {
        return response;
      } else {
        return Promise.reject(response);
      }
    } else {
      return response;
    }
  },
  error => {
    console.error("请求失败");
	router.push({path:'/user'})
   //  if (error && error.stack.indexOf('timeout') > -1) {
   //    window.$vm.$notification.error('网络请求超时');
   //  }
   //  if (error && error.response && error.response.data && error.response.data.message == 'Token失效，请重新登录') {
   //    //有时候就是有一个
   //    /* 控制只弹窗一次 */
   //    if (window.document.getElementsByClassName('close-model').length < 2) {
   //      window.$vm.$confirm({
   //        title: '您的登录信息已过期',
   //        okText: '返回登录页',
   //        dialogClass: 'close-model',
   //        onOk() {
			// store.dispatch('Logout').then(() => {
			//    router.push({path:'/user'})
			// })
   //        }
   //      });
   //    }
   //    return Promise.reject(error.response);
   //  } else if (error && error.response && error.response.status == 423) {
   //    return Promise.reject(error.response);
   //  }
   //  if (error.response.data && error.response.data.message) {
   //    window.$vm.$notification.error({
   //      message: '数据请求失败',
   //      description: error.response.data.message
   //    });
   //  } else if (error && error.response) {
   //    let msg = error.response.statusText;
   //    window.$vm.$notification.error({
   //      message: '数据请求失败',
   //      description: msg
   //    });
   //  }

    return Promise.reject(error.response);
  }
);

export default service;
