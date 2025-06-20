import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import {
	constantRouterMap
} from "@/config/router.config"
import {
	UserLayout,
	Dashboard,
	Default,
	// BlankLayout
} from '@/components/layouts'
Vue.use(VueRouter)

export const asyncRouterMap = [



	{ // 首页默认菜单
		path: '/baseData',
		component: Default,
		meta: {
			title: '基础信息管理',
			breadcrumbs: ['基础数据管理', '学校基本信息管理'],
			roles: ['system']
		},
		redirect: '/baseData/index',
		children: [{
			//用户管理
			path: '/baseData/index',
			meta: {
				title: '学校基础信息',
				roles: ['system'],
				breadcrumbs: ['学校基本信息管理', '学校基础信息'],
			},
			name: 'schoolInfo',
			component: () => import('@/views/common/basicsData/schoolInfo/index')
		}, {
			path: '/baseData/schoollMsg/index',
			meta: {
				title: '校区信息',
				roles: ['system'],
				breadcrumbs: ['学校基本信息管理', '校区信息'],
			},
			name: 'schoollMsg',
			component: () => import('@/views/common/basicsData/schoollMsg/index')
		}],
	},
	{ // 部门管理
		path: '/baseData/department/index',
		component: Default,
		meta: {
			title: '部门管理',
			breadcrumbs: ['基础数据管理', '部门管理'],
			roles: ['system']
		},
		redirect: '/baseData/department/index',
		children: [{
			path: '/baseData/department/index',
			meta: {
				title: '部门管理',
				roles: ['system'],
				breadcrumbs: ['基础信息管理', '部门管理'],
			},
			name: 'department',
			component: () => import('@/views/common/basicsData/departmentManagement/index')
		}],
	},
	{ // 院系管理
		path: '/baseData/schoolFaculties/index',
		component: Default,
		meta: {
			title: '院系管理',
			breadcrumbs: ['基础数据管理', '院系管理'],
			roles: ['system']
		},
		redirect: '/baseData/schoolFaculties/index',
		children: [{
			path: '/baseData/schoolFaculties/index',
			meta: {
				title: '院系管理',
				roles: ['system'],
				breadcrumbs: ['院系管理', '院系管理'],
			},
			name: 'schoolFaculties',
			component: () => import('@/views/common/basicsData/schoolFaculties/index')
		}]
	},
	{ // 专业管理
		path: '/baseData/schoolSpecialized/index',
		component: Default,
		meta: {
			title: '专业管理',
			breadcrumbs: ['基础数据管理', '专业管理'],
			roles: ['system']
		},
		redirect: '/baseData/schoolSpecialized/index',
		children: [{
			path: '/baseData/schoolSpecialized/index',
			meta: {
				title: '专业管理',
				roles: ['system'],
				breadcrumbs: ['专业管理', '专业管理'],
			},
			name: 'schoolSpecialized',
			component: () => import('@/views/common/basicsData/schoolSpecialized/index')
		}, {
			path: '/baseData/zyzInfo/index',
			meta: {
				title: '专业组管理',
				roles: ['system'],
				breadcrumbs: ['专业管理', '专业组管理'],
			},
			name: 'zyzInfo',
			component: () => import('@/views/common/basicsData/zyz/index')
		}],
	},
	{ // 班级管理
		path: '/baseData/schoolSystem/index',
		component: Default,
		meta: {
			title: '班级管理',
			breadcrumbs: ['基础数据管理', '班级管理'],
			roles: ['system']
		},
		redirect: '/baseData/schoolSystem/index',
		children: [{
				path: '/baseData/schoolSystem/index',
				meta: {
					title: '学制管理',
					roles: ['system'],
					breadcrumbs: ['班级管理', '学制管理'],
				},
				name: 'schoolSystem',
				component: () => import('@/views/common/basicsData/schoolSystem/index')
			},
			{
				path: '/baseData/semester/index',
				meta: {
					title: '学期管理',
					roles: ['system'],
					breadcrumbs: ['班级管理', '学期管理'],
				},
				name: 'semester',
				component: () => import('@/views/common/basicsData/semester/index')
			}, {
				path: '/baseData/schoolClass/index',
				meta: {
					title: '年级管理',
					roles: ['system'],
					breadcrumbs: ['班级管理', '年级管理'],
				},
				name: 'schoolClass',
				component: () => import('@/views/common/basicsData/schoolClass/index')
			}, {
				path: '/baseData/classManage/index',
				meta: {
					title: '班级管理',
					roles: ['system'],
					breadcrumbs: ['班级管理', '班级管理'],
				},
				name: 'classManage',
				component: () => import('@/views/common/basicsData/classManage/index')
			}, {
				path: '/baseData/holidays/index',
				meta: {
					title: '',
					isHide:true,
					roles: ['system'],
					breadcrumbs: ['班级管理', ''],
				},
				name: 'holidays',
				component: () => import('@/views/common/basicsData/holidays/index')
			},
			{
				path: '/baseData/holidays/index',
				meta: {
					title: '',
					isHide:true,
					roles: ['system'],
					breadcrumbs: ['班级管理', ''],
				},
				name: 'holidays',
				component: () => import('@/views/common/basicsData/holidays/index')
			},
			{
				path: '/baseData/academicCalendar/index',
				meta: {
					title: '',
					isHide:true,
					roles: ['system'],
					breadcrumbs: ['班级管理', ''],
				},
				name: 'academicCalendar',
				component: () => import('@/views/common/basicsData/academicCalendar/index')
			},
		],
	},
	{ // 首页默认菜单
		path: '/baseData/teacherinfo/index',
		component: Default,
		meta: {
			title: '教师管理',
			breadcrumbs: ['基础数据管理', '教师管理'],
			roles: ['system']
		},
		redirect: '/baseData/teacherinfo/index',
		children: [{
			path: '/baseData/teacherinfo/index',
			meta: {
				title: '教师管理',
				roles: ['system'],
				breadcrumbs: ['教师管理', '教师管理'],
			},
			name: 'teacherinfo',
			component: () => import('@/views/common/basicsData/teacherinfo/index')
		}],
	},

	{ // 首页默认菜单
		path: '/学生管理',
		component: Default,
		meta: {
			title: '学生管理',
			breadcrumbs: ['基础数据管理', '学生管理'],
			roles: ['system']
		},
		redirect: '/baseData/stuInfo/index',
		children: [{
			path: '/baseData/stuInfo/index',
			meta: {
				title: '学生管理',
				roles: ['system'],
				breadcrumbs: ['学生管理', '学生管理'],
			},
			name: 'stuInfo',
			component: () => import('@/views/common/basicsData/stuInfo/index')
		}],
	},


	{
		path: '/xjManage/veBaseStudent/veBaseStudentXj',
		redirect: '/xjManage/veBaseStudent/veBaseStudentXj',
		component: Default,
		meta: {
			title: '学籍注册',
			breadcrumbs: ['学籍管理', '学籍注册'],
			roles: ['system',  'bzr']
		},
		children: [{
				path: '/xjManage/veBaseStudent/veBaseStudentXj',
				meta: {
					title: '学籍注册',
					roles: ['system', 'bzr'],
					breadcrumbs: ['学籍注册', '学籍注册'],
				},
				component: () => import('@/views/stuManage/xjManage/view/veBaseStudent/veBaseStudentXj')
			},
			{
				path: '/xjManage/veStuSemester/veStuSemester',
				icon: 'icon-gengduo',
				meta: {
					title: '学期注册',
					roles: ['system'],
					breadcrumbs: ['学籍管理', '学期注册'],
				},
				component: () => import('@/views/stuManage/xjManage/view/veStuSemester/veStuSemester')
			}
		]
	},


	{
		path: '/xjManage/veBaseStudent/veBaseStudent',
		redirect: '/xjManage/veBaseStudent/veBaseStudent',
		component: Default,
		meta: {
			title: '学生信息',
			breadcrumbs: ['学籍管理', '学生信息维护'],
			roles: ['system',  'bzr']
		},
		children: [{
			path: '/xjManage/veBaseStudent/veBaseStudent',
			icon: 'icon-lingqu',
			meta: {
				title: '学生信息维护',
				roles: ['system', 'bzr'],
				breadcrumbs: ['学生信息维护', '学生信息维护'],
			},
			component: () => import('@/views/stuManage/xjManage/view/veBaseStudent/veBaseStudent')
		} ]
	},

	{
		path: '/xjManage/veStuXjAudit/veStuXjAudit',
		redirect: '/xjManage/veStuXjAudit/veStuXjAudit',
		component: Default,
		meta: {
			title: '学生异动',
			breadcrumbs: ['学籍管理', '学生异动'],
			roles: ['system', 'student']
		},
		children: [
			// {
			// 	path: '/xjManage/veStuXjAudit/veStuXjAudit',
			// 	icon: 'icon-add-funding',
			// 	meta: {
			// 		title: '审核学籍修改申请',
			// 		roles: ['system'],
			// 		breadcrumbs: ['学生异动', '审核学籍修改申请'],
			// 	},
			// 	component: () => import('@/views/stuManage/xjManage/view/veStuXjAudit/veStuXjAudit')
			// },
			{
				path: '/xjManage/xjManage/stuChange',
				icon: 'icon-xiangmu',
				meta: {
					title: '学籍异动',
					roles: ['system', 'student'],
					breadcrumbs: ['学生异动', '学籍异动'],
				},
				component: () => import('@/views/stuManage/xjManage/view/stuChange')
			}
		]
	},
	{
		path: '/jxzygl/kckgl',
		redirect: '/jxzygl/kckgl',
		meta: {
			title: '课程管理',
			breadcrumbs: ['培养方案', '课程管理'],
			roles: ['system']
		},
		component: Default,
		children: [{
			path: '/jxzygl/kckgl',
			meta: {
				title: '课程管理',
				roles: ['system'],
				breadcrumbs: ['培养方案', '课程管理']
			},
			component: () => import('@/views/jwManage/jxzy/kckgl')
		}, ]
	},

	{
		path: '/jxzygl/kckgl',
		redirect: '/jxzygl/kckgl',
		meta: {
			title: '教学场地管理',
			breadcrumbs: ['培养方案', '教学场地管理'],
			roles: ['system']
		},
		component: Default,
		children: [{
			path: '/jxzygl/jxcdgl',
			meta: {
				title: '教学场地管理',
				roles: ['system'],
				breadcrumbs: ['教学场地管理', '教学场地管理']
			},
			component: () => import('@/views/jwManage/jxzy/jxcdgl')
		}, ]
	},
	{
		path: '/jxzygl/jcgl',
		redirect: '/jxzygl/jcgl',
		meta: {
			title: '教材管理',
			breadcrumbs: ['培养方案', '教材管理'],
			roles: ['system']
		},
		component: Default,
		children: [{
			path: '/jxzygl/jcgl',
			meta: {
				title: '教材管理',
				roles: ['system'],
				breadcrumbs: ['培养方案', '教材管理']
			},
			component: () => import('@/views/jwManage/jxzy/jcgl')
		}, ]
	},
	{
		path: '/pyfangan/kcjh',
		redirect: '/pyfangan/kcjh',
		meta: {
			title: '课程计划',
			breadcrumbs: ['培养方案', '课程计划'],
			roles: ['system']
		},
		component: Default,
		children: [{
				path: '/pyfangan/kcjh',
				icon: 'icon-lingqu',
				meta: {
					title: '课程计划',
					roles: ['system'],
					breadcrumbs: ['课程计划', '课程计划'],
				},
				component: () => import('@/views/jwManage/pyfa/VeJwKcjhList')
			}
		]
	},
	
	{
		path: '/pyfangan/pyfa',
		redirect: '/pyfangan/pyfa',
		meta: {
			title: '方案管理',
			breadcrumbs: ['培养方案', '方案管理'],
			roles: ['system']
		},
		component: Default,
		children: [{
			path: '/pyfangan/pyfa',
			meta: {
				title: '方案管理',
				roles: ['system'],
				breadcrumbs: ['方案管理', '方案管理'],
			},
			component: () => import('@/views/jwManage/pyfa/VeJwPyfaList')
		}, ]
	},

	{
		path: '/pyfangan/jxrw/mission',
		redirect: '/pyfangan/jxrw/mission',
		meta: {
			title: '教学任务',
			breadcrumbs: ['培养方案', '教学任务'],
			roles: ['system','bzr','teacher']
		},
		component: Default,
		children: [{
			//基础信息管理
			path: '/pyfangan/jxrw/mission',
			meta: {
				title: '教学任务',
				roles: ['system','bzr','teacher'],
				breadcrumbs: ['教学任务'],
			},
			name: 'jxrw',
			component: () => import('@/views/jwManage/jxrw/VeJwJxrwList')
		}]
	},
	// {
	// 	path: '/pyfangan/jxrw/index',
	// 	redirect: '/pyfangan/jxrw/index',
	// 	meta: {
	// 		title: '教学任务',
	// 		breadcrumbs: ['培养方案', '教学任务'],
	// 		roles: ['system']
	// 	},
	// 	component: Default,
	// 	children: [{
	// 		//基础信息管理
	// 		path: '/pyfangan/jxrw/index',
	// 		meta: {
	// 			title: '教学任务',
	// 			roles: ['system'],
	// 			breadcrumbs: ['教学任务'],
	// 		},
	// 		name: 'jxrw',
	// 		component: () => import('@/views/jwManage/jxrw/veJwJxrw')
	// 	}]
	// },
	{
		path: '/courses/manual',
		redirect: '/courses/manual',
		meta: {
			title: '排课管理',
			breadcrumbs: ['课表管理', '排课管理'],
			roles: ['system', 'student']
		},
		component: Default,
		children: [{
				path: '/courses/manual',
				meta: {
					title: '手动排课',
					roles: ['system'],
					breadcrumbs: ['排课管理', '手动排课'],
				},
				component: () => import('@/views/jwManage/courses/manual/index')
			},
			{
				path: '/courses/voluntarily',
				icon: 'icon-lingqu',
				meta: {
					title: '自动排课',
					roles: ['system'],
					breadcrumbs: ['排课管理', '自动排课'],
				},
				component: () => import('@/views/jwManage/courses/voluntarily/index')
			},
			{
				path: '/courses/parameter',
				icon: 'icon-lingqu',
				meta: {
					title: '排课参数配置',
					roles: ['system'],
					breadcrumbs: ['排课管理', '排课参数配置'],
				},
				component: () => import('@/views/jwManage/courses/parameter/index')
			},
			{
				path: '/courses/set',
				icon: 'icon-lingqu',
				meta: {
					title: '排课节设置',
					roles: ['system'],
					breadcrumbs: ['排课管理', '排课节设置'],
				},
				component: () => import('@/views/jwManage/courses/set/index')
			},
			{
				path: '/courses/school',
				icon: 'icon-lingqu',
				meta: {
					title: '全校不排课时间',
					roles: ['system'],
					breadcrumbs: ['排课管理', '全校不排课时间'],
				},
				component: () => import('@/views/jwManage/courses/school/index')
			},
			{
				path: '/courses/classroom',
				icon: 'icon-lingqu',
				meta: {
					title: '教室不排课时间',
					roles: ['system'],
					breadcrumbs: ['排课管理', '教室不排课时间'],
				},
				component: () => import('@/views/jwManage/courses/classroom/index')
			}, {
				path: '/courses/teacher',
				icon: 'icon-lingqu',
				meta: {
					title: '教师不排课时间',
					roles: ['system'],
					breadcrumbs: ['排课管理', '教师不排课时间'],
				},
				component: () => import('@/views/jwManage/courses/teacher/index')
			}, {
				path: '/courses/myCourses/index',
				icon: 'icon-lingqu',
				meta: {
					title: '我的课表',
					roles: ['student'],
					breadcrumbs: ['排课管理', '我的课表'],
				},
				component: () => import('@/views/jwManage/courses/myCourses/calendar')
			}	
		]
	}, 
	
	{
		path: '/courseManagement/administrative',
		redirect: '/courseManagement/administrative',
		meta: {
			title: '调课管理',
			breadcrumbs: ['课表管理', '调课管理'],
			roles: ['system', 'teacher','bzr']
		},
		component: Default,
		children: [{
				path: '/courseManagement/administrative',
				meta: {
					title: '行政调课',
					roles: ['system'],
					breadcrumbs: ['调课管理', '行政调课'],
				},
				component: () => import('@/views/jwManage/courseManagement/administrative/index')
			},
			{
				path: '/courseManagement/applyFor',
				icon: 'icon-lingqu',
				meta: {
					title: '调课申请',
					roles: ['system', 'teacher','bzr'],
					breadcrumbs: ['调课管理', '调课申请'],
				},
				component: () => import('@/views/jwManage/courseManagement/applyFor/index')
			},
			{
				path: '/courseManagement/audit',
				icon: 'icon-lingqu',
				meta: {
					title: '调课审批',
					roles: ['system'],
					breadcrumbs: ['调课管理', '调课审批'],
				},
				component: () => import('@/views/jwManage/courseManagement/audit/index')
			},
			{
				path: '/courseManagement/record',
				icon: 'icon-lingqu',
				meta: {
					title: '我的调课记录',
					roles: ['teacher','bzr'],
					breadcrumbs: ['调课管理', '我的调课记录'],
				},
				component: () => import('@/views/jwManage/courseManagement/record/index')
			},
			{
				path: '/courseManagement/statistics',
				icon: 'icon-lingqu',
				meta: {
					title: '调课统计',
					roles: ['system'],
					breadcrumbs: ['调课管理', '调课统计'],
				},
				component: () => import('@/views/jwManage/courseManagement/statistics/index')
			}
	
		]
	},
	
	{
			path: '/curriculas/pattern',
			redirect: '/curriculas/pattern',
			meta: {
				title: '选课管理',
				breadcrumbs: ['课表管理', '选课管理'],
				roles: ['system','bzr', 'teacher']
			},
			component: Default,
			children: [{
					path: '/curriculas/pattern',
					meta: {
						title: '选课模式',
						roles: ['system'],
						breadcrumbs: ['选课管理', '选课模式'],
					},
					component: () => import('@/views/jwManage/curriculas/pattern/index')
				},
				{
					path: '/curriculas/xuanke/apply',
					meta: {
						title: '选修课申请',
						roles: ['bzr', 'teacher'],
						breadcrumbs: ['选课管理', '选修课申请'],
					},
					component: () => import('@/views/jwManage/curriculas/xuanxiu/apply')
				},
				{
					path: '/curriculas/time',
					icon: 'icon-lingqu',
					meta: {
						title: '学期选课时间',
						roles: ['system'],
						breadcrumbs: ['选课管理', '学期选课时间'],
					},
					component: () => import('@/views/jwManage/curriculas/time/index')
				},
				{
					path: '/curriculas/restrict',
					icon: 'icon-lingqu',
					meta: {
						title: '学生选课限制',
						roles: ['system'],
						breadcrumbs: ['选课管理', '学生选课限制'],
					},
					component: () => import('@/views/jwManage/curriculas/restrict/index')
				},
				{
					path: '/curriculas/students',
					icon: 'icon-lingqu',
					meta: {
						title: '学生选课',
						roles: ['system'],
						breadcrumbs: ['选课管理', '学生选课'],
					},
					component: () => import('@/views/jwManage/curriculas/students/index')
				}
		
			]
		},
	
	
	{
		path: '/kwgl/kssjdgl',
		redirect: '/kwgl/kssjdgl',
		meta: {
			title: '基础管理',
			breadcrumbs: ['考务管理', '基础管理'],
			roles: ['system']
		},
		component: Default,
		children: [{
				path: '/kwgl/kssjdgl',
				title: '基础管理',
				meta: {
					title: '基础管理',
					roles: ['system'],
					breadcrumbs: ['基础管理', '基础管理']
				},
				component: () => import('@/views/jwManage/kwgl/setting/VeJwKssjdList')
			},
		]
	},
	
	{
		path: '/kwgl/kaoshi',
		redirect: '/kwgl/kaoshi',
		meta: {
			title: '考试管理',
			breadcrumbs: ['考务管理', '考试管理'],
			roles: ['system','student']
		},
		component: Default,
		children: [
			{
				path: '/kwgl/kaoshi',
				meta: {
					title: '考试管理',
					roles: ['system'],
					breadcrumbs: ['考试管理', '考试管理']
				},
				component: () => import('@/views/jwManage/kwgl/kaoshi/kaoshiChange')
			},
			{
				path: '/kwgl/student/ks',
				meta: {
					title: '我的考试',
					roles: ['student'],
					breadcrumbs: ['考务管理', '我的考试']
				},
				component: () => import('@/views/jwManage/kwgl/student/VeJwKaoshiList')
			},
		]
	},
	
	{
		path: '/kwgl/bukao',
		redirect: '/kwgl/bukao',
		meta: {
			title: '补考管理',
			breadcrumbs: ['考务管理', '补考管理'],
			roles: ['system']
		},
		component: Default,
		children: [
			{
				path: '/kwgl/bukao',
				meta: {
					title: '补考管理',
					roles: ['system'],
					breadcrumbs: ['补考管理', '补考管理']
				},
				component: () => import('@/views/jwManage/kwgl/bukao/bukaoChange')
			},
		]
	},
	{
		path: '/kwgl/kssjdgl',
		redirect: '/kwgl/kssjdgl',
		meta: {
			title: '成绩管理',
			breadcrumbs: ['考务管理', '成绩管理'],
			roles: ['system', 'student', 'teacher','bzr']
		},
		component: Default,
		children: [
			{
				path: '/kwgl/chengji',
				meta: {
					title: '成绩管理',
					roles: ['system', 'teacher','bzr'],
					breadcrumbs: ['成绩管理', '成绩管理']
				},
				component: () => import('@/views/jwManage/kwgl/manage/chengjiChange')
			},
			{
				path: '/kwgl/student/cj',
				meta: {
					title: '我的成绩',
					roles: ['student'],
					breadcrumbs: ['成绩管理', '我的成绩']
				},
				component: () => import('@/views/jwManage/kwgl/student/VeJwChengjiList')
			},
		]
	},
	
	// {
	// 	path: '/kwgl/qingkao',
	// 	redirect: '/kwgl/qingkao',
	// 	meta: {
	// 		title: '清考管理',
	// 		breadcrumbs: ['考务管理', '清考管理'],
	// 		roles: ['system']
	// 	},
	// 	component: Default,
	// 	children: [
	// 		{
	// 			path: '/kwgl/qingkao',
	// 			meta: {
	// 				title: '清考管理',
	// 				roles: ['system'],
	// 				breadcrumbs: ['清考管理', '清考管理']
	// 			},
	// 			component: () => import('@/views/jwManage/kwgl/qingkao/qingkaoChange')
	// 		},
	// 	]
	// },
	
	
	{
		path: '/jxgzgl/VeJwTeachactList',
		redirect: '/jxgzgl/VeJwTeachactList',
		component: Default,
		meta: {
			title: '教学活动',
			breadcrumbs: ['教学工作管理', '教学活动'],
			roles: ['system']
		},
		children: [{
				path: '/jxgzgl/VeJwTeachactList',
				meta: {
					title: '教学活动',
					roles: ['system'],
					breadcrumbs: ['教学活动', '教学活动']
				},
				component: () => import('@/views/jwManage/jxgz/VeJwTeachactList')
			},
		]
	},
	
	
	{
		path: '/jxgzgl/gzzj',
		redirect: '/jxgzgl/gzzj',
		component: Default,
		meta: {
			title: '工作总结',
			breadcrumbs: ['教学工作管理', '工作总结'],
			roles: ['system', 'bzr','teacher']
		},
		children: [
			{
				path: '/jxgzgl/gzzj',
				meta: {
					title: '工作总结',
					roles: ['system', 'bzr','teacher'],
					breadcrumbs: ['工作总结', '工作总结']
				},
				component: () => import('@/views/jwManage/jxgz/gzzj')
			},
		]
	},
	
	{
		path: '/jxgzgl/jxrz',
		redirect: '/jxgzgl/jxrz',
		component: Default,
		meta: {
			title: '教学日志',
			breadcrumbs: ['教学工作管理', '教学日志'],
			roles: ['system', 'teacher','bzr']
		},
		children: [
			{
				path: '/jxgzgl/jxrz',
				meta: {
					title: '教学日志',
					roles: ['system', 'teacher','bzr'],
					breadcrumbs: ['教学工作管理', '教学日志']
				},
				component: () => import('@/views/jwManage/jxgz/jxrz')
			},
		]
	},
	
	
	{
		path: '/jxgzgl/bjgg',
		redirect: '/jxgzgl/bjgg',
		component: Default,
		meta: {
			title: '班级公告',
			breadcrumbs: ['教学工作管理', '班级公告'],
			roles: ['system', 'bzr','student']
		},
		children: [
			{
				path: '/jxgzgl/bjgg',
				meta: {
					title: '班级公告',
					roles: ['system', 'bzr','student'],
					breadcrumbs: ['班级公告', '班级公告']
				},
				component: () => import('@/views/jwManage/jxgz/bjgg')
			},
		]
	},
	
	{
		path: '/jxgzgl/skjh',
		redirect: '/jxgzgl/skjh',
		component: Default,
		meta: {
			title: '授课计划',
			breadcrumbs: ['教学工作管理', '授课计划'],
			roles: ['system','bzr', 'teacher']
		},
		children: [
			{
				path: '/jxgzgl/skjh',
				meta: {
					title: '授课计划',
					roles: ['system','bzr','teacher'],
					breadcrumbs: ['教学工作管理', '授课计划']
				},
				component: () => import('@/views/jwManage/jxgz/skjh')
			},
		]
	},
	
	
	{
		path: '/zyjn/zyrzgl',
		redirect: '/zyjn/zyrzgl',
		component: Default,
		meta: {
			title: '职业认证管理',
			breadcrumbs: ['职业技能', '职业认证管理'],
			roles: ['system']
		},
		children: [
			{
				path: '/zyjn/zyrzgl',
				meta: {
					title: '职业认证管理',
					roles: ['system'],
					breadcrumbs: ['职业认证管理', '职业认证管理']
				},
				component: () => import('@/views/jwManage/skill/zyrzgl')
			},
		]
	}, 
	
	{
		path: '/zyjn/jsgl',
		redirect: '/zyjn/jsgl',
		component: Default,
		meta: {
			title: '竞赛管理',
			breadcrumbs: ['职业技能', '竞赛管理'],
			roles: ['system']
		},
		children: [{
				path: '/zyjn/jsgl',
				meta: {
					title: '竞赛管理',
					roles: ['system'],
					breadcrumbs: ['职业认证管理', '竞赛管理']
				},
				component: () => import('@/views/jwManage/skill/jsgl')
			},
		]
	}, 
	
	
	{
		// 首页默认菜单
		path: '/kqManage',
		component: Default,
		meta: {
			title: '考勤管理',
			breadcrumbs: ['学工管理', '考勤管理'],
			roles: ['system', 'student','bzr']
		},
		redirect: '/kqManage/veStuCheckType/veStuCheckType',
		children: [{
				//考勤管理
				path: '/kqManage/veStuCheckType/veStuCheckType',
				meta: {
					title: '考勤类型',
					roles: ['system'],
					breadcrumbs: ['考勤管理', '考勤类型'],
				},
				name: 'veStuCheckType',
				component: () => import('@/views/stuManage/kqManage/view/veStuCheckType/veStuCheckType')
			},
			{
				
				path: '/kqManage/veStuCheck/veStuCheck',
				meta: {
					title: '考勤管理',
					roles: ['system'],
					breadcrumbs: ['考勤管理', '考勤管理'],
				},
				name: 'veStuCheck',
				component: () => import('@/views/stuManage/kqManage/view/veStuCheck/veStuCheck')
			},
			{
				
				path: '/kqManage/veStuCheck/veStuCheckEdit',
				meta: {
					title: '',
					roles: ['system'],
					isHide:true,
					breadcrumbs: ['考勤管理', '考勤管理'],
				},
				name: 'veStuCheck',
				component: () => import('@/views/stuManage/kqManage/view/veStuCheck/veStuCheckEdit')
			},
			{
				//请假审批
				path: '/kqManage/veStuLeave/veStuLeave',
				meta: {
					title: '请假审批',
					roles: ['system','bzr','teacher'],
					breadcrumbs: ['考勤管理', '请假审批'],
				},
				name: 'veStuLeave',
				component: () => import('@/views/stuManage/kqManage/view/veStuLeave/veStuLeave')
			},
			{
				//部门管理
				path: '/kqManage/veStuCheck/veStuCheckBj',
				meta: {
					title: '班级考勤',
					roles: ['bzr'],
					breadcrumbs: ['考勤管理', '班级考勤'],
				},
				name: 'veStuCheckBj',
				component: () => import('@/views/stuManage/kqManage/view/veStuCheck/veStuCheckBj')
			},
			// {
			// 	//基础信息管理
			// 	path: '/kqManage/veStuCheck/veStuCheckKt',
			// 	meta: {
			// 		title: '课堂考勤',
			// 		roles: ['system','bzr'],
			// 		breadcrumbs: ['考勤管理', '课堂考勤'],
			// 	},
			// 	name: 'veStuCheckKt',
			// 	component: () => import('@/views/stuManage/kqManage/view/veStuCheck/veStuCheckKt')
			// },
			{
				//请假申请
				path: '/kqManage/veStuLeave/myLeave',
				meta: {
					title: '我的考勤',
					roles: ['student'],
					breadcrumbs: ['考勤管理', '我的考勤'],
				},
				name: 'myLeave',
				component: () => import('@/views/stuManage/kqManage/view/veStuCheck/veStuCheck')
			},
			{
				//请假申请
				path: '/kqManage/veStuLeave/myLeaveApply',
				meta: {
					title: '请假申请',
					roles: ['student'],
					breadcrumbs: ['考勤管理', '请假申请'],
				},
				name: 'myLeave',
				component: () => import('@/views/stuManage/kqManage/view/myLeave/myLeave')
			}

		]
	}, {
		// 首页默认菜单
		path: '/bonusPenalty',
		component: Default,
		meta: {
			title: '奖惩管理',
			breadcrumbs: ['学工管理', '奖惩管理'],
			roles: ['system', 'student','bzr']
		},
		redirect: '/bonusPenalty/veStuRewardType/veStuRewardType',
		children: [{
				//考勤管理
				path: '/bonusPenalty/veStuRewardType/veStuRewardType',
				meta: {
					title: '奖惩管理',
					roles: ['system'],
					breadcrumbs: ['奖惩管理', '奖励类型'],
				},
				name: 'veStuRewardType',
				component: () => import('@/views/stuManage/kqManage/view/veStuRewardType/veStuRewardType')
			},
			{
				
				path: '/bonusPenalty/veStuPunishType/veStuPunishType',
				meta: {
					title: '惩罚类型',
					roles: ['system'],
					breadcrumbs: ['奖惩管理', '惩罚类型'],
				},
				name: 'veStuPunishType',
				component: () => import('@/views/stuManage/kqManage/view/veStuPunishType/veStuPunishType')
			},
			{
				//请假审批
				path: '/bonusPenalty/veStuReward/veStuReward',
				meta: {
					title: '奖励管理',
					roles: ['system', 'student', 'teacher','bzr'],
					breadcrumbs: ['奖惩管理', '奖励管理'],
				},
				name: 'veStuReward',
				component: () => import('@/views/stuManage/kqManage/view/veStuReward/veStuReward')
			},
			{
				//部门管理
				path: '/bonusPenalty/veStuPunish/veStuPunish',
				meta: {
					title: '惩罚管理',
					roles: ['system', 'student', 'teacher','bzr'],
					breadcrumbs: ['考勤管理', '惩罚管理'],
				},
				name: 'veStuPunish',
				component: () => import('@/views/stuManage/kqManage/view/veStuPunish/veStuPunish')
			}

		]
	}, {
		// 首页默认菜单
		path: '/sjxj',
		component: Default,
		meta: {
			title: '奖助学金管理',
			breadcrumbs: ['学工管理', '奖助学金管理'],
			roles: ['system', 'student','bzr']
		},
		redirect: '/sjxj/veStuScholarshipType/veStuScholarshipType',
		children: [{
				path: '/sjxj/veStuScholarshipType/veStuScholarshipType',
				meta: {
					title: '奖学金类型',
					roles: ['system'],
					breadcrumbs: ['奖助学金管理', '奖学金类型'],
				},
				name: 'veStuScholarshipType',
				component: () => import(
					'@/views/stuManage/kqManage/view/veStuScholarshipType/veStuScholarshipType')
			},
			{
				
				path: '/sjxj/veStuStipendType/veStuStipendType',
				meta: {
					title: '助学金类型',
					roles: ['system'],
					breadcrumbs: ['奖助学金管理', '助学金类型'],
				},
				name: 'veStuStipendType',
				component: () => import('@/views/stuManage/kqManage/view/veStuStipendType/veStuStipendType')
			},
			{
				path: '/sjxj/veStuScholarship/veStuScholarship',
				meta: {
					title: '奖学金管理',
					roles: ['system', 'student','bzr','teacher'],
					breadcrumbs: ['奖助学金管理', '奖学金管理'],
				},
				name: 'veStuScholarship',
				component: () => import('@/views/stuManage/kqManage/view/veStuScholarship/veStuScholarship')
			},
			{
				path: '/sjxj/veStuStipend/veStuStipendMy',
				meta: {
					title: '助学金管理',
					roles: ['system', 'teacher', 'student','bzr'],
					breadcrumbs: ['奖助学金管理', '助学金管理'],
				},
				name: 'veStuStipendMy',
				component: () => import('@/views/stuManage/kqManage/view/veStuStipend/veStuStipendMy')
			}
			// ,
			// {
			// 	path: '/sjxj/veStuStipend/veStuStipendShen',
			// 	meta: {
			// 		title: '助学金审核',
			// 		roles: ['system'],
			// 		breadcrumbs: ['奖助学金管理', '助学金审核'],
			// 	},
			// 	name: 'veStuStipendShen',
			// 	component: () => import('@/views/stuManage/kqManage/view/veStuStipend/veStuStipendShen')
			// }

		]
	}, {
		// 困难生
		path: '/knsgl',
		component: Default,
		meta: {
			title: '困难生管理',
			breadcrumbs: ['学工管理', '困难生管理'],
			roles: ['system']
		},
		redirect: '/knsgl/veBaseStudent/stuKns',
		children: [{
				path: '/knsgl/veBaseStudent/stuKns',
				meta: {
					title: '困难生管理',
					roles: ['system'],
					breadcrumbs: ['困难生管理', '困难生管理'],
				},
				name: 'stuKns',
				component: () => import('@/views/stuManage/xjManage/view/veBaseStudent/stuKns')
			},
			{
				path: '/knsgl/veBaseStudent/stuKnsCount',
				meta: {
					title: '困难生统计',
					roles: ['system'],
					breadcrumbs: ['困难生管理', '困难生统计'],
				},
				name: 'stuKnsCount',
				component: () => import('@/views/stuManage/xjManage/view/veBaseStudent/stuKnsCount')
			}
		]
	}, 
	{
		// 勤工俭学
		path: '/qgjxgl',
		component: Default,
		meta: {
			title: '勤工俭学管理',
			breadcrumbs: ['学工管理', '勤工俭学'],
			roles: ['system', 'student', 'bzr']
		},
		redirect: '/qgjxgl/hqStuPosition/hqStuPosition',
		children: [{
				path: '/qgjxgl/hqStuPosition/hqStuPosition',
				meta: {
					title: '职位管理',
					roles: ['system', 'student'],
					breadcrumbs: ['勤工俭学', '职位管理'],
				},
				name: 'hqStuPosition',
				component: () => import('@/views/stuManage/kqManage/view/hqStuPosition/hqStuPosition')
			},
			{
				path: '/qgjxgl/hqStuPositionApply/positionApply',
				meta: {
					title: '勤工俭学',
					roles: ['system', 'student', 'bzr'],
					breadcrumbs: ['勤工俭学', '勤工俭学'],
				},
				name: 'stuKnsCount',
				component: () => import('@/views/stuManage/kqManage/view/hqStuPositionApply/positionApply')
			},
			{
				path: '/qgjxgl/hqStuPositionApply/positionShen',
				meta: {
					title: '职位申请审批',
					roles: ['system'],
					sidebarMap: ['qgjxgl', 'positionShen'],
					breadcrumbs: ['勤工俭学管理', '职位申请审批'],
				},
				name: 'positionShen',
				component: () => import('@/views/stuManage/kqManage/view/hqStuPositionApply/positionShen')
			}

		]
	}, {
		path: '/xljk',
		meta: {
			title: '心理健康管理',
			breadcrumbs: ['学工管理', '心理健康管理'],
			roles: ['system']
		},
		component: Default,
		redirect: '/xljk/hqStuHealthKnowledgeType/hqStuHealthKnowledgeType',
		children: [{
				//考勤管理
				path: '/xljk/hqStuHealthKnowledgeType/hqStuHealthKnowledgeType',
				meta: {
					title: '健康知识类型',
					roles: ['system'],
					breadcrumbs: ['心理健康管理', '健康知识类型'],
				},
				name: 'hqStuHealthKnowledgeType',
				component: () => import(
					'@/views/stuManage/xljk/view/hqStuHealthKnowledgeType/hqStuHealthKnowledgeType')
			},
			{
				
				path: '/xljk/hqStuHealthKnowledge/hqStuHealthKnowledge',
				meta: {
					title: '心理健康知识',
					roles: ['system'],
					breadcrumbs: ['心理健康管理', '心理健康知识'],
				},
				name: 'hqStuHealthKnowledge',
				component: () => import('@/views/stuManage/xljk/view/hqStuHealthKnowledge/hqStuHealthKnowledge')
			},
			{
				//请假审批
				path: '/xljk/hqStuHealthQuestion/hqStuHealthQuestion',
				meta: {
					title: '心理健康测试',
					roles: ['system'],
					breadcrumbs: ['心理健康管理', '心理健康测试'],
				},
				name: 'hqStuHealthQuestion',
				component: () => import('@/views/stuManage/xljk/view/hqStuHealthQuestion/hqStuHealthQuestion')
			},
			{
				//心理健康活动
				path: '/xljk/hqStuHealthActivities/hqStuHealthActivities',
				meta: {
					title: '心理健康活动',
					roles: ['system'],
					breadcrumbs: ['心理健康管理', '心理健康活动'],
				},
				name: 'hqStuHealthActivities',
				component: () => import(
					'@/views/stuManage/xljk/view/hqStuHealthActivities/hqStuHealthActivities')
			}, {
				//部门管理
				path: '/xljk/hqStuHealthUser/hqStuHealthUser',
				meta: {
					title: '心理健康记录',
					roles: ['system'],
					breadcrumbs: ['心理健康管理', '心理健康记录'],
				},
				name: 'hqStuHealthUser',
				component: () => import('@/views/stuManage/xljk/view/hqStuHealthUser/hqStuHealthUser')
			},
			{
				//心理健康活动
				path: '/xljk/veStuHealthAsk/veStuHealthAskMy',
				meta: {
					title: '我的心理咨询',
					roles: ['system'],
					breadcrumbs: ['心理健康管理', '我的心理咨询'],
				},
				name: 'veStuHealthAskMy',
				component: () => import('@/views/stuManage/xljk/view/veStuHealthAsk/veStuHealthAskMy')
			}, {
				//部门管理
				path: '/xljk/veStuHealthAsk/veStuHealthAskAdmin',
				meta: {
					title: '心理咨询管理',
					roles: ['system'],
					breadcrumbs: ['心理健康管理', '心理咨询管理'],
				},
				name: 'veStuHealthAskAdmin',
				component: () => import('@/views/stuManage/xljk/view/veStuHealthAsk/veStuHealthAskAdmin')
			}

		]
	}, {
		path: '/zhsz',
		meta: {
			title: '综合素质管理',
			breadcrumbs: ['学工管理', '综合素质管理'],
			roles: ['system', 'bzr', 'student']
		},
		component: Default,
		redirect: '/zhsz/menu/moral',
		children: [{
				//考勤管理
				path: '/zhsz/menu/moral',
				meta: {
					title: '德育工作管理',
					roles: ['system', 'bzr'],
					breadcrumbs: ['综合素质管理', '德育工作管理'],
				},
				name: 'moral',
				component: () => import('@/views/stuManage/zhsz/menu/moral')
			},
			{
				
				path: '/zhsz/veStuMoralCount/veStuMoralCount',
				meta: {
					title: '班级德育评比管理',
					roles: ['system'],
					breadcrumbs: ['综合素质管理', '班级德育评比管理'],
				},
				name: 'veStuMoralCount',
				component: () => import('@/views/stuManage/zhsz/view/veStuMoralCount/veStuMoralCount')
			},
			{
				//请假审批
				path: '/zhsz/menu/check',
				meta: {
					title: '行为规范管理',
					roles: ['system', 'bzr'],
					breadcrumbs: ['综合素质管理', '行为规范管理'],
				},
				name: 'check',
				component: () => import('@/views/stuManage/zhsz/menu/check')
			},
			{
				//心理健康活动
				path: '/zhsz/menu/weishen',
				meta: {
					title: '卫生检查管理',
					roles: ['system', 'bzr'],
					breadcrumbs: ['综合素质管理', '卫生检查管理'],
				},
				name: 'weishen',
				component: () => import('@/views/stuManage/zhsz/menu/weishen')
			}, {
				//部门管理
				path: '/zhsz/menu/wenhua',
				meta: {
					title: '文体活动管理',
					roles: ['system', 'bzr'],
					breadcrumbs: ['综合素质管理', '文体活动管理'],
				},
				name: 'wenhua',
				component: () => import('@/views/stuManage/zhsz/menu/wenhua')
			},
			{
				//心理健康活动
				path: '/zhsz/veStuCaucus/veStuCaucus',
				meta: {
					title: '党团活动',
					roles: ['system', 'bzr'],
					breadcrumbs: ['综合素质管理', '党团活动'],
				},
				name: 'veStuCaucus',
				component: () => import('@/views/stuManage/zhsz/view/veStuCaucus/veStuCaucus')
			}, {
				//部门管理
				path: '/zhsz/veStuHealthReport/veStuHealthReport',
				meta: {
					title: '体质健康',
					roles: ['system', 'bzr'],
					breadcrumbs: ['综合素质管理', '体质健康'],
				},
				name: 'veStuHealthReport',
				component: () => import('@/views/stuManage/xljk/view/veStuHealthReport/veStuHealthReport')
			}, {
				path: '/tcgl/view/VeStuHealthScoreCount',
				meta: {
					title: '体测管理',
					roles: ['system'],
					breadcrumbs: ['综合素质管理', '体测管理'],
				},
				name: 'VeStuHealthScoreCount',
				component: () => import('@/views/stuManage/tcgl/view/VeStuHealthScoreCount')
			}, {
				path: '/zhsz/menu/veStuMoralActiveMy',
				meta: {
					title: '我的德育活动',
					roles: ['student'],
					breadcrumbs: ['综合素质管理', '我的德育活动'],
				},
				name: 'veStuMoralActiveMy',
				component: () => import('@/views/stuManage/zhsz/view/veStuMoralActive/veStuMoralActiveMy')
			}, {
				//部门管理
				path: '/zhsz/menu/wenhuamy',
				meta: {
					title: '我的文体活动',
					roles: ['student'],
					breadcrumbs: ['综合素质管理', '我的文体活动'],
				},
				name: 'wenhuamy',
				component: () => import(
					'@/views/stuManage/zhsz/view/veStuLiteraryProgram/veStuLiteraryProgramMy')
			}, {
				//部门管理
				path: '/zhsz/menu/wenhuahj',
				meta: {
					title: '我的文体获奖',
					roles: ['student'],
					breadcrumbs: ['综合素质管理', '我的文体获奖'],
				},
				name: 'wenhuahj',
				component: () => import('@/views/stuManage/zhsz/view/veStuLiteraryAward/veStuLiteraryAwardMy')
			}, {
				//部门管理
				path: '/zhsz/menu/wenhuazy',
				meta: {
					title: '我的德育资源',
					roles: ['student'],
					breadcrumbs: ['综合素质管理', '我的德育资源'],
				},
				name: 'wenhuazy',
				component: () => import('@/views/stuManage/zhsz/view/veStuMoralResource/veStuMoralResourceMy')
			},

		]
	}, {
		path: '/jis',
		component: Default,
		meta: {
			title: '个人评定',
			breadcrumbs: ['学工管理', '个人评定'],
			roles: ['system', 'student', 'bzr']
		},
		redirect: '/jis/veStuEvaluationConfig/veStuEvaluationConfig',
		children: [{
				//考勤管理
				path: '/jis/veStuEvaluationConfig/veStuEvaluationConfig',
				meta: {
					title: '功能配置',
					roles: ['system'],
					breadcrumbs: ['学生评定', '功能配置'],
				},
				name: 'veStuEvaluationConfig',
				component: () => import(
					'@/views/stuManage/jis/view/veStuEvaluationConfig/veStuEvaluationConfig')
			},
			{
				
				path: '/jis/veStuIntroduction/veStuIntroduction',
				meta: {
					title: '自我鉴定',
					roles: ['student'],
					sidebarMap: ['jis', 'veStuIntroduction'],
					breadcrumbs: ['学生评定', '自我鉴定'],
				},
				name: 'veStuIntroduction',
				component: () => import('@/views/stuManage/jis/view/veStuIntroduction/veStuIntroduction')
			},
			{
				//请假审批
				path: '/jis/veStuEvaluation/veStuEvaluationAdmin',
				meta: {
					title: '老师评定',
					roles: ['system', 'bzr'],
					breadcrumbs: ['学生评定', '老师评定'],
				},
				name: 'veStuEvaluationAdmin',
				component: () => import('@/views/stuManage/jis/view/veStuEvaluation/veStuEvaluationAdmin')
			},
			{
				//心理健康活动
				path: '/jis/veStuEvaluation/veStuEvaluationShow',
				meta: {
					title: '评定查询',
					roles: ['system', 'bzr'],
					breadcrumbs: ['学生评定', '评定查询'],
				},
				name: 'veStuEvaluationShow',
				component: () => import('@/views/stuManage/jis/view/veStuEvaluation/veStuEvaluationShow')
			},
			{
				//心理健康活动
				path: '/jis/veStuEvaluation/myVeStuEvaluation',
				meta: {
					title: '我的评定',
					roles: ['student'],
					breadcrumbs: ['学生评定', '我的评定'],
				},
				name: 'veStuEvaluationShow',
				component: () => import('@/views/stuManage/jis/view/veStuEvaluation/base/veStuEvaluationInfo')
			}
		]
	}, {
		path: '/biye',
		component: Default,
		meta: {
			title: '毕业管理',
			breadcrumbs: ['学工管理', '毕业管理'],
			roles: ['system', 'bzr',]
		},
		redirect: '/biye/veStuGraduation/veStuGraduationClas',
		children: [{
				//考勤管理
				path: '/biye/veStuGraduation/veStuGraduationClas',
				meta: {
					title: '毕业班级设置',
					roles: ['system'],
					breadcrumbs: ['毕业管理', '毕业班级设置'],
				},
				name: 'veStuGraduationClas',
				component: () => import('@/views/stuManage/biye/view/veStuGraduation/veStuGraduationClas')
			},
			{
				
				path: '/biye/veStuGraduationByzbhRule/veStuGraduationByzbhRule',
				meta: {
					title: '毕业证号规则设置',
					roles: ['system'],
					breadcrumbs: ['毕业管理', '毕业证号规则设置'],
				},
				name: 'veStuGraduationByzbhRule',
				component: () => import(
					'@/views/stuManage/biye/view/veStuGraduationByzbhRule/veStuGraduationByzbhRule')
			},
			{
				//请假审批
				path: '/biye/veStuGraduationAuditInfo/biyeAuditBzr',
				meta: {
					title: '班主任审核',
					roles: ['system', 'bzr'],
					breadcrumbs: ['毕业管理', '班主任审核'],
				},
				name: 'biyeAuditBzr',
				component: () => import('@/views/stuManage/biye/view/veStuGraduationAuditInfo/biyeAuditBzr')
			},
			// {
			// 	//心理健康活动
			// 	path: '/biye/veStuGraduationAuditInfo/biyeAuditCw',
			// 	meta: {
			// 		title: '财务审核',
			// 		roles: ['system'],
			// 		breadcrumbs: ['毕业管理', '财务审核'],
			// 	},
			// 	name: 'biyeAuditCw',
			// 	component: () => import('@/views/stuManage/biye/view/veStuGraduationAuditInfo/biyeAuditCw')
			// },
			{
				path: '/biye/veStuGraduationAuditInfo/biyeAuditCjy',
				meta: {
					title: '成绩审核',
					roles: ['system'],
					breadcrumbs: ['毕业管理', '成绩审核'],
				},
				name: 'biyeAuditCjy',
				component: () => import('@/views/stuManage/biye/view/veStuGraduationAuditInfo/biyeAuditCjy')
			},
			// {
			// 	
			// 	path: '/biye/veStuGraduationAuditInfo/biyeAuditXsc',
			// 	meta: {
			// 		title: '学生处审核',
			// 		roles: ['system'],
			// 		breadcrumbs: ['毕业管理', '学生处审核'],
			// 	},
			// 	name: 'biyeAuditXsc',
			// 	component: () => import('@/views/stuManage/biye/view/veStuGraduationAuditInfo/biyeAuditXsc')
			// },
			{
				//请假审批
				path: '/biye/view/veStuGraduationAuditConfig/veStuGraduationAuditConfig',
				meta: {
					title: '毕业审核设置',
					roles: ['system'],
					breadcrumbs: ['毕业管理', '毕业审核设置'],
				},
				name: 'veStuGraduationAuditConfig',
				component: () => import(
					'@/views/stuManage/biye/view/veStuGraduationAuditConfig/veStuGraduationAuditConfig')
			},
			{
				//心理健康活动
				path: '/biye/view/veStuGraduation/graduationYj',
				meta: {
					title: '应届毕业生录入',
					roles: ['system'],
					breadcrumbs: ['毕业管理', '应届毕业生录入'],
				},
				name: 'graduationYj',
				component: () => import('@/views/stuManage/biye/view/veStuGraduation/graduationYj')
			},
			{
				
				path: '/biye/view/veStuGraduation/graduationWj',
				meta: {
					title: '往届毕业生管理',
					roles: ['system'],
					breadcrumbs: ['毕业管理', '往届毕业生管理'],
				},
				name: 'graduationWj',
				component: () => import('@/views/stuManage/biye/view/veStuGraduation/graduationWj')
			},
			{
				
				path: '/biye/view/veStuGraduation/myGaduation',
				meta: {
					title: '毕业查询',
					roles: ['teacher'],
					breadcrumbs: ['毕业管理', '毕业查询'],
				},
				name: 'graduationWj',
				component: () => import('@/views/stuManage/biye/view/veStuGraduation/graduationWj')
			},

			{
				path: '/biye/view/veStuGraduation/graduationAdmin',
				meta: {
					title: '毕业生信息管理',
					roles: ['system'],
					breadcrumbs: ['毕业管理', '毕业生信息管理'],
				},
				name: 'graduationAdmin',
				component: () => import('@/views/stuManage/biye/view/veStuGraduation/graduationAdmin')
			},
			{
				//心理健康活动
				path: '/biye/view/veStuGraduationYxbys/veStuGraduationYxbys',
				meta: {
					title: '优秀毕业生管理',
					roles: ['system'],
					breadcrumbs: ['毕业管理', '优秀毕业生管理'],
				},
				name: 'veStuGraduationYxbys',
				component: () => import('@/views/stuManage/biye/view/veStuGraduationYxbys/veStuGraduationYxbys')
			}
		]
	},
	{
		path: '/bzr',
		component: Default,
		meta: {
			title: '班主任管理',
			breadcrumbs: ['学工管理', '班主任管理'],
			roles: ['system']
		},
		redirect: '/bzr/veBaseBanjiBzr/bzrNow',
		children: [{
				//考勤管理
				path: '/bzr/veBaseBanjiBzr/bzrNow',
				meta: {
					title: '当前班主任查询',
					roles: ['system'],
					breadcrumbs: ['班主任管理', '当前班主任查询'],
				},
				name: 'bzrNow',
				component: () => import('@/views/stuManage/jis/view/veBaseBanjiBzr/bzrNow')
			},
			{
				
				path: '/bzr/veBaseBanjiBzr/bzrHis',
				meta: {
					title: '班主任历史记录',
					roles: ['system'],
					breadcrumbs: ['班主任管理', '班主任历史记录'],
				},
				name: 'bzrHis',
				component: () => import('@/views/stuManage/jis/view/veBaseBanjiBzr/bzrHis')
			}
		],
	},
	{
		path: '/zhszpc',
		component: Default,
		meta: {
			title: '综合素质评测',
			breadcrumbs: ['学工管理', '综合素质评测'],
			roles: ['system']
		},
		redirect: '/zhszpc/veStuIdx/veStuIdx',
		children: [{
				//考勤管理
				path: '/zhszpc/veStuIdx/veStuIdx',
				meta: {
					title: '指标体系设置',
					roles: ['system'],
					breadcrumbs: ['综合素质评测', '指标体系设置'],
				},
				name: 'veStuIdx',
				component: () => import('@/views/stuManage/jis/view/veStuIdx/veStuIdx')
			},
			{
				
				path: '/zhszpc/veStuIdxScoreConfig/veStuIdxScoreConfig',
				meta: {
					title: '指标分值设置',
					roles: ['system'],
					breadcrumbs: ['综合素质评测', '指标分值设置'],
				},
				name: 'veStuIdxScoreConfig',
				component: () => import('@/views/stuManage/jis/view/veStuIdxScoreConfig/veStuIdxScoreConfig')
			},
			{
				
				path: '/zhszpc/veStuIdxPeriod/veStuPeriod',
				meta: {
					title: '指标周期设置',
					roles: ['system'],
					breadcrumbs: ['综合素质评测', '指标周期设置'],
				},
				name: 'rewardCount',
				component: () => import('@/views/stuManage/jis/view/veStuIdxPeriod/veStuPeriod')
			},
			{
				
				path: '/zhszpc/veStuIdxStuScore/veStuIdxStuScore',
				meta: {
					title: '评测结果查看',
					roles: ['system'],
					breadcrumbs: ['综合素质评测', '评测结果查看'],
				},
				name: 'veStuIdxStuScore',
				component: () => import('@/views/stuManage/jis/view/veStuIdxStuScore/veStuIdxStuScore')
			}
		],
	}, {
		path: '/jis',
		component: Default,
		meta: {
			title: '预约管理',
			breadcrumbs: ['学工管理', '预约管理'],
			roles: ['system', 'student']
		},
		redirect: '/jis/veStuYyproject/veStuYyproject',
		children: [{
				//考勤管理
				path: '/jis/veStuYyproject/veStuYyproject',
				meta: {
					title: '预约项目',
					roles: ['system', 'student'],
					breadcrumbs: ['预约管理', '预约项目'],
				},
				name: 'veStuYyproject',
				component: () => import('@/views/stuManage/jis/view/veStuYyproject/veStuYyproject')
			},
			{
				
				path: '/jis/veStuYystu/veStuYystu',
				meta: {
					title: '我的预约',
					roles: ['system', 'student'],
					breadcrumbs: ['预约管理', '我的预约'],
				},
				name: 'veStuYystu',
				component: () => import('@/views/stuManage/jis/view/veStuYystu/veStuYystu')
			}
		],
	},
	
	
	
	
	{
		path: '/xjManage/studentCount',
		component: Default,
		meta: {
			title: '学生信息统计',
			breadcrumbs: ['统计分析', '学生信息统计'],
			roles: ['system']
		},
		redirect: '/xjManage/studentCount',
		children: [{
				//考勤管理
				path: '/xjManage/studentCount',
				meta: {
					title: '学生信息统计',
					roles: ['system'],
					breadcrumbs: ['统计管理', '学生信息统计'],
				},
				name: 'studentCount',
				component: () => import('@/views/stuManage/xjManage/view/studentCount')
			},
		],
	},
	
	{
		path: '/kqManage/rewardCount',
		component: Default,
		meta: {
			title: '奖惩统计',
			breadcrumbs: ['统计分析', '奖惩统计'],
			roles: ['system']
		},
		redirect: '/xjManage/rewardCount',
		children: [
			{
				
				path: '/kqManage/rewardCount',
				meta: {
					title: '奖惩统计',
					roles: ['system'],
					breadcrumbs: ['奖惩统计', '奖惩统计'],
				},
				name: 'rewardCount',
				component: () => import('@/views/stuManage/kqManage/view/rewardCount')
			}
		],
	},
	
	{
		path: '/tjcx/VeJwTjKeshiList',
		redirect: '/tjcx/VeJwTjKeshiList',
		component: Default,
		meta: {
			title: '教师课时统计查询',
			breadcrumbs: ['统计分析', '教师课时统计查询'],
			roles: ['system']
		},
		children: [{
				path: '/tjcx/VeJwTjKeshiList',
				meta: {
					title: '教师课时统计查询',
					roles: ['system'],
					breadcrumbs: ['统计分析','教师课时统计查询']
				},
				component: () => import('@/views/jwManage/jxgz/VeJwTjKeshiList')
			},
		]
	},
	
	
	{
		path: '/tjcx/jskqtj',
		redirect: '/tjcx/jskqtj',
		component: Default,
		meta: {
			title: '教师考勤统计查询',
			breadcrumbs: ['统计分析', '教师考勤统计查询'],
			roles: ['system']
		},
		children: [
			{
				path: '/tjcx/jskqtj',
				meta: {
					title: '教师考勤统计查询',
					roles: ['system'],
					breadcrumbs: ['教师考勤统计查询', '教师考勤统计查询']
				},
				component: () => import('@/views/jwManage/jxgz/jskqtj')
			},
		]
	},
	
	
	{
		path: '/tjcx/xscjtj',
		redirect: '/tjcx/xscjtj',
		component: Default,
		meta: {
			title: '学生成绩统计查询',
			breadcrumbs: ['统计分析', '学生成绩统计查询'],
			roles: ['system']
		},
		children: [
			{
				path: '/tjcx/xscjtj',
				meta: {
					title: '学生成绩统计查询',
					roles: ['system'],
					breadcrumbs: ['学生成绩统计查询', '学生成绩统计查询']
				},
				component: () => import('@/views/jwManage/jxgz/xscjtj')
			},
		]
	},
	
	
	{
		path: '/tjcx/VeJwTjKeshiList',
		redirect: '/tjcx/VeJwTjKeshiList',
		component: Default,
		meta: {
			title: '教学资源统计查询',
			breadcrumbs: ['统计分析', '教学资源统计查询'],
			roles: ['system']
		},
		children: [
			{
				path: '/tjcx/jxzytj',
				meta: {
					title: '教学资源统计查询',
					roles: ['system'],
					breadcrumbs: ['教学资源统计查询', '教学资源统计查询']
				},
				component: () => import('@/views/jwManage/jxgz/jxzytj')
			},
		]
	},
	{
		path: '/tjcx/kbcx',
		redirect: '/tjcx/kbcx',
		component: Default,
		meta: {
			title: '课表查询',
			breadcrumbs: ['统计分析', '课表查询'],
			roles: ['system','bzr']
		},
		children: [
			{
				path: '/tjcx/kbcx',
				meta: {
					title: '课表查询',
					roles: ['system', 'bzr'],
					breadcrumbs: ['统计查询', '课表查询']
				},
				component: () => import('@/views/jwManage/jxgz/kbcx')
			},
		]
	},
	{ // 首页默认菜单
		path: '/userRole',
		component: Default,
		meta: {
			title: '系统管理',
			breadcrumbs: ['系统管理', '用户角色管理'],
			roles: ['system']
		},
		redirect: '/userRole/operationLog/index',
		children: [{
				//用户管理
				path: '/userRole/operationLog/index',
				meta: {
					title: '用户管理',
					roles: ['system'],
					breadcrumbs: ['用户角色管理', '用户管理'],
				},
				name: 'operationLog',
				component: () => import('@/views/common/operationLog/index')
			},
			{
				
				path: '/userRole/menuConfiguration/index',
				meta: {
					title: '角色管理',
					roles: ['system'],
					breadcrumbs: ['用户角色管理', '角色管理'],
				},
				name: 'menuConfiguration',
				component: () => import('@/views/common/menuConfiguration/index')
			},
			// {
			// 	path: '/common/permissionManage/index',
			// 	meta: {
			// 		title: '菜单管理',
			// 		roles: ['system'],
			// 		breadcrumbs: ['系统管理', '菜单管理'],
			// 	},
			// 	name: 'permissionManage',
			// 	component: () => import('@/views/common/permissionManage/index')
			// },
		]
	},
	{ // 首页默认菜单
		path: '/dictionary',
		component: Default,
		meta: {
			title: '系统管理',
			breadcrumbs: ['系统管理', '数字字典管理'],
			roles: ['system']
		},
		redirect: '/dictionary/operationLog/index',
		children: [{
			//字典管理
			path: '/dictionary/dictionaryManagement/index',
			meta: {
				title: '字典管理',
				roles: ['system'],
				breadcrumbs: ['数字字典管理', '字典管理'],
			},
			name: 'dictionaryManagement',
			component: () => import('@/views/common/dictionaryManagement/DictList')
		}, ]
	},

	{ // 首页默认菜单
		path: '/notificationAnnouncement',
		component: Default,
		meta: {
			title: '系统管理',
			breadcrumbs: ['系统管理', '通知公告'],
			roles: ['system', 'student', 'teacher']
		},
		redirect: '/notificationAnnouncement/notice/index',
		children: [{
				//通知管理
				path: '/notificationAnnouncement/notice/index',
				meta: {
					title: '通知管理',
					roles: ['system', 'student', 'teacher'],
					breadcrumbs: ['系统管理', '通知消息'],
				},
				name: 'notice',
				component: () => import('@/views/common/notice/index')
			},
			{
				//通知管理
				path: '/notificationAnnouncement/notice/content',
				meta: {
					title: '',
					isHide: true,
					roles: ['system', 'student', 'teacher'],
					breadcrumbs: ['系统管理', ''],
				},
				name: 'notice',
				component: () => import('@/views/common/notice/content')
			},
		]
	},

	{ // 首页默认菜单
		path: '/processManagement',
		component: Default,
		meta: {
			title: '系统管理',
			breadcrumbs: ['系统管理', '流程管理'],
			roles: ['system']
		},
		redirect: '/processManagement/operationLog/index',
		children: [
			// {
			// 	//流程表单管理
			// 	path: '/processManagement/processList/index',
			// 	meta: {
			// 		title: '流程申请',
			// 		roles: ['system'],
			// 		breadcrumbs: ['系统管理', '流程申请'],
			// 	},
			// 	name: 'processList',
			// 	component: () => import('@/views/common/processList/index')
			// },
			{
				//流程表单管理
				path: '/processManagement/processManagement/index',
				meta: {
					title: '流程管理',
					roles: ['system'],
					breadcrumbs: ['系统管理', '流程管理'],
				},
				name: 'processManagement',
				component: () => import('@/views/common/processManagement/index')
			},
			{
				//流程审批管理
				path: '/processManagement/processApprovals/index',
				meta: {
					title: '流程审批',
					roles: ['system'],
					breadcrumbs: ['系统管理', '流程审批'],
				},
				name: 'processApprovals',
				component: () => import('@/views/common/processApprovals/index')
			},
		]
	},

	// {
	// 	path: '/userInfo',
	// 	redirect: '/userInfo/info',
	// 	component: Default,
	// 	meta: {
	// 		title: '基本信息',
	// 		breadcrumbs: ['个人中心', '学籍信息'],
	// 		roles: ['system','student']
	// 	},
	// 	children: [{
	// 			path: '/userInfo/info',
	// 			meta: {
	// 				breadcrumbs: ['基本信息', '学籍信息'],
	// 				title: '学籍信息',
	// 				roles: ['system','student','teacher'],
	// 			},
	// 			component: () => import('@/views/user/userInfo/index')
	// 		},
	// 	]
	// },
]


