<template>
	<div>
		<a-menu style="width: 100%" :default-selected-keys="['1']" :open-keys.sync="openKeys" mode="inline"
			@click="handleClick">

<!-- 			<a-sub-menu key="sub1" @titleClick="titleClick">
				<span slot="title">
					<span>首页</span>
				</span>
				<a-col :span="12">
					<router-link to="/dashboard/go">
						<a-tag color="#E9EDF6" :class="ascertain == 1 ? 'menu-item item-1 up' : 'menu-item item-1'"
							@click='changeSelected(1)'>
							<img src="@/assets/icon/cl-xx.png">
							首页
						</a-tag>
					</router-link>
				</a-col>
			</a-sub-menu> -->

			<a-sub-menu key="sub2" @titleClick="titleClick">
				<span slot="title">
					<span>奖惩管理</span>
				</span>
				<a-col :span="12">
					<router-link to="/reward-publish/HqHrJiangliTypeList">
						<a-tag color="#E9EDF6" :class="ascertain == 7 ? 'menu-item item-1 up' : 'menu-item item-1'"
							@click='changeSelected(7)'>
							<img src="@/assets/icon/yinzhangguanli.png">
							奖惩分类
						</a-tag>
					</router-link>
				</a-col>
				<a-col :span="12">
					<router-link to="/reward-publish/HqHrJiangLi">
						<a-tag color="#E9EDF6" :class="ascertain == 8 ? 'menu-item item-2 up' : 'menu-item item-2'"
							@click='changeSelected(8)'>
							<img src="@/assets/icon/yinzhangguanli.png">
							奖励管理
						</a-tag>
					</router-link>
				</a-col>
				<a-col :span="12">
					<router-link to="/reward-publish/HqHrChengFa">
						<a-tag color="#E9EDF6" :class="ascertain == 9 ? 'menu-item item-1 up' : 'menu-item item-1'"
							@click='changeSelected(9)'>
							<img src="@/assets/icon/liuchengshezhi.png">
							惩罚管理
						</a-tag>
					</router-link>
				</a-col>
			</a-sub-menu>

			<a-sub-menu key="sub3" @titleClick="titleClick">
				<span slot="title">
					<span>工资津贴</span>
				</span>
				<a-col :span="12">
					<router-link to="/salary/VeHrJingtieManagerList">
						<a-tag color="#E9EDF6" :class="ascertain == 10 ? 'menu-item item-1 up' : 'menu-item item-1'"
							@click='changeSelected(10)'>
							<img src="@/assets/icon/cl-xx.png">
							工资津贴
						</a-tag>
					</router-link>
				</a-col>
				<a-col :span="12">
					<router-link to="/salary/VeHrEmployeePayrollList">
						<a-tag color="#E9EDF6" :class="ascertain == 11 ? 'menu-item item-2 up' : 'menu-item item-2'"
							@click='changeSelected(11)'>
							<img src="@/assets/icon/cl-sy.png">
							工资表
						</a-tag>
					</router-link>
				</a-col>
				<a-col :span="12">
					<router-link to="/salary/VeHrGangweiList">
						<a-tag color="#E9EDF6" :class="ascertain == 12 ? 'menu-item item-1 up' : 'menu-item item-1'"
							@click='changeSelected(12)'>
							<img src="@/assets/icon/cl-wh.png">
							岗位管理
						</a-tag>
					</router-link>
				</a-col>
				<a-col :span="12">
					<router-link to="/salary/VeHrJingtieList">
						<a-tag color="#E9EDF6" :class="ascertain == 12 ? 'menu-item item-1 up' : 'menu-item item-1'"
							@click='changeSelected(12)'>
							<img src="@/assets/icon/cl-wh.png">
							工资津贴查询
						</a-tag>
					</router-link>
				</a-col>
			</a-sub-menu>

			<a-sub-menu key="sub4" @titleClick="titleClick">
				<span slot="title">
					<span>教职工管理</span>
				</span>
				<a-col :span="12">
					<router-link to="/teacher-info/BaseTeacherList">
						<a-tag color="#E9EDF6" :class="ascertain == 13 ? 'menu-item item-1 up' : 'menu-item item-1'"
							@click='changeSelected(13)'>
							<img src="@/assets/icon/cl-xx.png">
							教职工信息
						</a-tag>
					</router-link>
				</a-col>
				<a-col :span="12">
					<router-link to="/teacher-info/PartyMemberManagement">
						<a-tag color="#E9EDF6" :class="ascertain == 14 ? 'menu-item item-2 up' : 'menu-item item-2'"
							@click='changeSelected(14)'>
							<img src="@/assets/icon/cl-sy.png">
							党员管理
						</a-tag>
					</router-link>
				</a-col>
				<a-col :span="12">
					<router-link to="/teacher-info/FamilyInformation">
						<a-tag color="#E9EDF6" :class="ascertain == 15 ? 'menu-item item-1 up' : 'menu-item item-1'"
							@click='changeSelected(15)'>
							<img src="@/assets/icon/cl-wh.png">
							家庭信息
						</a-tag>
					</router-link>
				</a-col>
				<a-col :span="12">
					<router-link to="/teacher-info/ContractManagement">
						<a-tag color="#E9EDF6" :class="ascertain == 16 ? 'menu-item item-2 up' : 'menu-item item-2'"
							@click='changeSelected(16)'>
							<img src="@/assets/icon/cl-bx.png">
							合同信息
						</a-tag>
					</router-link>
				</a-col>
			</a-sub-menu>

			<a-sub-menu key="sub5" @titleClick="titleClick">
				<span slot="title">
					<span>考勤考核管理</span>
				</span>
				<a-col :span="12">
					<router-link to="/kaoqin/VeHrKaoqin">
						<a-tag color="#E9EDF6" :class="ascertain == 20 ? 'menu-item item-1 up' : 'menu-item item-1'"
							@click='changeSelected(20)'>
							<img src="@/assets/icon/hy-cd.png">
							考勤管理
						</a-tag>
					</router-link>
				</a-col>
				<a-col :span="12">
					<router-link to="/kaoqin/VeHrKaohe">
						<a-tag color="#E9EDF6" :class="ascertain == 21 ? 'menu-item item-2 up' : 'menu-item item-2'"
							@click='changeSelected(21)'>
							<img src="@/assets/icon/hy-sq.png">
							考核管理
						</a-tag>
					</router-link>
				</a-col>
				<a-col :span="12">
					<router-link to="/kaoqin/VeHrPerformance">
						<a-tag color="#E9EDF6" :class="ascertain == 22 ? 'menu-item item-1 up' : 'menu-item item-1'"
							@click='changeSelected(22)'>
							<img src="@/assets/icon/gz-gl.png">
							绩效考勤管理
						</a-tag>
					</router-link>
				</a-col>
			</a-sub-menu>

			<a-sub-menu key="sub6" @titleClick="titleClick">
				<span slot="title">
					<span>人事变动管理</span>
				</span>
				<a-col :span="12">
					<router-link to="/change/VeHrChangeManagerList">
						<a-tag color="#E9EDF6" :class="ascertain == 28 ? 'menu-item item-1 up' : 'menu-item item-1'"
							@click='changeSelected(28)'>
							<img src="@/assets/icon/gz-gl.png">
							人事变动管理
						</a-tag>
					</router-link>
				</a-col>
				<a-col :span="12">
					<router-link to="/change/VeHrChangeTypeList">
						<a-tag color="#E9EDF6" :class="ascertain == 29 ? 'menu-item item-2 up' : 'menu-item item-2'"
							@click='changeSelected(29)'>
							<img src="@/assets/icon/cl-sy.png">
							人事变动查询
						</a-tag>
					</router-link>
				</a-col>
			</a-sub-menu>

			<a-sub-menu key="sub7" @titleClick="titleClick">
				<span slot="title">
					<span>继续教育培训</span>
				</span>
				<a-col :span="12">
					<router-link to="/peixun/VeHrPeixunApplyList">
						<a-tag color="#E9EDF6" :class="ascertain == 28 ? 'menu-item item-1 up' : 'menu-item item-1'"
							@click='changeSelected(28)'>
							<img src="@/assets/icon/gz-gl.png">
							培训申请
						</a-tag>
					</router-link>
				</a-col>
				<a-col :span="12">
					<router-link to="/peixun/VeHrPeixunSearchList">
						<a-tag color="#E9EDF6" :class="ascertain == 29 ? 'menu-item item-2 up' : 'menu-item item-2'"
							@click='changeSelected(29)'>
							<img src="@/assets/icon/cl-sy.png">
							培训查询
						</a-tag>
					</router-link>
				</a-col>
				<a-col :span="12">
					<router-link to="/peixun/VeHrPeixunReviewList">
						<a-tag color="#E9EDF6" :class="ascertain == 29 ? 'menu-item item-2 up' : 'menu-item item-2'"
							@click='changeSelected(29)'>
							<img src="@/assets/icon/cl-sy.png">
							培训审核
						</a-tag>
					</router-link>
				</a-col>
			</a-sub-menu>

