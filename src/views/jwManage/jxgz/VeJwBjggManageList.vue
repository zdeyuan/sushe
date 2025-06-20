<template>
	<a-card :bordered="false">
		<!-- 查询区域 -->
		<div class="table-page-search-wrapper">
			<a-form layout="inline">
				<a-row :gutter="24">
						<a-form-item label="班级" style="margin-right:50px;">
							<j-select-banji v-model="queryParam.bjid" placeholder="请选择班级"></j-select-banji>
						</a-form-item>

						<a-form-item label="标题">
							<a-input v-model="queryParam.title" placeholder="请输入标题"></a-input>
						</a-form-item>

						<a-form-item label="审核状态">
							<j-dict-select-tag v-model="queryParam.verifystatus" placeholder="请选择"
								dictCode="verifystatus">
							</j-dict-select-tag>
						</a-form-item>
						<div class="sbys">
							<a-form-item label="发布时间">
								<j-date placeholder="请选择开始日期" class="query-group-cust"
									v-model="queryParam.addtime_begin"></j-date> -
								<j-date placeholder="请选择结束日期" class="query-group-cust"
									v-model="queryParam.addtime_end"></j-date>
							</a-form-item>
						</div>
				</a-row>
			</a-form>
		</div>

		<!-- 操作按钮区域 -->
		<div class="table-operator" :md="24" :sm="24" style="margin: 0px 0px 10px 2px">
			<a-button @click="searchQuery" type="primary" icon="search" style="margin-right: 10px;">搜索</a-button>
			<a-button @click="searchReset" type="danger" icon="delete" style="margin-right: 10px;">清除</a-button>
			<a-button @click="handleAdd" type="primary" icon="plus" style="margin-right: 10px;">添加</a-button>
			<a-button @click="searchQuery" type="primary" icon="sync" style="margin-right: 10px;">刷新</a-button>
			<a-button type="danger" @click="delteIds" style="margin-right: 10px;">批量删除</a-button>
			<!--      <a-dropdown v-if="selectedRowKeys.length > 0">-->
			<!--        <a-menu slot="overlay">-->
			<!--          <a-menu-item key="1" @click="batchDel">-->
			<!--            <a-icon type="delete"/>-->
			<!--            删除-->
			<!--          </a-menu-item>-->
			<!--        </a-menu>-->
			<!--        <a-button style="margin-left: 8px"> 批量操作-->
			<!--          <a-icon type="down"/>-->
			<!--        </a-button>-->
			<!--      </a-dropdown>-->
		</div>

		<!-- table区域-begin -->
		<div>
			<div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
				<i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{
        selectedRowKeys.length }}</a>项
				<a style="margin-left: 24px" @click="onClearSelected">清空</a>
			</div>

			<a-table ref="table" size="middle"  rowKey="id" :columns="columns" :dataSource="dataSource"
				:pagination="ipagination" :loading="loading"
				:rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
				@change="handleTableChange">

				<span slot="action" slot-scope="text, record">
					<a type="3" v-if="record.verifystatus == 0" title="修改" @click="updateEdit(record)">修改</a>
					<a-divider type="vertical" v-if="record.verifystatus == 0" />
					<a type="2" title="评审" @click="bjggManage(record)"
						v-if="record.verifystatus == null || record.verifystatus == ''">评审</a>
					<a-divider type="vertical" v-if="record.verifystatus == null || record.verifystatus == ''"/>
					<a type="1" @click="checkBjgg(record)" title="查看">查看</a>
				</span>

			</a-table>
		</div>
		<!-- table区域-end -->

		<!-- 表单区域 -->
		<VeJwBjggModal ref="modalForm" @ok="modalFormOk"></VeJwBjggModal>
		<VeJwBjggCheckModal ref="checkModalForm" @ok="modalFormOK"></VeJwBjggCheckModal>
		<VeJwBjggManageModal ref="bjggManageModalForm" @ok="modalFormOk"></VeJwBjggManageModal>
	</a-card>
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
	import VeJwBjggManageModal from './modules/VeJwBjggManageModal'
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
			VeJwBjggManageModal
		},
		data() {
			return {
				description: 've_jw_bjgg管理页面',
				// 表头
				columns: [{
						title: '#',
						dataIndex: '',
						key: 'rowIndex',
						width: 60,
						align: 'center',
						customRender: function(t, r, index) {
							return parseInt(index) + 1
						}
					},
					{
						title: '班级名称',
						align: 'center',
						dataIndex: 'bjmc'
					},
					{
						title: '标题',
						align: 'center',
						dataIndex: 'title'
					},
					{
						title: '发布时间',
						align: 'center',
						dataIndex: 'addtime'
					},
					{
						title: '教师名称',
						align: 'center',
						dataIndex: 'addusername'
					},
					{
						title: '审核状态',
						align: 'center',
						dataIndex: 'verifystatus_dictText'
					},
					{
						title: '操作',
						dataIndex: 'action',
						align: 'center',
						width: 190,
						scopedSlots: {
							customRender: 'action'
						}
					}
				],
				url: {
					list: '/jxgz/veJwBjgg/list',
					delete: '/jxgz/veJwBjgg/delete',
					deleteBatch: '/jxgz/veJwBjgg/deleteBatch',
					exportXlsUrl: '/jxgz/veJwBjgg/exportXls',
					importExcelUrl: 'jxgz/veJwBjgg/importExcel'
				},
				dictOptions: {},
				isorter: {
					column: 'id',
					order: 'desc'
				}
			}
		},
		computed: {
			importExcelUrl: function() {
				return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
			}
		},
		methods: {
			initDictConfig() {},
			//我的班级公告-查看我的班级公告
			checkBjgg: function(record) {
				this.$refs.checkModalForm.edit(record)
				this.$refs.checkModalForm.title = '查看班级日志'
				this.$refs.checkModalForm.disableSubmit = false
			},

			//我的班级公告-修改我的班级公告
			updateEdit: function(record) {
				this.$refs.modalForm.edit(record)
				this.$refs.modalForm.title = '编辑班级日志'
				this.$refs.modalForm.disableSubmit = false
			},

			handleAdd: function() {
				this.$refs.modalForm.add()
				this.$refs.modalForm.title = '新增班级公告'
				this.$refs.modalForm.disableSubmit = false
			},
			//班级公告管理-评审
			bjggManage: function(record) {
				this.$refs.bjggManageModalForm.edit(record)
				this.$refs.bjggManageModalForm.title = '评审班级日志'
				this.$refs.bjggManageModalForm.disableSubmit = false
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

		}
	}
</script>
<style scoped>
</style>