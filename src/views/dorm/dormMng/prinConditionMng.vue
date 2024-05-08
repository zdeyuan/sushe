<template>
	<div style="background:#E9EDF6; padding:30px">
		<div class="content-title ">
			违纪情况管理
		</div>
		<div class="pageContentBox">
			<div class="headTop">违纪管理 > <span class="notTop">违纪情况管理</span></div>
			<div class="content-head">
				<div>
					<a-button :size="size" class="content-button button-lightgreen" style="font-size:16px;width:88px;height:34px;background-color:#3a3aff " @click="showModal">
						<icon-font type="icontianjia" style="color: #FFFFFF;" />
						添加
					</a-button>
					<a-modal title="添加" :visible="add" :confirm-loading="confirmLoading" @cancel="addCancel"
						width="872px">
						<table class="scanTable">
							<tr>
								<td class="single">
									<div>选择学生:</div>
								</td>
								<td class="long">
									<a-cascader class="small" :options="school" placeholder="请选择校区"
										@change="schoolChange" v-model="schoolId" />
									<a-cascader class="small" :options="build" placeholder="请选择建筑" @change="buildChange"
										v-model="buildId" />
									<a-cascader class="small" :options="dorm" placeholder="请选择宿舍" @change="dormChange"
										v-model="dormId" />
									<a-cascader class="small" :options="student" placeholder="请选择学生"
										v-model="studentId" />
								</td>
							</tr>

							<tr>
								<td class="single">
									<div>违纪类型:</div>
								</td>
								<td class="long">
									<a-cascader class="scanInput" :options="type" placeholder="请选择违纪类型"
										v-model="typeId" />
								</td>
							</tr>

							<tr>
								<td class="single">
									<div>违纪时间:</div>
								</td>
								<td class="long">
									<input type="date" v-model="scanTime" class="scanInput">
								</td>
							</tr>

							<tr>
								<td class="single">
									<div>违纪说明</div>
								</td>
								<td class="double">
									<a-input class="scanInput" placeholder="请输入违纪说明" v-model="scanDetail"></a-input>
								</td>
							</tr>
						</table>

						<template slot="footer">
							<a-button type="primary" style="background-color:#028be2;color:#ffffff;font-weight:bold" @click="addOK()" class="buttonOk">确定</a-button>
							<a-button style="background-color:#999999;color:#ffffff;font-weight:bold" @click="addCancel()" class="buttonCancel">取消</a-button>
						</template>
					</a-modal>

					<a-button :size="size" class="content-button button-orange button-after" style="font-size:16px;width:88px;height:34px;background-color:#E61A1A " @click="deletePatch">
						<icon-font type="iconsousuo" style="color: #FFFFFF;" />
						删除
					</a-button>

					<a-button :size="size" class="content-button button-skyblue button-after" style="font-size:16px;width:88px;height:34px;background-color:#3a3aff " @click="getPrinList">
						<icon-font type="iconxindongfang-shuaxintubiao" style="color: #FFFFFF;" />
						刷新
					</a-button>
				</div>

				<div style="min-width: 400px;"></div>

				<div>
					<span class="head-span">学号</span>
					<a-input class="condition" placeholder="请输入学号" v-model="stuId" onkeyup="this.value=this.value.replace(/[, ]/g,'')"/>
				</div>

				<div>
					<span class="head-span">姓名</span>
					<a-input class="condition" placeholder="请输入姓名" v-model="name" onkeyup="this.value=this.value.replace(/[, ]/g,'')"/>
				</div>

				<div>
					<a-button :size="size" class="content-button button-blue" style="font-size:16px;width:88px;height:34px;background-color:#1AE642 " @click="getPrinList">
						<icon-font type="iconsousuo" style="color: #FFFFFF;" />
						搜索
					</a-button>

					<a-button :size="size" class="content-button button-orange button-after" style="font-size:16px;width:88px;height:34px;background-color:#E61A1A " @click="resetAll">
						<icon-font type="iconqingkong1" style="color: #FFFFFF;" />
						清空
					</a-button>
				</div>
			</div>
			<div>
				<a-table :columns="columns" :data-source="data" :row-selection="{ selectedRowKeys: deleteList, onChange: onChange}" :defaultCurrent="6"
					:pagination="pagination" @change="tableChange">
					<span slot="operator" slot-scope="text, record">
						<a style="font-size:18px;font-weigth:bold;border-bottom: 1px solid #66C3FD;" @click="editPrin(record.key)">编辑</a>
						<span>|</span>
						<a style="font-size:18px;font-weigth:bold;color:orange; border-bottom: 1px solid orange;" @click="deletePrin(record.key)">删除</a>
					</span>
				</a-table>
			</div>
		</div>
		<a-modal title="编辑" :visible="edit" :confirm-loading="confirmLoading" @cancel="editCancel" width="872px">
			<table class="scanTable">
				<tr>
					<td class="single">
						<div>姓名:</div>
					</td>
					<td class="long">
						<a-input class="scanInput" :disabled="true" v-model="scanName"></a-input>
					</td>
				</tr>
				<tr>
					<td class="single">
						<div>违纪类型:</div>
					</td>
					<td class="long">
						<a-cascader class="scanInput" :options="type" placeholder="请选择违纪类型" v-model="typeId" />
					</td>
				</tr>

				<tr>
					<td class="single">
						<div>违纪时间:</div>
					</td>
					<td class="long">
						<input type="date" v-model="scanTime" class="scanInput">
					</td>
				</tr>

				<tr>
					<td class="single">
						<div>违纪说明</div>
					</td>
					<td class="double">
						<a-input class="scanInput" placeholder="请输入违纪说明" v-model="scanDetail"></a-input>
					</td>
				</tr>
			</table>

			<template slot="footer">
				<a-button type="primary" style="background-color:#028be2;color:#ffffff;font-weight:bold" @click="editOK()" class="buttonOk">确定</a-button>
				<a-button style="background-color:#999999;color:#ffffff;font-weight:bold" @click="editCancel()" class="buttonCancel">取消</a-button>
			</template>
		</a-modal>
	</div>


