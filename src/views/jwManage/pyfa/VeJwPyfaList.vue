<template>
	<a-card :bordered="false">
		<!-- 查询区域 -->
		<div class="table-page-search-wrapper" style="margin-bottom:10px;display:inline-block;">
			<a-form layout="inline" @keyup.enter.native="searchQuery">
						<a-button type="primary" @click="filter">筛选</a-button>
						<a-form-item label="年级" >
							<j-select-grade v-model="queryParam.gradeid" width="150px" placeholder="请选择年级">
							</j-select-grade>
						</a-form-item>
						<span class="table-page-search-submitButtons">
							<a-button type="primary" @click="searchQuery" icon="search" style="margin-right:10px;">
								<i class="basefont iconsousuo" style="margin-right: 4px;font-size: 14px;"></i>
								搜索</a-button>
							<a-button type="danger" @click="searchReset" icon="delete"> <i class="basefont iconshanchu"
									style="margin-right: 4px;font-size: 14px;"></i>
								清空</a-button>
						</span>
			</a-form>
		</div>
		<!-- 查询区域-END -->

		<!-- 操作按钮区域 -->
		<div class="table-operator">
			<a-button type="primary"  @click="handleAdd" icon="plus" style="margin-right:10px;">
		添加</a-button>
			<!-- <edu-pms :code="'v-add'" type="primary" ext="success" iconfont="a" name="启用"
				@click="batchState(1)"></edu-pms> -->
			<edu-pms :code="'v-add'" type="primary" ext="success" iconfont="check-circle" name="启用"
				@click="batchState(1)"></edu-pms>
			<edu-pms :code="'veJn-add'" type="primary" ext="delete" iconfont="stop" name="禁用"
				@click="batchState(0)"></edu-pms>
			<edu-pms :code="'veJn-research'" type="primary" iconfont="sousuo" name="刷新" @click="searchQuery"></edu-pms>
			<!-- <edu-pms :code="'veJn-remove'" type="danger" ext="delete" iconfont="stop" name="禁用"
				@click="recycle"></edu-pms> -->
			<a-button type="danger"  @click="batchDelAction"  style="margin-bottom: 0px">批量删除
			</a-button>	
		</div>

		<!-- table区域-begin -->
		<div>
			<div class="ant-alert ant-alert-info" style="margin-bottom: 16px">
				<i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择
				<a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
				<a style="margin-left: 24px" @click="onClearSelected">清空</a>
			</div>

			<a-table ref="table" size="middle" rowKey="id" :scroll="{x:1200}" :columns="columns"
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
					<edu-label-button type="2" @click="handleDetail(record)" title="查看"></edu-label-button>
					<a-divider type="vertical" />
					<edu-label-button type="3" @click="handleEdit(record)" title="编辑"></edu-label-button>
					<a-divider type="vertical" />
					<a  @click="removeById(record.id)" >删除</a>
					<a-divider type="vertical" />
					<edu-label-button type="1" @click="handleKcjh(record)" title="课程计划"></edu-label-button>
				</span>

				<span slot="isGraduate" slot-scope="text, record">
					<a-switch default-checked @change="changeIsGraduate(record.id, checked)" v-model="record.isGraduate"
						:active-value="1" :inactive-value="0" />
				</span>

				<span slot="isAble" slot-scope="text, record">
					<a-switch default-checked @change="changeIsAble(record.id, checked)" v-model="record.isAble"
						:active-value="1" :inactive-value="0" />
				</span>
			</a-table>
		</div>

		<veJwPyfa-modal ref="modalForm" @ok="searchQuery"></veJwPyfa-modal>
		<VeJwPyfaExcelModal ref="modalExcelForm" @ok="searchQuery"></VeJwPyfaExcelModal>
		<ve-jw-pyfa-recycle-bin ref="recycle"></ve-jw-pyfa-recycle-bin>
		<ve-jw-pyfa-kcjh-modal ref="kcjhForm" @ok="searchQuery"></ve-jw-pyfa-kcjh-modal>
		<ve-jw-pyfa-filter ref="filter" @ok="searchQuery"></ve-jw-pyfa-filter>
	</a-card>
</template>

