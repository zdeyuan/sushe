<template>
	<div>
		<a-card :bordered="false" class="header-solid mb-24" >
		<div class="top">
			<div style="margin-bottom: 15px;">
				<span class="divide-span" style=" margin-right: 10px;">字典名称</span>
				<a-input placeholder="请输入" style=" width: 200px;" v-model="searchInfo.title" />

				<span class="divide-span" style=" margin-left: 20px; margin-right: 10px;">字典代码</span>
				<a-input placeholder="请输入" style=" width: 200px;" v-model="searchInfo.code" />

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
			<a-button type="primary" @click="getStuInfo" style="margin-right: 20px;">
				刷新
			</a-button>
		</div>
		<div class="count">
			<a-table :columns="columns" :data-source="data" :row-selection="rowSelection" @change="tableChange"
				rowKey='id' :pagination="pagination">
				<span slot="userType" slot-scope="text, record">
					 {{record.userType == '1' ? '老师' : record.userType == '0' ? '管理员' : record.userType == '2' ? '学生' : record.userType == '3' ? '企业管理员' : record.userType == '4' ? '企业教师' : '其他'}}
				</span>
				<span slot="statusVal" slot-scope="text, record">
					{{record.statusVal == '' ? '无' : record.statusVal == '0' ? '招聘' : record.statusVal == '1' ? '在职' : record.statusVal == '2' ? '退休' : '其他'}}
				</span>
				<span slot="action" slot-scope="text, record">
					<span style="color: #028BE2; cursor:pointer; margin-right: 20px;" @click="joinStu('change',record)">修改</span>
					<span style="color: #028BE2; cursor:pointer; margin-right: 20px;" @click="delteIds(record)">删除</span>
					<span style="color: #028BE2; cursor:pointer;" @click="changezidiand(record)">字典详情</span>
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
				columns: [
					{
						title: '字典名称',
						dataIndex: 'title',
						key: 'title',
					},
					{
						title: '字典编码',
						dataIndex: 'code',
						key: 'code',
					},
					{
						title: '排序',
						dataIndex: 'listSort',
						key: 'listSort',
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

					title: '', //状态

					code: '', //年级
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
			changezidiand(record) {
				this.$emit('zidiandi',record)
			},
			onChange(e) {
				e.njzt = e.njzt == true ? 1 : 0
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
						} else {
							this.$message.warning(res.message);
						}
					})
					.catch((err) => {
						this.$message.warning("修改失败！");
					})
			},
			remoder() {
				this.searchInfo.title = ''
				this.searchInfo.code = ''
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
					url: '/edu-base/base/veDictionary/selectPageList',
					method: 'get',
					params: this.searchInfo
				}).then(res => {

					if (res.code == 200) {
						this.data = res.result.list
						console.log("res.result.total",res.result.total)
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
			delteIds(obj) {
				var then = this
				this.$confirm({
					title: '是否删除',
					content: '是否删除条数据',
					okText: '确认',
					cancelText:'取消',
					onOk() {
						axios({
							url: '/edu-base/base/veDictionary/delete?id=' + obj.id,
							method: 'post',
							params: {}

						}).then(res => {
							then.selectedRowKeys = []
							if (res.code == 200) {
								then.getStuInfo()
							}

						}).catch(err => {
							then.$message.warning("删除失败");
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