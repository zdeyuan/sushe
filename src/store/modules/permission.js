import { asyncRouterMap } from "@/router"
import { constantRouterMap } from "@/config/router.config"
import VueRouter from 'vue-router'
import { cloneDeep } from 'lodash'; // 需要安装 lodash 库

/**
 * 过滤账户是否拥有某一个权限，并将菜单从加载列表移除
 *
 * @param permission
 * @param route
 * @returns {boolean}
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    let flag = -1;
    for (let i = 0, len = roles.length; i < len; i++) {
      flag = route.meta.roles.indexOf(roles[i]);
      if (flag >= 0) {
        return true;
      }
    }
	// console.log("结果false")
    return false;
  }else{
	  // console.log("结果false2")
	  return false;
  }
}
/**
 * 单账户多角色时，使用该方法可过滤角色不存在的菜单
 *
 * @param roles
 * @param route
 * @returns {*}
 */
// eslint-disable-next-line
function hasRole(roles, route) {
  if (route.meta && route.meta.roles) {
    return route.meta.roles.indexOf(roles.id)
  } else {
    return true
  }
}

function filterAsyncRouter(routerMap, roles) {
	// if(routerMap.meta.isHide) return;
  const accessedRouters = routerMap.filter(route => {
    if (hasPermission(roles, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles);
      }
      return true;
    }
    return false;
  });
  return accessedRouters;
}


const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, data) => {
      state.addRouters = data
      state.routers = constantRouterMap.concat(data);
      //console.log('-----mutations---SET_ROUTERS----', data)
    },
    RESET_ROUTERS: (state) => {
      state.addRouters = []
      state.routers = constantRouterMap
    }
  },
  actions: {
    GenerateRoutes({ commit }, roles) {
      return new Promise(resolve => {
	// 深拷贝 asyncRouterMap
	     const asyncRouterMapCopy = cloneDeep(asyncRouterMap);
        const accessedRoutes = filterAsyncRouter(asyncRouterMapCopy, roles);
       commit('SET_ROUTERS', accessedRoutes)
        resolve(accessedRoutes)
      })
    },
    // 动态添加主界面路由，需要缓存
    UpdateAppRouter({ commit }, routes) {
      return new Promise(resolve => {
        //const [ roles ] = routes.constRoutes
        let routelist = routes.constRoutes;
        commit('SET_ROUTERS', routelist)
        resolve()
      })
    }
  }
}

export default permission