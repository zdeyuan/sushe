<template>
	<div>
		<a-card :bordered="false" class="header-solid mb-24">
		<div class="top">
			<div style="margin-bottom: 15px;">
				<span class="divide-span" style=" margin-right: 10px;">年级代码</span>
				<a-input placeholder="请输入" style=" width: 200px;" v-model="searchInfo.njdm" />

				<span class="divide-span" style=" margin-left: 20px; margin-right: 10px;">年级名称</span>
				<a-input placeholder="请输入" style=" width: 200px;" v-model="searchInfo.njmc" />

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
				rowKey='id' :pagination="pagination">
				
				<span slot="njzt" slot-scope="text, record">
					 <!-- {{record.njzt== 0 ? '过期' : '未过期'}} -->
					 <a-switch v-model="record.njzt" @change="onChange(record)" />
				</span>
				
				<span slot="action" slot-scope="text, record">
					<span style="color: #028BE2; cursor:pointer;" @click="joinStu('change',record)">修改</span>
				</span>
			</a-table>
		</div>
		<div class="showNewDoginBox">
			<!-- <a-modal v-model="joinOrChangeStuShow" :title="joinOrChangeStuType == 'add' ? '添加' : '修改'" @ok="uploadCancel" @cancel="uploadCancel" :width="1073"> -->
			<joinOrChangeStuInfo ref="joinOrChangeStu" @JoinOrchangeStuSuss='JoinOrchangeStuSuss'></joinOrChangeStuInfo>
			<!-- </a-modal> -->
		</div>
		</a-card>
	</div>
</template>

<script>
	import md5 from 'js-md5';
	import joinOrChangeStuInfo from './join.vue'
	export default {
		// mixins: [EduListMixin], // 引入模块
		components: {
			joinOrChangeStuInfo
		},
		data() {
			return {
				current: 'schoolInfo',
				columns: [{
						title: '年级代码',
						dataIndex: 'njdm',
						key: 'njdm',
					},
					{
						title: '年级名称',
						dataIndex: 'njmc',
						key: 'njmc',
					},
					{
						title: '入学年份',
						dataIndex: 'rxnf',
						key: 'rxnf',
					},
					// {
					// 	title: '年级组长',
					// 	dataIndex: 'xm',
					// 	key: 'xm',
					// },
					{
						title: '备注',
						dataIndex: 'remark',
						key: 'remark',
					},
					{
						title: '年级状态',
						dataIndex: 'njzt',
						key: 'njzt',
						slots: { title: 'njzt' },
						scopedSlots: { customRender: 'njzt' },
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
				joinOrChangeStuShow: false,
				joinOrChangeStuType: '',
				//搜索参数
				searchInfo: {

					pageNo: 1,

					pageSize: 10,

					njdm: undefined, //状态

					njmc: undefined, //年级
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
			onChange(e){
				e.njzt = e.njzt == true ? 1 : 0
				this.$http.post(this.$http.service.base + 'veBase/editGrade',e).then(res => {
						if (res.code == 200) {
							this.$message.success('修改成功');
							this.getStuInfo()
							return;
						}else{
							this.$message.warning(res.message);
						}
					})
					.catch((err) => {
						this.$message.warning("修改失败！");
					})
			},
			remoder() {
				this.searchInfo.njdm = ''
				this.searchInfo.njmc = ''
				this.getStuInfo()
			},
			joinStu(type, id) {
				// this.joinOrChangeStuShow = true
				this.$refs.joinOrChangeStu.judesType(type, id)
			},
			JoinOrchangeStuSuss() {
				this.getStuInfo()
			},
			//导出模板
			exportModel() {
				this.url.exportXlsUrl = 'common/veIntegration/exportModel';
				this.handleExportXls('报名信息导入模板');
				this.url.exportXlsUrl = 'common/veIntegration/importExcelStudent';
			},
			jugeType(value) {
				this.type = value
			},
			getStuInfo() {
				this.$http.get(this.$http.service.base + 'veBase/getGradePageList',this.searchInfo).then(res => {

					if (res.code == 200) {

						this.data = res.result.list;
						
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
			delteIds() {
				if (this.selectedRowKeys.length == 0) {
					this.$message.warning("请先选择信息");
					return
				}
				var then = this;
				let _this=this;
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
						_this.$http.post(_this.$http.service.base + 'veBase/deleteGradeBatch?ids=' + ids,{}).then(res => {
							then.selectedRowKeys = []
							if (res.code == 200) {
								then.getStuInfo()
							}

						}).catch(err => {
							then.$message.warning("获取年级失败");
						})
					},
					onCancel() {},
				});
			}
		}
	}
</script>

<style lang="less" scoped>
	.top {
		display: flex;
		align-items: center;
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