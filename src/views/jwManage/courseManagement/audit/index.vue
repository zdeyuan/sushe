<template>
	<a-card :bordered="false">
		<!--    <div style="border-bottom: 1px #3779CA solid;margin-bottom: 20px">-->
		<!--      <p style="display: inline-block;font-weight: bold;font-size: 16px;color: #999999">调课管理</p>-->
		<!--      <p style="display: inline-block;font-weight: bold;font-size: 16px">></p>-->
		<!--      <p style="display: inline-block;font-weight: bold;font-size: 16px">调课审批</p>-->
		<!--    </div>-->

		<div>
			<a-row>
				<p class="cm-p1">班级</p>
				<a-input :value="selectedClassesName" disabled placeholder="选择教学班级"
					style="width: 150px; margin-right: 8px"></a-input>
				<a-button type="primary" icon="search" @click="onClickSelectClass">选择</a-button>
				<a-button @click="onClickCleanSkxzbdm" type="danger" icon="rest">清空</a-button>
				
			</a-row>
			<a-row>
				<p class="cm-p1" >教职工号</p>
				<a-input v-model="queryParams.jsjgh" style="display: inline-block;width: 150px;margin-right: 8px"
					placeholder="请输入教职工号"></a-input>
				<p class="cm-p1" style="margin-left:10px;">课程名称</p>
				<a-input v-model="queryParams.kcmc" style="display: inline-block;width: 150px;margin-right: 8px"
					placeholder="请输入课程名称"></a-input>
				<p class="cm-p1" style="margin-left:10px;">审核状态</p>
				<a-select v-model="queryParams.verifyStatus" style="width: 180px" placeholder="请选择状态">
					<a-select-option v-for="(o, i) in statusList" :key="i"
						:value="o.value">{{o.label}}</a-select-option>
				</a-select>
				<a-button type="primary" @click="onClickSearch" icon="search">搜索</a-button>
				<a-button type="danger" @click="onClickClean" icon="rest" >清空</a-button>
			</a-row>
		</div>
		<g-tools :fields="toolsFields" />

		<g-table ref="refTable" :columns="columns" :data="loadData" :scroll="scroll" :row-selection="rowSelection"
			row-key="id">
			<span slot="actions" slot-scope="a,b" v-if="b.verifyStatus!=1">
				<a @click="onClicOpenAudit(b)"    style="color:#17C295">审核</a>
			</span>
		</g-table>
		<audit-model :data="auditData" :visible.sync="auditVisible" @success-callback="auditSuccessCallback"
			ref="refAuditModel"></audit-model>
		<select-class-model :visible.sync="selectClassesVisible" @ok="onSelectJSBJOk"
			ref="searchModel"></select-class-model>
	</a-card>
