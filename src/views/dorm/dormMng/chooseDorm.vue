<template>
	<div >
		<a-card :bordered="false">
			<div class="content-content">
				<a-button type="primary" icon="arrow-left" @click="$router.go(-1);" style="margin-right:10px;">
					返回
				</a-button>
				
				<!-- 宿舍box -->
				<div class="dormitoryContentBox" v-for='(val,key) in dorm'>
				<!-- 	显示宿舍头部，信息为楼层宿舍信息 -->
					<div style="margin:10px 0;">
						
						<div class="dormitoryContentyTop" >
							<div>楼层:<b>{{val.lc}}</b></div> <div> 总宿舍数:<b>{{val.allSushe}} </b></div> <div> 宿舍已用数:<b>{{val.inNum}} </b> 宿舍空置床数:<b>{{val.noInNum}}</b> </div> <div>宿舍总床数:<b>{{val.sleepNum}}</b></div>
						</div>
					</div>
				<!-- 	显示宿舍底部，信息为各项宿舍人员信息 -->
					<div class="dormitoryContentyButtom">
						<dorm-sub v-for="(val1,key1) in val.suSheList" 
						    :key="key1" 
							:floor="val1.lcname" 
							:dormId="val1.dormId"
							:residueBedNum="val1.kzrs - val1.yzrs" 
							:allRoomNum="val1.lch" 
							:allBedNum="val1.kzrs"
							:dormName="val1.fjbm" 
							:livePeopleNum="val1.yzrs"
							@allocationstu="allocationstu(val1.id)" 
							@fixroom="fixroom(val1.id)"
							@clearroom="clearroom(val1.id)" 
							@meansmgr="meansmgr(val1.id)">
						</dorm-sub>
					</div>	
				</div>	
<!-- 				<dorm-sub v-for="item in dorm" :key="item.key" :floor="item.floor" :dormId="item.dormId"
					:residueBedNum="item.residueBedNum" :allRoomNum="item.allRoomNum" :allBedNum="item.allBedNum"
					:dormName="item.dormName" :livePeopleNum="item.livePeopleNum"
					@allocationstu="allocationstu(item.key)" @fixroom="fixroom(item.key)"
					@clearroom="clearroom(item.key)" @meansmgr="meansmgr(item.key)">
				</dorm-sub> -->
				<a-modal title="清空宿舍" :visible="visible" @ok="handleOk" @cancel="handleCancel">
					<div style="text-align: center; font-size: 20px; font-weight: bold;">确定要清空该宿舍吗?</div>
					<template slot="footer">
						<a-button type="primary" @click="handleOk()">确定</a-button>
						<a-button @click="handleCancel()">取消</a-button>
					</template>
				</a-modal>
			</div>
		</a-card>
	</div>

</template>

<script>
	import {
		axios
	} from '@/utils/request';
	import DormSub from '@/views/dorm/dormMng/dormSub.vue';
	export default {
		data() {
			return {
				dorm: [],
				visible: false,
				dormId: '',
			};
		},
		mounted() {
			this.getDormList();
			if(this.$route.query.type == 1){
				
			}
		},
		components: {
			DormSub
		},
		methods: {
			allocationstu(id) {
				sessionStorage.setItem("dormId", id);
				this.$router.push({
					path: '/dormProperty/dormDistribute'
				});
			},
			fixroom(id) {
				sessionStorage.setItem("dormId", id);
				this.$router.push({
					path: '/dormProperty/dormFixMng'
				})
			},
			clearroom(id) {
				this.dormId = id;
				let _this=this;;
				this.$confirm({
					title: '是否清空',
					content: '确定要清空该宿舍吗',
					okText: '确认',
					cancelText: '取消',
					onOk() {
						_this.handleOk()
					},
					onCancel() {},
				});
			},
			handleOk() {
				axios({
					url: 'dorm/empty/emptySuShe',
					method: 'post',
					params: {
						id: this.dormId
					}
				}).then(res => {
					this.$message.success(res.message);
					this.getDormList();
					this.visible = false;
				}).catch(err => {
					this.$message.warning("此处有异常");
				})
			},
			handleCancel() {
				this.visible = false;
			},
			meansmgr(id) {
				sessionStorage.setItem("dormId", id);
				this.$router.push({
					path: '/dormProperty/assetMng'
				})
			},
			getDormList() {
				axios({
					url: 'dorm/allotSuShe/LCInfo',
					method: 'post',
					params: {
						buildId: parseInt(sessionStorage.getItem("buildId"))
					}
				}).then(res => {
					console.log(res)
					this.dorm.splice(0, this.dorm.length);
					this.dorm = res.result
				}).catch(err => {
					this.$message.warning("此处有异常");
				})
			},
		},
	};
</script>

<style lang="less" scoped>
	.dormitoryContentBox{
	/* 	margin-bottom: 40px; */
	}
	.dormitoryContentyTop{
		display:flex;
		>div{
			margin-right:5px;
			b{
				color:#1BB2F3;
				font-weight:normal;
				font-size:16px;
			}
		}
	}
	.dormitoryContentyButtom{
		width: 100%;
		display: flex;
		flex-wrap: wrap;
	}
</style>
