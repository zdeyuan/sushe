<template>
	<div>
		<a-card :bordered="false">
			<div class="top">
				<span class="head-span">名称：</span>
				<div>
					<a-input class="condition" placeholder="请输入名称" style="width: 120px;" v-model="name"
						onkeyup="this.value=this.value.replace(/[, ]/g,'')" />
				</div>
				<span class="head-span">状态：</span>
				<div>
					<a-cascader class="condition" :options="state" placeholder="请选择状态" v-model="stateId" />
				</div>
				<a-button type="primary" @click="getPrinTypeMngList" icon="search" style="margin-left: 20px;">
					搜索
				</a-button>
				<a-button type="danger" style="margin-left:20px;" icon="reset" @click="resetAll">
					清空
				</a-button>
			</div>
			<div>
				<a-button type="primary" @click="showModal" icon="plus" style="margin-left:20px;">
					添加
				</a-button>
				<a-button type="primary" @click="patchUpdateState(1)" style="margin-left:20px;">
					启用
				</a-button>
				<a-button type="primary" @click="patchUpdateState(0)" style="margin-left: 20px;">
					禁用
				</a-button>

				<a-button type="danger" icon="delete" @click="patchDelete" style="margin-left: 20px;">
					删除
				</a-button>
				<a-button type="primary" icon="reload" @click="getPrinTypeMngList" style="margin-left: 20px;">
					刷新
				</a-button>
			</div>
			<div>
				<a-table :columns="columns" :data-source="data"
					:row-selection="{ selectedRowKeys: deleteList, onChange: onChange}" :defaultCurrent="6"
					:pagination="pagination" @change="tableChange">
					<span slot="operator" slot-scope="text, record">
						<a @click="editType(record.key)">编辑</a>
						<a-divider type="vertical" />
						<a @click="deleteType(record)">删除</a>
					</span>
				</a-table>
			</div>
		</a-card>
		<a-modal title="添加" :visible="visible" :confirm-loading="confirmLoading" width="600px" @cancel="handleCancel">
			<table class="scanTale">
				<tr>
					<td class="single"><span class="spanRed">*</span>违纪名称:</td>
					<td class="long">
						<a-input class="scanInput" placeholder="请输入违纪名称" v-model="scanName"></a-input>
					</td>
				</tr>
				<tr>
					<td class="single">状态:</td>
					<td class="long">
						<label v-for="item in radioName"> {{ item.value }}
							<input type="radio" name="approveResult" :value="item.index" v-model="checkedValue">
						</label>
					</td>
				</tr>
			</table>
			<template slot="footer" class="floor-footer">
				<a-button @click="handleCancel()">取消</a-button>
				<a-button type="primary" @click="handleOk()">确认</a-button>
			</template>
		</a-modal>

		<a-modal title="编辑" :visible="edit" width="600px" @cancel="editCancel">
			<table class="scanTale">
				<tr>
					<td class="single"><span class="spanRed">*</span>违纪名称:</td>
					<td class="long">
						<a-input class="scanInput" placeholder="请输入违纪名称" v-model="scanName"></a-input>
					</td>
				</tr>
				<tr>
					<td class="single">状态:</td>
					<td class="long">
						<label v-for="item in radioName"> {{ item.value }}
							<input type="radio" name="approveResult" :value="item.index" v-model="checkedValue">
						</label>
					</td>
				</tr>
			</table>
			<template slot="footer" class="floor-footer">
				<a-button @click="editCancel">取消</a-button>
				<a-button type="primary" @click="editOK">确认</a-button>
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
	} from '@/utils/request';

	const IconFont = Icon.createFromIconfontCN({
		scriptUrl: '//at.alicdn.com/t/font_2390461_blj40x79hwj.js',
	});

	const columns = [{
			title: '违纪名称',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: '状态',
			dataIndex: 'state',
			key: 'state',
		},
		{
			width: '50%',
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
				deleteList: [],
				/* 按钮大小 */
				size: 'small',
				/* 下拉框数据 */
				state: [{
					value: 0,
					label: '禁用'
				}, {
					value: 1,
					label: '启用'
				}],
				stateId: [],
				name: '',
				/* 添加-弹出框数据 */
				visible: false,
				confirmLoading: false,
				scanName: '',
				radioName: [{
					index: 0,
					value: '禁用'
				}, {
					index: 1,
					value: '启用'
				}],
				checkedValue: -1,
				editId: '',
				edit: false,
			};
		},
		components: {
			IconFont,
		},
		mounted() {
			this.getPrinTypeMngList();
		},
		methods: {
			showModal() {
				this.checkedValue = -1;
				this.scanName = '';
				this.visible = true;
			},
			onChange(selectedRowKeys, selectedRows) {
				this.deleteList = selectedRowKeys;
			},
			handleOk(e) {
				if (this.scanName.trim() == '' || this.checkedValue == -1) {
					this.$message.warning('请将信息输入完整')
					return;
				}
				this.confirmLoading = true;
				axios({
					url: 'dorm/disciplineType/insert',
					method: 'post',
					params: {
						name: this.scanName,
						status: this.checkedValue
					}
				}).then(res => {
					this.$message.success(res.message);
					this.getPrinTypeMngList();
					this.visible = false;
					this.confirmLoading = false;
				}).catch(err => {
					this.$message.warning("添加违纪类型失败");
				})
			},
			handleCancel(e) {
				this.visible = false;
			},
			tableChange(pagination, filters, sorter) {
				this.pagination.current = pagination.current;
				this.pagination.pageSize = pagination.pageSize;
			},
			getPrinTypeMngList() {
				let status = this.stateId.length == 0 ? '' : this.stateId[0];
				this.deleteList = []
				axios({
					url: 'dorm/disciplineType/selectList',
					method: 'post',
					params: {
						name: this.name,
						status: status
					}
				}).then(res => {
					data.splice(0, data.length);
					this.pagination.current = 1;
					this.pagination.total = res.result.length;
					for (let type of res.result) {
						data.push({
							key: type.id,
							name: type.name,
							state: this.state[type.status].label
						})
					}
				}).catch(err => {
					this.$message.warning("获取违纪类型列表失败");
				})
			},
			resetAll() {
				this.name = '';
				this.stateId = [];
			},
			editType(id) {
				this.editId = id;
				axios({
					url: 'dorm/disciplineType/selectById',
					method: 'post',
					params: {
						id: id
					}
				}).then(res => {
					this.scanName = res.result.name;
					this.checkedValue = res.result.status;
					this.edit = true;
				}).catch(err => {
					this.$message.warning("获取该违纪类型失败");
				})
			},
			editOK() {
				axios({
					url: 'dorm/disciplineType/update',
					method: 'post',
					params: {
						id: this.editId,
						name: this.scanName,
						status: this.checkedValue
					}
				}).then(res => {
					this.edit = false;
					this.getPrinTypeMngList();
				}).catch(err => {
					this.$message.warning("修改失败");
				})
			},
			editCancel() {
				this.edit = false;
			},
			patchUpdateState(result) {
				let re = false;
				if (this.deleteList.length == 0) {
					this.$message.warning("请选择需要启用/禁用的类型");
					return;
				}
				if (result == 1) {
					re = confirm("确认启用?");
				} else {
					re = confirm("确认禁用?");
				}
				if (re) {
					let ids = '';
					for (let i = 0; i < this.deleteList.length; i++) {
						ids += this.deleteList[i];
						if (i < this.deleteList.length - 1) {
							ids += ','
						}
					};
					axios({
						url: 'dorm/disciplineType/batchUpdateState',
						method: 'post',
						params: {
							ids: ids,
							result: result
						}
					}).then(res => {
						this.$message.success(res.message);
						this.getPrinTypeMngList();
					}).catch(err => {
						this.$message.warning("失败");
					})
				}
			},

			/* 删除 */
			deleteType(res) {
				let re = confirm("确认删除?");
				if (re) {
					axios({
						url: 'dorm/disciplineType/deleteById',
						method: 'post',
						params: {
							'id': res.key
						}
					}).then(res => {
						this.$message.success(res.message);
						this.getPrinTypeMngList();
					}).catch(err => {
						this.$message.warning("删除失败");
					})
				}
			},

			/* 批量删除 */
			patchDelete() {
				let ids = '';
				if (this.deleteList.length == 0) {
					this.$message.warning("请选中要删除的列");
					return;
				}
				let re = confirm("确认删除?");
				if (re) {
					for (let i = 0; i < this.deleteList.length; i++) {
						ids += this.deleteList[i];
						if (i != this.deleteList.length - 1) {
							ids += ',';
						}
					}
					console.log(ids);
					axios({
						url: 'dorm/disciplineType/deleteByIds',
						method: 'post',
						params: {
							'ids': ids
						}
					}).then(res => {
						this.$message.success(res.message);
						this.getPrinTypeMngList();
					}).catch(err => {
						this.$message.warning("批量删除失败");
					})
				}
			}
		},
	};
</script>

<style scoped>
	.top {
		padding: 20px;
		display: flex;
		align-items: center;
	}
	.head-span {
		margin: 0 10px;
		text-align:right;
	}
</style>