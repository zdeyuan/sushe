<template>
	<div style="height:100%;" :style="{paddingTop:navItems && navItems.length>0?'110px':'64px'}">
		<TopMenu :menus="menus" :defaultSelectedKeys="menuSelectKey" :sidebarCollapsed="sidebarCollapsed"
			:navbarFixed="navbarFixed" @toggleSettingsDrawer="toggleSettingsDrawer" @toggleSidebar="toggleSidebar"
			@minimizeSidebar="minimizeSidebar" @topMenuClick="topMenuClick"></TopMenu>
		<NavBar :defaultSelectedKeys="navSelectedKey" :menus="navItems" v-if="navItems && navItems.length>0"
			@navClick="navClick"></NavBar>
		<!-- Dashboard Layout -->
		<div class="container">
			<div class="pageview-contain">
				<a-layout v-if="sideObj&&sideObj.children" class="layout-dashboard" id="layout-dashboard" :class="[
			           navbarFixed ? 'navbar-fixed' : '',
			           !sidebarCollapsed ? 'has-sidebar' : '',
			           layoutClass,
			           sidebarMinimized ? 'sidebar-minimized' : ''
			         ]">
					<DefaultSidebar :defaultSelectedKeys="sideSelectKey" :sideObj="sideObj"
						:sidebarCollapsed="sidebarCollapsed" :sidebarColor="sidebarColor" :sidebarTheme="sidebarTheme"
						@toggleSidebar="toggleSidebar"></DefaultSidebar>
					<a-layout-content>
						<router-view :navbarFixed="navbarFixed" />
					</a-layout-content>
				</a-layout>
				<router-view v-else />
			</div>
		</div>
	</div>
</template>

<script>
	import DefaultSidebar from '@/components/layouts/Sidebars/DefaultSidebar';
	import TopMenu from '@/components/layouts/Headers/TopMenu';
	import NavBar from '@/components/layouts/Headers/Navbar';
	import {
		mapActions,
		mapGetters,
		mapState
	} from 'vuex'
	export default ({
		components: {
			DefaultSidebar,
			TopMenu,
			NavBar
		},
		data() {
			return {
				sidebarCollapsed: false,
				sidebarMinimized: false,
				sidebarColor: "primary",
				sidebarTheme: "light",
				navbarFixed: false,
				showSettingsDrawer: false,
			}
		},
		created() {
			this.loadMenus();
		},
		computed: {
			...mapState('sidebar', ['menus', 'sideObj', 'isMenusLoading', 'navItems', 'navSelectedKey',
				'sideSelectKey', 'menuSelectKey'
			]),
			layoutClass() {
				return this.$route.meta.layoutClass;
			}
		},
		methods: {
			...mapActions('sidebar', ['getMenus']),
			async loadMenus() {
				const currentPath = this.$route.path;
				await this.getMenus(currentPath);
			},
			navClick(val) {
				console.log("val",val)
				if(val.children.length>0){
					this.$store.commit('sidebar/SET_SIDEOBJ', val);
					this.$store.commit('sidebar/SET_SIDESELECTEDKEY', [val.children[0].name]);
					this.$router.push(val.children[0].path);
				}else{
					this.$store.commit('sidebar/SET_SIDEOBJ', {});
					this.$store.commit('sidebar/SET_SIDESELECTEDKEY', []);
					this.$router.push(val.path);
				}
				
			},
			topMenuClick(val) {
				if (val.children) {
					this.$store.commit('sidebar/SET_NAVITEMS', val.children);
				} else {
					this.$store.commit('sidebar/SET_NAVITEMS', []);
					this.$store.commit('sidebar/SET_MENUSELECTEDKEY', [val.name]);
					this.$store.commit('sidebar/SET_SIDEOBJ', {});
					this.$router.push(val.path);
				}
			},
			toggleSidebar(value) {
				this.sidebarCollapsed = value;
			},
			minimizeSidebar(value) {
				this.sidebarMinimized = !this.sidebarMinimized;
			},
			toggleSettingsDrawer(value) {
				this.showSettingsDrawer = value;
			}

		},
	})
</script>

<style scoped>
	.container {
		background: url('../../assets/img/content-bg.png') no-repeat;
		background-size: 100%;
		padding: 20px 0;
		height: 100%;
		box-sizing: border-box;
	}

	.example {
		text-align: center;
		background: rgba(0, 0, 0, 0.05);
		width: 100%;
		height: 100%;
		padding-top: 30%;
		box-sizing: border-box;
		position: absolute;
		top: 0;
		left: 0;
	}

	.ant-layout {
		background: none;
	}

	.ant-layout.ant-layout-has-sider>.ant-layout-content {
		margin-left: 16px;
		background: #fff;
	}
	/deep/ .pageview-contain .ant-layout{
		min-height:100%;
	}
	.pageview-contain {
		margin: 0 3%;
		height: 100%;
		box-sizing:border-box;
	}
</style>