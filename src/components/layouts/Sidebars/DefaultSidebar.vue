<template>

	<!-- Main Sidebar -->
	<a-layout-sider collapsible  class="sider-primary" breakpoint="lg" collapsed-width="0" width="250px"
		:collapsed="sidebarCollapsed" @collapse="$emit('toggleSidebar', ! sidebarCollapsed)" :trigger="null"
		:class="['ant-layout-sider-' + sidebarColor, 'ant-layout-sider-' + sidebarTheme]" theme="light"
		:style="{ backgroundColor: 'transparent',}">
		<!-- Sidebar Navigation Menu -->
		<div data-v-76f4bb7c="" class="title">{{sideObj.name}}</div>
		<a-menu theme="light" mode="inline"  :selectedKeys="selectedKeys"  @select="onOpenChange">
			<a-menu-item v-for="(item,index) in sideObj.children" :key="item.name" v-if="item.name!=''">
				<router-link :to="item.path">
					<span class="label">{{item.name}}</span>
				</router-link>
			</a-menu-item>
		</a-menu>
		<!-- / Sidebar Navigation Menu -->

	</a-layout-sider>
	<!-- / Main Sidebar -->

</template>

<script>
	export default ({
		props: {
			// Sidebar collapsed status.
			sidebarCollapsed: {
				type: Boolean,
				default: false,
			},

			// Main sidebar color.
			sidebarColor: {
				type: String,
				default: "primary",
			},
			sideObj:{
				type: Object,
				default: {},
			},
			// Main sidebar theme : light, white, dark.
			sidebarTheme: {
				type: String,
				default: "light",
			},
			defaultSelectedKeys: {
				type: Array,
				default: () => []
			}
		},
		data() {
			return {
				selectedKeys:[]
			}
		},
		mounted(){
			this.selectedKeys = this.defaultSelectedKeys;
			console.log(this.sideObj,"？？？？？？？？")
		},
		watch:{
			defaultSelectedKeys(val){
				this.selectedKeys = val;
			}
		},
		methods: {
			onOpenChange(openKeys) {
				this.selectedKeys = [openKeys.key];
			},
			handleSingleMenuItemClick() {
				console.log(this.openKeys);
				// this.openKeys = [];
			}
		},
	})
</script>
<style lang="less" scoped>
	.title{
		background: #3B69E3 url("../../../assets/img/title-bg.png") no-repeat;
		background-size: auto 200%;
		background-position: right ;
		font-size:16px;
		height:47px;
		line-height:47px;
		text-align:center;
		color:#fff;
	}
	
	/deep/.ant-menu-submenu-title,
	 {
		font-size: 16px !important;
	}
	.ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected{
		background:linear-gradient(90deg,#e5ecfc 2%,#fff);
	}
	/deep/.ant-layout-sider-children{
		box-shadow: rgba(0, 0, 0, 0.12) 0px 0px 16px 0px;
		background:linear-gradient(rgb(255, 255, 255) 0%, rgb(245, 248, 253) 100%) ;
	}
</style>