<template>
	<div class="leftBarBox">
		<!--    <a-menu mode="horizontal" class="left-menu-top">
      <a-menu-item key="desktop" class="left-menu-click">桌面</a-menu-item>
      <a-menu-item key="defined" class="left-menu-click">定义</a-menu-item>
      <a-menu-item key="this.$message.success" class="left-menu-click">提醒</a-menu-item>
    </a-menu> -->
		<a-menu :defaultSelectedKeys="['1']" :defaultOpenKeys="[]" mode="inline" @click="handleClick" :openKeys='openKeysMsg'
			v-if='Loging == false' @openChange="onOpenChange" theme="dark" >
			
			<a-menu-item key="sub0">
				<router-link to="/dorm/index">
					<a-icon type="pie-chart" />
					<span class="homePage">首页</span>
				</router-link>
			</a-menu-item>
			<a-sub-menu key="sub1" @titleClick="titleClick" v-if='judgeShowMenuTop("/dorm/floorMng")'>
				<span slot="title">
					<a-icon type="desktop" />
					<span>基础管理</span>
				</span>
				<a-menu-item>
					<router-link to="/dorm/floorMng">
						<icon-font type="iconlouceng" style="color: #b3b8b9; font-size: 20px;" />楼层管理
					</router-link>
				</a-menu-item>
				<a-menu-item>
					<router-link to="/dorm/buildMng">
						<icon-font type="iconlou1" style="color: #b3b8b9; font-size: 20px;" />宿舍楼管理
					</router-link>
				</a-menu-item>
				<a-menu-item>
					<router-link to="/dorm/dormMng">
						<icon-font type="iconlou" style="color: #b3b8b9; font-size: 20px;" />宿舍管理
					</router-link>
				</a-menu-item>
<!-- 				<a-col :span="12" v-if='judgeShowMenu("/dorm/floorMng")'>
					<router-link to="/dorm/floorMng">
						<a-tag color="#E9EDF6" :class="ascertain == 1 ? 'menu-item item-1 up' : 'menu-item item-1'"
							@click='changeSelected(1)'>
							<icon-font type="iconlouceng" style="color: #FD9246; font-size: 20px;" />
							楼层管理
						</a-tag>
					</router-link>
				</a-col>
				<a-col :span="12" v-if='judgeShowMenu("/dorm/buildMng")'>
					<router-link to="/dorm/buildMng">
						<a-tag color="#E9EDF6" :class="ascertain == 2 ? 'menu-item item-2 up' : 'menu-item item-2'"
							@click='changeSelected(2)'>
							<icon-font type="iconlou1" style="color: #38BC9D; font-size: 20px;" />
							宿舍楼管理
						</a-tag>
					</router-link>
				</a-col>
				<a-col :span="12" v-if='judgeShowMenu("/dorm/dormMng")'>
					<router-link to="/dorm/dormMng">
						<a-tag color="#E9EDF6" :class="ascertain == 3 ? 'menu-item item-1 up' : 'menu-item item-1'"
							@click='changeSelected(3)'>
							<icon-font type="iconlou" style="color: #1BB2F3; font-size: 20px;" />
							宿舍管理
						</a-tag>
					</router-link>
				</a-col> -->
			</a-sub-menu>

			<a-sub-menu key="sub2" @titleClick="titleClick" v-if='judgeShowMenuTop("/dorm/assetTypeMng")'>
				<span slot="title">
					<a-icon type="inbox" />
					<span>宿舍资产管理</span>
				</span>
				<a-menu-item>
					<router-link to="/dorm/assetTypeMng">
						<icon-font type="iconmeiyuan" style="color: #b3b8b9; font-size: 20px;" />资产类别管理
					</router-link>
				</a-menu-item>
				<a-menu-item>
					<router-link to="/dorm/chooseBuild?type=1">
						<icon-font type="iconbaoxiangui" style="color: #b3b8b9; font-size: 20px;" />资产管理
					</router-link>
				</a-menu-item>
				<a-menu-item>
					<router-link to="/dorm/assetQuery">
						<icon-font type="iconzichan" style="color: #b3b8b9; font-size: 20px;" />资产查询
					</router-link>
				</a-menu-item>
