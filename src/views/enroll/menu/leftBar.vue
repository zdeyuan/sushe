<template>
	<div class="leftBarBox">
		<!--    <a-menu mode="horizontal" class="left-menu-top">
      <a-menu-item key="desktop" class="left-menu-click">桌面</a-menu-item>
      <a-menu-item key="defined" class="left-menu-click">定义</a-menu-item>
      <a-menu-item key="this.$message.success" class="left-menu-click">提醒</a-menu-item>
    </a-menu> -->
		<!-- <hr class="top-hr"> -->
		<div style="height: 4vh;"></div>
		<a-menu style="width: 320px" :defaultSelectedKeys="['1']" :defaultOpenKeys="[]" :openKeys='openKeysMsg'
			mode="inline" v-if='Loging == false' @click="handleClick" @openChange="onOpenChange">
			<a-menu-item key="sub0">
				<router-link to="/enroll/index">
					<span class="homePage">首页</span>
				</router-link>
			</a-menu-item>
			<a-sub-menu key="sub1" @titleClick="titleClick" v-if="judgeShowMenuTop('/enroll/planMng')">
				<span slot="title">
					<span>招生计划</span>
				</span>
				<a-col :span="12" v-if="judgeShowMenu('/enroll/planMng')">
					<router-link to="/enroll/planMng">
						<a-tag color="#E9EDF6" :class="ascertain == 1 ? 'menu-item item-1 up' : 'menu-item item-1'"
							@click='changeSelected(1)'>
							<img src="@/assets/img/planMng.png" class="icon-img" />
							招生计划管理
						</a-tag>
					</router-link>
				</a-col>
				<a-col :span="12" v-if="judgeShowMenu('/enroll/planQuery')">
					<router-link to="/enroll/planQuery">
						<a-tag color="#E9EDF6" :class="ascertain == 2 ? 'menu-item item-2 up' : 'menu-item item-2'"
							@click='changeSelected(2)'>
							<img src="@/assets/img/planQuery.png" class="icon-img" />
							招生计划查询
						</a-tag>
					</router-link>
				</a-col>
			</a-sub-menu>

			<a-sub-menu key="sub2" @titleClick="titleClick" v-if="judgeShowMenuTop('/enroll/replaceApply')">
				<span slot="title">
					<span>录取管理</span>
				</span>
				<a-col :span="12" v-if="judgeShowMenu('/enroll/replaceApply')">
					<router-link to="/enroll/replaceApply">
						<a-tag color="#E9EDF6" :class="ascertain == 3 ? 'menu-item item-1 up' : 'menu-item item-1'"
							@click='changeSelected(3)'>
							<img src="@/assets/img/replace.png" class="icon-img" />
							代报名
						</a-tag>
					</router-link>
				</a-col>
				<a-col :span="12" v-if="judgeShowMenu('/enroll/applyCheck')">
					<router-link to="/enroll/applyCheck">
						<a-tag color="#E9EDF6" :class="ascertain == 4 ? 'menu-item item-2 up' : 'menu-item item-2'"
							@click='changeSelected(4)'>
							<img src="@/assets/img/applyCheck.png" class="icon-img" />
							网上报名审核
						</a-tag>
					</router-link>
				</a-col>
				<a-col :span="12" v-if="judgeShowMenu('/enroll/singleExpandCheck')">
					<router-link to="/enroll/singleExpandCheck">
						<a-tag color="#E9EDF6" :class="ascertain == 994 ? 'menu-item item-2 up' : 'menu-item item-2'"
							@click='changeSelected(994)'>
							<img src="@/assets/img/applyCheck.png" class="icon-img" />
							单扩报名审核
						</a-tag>
					</router-link>
				</a-col>
				<a-col :span="12" v-if="judgeShowMenu('/enroll/applyMsgMng')">
					<router-link to="/enroll/applyMsgMng">
						<a-tag color="#E9EDF6" :class="ascertain == 5 ? 'menu-item item-1 up' : 'menu-item item-1'"
							@click='changeSelected(5)'>
							<img src="@/assets/img/applyMng.png" class="icon-img" />
							报名信息管理
						</a-tag>
					</router-link>
				</a-col>
				<a-col :span="12" v-if="judgeShowMenu('/enroll/applyMsgQuery')">
					<router-link to="/enroll/applyMsgQuery">
						<a-tag color="#E9EDF6" :class="ascertain == 6 ? 'menu-item item-2 up' : 'menu-item item-2'"
							@click='changeSelected(6)'>
							<img src="@/assets/img/applyQuery.png" class="icon-img" />
							报名信息查询
						</a-tag>
					</router-link>
				</a-col>
				<a-col :span="12" v-if="judgeShowMenu('/enroll/admissionPrint')">
					<router-link to="/enroll/admissionPrint">
						<a-tag color="#E9EDF6" :class="ascertain == 7 ? 'menu-item item-1 up' : 'menu-item item-1'"
							@click='changeSelected(7)'>
							<img src="@/assets/img/admissionPrint.png" class="icon-img" />
							录取通知打印
						</a-tag>
					</router-link>
				</a-col>
