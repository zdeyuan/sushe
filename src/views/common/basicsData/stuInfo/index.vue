<template>
	<div>
		<a-card :bordered="false" class="header-solid mb-24">
			<div>
				<div class="top">
					<span class="divide-span" style="margin-right: 10px;">年级</span>
					<a-select :options="grade" placeholder="请选择" v-model="searchInfo.gradeId" />

					<span class="divide-span" style=" margin-left: 20px; margin-right: 10px;">专业部</span>
					<a-select :options="faculty" placeholder="请选择" @change="facultyChange" v-model="searchInfo.falId" />

					<span class="divide-span" style="margin-left: 20px; margin-right: 10px;">专业</span>
					<a-select :options="specialty" placeholder="请选择" @change="getClazz" v-model="searchInfo.specId" />
					<span class="divide-span" style=" margin-left: 20px; margin-right: 10px;">班级</span>
					<a-select :options="bjIdList" placeholder="请选择" v-model="searchInfo.bjId" />
				</div>
				<div style="margin: 15px 0;">
					<a-select default-value="姓名" style="margin-right:15px;" @change="jugeType">
						<a-select-option value="xm">
							姓名
						</a-select-option>
						<a-select-option value="xh">
							学号
						</a-select-option>
						<a-select-option value="sfzh">
							身份证
						</a-select-option>
					</a-select>
					<a-input placeholder="请输入" style="width: 200px;" v-model="input" />
					<a-button type="primary" @click="getStuInfo" style="margin-left: 20px;">
						搜索
					</a-button>
					<a-button type="danger" @click="remoder" style="margin-left: 20px;">
						清空
					</a-button>
				</div>
			</div>
			<div class="btns">
				<a-button type="primary" @click="joinStu('add')" style="margin-right: 20px;">
					添加
				</a-button>
				<!-- <a-button type="primary" @click="doExportFn" style="margin-right: 20px;">
					导出
				</a-button> -->
				<a-button type="danger" @click="delteIds" style="margin-right: 20px;">
					批量删除
				</a-button>
				<a-button type="primary" @click="getStuInfo" style="margin-right: 20px;">
					刷新
				</a-button>
				<!-- <a-button type="primary" style="margin-right: 20px;" @click="isShowImport=!isShowImport">
					批量导入
				</a-button> -->
			</div>
			<div class="count">
				<a-table :columns="columns" :data-source="data" :row-selection="rowSelection" @change="tableChange"
					rowKey='id' :pagination="pagination">
					<span slot="xbm" slot-scope="text, record">
						{{record.xbm == 1 ? '男' : '女'}}
					</span>
					<span slot="action" slot-scope="text, record">
						<span style="color: #00D09E; margin-right: 20px; cursor:pointer;"
							@click="joinStu('see',record.id)">查看</span><span style="color: #028BE2; cursor:pointer;"
							@click="joinStu('change',record.id)">修改</span>
					</span>
				</a-table>
			</div>
			<div class="showNewDoginBox">
				<!-- <a-modal v-model="joinOrChangeStuShow" :title="joinOrChangeStuType == 'add' ? '添加' : '修改'" @ok="uploadCancel" @cancel="uploadCancel" :width="1073"> -->
				<joinOrChangeStuInfo ref="joinOrChangeStu" @JoinOrchangeStuSuss='JoinOrchangeStuSuss'>
				</joinOrChangeStuInfo>
				<!-- </a-modal> -->
			</div>
		</a-card>
		<edu-form title="导入" v-if="isShowImport" width="40%" top="200px" @ok="doImportFn(false)" @cancel="doImportFn()">
			<div>
				<a-form-model labelAlign="right">
					<a-form-model-item label="附近">
						<uploadFiles :showFiles="false" one :url="importUrl" v-if="doImport" :getParams="doImport"
							serviceType="upload" :showMsg="false" @upload="doImportFn" uploadBtnClass="success"
							uploadBtnName="选择文件" style="display: inline-block;" />
					</a-form-model-item>
					<a-form-model-item label="说明" prop="hqUserId" required>
						<span>请按模板填写好要导入的数据</span>
						<a class="down-btn" @click="exportModel">模板下载</a>
					</a-form-model-item>
				</a-form-model>
			</div>
		</edu-form>
	</div>
</template>

