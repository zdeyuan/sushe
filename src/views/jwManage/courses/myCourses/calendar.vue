<template>
	<div>
		<div class="schedule-main">
			<div class="schedule-flex">
				<div class="schedule-main__title">{{ scheduleTitle }}</div>
				<div class="schedule-flex__select" v-if="classList.length>0">
					<edu-data v-model="queryParam.bjId" stype="select" :datas="classList" textKey="XZBMC" dtype="datas" />
				</div>
			</div>
			<div class="schedule-main__table">
				<a-row class="table-row">
					<a-col class="table-th" :span="3"> 节次/星期 </a-col>
					<a-col class="table-th" :span="3" v-for="(item, index) in weekData" :key="index">
						{{ item.weekName }}
					</a-col>
				</a-row>
				<a-spin :spinning="loading">
					<a-row class="table-row table-row__body" v-for="item in scheduleNodeMorningData" :key="item.id">
						<a-col :span="3" class="table-td table-section">
							<div class="table-td__inner">
								{{ item.section }}
								<div class="table-section__time">{{ item.kssj }}-{{ item.jssj }}</div>
							</div>
						</a-col>
						<a-col :span="3" class="table-td" v-for="(sub, index) in weekData" :key="index"
							:class="{'disabled':!item.status}">
							<div class="table-td__inner" v-show="item[index]">
								{{ (item[index] && item[index].kcmc) || '-' }}
								<div class="table-td__label">
									{{ (item[index] && item[index].jsmc)}} - {{ (item[index] && item[index].jsxm)}}
								</div>
							</div>
						</a-col>
					</a-row>
					<a-row class="table-row">
						<a-col class="table-th" :span="24"> 午休 </a-col>
					</a-row>
					<a-row class="table-row table-row__body" v-for="item in scheduleNodeAfternoonData" :key="item.id">
						<a-col :span="3" class="table-td table-section">
							<div class="table-td__inner">
								{{ item.section }}
								<div class="table-section__time">{{ item.kssj }}-{{ item.jssj }}</div>
							</div>
						</a-col>
						<a-col :span="3" class="table-td" v-for="(sub, index) in weekData" :key="index"
							:class="{'disabled':!item.status}">
							<div class="table-td__inner" v-show="item[index]">
								{{ (item[index] && item[index].kcmc) || '-' }}
								<div class="table-td__label">
									{{ (item[index] && item[index].jsmc) }} - {{ (item[index] && item[index].jsxm) }}
								</div>
							</div>
						</a-col>
					</a-row>
					<a-row class="table-row">
						<a-col class="table-th" :span="24"> 晚自习 </a-col>
					</a-row>
					<a-row class="table-row table-row__body" v-for="item in scheduleNodeNightData" :key="item.id">
						<a-col :span="3" class="table-td table-section">
							<div class="table-td__inner">
								{{ item.section }}
								<div class="table-section__time">{{ item.kssj }}-{{ item.jssj }}</div>
							</div>
						</a-col>
						<a-col :span="3" class="table-td" v-for="(sub, index) in weekData" :key="index"
							:class="{'disabled':!item.status}">
							<div class="table-td__inner" v-show="item[index]">
								{{ (item[index] && item[index].kcmc) || '-' }}
								<div class="table-td__label">
									{{ (item[index] && item[index].jsmc)}} - {{ (item[index] && item[index].jsxm)}}
								</div>
							</div>
						</a-col>
					</a-row>
				</a-spin>
			</div>
		</div>
	</div>
