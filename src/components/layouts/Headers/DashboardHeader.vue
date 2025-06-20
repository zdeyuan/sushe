<template>
	
	<!-- Main Sidebar -->
	<component :is="navbarFixed ? 'a-affix' : 'div'" :offset-top="top">

		<!-- Layout Header -->
		<a-layout-header>
			<a-row type="flex">

				<!-- Header Breadcrumbs & Title Column -->
				<a-col :span="20" :md="6">

					<!-- Header Breadcrumbs -->
					<a-breadcrumb >
						<template class="breadcrumb" v-for="(item, key) in $route.meta.breadcrumbs" >
							<a-breadcrumb-item v-if="key == $route.meta.breadcrumbs.length - 1" :key="key">{{ item }}</a-breadcrumb-item>
							<a-breadcrumb-item v-else :key="key"><router-link to="/">{{ item }}</router-link></a-breadcrumb-item>
						</template>
					</a-breadcrumb>
					<!-- / Header Breadcrumbs -->

					<!-- Header Page Title -->
					<!-- <div class="ant-page-header-heading">
						<span class="ant-page-header-heading-title">{{ this.$route.meta.title || this.$route.name }}</span>
					</div> -->
					<!-- / Header Page Title -->

				</a-col>
				<!-- / Header Breadcrumbs & Title Column -->

				<!-- Header Breadcrumbs & Title Column -->
				<a-col :span="4" :md="1" class="sidebar-toggler-col">

					<!-- / Header Page Title -->
					<a-button type="link" class="sidebar-toggler" @click="$emit('minimizeSidebar') , resizeEventHandler()">
						<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"/></svg>
					</a-button>

				</a-col>
				<!-- / Header Breadcrumbs & Title Column -->

				<!-- Header Control Column -->
				<a-col :span="24" :md="17" class="header-control">

					
					<a-button type="link" class="sidebar-toggler" @click="$emit('toggleSidebar', ! sidebarCollapsed) , resizeEventHandler()">
						<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"/></svg>
					</a-button>
					
					<a class="ant-dropdown-link" @click="handleLogout">
						<svg t="1732874596220" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6803" width="16" height="16"><path d="M1024 448c0 19.2-6.4 32-19.2 44.8l0 0-128 128 0 0C864 633.6 851.2 640 832 640c-38.4 0-64-25.6-64-64 0-19.2 6.4-32 19.2-44.8l0 0L806.4 512 640 512C601.6 512 576 486.4 576 448c0-38.4 25.6-64 64-64l166.4 0-19.2-19.2 0 0C774.4 352 768 339.2 768 320c0-38.4 25.6-64 64-64 19.2 0 32 6.4 44.8 19.2l0 0 128 128 0 0C1017.6 416 1024 428.8 1024 448zM832 128l-128 0L576 128 294.4 128l121.6 70.4 0 0C435.2 211.2 448 230.4 448 256l0 512 64 0 192 0 128 0c38.4 0 64 25.6 64 64s-25.6 64-64 64L512 896 448 896l0 64c0 38.4-25.6 64-64 64-12.8 0-25.6-6.4-32-12.8l0 0-320-192 0 0 0 0c-6.4-6.4-12.8-12.8-19.2-19.2 0 0 0 0 0-6.4C6.4 787.2 0 780.8 0 768L0 64c0-25.6 19.2-51.2 38.4-57.6C44.8 0 57.6 0 64 0l0 0 512 0 256 0c38.4 0 64 25.6 64 64C896 102.4 870.4 128 832 128z" p-id="6804"></path></svg>
					</a>
					<!-- Header Control Buttons -->
						<a-popover>
							<template slot="content">
								<p>{{userinfo.realName}}</p>
								<p>{{userinfo.userType == '2' ? '学生' : '系统管理员'}}</p>
							</template>
							<span class="ant-dropdown-link">
								<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path fill-rule="evenodd" clip-rule="evenodd" d="M18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10ZM12 7C12 8.10457 11.1046 9 10 9C8.89543 9 8 8.10457 8 7C8 5.89543 8.89543 5 10 5C11.1046 5 12 5.89543 12 7ZM9.99993 11C7.98239 11 6.24394 12.195 5.45374 13.9157C6.55403 15.192 8.18265 16 9.99998 16C11.8173 16 13.4459 15.1921 14.5462 13.9158C13.756 12.195 12.0175 11 9.99993 11Z" fill="#111827"/>
								</svg>
								<span class="admin">{{ userinfo == '' ? '系统管理员' : userinfo.userName }}</span>
							</span>
						</a-popover>
					<!-- / Header Control Buttons -->

					<!-- / Header Search Input -->

				</a-col>
				<!-- / Header Control Column -->

			</a-row>
		</a-layout-header>
		<!--  /Layout Header -->

	</component>
	<!-- / Main Sidebar -->

</template>

<script>
	import {
		mapActions
	} from 'vuex'
	const notificationsData = [] ;
	export default ({
		props: {
			// Header fixed status.
			navbarFixed: {
				type: Boolean,
				default: false,
			},

			// Sidebar collapsed status.
			sidebarCollapsed: {
				type: Boolean,
				default: false,
			},

			// Header notifications data.
			notificationsData: {
				type: Array,
				default: () => notificationsData,
			},
		},
		data() {
			return {
				// Fixed header/sidebar-footer ( Affix component ) top offset.
				top: 0,

				// Search input loading status.
				token: '',
				appId: '',
				userinfo: '',
				// The wrapper element to attach dropdowns to.
				wrapper: document.body,
			}
		},
		mounted: function(){
			// Set the wrapper to the proper element, layout wrapper.
			this.wrapper = document.getElementById('layout-dashboard') ;
			setTimeout(() => {
				this.token = window.sessionStorage.getItem('token')
				if (this.token !== undefined && this.token !== null) {
					this.appId = window.sessionStorage.getItem('appId')
					this.manage = JSON.parse(sessionStorage.getItem('manage'))
					this.userinfo = JSON.parse(window.sessionStorage.getItem('userInfo'));
				}
			}, 500)
		},
		created() {
			// Registering window resize event listener to fix affix elements size
			// error while resizing.
			window.addEventListener("resize", this.resizeEventHandler);
		},
		destroyed() {
			// Removing window resize event listener.
			window.removeEventListener("resize", this.resizeEventHandler);
		},
		methods: {
			resizeEventHandler(){
				this.top = this.top ? 0 : -0.01 ;
				// To refresh the header if the window size changes.
				// Reason for the negative value is that it doesn't activate the affix unless
				// scroller is anywhere but the top of the page.
			},
			onSearch(value){
			},
			...mapActions(["Logout"]),
			handleLogout() {
				const that = this
				this.$confirm({
					title: '提示',
					content: '真的要注销登录吗 ?',
					okText: '确认',
					cancelText:'取消',
					onOk() {
						return that.Logout({}).then(() => {
							that.$router.push({
								path: '/user'
							});
						}).catch(err => {
							that.$message.error({
								title: '错误',
								description: err.message
							})
						})
					},
				});
			},
		}
	})

</script>
<style lang="less" scoped>
	/deep/ .ant-col{
		align-content: center;
	}
	/deep/ .ant-layout-header{
		margin:0!important;
	}
</style>