<!-- 			<a-sub-menu key="sub8" @titleClick="titleClick">
				<span slot="title">
					<span>在线开发</span>
				</span>
				<a-col :span="12">
					<router-link to="/online/copyform/:code">
						<a-tag color="#E9EDF6" :class="ascertain == 28 ? 'menu-item item-1 up' : 'menu-item item-1'"
							@click='changeSelected(28)'>
							<img src="@/assets/icon/gz-gl.png">
							AUTO复制表单
						</a-tag>
					</router-link>
				</a-col>
				<a-col :span="12">
					<router-link to="/online/cgformErpList/:cod">
						<a-tag color="#E9EDF6" :class="ascertain == 29 ? 'menu-item item-2 up' : 'menu-item item-2'"
							@click='changeSelected(29)'>
							<img src="@/assets/icon/cl-sy.png">
							AUTO在线表单ERP
						</a-tag>
					</router-link>
				</a-col>
				<a-col :span="12">
					<router-link to="/online/cgformTabList/:code">
						<a-tag color="#E9EDF6" :class="ascertain == 29 ? 'menu-item item-2 up' : 'menu-item item-2'"
							@click='changeSelected(29)'>
							<img src="@/assets/icon/cl-sy.png">
							AUTO在线表单TAB
						</a-tag>
					</router-link>
				</a-col>
				<a-col :span="12">
					<router-link to="/online/cgreport/:code">
						<a-tag color="#E9EDF6" :class="ascertain == 29 ? 'menu-item item-2 up' : 'menu-item item-2'"
							@click='changeSelected(29)'>
							<img src="@/assets/icon/cl-sy.png">
							AUTO在线报表
						</a-tag>
					</router-link>
				</a-col>
				<a-col :span="12">
					<router-link to="/online/cgformTreeList/:code">
						<a-tag color="#E9EDF6" :class="ascertain == 29 ? 'menu-item item-2 up' : 'menu-item item-2'"
							@click='changeSelected(29)'>
							<img src="@/assets/icon/cl-sy.png">
							AUTO树表单列表
						</a-tag>
					</router-link>
				</a-col>
				<a-col :span="12">
					<router-link to="/online/cgformList/:code">
						<a-tag color="#E9EDF6" :class="ascertain == 29 ? 'menu-item item-2 up' : 'menu-item item-2'"
							@click='changeSelected(29)'>
							<img src="@/assets/icon/cl-sy.png">
							AUTO在线表单
						</a-tag>
					</router-link>
				</a-col>
				<a-col :span="12">
					<router-link to="/online/cgformInnerTableList/:code">
						<a-tag color="#E9EDF6" :class="ascertain == 29 ? 'menu-item item-2 up' : 'menu-item item-2'"
							@click='changeSelected(29)'>
							<img src="@/assets/icon/cl-sy.png">
							AUTO在线内嵌子表
						</a-tag>
					</router-link>
				</a-col>
			</a-sub-menu> -->

		</a-menu>
	</div>
