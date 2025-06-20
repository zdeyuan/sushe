<template>
	<div  class='constbox'>
		<div class="pageContentBox">
			<div v-html="lodopHtml" v-if="lodopHtml" class="noInstall-tip1"></div>
			<div class="content-head">
				<div>
					<span class="head-span">专业部：</span>
					<a-cascader class="condition" :options="faculty" placeholder="请选择" @change="facultyChange"
						v-model="facultyId" />

					<span class="head-span">专业：</span>
					<a-cascader class="condition" :options="specialty" :display-render="displayRender" placeholder="请选择"
						v-model="specialtyId" />

					<span class="head-span">是否打印：</span>
					<a-cascader class="condition" :options="isPrint" placeholder="请选择" v-model="isPrintId" />
					
				</div>
			</div>

			<div class="content-head">
				<div>

					<a-cascader class="condition select" style="width: 100px;" :options="keys" placeholder="姓名" v-model="keysVal" />
					<a-input class="condition-input " v-model.trim="keyword" style="width: 150px;" placeholder="请先选择搜索" />

					<a-button type="primary" icon="search"  style="margin-left: 10px;" @click="search">
						搜索
					</a-button>

					<a-button type="danger" icon="delete" style="margin:0 10px;" @click="clear">
						清除
					</a-button>
				</div>
			</div>

			<div class="content-head">
				<div>
					<a-button type="primary" style="margin-right:10px;" @click="showModalPrint">
						<img src="@/assets/img/print@2x.png" class="icon-position" />
						批量打印
					</a-button>
					<a-modal v-model="visiblePrint" title="提示" @ok="handleOkPrint" :width="478">
						<template slot="footer">
							<a-button key="back" @click="handleOkPrint" class="btn"> 确定</a-button>
							<a-button key="submit" type="primary" @click="closePop" class="btn-cancle">取消</a-button>
						</template>
						<div class="batch-print-text">确认要批量打印吗?</div>
					</a-modal>

					<!-- <a-button type="primary" style="margin-right:10px;" @click="showModalQRCode">
						<img src="@/assets/img/QRCode.png" class="icon-position qrcode-style" />
						生成二维码
					</a-button> -->
					<a-modal v-model="visibleQRCode" title="提示" @ok="handleOkQRCode" :width="478">
						<template slot="footer">
							<a-button key="back" @click="handleOkQRCode" class="btn"> 确定</a-button>
							<a-button key="submit" type="primary" @click="closePop" class="btn-cancle">取消</a-button>
						</template>
						<div class="qrcode-text">确认要生成二维码吗?</div>
					</a-modal>

					<a-button type="primary"  icon="reload" style="margin-right:10px;" @click="refresh">
						刷新
					</a-button>
				</div>

			</div>

			<div>
				<a-table class="table-style" :scroll="{ x: 1500, y: 300 }" :columns="columns" :data-source="data" :row-selection="rowSelection"
					:defaultCurrent="6" :pagination="pagination" @change="tableChange">
					<span slot="operator" slot-scope="text, record">
						<a class="print-preview" 
							@click="getPrintCode(record)">打印预览</a> <a-divider type="vertical" /><a class="text-btn-color4"
							 @click="getPrintCode(record)">打印</a>
						<!-- <a class="text-btn-color3" 
							@click="downloadQRCode(record)">下载二维码</a> -->
					</span>
				</a-table>
			</div>
		</div>
	</div>
</template>


