import Vue from 'vue'
import {
	login,
	logout,
	phoneLogin,
	thirdLogin,
	sLogin
} from "@/api/common/login"
import {
	ACCESS_TOKEN,
	USER_NAME,
	USER_INFO,
	USER_AUTH,
	SYS_BUTTON_AUTH,
	UI_CACHE_DB_DICT_DATA,
	TENANT_ID,
	CACHE_INCLUDED_ROUTES
} from "@/store/mutation-types"
import {
	welcome
} from "@/utils/util"
import {
	queryPermissionsByUser
} from '@/api/common/api'
import {
	getAction
} from '@/api/common/manage'
import {
	annountCement,
	getNoReadAnnount
} from '@/api/index/index'
const user = {
	namespaced: true,
	state: {
		token: '',
		username: '',
		realname: '',
		tenantid: '',
		welcome: '',
		avatar: '',
		roles: [],
		permissionList: [],
		info: {},
		unreadMessages: JSON.parse(localStorage.getItem('unreadMessages')) || [],
		unreadCount: JSON.parse(localStorage.getItem('unreadCount')) || 0,
	},

	mutations: {
		SET_TOKEN: (state, token) => {
			state.token = token
		},
		SET_NAME: (state, {
			username,
			realname,
			welcome
		}) => {
			state.username = username
			state.realname = realname
			state.welcome = welcome
		},
		SET_AVATAR: (state, avatar) => {
			state.avatar = avatar
		},
		SET_PERMISSIONLIST: (state, permissionList) => {
			state.permissionList = permissionList
		},
		SET_INFO: (state, info) => {
			state.info = info
		},
		SET_ROLE: (state, roles) => {
			state.roles = roles
		},
		SET_TENANT: (state, id) => {
			state.tenantid = id
		},
		// 更新未读消息列表
		SET_UNREAD_MESSAGES(state, messages) {
			state.unreadMessages = messages;
			localStorage.setItem('unreadMessages', JSON.stringify(messages));
		},
		// 更新未读消息数量
		SET_UNREAD_COUNT(state, count) {
			state.unreadCount = count;
			localStorage.setItem('unreadCount', JSON.stringify(count));
		},
	},
	actions: {
		
		// CAS验证登录
		ValidateLogin({
			commit
		}, userInfo) {
			return new Promise((resolve, reject) => {
				getAction("/sys/cas/client/validateLogin", userInfo).then(response => {
					if (response.success) {
						const result = response.result
						const userInfo = result.userInfo
						Vue.ls.set(ACCESS_TOKEN, result.token, 7 * 24 * 60 * 60 * 1000)
						Vue.ls.set(USER_NAME, userInfo.username, 7 * 24 * 60 * 60 * 1000)
						Vue.ls.set(USER_INFO, userInfo, 7 * 24 * 60 * 60 * 1000)
						commit('SET_TOKEN', result.token)
						commit('SET_INFO', userInfo)
						commit('SET_NAME', {
							username: userInfo.username,
							realname: userInfo.realname,
							welcome: welcome()
						})
						commit('SET_AVATAR', userInfo.avatar)
						resolve(response)
					} else {
						resolve(response)
					}
				}).catch(error => {
					reject(error)
				})
			})
		},
		// 登录
		Login({
			commit, dispatch
		}, userInfo) {
			return new Promise((resolve, reject) => {
				userInfo.appId = 'dbb2eb1bbc9a4e9daeb847082faa8fa2'
				sLogin(userInfo).then(response => {
					if (response.code == '200') {
						const result = response.result
						const userInfo = result.userInfo
						Vue.ls.set(ACCESS_TOKEN, result.token, 7 * 24 * 60 * 60 * 1000)
						Vue.ls.set(USER_NAME, userInfo.username, 7 * 24 * 60 * 60 * 1000)
						Vue.ls.set(USER_INFO, userInfo, 7 * 24 * 60 * 60 * 1000)
						Vue.ls.set(UI_CACHE_DB_DICT_DATA, result.sysAllDictItems, 7 * 24 * 60 * 60 *
							1000)
						commit('SET_TOKEN', result.token)
						commit('SET_INFO', userInfo);
						commit('SET_NAME', {
							username: userInfo.username,
							realname: userInfo.realname,
							welcome: welcome()
						})
						commit('SET_AVATAR', userInfo.avatar)
						window.sessionStorage.setItem('load', JSON.stringify(response.result
							.sysAllDictItems))
						window.sessionStorage.setItem('role', JSON.stringify(response.result
							.roleList))
						window.sessionStorage.setItem('userInfo', JSON.stringify(response.result
							.userInfo))
						window.sessionStorage.setItem('token', response.result.token),
							window.sessionStorage.setItem('appId',
								'78eb6f51fbd44297a528e6b01bbe72cf'),
							window.localStorage.setItem('load', JSON.stringify(response.result
								.sysAllDictItems))
						window.localStorage.setItem('userInfo', JSON.stringify(response.result
							.userInfo))
						var role = response.result.roleList;
						let roles=[];
						if(role.length>0&&role){
							roles = response.result.roleList.map(role => role.code);
							commit('SET_ROLE', roles);
						}else{
							reject("暂未分配权限")
						}
						window.localStorage.setItem('role', JSON.stringify(roles));
						try {
							this.dispatch('GenerateRoutes', roles).then(routers => {
								let arr = [{
									path: '/',
									name: '首页'
								}];
								let menus = arr.concat(transformRouter(routers,roles));
								window.localStorage.setItem('menus', JSON.stringify(menus));
							});
						} catch (err) {
							console.log(err)
						}


						resolve(response)
					} else {
						reject(response)
					}
				}).catch(error => {
					reject(error)
				})
			})
		},
		// store/index.js
		fetchUnreadMessages({
			commit
		}) {
			return new Promise((resolve, reject) => {
				getNoReadAnnount()
					.then((res) => {
						if (res.code == 0) {
							let list = res.result.anntMsgList.map((e) => {
								return {
									title: e.titile,
									id:e.id,
									description: e.description,
									actions: [{
											type: '发布时间',
											text: e.createTime,
										},
										{
											type: '发布人',
											text: e.sender,
										},
									],
								};
							});
							commit('SET_UNREAD_MESSAGES', list);
							commit('SET_UNREAD_COUNT', res.result.anntMsgTotal);
							resolve(list);
						} else {
							reject(res);
						}
					})
					.catch((error) => {
						reject(error);
					});
			});
		},
		//手机号登录
		PhoneLogin({
			commit
		}, userInfo) {
			return new Promise((resolve, reject) => {
				phoneLogin(userInfo).then(response => {
					if (response.code == '200') {
						const result = response.result
						const userInfo = result.userInfo
						Vue.ls.set(ACCESS_TOKEN, result.token, 7 * 24 * 60 * 60 * 1000)
						Vue.ls.set(USER_NAME, userInfo.username, 7 * 24 * 60 * 60 * 1000)
						Vue.ls.set(USER_INFO, userInfo, 7 * 24 * 60 * 60 * 1000)
						Vue.ls.set(UI_CACHE_DB_DICT_DATA, result.sysAllDictItems, 7 * 24 * 60 * 60 *
							1000)
						commit('SET_TOKEN', result.token)
						commit('SET_INFO', userInfo)
						commit('SET_NAME', {
							username: userInfo.username,
							realname: userInfo.realname,
							welcome: welcome()
						})
						commit('SET_AVATAR', userInfo.avatar)
						resolve(response)
					} else {
						reject(response)
					}
				}).catch(error => {
					reject(error)
				})
			})
		},
		// 获取用户信息
		GetPermissionList({
			commit
		}) {
			return new Promise((resolve, reject) => {
				queryPermissionsByUser().then(response => {
					const menuData = response.result.menu;
					const authData = response.result.auth;
					const allAuthData = response.result.allAuth;
					//Vue.ls.set(USER_AUTH,authData);
					sessionStorage.setItem(USER_AUTH, JSON.stringify(authData));
					sessionStorage.setItem(SYS_BUTTON_AUTH, JSON.stringify(allAuthData));
					if (menuData && menuData.length > 0) {
						//update--begin--autor:qinfeng-----date:20200109------for：edu-63 一级菜单的子菜单全部是隐藏路由，则一级菜单不显示------
						menuData.forEach((item, index) => {
							if (item["children"]) {
								let hasChildrenMenu = item["children"].filter((i) => {
									return !i.hidden || i.hidden == false
								})
								if (hasChildrenMenu == null || hasChildrenMenu.length ==
									0) {
									item["hidden"] = true
								}
							}
						})
						commit('SET_PERMISSIONLIST', menuData)
					} else {
						reject('getPermissionList: permissions must be a non-null array !')
					}
					resolve(response)
				}).catch(error => {
					reject(error)
				})
			})
		},

		// 登出
		Logout({
			commit,
			state
		}) {
			return new Promise((resolve) => {
				commit('SET_TOKEN', '')
				commit('SET_PERMISSIONLIST', [])
				Vue.ls.remove(ACCESS_TOKEN)
				Vue.ls.remove(UI_CACHE_DB_DICT_DATA)
				Vue.ls.remove(CACHE_INCLUDED_ROUTES)
				window.localStorage.clear();
				window.sessionStorage.clear();
				let logoutToken = window.sessionStorage.getItem('token')
				console.log('logoutToken: ' + logoutToken)
				logout(logoutToken).then(() => {
					resolve()
				}).catch(() => {
					resolve()
				})
			})
		},
		// 第三方登录
		ThirdLogin({
			commit
		}, param) {
			return new Promise((resolve, reject) => {
				thirdLogin(param.token, param.thirdType).then(response => {
					if (response.code == '200') {
						const result = response.result
						const userInfo = result.userInfo
						Vue.ls.set(ACCESS_TOKEN, result.token, 7 * 24 * 60 * 60 * 1000)
						Vue.ls.set(USER_NAME, userInfo.username, 7 * 24 * 60 * 60 * 1000)
						Vue.ls.set(USER_INFO, userInfo, 7 * 24 * 60 * 60 * 1000)
						commit('SET_TOKEN', result.token)
						commit('SET_INFO', userInfo)
						commit('SET_NAME', {
							username: userInfo.username,
							realname: userInfo.realname,
							welcome: welcome()
						})
						commit('SET_AVATAR', userInfo.avatar)
						resolve(response)
					} else {
						reject(response)
					}
				}).catch(error => {
					reject(error)
				})
			})
		},
		saveTenant({
			commit
		}, id) {
			Vue.ls.set(TENANT_ID, id, 7 * 24 * 60 * 60 * 1000)
			commit('SET_TENANT', id)
		}


	}
}

function transformRouter(router,roles) {
	return router.reduce((acc, item) => {
		let temp=roles.find(e=>e=='system');
		const systemName = item.meta.breadcrumbs[0];
		const parentName = !temp?item.meta.breadcrumbs[1]=='学生信息维护'?'学生信息':item.meta.breadcrumbs[1]:item.meta.breadcrumbs[1];
		
		// 查找系统对象是否已经存在
		let systemObj = acc.find((obj) => obj.name === systemName);
		
		if (!systemObj) {
			systemObj = {
				name: systemName,
				children: []
			};
			acc.push(systemObj);
		}
		// 查找父级对象是否已经存在
		let parentObj = systemObj.children.find((obj) => obj.name === parentName);
		if (!parentObj) {
			const parentPath = item.redirect || item.path;
			parentObj = {
				name: parentName,
				path: parentPath,
				children: []
			};
			systemObj.children.push(parentObj);
		}
		// 添加子元素
		if (item.children) {
			item.children.forEach((child) => {
				parentObj.children.push({
					name: !temp?child.meta.title=='学生信息维护'?'学生信息':child.meta.title:child.meta.title,
					path: child.path,
				});
			});
		}
		return acc;
	}, []);
}
export default user