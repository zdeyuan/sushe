<template>
	<div style="padding:30px">
		<div class="pageContentBox">
			<div class="content-head">
				<div class="top">
					<div class="top">
						<span class="head-span">考生号：</span>
						<!-- 考生号输入框 -->
						<a-input class="condition" style="width: 200px;" v-model="ksh" placeholder="请输入"></a-input>
					</div>
					<div class="top">
						<span class="head-span">姓名：</span>
						<!-- 姓名输入框 -->
						<a-input class="condition" style="width: 200px;" v-model="stuName" placeholder="请输入"></a-input>
					</div>
				</div>
				<div class="top" style="margin-top:10px;">
					<div style="display:flex">
						<span class="head-span">学年：</span>
						<j-select-grade placeholder="请选择年级" v-model="gradeId"></j-select-grade>
					</div>
					<div style="display:flex">
						<span class="head-span">学期：</span>
						<j-select-xueqi placeholder="请选择学期" v-model="semesterId"></j-select-xueqi>
					</div>
					<a-button type="primary" icon="search" style="margin-right: 10px;" @click="search">
						搜索
					</a-button>
					<a-button style="margin-right: 10px;" type="danger" icon="delete" @click="empty">
						清空
					</a-button>
				</div>
			</div>

			<div class="content-head">
				<div>
					<a-button type="primary" style="margin-right:10px;" @click="search">
						<span class="flex_box">
							刷新
						</span>
					</a-button>
					<!-- <a-button type="primary" style="margin-right:10px;" @click="showUpload">
						<span class="flex_box">

							导入
						</span>
					</a-button>
					<a-button type="primary" style="margin-right:10px;" @click="exportMessage">
						<span class="flex_box">

							导出
						</span>
					</a-button> -->
					<!-- 导入 弹窗 -->
					<a-modal v-model="upload" title="导入" @ok="uploadCancel" @cancel="uploadCancel" :width="1073">
						<table class="import-tr">
							<tr>
								<td class="left-td">
									文件要求
								</td>
								<td class="right-td">
									<div class="pad-style">导入excel文件一定要严格按照规定的格式，注意有选择的数据内容 允许类型：<br>
										"xls和xlsx"(文件总大小不能超过20MB)</div>
								</td>
							</tr>
							<!-- style="margin-left: 10px; margin-top: 5px; margin-buttom: 5px;" -->
							<tr>
								<td class="left-td">选择导入文件</td>
								<td class="right-td">
									<a-upload class="pad-style" name="file" :showUploadList="false" :multiple="false"
										:headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
										<a-button class="choose-file-btn">
											选择文件
										</a-button>
									</a-upload>
								</td>
							</tr>
							<tr>
								<td class="left-td">导入模版</td>
								<td class="right-td">
									<font class="orange-font pad-style">导入文件请务必使用导入时专有数据模版</font>
									<a class="text-btn-color1" style="font-size: 18px; margin-left: 5px"
										@click="getModel()">点击下载</a>
									<!-- <a class = "text-btn-color1" style="font-size: 18px; margin-left: 5px" href="https://digital-school-xx0422.oss-cn-shenzhen.aliyuncs.com/importModel/enrollApplyModel.xls">点击下载</a> -->
								</td>
							</tr>

						</table><br>

						<div class="pointout-apply-div">
							<br />
							<div class="font-apply-div">
								温馨提示：<br />
								①姓名和身份证号必须唯一，身份证号如果已经存在则更新，不存在则新增; <br />
								②导入时默认录取状态字段值为未录取，已报到的不能更新; <br />
								③*专业部名称、专业名称、学制、层次、户口所在省市和县区，必须参照系统中的设置，否则将直接导致导入失败; <br />
								④层次、户口类别、健康状况、政治面貌必须参照数据字典数据，否则导入无效。<br />
								<br>
							</div>
						</div>

					</a-modal>
				</div>
			</div>

			<div>
				<a-table :columns="columns" :data-source="data" :defaultCurrent="6" :pagination="pagination"
					:scroll="{ x: 1500, y: 300 }" @change="tableChange">
					<span slot="operator" slot-scope="text, record">
						<a class="text-btn-color2" @click="showMsg(record)">查看</a>
					</span>

				</a-table>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		EduListMixin
	} from '@/mixins/EduListMixin';
	import {
		Icon
	} from 'ant-design-vue';
	import {
		axios
	} from "@/utils/request"
	import JSelectGrade from '@/components/kwglbiz/JSelectGrade'
	import JSelectXueqi from '@/components/kwglbiz/JSelectXueqi'
	const IconFont = Icon.createFromIconfontCN({
		scriptUrl: '//at.alicdn.com/t/font_2390461_vvis3tohqh.js',
	});

	const columns = [{
			title: '考生号',
			dataIndex: 'KSH',
			key: 'KSH',
			fixed: 'left',
			width: 250,
		},
		{
			title: '姓名',
			dataIndex: 'STUNAME',
			key: 'STUNAME',
			fixed: 'left',
			width: 100,
		},
		{
			title: '学年',
			dataIndex: 'GRADE',
			key: 'GRADE',
			width: 80,
		},
		{
			title: '学期',
			dataIndex: 'SEMESTER',
			key: 'SEMESTER',
			width: 80,
		},
		{
			title: '身份证号',
			dataIndex: 'SFZH',
			key: 'SFZH',
			width: 150,
		},
		{
			title: '中学名称',
			dataIndex: 'ZXMC',
			key: 'ZXMC',
			width: 150,
		},
		{
			title: '拟录取专业',
			dataIndex: 'NLQZY',
			key: 'NLQZY',
			width: 100,
		},
		{
			title: '总分',
			dataIndex: 'SCORE',
			key: 'SCORE',
			width: 80,
		},
		{
			title: '科目一',
			dataIndex: 'SUBJECTS1',
			key: 'SUBJECTS1',
			width: 90,
		},
		{
			title: '科目二',
			dataIndex: 'SUBJECTS2',
			key: 'SUBJECTS2',
			width: 90,
		},
		{
			title: '科目三',
			dataIndex: 'SUBJECTS3',
			key: 'SUBJECTS3',
			width: 90,
		},
	];
	let data = [];



	export default {
		mixins: [EduListMixin], // 引入模块
		components: {
			JSelectGrade,
			JSelectXueqi,
			IconFont
		},
		data() {
			return {

				url: {
					list: 'enroll/stuInfoQuery/exportModel',
					exportXlsUrl: 'enroll/admission/exportMockAdmission', //导出
					importExcelUrl: 'enroll/admission/mockAdmissionImport', //导入
				},
				pagination: {
					current: 0,
					pageSize: 8,
					showSizeChanger: true,
					pageSizeOptions: ['8', '10', '20', '30', '50'],
					showTotal: (total, range) => {
						return '显示' + range[0] + '到' + range[1] + '条, 共' + total + '条记录'
					},
					showQuickJumper: true,
					total: 0
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
				//年级
				grade: [],
				gradeId: [],

				//学期
				semester: [],
				semesterId: [],

				//
				// 数据
				curGrade: '',
				curSemester: '',
				//输入框数据
				stuName: '',
				ksh: '',
				condit: '',
				/* 按条件搜索报到的数量 */
				reportCount: 0,
				/* 弹出框属性 */
				upload: false,
				visible: false,
				loading: false,
				/* 弹窗对象 */
				entityObj: {},

			};
		},
		mounted() {
			// this.getGrade();
			// this.getSemester();	
			this.getProposedAdmission();
		},
		computed: {
			// 拼接导入
			importExcelUrl: function() {
				return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
			}
		},
		methods: {
			getModel() {
				this.url.exportXlsUrl = 'enroll/admission/getMockTemplate';
				this.handleExportXls('拟录取导入模板');
				this.url.exportXlsUrl = 'enroll/admission/exportMockAdmission';
			},
			exportMessage() {
				if (this.semesterId.length != 0) {
					for (let s of this.semester) {
						if (s.value == this.semesterId[0]) {
							this.curSemester = s.label;
						}
					}
				} else {
					this.curSemester = '';
				}
				this.curGrade = this.gradeId.length == 0 ? '' : this.gradeId[0];
				var conditions = {
					"KSH": this.ksh,
					"XM": this.stuName,
					"XN": this.curGrade,
					"XQ": this.curSemester,
				};
				var conditStr = JSON.stringify(conditions)

				this.handleExportXls("拟录取数据导出", conditStr)
			},

			showUpload() {
				this.upload = true
			},
			//关闭导入弹窗
			uploadCancel() {
				this.upload = false
			},
			//获取年级
			getGrade() {

				axios({
					url: 'enroll/divideClassMng/getGrade',
					method: 'post',
					params: {}

				}).then(res => {

					for (let grade of res.result) {
						this.grade.push({
							value: grade.njdm,
							label: grade.njmc
						})
					}
				}).catch(err => {
					this.$message.warning("获取年级失败");
				})
			},
			tableChange(pagination) {

				this.pagination.current = pagination.current;
				this.pagination.pageSize = pagination.pageSize;

				this.currentPage = pagination.current;
				this.pageSize = pagination.pageSize;

				this.getProposedAdmission();

			},
			search() {
				this.currentPage = 1;
				// if (this.gradeId.length != 0) {
				// 	for(let g of this.grade){
				// 		if (g.value == this.gradeId[0]) {
				// 			this.curGrade = g.label;
				// 		}
				// 	}
				// }
				if (this.semesterId.length != 0) {
					for (let s of this.semester) {
						if (s.value == this.semesterId[0]) {
							this.curSemester = s.label;
						}
					}
				} else {
					this.curSemester = '';
				}
				this.curGrade = this.gradeId.length == 0 ? '' : this.gradeId[0];
				// // this.curGrade ='';
				// this.curSemester = this.semesterId.length == 0 ? '' : this.semesterId[0];
				this.getProposedAdmission();
			},
			//拟录取列表获取
			getProposedAdmission() {
				let currentPage = this.currentPage;
				let pageSize = this.pageSize;

				console.log("huoquxinxi" + this.zkzh + this.stuName + this.curGrade + this.curSemester);
				axios({
					url: 'enroll/admission/getMockAdmissionList',
					method: 'post',
					params: {
						"KSH": this.ksh,
						"XM": this.stuName,
						"XN": this.curGrade,
						"XQ": this.curSemester,
						"currentPage": currentPage,
						"pageSize": pageSize
					}
				}).then(res => {

					data.splice(0, data.length);
					// var enty = res.result.list[1].id;
					console.log(res)
					if (res.code == 500) {
						this.$message.warning(res.message)
						return
					}
					if (res.result.list.length == 0) {
						// this.$message.warning("暂无拟录取名单信息！");
						return;
					}
					// console.log(res.result.list.length+"enty" +enty)
					for (let score of res.result.list) {

						data.push({
							key: score.id,
							ZXMC: score.zxmc,
							SFZH: score.sfzh,
							STUNAME: score.xm,
							KSH: score.ksh,
							GRADE: score.xn,
							SEMESTER: score.xq,
							YXMC: score.faculty,
							NLQZY: score.major,
							SUBJECTS1: score.km1,
							SUBJECTS2: score.km2,
							SUBJECTS3: score.km3,
							SCORE: score.zf,

						})
					}
					this.pagination.current = currentPage;
					this.pagination.total = res.result.count;
				}).catch(err => {
					this.$message.warning("获取拟录取列表失败");
				})
			},
			empty() {
				this.ksh = '';
				this.curGrade = '';
				this.curSemester = '';
				this.stuName = '';
				this.gradeId = [];
				this.semesterId = [];
			}
		},
	};
</script>

<style>
	.import-tr {
		width: 1030px;
	}

	.left-td {
		background-color: #f5f5f5;
		width: 100px;
		height: 50px;
		border: 1px solid #e5e5e5;
		font-size: 18px;
		font-family: Microsoft YaHei;
		font-weight: 700;
		color: #666666;
		line-height: 24px;
	}

	.right-td {
		border: 1px solid #e5e5e5;
		font-size: 18px;
		font-family: Microsoft YaHei;
		font-weight: 700;
		color: #666666;
		line-height: 24px;
		width: 230px;
		height: 50px;
	}

	.pad-style {
		margin-left: 10px;
		margin-top: 5px;
		margin-bottom: 5px;
	}

	.orange-font {
		height: 20px;
		font-size: 18px;
		font-family: Microsoft YaHei;
		font-weight: 700;
		color: #FC8950;
		line-height: 28px;
	}

	.choose-file-btn,
	.choose-file-btn:hover,
	.choose-file-btn:active,
	.choose-file-btn:focus {
		color: white;
		background-color: #00bad0;
	}

	.dorm-modify-top {
		width: 500px;
		height: 40px;
		border: 0px;
		background-color: #E9EDF6;
	}

	.dorm-modify-item {
		width: 150px;
	}

	.dorm-modify-after {
		margin-left: 30px;
	}

	.link {
		font-family: "MicrosoftYaHei";
		font-size: 20px;
		text-align: center;
		font-weight: bold;
		color: #999999 !important;
	}

	.link-active {
		font-family: "MicrosoftYaHei";
		font-size: 20px;
		text-align: center;
		font-weight: bold;
		color: #666666 !important;
	}


	/*  */
	.applyexport-button {
		width: 88px;
		height: 34px;
		background: #00D09D;
		border-radius: 5px;
		margin-left: 10px;
	}

	.stuInfo-input {
		margin-left: 10px;
	}

	.export-button {
		width: 88px;
		height: 34px;
		background: #00D09D;
		border-radius: 5px;
		margin-right: 20px;
	}

	.export-button,
	.export-button:hover,
	.export-button:active,
	.export-button:focus {
		/* color: white; */
		background-color: #00D09D;
	}

	.input-style-replyTwo {
		color: #666666;
		width: 200px;
		background-color: #ffffff;
		border: 0;
		margin-left: 5px;
	}

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

	.top {
		display: flex;
		align-items: center;
	}

	.head-span {
		margin: 0 10px;
		width: 60px;
		line-height: 40px;
		text-align: right;
	}
</style>