<!-- 				<a-col :span="12" v-if='judgeShowMenu("/dorm/assetTypeMng")'>
					<router-link to="/dorm/assetTypeMng">
						<a-tag color="#E9EDF6" :class="ascertain == 4 ? 'menu-item item-1 up' : 'menu-item item-1'"
							@click='changeSelected(4)'>
							<icon-font type="iconmeiyuan" style="color: #1BB2F3; font-size: 20px; " />
							资产类别管理
						</a-tag>
					</router-link>
				</a-col>
				<a-col :span="12" v-if='judgeShowMenu("/dorm/chooseBuild?type=1")'>
					<router-link to="/dorm/chooseBuild?type=1">
						<a-tag color="#E9EDF6" :class="ascertain == 5 ? 'menu-item item-2 up' : 'menu-item item-2'"
							@click='changeSelected(5)'>
							<icon-font type="iconbaoxiangui" style="color: #FD9246; font-size: 20px;" />
							资产管理
						</a-tag>
					</router-link>
				</a-col>
				<a-col :span="12" v-if='judgeShowMenu("/dorm/assetQuery")'>
					<router-link to="/dorm/assetQuery">
						<a-tag color="#E9EDF6" :class="ascertain == 6 ? 'menu-item item-1 up' : 'menu-item item-1'"
							@click='changeSelected(6)'>
							<icon-font type="iconzichan" style="color: #38BC9D; font-size: 20px;" />
							资产查询
						</a-tag>
					</router-link>
				</a-col> -->
			</a-sub-menu>

			<a-sub-menu key="sub3" @titleClick="titleClick" v-if='judgeShowMenuTop("/dorm/chooseBuild?type=2")'>
				<span slot="title">
					<a-icon type="mail" />
					<span>宿务管理</span>
				</span>
				<a-menu-item>
					<router-link to="/dorm/chooseBuild?type=2">
						<icon-font type="iconsushe" style="color: #b3b8b9; font-size: 20px;" />宿舍分配
					</router-link>
				</a-menu-item>
				<a-menu-item>
					<router-link to="/dorm/dormModifyApply">
						<icon-font type="iconbiangeng" style="color: #b3b8b9; font-size: 20px;" />宿舍变更
					</router-link>
				</a-menu-item>
				<a-menu-item>
					<router-link to="/dorm/prinConditionMng">
						<icon-font type="iconweijiguanli" style="color: #b3b8b9; font-size: 20px;" />违纪情况管理
					</router-link>
				</a-menu-item>
				<a-menu-item>
					<router-link to="/dorm/dormVisitorMng">
						<icon-font type="iconfangke" style="color: #b3b8b9; font-size: 20px;" />宿舍访客管理
					</router-link>
				</a-menu-item>
				<a-menu-item>
					<router-link to="/dorm/chooseBuild?type=3">
						<icon-font type="iconqingkong" style="color: #b3b8b9; font-size: 20px;" />宿舍清空管理
					</router-link>
				</a-menu-item>
				<a-menu-item>
					<router-link to="/dorm/chooseBuild?type=4">
						<icon-font type="iconweixiu" style="color: #b3b8b9; font-size: 20px;" />宿舍维修管理
					</router-link>
				</a-menu-item>
				<a-menu-item>
					<router-link to="/dorm/translateApprove">
						<icon-font type="icongaizhangrenzhengshenhemianxing" style="color: #b3b8b9; font-size: 20px;" />留宿审核
					</router-link>
				</a-menu-item>
				<a-menu-item>
					<router-link to="/dorm/notice">
						<icon-font type="icontongzhi" style="color: #b3b8b9; font-size: 20px;" />通知公告
					</router-link>
				</a-menu-item>
				<a-menu-item>
					<router-link to="/dorm/dormJudge">
						<icon-font type="iconsusheweishengchengji" style="color: #b3b8b9; font-size: 20px;" />宿舍卫生评比
					</router-link>
				</a-menu-item>
