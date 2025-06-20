<template>

	<!-- Main Sidebar -->
	<component :is="navbarFixed ? 'a-affix' : 'div'" :offset-top="top">

		<!-- Layout Header -->
		<a-layout-header :style="{ position: 'fixed',top:0, zIndex: 999, width: '100%' }">
			<div class="topMenu">
				<!-- Header Breadcrumbs & Title Column -->
				<div :class="table == '智慧校园' ? 'brand2' : 'brand'"><span>{{table}}</span></div>
				<a-menu mode="horizontal" theme="dark" style="width:75%;text-align:center;" :selectedKeys="selectedKeys" @select="onOpenChange"
					@click="handleMenuClick">
					<a-menu-item v-for="(menu, index) in menus" :key="menu.name" :title="menu.name">
						{{ menu.name }}
					</a-menu-item>
				</a-menu>
				<div class="ant-dropdow">
					<!-- <div @click="" class="toback">进入后台</div> -->
					<a-dropdown>
						<a-badge :count="unreadCount" style="margin-right: 20px;" @click="toNoice">
							<a-icon type="bell" style="font-size:22px;" />
						</a-badge>
						<div slot="overlay" style="width:500px">
							<a-list bordered :data-source="unreadMessages" style="background: #fff;">
								<div slot="header">
									通知公告({{unreadCount}})
								</div>
								<a-list-item slot="renderItem" slot-scope="item, index">
									<template v-for="{ type, text } in item.actions" slot="actions">
										<span :key="type">
											{{type}}：
											{{ text }}
										</span>
									</template>
									<a-list-item-meta :description="item.description">
										<a slot="title" href="javascript:;" @click="updateMessages(item.id)">{{ item.title }}</a>
										<a-icon type="bell" style="font-size:22px;" />
									</a-list-item-meta>
								</a-list-item>
								<div slot="footer" style="text-align:center;">
									<a href="javasciprt:;" @click="toNoice">
										查看更多 <a-icon type="right" />
									</a>
								</div>
							</a-list>
						</div>
						</a-list>
					</a-dropdown>
					<a-dropdown>
						<span class="ant-dropdown-link" style="margin-right:10px;">
							<svg t="1736841165149" class="icon" viewBox="0 0 1024 1024" version="1.1"
								xmlns="http://www.w3.org/2000/svg" p-id="9299" width="25" height="25">
								<path d="M0 511.966a511.966 511.966 0 1 0 1023.932 0A511.966 511.966 0 1 0 0 511.966z"
									fill="#F9F5F1" p-id="9300"></path>
								<path d="M463.159 761.73h109.94v90.523h-109.94z" fill="#FFDBB3" p-id="9301"></path>
								<path
									d="M709.395 876.03c-18.961-16.61-49.3-28.67-84.645-36.406a517.39 517.39 0 0 0-111.533-10.58 565.286 565.286 0 0 0-99.093 9.063c-41.716 7.813-77.402 20.517-99.777 37.924-16.724 12.97-26.546 56.506-32.349 93.48a512.687 512.687 0 0 0 465.586-2.92c-9.064-35.837-22.375-76.832-38.189-90.56z"
									fill="#FFDBB3" p-id="9302"></path>
								<path
									d="M709.395 876.03c-18.961-16.61-49.3-28.67-84.645-36.406-8.115-1.782-22.754-4.285-22.754-4.285s-51.158 59.919-80.739 60.109-90.295-60.11-90.295-60.11-12.818 2.087-16.687 2.807c-41.715 7.812-77.401 20.517-99.776 37.924-16.724 12.97-26.547 56.506-32.349 93.48a512.687 512.687 0 0 0 465.586-2.92c-9.216-35.875-22.527-76.87-38.34-90.598z"
									fill="#2aa515" p-id="9303"></path>
								<path
									d="M427.549 833.253l63.635 103.114 26.926-40.957-54.951-88.4-35.61 26.243z m93.557 62.157l26.925 40.957 59.881-107.4L573.1 807.01l-51.993 88.4zM511.625 973a6.485 6.485 0 1 0 12.97 0 6.485 6.485 0 1 0-12.97 0zM511.625 921.463a6.485 6.485 0 1 0 12.97 0 6.485 6.485 0 1 0-12.97 0z"
									fill="#FFFFFF" p-id="9304"></path>
								<path
									d="M512.724 140.885a288.863 288.863 0 0 0-288.976 288.901c0 159.506 129.433 366.606 288.976 366.606s288.863-206.948 288.863-366.454a288.863 288.863 0 0 0-288.863-289.053z"
									fill="#FFDBB3" p-id="9305"></path>
								<path
									d="M717.928 162.843c-109.22-62.346-213.926-92.798-311.162-42.664s-150.67 114.946-163.829 159.847-27.229 92.799-30.566 124.73c-4.096 37.924 0 152.984 0 152.984h37.544s12.098-116.046 23.627-152.983c14.676-47.594 68.944-142.175 104.82-169.632s119.004 32.463 217.036 57.378S736.7 359.476 754.676 404.757C768.973 440.67 777.05 557.74 777.05 557.74h38.91V404.757s11.186-179.568-98.033-241.914z"
									fill="#603913" p-id="9306"></path>
								<path
									d="M230.688 508.363a51.045 51.045 0 0 0-36.255 62.422c7.206 27.267 38.682 56.885 65.95 49.528s39.97-48.428 32.765-75.847a51.045 51.045 0 0 0-62.46-36.103z m562.556 0a51.045 51.045 0 0 0-62.422 36.293c-7.205 27.267 5.499 68.452 32.766 75.847s58.705-22.261 65.949-49.528a51.045 51.045 0 0 0-36.293-62.612z"
									fill="#FFDBB3" p-id="9307"></path>
								<path
									d="M322.311 506.657a24.423 24.423 0 1 0 48.845 0 24.423 24.423 0 1 0-48.845 0zM647.846 506.657a24.423 24.423 0 1 0 48.845 0 24.423 24.423 0 1 0-48.845 0z"
									fill="#231F20" p-id="9308"></path>
								<path
									d="M604.006 630.628a4.02 4.02 0 0 0-4.702 3.224c-0.342 1.782-9.254 44.143-82.067 44.143h-0.19c-61.132 0-81.686-43.195-82.559-45.091a4.02 4.02 0 0 0-7.319 3.337c0.91 2.01 23.361 49.718 89.879 49.793h0.227c79.83 0 89.575-48.655 89.955-50.741a4.02 4.02 0 0 0-3.224-4.665z"
									fill="#603913" p-id="9309"></path>
							</svg>
							<span class="admin"
								style="margin-left:10px;font-size:16px;">{{ userinfo == '' ? '系统管理员' : userinfo.realName }}</span>
						</span>
						<a-menu slot="overlay">
							<a-menu-item>
								<div class="my-info"><svg t="1736841165149" class="icon" viewBox="0 0 1024 1024"
										version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9299" width="84"
										height="84">
										<path
											d="M0 511.966a511.966 511.966 0 1 0 1023.932 0A511.966 511.966 0 1 0 0 511.966z"
											fill="#F9F5F1" p-id="9300"></path>
										<path d="M463.159 761.73h109.94v90.523h-109.94z" fill="#FFDBB3" p-id="9301">
										</path>
										<path
											d="M709.395 876.03c-18.961-16.61-49.3-28.67-84.645-36.406a517.39 517.39 0 0 0-111.533-10.58 565.286 565.286 0 0 0-99.093 9.063c-41.716 7.813-77.402 20.517-99.777 37.924-16.724 12.97-26.546 56.506-32.349 93.48a512.687 512.687 0 0 0 465.586-2.92c-9.064-35.837-22.375-76.832-38.189-90.56z"
											fill="#FFDBB3" p-id="9302"></path>
										<path
											d="M709.395 876.03c-18.961-16.61-49.3-28.67-84.645-36.406-8.115-1.782-22.754-4.285-22.754-4.285s-51.158 59.919-80.739 60.109-90.295-60.11-90.295-60.11-12.818 2.087-16.687 2.807c-41.715 7.812-77.401 20.517-99.776 37.924-16.724 12.97-26.547 56.506-32.349 93.48a512.687 512.687 0 0 0 465.586-2.92c-9.216-35.875-22.527-76.87-38.34-90.598z"
											fill="#2aa515" p-id="9303"></path>
										<path
											d="M427.549 833.253l63.635 103.114 26.926-40.957-54.951-88.4-35.61 26.243z m93.557 62.157l26.925 40.957 59.881-107.4L573.1 807.01l-51.993 88.4zM511.625 973a6.485 6.485 0 1 0 12.97 0 6.485 6.485 0 1 0-12.97 0zM511.625 921.463a6.485 6.485 0 1 0 12.97 0 6.485 6.485 0 1 0-12.97 0z"
											fill="#FFFFFF" p-id="9304"></path>
										<path
											d="M512.724 140.885a288.863 288.863 0 0 0-288.976 288.901c0 159.506 129.433 366.606 288.976 366.606s288.863-206.948 288.863-366.454a288.863 288.863 0 0 0-288.863-289.053z"
											fill="#FFDBB3" p-id="9305"></path>
										<path
											d="M717.928 162.843c-109.22-62.346-213.926-92.798-311.162-42.664s-150.67 114.946-163.829 159.847-27.229 92.799-30.566 124.73c-4.096 37.924 0 152.984 0 152.984h37.544s12.098-116.046 23.627-152.983c14.676-47.594 68.944-142.175 104.82-169.632s119.004 32.463 217.036 57.378S736.7 359.476 754.676 404.757C768.973 440.67 777.05 557.74 777.05 557.74h38.91V404.757s11.186-179.568-98.033-241.914z"
											fill="#603913" p-id="9306"></path>
										<path
											d="M230.688 508.363a51.045 51.045 0 0 0-36.255 62.422c7.206 27.267 38.682 56.885 65.95 49.528s39.97-48.428 32.765-75.847a51.045 51.045 0 0 0-62.46-36.103z m562.556 0a51.045 51.045 0 0 0-62.422 36.293c-7.205 27.267 5.499 68.452 32.766 75.847s58.705-22.261 65.949-49.528a51.045 51.045 0 0 0-36.293-62.612z"
											fill="#FFDBB3" p-id="9307"></path>
										<path
											d="M322.311 506.657a24.423 24.423 0 1 0 48.845 0 24.423 24.423 0 1 0-48.845 0zM647.846 506.657a24.423 24.423 0 1 0 48.845 0 24.423 24.423 0 1 0-48.845 0z"
											fill="#231F20" p-id="9308"></path>
										<path
											d="M604.006 630.628a4.02 4.02 0 0 0-4.702 3.224c-0.342 1.782-9.254 44.143-82.067 44.143h-0.19c-61.132 0-81.686-43.195-82.559-45.091a4.02 4.02 0 0 0-7.319 3.337c0.91 2.01 23.361 49.718 89.879 49.793h0.227c79.83 0 89.575-48.655 89.955-50.741a4.02 4.02 0 0 0-3.224-4.665z"
											fill="#603913" p-id="9309"></path>
									</svg>
									<div class="info-detail" v-if="$hasPer(['system'])">
										<h3> {{ userinfo == '' ? '系统管理员' : userinfo.userName }} </h3>
										<div class="detail-describe">联系电话：{{userinfo.userTel}}</div>
										<div :title="role[0].text" class="detail-describe">
											所属角色：管理员</div>
									</div>
									<div class="info-detail" v-if="$hasPer(['teacher','bzr'])">
										<h3> {{ userinfo == '' ? '老师' : userinfo.realName }} </h3>
										<div class="detail-describe">职工号：{{userinfo.teacherOrStudentCode}}</div>
										<div title="" class="detail-describe">
											所属院系：{{userinfo.yxmc}} </div>
									</div>
									<div class="info-detail" v-if="$hasPer('student')">
										<h3> {{ userinfo == '' ? '学生' : userinfo.realName }} </h3>
										<div class="detail-describe">学号：{{userinfo.teacherOrStudentCode}}</div>
										<div title="" class="detail-describe">
											所属院系：{{userinfo.yxmc}} </div>
									</div>
								</div>
							</a-menu-item>
							<a-menu-item>
								<a href="javascript:;"  style="text-align:center" @click="topwd">修改密码</a>
							</a-menu-item>
							<a-menu-item>
								<a href="javascript:;" style="text-align:center" @click="handleLogout">退出登录</a>
							</a-menu-item>
						</a-menu>
					</a-dropdown>
				</div>


			</div>
		</a-layout-header>
		<!--  /Layout Header -->

	</component>
	<!-- / Main Sidebar -->

