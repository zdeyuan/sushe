<template>
	<div  class='constbox'>
		<div class="pageContentBox">
			<div class="content-head">
				<div>
					<!-- 					<span class="head-span">招生季</span>
					<a-cascader class="condition" :options="quarter" placeholder="默认当前招生季" v-model="quarterId" /> -->

					<span class="head-span">专业部：</span>
					<a-cascader class="condition" :options="faculty" placeholder="请选择" @change="facultyChange"
						v-model="facultyId" />

					<span class="head-span">专业：</span>
					<a-cascader class="condition" :options="specialty" placeholder="请选择" v-model="specialtyId"
						@popupVisibleChange='cascaderChange' />

					<a-button type="danger" style="margin-left: 10px;" @click="clear">
						<span class="flex_box">
							
							清除
						</span>
					</a-button>
				</div>
			</div>

			<div class="content-head">
				<div>
					<a-cascader class="condition select" style="width: 100px;" :options="keys" placeholder="姓名" v-model="keysVal" />
					<a-input class="condition-input" style="width: 200px;"  placeholder="请输入" v-model="keyword" />
					<span class="head-span">是否审核：</span>
					<a-cascader class="condition select" style="width: 200px;" :options="isAdmition" placeholder="全部"
						v-model="isAdmitionVal" />

					<a-button type="primary" icon="search" style="margin-left: 10px;" @click="search">
						<span class="flex_box">
							搜索
						</span>
					</a-button>

					<a-button type="danger" style="margin-left: 10px;" @click="empty">
						<span class="flex_box">
							清空
						</span>
					</a-button>

				</div>
			</div>

			<div class="content-head">
				<div>
					<a-button type="primary" icon="plus" style="margin-right:10px;"
						@click='visibleReport = true'>
						<span class="flex_box">
							
							批量审核
						</span>
					</a-button>


					<a-modal v-model="visibleReport" title="提示" @ok="handleOkReport" :width="478">
						<div class="report-text">确认要批量审核吗?</div>
						<template slot="footer">
							<a-button key="back" @click="handleOkReport" class="btn"> 确定 </a-button>
							<a-button key="submit" type="primary" @click="closeReport" class="btn-cancle"> 取消
							</a-button>
						</template>
					</a-modal>

					<a-button type="primary"  icon="reload" style="margin-right:10px;" @click='getStuList'>
						<span class="flex_box">
							
							刷新
						</span>
					</a-button>

					<a-button type="primary" icon="check-circle"  style="margin-right:10px;" @click='batchPass'>
						<span class="flex_box">
							通过
						</span>
					</a-button>

					<a-button type="primary" icon="stop"  style="margin-right:10px;" @click='batchNoPass'>
						<span class="flex_box">
		
							不通过
						</span>
					</a-button>
				</div>
			</div>
			<div>
				<a-table :scroll="{ x: 1500, y: 300 }" :columns="columns" :data-source="data" :row-selection="rowSelection" :defaultCurrent="6"
					:pagination="pagination" @change="tableChange">
					<span slot="operator" slot-scope="text, record">
						<a class="text-btn-color2" 
							@click="showMsg(record)">查看</a>
					</span>
				</a-table>
			</div>
		</div>

		<!-- start -->
		<a-modal v-model="visible" title="查看招生信息" on-ok="handleClose" :width="1073">
			<!-- 不打印区域 -->

			<template slot="footer">
				<a-button key="back" v-print="'#printContent'" class="btn"> 打印 </a-button>
				<a-button key="submit" type="primary" :loading="loading" @click="handleClose" class="btn-cancle">
					关闭
				</a-button>
			</template>
			<div ref="print" id="printContent">
				<table class="scanTable" style="text-align: left">
					<tr>
						<td colspan="4" class="tr-color">
							<span class="title-style">基本信息</span>
						</td>
					</tr>

					<tr class="tr-style">
						<td class="td-div">
							<div class="font-style">姓名</div>
						</td>
						<td class="double">
							<a-input read-only class="input-style" v-model="entityObj.xm"></a-input>
						</td>
						<td class="td-div">
							<div class="font-style">身份证号</div>
						</td>
						<td class="double">
							<a-input read-only class="input-style" v-model="entityObj.sfzh"></a-input>
						</td>
					</tr>

					<tr class="tr-style">
						<td class="td-div">
							<div class="font-style">性别</div>
						</td>
						<td class="double">
							<a-input read-only class="input-style" v-model="entityObjTwo.XBM"></a-input>
						</td>
						<td class="td-div">
							<div class="font-style">毕业学校</div>
						</td>
						<td class="double">
							<a-input read-only class="input-style" v-model="entityObj.byxx"></a-input>
						</td>
					</tr>

					<tr class="tr-style">
						<td class="td-div">
							<div class="font-style">招生类型</div>
						</td>
						<td class="double">
							<a-input read-only class="input-style" v-model="entityObj.zslx"></a-input>
						</td>
						<td class="td-div">
							<div class="font-style">准考证号</div>
						</td>
						<td class="double">
							<a-input read-only class="input-style" v-model="entityObj.zkzh"></a-input>
						</td>
					</tr>


					<tr class="tr-style">
						<td class="td-div">
							<div class="font-style">考生号</div>
						</td>
						<td class="double">
							<a-input read-only class="input-style" v-model="entityObj.ksh"></a-input>
						</td>
					</tr>

				</table>

				<table class="scanTable" style="text-align: left; margin-top: 20px">
					<tr>
						<td colspan="4" class="tr-color">
							<span class="title-style">报名信息</span>
						</td>
					</tr>

					<tr class="tr-style">
						<td class="td-div">
							<div class="font-style">专业一</div>
						</td>
						<td class="double">
							<a-input read-only class="input-style" v-model="entityObjTwo.zymcOne"></a-input>
						</td>
						<td class="td-div">
							<div class="font-style">是否接受调剂</div>
						</td>
						<td class="double">
							<a-input read-only class="input-style" v-model="entityObj.one"></a-input>
						</td>	
					</tr>
					
					<tr class="tr-style">
						<td class="td-div">
							<div class="font-style">专业二</div>
						</td>
						<td class="double">
							<a-input read-only class="input-style" v-model="entityObjTwo.zymcTwo"></a-input>
						</td>
						<td class="td-div">
							<div class="font-style">是否接受调剂</div>
						</td>
						<td class="double">
							<a-input read-only class="input-style" v-model="entityObj.two"></a-input>
						</td>	
					</tr>

				</table>

				<table class="scanTable" style="text-align: left; margin-top: 20px">

					<tr class="tr-style">
						<td class="td-div">
							<div class="font-style">家庭邮编</div>
						</td>
						<td class="double">
							<a-input read-only class="input-style" v-model="entityObj.jtyb"></a-input>
						</td>
						<td class="td-div">
							<div class="font-style">家庭联系电话</div>
						</td>
						<td class="double">
							<a-input read-only class="input-style" v-model="entityObj.jtlxdh"></a-input>
						</td>
					</tr>
					
					<tr class="tr-style">
						<td class="td-div">
							<div class="font-style">详细家庭地址</div>
						</td>
						<td colspan="3" class="double">
							<a-input read-only class="input-style" v-model="entityObj.jtdz"></a-input>
						</td>
					</tr>
	
				</table>
			</div>
		</a-modal>
		<!-- end -->
	</div>
