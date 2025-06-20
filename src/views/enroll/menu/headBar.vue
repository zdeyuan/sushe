<template>
	<div class="count">
		<div class="title">
			<img :src="logo" class="imgs">招生管理系统
		</div>
		<div class="countBox">
			<a-dropdown v-if='changesiShow(1)'>
				<a-popover>
					<template slot="content">
						<p>{{userinfo.realName}}</p>
						<p>{{userinfo.userType == '2' ? '学生' : '系统管理员'}}</p>
					</template>
					<a class="ant-dropdown-link">
						<img :src="headPortrait" class="icons">
						<span class="admin">{{ userinfo == '' ? '系统管理员' : userinfo.userName }}</span>
						<a-icon type="down" class="head-icon" />
					</a>
				</a-popover>
			</a-dropdown>

			<a-dropdown v-if='changesiShow(2)'>
				<a class="ant-dropdown-link">
					<img :src="switchPicture" class="icons">
					<span class="nav-item">切换系统</span>
					<a-icon type="down" class="head-icon" />
				</a>
				<a-menu slot="overlay">
					<a-menu-item v-for="(val,key) in manage">
						<a :href="val.appAddress+'?token='+token+'&appId='+val.id" target="_blank">{{val.appName}}</a>
					</a-menu-item>
				</a-menu>
			</a-dropdown>

			<div v-if='changesiShow(3)'>
				<img :src="homePicture" class="icons">
				<span class="nav-item">学校首页</span>
			</div>

			<div v-if='changesiShow(4)'>
				<img :src="setUp" class="icons">
				<span class="nav-item">设置</span>
			</div>

			<div v-if='changesiShow(5)'>
				<img :src="goBack" class="icons">
				<span class="nav-item">返回</span>
			</div>

			<div @click="handleLogout" v-if='changesiShow(6)'>
				<img :src="quit" class="icons">
				<span class="nav-item">退出登录</span>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		mapActions
	} from 'vuex'
	export default {
		data() {
			return {
				manage: '',
				token: '',
				appId: '',
				userinfo: '',
				logo: require('@/assets/_slices/LOGO.png'),
				headPortrait: require('@/assets/_slices/headPortrait.png'),
				switchPicture: require('@/assets/_slices/switchPicture.png'),
				homePicture: require('@/assets/_slices/homePicture.png'),
				setUp: require('@/assets/_slices/setUp.png'),
				goBack: require('@/assets/_slices/goBack.png'),
				quit: require('@/assets/_slices/quit.png'),
				clientWidth:document.body.clientWidth,
				arr:[1,2,3,4,5,6]
			}
		},
		watch:{
			clientWidth(newflag){
				this.changesShow()
			}
		},
		mounted() {
			this.clientWidth = document.body.clientWidth
			this.changesShow()
			window.onresize = () => {
			        return (() => {
			          this.clientWidth = document.body.clientWidth;
			        })();
			      };
			setTimeout(() => {
				this.token = window.sessionStorage.getItem('token')
				if (this.token !== undefined && this.token !== null) {
					this.appId = window.sessionStorage.getItem('appId')
					this.manage = JSON.parse(sessionStorage.getItem('manage'))
					this.userinfo = JSON.parse(window.sessionStorage.getItem('userInfo'))
					// let index = this.manage.findIndex(item => item.APP_NAME == '宿舍管理系统')
					// this.manage = this.manage.splice(index, 1)
				}
			}, 1000)
		},
		methods: {
			...mapActions(["Logout"]),
			handleLogout() {
				const that = this
				this.$confirm({
					title: '提示',
					content: '真的要注销登录吗 ?',
					onOk() {
						return that.Logout({}).then(() => {
							that.$router.push({
								path: '/user/login'
							});
						}).catch(err => {
							that.$message.error({
								title: '错误',
								description: err.message
							})
						})
					},
					onCancel() {},
				});
			},
			changesiShow(msg){
				var index = this.arr.findIndex(item => item == msg)
				if(index == -1){
					return false
				}else{
					return true
				}
			},
			changesShow(){
				if(this.clientWidth > 800){
					this.arr = [1,2,3,4,5,6]
				}else if(this.clientWidth < 800 && this.clientWidth > 750){
					this.arr = [1,2,3,6]
				}else if(this.clientWidth < 750 && this.clientWidth > 450){
					console.log('执行')
					this.arr = [2,6]
				}else if(this.clientWidth < 450){
					this.arr = []
				}
			}
		}
	}
</script>

<style>
	.count{
		display: flex;
		justify-content: space-between;
	}
	.countBox{
		text-align: right;
		display: inline-block;
		width: 70%;
		height: 80px;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		align-items: center;
		justify-content: space-around;
		margin-bottom: 5px;
	}
	.icons {
		position: relative;
		/* right: 10px; */
		bottom: 5px;
	}

	.imgs {
		position: relative;
		bottom: 4px;
		right: 10px;
	}

	.nav-bottom {
		height: 80px;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		align-items: center;
		justify-content: space-around;
		margin-bottom: 5px;
	}

	.ant-menu {
		height: 80px;
	}

	.title {
		width: 320px;
		border-radius: 0px;
		font-size: 30px;
		height: 80px;
		line-height: 75px;
		text-align: center;
		font-family: "MicrosoftYaHei";
		color: #ffffff;
		background: #2E437D;
		display: inline-block;
	}

	.admin {
		color: #878787;
		font-size: 18px;
		/* font-weight: bold; */
		font-family: "MicrosoftYaHei";
	}

	.admin:hover {
		color: #4e89f8;
	}

	.nav-item {
		color: #878787;
		font-size: 18px;
		/* font-weight: bold; */
		/* margin: 0 5px; */
		line-height: 52px;
		font-family: "MicrosoftYaHei";
	}

	.nav-item:hover {
		color: #4e89f8;
	}

	.head-icon {
		width: 30px;
		height: 30px;
		font-size: 28px;
		color: #878787;
		padding-right: 4px;
	}
</style>
