<template>
	<div >
		<div >
			<div class="content-head">
				<div class="top">
					<span class="head-span">姓名：</span>
					<div>
						<a-input class="condition" placeholder="请输入姓名" v-model="name" onkeyup="this.value=this.value.replace(/[, ]/g,'')"/>
					</div>
					<a-button type="primary" style="margin-left:20px" icon="search" @click="getModifyApprove">
						搜索
					</a-button>
					<a-button type="danger" style="margin-left:20px" @click="resetAll">
						清空
					</a-button>
				</div>
				<div>
					<a-button type="primary" icon="reload" @click="getModifyApprove">
						刷新
					</a-button>
				</div>
			</div>
			<div>
				<a-table :columns="columns" :data-source="data" :defaultCurrent="6" :pagination="pagination"
					@change="tableChange" class="long-table">
					<span slot="operator" slot-scope="text, record">
						<a  @click="getApproveById(record.key)">审批</a>
					</span>
				</a-table>
				<a-modal title="审批" :visible="approve" :confirm-loading="confirmLoading" @cancel="approveCancel"
					width="872px">
					<table class="scanTable">
						<tr>
							<td class="single">
								<div>申请详情</div>
							</td>
							<td class="long">
								<div>学生姓名: <span>{{ studentName }}</span></div>
								<div>学号: <span>{{ studentId }}</span></div>
								<div>原宿舍: <span>{{ oldDetail }}</span></div>
								<div>更换到: <span>{{ newDetail }}</span></div>
								<div>申请原因: <span>{{ approveCause }}</span></div>
							</td>
						</tr>
						<tr>
							<td class="single">
								<div>审批结果</div>
							</td>
							<td class="long">
								<label v-for="(item) in radioName"> {{ item.value }}
									<input type="radio" name="approveResult" :value="item.index"
										v-model="checkedValue">
								</label>
							</td>
						</tr>
						<tr>
							<td class="single">
								<div>分配到:</div>
							</td>
							<td class="long">
								<a-cascader class="small" :options="newDorm" placeholder="请选择宿舍"
									v-model="newDormId" />
								床位号: <a-input class="small" placeholder="请输入床位号" v-model="bedId"></a-input>
							</td>
						</tr>
						<tr>
							<td class="single">
								<div>审批说明</div>
							</td>
							<td class="long">
								<a-input class="scanInput" placeholder="请输入审批说明" v-model="approveMessage">
								</a-input>
							</td>
						</tr>
					</table>
					<template slot="footer">
						<a-button   @click="approveCancel()" >取消</a-button>
						<a-button type="primary"   @click="approveOK()">确定</a-button>
					</template>
				</a-modal>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		Icon
	} from 'ant-design-vue';
	import {
		axios
	} from "@/utils/request"

	const IconFont = Icon.createFromIconfontCN({
		scriptUrl: '//at.alicdn.com/t/font_2390461_vvis3tohqh.js',
	});

	const columns = [{
			title: '学号',
			dataIndex: 'id',
			key: 'id',
		},
		{
			title: '姓名',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: '原宿舍楼',
			dataIndex: 'oldBuild',
			key: 'oldBuild',
		},
		{
			title: '原宿舍',
			dataIndex: 'oldDorm',
			key: 'oldDorm',
		},
		{
			title: '新宿舍',
			dataIndex: 'newDorm',
			key: 'newDorm',
		},
		{
			title: '状态',
			dataIndex: 'state',
			key: 'state',
		},
		{
			title: '申请人',
			dataIndex: 'applyName',
			key: 'applyName',
		},
		{
			title: '申请时间',
			dataIndex: 'applyTime',
			key: 'applyTime',
		},
		{
			title: '审批人',
			dataIndex: 'approveName',
			key: 'approveName',
		},
		{
			title: '审批时间',
			dataIndex: 'approveTime',
			key: 'approveTime',
		},
		{
			title: '操作',
			dataIndex: 'operator',
			key: 'operator',
			scopedSlots: {
				customRender: 'operator'
			},
		},
	];

	let data = [];


	export default {
		data() {
			return {
				pagination: {
					current: 1,
					pageSize: 10,
					pageSizeOptions: ['6', '10'],
					showTotal: (total, range) => {
						return '显示' + range[0] + '到' + range[1] + '条, 共' + total + '条记录'
					},
					showQuickJumper: true,
					showSizeChanger: true,
					total: 1000
				},
				/* 表格数据 */
				data,
				columns,
				newBuild: [],
				/* 按钮大小 */
				size: 'small',
				confirmLoading: false,
				name: '',
				state: ['申请', '审批通过', '驳回', '已执行'],
				approve: false,
				checkedValue: '',
				radioName: [{
					index: 1,
					value: '通过'
				}, {
					index: 2,
					value: '驳回'
				}],
				approveCause: '',
				studentName: '',
				studentId: '',
				userId: '',
				oldDetail: '',
				newDetail: '',
				newDorm: [],
				newDormId: [],
				approveId: '',
				schoolId: '',
				buildId: '',
				approveMessage: '',
				bedId: '',
			};
		},
		mounted() {
			this.getModifyApprove();
		},
		components: {
			IconFont,
		},
		methods: {
			tableChange(pagination, filters, sorter) {
				this.pagination.current = pagination.current;
				this.pagination.pageSize = pagination.pageSize;
			},
			clearShcoolType() {
				console.log(this.$refs.school);
			},
			getModifyApprove() {
				axios({
					url: 'dorm/change/queryByName',
					method: 'post',
					params: {
						"name": this.name
					}
				}).then(res => {

					data.length = 0;
					for (let change of res.result) {
						if (change.bdzt != 0) {
							continue;
						}
						let spsj = change.spsj == null ? '' : this.dateToFormat(new Date(change.spsj * 1000));
						let spr = change.bdzt == 0 ? '' : '管理员';
						data.push({
							key: change.id,
							id: change.xh,
							name: change.xm,
							oldSchool: change.xqm,
							oldBuild: change.sslm,
							oldFloor: change.lch,
							oldDorm: change.ssm,
							newSchool: change.xxqm,
							newBuild: change.xsslm,
							newFloor: change.xlch,
							newDorm: change.xssm,
							state: this.state[change.bdzt],
							applyName: change.xm,
							applyTime: this.dateToFormat(new Date(change.sqsj * 1000)),
							approveName: spr,
							approveTime: spsj
						})
					}
					this.pagination.current = 1;
					this.pagination.total = data.length;
				}).catch(err => {
					this.$message.warning("此处有异常");
				})
			},
			dateToFormat(date) {
				let str = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ';
				if (date.getHours() < 10) {
					str += '0' + date.getHours();
				} else {
					str += date.getHours();
				}
				str += ':'
				if (date.getMinutes() < 10) {
					str += '0' + date.getMinutes();
				} else {
					str += date.getMinutes();
				}
				return str;
			},
			resetAll() {
				this.name = '';
			},
			getApproveById(id) {
				this.approveId = id;
				this.approveMessage = '';
				this.bedId = '';
				this.newDormId = [];
				this.confirmLoading = true;
				axios({
					url: 'dorm/change/approveMessage',
					method: 'post',
					params: {
						"id": id
					}
				}).then(res => {

					this.studentName = res.result.xm;
					this.studentId = res.result.xh;
					this.userId = res.result.sqr;
					this.oldDetail = res.result.xqm + " " + res.result.sslm + " " + res.result.ssm;
					this.newDetail = res.result.xxqm + " " + res.result.xsslm;
					this.approveCause = res.result.sqyy;
					this.approve = true;
					this.schoolId = res.result.newCampusId,
						this.buildId = res.result.xsslh,
						this.getDormList();
				}).catch(err => {
					this.$message.warning("此处有异常");
				})
			},
			approveOK() {
				if (this.checkedValue == '') {
					this.$message.warning("请选择审批结果");
					return;
				}
				if (this.checkedValue == 1 && this.newDormId.length == 0 && this.bedId == '') {
					this.$message.warning("请选择分配的宿舍和床位");
					return;
				}
				axios({
					url: 'dorm/change/approve',
					method: 'post',
					params: {
						"id": this.approveId,
						"BDZT": this.checkedValue,
						"SPSM": this.approveMessage,
						"XXQH": this.schoolId,
						"XSSLBH": this.buildId,
						"XFJBH": this.newDormId[0],
						"userId": this.userId,
						"CWH": this.bedId
					}
				}).then(res => {
					this.$message.success(res.message);
					this.getModifyApprove();
					this.approve = false;
				}).catch(err => {
					this.$message.warning("此处有异常");
				})
			},
			approveCancel() {
				this.approve = false;
			},
			getDormList() {
				console.log(this.schoolId, this.buildId);
				axios({
					url: 'dorm/laiFang/suShe',
					method: 'post',
					params: {
						"XQBH": this.schoolId,
						"SSLBH": this.buildId
					}
				}).then(res => {

					this.newDorm.splice(0, this.newDorm.length);
					for (let dorm of res.result) {
						this.newDorm.push({
							value: dorm.id,
							label: dorm.name
						})
					}
				}).catch(err => {
					this.$message.warning("此处有异常");
				})
			}
		},
	};
</script>

<style scoped>
	.top {
		padding:30px;
		display: flex;
		align-items: center;
	}
	.dorm-modify-top {
		width: 500px;
		height: 40px;
		border: 0px;
		background-color: #E9EDF6;
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
</style>
