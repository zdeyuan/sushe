<template>
	<a-config-provider :locale="locale">
		<div id="app">
			<router-view />
		</div>
	</a-config-provider>
</template>
<script>
	import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
	import enquireScreen from '@/utils/device'
	import Vue from 'vue'
	import {
		ACCESS_TOKEN
	} from '@/store/mutation-types'
	import {
		axios
	} from '@/utils/request'
	let that = null
	export default {
		data() {
			return {
				locale: zhCN,
			}
		},
		methods: {
			GetQueryString(name) {
				var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
				var r = window.location.search.substr(1).match(reg)
				if (r != null) return unescape(r[2])
				return null
			},
		},
		created() {
			
			var data = {
				token: this.GetQueryString('token'),
				appId: this.GetQueryString('appId'),
			}
			let that = this;
			if (this.GetQueryString('token')) {
				window.sessionStorage.clear()
				window.sessionStorage.setItem('token', this.GetQueryString('token'))
				Vue.ls.set(ACCESS_TOKEN, this.GetQueryString('token'), 7 * 24 * 60 * 60 * 1000)
				window.sessionStorage.setItem('appId', this.GetQueryString('appId'))
				axios({
					url: '/sys/convertSystem',
					method: 'post',
					headers: {
						'X-Access-Token': window.sessionStorage.getItem('token'),
					},
					data: data
				}).then((response) => {
					if (response.code == 200) {
						window.console.log("response:")
						window.console.log(response)
						window.sessionStorage.setItem('load', JSON.stringify(response.result.sysAllDictItems))
						window.sessionStorage.setItem('menu', JSON.stringify(response.result.menuList))
						window.sessionStorage.setItem('manage', JSON.stringify(response.result.manageList))
						window.sessionStorage.setItem('role', JSON.stringify(response.result.roleList))
						window.sessionStorage.setItem('userInfo', JSON.stringify(response.result.userInfo))
						window.localStorage.setItem('load', JSON.stringify(response.result.sysAllDictItems))
						window.localStorage.setItem('menu', JSON.stringify(response.result.menuList))
						window.localStorage.setItem('manage', JSON.stringify(response.result.manageList))
						window.localStorage.setItem('role', JSON.stringify(response.result.roleList))
						window.localStorage.setItem('userInfo', JSON.stringify(response.result.userInfo))
						that.hasToken = true
						Vue.ls.set(ACCESS_TOKEN, response.result.token, 7 * 24 * 60 * 60 * 1000)
						that.$notification.success({
							message: '切换成功',
							description: '欢迎回来',
						})
						that.$router.push({
							path: '/dorm'
						}).catch(() => {
							console.log('登录跳转首页出错,这个错误从哪里来的')
						})
					} else {
						window.console.log(response,'切换测试失败！！！！！！！')
						that.hasToken = true
						this.$notification.error({
							message: '切换失败',
							description: '请重新登录',
						})
						that.$router.replace({
							path: '/user/login',
						})
					}
				})
			} else {
				if (window.sessionStorage.getItem('menu') && window.sessionStorage.getItem('token')) {
					this.hasToken = true
				} else {
					this.hasToken = true
					// this.$notification.error({
					//   message: '登入失效',
					//   description: '请重新登入',
					// })
					this.$router.push({
						path: '/user/login',
					})
				}
			}
		},
	}
</script>
<style>
	#app {
		height: 100%;
	}
</style>
