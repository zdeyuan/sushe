<template>
	<div>
		<a-card :bordered="false">
			<div class="top">
				<span class="head-span">类别名</span>
				<div>
					<a-input class="condition" placeholder="请输入类别名" v-model="typeName"
						onkeyup="this.value=this.value.replace(/[, ]/g,'')" />
				</div>
				<div>
					<a-button type="primary" @click="getRuleTypeList" icon="search" style="margin-left: 20px;">
						搜索
					</a-button>
					<a-button type="danger" style="margin-left:20px;" icon="reset" @click="clearAll">
						清空
					</a-button>
				</div>
			</div>
			<div>
				<a-table :columns="columns" :data-source="data"
					:row-selection="{ selectedRowKeys: deleteList, onChange: onChange }" :defaultCurrent="6"
					:pagination="pagination" @change="tableChange">
					<span slot="operator" slot-scope="text, record">
						<a @click="editRuleType(record.key)">编辑</a>
						<a-divider type="vertical" />
						<a @click="deleteRuleType(record.key)">删除</a>
					</span>
				</a-table>
			</div>
			<a-modal title="添加" :visible="visible" :confirm-loading="confirmLoading" @ok="handleOk"
				@cancel="handleCancel">
				<table class="scanTable">
					<tr>
						<td class="single">制度类别名称:</td>
						<td class="double">
							<a-input class="scanInput" placeholder="请输入制度类别名称" v-model="addTypeName" />
						</td>
					</tr>
				</table>
				<template slot="footer" class="floor-footer">
					<a-button @click="handleCancel()">取消</a-button>
					<a-button type="primary" @click="handleOk()">确认</a-button>
				</template>
			</a-modal>
			<a-modal title="编辑" :visible="edit" :confirm-loading="confirmLoading" @ok="editOK" @cancel="editCancel">
				<table class="scanTable">
					<tr>
						<td class="single">制度类别名称:</td>
						<td class="double">
							<a-input class="scanInput" placeholder="请输入制度类别名称" v-model="editTypeName" />
						</td>
					</tr>
				</table>
				<template slot="footer" class="floor-footer">
					<a-button @click="editCancel">取消</a-button>
					<a-button type="primary" @click="editOK">确定</a-button>
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
	} from '@/utils/request'

	const IconFont = Icon.createFromIconfontCN({
		scriptUrl: '//at.alicdn.com/t/font_2390461_f6v2cx4wmzq.js',
	});

	const columns = [{
			title: '类别名称',
			dataIndex: 'name',
			key: 'name',
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
					total: 1000
				},
				/* 表格数据 */
				data,
				columns,
				deleteList: [],
				/* 按钮大小 */
				size: 'small',
				/* 添加-弹出框数据 */
				visible: false,
				confirmLoading: false,
				typeName: '',
				addTypeName: '',
				editId: '',
				edit: false,
				editTypeName: '',
			};
		},
		mounted() {
			this.getRuleTypeList();
		},
		components: {
			IconFont,
		},
		methods: {
			showModal() {
				this.addTypeName = '';
				this.visible = true;
			},
			onChange(selectedRowKeys) {
				this.deleteList = selectedRowKeys;
			},
			handleOk(e) {
				if (this.addTypeName.trim() == "") {
					this.$message.warning("请将信息输入完整");
					return;
				}
				this.confirmLoading = true;
				axios({
					url: 'dorm/news/add',
					method: 'post',
					params: {
						"typeName": this.addTypeName
					}
				}).then(res => {
					this.$message.success(res.message);
					this.getRuleTypeList();
					this.visible = false;
					this.confirmLoading = false;
				}).catch(err => {
					this.$message.warning("此处有异常");
				})
				setTimeout(() => {}, 2000);
			},
			handleCancel(e) {
				this.visible = false;
			},
			tableChange(pagination, filters, sorter) {
				this.pagination.current = pagination.current;
				this.pagination.pageSize = pagination.pageSize;
			},
			getRuleTypeList() {
				this.deleteList = []
				axios({
					url: 'dorm/news/queryByName',
					method: 'post',
					params: {
						"name": this.typeName
					}
				}).then(res => {

					data.length = 0;
					for (let ruleType of res.result) {
						data.push({
							key: ruleType.id,
							name: ruleType.typeName
						})
					}
					this.pagination.current = 1;
					this.pagination.total = res.result.length;
				}).catch(err => {
					this.$message.warning("此处有异常");
				})
			},
			deleteRuleType(id) {

			},
			editRuleType(id) {

			},
			deleteRuleType(id) {
				let re = confirm("确认删除");
				if (re) {
					axios({
						url: 'dorm/news/delete',
						method: 'post',
						params: {
							"id": id
						}
					}).then(res => {
						this.getRuleTypeList();
						this.deleteOne = false;
					}).catch(err => {
						this.$message.warning("此处有异常");
					})
				}
			},
			patchDelete() {
				let re = confirm("确认批量删除");
				if (re) {
					let deleteStr = '';
					for (let i = 0; i < this.deleteList.length; i++) {
						deleteStr += this.deleteList[i];
						if (i < this.deleteList.length - 1) {
							deleteStr += ','
						}
					}
					console.log(deleteStr);
					axios({
						url: 'dorm/news/deleteBatch',
						method: 'post',
						params: {
							"ids": deleteStr
						}
					}).then(res => {
						this.$message.success(res.message);
						this.getRuleTypeList();
					}).catch(err => {
						this.$message.warning("此处有异常");
					})
				}
			},
			editRuleType(id) {
				this.editId = id;
				axios({
					url: 'dorm/news/updateMessage',
					method: 'post',
					params: {
						"id": id
					}
				}).then(res => {

					this.editTypeName = res.result.typeName;
					this.edit = true;
				}).catch(err => {
					this.$message.warning("此处有异常");
				})
			},
			editOK() {
				if (this.editTypeName == "") {
					this.$message.warning("请将信息输入完整");
					return;
				}
				axios({
					url: 'dorm/news/update',
					method: 'post',
					params: {
						"id": this.editId,
						"typeName": this.editTypeName
					}
				}).then(res => {
					this.$message.success(res.message);
					this.edit = false;
					this.getRuleTypeList();
				}).catch(err => {
					this.$message.warning("此处有异常");
				})
			},
			editCancel() {
				this.edit = false;
			},
			clearAll() {
				this.typeName = '';
			}
		},
	};
</script>

<style scoped>
	.top {
		display: flex;
		margin-bottom:10px;
		align-items: center;
	}

	.head-span {
		margin: 0 10px;
		text-align: right;
	}
</style>