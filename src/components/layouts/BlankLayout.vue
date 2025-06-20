<template>
	<div style="height:100%;" :style="{paddingTop:sideSubMenus.length>0?'110px':'64px'}">
		<TopMenu :menus="menus" :sidebarCollapsed="sidebarCollapsed" :navbarFixed="navbarFixed"
			@toggleSettingsDrawer="toggleSettingsDrawer" @toggleSidebar="toggleSidebar"
			@minimizeSidebar="minimizeSidebar" @topMenuClick="topMenuClick"></TopMenu>
		<NavBar :menus="sideSubMenus" v-if="sideSubMenus.length>0"></NavBar>
		<div class="container">
			<div class="pageview-contain">
				<router-view />
			</div>
		</div>
	</div>
</template>

<script>
	import TopMenu from '@/components/layouts/Headers/TopMenu';
	import NavBar from '@/components/layouts/Headers/Navbar';
	export default {
		name: "BlankLayout",
		components: {
			TopMenu,
			NavBar
		},
		data() {
			return {
				menus: [{
					key: "menu1",
					title: "首页"
				}, {
					key: "menu2",
					title: "学工系统",
					children: [{
							key: "sub1",
							title: "考勤管理"
						},
						{
							key: "sub2",
							title: "奖惩管理"
						},
						{
							key: "sub3",
							title: "学生评定"
						},
						{
							key: "sub4",
							title: "综合素质评价"
						},
						{
							key: "sub5",
							title: "勤工俭学"
						}
					]
				}, {
					key: "menu6",
					title: "教务系统",
					children: [{
							key: "sub1",
							title: "教室管理"
						},
						{
							key: "sub2",
							title: "成绩查询"
						},
						{
							key: "sub3",
							title: "考试安排"
						},
						{
							key: "sub4",
							title: "课程管理"
						}
					]
				}, {
					key: "menu3",
					title: "活动",
					children: [{
							key: "sub1",
							title: "社团管理"
						},
						{
							key: "sub2",
							title: "心理咨询"
						}
					]
				}, {
					key: "menu4",
					title: "个人中心"
				}],

				// Sidebar collapsed status.
				sidebarCollapsed: false,

				// Sidebar minimized status.
				sidebarMinimized: false,

				// Main sidebar color.
				sidebarColor: "primary",

				// Main sidebar theme : light, white, dark.
				sidebarTheme: "light",

				// Header fixed status.
				navbarFixed: false,

				// Settings drawer visiblility status.
				showSettingsDrawer: false,
				sideSubMenus: [],
			}
		},
		methods: {
			topMenuClick(val) {
				this.sideSubMenus = val.children;
			},
			// Toggle sidebar's collapsed status.
			toggleSidebar(value) {
				this.sidebarCollapsed = value;
			},

			// Toggle sidebar's minimized status.
			minimizeSidebar(value) {
				this.sidebarMinimized = !this.sidebarMinimized;
			},

			// Toggle ettings drawer's visiblility status.
			toggleSettingsDrawer(value) {
				this.showSettingsDrawer = value;
			},

			// Toggle navbar's fixed status.
			toggleNavbarPosition(value) {
				this.navbarFixed = value;
			},

			// Change sidebar's theme.
			updateSidebarTheme(value) {
				this.sidebarTheme = value;
			},

			// Change sidebar's color.
			updateSidebarColor(value) {
				this.sidebarColor = value;
			},

		},
		computed: {
			// Sets layout's element's class based on route's meta data.
			layoutClass() {
				return this.$route.meta.layoutClass;
			}
		},
	}
</script>

<style scoped>
	.container {
		padding-top:20px;
	}
	.ant-layout{
		background: none;
	}
	.ant-layout.ant-layout-has-sider > .ant-layout-content{
		margin-left:16px;
		background: #fff;
	}
	.pageview-contain {
		margin: 0 3%;
	}
</style>