<script>
	import md5 from 'js-md5';
	import {
		axios
	} from '@/utils/request';
	import {
		EduListMixin
	} from '@/mixins/EduListMixin'
	import joinOrChangeStuInfo from './join.vue'
	import uploadFiles from '@/components/kqManageComponent/uploadFiles';
	export default {
		mixins: [EduListMixin], // 引入模块
		components: {
			joinOrChangeStuInfo,
			uploadFiles
		},
		data() {
			return {
				current: 'schoolInfo',
				columns: [{
						title: '学号',
						dataIndex: 'xh',
						key: 'xh',
					},
					{
						title: '姓名',
						dataIndex: 'xm',
						key: 'xm',
					},
					{
						title: '性别',
						dataIndex: 'xbm',
						key: 'xbm',
						scopedSlots: {
							customRender: 'xbm'
						},
					},
					{
						title: '身份证号',
						dataIndex: 'sfzh',
						key: 'sfzh',
					},
					{
						title: '学籍状态',
						dataIndex: 'dqztmName',
						key: 'dqztmName',
					},
					{
						title: '所属年级',
						dataIndex: 'njmc',
						key: 'njmc',
					},
					{
						title: '所属院系',
						dataIndex: 'yxmc',
						key: 'yxmc',
					},
					{
						title: '所属班级',
						dataIndex: 'xzbmc',
						key: 'xzbmc',
					},
					{
						title: '操作',
						dataIndex: 'action',
						key: 'action',
						scopedSlots: {
							customRender: 'action'
						},
					},
				],
				data: [],
				isShowImport: false,
				importUrl: '/stu/veBaseStudent/importExcel',
				selectedRowKeys: [],
				pagination: {
					current: 1,
					pageSize: 10,
					pageSizeOptions: ['10', '20', '30', '50'],
					showTotal: (total, range) => {
						return '显示' + range[0] + '到' + range[1] + '条, 共' + total + '条记录'
					},
					showSizeChanger: true,
					showQuickJumper: true,
					total: 0
				},
				input: '',
				type: 'xm',
				grade: [],
				faculty: [],
				specialty: [],
				bjIdList: [],
				upload: false,
				joinOrChangeStuShow: false,
				joinOrChangeStuType: '',
				url: {
					list: 'enroll/ApplyMsgMng/exportModel',
					importExcelUrl: 'common/veIntegration/importExcelStudent',
				},
				exportConfig: {
					url: '/stu/veBaseStudent/export',
					name: '《学生信息表导出》'
				},
				//搜索参数
				searchInfo: {
					pageNo: 1,
					pageSize: 10,
					xm: '',
					xh: '',
					sfzh: '',
					gradeId: undefined, //年级
					falId: undefined, //专业部
					specId: undefined, //专业
					bjId: undefined, //班级
					interfaceUserId: '09d5e1e7f9b049008eee645c783a1d66'
				}
			}
		},
		computed: {
			rowSelection() {
				const selectedRowKeys = this.selectedRowKeys; //常量

				return {
					selectedRowKeys,
					onChange: this.onSelectChange,
				};
			},
		},
		created() {
			this.getGrade()
			this.getFaculty()
			this.getStuInfo()
		},
		methods: {
			doImport() {
				return {
					temp: [
						'序号',
						'身份证号',
						'学号' /* 123 */ ,
						'姓名',
						'性别',
						'民族',
						'所属年级',
						'入学年月',
						'修读专业',
						'学制',
						'班级',
						'所在省份',
						'所在市',
						'所在区',
						'详情地址',
						'报名号',
						'健康状况',
						'政治面貌',
						'户口类别',
						'是否低保',
						'就读方式',
						'状态'
					],
					tempName: '学籍模板'
				};
			},
		//下载模板
		exportModel() {
			const temp = this.doImport();
			let url = '';
			if (process.env.VUE_APP_SYSTEM_NAME == '学生管理系统') {
				url = `/excel/${temp.tempName}.xls`; // 确保 URL 包含文件名
				this.downloadFile(url, temp.tempName + '.xls');
			}
		},
		downloadFile(url, fileName) {
			const link = document.createElement('a');
			link.href = url;
			link.download = fileName;
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		},
		doImportFn(type) {
			this.isShowImport = false;
			if (!type) {
				return;
			}
			this.$message.success('导入成功');
			this.getStuInfo();
		},
		remoder() {
			this.searchInfo.xm = ''
			this.searchInfo.xh = ''
			this.searchInfo.sfzh = ''
			this.searchInfo.gradeId = '' //年级
			this.searchInfo.falId = '' //专业部
			this.searchInfo.specId = '' //专业
			this.searchInfo.bjId = '' //班级
			this.input = ''
			this.getStuInfo()
		},
		joinStu(type, id) {
			// this.joinOrChangeStuShow = true
			this.$refs.joinOrChangeStu.judesType(type, id)
		},
		JoinOrchangeStuSuss() {
			this.getStuInfo()
		},
		//导出模板
		// exportModel() {
		// 	this.url.exportXlsUrl = '/common/veCommon/stuExport';
		// 	this.handleExportXls('报名信息导入模板');
		// 	this.url.exportXlsUrl = 'common/veIntegration/importExcelStudent';
		// },
		jugeType(value) {
			this.type = value
		},
		getStuInfo() {
			if (this.type == 'xm') {
				this.searchInfo.xm = this.input
			} else if (this.type == 'xh') {
				this.searchInfo.xh = this.input
			} else {
				this.searchInfo.sfzh = this.input
			}
			axios({
				url: '/common/veCommon/getStudentPageList',
				method: 'get',
				params: this.searchInfo
			}).then(res => {

				if (res.code == 200) {

					this.data = res.result.list

					this.pagination.total = res.result.total
				}


			}).catch(err => {


			})
		},

		onSelectChange(selectedRowKeys) {
			console.log('selectedRowKeys changed: ', selectedRowKeys);
			this.selectedRowKeys = selectedRowKeys;
		},

		tableChange(value, key, column) {
			this.searchInfo.pageNo = value.current
			this.pagination.current = value.current
			this.getStuInfo()
		},
		doExportFn() {
			let _this = this;
			this.$confirm({
				title: '提示',
				content: '确定要导出' + _this.exportConfig.name + '吗?',
				okText: '确认',
				cancelText: '取消',
				onOk() {
					_this.doExportFnReal();
				},
				onCancel() {},
			});
		},
		getParams() {
			const params = this.searchInfo;
			return params;
		},
		doExportFnReal() {
			const config = {
				name: '导出',
				nameTime: true
			};
			Object.assign(config, this.exportConfig);
			if (!config.url) {
				return;
			}
			if (config.nameTime) {
				config.name += this.$date.format() + '.xlsx';
			}
			//数据加载
			let reqData = {};
			/* 如果是自己的 */
			// reqData[this.sizeName] = 100000;
			// reqData[this.pageName] = 1;
			// if (this.params) {
			//   Object.assign(reqData, this.params);
			// }
			if (this.getParams) {
				Object.assign(reqData, this.getParams());
			}
			reqData.sorts = {
				column: 'xh',
				asc: true
			};
			this.$http.exportExcel(config.url, reqData, 'post', {
				name: config.name
			});
		},
		//显示导入弹窗
		showUpload() {
			this.upload = true
		},
		//关闭导入弹窗
		uploadCancel() {
			this.upload = false
			this.joinOrChangeStuType = false
		},
		// 删除信息
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
					axios({
						url: 'common/veBase/deleteStudentBatch?ids=' + ids,
						method: 'post',
						params: {}

					}).then(res => {
						then.selectedRowKeys = []
						if (res.code == 200) {
							then.getStuInfo()
						}

					}).catch(err => {
						then.$message.warning("获取年级失败");
					})
				},
				onCancel() {},
			});
		},

		// 获取年级专业
		getGrade() {

			axios({
				url: 'common/veCommon/queryGradeList',
				method: 'get',
				params: {
					pageNo: 1,
					pageSize: 100,
					interfaceUserId: '09d5e1e7f9b049008eee645c783a1d66'
				}

			}).then(res => {

				for (let grade of res.result) {
					this.grade.push({
						value: grade.id,
						label: grade.njdm
					})
				}
			}).catch(err => {
				this.$message.warning("获取年级失败");
			})
		},
		getFaculty() {

			axios({
				url: 'common/veBase/getFacultyPageList',
				method: 'get',
				params: {
					pageNo: 1,
					pageSize: 100
				}
			}).then(res => {

				for (let faculty of res.result.list) {
					this.faculty.push({
						value: faculty.id,
						label: faculty.yxmc
					})
				}
			}).catch(err => {
				this.$message.warning("获取专业部失败");
			})
		},
		facultyChange(value) {
			console.log(value)
			this.specialty = [];
			this.searchInfo.specId = '';

			if (value.length == 0) {
				return;
			}

			axios({
				url: 'common/veCommon/querySpecialtyListByFalId',
				method: 'get',
				params: {
					pageNo: 1,
					pageSize: 100,
					falId: value
				}
			}).then(res => {

				//this.search();

				this.specialty.splice(0, this.specialty.length);
				for (let specialty of res.result) {
					this.specialty.push({
						value: specialty.id,
						label: specialty.zymc
					})
				}
			}).catch(err => {
				this.$message.warning("获取专业失败");
			})
		},
		getClazz(value) {

			this.bjIdList = []
			this.searchInfo.bjId = ''

			axios({
					url: '/common/veCommon/queryBanJiListBySpecId',
					method: 'get',
					params: {
						specId: value,
						pageNo: 1,
						pageSize: 100
					},
				})
				.then((res) => {

					this.bjIdList.splice(0, this.bjIdList.length)

					for (let bjIdList of res.result) {
						this.bjIdList.push({
							value: bjIdList.id,
							label: bjIdList.xzbmc,
						})
					}
				})
				.catch((err) => {
					this.$message.warning('获取班级失败')
				})

		},
	}
	}
</script>

<style lang="less" scoped>
	.top {
		display: flex;
		align-items: center;
	}

	/deep/ .ant-table-tbody>tr>td,
	/deep/.ant-table-thead>tr>th {
		padding: 15px 5px;
	}

	/deep/ .ant-table-thead>tr>th {
		background: #66c3fd;
		color: #fff;
		font-size: 14px;
	}

	/deep/ .ant-table-tbody {
		tr:nth-child(even) {
			background: #f4f7f9;
		}
	}
</style>