</template>
<script>
	import '@/assets/couMan/universal.less'
	import '@/assets/scss/generalStyle.less'
	import auditModel from './modules/auditModel.vue'
	import selectClassModel from '../record/modules/selectClassModel.vue'
	import selectClassMixin from '../record/modules/selectClassMixin.js'
	import GTools from '@/components/GTools'
	import GTable from '@/components/GTable'
	import {
		apiScheduleClassSwitchTiaoke
	} from '@/api/schedule/index'
	function digital2Chinese(num, identifier) {
		const character = ['一','二', '三', '四', '五', '六','日'];
		return identifier === 'week' && (num === 0 || num === 7) ? '一' : character[num-1];
	  }
	  function digital2ChineseS(num) {
	         const character =['一','二', '三', '四', '五', '六','七','八','九','晚自习第一节','晚自习第二节','晚自习第三节'];
	         return  `第${character[num-1]}节`;
	       }
	import {
		message
	} from 'ant-design-vue'
	const columns = [{
			title: '原上课日期',
			dataIndex: 'yskrq',
			key: 'yskrq'
		},
		{
			title: '原上课周',
			dataIndex: 'yweek',
			key: 'yweek',
			customRender: (text) => '星期' + digital2Chinese(text, 'week') 
		},
		{
			title: '原上课节',
			dataIndex: 'section',
			key: 'section',
			customRender: function (text) {
			  return   digital2ChineseS(text) 
			}
		},
		{
			title: '上课教学班',
			dataIndex: 'skxzbdm',
			key: 'skxzbdm'
		},
		{
			title: '申请教师工号',
			dataIndex: 'jsjgh',
			key: 'jsjgh'
		},
		{
			title: '原上课教室',
			dataIndex: 'jsmc',
			key: 'jsmc'
		},
		{
			title: '课程名称',
			dataIndex: 'kcmc',
			key: 'kcmc'
		},
		{
			title: '审核人',
			dataIndex: 'verifyUser',
			key: 'verifyUser'
		},
		{
			title: '审核时间',
			dataIndex: 'verifyTime',
			key: 'verifyTime'
		},
		{
			title: '操作',
			dataIndex: 'address',
			key: 'address',
			scopedSlots: {
				customRender: 'actions'
			}
		},
	]
	const queryParams = {
		currentUser: undefined,
		jsjgh: undefined, // 教师工号
		kcmc: undefined, // 课程名称
		skxzbdm: undefined, // 教学班代码
		verifyStatus: 0, // 审核状态
	}
	const statusList = [{
			label: '待审核',
			value: 0
		},
		{
			label: '已通过',
			value: 1
		},
		{
			label: '未通过',
			value: 2
		},
	]
	export default {
		data() {
			const _t = this
			return {
				columns,
				statusList: statusList,
				toolsFields: [{
						fieldType: 'button',
						label: '批量通过',
						icon: 'check-circle',
						type: 'primary',
						handler: _t.onClickToolPass
					},
					{
						fieldType: 'button',
						label: '批量不通过',
						icon: 'close-circle',
						type: 'danger',
						handler: _t.onClickToolNoPass,
					},
					{
						fieldType: 'button',
						label: '刷新',
						icon: 'sync',
						type: 'primary',
						handler: _t.onClickToolRefresh
					}
				],
				scroll: {
					x: 1200
				},
				selected: [], // 已选学期，用于批量操作
				selectedRowKeys: [], // 已选学期，值
				queryParams: {
					...queryParams
				}, // 筛选数据
				auditData: null, // 审核
				auditVisible: false, // 审核
			}
		},
		created() {},
		mixins: [selectClassMixin],
		components: {
			GTools,
			GTable,
			auditModel,
			selectClassModel,
		},
		computed: {
			rowSelection() {
				return {
					selectedRowKeys: this.selectedRowKeys,
					onChange: (selectedRowKeys, selectedRows) => {
						this.selectedRowKeys = selectedRowKeys
						this.selected = selectedRows
					},
				}
			},
			selectedIds() {
				return this.selectedRowKeys.map((o) => o.id)
			}
		},
		methods: {
			onClickSearch() {
				this.refreshTable(1)
			},
			onClickClean() {
				this.selectedClasses = []
				this.queryParams = {
					...queryParams
				};
				this.refreshTable(1)
			},
			onClickToolPass() {
				if (!this.selectedIds || !this.selectedIds.length) {
					this.$message.info('请选择需要操作的数据')
					return
				}
				const ids = this.selectedIds
				this.batchPass(ids)
			},
			onClickToolNoPass() {
				if (!this.selectedIds || !this.selectedIds.length) {
					this.$message.info('请选择需要操作的数据')
					return
				}
				const ids = this.selectedIds
				this.batchNoPass(ids)
			},
			onClickToolRefresh() {
				this.refreshTable(1)
			},

			// table
			onClicOpenAudit(record) {
				this.auditData = record
				this.auditVisible = true
			},
			// 审核确定
			auditSuccessCallback() {
				this.refreshTable()
			},
			// 刷新表格
			refreshTable(b = 0) {
				this.$refs.refTable.refresh(b)
				this.selectedRowKeys = []
			},
			// 表格拉取数据
			loadData(params) {
				params = {
					...params,
					...this.queryParams,
					skxzbdm: this.selectedClassesIds
				}
				return apiScheduleClassSwitchTiaoke.getPageList(params).then((res) => res.result)
			},
			batchPass(ids) {
				return apiScheduleClassSwitchTiaoke.batchPass(ids).then(() => {
					this.$message.success('操作成功')
					this.refreshTable()
				})
			},
			batchNoPass(ids) {
				return apiScheduleClassSwitchTiaoke.batchNoPass(ids).then(() => {
					this.$message.success('操作成功')
					this.refreshTable()
				})
			},
		},

	}
</script>