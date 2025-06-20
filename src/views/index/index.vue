<template>
	<a-layout>
		<a-layout-content v-if="pageType == 'index'">
			<a-card>
				<div slot="title" class="title">
					<div class="tit-icon">
						<a-icon type="appstore" theme="filled"></a-icon>
					</div>
					应用中心
				</div>
				<!-- <a slot="extra" href="#">更多</a> -->
				<a-row :gutter="[8,16]">
					<a-col :span="num"  style="text-align: center;" v-for="(item,i) in applicationList" :key="i">
						<router-link :to="item.path">
						<div class="app-icon" :class="'ico'+i">
							<a-icon :type="item.type"></a-icon>
						</div>
						<p class="app-tit">{{item.title}}</p>
						</router-link>
					</a-col>

				</a-row>
			</a-card>
			<a-card style="margin-top:16px;">
				<div slot="title" class="title">
					<div class="tit-icon">
						<a-icon type="appstore" theme="filled"></a-icon>
					</div>
					数字概览
				</div>
				<!-- <a slot="extra" href="#">更多</a> -->
				<a-row :gutter="[16,16]" class="count-content">
					<a-col :span="6" v-for="(item,i) in countList" :key="i">
						<div class="count-bg " :class="'bg'+i">
							<div class="count-num">
								<span class="count">{{item.value}}</span>个
							</div>
							<p class="label">{{item.name}}</p>
						</div>
					</a-col>
				</a-row>
			</a-card>
			<div style="display:flex;margin-bottom:15px;">
				<div style="flex:1;margin-right:16px;" v-if="$hasPer(['system','ceshi'])">
					<a-card class="task-con">
						<div slot="title" class="title">
							<div class="tit-icon">
								<a-icon type="appstore" theme="filled"></a-icon>
							</div>
							任务中心
						</div>
						<a slot="extra" href="#"><router-link to="/processManagement/processApprovals/index">更多</router-link></a>
						<div ref="task-content">
							<a-tabs v-model="tabActive"  class="rwtabs" @change='changeliuc'>
								<a-tab-pane :tab="item.name" v-for="(item,index) in taskList" :key="item.key" >
								</a-tab-pane>
							</a-tabs>
							<a-table :columns="columns" :pagination="false" rowKey="id" :data-source="data">
								<template slot="action" slot-scope="text, record">
									<a href="javascript:;" v-if="record.currentStatusName == '待审批'" @click="joinStu('change',record.id)">办理</a>
									<a href="javascript:;" v-else @click="joinlogs('change',record.id)">查看</a>
								</template>
								</a-table-column>
							</a-table>
						</div>
					</a-card>
				</div>
				<div style="flex:1;margin-top:15px;" class="canlendar"  v-if="$hasPer(['teacher','bzr','student'])">
					<myCalendar></myCalendar>
				</div>
				<div style="width:350px;margin-top:15px;" v-if="$hasPer(['system','ceshi'])">
					<a-card>
						<div slot="title" class="title">
							<div class="tit-icon">
								<a-icon type="appstore" theme="filled"></a-icon>
							</div>
							任务类型统计
						</div>
						<div class="echartCon"  style="height:385px">
							<div id="myChart" style="width:100%;height:100%"></div>
							<div class="echartNum">
								<div class="label">
									办件总数
								</div>
								<div class="num">
									{{taskTotal}}
								</div>
							</div>
						</div>
					</a-card>
				</div>
			</div>

		</a-layout-content>
		<a-layout-content v-if="pageType=='notice'">
			<a-card>
				<div slot="title" class="title">
					<div class="tit-icon">
						<a-icon type="appstore" theme="filled"></a-icon>
					</div>
					{{noticeItem.title}}
				</div>
				<a slot="extra" @click="pageType = 'index'">返回</a>
				<a-row :gutter="[8,16]">
					<div v-html="noticeItem.msgContent" style="margin: 20px;"></div>
				</a-row>
			</a-card>
		</a-layout-content>
		<a-layout-sider :width='450'>
			<div :class="$hasPer(['student']) ? 'desc-info stu-bg' : 'desc-info another-bg'">
				<div>
					<b>{{user.realName}}</b>您好！祝您开心每一天！
					<p>登录于：{{loginTime}}</p>
				</div>
			</div>
			<a-card style="margin-top:16px;">
				<div slot="title" class="title">
					<div class="tit-icon">
						<a-icon type="appstore" theme="filled"></a-icon>
					</div>
					通知中心
				</div>
				<a slot="extra" href="/#/notificationAnnouncement/notice/index">更多</a>
				<a-list item-layout="horizontal" class="minHeight" :data-source="noiceData">
					<a-list-item slot="renderItem" slot-scope="item, index" @click="toContent(item)">
						<a-list-item-meta>
							<a slot="title" class="text_overflow">
								<a-badge status="default" />{{ item.title }}</a>
						</a-list-item-meta>
						<div>{{item.time}}</div>
					</a-list-item>
				</a-list>
			</a-card>
			<a-card class="task-con"  v-if="$hasPer(['student','bzr','teacher'])">
				<div slot="title" class="title">
					<div class="tit-icon">
						<a-icon type="appstore" theme="filled"></a-icon>
					</div>
					任务中心
				</div>
				<a slot="extra" href="#"><router-link to="/processManagement/processApprovals/index">更多</router-link></a>
				<div ref="task-content">
					<a-tabs v-model="tabActive"  class="rwtabs" @change='changeliuc'>
						<a-tab-pane :tab="item.name" v-for="(item,index) in taskList" :key="item.key" >
						</a-tab-pane>
					</a-tabs>
					<a-table :columns="columns" :pagination="false" rowKey="id" :data-source="data">
						<template slot="action" slot-scope="text, record">
							<a href="javascript:;" v-if="record.currentStatusName == '待审批'" @click="joinStu('change',record.id)">办理</a>
							<a href="javascript:;" v-if="record.currentStatusName == '已通过'" @click="joinlogs('change',record.id)">审批记录</a>
						</template>
						</a-table-column>
					</a-table>
				</div>
			</a-card>
			<a-card style="margin-top:16px;" v-if="$hasPer(['system','ceshi'])">
				<div slot="title" class="title">
					<div class="tit-icon">
						<a-icon type="appstore" theme="filled"></a-icon>
					</div>
					资讯中心
				</div>
				<a slot="extra" href="/#/notificationAnnouncement/notice/index">更多</a>
				<a-list item-layout="horizontal" class="minHeight"  :data-source="redianData">
					<a-list-item slot="renderItem" slot-scope="item, index" @click="toContent(item)">
						<a-list-item-meta>
							<a slot="title" class="text_overflow">
								<a-badge status="default" />{{ item.title }}</a>
						</a-list-item-meta>
						<div>{{item.time}}</div>
					</a-list-item>
				</a-list>
			</a-card>
		</a-layout-sider>
		<logs ref="joinOrChangeStulogs" @JoinOrchangeStuSuss='JoinOrchangeStuSuss'></logs>
		<join ref="joinOrChangeStu" @JoinOrchangeStuSuss='JoinOrchangeStuSuss'></join>
	</a-layout>
