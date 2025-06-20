<template>
	<a-card :bordered="false">
		<!-- 查询区域 -->
		<div class="table-page-search-wrapper">
			<a-form layout="inline">
				<a-row :gutter="24">
					<a-form-item label="姓名">
						<a-input placeholder="请输入姓名" v-model="queryParam.xm"></a-input>
					</a-form-item>
					<a-form-item label="职业认证">
							<edu-data v-model="queryParam.zyksid" stype="select" :datas="zyksList" textKey="name" dtype="datas" />
					</a-form-item>
					<a-form-item label="年级">
						<j-select-grade placeholder="请选择年级" v-model="queryParam.gradeid"></j-select-grade>
					</a-form-item>
					<a-form-item label="专业部">
						<j-select-zyb v-model="queryParam.falid" placeholder="请选择专业部" @input="zybChange"></j-select-zyb>
					</a-form-item>
					<a-form-item label="专业">
						<j-select-zy-by-zyb ref="zyByZyb" placeholder="请先选择专业部" v-model="queryParam.specid"
							@input="zyChange"></j-select-zy-by-zyb>
					</a-form-item>
					<a-form-item label="班级">
						<j-select-banji-by-zy ref="banjiByZy" placeholder="请先选择专业"
							v-model="queryParam.xzbid"></j-select-banji-by-zy>
					</a-form-item>
					<span class="table-page-search-submitButtons">
						<a-button @click="searchQuery" type="primary" icon="search"
							style="margin-right: 10px;">搜索</a-button>
						<a-button @click="searchReset" type="danger" icon="delete"
							style="margin-right: 10px;">清除</a-button>
					</span>
				</a-row>
				<!--<a-row :gutter="24">-->

				<!--<a-col :md="6" :sm="24">-->
				<!--<a-form-item label="项目名称">-->
				<!--<a-input placeholder="请输入项目名" v-model="queryParam.name"></a-input>-->
				<!--</a-form-item>-->
				<!--</a-col>-->
				<!--<a-col :md="6" :sm="24">-->
				<!--<span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">-->
				<!--<a-button type="primary" @click="searchQuery" icon="search">查询</a-button>-->
				<!--<a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>-->
				<!--</span>-->
				<!--</a-col>-->

				<!--</a-row>-->
			</a-form>
		</div>

		<!-- 操作按钮区域 -->
		<div class="table-operator" :md="24" :sm="24" style="margin: 0px 0px 10px 2px">
			<!--<a-button @click="handleAdd" type="primary" icon="plus">添加</a-button>-->
			<!--      <edu-button type="primary" icon="import" @click="excelBanji" title="按班批量录入"></edu-button>

      <edu-button type="4" icon="import" @click="excelImport" title="导入"></edu-button>
	  -->
			<a-button @click="excelBanji" type="primary" icon="import" style="margin-right: 10px;">按班批量录入</a-button>
			<a-button @click="excelImport" type="primary" icon="import" style="margin-right: 10px;">导入</a-button>
			<a-button @click="handleExportXls('职业考试成绩')" type="primary" icon="download"
				style="margin-right: 10px;">导出</a-button>
			<a-button @click="reload" type="primary" icon="sync" style="margin-right: 10px;">刷新</a-button>
			<a-button type="danger" @click="delteIds" style="margin-right: 10px;">批量删除</a-button>
		</div>

		<!-- table区域-begin -->
		<div>
			<div class="ant-alert ant-alert-info" style="margin-bottom: 16px">
				<i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择
				<a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
				<a style="margin-left: 24px" @click="onClearSelected">清空</a>
			</div>

			<a-table ref="table" size="middle"  rowKey="id" :columns="columns" :dataSource="showDataSource"
				:pagination="ipagination" :loading="loading"
				:rowSelection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
				@change="handleTableChange">
				<span slot="action" slot-scope="text, record">
					<a type="1" title="编辑" @click="handleEdit(record)">编辑</a>

					<!--<a @click="handleDetail(record)">统计</a>-->
					<a-divider type="vertical" />
					<!--          <a-upload name="file" :multiple="true" :action="fileUpload" :headers="headers" @change="handleChange">-->
					<!--            <a-button>-->
					<!--              <a-icon type="upload" > Click to Upload-->
					<!--              </a-icon>-->
					<!--            </a-button>-->
					<!--          </a-upload>-->
					<a type="2" title="添加附件" @click="uploadInfo(record)">添加附件</a>
					<!--<a-dropdown>-->
					<!--<a class="ant-dropdown-link">-->
					<!--更多 <a-icon type="down"/>-->
					<!--</a>-->
					<!--<a-menu slot="overlay">-->
					<!--<a-menu-item>-->
					<!--<a href="javascript:;" @click="handleDetail(record)">详情</a>-->
					<!--</a-menu-item>-->

					<!--<a-menu-item>-->
					<!--<a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">-->
					<!--<a>删除</a>-->
					<!--</a-popconfirm>-->
					<!--</a-menu-item>-->
					<!--</a-menu>-->
					<!--</a-dropdown>-->
				</span>
			</a-table>
		</div>
		<!-- table区域-end -->

		<!-- 表单区域 -->
		<veJwCjZhiye-modal ref="modalForm" @ok="modalFormOk"></veJwCjZhiye-modal>
		<VeJwCjZhiyeExcelImportModal ref="modalFormImport" @ok="modalFormOk"></VeJwCjZhiyeExcelImportModal>


		<VeJwCjZhiyeExcelBatchModal ref="modalFormExcel" @ok="searchQuery"></VeJwCjZhiyeExcelBatchModal>
		<ve-jw-cj-zhiye-upload-modal ref="uploadModalForm" @ok="modalFormOK"></ve-jw-cj-zhiye-upload-modal>
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
		getAction
	} from '@/api/common/manage'
	import VeJwCjZhiyeModal from './modules/VeJwCjZhiyeModal'
	import VeJwCjZhiyeExcelBatchModal from './modules/VeJwCjZhiyeExcelBatchModal'
	import VeJwCjZhiyeExcelImportModal from './modules/VeJwCjZhiyeExcelImportModal'
	
	import {
		formatDate
	} from '@/utils/util'
	import VeJwCjZhiyeUploadModal from './modules/VeJwCjZhiyeUploadModal'
	import JSelectGrade from '@/components/kwglbiz/JSelectGrade'
	import JSelectZyb from '@/components/kwglbiz/JSelectZyb'
	import JSelectZyByZyb from '@/components/kwglbiz/JSelectZyByZyb'
	import JSelectBanjiByZy from '@/components/kwglbiz/JSelectBanjiByZy'

	export default {
		name: 'EduOrderTicketList',
		mixins: [EduListMixin, EduUtils],
		components: {
			JSelectBanjiByZy,
			JSelectZyByZyb,
			JSelectZyb,
			JSelectGrade,
			VeJwCjZhiyeUploadModal,
			VeJwCjZhiyeExcelImportModal,
			VeJwCjZhiyeModal,
			VeJwCjZhiyeExcelBatchModal,
		},
		data() {
			return {
				zyksList:[],
				description: 've_jw_cj_zhiye管理页面',
				filterConfig: {
					"xzid": '',
					"stuid": '',
					"userid": '',
				},
				// 表头
				columns: [{
						title: '#',
						dataIndex: '',
						key: 'rowIndex',
						width: 60,
						align: 'center',
						customRender: function(t, r, index) {
							return parseInt(index) + 1
						},
					},
					{
						title: '职业认证名称',
						align: 'center',
						dataIndex: 'zyksid_dictText',
					},
					{
						title: '姓名',
						align: 'center',
						dataIndex: 'xm',
					},
					{
						title: '学号',
						align: 'center',
						dataIndex: 'xh',
					},
					{
						title: '准考证号',
						align: 'center',
						dataIndex: 'zkzh',
					},
					{
						title: '证书号',
						align: 'center',
						dataIndex: 'zsh',
					},
					{
						title: '理论成绩',
						align: 'center',
						dataIndex: 'llcj',
					},
					{
						title: '实操成绩',
						align: 'center',
						dataIndex: 'sccj',
					},
					{
						title: '考试成绩',
						align: 'center',
						dataIndex: 'kscj',
					},
					{
						title: '通过状态',
						align: 'center',
						dataIndex: 'ispass_dictText',
					},
					{
						title: '年级',
						align: 'center',
						dataIndex: 'gradeidName',
					},
					{
						title: '专业部',
						align: 'center',
						dataIndex: 'falidName',
					},
					{
						title: '专业',
						align: 'center',
						dataIndex: 'specidName',
					},

					// {
					//   title:'学制ID',
					//   align:"center",
					//   dataIndex: 'xzid'
					// },

					{
						title: '行政班名称',
						align: 'center',
						dataIndex: 'xzbidName',
					},
					// {
					//   title:'学生ID',
					//   align:"center",
					//   dataIndex: 'stuid'
					// },
					// {
					//   title:'学生用户ID',
					//   align:"center",
					//   dataIndex: 'userid'
					// },
					// {
					//   title:'成绩录入人ID',
					//   align:"center",
					//   dataIndex: 'createuserid'
					// },
					// {
					//   title:'成绩录入日期时间（原日期时间合并）',
					//   align:"center",
					//   dataIndex: 'cjlrrqsj',
					//   customRender:function (text) {
					//     return !text?"":(text.length>10?text.substr(0,10):text)
					//   }
					// },
					// {
					//   title:'状态（0=初始，1=已录入，2=已提交）',
					//   align:"center",
					//   dataIndex: 'status'
					// },
					// {
					//   title:'终端ID',
					//   align:"center",
					//   dataIndex: 'terminalid'
					// },
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
					list: '/edu-schedule/jingsaiProject/veJwCjZhiye/list',
					delete: '/edu-schedule/jingsaiProject/veJwCjZhiye/delete',
					deleteBatch: '/edu-schedule/jingsaiProject/veJwCjZhiye/deleteBatch',
					exportXlsUrl: '/edu-schedule/jingsaiProject/veJwCjZhiye/exportXls',
					importExcelUrl: 'jingsaiProject/veJwCjZhiye/importExcel',
				},
				dictOptions: {},
				isorter: [],
			}
		},
		// created() {
		//   const token = Vue.is.get(ACCESS_TOKEN);
		//   this.headers = {"X-Access-Token":token}
		//   console.log(tiken)
		//   console.log(window._CONFIG['domianURL'])
		// },
		created() {
			
			this.getZyrz();
		},
		methods: {
			reload(){
				this.getZyrz();
				this.searchQuery();
			},
			getZyrz(){
				getAction('/edu-schedule/jingsaiProject/veJwKsZhiye/select').then(
				res => {
					this.zyksList = []
					if (res.code == 200) {
						this.zyksList=res.result;
					}
				
				}).catch(err => {
					this.$message.warning("获取年级失败");
				})
			},
			excelBanji() {
				this.$refs.modalFormExcel.select({
					zyb: '',
					zy: '',
					bj: '',
					ks: ''
				});
				this.$refs.modalFormExcel.title = '按班导入'
				this.$refs.modalFormExcel.disableSubmit = false
			},
			excelImport() {
				this.$refs.modalFormImport.select({
					zyb: '',
					zy: '',
					bj: '',
					ks: ''
				});
				this.$refs.modalFormImport.title = '导入'
				this.$refs.modalFormImport.disableSubmit = false
			},
			importExcelUrl: function() {
				return `${window._CONFIG['domianURL']}${this.url.importExcelUrl}`
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
			uploadInfo: function(record) {
				this.$refs.uploadModalForm.select(record)
				this.$refs.uploadModalForm.title = '文件上传'
				this.$refs.uploadModalForm.disableSubmit = false
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
						then.$http.delete(then.$http.baseServer +
							'/edu-schedule/jingsaiProject/veJwCjZhiye/deleteBatch?ids=' + ids, {}).then(
						res => {
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