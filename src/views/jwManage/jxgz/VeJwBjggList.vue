<template>
	<div>
		<!-- 查询区域 -->
		<div class="table-page-search-wrapper">
			<a-form layout="inline">
				<div style="display:flex">
						<a-form-item label="班级" style="margin-right:50px;">
							<j-select-banji v-model="queryParam.bjid" placeholder="请选择班级"></j-select-banji>
						</a-form-item>
						<div class="sbys">
							<a-form-item label="发布时间">
								<j-date placeholder="请选择开始日期" class="query-group-cust"
									v-model="queryParam.addtime_begin"></j-date> - 
								<j-date placeholder="请选择结束日期" class="query-group-cust"
									v-model="queryParam.addtime_end"></j-date>
							</a-form-item>
						</div>
					</div>
			</a-form>
		</div>
		<!-- 操作按钮区域 -->
		<div class="table-operator" :md="24" :sm="24">
			<a-button @click="search" type="primary" icon="search" style="margin-right: 10px;">搜索</a-button>
			<a-button @click="searchReset" type="danger" icon="delete" style="margin-right: 10px;">清除</a-button>
			<a-button @click="search" type="primary" icon="sync" style="margin-right: 10px;">刷新</a-button>
		</div>

		<!-- table区域-begin -->
		<div>
			<div class="ant-alert ant-alert-info" style="margin-bottom: 16px">
				<i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择
				<a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
				<a style="margin-left: 24px" @click="onClearSelected">清空</a>
			</div>

			<a-table ref="table" size="middle"  rowKey="id" :columns="columns" :dataSource="dataSource"
				:pagination="ipagination" :loading="loading"
				:rowSelection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
				@change="handleTableChange">
				<span slot="action" slot-scope="text, record">
					<a type="1" @click="checkBjgg(record)" title="查看">查看</a>
				</span>
			</a-table>
		</div>
		<!-- table区域-end -->

		<!-- 表单区域 -->
		<VeJwBjggModal ref="modalForm" @ok="modalFormOk"></VeJwBjggModal>
		<VeJwBjggCheckModal ref="checkModalForm" @ok="modalFormOK"></VeJwBjggCheckModal>
	</div>
</template>

<script>
	import {
		EduListMixin
	} from '@/mixins/EduListMixin'
	import {
		getAction
	} from '@/api/common/manage'
	import VeJwBjggModal from './modules/VeJwBjggModal'
	import VeJwBjggCheckModal from './modules/VeJwBjggCheckModal'
	import {
		formatDate
	} from '@/utils/util'
	import JSelectBanji from '@/components/kwglbiz/JSelectBanji'

	export default {
		name: 'EduOrderTicketList',
		mixins: [EduListMixin],
		components: {
			JSelectBanji,
			VeJwBjggModal,
			VeJwBjggCheckModal,
		},
		data() {
			return {
				description: 've_jw_bjgg管理页面',
				// 表头
				columns: [{
						title: '班级名称',
						align: 'center',
						dataIndex: 'bjmc',
					},
					{
						title: '标题',
						align: 'center',
						dataIndex: 'title',
					},
					{
						title: '日期',
						align: 'center',
						dataIndex: 'addtime',
						customRender: function(text) {
							return !text ? '' : text.length > 10 ? text.substr(0, 10) : text
						}
					},
					{
						title: '评审人',
						align: 'center',
						dataIndex: 'verifyusername'
					},
					{
						title: '操作',
						dataIndex: 'action',
						align: 'center',
						scopedSlots: {
							customRender: 'action'
						},
					},
				],
				url: {
					list: '/jxgz/veJwBjgg/list',
					delete: '/jxgz/veJwBjgg/delete',
					deleteBatch: '/jxgz/veJwBjgg/deleteBatch',
					exportXlsUrl: '/jxgz/veJwBjgg/exportXls',
					importExcelUrl: 'jxgz/veJwBjgg/importExcel',
				},
				dictOptions: {},
				isorter: {
					column: 'id',
					order: 'desc',
				},
			}
		},
		computed: {
			importExcelUrl: function() {
				return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
			},
		},
		created() {
			if (!this.disableMixinCreated) {
				console.log(' -- mixin created -- ')
				this.loadData();
				//初始化字典配置 在自己页面定义
				this.initDictConfig();
			}
		},
		methods: {
			search(){
				this.queryParam.verifystatus=1;
				this.searchQuery();
			},
			loadData(arg) {
				if (!this.url.list) {
					this.$message.error("请设置url.list属性!")
					return
				}
				//加载数据 若传入参数1则加载第一页的内容
				if (arg === 1) {
					this.ipagination.current = 1;
				}
				this.queryParam.verifystatus=1;
				this.queryParam.adduser = window.localStorage.getItem('userId');
				var params = this.getQueryParams(); //查询条件
				this.loading = true;
				getAction(this.url.list, params).then((res) => {
					if (res.success) {
						//update-begin---author:zhangyafei    Date:20201118  for：适配不分页的数据列表------------
						this.dataSource = res.result.records || res.result;
						if (res.result.total) {
							this.ipagination.total = res.result.total;
						}
						//update-end---author:zhangyafei    Date:20201118  for：适配不分页的数据列表------------
					}
					if (res.code === 510) {
						this.$message.warning(res.message)
					}
					this.loading = false;
				})
			},
			initDictConfig() {},
			//我的班级公告-查看我的班级公告
			checkBjgg: function(record) {
				this.$refs.checkModalForm.edit(record)
				this.$refs.checkModalForm.title = '查看我的班级公告'
				this.$refs.checkModalForm.disableSubmit = false
			},

			//我的班级公告-修改我的班级公告
			updateEdit: function(record) {
				this.$refs.modalForm.edit(record)
				this.$refs.modalForm.title = '编辑我的班级公告'
				this.$refs.modalForm.disableSubmit = false
			},

			handleAdd: function() {
				this.$refs.modalForm.add()
				this.$refs.modalForm.title = '新增班级公告'
				this.$refs.modalForm.disableSubmit = false
			},
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
						console.log(then.$http, 'then.$http?????????')
						then.$http.delete(then.$http.baseServer + '/jxgz/veJwBjgg/deleteBatch?ids=' + ids, {})
							.then(res => {
								then.selectedRowKeys = []
								if (res.code == 200) {
									then.searchReset()
								}

							}).catch(err => {
								then.$message.warning("获取年级失败");
							})
					},
					onCancel() {},
				});
			},
		},
	}
</script>
<style scoped>

</style>