<!-- 				<a-col :span="12" v-if='judgeShowMenu("/dorm/chooseBuild?type=2")'>
					<router-link to="/dorm/chooseBuild?type=2">
						<a-tag color="#E9EDF6" :class="ascertain == 7 ? 'menu-item item-1 up' : 'menu-item item-1'"
							@click='changeSelected(7)'>
							<icon-font type="iconsushe" style="color: #38ABFE; font-size: 20px;" />
							宿舍分配
						</a-tag>
					</router-link>
				</a-col>
				<a-col :span="12" v-if='judgeShowMenu("/dorm/dormModifyApply")'>
					<router-link to="/dorm/dormModifyApply">
						<a-tag color="#E9EDF6" :class="ascertain == 8 ? 'menu-item item-2 up' : 'menu-item item-2'"
							@click='changeSelected(8)'>
							<icon-font type="iconbiangeng" style="color: #FD9246; font-size: 20px;" />
							宿舍变更
						</a-tag>
					</router-link>
				</a-col>
				<a-col :span="12" v-if='judgeShowMenu("/dorm/prinConditionMng")'>
					<router-link to="/dorm/prinConditionMng">
						<a-tag color="#E9EDF6" :class="ascertain == 9 ? 'menu-item item-1 up' : 'menu-item item-1'"
							@click='changeSelected(9)'>
							<icon-font type="iconweijiguanli" style="color: #F76981; font-size: 20px;" />
							违纪情况管理
						</a-tag>
					</router-link>
				</a-col>
				<a-col :span="12" v-if='judgeShowMenu("/dorm/dormVisitorMng")'>
					<router-link to="/dorm/dormVisitorMng">
						<a-tag color="#E9EDF6" :class="ascertain == 10 ? 'menu-item item-2 up' : 'menu-item item-2'"
							@click='changeSelected(10)'>
							<icon-font type="iconfangke" style="color: #9285E2; font-size: 20px;" />
							宿舍访客管理
						</a-tag>
					</router-link>
				</a-col>
				<a-col :span="12" v-if='judgeShowMenu("/dorm/chooseBuild?type=3")'>
					<router-link to="/dorm/chooseBuild?type=3">
						<a-tag color="#E9EDF6" :class="ascertain == 11 ? 'menu-item item-1 up' : 'menu-item item-1'"
							@click='changeSelected(11)'>
							<icon-font type="iconqingkong" style="color: #39ABFE; font-size: 20px;" />
							宿舍清空管理
						</a-tag>
					</router-link>
				</a-col>
				<a-col :span="12" v-if='judgeShowMenu("/dorm/chooseBuild?type=4")'>
					<router-link to="/dorm/chooseBuild?type=4">
						<a-tag color="#E9EDF6" :class="ascertain == 12 ? 'menu-item item-2 up' : 'menu-item item-2'"
							@click='changeSelected(12)'>
							<icon-font type="iconweixiu" style="color: #00BAD0; font-size: 20px;" />
							宿舍维修管理
						</a-tag>
					</router-link>
				</a-col>
				<a-col :span="12" v-if='judgeShowMenu("/dorm/translateApprove")'>
					<router-link to="/dorm/translateApprove">
						<a-tag color="#E9EDF6" :class="ascertain == 13 ? 'menu-item item-1 up' : 'menu-item item-1'"
							@click='changeSelected(13)'>
							<icon-font type="icongaizhangrenzhengshenhemianxing"
								style="color: #F88600; font-size: 20px;" />
							留宿审核
						</a-tag>
					</router-link>
				</a-col>
				<a-col :span="12" v-if='judgeShowMenu("/dorm/notice")'>
					<router-link to="/dorm/notice">
						<a-tag color="#E9EDF6" :class="ascertain == 14 ? 'menu-item item-2 up' : 'menu-item item-2'"
							@click='changeSelected(14)'>
							<icon-font type="icontongzhi" style="color: #457AFF; font-size: 20px;" />
							通知公告
						</a-tag>
					</router-link>
				</a-col>
				<a-col :span="12" v-if='judgeShowMenu("/dorm/dormJudge")'>
					<router-link to="/dorm/dormJudge">
						<a-tag color="#E9EDF6" :class="ascertain == 15 ? 'menu-item item-1 up' : 'menu-item item-1'"
							@click='changeSelected(15)'>
							<icon-font type="iconsusheweishengchengji" style="color: #F56C6C; font-size: 20px;" />
							宿舍卫生评比
						</a-tag>
					</router-link>
				</a-col> -->
			</a-sub-menu>

			<a-sub-menu key="sub4" @titleClick="titleClick" v-if='judgeShowMenuTop("/dorm/attenSetting")'>
				<span slot="title">
					<a-icon type="carry-out" />
					<span>住宿考勤</span>
				</span>
				<a-menu-item>
					<router-link to="/dorm/attenSetting">
						<icon-font type="iconkaoqinshezhi" style="color: #b3b8b9; font-size: 20px;" />考勤设置
					</router-link>
				</a-menu-item>
				<a-menu-item>
					<router-link to="/dorm/attenMng">
						<icon-font type="iconkaoqinguanli" style="color: #b3b8b9; font-size: 20px;" />考勤管理
					</router-link>
				</a-menu-item>
				<a-menu-item>
					<router-link to="/dorm/prinTypeMng">
						<icon-font type="iconweiji" style="color: #b3b8b9; font-size: 20px;" />违纪类型管理
					</router-link>
				</a-menu-item>
				<a-menu-item>
					<router-link to="/dorm/prinMng">
						<icon-font type="iconshiwuzhongxin_xueshengweiji" style="color: #b3b8b9; font-size: 20px;" />违纪管理
					</router-link>
				</a-menu-item>