</template>
<script>
	import {
		getScheduleNodeListbyStudent,
		getScheduleNodeList,
	} from '@/api/schedule/classSchedule'
	import {
		classListByTeacherCode,
		schedulingByTeacher
	} from '@/api/kw/scheduling';
	import JSelectBanjiByZy from '@/components/kwglbiz/JSelectBanji'
	import moment from 'moment'
	export default {
		components: {
			JSelectBanjiByZy
		},
		props: {
			isBj: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				id: 0,
				pkId: null,
				loading: false,
				scheduleTitle: '暂无课表信息',
				//班级列表
				classesList: [],
				queryParam: {
					bjId:''
				},
				// 排课节数据
				scheduleNodeData: [],
				// 排课节上午数据
				scheduleNodeMorningData: [],
				// 排课节下午数据
				scheduleNodeAfternoonData: [],
				// 排课节晚自习数据
				scheduleNodeNightData: [],
				classList:[],
				userInfo:{},
				// 星期表格
				weekData: [{
						id: 1,
						weekName: '星期一',
						course: {}
					},
					{
						id: 2,
						weekName: '星期二',
						course: {}
					},
					{
						id: 3,
						weekName: '星期三',
						course: {}
					},
					{
						id: 4,
						weekName: '星期四',
						course: {}
					},
					{
						id: 5,
						weekName: '星期五',
						course: {}
					},
					{
						id: 6,
						weekName: '星期六',
						course: {}
					},
					{
						id: 7,
						weekName: '星期日',
						course: {}
					},
				],
			}
		},
		watch:{
			'queryParam.bjId'(val){
				this.getTeacherSchedule()
			}
		},
		created() {
			this.userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'));
			this.getScheduleNodeList();
			
		},
		methods: {
			async getClassList() {
				let res = await classListByTeacherCode({
					teacherid: this.userInfo.teacherOrStudentCode
				});
				this.classList=res.result;
				this.queryParam.bjId=this.classList[0].id;
				this.loading = false;
				this.getTeacherSchedule()
			},
			async getTeacherSchedule() {
				let data = {
					teacherid: this.userInfo.teacherOrStudentCode,
					bjid:this.queryParam.bjId
				}
				let res = await schedulingByTeacher(data);
				let scheduleDetailData = res.result || []
				if (res.result&&res.result.length>0) {
					scheduleDetailData.map((item) => {
						this.scheduleNodeData[item.section - 1][item.week - 1] = item
					});
					this.loading = false;
					this.scheduleTitle = `${res.result[0].XZBMC}排课表`;
				} else {
					this.loading = false;
				}
				//this.setScheduleNodeData()
		},
		// 获取排课节信息
		getScheduleNodeList() {
			this.loading = true;
			// this.scheduleNodeData = []
			getScheduleNodeList().then((res) => {
				if (res.code == 200) {
					// res.result.records.forEach((item) => {
					//   this.$set(item, 'weekData', this.weekData)
					// })
					this.scheduleNodeData = res.result.records
					this.setScheduleNodeData();
					if (this.$hasPer(['teacher','bzr'])) {
						this.getClassList();
						
					}else{
						this.getClassScheduleDetail();
					}
					this.loading = false;
				}
				
			})
		},
		// 设置排课节数据
		setScheduleNodeData() {
			this.scheduleNodeMorningData = this.scheduleNodeData.filter((item) => +item.jssj.split(':')[0] < 12)
			this.scheduleNodeAfternoonData = this.scheduleNodeData.filter(
				(item) => +item.jssj.split(':')[0] < 18 && +item.jssj.split(':')[0] > 12
			)
			this.scheduleNodeNightData = this.scheduleNodeData.filter((item) => +item.jssj.split(':')[0] > 18);
		},

		// 获取课表明细详情
		getClassScheduleDetail(id) {
			getScheduleNodeListbyStudent().then((res) => {
				if (res.code == 200) {
					let scheduleDetailData = res.result.data || []
					if (res.result.data) {
						scheduleDetailData.map((item) => {
							this.scheduleNodeData[item.section - 1][item.week - 1] = item
						});
						this.loading = false;
						this.scheduleTitle = `${res.result.bjName}（${res.result.xqmc}）排课`;

					} else {
						this.loading = false;
						//this.$message.warning('该班级排课暂无明细')
					}
					//this.setScheduleNodeData()
				}
			})
		},
		// 新增或编辑排课明细
		handleAddOrEdit(item, idx) {
			if (!item.status) {
				return;
			}
			if (!this.semesterId) {
				this.$message.warning('请先选择学期')
				return
			}
			if (!this.classInfo.sid) {
				this.$message.warning('请先选择班级')
				return
			}
			if (!this.pkId) {
				this.$message.warning('该班级暂无排课')
				return
			}
			let otherParam = {
				pkid: this.pkId,
				jxbid: this.classInfo.sid,
				semid: this.semesterId,
				week: idx + 1,
				section: item.id,
				jsid: this.classInfo.jsid,
				buildId: this.classInfo.jzid,
				campusId: this.classInfo.campusId
			}
			this.scheduleDetail = item[idx] ? {
				...item,
				...otherParam,
				...item[idx]
			} : {
				...item,
				...otherParam
			}
			console.log("+++++", this.scheduleDetail)
			this.isAdd = item[idx] ? false : true
			this.visible = true
		},
	}
	}
</script>
<style scoped lang="less">
	.schedule {
		&-flex {
			position: relative;

			&__select {
				position: absolute;
				right: 0px;
				bottom: 10px;

				/deep/.ant-select-selection--single {
					width: 100px;
				}
			}
		}

		&-main {
			padding: 0 15px;

			&__title {
				font-size: 18px;
				text-align: center;
				padding: 15px 0;
			}

			&__table {
				text-align: center;

				.table-row {
					&__body {
						border-right: 1px solid #e6e6e6;
						border-bottom: 1px solid #e6e6e6;
					}
				}

				.table-th {
					background-color: #66c3fd;
					color: #fff;
					line-height: 30px;
				}

				.table-td {
					padding: 5px;
					min-height: 100px;
					border-left: 1px solid #e6e6e6;
					display: flex;
					align-items: center;
					justify-content: center;
					cursor: pointer;

					&.disabled {
						background-color: #f1f1f1;
						cursor: default
					}

					&__inner {
						width: 100%;
						min-height: 100%;
						overflow-y: auto;
					}

					&__label {
						color: #fc620e;
						padding-top: 5px;
					}
				}

				.table-section {
					background-color: #f8f8f8;
					color: #666;

					&__time {}
				}
			}
		}
	}
</style>