</template>


<script>
	import {
		Icon
	} from 'ant-design-vue'

	import {
		axios
	} from '@/utils/request'

	const IconFont = Icon.createFromIconfontCN({
		scriptUrl: '//at.alicdn.com/t/font_2390461_f6v2cx4wmzq.js',
	})

	const columns = [{
			title: '姓名',
			dataIndex: 'XM',
			key: 'XM',
			fixed: 'left',
			width: 150
		},
		{
			title: '身份证号',
			dataIndex: 'SFZH',
			key: 'SFZH',
			fixed: 'left',
			width: 250
		},
		{
			title: '毕业学校',
			dataIndex: 'BYXX',
			key: 'BYXX',
			width: 150
		},
		{
			title: '准考证号',
			dataIndex: 'ZKZH',
			key: 'ZKZH',
			width: 250
		},
		{
			title: '考生号',
			dataIndex: 'KSH',
			key: 'KSH',
			width: 250
		},
		{
			title: '是否审核',
			dataIndex: 'isAdmit',
			key: 'isAdmit',
			width: 150
		},
		{
			title: '是否通过',
			dataIndex: 'isAdopt',
			key: 'isAdopt',
			width: 150
		},
		{
			title: '性别',
			dataIndex: 'XBM',
			key: 'XBM',
			width: 150
		},
		{
			title: '专业一',
			dataIndex: 'zymcOne',
			key: 'zymcOne',
			width: 250
		},
		{
			title: '专业二',
			dataIndex: 'zymcTwo',
			key: 'zymcTwo',
			width: 250
		},
		{
			title: '操作',
			dataIndex: 'operator',
			fixed: 'right',
			width: 200,
			key: 'operator',
			scopedSlots: {
				customRender: 'operator',
			},
		},
	]

	let data = []

	export default {
		data() {
			return {
				pagination: {
					current: 0,
					pageSize: 10,
					showSizeChanger: true,
					pageSizeOptions: ['6', '10', '20'],
					showTotal: (total, range) => {
						return '显示' + range[0] + '到' + range[1] + '条, 共' + total + '条记录'
					},
					showQuickJumper: true,
					total: 0,
				},
				//选中放入的数组
				selectedRowKeys: [],
				/* 页码 */
				currentPage: 1,
				pageSize: 10,

				/* 表格数据 */
				data,
				columns,
				/* 按钮大小 */
				size: 'small',
				/* 下拉框数据 */
				quarter: [],
				quarterId: [],
				faculty: [],
				facultyId: [],
				specialty: [],
				specialtyId: [],
				keys: [],
				keysVal: [],
				//是否被审核
				isAdmition: [],
				isAdmitionVal: [],
				/* 按条件搜索报到的数量 */
				reportCount: 0,
				/* 添加-弹出框数据 */
				visibleReport: false,
				visibleReportBySearch: false,
				visibleDelete: false,
				visible: false,
				loading: false,
				entityObj: {}, //弹窗对象
				entityObjTwo: {}, //弹窗对象二
				//搜索条件
				curQuarter: 0,
				curFaculty: 0,
				curSpecialty: 0,
				condit: '',
				isCheck: 2,
				/* 关键词 */
				keyword: '',
			}
		},
		mounted() {
			this.getStuList()
			// this.getQuarter()
			this.getFaculty()
			this.addCondit()
			this.isAdmitQuery()
		},
		//关于全选与批量
		computed: {
			rowSelection() {
				const selectedRowKeys = this.selectedRowKeys //常量
				return {
					selectedRowKeys,
					onChange: this.onSelectChange,
				}
			},
		},
		components: {
			IconFont,
		},
		methods: {
			batchPass() {
				var ids = ''
				for (var i = 0; i < this.selectedRowKeys.length; i++) {
					console.log(this.selectedRowKeys[i])
					if (i == 0) {
						ids += this.selectedRowKeys[i]
					} else {
						ids += ',' + this.selectedRowKeys[i]
					}
				}
				axios({
					url: 'enroll/singleAndExpansion/batchUpdateAdopt',
					method: 'post',
					params: {
						ids: ids,
						isAdopt: 1
					},
				}).then((res) => {
					if (res.code == '200') {
						this.$message.success(res.result)
						this.selectedRowKeys = []
						this.getStuList()
					} else {
						this.$message.warning('批量通过失败')
					}
				})
			},
			batchNoPass() {
				var ids = ''
				for (var i = 0; i < this.selectedRowKeys.length; i++) {
					console.log(this.selectedRowKeys[i])
					if (i == 0) {
						ids += this.selectedRowKeys[i]
					} else {
						ids += ',' + this.selectedRowKeys[i]
					}
				}
				axios({
					url: 'enroll/singleAndExpansion/batchUpdateAdopt',
					method: 'post',
					params: {
						ids: ids,
						isAdopt: 0
					},
				}).then((res) => {
					if (res.code == '200') {
						this.$message.success(res.result)
						this.selectedRowKeys = []
						this.getStuList()
					} else {
						this.$message.warning('批量不通过失败')
					}
				})
			},


			cascaderChange(e) {
				if (this.facultyId.length < 1) {
					this.$message.warning('请先选择专业部！')
				}
				console.log(e)
			},
			//start
			showMsg(a) {
				axios({
						url: 'enroll/singleAndExpansion/getSingleAndExpansionById',
						method: 'post',
						params: {
							id: a.key,
						},
					})
					.then((res) => {
						this.entityObj = res.result
						this.entityObjTwo = a
						//数据加工处理
						let zslx = res.result.zslx == 2 ? '扩招' : res.result.zslx == 3 ? '大专' : res.result.zslx == 1 ? '单招' : '其他'
						let one = res.result.isAdjustOne == 0 ? '是' : '否'
						let two = res.result.isAdjustTwo == 0 ? '是' : '否'
						this.entityObj.zslx = zslx
						this.entityObj.zymcOne = a.zymcOne,
						this.entityObj.zymcTwo = a.zymcTwo,
						this.entityObj.one = one
						this.entityObj.two = two
					})
					.catch((err) => {
						this.$message.warning('获取报名信息失败')
					})
				this.visible = true
			},
			handleClose(e) {
				setTimeout(() => {
					this.visible = false
					this.loading = false
				})
			},
			handlePrint(e) {
				this.visible = false
			},
			// end
			onSelectChange(selectedRowKeys) {
				this.selectedRowKeys = selectedRowKeys
				console.log('selectedRowKeys changed: ', selectedRowKeys)
			},
			clear() {
				this.quarterId = []
				this.facultyId = []
				this.specialty = []
				this.specialtyId = []
			},
			empty() {
				this.keyword = ''
				this.keysVal = []
				this.isAdmitionVal = []
				this.clear()
			},


			batchCheck() {
				let ids = ''
				for (let i = 0; i < this.selectedRowKeys.length; i++) {
					ids += this.selectedRowKeys[i]
					if (i != this.selectedRowKeys.length - 1) {
						ids += ','
					}
				}

				axios({
						url: 'enroll/singleAndExpansion/batchCheck',
						method: 'post',
						params: {
							ids: ids,
						},
					})
					.then((res) => {
						this.$message.success(res.result)
						//清空勾选项
						this.selectedRowKeys = []
						this.getStuList()
					})
					.catch((err) => {
						this.$message.warning('批量审核失败')
					})
			},


			search() {
				this.currentPage = 1
				this.curQuarter = this.quarterId.length == 0 ? 0 : this.quarterId[0]
				this.curFaculty = this.facultyId.length == 0 ? 0 : this.facultyId[0]
				this.curSpecialty = this.specialtyId.length == 0 ? 0 : this.specialtyId[0]
				this.condit = this.keysVal[0] == undefined ? 'XM' : this.keysVal[0]
				this.isCheck = this.isAdmitionVal[0] == undefined ? 2 : this.isAdmitionVal[0]

				this.getStuList()
			},
			refresh() {
				console.log(this.selectedRowKeys)
				this.selectedRowKeys = []
				this.getStuList()
			},
			showModalReport() {
				if (this.selectedRowKeys.length == 0) {
					console.log(this.selectedRowKeys)
					this.$message.warning('请选择要审核的学生！')
					return
				}

				this.visibleReport = true
			},
			handleOkReport() {
				this.batchCheck()
				this.visibleReport = false
			},
			closeReport() {
				this.visibleReport = false
			},

			handleOkReportBySearch() {
				this.batchReportBySearch()
				this.visibleReportBySearch = false
			},
			showModalDelete() {
				if (this.selectedRowKeys.length == 0) {
					this.$message.warning('请选择要删除的学生！')
					return
				}

				this.visibleDelete = true
			},
			handleOkDelete() {
				this.deleteStu()
				this.visibleDelete = false
			},

			tableChange(pagination) {
				/* , filters, sorter */
				this.pagination.current = pagination.current
				this.pagination.pageSize = pagination.pageSize
				this.currentPage = pagination.current
				this.pageSize = pagination.pageSize

				this.getStuList()
			},
			getStuList() {
				let currentPage = this.currentPage
				let pageSize = this.pageSize
				var stu = ''
				var sfzh = ''
				if(this.keysVal[0] == undefined){
					stu = this.keyword
				}else if(this.keysVal[0] == 'XM'){
					stu = this.keyword
				}else{
					sfzh = this.keyword
				}
				
				// return
				axios({
						url: 'enroll/singleAndExpansion/getSingleAndExpansionList',
						method: 'post',
						params: {
							facultyId: this.curFaculty,
							specialtyId: this.curSpecialty,
							condit: this.condit,
							currentPage: currentPage,
							pageSize: pageSize,
							isCheck: this.isCheck,
							stuName: stu,
							sfzh: sfzh
						},
					})
					.then((res) => {
						if (res.code == 200) {
							data.splice(0, data.length)
							for (let stu of res.result.records) {
								let sex = stu.xb == 0 ? '男' : '女'
								let isAdmit = stu.isCheck == 1 ? '已审核' :
									stu.isCheck == 0 ? '未审核' : '错误'
								let isAdopt = stu.isAdopt == 0 ? '未通过' : '已通过' 
									data.push({
										key: stu.id,
										XM: stu.xm,
										SFZH: stu.sfzh,
										BYXX: stu.byxx,
										ZKZH: stu.zkzh,
										KSH: stu.ksh,
										XBM: sex,
										zymcOne:stu.zymcOne,
										zymcTwo:stu.zymcTwo,
										isAdmit: isAdmit,
										isAdopt: isAdopt,
									})
							}
							this.pagination.current = currentPage
							this.pagination.total = res.result.total
						}else{
							this.$message.warning('获取学生列表失败')
						}
					})
					.catch((err) => {
						this.$message.warning('获取学生列表失败')
					})
			},
			isAdmitQuery() {
				for (let k of [{
							value: 2,
							label: '全部'
						},
						{
							value: 1,
							label: '已审核'
						},
						{
							value: 0,
							label: '未审核'
						},
					]) {
					this.isAdmition.push({
						value: k.value,
						label: k.label,
					})
				}
			},
			addCondit() {
				for (let k of [{
							value: 'XM',
							label: '姓名'
						},
						{
							value: 'SFZH',
							label: '身份证号'
						},
					]) {
					this.keys.push({
						value: k.value,
						label: k.label,
					})
				}
			},

			getQuarter() {
				axios({
						url: 'enroll/reportMng/getQuarter',
						method: 'post',
						params: {},
					})
					.then((res) => {
						for (let quarter of res.result) {
							this.quarter.push({
								value: quarter.id,
								label: quarter.name,
							})
						}
					})
					.catch((err) => {
						this.$message.warning('获取招生季失败')
					})
			},
			getFaculty() {
				axios({
						url: 'enroll/reportMng/getFaculty',
						method: 'post',
						params: {},
					})
					.then((res) => {
						//this.faculty.splice(0, this.faculty.length);
						for (let faculty of res.result) {
							this.faculty.push({
								value: faculty.id,
								label: faculty.yxmc,
							})
						}
					})
					.catch((err) => {
						this.$message.warning('获取专业部失败')
					})
			},
			facultyChange(value) {

				this.specialty = []
				this.specialtyId = []

				if (value.length == 0) {
					return
				}

				axios({
						url: 'enroll/reportMng/getSpecialty',
						method: 'post',
						params: {
							facultyId: this.facultyId[0],
						},
					})
					.then((res) => {
						this.specialty.splice(0, this.specialty.length)
						for (let specialty of res.result) {
							this.specialty.push({
								value: specialty.id,
								label: specialty.zymc,
							})
						}
					})
					.catch((err) => {
						this.$message.warning('获取专业失败')
					})
			},
		},
	}
</script>
<style>
	.icon_btn {
		color: #ffffff;
		font-size: 16px;
		margin-right: 20px;
		width: 88px;
		height: 34px;
	}

	.icon_btn_type_2 {
		color: #ffffff;
		font-size: 16px;
		margin-right: 20px;
		height: 34px;
	}
</style>
