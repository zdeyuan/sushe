<template>
	<a-card :bordered="false">

		<!-- 查询区域 -->
		<!-- 查询区域 -->
		<div class="table-page-search-wrapper">
			<div>
				<a-form layout="inline">
					<a-row :gutter="24">
						<a-form-item label="课程">
							<j-select-jiaoxue-kecheng placeholder="请选择课程"
								v-model="queryParam.kcid"></j-select-jiaoxue-kecheng>
						</a-form-item>
						<a-form-item label="学期">
							<j-select-xueqi placeholder="请选择学期" v-model="queryParam.semid"></j-select-xueqi>
						</a-form-item>
						<a-button type="primary" @click="searchQuery" icon="search"
							style="margin-right:10px;">搜索</a-button>
						<a-button type="danger" @click="searchReset" icon="delete">清除</a-button>
					</a-row>
					<a-row>
						<a-button type="primary" @click="searchQuery" icon="reload">刷新</a-button>
					</a-row>
				</a-form>
			</div>
		</div>
		<!-- table区域-begin -->
		<!--    :rowSelection="{ fixed: true, selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"-->
		<!--    :scroll="{ x: 2800 }"-->
		<div>
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
					<!--          <a @click="handleDetail(record)">查看</a>-->
					<edu-label-button type="3" @click="handleDetail(record)" title="查看"></edu-label-button>
				</span>

				<span slot="place" slot-scope="text, record">
					<span>{{ record.campusidName }} {{ record.jzidDictText }} {{ record.jsidDictText }}</span>
				</span>

				<span slot="ksrqsj" slot-scope="text, record">
					<span>{{ record.ksrq }} {{ record.ksrqsj }}</span>
				</span>
			</a-table>
		</div>

		<veJwKaoshi-modal ref="modalForm" @ok="modalFormOk"></veJwKaoshi-modal>
	</a-card>
</template>

