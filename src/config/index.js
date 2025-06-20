/** init domain config */
import Vue from 'vue'
//设置全局API_BASE_URL
console.log('VUE_APP_API_BASE_URL2',process.env.VUE_APP_API_BASE_URL);
Vue.prototype.API_BASE_URL = process.env.VUE_APP_API_BASE_URL
window._CONFIG['domianURL'] = Vue.prototype.API_BASE_URL
//单点登录地址
window._CONFIG['casPrefixUrl'] = process.env.VUE_APP_CAS_BASE_URL
window._CONFIG['onlinePreviewDomainURL'] =  process.env.VUE_APP_ONLINE_BASE_URL
window._CONFIG['staticDomainURL'] = Vue.prototype.API_BASE_URL + '/sys/common/static'
window._CONFIG['pdfDomainURL'] = Vue.prototype.API_BASE_URL+ '/sys/common/pdf/pdfPreviewIframe'
//子系统id
export const childSycId = '09d5e1e7f9b049008eee645c783a1d67'