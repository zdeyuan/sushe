<template>
	<a-card :bordered="false">
		<!-- 查询区域 -->
		<div class="table-page-search-wrapper">
			<a-form layout="inline" @keyup.enter.native="searchQuery">
				<a-row :gutter="24">
					<a-col :md="7" :sm="24">
						<a-form-item label="活动名称">
							<a-input v-model="queryParam.actname" placeholder="请输入活动名称" />
						</a-form-item>
					</a-col>

					<a-col :md="7" :sm="24">
						<a-form-item label="班级">
							<!--              <a-input v-model="queryParam.bjid" />-->
							<j-select-banji v-model="queryParam.bjid" placeholder="请选择班级"></j-select-banji>
						</a-form-item>
					</a-col>
					<a-col :md="7" :sm="24">
						<a-form-item label="带队教师">
							<!--              <a-input v-model="queryParam.teacherid" />-->
							<j-select-teacher v-model="queryParam.teacherid" placeholder="请选择带队教师"></j-select-teacher>
						</a-form-item>
					</a-col>
				</a-row>
			</a-form>
		</div>
		<!-- 查询区域-END -->

		<!-- 操作按钮区域 -->
		<div class="table-operator">
			<a-button @click="searchQuery" type="primary" icon="search" style="margin-right: 10px;">搜索</a-button>
			<a-button @click="searchReset" type="danger" icon="delete" style="margin-right: 10px;">清除</a-button>
			<!-- <edu-button @click="handleAdd" type="3" icon="plus" title="添加"/>
      <edu-button type="7" @click="batchDel" icon="delete"  title="删除"></edu-button>
      <edu-button type="1" @click="searchQuery" icon="sync" title="刷新"></edu-button> -->
			<a-button @click="handleAdd" type="primary" icon="plus" style="margin-right: 10px;">添加</a-button>
			<a-button @click="searchQuery" type="primary" icon="sync" style="margin-right: 10px;">刷新</a-button>
			<a-button type="danger" @click="batchDel" style="margin-right: 10px;">批量删除</a-button>
			<!--      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>-->
			<!--      <a-button @click="batchDel" type="primary" icon="delete">删除</a-button>-->
			<!--      <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">刷新</a-button>-->
		</div>

		<!-- table区域-begin -->
		<div>
			<div class="ant-alert ant-alert-info" style="margin-bottom: 16px">
				<i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择
				<a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
				<a style="margin-left: 24px" @click="onClearSelected">清空</a>
			</div>

			<a-table ref="table" size="middle" bordered rowKey="id" :columns="columns" :dataSource="showDataSource"
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
					<a type="3" title="编辑" @click="handleEdit(record)">编辑</a>
				</span>
			</a-table>
		</div>

		<veJwTeachact-modal ref="modalForm" @ok="modalFormOk"></veJwTeachact-modal>
	</a-card>
</template>

<script>
	// import { EduListMixin } from '@/mixins/EduListMixin'
	import {
		EduListMixin
	} from '@/mixins/KwglMixin'
	import VeJwTeachactModal from './modules/VeJwTeachactModal'
	import JSelectDepart from '@/components/edubiz/JSelectDepart'
	import JSelectTeacher from '@/components/kwglbiz/JSelectTeacher'
	import {
		formatDate
	} from '@/utils/util'
	import JSelectBanji from '@/components/kwglbiz/JSelectBanji'

	export default {
		name: 'VeJwTeachactList',
		mixins: [EduListMixin],
		components: {
			JSelectBanji,
			JSelectTeacher,
			JSelectDepart,
			VeJwTeachactModal,
		},
		data() {
			return {
				description: 've_jw_teachact管理页面',
				// 表头
				columns: [{
						title: '活动名称',
						align: 'center',
						dataIndex: 'actname',
					},
					{
						title: '班级',
						align: 'center',
						dataIndex: 'bjidName',
					},
					// {
					//   title: '班级名称',
					//   align: 'center',
					//   dataIndex: 'bjname',
					// },
					{
						title: '活动人数',
						align: 'center',
						dataIndex: 'personnum',
					},
					{
						title: '地址',
						align: 'center',
						dataIndex: 'address',
					},
					{
						title: '活动时间',
						align: 'center',
						dataIndex: 'acttime',
						customRender: function(t) {
							return t ? formatDate(t * 1000, 'yyyy-MM-dd') : ''
						},
					},
					{
						title: '带队教师',
						align: 'center',
						dataIndex: 'teacheridName',
					},
					{
						title: '活动状态',
						align: 'center',
						dataIndex: 'actstatus',
						customRender: function(t) {
							return t == 1 ? '有效' : '无效';
						},
					},
					{
						title: '创建时间',
						align: 'center',
						dataIndex: 'createtime',
						customRender: function(t) {
							return t ? formatDate(t * 1000, 'yyyy-MM-dd hh:mm:ss') : ''
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
					list: '/jxgz/veJwTeachact/list',
					delete: '/jxgz/veJwTeachact/delete',
					deleteBatch: '/jxgz/veJwTeachact/deleteBatch',
					exportXlsUrl: '/jxgz/veJwTeachact/exportXls',
					importExcelUrl: 'jxgz/veJwTeachact/importExcel',
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
		methods: {
			initDictConfig() {},
		},
	}
</script>
<style lang="less" scoped>
	::v-deep .j-select-biz-component-box {
		width: 300px;
	}

	::v-deep .ant-table-thead>tr>th {
		background: #66C3FD;
		color: #FFFFFF;
	}

	::v-deep .ant-form-item-control {
		width: 200px;
		// display: inline-block;
	}

	::v-deep .table-operator {
		margin: 10px 0;
	}

	::v-deep .button_default {
		height: 40px;
		position: relative;
		top: 2px;
	}

	// .auto-tabs /deep/.ant-tabs-bar {
	//   margin-bottom: 0;
	//   .ant-tabs-tab {
	//     color: #999999;
	//   }
	//   .ant-tabs-tab-active {
	//     color: #666666;
	//   }
	//   .ant-tabs-ink-bar {
	//     background: #878787;
	//   }
	// }
</style>