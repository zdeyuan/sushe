<template>
	<div style="background:#E9EDF6; padding:30px">
		<!-- 		<span class="content-title" v-if="$route.query.type == 2">
			<a-menu mode="horizontal" class="dorm-modify-top">
				<a-menu-item key="dormModifyApply" class="dorm-modify-item aottom">
					<router-link class="link-active" to="/dorm/chooseBuild">宿舍分配管理</router-link>
				</a-menu-item>
				<a-menu-item key="dormInvoking" class="dorm-modify-item dorm-modify-after">
					<router-link class="link" to="/dorm/dormInvoking">宿舍调用</router-link>
				</a-menu-item>
				<a-menu-item key="3" class="dorm-modify-item dorm-modify-after">
					<router-link class="link" to="/dorm/dormBedChange">学生床位更换</router-link>
				</a-menu-item>
				<a-menu-item key="4" class="dorm-modify-item dorm-modify-after">
					<router-link class="link" to="/dorm/dormDistributionQuery">宿舍分配查询</router-link>
				</a-menu-item>
				<router-view></router-view>
			</a-menu>
		</span> -->
		<span v-if="$route.query.type == 2">
			<!-- <a-menu mode="horizontal" class="dorm-modify-top"> -->
			<div class="content-title">
				<router-link class="link-active" to="/dorm/chooseBuild">宿舍分配管理</router-link>
			</div>
			<div class="content-title not-title">
				<router-link class="link" to="/dorm/dormInvoking">宿舍调用</router-link>
			</div>
			<div class="content-title not-title">
				<router-link class="link" to="/dorm/dormBedChange">学生床位更换</router-link>
			</div>
			<div class="content-title not-title">
				<router-link class="link" to="/dorm/dormDistributionQuery">宿舍分配查询</router-link>
			</div>
			<!-- 				<router-view></router-view>
					</a-menu> -->
		</span>
		<span class="content-title" v-else>{{dormSumlName}}</span>
		<!-- 		<hr align="left" color=#878787 SIZE=2 style="margin-left: 3px; width: 125px;" /> -->
		<div class="pageContentBox">
			<div class="headTop">{{dormName}} > <span class="notTop">{{dormSumlName}}</span></div>
			<div class="content-head">
			</div>
			<div class="content-content">
				<build-sub v-for="item in build" :key="item.key" :sextype="item.sex" :buildId="item.buildId"
					:residueBedNum="item.residueBedNum" :liveratio="item.liveratio" :allFloorNum="item.allFloorNum"
					:allRoomNum="item.allRoomNum" :allBedNum="item.allBedNum" :livePeopleNum="item.livePeopleNum" :url="item.url"
					@clickquery="clickquery(item.key, item.buildId)">
				</build-sub>
			</div>
		</div>
	</div>


</template>

<script>
	import {
		axios
	} from '@/utils/request';
	import BuildSub from '@/views/dorm/dormMng/buildSub.vue';


	export default {
		data() {
			return {
				build: [],
				dormName: '',
				dormSumlName: ''
			};
		},
		mounted() {
			this.getBuildList();
			if (this.$route.query.type == 1) {
				this.dormName = '资产管理'
				this.dormSumlName = '选择宿舍'
			} else if (this.$route.query.type == 2) {
				this.dormName = '宿务管理'
				this.dormSumlName = '宿舍分配'
			} else if (this.$route.query.type == 3) {
				this.dormName = '宿务管理'
				this.dormSumlName = '宿舍清空管理'
			} else if (this.$route.query.type == 4) {
				this.dormName = '宿务管理'
				this.dormSumlName = '宿舍维修管理'
			}
		},
		watch: {
			"$route.query.type": function(newflag) {
				if (this.$route.query.type == 1) {
					this.dormName = '资产管理'
					this.dormSumlName = '选择宿舍'
				} else if (this.$route.query.type == 2) {
					this.dormName = '宿务管理'
					this.dormSumlName = '宿舍分配'
				} else if (this.$route.query.type == 3) {
					this.dormName = '宿务管理'
					this.dormSumlName = '宿舍清空管理'
				} else if (this.$route.query.type == 4) {
					this.dormName = '宿务管理'
					this.dormSumlName = '宿舍维修管理'
				}
			}
		},
		components: {
			BuildSub
		},
		methods: {
			clickquery(id, buildName) {
				console.log(id);
				sessionStorage.setItem("buildId", id);
				sessionStorage.setItem("buildName", buildName);
				this.$router.push({
					path: '/dorm/chooseDorm'
				})
			},
			getBuildList() {
				axios({
					url: 'dorm/allotSuShe/SSLInfo',
					method: 'post',
					params: {}
				}).then(res => {

					this.build.splice(0, this.build.length);
					for (let build of res.result) {
						console.log(build.sourcefile);
						this.build.push({
							key: build.id,
							sex: build.xbm,
							buildId: build.jzwmc,
							liveratio: this.GetPercent(build.yzrs, build.kzrs),
							residueBedNum: build.kzrs - build.yzrs,
							allFloorNum: build.jzwcs,
							allRoomNum: build.totalRom,
							allBedNum: build.kzrs,
							livePeopleNum: build.yzrs,
							url:build.sourcefile
						})
					}
					console.log(this.build);
				}).catch(err => {
					this.$message.warning("此处有异常");
				})
			},
			GetPercent(num, total) {
				/// <param name="num">当前数</param>
				/// <param name="total">总数</param>
				num = parseFloat(num);
				total = parseFloat(total);
				if (isNaN(num) || isNaN(total)) {
					return "-";
				}
				return total <= 0 ? "0%" : (Math.round(num / total * 10000) / 100.00) + "%";
			}
		},
	};
</script>

<style scoped="scoped">
	.content-content {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		align-items: space;
		justify-content: start;
	}

	.dorm-modify-top {
		width: 1000px;
		height: 80px;
		border: 0px;
		background-color: #E9EDF6;

	}

	.aottom {
		border-bottom: 3px solid #666;
	}

	.dorm-modify-item {
		width: 150px;
	}

	.dorm-modify-after {
		margin-left: 30px;
	}

	.link {
		font-family: "MicrosoftYaHei";
		font-size: 20px;
		text-align: center;
		font-weight: bold;
		color: #999999 !important;
	}

	.link-active {
		font-family: "MicrosoftYaHei";
		font-size: 20px;
		text-align: center;
		font-weight: bold;
		color: #666666 !important;
	}

	.long-table tr {
		font-size: 20px;
	}
</style>