const createRouter = () => new VueRouter({
	mode: 'hash',
	// mode: 'history', // require service support
	scrollBehavior: () => ({
		y: 0
	}),
	base: process.env.BASE_URL,
	routes: constantRouterMap
})

const router = createRouter()
router.beforeEach(async (to, from, next) => {
	// 触发获取菜单的 action
	if (localStorage.getItem('menus')) {
		let menus = JSON.parse(localStorage.getItem('menus'));
		menus.forEach((e) => {
			if (e.children && e.children.length > 0) {
				e.children.forEach((ite) => {
					if (ite.children) {
						ite.children.forEach((ii) => {
							if (ii.path === to.path) {
								store.commit('sidebar/SET_SIDEOBJ', ite);
								store.commit('sidebar/SET_NAVSELECTEDKEY', [ite
									.name
								]);
								store.commit('sidebar/SET_NAVITEMS', e.children);
								store.commit('sidebar/SET_SIDESELECTEDKEY', [ii
									.name
								]);
								store.commit('sidebar/SET_MENUSELECTEDKEY', [e
									.name
								]);
							}
						});
					}
				});
			} else {
				store.commit('sidebar/SET_SIDEOBJ', {});
				store.commit('sidebar/SET_NAVSELECTEDKEY', []);
				store.commit('sidebar/SET_NAVITEMS', []);
				store.commit('sidebar/SET_SIDESELECTEDKEY', []);
				store.commit('sidebar/SET_MENUSELECTEDKEY', [e.name]);
			}
		});
	}
	next();
});
// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
	const newRouter = createRouter()
	router.matcher = newRouter.matcher // reset router
}

export default router