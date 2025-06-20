<template>

	<div>
		<a-card :bordered="false">
			<a-menu v-model="current" mode="horizontal">
				<a-menu-item key="dormModifyApply"> 宿舍变更申请 </a-menu-item>
				<a-menu-item key="dormModifyApprove" v-if="$hasPer(['system'])"> 宿舍变更审批 </a-menu-item>
				<a-menu-item key="dormModifyQuery" v-if="$hasPer(['system'])"> 宿舍变更查询 </a-menu-item>
			</a-menu>
			<div v-if="current == 'dormModifyApply'" >
				<div class="top" v-if="$hasPer(['system'])">
					<span class="head-span">姓名：</span>
					<div>
						<a-input  class="condition" placeholder="请输入姓名" v-model="name"
							onkeyup="this.value=this.value.replace(/[, ]/g,'')" />
					</div>
					<a-button type="primary" style="margin-left:20px;" icon="search" @click="getModifyApply">
						搜索
					</a-button>
					<a-button type="danger" style="margin-left:20px;" @click="resetAll">
						清空
					</a-button>
				</div>
				<div style="margin:20px 0;">
					<a-button type="primary" icon="plus" @click="showModal">
						添加
					</a-button>
					<a-button  type="primary" style="margin-left:20px;" icon="reload" @click="getModifyApply">
						刷新
					</a-button>
				</div>

				<div>
					<a-table :columns="columns"  :scroll="{ x: true }" :data-source="data" :defaultCurrent="6" :pagination="pagination"
						@change="tableChange" class="long-table">
						<span slot="operator" slot-scope="text, record">
							<a @click="editModifyApply(record.key)">编辑</a>
							<a-divider type="vertical" />
							<a  @click="deleteModifyApply(record.key)">删除</a>
						</span>
					</a-table>
				</div>
				<a-modal title="编辑" :visible="edit" :confirm-loading="confirmLoading" @cancel="editCancel"
					width="1072px">
					<table class="scanTable">
						<tr>
							<td class="single">
								<div>用户</div>
							</td>
							<td class="long">
								<a-cascader class="small" :options="editOldSchool" placeholder="请选择校区"
									@change="editOldSchoolChange" v-model="editOldSchoolId" />
								<a-cascader class="small" :options="editOldBuild" placeholder="请选择建筑"
									@change="editOldBuildChange" v-model="editOldBuildId" />
								<a-cascader class="small" :options="editOldDorm" placeholder="请选择宿舍"
									@change="editOldDormChange" v-model="editOldDormId" />
								<a-cascader class="small" :options="editStuName" placeholder="请选择学生"
									v-model="editOldStudentId" />
							</td>
						</tr>
				
						<tr>
							<td class="single">
								<div>新校区号</div>
							</td>
							<td class="double">
								<a-cascader class="scanInput" :options="editNewSchool" placeholder="请选择校区"
									@change="editNewSchoolChange" v-model="editNewSchoolId" />
							</td>
						</tr>
				
						<tr>
							<td class="single">
								<div>新宿舍楼编号</div>
							</td>
							<td class="double">
								<a-cascader class="scanInput" :options="editNewBuild" placeholder="请选择建筑"
									v-model="editNewBuildId" />
							</td>
						</tr>
				
						<tr>
							<td class="single">
								<div>申请原因</div>
							</td>
							<td class="double">
								<a-input class="scanInput" placeholder="请输入申请原因"
									v-model="editCause"></a-input>
							</td>
						</tr>
					</table>
				
					<template slot="footer">
						<a-button @click="editCancel()" >取消</a-button>
						<a-button type="primary" @click="editOK()">确定</a-button>
					</template>
				</a-modal>
				<a-modal title="添加" :visible="add" :confirm-loading="confirmLoading" @cancel="addCancel"
					width="1072px">
					<table class="scanTable">
						<tr>
							<td class="single">
								<div>用户</div>
							</td>
							<td class="long">
								<a-cascader class="small" :options="oldSchool" placeholder="请选择校区"
									@change="oldSchoolChange" v-model="oldSchoolId" />
								<a-cascader class="small" :options="oldBuild" placeholder="请选择建筑"
									@change="oldBuildChange" v-model="oldBuildId" />
								<a-cascader class="small" :options="oldDorm" placeholder="请选择宿舍"
									@change="oldDormChange" v-model="oldDormId" />
								<a-cascader class="small" :options="stuName" placeholder="请选择学生"
									v-model="studentId" />
							</td>
						</tr>
						<tr>
							<td class="single">
								<div>新校区号</div>
							</td>
							<td class="double">
								<a-cascader class="scanInput" :options="newSchool" placeholder="请选择校区"
									@change="newSchoolChange" v-model="newSchoolId" />
							</td>
						</tr>
				
						<tr>
							<td class="single">
								<div>新宿舍楼编号</div>
							</td>
							<td class="double">
								<a-cascader class="scanInput" :options="newBuild" placeholder="请选择建筑"
									v-model="newBuildId" />
							</td>
						</tr>
				
						<tr>
							<td class="single">
								<div>申请原因</div>
							</td>
							<td class="double">
								<a-input class="scanInput" placeholder="请输入申请原因" v-model="cause"></a-input>
							</td>
						</tr>
					</table>
				
					<template slot="footer">
						<a-button 
							@click="addCancel()" class="buttonCancel">取消</a-button>
						<a-button type="primary" 
							@click="addOK()" class="buttonOk">确定</a-button>
					</template>
				</a-modal>
			</div>
			<dormModifyApprove v-if="current == 'dormModifyApprove'"></dormModifyApprove>
			<dormModifyQuery v-if="current == 'dormModifyQuery'"></dormModifyQuery>
	</a-card>
	</div>
