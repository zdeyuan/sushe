<template>
	<a-card :bordered="false">
		<!-- 查询区域 -->
		<div class="table-page-search-wrapper">
			<a-form layout="inline" @keyup.enter.native="searchQuery">
				<a-button type="primary" @click="filter" icon="filter" >筛选</a-button>
				<a-form-item label="班级">
					<j-select-banji v-model="queryParam.xzbids" placeholder="请选择班级"></j-select-banji>
				</a-form-item>
				<span  class="table-page-search-submitButtons">
					<a-button type="primary" @click="searchQuery" icon="search">搜索</a-button>
					<a-button type="danger" @click="searchReset" icon="delete" style="margin-left:10px;">清除</a-button>
				</span>
			</a-form>
		</div>
		<!-- 查询区域-END -->

		<!-- 操作按钮区域 -->
		<div class="table-operator">

			<a-button @click="batchAble" v-if="$hasPer(['system'])" type="primary" icon="check-circle">发布</a-button>

			<a-button @click="batchDisable" v-if="$hasPer(['system'])" type="primary" icon="close-circle" >取消发布</a-button>

			<a-button @click="generate" v-if="$hasPer(['system'])" type="primary" icon="plus" >生成教学任务</a-button>
			<!--      <a-button @click="reuse" type="primary" icon="plus">教学复用</a-button>-->
			<a-button type="primary" @click="searchQuery"  icon="sync" >刷新</a-button>
			<a-button @click="oneButtonPublish" v-if="$hasPer(['system'])" type="primary" icon="plus">一键发布</a-button>
			<!--      @click="batchDel" -->
			<a-dropdown v-if="selectedRowKeys.length > 0&&$hasPer(['system'])" >
			  <a-menu slot="overlay">
			    <a-menu-item key="1" @click="batchDelConfirm">
			      <edu-batch-delete-button ref="batchDelBtn" @del="batchDelAction"  type="4" title="删除"></edu-batch-delete-button>
			    </a-menu-item>
			  </a-menu>
			  <edu-button type="10" title="批量操作" icon="down" style="margin-bottom: 0px" rightIcon="true">
			  </edu-button>
			</a-dropdown>
			<!-- <a-button type="danger" @click="recycle" icon="delete" >回收站</a-button> -->
		</div>

		<!-- table区域-begin -->
		<div>
			<div class="ant-alert ant-alert-info" style="margin-bottom: 16px">
				<i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择
				<a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
				<a style="margin-left: 24px" @click="onClearSelected">清空</a>
			</div>

			<a-table ref="table" size="middle" rowKey="id" :columns="columns" :dataSource="showDataSource"
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
					<!--          <a @click="handleEdit(record)">编辑</a>-->
					<edu-label-button type="3" @click="handleEdit(record)" title="查看"></edu-label-button>
					<a-divider type="vertical" />
					<a @click="handleDelete(record.id,'删除教学计划后会影响教学任务的安排，请确认无相关教学任务后再执行删除操作！')" >删除</a>
				</span>

				<span slot="ismerged" slot-scope="text, record">
					<a-switch default-checked @change="changeIsmerged(record.id, checked)"
						v-model="record.ismergedclass" :active-value="1" :inactive-value="0" />
				</span>

				<span slot="ispublish" slot-scope="text, record">
					<a-switch default-checked @change="changeIsPublish(record.id, checked)" v-model="record.ispublish"
						:active-value="1" :inactive-value="0" />
				</span>
			</a-table>
		</div>
		<jw-select-class ref="selectForm" @ok="modalFormOk"></jw-select-class>
		<veJwJxrw-modal ref="publishForm" @ok="searchQuery"></veJwJxrw-modal>
		<veJwJxrw-edit-modal ref="modalForm" @ok="searchQuery"></veJwJxrw-edit-modal>
		<ve-jw-jxrw-generate ref="generateForm" @ok="searchQuery"></ve-jw-jxrw-generate>
		<ve-jw-jxrw-filter ref="filter" @ok="filterFormOk"></ve-jw-jxrw-filter>
		<ve-jw-jxrw-reuse ref="reuse" @ok="searchQuery"></ve-jw-jxrw-reuse>
		<ve-jw-jxrw-recycle-bin ref="recycle" @ok="searchQuery"></ve-jw-jxrw-recycle-bin>
	</a-card>
</template>

