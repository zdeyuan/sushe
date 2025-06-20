<template>
	<div>
		<!-- 查询区域 -->
		<div class="table-page-search-wrapper">
			<a-form layout="inline" @keyup.enter.native="searchQuery">
				<a-row :gutter="24">
						<div class="sbys">
							<a-form-item label="总结录时间">
								<j-date placeholder="请选择开始日期" class="query-group-cust"
									v-model="queryParam.addtime_begin"></j-date>
								<span class="query-group-split-cust">-</span>
								<j-date placeholder="请选择结束日期" class="query-group-cust"
									v-model="queryParam.addtime_end"></j-date>
							</a-form-item>
						</div>
						<a-form-item label="日志标题">
							<a-input v-model="queryParam.title" placeholder="请输入日志标题"></a-input>
						</a-form-item>
				</a-row>
			</a-form>
		</div>
		<!-- 查询区域-END -->

		<!-- 操作按钮区域 -->
		<div class="table-operator">
			<a-button @click="searchQuery" type="primary" icon="search" style="margin-right: 10px;">搜索</a-button>
			<a-button @click="searchReset" type="danger" icon="delete" style="margin-right: 10px;">清除</a-button>
			<!--      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>-->
			<!--      <a-button type="primary" style="background-color: rgb(102,195,253)" @click="searchQuery" icon="sync">刷新</a-button>-->

			<!-- <edu-button @click="handleAdd" type="3" icon="plus" title="添加"/>
      <edu-button type="1" @click="searchQuery" icon="sync" title="刷新"></edu-button> -->
			<a-button @click="handleAdd" type="primary" icon="plus" style="margin-right: 10px;">添加</a-button>
			<a-button @click="searchQuery" type="primary" icon="sync" style="margin-right: 10px;">刷新</a-button>
			<a-button type="danger" @click="delteIds" style="margin-right: 10px;">批量删除</a-button>
			<!--      <a-button type="primary" icon="download" @click="handleExportXls('ve_jw_jxrz')">导出</a-button>-->
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
			<!--      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete" />删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>
      </a-dropdown> -->
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
					<a type="3" @click="handleDetail(record)" v-if="record.verifytype==1" title="查看">查看</a>
					<a type="3" @click="handleEdit(record)" v-if="record.verifytype==0" title="修改">修改</a>
				</span>
			</a-table>
		</div>

		<ve-jw-my-jxrz-modal ref="modalForm" @ok="modalFormOk"></ve-jw-my-jxrz-modal>
		<ve-jw-jxrz-audit ref="auditForm" @ok="modalFormOk"></ve-jw-jxrz-audit>
	</div>
</template>

<script>
	import {
		EduListMixin
	} from '@/mixins/EduListMixin'
	import VeJwJxrzModal from './modules/VeJwJxrzModal'
	import VeJwJxrzAudit from './modules/VeJwJxrzAudit.vue'
	import VeJwMyJxrzModal from './modules/VeJwMyJxrzModal.vue'
	import {
		getAction
	} from '@/api/common/manage'
	export default {
		name: 'VeJwMyJxrzList',
		mixins: [EduListMixin],
		components: {
			VeJwJxrzAudit,
			VeJwMyJxrzModal,
		},
		data() {
			return {
				description: 've_jw_jxrz管理页面',
				// 表头
				columns: [{
						title: '标题',
						align: 'center',
						dataIndex: 'title',
					},

					// {
					//   title: '记录人',
					//   align: 'center',
					//   dataIndex: 'adduser',
					// },
					{
						title: '时间',
						align: 'center',
						dataIndex: 'addtime',
						customRender: function(text) {
							return !text ? '' : text.length > 10 ? text.substr(0, 10) : text
						},
					},
					{
						title: '是否评审',
						align: 'center',
						dataIndex: 'verifytype_dictText',
					},
					{
						title: '评审分值',
						align: 'center',
						dataIndex: 'verifyresult',
					},
					{
						title: '审核人',
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
					list: '/jxgz/veJwJxrz/list',
					delete: '/jxgz/veJwJxrz/delete',
					deleteBatch: '/jxgz/veJwJxrz/deleteBatch',
					exportXlsUrl: '/jxgz/veJwJxrz/exportXls',
					importExcelUrl: 'jxgz/veJwJxrz/importExcel',
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
			loadData(arg) {
				if (!this.url.list) {
					this.$message.error("请设置url.list属性!")
					return
				}
				//加载数据 若传入参数1则加载第一页的内容
				if (arg === 1) {
					this.ipagination.current = 1;
				}
				this.queryParam.adduser = window.localStorage.getItem('userId');
				var params = this.getQueryParams(); //查询条件
				params.adduser=JSON.parse(localStorage.getItem('userInfo')).userId;
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
			handleEdit: function(record) {
				this.$refs.modalForm.edit(record);
				this.$refs.modalForm.title = "编辑教学日志";
				this.$refs.modalForm.disableSubmit = false;
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
						then.$http.delete(then.$http.baseServer + '/jxgz/veJwJxrz/deleteBatch?ids=' + ids, {})
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
<style lang="less" scoped>
	::v-deep .sbys .ant-form-item-control {
		width: 600px !important;
	}
	
</style>