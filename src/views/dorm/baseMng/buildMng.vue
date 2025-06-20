<template>
	<div>
		<a-card :bordered="false">
			<div class="content-head">
				<div>
					<a-modal title="添加宿舍楼" :visible="visible" :confirm-loading="confirmLoading" @ok="handleOk"
						@cancel="handleCancel" :width="900">
						<table class="scanTable">
							<tr>
								<td class="single">
									<div><span class="spanRed">*</span>宿舍楼名称:</div>
								</td>
								<td class="double">
									<a-input class="scanInput" placeholder="请输入宿舍楼名称" v-model="addName"
										onkeyup="this.value=this.value.replace(/[, ]/g,'')"></a-input>
								</td>
								<td class="single">
									<div><span class="spanRed">*</span>宿舍楼代码:</div>
								</td>
								<td class="double">
									<a-input class="scanInput" placeholder="请输入宿舍楼代码" v-model="addCode"
										onkeyup="this.value=this.value.replace(/[, ]/g,'')"></a-input>
								</td>
							</tr>
							<tr>
								<td class="single">
									<div>所属校区:</div>
								</td>
								<td class="double">
									<a-cascader class="scanInput" ref="school" :options="school" placeholder="请选择校区"
										v-model="schoolId" />
								</td>
								<td class="single">
									<div>宿舍楼类型:</div>
								</td>
								<td class="double">
									<label v-for="(item) in radioName"> {{ item.value }}
										<input type="radio" name="approveResult" :value="item.index"
											v-model="checkedValue">
									</label>
								</td>
							</tr>
							<tr>
								<td class="single">
									<div>总建筑面积:</div>
								</td>
								<td class="double">
									<a-input class="scanInput" placeholder="请输入总建筑面积" v-model="addBuildSquare"
										onkeyup="this.value=this.value.replace(/[, ]/g,'')">
									</a-input>
								</td>
								<td class="single">
									<div>总使用面积:</div>
								</td>
								<td class="double">
									<a-input class="scanInput" placeholder="请输入总使用面积" v-model="addTotalSquare"
										onkeyup="this.value=this.value.replace(/[, ]/g,'')">
									</a-input>
								</td>
							</tr>
							<tr>
								<td class="single">
									<div><span class="spanRed">*</span>宿舍楼地址:</div>
								</td>
								<td class="double">
									<a-input class="scanInput" placeholder="请输入宿舍楼地址" v-model="addAddress"
										onkeyup="this.value=this.value.replace(/[, ]/g,'')"></a-input>
								</td>
								<td class="single">
									<div>楼层数:</div>
								</td>
								<td class="double">
									<a-input class="scanInput" placeholder="请输入楼层数" type="number" v-model="addFloor">
									</a-input>
								</td>
							</tr>
							<tr>
								<td class="single">
									<div><span class="spanRed">*</span>宿舍楼状态:</div>
								</td>
								<td class="double">
									<a-cascader class="scanInput" :options="state" placeholder="请选择状态"
										v-model="stateId" />
								</td>
								<td class="single">
									<div>排序:</div>
								</td>
								<td class="double">
									<a-input class="scanInput" placeholder="请输入排序号" type="number" v-model="addListNum">
									</a-input>
								</td>
							</tr>
							<tr>
								<td class="single">
									<div>图片:</div>
								</td>
								<td class="double">
									<a-input class="small" :disabled="true" v-model="fileName"></a-input>
									<a-upload name="file" :showUploadList="false" :multiple="false"
										:headers="tokenHeader" :action="url.importImgUrl" @change="handleImportImg">
										<a-button :size="size" icon="import">选择文件</a-button>
									</a-upload>
								</td>
							</tr>
						</table>
						<template slot="footer">

							<a-button @click="handleCancel()">取消</a-button>
							<a-button type="primary" @click="handleOk()">确定</a-button>
						</template>
					</a-modal>


					<a-modal v-model="upload" title="导入" @ok="uploadCancel" @cancel="uploadCancel">
						<table class="scanTable">
							<tr>
								<td class="single">导入模版</td>
								<td class="double">
									<a style="font-size: 14px; margin-left: 20px;"
										@click="exportModel('宿舍楼模版')">点击下载</a>
								</td>
							</tr>
							<tr>
								<td class="single">选择Excel表格</td>
								<td class="double">
									<a-upload name="file" :showUploadList="false" :multiple="false"
										:headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
										<a style="font-size: 14px; margin-left: 20px; color:black">选择文件</a>
										<a-input style="font-size: 14px; margin-left: 20px; width:100px;"
											placeholder="未选择文件" :disabled="true" v-model="fileName" />
									</a-upload>
								</td>
							</tr>
						</table>
					</a-modal>
				</div>


				<div class="top">
					<div class="head-label">
						<span class="head-span">宿舍楼名称</span>
						<a-input class="condition" placeholder="请输入名称" v-model="buildName"
							onkeyup="this.value=this.value.replace(/[, ]/g,'')" />
					</div>
					<a-button type="primary" @click="getBuildList" icon="search" style="margin-left: 20px;">
						搜索
					</a-button>
					<a-button type="danger" @click="resetAll" style="margin-left: 20px;">
						清空
					</a-button>
				</div>
				<a-button type="primary" @click="showModal" icon="plus" style="margin-right:10px;">
					添加
				</a-button>
				<a-button type="primary" icon="import" @click="showUpload" style="margin-right:10px;">
					导入
				</a-button>
				<a-button type="primary" icon="export" @click="changeSuam" style="margin-right:10px;">
					导出
				</a-button>
				<a-button type="primary" icon="reload" @click="getBuildList">
					刷新
				</a-button>
			</div>

			<div>

			</div>
			<div class="table-useful">
				<a-table :columns="columns" :data-source="data" :defaultCurrent="6" :pagination="pagination"
					@change="tableChange">
					<span slot="operator" slot-scope="text, record">
						<a @click="addAdmin(record)">添加管理员</a>
						<a-divider type="vertical" />
						<a @click="editBuild(record.key)">编辑</a>
						<a-divider type="vertical" />
						<a @click="deleteBuild(record.key)">删除</a>
					</span>
				</a-table>
			</div>
		</a-card>
		<a-modal title="添加宿舍楼管理员" :visible="admin" :confirm-loading="confirmLoading" @ok="addAdminOK"
			@cancel="addAdminCancel" :width="900">
			<table class="scanTable">
				<tr>
					<td class="single">
						<div>宿舍楼名称:</div>
					</td>
					<td class="double">
						<a-input :disabled="true" class="scanInput" v-model="dormName"></a-input>
					</td>
					<td class="single">
						<div>所属校区:</div>
					</td>
					<td class="double">
						<a-input :disabled="true" class="scanInput" v-model="schoolName"></a-input>
					</td>
				</tr>
				<tr>
					<td class="single">
						<div>设定管理员:</div>
					</td>
					<td class="double">
						<a-cascader class="scanInput" :options="teacher" placeholder="请选择管理员" v-model="teacherId" />
						<!-- <a-cascader class="scanInput" :options="state" placeholder="请选择状态" v-model="stateId" /> -->
					</td>
				</tr>
			</table>
			<template slot="footer">
				<a-button @click="addAdminCancel">取消</a-button>
				<a-button type="primary" @click="addAdminOK">确认</a-button>
			</template>
		</a-modal>

		<a-modal title="编辑宿舍楼" :visible="edit" :confirm-loading="confirmLoading" @ok="editOK" @cancel="editCancel"
			:width="900">
			<table class="scanTable">
				<tr>
					<td class="single">
						<div><span class="spanRed">*</span>宿舍楼名称:</div>
					</td>
					<td class="double">
						<a-input class="scanInput" placeholder="请输入宿舍楼名称" v-model="editName"></a-input>
					</td>
					<td class="single">
						<div><span class="spanRed">*</span>宿舍楼代码:</div>
					</td>
					<td class="double">
						<a-input class="scanInput" placeholder="请输入宿舍楼代码" v-model="editCode"></a-input>
					</td>
				</tr>
				<tr>
					<td class="single">
						<div>所属校区:</div>
					</td>
					<td class="double">
						<a-cascader class="scanInput" ref="school" :options="school" placeholder="请选择校区"
							v-model="schoolId" />
					</td>
					<td class="single">
						<div>宿舍楼类型:</div>
					</td>
					<td class="double">
						<label v-for="(item) in radioName"> {{ item.value }}
							<input type="radio" name="approveResult" :value="item.index" v-model="checkedValue">
						</label>
					</td>
				</tr>
				<tr>
					<td class="single">
						<div><span class="spanRed">*</span>总建筑面积:</div>
					</td>
					<td class="double">
						<a-input class="scanInput" placeholder="请输入总建筑面积" v-model="editBuildSquare"></a-input>
					</td>
					<td class="single">
						<div><span class="spanRed">*</span>总使用面积:</div>
					</td>
					<td class="double">
						<a-input class="scanInput" placeholder="请输入总使用面积" v-model="editTotalSquare"></a-input>
					</td>
				</tr>
				<tr>
					<td class="single">
						<div><span class="spanRed">*</span>宿舍楼地址:</div>
					</td>
					<td class="double">
						<a-input class="scanInput" placeholder="请输入宿舍楼地址" v-model="editAddress"></a-input>
					</td>
					<td class="single">
						<div><span class="spanRed">*</span>楼层数:</div>
					</td>
					<td class="double">
						<a-input class="scanInput" placeholder="请输入楼层数" type="number" v-model="editFloor"></a-input>
					</td>
				</tr>
				<tr>
					<td class="single">
						<div><span class="spanRed">*</span>宿舍楼状态:</div>
					</td>
					<td class="double">
						<a-cascader class="scanInput" :options="state" placeholder="请选择状态" v-model="stateId" />
					</td>
					<td class="single">
						<div>排序:</div>
					</td>
					<td class="double">
						<a-input class="scanInput" placeholder="请输入排序号" type="number" v-model="editListNum"></a-input>
					</td>
				</tr>
				<tr>
					<td class="single">
						<div>图片:</div>
					</td>
					<td class="double">
						<a-input class="small" :disabled="true" v-model="fileName"></a-input>
						<a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader"
							:action="url.importImgUrl" @change="handleImportImg">
							<a-button :size="size" icon="import">修改文件</a-button>
						</a-upload>
					</td>
				</tr>
			</table>
			<template slot="footer">
				<a-button @click="editCancel()">取消</a-button>
				<a-button type="primary" @click="editOK()">确认</a-button>
			</template>
		</a-modal>
	</div>


