<template>
	<div>
		<a-card :bordered="false" class="header-solid mb-24">
		<div class="top">
			<div style="margin-bottom: 15px;">
				<span class="divide-span" style=" margin-right: 10px;">院系代码</span>
				<a-input placeholder="请输入" style=" width: 200px;" v-model="searchInfo.yxdm" />

				<span class="divide-span" style=" margin-left: 20px; margin-right: 10px;">院系名称</span>
				<a-input placeholder="请输入" style=" width: 200px;" v-model="searchInfo.yxmc" />

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
			<!-- <a-button type="primary" @click="showUpload" style="margin-right: 20px;">
				导入
			</a-button>


			<div>
				<a-modal v-model="upload" title="导入" @ok="uploadCancel" @cancel="uploadCancel" :width="1073">
					<table class="import-tr">
						<tr>
							<td class="left-td">
								文件要求
							</td>
							<td class="right-td">
								<div class="pad-style">导入excel文件一定要严格按照规定的格式，注意有选择的数据内容 允许类型：<br>
									"xls和xlsx"(文件总大小不能超过20MB)</div>
							</td>
						</tr>
						<tr>
							<td class="left-td">选择导入文件</td>
							<td class="right-td">
								<a-upload class="pad-style" name="file" :showUploadList="false" :multiple="false"
									:headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
									<a-button class="choose-file-btn">
										选择文件
									</a-button>
								</a-upload>
							</td>
						</tr>
						<tr>
							<td class="left-td">导入模版</td>
							<td class="right-td">
								<font class="orange-font pad-style">导入文件请务必使用导入时专有数据模版</font>
								<a class="text-btn-color1" style=" margin-left: 5px"
									@click="exportModel">点击下载</a>
							</td>
						</tr>

					</table>
				</a-modal>
			</div> -->
		</div>
		<div class="count">
			<a-table :columns="columns" :data-source="data" :row-selection="rowSelection" @change="tableChange"
				rowKey='id' :pagination="pagination">
				
				<span slot="status" slot-scope="text, record">
					 <a-switch v-model="record.status" @change="onChange(record)" />
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
	import {
		axios
	} from '@/utils/request';
	import {
		EduListMixin
	} from '@/mixins/EduListMixin'
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
						title: '院系代码',
						dataIndex: 'yxdm',
						key: 'yxdm',
					},
					{
						title: '院系名称',
						dataIndex: 'yxmc',
						key: 'yxmc',
					},
					{
						title: '院系英文名称',
						dataIndex: 'yxywmc',
						key: 'yxywmc',
					},
					{
						title: '状态',
						dataIndex: 'status',
						key: 'status',
						slots: { title: 'status' },
						scopedSlots: { customRender: 'status' },
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

					yxdm: '', //状态

					yxmc: '', //年级
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
				e.status = e.status == true ? 1 : 0
				axios({
						url: '/common/veBase/editFaculty',
						method: 'post',
						data: e,
				
					})
					.then((res) => {
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
				this.searchInfo.yxdm = ''
				this.searchInfo.yxmc = ''
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
				axios({
					url: 'common/veBase/getFacultyPageList',
					method: 'get',
					params: this.searchInfo
				}).then(res => {

					if (res.code == 200) {

						 res.result.list.forEach(e=>{
							e.id=e.id+'';
						})
						this.data =res.result.list;
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
							url: 'common/veBase/deleteFacultyBatch?ids=' + ids,
							method: 'post',
							params: {}

						}).then(res => {
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
		padding: 10px 5px;
	}
</style>