<!-- 				<a-col :span="12" v-if="judgeShowMenu('/enroll/onlineApply')">
					<router-link to="/enroll/onlineApply">
						<a-tag color="#E9EDF6" :class="ascertain == 28 ? 'menu-item item-2 up' : 'menu-item item-2'"
							@click='changeSelected(28)'>
							<img src="@/assets/img/replace.png" class="icon-img" />
							网上报名
						</a-tag>
					</router-link>
				</a-col> -->
				<a-col :span="12" v-if="judgeShowMenu('/enroll/admissionList')">
					<router-link to="/enroll/admissionList">
						<a-tag color="#E9EDF6" :class="ascertain == 6622 ? 'menu-item item-2 up' : 'menu-item item-2'"
							@click='changeSelected(6622)'>
							<img src="@/assets/img/replace.png" class="icon-img" />
							录取名单
						</a-tag>
					</router-link>
				</a-col>
				<a-col :span="12" v-if="judgeShowMenu('/enroll/showResults')">
					<router-link to="/enroll/showResults">
						<a-tag color="#E9EDF6" :class="ascertain == 777 ? 'menu-item item-2 up' : 'menu-item item-2'"
							@click='changeSelected(777)'>
							<img src="@/assets/img/replace.png" class="icon-img" />
							成绩公示
						</a-tag>
					</router-link>
				</a-col>
				<a-col :span="12" v-if="judgeShowMenu('/enroll/paymentReview')">
					<router-link to="/enroll/paymentReview">
						<a-tag color="#E9EDF6" :class="ascertain == 2514 ? 'menu-item item-2 up' : 'menu-item item-2'"
							@click='changeSelected(2514)'>
							<img src="@/assets/img/replace.png" class="icon-img" />
							缴费审核
						</a-tag>
					</router-link>
				</a-col>
				<a-col :span="12" v-if="judgeShowMenu('/enroll/loanReview')">
					<router-link to="/enroll/loanReview">
						<a-tag color="#E9EDF6" :class="ascertain == 2513 ? 'menu-item item-2 up' : 'menu-item item-2'"
							@click='changeSelected(2513)'>
							<img src="@/assets/img/replace.png" class="icon-img" />
							贷款审核
						</a-tag>
					</router-link>
				</a-col>
			</a-sub-menu>

			<a-sub-menu key="sub3" @titleClick="titleClick" v-if="judgeShowMenuTop('/enroll/reportMng')">
				<span slot="title">
					<span>迎新管理</span>
				</span>
				<a-col :span="12" v-if="judgeShowMenu('/enroll/reportMng')">
					<router-link to="/enroll/reportMng">
						<a-tag color="#E9EDF6" :class="ascertain == 8 ? 'menu-item item-1 up' : 'menu-item item-1'"
							@click='changeSelected(8)'>
							<img src="@/assets/img/report.png" class="icon-img" />
							新生报到管理
						</a-tag>
					</router-link>
				</a-col>

				<a-col :span="12" v-if="judgeShowMenu('/enroll/reportedMng')">
					<router-link to="/enroll/reportedMng">
						<a-tag color="#E9EDF6" :class="ascertain == 9 ? 'menu-item item-2 up' : 'menu-item item-2'"
							@click='changeSelected(9)'>
							<img src="@/assets/img/reported.png" class="icon-img" />
							报到新生管理
						</a-tag>
					</router-link>
				</a-col>
				<a-col :span="12" v-if="judgeShowMenu('/enroll/divideClassMng')">
					<router-link to="/enroll/divideClassMng">
						<a-tag color="#E9EDF6" :class="ascertain == 10 ? 'menu-item item-1 up' : 'menu-item item-1'"
							@click='changeSelected(10)'>
							<img src="@/assets/img/class.png" class="icon-img" />
							学生分班管理
						</a-tag>
					</router-link>
				</a-col>
				<a-col :span="12" v-if="judgeShowMenu('/enroll/stuInfoQuery')">
					<router-link to="/enroll/stuInfoQuery">
						<a-tag color="#E9EDF6" :class="ascertain == 11 ? 'menu-item item-2 up' : 'menu-item item-2'"
							@click='changeSelected(11)'>
							<img src="@/assets/img/new.png" class="icon-img" />
							新生信息查询
						</a-tag>
					</router-link>
				</a-col>
				<a-col :span="12" v-if="judgeShowMenu('/enroll/printReport')">
					<router-link to="/enroll/printReport">
						<a-tag color="#E9EDF6" :class="ascertain == 12 ? 'menu-item item-1 up' : 'menu-item item-1'"
							@click='changeSelected(12)'>
							<img src="@/assets/img/reportPrint.png" class="icon-img" />
							打印报到卡
						</a-tag>
					</router-link>
				</a-col>
				<a-col :span="12" v-if="judgeShowMenu('/enroll/createNum')">
					<router-link to="/enroll/createNum">
						<a-tag color="#E9EDF6" :class="ascertain == 13 ? 'menu-item item-2 up' : 'menu-item item-2'"
							@click='changeSelected(13)'>
							<img src="@/assets/img/num.png" class="icon-img" />
							编制学号
						</a-tag>
					</router-link>
				</a-col>
				<a-col :span="12" v-if="judgeShowMenu('/enroll/reportMessage')">
					<router-link to="/enroll/reportMessage">
						<a-tag color="#E9EDF6" :class="ascertain == 14 ? 'menu-item item-1 up' : 'menu-item item-1'"
							@click='changeSelected(14)'>
							<img src="@/assets/img/num.png" class="icon-img" />
							新生报到信息
						</a-tag>
					</router-link>
				</a-col>
				<a-col :span="12" v-if="judgeShowMenu('/enroll/reportStatistics')">
					<router-link to="/enroll/reportStatistics">
						<a-tag color="#E9EDF6" :class="ascertain == 15 ? 'menu-item item-1 up' : 'menu-item item-1'"
							@click='changeSelected(15)'>
							<img src="@/assets/img/num.png" class="icon-img" />
							报道情况统计
						</a-tag>
					</router-link>
				</a-col>

			</a-sub-menu>

			<a-sub-menu key="sub4" @titleClick="titleClick" v-if="judgeShowMenuTop('/enroll/templateMng')">
				<span slot="title">
					<span>基础设置</span>
				</span>
				<a-col :span="12" v-if="judgeShowMenu('/enroll/templateMng')">
					<router-link to="/enroll/templateMng">
						<a-tag color="#E9EDF6" :class="ascertain == 16 ? 'menu-item item-1 up' : 'menu-item item-1'"
							@click='changeSelected(16)'>
							<img src="@/assets/img/model.png" class="icon-img" />
							通知书模板
						</a-tag>
					</router-link>
				</a-col>
				<a-col :span="12" v-if="judgeShowMenu('/enroll/curYearSet')">
					<router-link to="/enroll/curYearSet">
						<a-tag color="#E9EDF6" :class="ascertain == 17 ? 'menu-item item-2 up' : 'menu-item item-2'"
							@click='changeSelected(17)'>
							<img src="@/assets/img/year.png" class="icon-img" />
							招生年份设置
						</a-tag>
					</router-link>
				</a-col>
				<a-col :span="12" v-if="judgeShowMenu('/enroll/curSeasonSet')">
					<router-link to="/enroll/curSeasonSet">
						<a-tag color="#E9EDF6" :class="ascertain == 18 ? 'menu-item item-1 up' : 'menu-item item-1'"
							@click='changeSelected(18)'>
							<img src="@/assets/img/quarter.png" class="icon-img" />
							招生季设置
						</a-tag>
					</router-link>
				</a-col>
				<a-col :span="12" v-if="judgeShowMenu('/enroll/numRuleSet')">
					<router-link to="/enroll/numRuleSet">
						<a-tag color="#E9EDF6" :class="ascertain == 19 ? 'menu-item item-2 up' : 'menu-item item-2'"
							@click='changeSelected(19)'>
							<img src="@/assets/img/numCreate.png" class="icon-img" />
							学号生成设置
						</a-tag>
					</router-link>
				</a-col>

			</a-sub-menu>

			<!-- 			<a-sub-menu key="sub5" @titleClick="titleClick">
				<span slot="title">
					<span>专业管理</span>
				</span>
				<a-col :span="12">
					<router-link to="/enroll">
						<a-tag color="#E9EDF6" :class="ascertain == 20 ? 'menu-item item-1 up' : 'menu-item item-1'"
							@click='changeSelected(20)'>
							<img src="@/assets/img/major.png" class="icon-img" />
							专业信息管理
						</a-tag>
					</router-link>
				</a-col>

			</a-sub-menu> -->
			<!-- 			<a-sub-menu key="sub5" @titleClick="titleClick" v-if="judgeShowMenuTop('/enroll/studentImport')">
				<span slot="title">
					<span>学生信息维护</span>
				</span>
				<a-col :span="12" v-if="judgeShowMenu('/enroll/studentImport')">
					<router-link to="/enroll/studentImport">
						<a-tag color="#E9EDF6" :class="ascertain == 21 ? 'menu-item item-1 up' : 'menu-item item-1'"
							@click='changeSelected(21)'>
							<img src="@/assets/img/major.png" class="icon-img" />
							学生导入
						</a-tag>
					</router-link>
				</a-col>
				<a-col :span="12" v-if="judgeShowMenu('/enroll/presortClass')">
					<router-link to="/enroll/presortClass">
						<a-tag color="#E9EDF6" :class="ascertain == 22 ? 'menu-item item-2 up' : 'menu-item item-2'"
							@click='changeSelected(22)'>
							<img src="@/assets/img/major.png" class="icon-img" />
							预分班
						</a-tag>
					</router-link>
				</a-col>
				<a-col :span="12" v-if="judgeShowMenu('/enroll/presortDormitory')">
					<router-link to="/enroll/presortDormitory">
						<a-tag color="#E9EDF6" :class="ascertain == 23 ? 'menu-item item-1 up' : 'menu-item item-1'"
							@click='changeSelected(23)'>
							<img src="@/assets/img/major.png" class="icon-img" />
							预分宿舍
						</a-tag>
					</router-link>
				</a-col>

			</a-sub-menu> -->

			<a-sub-menu key="sub5" @titleClick="titleClick" v-if="judgeShowMenuTop('/enroll/studentImport')">
				<span slot="title">
					<span>学生信息维护</span>
				</span>
				<a-col :span="12" v-if="judgeShowMenu('/enroll/studentImport')">
					<router-link to="/enroll/studentImport">
						<a-tag color="#E9EDF6" :class="ascertain == 21 ? 'menu-item item-1 up' : 'menu-item item-1'"
							@click='changeSelected(21)'>
							<img src="@/assets/img/major.png" class="icon-img" />
							学生导入
						</a-tag>
					</router-link>
				</a-col>
				<a-col :span="12" v-if="judgeShowMenu('/enroll/presortClass')">
					<router-link to="/enroll/presortClass">
						<a-tag color="#E9EDF6" :class="ascertain == 22 ? 'menu-item item-2 up' : 'menu-item item-2'"
							@click='changeSelected(22)'>
							<img src="@/assets/img/major.png" class="icon-img" />
							预分班
						</a-tag>
					</router-link>
				</a-col>
				<a-col :span="12" v-if="judgeShowMenu('/enroll/presortDormitory')">
					<router-link to="/enroll/presortDormitory">
						<a-tag color="#E9EDF6" :class="ascertain == 23 ? 'menu-item item-1 up' : 'menu-item item-1'"
							@click='changeSelected(23)'>
							<img src="@/assets/img/major.png" class="icon-img" />
							预分宿舍
						</a-tag>
					</router-link>
				</a-col>
				<!-- 				<a-col :span="12">
					<router-link to="/enroll/reportMessage">
						<a-tag color="#E9EDF6" :class="ascertain == 14 ? 'menu-item item-1 up' : 'menu-item item-1'"
							@click='changeSelected(14)'>
							<img src="@/assets/img/num.png" class="icon-img" />
							新生报到信息
						</a-tag>
					</router-link>
				</a-col> -->
			</a-sub-menu>


		</a-menu>
		<div class="loging">
			<a-spin v-if='Loging' />
		</div>
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
		data() {
			return {
				current: ['desktop'],
				openKeysMsg: [],
				ascertain: 0,
				Loging: true
			};
		},
		watch: {
			openKeys(val) {
				// console.log('openKeys', val);
			},
		},
		mounted() {
			setTimeout(() => {
				this.Loging = false
				var menu = JSON.parse(sessionStorage.getItem('menu'))
			}, 1000)
		},
		methods: {
			onOpenChange(openKeys) {
				const latestOpenKey = openKeys.find(
					(key) => this.openKeysMsg.indexOf(key) === -1
				)
				if(latestOpenKey == undefined){
					this.openKeysMsg = []
					return
				}
				if (this.openKeysMsg.indexOf(latestOpenKey) == -1) {
					this.openKeysMsg = [latestOpenKey]
				} else {
					this.openKeysMsg = latestOpenKey ? [latestOpenKey] : []
				}
			},
			judgeShowMenuTop(Url) {
				return true
				var menu = JSON.parse(sessionStorage.getItem('menu'))
				for (let i = 0; i < menu.length; i++) {
					var index = menu.findIndex(item => item.url == Url)
					if (index !== -1) {
						return true
					}
				}
				return false
			},
			judgeShowMenu(Url) {
				return true
				var menu = JSON.parse(sessionStorage.getItem('menu'))
				for (let i = 0; i < menu.length; i++) {
					var index = menu[i].childList.findIndex(item => item.url == Url)
					if (index !== -1) {
						return true
					}
				}
				return false
			},
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
	.loging {
		text-align: center;
		margin-top: 300px;
	}

	.ant-menu-vertical .ant-menu-item::after,
	.ant-menu-vertical-left .ant-menu-item::after,
	.ant-menu-vertical-right .ant-menu-item::after,
	.ant-menu-inline .ant-menu-item::after {
		border: none;
	}

	.homePage {
		width: 84px;
		margin-top: 3px;
		font-size: 18px;
		font-family: Microsoft YaHei;
		font-weight: 700;
		color: #999999;
		position: relative;
		left: -9px;
	}

	.leftBarBox .icon-img {
		width: 20px;
		height: 20px;
	}

	.leftBarBox .ant-menu {
		height: 0px !important;
	}

	.top-hr {
		width: 320px;
		height: 2px;
		margin-top: 20px;
		margin-bottom: 20px;
		background: #A5AFB8;
	}

	.menu-item {
		width: 136px;
		height: 40px;
		background: #E9EDF6;
		color: #666666;
		margin-bottom: 12px;
		line-height: 28px;
		padding-top: 5px;
		border-radius: 1px;
		border: 1px dashed #CCCCCC;
		font-size: 16px;
		font-weight: 400;
		font-family: "MicrosoftYaHei";
		margin-left: 12px;
	}

	.menu-item:hover {
		color: #666666;
	}

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
		cursor: pointer;
		border: 1px dashed #8FB4FB;
	}

	/* 	.item-1 {
		margin-left: 15px;
	} */

	/* 	.item-2 {
		margin-left: 10px;
	} */

	.ant-menu-submenu-title {
		height: 20px !important;
		line-height: 20px !important;
		font-weight: 14px !important;
		padding-left: 16px !important;
		color: #A0A0A0;
		font-weight: 700;
	}

	.ant-menu-submenu-title span {
		width: 84px;

		margin-top: 3px;

		font-size: 18px;
		font-family: Microsoft YaHei;
		font-weight: 700;
		color: #999999;

	}

	ant-menu-submenu-title span:hover {
		color: #4e89f8;
	}

	.ant-menu-item {
		width: 84px;
	}

	.up {
		color: #4e89f8;
	}
</style>