<script>
	// import { EduListMixin } from '@/mixins/EduListMixin'
	import {
		EduListMixin
	} from '@/mixins/KwglMixin'
	import {
		EduUtils
	} from '@/mixins/EduUtils'
	import {
		getAction,
		httpAction,
		getActionForBase,
		getActionGradeForBase
	} from '@/api/common/manage'
	import VeJwKaoshiModal from './modules/VeJwKaoshiModal'
	import JSelectJiaoxueKecheng from '@/components/kwglbiz/JSelectJiaoxueKecheng'
	import JSelectXiaoqu from '@/components/kwglbiz/JSelectXiaoqu'
	import JSelectXueqi from '@/components/kwglbiz/JSelectXueqi'
	import JSelectZyb from '@/components/kwglbiz/JSelectZyb'
	import JSelectZyByZyb from '@/components/kwglbiz/JSelectZyByZyb'
	import JSelectBanjiByZy from '@/components/kwglbiz/JSelectBanjiByZy'

	export default {
		name: 'VeJwKaoshiList',
		mixins: [EduListMixin, EduUtils],
		components: {
			JSelectBanjiByZy,
			JSelectZyByZyb,
			JSelectZyb,
			JSelectXueqi,
			JSelectXiaoqu,
			JSelectJiaoxueKecheng,
			VeJwKaoshiModal,
		},
		data() {
			return {
				showImport: false,
				modelUrl: '/static/excelModel/kaoshi_model.xlsx',
				jzs: [],
				jss: [],
				description: 've_jw_kaoshi管理页面',
				gradeKey: {},
				labelCol: {
					xs: {
						span: 24
					},
					sm: {
						span: 5
					},
				},
				wrapperCol: {
					xs: {
						span: 24
					},
					sm: {
						span: 16
					},
				},
				// 表头
				columns: [{
						title: '课程',
						align: 'center',
						dataIndex: 'kcidDictText'
					},
					{
						title: '考试地点',
						dataIndex: 'place',
						align: 'center',
						scopedSlots: {
							customRender: 'place'
						}
					},
					{
						title: '考试时间',
						align: 'center',
						dataIndex: 'ksrqsj',
						scopedSlots: {
							customRender: 'ksrqsj'
						}
					},
					{
						title: '考试人数',
						align: 'center',
						width: 100,
						dataIndex: 'number'
					},
					{
						title: '考试方式',
						align: 'center',
						dataIndex: 'ksfsmDictText'
					},
					{
						title: '考试性质',
						align: 'center',
						dataIndex: 'ksxzmDictText'
					},
					{
						title: '考试形式',
						align: 'center',
						dataIndex: 'ksxsmDictText'
					},
					// {
					//   title: '状态',
					//   width: 80,
					//   align: 'center',
					//   dataIndex: 'statusDictText'
					// },
					// {
					//   title: '发布状态',
					//   align: 'center',
					//   width: 100,
					//   dataIndex: 'ispublishDictText'
					// },
					// {
					//   title: '年级',
					//   align: 'center',
					//   dataIndex: 'gradeidName'
					// },
					// {
					//   title: '学期',
					//   align: 'center',
					//   dataIndex: 'semidName'
					// },
					// {
					//   title: '专业',
					//   align: 'center',
					//   dataIndex: 'specidName'
					// },
					// {
					//   title: '课程',
					//   align: 'center',
					//   dataIndex: 'kcidDictText'
					// },
					// {
					//   title: '班级',
					//   align: 'center',
					//   dataIndex: 'bjidName'
					// },
					// {
					//   title: '监考老师',
					//   align: 'center',
					//   width: 120,
					//   dataIndex: 'jiankaoName'
					// },
					// {
					//   title: '巡考老师',
					//   align: 'center',
					//   width: 120,
					//   dataIndex: 'xunkaoName'
					// },
					{
						title: '操作',
						dataIndex: 'action',
						align: 'center',
						fixed: 'right',
						width: 120,
						scopedSlots: {
							customRender: 'action'
						}
					}
				],
				url: {
					list: '/kwgl/veJwKaoshi/list',
					delete: '/kwgl/veJwKaoshi/delete',
					deleteBatch: '/kwgl/veJwKaoshi/deleteBatch',
					exportXlsUrl: '/kwgl/veJwKaoshi/exportXls',
					importExcelUrl: 'kwgl/veJwKaoshi/importExcel',
					updateStatusBatch: '/kwgl/veJwKaoshi/updateStatusBatch',
					changePublish: '/kwgl/veJwKaoshi/changePublishById',

					getBuildingList: '/jxzy/jwJianzhu/list',
					getClassroomList: '/jxzy/jwJiaoshi/list'
				},
				dictOptions: {},
				isorter: []
			}
		},
		computed: {
			importExcelUrl: function() {
				return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
			}
		},
		created() {
			console.log("========================================================================")
			console.log("teslt");
			console.log(window.localStorage.getItem('userId'));
		},
		methods: {
			initDictConfig() {},
			daoruModel: function() {
				console.log('进入导入')
				this.$refs.daoruModalForm.show()
				this.$refs.daoruModalForm.title = '导入'

				this.$refs.daoruModalForm.disableSubmit = false
			},

			publish(record) {
				if (!this.url.changePublish) {
					this.$message.error('请设置url.changePublish属性!')
					return
				}
				var that = this
				this.$confirm({
					title: '取消发布',
					content: '是否取消发布此清考信息?',
					okText: '确认',
					cancelText: '取消',
					onOk: function() {
						that.loading = true
						getAction(that.url.changePublish, {
								id: record.id,
								status: 1
							})
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
					}
				})
			},
			importExcel() {
				const that = this
				if (document.getElementById("inputFile").files == null || document.getElementById("inputFile").files
					.length == 0) {
					that.$message.warning('未选择文件')
					return;
				}
				let formData = new FormData();
				let fileObj = document.getElementById("inputFile").files[0];
				formData.append('file', fileObj);
				that.confirmLoading = true
				let httpurl = ''
				let method = ''
				httpurl += this.url.importExcelUrl
				method = 'post'
				httpAction(httpurl, formData, method).then((res) => {
					if (res.success) {
						that.$message.success(res.message)
						that.$emit('ok')
						that.close()
					} else {
						that.$message.warning(res.message)
					}
				}).finally(() => {
					that.confirmLoading = false
				})
			},
			dispublish(record) {
				if (!this.url.changePublish) {
					this.$message.error('请设置url.changePublish属性!')
					return
				}
				var that = this
				this.$confirm({
					title: '取消发布',
					content: '是否取消发布此清考信息?',
					okText: '确认',
					cancelText: '取消',
					onOk: function() {
						that.loading = true
						getAction(that.url.changePublish, {
								id: record.id,
								status: 0
							})
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
					}
				})
			},
			//批量禁用
			batchDisable: function() {
				if (!this.url.updateStatusBatch) {
					this.$message.error('请设置url.updateStatusBatch属性!')
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
						title: '确认禁用',
						content: '是否禁用选中数据?',
						okText: '确认',
						cancelText: '取消',
						onOk: function() {
							that.loading = true
							getAction(that.url.updateStatusBatch, {
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
						}
					})
				}
			},
			//批量启用
			batchAble: function() {
				if (!this.url.updateStatusBatch) {
					this.$message.error('请设置url.updateStatusBatch属性!')
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
						title: '确认启用',
						content: '是否启用选中数据?',
						okText: '确认',
						cancelText: '取消',
						onOk: function() {
							that.loading = true
							getAction(that.url.updateStatusBatch, {
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
						}
					})
				}
			},
			zybChange(code) {
				if (this.$refs.zyByZyb != null) {
					this.$refs.zyByZyb.initDictData(code)
				}
			},
			zyChange(code) {
				if (this.$refs.banjiByZy != null) {
					this.$refs.banjiByZy.initDictData(code)
				}
			},
		}
	}
</script>
<style lang="less" scoped>

</style>