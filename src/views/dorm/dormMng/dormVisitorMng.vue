<template>
	<div style="background:#E9EDF6; padding:30px">
<!-- 		<span class="content-title">
			<a-menu mode="horizontal" class="dorm-modify-top">
				<a-menu-item key="defined" class="dorm-modify-item dorm-modify-after">
					<router-link class="link-active" to="/dorm/dormVisitorMng">来访登记</router-link>
				</a-menu-item>
				<router-view></router-view>
			</a-menu>
		</span> -->
		<!-- <hr align="left" width=120 color=#878787 SIZE=2 style="margin-left: 44px;" /> -->
		<div class="content-title ">
			<router-link class="link-active" to="/dorm/dormVisitorMng">来访登记</router-link>
		</div>
		<div class="pageContentBox">
			<div class="headTop">宿务管理 > 宿舍访客管理 > <span class="notTop">来访登记</span></div>
			<div class="content-head">
				<div>
					<a-button :size="size" class="content-button button-lightgreen" style="font-size:16px;width:88px;height:34px;background-color:#3a3aff  " @click="showModal">
						<icon-font type="icontianjia" style="color: #FFFFFF;" />
						添加
					</a-button>
					<a-modal title="添加" :visible="add" :confirm-loading="confirmLoading" @cancel="addCancel"
						width="872px">
						<table class="scanTable">
							<tr>
								<td class="single">
									<div>姓名:</div>
								</td>
								<td class="long">
									<a-input class="scanInput" placeholder="请输入姓名" v-model="addName" onkeyup="this.value=this.value.replace(/[, ]/g,'')"></a-input>
								</td>
							</tr>
							<tr>
								<td class="single">
									<div>身份证号:</div>
								</td>
								<td class="long">
									<a-input class="scanInput" placeholder="请输入身份证号" v-model="addIdentify" onkeyup="this.value=this.value.replace(/[, ]/g,'')"></a-input>
								</td>
							</tr>
							<tr>
								<td class="single">
									<div>被探访人员:</div>
								</td>
								<td class="long">
									<a-cascader class="small" :options="school" placeholder="请选择校区"
										@change="schoolChange" v-model="schoolId" />
									<a-cascader class="small" :options="build" placeholder="请选择宿舍楼"
										@change="buildChange" v-model="buildId" />
									<a-cascader class="small" :options="dorm" placeholder="请选择宿舍" @change="dormChange"
										v-model="dormId" />
									<a-cascader class="small" :options="student" placeholder="请选择学生"
										v-model="studentId" />
								</td>
							</tr>
							<tr>
								<td class="single">
									<div>探访事由:</div>
								</td>
								<td class="long">
									<a-input class="scanInput" placeholder="请输入探访事由" v-model="addCause"></a-input>
								</td>
							</tr>
							<tr>
								<td class="single">
									<div>探访类型:</div>
								</td>
								<td class="long">
									<a-cascader class="small" :options="type" placeholder="请选择类型" v-model="typeId" />
								</td>
							</tr>
						</table>

						<template slot="footer">
							<a-button type="primary" style="background-color:#028be2;color:#ffffff;font-weight:bold" @click="addOK()" class="buttonOk">确定</a-button>
							<a-button style="background-color:#999999;color:#ffffff;font-weight:bold" @click="addCancel()" class="buttonCancel">取消</a-button>
						</template>
					</a-modal>

					<a-button :size="size" class="content-button button-orange button-after" style="font-size:16px;width:88px;height:34px;background-color:#E61A1A " @click="patchDelete">
						<icon-font type="iconsousuo" style="color: #FFFFFF;" />
						删除
					</a-button>

					<a-button :size="size" class="content-button button-skyblue button-after" style="font-size:16px;width:88px;height:34px;background-color:#3a3aff " @click="getVisitor">
						<icon-font type="iconxindongfang-shuaxintubiao" style="color: #FFFFFF;" />
						刷新
					</a-button>
				</div>
        
				<div>
					<span class="head-span">姓名</span>
					<a-input class="condition" placeholder="请输入姓名" v-model="name" onkeyup="this.value=this.value.replace(/[, ]/g,'')"/>
				</div>

				<div>
					<span class="head-span">身份证号</span>
					<a-input class="condition" placeholder="身份证号" v-model="identify" onkeyup="this.value=this.value.replace(/[, ]/g,'')"/>
				</div>

				<div>
					<a-button :size="size" class="content-button button-blue" style="font-size:16px;width:88px;height:34px;background-color:#1AE642 " @click="getVisitor">
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
				<a-table :columns="columns" :data-source="data" :defaultCurrent="6" :pagination="pagination"
					@change="tableChange" :row-selection="{ selectedRowKeys: selectId, onChange: onChange}">
					<span slot="operator" slot-scope="text, record">
						<a style="font-size:18px;font-weigth:bold;border-bottom: 1px solid #66C3FD;" @click="editModal(record.key)">编辑</a>
						<a-modal title="编辑" :visible="edit" :confirm-loading="confirmLoading" @cancel="editCancel"
							width="872px">
							<table class="scanTable">
								<tr>
									<td class="single">
										<div>姓名:</div>
									</td>
									<td class="long">
										<a-input class="scanInput" placeholder="请输入姓名" v-model="editName"></a-input>
									</td>
								</tr>
								<tr>
									<td class="single">
										<div>身份证号:</div>
									</td>
									<td class="long">
										<a-input class="scanInput" placeholder="请输入身份证号" v-model="editIdentify">
										</a-input>
									</td>
								</tr>
								<tr>
									<td class="single">
										<div>被探访人员:</div>
									</td>
									<td class="long">
										<a-cascader class="small" :options="editSchool" placeholder="请选择校区"
											@change="editSchoolChange" v-model="editSchoolId" />
										<a-cascader class="small" :options="editBuild" placeholder="请选择宿舍楼"
											@change="editBuildChange" v-model="editBuildId" />
										<a-cascader class="small" :options="editDorm" placeholder="请选择宿舍"
											@change="editDormChange" v-model="editDormId" />
										<a-cascader class="small" :options="editStudent" placeholder="请选择学生"
											v-model="editStudentId" />
									</td>
								</tr>
								<tr>
									<td class="single">
										<div>探访事由:</div>
									</td>
									<td class="long">
										<a-input class="scanInput" placeholder="请输入探访事由" v-model="editCause"></a-input>
									</td>
								</tr>
								<tr>
									<td class="single">
										<div>探访类型:</div>
									</td>
									<td class="long">
										<a-cascader class="small" :options="type" placeholder="请选择类型"
											@change="typeChange" v-model="editTypeId" />
									</td>
								</tr>
							</table>

							<template slot="footer">
								<a-button type="primary" style="background-color:#028be2;color:#ffffff;font-weight:bold" @click="editOK()" class="buttonOk">确定</a-button>
								<a-button style="background-color:#999999;color:#ffffff;font-weight:bold" @click="editCancel()" class="buttonCancel">取消</a-button>
							</template>
						</a-modal>
						<span>|</span>
						<a style="font-size:18px;font-weigth:bold;color:orange; border-bottom: 1px solid orange;"
							@click="deleteVisitor(record.key)">删除</a>
					</span>

				</a-table>
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
			title: '姓名',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: '身份证号',
			dataIndex: 'identify',
			key: 'identify',
		},
		{
			title: '被探访人员',
			dataIndex: 'findName',
			key: 'findName',
		},
		{
			title: '宿舍',
			dataIndex: 'dorm',
			key: 'dorm',
		},
		{
			title: '探访事由',
			dataIndex: 'cause',
			key: 'cause',
		},
		{
			title: '探访类型',
			dataIndex: 'type',
			key: 'type',
		},
		{
			title: '登记时间',
			dataIndex: 'stime',
			key: 'stime',
		},
		{
			title: '离开时间',
			dataIndex: 'etime',
			key: 'etime',
		},
		{
			title: '状态',
			dataIndex: 'state',
			key: 'state',
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
				addName: '',
				addIdentify: '',
				addCause: '',
				editName: '',
				editIdentify: '',
				editCause: '',
				school: [],
				build: [],
				dorm: [],
				student: [],
				type: [],
				add: false,
				edit: false,
				schoolId: [],
				buildId: [],
				dormId: [],
				studentId: [],
				typeId: [],
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
				selectId:[],
				states: ['已登记', '已离开', '已申请'],
				/* 按钮大小 */
				size: 'small',
				/* 下拉框数据 */
				/* 添加-弹出框数据 */
				ModalText: 'Content of the modal',
				visible: false,
				confirmLoading: false,
				name: '',
				identify: '',
				editId: '',
				editSchool: [],
				editSchoolId: [],
				editBuild: [],
				editBuildId: [],
				editDorm: [],
				editDormId: [],
				editStudent: [],
				editStudentId: [],
				editType: [],
				editTypeId: [],
			};
		},
		mounted() {
			this.getVisitor();
			this.getTypeList();
			this.getSchoolList();
		},
		components: {
			IconFont,
		},
		methods: {
			clearAll() {
				this.addName = '';
				this.addCause = '';
				this.addIdentify = '';
				this.schoolId = [];
				this.buildId = [];
				this.dormId = [];
				this.studentId = [];
				this.typeId = [];
			},
			showModal() {
				this.clearAll();
				this.getSchoolList();
				this.add = true;
			},
			onChange(selectedRowKeys, selectedRows) {
				this.selectId = selectedRowKeys;
			},
			addOK() {
				if (this.addName == "" || this.addIdentify == "" || this.addCause == "" || this.studentId.length == 0 ||
					this.typeId.length == 0) {
					this.$message.warning("请将信息输入完整");
					return;
				}
				let _IDRe18 =
					/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
				// 校验身份证：
				if (!_IDRe18.test(this.addIdentify)) {
					this.$message.warning("请输入正确的身份证号");
					return
				}
				this.confirmLoading = true;
				axios({
					url: 'dorm/laiFang/add',
					method: 'post',
					params: {
						'XM': this.addName,
						'SFZH': this.addIdentify,
						'userId': this.studentId[0],
						'TFSY': this.addCause,
						'TFLX': this.typeId[0],
						'FJBH': this.dormId[0],
					}
				}).then(res => {
					this.$message.success(res.message);
					this.confirmLoading = false;
					this.add = false;
					this.getVisitor();
				})
			},
			addCancel(e) {
				this.add = false;
			},
			tableChange(pagination, filters, sorter) {
				this.pagination.current = pagination.current;
				this.pagination.pageSize = pagination.pageSize;
			},
			clearShcoolType() {
				console.log(this.$refs.school);
			},
			getVisitor() {
				this.selectId = []
				axios({
					url: 'dorm/laiFang/showLaiFang',
					method: 'post',
					params: {
						'XM': this.name,
						'SFZH': this.identify
					}
				}).then(res => {
					console.log(res);
					data.splice(0, data.length);
					for (let visit of res.result) {
						data.push({
							key: visit.id,
							name: visit.xm,
							identify: visit.sfzh,
							findName: visit.userName,
							dorm: visit.roomNum,
							cause: visit.tfsy,
							state: this.states[visit.status],
							stime: this.dateToFormat(new Date(visit.djsj * 1000)),
							type: visit.zcType,
							etime: ''
						})
					}
					this.pagination.current = 1;
					this.pagination.total = res.result.length;
				}).catch(err => {
					console.log(err);
				})
			},
			patchDelete() {

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
			/* 获取校区列表 */
			getSchoolList() {
				axios({
					url: 'dorm/laiFang/xiaoQu',
					method: 'post',
					params: {}
				}).then(res => {
					this.school.splice(0, this.school.length);
					this.editSchool.splice(0, this.editSchool.length);
					for (let school of res.result) {
						this.school.push({
							value: school.id,
							label: school.name
						});
						this.editSchool.push({
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
			typeChange(value) {
				this.typeId = value[0];
			},
			getTypeList() {
				axios({
					url: 'dorm/laiFang/dictionaryType',
					method: 'post',
					params: {
						"title": "探访类型"
					}
				}).then(res => {
					console.log('探访类型', res);
					this.type.splice(0, this.type.length);
					this.editType.splice(0, this.editType.length);
					for (let type of res.result) {
						this.type.push({
							value: type.id,
							label: type.code
						});
						this.editType.push({
							value: type.id,
							label: type.code
						});
					}
				}).catch(err => {
					this.$message.warning("此处有异常");
				})
			},
			deleteVisitor(id) {
				console.log(id);
				this.$confirm({
					title: '提示',
					content: '是否删除这条信息',
					okText: '是',
					okType: 'danger',
					cancelText: '否',
					onOk:() => {
						axios({
							url: 'dorm/laiFang/delete',
							method: 'post',
							params: {
								"id": id
							}
						}).then(res => {
							this.$message.success(res.message);
							this.getVisitor();
						}).catch(err => {
							this.$message.warning("此处有异常");
						})
					},
					onCancel:()=> {
						return
					},
				});
			},
			// 编辑
			editModal(id) {
				this.clearAll();
				this.editId = id;
				this.getSchoolList();
				this.getTypeList();
				axios({
					url: 'dorm/laiFang/updateMessage',
					method: 'post',
					params: {
						"id": id
					}
				}).then(res => {

					this.editName = res.result.xm;
					this.editCause = res.result.tfsy;
					this.editIdentify = res.result.sfzh;
					this.editTypeId = [res.result.tflx];
					this.editSchoolId = [res.result.xqid];
					this.editSchoolChange([1]);
					this.editBuildId = [res.result.sslid];
					this.editBuildChange([1]);
					this.editDormId = [res.result.ssid];
					this.editDormChange([1]);
					this.editStudentId = [res.result.userId];
					this.edit = true;
				}).catch(err => {
					this.$message.warning("此处有异常");
				})
			},
			editOK() {
				if (this.editName == "" || this.editIdentify == "" || this.editCause == "" || this.editSchoolId.length ==
					0 ||
					this.editBuildId.length == 0 || this.editDormId.length == 0 || this.editSchoolId.length == 0 || this
					.editTypeId.length == 0 ||
					this.editStudentId.length == 0) {
					this.$message.warning("请将信息输入完整");
					return;
				}
				let _IDRe18 =
					/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
				// 校验身份证：
				if (!_IDRe18.test(this.editIdentify)) {
					this.$message.warning("请输入正确的身份证号");
					return
				}
				axios({
					url: 'dorm/laiFang/update',
					method: 'post',
					params: {
						"id": this.editId,
						"XM": this.editName,
						"SFZH": this.editIdentify,
						"userId": this.studentId,
						"TFSY": this.editCause,
						"TFLX": this.editTypeId[0],
						"userId": this.editStudentId[0]
					}
				}).then(res => {
					this.$message.success(res.message);
					this.getVisitor();
					this.edit = false;
				}).catch(err => {
					this.$message.warning("此处有异常");
				})
			},
			editCancel() {
				this.edit = false;
			},
			patchDelete() {
				let ids = '';
				if (this.selectId.length == 0) {
					this.$message.warning("请选中要删除的列");
					return;
				}
				for (let i = 0; i < this.selectId.length; i++) {
					ids += this.selectId[i];
					if (i != this.selectId.length - 1) {
						ids += ',';
					}
				}
				console.log(ids);
				this.$confirm({
					title: '提示',
					content: '是否删除这些信息',
					okText: '是',
					okType: 'danger',
					cancelText: '否',
					onOk:() => {
						axios({
							url: 'dorm/laiFang/deleteBatch',
							method: 'post',
							params: {
								"ids": ids,
							}
						}).then(res => {
							this.$message.success(res.message);
							this.getVisitor();
						}).catch(err => {
							this.$message.warning("此处有异常");
						})
					},
					onCancel:()=> {
						return
					},
				});
			},
			resetAll() {
				this.name = '';
				this.identify = '';
			},
			editSchoolChange(value) {
				this.editBuildId = [];
				this.editDormId = [];
				this.editStudentId = [];
				this.editBuild = [];
				this.editDorm = [];
				this.editStudent = [];
				if (value.length == 0) {
					return;
				}
				axios({
					url: 'dorm/laiFang/suSheLou',
					method: 'post',
					params: {
						"XQBH": this.editSchoolId[0]
					}
				}).then(res => {

					this.editBuild.splice(0, this.editBuild.length);
					for (let build of res.result) {
						this.editBuild.push({
							value: build.id,
							label: build.name
						})
					}
				}).catch(err => {
					this.$message.warning("此处有异常");
				})
			},
			editBuildChange(value) {
				this.editDormId = [];
				this.editStudentId = [];
				this.editDorm = [];
				this.editStudent = [];
				if (value.length == 0) {
					return;
				}
				axios({
					url: 'dorm/laiFang/suShe',
					method: 'post',
					params: {
						"XQBH": this.editSchoolId[0],
						"SSLBH": this.editBuildId[0]
					}
				}).then(res => {
					this.editDorm.splice(0, this.editDorm.length);

					for (let dorm of res.result) {
						this.editDorm.push({
							value: dorm.id,
							label: dorm.name
						})
					}
				}).catch(err => {
					this.$message.warning("此处有异常");
				})
			},
			editDormChange(value) {
				this.editStudentId = [];
				this.editStudent = [];
				if (value.length == 0) {
					return;
				}
				axios({
					url: 'dorm/laiFang/student',
					method: 'post',
					params: {
						"XQBH": this.editSchoolId[0],
						"SSLBH": this.editBuildId[0],
						"SSBH": this.editDormId[0]
					}
				}).then(res => {
					this.editStudent.splice(0, this.editStudent.length);

					for (let stu of res.result) {
						this.editStudent.push({
							value: stu.id,
							label: stu.name
						})
					}
				}).catch(err => {
					this.$message.warning("此处有异常");
				})
			}
		},
	};
</script>

<style scoped="scoped">
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