<!-- 				<a-col :span="12" v-if='judgeShowMenu("/dorm/attenSetting")'>
					<router-link to="/dorm/attenSetting">
						<a-tag color="#E9EDF6" :class="ascertain == 16 ? 'menu-item item-1 up' : 'menu-item item-1'"
							@click='changeSelected(16)'>
							<icon-font type="iconkaoqinshezhi" style="color: #37ABFE; font-size: 20px;" />
							考勤设置
						</a-tag>
					</router-link>
				</a-col>
				<a-col :span="12" v-if='judgeShowMenu("/dorm/attenMng")'>
					<router-link to="/dorm/attenMng">
						<a-tag color="#E9EDF6" :class="ascertain == 17 ? 'menu-item item-2 up' : 'menu-item item-2'"
							@click='changeSelected(17)'>
							<icon-font type="iconkaoqinguanli" style="color: #FEA626; font-size: 20px;" />
							考勤管理
						</a-tag>
					</router-link>
				</a-col>
				<a-col :span="12" v-if='judgeShowMenu("/dorm/prinTypeMng")'>
					<router-link to="/dorm/prinTypeMng">
						<a-tag color="#E9EDF6" :class="ascertain == 18 ? 'menu-item item-1 up' : 'menu-item item-1'"
							@click='changeSelected(18)'>
							<icon-font type="iconweiji" style="color: #4ECB8D; font-size: 20px;" />
							违纪类型管理
						</a-tag>
					</router-link>
				</a-col>
				<a-col :span="12" v-if='judgeShowMenu("/dorm/prinMng")'>
					<router-link to="/dorm/prinMng">
						<a-tag color="#E9EDF6" :class="ascertain == 19 ? 'menu-item item-2 up' : 'menu-item item-2'"
							@click='changeSelected(19)'>
							<icon-font type="iconshiwuzhongxin_xueshengweiji"
								style="color: #F56F70; font-size: 20px;" />
							违纪管理
						</a-tag>
					</router-link>
				</a-col> -->
			</a-sub-menu>

			<a-sub-menu key="sub5" @titleClick="titleClick" v-if='judgeShowMenuTop("/dorm/ruleQuery")'>
				<span slot="title">
					<a-icon type="appstore" />
					<span>制度管理</span>
				</span>
				<a-menu-item>
					<router-link to="/dorm/ruleQuery">
						<icon-font type="iconzhiduchaxun" style="color: #b3b8b9; font-size: 20px;" />制度查询
					</router-link>
				</a-menu-item>
				<a-menu-item>
					<router-link to="/dorm/dormRuleType">
						<icon-font type="iconzhidu" style="color: #b3b8b9; font-size: 20px;" />寝室制度类别
					</router-link>
				</a-menu-item>
				<a-menu-item>
					<router-link to="/dorm/ruleMng">
						<icon-font type="iconzhiduguanli" style="color: #b3b8b9; font-size: 20px;" />制度管理
					</router-link>
				</a-menu-item>