</template>

<script>
	import {
		Icon
	} from 'ant-design-vue';
	import {
		axios
	} from "@/utils/request"
	import dormModifyApprove from '@/views/dorm/dormMng/dormModifyApprove'
	import dormModifyQuery from '@/views/dorm/dormMng/dormModifyQuery'
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
			key: 'name'
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
			title: '新宿舍楼',
			dataIndex: 'newBuild',
			key: 'newBuild',
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
			width: '140px',
			fixed: 'right',
			scopedSlots: {
				customRender: 'operator'
			},
		},
	];

	let data = [];



	export default {
		components: {
			dormModifyApprove,
			dormModifyQuery,
		},
		data() {
			return {
				current: ['dormModifyApply'],
				cause: '',
				editCause: '',
				add: false,
				edit: false,
				name: '',
				pagination: {
					current: 1,
					pageSize: 4,
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
				state: ['申请', '审批通过', '驳回', '已执行'],
				/* 添加数据 */
				oldDorm: [],
				oldBuild: [],
				oldSchool: [],
				newSchool: [],
				newBuild: [],
				stuName: [],
				oldSchoolId: [],
				oldBuildId: [],
				oldDormId: [],
				studentId: [],
				newSchoolId: [],
				newBuildId: [],
				/* 按钮大小 */
				size: 'small',
				/* 下拉框数据 */
				/* 添加-弹出框数据 */
				ModalText: 'Content of the modal',
				visible: false,
				confirmLoading: false,
				/* 编辑数据 */
				editId: '',
				editOldSchool: [],
				editOldSchoolId: [],
				editOldBuild: [],
				editOldBuildId: [],
				editOldDorm: [],
				editOldDormId: [],
				editStuName: [],
				editOldStudentId: [],
				editNewSchool: [],
				editNewSchoolId: [],
				editNewBuild: [],
				editNewBuildId: [],
			};
		},
		mounted() {
			this.getModifyApply();
			this.getSchoolList();
		},
		methods: {
			/* 获取校区列表 */
			getSchoolList() {
				axios({
					url: 'dorm/laiFang/xiaoQu',
					method: 'post',
					params: {}
				}).then(res => {
					for (let school of res.result) {
						this.oldSchool.push({
							value: school.id,
							label: school.name
						});
						this.newSchool.push({
							value: school.id,
							label: school.name
						});
						this.editOldSchool.push({
							value: school.id,
							label: school.name
						});
						this.editNewSchool.push({
							value: school.id,
							label: school.name
						})
					}
				}).catch(err => {
					this.$message.warning("此处有异常");
				})
			},
			/* 通过校区ID获取宿舍楼列表 */
			oldSchoolChange(value, selectedOptions) {
				this.oldBuildId = [];
				this.oldDormId = [];
				this.studentId = [];
				this.oldBuild = [];
				this.oldDorm = [];
				this.stuName = [];
				if (value.length == 0) {
					return;
				}
				axios({
					url: 'dorm/laiFang/suSheLou',
					method: 'post',
					params: {
						"XQBH": this.oldSchoolId[0]
					}
				}).then(res => {
					this.oldBuild.splice(0, this.oldBuild.length);

					for (let build of res.result) {
						this.oldBuild.push({
							value: build.id,
							label: build.name
						})
					}
				}).catch(err => {
					this.$message.warning("此处有异常");
				})
			},
			/* 通过校区ID获取宿舍楼列表 */
			newSchoolChange(value) {
				this.newBuildId = [];
				this.newBuild = [];
				if (value.length == 0) {
					return;
				}
				axios({
					url: 'dorm/laiFang/suSheLou',
					method: 'post',
					params: {
						"XQBH": this.newSchoolId[0]
					}
				}).then(res => {
					this.newBuild = [];

					for (let build of res.result) {
						this.newBuild.push({
							value: build.id,
							label: build.name
						})
					}
				}).catch(err => {
					this.$message.warning("此处有异常");
				})
			},
			/* 通过校区ID、宿舍楼ID获取宿舍列表 */
			oldBuildChange(value, selectedOptions) {
				this.oldDormId = [];
				this.studentId = [];
				this.oldDorm = [];
				this.stuName = []
				if (value.length == 0) {
					return;
				}
				axios({
					url: 'dorm/laiFang/suShe',
					method: 'post',
					params: {
						"XQBH": this.oldSchoolId[0],
						"SSLBH": this.oldBuildId[0]
					}
				}).then(res => {
					this.oldDorm = [];

					for (let dorm of res.result) {
						this.oldDorm.push({
							value: dorm.id,
							label: dorm.name
						})
					}
				}).catch(err => {
					this.$message.warning("此处有异常");
				})
			},
			/* 通过校区ID、宿舍楼ID、宿舍ID获取学生列表 */
			oldDormChange(value) {
				this.studentId = [];
				this.stuName = [];
				if (value.length == 0) {
					return;
				}
				axios({
					url: 'dorm/laiFang/student',
					method: 'post',
					params: {
						"XQBH": this.oldSchoolId[0],
						"SSLBH": this.oldBuildId[0],
						"SSBH": this.oldDormId[0]
					}
				}).then(res => {
					this.stuName = [];

					for (let stu of res.result) {
						this.stuName.push({
							value: stu.id,
							label: stu.name
						})
					}
				}).catch(err => {
					this.$message.warning("此处有异常");
				})
			},
			showModal() {
				this.oldSchoolId = [];
				this.oldBuildId = [];
				this.oldDormId = [];
				this.studentId = [];
				this.newSchoolId = [];
				this.newBuildId = [];
				this.oldBuild = [];
				this.oldDorm = [];
				this.stuName = [];
				this.newBuild = [];
				this.cause = '';
				this.add = true;
			},
			addOK() {
				if (this.oldSchoolId.length == 0 || this.oldBuildId.length == 0 || this.oldDormId.length == 0 || this
					.studentId
					.length == 0 ||
					this.newSchoolId.length == 0 || this.newBuildId.length == 0 || this.cause == '') {
					this.$message.warning("请将信息输入完整");
					return;
				}
				this.confirmLoading = true;
				axios({
					url: 'dorm/change/add',
					method: 'post',
					params: {
						"userId": this.studentId[0],
						"XXQH": this.newSchoolId[0],
						"XSSLBH": this.newBuildId[0],
						"SQYY": this.cause,
						"XQH": this.oldSchoolId[0],
						"SSLH": this.oldBuildId[0],
						"FJBH": this.oldDormId[0],
					}
				}).then(res => {
					this.$message.success(res.message);
					this.getModifyApply();
				}).catch(err => {
					this.$message.warning("此处有异常");
				})
				this.add = false;
				this.confirmLoading = false;
			},
			addCancel(e) {
				this.add = false;
			},
			tableChange(pagination, filters, sorter) {
				this.pagination.current = pagination.current;
				this.pagination.pageSize = pagination.pageSize;
			},
			getModifyApply() {
				axios({
					url: 'dorm/change/queryByName',
					method: 'post',
					params: {
						"name": this.name
					}
				}).then(res => {

					data.splice(0, data.length);
					for (let change of res.result) {
						if (change.bdzt != 0) {
							continue;
						}
						let spsj = change.spsj == null ? '' : this.dateToFormat(new Date(change.spsj * 1000));
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
							applyName: change.sqr,
							applyTime: this.dateToFormat(new Date(change.sqsj * 1000)),
							approveName: change.spr,
							approveTime: spsj
						})
					}
					this.pagination.current = 1;
					this.pagination.total = data.length;
				}).catch(err => {
					this.$message.warning("此处有异常");
				})
			},
			deleteModifyApply(id) {
				this.$confirm({
					title: '提示',
					content: '是否删除这条信息',
					okText: '是',
					okType: 'danger',
					cancelText: '否',
					onOk: () => {
						axios({
							url: 'dorm/change/delete',
							method: 'post',
							params: {
								"id": id
							}
						}).then(res => {
							this.$message.success(res.message);
							this.getModifyApply();
						}).catch(err => {
							this.$message.warning("此处有异常");
						})
					},
					onCancel: () => {
						return
					},
				});
			},
			resetAll() {
				this.name = '';
			},
			editModifyApply(id) {
				this.editId = id;
				axios({
					url: 'dorm/change/updateMessage',
					method: 'post',
					params: {
						"id": id
					}
				}).then(res => {

					this.editCause = res.result.sqyy;
					this.editOldSchoolId = [res.result.xqh];
					this.editOldSchoolChange([1]);
					this.editOldBuildId = [res.result.sslbm];
					this.editOldBuildChange([1]);
					this.editOldDormId = [res.result.fjbm];
					this.editOldDormChange([1]);
					this.editOldStudentId = [res.result.userId];

					this.editNewSchoolId = [res.result.xxqh];
					this.editNewSchoolChange([1]);
					this.editNewBuildId = [res.result.xsslbm];
					this.edit = true;
				}).catch(err => {
					this.$message.warning("此处有异常");
				})
			},
			editOK() {
				this.confirmLoading = true;
				if (this.editCause == "" || this.editOldSchoolId.length == 0 || this.editOldBuildId.length == 0 ||
					this.editOldDormId.length == 0 || this.editOldStudentId.length == 0 || this.editNewSchoolId.length ==
					0 ||
					this.editNewBuildId.length == 0) {
					this.$message.warning("请将信息输入完整");
					return;
				}
				axios({
					url: 'dorm/change/update',
					method: 'post',
					params: {
						"id": this.editId,
						"userId": this.editOldStudentId[0],
						"XXQH": this.editNewSchoolId[0],
						"XSSLBH": this.editNewBuildId[0],
						"SQYY": this.editCause,
						"XQH": this.editOldSchoolId[0],
						"SSLH": this.editOldBuildId[0],
						"FJBH": this.editOldDormId[0]
					}
				}).then(res => {
					this.$message.success(res.message);
					this.getModifyApply();
					this.edit = false;
					this.confirmLoading = false;
				}).catch(err => {
					this.$message.warning("此处有异常");
				})
			},
			editCancel() {
				this.edit = false;
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
			editNewSchoolChange(value) {
				this.editNewBuildId = [];
				if (value.length == 0) {
					return;
				}
				axios({
					url: 'dorm/laiFang/suSheLou',
					method: 'post',
					params: {
						"XQBH": this.editNewSchoolId[0]
					}
				}).then(res => {
					this.editNewBuild.splice(0, this.editNewBuild.length);

					for (let build of res.result) {
						this.editNewBuild.push({
							value: build.id,
							label: build.name
						})
					}
				}).catch(err => {
					this.$message.warning("此处有异常");
				})
			},
			editOldSchoolChange(value) {
				this.editOldBuildId = [];
				this.editOldDorm = [];
				this.editOldDormId = [];
				this.editOldStudentId = [];
				this.editStuName = [];
				if (value.length == 0) {
					return;
				}
				axios({
					url: 'dorm/laiFang/suSheLou',
					method: 'post',
					params: {
						"XQBH": this.editOldSchoolId[0]
					}
				}).then(res => {
					this.editOldBuild.splice(0, this.editOldBuild.length);

					for (let build of res.result) {
						this.editOldBuild.push({
							value: build.id,
							label: build.name
						})
					}
				}).catch(err => {
					this.$message.warning("此处有异常");
				})
			},
			editOldBuildChange(value) {
				this.editOldDormId = [];
				this.editOldStudentId = [];
				this.editStuName = [];
				if (value.length == 0) {
					return;
				}
				axios({
					url: 'dorm/laiFang/suShe',
					method: 'post',
					params: {
						"XQBH": this.editOldSchoolId[0],
						"SSLBH": this.editOldBuildId[0]
					}
				}).then(res => {
					this.editOldDorm.splice(0, this.editOldDorm.length);

					for (let dorm of res.result) {
						this.editOldDorm.push({
							value: dorm.id,
							label: dorm.name
						})
					}
				}).catch(err => {
					this.$message.warning("此处有异常");
				})
			},
			editOldDormChange(value) {
				this.editOldStudentId = [];
				if (value.length == 0) {
					return;
				}
				axios({
					url: 'dorm/laiFang/student',
					method: 'post',
					params: {
						"XQBH": this.editOldSchoolId[0],
						"SSLBH": this.editOldBuildId[0],
						"SSBH": this.editOldDormId[0]
					}
				}).then(res => {
					this.editStuName.splice(0, this.editStuName);

					for (let stu of res.result) {
						this.editStuName.push({
							value: stu.id,
							label: stu.name
						})
					}
				}).catch(err => {
					this.$message.warning("此处有异常");
				})
			},
		},
	};
</script>

<style scoped>
	/deep/ .ant-card-body{
		padding:0 16px;
	}
	.top {
		padding:30px;
		padding-bottom:0;
		display: flex;
		align-items: center;
	}
	

</style>