</template>

<script>
	import {
		mapActions,
		mapState
	} from 'vuex'
	import {setReadAnnount }  from '@/api/index/index';
	const notificationsData = [];
	export default ({
		props: {
			// Header fixed status.
			navbarFixed: {
				type: Boolean,
				default: false,
			},
			menus: {
				type: Array,
				default: () => []
			},
			// Sidebar collapsed status.
			sidebarCollapsed: {
				type: Boolean,
				default: false,
			},
			defaultSelectedKeys: {
				type: Array,
				default: () => []
			},
			// Header notifications data.
			notificationsData: {
				type: Array,
				default: () => notificationsData,
			},
		},
		watch:{
			defaultSelectedKeys(val){
			}
		},
		data() {
			return {
				// Fixed header/sidebar-footer ( Affix component ) top offset.
				top: 0,
				// Search input loading status.
				token: '',
				table:'',
				appId: '',
				noiceData: [],
				selectedKeys:[],
				userinfo: '',
				role:[{
					text:''
				}],
				// The wrapper element to attach dropdowns to.
				wrapper: document.body,
			}
		},
		mounted() {
			this.table = process.env.VUE_APP_SYSTEM_WEB_TABEL_NAME;
			// Set the wrapper to the proper element, layout wrapper.
			this.wrapper = document.getElementById('layout-dashboard');
			this.token = window.sessionStorage.getItem('token')
			if (this.token !== undefined && this.token !== null) {
				this.appId = window.sessionStorage.getItem('appId')
				this.manage = JSON.parse(sessionStorage.getItem('manage'))
				this.role = JSON.parse(sessionStorage.getItem('role'))
				this.userinfo = JSON.parse(window.sessionStorage.getItem('userInfo'));
			}
		},
		 computed: {
		    ...mapState('user',['unreadMessages','unreadCount'])
		  },
		watch:{
			defaultSelectedKeys(val){
				this.selectedKeys = val;
			}
		},
		created() {
			// Registering window resize event listener to fix affix elements size
			// error while resizing.
			this.fetchUnreadMessages();
			window.addEventListener("resize", this.resizeEventHandler);
		},
		destroyed() {
			// Removing window resize event listener.
			window.removeEventListener("resize", this.resizeEventHandler);
		},
		methods: {
			...mapActions('user',["Logout",'fetchUnreadMessages']),
			updateMessages(id){
				this.setRead(id);
				setTimeout(e=>{
					this.fetchUnreadMessages();
				},300);
				this.$router.push({
					path:'/notificationAnnouncement/notice/content',
					query:{
						id
					}
				});
				
			},
			async setRead(id){
				let res=await setReadAnnount({anntId:id});
			},
			handleMenuClick(val) {
				let nav = this.menus.find(obj => obj.name === val.key);
				this.$emit("topMenuClick", nav)
			},
			toNoice(){
				this.fetchUnreadMessages(); 
				this.$router.push({
					path:'/notificationAnnouncement/notice/index'
				})
			},
			resizeEventHandler() {
				this.top = this.top ? 0 : -0.01;
				// To refresh the header if the window size changes.
				// Reason for the negative value is that it doesn't activate the affix unless
				// scroller is anywhere but the top of the page.
			},
			onOpenChange(openKeys) {
				this.selectedKeys = [openKeys.key];
			},
			topwd(){
				this.$router.push({
					path:'/user/password'
				})
			},
			handleLogout() {
				const that = this
				this.$confirm({
					title: '提示',
					content: '真的要注销登录吗 ?',
					okText: '确认',
					cancelText: '取消',
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
	.topMenu {
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
		height: 64px;
	}
	/deep/.ant-dropdown-menu-item{
		border-bottom:1px solid #f2f2f2;
		&:last-child{
			border:none;
		}
	}
	.ant-dropdow {
		position: absolute;
		right: 20px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	/deep/ .ant-list-item-action>li {
		font-size: 12px;
		text-align: left;
		color: rgba(18, 28, 37, .45);
	}
	/deep/.ant-list-item-meta-description{
		font-size:12px;
		word-break: break-all;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1; /* 这里是超出几行省略 */
		overflow: hidden;
	}
	.ant-list-item {
		display: block;
	}

	/deep/.ant-list-item-action {
		margin-left: 0;
	}

	.ant-dropdown-link {

		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
		height: 46px;
	}

	.ant-menu-horizontal {
		border: none;
		line-height: 64px;
	}

	.ant-menu {
		background: none;
		color: #fff;
		font-size: 16px;
	}

	.ant-layout-header {
		padding: 0 20px;
		background: #3e7bfa url("../../../assets/img/top-menu-bg.png") no-repeat;
		background-size: auto 100%;
	}
	.toback {
		margin-right: 10px;
		font-size: 14px;
		border-radius: 20px;
		padding: 0 10px;
		border: 1px solid #fff;
		height: 35px;
		line-height: 35px;
		cursor: pointer;

		&:hover {
			background: rgba(255, 255, 255, .2);
		}
	}

	.my-info {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		flex-direction: row;
		align-items: center;

		.avatar {
			-ms-flex-negative: 0;
			flex-shrink: 0;
			background: #e3e9fa;
			vertical-align: middle;
			border: 5px solid #e3e9fa;
			margin: 0 15px;
		}

		h3 {
			font-size: 16px;
			font-weight: normal;
		}

		.info-detail {
			flex: 1 1 auto;
			width: 234px;
			margin: 0 10px;

			.detail-describe {
				font-size: 14px;
				color: rgba(18, 28, 37, .65);
				text-align: left;
				line-height: 35px;
				// overflow: hidden;
				// white-space: nowrap;
				// text-overflow: ellipsis;
				// word-break: break-all
			}
		}
	}

	.brand {
		text-align: center;
		font-size: 16px;
		margin-left: -10px;
		padding: 0 !important;
		text-align: center;
		color: #fff;
		position: absolute;
		left: 20px;
		height: 46px;
		line-height: 1.5;
		width: 140px;

		span {
			margin: 0 !important;
		}
	}
	.brand2 {
		text-align: center;
		font-size: 20px;
		margin-left: -10px;
		padding: 0 !important;
		text-align: center;
		color: #fff;
		position: absolute;
		left: 20px;
		height: 46px;
		line-height: 46px;
		width: 140px;
		span {
			margin: 0 !important;
		}
	}
	.ant-menu-item {
		color: #fff !important;
	}

	.ant-menu-item:hover,
	.ant-menu-item-active,
	.ant-menu-item-selected,
	{
	background-color: rgba(255, 255, 255, .2) !important;
	/* 更改为你想要的颜色 */
	}
</style>