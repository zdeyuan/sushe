<template>
	<a-card :bordered="false">
		<!-- 查询区域 -->
		<div class="table-page-search-wrapper">
			<a-form layout="inline" @keyup.enter.native="searchQuery">
				<a-row :gutter="24">
					<a-col :xl="7" :lg="7" :md="8" :sm="24">
						<a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="总结类型">
							<j-dict-select-tag :disabled="check" placeholder="请选择总结类型" v-model="queryParam.gzzjlxid"
								dictCode="zjType"></j-dict-select-tag>
						</a-form-item>
					</a-col>
					<a-col :xl="7" :lg="7" :md="8" :sm="24">
						<a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="总结标题">
							<a-input placeholder="请输入总结标题" v-model="queryParam.gzzjbt"></a-input>
						</a-form-item>
					</a-col>
					<a-col :xl="7" :lg="7" :md="8" :sm="24">
						<a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="总结日期">
							<j-date placeholder="请选择总结日期" v-model="queryParam.gzzjbt"></j-date>
						</a-form-item>
					</a-col>
				</a-row>
				<a-row>
						<div class="table-operator">
							<a-button @click="searchQuery" style="margin-right: 10px;" type="primary" icon="search">搜索</a-button>
							<a-button @click="searchReset" type="danger" icon="delete"
								style="margin-right: 10px;">清除</a-button>
							<a-button @click="handleAdd" type="primary" icon="plus"
								style="margin-right: 10px;">添加</a-button>
							<a-button @click="searchQuery" type="primary" icon="sync"
								style="margin-right: 10px;">刷新</a-button>
							<a-button type="danger" @click="delteIds" style="margin-right: 10px;">批量删除</a-button>

							<!-- <edu-button @click="handleAdd" type="3" icon="plus" title="添加"/>
		      <edu-button type="1" @click="searchQuery" icon="sync" title="刷新"></edu-button>
		      <a-dropdown v-if="selectedRowKeys.length > 0">
		        <a-menu slot="overlay">
		          <a-menu-item key="1" @click="batchDelConfirm">
		            <edu-batch-delete-button ref="batchDelBtn" @del="batchDelAction"  type="4" title="删除"></edu-batch-delete-button>
		          </a-menu-item>
		        </a-menu>
		        <edu-button type="10" title="批量操作" icon="down" style="margin-bottom: 0px" rightIcon="true">
		        </edu-button>
		      </a-dropdown> -->
						</div>

				</a-row>
			</a-form>
		</div>

		<!-- 查询区域-END -->

		<!-- 操作按钮区域 -->
		<div class="table-operator">
			<!--      <a-button type="primary" icon="download" @click="handleExportXls('ve_jw_gzzj')">导出</a-button>-->
			<!--      <a-upload-->
			<!--        name="file"-->
			<!--        :showUploadList="false"-->
			<!--        :multiple="false"-->
			<!--        :headers="tokenHeader"-->
			<!--        :action="importExcelUrl"-->
			<!--        @change="handleImportExcel"-->
			<!--      >-->
			<!--        <a-button type="primary" icon="import">导入</a-button>-->
			<!--      </a-upload>-->
			<!--      <a-dropdown v-if="selectedRowKeys.length > 0">-->
			<!--        <a-menu slot="overlay">-->
			<!--          <a-menu-item key="1" @click="batchDel"><a-icon type="delete" />删除</a-menu-item>-->
			<!--        </a-menu>-->
			<!--        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>-->
			<!--      </a-dropdown>-->
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
				:rowSelection="{ fixed: true, selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
				@change="handleTableChange">
				<template slot="htmlSlot" slot-scope="text">
					<div v-html="text"></div>
				</template>
				<template slot="imgSlot" slot-scope="text">
					<span v-if="!text" style="font-size: 12px; font-style: italic">无此图片</span>
					<img v-else :src="getImgView(text)" height="25px" alt="图片不存在"
						style="max-width: 80px; font-size: 12px; font-style: italic" />
				</template>
				<template slot="fileSlot" slot-scope="text">
					<span v-if="!text" style="font-size: 12px; font-style: italic">无此文件</span>
					<a-button v-else :ghost="true" type="primary" icon="download" size="small"
						@click="uploadFile(text)">
						下载
					</a-button>
				</template>

				<span slot="action" slot-scope="text, record">
					<a type="3" @click="handleEdit(record)" v-if="record.status == 0 && record.isAudited == 0"
						title="修改">修改</a>
				</span>
			</a-table>
		</div>

		<ve-jw-my-gzzj-modal ref="modalForm" @ok="modalFormOk"></ve-jw-my-gzzj-modal>

	</a-card>
</template>

<script>
	import {
		EduListMixin
	} from '@/mixins/EduListMixin'
	import VeJwMyGzzjModal from './modules/VeJwMyGzzjModal.vue'
	import JSelectTeacher from '@/components/kwglbiz/JSelectTeacher'
	import {
		getAction
	} from '@/api/common/manage'

	export default {
		name: 'VeJwMyGzzjList',
		mixins: [EduListMixin],
		components: {
			JSelectTeacher,
			VeJwMyGzzjModal,
		},
		data() {
			return {
				title: window._CONFIG['domianBaseURL'],
				description: 've_jw_gzzj管理页面',
				// 表头
				columns: [{
						title: '总结类型',
						align: 'center',
						dataIndex: 'gzzjlxid_dictText',
					},
					{
						title: '总结标题',
						align: 'center',
						dataIndex: 'gzzjbt',
					},
					{
						title: '总结日期',
						align: 'center',
						dataIndex: 'gzzjrq',
						customRender: function(text) {
							return !text ? '' : text.length > 10 ? text.substr(0, 10) : text
						},
					},

					{
						title: '教师名称',
						align: 'center',
						dataIndex: 'addusername',
					},

					{
						title: '评审结果',
						align: 'center',
						dataIndex: 'isAudited_dictText',
					},

					{
						title: '评审人',
						align: 'center',
						dataIndex: 'verifyusername',
					},

					{
						title: '评审时间',
						align: 'center',
						dataIndex: 'verifytime',
						customRender: function(text) {
							return !text ? '' : text.length > 10 ? text.substr(0, 10) : text
						},
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
					list: '/jxgz/veJwGzzj/mylist',
					delete: '/jxgz/veJwGzzj/delete',
					deleteBatch: '/jxgz/veJwGzzj/deleteBatch',
					exportXlsUrl: '/jxgz/veJwGzzj/exportXls',
					importExcelUrl: 'jxgz/veJwGzzj/importExcel',
				},
				dictOptions: {},
				isorter: [],
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
			loadData(arg) {
				if (!this.url.list) {
					this.$message.error("请设置url.list属性!")
					return
				}
				//加载数据 若传入参数1则加载第一页的内容
				if (arg === 1) {
					this.ipagination.current = 1;
				}
				this.queryParam.adduser = window.localStorage.getItem('userInfo').teacherOrStudentId;
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

			detail: function(record) {
				this.$refs.modalForm.edit(record)
				this.$refs.modalForm.title = '查看工作总结'
				this.$refs.modalForm.disableSubmit = true
			},
			audit: function(record) {
				this.$refs.auditForm.edit(record)
				this.$refs.auditForm.title = '评审工作总结'
				this.$refs.auditForm.disableSubmit = false
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
						then.$http.delete(then.$http.baseServer + '/jxgz/veJwGzzj/deleteBatch?ids=' + ids, {})
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