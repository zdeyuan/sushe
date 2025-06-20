import {
	UserLayout,
	Default,
} from '@/components/layouts'

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [{
		// will match everything
		path: '*',
		component: () => import('@/views/404.vue'),
	},
	{
		path: '/',
		name: 'home',
		component: Default,
		
		redirect: '/home',
		children: [{
			path: '/home',
			name: 'home',
			component: () => import('@/views/index/index')
		}]
	},
	{
		path: '/user',
		name: 'user',
		component: UserLayout,
		redirect: '/user/login',
		children: [{
			path: 'login',
			name: 'login',
			component: () => import('@/views/user/Login')
		}]
	},
	{
		path: '/user',
		name: 'user',
		component: Default,
		redirect: '/user/password',
		children: [{
			path: 'password',
			name: 'password',
			component: () => import('@/views/user/password')
		}]
	}
]