</template>

<script>
	import fullCalendar from '@/components/fullCalendar'
	import { annountCement,getCount }  from '@/api/index/index';
	
	import logs from '@/views/common/processApprovals/logs'
	import join from '@/views/common/processApprovals/join'
	import myCalendar from '@/views/jwManage/courses/myCourses/calendar'
	import * as echarts from 'echarts';
	import {
		mapActions,
		mapGetters,
		mapState
	} from 'vuex'
	export default {
		components: {
			fullCalendar,
			logs,
			join,
			myCalendar
		},
		data() {
			return {
				pageType:'index',
				noticeItem:'',
				taskTotal:0,
				applicationList: [
					{
						path: '/kqManage/veStuCheck/veStuCheck',
						title: '考勤管理',
						type: 'file-search'
					},
					{
						path: '/bonusPenalty/veStuReward/veStuReward',
						title: '奖惩管理',
						type: 'book'
					},{
						path: '/kwgl/chengji',
						title: '成绩查询',
						type: 'schedule'
					},
					{
						path: '/xjManage/veBaseStudent/veBaseStudent',
						title: '学籍查询',
						type: 'gift'
					},
					{
						path: '/courseManagement/applyFor',
						title: '调课申请',
						type: 'home'
					},
					{
						path: '/tjcx/kbcx',
						title: '课表查询',
						type: 'file-text'
					},{
						path: '/jxgzgl/jxrz',
						title: '教学日志',
						type: 'file'
					},{
						path: '/jxgzgl/gzzj',
						title: '工作总结',
						type: 'book'
					}
				],
				noiceData: [],
				redianData:[],
				tabActive: 1,
				taskList: [{
						name: '待办事项',
						status: 0,
						key: 1
					},
					{
						name: '已办事项',
						status: 1,
						key: 2
					},
					{
						name: '我发起的',
						status: 2,
						key: 3
					},
				],
				data: [],
				countList: [{
						title: '待办数量',
						count: 6
					},
					{
						title: '已办数量',
						count: 129
					},
					{
						title: '我申请的',
						count: 13
					}, {
						title: '通知数量',
						count: 0
					}
				],
				calendarDay: new Date(),
				noiceTotal:0,
				columns: [{
						title: '审批名称',
						dataIndex: 'processTypeName',
						key: 'processTypeName',
					    ellipsis: true
					},
					{
						title: '当前节点',
						dataIndex: 'currentStepName',
						key: 'currentStepName',
					    ellipsis: true
					},
					{
						title: '审批状态',
						dataIndex: 'currentStatusName',
						key: 'currentStatusName',
					    ellipsis: true
					},
					{
						title: '申请人',
						dataIndex: 'applicantName',
						key: 'applicantName',
					    ellipsis: true
					},
					{
						title: '提交时间',
						dataIndex: 'createdAt',
						key: 'createdAt',
					    ellipsis: true
					},
					{
						title: '操作',
						key: 'action',
						scopedSlots: {
							customRender: 'action'
						},
					},
				],
				scData:[{
						title: '教师培训安排',
						time: '2021-5-08 11:10:01'
					},
					{
						title: '校园网络维护通知',
						time: '2022-6-06 12:13:11'
					},
					{
						title: '学术讲座信息',
						time: '2022-7-10 09:00:01'
					},
					{
						title: '校园环境卫生整治',
						time: '2022-8-10 10:00:01'
					}, {
						title: '课程调整通知',
						time: '2023-8-18 12:10:01'
					},
					{
						title: '奖学金申请通知',
						time: '2023-9-10 09:20:01'
					}],
				showList: [{
						monitorTime: '2024-11-04 00:00:00',
						dataFlag: '1',
						data: 5,
					},
					{
						monitorTime: '2024-11-08 00:00:00',
						dataFlag: '1',
						data: 5,
					},
					{
						monitorTime: '2024-11-22 00:00:00',
						dataFlag: '2',
						data: 5,
					},
					{
						monitorTime: '2024-11-15 00:00:00',
						dataFlag: '2',
						data: 5,
					},
				],
				user:'',
				role:[],
				loginTime:'',
				CalendarData:{}
			}
		},
		computed:{
		    num(){
				let roles=JSON.parse(localStorage.getItem('role'));
				if(roles.length==1&&this.$hasPer(['teacher'])){
					return 4
				}else{
					return 3
				}
			}	
		},
		mounted() {
			this.getcountProcess();
			
			if(this.$hasPer(['system','ceshi'])){
				this.getannountCement('1,2',this.noiceData);
				this.getannountCement('3,4',this.redianData);
			}else{
				this.getannountCement('',this.noiceData);
			}
			
			if(this.$hasPer(['system','ceshi'])){
				this.getCountByTask();
			}
			this.user = JSON.parse(localStorage.getItem('userInfo'))
			this.role = JSON.parse(localStorage.getItem('role'));
			this.loginTime = localStorage.getItem('loginTime')
			this.changeliuc(1)
			if(this.role=='student'){
				this.applicationList = [
					{
						path: '/kqManage/veStuLeave/myLeaveApply',
						title: '请假申请',
						type: 'book'
					},
					{
						path: '/kqManage/veStuLeave/myLeave',
						title: '我的考勤',
						type: 'file-text'
					},{
						path: '/xjManage/xjManage/stuChange',
						title: '我的学籍',
						type: 'file-protect'
					},
					{
						path: '/kwgl/student/ks',
						title: '我的考试',
						type: 'calculator'
					},
					{
						path: '/kwgl/student/cj',
						title: '我的成绩',
						type: 'gift'
					},
					{
						path: '/jis/veStuEvaluation/myVeStuEvaluation',
						title: '我的评语',
						type: 'home'
					},
					{
						path: '/courses/myCourses/index',
						title: '我的课表',
						type: 'file-search'
					},
					{
						path: '/bonusPenalty/veStuReward/veStuReward',
						title: '我的奖励',
						type: 'calendar'
					}
				]
			}else if(this.role=='bzr'){
				this.applicationList =  [
					{
						path: '/kqManage/veStuCheck/veStuCheckbj',
						title: '课堂考勤',
						type: 'schedule'
					},
					{
						path: '/bonusPenalty/veStuReward/veStuReward',
						title: '奖惩管理',
						type: 'book'
					},{
						path: '/kwgl/chengji',
						title: '成绩录入',
						type: 'file-search'
					},
					{
						path: '/courseManagement/record',
						title: '我的调课',
						type: 'schedule'
					},
					{
						path: '/tjcx/kbcx',
						title: '我的课表',
						type: 'file-text'
					},{
						path: '/xjManage/veBaseStudent/veBaseStudent',
						title: '学生信息查询',
						type: 'file'
					},{
						path: '/sjxj/veStuScholarship/veStuScholarship',
						title: '学生奖学金',
						type: 'book'
					},{
						path: '/sjxj/veStuScholarship/veStuScholarship',
						title: '学生助学金',
						type: 'gift'
					}
				]
			}else if(this.role=='teacher'){
				this.applicationList =  [
					{
						path: '/pyfangan/jxrw/mission',
						title: '我的教学任务',
						type: 'schedule'
					},{
						path: '/kwgl/chengji',
						title: '成绩录入',
						type: 'file-search'
					},
					{
						path: '/courseManagement/record',
						title: '我的调课',
						type: 'schedule'
					},
					{
						path: '/jxgzgl/gzzj',
						title: '我的工作总结',
						type: 'file-text'
					},{
						path: '/jxgzgl/jxrz',
						title: '我的教学日志',
						type: 'file'
					},{
						path: '/jxgzgl/skjh',
						title: '我的授课计划',
						type: 'book'
					}
				]
			}
			else if(this.role=='ceshi'){
				this.applicationList =  [
					{
						path: '/baseData/schoolSpecialized/index',
						title: '专业管理',
						type: 'file-search'
					},
					{
						path: '/baseData/classManage/index',
						title: '班级管理',
						type: 'book'
					},{
						path: '/baseData/teacherinfo/index',
						title: '教师管理',
						type: 'schedule'
					},
					{
						path: '/dorm/buildMng',
						title: '宿舍基础',
						type: 'home'
					},
					{
						path: '/dormProperty/assetMng',
						title: '宿舍资产',
						type: 'file-text'
					},{
						path: '/enrollplan/planMng',
						title: '招生计划',
						type: 'file'
					},{
						path: '/admission/applyMsgMng',
						title: '报名信息',
						type: 'book'
					},{
						path: '/meet/reportedMng',
						title: '报到新生',
						type: 'gift'
					}
				]
			}
		},
		
		methods: {
			async getCountByTask(){
				let res=await getCount();
				this.taskTotal=res.result.total;
				this.getEchats(res.result.list);
			},
			getEchats(data){
				if(!document.getElementById('myChart')){
					return;
				}
				let myChart = echarts.init(document.getElementById('myChart'));
				if(myChart){
					myChart.setOption({
					  tooltip: {
					    trigger: 'item'
					  },
					  legend: {
					    left: 'center'
					  },
					  series: [
					    {
					      name: '任务类型统计',
					      type: 'pie',
						  center:['50%','50%'],
					      radius: ['40%', '60%'],
					      avoidLabelOverlap: false,
					      itemStyle: {
					        borderRadius: 10,
					        borderColor: '#fff',
					        borderWidth: 2
					      },
					      label: {
					        show: true,
					        fontSize: 12, // 调整字体大小，避免过大影响显示
					        position: 'outside'
					    },
					    emphasis: {
					        label: {
					            show: true, // 确保鼠标悬停时标签依然显示
					            fontSize: 12, // 保持字体大小一致
					            fontWeight: 'bold'
					        },
					        itemStyle: {
					            shadowBlur: 10,
					            shadowOffsetX: 0,
					            shadowColor: 'rgba(0, 0, 0, 0.5)'
					        }
					    },
					      labelLine: {
					        show: true,
							length: 3, //第一条线
							        length2: 3, //第二条线
							        lineStyle: {
							            width: 1, // 线条的宽度
							        }
					      },
					      data
					    }
					  ]
					});
				}
				
				// 监听窗口大小变化事件
				window.addEventListener('resize', function () {
					// 当窗口大小改变时，调用 ECharts 实例的 resize 方法重新调整图表大小
					myChart.resize();
				});
			},
			JoinOrchangeStuSuss(e){
				this.changeliuc(this.tabActive)
			},
			joinStu(type, id) {
				// this.joinOrChangeStuShow = true
				this.$refs.joinOrChangeStu.judesType(type, id)
			},
			joinlogs(type, id) {
				// this.joinOrChangeStuShow = true
				this.$refs.joinOrChangeStulogs.judesType(type, id)
			},
			changeliuc(e){
				var type = ''
				if(e===1){
					type ='pending'
					this.$http.get('/sys/processInstance/pendingApprovals',{currentStatus:type,pageSize:5,pageNo:1}).then((res)=>{
						this.data = res.result.records
					})
				}else if(e===2){ 
					type = 'approved'
					this.$http.get('/sys/processInstance/pendingApprovals',{currentStatus:type,pageSize:5,pageNo:1}).then((res)=>{
						this.data = res.result.records
					})
				}else if(e===3){
					this.$http.get('/sys/processInstance/myProcess',{pageSize:5,pageNo:1}).then((res)=>{
						this.data = res.result.records
					})
				}
			},
			getcountProcess(){
				this.$http.get('/sys/processInstance/countProcess').then((res)=>{
					this.countList = res.result
				})
			},
			async getannountCement(type,infoarr){
				let res=await annountCement({pageNo: 1,
					pageSize: 6,
					sendStatus: 1,
					msgCategory:type});
				let arr=res.result.records;
				// this.countList[3].count=res.result.total;
				for(var i = 0 ; i < arr.length ;i++){
					var obj = {
						title: '【'+arr[i].msgCategory_dictText+'】'+arr[i].titile,
						time: arr[i].createTime,
						id:arr[i].id,
						msgContent:arr[i].msgContent,
					}
					infoarr.push(obj);
				}
			},
			
			toContent(item) {
				this.$router.push({
				  path: '/notificationAnnouncement/notice/content',
				  query: {
				    id: item.id
				  }
				});
			},
			//处理数据
			handelData(e) {
				for (let i = 0; i < this.showList.length; i++) {
					if (this.showList[i].monitorTime.substring(0, 10) == e.day + '') {

						if (this.showList[i].data == null) { //如果没有数据则不填充样式，css中处理成灰色
							continue;
						} else if (this.showList[i].dataFlag == '0') {
							e.overCss = 'nomal';
						} else if (this.showList[i].dataFlag == '1') {
							e.overCss = 'warning';
						} else if (this.showList[i].dataFlag == '2') {
							e.overCss = 'error';
						}
					}
				}
				return true;
			},
		}
	}