<!-- 				<a-col :span="12" v-if='judgeShowMenu("/dorm/ruleQuery")'>
					<router-link to="/dorm/ruleQuery">
						<a-tag color="#E9EDF6" :class="ascertain == 20 ? 'menu-item item-1 up' : 'menu-item item-1'"
							@click='changeSelected(20)'>
							<icon-font type="iconzhiduchaxun" style="color: #37ABFE; font-size: 20px;" />
							制度查询
						</a-tag>
					</router-link>
				</a-col>
				<a-col :span="12" v-if='judgeShowMenu("/dorm/dormRuleType")'>
					<router-link to="/dorm/dormRuleType">
						<a-tag color="#E9EDF6" :class="ascertain == 21 ? 'menu-item item-2 up' : 'menu-item item-2'"
							@click='changeSelected(21)'>
							<icon-font type="iconzhidu" style="color: #9285E2; font-size: 20px;" />
							寝室制度类别
						</a-tag>
					</router-link>
				</a-col>
				<a-col :span="12" v-if='judgeShowMenu("/dorm/ruleMng")'>
					<router-link to="/dorm/ruleMng">
						<a-tag color="#E9EDF6" :class="ascertain == 22 ? 'menu-item item-1 up' : 'menu-item item-1'"
							@click='changeSelected(22)'>
							<icon-font type="iconzhiduguanli" style="color: #F79017; font-size: 20px;" />
							制度管理
						</a-tag>
					</router-link>
				</a-col> -->
			</a-sub-menu>

			<a-sub-menu key="sub6" @titleClick="titleClick" v-if='judgeShowMenuTop("/dorm/dormVolume")'>
				<span slot="title">
					<a-icon type="dot-chart" />
					<span>宿舍统计</span>
				</span>
				<a-menu-item>
					<router-link to="/dorm/dormVolume">
						<icon-font type="iconshangxiapu" style="color: #b3b8b9; font-size: 20px;" />宿舍容量统计
					</router-link>
				</a-menu-item>
				<a-menu-item>
					<router-link to="/dorm/stuCount">
						<icon-font type="iconxueshengkanshu" style="color: #b3b8b9; font-size: 20px;" />宿舍学生统计
					</router-link>
				</a-menu-item>
				<a-menu-item>
					<router-link to="/dorm/attenCount">
						<icon-font type="iconkaoqintongji" style="color: #b3b8b9; font-size: 20px;" />考勤统计
					</router-link>
				</a-menu-item>
				<a-menu-item>
					<router-link to="/dorm/prinCount">
						<icon-font type="iconweigui" style="color: #b3b8b9; font-size: 20px;" />违纪统计
					</router-link>
				</a-menu-item>
<!-- 				<a-col :span="12" v-if='judgeShowMenu("/dorm/dormVolume")'>
					<router-link to="/dorm/dormVolume">
						<a-tag color="#E9EDF6" :class="ascertain == 23 ? 'menu-item item-1 up' : 'menu-item item-1'"
							@click='changeSelected(23)'>
							<icon-font type="iconshangxiapu" style="color: #63BBFC; font-size: 20px;" />
							宿舍容量统计
						</a-tag>
					</router-link>
				</a-col>
				<a-col :span="12" v-if='judgeShowMenu("/dorm/stuCount")'>
					<router-link to="/dorm/stuCount">
						<a-tag color="#E9EDF6" :class="ascertain == 24 ? 'menu-item item-2 up' : 'menu-item item-2'"
							@click='changeSelected(24)'>
							<icon-font type="iconxueshengkanshu" style="color: #9285E2; font-size: 20px;" />
							宿舍学生统计
						</a-tag>
					</router-link>
				</a-col>
				<a-col :span="12" v-if='judgeShowMenu("/dorm/attenCount")'>
					<router-link to="/dorm/attenCount">
						<a-tag color="#E9EDF6" :class="ascertain == 25 ? 'menu-item item-1 up' : 'menu-item item-1'"
							@click='changeSelected(25)'>
							<icon-font type="iconkaoqintongji" style="color: #4ECB8D; font-size: 20px;" />
							考勤统计
						</a-tag>
					</router-link>
				</a-col>
				<a-col :span="12" v-if='judgeShowMenu("/dorm/prinCount")'>
					<router-link to="/dorm/prinCount">
						<a-tag color="#E9EDF6" :class="ascertain == 26 ? 'menu-item item-2 up' : 'menu-item item-2'"
							@click='changeSelected(26)'>
							<icon-font type="iconweigui" style="color: #FEA726; font-size: 20px;" />
							违纪统计
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
				Loging: true,
				collapsed:true
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
				// console.log(menu)
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
				// console.log(menu)
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
				// console.log(menu)
				for (let i = 0; i < menu.length; i++) {
					var index = menu[i].childList.findIndex(item => item.url == Url)
					if (index !== -1) {
						return true
					}
				}
				return false
			},
			handleClick(e) {
				console.log('click', e);
			},
			titleClick(e) {
				console.log('titleClick', e);
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
/* 	.loging {
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
		margin-left: 16px;
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
	} */

	/* 	.item-1 {
		margin-left: 15px;
	} */

	/* 	.item-2 {
		margin-left: 10px;
	} */

/* 	.ant-menu-submenu-title {
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
	} */
</style>
