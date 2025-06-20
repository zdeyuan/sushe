<template>
	<div>
		<a-card :bordered="false">
			<div class="content-head">
				<div>
					<a-modal title="添加" :visible="visible" :confirm-loading="confirmLoading" @ok="handleOk"
						@cancel="handleCancel" width="800px">
						<table class="scanTable">
							<tr>
								<td class="single">
									<div>宿舍-校区楼:</div>
								</td>
								<td class="double">
									<a-cascader class="small" :options="addSchool" placeholder="请选择校区"
										@change="addSchoolChange" v-model="addSchoolId" />
									<a-cascader class="small" :options="addBuild" placeholder="请选择宿舍楼"
										v-model="addBuildId" />
								</td>
							</tr>
							<tr>
								<td class="single">
									<div>楼层名称:</div>
								</td>
								<td class="double">
									<a-input class="scanInput" placeholder="请输入楼层名称" v-model="addName" />
								</td>
							</tr>
							<tr>
								<td class="single">
									<div>楼层代码:</div>
								</td>
								<td class="double">
									<a-input class="scanInput" placeholder="请输入楼层代码" v-model="addCode" />
								</td>
							</tr>
						</table>
						<template slot="footer" class="floor-footer">
							<a-button @click="handleCancel()">取消</a-button>
							<a-button type="primary" @click="handleOk()">确认</a-button>
						</template>
					</a-modal>

				</div>


				<div class="top">
					<span class="head-span">校区</span>
					<a-cascader class="condition" :options="school" placeholder="请选择校区" @change="schoolChange"
						v-model="schoolId" />
					<span class="head-span">宿舍楼</span>
					<a-cascader class="condition" :options="build" placeholder="请选择宿舍楼" v-model="buildId" />
					<a-button type="primary" @click="getFloorList" icon="search" style="margin-left: 20px;">
						搜索
					</a-button>
					<a-button type="danger" @click="resetAll" style="margin-left: 20px;">
						清空
					</a-button>
				</div>

				<div>

				</div>
			</div>
			<div>
				<a-button type="primary" @click="showModal" icon="plus" style="margin:0 20px;">
					添加
				</a-button>
				<a-button type="danger" icon="delete" @click="patchDelete" style="margin-right: 20px;">
					批量删除
				</a-button>
				<a-button type="primary" icon="reload" @click="getFloorList" style="margin-right: 20px;">
					刷新
				</a-button>
				<div class="table-useful">
					<a-table :columns="columns" :data-source="data"
						:row-selection="{ selectedRowKeys: deleteList, onChange: onSelectChange }" :defaultCurrent="6"
						:pagination="pagination" @change="tableChange">
						<span slot="operator" slot-scope="text, record">
							<a @click="editFloor(record.key)" >编辑</a>
							<a-divider type="vertical" />
							<a @click="deleteFloor(record.key)">删除</a>
						</span>
					</a-table>
				</div>
			</div>
			<!-- </a-card> -->
			<a-modal title="编辑" :visible="edit" :confirm-loading="confirmLoading" @ok="editOK" @cancel="editCancel">
				<table class="scanTable">
					<tr>
						<td class="single">
							<div>楼层名称:</div>
						</td>
						<td class="double">
							<a-input class="scanInput" placeholder="请输入楼层名称" v-model="editName" />
						</td>
					</tr>
					<tr>
						<td class="single">
							<div>楼层代码:</div>
						</td>
						<td class="double">
							<a-input class="scanInput" placeholder="请输入楼层代码" v-model="editCode" />
						</td>
					</tr>
				</table>
				<template slot="footer" class="floor-footer">
					<a-button @click="editCancel()">取消</a-button>
					<a-button type="primary" @click="editOK()">确认</a-button>
				</template>
			</a-modal>
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

	const IconFont = Icon.createFromIconfontCN({
		scriptUrl: '//at.alicdn.com/t/font_2390461_f6v2cx4wmzq.js',
	});

	const columns = [{
			title: '楼层名称',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: '楼层代码',
			dataIndex: 'code',
			key: 'code',
		},
		{
			title: '操作',
			dataIndex: 'operator',
			align: "center",
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
				/* 按钮大小 */
				size: 'small',
				/* 下拉框数据 */
				school: [],
				build: [],
				schoolId: [],
				buildId: [],
				/* 添加-弹出框数据 */
				visible: false,
				confirmLoading: false,
				addName: '',
				addCode: '',
				addSchool: [],
				addSchoolId: [],
				addBuild: [],
				addBuildId: [],
				editId: '',
				edit: false,
				editName: '',
				editCode: '',
				deleteList: []
			};
		},
		mounted() {
			this.getSchoolList();
			this.getFloorList();
		},
		components: {
			IconFont,
		},
		methods: {
			onSelectChange(selectedRowKeys) {
				this.deleteList = selectedRowKeys;
			},
			showModal() {
				this.addName = '';
				this.addCode = '';
				this.addSchoolId = [];
				this.addBuild = [];
				this.addBuildId = [];
				this.visible = true;
			},
			handleOk(e) {
				this.confirmLoading = true;
				if (this.addName == '' || this.addCode == '') {
					this.$message.warning("请将信息输入完整");
					return;
				}
				axios({
					url: 'dorm/floorMng/addLouCeng',
					method: 'post',
					params: {
						"xqh": this.addSchoolId[0],
						"jzwh": this.addBuildId[0],
						"lcName": this.addName,
						"lcCode": this.addCode
					}
				}).then(res => {
					this.$message.success(res.message);
					this.getFloorList();
					this.visible = false;
					this.confirmLoading = false;
				}).catch(err => {
					this.$message.warning("添加楼层失败");
				})
			},
			handleCancel(e) {
				console.log('Clicked cancel button');
				this.visible = false;
			},
			onChange(value) {
				console.log(value);
			},
			tableChange(pagination, filters, sorter) {
				this.pagination.current = pagination.current;
				this.pagination.pageSize = pagination.pageSize;
			},
			getFloorList() {
				// this.rowSelection = []
				this.deleteList = []
				let xqId = this.schoolId.length == 0 ? null : this.schoolId[0];
				let sslId = this.buildId.length == 0 ? null : this.buildId[0];
				axios({
					url: 'dorm/floorMng/select',
					method: 'post',
					params: {
						"xqId": xqId,
						"sslId": sslId,
					}
				}).then(res => {

					data.splice(0, data.length);
					for (let floor of res.result) {
						data.push({
							key: floor.id,
							name: floor.lcname,
							code: floor.lccode,
							jzwmc: floor.jzwmc,
							xqmc: floor.xqmc
						})
					}
					this.pagination.current = 1;
					this.pagination.total = data.length;
				}).catch(err => {
					this.$message.warning("获取楼层列表失败");
				})
			},
			getSchoolList() {
				axios({
					url: 'dorm/laiFang/xiaoQu',
					method: 'post',
					params: {

					}
				}).then(res => {

					for (let sc of res.result) {
						this.school.push({
							value: sc.id,
							label: sc.name
						});
						this.addSchool.push({
							value: sc.id,
							label: sc.name
						})
					}
				}).catch(err => {
					this.$message.warning("获取校区列表失败");
				})
			},
			schoolChange(value) {
				this.build = [];
				this.buildId = [];
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
					this.$message.warning("获取宿舍楼列表失败");
				})
			},
			addSchoolChange(value) {
				this.addBuild = [];
				this.addBuildId = [];
				if (value.length == 0) {
					return;
				}
				axios({
					url: 'dorm/laiFang/suSheLou',
					method: 'post',
					params: {
						"XQBH": this.addSchoolId[0]
					}
				}).then(res => {

					this.addBuild.splice(0, this.addBuild.length);
					for (let build of res.result) {
						this.addBuild.push({
							value: build.id,
							label: build.name
						})
					}
				}).catch(err => {
					this.$message.warning("获取宿舍楼列表失败");
				})
			},
			resetAll() {
				this.schoolId = [];
				this.buildId = [];
				this.build.splice(0, this.build.length);
			},
			editFloor(id) {
				this.editId = id;
				axios({
					url: 'dorm/floorMng/getEdit',
					method: 'post',
					params: {
						"id": id
					}
				}).then(res => {

					this.editName = res.result.lcname;
					this.editCode = res.result.lccode;
					this.edit = true;
				}).catch(err => {
					this.$message.warning("获取该楼层信息失败");
				})
			},
			editOK() {
				if (this.editName == '' || this.editCode == '') {
					this.$message.warning("请将信息输入完整");
					return;
				}

				axios({
					url: 'dorm/floorMng/edit',
					method: 'post',
					params: {
						"id": this.editId,
						"lcName": this.editName,
						"lcCode": this.editCode,
					}
				}).then(res => {
					this.$message.success(res.message);
					this.getFloorList();
					this.edit = false;
				}).catch(err => {
					this.$message.warning("修改楼层信息失败");
				})
			},
			editCancel() {
				this.edit = false;
			},
			deleteFloor(id) {
				this.$confirm({
					title: '是否删除',
					content: '是否删除这条数据',
					okText: '确认',
					cancelText: '取消',
					onOk() {
						axios({
							url: 'dorm/floorMng/delete',
							method: 'post',
							params: {
								"id": id,
							}
						}).then(res => {
							this.$message.success(res.message);
							this.getFloorList();
						}).catch(err => {
							this.$message.warning("删除失败");
						})
					},
					onCancel() {},
				});

			},
			patchDelete() {
				if (this.deleteList.length == 0) {
					this.$message.warning("请选中要删除的列");
					return;
				}
				let re = confirm("确认批量删除?");
				let deleteStr = '';
				for (let i = 0; i < this.deleteList.length; i++) {
					deleteStr += this.deleteList[i];
					if (i < this.deleteList.length - 1) {
						deleteStr += ',';
					}
				}
				if (re) {
					axios({
						url: 'dorm/floorMng/deleteMany',
						method: 'post',
						params: {
							"ids": deleteStr,
						}
					}).then(res => {
						this.$message.success(res.message);
						this.getFloorList();
					}).catch(err => {
						this.$message.warning("批量删除失败");
					})
				}
			}
		}
	};
</script>

<style lang="less" scoped>
	.top {
		display: flex;
		align-items: center;
		margin: 10px 0;
	}

	.head-span {
		margin: 0 10px;
	}
</style>