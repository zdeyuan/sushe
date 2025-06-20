import axios from './axios';
import config from '@/config/config';
import store from '@/store';
import loading from './loading';
const http = {
  /* 基础服务地址 */
  //baseServer: 'http://127.0.0.1:9200/',
  baseServer: process.env.VUE_APP_API_BASE_URL,
  /* 每个微服务的前缀 */
  service: config.service,
  /**
   * 请求前的处理  后面token 可能改成这里处理
   * @param {*} sub
   * @param {*} config
   *
   *
   * @param {config} noToken : true 不穿token
   * @param {config} params  : post put 传入 params 参数 放到地址栏
   * @param {config} loading  : 是否显示 全局loadding true 显示 false 不显示
   */
  doConfig(sub, config) {
    // sub.url = sub.url.replace('upms-center/', 'upms-center-zb/');
    /*  if (!config) {
      config = {};
    } */
    let showLoading = false;
    if (sub.method == 'post' || sub.method == 'put') {
      showLoading = true;
      if (sub.data && sub.data.isPageTable) {
        showLoading = false;
      }
      if (config.params) {
        sub.params = config.params;
      }
    }
    if (config.loading === false) {
      showLoading = false;
    } else if (config.loading === true) {
      showLoading = true;
    }
    if (showLoading) {
      config.httpStartLoading = true;
    }
    if (config.noToken) {
      //
    } else if ( window.sessionStorage.getItem('token')) {
      const token =  window.sessionStorage.getItem('token');
      if (!config.headers) {
        config.headers = {};
      }
      config.headers['X-Access-Token'] = token;
      sub.headers = config.headers;
    }
	sub.timeout = 500000
    return sub;
  },
  /**
   *
   * @param {config} isNeedResponse   是否给的是response
   */
  reqeustSuccess(config, sub, res) {
    /*     if (config && config.httpStartLoading) {
      setTimeout(() => {
        loading.close();
      }, 500);
    } */

    if (!(res.data.code == 0 || res.data.code == 200) && res.data.message) {
      window.$vm.$notification.error({
        message: '校验错误',
        description: res.data.message
      });
    }

    /*   if (http.loadingInstance != null) {
      http.loadingInstance.close();
      http.loadingInstance = null;
    } */
    if (config && config.isNeedResponse) {
      //    console.log('调用 - ' + sub.url + ' [' + sub.method + '] 成功     请求参数:', sub.data, sub.params, '结果数据:', res);
      return res;
    } else {
      //   console.log('调用 - ' + sub.url + ' [' + sub.method + '] 成功     请求参数:', sub.data, sub.params, '结果数据:', res.data);
      return res.data;
    }
  },
  /**
   *
   *
   * @param {config} noError  true 就不弹出默认提示
   */
  reqeustError(config, sub, res) {
    //    console.error('!!!!!!!!!!!!!!!!!!调用 - ' + sub.url + ' [' + sub.method + '] 失败     请求参数:', sub.data, sub.params, '结果数据:', res);
    if (config && config.noError) {
      return res;
    }
    if (res.status === 200) {
      if (res.data.code !== 200 && res.data.message) {
        window.$vm.$notification.error({
          message: '校验错误',
          description: res.data.message
        });
      }
    }
    return res;
  },
  /**
   * get 请求 具体的config 去reqeustSuccess 里面看
   */
  get(url, params, config) {
    if (!config) {
      config = {};
    }
    const sub = {
      method: 'get',
      url: url,
      params: params
    };
    return new Promise((resolve, reject) => {
      axios(http.doConfig(sub, config))
        .then(res => {
			
          resolve(http.reqeustSuccess(config, sub, res));
        })
        .catch(err => {
			console.log("res",err)
          reject(http.reqeustError(config, sub, err));
        });
    });
  },
  /**
   * post 请求 具体的config 去reqeustSuccess 里面看
   */
  post(url, data, config) {
    if (!config) {
      config = {};
    }
    const sub = {
      method: 'post',
      url: url
    };
    if (data) {
      sub.data = data;
    }
    return new Promise((resolve, reject) => {
      axios(http.doConfig(sub, config))
        .then(res => {
          resolve(http.reqeustSuccess(config, sub, res));
        })
        .catch(err => {
          reject(http.reqeustError(config, sub, err));
        });
    });
  },
  /**
   * 请求是表单的
   */
  postForm(url, data, config) {
    if (!config) {
      config = {};
    }
    let urlParm = new URLSearchParams();
    if (data) {
      for (let key in data) {
        urlParm.append(key, data[key]);
      }
    }
    if (!config) {
      config = {};
    }
    config.params = urlParm;
    return http.post(url, null, config);
  },
  /**
   * put 请求 具体的config 去reqeustSuccess 里面看
   */
  put(url, data, config) {
    if (!config) {
      config = {};
    }
    const sub = {
      method: 'put',
      url: url,
      data: data
    };
    return new Promise((resolve, reject) => {
      axios(http.doConfig(sub, config))
        .then(res => {
          resolve(http.reqeustSuccess(config, sub, res));
        })
        .catch(err => {
          reject(http.reqeustError(config, sub, err));
        });
    });
  },
  delete(url, params, config) {
    if (!config) {
      config = {};
    }
    const sub = {
      method: 'delete',
      url: url
    };
    if (params != null && Object.keys(params).length > 0) {
      sub.data = params;
    }
    return new Promise((resolve, reject) => {
      axios(http.doConfig(sub, config))
        .then(res => {
          resolve(http.reqeustSuccess(config, sub, res));
        })
        .catch(err => {
          reject(http.reqeustError(config, sub, err));
        });
    });
  },
  upload(url, formData, config, responseType) {
    config = config || {};
    const sub = {
      method: 'post',
      url: url,
      data: formData
    };
    if (responseType) {
      sub.responseType = responseType;
    }
    config.headers = {
      'Content-type': 'multipart/form-data'
    };
    const subData = http.doConfig(sub, config);
    if (config.onUploadProgress) {
      subData.onUploadProgress = config.onUploadProgress;
    }

    return new Promise((resolve, reject) => {
      axios(subData)
        .then(res => {
          resolve(http.reqeustSuccess(config, sub, res));
        })
        .catch(err => {
          reject(http.reqeustError(config, sub, err));
        });
    });
  },
  /* 是否要默认处理文件  */
  downLoad(url, fileName, data, method, config) {
    config = config || {};
    if (!method) {
      method = 'get';
    }
    let sub = {
      method: method,
      url: url,
      data: data || {},
      responseType: 'blob'
    };
    return new Promise((resolve, reject) => {
      axios(http.doConfig(sub, config))
        .then(resp => {
          setTimeout(() => {
            loading.close();
          }, 500);
          const res = resp.data;
          if (config.isNotDefalut == true) {
            resolve(res);
            return;
          }
          const data = res;
          //const filename = res.headers.filename;
          if (!data) {
            return;
          }
          let url = window.URL.createObjectURL(new Blob([data]));
          let link = document.createElement('a');
          link.style.display = 'none';
          link.href = url;
          link.setAttribute('download', fileName);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);

          resolve(res);
        })
        .catch(err => {
          reject(http.reqeustError(config, sub, err));
        });
    });
  },

  /**
   * 导出excel
   * @param url
   * @param method
   * @param data
   * @param isNeedResponse
   * @returns {Promise<unknown>}
   */
  exportExcel(url, data, method, config) {
    if (!config) {
      config = {};
    }
    let sub = {
      method: method,
      url: url,
      data: data || {},
      responseType: 'blob'
    };
    return new Promise((resolve, reject) => {
      axios(http.doConfig(sub, config))
        .then(res => {
          setTimeout(() => {
            loading.close();
          }, 500);
          let result = res.data;
          if (!result) {
            return;
          }
          let fileName = config.name;
          //处理中文乱码，忽略警告
          let iconv = require('iconv-lite');
          iconv.skipDecodeWarning = true;
          //  fileName = iconv.decode(fileName, 'gbk');

          let url = window.URL.createObjectURL(new Blob([result]));
          let link = document.createElement('a');
          link.style.display = 'none';
          link.href = url;
          link.setAttribute('download', `${fileName}`);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
          resolve(res);
        })
        .catch(err => {
          reject(http.reqeustError(config, sub, err));
        });
    });
  }
};
export default http;