</template>

<script>
	import {
		Icon
	} from 'ant-design-vue';
	import {
		axios
	} from "@/utils/request";
	import {
		EduListMixin
	} from '@/mixins/EduListMixin';
	import {
		downFile
	} from '@/api/common/manage'

	const IconFont = Icon.createFromIconfontCN({
		scriptUrl: '//at.alicdn.com/t/font_2390461_vvis3tohqh.js',
	});

	const columns = [{
			title: '宿舍楼名称',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: '宿舍类型',
			dataIndex: 'type',
			key: 'type',
		},
		{
			title: '宿舍楼代码',
			dataIndex: 'code',
			key: 'code',
		},
		{
			title: '所属校区',
			dataIndex: 'school',
			key: 'school',
		},
		{
			title: '层数',
			dataIndex: 'floor',
			key: 'floor',
		},
		{
			title: '面积',
			dataIndex: 'square',
			key: 'square',
		},
		{
			title: '地址',
			dataIndex: 'address',
			key: 'address',
		},
		{
			title: '排序',
			dataIndex: 'sort',
			key: 'sort',
		},
		{
			title: '状态',
			dataIndex: 'state',
			key: 'state',
		},
		{
			title: '操作',
			dataIndex: 'operator',
			key: 'operator',
			width: '20%',
			align: 'center',
			scopedSlots: {
				customRender: 'operator'
			},
		},
	];

	let data = [];


	export default {
		mixins: [EduListMixin],
		data() {
			return {
				pagination: {
					current: 1,
					pageSize: 10,
					pageSizeOptions: ['6', '10'],
					showTotal: (total, range) => {
						return '显示' + range[0] + '到' + range[1] + '条, 共' + total + '条记录'
					},
					showQuickJumper: true,
					showSizeChanger: true,
					total: 1000
				},
				school: [],
				state: [{
					value: 0,
					label: '正常',
				}, {
					value: 1,
					label: '维修',
				}, {
					value: 2,
					label: '清空',
				}],
				schoolId: [],
				stateId: [],
				/* 表格数据 */
				data,
				columns,
				/* 按钮大小 */
				size: 'small',
				/* 下拉框数据 */
				/* 添加-弹出框数据 */
				visible: false,
				confirmLoading: false,
				buildName: '',
				addName: '',
				addCode: '',
				addAddress: '',
				addBuildSquare: '',
				addTotalSquare: '',
				addFloor: '',
				addListNum: '',
				addDate: '',
				editName: '',
				editCode: '',
				editAddress: '',
				editBuildSquare: '',
				editTotalSquare: '',
				editFloor: '',
				editListNum: '',
				editDate: '',
				edit: false,
				editId: '',
				url: {
					list: 'dorm/bulidMng/querySuSheLou',
					exportXlsUrl: 'dorm/bulidMng/export',
					importExcelUrl: 'dorm/bulidMng/import',
					importImgUrl: window._CONFIG['domianURL'] + '/dorm/image/impotrColl'
				},
				upload: false,
				fileName: '',
				fileUrl: '',
				fileSize: '',
				admin: false,
				teacher: [],
				teacherId: [],
				addAdminId: '',
				dormName: '',
				schoolName: '',
				checkedValue: '',
				radioName: [{
					index: 1,
					value: '混住宿舍'
				}, {
					index: 2,
					value: '男生宿舍'
				}, {
					index: 3,
					value: '女生宿舍'
				}]
			};
		},
		watch: {

		},
		mounted() {
			this.getBuildList();
			this.getSchoolList();
			// this.getTeacherList();//李少君
		},
		computed: {
			importExcelUrl: function() {
				return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
			}
		},
		components: {
			IconFont,
		},
		methods: {
			changeSuam() {
				var arr = []
				arr.push({
					key: "jzwmc",
					value: this.buildName
				})
				this.handleExportXls('宿舍楼', arr)
			},
			showModal() {
				this.schoolId = [];
				this.stateId = [];
				this.addName = '';
				this.addCode = '';
				this.addAddress = '';
				this.addBuildSquare = '';
				this.addTotalSquare = '';
				this.addFloor = '';
				this.addListNum = '';
				this.fileName = '';
				this.fileUrl = '';
				this.visible = true;
			},
			handleOk(e) {
				this.confirmLoading = true;
				if (this.editName == "" || this.editCode == "" || this.editAddress == "" || this.stateId.length == 0 ||
					this.editFloor == '' || this.editBuildSquare == '' || this.editTotalSquare == '') {
					this.$message.warning("请将信息输入完整");
					return;
				}
				axios({
					url: 'dorm/bulidMng/addSuSheLou',
					method: 'post',
					params: {
						"jzwh": this.addCode,
						"jzwmc": this.addName,
						"xqh": this.schoolId[0],
						"xbm": this.checkedValue - 1,
						"jzwcs": this.addFloor,
						"zjzmj": this.addBuildSquare,
						"zsymi": this.addTotalSquare,
						"jzwdz": this.addAddress,
						"jzwzkm": this.stateId[0],
						"jzwtp": 0,
						"jzwpmt": 0,
						"listSort": this.addListNum,
						"fileUrl": this.fileUrl,
						"name": this.fileName,
						"size": this.fileSize
					}
				}).then(res => {
					this.$message.success(res.message);
					this.$message.success(res.message);
					this.visible = false;
					this.confirmLoading = false;
					this.getBuildList();
				}).catch(err => {
					this.$message.warning("添加宿舍楼失败");
				});
			},
			handleCancel(e) {
				this.visible = false;
			},
			tableChange(pagination, filters, sorter) {
				this.pagination.current = pagination.current;
				this.pagination.pageSize = pagination.pageSize;
			},
			getBuildList() {
				axios({
					url: 'dorm/bulidMng/querySuSheLou',
					method: 'post',
					params: {
						"jzwmc": this.buildName
					},
				}).then(res => {
					console.log(res);
					// data = []
					data.splice(0, data.length);
					for (let build of res.result) {
						data.push({
							key: build.id,
							name: build.jzwmc,
							type: build.xbm == -1 ? this.radioName[0].value : this.radioName[build.xbm]
								.value,
							code: build.jzwh,
							school: build.xqmc,
							floor: build.jzwcs,
							square: build.zjzmj,
							address: build.jzwdz,
							sort: build.listSort,
							state: this.state[build.status].label
						})
					}
					var ary = data
					for (let i = 0; i < ary.length - 1; i++) {
						for (let j = 0; j < ary.length - i - 1; j++) {
							if (ary[j].sort > ary[j + 1].sort) {
								let temp = ary[j];
								ary[j] = ary[j + 1];
								ary[j + 1] = temp;
							}
						}
					}
					data = ary
					// data = data.reverse()
					this.pagination.current = 1;
					this.pagination.total = res.result.length;
				}).catch(err => {
					this.$message.warning("获取宿舍楼列表失败");
				})
			},
			resetAll() {
				this.buildName = '';
			},
			getSchoolList() {
				axios({
					url: 'dorm/laiFang/xiaoQu',
					method: 'post',
					params: {}
				}).then(res => {
					this.school.length = 0;
					for (let school of res.result) {
						this.school.push({
							value: school.id,
							label: school.name
						})
					}
				}).catch(err => {
					this.$message.warning("获取校区列表失败");
				})
			},
			deleteBuild(id) {
				let re = confirm("确认删除?")
				if (re) {
					axios({
						url: 'dorm/bulidMng/deleteSuSheLou',
						method: 'post',
						params: {
							"id": id
						}
					}).then(res => {
						this.$message.success(res.message);
						this.getBuildList();
					}).catch(err => {
						this.$message.warning("删除宿舍楼失败");
					})
				}
			},
			editBuild(id) {
				this.editId = id;
				axios({
					url: 'dorm/bulidMng/updateMessage',
					method: 'post',
					params: {
						"id": id
					}
				}).then(res => {
					this.fileName = '';
					this.fileUrl = '';
					this.editName = res.result.jzwmc;
					this.editCode = res.result.jzwh;
					this.editBuildSquare = res.result.zjzmj;
					this.editTotalSquare = res.result.zsymj;
					this.editAddress = res.result.jzwdz;
					this.editFloor = res.result.jzwcs;
					this.editListNum = res.result.listsort;
					this.schoolId = [res.result.xqh];
					this.checkedValue = res.result.xbm + 1;
					this.stateId = [res.result.status];
					this.fileName = res.result.name;
					this.fileUrl = res.result.sourcefile;
					this.edit = true;
				}).catch(err => {
					this.$message.warning("获取该宿舍楼信息失败");
				})
			},
			editOK() {
				if (this.editName == "" || this.editCode == "" || this.editAddress == "" || this.stateId.length == 0 ||
					this.editFloor == '' || this.editBuildSquare == '' || this.editTotalSquare == '') {
					this.$message.warning("请将信息输入完整");
					return;
				}
				let fileUrl = this.fileUrl == null ? '' : this.fileUrl;
				let fileName = this.fileName == null ? '' : this.fileName;
				let fileSize = this.fileSize == null ? '' : this.fileSize;
				axios({
					url: 'dorm/bulidMng/editSuSheLou',
					method: 'post',
					params: {
						"id": this.editId,
						"jzwh": this.editCode,
						"jzwmc": this.editName,
						"xqh": this.schoolId[0],
						"xbm": this.checkedValue - 1,
						"zjzmj": this.editBuildSquare,
						"jzwdz": this.editAddress,
						"status": this.stateId[0],
						"listSort": this.editListNum,
						"fileUrl": fileUrl,
						"name": fileName,
						"size": fileSize,
						"jzwcs": this.editFloor,
						"zsymi": this.editTotalSquare,
						"jzwzkm": this.stateId[0],
						"jzwtp": 0,
						"jzwpmt": 0,
					}
				}).then(res => {
					this.$message.success(res.message);
					this.getBuildList();
					this.edit = false;
				}).catch(err => {
					this.$message.warning("修改宿舍楼信息失败");
				})
			},
			editCancel() {
				this.edit = false;
			},
			showUpload() {
				this.upload = true;
			},
			uploadCancel() {
				this.upload = false;
			},
			exportModel(fileName) {
				if (!fileName || typeof fileName != "string") {
					fileName = "导出文件"
				}
				let param = this.getQueryParams();
				if (this.selectedRowKeys && this.selectedRowKeys.length > 0) {
					param['selections'] = this.selectedRowKeys.join(",")
				}
				param['jzwmc'] = this.buildName
				downFile("dorm/bulidMng/exportModel", param).then((data) => {
					if (!data) {
						this.$message.warning("文件下载失败")
						return
					}
					if (typeof window.navigator.msSaveBlob !== 'undefined') {
						window.navigator.msSaveBlob(new Blob([data], {
							type: 'application/vnd.ms-excel'
						}), fileName + '.xls')
					} else {
						let url = window.URL.createObjectURL(new Blob([data], {
							type: 'application/vnd.ms-excel'
						}))
						let link = document.createElement('a')
						link.style.display = 'none'
						link.href = url
						link.setAttribute('download', fileName + '.xls')
						document.body.appendChild(link)
						link.click()
						document.body.removeChild(link); //下载完成移除元素
						window.URL.revokeObjectURL(url); //释放掉blob对象
					}
				})
			},
			handleImportImg(info) {
				if (info.file.status !== 'uploading') {
					console.log(info.file);
					this.fileName = info.file.name;
					this.fileUrl = info.file.response.result;
					this.fileSize = info.file.size;
				}
				if (info.file.status === 'done') {
					this.$message.success(`${info.file.name} 上传成功.`);
				} else if (info.file.status === 'error') {
					this.$message.error(`${info.file.name} 上传失败.`);
				}
			},
			addAdmin(text) {
				this.admin = true;
				this.teacherId = [];
				this.addAdminId = text.key;
				this.dormName = text.name;
				this.schoolName = text.school;
				axios({
					url: 'dorm/bulidMng/showMng',
					method: 'post',
					params: {
						sslId: text.key,
					}
				}).then(res => {
					if (res.result.adminId == null) {
						this.getTeacherList();
						return;
					}
					this.teacherId = [res.result.adminId];
					this.getTeacherList();
				}).catch(err => {
					this.$message.warning("未添加管理员");
				})


			},
			addAdminOK() {
				if (this.teacherId.length == 0) {
					this.$message.warning("请将信息输入完整");
					return;
				}
				axios({
					url: 'dorm/bulidMng/addMng',
					method: 'post',
					params: {
						sslId: this.addAdminId,
						userId: this.teacherId[0]
					}
				}).then(res => {
					this.$message.success(res.message);
					this.admin = false;
				}).catch(err => {
					this.$message.warning("添加宿舍楼管理员失败");
				})
			},
			addAdminCancel() {
				this.admin = false;
			},
			getTeacherList() {
				axios({
					url: 'dorm/bulidMng/teacherMessage',
					method: 'post',
					params: {}
				}).then(res => {
					this.teacher.splice(0, this.teacher.length);
					for (let tea of res) {
						this.teacher.push({
							value: tea.id,
							label: tea.xm,
						})
					}
				}).catch(err => {
					this.$message.warning("获取宿舍楼管理员列表失败");
				})
			},
		},
	};
</script>

<style lang="less" scoped>
	.top {
		padding: 0 !important;
		margin-bottom: 10px;
		display: flex;
		align-items: center;
	}

	.head-label {
		display: flex;
		align-items: center;
	}

	.head-span {
		margin: 0 10px;
		width: 120px;
	}
</style>