</template>

<script>
	import {
		Icon
	} from 'ant-design-vue';

	const IconFont = Icon.createFromIconfontCN({
		scriptUrl: '//at.alicdn.com/t/font_2390461_s0h69rf096s.js',
	});

	export default {
		props: ['menu'],
		mounted() {
			console.log(this.menu)
		},
		data() {
			return {
				current: ['desktop'],
				openKeys: ['sub1', 'sub2', 'sub3', 'sub4', 'sub5', 'sub6', 'sub7', 'sub8'],
				ascertain: 0
			};
		},
		watch: {
			openKeys(val) {
				// console.log('openKeys', val);
			},
		},
		methods: {
			handleClick(e) {
				// console.log('click', e);
			},
			titleClick(e) {
				// console.log('titleClick', e);
			},
			changeSelected(index) {
				this.ascertain = index
			}
		},
		components: {
			IconFont,
		},
	};
</script>

<style>
	.sub-box {
		padding: 2px 10px !important;
	}

	.sub-box .ant-tag-has-color,
	.ant-tag-has-color a,
	.ant-tag-has-color a:hover,
	.ant-tag-has-color .anticon-close,
	.ant-tag-has-color .anticon-close:hover {
		padding: 10px 5px;
		color: black;
		font-size: 16px;
	}

	.menu-item {
		color: #666666 !important;
		width: 95% !important;
		height: 40px !important;
		line-height: 28px !important;
		/* margin-top: 5px !important; */
		padding-top: 5px !important;
		border-radius: 1px !important;
		border: 1px dashed #CCCCCC !important;
		font-size: 16px !important;
		font-weight: 400 !important;
		margin: 5px 15px !important;
	}

	/* 	.menu-item {
		color: #666666;
		width: 135px;
		height: 40px;
		line-height: 28px;
		margin-top: 5px;
		padding-top: 5px;
		border-radius: 1px;
		border: 1px dashed #CCCCCC;
		font-size: 16px;
		font-weight: 400;
	} */

	.left-menu-top {
		height: 50px;
	}

	.left-menu-click {
		width: 100px !important;
		font-size: 20px;
		font-family: "MicrosoftYaHei";
		color: #A5AFB8;
		text-align: center;
	}

	.menu-item:hover {
		cursor: pointer !important;
		border: 1px dashed #8FB4FB !important;
	}

	.item-1 {
		margin-left: 15px;
	}

	.item-2 {
		margin-left: 5px;
	}

	.ant-menu-submenu-title {
		height: 20px !important;
		line-height: 20px !important;
		font-weight: 14px !important;
		padding-left: 16px !important;
		color: #A0A0A0;
		font-weight: bold;
	}

	.ant-menu-submenu-title span {
		font-size: 15px;
		font-family: "MicrosoftYaHei";
		color: #666666;
	}

	.ant-menu-item {
		width: 84px;
	}

	.up {
		color: #0000FF;
	}
</style>