<script>
	// import '@/assets/scss/common.scss';
	// import { EduListMixin } from '@/mixins/EduListMixin'
	import {
		EduListMixin
	} from '@/mixins/KwglMixin'
	import VeJwJxrwModal from './modules/VeJwJxrwModal'
	import VeJwJxrwEditModal from './modules/VeJwJxrwEditModal'
	import {
		postAction,
		getAction
	} from '@/api/common/manage'
	import VeJwJxrwReuse from './modules/VeJwJxrwReuse'
	import JwSelectClass from '@/views/jwManage/jxzy/modules/JwSelectClass'
	import VeJwJxrwGenerate from './modules/VeJwJxrwGenerate'
	import VeJwJxrwFilter from './modules/VeJwJxrwFilter.vue'
	import VeJwJxrwRecycleBin from './modules/VeJwJxrwRecycleBin.vue'
	import JSelectBanji from '@/components/kwglbiz/JSelectBanji'

	export default {
		name: 'VeJwJxrwList',
		mixins: [EduListMixin],
		components: {
			JSelectBanji,
			VeJwJxrwModal,
			VeJwJxrwEditModal,
			VeJwJxrwReuse,
			JwSelectClass,
			VeJwJxrwGenerate,
			VeJwJxrwFilter,
			VeJwJxrwRecycleBin,
		},
		data() {
			return {
				description: 've_jw_jxrw管理页面',
				disableMixinCreated: true,
				// 表头
				columns: [{
						title: '学期',
						align: 'center',
						dataIndex: 'semester',
					},

					{
						title: '课程性质',
						align: 'center',
						dataIndex: 'kcxz_dictText',
					},
					{
						title: '院系',
						align: 'center',
						dataIndex: 'falidName',
					},
					{
						title: '专业',
						align: 'center',
						dataIndex: 'specidName',
					},
					{
						title: '班级',
						align: 'center',
						dataIndex: 'classname',
					},

					{
						title: '课程',
						align: 'center',
						dataIndex: 'kcid_dictText',
					},
					{
						title: '教师',
						align: 'center',
						dataIndex: 'teacheruseridName',
					},
					{
						title: '教室',
						align: 'center',
						dataIndex: 'jsid_dictText',
					},

					{
						title: '合班',
						align: 'center',
						dataIndex: 'ismergedclass',
						scopedSlots: {
							customRender: 'ismerged'
						},
					},

					{
						title: '状态',
						align: 'center',
						dataIndex: 'checkstatus_dictText',
					},
					{
						title: '发布',
						align: 'center',
						dataIndex: 'ispublish',
						scopedSlots: {
							customRender: 'ispublish'
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
					list: '/jxrw/veJwJxrw/list',
					delete: '/jxrw/veJwJxrw/delete',
					deleteBatch: '/jxrw/veJwJxrw/deleteBatch',
					exportXlsUrl: '/jxrw/veJwJxrw/exportXls',
					importExcelUrl: 'jxrw/veJwJxrw/importExcel',
					updateIsmerged: '/jxrw/veJwJxrw/updateIsmerged',
					updatePublishBatch: '/jxrw/veJwJxrw/changePublishByIds',
					changeIsPublish: '/jxrw/veJwJxrw/changeIsPublish',
				},
				dictOptions: {},
				isorter: [],
			}
		},
		created() {
			this.queryParam.delflag = '0'
			this.loadData()
		},
		computed: {
			importExcelUrl: function() {
				return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
			},
		},
		methods: {
			initDictConfig() {},

			//查询班级
			onSearchClass() {
				this.$refs.selectForm.show()
			},

			//接受回送班级信息
			modalFormOk(row, id) {
				console.log('当前选中班级id', id)
				//this.jcid=id

				this.queryParam.jxbid = id
				this.$refs.class.value = row.name
			},
			//接受所选教室信息
			filterFormOk(teacheruserid, jsid, year, semid, falid, specid, jxbid, kcid, xzbids) {
				//this.jcid=id
				if (teacheruserid != null) {
					this.queryParam.teacheruserid = teacheruserid
					console.log('当前选中教师id', teacheruserid)
				}
				if (xzbids != null) {
					this.queryParam.xzbids = xzbids
					console.log('当前选中班级id', xzbids)
				}
				if (jsid != null) {
					this.queryParam.jsid = jsid
					console.log('当前选中教室id', jsid)
				}
				if (year != null) {
					this.queryParam.year = year
					console.log('当前选中学年id', year)
				}
				if (semid != null) {
					this.queryParam.semid = semid
					console.log('当前选中教师id', teacheruserid)
				}
				if (falid != null) {
					this.queryParam.falid = falid
					console.log('当前选中学院id', falid)
				}
				if (specid != null) {
					this.queryParam.specid = specid
					console.log('当前选中教师id', teacheruserid)
				}
				if (jxbid != null) {
					this.queryParam.jxbid = jxbid
					console.log('当前选中教学班id', jxbid)
				}
				if (kcid != null) {
					this.queryParam.kcid = kcid
					console.log('当前选中课程id', kcid)
				}
				this.loadData()
			},

			//教学复用
			reuse: function() {
				this.$refs.reuse.edit()
				this.$refs.reuse.title = '教学复用'
				this.$refs.reuse.disableSubmit = false
			},

			//筛选
			filter: function() {
				this.$refs.filter.edit()
				this.$refs.filter.title = '筛选'
				this.$refs.filter.disableSubmit = false
			},

			//更新是否合班状态
			changeIsmerged(id, checked) {
				this.loading = true
				postAction(this.url.updateIsmerged, {
						id: id
					})
					.then((res) => {
						if (res.success) {
							this.$message.success(res.message)
							this.loadData()
							this.onClearSelected()
						} else {
							this.$message.warning(res.message)
						}
					})
					.finally(() => {
						this.loading = false
					})
			},

			//更新发布状态
			changeIsPublish(id, checked) {
				this.loading = true
				getAction(this.url.changeIsPublish, {
						id: id
					})
					.then((res) => {
						if (res.success) {
							this.$message.success(res.message)
							this.loadData()
						} else {
							this.$message.warning(res.message)
							this.loadData()
						}
					})
					.finally(() => {
						this.loading = false
					})
			},
		
			//生成教学任务
			generate: function() {
				this.$refs.generateForm.edit()
				this.$refs.generateForm.title = '生成教学任务'
				this.$refs.generateForm.disableSubmit = false
			},

			//一键发布
			oneButtonPublish: function() {
				this.$refs.publishForm.edit()
				this.$refs.publishForm.title = '一键发布'
				this.$refs.publishForm.disableSubmit = false
			},

			//回收站
			recycle: function() {
				this.$refs.recycle.show()
				this.$refs.recycle.title = '回收站'
				this.$refs.recycle.disableSubmit = false
			},

			//批量取消发布
			batchDisable: function() {
				if (!this.url.updatePublishBatch) {
					this.$message.error('请设置url.updatePublishBatch!')
					return
				}
				if (this.selectedRowKeys.length <= 0) {
					this.$message.warning('请选择一条记录！')
					return
				} else {
					var ids = ''
					for (var a = 0; a < this.selectedRowKeys.length; a++) {
						ids += this.selectedRowKeys[a] + ','
					}
					var that = this
					this.$confirm({
						title: '确认取消发布',
						content: '是否取消发布选中数据?',
						onOk: function() {
							that.loading = true
							getAction(that.url.updatePublishBatch, {
									ids: ids,
									status: 0
								})
								.then((res) => {
									if (res.success) {
										that.$message.success(res.message)
										that.loadData()
										that.onClearSelected()
									} else {
										that.$message.warning(res.message)
									}
								})
								.finally(() => {
									that.loading = false
								})
						},
					})
				}
			},
			//批量发布
			batchAble: function() {
				if (!this.url.updatePublishBatch) {
					this.$message.error('请设置url.updatePublishBatch!')
					return
				}
				if (this.selectedRowKeys.length <= 0) {
					this.$message.warning('请选择一条记录！')
					return
				} else {
					var ids = ''
					for (var a = 0; a < this.selectedRowKeys.length; a++) {
						ids += this.selectedRowKeys[a] + ','
					}
					var that = this
					this.$confirm({
						title: '确认发布',
						content: '是否发布选中数据?',
						okText:"确认",
						cancelText:"取消",
						onOk: function() {
							that.loading = true
							getAction(that.url.updatePublishBatch, {
									ids: ids,
									status: 1
								})
								.then((res) => {
									if (res.success) {
										that.$message.success(res.message)
										that.loadData()
										that.onClearSelected()
									} else {
										that.$message.warning(res.message)
									}
								})
								.finally(() => {
									that.loading = false
								})
						},
					})
				}
			},
		},
	}
</script>
<style lang="less" scoped>
	.table-page-search-wrapper{
		margin-bottom:10px;
	}
	/deep/ .ant-form-item-label {
		display: inline-block;
		width: 100px;
		vertical-align: middle !important;
	}
</style>