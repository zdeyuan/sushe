<template>
	<div>
		<a-card :bordered="false" class="header-solid mb-24">
		<div class="btns">
			<a-button type="primary" @click="joinStu('add')" style="margin-right: 20px;">
				添加
			</a-button>
			<a-button type="primary" @click="getStuInfo" style="margin-right: 20px;">
				刷新
			</a-button>
		</div>
		<div class="count">
			<a-table :columns="columns" :data-source="data" :row-selection="rowSelection" @change="tableChange"
				rowKey='id' :pagination="pagination">
				<span slot="action" slot-scope="text, record">
					<span style="color: #028BE2; cursor:pointer;margin-right: 20px;" @click="joinStu('change',record)">修改</span>
					<span style="color: #ff0000; cursor:pointer;margin-right: 20px;" @click="delteIds(record.id)">删除</span>
					<span style="color: #028BE2; cursor:pointer;margin-right: 20px;" @click="holidays(record.id)">节假日</span>
					<span style="color: #028BE2; cursor:pointer;margin-right: 20px;" @click="xiaoli(record)">校历</span>
				</span>
				<span slot="iscurrent" slot-scope="text, record">
					 {{record.iscurrent == 0 ? '是' : '否'}}
				</span>
			</a-table>
		</div>
		<div class="showNewDoginBox">
			<joinOrChangeStuInfo ref="joinOrChangeStu" @JoinOrchangeStuSuss='JoinOrchangeStuSuss'></joinOrChangeStuInfo>
		</div>
		</a-card>
	</div>
</template>

<script>
	import md5 from 'js-md5';
	import {
		axios
	} from '@/utils/request';
	import joinOrChangeStuInfo from './join.vue'
	export default {
		components: {
			joinOrChangeStuInfo
		},
		data() {
			return {
				current: 'schoolInfo',
				columns: [{
						title: '学期码',
						dataIndex: 'xqm',
						key: 'xqm',
					},
					{
						title: '学期名称',
						dataIndex: 'xqmc',
						key: 'xqmc',
					},
					{
						title: '学年',
						dataIndex: 'xn',
						key: 'xn',
					},
					{
						title: '学期开始日期',
						dataIndex: 'xqksrqName',
						key: 'xqksrqName',
					},
					{
						title: '学期结束日期',
						dataIndex: 'xqjsrqName',
						key: 'xqjsrqName',
					},
					{
						title: '是否当前学期',
						dataIndex: 'iscurrent',
						key: 'iscurrent',
						scopedSlots: {
							customRender: 'iscurrent'
						},
					},
					{
						title: '操作',
						dataIndex: 'action',
						key: 'action',
						scopedSlots: {
							customRender: 'action'
						},
					},
				],
				data: [],
				selectedRowKeys: [],
				pagination: {
					current: 1,
					pageSize: 10,
					pageSizeOptions: ['10', '20', '30', '50'],
					showTotal: (total, range) => {
						return '显示' + range[0] + '到' + range[1] + '条, 共' + total + '条记录'
					},
					showSizeChanger: true,
					showQuickJumper: true,
					total: 0
				},
				//搜索参数
				searchInfo: {

					pageNo: 1,

					pageSize: 10,

				}
			}
		},
		computed: {
			rowSelection() {
				const selectedRowKeys = this.selectedRowKeys; //常量
		
				return {
					selectedRowKeys,
					onChange: this.onSelectChange,
				};
			},
		},
		created() {
			this.getStuInfo()
		},
		methods: {
			changetu(e,id){
				console.log(e,'e/????????')
				console.log(id,'e/????????')
				axios({
					url: 'common/veBase/presentSemesterBatch?ids='+id,
					method: 'post',
				}).then(res => {
				
					if (res.code == 200) {
				
						this.getStuInfo()
					}
				
				
				}).catch(err => {
				
					this.$message.warning("获取设置失败");
				
				})
			},
			joinStu(type, id) {
				// this.joinOrChangeStuShow = true
				this.$refs.joinOrChangeStu.judesType(type, id)
			},
			JoinOrchangeStuSuss() {
				this.getStuInfo()
			},
			jugeType(value) {
				this.type = value
			},
			getStuInfo() {
				axios({
					url: 'common/veBase/getSemesterPageList',
					method: 'get',
					params: this.searchInfo
				}).then(res => {

					if (res.code == 200) {

						this.data = res.result.list

						this.pagination.total = res.result.total
					}


				}).catch(err => {

					this.$message.warning("获取学生管理信息失败");

				})
			},

			onSelectChange(selectedRowKeys) {
				console.log('selectedRowKeys changed: ', selectedRowKeys);
				this.selectedRowKeys = selectedRowKeys;
			},

			tableChange(value, key, column) {
				this.searchInfo.pageNo = value.current
				this.pagination.current = value.current
				this.getStuInfo()
			},
			// 删除信息
			delteIds(id) {
				var then = this
				this.$confirm({
					title: '是否删除',
					content: '是否删除这条数据',
					okText: '确认',
					cancelText:'取消',
					onOk() {
						axios({
							url: 'common/veBase/deleteSemesterBatch?ids=' + id,
							method: 'post',
							params: {}

						}).then(res => {
							if (res.code == 200) {
								then.$message.success(res.message);
								then.getStuInfo()
							}

						}).catch(err => {
							then.$message.warning("删除失败");
						})
					},
				});
			},
			xiaoli(row){
				this.$router.push({
				  path: '/baseData/academicCalendar/index',
				  query: {
				    id: row.id,
					xqjsrqName:row.xqjsrqName,
					xqksrqName:row.xqksrqName,
				  }
				});
			},
			holidays(id) {
				this.$router.push({
				  path: '/baseData/holidays/index',
				  query: {
				    id: id
				  }
				});
			},
		},
	}	
</script>

<style lang="less" scoped>
	.top {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	/deep/ .ant-table-tbody>tr>td,
	/deep/.ant-table-thead>tr>th {
		padding: 15px 5px;
	}
	/deep/ .ant-table-thead > tr > th {
	  background: #66c3fd;
	  color:#fff;
	  font-size: 14px;
	}
	/deep/ .ant-table-tbody {
	  tr:nth-child(even) {
	    background: #f4f7f9;
	  }
	}
</style>
