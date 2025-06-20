import Vue from 'vue'
const sidebar = {
	namespaced: true,
	state: {
		//存储对象属性 value,text
		sidebarVisible: false,
		activeMenuItem: null,
		menus: [],
		sideObj: {},
		navItems: [],
		navSelectedKey: [],
		sideSelectKey: [],
		menuSelectKey: [],
		isMenusLoading: true
	},
	mutations: {
		SET_SIDEBAR_VISIBLE(state, visible) {
			state.sidebarVisible = visible;
		},
		SET_ACTIVE_MENU_ITEM(state, menuItem) {
			state.activeMenuItem = menuItem;
		},
		SET_MENUS(state, menus) {
			state.menus = menus;
			state.isMenusLoading = false;
		},
		SET_SIDEOBJ(state, sideObj) {
			state.sideObj = sideObj;
		},
		SET_NAVITEMS(state, navItems) {
			state.navItems = navItems;
		},
		SET_NAVSELECTEDKEY(state, navSelectedKey) {
			state.navSelectedKey = navSelectedKey;
		},
		SET_SIDESELECTEDKEY(state, sideSelectKey) {
			state.sideSelectKey = sideSelectKey;
		},
		SET_MENUSELECTEDKEY(state, menuSelectKey) {
			state.menuSelectKey = menuSelectKey;
		}
	},
	actions: {
		async getMenus({
			commit
		},openpath) {
			try {
				let menus=JSON.parse(localStorage.getItem('menus'));
				commit('SET_MENUS', menus);
				menus.forEach((e) => {
					if (e.children && e.children.length > 0) {
						e.children.forEach((ite) => {
							if (ite.children) {
								ite.children.forEach((ii) => {
									if (ii.path === openpath) {
										commit('SET_SIDEOBJ', ite);
										commit('SET_NAVSELECTEDKEY', [ite.name]);
										commit('SET_NAVITEMS', e.children);
										commit('SET_SIDESELECTEDKEY', [ii.name]);
										commit('SET_MENUSELECTEDKEY', [e.name]);
									}
								});
							}
						});
					}else{
						commit('SET_SIDEOBJ', {});
						commit('SET_NAVSELECTEDKEY', []);
						commit('SET_NAVITEMS', []);
						commit('SET_SIDESELECTEDKEY', []);
						commit('SET_MENUSELECTEDKEY', [e.name]);
					}
				});
			} catch (error) {
				console.error('获取菜单数据失败:', error);
				state.isMenusLoading = false; // 加载失败，更新状态
			}
		},
	}
}

export default sidebar