<script>
	import {
		Icon
	} from 'ant-design-vue'

	import {
		axios
	} from '@/utils/request'

	import {
		needCLodop,
		getLodop
	} from '@/utils/LodopFuncs'

	const IconFont = Icon.createFromIconfontCN({
		scriptUrl: '//at.alicdn.com/t/font_2390461_f6v2cx4wmzq.js',
	})

	const columns = [{
			title: '报名号',
			dataIndex: 'BMH',
			key: 'BMH',
			fixed: 'left',
			width: 250,
		},
		{
			title: '姓名',
			dataIndex: 'XM',
			key: 'XM',
			fixed: 'left',
			width: 150,
		},
		{
			title: '性别',
			dataIndex: 'XBM',
			key: 'XBM',
			width: 150,
		},
		{
			title: '身份证号',
			dataIndex: 'SFZH',
			key: 'SFZH',
			width: 250,
		},
		{
			title: '打印次数',
			dataIndex: 'enrollNum',
			key: 'enrollNum',
			width: 150,
		},
		{
			title: '是否录取',
			dataIndex: 'isAdmit',
			key: 'isAdmit',
			width: 150,
		},

		{
			title: '所属专业部',
			dataIndex: 'YXMC',
			key: 'YXMC',
			width: 150,
		},
		{
			title: '所属专业',
			dataIndex: 'ZYMC',
			key: 'ZYMC',
			width: 150,
		},
		{
			title: '学制',
			dataIndex: 'XZ',
			key: 'XZ',
			width: 150,
		},
		{
			title: '层次',
			dataIndex: 'CCM',
			key: 'CCM',
			width: 150,
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
					pageSize: 8,
					showSizeChanger: true,
					pageSizeOptions: ['8', '10', '20', '30', '50'],
					showTotal: (total, range) => {
						return '显示' + range[0] + '到' + range[1] + '条, 共' + total + '条记录'
					},
					showQuickJumper: true,
					total: 0,
				},
				selectedRowKeys: [],
				/* 页码 */
				currentPage: 1,
				pageSize: 10,
				/* 关键词 */
				keyword: '',
				kw: '',
				/* 表格数据 */
				data,
				columns,
				/* 按钮大小 */
				size: 'small',
				/* 下拉框数据 */
				clazz: [],
				clazzId: [],
				faculty: [],
				facultyId: [],
				specialty: [],
				specialtyId: [],
				keys: [],
				keysVal: [],
				curQuarter: 0,
				curFaculty: 0,
				curSpecialty: 0,
				curClazz: 0,
				curPrint: 2,
				condit: '',
				isPrint: [],
				isPrintId: [],
				/* 按条件搜索报到的数量 */
				createCount: 0,
				/* 弹出框属性 */
				visible: false,
				loading: false,
				/* 弹窗对象 */
				entityObj: {},

				visiblePrint: false,
				visibleQRCode: false,

				//插件对象
				LODOP: {},
				//插件未装提示信息
				lodopHtml: '',
				//打印的代码
				lodopCode: '',
			}
		},
		mounted() {
			this.getStuList()
			this.getFaculty()
			this.addCondit()
		},
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
			getPrintCode(o) {
				axios({
						url: 'enroll/admissionPrint/getPrintCode',
						method: 'post',
						params: {},
					})
					.then((res) => {
						if (res.code == 500) {
							this.$message.warning(res.message)
							return
						}

						let ptem = res.result
						//获取打印模板的代码
						let code = ptem[0].code

						let a = code.replace(/&quot;/g, '"')
						let b = a.replace('身份证号', '身份证号:' + o.SFZH)
						let c = b.replace('姓名', '姓名:' + o.XM)
						let d = c.replace('专业部', o.YXMC)
						let e = d.replace('层次', o.CCM == undefined ? '层次' : o.CCM)
						let f = e.replace('学制', '学制:' + o.XZ)
						let g = f.replace('专业', o.ZYMC)
						let h = g.replace('报名号', '报名号:' + o.BMH)

						this.lodopCode = h

						this.modelPriview()
					})
					.catch((err) => {
						console.log("err",err)
						this.$message.warning('获取打印代码失败/未启用模板')
					})
			},

			//打印
			// myPrint() {
			//   //检查是否安装
			//   this.CreateFullBill()
			//   console.log('打印')
			//   let LODOP = this.LODOP
			//   if (this.LODOP) {
			//     eval(this.lodopCode)
			//     LODOP.PRINT()
			//   }
			// },

			//预览
			previewModel() {

				let LODOP = this.LODOP

				eval(this.lodopCode)
				if (LODOP.CVERSION) CLODOP.On_Return = null
				LODOP.PREVIEW()
			},

			//打印预览
			modelPriview() {
				//检查是否安装
				this.CreateFullBill()

				//有安装才可以运行
				if (this.LODOP) {
					//预览模板
					this.previewModel()
				}
			},

			//判断是否安装插件
			CreateFullBill() {

				try {
					var res = getLodop();
					console.log("getLodop",res)
					if (res.LODOP) {
						let LODOP = res.LODOP
						this.LODOP = LODOP
					}
					
					if (res.errmsg) {
						this.lodopHtml = res.errmsg
					}
					if (LODOP && LODOP.VERSION) {
						if (LODOP.CVERSION)
							this.$message.success(
								'当前有WEB打印服务C-Lodop可用!\n C-Lodop版本:' + LODOP.CVERSION + '(内含Lodop' + LODOP.VERSION + ')'
							)
						else this.$message.success('本机已成功安装了Lodop控件！\n 版本号:' + LODOP.VERSION)
					}
				} catch (err) {
					console.log(err)
				}
			},

			downloadQRCode(o) {

				axios({
						url: 'enroll/admissionPrint/downloadQRCode',
						method: 'post',
						params: {
							id: o.key,
						},
					})
					.then((res) => {
						if (res.code == 500) {
							this.$message.warning(res.message)
							return
						}

						window.location = 'https://csm-bucket.oss-cn-hangzhou.aliyuncs.com/qrcode/' + res.result
					})
					.catch((err) => {
						this.$message.warning('下载二维码失败')
					})
			},

			showModalPrint() {
				if (this.selectedRowKeys.length == 0) {
					this.$message.warning('请选择要打印录取通知书的学生！')
					return
				}
				this.visiblePrint = true
			},
			//批量打印
			handleOkPrint() {

				//检查是否安装
				this.CreateFullBill()
				let LODOP = this.LODOP;

				let ids = this.selectedRowKeys

				axios({
						url: 'enroll/admissionPrint/getPrintCode',
						method: 'post',
						params: {},
					})
					.then((res) => {
						if (res.code == 500) {
							this.$message.warning(res.message)
							return
						}

						let ptem = res.result

						//获取打印模板的代码
						let code = ptem[0].code

						let printCode = '';

						for (let i = 0; i < ids.length; i++) {
							let id = ids[i]

							for (let j = 0; j < this.data.length; j++) {
								if (id == this.data[j].key) {

									let data = this.data[j]

									let a = code.replace(/&quot;/g, '"')
									let b = a.replace('身份证号', '身份证号:' + data.SFZH)
									let c = b.replace('姓名', '姓名:' + data.XM)
									let d = c.replace('专业部', data.YXMC)
									let e = d.replace('层次', data.CCM == undefined ? '层次' : data.CCM)
									let f = e.replace('学制', '学制:' + data.XZ)
									let g = f.replace('专业', data.ZYMC)
									let h = g.replace('报名号', '报名号:' + data.BMH)

									let index = h.indexOf(';');

									//console.log("index:"+index);

									let pCode = h.slice(index + 2);

									printCode += 'LODOP.NewPage();\n' + pCode;

								}
							}
						}

						var timestamp = (new Date()).getTime();
						LODOP.PRINT_INIT("录取通知书_" + timestamp);
						eval(printCode)
						LODOP.PREVIEW()

					})
					.catch((err) => {
						this.$message.warning('获取打印代码失败')
					})

				this.visiblePrint = false;
			},

			showModalQRCode() {
				if (this.selectedRowKeys.length == 0) {
					this.$message.warning('请选择要生成二维码的学生！')
					return
				}
				this.visibleQRCode = true
			},
			handleOkQRCode() {
				let ids = ''

				for (let i = 0; i < this.selectedRowKeys.length; i++) {
					ids += this.selectedRowKeys[i]
					if (i != this.selectedRowKeys.length - 1) {
						ids += ','
					}
				}

				axios({
						url: 'enroll/admissionPrint/createQRCode',
						method: 'post',
						params: {
							ids: ids,
						},
					})
					.then((res) => {
						this.$message.success(res.result)
						this.refresh()
					})
					.catch((err) => {
						this.$message.warning('批量生成二维码失败')
					})

				this.visibleQRCode = false
			},
			//关闭批量打印/生成二维码弹窗
			closePop() {
				this.visibleQRCode = false;
				this.visiblePrint = false;
			},

			onSelectChange(selectedRowKeys) {
				this.selectedRowKeys = selectedRowKeys
			},

			clear() {
				this.facultyId = []
				this.specialty = []
				this.specialtyId = []
				this.clazz = []
				this.clazzId = []

				this.isPrintId = []
			},
			empty() {
				this.keyword = ''
				this.keysVal = []
				this.clear()
			},
			search() {
				this.currentPage = 1
				this.curFaculty = this.facultyId.length == 0 ? 0 : this.facultyId[0]
				this.curSpecialty = this.specialtyId.length == 0 ? 0 : this.specialtyId[0]
				this.curClazz = this.clazzId.length == 0 ? 0 : this.clazzId[0]
				this.kw = this.keyword
				this.condit = this.keysVal[0] == undefined ? 'XM' : this.keysVal[0]
				this.curPrint = this.isPrintId[0] == undefined ? 2 : this.isPrintId[0]
				this.getStuList()
			},
			refresh() {
				this.selectedRowKeys = []
				this.getStuList()
			},

			tableChange(pagination) {
				this.pagination.current = pagination.current
				this.pagination.pageSize = pagination.pageSize

				this.currentPage = pagination.current
				this.pageSize = pagination.pageSize

				this.getStuList()
			},
			getStuList() {
				let currentPage = this.currentPage
				let pageSize = this.pageSize

				axios({
						url: 'enroll/admissionPrint/select',
						method: 'post',
						params: {
							facultyId: this.curFaculty,
							specialtyId: this.curSpecialty,
							clazzId: this.curClazz,
							keyword: this.kw,
							condit: this.condit,
							currentPage: currentPage,
							pageSize: pageSize,
							isPrint: this.curPrint,
						},
					})
					.then((res) => {
						if (res.code == 500) {
							this.$message.warning(res.message)
							return
						}

						data.splice(0, data.length)

						for (let stu of res.result.list) {
							let sex = stu.xbm == 1 ? '男' : '女'
							let isAdmit = stu.isAdmit == 1 ? '已录取' : '未录取'
							data.push({
								key: stu.id,
								BMH: stu.bmh,
								XM: stu.xm,
								XBM: sex,
								SFZH: stu.sfzh,
								enrollNum: stu.enrollNum,
								isAdmit: isAdmit,
								YXMC: stu.yxmc,
								ZYMC: stu.zymc,
								XZ: stu.xz,
								CCM: stu.ccm,
							})
						}
						this.pagination.current = currentPage
						this.pagination.total = res.result.count
					})
					.catch((err) => {
						this.$message.warning('获取学生列表失败')
					})
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

				for (let p of [{
							value: 2,
							label: '全部'
						},
						{
							value: 1,
							label: '已打印'
						},
						{
							value: 0,
							label: '未打印'
						},
					]) {
					this.isPrint.push({
						value: p.value,
						label: p.label,
					})
				}
			},

			getFaculty() {
				axios({
						url: 'enroll/reportMng/getFaculty',
						method: 'post',
						params: {},
					})
					.then((res) => {
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
								// children: [
								//   {value: '1',
								//   label: '1',}
								// ]
							})
						}
					})
					.catch((err) => {
						this.$message.warning('获取专业失败')
					})
			},
			displayRender({
				labels
			}) {
				return labels[labels.length - 1]
			},
		},
	}
