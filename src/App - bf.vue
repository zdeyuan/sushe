<template>
  <a-config-provider :locale="locale">
    <div id="app">
      <router-view/>
    </div>
  </a-config-provider>
</template>
<script>
</script>
<script>
	import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
	import enquireScreen from '@/utils/device'
	import { axios }  from '@/utils/request.js'
	import { ACCESS_TOKEN, USER_NAME,USER_INFO,USER_AUTH,SYS_BUTTON_AUTH,UI_CACHE_DB_DICT_DATA,TENANT_ID,CACHE_INCLUDED_ROUTES } from "@/store/mutation-types"
	import Vue from 'vue'
	export default {
		data() {
		    return {
		      locale: zhCN,
		    }
		},
		methods: {
			GetQueryString(name) {
				var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
				var r = window.location.search.substr(1).match(reg);
				if (r != null) return unescape(r[2]);
				return null;
			},
		},
		created() {
			var that = this
			if (this.GetQueryString("token")) {
				window.console.log(this.GetQueryString("token"))
				window.sessionStorage.clear()
				window.sessionStorage.setItem('token', this.GetQueryString("token"))
				window.sessionStorage.setItem('appId', this.GetQueryString("appId"))
				window.console.log(window.sessionStorage.getItem('token'))
					axios({
					  url: '/sys/convertSystem',
					  method: 'post',
					  headers: {
						'X-Access-Token': window.sessionStorage.getItem('token')
					  },
					  data:{
						  token: window.sessionStorage.getItem('token'),
						  appId: window.sessionStorage.getItem('appId'),
					  },
					  }).then((response)=>{
						window.console.log('执行')
						window.console.log(response)
						if (response.code == 200) {
							window.sessionStorage.setItem('load', JSON.stringify(response.result
								.sysAllDictItems))
							window.sessionStorage.setItem('menu', JSON.stringify(response.result.menuList))
							window.sessionStorage.setItem('manage', JSON.stringify(response.result
								.manageList))
							window.sessionStorage.setItem('role', JSON.stringify(response.result.roleList))
							window.sessionStorage.setItem('userInfo', JSON.stringify(response.result
								.userInfo))
							var token = window.sessionStorage.getItem('token')
							var userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'))
							var load =JSON.parse(window.sessionStorage.getItem('load'))
							Vue.ls.set(ACCESS_TOKEN, token , 7 * 24 * 60 * 60 * 1000)
							Vue.ls.set(USER_NAME, userInfo.username, 7 * 24 * 60 * 60 * 1000)
							Vue.ls.set(USER_INFO, userInfo, 7 * 24 * 60 * 60 * 1000)
							Vue.ls.set(UI_CACHE_DB_DICT_DATA, load, 7 * 24 * 60 * 60 * 1000)
							this.$message.success('切换成功')
							window.console.log('/dorm切换新')
							this.hasToken = true
							this.$router.push({ path: "/dorm" }).catch(()=>{
							  console.log('登录跳转首页出错,这个错误从哪里来的')
							})
						} else {
							window.console.log('执行到错误')
							window.console.log(response)
							this.hasToken = true
							this.$router.replace({
								path: '/user/login'
							})
						}
					})
					
			} else {
				if (window.sessionStorage.getItem('menu') && window.sessionStorage.getItem('token')) {
					window.console.log(window.sessionStorage.getItem('token'))
					this.hasToken = true
				} else {
					window.console.log(window.sessionStorage.getItem('token'))
					this.hasToken = true
					this.$router.replace({
						path: '/user/login'
					})
				}
			}
		}
	}
</script>
<style>
	.el-dialog__title {
		font-size: 16px !important;
	}
</style>
