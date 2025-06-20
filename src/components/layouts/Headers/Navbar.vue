<template>
	<div ref="menuContainer">
		<a-layout-header :style="{ position: 'fixed', top:'64px',zIndex: 1, width: '100%' }" class="navContent">
			<a-menu mode="horizontal" style="width:100%;text-align:center" :defaultSelectedKeys="defaultSelectedKeys" >
				<a-menu-item v-for="(menu, index) in menus" :key="menu.name" :title="menu.name" @click="sideLeft(menu)">
					{{ menu.name }}
				</a-menu-item>
				<!-- <a-sub-menu v-if="overflowMenuItems.length > 0" title="更多">
					<a-menu-item v-for="(menu, index) in overflowMenuItems" :key="menu.name" @click="sideLeft(menu)">
						{{ menu.name }}
					</a-menu-item>
				</a-sub-menu> -->
			</a-menu>
		</a-layout-header>
	</div>
</template>

<script>
	export default {
		name: "TopMenu",
		props: {
			menus: {
				type: Array,
				default: () => []
			},
			defaultSelectedKeys: {
				type: Array,
				default: () => []
			}
		},
		data() {
			return {
				itemWidth: 100, // 假设每个菜单项的宽度（包括间距等，实际需根据样式计算）
				gap: 10, // 菜单项之间的间距
				maxItemsPerRow: 0,
				windowResizeHandler: null
			};
		},
		computed: {
			visibleMenuItems() {
				return this.menus.slice(0, this.maxItemsPerRow);
			},
			overflowMenuItems() {
				return this.menus.slice(this.maxItemsPerRow);
			}
		},
		mounted() {
			this.calculateMaxItemsPerRow();
			this.windowResizeHandler = this.handleWindowResize.bind(this);
			window.addEventListener('resize', this.windowResizeHandler);
		},
		beforeUnmount() {
			if (this.windowResizeHandler) {
				window.removeEventListener('resize', this.windowResizeHandler);
			}
		},
		methods: {
			sideLeft(val){
				this.$emit('navClick', val);
			},
			handleMenuClick(val) {
				this.$emit('menuClick', val);
			},
			calculateMaxItemsPerRow() {
				// const containerWidth = this.$refs.menuContainer.offsetWidth;
				// this.maxItemsPerRow = Math.floor(containerWidth / (this.itemWidth + this.gap));
			},
			handleWindowResize() {
				this.calculateMaxItemsPerRow();
			}
		}
	};
</script>

<style scoped>
	.ant-layout-header.navContent {
		background-color: #fff;
		height: 46px;
		line-height: 46px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 18px;
		padding: 0 16px;
	}

	.ant-layout-header {
		border-bottom: 1px solid #e8e8e8
	}

	.ant-menu {
		background: none;
	}

	/* 可以添加顶部菜单组件的局部样式 */
</style>