</script>

<style>
	.noInstall-tip1 {
		margin-top: -20px;
		font-size: 18px;
		font-family: Microsoft YaHei;
	}

	.table-style {
		text-align: center;
	}

	.qrcode-style {
		width: 15px;
		height: 15px;
	}

	.batch-print-btn {
		width: 120px;
		height: 34px;
		border-radius: 5px;
	}

	.batch-print-btn,
	.batch-print-btn:hover,
	.batch-print-btn:active,
	.batch-print-btn:focus {
		color: white;
		background: #00d09d;
	}

	.create-qrcode-btn {
		width: 142px;
		height: 34px;
		border-radius: 5px;
	}

	.to-right {
		margin-right: 20px;
	}

	.create-qrcode-btn,
	.create-qrcode-btn:hover,
	.create-qrcode-btn:active,
	.create-qrcode-btn:focus {
		color: white;
		background: #0098f8;
	}

	.qrcode-text {
		width: 190px;
		height: 19px;
		font-size: 18px;
		font-family: Microsoft YaHei;
		font-weight: 700;
		color: #666666;
		line-height: 24px;
		margin-top: 20px;
		margin-left: 130px;
	}

	.batch-print-text {
		width: 190px;
		height: 19px;
		font-size: 18px;
		font-family: Microsoft YaHei;
		font-weight: 700;
		color: #666666;
		line-height: 24px;
		margin-top: 20px;
		margin-left: 139px;
	}
</style>