</template>

<script>
	import {
		Icon
	} from 'ant-design-vue';
	import {
		axios
	} from '@/utils/request'

	const IconFont = Icon.createFromIconfontCN({
		scriptUrl: '//at.alicdn.com/t/font_2390461_f6v2cx4wmzq.js',
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
			title: '违纪类型',
			dataIndex: 'type',
			key: 'type',
		},
		{
			title: '违纪时间',
			dataIndex: 'time',
			key: 'time',
		},
		{
			title: '违纪说明',
			dataIndex: 'detail',
			key: 'detail',
		},
		{
			title: '登记人',
			dataIndex: 'inputName',
			key: 'inputName',
		},
		{
			title: '登记时间',
			dataIndex: 'inputTime',
			key: 'inputTime',
		},
		{
			title: '操作',
			dataIndex: 'operator',
			width: '12%',
			key: 'operator',
			scopedSlots: {
				customRender: 'operator'
			},
		},
	];

	let data = [];
	let deleteList = []


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
					total: 0
				},
				/* 表格数据 */
				data,
				columns,
				deleteList:[], 	
				/* 按钮大小 */
				size: 'small',
				/* 添加-弹出框数据 */
				add: false,
				confirmLoading: false,
				name: '',
				stuId: '',
				scanName: '',
				scanDetail: '',
				scanTime: '',
				editId: '',
				edit: false,
				school: [],
				schoolId: [],
				build: [],
				buildId: [],
				dorm: [],
				dormId: [],
				student: [],
				studentId: [],
				type: [],
				typeId: [],
			};
		},
		components: {
			IconFont,
		},
		mounted() {
			this.getPrinList();
			this.getTypeList();
			this.getSchoolList();
		},
		methods: {
			showModal() {
				this.schoolId = [];
				this.build = [];
				this.buildId = [];
				this.dorm = [];
				this.dormId = [];
				this.student = [];
				this.studentId = [];
				this.typeId = [];
				this.scanTime = '';
				this.scanDetail = '';
				this.add = true;
			},
			onChange(selectedRowKeys, selectedRows) {
				this.deleteList = selectedRowKeys;
			},
			addOK(e) {
				this.confirmLoading = true;
				if (this.studentId.length == 0 || this.typeId.length == 0 || this.scanTime == '' || this.scanDetail ==
					'') {
					this.$message.warning("请将信息输入完整");
					return;
				}
				axios({
					url: 'dorm/ruleMng/addDiscipline',
					method: 'post',
					params: {
						userId: this.studentId[0],
						wjlx: this.typeId[0],
						wjsj: new Date(this.scanTime).valueOf() / 1000,
						wjsm: this.scanDetail,
					}
				}).then(res => {
					this.$message.success(res.message);
					this.getPrinList();
					this.add = false;
					this.confirmLoading = false;
				}).catch(err => {
					this.$message.warning("此处有异常");
				})
			},
			addCancel(e) {
				this.add = false;
			},
			tableChange(pagination, filters, sorter) {
				this.pagination.current = pagination.current;
				this.pagination.pageSize = pagination.pageSize;
			},
			getPrinList() {
				this.deleteList = []
				axios({
					url: 'dorm/ruleMng/disciplinedTable',
					method: 'post',
					params: {
						name: this.name,
						xh: this.stuId,
					}
				}).then(res => {

					data.splice(0, data.length);
					for (let prin of res.result) {
						data.push({
							key: prin.id,
							id: prin.xh,
							name: prin.xm,
							type: prin.typename,
							time: this.dateToFormat(new Date(prin.wjsj * 1000)),
							detail: prin.wjsm,
							inputName: '管理员',
							inputTime: this.dateToFormat(new Date(prin.djsj * 1000)),
						})
					}
				}).catch(err => {
					this.$message.warning("此处有异常");
				})
			},
			resetAll() {
				this.name = '';
				this.stuId = '';
			},
			dateToFormat(date) {
				let str = date.getFullYear() + '-';
				if (date.getMonth() + 1 < 10) {
					str += '0' + (date.getMonth() + 1);
				} else {
					str += (date.getMonth() + 1);
				}
				str += '-';
				if (date.getDate() < 10) {
					str += '0' + date.getDate();
				} else {
					str += date.getDate();
				}
				return str;
			},
			getTypeList() {
				axios({
					url: 'dorm/disciplineType/selectList',
					method: 'post',
					params: {
						name: '',
						status: 1
					}
				}).then(res => {

					this.type.splice(0, this.type.length);
					for (let type of res.result) {
						this.type.push({
							value: type.id,
							label: type.name
						})
					}
				}).catch(err => {
					this.$message.warning("此处有异常");
				})
			},
			editPrin(id) {
				this.editId = id;
				axios({
					url: 'dorm/ruleMng/getEdit',
					method: 'post',
					params: {
						id: id
					}
				}).then(res => {
					this.scanName = res.result.xm;
					this.typeId = [res.result.wjlx];
					this.scanTime = this.dateToFormat(new Date(res.result.wjsj * 1000));
					this.scanDetail = res.result.wjsm;
					this.edit = true;
				}).catch(err => {
					this.$message.warning("此处有异常");
				})
			},
			editOK() {
				axios({
					url: 'dorm/ruleMng/editDiscipline',
					method: 'post',
					params: {
						id: this.editId,
						userId: this.scanUserId,
						wjsj: new Date(this.scanTime).valueOf() / 1000,
						wjlx: this.typeId[0],
						wjsm: this.scanDetail,
					}
				}).then(res => {
					this.$message.success(res.message);
					this.getPrinList();
					this.edit = false;
				}).catch(err => {
					this.$message.warning("此处有异常");
				})
			},
			editCancel() {
				this.edit = false;
			},
			getSchoolList() {
				axios({
					url: 'dorm/laiFang/xiaoQu',
					method: 'post',
					params: {}
				}).then(res => {
					this.school.splice(0, this.school.length);
					for (let school of res.result) {
						this.school.push({
							value: school.id,
							label: school.name
						})
					}
				}).catch(err => {
					this.$message.warning("此处有异常");
				})
			},
			schoolChange(value) {
				this.build = [];
				this.buildId = [];
				this.dorm = [];
				this.dormId = [];
				this.student = [];
				this.studentId = [];
				if (value.length == 0) {
					return;
				}
				axios({
					url: 'dorm/laiFang/suSheLou',
					method: 'post',
					params: {
						"XQBH": this.schoolId[0]
					}
				}).then(res => {

					this.build.splice(0, this.build.length);
					for (let build of res.result) {
						this.build.push({
							value: build.id,
							label: build.name
						})
					}
				}).catch(err => {
					this.$message.warning("此处有异常");
				})
			},
			buildChange(value) {
				this.dorm = [];
				this.dormId = [];
				this.student = [];
				this.studentId = [];
				if (value.length == 0) {
					return;
				}
				axios({
					url: 'dorm/laiFang/suShe',
					method: 'post',
					params: {
						"XQBH": this.schoolId[0],
						"SSLBH": this.buildId[0]
					}
				}).then(res => {
					this.dorm.splice(0, this.dorm.length);

					for (let dorm of res.result) {
						this.dorm.push({
							value: dorm.id,
							label: dorm.name
						})
					}
				}).catch(err => {
					this.$message.warning("此处有异常");
				})
			},
			dormChange(value) {
				this.student = [];
				this.studentId = [];
				if (value.length == 0) {
					return;
				}
				axios({
					url: 'dorm/laiFang/student',
					method: 'post',
					params: {
						"XQBH": this.schoolId[0],
						"SSLBH": this.buildId[0],
						"SSBH": this.dormId[0]
					}
				}).then(res => {
					this.student.splice(0, this.student.length);

					for (let stu of res.result) {
						this.student.push({
							value: stu.id,
							label: stu.name
						})
					}
				}).catch(err => {
					this.$message.success(err + "dormChange");
				})
			},
			deletePrin(id) {
				let re = confirm("确认删除?");
				if (re) {
					axios({
						url: 'dorm/ruleMng/deleteDiscipline',
						method: 'post',
						params: {
							id: id
						}
					}).then(res => {
						this.$message.success(res.message);
						this.getPrinList();
					}).catch(err => {
						this.$message.success(err);
					})
				}
			},
			deletePatch() {
				let re = confirm("确认删除?");
				if (re) {
					let ids = '';
					for (let i = 0; i < this.deleteList.length; i++) {
						ids += this.deleteList[i];
						if (i < this.deleteList.length - 1) {
							ids += ','
						}
					}
					axios({
						url: 'dorm/ruleMng/deleteMany',
						method: 'post',
						params: {
							id: ids
						}
					}).then(res => {
						this.$message.success(res.message);
						this.getPrinList();
					}).catch(err => {
						this.$message.success(err);
					})
				}
			}
		}
	};
</script>

<style>

</style>
