<template>
	<a-card :bordered="false">
		<!-- 查询区域 -->
		<div class="table-page-search-wrapper">
			<a-form layout="inline" @keyup.enter.native="searchQuery">
				<a-row :gutter="24">

					<a-col :xl="7" :lg="11" :md="12" :sm="24">
						<a-form-item label="年级">
							<j-select-banji v-model="queryParam.jxbid" placeholder="请选择年级"></j-select-banji>
						</a-form-item>
					</a-col>

					<a-col :xl="7" :lg="11" :md="12" :sm="24">
						<a-form-item label="学期">
							<j-select-xueqi v-model="queryParam.semid" placeholder="请选择学期"></j-select-xueqi>
						</a-form-item>
					</a-col>、
				</a-row>
			</a-form>
		</div>
		<!-- 查询区域-END -->

		<!-- 操作按钮区域 -->
		<div class="table-operator">
			<a-button @click="searchQuery" type="primary" icon="search" style="margin-right: 10px;">搜索</a-button>
			<a-button @click="searchReset" type="danger" icon="delete" style="margin-right: 10px;">清除</a-button>
			<a-button @click="searchQuery" type="primary" icon="sync" style="margin-right: 10px;">刷新</a-button>
			<!-- <edu-button type="1" @click="searchQuery" icon="sync" title="刷新"></edu-button> -->
			<!--      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>-->
			<!--      <a-button type="primary" icon="download" @click="handleExportXls('ve_jw_skjh')">导出</a-button>-->
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
			<!--      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px">-->
			<!--        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择-->
			<!--        <a style="font-weight: 600">{{ selectedRowKeys.length }}</a-->
			<!--        >项-->
			<!--        <a style="margin-left: 24px" @click="onClearSelected">清空</a>-->
			<!--      </div>-->

			<a-table ref="table" size="middle"  rowKey="id" :columns="columns" :dataSource="showDataSource"
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
					<div v-if="record.skjh">
						<a type="1" @click="handleDetail(record)" title="查看">查看</a>
						<a-divider type="vertical" />
						<a type="2" @click="handleCopy(record)" title="复制">复制</a>
						<a-divider type="vertical" v-if="record.skjh.iscomplete === 0" />
						<a type="3" @click="handle(record)" v-if="record.skjh.iscomplete === 0" title="提交">提交</a>
					</div>
					<div v-if="!record.skjh"><span
							style=" font-family: Microsoft YaHei;font-size: 18px;font-weight: bold;color:#666666">未制定</span>
					</div>
				</span>
			</a-table>
		</div>

		<veJwSkjh-modal ref="modalForm" @ok="modalFormOk"></veJwSkjh-modal>
	</a-card>
</template>

<script>
	// import { EduListMixin } from '@/mixins/EduListMixin'
	import {
		EduListMixin
	} from '@/mixins/KwglMixin'
	import VeJwSkjhModal from './modules/VeJwSkjhModal'
	import {
		putAction,
		getAction
	} from '@/api/common/manage'
	import JSelectXueqi from '@/components/kwglbiz/JSelectXueqi'
	import JSelectBanji from '@/components/kwglbiz/JSelectBanji'

	export default {
		name: 'VeJwSkjhList',
		mixins: [EduListMixin],
		components: {
			VeJwSkjhModal,
			JSelectXueqi,
			JSelectBanji
		},
		data() {
			return {
				description: 've_jw_skjh管理页面',
				// 表头
				columns: [{
						title: '课程',
						align: 'center',
						dataIndex: 'kcid_dictText',
					},

					{
						title: '总学时',
						align: 'center',
						dataIndex: 'zxs',
					},
					{
						title: '教学班',
						align: 'center',
						dataIndex: 'classname',
					},
					{
						title: '年级',
						align: 'center',
						dataIndex: 'gradeidName',
					},
					{
						title: '学期',
						align: 'center',
						dataIndex: 'semester',
					},
					{
						title: '专业部',
						align: 'center',
						dataIndex: 'falidName',
					},
					{
						title: '课程分类',
						align: 'center',
						dataIndex: 'kcflm_dictText',
					},
					{
						title: '课程属性',
						align: 'center',
						dataIndex: 'type_dictText',
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
					list: '/jxrw/veJwJxrw/my/list',
					delete: '/jxgz/veJwSkjh/delete',
					handle: '/jxgz/veJwSkjh/submit/',
					deleteBatch: '/jxgz/veJwSkjh/deleteBatch',
					exportXlsUrl: '/jxgz/veJwSkjh/exportXls',
					importExcelUrl: 'jxgz/veJwSkjh/importExcel',
					isFormulate: '/jxgz/veJwSkjh/isFormulate/',
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
		methods: {
			initDictConfig() {},
			//提交
			handle(record) {
				let that = this
				this.$confirm({
					title: '确认操作',
					content: '提交授课计划后将不能修改，确定要提交吗?',
					onOk: function() {
						that.loading = true
						let url = that.url.handle + record.id
						putAction(url)
							.then((res) => {
								if (res.success) {
									that.$message.success(res.message)
									that.loadData()
								} else {
									that.$message.warning(res.message)
								}
							})
							.finally(() => {
								that.loading = false
							})
					},
				})
			},
			// 查看详情
			handleDetail(record) {
				this.$refs.modalForm.detail(record);
				this.$refs.modalForm.title = "查看";
				this.$refs.modalForm.isCopy = false;
			},
			// 复制
			handleCopy(record) {
				this.$refs.modalForm.detail(record);
				this.$refs.modalForm.title = "复制";
				this.$refs.modalForm.isCopy = true;
				this.$refs.modalForm.getList(record.id);
			},
		},
	}
</script>
<style scoped>

</style>