<script>
	import '@/assets/scss/common.scss';
	import {
		EduListMixin
	} from '@/mixins/KwglMixin'
	import VeJwPyfaModal from './modules/VeJwPyfaModal'
	import VeJwPyfaExcelModal from './modules/VeJwPyfaExcelModal'
	import VeJwPyfaRecycleBin from './modules/VeJwPyfaRecycleBin'
	import {
		postAction,
		getAction
	} from '@/api/common/manage'
	import VeJwPyfaKcjhModal from './modules/VeJwPyfaKcjhModal.vue'
	import JSelectGrade from '@/components/kwglbiz/JSelectGrade'
	import VeJwPyfaFilter from './modules/VeJwPyfaFilter.vue'
	export default {
		name: 'VeJwPyfaList',
		mixins: [EduListMixin],
		components: {
			VeJwPyfaExcelModal,
			VeJwPyfaModal,
			VeJwPyfaRecycleBin,
			VeJwPyfaKcjhModal,
			JSelectGrade,
			VeJwPyfaFilter,
		},
		data() {
			return {
				labelCol: {
				  xs: { span: 24 },
				  sm: { span: 6 }
				},
				wrapperCol: {
				  xs: { span: 24 },
				  sm: { span: 18 }
				},
				description: '培养方案管理页面',
				// 表头
				filterConfig: {
					falid: true,
				},
				columns: [{
						title: '名称',
						align: 'center',
						dataIndex: 'name',
					},
					{
						title: '年级',
						align: 'center',
						dataIndex: 'gradeidName',
					},
					{
						title: '学期',
						align: 'center',
						dataIndex: 'semidName',
					},
					{
						title: '专业',
						align: 'center',
						dataIndex: 'specidName',
					},
					{
						title: '学制',
						align: 'center',
						dataIndex: 'xzidName',
					},
					{
						title: '描述',
						align: 'center',
						dataIndex: 'description',
					},

					{
						title: '创建时间',
						align: 'center',
						dataIndex: 'createTime',
					},
					{
						title: '是否毕业',
						align: 'center',
						fixed: 'right',
						dataIndex: 'isGraduate',
						scopedSlots: {
							customRender: 'isGraduate'
						},
					},
					{
						title: '是否有效',
						align: 'center',
						fixed: 'right',
						dataIndex: 'isAble',
						scopedSlots: {
							customRender: 'isAble'
						},
					},
					{
						title: '操作',
						dataIndex: 'action',
						align: 'center',
						fixed: 'right',
						scopedSlots: {
							customRender: 'action'
						},
					},
				],
				url: {
					list: '/jxgz/veJwPyfa/list',
					delete: '/jxgz/veJwPyfa/delete',
					deleteBatch: '/jxgz/veJwPyfa/deleteBatch',
					stateBatch: "/jxgz/veJwPyfa/stateBatch",
					exportXlsUrl: '/jxgz/veJwPyfa/exportXls',
					importExcelUrl: 'jxgz/veJwPyfa/importExcel',
					updateIsGraduate: '/jxgz/veJwPyfa/updateIsGraduate',
					updateIsAble: '/jxgz/veJwPyfa/updateIsAble',
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

			//回收站
			recycle: function() {
				this.$refs.recycle.show()
				this.$refs.recycle.title = '回收站'
				this.$refs.recycle.disableSubmit = false
			},	
			removeById(id){
				let _this=this;
				this.handleDelete(id)
			},
			//查看课程计划
			handleKcjh: function(record) {
				this.$refs.kcjhForm.select(record)
				this.$refs.kcjhForm.title = '课程计划'
				this.$refs.kcjhForm.disableSubmit = false
			},
			handelExcel: function() {
				this.$refs.modalExcelForm.title = '课程计划'
				this.$refs.modalExcelForm.disableSubmit = false
			},
			//更新是否毕业
			changeIsGraduate(id, checked) {
				this.loading = true
				postAction(this.url.updateIsGraduate, {
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

			//更新是否有效
			changeIsAble(id, checked) {
				this.loading = true
				postAction(this.url.updateIsAble, {
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

			//筛选
			filter: function() {
				console.log('1111')
				this.$refs.filter.edit()
				this.$refs.filter.title = '筛选'
				this.$refs.filter.disableSubmit = false
			},

			//接收所筛选条件
			filterFormOk(gradeid, semid, isGraduate, isAble, description, createBy, zy, zyb, xz) {
				//this.jcid=id

				this.queryParam = {}
				if (gradeid != null) {
					this.queryParam.gradeid = gradeid
				}
				if (semid != null) {
					this.queryParam.semid = semid
				}
				if (isGraduate != null) {
					this.queryParam.isGraduate = isGraduate
				}
				if (isAble != null) {
					this.queryParam.isAble = isAble
				}
				if (xz != null) {
					this.queryParam.xzid = xz
				}
				if (zy != null) {
					this.queryParam.falid = zy
				}
				if (zyb != null) {
					this.queryParam.specid = zyb
				}
				// if (description != null) {
				//   this.queryParam.description = description
				// }
				// if (createBy != null) {
				//   this.queryParam.createBy = createBy
				// }

				this.loadData()
			},
		},
	}
</script>
<style scoped>
	/deep/ .ant-form-item-label {
		display: inline-block;
		width: 100px;
		vertical-align: middle !important;
	}
</style>