</script>

<style scoped>
	.ant-layout-content {
		margin-right: 20px;
		overflow-y:hidden;
	}

	/deep/.ant-card-head {
		border-bottom: none;
		padding-left: 10px;
	}

	/deep/.ant-card-head-wrapper {
		min-height: 60px;
	}

	/deep/ .ant-card-head-title {
		padding-left: 6px;
	}

	/deep/ .ant-tabs-nav .ant-tabs-tab {
		margin-right: 0;
	}

	/deep/.ant-table-thead>tr>th,
	/deep/.ant-table-tbody>tr>td {
		padding: 17px 5px;
	}
	.canlendar{
		height:560px;
		background:#fff;
		overflow-y:auto;
		border:1px solid #e8e8e8;
		
	}
	.tit-icon {
		width: 28px;
		height: 28px;
		border-radius: 10px;
		line-height: 28px;
		text-align: center;
		margin-right: 10px;
		box-shadow: 0px 0px 10px rgba(64, 130, 250, .5);
		background: linear-gradient(to right, #4fa3fd, #4080fc);

		i {
			color: #fff;
		}
	}
	.echartCon{
		height:385px;
		width:100%;
		position:relative;
		.echartNum{
			position:absolute;
			top:50%;
			margin-top:-20px;
			left:0;
			right:0;
			text-align:center;
			.label{
				font-size:12px;
			}.num{
				font-weight:bold;
				font-size:18px;
			}
		}
	}
	.app-icon {
		height: 48px;
		width: 48px;
		display: inline-block;
		border-radius: 15px;
		line-height: 56px;
		text-align: center;

		&.ico0 {
			background: linear-gradient(to right, #4fa3fd, #4080fc);
		}

		&.ico1 {
			background: linear-gradient(to right, #ffb868, #ff9829);
		}

		&.ico2 {
			background: linear-gradient(to right, #13d8d1, #12b7d7);
		}

		&.ico3 {
			background: linear-gradient(to right, #5389f6, #3771ef);
		}

		&.ico4 {
			background: linear-gradient(to right, #ff6146, #ff7872);
		}

		&.ico5 {
			background: linear-gradient(to right, #ffb667, #ff9527);
		}

		&.ico6 {
			background: linear-gradient(to right, #8ae983, #5bce59);
		}

		&.ico7 {
			background: linear-gradient(to right, #ed735e, #f2918b);
		}

		i {
			color: #fff;
			font-size: 25px;
		}

	}
   .text_overflow {
		word-break: break-all;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1; /* 这里是超出几行省略 */
		overflow: hidden;
   }
	/deep/ .ant-tabs-bar {
		margin-bottom: 0;
	}

	/deep/ .ant-card-body {
		padding-top: 5px;
		padding-bottom: 5px;
	}
	.minHeight{
		height:279px;
	}
	.task-con {
		min-height: 455px;
		margin-top:15px;
	}

	.app-tit {
		margin-top: 10px;
		color:#262626;
	}

	/deep/ .ant-list-item-meta-title {
		font-weight: normal;
	}

	/deep/ .ant-layout-sider {
		background: none;
	}
	.desc-info {
		color: #fff;
		border-radius: 3px;
		display: flex;
		align-items: center;
		padding: 35px;

		b {
			margin-right: 5px;
		}

		font-size:16px;
		box-shadow: 0 0 10px rgba(161, 247, 255, .5);

		p {
			font-size: 14px;
			margin-top: 5px;
			margin-bottom: 0;
		}
	}
	
	.stu-bg{
		background: #01a1f7 url("../../assets/img/info-bg-stu.jpg") no-repeat;
		background-size: 100% 100%;
	}
	
	.another-bg{
		background: #01a1f7 url("../../assets/img/info-bg.jpg") no-repeat;
		background-size: 100% 100%;
	}

	.count-bg {
		border-radius: 10px;
		padding: 10px 20px;

		&.bg0 {
			background: #e4f0fe url('../../assets/img/sjgl-ico0.png') no-repeat;
			background-position: 89% 70%;
			background-size: 50px;
		}

		&.bg1 {
			background: #e0f7ed url('../../assets/img/sjgl-ico1.png') no-repeat;
			background-position: 89% 70%;
			background-size: 50px;
		}

		&.bg2 {
			background: #fff2e2 url('../../assets/img/sjgl-ico2.png') no-repeat;
			background-position: 89% 70%;
			background-size: 50px;
		}

		&.bg3 {
			background: #ffeae7 url('../../assets/img/sjgl-ico3.png') no-repeat;
			background-position: 89% 70%;
			background-size: 50px;
		}
		.count-num {
			padding-top: 10px;
		}
		.count {
			font-size: 30px;
		}
		.unit {
			font-size: 12px
		}
		.label {
			padding-top: 10px;
			font-size: 12px
		}
	}

	/deep/.ant-list-item {
		padding: 10px 0;
	}

	.title {
		display: flex;
		align-items: center;
	}
	
	.rwtabs{
		margin-bottom: 10px;
	}

	/deep/.ant-table-tbody tr:nth-child(2n) {
		background: #f4f7f9;
	}
</style>