<template>
	<a-card :bordered="false">

		<!-- 查询区域 -->
		<div class="table-page-search-wrapper">
			<div>
				<a-form layout="inline">
					<a-row :gutter="24">
						<a-col :md="7" :sm="24" style="">
							<a-form-item label="校区">
								<j-select-xiaoqu placeholder="请选择校区" style="width: 200px;" v-model="queryParam.campusid"
									@input="campusSelect"></j-select-xiaoqu>
							</a-form-item>
						</a-col>

						<a-col :md="7" :sm="24" style="">
							<a-form-item label="教学楼">
								<a-select @change="buildingSelect" v-model="queryParam.jzid" style="width: 200px;"
									placeholder="请选择教学楼">
									<a-select-option v-for="item in jzs" :key="item.id" :value="item.id"
										placeholder="教学楼">
										{{ item.jzwmc }}
									</a-select-option>
								</a-select>
							</a-form-item>
						</a-col>

						<a-col :md="7" :sm="24" style="margin-right: 50px;">
							<a-form-item label="教室">
								<a-select v-model="queryParam.jsid" style="width: 200px;" placeholder="请选择教室">
									<a-select-option v-for="item in jss" :key="item.id" :value="item.id"
										placeholder="教室">
										{{ item.jsmc }}
									</a-select-option>
								</a-select>
							</a-form-item>
						</a-col>


						<a-col :md="7" :sm="24" style="">
							<a-form-item label="专业部">
								<j-select-zyb placeholder="请选择专业部" style="width: 200px;" v-model="queryParam.falid"
									@input="zybChange"></j-select-zyb>
							</a-form-item>
						</a-col>

						<a-col :md="7" :sm="24" style="">
							<a-form-item label="专业">
								<j-select-zy-by-zyb ref="zyByZyb" style="width: 200px;" placeholder="请选择专业"
									v-model="queryParam.specid" @input="zyChange"></j-select-zy-by-zyb>
							</a-form-item>
						</a-col>

						<a-col :md="7" :sm="24" style="margin-right: 50px;">
							<a-form-item label="班级">
								<j-select-banji-by-zy ref="banjiByZy" style="width: 200px;" v-model="queryParam.bjid"
									placeholder="请选择班级"></j-select-banji-by-zy>
							</a-form-item>
						</a-col>


						<a-col :md="7" :sm="24" style="">
							<a-form-item label="学期">
								<j-select-xueqi placeholder="请选择学期" style="width: 200px;"
									v-model="queryParam.semid"></j-select-xueqi>
							</a-form-item>
						</a-col>

						<a-col :md="9" :sm="24" style="">
							<a-form-item label="课程">
								<j-select-jiaoxue-kecheng placeholder="请选择课程" style="width: 300px;"
									v-model="queryParam.kcid"></j-select-jiaoxue-kecheng>
							</a-form-item>
						</a-col>

						<a-col :md="7" :sm="24">
							<span style="float: left; overflow: hidden" class="table-page-search-submitButtons">
								<a-button @click="searchQuery" type="primary" icon="search"
									style="margin-right: 10px;">搜索</a-button>
								<a-button @click="searchReset" type="danger" icon="delete"
									style="margin-right: 10px;">清除</a-button>
							</span>
						</a-col>
					</a-row>
				</a-form>
			</div>
		</div>
		<!-- 查询区域-END -->
		<!-- 操作按钮区域 -->
		<div class="table-operator" style="margin: 10px 0;">

			<a-button @click="handleAdd" type="primary" icon="plus" style="margin-right: 10px;">添加</a-button>
			<!-- <a-button @click="batchAble" type="primary" icon="plus" style="margin-right: 10px;">启用</a-button>
			<a-button @click="batchDisable" type="danger" icon="delete" style="margin-right: 10px;">禁用</a-button> -->
			<!-- <a-button @click="showImport=true" type="primary" icon="plus" style="margin-right: 10px;">导入</a-button> -->
			<a-button type="primary" @click="searchQuery" icon="sync" style="margin-right: 10px;">刷新</a-button>

			<a-modal :title="'导入'" :width="800" :visible="showImport">、
				<template slot="footer">
					<div style="text-align: center">
						<a-button @click="showImport=false"> 关闭</a-button>
						<a-button @click="importExcel" type="primary">提交</a-button>
					</div>
				</template>
				<div style="width: 80%;margin-left: 10%">
					<a-form layout="inline">
						<a-row :gutter="24">
							<a-col :md="24" :sm="24">
								<a-form-item label="模板下载">
									<a-button style="margin-left: 100px" type="primary" icon="download"
										@click="downExcel(modelUrl)">
										点击下载
									</a-button>
								</a-form-item>
							</a-col>
							<a-col :md="24" :sm="24" style="margin-top: 20px">
								<a-form-item label="选择Excel表格">
									<input v-if="showImport" style="height: 40px;margin-left:70px " type="file"
										id="inputFile" accept=".xls,.xlsx"></input>
								</a-form-item>
							</a-col>
						</a-row>
					</a-form>
				</div>
			</a-modal>


			<!--      <a-button @click="searchQuery" type="primary" icon="reload">刷新</a-button>-->
			<!-- <edu-button type="1" @click="searchQuery" icon="sync" title="刷新"></edu-button> -->

			<a-dropdown v-if="selectedRowKeys.length > 0">
				<a-menu slot="overlay">
					<a-menu-item key="1" @click="batchDelConfirm">
						<edu-batch-delete-button ref="batchDelBtn" @del="batchDelAction" type="4"
							title="删除"></edu-batch-delete-button>
					</a-menu-item>
				</a-menu>
				<edu-button type="10" title="批量操作" icon="down" style="margin-bottom: 0px" rightIcon="true">
				</edu-button>
			</a-dropdown>

		</div>
		<!-- table区域-begin -->
		<div>
			<div class="ant-alert ant-alert-info" style="margin-bottom: 16px">
				<i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择
				<a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
				<a style="margin-left: 24px" @click="onClearSelected">清空</a>
			</div>

			<a-table ref="table" size="middle"  :scroll="{ x: 2800 }" rowKey="id" :columns="columns"
				:dataSource="showDataSource" :pagination="ipagination" :loading="loading"
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
					<!--          <a @click="handleEdit(record)" v-if="record.ispublish == 0">编辑</a>-->
					<!--          <a-divider v-if="record.status == 1 && record.ispublish == 0" type="vertical"/>-->
					<!--          <a @click="publish(record)" v-if="record.status == 1 && record.ispublish == 0">发布</a>-->
					<!--          <a-divider v-if="record.status == 1 && record.ispublish == 0" type="vertical"/>-->
					<!--          <a @click="dispublish(record)" v-if="record.status == 1 && record.ispublish == 1">取消发布</a>-->


					<edu-label-button type="3" @click="handleEdit(record)" title="编辑"
						v-if="record.ispublish == 0"></edu-label-button>
					<a-divider v-if="record.status == 1 && record.ispublish == 0" type="vertical" />
					<edu-label-button type="2" @click="publish(record)"
						v-if="record.status == 1 && record.ispublish == 0" title="发布"></edu-label-button>
					<edu-label-button type="5" @click="dispublish(record)"
						v-if="record.status == 1 && record.ispublish == 1" title="取消发布"></edu-label-button>
				</span>

				<span slot="place" slot-scope="text, record">
					<span>{{ record.campusidName }} {{ record.jzidDictText }} {{ record.jsidDictText }}</span>
				</span>

				<span slot="ksrqsj" slot-scope="text, record">
					<span>{{ record.ksrq }} {{ record.ksrqsj }}</span>
				</span>

				<span slot="ksxzm" slot-scope="text, record">
					<span>{{ judeType(record.ksxzm) }}</span>
				</span>
			</a-table>
		</div>

		<veJwKaoshi-modal ref="modalForm" @ok="modalFormOk"></veJwKaoshi-modal>
		<veJwKaoshi-daoru-list ref="daoruModalForm" @ok="modalFormOk"></veJwKaoshi-daoru-list>
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
	import VeJwKaoshiDaoruList from './VeJwKaoshiDaoruList'
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
			'veJwKaoshi-daoru-list': VeJwKaoshiDaoruList
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
					}
				},
				wrapperCol: {
					xs: {
						span: 24
					},
					sm: {
						span: 16
					}
				},
				// 表头
				columns: [{
						title: '考试名称',
						width: 150,
						align: 'center',
						dataIndex: 'name',
					},
					{
						title: '发布状态',
						align: 'center',
						width: 100,
						dataIndex: 'ispublishDictText'
					},
					{
						title: '年级',
						align: 'center',
						width: 150,
						dataIndex: 'gradeidName'
					},
					{
						title: '学期',
						align: 'center',
						width: 150,
						dataIndex: 'semidName'
					},
					{
						title: '专业',
						align: 'center',
						width: 150,
						dataIndex: 'specidName'
					},
					{
						title: '考试人数',
						align: 'center',
						width: 100,
						dataIndex: 'number'
					},
					{
						title: '课程',
						align: 'center',
						width: 150,
						dataIndex: 'kcidDictText'
					},
					{
						title: '班级',
						align: 'center',
						width: 150,
						dataIndex: 'bjidName'
					},
					{
						title: '监考老师',
						align: 'center',
						width: 120,
						dataIndex: 'jiankaoName'
					},
					{
						title: '巡考老师',
						align: 'center',
						width: 120,
						dataIndex: 'xunkaoName'
					},
					{
						title: '考试时间',
						align: 'center',
						width: 150,
						dataIndex: 'ksrqsj',
						scopedSlots: {
							customRender: 'ksrqsj'
						}
					},
					{
						title: '考试地点',
						dataIndex: 'place',
						width: 250,
						align: 'center',
						scopedSlots: {
							customRender: 'place'
						}
					},
					{
						title: '考试形式',
						align: 'center',
						width: 150,
						dataIndex: 'ksxsmDictText'
					},
					{
						title: '考试方式',
						align: 'center',
						width: 150,
						dataIndex: 'ksfsmDictText'
					},
					{
						title: '考试性质',
						align: 'center',
						width: 150,
						dataIndex: 'ksxzm',
						scopedSlots: {
							customRender: 'ksxzm'
						}
					},
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
				isorter: [],
				zidtype: []
			}
		},
		computed: {
			importExcelUrl: function() {
				return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
			}
		},
		created() {
		},
		mounted() {
			var arr = JSON.parse(localStorage.getItem('load'))
			this.zidtype = arr['kwgl_exam_properties']
			this.searchQuery();
		},
		methods: {
			initDictConfig() {},
			daoruModel: function() {
				console.log('进入导入')
				this.$refs.daoruModalForm.show()
				this.$refs.daoruModalForm.title = '导入'

				this.$refs.daoruModalForm.disableSubmit = false
			},
			judeType(obj) {
				var msg = this.zidtype.find(e => e.value == obj)
				return msg.text
			},
			publish(record) {
				if (!this.url.changePublish) {
					this.$message.error('请设置url.changePublish属性!')
					return
				}
				if(record.jiankao=='暂未安排'||record.xunkao=='暂未安排'){
					this.$message.error('请先设置监考或者巡考老师')
					return
				}
				var that = this
				this.$confirm({
					title: '发布',
					content: '是否发布此考试信息?',
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
									that.searchQuery()
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
				if (document.getElementById('inputFile').files == null || document.getElementById('inputFile').files
					.length == 0) {
					that.$message.warning('未选择文件')
					return
				}
				let formData = new FormData()
				let fileObj = document.getElementById('inputFile').files[0]
				formData.append('file', fileObj)
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
					content: '是否取消发布此考试信息?',
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
									that.searchQuery()
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
			}
		}
	}
</script>
<style lang="less" scoped>
	::v-deep .ant-table-thead>tr>th {
		background: #66C3FD;
		color: #FFFFFF;
	}

	::v-deep .ant-form-item {
		display: flex;
	}
</style>