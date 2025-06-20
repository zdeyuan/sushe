<template>
	<div>
		<a-card :bordered="false" class="header-solid mb-24" >
		<div class="top">
			<div style="margin-bottom: 15px;">
				<span class="divide-span" style=" margin-right: 10px;">角色编码</span>
				<a-input placeholder="请输入" style=" width: 200px;" v-model="searchInfo.code" />

				<span class="divide-span" style=" margin-left: 20px; margin-right: 10px;">角色名称</span>
				<a-input placeholder="请输入" style=" width: 200px;" v-model="searchInfo.text" />

			</div>
			<div style="margin-bottom: 15px;margin-left:10px;">
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
			<!-- <a-button type="danger" @click="delteIds" style="margin-right: 20px;">
				批量删除
			</a-button> -->
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
					<!-- {{record.njzt== 0 ? '过期' : '未过期'}} -->
					<a-switch v-model="record.status" @change="onChange(record)" />
				</span>

				<span slot="isdefault" slot-scope="text, record">
					<!-- {{record.njzt== 0 ? '过期' : '未过期'}} -->
					<a-switch v-model="record.isdefault" @change="onChange(record)" />
				</span>

				<span slot="action" slot-scope="text, record">
					<!-- <span style="color: #028BE2; cursor:pointer; margin-right: 20px;"
						@click="joinStu('change',record)">修改</span> -->

					<span style="color: #028BE2; cursor:pointer; margin-right: 20px;"
						@click="delteIds(record)">删除</span>

					<span style="color: #028BE2; cursor:pointer;" @click="joincd('change',record)">修改权限</span>
				</span>
			</a-table>
		</div>
		<div class="showNewDoginBox">
			<!-- <a-modal v-model="joinOrChangeStuShow" :title="joinOrChangeStuType == 'add' ? '添加' : '修改'" @ok="uploadCancel" @cancel="uploadCancel" :width="1073"> -->
			<joinOrChangeStuInfo ref="joinOrChangeStu" @JoinOrchangeStuSuss='JoinOrchangeStuSuss'></joinOrChangeStuInfo>
			<syslistchange ref="syslist" ></syslistchange>
			<!-- </a-modal> -->
		</div>
		</a-card>
	</div>
</template>

<script>
	import {
		axios
	} from '@/utils/request';
	import {
		EduListMixin
	} from '@/mixins/EduListMixin'
	import joinOrChangeStuInfo from './join.vue'
	import syslistchange from './syslistchange.vue'
	export default {
		// mixins: [EduListMixin], // 引入模块
		components: {
			joinOrChangeStuInfo,
			syslistchange
		},
		data() {
			return {
				current: 'schoolInfo',
				columns: [{
						title: '角色编码',
						dataIndex: 'code',
						key: 'code',
					},
					{
						title: '角色名称',
						dataIndex: 'text',
						key: 'text',
					},
					{
						title: '角色备注',
						dataIndex: 'remark',
						key: 'remark',
					},
					{
						title: '状态',
						dataIndex: 'status',
						key: 'status',
						slots: {
							title: 'status'
						},
						scopedSlots: {
							customRender: 'status'
						},
					},
					{
						title: '是否默认角色',
						dataIndex: 'isdefault',
						key: 'isdefault',
						slots: {
							title: 'isdefault'
						},
						scopedSlots: {
							customRender: 'isdefault'
						},
					},
					// {
					// 	title: '年级状态',
					// 	dataIndex: 'njzt',
					// 	key: 'njzt',
					// 	slots: { title: 'njzt' },
					// 	scopedSlots: { customRender: 'njzt' },
					// },
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

					code: '', //状态

					text: '', //年级
				},
				manage:[],
				dialogVisible:false
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
			// /base/veAuthorization/getSysMenuTreeList
			onChange(e) {
				e.isdefault = e.isdefault == true ? 1 : 0
				e.status = e.status == true ? 1 : 0
				axios({
						url: '/edu-base/base/VeBaseSysRole/editSysRoleAndMenu',
						method: 'post',
						data: e,

					})
					.then((res) => {
						if (res.code == 200) {
							this.$message.success('修改成功');
							this.getStuInfo()
							return;
						} else {
							this.$message.warning(res.message);
						}
					})
					.catch((err) => {
						this.$message.warning("修改失败！");
					})
			},
			remoder() {
				this.searchInfo.code = ''
				this.searchInfo.text = ''
				this.getStuInfo()
			},
			joinStu(type, id) {
				// this.joinOrChangeStuShow = true
				this.$refs.joinOrChangeStu.judesType(type, id)
			},
			joincd(type, id){
				sessionStorage.setItem('sbcdjsqx',JSON.stringify(id))
				this.$refs.syslist.judesType(type, id)
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
					url: '/edu-base/base/VeBaseSysRole/getSysRolePageList',
					method: 'get',
					params: this.searchInfo
				}).then(res => {

					if (res.code == 200) {

						this.data = res.result.list

						this.pagination.total = res.result.totalRecord
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
			delteIds(e) {
				var then = this
				this.$confirm({
					title: '是否删除',
					content: '是否删除这条数据',
					okText: '确认',
					cancelText:'取消',
					onOk() {
						axios({
							url: '/edu-base/base/VeBaseSysRole/deleteSysRole?id=' + e.id,
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