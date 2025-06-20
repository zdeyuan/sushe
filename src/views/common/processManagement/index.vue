<template>
	<div>
		<a-card :bordered="false" class="header-solid mb-24">
			<!-- <div class="top">
				<div style="margin-bottom: 15px;">
					<span class="divide-span" style=" margin-right: 10px;">内容</span>
					<a-input placeholder="请输入" style="height: 30px; width: 200px;" v-model="searchInfo.keyword" />
				</div>
				<div style="margin-left:10px;margin-bottom: 15px;">
					<a-button type="primary" @click="getStuInfo">
						搜索
					</a-button>
					<a-button type="danger" @click="remoder" style="margin-left: 20px;">
						清空
					</a-button>
				</div>
			</div> -->
			<div class="btns" v-if="$hasPer([`system`])">
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

					<span slot="isActive" slot-scope="text, record">
						{{record.isActive == 1 ? '否' : '是'}}
					</span>

					<span slot="action" slot-scope="text, record">
						<span v-if="$hasPer(['system'])"  style="color: #028BE2; cursor:pointer; margin-right: 20px;" 
							@click="joinStu('change',record)">修改</span>
					</span>
				</a-table>
			</div>
			<div class="showNewDoginBox">
				<!-- <a-modal v-model="joinOrChangeStuShow" :title="joinOrChangeStuType == 'add' ? '添加' : '修改'" @ok="uploadCancel" @cancel="uploadCancel" :width="1073"> -->
				<joinOrChangeStuInfo ref="joinOrChangeStu" @JoinOrchangeStuSuss='JoinOrchangeStuSuss'>
				</joinOrChangeStuInfo>
				<!-- </a-modal> -->
			</div>
		</a-card>
	</div>
</template>

<script>
	import {
		EduListMixin
	} from '@/mixins/EduListMixin'
	import joinOrChangeStuInfo from './join.vue'
	import {
		mapActions,
		mapGetters,
		mapState
	} from 'vuex'
	export default {
		// mixins: [EduListMixin], // 引入模块
		components: {
			joinOrChangeStuInfo
		},
		data() {
			return {
				current: 'schoolInfo',
				columns: [{
						title: '流程名称',
						dataIndex: 'name',
						key: 'name',
						

					},
					{
						title: '流程描述',
						dataIndex: 'description',
						key: 'description',

					},
					{
						title: '流程版本',
						dataIndex: 'version',
						key: 'version',
					
					},
					{
						title: '启用状态',
						dataIndex: 'isActive',
						key: 'isActive',
						scopedSlots: {
							customRender: 'isActive'
						},
					},
					{
						title: '创建时间',
						dataIndex: 'createdAt',
						key: 'createdAt',
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

					userId: '', //状态

					realName: '', //年级
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
			this.getStuInfo();
			console.log("roles",this.roles)
		},
		methods: {
			gocxfb(record) {
				var that = this
				this.$confirm({
					title: '提示',
					content: '是否撤销发布通知',
					okText: '确认',
					cancelText: '取消',
					onOk() {
						that.$http.get('/sys/annountCement/doReovkeData', {
								id: record.id,
							})
							.then((res) => {
								if (res.code == 200) {
									that.getStuInfo()
									that.$message.success('撤销发布成功');
									return;
								} else {
									that.$message.warning(res.message);
								}
							})
							.catch((err) => {
								that.$message.warning("重置失败！");
							});
					},
					onCancel() {},
				});
			},
			gofb(record) {
				var that = this
				this.$confirm({
					title: '提示',
					content: '是否将发布通知',
					okText: '确认',
					cancelText: '取消',
					onOk() {
						that.$http.get('/sys/annountCement/doReleaseData', {
								id: record.id,
							})
							.then((res) => {
								if (res.code == 200) {
									that.getStuInfo()
									that.$message.success('发布成功');
									return;
								} else {
									that.$message.warning(res.message);
								}
							})
							.catch((err) => {
								that.$message.warning("重置失败！");
							});
					},
					onCancel() {},
				});
			},
			toContent(item) {
				this.$router.push({
				  path: '/common/notice/content',
				  query: {
				    id: item.id
				  }
				});
			},
			onChange(e) {
				e.njzt = e.njzt === true ? 1 : 0;
				this.$http.post(this.$http.service.base + 'veBase/editFaculty', e)
					.then(res => {
						if (res.code == 200) {
							this.$message.success('修改成功');
							this.getStuInfo();
						} else {
							this.$message.warning(res.message);
						}
					})
					.catch(err => {
						this.$message.warning("修改失败！");
					});
			},
			remoder() {
				this.searchInfo.userId = ''
				this.searchInfo.realName = ''
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
				let _this=this;
				this.$http.get('/sys/processType/list', this.searchInfo)
					.then(res => {
						if (res.code == 0) {
							_this.data = res.result.records
							_this.pagination.total = res.result.totalRecord
						}
					})
					.catch(err => {
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
				var then = this
				this.$confirm({
					title: '是否删除',
					content: '是否删除这些数据',
					okText: '确认',
					cancelText: '取消',
					onOk() {
						let ids = ''
						for (let i = 0; i < then.selectedRowKeys.length; i++) {
							if (i == 0) {
								ids += then.selectedRowKeys[i]
							} else {
								ids += ',' + then.selectedRowKeys[i]
							}
						}
						then.$http.delete('/sys/processType/deleteBatch?ids=' + ids)
							.then(res => {
								then.selectedRowKeys = [];
								if (res.code == 200) {
									then.getStuInfo();
								}
							})
							.catch(err => {
								then.$message.warning("删除失败");
							});
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

	/deep/ .ant-table-thead>tr>th {
		background: #66c3fd;
		color: #fff;
		font-size: 14px;
	}

	/deep/ .ant-table-tbody {
		tr:nth-child(even) {
			background: #f4f7f9;
		}
	}
</style>