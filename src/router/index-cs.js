import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import { constantRouterMap } from "@/config/router.config"
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
			breadcrumbs: ['公共系统', '基础信息管理'],
			roles: ['system','ceshi']
		},
		redirect: '/baseData/index',
		children: [{
			//用户管理
			path: '/baseData/index',
			meta: {
				title: '学校基础信息',
				roles: ['system','ceshi'],
				breadcrumbs: ['基础信息管理','学校基础信息'],
			},
			name: 'schoolInfo',
			component: () => import('@/views/common/basicsData/schoolInfo/index')
		},{
			path: '/baseData/schoollMsg/index',
			meta: {
				title: '校区信息',
				roles: ['system','ceshi'],
				breadcrumbs: ['基础信息管理','校区信息'],
			},
			name: 'schoollMsg',
			component: () => import('@/views/common/basicsData/schoollMsg/index')
		},{
			path: '/baseData/department/index',
			meta: {
				title: '部门管理',
				roles: ['system','ceshi'],
				breadcrumbs: ['基础信息管理','部门管理'],
			},
			name: 'department',
			component: () => import('@/views/common/basicsData/departmentManagement/index')
		},{
			path: '/baseData/schoolSystem/index',
			meta: {
				title: '学制管理',
				roles: ['system','ceshi'],
				breadcrumbs: ['基础信息管理','学制管理'],
			},
			name: 'schoolSystem',
			component: () => import('@/views/common/basicsData/schoolSystem/index')
		},
		{
			path: '/baseData/semester/index',
			meta: {
				title: '学期管理',
				roles: ['system','ceshi'],
				breadcrumbs: ['基础信息管理','学期管理'],
			},
			name: 'semester',
			component: () => import('@/views/common/basicsData/semester/index')
		},{
			path: '/baseData/schoolFaculties/index',
			meta: {
				title: '院系管理',
				roles: ['system','ceshi'],
				breadcrumbs: ['基础信息管理','院系管理'],
			},
			name: 'schoolFaculties',
			component: () => import('@/views/common/basicsData/schoolFaculties/index')
		},{
			path: '/baseData/schoolClass/index',
			meta: {
				title: '年级管理',
				roles: ['system','ceshi'],
				breadcrumbs: ['基础信息管理','年级管理'],
			},
			name: 'schoolClass',
			component: () => import('@/views/common/basicsData/schoolClass/index')
		}
		,{
			path: '/baseData/schoolSpecialized/index',
			meta: {
				title: '专业管理',
				roles: ['system','ceshi'],
				breadcrumbs: ['基础信息管理','专业管理'],
			},
			name: 'schoolSpecialized',
			component: () => import('@/views/common/basicsData/schoolSpecialized/index')
		},{
			path: '/baseData/zyzInfo/index',
			meta: {
				title: '专业组管理',
				roles: ['system','ceshi'],
				breadcrumbs: ['基础信息管理','专业组管理'],
			},
			name: 'zyzInfo',
			component: () => import('@/views/common/basicsData/zyz/index')
		},{
			path: '/baseData/classManage/index',
			meta: {
				title: '班级管理',
				roles: ['system','ceshi'],
				breadcrumbs: ['基础信息管理','班级管理'],
			},
			name: 'classManage',
			component: () => import('@/views/common/basicsData/classManage/index')
		},{
			path: '/baseData/teacherinfo/index',
			meta: {
				title: '教师管理',
				roles: ['system','ceshi'],
				breadcrumbs: ['基础信息管理','教师管理'],
			},
			name: 'teacherinfo',
			component: () => import('@/views/common/basicsData/teacherinfo/index')
		},{
			path: '/baseData/stuInfo/index',
			meta: {
				title: '学生管理',
				roles: ['system','ceshi'],
				breadcrumbs: ['基础信息管理','学生管理'],
			},
			name: 'stuInfo',
			component: () => import('@/views/common/basicsData/stuInfo/index')
		},
		{
			path: '/baseData/holidays/index',
			meta: {
				title: '',
				roles: ['system','ceshi'],
				breadcrumbs: ['基础信息管理',''],
			},
			name: 'holidays',
			component: () => import('@/views/common/basicsData/holidays/index')
		},
		{
			path: '/baseData/holidays/index',
			meta: {
				title: '',
				roles: ['system','ceshi'],
				breadcrumbs: ['基础信息管理',''],
			},
			name: 'holidays',
			component: () => import('@/views/common/basicsData/holidays/index')
		},
		{
			path: '/baseData/academicCalendar/index',
			meta: {
				title: '',
				roles: ['system','ceshi'],
				breadcrumbs: ['基础信息管理',''],
			},
			name: 'academicCalendar',
			component: () => import('@/views/common/basicsData/academicCalendar/index')
		},
		],
	}, {
		// 首页默认菜单
		path: '/kqManage',
		component: Default,
		meta: {
			title: '考勤管理',
			breadcrumbs: ['学工系统', '考勤管理'],
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
				//角色管理
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
				//请假审批
				path: '/kqManage/veStuLeave/veStuLeave',
				meta: {
					title: '请假审批',
					roles: ['system', 'bzr'],
					breadcrumbs: ['考勤管理', '请假审批'],
				},
				name: 'veStuLeave',
				component: () => import('@/views/stuManage/kqManage/view/veStuLeave/veStuLeave')
			},
			// {
			// 	//部门管理
			// 	path: '/kqManage/veStuCheck/veStuCheckBj',
			// 	meta: {
			// 		title: '班级考勤',
			// 		roles: ['system', 'teacher','bzr'],
			// 		breadcrumbs: ['考勤管理', '班级考勤'],
			// 	},
			// 	name: 'veStuCheckBj',
			// 	component: () => import('@/views/stuManage/kqManage/view/veStuCheck/veStuCheckBj')
			// },
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
			breadcrumbs: ['学工系统', '奖惩管理'],
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
				//角色管理
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
					roles: ['system', 'student','teacher','bzr'],
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
					roles: ['system', 'student','teacher','bzr'],
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
			breadcrumbs: ['学工系统', '奖助学金管理'],
			roles: ['system','student','bzr']
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
				//角色管理
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
					roles: ['system','student','bzr','teacher'],
					breadcrumbs: ['奖助学金管理', '奖学金管理'],
				},
				name: 'veStuScholarship',
				component: () => import('@/views/stuManage/kqManage/view/veStuScholarship/veStuScholarship')
			},
			{
				path: '/sjxj/veStuStipend/veStuStipendMy',
				meta: {
					title: '助学金管理',
					roles: ['system','teacher','student','bzr'],
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
			breadcrumbs: ['学工系统', '困难生管理'],
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
	}, {
		// 勤工俭学
		path: '/qgjxgl',
		component: Default,
		meta: {
			title: '勤工俭学管理',
			breadcrumbs: ['学工系统', '勤工俭学'],
			roles: ['system','student', 'bzr']
		},
		redirect: '/qgjxgl/hqStuPosition/hqStuPosition',
		children: [{
				path: '/qgjxgl/hqStuPosition/hqStuPosition',
				meta: {
					title: '职位管理',
					roles: ['system','student'],
					breadcrumbs: ['勤工俭学', '职位管理'],
				},
				name: 'hqStuPosition',
				component: () => import('@/views/stuManage/kqManage/view/hqStuPosition/hqStuPosition')
			},
			{
				path: '/qgjxgl/hqStuPositionApply/positionApply',
				meta: {
					title: '勤工俭学',
					roles: ['system','student', 'bzr'],
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
			breadcrumbs: ['学工系统', '心理健康管理'],
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
				//角色管理
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
			breadcrumbs: ['学工系统', '综合素质管理'],
			roles: ['system','bzr','student']
		},
		component: Default,
		redirect: '/zhsz/menu/moral',
		children: [{
				//考勤管理
				path: '/zhsz/menu/moral',
				meta: {
					title: '德育工作管理',
					roles: ['system','bzr'],
					breadcrumbs: ['综合素质管理', '德育工作管理'],
				},
				name: 'moral',
				component: () => import('@/views/stuManage/zhsz/menu/moral')
			},
			{
				//角色管理
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
					roles: ['system','bzr'],
					breadcrumbs: ['综合素质管理', '卫生检查管理'],
				},
				name: 'weishen',
				component: () => import('@/views/stuManage/zhsz/menu/weishen')
			}, {
				//部门管理
				path: '/zhsz/menu/wenhua',
				meta: {
					title: '文体活动管理',
					roles: ['system','bzr'],
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
					roles: ['system','bzr'],
					breadcrumbs: ['综合素质管理', '党团活动'],
				},
				name: 'veStuCaucus',
				component: () => import('@/views/stuManage/zhsz/view/veStuCaucus/veStuCaucus')
			}, {
				//部门管理
				path: '/zhsz/veStuHealthReport/veStuHealthReport',
				meta: {
					title: '体质健康',
					roles: ['system','bzr'],
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
			},{
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
				component: () => import('@/views/stuManage/zhsz/view/veStuLiteraryProgram/veStuLiteraryProgramMy')
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
			},{
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
			breadcrumbs: ['学工系统', '个人评定'],
			roles: ['system', 'student','bzr']
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
				//角色管理
				path: '/jis/veStuIntroduction/veStuIntroduction',
				meta: {
					title: '自我鉴定',
					roles: ['system', 'student'],
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
					roles: ['system','bzr'],
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
			breadcrumbs: ['学工系统', '毕业管理'],
			roles: ['system','bzr']
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
				//角色管理
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
					roles: ['system','bzr'],
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
			// 	//角色管理
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
				//角色管理
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
				//角色管理
				path: '/biye/view/veStuGraduation/myGaduation',
				meta: {
					title: '毕业查询',
					roles: ['teacher'],
					breadcrumbs: ['毕业管理', '毕业查询'],
				},
				name: 'myGaduation',
				component: () => import('@/views/stuManage/biye/view/veStuGraduation/base/veStuGraduationMy')
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
			breadcrumbs: ['学工系统', '班主任管理'],
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
				//角色管理
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
		path: '/sCount',
		component: Default,
		meta: {
			title: '统计管理',
			breadcrumbs: ['学工系统', '统计管理'],
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
			// {
			// 	//角色管理
			// 	path: '/kqtj/stuAttendCount',
			// 	meta: {
			// 		title: '考勤统计',
			// 		roles: ['system','teacher'],
			// 		breadcrumbs: ['统计管理', '考勤统计'],
			// 	},
			// 	name: 'stuAttendCount',
			// 	component: () => import('@/views/stuManage/kqtj/view/veStuAttendCount')
			// },
			{
				//角色管理
				path: '/kqManage/rewardCount',
				meta: {
					title: '奖惩统计',
					roles: ['system'],
					breadcrumbs: ['统计管理', '奖惩统计'],
				},
				name: 'rewardCount',
				component: () => import('@/views/stuManage/kqManage/view/rewardCount')
			}
		],
	}, {
		path: '/zhszpc',
		component: Default,
		meta: {
			title: '综合素质评测',
			breadcrumbs: ['学工系统', '综合素质评测'],
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
				//角色管理
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
				//角色管理
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
				//角色管理
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
			breadcrumbs: ['学工系统', '预约管理'],
			roles: ['system','student']
		},
		redirect: '/jis/veStuYyproject/veStuYyproject',
		children: [{
				//考勤管理
				path: '/jis/veStuYyproject/veStuYyproject',
				meta: {
					title: '我要预约',
					roles: ['system','student'],
					breadcrumbs: ['预约管理', '我要预约'],
				},
				name: 'veStuYyproject',
				component: () => import('@/views/stuManage/jis/view/veStuYyproject/veStuYyproject')
			},
			{
				//角色管理
				path: '/jis/veStuYystu/veStuYystu',
				meta: {
					title: '我的预约',
					roles: ['system','student'],
					breadcrumbs: ['预约管理', '我的预约'],
				},
				name: 'veStuYystu',
				component: () => import('@/views/stuManage/jis/view/veStuYystu/veStuYystu')
			}
		],
	},
	{
		path: '/xjManage',
		redirect: '/xjManage/veBaseStudent/veBaseStudentXj',
		component: Default,
		meta: {
			title: '学籍管理',
			breadcrumbs: ['教务系统', '学籍管理'],
			roles: ['system','student','bzr']
		},
		children: [{
				path: '/xjManage/veBaseStudent/veBaseStudentXj',
				meta: {
					title: '学籍注册',
					roles: ['system','bzr','teacher'],
					breadcrumbs: ['学籍管理', '学籍注册'],
				},
				component: () => import('@/views/stuManage/xjManage/view/veBaseStudent/veBaseStudentXj')
			},
			{
				path: '/xjManage/veBaseStudent/veBaseStudent',
				icon: 'icon-lingqu',
				meta: {
					title: '学生信息维护',
					roles: ['system','bzr'],
					breadcrumbs: ['学籍管理', '学生信息维护'],
				},
				component: () => import('@/views/stuManage/xjManage/view/veBaseStudent/veBaseStudent')
			},
			{
				path: '/xjManage/veStuXjAudit/veStuXjAudit',
				icon: 'icon-add-funding',
				meta: {
					title: '审核学籍修改申请',
					roles: ['system'],
					breadcrumbs: ['学籍管理', '审核学籍修改申请'],
				},
				component: () => import('@/views/stuManage/xjManage/view/veStuXjAudit/veStuXjAudit')
			},
			{
				path: '/xjManage/xjManage/stuChange',
				icon: 'icon-xiangmu',
				meta: {
					title: '学籍异动',
					roles: ['system','student'],
					breadcrumbs: ['学籍管理', '学籍异动'],
				},
				component: () => import('@/views/stuManage/xjManage/view/stuChange')
			},
			{
				path: '/xjManage/veStuSemester/veStuSemester',
				icon: 'icon-gengduo',
				meta: {
					title: '学期注册',
					roles: ['system','bzr'],
					breadcrumbs: ['学籍管理', '学期注册'],
				},
				component: () => import('@/views/stuManage/xjManage/view/veStuSemester/veStuSemester')
			}
		]
	},{
		path: '/jxzygl',
		redirect: '/jxzygl/kckgl',
		meta: {
			title: '教务系统',
			breadcrumbs: ['教务系统', '教学资源管理'],
			roles: ['system']
		},
		component: Default,
		children: [{
				path: '/jxzygl/kckgl',
				meta: {
					title: '课程管理',
					roles: ['system'],
					breadcrumbs: ['教学资源管理', '课程管理']
				},
				component: () => import('@/views/jwManage/jxzy/kckgl')
			},
			{
				path: '/jxzygl/jxcdgl',
				meta: {
					title: '教学场地管理',
					roles: ['system'],
					breadcrumbs: ['教学资源管理', '教学场地管理']
				},
				component: () => import('@/views/jwManage/jxzy/jxcdgl')
			},
			{
				path: '/jxzygl/jcgl',
				meta: {
					title: '教材管理',
					roles: ['system'],
					breadcrumbs: ['教学资源管理', '教材管理']
				},
				component: () => import('@/views/jwManage/jxzy/jcgl')
			},
		]
	}, {
		path: '/pyfangan',
		redirect: '/pyfangan/pyfa',
		meta: {
			title: '教务系统',
			breadcrumbs: ['教务系统', '培养方案'],
			roles: ['system']
		},
		component: Default,
		children: [
			{
				path: '/pyfangan/kcjh',
				icon: 'icon-lingqu',
				meta: {
					title: '课程计划',
					roles: ['system'],
					breadcrumbs: ['培养方案', '课程计划'],
				},
				component: () => import('@/views/jwManage/pyfa/VeJwKcjhList')
			},{
				path: '/pyfangan/pyfa',
				meta: {
					title: '方案管理',
					roles: ['system'],
					breadcrumbs: ['培养方案'],
				},
				component: () => import('@/views/jwManage/pyfa/VeJwPyfaList')
			},
			{
				//基础信息管理
				path: '/pyfangan/jxrw/mission',
				meta: {
					title: '教学任务',
					roles: ['system'],
					breadcrumbs: ['教学任务'],
				},
				name: 'jxrw',
				component: () => import('@/views/jwManage/jxrw/VeJwJxrwList')
			}
		]
	}, {
		path: '/courses',
		redirect: '/courses/manual',
		meta: {
			title: '教务系统',
			breadcrumbs: ['教务系统', '排课管理'],
			roles: ['system','student']
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
			// , {
			// 	path: '/courses/myCourses/list',
			// 	icon: 'icon-lingqu',
			// 	meta: {
			// 		title: '排课列表',
			// 		roles: ['system','teacher','student'],
			// 		breadcrumbs: ['排课管理', '排课列表'],
			// 	},
			// 	component: () => import('@/views/jwManage/courses/myCourses/list')
			// }

		]
	},  {
		path: '/courseManagement',
		redirect: '/courseManagement/administrative',
		meta: {
			title: '教务系统',
			breadcrumbs: ['教务系统', '调课管理'],
			roles: ['system','teacher','bzr']
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
					roles: ['system','teacher','bzr'],
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
					roles: ['system','teacher','bzr'],
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
	},  {
		path: '/curriculas',
		redirect: '/curriculas/pattern',
		meta: {
			title: '教务系统',
			breadcrumbs: ['教务系统', '选课管理'],
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
		path: '/kwgl',
		redirect: '/kwgl/kssjdgl',
		meta: {
			title: '考务管理',
			breadcrumbs: ['教务系统', '考务管理'],
			roles: ['system', 'student','bzr','teacher']
		},
		component: Default,
		children: [{
				path: '/kwgl/kssjdgl',
				title: '基础管理',
				meta: {
					title: '基础管理',
					roles: ['system'],
					breadcrumbs: ['考务管理', '基础管理']
				},
				component: () => import('@/views/jwManage/kwgl/setting/VeJwKssjdList')
			},
			{
				path: '/kwgl/kaoshi',
				meta: {
					title: '考试管理',
					roles: ['system'],
					breadcrumbs: ['考务管理', '考试管理']
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
			{
				path: '/kwgl/student/cj',
				meta: {
					title: '我的成绩',
					roles: ['student'],
					breadcrumbs: ['考务管理', '我的成绩']
				},
				component: () => import('@/views/jwManage/kwgl/student/VeJwChengjiList')
			},
			{
				path: '/kwgl/bukao',
				meta: {
					title: '补考管理',
					roles: ['system'],
					breadcrumbs: ['考务管理', '补考管理']
				},
				component: () => import('@/views/jwManage/kwgl/bukao/bukaoChange')
			},
			// {
			// 	path: '/kwgl/qingkao',
			// 	meta: {
			// 		title: '清考管理',
			// 		roles: ['system'],
			// 		breadcrumbs: ['考务管理', '清考管理']
			// 	},
			// 	component: () => import('@/views/jwManage/kwgl/qingkao/qingkaoChange')
			// },
			{
				path: '/kwgl/chengji',
				meta: {
					title: '成绩管理',
					roles: ['system','teacher','bzr'],
					breadcrumbs: ['考务管理', '成绩管理']
				},
				component: () => import('@/views/jwManage/kwgl/manage/chengjiChange')
			}
		]
	},
	
	{
		path: '/jxgzgl',
		redirect: '/jxgzgl/VeJwTeachactList',
		component: Default,
		meta: {
			title: '教学工作管理',
			breadcrumbs: ['教务系统', '教学工作管理'],
			roles: ['system','teacher','bzr']
		},
		children: [{
				path: '/jxgzgl/VeJwTeachactList',
				meta: {
					title: '教学活动',
					roles: ['system'],
					breadcrumbs: ['教学工作管理', '教学活动']
				},
				component: () => import('@/views/jwManage/jxgz/VeJwTeachactList')
			},
			{
				path: '/jxgzgl/gzzj',
				meta: {
					title: '工作总结',
					roles: ['system','teacher'],
					breadcrumbs: ['教学工作管理', '工作总结']
				},
				component: () => import('@/views/jwManage/jxgz/gzzj')
			},
			{
				path: '/jxgzgl/jxrz',
				meta: {
					title: '教学日志',
					roles: ['system','teacher','bzr'],
					breadcrumbs: ['教学工作管理', '教学日志']
				},
				component: () => import('@/views/jwManage/jxgz/jxrz')
			},
			{
				path: '/jxgzgl/bjgg',
				meta: {
					title: '班级公告',
					roles: ['system','bzr','student'],
					breadcrumbs: ['教学工作管理', '班级公告']
				},
				component: () => import('@/views/jwManage/jxgz/bjgg')
			},
			{
				path: '/jxgzgl/skjh',
				meta: {
					title: '授课计划',
					roles: ['system','teacher'],
					breadcrumbs: ['教学工作管理', '授课计划']
				},
				component: () => import('@/views/jwManage/jxgz/skjh')
			},
		]
	},
	{
		path: '/zyjn',
		redirect: '/zyjn/jsgl',
		component: Default,
		meta: {
			title: '职业技能',
			breadcrumbs: ['教务系统', '职业技能'],
			roles: ['system']
		},
		children: [{
				path: '/zyjn/jsgl',
				meta: {
					title: '教学活动',
					roles: ['system'],
					breadcrumbs: ['职业技能', '竞赛管理']
				},
				component: () => import('@/views/jwManage/skill/jsgl')
			},
			{
				path: '/zyjn/zyrzgl',
				meta: {
					title: '职业认证管理',
					roles: ['system'],
					breadcrumbs: ['职业技能', '职业认证管理']
				},
				component: () => import('@/views/jwManage/skill/zyrzgl')
			},
		]
	}, {
		path: '/dorm',
		component: Default,
		meta: {
			title: '宿舍基础管理',
			breadcrumbs: ['宿舍系统', '宿舍基础管理'],
			roles: ['system','ceshi']
		},
		redirect: '/dorm/floorMng',
		children: [
			{
				path: '/dorm/buildMng',
				meta: {
					title: '宿舍楼管理',
					roles: ['system','ceshi'],
					breadcrumbs: ['宿舍基础管理', '宿舍楼管理'],
				},
				name: 'buildMng',
				component: () => import('@/views/dorm/baseMng/buildMng')
			},
			{
					path: '/dorm/floorMng',
					meta: {
						title: '楼层管理',
						roles: ['system','ceshi'],
						breadcrumbs: ['宿舍基础管理', '楼层管理'],
					},
					name: 'floorMng',
					component: () => import('@/views/dorm/baseMng/floorMng')
				},
			{
				path: '/dorm/dormMng',
				meta: {
					title: '宿舍管理',
					roles: ['system','ceshi'],
					breadcrumbs: ['宿舍基础管理', '宿舍管理'],
				},
				name: 'dormMng',
				component: () => import('@/views/dorm/baseMng/dormMng')
			}
		]
	}, {
		path: '/dormProperty',
		component: Default,
		meta: {
			title: '宿舍资产管理',
			breadcrumbs: ['宿舍系统', '宿舍资产管理'],
			roles: ['system','ceshi']
		},
		redirect: '/dormProperty/assetTypeMng',
		children: [{
				path: '/dormProperty/assetTypeMng',
				meta: {
					title: '资产类别管理',
					roles: ['system','ceshi'],
					breadcrumbs: ['宿舍资产管理', '资产类别管理'],
				},
				name: 'assetTypeMng',
				component: () => import('@/views/dorm/assetMng/assetTypeMng')
			},
			
			{
				path: '/dormProperty/assetMng',
				name: 'assetMng',
				meta: {
					title: '资产管理',
					roles: ['system','ceshi'],
					breadcrumbs: ['宿舍资产管理', '资产管理'],
				},
				component: () => import('@/views/dorm/assetMng/assetMng')
			},
			{
				path: '/dormProperty/assetQuery',
				meta: {
					title: '资产查询',
					roles: ['system','ceshi'],
					breadcrumbs: ['资产类别管理', '资产查询'],
				},
				name: 'assetQuery',
				component: () => import('@/views/dorm/assetMng/assetQuery')
			}
		]
	}, {
		path: '/dormsw',
		component: Default,
		meta: {
			title: '宿务管理',
			breadcrumbs: ['宿舍系统', '宿务管理'],
			roles: ['system','ceshi']
		},
		redirect: 'dormProperty/chooseDorm',
		children: [
			{
				path: '/dormProperty/chooseDorm',
				meta: {
					title: '',
					roles: ['system','ceshi'],
					breadcrumbs: ['宿舍资产管理', '宿舍操作'],
				},
				name: 'chooseDorm',
				component: () => import('@/views/dorm/dormMng/chooseDorm')
			},
			{
				path: '/dormProperty/dormDistribute',
				meta: {
					title: '',
					roles: ['system','ceshi'],
					breadcrumbs: ['资产类别管理', '分配学生'],
				},
				name: 'dormDistribute',
				component: () => import('@/views/dorm/dormMng/dormDistribute')
			},
			{
				path: '/dormProperty/chooseBuild',
				meta: {
					title: '选择宿舍',
					roles: ['system','ceshi'],
					breadcrumbs: ['宿舍资产管理', '选择宿舍'],
				},
				name: 'chooseBuild',
				component: () => import('@/views/dorm/dormMng/chooseBuild')
			},

			{
				path: '/dormProperty/dormFixMng',
				name: 'dormFixMng',
				meta: {
					title: '',
					roles: ['system','ceshi'],
					breadcrumbs: ['宿舍资产管理', '查看详情(宿舍维修)'],
				},
				component: () => import('@/views/dorm/dormMng/dormFixMng')
			},{
				path: '/dormsw/dormModifyApply',
				meta: {
					title: '宿舍变更',
					roles: ['system','ceshi'],
					breadcrumbs: ['宿务管理', '宿舍变更'],
				},
				name: 'dormModifyApply',
				component: () => import('@/views/dorm/dormMng/dormModifyApply')
			},
			{
				path: '/dormsw/mydormApply',
				meta: {
					title: '宿舍变更申请',
					roles: ['student','ceshi'],
					breadcrumbs: ['宿务管理', '宿舍变更申请'],
				},
				name: 'mydormApply',
				component: () => import('@/views/dorm/dormMng/mydormApply')
			},
			{
				path: '/dormsw/prinConditionMng',
				meta: {
					title: '违纪情况管理',
					roles: ['system','ceshi'],
					breadcrumbs: ['宿务管理', '违纪情况管理'],
				},
				name: 'prinConditionMng',
				component: () => import('@/views/dorm/dormMng/prinConditionMng')
			},
			// {
			// 	path: '/dormsw/dormVisitorMng',
			// 	meta: {
			// 		title: '宿舍访客管理',
			// 		roles: ['system'],
			// 		breadcrumbs: ['宿务管理', '宿舍访客管理'],
			// 	},
			// 	component: () => import('@/views/dorm/dormMng/dormVisitorMng')
			// },
			// // 宿舍调用
			// {
			// 	path: '/dormsw/chooseBuildIndex',
			// 	meta: {
			// 		title: '宿舍分配',
			// 		roles: ['system'],
			// 		breadcrumbs: ['宿务管理', '宿舍分配'],
			// 	},
			// 	component: () => import('@/views/dorm/dormMng/chooseBuildIndex')
			// },
			// 宿舍调用
			{
				path: '/dormsw/dormInvoking',
				name: 'dormInvoking',
				meta: {
					title: '宿舍访客管理',
					roles: ['system','ceshi'],
					breadcrumbs: ['宿务管理', '宿舍访客管理'],
				},
				component: () => import('@/views/dorm/dormMng/dormInvoking')
			},
			{
				path: '/dormsw/translateApprove',
				meta: {
					title: '留宿申请',
					roles: ['student'],
					breadcrumbs: ['宿务管理', '留宿申请'],
				},
				name: 'translateApprove',
				component: () => import('@/views/dorm/dormMng/translateApprove')
			},

			{
				path: '/dormsw/notice',
				meta: {
					title: '通知公告',
					roles: ['system','ceshi'],
					breadcrumbs: ['宿务管理', '通知公告'],
				},
				name: 'notice',
				component: () => import('@/views/dorm/dormMng/notice')
			},
			{
				path: '/dorm/dormJudge',
				meta: {
					title: '宿舍卫生评比',
					roles: ['system','ceshi'],
					breadcrumbs: ['宿务管理', '宿舍卫生评比'],
				},
				name: 'dormJudge',
				component: () => import('@/views/dorm/dormMng/dormJudge')
			}
		]
	}, {
		path: '/dormLodging',
		component: Default,
		meta: {
			title: '住宿考勤',
			breadcrumbs: ['宿舍系统', '住宿考勤'],
			roles: ['system','ceshi']
		},
		redirect: '/dormLodging/attenSetting',
		children: [{
				path: '/dormLodging/attenSetting',
				meta: {
					title: '考勤设置',
					roles: ['system','ceshi'],
					breadcrumbs: ['住宿考勤', '考勤设置'],
				},
				name: 'attenSetting',
				component: () => import('@/views/dorm/accomAttendance/attenSetting')
			},
			{
				path: '/dormLodging/attenMng',
				meta: {
					title: '考勤管理',
					roles: ['system','ceshi'],
					breadcrumbs: ['住宿考勤', '考勤管理'],
				},
				name: 'attenMng',
				component: () => import('@/views/dorm/accomAttendance/attenMng')
			},
			{
				path: '/dormLodging/prinTypeMng',
				meta: {
					title: '违纪类型管理',
					roles: ['system'],
					breadcrumbs: ['住宿考勤', '违纪类型管理'],
				},
				name: 'prinTypeMng',
				component: () => import('@/views/dorm/accomAttendance/prinTypeMng')
			},
			{
				path: '/dormLodging/prinMng',
				meta: {
					title: '留宿审核',
					roles: ['system','ceshi'],
					breadcrumbs: ['住宿考勤', '违纪管理'],
				},
				name: 'prinMng',
				component: () => import('@/views/dorm/accomAttendance/prinMng')
			}
		]
	}, {
		path: '/dormInstitution',
		component: Default,
		meta: {
			title: '制度管理',
			breadcrumbs: ['宿舍系统', '制度管理'],
			roles: ['system','ceshi']
		},
		redirect: '/dormInstitution/ruleQuery',
		children: [{
				path: '/dormInstitution/ruleQuery',
				meta: {
					title: '制度查询',
					roles: ['system','ceshi'],
					breadcrumbs: ['制度管理', '制度查询'],
				},
				name: 'ruleQuery',
				component: () => import('@/views/dorm/systemMng/ruleQuery')
			},
			{
				path: '/dormInstitution/dormRuleType',
				meta: {
					title: '寝室制度类别',
					roles: ['system','ceshi'],
					breadcrumbs: ['制度管理', '寝室制度类别'],
				},
				name: 'dormRuleType',
				component: () => import('@/views/dorm/systemMng/dormRuleType')
			},
			{
				path: '/dormInstitution/ruleMng',
				meta: {
					title: '制度管理',
					roles: ['system','ceshi'],
					breadcrumbs: ['制度管理', '制度管理'],
				},
				name: 'ruleMng',
				component: () => import('@/views/dorm/systemMng/ruleMng')
			}
		]
	}, {
		path: '/dormStatistics',
		component: Default,
		meta: {
			title: '宿舍统计',
			breadcrumbs: ['宿舍系统', '宿舍统计'],
			roles: ['system','ceshi']
		},
		redirect: '/dormStatistics/dormVolume',
		children: [{
				path: '/dormStatistics/dormVolume',
				meta: {
					title: '宿舍容量统计',
					roles: ['system','ceshi'],
					breadcrumbs: ['宿舍统计', '宿舍容量统计'],
				},
				name: 'ruleQuery',
				component: () => import('@/views/dorm/dormCount/dormVolume')
			},
			{
				path: '/dormStatistics/stuCount',
				meta: {
					title: '宿舍学生统计',
					roles: ['system','ceshi'],
					breadcrumbs: ['宿舍统计', '宿舍学生统计'],
				},
				name: 'stuCount',
				component: () => import('@/views/dorm/dormCount/stuCount')
			},
			{
				path: '/dormStatistics/attenCount',
				meta: {
					title: '考勤统计',
					roles: ['system'],
					breadcrumbs: ['宿舍统计', '考勤统计'],
				},
				name: 'attenCount',
				component: () => import('@/views/dorm/dormCount/attenCount')
			},
			{
				path: '/dormStatistics/prinCount',
				meta: {
					title: '违纪统计',
					roles: ['system'],
					breadcrumbs: ['宿舍统计', '违纪统计'],
				},
				name: 'prinCount',
				component: () => import('@/views/dorm/dormCount/prinCount')
			}
		]
	},

	{
		path: '/tjcx',
		redirect: '/tjcx/VeJwTjKeshiList',
		component: Default,
		meta: {
			title: '统计查询',
			breadcrumbs: ['教务系统', '统计查询'],
			roles: ['system','teacher','bzr']
		},
		children: [{
				path: '/tjcx/VeJwTjKeshiList',
				meta: {
					title: '教师课时统计查询',
					roles: ['system'],
					breadcrumbs: ['统计查询', '教师课时统计查询']
				},
				component: () => import('@/views/jwManage/jxgz/VeJwTjKeshiList')
			},
			{
				path: '/tjcx/jskqtj',
				meta: {
					title: '教师考勤统计查询',
					roles: ['system'],
					breadcrumbs: ['统计查询', '教师考勤统计查询']
				},
				component: () => import('@/views/jwManage/jxgz/jskqtj')
			},
			{
				path: '/tjcx/xscjtj',
				meta: {
					title: '学生成绩统计查询',
					roles: ['system'],
					breadcrumbs: ['统计查询', '学生成绩统计查询']
				},
				component: () => import('@/views/jwManage/jxgz/xscjtj')
			},
			{
				path: '/tjcx/jxzytj',
				meta: {
					title: '教学资源统计查询',
					roles: ['system'],
					breadcrumbs: ['统计查询', '教学资源统计查询']
				},
				component: () => import('@/views/jwManage/jxgz/jxzytj')
			},
			{
				path: '/tjcx/kbcx',
				meta: {
					title: '课表查询',
					roles: ['system','bzr'],
					breadcrumbs: ['统计查询', '课表查询']
				},
				component: () => import('@/views/jwManage/jxgz/kbcx')
			},
		]
	},
	{
		path: '/jkyjc',
		redirect: '/jkyjc/veJkyOrganize',
		component: Default,
		meta: {
			title: '教科研基础',
			breadcrumbs: ['教科研管理', '教科研基础'],
			roles: ['system']
		},
		children: [{
				path: '/jkyjc/veJkyOrganize',
				meta: {
					title: '科研组管理',
					roles: ['system'],
					breadcrumbs: ['教科研基础', '科研组管理']
				},
				component: () => import('@/views/research/rbase/organize/veJkyOrganize')
			},
			{
				path: '/jkyjc/levelList',
				meta: {
					title: '项目级别管理',
					roles: ['system'],
					breadcrumbs: ['教科研基础', '项目级别管理']
				},
				component: () => import('@/views/research/rbase/level/levelList')
			},
			{
				path: '/jkyjc/veJkyCategory',
				meta: {
					title: '项目类型管理',
					roles: ['system'],
					breadcrumbs: ['教科研基础', '项目类型管理']
				},
				component: () => import('@/views/research/rbase/category/veJkyCategory')
			},
			{
				path: '/jkyjc/veJkyUser',
				meta: {
					title: '人员管理',
					roles: ['system'],
					breadcrumbs: ['教科研基础', '人员管理']
				},
				component: () => import('@/views/research/rbase/user/veJkyUser')
			},
			{
				path: '/jkyjc/veJkyAdmin',
				meta: {
					title: '经费审核人',
					roles: ['system'],
					breadcrumbs: ['教科研基础', '经费审核人']
				},
				component: () => import('@/views/research/rbase/admin/veJkyAdmin')
			},
		]
	},




	{
		path: '/jkygzgl',
		redirect: '/jkygzgl/veJkyMeetPlace',
		component: Default,
		meta: {
			title: '教科研工作管理',
			breadcrumbs: ['教科研管理', '教科研工作管理'],
			roles: ['system']
		},
		children: [{
				path: '/jkygzgl/veJkyMeetPlace',
				meta: {
					title: '会议场地管理',
					roles: ['system'],
					breadcrumbs: ['教科研工作管理', '会议场地管理']
				},
				component: () => import('@/views/research/rwork/meetPlace/veJkyMeetPlace')
			},
			{
				path: '/jkygzgl/veJkyMeetMy',
				meta: {
					title: '我的会议',
					roles: ['system'],
					breadcrumbs: ['教科研工作管理', '我的会议']
				},
				component: () => import('@/views/research/rwork/meet/veJkyMeetMy')
			},
			{
				path: '/jkygzgl/veJkyMeetAdmin',
				meta: {
					title: '会议申请管理',
					roles: ['system'],
					breadcrumbs: ['教科研工作管理', '会议申请管理']
				},
				component: () => import('@/views/research/rwork/meet/veJkyMeetAdmin')
			},
			{
				path: '/jkygzgl/veJkyMeetShen',
				meta: {
					title: '会议申请审核',
					roles: ['system'],
					breadcrumbs: ['教科研工作管理', '会议申请审核']
				},
				component: () => import('@/views/research/rwork/meet/veJkyMeetShen')
			},
			{
				path: '/jkygzgl/veJkyMeetRemind',
				meta: {
					title: '会议通知查询',
					roles: ['system'],
					breadcrumbs: ['教科研工作管理', '会议通知查询']
				},
				component: () => import('@/views/research/rwork/meetRemind/veJkyMeetRemind')
			},
	
			{
				path: '/jkygzgl/veJkyMeetSummary',
				meta: {
					title: '会议纪要查询',
					roles: ['system'],
					breadcrumbs: ['教科研工作管理', '会议纪要查询']
				},
				component: () => import('@/views/research/rwork/meetSummary/veJkyMeetSummary')
			},
			{
				path: '/jkygzgl/veJkyGuide',
				meta: {
					title: '研究指导',
					roles: ['system'],
					breadcrumbs: ['教科研工作管理', '研究指导']
				},
				component: () => import('@/views/research/rwork/guide/veJkyGuide')
			},
			{
				path: '/jkygzgl/veJkyResource',
				meta: {
					title: '资源引入',
					roles: ['system'],
					breadcrumbs: ['教科研工作管理', '资源引入']
				},
				component: () => import('@/views/research/rwork/resource/veJkyResource')
			},
			{
				path: '/jkygzgl/veJkyProjectPlan',
				meta: {
					title: '项目计划管理',
					roles: ['system'],
					breadcrumbs: ['教科研工作管理', '项目计划管理']
				},
				component: () => import('@/views/research/rproject/projectPlan/veJkyProjectPlan')
			},
			{
				path: '/jkygzgl/veJkyProjectWork',
				meta: {
					title: '项目工作管理',
					roles: ['system'],
					breadcrumbs: ['教科研工作管理', '项目工作管理']
				},
				component: () => import('@/views/research/rproject/projectWork/veJkyProjectWork')
			},
		]
	},

	{
		path: '/jkyxmgl',
		redirect: '/jkyxmgl/veJkyProjectBase',
		component: Default,
		meta: {
			title: '教科研项目管理',
			breadcrumbs: ['教科研管理', '教科研项目管理'],
			roles: ['system','teacher']
		},
		children: [{
				path: '/jkyxmgl/veJkyProjectBase',
				meta: {
					title: '项目基本信息',
					roles: ['system','teacher'],
					breadcrumbs: ['教科研项目管理', '项目基本信息']
				},
				component: () => import('@/views/research/rproject/project/veJkyProjectBase')
			},
			{
				path: '/jkyxmgl/veJkyProjectShen',
				meta: {
					title: '项目信息审核',
					roles: ['system','teacher'],
					breadcrumbs: ['教科研项目管理', '项目信息审核']
				},
				component: () => import('@/views/research/rproject/project/veJkyProjectShen')
			},
			{
				path: '/jkyxmgl/veJkyProjectUser',
				meta: {
					title: '项目人员管理',
					roles: ['system','teacher'],
					breadcrumbs: ['教科研项目管理', '项目人员管理']
				},
				component: () => import('@/views/research/rproject/project/veJkyProjectUser')
			},
			{
				path: '/jkyxmgl/veJkyUser',
				meta: {
					title: '成果管理',
					roles: ['system','teacher'],
					breadcrumbs: ['教科研项目管理', '成果管理']
				},
				component: () => import('@/views/research/rproject/gain/veJkyGain')
			},
			{
				path: '/jkyxmgl/veJkyProjectCount',
				meta: {
					title: '项目统计',
					roles: ['system','teacher'],
					breadcrumbs: ['教科研项目管理', '项目统计']
				},
				component: () => import('@/views/research/rproject/project/veJkyProjectCount')
			},
			{
				path: '/jkyxmgl/veJkyProjectMy',
				meta: {
					title: '我的项目',
					roles: ['system','teacher'],
					breadcrumbs: ['教科研项目管理', '我的项目']
				},
				component: () => import('@/views/research/rproject/project/veJkyProjectMy')
			},
		]
	},


	{
		path: '/jkylwgl',
		redirect: '/jkylwgl/veJkyPaper',
		component: Default,
		meta: {
			title: '教科研论文管理',
			breadcrumbs: ['教科研管理', '教科研论文管理'],
			roles: ['system','teacher']
		},
		children: [{
				path: '/jkylwgl/veJkyPaper',
				meta: {
					title: '教科研论文管理',
					roles: ['system','teacher'],
					breadcrumbs: ['教科研论文管理', '教科研论文管理']
				},
				component: () => import('@/views/research/rpaper/paper/veJkyPaper')
			},
			{
				path: '/jkylwgl/veJkyPaperCount',
				meta: {
					title: '按部门统计',
					roles: ['system'],
					breadcrumbs: ['教科研论文管理', '按部门统计']
				},
				component: () => import('@/views/research/rpaper/paper/veJkyPaperCount')
			},
		]
	},

	{
		path: '/jkyjfgl',
		redirect: '/jkyjfgl/fundCheckIntroduce',
		component: Default,
		meta: {
			title: '教科研经费管理',
			breadcrumbs: ['教科研管理', '教科研经费管理'],
			roles: ['system','teacher']
		},
		children: [{
				path: '/jkyjfgl/fundCheckIntroduce',
				meta: {
					title: '经费审批说明',
					roles: ['system','teacher'],
					breadcrumbs: ['教科研经费管理', '经费审批说明']
				},
				component: () => import('@/views/research/rfunds/fundCheckIntroduce/fundCheckIntroduce')
			},
			{
				path: '/jkyjfgl/veJkyFundType',
				meta: {
					title: '经费审批类型',
					roles: ['system'],
					breadcrumbs: ['教科研经费管理', '经费审批类型']
				},
				component: () => import('@/views/research/rfunds/fundType/veJkyFundType')
			},
			{
				path: '/jkyjfgl/veJkyFundMy',
				meta: {
					title: '我的预算',
					roles: ['system','teacher'],
					breadcrumbs: ['教科研经费管理', '我的预算']
				},
				component: () => import('@/views/research/rfunds/fund/veJkyFundMy')
			},
			{
				path: '/jkyjfgl/veJkyFundShen',
				meta: {
					title: '预算审批',
					roles: ['system','teacher'],
					breadcrumbs: ['教科研经费管理', '预算审批']
				},
				component: () => import('@/views/research/rfunds/fund/veJkyFundShen')
			},
			{
				path: '/jkyjfgl/veJkyFundClaimMy',
				meta: {
					title: '我的报销',
					roles: ['system','teacher'],
					breadcrumbs: ['教科研经费管理', '我的报销']
				},
				component: () => import('@/views/research/rfunds/fundClaim/veJkyFundClaimMy')
			},
			{
				path: '/jkyjfgl/veJkyFundClaimShen',
				meta: {
					title: '报销审批',
					roles: ['system','teacher'],
					breadcrumbs: ['教科研经费管理', '报销审批']
				},
				component: () => import('@/views/research/rfunds/fundClaim/veJkyFundClaimShen')
			},
			{
				path: '/jkyjfgl/veJkyFundCount',
				meta: {
					title: '经费统计',
					roles: ['system','teacher'],
					breadcrumbs: ['教科研经费管理', '经费统计']
				},
				component: () => import('@/views/research/rfunds/fund/veJkyFundCount')
			},
		]
	},



	{
		path: '/jkycggl',
		redirect: '/jkycggl/veJkyGainKy',
		component: Default,
		meta: {
			title: '科研成果管理',
			breadcrumbs: ['教科研管理', '科研成果管理'],
			roles: ['system','teacher']
		},
		children: [{
				path: '/jkycggl/veJkyGainKy',
				meta: {
					title: '成果管理',
					roles: ['system'],
					breadcrumbs: ['科研成果管理', '经费审批说明']
				},
				component: () => import('@/views/research/rproject/gain/veJkyGainKy')
			},
			{
				path: '/jkycggl/veJkyGainCount',
				meta: {
					title: '成果统计',
					roles: ['system','teacher'],
					breadcrumbs: ['科研成果管理', '成果统计']
				},
				component: () => import('@/views/research/rproject/gain/veJkyGainCount')
			},
		]
	},
	


	{
		path: '/jkyyjsb',
		redirect: '/jkycggl/veJkyGainKy',
		component: Default,
		meta: {
			title: '科研业绩上报',
			breadcrumbs: ['教科研管理', '科研业绩上报'],
			roles: ['system','teacher']
		},
		children: [{
				path: '/jkyyjsb/veJkyGainKy',
				meta: {
					title: '业绩上报',
					roles: ['system','teacher'],
					breadcrumbs: ['科研业绩上报', '业绩上报']
				},
				component: () => import('@/views/research/rpaper/report/veJkyReportMy')
			},
			{
				path: '/jkyyjsb/veJkyGainCount',
				meta: {
					title: '上报管理',
					roles: ['system'],
					breadcrumbs: ['科研业绩上报', '上报管理']
				},
				component: () => import('@/views/research/rpaper/report/veJkyReportAdmin')
			},
			{
				path: '/jkyyjsb/userInfo',
				meta: {
					title: '个人信息',
					roles: ['system','teacher'],
					breadcrumbs: ['科研业绩上报', '个人信息']
				},
				component: () => import('@/views/research/rpaper/report/userInfo')
			},
		]
	},
	
	{
		path: '/basemsg',
		redirect: '/basemsg/templateMng',
		component: Default,
		meta: {
			title: '招生基础设置',
			breadcrumbs: ['招生管理', '招生基础设置'],
			roles: ['system','ceshi']
		},
		children: [{
				path: '/basemsg/templateMng',
				meta: {
					title: '通知书模版',
					roles: ['system','ceshi'],
					breadcrumbs: ['招生基础设置', '通知书模版']
				},
				component: () => import('@/views/enroll/basemsg/templateMng')
			},
			{
				path: '/basemsg/curYearSet',
				meta: {
					title: '招生年份设置',
					roles: ['system','ceshi'],
					breadcrumbs: ['招生基础设置', '招生年份设置']
				},
				component: () => import('@/views/enroll/basemsg/curYearSet')
			},
			{
				path: '/basemsg/curSeasonSet',
				meta: {
					title: '招生季设置',
					roles: ['system','ceshi'],
					breadcrumbs: ['招生基础设置', '招生季设置']
				},
				component: () => import('@/views/enroll/basemsg/curSeasonSet')
			},
			{
				path: '/basemsg/numRuleSet',
				meta: {
					title: '学号生成设置',
					roles: ['system','ceshi'],
					breadcrumbs: ['招生基础设置', '学号生成设置']
				},
				component: () => import('@/views/enroll/basemsg/numRuleSet')
			},
		]
	},

	{
		path: '/enrollplan',
		redirect: '/enrollplan/planMng',
		component: Default,
		meta: {
			title: '招生计划',
			breadcrumbs: ['招生管理', '招生计划'],
			roles: ['system','ceshi']
		},
		children: [{
				path: '/enrollplan/planMng',
				meta: {
					title: '招生计划管理',
					roles: ['system','ceshi'],
					breadcrumbs: ['招生计划', '招生计划管理']
				},
				component: () => import('@/views/enroll/enrollplan/planMng')
			},
			{
				path: '/enrollplan/planQuery',
				meta: {
					title: '招生计划查询',
					roles: ['system','ceshi'],
					breadcrumbs: ['招生计划', '招生计划查询']
				},
				component: () => import('@/views/enroll/enrollplan/planQuery')
			},
		]
	},


	{
		path: '/admission',
		redirect: '/admission/replaceApply',
		component: Default,
		meta: {
			title: '录取管理',
			breadcrumbs: ['招生管理', '录取管理'],
			roles: ['system','ceshi']
		},
		children: [{
				path: '/admission/replaceApply',
				meta: {
					title: '代报名',
					roles: ['system','ceshi'],
					breadcrumbs: ['录取管理', '代报名']
				},
				component: () => import('@/views/enroll/admission/replaceApply')
			},
			{
				path: '/admission/applyCheck',
				meta: {
					title: '网上报名审核',
					roles: ['system','ceshi'],
					breadcrumbs: ['录取管理', '网上报名审核']
				},
				component: () => import('@/views/enroll/admission/applyCheck')
			},
			// {
			// 	path: '/admission/singleExpandCheck',
			// 	meta: {
			// 		title: '单扩报名审核',
			// 		roles: ['system'],
			// 		breadcrumbs: ['录取管理', '单扩报名审核']
			// 	},
			// 	component: () => import('@/views/enroll/admission/singleExpandCheck')
			// },
			{
				path: '/admission/applyMsgMng',
				meta: {
					title: '报名信息管理',
					roles: ['system','ceshi'],
					breadcrumbs: ['录取管理', '报名信息管理']
				},
				component: () => import('@/views/enroll/admission/applyMsgMng')
			},
			{
				path: '/admission/applyMsgQuery',
				meta: {
					title: '报名信息查询',
					roles: ['system','ceshi'],
					breadcrumbs: ['录取管理', '报名信息查询']
				},
				component: () => import('@/views/enroll/admission/applyMsgQuery')
			},
			{
				path: '/admission/admissionPrint',
				meta: {
					title: '录取通知书打印',
					roles: ['system','ceshi'],
					breadcrumbs: ['录取管理', '录取通知书打印']
				},
				component: () => import('@/views/enroll/admission/admissionPrint')
			},
			// {
			// 	path: '/admission/admissionList',
			// 	meta: {
			// 		title: '录取名单',
			// 		roles: ['system'],
			// 		breadcrumbs: ['录取管理', '录取名单']
			// 	},
			// 	component: () => import('@/views/enroll/admission/admissionList')
			// },
			// {
			// 	path: '/admission/showResults',
			// 	meta: {
			// 		title: '成绩公示',
			// 		roles: ['system'],
			// 		breadcrumbs: ['录取管理', '成绩公示']
			// 	},
			// 	component: () => import('@/views/enroll/admission/showResults')
			// },
			// {
			// 	path: '/admission/paymentReview',
			// 	meta: {
			// 		title: '缴费审核',
			// 		roles: ['system'],
			// 		breadcrumbs: ['录取管理', '缴费审核']
			// 	},
			// 	component: () => import('@/views/enroll/admission/paymentReview')
			// },
			// {
			// 	path: '/admission/loanReview',
			// 	meta: {
			// 		title: '贷款审核',
			// 		roles: ['system'],
			// 		breadcrumbs: ['录取管理', '贷款审核']
			// 	},
			// 	component: () => import('@/views/enroll/admission/loanReview')
			// },
		]
	},


	{
		path: '/meet',
		redirect: '/meet/reportMng',
		component: Default,
		meta: {
			title: '迎新管理',
			breadcrumbs: ['招生管理', '迎新管理'],
			roles: ['system','ceshi']
		},
		children: [
			{
				path: '/meet/divideClassMng',
				meta: {
					title: '学生分班管理',
					roles: ['system','ceshi'],
					breadcrumbs: ['迎新管理', '学生分班管理']
				},
				component: () => import('@/views/enroll/meet/divideClassMng')
			},{
				path: '/meet/reportMng',
				meta: {
					title: '新生报到管理',
					roles: ['system','ceshi'],
					breadcrumbs: ['迎新管理', '新生报到管理']
				},
				component: () => import('@/views/enroll/meet/reportMng')
			},
			{
				path: '/meet/reportedMng',
				meta: {
					title: '报到新生管理',
					roles: ['system','ceshi'],
					breadcrumbs: ['迎新管理', '报到新生管理']
				},
				component: () => import('@/views/enroll/meet/reportedMng')
			},
			
			{
				path: '/meet/stuInfoQuery',
				meta: {
					title: '新生信息查询',
					roles: ['system','ceshi'],
					breadcrumbs: ['迎新管理', '新生信息查询']
				},
				component: () => import('@/views/enroll/meet/stuInfoQuery')
			},
			{
				path: '/meet/printReport',
				meta: {
					title: '打印报到卡',
					roles: ['system','ceshi'],
					breadcrumbs: ['迎新管理', '打印报到卡']
				},
				component: () => import('@/views/enroll/meet/printReport')
			},
			{
				path: '/meet/createNum',
				meta: {
					title: '编制学号',
					roles: ['system','ceshi'],
					breadcrumbs: ['迎新管理', '编制学号']
				},
				component: () => import('@/views/enroll/meet/createNum')
			},
			// {
			// 	path: '/meet/reportMessage',
			// 	meta: {
			// 		title: '新生报道信息',
			// 		roles: ['system'],
			// 		breadcrumbs: ['迎新管理', '新生报道信息']
			// 	},
			// 	component: () => import('@/views/enroll/meet/reportMessage')
			// },
			{
				path: '/meet/reportStatistics',
				meta: {
					title: '报到情况统计',
					roles: ['system','ceshi'],
					breadcrumbs: ['迎新管理', '报到情况统计']
				},
				component: () => import('@/views/enroll/meet/reportStatistics')
			},
		]
	},

	
	
	// {
	// 	path: '/studentMaintain',
	// 	redirect: '/studentMaintain/studentImport',
	// 	component: Default,
	// 	meta: {
	// 		title: '学生信息维护',
	// 		breadcrumbs: ['招生管理', '学生信息维护'],
	// 		roles: ['system']
	// 	},
	// 	children: [{
	// 			path: '/studentMaintain/studentImport',
	// 			meta: {
	// 				title: '学生导入',
	// 				roles: ['system'],
	// 				breadcrumbs: ['学生信息维护', '学生导入']
	// 			},
	// 			component: () => import('@/views/enroll/studentMaintain/studentImport')
	// 		},
	// 		{
	// 			path: '/studentMaintain/presortClass',
	// 			meta: {
	// 				title: '招生年份设置',
	// 				roles: ['system'],
	// 				breadcrumbs: ['学生信息维护', '招生年份设置']
	// 			},
	// 			component: () => import('@/views/enroll/studentMaintain/presortClass')
	// 		},
	// 		{
	// 			path: '/studentMaintain/presortDormitory',
	// 			meta: {
	// 				title: '学生信息维护',
	// 				roles: ['system'],
	// 				breadcrumbs: ['学生信息维护', '招生季设置']
	// 			},
	// 			component: () => import('@/views/enroll/studentMaintain/presortDormitory')
	// 		},
	// 	]
	// },
	
	{
		path: '/hqjc',
		redirect: '/hqjc/veHqBgwpfl',
		component: Default,
		meta: {
			title: '后勤基础',
			breadcrumbs: ['后勤管理', '后勤基础'],
			roles: ['system']
		},
		children: [{
				path: '/hqjc/veHqBgwpfl',
				meta: {
					title: '办公物品分类',
					roles: ['system'],
					breadcrumbs: ['后勤基础', '办公物品分类']
				},
				component: () => import('@/views/logistics/base/view/veHqBgwpfl/veHqBgwpfl')
			},
			{
				path: '/hqjc/veHqCangku',
				meta: {
					title: '仓库管理',
					roles: ['system'],
					breadcrumbs: ['后勤基础', '仓库管理']
				},
				component: () => import('@/views/logistics/base/view/veHqCangku/veHqCangku')
			},
		]
	},
	
	
	{
		path: '/bgwp',
		redirect: '/bgwp/veHqWupin',
		component: Default,
		meta: {
			title: '办公物品管理',
			breadcrumbs: ['后勤管理', '办公物品管理'],
			roles: ['system']
		},
		children: [{
				path: '/bgwp/veHqWupin',
				meta: {
					title: '物品管理',
					roles: ['system'],
					breadcrumbs: ['办公物品管理', '物品管理']
				},
				component: () => import('@/views/logistics/good/view/veHqWupin/veHqWupin')
			},
			{
				path: '/bgwp/churuJy',
				meta: {
					title: '借用查询',
					roles: ['system'],
					breadcrumbs: ['办公物品管理', '借用查询']
				},
				component: () => import('@/views/logistics/good/view/veHqChuruku/churuJy')
			},
			{
				path: '/bgwp/churuLy',
				meta: {
					title: '领用查询',
					roles: ['system'],
					breadcrumbs: ['办公物品管理', '领用查询']
				},
				component: () => import('@/views/logistics/good/view/veHqChuruku/churuLy')
			},
			{
				path: '/bgwp/churuBf',
				meta: {
					title: '报废查询',
					roles: ['system'],
					breadcrumbs: ['办公物品管理', '报废查询']
				},
				component: () => import('@/views/logistics/good/view/veHqChuruku/churuBf')
			},
			{
				path: '/bgwp/churuDb',
				meta: {
					title: '调拨查询',
					roles: ['system'],
					breadcrumbs: ['办公物品管理', '调拨查询']
				},
				component: () => import('@/views/logistics/good/view/veHqChuruku/churuDb')
			},
			{
				path: '/bgwp/churuKc',
				meta: {
					title: '库存查询',
					roles: ['system'],
					breadcrumbs: ['办公物品管理', '库存查询']
				},
				component: () => import('@/views/logistics/good/view/veHqChuruku/churuKc')
			},
	
			{
				path: '/bgwp/rukuApply',
				meta: {
					title: '申请记录',
					roles: ['system'],
					breadcrumbs: ['办公物品管理', '申请记录']
				},
				component: () => import('@/views/logistics/good/view/veHqChuruku/rukuApply')
			},
	
			{
				path: '/bgwp/rukuShen',
				meta: {
					title: '物品审批',
					roles: ['system'],
					breadcrumbs: ['办公物品管理', '物品审批']
				},
				component: () => import('@/views/logistics/good/view/veHqChuruku/rukuShen')
			},
		]
	},
	
	
	{
		path: '/dhp',
		redirect: '/dhp/veHqHaopin',
		component: Default,
		meta: {
			title: '低耗品管理',
			breadcrumbs: ['后勤管理', '低耗品管理'],
			roles: ['system']
		},
		children: [{
				path: '/dhp/veHqHaopin',
				meta: {
					title: '低耗品管理',
					roles: ['system'],
					breadcrumbs: ['低耗品管理', '低耗品管理']
				},
				component: () => import('@/views/logistics/bx/view/veHqHaopin/veHqHaopin')
			},
			{
				path: '/dhp/haopinChuku',
				meta: {
					title: '领用查询',
					roles: ['system'],
					breadcrumbs: ['低耗品管理', '领用查询']
				},
				component: () => import('@/views/logistics/bx/view/veHqHaopinCr/haopinChuku')
			},
			{
				path: '/dhp/haopinRuku',
				meta: {
					title: '入库查询',
					roles: ['system'],
					breadcrumbs: ['低耗品管理', '入库查询']
				},
				component: () => import('@/views/logistics/bx/view/veHqHaopinCr/haopinRuku')
			},
			{
				path: '/dhp/haopinCount',
				meta: {
					title: '低耗品统计',
					roles: ['system'],
					breadcrumbs: ['低耗品管理', '低耗品统计']
				},
				component: () => import('@/views/logistics/bx/view/veHqHaopinCr/haopinCount')
			},
		]
	},
	
	
	{
		path: '/bxgl',
		redirect: '/bxgl/baoxiuApply',
		component: Default,
		meta: {
			title: '报修管理',
			breadcrumbs: ['后勤管理', '报修管理'],
			roles: ['system']
		},
		children: [{
				path: '/bxgl/baoxiuApply',
				meta: {
					title: '报修登记',
					roles: ['system'],
					breadcrumbs: ['报修管理', '报修登记']
				},
				component: () => import('@/views/logistics/bx/view/veHqBaoxiu/baoxiuApply')
			},
			{
				path: '/bxgl/baoxiuAudit',
				meta: {
					title: '报修管理',
					roles: ['system'],
					breadcrumbs: ['报修管理', '报修管理']
				},
				component: () => import('@/views/logistics/bx/view/veHqBaoxiu/baoxiuAudit')
			},
			{
				path: '/bxgl/baoxiuMy',
				meta: {
					title: '报修任务',
					roles: ['system'],
					breadcrumbs: ['报修管理', '报修任务']
				},
				component: () => import('@/views/logistics/bx/view/veHqBaoxiu/baoxiuMy')
			},
		]
	},
	
	{
		path: '/wxgl',
		redirect: '/wxgl/veHqWeixiuDj',
		component: Default,
		meta: {
			title: '维修管理',
			breadcrumbs: ['后勤管理', '维修管理'],
			roles: ['system']
		},
		children: [{
				path: '/wxgl/veHqWeixiuDj',
				meta: {
					title: '维修登记',
					roles: ['system'],
					breadcrumbs: ['维修管理', '报修登记']
				},
				component: () => import('@/views/logistics/ct/view/veHqWeixiu/veHqWeixiuDj')
			},
			{
				path: '/wxgl/veHqWeixiu',
				meta: {
					title: '维修管理',
					roles: ['system'],
					breadcrumbs: ['维修管理', '维修管理']
				},
				component: () => import('@/views/logistics/ct/view/veHqWeixiu/veHqWeixiu')
			},
		]
	},
	
	{
		path: '/rcgl',
		redirect: '/rcgl/veHqUser',
		component: Default,
		meta: {
			title: '日常管理',
			breadcrumbs: ['后勤管理', '日常管理'],
			roles: ['system']
		},
		children: [{
				path: '/rcgl/veHqUser',
				meta: {
					title: '人员管理',
					roles: ['system'],
					breadcrumbs: ['日常管理', '人员管理']
				},
				component: () => import('@/views/logistics/base/view/veHqUser/veHqUser')
			},
			{
				path: '/rcgl/veHqYiliao',
				meta: {
					title: '医疗记录',
					roles: ['system'],
					breadcrumbs: ['日常管理', '医疗记录']
				},
				component: () => import('@/views/logistics/base/view/veHqYiliao/veHqYiliao')
			},
			{
				path: '/rcgl/veHqAnbao',
				meta: {
					title: '安保记录',
					roles: ['system'],
					breadcrumbs: ['日常管理', '安保记录']
				},
				component: () => import('@/views/logistics/base/view/veHqAnbao/veHqAnbao')
			},
		]
	},
	
	{
		path: '/ctgl',
		redirect: '/ctgl/veHqCanting',
		component: Default,
		meta: {
			title: '餐厅管理',
			breadcrumbs: ['后勤管理', '餐厅管理'],
			roles: ['system']
		},
		children: [{
				path: '/ctgl/veHqCanting',
				meta: {
					title: '餐厅管理',
					roles: ['system'],
					breadcrumbs: ['餐厅管理', '餐厅管理']
				},
				component: () => import('@/views/logistics/ct/view/veHqCanting/veHqCanting')
			},
			{
				path: '/ctgl/veHqChuangkou',
				meta: {
					title: '窗口管理',
					roles: ['system'],
					breadcrumbs: ['餐厅管理', '窗口管理']
				},
				component: () => import('@/views/logistics/ct/view/veHqChuangkou/veHqChuangkou')
			},
		]
	},
	
	{
		path: '/ctfkgl',
		redirect: '/ctfkgl/veHqItem',
		component: Default,
		meta: {
			title: '餐厅反馈管理',
			breadcrumbs: ['后勤管理', '餐厅反馈管理'],
			roles: ['system']
		},
		children: [{
				path: '/ctfkgl/veHqItem',
				meta: {
					title: '餐厅项目管理',
					roles: ['system'],
					breadcrumbs: ['餐厅反馈管理', '餐厅项目管理']
				},
				component: () => import('@/views/logistics/ct/view/veHqItem/veHqItem')
			},
			{
				path: '/ctfkgl/veHqCheck',
				meta: {
					title: '录入反馈数据',
					roles: ['system'],
					breadcrumbs: ['餐厅反馈管理', '录入反馈数据']
				},
				component: () => import('@/views/logistics/ct/view/veHqCheck/veHqCheck')
			},
		]
	},
	
	
	{
		path: '/zcgl',
		redirect: '/zcgl/veSbzcZcAsset',
		component: Default,
		meta: {
			title: '资产管理',
			breadcrumbs: ['设备资产管理', '资产管理'],
			roles: ['system']
		},
		children: [{
				path: '/zcgl/veSbzcZcAsset',
				meta: {
					title: '固定资产管理',
					roles: ['system'],
					breadcrumbs: ['资产管理', '固定资产管理']
				},
				component: () => import('@/views/sbzc/fund/view/veSbzcZcAsset/veSbzcZcAsset')
			},
			{
				path: '/zcgl/veSbzcZcApply',
				meta: {
					title: '资产借领查询',
					roles: ['system'],
					breadcrumbs: ['资产管理', '资产借领查询']
				},
				component: () => import('@/views/sbzc/fund/view/veSbzcZcApply/veSbzcZcApply')
			},
			{
				path: '/zcgl/veSbzcZcRevert',
				meta: {
					title: '资产归还查询',
					roles: ['system'],
					breadcrumbs: ['资产管理', '资产归还查询']
				},
				component: () => import('@/views/sbzc/fund/view/veSbzcZcRevert/veSbzcZcRevert')
			},
			{
				path: '/zcgl/veSbzcZcRetire',
				meta: {
					title: '资产报废查询',
					roles: ['system'],
					breadcrumbs: ['资产管理', '资产借领查询']
				},
				component: () => import('@/views/sbzc/fund/view/veSbzcZcRetire/veSbzcZcRetire')
			},
			{
				path: '/zcgl/veSbzcZcAllocate',
				meta: {
					title: '资产调拨查询',
					roles: ['system'],
					breadcrumbs: ['资产管理', '资产调拨查询']
				},
				component: () => import('@/views/sbzc/fund/view/veSbzcZcAllocate/veSbzcZcAllocate')
			},
			{
				path: '/zcgl/veSbzcZcMaintain',
				meta: {
					title: '资产维修查询',
					roles: ['system'],
					breadcrumbs: ['资产管理', '资产维修查询']
				},
				component: () => import('@/views/sbzc/fund/view/veSbzcZcMaintain/veSbzcZcMaintain')
			},
			{
				path: '/zcgl/veSbzcZcCategory',
				meta: {
					title: '资产分类设置',
					roles: ['system'],
					breadcrumbs: ['资产管理', '资产分类设置']
				},
				component: () => import('@/views/sbzc/fund/view/veSbzcZcCategory/veSbzcZcCategory')
			},
		]
	},
	
	
	{
		path: '/lygl',
		redirect: '/lygl/veSbzcJzwInfo',
		component: Default,
		meta: {
			title: '楼宇管理',
			breadcrumbs: ['设备资产管理', '楼宇管理'],
			roles: ['system']
		},
		children: [{
				path: '/lygl/veSbzcJzwInfo',
				meta: {
					title: '楼宇综合管理',
					roles: ['system'],
					breadcrumbs: ['资产管理', '楼宇综合管理']
				},
				component: () => import('@/views/sbzc/floor/view/veSbzcJzwInfo/veSbzcJzwInfo')
			},
			{
				path: '/lygl/veSbzcJzwFloor',
				meta: {
					title: '楼层管理',
					roles: ['system'],
					breadcrumbs: ['资产管理', '楼层管理']
				},
				component: () => import('@/views/sbzc/floor/view/veSbzcJzwFloor/veSbzcJzwFloor')
			},
			{
				path: '/lygl/veSbzcJzwRoom',
				meta: {
					title: '房间管理',
					roles: ['system'],
					breadcrumbs: ['资产管理', '房间管理']
				},
				component: () => import('@/views/sbzc/floor/view/veSbzcJzwRoom/veSbzcJzwRoom')
			},
			{
				path: '/lygl/veSbzcJzwInspect',
				meta: {
					title: '检查管理',
					roles: ['system'],
					breadcrumbs: ['资产管理', '检查管理']
				},
				component: () => import('@/views/sbzc/floor/view/veSbzcJzwInspect/veSbzcJzwInspect')
			},
			{
				path: '/lygl/veSbzcJzwMaintain',
				meta: {
					title: '维修记录',
					roles: ['system'],
					breadcrumbs: ['资产管理', '维修记录']
				},
				component: () => import('@/views/sbzc/floor/view/veSbzcJzwMaintain/veSbzcJzwMaintain')
			},
			{
				path: '/lygl/cate',
				meta: {
					title: '分类设置',
					roles: ['system'],
					breadcrumbs: ['资产管理', '分类设置']
				},
				component: () => import('@/views/sbzc/floor/view/cate/cate')
			},
		]
	},
	
	{
		path: '/cdgl',
		redirect: '/cdgl/veSbzcCdInfo',
		component: Default,
		meta: {
			title: '场地管理',
			breadcrumbs: ['设备资产管理', '场地管理'],
			roles: ['system']
		},
		children: [{
				path: '/cdgl/veSbzcCdInfo',
				meta: {
					title: '场地日常管理',
					roles: ['system'],
					breadcrumbs: ['场地管理', '场地日常管理']
				},
				component: () => import('@/views/sbzc/place/view/veSbzcCdInfo/veSbzcCdInfo')
			},
			{
				path: '/cdgl/veSbzcCdCategory',
				meta: {
					title: '场地类别管理',
					roles: ['system'],
					breadcrumbs: ['场地管理', '场地类别管理']
				},
				component: () => import('@/views/sbzc/place/view/veSbzcCdCategory/veSbzcCdCategory')
			},
			{
				path: '/cdgl/veSbzcCdApply',
				meta: {
					title: '场地借用管理',
					roles: ['system'],
					breadcrumbs: ['场地管理', '场地借用管理']
				},
				component: () => import('@/views/sbzc/place/view/veSbzcCdApply/veSbzcCdApply')
			},
			{
				path: '/cdgl/veSbzcCdRevert',
				meta: {
					title: '场地归还管理',
					roles: ['system'],
					breadcrumbs: ['场地管理', '场地归还管理']
				},
				component: () => import('@/views/sbzc/place/view/veSbzcCdRevert/veSbzcCdRevert')
			},
		]
	},
	
	{
		path: '/salary',
		redirect: '/salary/VeHrJingtieManagerList',
		component: Default,
		meta: {
			title: '工资津贴',
			breadcrumbs: ['人事管理系统', '工资津贴'],
			roles: ['system']
		},
		children: [{
				path: '/salary/VeHrJingtieManagerList',
				meta: {
					title: '工资津贴',
					roles: ['system'],
					breadcrumbs: ['工资津贴', '工资津贴']
				},
				component: () => import('@/views/hr/salary/VeHrJingtieManagerList')
			},
			{
				path: '/salary/VeHrEmployeePayrollList',
				meta: {
					title: '工资表',
					roles: ['system'],
					breadcrumbs: ['工资津贴', '工资表']
				},
				component: () => import('@/views/hr/salary/VeHrEmployeePayrollList')
			},
			{
				path: '/salary/VeHrGangweiList',
				meta: {
					title: '岗位管理',
					roles: ['system'],
					breadcrumbs: ['工资津贴', '岗位管理']
				},
				component: () => import('@/views/hr/salary/VeHrGangweiList')
			},
			{
				path: '/salary/VeHrJingtieList',
				meta: {
					title: '工资津贴查询',
					roles: ['system'],
					breadcrumbs: ['工资津贴', '工资津贴查询']
				},
				component: () => import('@/views/hr/salary/VeHrJingtieList')
			},
		]
	},
	
	
	
	{
		path: '/teacher-info',
		redirect: '/teacher-info/BaseTeacherList',
		component: Default,
		meta: {
			title: '教职工管理',
			breadcrumbs: ['人事管理系统', '教职工管理'],
			roles: ['system']
		},
		children: [{
				path: '/teacher-info/BaseTeacherList',
				meta: {
					title: '教职工信息',
					roles: ['system'],
					breadcrumbs: ['教职工管理', '教职工信息']
				},
				component: () => import('@/views/hr/teacher-info/BaseTeacherList')
			},
			{
				path: '/teacher-info/PartyMemberManagement',
				meta: {
					title: '党员管理',
					roles: ['system'],
					breadcrumbs: ['教职工管理', '党员管理']
				},
				component: () => import('@/views/hr/teacher-info/PartyMemberManagement')
			},
			{
				path: '/teacher-info/FamilyInformation',
				meta: {
					title: '家庭信息',
					roles: ['system'],
					breadcrumbs: ['教职工管理', '家庭信息']
				},
				component: () => import('@/views/hr/teacher-info/FamilyInformation')
			},
			{
				path: '/teacher-info/ContractManagement',
				meta: {
					title: '合同信息',
					roles: ['system'],
					breadcrumbs: ['教职工管理', '合同信息']
				},
				component: () => import('@/views/hr/teacher-info/ContractManagement')
			},
		]
	},
	
	
	{
		path: '/kaoqin',
		redirect: '/kaoqin/VeHrKaoqin',
		component: Default,
		meta: {
			title: '考勤考核管理',
			breadcrumbs: ['人事管理系统', '考勤考核管理'],
			roles: ['system']
		},
		children: [{
				path: '/kaoqin/VeHrKaoqin',
				meta: {
					title: '考勤管理',
					roles: ['system'],
					breadcrumbs: ['考勤考核管理', '考勤管理']
				},
				component: () => import('@/views/hr/kaoqin/VeHrKaoqin')
			},
			{
				path: '/kaoqin/VeHrKaohe',
				meta: {
					title: '考核管理',
					roles: ['system'],
					breadcrumbs: ['考勤考核管理', '考核管理']
				},
				component: () => import('@/views/hr/kaoqin/VeHrKaohe')
			},
			{
				path: '/kaoqin/VeHrPerformance',
				meta: {
					title: '绩效考核管理',
					roles: ['system'],
					breadcrumbs: ['考勤考核管理', '绩效考核管理']
				},
				component: () => import('@/views/hr/kaoqin/VeHrPerformance')
			},
		]
	},
	
	
	
	{
		path: '/change',
		redirect: '/change/VeHrChangeManagerList',
		component: Default,
		meta: {
			title: '人事变动管理',
			breadcrumbs: ['人事管理系统', '人事变动管理'],
			roles: ['system']
		},
		children: [{
				path: '/change/VeHrChangeManagerList',
				meta: {
					title: '人事变动管理',
					roles: ['system'],
					breadcrumbs: ['人事变动管理', '人事变动管理']
				},
				component: () => import('@/views/hr/change/VeHrChangeManagerList')
			},
			{
				path: '/change/VeHrChangeTypeList',
				meta: {
					title: '人事变动查询',
					roles: ['system'],
					breadcrumbs: ['人事变动管理', '人事变动查询']
				},
				component: () => import('@/views/hr/change/VeHrChangeTypeList')
			},
		]
	},
	
	
	{
		path: '/peixun',
		redirect: '/peixun/VeHrPeixunApplyList',
		component: Default,
		meta: {
			title: '继续教育培训',
			breadcrumbs: ['人事管理系统', '继续教育培训'],
			roles: ['system']
		},
		children: [{
				path: '/peixun/VeHrPeixunApplyList',
				meta: {
					title: '培训申请',
					roles: ['system'],
					breadcrumbs: ['继续教育培训', '培训申请']
				},
				component: () => import('@/views/hr/peixun/VeHrPeixunApplyList')
			},
			{
				path: '/peixun/VeHrPeixunSearchList',
				meta: {
					title: '培训查询',
					roles: ['system'],
					breadcrumbs: ['继续教育培训', '培训查询']
				},
				component: () => import('@/views/hr/peixun/VeHrPeixunSearchList')
			},
			{
				path: '/peixun/VeHrPeixunReviewList',
				meta: {
					title: '培训审核',
					roles: ['system'],
					breadcrumbs: ['继续教育培训', '培训审核']
				},
				component: () => import('@/views/hr/peixun/VeHrPeixunReviewList')
			},
		]
	},
	{
		path: '/shet',
		redirect: '/shet/veStuReservationApply',
		component: Default,
		meta: {
			title: '社团管理',
			breadcrumbs: ['学工系统', '社团管理'],
			// roles: ['system']
		},
		children: [{
				path: '/shet/veStuReservationApply',
				meta: {
					breadcrumbs: ['社团管理', '场地预约'],
					title: '场地预约',
					roles: ['system','student'],
				},
				component: () => import('@/views/stuManage/shet/view/veStuReservation/veStuReservationApply')
			},
			{
				path: '/shet/veStuReservationShen',
				meta: {
					title: '预约审核',
					breadcrumbs: ['社团管理', '预约审核'],
					roles: ['system','student'],
				},
				component: () => import('@/views/stuManage/shet/view/veStuReservation/veStuReservationShen')
			},
			{
				path: '/shet/veStuAssocFundsStandard',
				meta: {
					breadcrumbs: ['社团管理', '社团缴费标准'],
					roles: ['system'],
					title: '社团缴费标准',
				},
				component: () => import(
					'@/views/stuManage/shet/view/veStuAssocFundsStandard/veStuAssocFundsStandard')
			},
			{
				path: '/shet/veStuAssocInfo',
				meta: {
					title: '社团创建/注销',
					roles: ['system'],
					breadcrumbs: ['社团管理', '社团创建/注销']
				},
				component: () => import('@/views/stuManage/shet/view/veStuAssocInfo/veStuAssocInfo')
			},
			{
				path: '/shet/veStuAssocInfoAp',
				meta: {
					title: '社团信息',
					roles: ['system','student'],
					breadcrumbs: ['社团管理', '社团信息']
				},
				component: () => import('@/views/stuManage/shet/view/veStuAssocInfo/veStuAssocInfoAp')
			},
			{
				path: '/shet/veStuAssocLabel',
				meta: {
					title: '社团标签管理',
					roles: ['system','student'],
					breadcrumbs: ['社团管理', '社团标签管理']
				},
				component: () => import('@/views/stuManage/shet/view/veStuAssocLabel/veStuAssocLabel')
			},
			{
				path: '/shet/veStuAssocActivityType',
				meta: {
					title: '社团活动类型',
					roles: ['system','student'],
					breadcrumbs: ['社团管理', '社团活动类型']
				},
				component: () => import(
					'@/views/stuManage/shet/view/veStuAssocActivityType/veStuAssocActivityType')
			},
			{
				path: '/shet/veStuAssocKj',
				meta: {
					title: '社团空间',
					roles: ['system'],
					breadcrumbs: ['社团管理', '社团空间']
				},
				component: () => import('@/views/stuManage/shet/view/veStuAssoc/veStuAssocKj')
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
				//角色管理
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
		children: [
			{
				//字典管理
				path: '/dictionary/dictionaryManagement/index',
				meta: {
					title: '字典管理',
					roles: ['system'],
					breadcrumbs: ['数字字典管理', '字典管理'],
				},
				name: 'dictionaryManagement',
				component: () => import('@/views/common/dictionaryManagement/DictList')
			},
		]
	},
	
	{ // 首页默认菜单
		path: '/notificationAnnouncement',
		component: Default,
		meta: {
			title: '系统管理',
			breadcrumbs: ['系统管理', '通知公告'],
			roles: ['system','student','teacher','bzr']
		},
		redirect: '/notificationAnnouncement/operationLog/index',
		children: [
			{
				//通知管理
				path: '/notificationAnnouncement/notice/index',
				meta: {
					title: '通知管理',
					roles: ['system','student','teacher','bzr','ceshi'],
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
					roles: ['system','student','teacher','bzr'],
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
			roles: ['system','bzr']
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
					roles: ['system','bzr'],
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
					roles: ['system','bzr'],
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
  if(localStorage.getItem('menus')){
  	  let menus=JSON.parse(localStorage.getItem('menus'));
  	  menus.forEach((e) => {
  	  	if (e.children && e.children.length > 0) {
  	  		e.children.forEach((ite) => {
  	  			if (ite.children) {
  	  				ite.children.forEach((ii) => {
  	  					if (ii.path === to.path) {
  	  					  store.commit('sidebar/SET_SIDEOBJ', ite);
  						  store.commit('sidebar/SET_NAVSELECTEDKEY', [ite.name]);
  						  store.commit('sidebar/SET_NAVITEMS', e.children);
  						  store.commit('sidebar/SET_SIDESELECTEDKEY', [ii.name]);
  						  store.commit('sidebar/SET_MENUSELECTEDKEY', [e.name]);
  	  					}
  	  				});
  	  			}
  	  		});
  	  	}else{
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