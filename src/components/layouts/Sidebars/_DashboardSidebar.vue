<template>

	<!-- Main Sidebar -->
	<a-layout-sider collapsible class="sider-primary" breakpoint="lg" collapsed-width="0" width="250px"
		:collapsed="sidebarCollapsed" @collapse="$emit('toggleSidebar', ! sidebarCollapsed)" :trigger="null"
		:class="['ant-layout-sider-' + sidebarColor, 'ant-layout-sider-' + sidebarTheme]" theme="light"
		:style="{ backgroundColor: 'transparent',}">
		<!-- Sidebar Navigation Menu -->
		<a-menu theme="light" mode="inline" :open-keys="openKeys" @openChange="onOpenChange">
			
			<a-menu-item key="baseData" @click="handleSingleMenuItemClick">
				<router-link to="/baseData">
					<span class="icon">
						<a-icon type="appstore" theme="filled" class="m-0" />
					</span>
					<span class="label">基础信息管理</span>
				</router-link>
			</a-menu-item>
			<a-sub-menu key="xjManage" style="padding: 0;">
				<span slot="title">
					<span class="icon">
						<a-icon type="contacts" theme="filled" class="m-0" />
					</span>
					<span class="label">学籍管理</span>
				</span>
				<a-menu-item-group>
					<a-menu-item>
						<router-link to="/xjManage/veBaseStudent/veBaseStudentXj">
							<span class="label">学籍注册</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/xjManage/veBaseStudent/veBaseStudent">
							<span class="label">学生信息维护</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/xjManage/veStuXjAudit/veStuXjAudit">
							<span class="label">审核学籍修改申请 </span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/xjManage/xjManage/stuChange">
							<span class="label">学籍异动 </span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/xjManage/veStuSemester/veStuSemester">
							<span class="label">学期注册 </span>
						</router-link>
					</a-menu-item>
				</a-menu-item-group>
			</a-sub-menu>
			<a-sub-menu key="bzr" style="padding: 0;">
				<span slot="title">
					<span class="icon">
						<a-icon type="crown" theme="filled" class="m-0" />
					</span>
					<span class="label">班主任管理</span>
				</span>
				<a-menu-item-group>
					<a-menu-item>
						<router-link to="/bzr/veBaseBanjiBzr/bzrNow">
							<span class="label">当前班主任查询</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/bzr/veBaseBanjiBzr/bzrHis">
							<span class="label">班主任历史记录</span>
						</router-link>
					</a-menu-item>
				</a-menu-item-group>
			</a-sub-menu>
			<a-sub-menu key="pyfangan" style="padding: 0;">
				<span slot="title">
					<span class="icon">
						<a-icon type="read" theme="filled" class="m-0" />
					</span>
					<span class="label">培养方案</span>
				</span>
				<a-menu-item-group>
					<a-menu-item>
						<router-link to="/pyfangan/pyfa">
							<span class="label">培养方案</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/pyfangan/kcjh">
							<span class="label">教师选课</span>
						</router-link>
					</a-menu-item>
				</a-menu-item-group>
			</a-sub-menu>
			<a-menu-item key="jxrw" @click="handleSingleMenuItemClick">
				<router-link to="/pyfangan/jxrw/mission">
					<span class="icon">
						<a-icon type="flag" theme="filled" class="m-0" />
					</span>
					<span class="label">教学任务</span>
				</router-link>
			</a-menu-item>
			<a-sub-menu key="courses" style="padding: 0;">
				<span slot="title">
					<span class="icon">
						<a-icon type="carry-out" theme="filled" class="m-0" />
					</span>
					<span class="label">排课管理</span>
				</span>
				<a-menu-item-group>
					<a-menu-item>
						<router-link to="/courses/manual">
							<span class="label">手动排课</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/courses/voluntarily">
							<span class="label">自动排课</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/courses/parameter">
							<span class="label">排课参数设置</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/courses/set">
							<span class="label">排课节设置</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/courses/school">
							<span class="label">全校不排课时间</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/courses/classroom">
							<span class="label">教室不排课时间</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/courses/teacher">
							<span class="label">教师不排课时间</span>
						</router-link>
					</a-menu-item>
				</a-menu-item-group>
			</a-sub-menu>
			<a-sub-menu key="courseManagement" style="padding: 0;">
				<span slot="title">
					<span class="icon">
						<a-icon type="interaction" theme="filled" class="m-0" />
					</span>
					<span class="label">调课管理</span>
				</span>
				<a-menu-item-group>
					<a-menu-item>
						<router-link to="/courseManagement/administrative">
							<span class="label">行政调课</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/courseManagement/applyFor">
							<span class="label">调课申请</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/courseManagement/audit">
							<span class="label">调课审批</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/courseManagement/record">
							<span class="label">我的调课记录</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/courseManagement/statistics">
							<span class="label">调课统计</span>
						</router-link>
					</a-menu-item>
				</a-menu-item-group>
			</a-sub-menu>
			
			<a-sub-menu key="kwgl" style="padding: 0;">
				<span slot="title">
					<span class="icon">
						<a-icon type="read" theme="filled" class="m-0" />
					</span>
					<span class="label">考务管理</span>
				</span>
				<a-menu-item-group>
					<a-menu-item>
						<router-link to="/kwgl/kssjdgl">
							<span class="label">基础管理</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/kwgl/kaoshi">
							<span class="label">考试管理</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/kwgl/bukao">
							<span class="label">补考管理</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/kwgl/qingkao">
							<span class="label">清考管理</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/kwgl/chengji">
							<span class="label">成绩管理</span>
						</router-link>
					</a-menu-item>
				</a-menu-item-group>
			</a-sub-menu>
			<a-sub-menu key="kqManage" style="padding: 0;">
				<span slot="title">
					<span class="icon">
						<a-icon type="schedule" theme="filled" class="m-0" />
					</span>
					<span class="label">考勤管理</span>
				</span>
				<a-menu-item-group>
					<a-menu-item>
						<router-link to="/kqManage/veStuCheckType/veStuCheckType">
							<span class="label">考勤类型</span>
						</router-link>
					</a-menu-item>
					<!-- <a-menu-item>
						<router-link to="/kqManage/veStuCheck/veStuCheck">
							<span class="label">考勤管理</span>
						</router-link>
					</a-menu-item> -->
					<a-menu-item>
						<router-link to="/kqManage/veStuLeave/veStuLeave">
							<span class="label">请假审批</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/kqManage/veStuCheck/veStuCheckBj">
							<span class="label">班级考勤 </span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/kqManage/veStuCheck/veStuCheckKt">
							<span class="label">课堂考勤 </span>
						</router-link>
					</a-menu-item>
				</a-menu-item-group>
			</a-sub-menu>
			<a-sub-menu key="bonusPenalty" style="padding: 0;">
				<span slot="title">
					<span class="icon">
						<a-icon type="star" theme="filled" class="m-0" />
					</span>
					<span class="label">奖惩管理</span>
				</span>
				<a-menu-item-group>
					<a-menu-item>
						<router-link to="/bonusPenalty/veStuRewardType/veStuRewardType">
							<span class="label">奖励类型</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/bonusPenalty/veStuPunishType/veStuPunishType">
							<span class="label">惩罚类型</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/bonusPenalty/veStuReward/veStuReward">
							<span class="label">奖励管理</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/bonusPenalty/veStuPunish/veStuPunish">
							<span class="label">惩罚管理 </span>
						</router-link>
					</a-menu-item>
				</a-menu-item-group>
			</a-sub-menu>
			<!-- 中美不需要模块 2025-01-10 begin-->
			<a-sub-menu key="sjxj" style="padding: 0;">
				<span slot="title">
					<span class="icon">
						<a-icon type="star" theme="filled" class="m-0" />
					</span>
					<span class="label">奖助学金管理</span>
				</span>
				<a-menu-item-group>
					<a-menu-item>
						<router-link to="/sjxj/veStuScholarshipType/veStuScholarshipType">
							<span class="label">奖学金类型</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/sjxj/veStuStipendType/veStuStipendType">
							<span class="label">助学金类型</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/sjxj/veStuScholarship/veStuScholarship">
							<span class="label">奖学金管理</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/sjxj/veStuStipend/veStuStipendMy">
							<span class="label">助学金管理 </span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/sjxj/veStuStipend/veStuStipendShen">
							<span class="label">助学金审核 </span>
						</router-link>
					</a-menu-item>
				</a-menu-item-group>
			</a-sub-menu>
			<a-sub-menu key="knsgl" style="padding: 0;">
				<span slot="title">
					<span class="icon">
						<a-icon type="star" theme="filled" class="m-0" />
					</span>
					<span class="label">困难生管理</span>
				</span>
				<a-menu-item-group>
					<a-menu-item>
						<router-link to="/knsgl/veBaseStudent/stuKns">
							<span class="label">困难生管理</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/knsgl/veBaseStudent/stuKnsCount">
							<span class="label">困难生统计</span>
						</router-link>
					</a-menu-item>
				</a-menu-item-group>
			</a-sub-menu>
			<a-sub-menu key="qgjxgl" style="padding: 0;">
				<span slot="title">
					<span class="icon">
						<a-icon type="star" theme="filled" class="m-0" />
					</span>
					<span class="label">勤工俭学管理</span>
				</span>
				<a-menu-item-group>
					<a-menu-item>
						<router-link to="/qgjxgl/hqStuPosition/hqStuPosition">
							<span class="label">职位管理</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/qgjxgl/hqStuPositionApply/positionApply">
							<span class="label">勤工俭学</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/qgjxgl/hqStuPositionApply/positionShen">
							<span class="label">职位申请审批</span>
						</router-link>
					</a-menu-item>
				</a-menu-item-group>
			</a-sub-menu>
			<!-- 中美不需要模块 2025-01-10 end-->
			<a-sub-menu key="zhszpc" style="padding: 0;">
				<span slot="title">
					<span class="icon">
						<a-icon type="crown" theme="filled" class="m-0" />
					</span>
					<span class="label">综合素质评测</span>
				</span>
				<a-menu-item-group>
					<a-menu-item>
						<router-link to="/zhszpc/veStuIdx/veStuIdx">
							<span class="label">指标体系设置</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/zhszpc/veStuIdxScoreConfig/veStuIdxScoreConfig">
							<span class="label">指标分值设置</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/zhszpc/veStuIdxPeriod/veStuPeriod">
							<span class="label">指标周期设置</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/zhszpc/veStuIdxStuScore/veStuIdxStuScore">
							<span class="label">评测结果查看</span>
						</router-link>
					</a-menu-item>
				</a-menu-item-group>
			</a-sub-menu>
			<a-sub-menu key="yygl" style="padding: 0;">
				<span slot="title">
					<span class="icon">
						<a-icon type="crown" theme="filled" class="m-0" />
					</span>
					<span class="label">预约管理</span>
				</span>
				<a-menu-item-group>
					<a-menu-item>
						<router-link to="/yygl/veStuYyproject/veStuYyproject">
							<span class="label">预约项目管理</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/yygl/veStuYystu/veStuYystu">
							<span class="label">学生预约情况</span>
						</router-link>
					</a-menu-item>
				</a-menu-item-group>
			</a-sub-menu>
			<a-sub-menu key="zhsz" style="padding: 0;">
				<span slot="title">
					<span class="icon">
						<a-icon type="safety-certificate" theme="filled" class="m-0" />
					</span>
					<span class="label">综合素质管理</span>
				</span>
				<a-menu-item-group>
					<a-menu-item>
						<router-link to="/zhsz/menu/moral">
							<span class="label">德育工作管理</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/zhsz/veStuMoralCount/veStuMoralCount">
							<span class="label">班级德育评比管理</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/zhsz/menu/check">
							<span class="label">行为规范管理</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/zhsz/menu/weishen">
							<span class="label">卫生检查管理</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/zhsz/menu/wenhua">
							<span class="label">文体活动管理</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/zhsz/veStuCaucus/veStuCaucus">
							<span class="label">党团活动</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/zhsz/veStuHealthReport/veStuHealthReport">
							<span class="label">体质健康</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/tcgl/view/VeStuHealthScoreCount">
							<span class="label">体测管理</span>
						</router-link>
					</a-menu-item>
				</a-menu-item-group>
			</a-sub-menu>
			<a-sub-menu key="xljk" style="padding: 0;">
				<span slot="title">
					<span class="icon">
						<a-icon type="heart" theme="filled" class="m-0" />
					</span>
					<span class="label">心理健康管理</span>
				</span>
				<a-menu-item-group>
					<a-menu-item>
						<router-link to="/xljk/hqStuHealthKnowledgeType/hqStuHealthKnowledgeType">
							<span class="label">健康知识类型</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/xljk/hqStuHealthKnowledge/hqStuHealthKnowledge">
							<span class="label">心理健康知识</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/xljk/hqStuHealthQuestion/hqStuHealthQuestion">
							<span class="label">心理健康测试</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/xljk/hqStuHealthActivities/hqStuHealthActivities">
							<span class="label">心理健康活动</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/xljk/hqStuHealthUser/hqStuHealthUser">
							<span class="label">心理健康记录</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/xljk/veStuHealthAsk/veStuHealthAskMy">
							<span class="label">我的心理咨询</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/xljk/veStuHealthAsk/veStuHealthAskAdmin">
							<span class="label">心理咨询管理</span>
						</router-link>
					</a-menu-item>
				</a-menu-item-group>
			</a-sub-menu>
			
			<a-sub-menu key="jis" style="padding: 0;">
				<span slot="title">
					<span class="icon">
						<a-icon type="like" theme="filled" class="m-0" />
					</span>
					<span class="label">学生评定</span>
				</span>
				<a-menu-item-group>
					<a-menu-item>
						<router-link to="/jis/veStuEvaluationConfig/veStuEvaluationConfig">
							<span class="label">功能配置</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/jis/veStuIntroduction/veStuIntroduction">
							<span class="label">自我鉴定</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/jis/veStuEvaluation/veStuEvaluationAdmin">
							<span class="label">老师评定</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/jis/veStuEvaluation/veStuEvaluationShow">
							<span class="label">评定查询 </span>
						</router-link>
					</a-menu-item>
				</a-menu-item-group>
			</a-sub-menu>
			<a-sub-menu key="biye" style="padding: 0;">
				<span slot="title">
					<span class="icon">
						<a-icon type="crown" theme="filled" class="m-0" />
					</span>
					<span class="label">毕业管理</span>
				</span>
				<a-menu-item-group>
					<a-menu-item>
						<router-link to="/biye/veStuGraduation/veStuGraduationClas">
							<span class="label">毕业班级设置</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/biye/veStuGraduationByzbhRule/veStuGraduationByzbhRule">
							<span class="label">毕业证号规则设置</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/biye/veStuGraduationAuditInfo/biyeAuditBzr">
							<span class="label">班主任审核</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/biye/veStuGraduationAuditInfo/biyeAuditCw">
							<span class="label">财务审核</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/biye/veStuGraduationAuditInfo/biyeAuditCjy">
							<span class="label">成绩审核</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/biye/veStuGraduationAuditInfo/biyeAuditXsc">
							<span class="label">学生处审核</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/biye/view/veStuGraduationAuditConfig/veStuGraduationAuditConfig">
							<span class="label">毕业审核设置</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/biye/view/veStuGraduation/graduationYj">
							<span class="label">应届毕业生录入</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/biye/view/veStuGraduation/graduationWj">
							<span class="label">往届毕业生管理</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/biye/view/veStuGraduation/graduationAdmin">
							<span class="label">毕业生信息管理</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/biye/view/veStuGraduationYxbys/veStuGraduationYxbys">
							<span class="label">优秀毕业生管理</span>
						</router-link>
					</a-menu-item>
				</a-menu-item-group>
			</a-sub-menu>
			
			<a-sub-menu key="sCount" style="padding: 0;">
				<span slot="title">
					<span class="icon">
						<a-icon type="crown" theme="filled" class="m-0" />
					</span>
					<span class="label">统计管理</span>
				</span>
				<a-menu-item-group>
					<a-menu-item>
						<router-link to="/xjManage/studentCount">
							<span class="label">学生信息统计</span>
						</router-link>
					</a-menu-item>
					<!-- <a-menu-item>
						<router-link to="/kqtj/stuAttendCount">
							<span class="label">考勤统计</span>
						</router-link>
					</a-menu-item> -->
					<a-menu-item>
						<router-link to="/kqManage/rewardCount">
							<span class="label">奖惩统计</span>
						</router-link>
					</a-menu-item>
				</a-menu-item-group>
			</a-sub-menu>
			
			
			
			<a-sub-menu key="jxzygl" style="padding: 0;">
				<span slot="title">
					<span class="icon">
						<a-icon type="crown" theme="filled" class="m-0" />
					</span>
					<span class="label">教学资源管理</span>
				</span>
				<a-menu-item-group>
					<a-menu-item>
						<router-link to="/jxzygl/kckgl">
							<span class="label">课程库管理</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/jxzygl/jxcdgl">
							<span class="label">教学场地管理</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/jxzygl/jcgl">
							<span class="label">教材管理</span>
						</router-link>
					</a-menu-item>
				</a-menu-item-group>
			</a-sub-menu>
			
			<a-sub-menu key="jxgzgl" style="padding: 0;">
				<span slot="title">
					<span class="icon">
						<a-icon type="crown" theme="filled" class="m-0" />
					</span>
					<span class="label">教学工作管理</span>
				</span>
				<a-menu-item-group>
					<a-menu-item>
						<router-link to="/jxgzgl/VeJwTeachactList">
							<span class="label">教学活动</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/jxgzgl/gzzj">
							<span class="label">工作总结</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/jxgzgl/jxrz">
							<span class="label">教学日志</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/jxgzgl/bjgg">
							<span class="label">班级公告</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/jxgzgl/skjh">
							<span class="label">授课计划</span>
						</router-link>
					</a-menu-item>
				</a-menu-item-group>
			</a-sub-menu>
			
			<a-sub-menu key="zyjn" style="padding: 0;">
				<span slot="title">
					<span class="icon">
						<a-icon type="crown" theme="filled" class="m-0" />
					</span>
					<span class="label">职业技能</span>
				</span>
				<a-menu-item-group>
					<a-menu-item>
						<router-link to="/zyjn/jsgl">
							<span class="label">竞赛管理</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/zyjn/zyrzgl">
							<span class="label">职业认证管理</span>
						</router-link>
					</a-menu-item>
				</a-menu-item-group>
			</a-sub-menu>
			
			<a-sub-menu key="tjcx" style="padding: 0;">
				<span slot="title">
					<span class="icon">
						<a-icon type="crown" theme="filled" class="m-0" />
					</span>
					<span class="label">统计查询</span>
				</span>
				<a-menu-item-group>
					<a-menu-item>
						<router-link to="/tjcx/VeJwTjKeshiList">
							<span class="label">教师课时统计查询</span>
						</router-link>
					</a-menu-item>
					<!-- <a-menu-item>
						<router-link to="/tjcx/jskqtj">
							<span class="label">教师考勤统计查询</span>
						</router-link>
					</a-menu-item> -->
					<a-menu-item>
						<router-link to="/tjcx/xscjtj">
							<span class="label">学生成绩统计查询</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/tjcx/jxzytj">
							<span class="label">教学资源统计查询</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/tjcx/kbcx">
							<span class="label">课表查询</span>
						</router-link>
					</a-menu-item>
				</a-menu-item-group>
			</a-sub-menu>
			<!-- 中美不需要模块  begin -->
			<a-sub-menu key="dorm" style="padding: 0;">
				<span slot="title">
					<span class="icon">
						<a-icon type="contacts" theme="filled" class="m-0" />
					</span>
					<span class="label">宿舍基础管理</span>
				</span>
				<a-menu-item-group>
					<a-menu-item>
						<router-link to="/dorm/floorMng">
							<span class="label">楼层管理</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/dorm/buildMng">
							<span class="label">宿舍楼管理</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/dorm/dormMng">
							<span class="label">宿舍管理 </span>
						</router-link>
					</a-menu-item>
				</a-menu-item-group>
			</a-sub-menu>
			<a-sub-menu key="dormProperty" style="padding: 0;">
				<span slot="title">
					<span class="icon">
						<a-icon type="contacts" theme="filled" class="m-0" />
					</span>
					<span class="label">宿舍资产管理</span>
				</span>
				<a-menu-item-group>
					<a-menu-item>
						<router-link to="/dormProperty/assetTypeMng">
							<span class="label">资产类别管理</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/dormProperty/chooseBuild?type=1">
							<span class="label">资产管理</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/dormProperty/assetQuery">
							<span class="label">资产查询</span>
						</router-link>
					</a-menu-item>
				</a-menu-item-group>
			</a-sub-menu>
			<a-sub-menu key="dormsw" style="padding: 0;">
				<span slot="title">
					<span class="icon">
						<a-icon type="contacts" theme="filled" class="m-0" />
					</span>
					<span class="label">宿务管理</span>
				</span>
				<a-menu-item-group>
					<a-menu-item>
						<router-link to="/dormsw/chooseBuildIndex">
							<span class="label">宿舍分配</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/dormsw/dormModifyApply">
							<span class="label">宿舍变更</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/dormsw/prinConditionMng">
							<span class="label">违纪情况管理</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/dormsw/dormVisitorMng">
							<span class="label">宿舍访客管理</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/dormProperty/chooseBuild">
							<span class="label">宿舍清空管理</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/dormProperty/chooseBuild?type=4">
							<span class="label">宿舍维修管理</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/dormsw/translateApprove">
							<span class="label">留宿审核</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/dormsw/notice">
							<span class="label">通知公告</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/dorm/dormJudge">
							<span class="label">宿舍卫生评比</span>
						</router-link>
					</a-menu-item>
				</a-menu-item-group>
			</a-sub-menu>
			<a-sub-menu key="dormLodging" style="padding: 0;">
				<span slot="title">
					<span class="icon">
						<a-icon type="contacts" theme="filled" class="m-0" />
					</span>
					<span class="label">住宿考勤</span>
				</span>
				<a-menu-item-group>
					<a-menu-item>
						<router-link to="/dormLodging/attenSetting">
							<span class="label">考勤设置</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/dormLodging/attenMng">
							<span class="label">考勤管理</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/dormLodging/prinTypeMng">
							<span class="label">违纪类型管理</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/dormLodging/prinMng">
							<span class="label">违纪管理</span>
						</router-link>
					</a-menu-item>
				</a-menu-item-group>
			</a-sub-menu>
			<a-sub-menu key="dormInstitution" style="padding: 0;">
				<span slot="title">
					<span class="icon">
						<a-icon type="contacts" theme="filled" class="m-0" />
					</span>
					<span class="label">制度管理</span>
				</span>
				<a-menu-item-group>
					<a-menu-item>
						<router-link to="/dormInstitution/ruleQuery">
							<span class="label">制度查询</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/dormInstitution/dormRuleType">
							<span class="label">寝室制度类别</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/dormInstitution/ruleMng">
							<span class="label">制度管理</span>
						</router-link>
					</a-menu-item>
				</a-menu-item-group>
			</a-sub-menu>
			<a-sub-menu key="dormStatistics" style="padding: 0;">
				<span slot="title">
					<span class="icon">
						<a-icon type="contacts" theme="filled" class="m-0" />
					</span>
					<span class="label">宿舍统计</span>
				</span>
				<a-menu-item-group>
					<a-menu-item>
						<router-link to="/dormStatistics/dormVolume">
							<span class="label">宿舍容量统计</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/dormStatistics/stuCount">
							<span class="label">宿舍学生统计</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/dormStatistics/attenCount">
							<span class="label">考勤统计</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/dormStatistics/prinCount">
							<span class="label">违纪统计</span>
						</router-link>
					</a-menu-item>
				</a-menu-item-group>
			</a-sub-menu>
	
			<a-sub-menu key="jkyjc" style="padding: 0;">
				<span slot="title">
					<span class="icon">
						<a-icon type="crown" theme="filled" class="m-0" />
					</span>
					<span class="label">教科研基础</span>
				</span>
				<a-menu-item-group>
					<a-menu-item>
						<router-link to="/jkyjc/veJkyOrganize">
							<span class="label">科研组管理</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/jkyjc/levelList">
							<span class="label">项目级别管理</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/jkyjc/veJkyCategory">
							<span class="label">项目类型管理</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/jkyjc/veJkyUser">
							<span class="label">人员管理</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/jkyjc/veJkyAdmin">
							<span class="label">经费审核人</span>
						</router-link>
					</a-menu-item>
				</a-menu-item-group>
			</a-sub-menu>
			
			
			<a-sub-menu key="jkygzgl" style="padding: 0;">
				<span slot="title">
					<span class="icon">
						<a-icon type="crown" theme="filled" class="m-0" />
					</span>
					<span class="label">教科研工作管理</span>
				</span>
				<a-menu-item-group>
					<a-menu-item>
						<router-link to="/jkygzgl/veJkyMeetPlace">
							<span class="label">会议场地管理</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/jkygzgl/veJkyMeetMy">
							<span class="label">我的会议</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/jkygzgl/veJkyMeetAdmin">
							<span class="label">会议申请管理</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/jkygzgl/veJkyMeetShen">
							<span class="label">会议申请审核</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/jkygzgl/veJkyMeetRemind">
							<span class="label">会议通知查询</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/jkygzgl/veJkyMeetSummary">
							<span class="label">会议纪要查询</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/jkygzgl/veJkyGuide">
							<span class="label">研究指导</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/jkygzgl/veJkyResource">
							<span class="label">资源引入</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/jkygzgl/veJkyProjectPlan">
							<span class="label">项目计划管理</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/jkygzgl/veJkyProjectWork">
							<span class="label">项目工作管理</span>
						</router-link>
					</a-menu-item>
				</a-menu-item-group>
			</a-sub-menu>
			
			
			<a-sub-menu key="jkyxmgl" style="padding: 0;">
				<span slot="title">
					<span class="icon">
						<a-icon type="crown" theme="filled" class="m-0" />
					</span>
					<span class="label">教科研项目管理</span>
				</span>
				<a-menu-item-group>
					<a-menu-item>
						<router-link to="/jkyxmgl/veJkyProjectBase">
							<span class="label">项目基本信息</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/jkyxmgl/veJkyProjectShen">
							<span class="label">项目信息审核</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/jkyxmgl/veJkyProjectUser">
							<span class="label">项目人员管理</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/jkyxmgl/veJkyUser">
							<span class="label">成果管理</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/jkyxmgl/veJkyProjectCount">
							<span class="label">项目统计</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/jkyxmgl/veJkyProjectMy">
							<span class="label">我的项目</span>
						</router-link>
					</a-menu-item>
				</a-menu-item-group>
			</a-sub-menu>
			
			
			<a-sub-menu key="jkylwgl" style="padding: 0;">
				<span slot="title">
					<span class="icon">
						<a-icon type="crown" theme="filled" class="m-0" />
					</span>
					<span class="label">教科研论文管理</span>
				</span>
				<a-menu-item-group>
					<a-menu-item>
						<router-link to="/jkylwgl/veJkyPaper">
							<span class="label">论文管理</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/jkylwgl/veJkyPaperCount">
							<span class="label">按部门统计</span>
						</router-link>
					</a-menu-item>
				</a-menu-item-group>
			</a-sub-menu>
			
			
			<a-sub-menu key="jkyjfgl" style="padding: 0;">
				<span slot="title">
					<span class="icon">
						<a-icon type="crown" theme="filled" class="m-0" />
					</span>
					<span class="label">教科研经费管理</span>
				</span>
				<a-menu-item-group>
					<a-menu-item>
						<router-link to="/jkyjfgl/fundCheckIntroduce">
							<span class="label">经费审批说明</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/jkyjfgl/veJkyFundType">
							<span class="label">经费审批类型</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/jkyjfgl/veJkyFundMy">
							<span class="label">我的预算</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/jkyjfgl/veJkyFundShen">
							<span class="label">预算审批</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/jkyjfgl/veJkyFundClaimMy">
							<span class="label">我的报销</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/jkyjfgl/veJkyFundClaimShen">
							<span class="label">报销审批</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/jkyjfgl/veJkyFundCount">
							<span class="label">经费统计</span>
						</router-link>
					</a-menu-item>
				</a-menu-item-group>
			</a-sub-menu>
			
			
			<a-sub-menu key="jkycggl" style="padding: 0;">
				<span slot="title">
					<span class="icon">
						<a-icon type="crown" theme="filled" class="m-0" />
					</span>
					<span class="label">科研成果管理</span>
				</span>
				<a-menu-item-group>
					<a-menu-item>
						<router-link to="/jkycggl/veJkyGainKy">
							<span class="label">成果管理</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/jkycggl/veJkyGainCount">
							<span class="label">成果统计</span>
						</router-link>
					</a-menu-item>
				</a-menu-item-group>
			</a-sub-menu>
			
			<a-sub-menu key="jkyyjsb" style="padding: 0;">
				<span slot="title">
					<span class="icon">
						<a-icon type="crown" theme="filled" class="m-0" />
					</span>
					<span class="label">科研业绩上报</span>
				</span>
				<a-menu-item-group>
					<a-menu-item>
						<router-link to="/jkyyjsb/veJkyGainKy">
							<span class="label">业绩上报</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/jkyyjsb/veJkyGainCount">
							<span class="label">上报管理</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/jkyyjsb/userInfo">
							<span class="label">个人信息</span>
						</router-link>
					</a-menu-item>
				</a-menu-item-group>
			</a-sub-menu>
			
			
			<!-- ---- -->
			
			
			
			<a-sub-menu key="enrollplan" style="padding: 0;">
				<span slot="title">
					<span class="icon">
						<a-icon type="crown" theme="filled" class="m-0" />
					</span>
					<span class="label">招生计划</span>
				</span>
				<a-menu-item-group>
					<a-menu-item>
						<router-link to="/enrollplan/planMng">
							<span class="label">招生计划管理</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/enrollplan/planQuery">
							<span class="label">招生计划查询</span>
						</router-link>
					</a-menu-item>
				</a-menu-item-group>
			</a-sub-menu>
			
			
			<a-sub-menu key="admission" style="padding: 0;">
				<span slot="title">
					<span class="icon">
						<a-icon type="crown" theme="filled" class="m-0" />
					</span>
					<span class="label">录取管理</span>
				</span>
				<a-menu-item-group>
					<a-menu-item>
						<router-link to="/admission/replaceApply">
							<span class="label">代报名</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/admission/applyCheck">
							<span class="label">网上报名审核</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/admission/singleExpandCheck">
							<span class="label">单扩报名审核</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/admission/applyMsgMng">
							<span class="label">报名信息管理</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/admission/applyMsgQuery">
							<span class="label">报名信息查询</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/admission/admissionPrint">
							<span class="label">录取通知书打印</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/admission/admissionList">
							<span class="label">录取名单</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/admission/showResults">
							<span class="label">成绩公示</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/admission/paymentReview">
							<span class="label">缴费审核</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/admission/loanReview">
							<span class="label">贷款审核</span>
						</router-link>
					</a-menu-item>
				</a-menu-item-group>
			</a-sub-menu>
			
			<a-sub-menu key="meet" style="padding: 0;">
				<span slot="title">
					<span class="icon">
						<a-icon type="crown" theme="filled" class="m-0" />
					</span>
					<span class="label">迎新管理</span>
				</span>
				<a-menu-item-group>
					<a-menu-item>
						<router-link to="/meet/reportMng">
							<span class="label">新生报到管理</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/meet/reportedMng">
							<span class="label">报到新生管理</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/meet/divideClassMng">
							<span class="label">学生分班管理</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/meet/stuInfoQuery">
							<span class="label">新生信息查询</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/meet/printReport">
							<span class="label">打印报到卡</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/meet/createNum">
							<span class="label">编制学号</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/meet/reportMessage">
							<span class="label">新生报道信息</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/meet/reportStatistics">
							<span class="label">报到情况统计</span>
						</router-link>
					</a-menu-item>
				</a-menu-item-group>
			</a-sub-menu>
			
			
			<a-sub-menu key="basemsg" style="padding: 0;">
				<span slot="title">
					<span class="icon">
						<a-icon type="crown" theme="filled" class="m-0" />
					</span>
					<span class="label">招生基础设置</span>
				</span>
				<a-menu-item-group>
					<a-menu-item>
						<router-link to="/basemsg/templateMng">
							<span class="label">通知书模版</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/basemsg/curYearSet">
							<span class="label">招生年份设置</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/basemsg/curSeasonSet">
							<span class="label">招生季设置</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/basemsg/numRuleSet">
							<span class="label">学号生成设置</span>
						</router-link>
					</a-menu-item>
				</a-menu-item-group>
			</a-sub-menu>
			
			
			<a-sub-menu key="studentMaintain" style="padding: 0;">
				<span slot="title">
					<span class="icon">
						<a-icon type="crown" theme="filled" class="m-0" />
					</span>
					<span class="label">学生信息维护</span>
				</span>
				<a-menu-item-group>
					<a-menu-item>
						<router-link to="/studentMaintain/studentImport">
							<span class="label">学生导入</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/studentMaintain/presortClass">
							<span class="label">招生年份设置</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/studentMaintain/presortDormitory">
							<span class="label">招生季设置</span>
						</router-link>
					</a-menu-item>
				</a-menu-item-group>
			</a-sub-menu>
			
			
			<a-sub-menu key="common" style="padding: 0;">
				<span slot="title">
					<span class="icon">
						<a-icon type="setting" theme="filled" class="m-0" />
					</span>
					<span class="label">系统管理</span>
				</span>
				<a-menu-item-group>
					<a-menu-item>
						<router-link to="/common/operationLog/index">
							<span class="label">用户管理</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/common/menuConfiguration/index">
							<span class="label">角色管理</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/common/permissionManage/index">
							<span class="label">菜单管理</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/common/dictionaryManagement/index">
							<span class="label">字典管理</span>
						</router-link>
					</a-menu-item>
					<a-menu-item>
						<router-link to="/common/departmentManagement/index">
							<span class="label">部门管理</span>
						</router-link>
					</a-menu-item>
				</a-menu-item-group>
			</a-sub-menu>
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

			// Main sidebar theme : light, white, dark.
			sidebarTheme: {
				type: String,
				default: "light",
			},
		},
		data() {
			return {
				rootSubmenuKeys: ['studentMaintain','basemsg','meet','enrollplan'
				,'admission','jkycggl','jkyyjsb','jkylwgl','jkyxmgl','yygl','jkygzgl',
				'qgjxgl','baseData','common', 'basicsData', 'kqManage', 'xjManage',
				'pyfangan','jxrw','courses','courseManagement','kwgl','bonusPenalty','zhsz',
				'jis','knsgl','sjxj','biye','bzr','sCount','zhszpc','jxzygl','xljk',
				'jxgzgl','zyjn','tjcx','jkyjc','dormProperty','dormsw','dormLodging',
				'dorm','dormInstitution','dormStatistics'],
				openKeys: this.$route.meta.sidebarMap,
			}
		},
		watch: {
			sidebarCollapsed(val) {
				console.log("获取值", val)
			}
		},
		methods: {
			onOpenChange(openKeys) {
				const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1);
				if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
					this.openKeys = openKeys;
				} else {
					this.openKeys = latestOpenKey ? [latestOpenKey] : [];
				}
			},
			handleSingleMenuItemClick() {
				console.log(this.openKeys);
				// this.openKeys = [];
			}
		},
	})
</script>
<style lang="less" scoped>
	/deep/.ant-menu-submenu-title,
	/deep/.ant-menu-item {
		font-size: 16px !important;
	}
</style>