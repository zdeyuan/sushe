<template>
	<a-card :bordered="false">
		<!-- 操作按钮区域 -->
		<div class="table-operator">
			<a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>
			<a-button @click="batchDel" style="margin-left:10px;" v-if="selectedRowKeys.length > 0" type="danger"
				icon="delete">批量删除
			</a-button>
		</div>
		<div>
			<div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
				<i class="anticon anticon-info-circle ant-alert-icon"></i>已选择&nbsp;<a style="font-weight: 600">{{
        selectedRowKeys.length }}</a>项&nbsp;&nbsp;
				<a style="margin-left: 24px" @click="onClearSelected">清空</a>
			</div>
			<a-table :columns="columns" size="middle" :pagination="false" :dataSource="dataSource" :loading="loading"
				:expandedRowKeys="expandedRowKeys"
				:rowKey="record => record.id"
				:rowSelection="{
					selectedRowKeys: selectedRowKeys,
				    onChange: onSelectChange,
				    onSelect: onSelect,
				    onSelectAll: onSelectAll
				}"
				@expandedRowsChange="handleExpandedRowsChange">
				<span slot="action" slot-scope="text, record">
					<a @click="handleEdit(record,true)">编辑</a>
					<a-divider type="vertical" />
					<a-dropdown>
						<a class="ant-dropdown-link">
							更多 <a-icon type="down" />
						</a>
						<a-menu slot="overlay">
							<a-menu-item>
								<a href="javascript:;" @click="handleDetail(record,true)">详情</a>
							</a-menu-item>
							<a-menu-item>
								<a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)"
									placement="topLeft">
									<a>删除</a>
								</a-popconfirm>
							</a-menu-item>
						</a-menu>
					</a-dropdown>
				</span>
				<!-- 字符串超长截取省略号显示 -->
				<span slot="url" slot-scope="text">
					<j-ellipsis :value="text" :length="25" />
				</span>
				<!-- 字符串超长截取省略号显示-->
				<span slot="component" slot-scope="text">
					<j-ellipsis :value="text" />
				</span>
			</a-table>
		</div>
		<permission-modal ref="modalForm" @ok="modalFormOk"></permission-modal>
	</a-card>
</template>
<script>
	import PermissionModal from './join.vue'
	import zyzApi from '@/api/common/zyz';
	import {
		EduListMixin
	} from '@/mixins/EduListMixin'
	const columns = [{
			title: '名称',
			dataIndex: 'jyzmc',
			key: 'jyzmc'
		}, {
			title: '编号',
			dataIndex: 'jyzbh',
			key: 'jyzbh',
		}, {
			title: '所属学院',
			dataIndex: 'falName',
			key: 'falName'
		},
		{
			title: '所属专业',
			dataIndex: 'specName',
			key: 'specName',
		},
		{
			title: '负责人',
			dataIndex: 'fzrUserName',
			key: 'fzrUserName',
		}, {
			title: '电话号码',
			dataIndex: 'telephone',
			key: 'telephone',
		}, {
			title: '所属校区',
			dataIndex: 'campusName',
			key: 'campusName',
		},
		{
			title: '操作',
			dataIndex: 'action',
			scopedSlots: {
				customRender: 'action'
			},
			align: 'center',
			width: 150
		}
	]
	export default {
		name: 'zyzListAsync',
		mixins: [EduListMixin],
		components: {
			PermissionModal,
		},
		data() {
			return {
				description: '这是菜单管理页面',
				// 表头
				columns: columns,
				loading: false,
				// 展开的行，受控属性
				expandedRowKeys: [],
				url: {
					delete: '/common/veBase/delete',
					//deleteBatch: '/common/veBase/deleteJYZBatch'
				}
			}
		},
		methods: {
			loadData() {
				this.loading = true
				zyzApi.list().then((res) => {
					if (res.success) {
						this.dataSource = res.result;
						// console.log("res.result", res.result)
						// return this.loadDataByExpandedRows(this.dataSource)
					}
				}).finally(() => {
					this.loading = false
				})
			},
			handleExpandedRowsChange(expandedRows) {
				console.log('Expanded rows changed:', expandedRows);
				const correspondingData = this.dataSource.filter(row => expandedRows.includes(row.id));
				    console.log('Corresponding data:', correspondingData);
				this.expandedRowKeys = expandedRows
			},
			onSelectChange(newSelectedRowKeys) {
				this.selectedRowKeys = newSelectedRowKeys;
				console.log('选中行的 key:', newSelectedRowKeys);
			},
			onSelect(record, selected, selectedRows) {
				// 阻止父行因子行选择而被联动选中
				return true;
			},
			onSelectAll(selected, selectedRows, changeRows) {
				 console.log('Select all:', selected, selectedRows, changeRows);
				// 自定义全选逻辑
				return true;
			},
			handleAddSub(record) {
				this.$refs.modalForm.title = "添加子菜单";
				this.$refs.modalForm.localMenuType = 1;
				this.$refs.modalForm.disableSubmit = false;
				this.$refs.modalForm.edit({
					status: '1'
				});
			},
			
		}
	}
</script>