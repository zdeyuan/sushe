// VueJS
import './config'
import Vue from 'vue'
// Ant Design Vue
import Antd from 'ant-design-vue';
import Storage from 'vue-ls'
// Vue Router
import router from './router'
import store from './store/'
import Print from 'vue-print-nb'
Vue.use(Print)
import 'ant-design-vue/dist/antd.css';
import Photoswipe from 'vue-pswipe'
import '@/utils/lazy_antd'
import '@/utils/filter'
import config from '@/defaultSettings'
import '@/permission'
Vue.config.productionTip = false;
Vue.use(Antd);
Vue.use(Storage, config.storageOptions)
// Photoswipe Gallery
import DatePickByCN from '@/components/DatePickByCN.vue';
Vue.component('DatePickByCN', DatePickByCN);
Vue.use(Photoswipe)
import './scss/app.scss';
// Template Layouts

// Main application view
import App from './App.vue'
// 引入自定义组件。index.js是组件的默认入口`
import edu from '@/utils/edu';
Vue.use(edu);

// App Styling
import JDictSelectTag from '@/components/dict/index.js'
import permissionPlugin from '@/plugins/permissionPlugin.js';
Vue.use(JDictSelectTag)
Vue.use(permissionPlugin)
import EduComponents from '@/components/edu/index'
import utils from '@/utils/kq/utils';
import http from '@/utils/kq/http';
import db from '@/utils/kq/db';
import config1 from '@/config/config';
import constant from '@/config/constant';
import dist from '@/utils/kq/dist';
import date from '@/utils/kq/date';
import loading from '@/utils/kq/loading';
Vue.prototype.$http = http;
Vue.prototype.$utils = utils;
Vue.prototype.$db = db;
Vue.prototype.$config = config1;
Vue.prototype.$dist = dist;
Vue.prototype.$date = date;
Vue.prototype.$constant = constant;
import Viser from 'viser-vue'
Vue.use(Viser)
Vue.use(EduComponents);
import DefaultLayout from '@/components/layouts/Default.vue'


// Adding template layouts to the vue components.
Vue.component("layout-default", DefaultLayout);
// Initialize Vue
window.$vm =new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
