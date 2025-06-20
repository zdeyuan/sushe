<template>
	<div>
		<a-card :bordered="false" class="header-solid mb-24" >
		<div class="top">
			<div style="margin-bottom: 15px;">
				<span class="divide-span" style=" margin-right: 10px;">校区代码</span>
				<a-input placeholder="请输入" style="width:200px" v-model="searchInfo.xqdm" />

				<span class="divide-span" style=" margin-left: 20px; margin-right: 10px;">校区名称</span>
				<a-input placeholder="请输入" style="width: 200px;" v-model="searchInfo.xqmc" />

			</div>
			<div style="margin-left:10px;margin-bottom: 15px;">
				<a-button type="primary" @click="getStuInfo">
					搜索
				</a-button>
				<a-button type="danger" @click="remoder" style="margin-left: 20px;">
					清空
				</a-button>
			</div>
		</div>
		<div class="btns">
			<a-button type="primary" @click="joinStu('add')" style="margin-right: 20px;">
				添加
			</a-button>
			<a-button type="danger" @click="delteIds" style="margin-right: 20px;">
				批量删除
			</a-button>
			<a-button type="primary" @click="getStuInfo" style="margin-right: 20px;">
				刷新
			</a-button>
		</div>
		<div class="count">
			<a-table :columns="columns" :data-source="data" :row-selection="rowSelection" @change="tableChange"
				rowKey='id' :pagination="pagination" :scroll="{x:1300}">
				<span slot="action" slot-scope="text, record">
					<span style="color: #028BE2; cursor:pointer;" @click="joinStu('change',record)">修改</span>
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
						title: '校区代码',
						width: 100,
						dataIndex: 'xqdm',
						fixed: 'left',
						key: 'xqdm',
					},
					{
						title: '校区名称',
						width: 100,
						fixed: 'left',
						dataIndex: 'xqmc',
						key: 'xqmc',
					},
					{
						title: '校区地址',
						width: 200,
						dataIndex: 'xqdz',
						key: 'xqdz',
					},
					{
						title: '手机号码',
						width: 200,
						dataIndex: 'xqlxdh',
						key: 'xqlxdh',
					},
					{
						title: '校区传真',
						width: 200,
						dataIndex: 'xqczdh',
						key: 'xqczdh',
					},
					{
						title: '电子邮件',
						width: 200,
						dataIndex: 'dzyj',
						key: 'dzyj',
					},
					{
						title: '校区邮政编码',
						width: 150,
						dataIndex: 'xqyzbm',
						key: 'xqyzbm',
					},
					{
						title: '校区所在地行政区划码',
						width: 300,
						dataIndex: 'xqszdxzqhm',
						key: 'xqszdxzqhm',
					},
					{
						title: '校区面积',
						width: 100,
						dataIndex: 'xqmj',
						key: 'xqmj',
					},
					{
						title: '校区建筑面积',
						width: 150,
						dataIndex: 'xqjzmj',
						key: 'xqjzmj',
					},
					{
						title: '校区教学科研仪器设备总值',
						width: 200,
						dataIndex: 'xqjxkysbzz',
						key: 'xqjxkysbzz',
					},
					{
						title: '校区固定资产总值',
						width: 200,
						dataIndex: 'xqgdzczz',
						key: 'xqgdzczz',
					},
					{
						title: '操作',
						dataIndex: 'action',
						key: 'action',
						fixed: 'right',
						width: 100,
						scopedSlots: {
							customRender: 'action'
						},
					},
				],
				data: [],
				selectedRowKeys:[],
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

					xqdm: '', //状态

					xqmc: '', //年级

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
			onSelectChange(selectedRowKeys) {
				console.log('selectedRowKeys changed: ', selectedRowKeys);
				this.selectedRowKeys = selectedRowKeys;
			},
			remoder() {
				this.searchInfo.xqdm = ''
				this.searchInfo.xqmc = ''
				this.getStuInfo()
			},
			joinStu(type, id) {
				// this.joinOrChangeStuShow = true
				this.$refs.joinOrChangeStu.judesType(type, id)
			},
			JoinOrchangeStuSuss() {
				this.getStuInfo()
			},
			getStuInfo() {
				axios({
					url: 'common/veBase/getCampusPageList',
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

			tableChange(value, key, column) {
				this.searchInfo.pageNo = value.current
				this.pagination.current = value.current
				this.getStuInfo()
			},
			// 删除信息
			delteIds() {
				if (this.selectedRowKeys.length == 0) {
					this.$message.warning("请先选择信息");
					return
				}
				var then = this
				this.$confirm({
					title: '是否删除',
					content: '是否删除这些数据',
					okText: '确认',
					cancelText:'取消',
					onOk() {
						let ids = ''
						for (let i = 0; i < then.selectedRowKeys.length; i++) {
							if (i == 0) {
								ids += then.selectedRowKeys[i]
							} else {
								ids += ',' + then.selectedRowKeys[i]
							}
						}
						axios({
							url: 'common/veBase/deleteCampusBatch?ids=' + ids,
							method: 'post',
							params: {}

						}).then(res => {
							then.selectedRowKeys = []
							if (res.code == 200) {
								then.getStuInfo()
							}

						}).catch(err => {
							// then.$message.warning("获取年级失败");
						})
					},
					onCancel() {},
				});
			},
		}
	}
</script>

<style lang="less" scoped>
	.top{
		display:flex;
		align-items: center;
	}
	/deep/ .ant-table-tbody > tr > td,/deep/.ant-table-thead > tr > th{
		padding:15px 5px;
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