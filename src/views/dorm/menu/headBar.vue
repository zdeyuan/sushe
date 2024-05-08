<template>
	<div>
		<a-menu mode="horizontal" >
			<a-col :span="5">
				<div class="title">
					<img :src="logo" class="imgs">校园宿舍管理系统
				</div>
			</a-col>
			<a-col :span="7"></a-col>
			<a-col :span="11" class="nav-bottom">
				<a-dropdown>
					<a class="ant-dropdown-link">
						<img :src="headPortrait" class="imgs">
						<span class="admin">{{ userinfo == '' ? '系统管理员' : userinfo.userName }}</span>
						<a-icon type="down" class="head-icon" />
					</a>
					<a-menu slot="overlay">
						<a-menu-item>
							<a href="javascript:;" @click="test">个人信息</a>
						</a-menu-item>
						
					</a-menu>
				</a-dropdown>

				<a-dropdown>
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

				<div>
					<img :src="homePicture" class="icons">
					<span class="nav-item">学校首页</span>
				</div>

				<div>
					<img :src="setUp" class="icons">
					<span class="nav-item">设置</span>
				</div>

				<div>
					<img :src="goBack" class="icons">
					<span class="nav-item">返回</span>
				</div>

				<div @click="handleLogout">
					<img :src="quit" class="icons">
					<span class="nav-item">退出登录</span>
				</div>
			</a-col>
		</a-menu>
	</div>
</template>

<script>
	import {
		mapActions
	} from 'vuex'
	import { axios }  from '@/utils/request.js'
	export default {
		data() {
			return {
				manage: '',
				token: '',
				appId: '',
				userinfo:'',
				logo:require('@/assets/_slices/LOGO.png'),
				headPortrait:require('@/assets/_slices/headPortrait.png'),
				switchPicture:require('@/assets/_slices/switchPicture.png'),
				homePicture:require('@/assets/_slices/homePicture.png'),
				setUp:require('@/assets/_slices/setUp.png'),
				goBack:require('@/assets/_slices/goBack.png'),
				quit:require('@/assets/_slices/quit.png')
			}
		},
		mounted() {
			setTimeout(()=>{
			this.token = window.sessionStorage.getItem('token')
			if (this.token !== undefined && this.token !== null) {
				this.token = window.sessionStorage.getItem('token')
				this.appId = window.sessionStorage.getItem('appId')
				this.userinfo = JSON.parse(window.sessionStorage.getItem('userInfo'))
				this.manage = JSON.parse(sessionStorage.getItem('manage'))
				// let index = this.manage.findIndex(item => item.APP_NAME == '宿舍管理系统')
				// this.manage = this.manage.splice(index, 1)
			}
			},1000)
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
							window.sessionStorage.removeItem('appId')
							window.sessionStorage.removeItem('token')
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
			test(){
				console.log('已经拼接')
				axios({
					url:'http://39.108.144.105:8581/oa/veOaPublic/receiveMail',
					method: 'post',
					headers: {
						'X-Access-Token': window.sessionStorage.getItem('token')
					},
					data:{
						startPage:1,
						pageSize:10,
						userId:'e9ca23d68d884d4ebb19d07889727dae'
					}
				}).then((res)=>{
					console.log(res)
				})
			}
		}
	}
</script>

<style>
	/* 2021/7/20 yxb */
	.icons{
		position: relative;
		right: 10px;
		bottom: 5px;
		width: 30px;
		height: 30px;
	}
	.imgs{
		width: 48px;
		height: 48px;
		position: relative;
		bottom: 4px;
		right: 10px;
	}
	
	
	
	
	.nav-bottom {
    position: absolute;
    right: 0;
		height: 80px;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		align-items: center;
		justify-content: space-around;
		margin-bottom: 5px;
	}

	.ant-menu {
		height: 80;
	}
	
	.title {
		/* width: 325px;李少君 */
		width: 320px;
		border-radius: 0px;
		/* font-size: 25px;李少君 */
		font-size: 30px;
		/* height: 77px;李少君 */
		height: 80px;
		line-height: 77px;
		text-align: center;
		/* font-family: "MicrosoftYaHei";李少君 */
		font-family: "MicrosoftYaHei";
		/* color: white;李少君 */
		color: #ffffff;
		background: #2E437D;
	}

	.admin {
		/* color: #9F9F9F;李少君 */
		color: #878787;
		/* font-size: 14px;李少君 */
		font-size: 18px;
		/* font-weight: bold; */
	}

	.nav-item {
		font-family: "MicrosoftYaHei";/*李少君+ */
		/* color: #707070;李少君 */
		color: #878787;
		/* font-size: 15px;李少君 */
		font-size: 18px;
		/* font-weight: bold; */
		/* margin: 0 5px; */
		line-height: 15px;
	}

	.head-icon {
		width: 28px;
		height: 28px;
		font-size: 28px;
		color: #707070;
	}

	.nav-item:hover{
		color: #4e89f8;
	}/*李少君 */

	.admin:hover{
		color: #4e89f8;
	}/*李少君 */
</style>
