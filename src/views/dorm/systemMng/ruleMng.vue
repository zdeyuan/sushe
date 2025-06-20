<template>
	<div>
		<a-card :bordered="false">
			<div class="top">
				<span class="head-span">标题</span>
				<div>
					<a-input class="condition" placeholder="请输入标题" v-model="title"
						onkeyup="this.value=this.value.replace(/[, ]/g,'')" />
				</div>
				<span class="head-span">类别：</span>
				<div>
					<a-cascader class="condition" :options="type" placeholder="请选择类别" @change="typeChange"
						v-model="typeId" />
				</div>
				<a-button type="primary" @click="getSystemList" icon="search" style="margin-left: 20px;">
					搜索
				</a-button>
				<a-button type="danger" style="margin-left:20px;" icon="reset" @click="resetAll">
					清空
				</a-button>

			</div>
			<div style="margin-bottom:10px;">
				<a-button type="primary" icon="plus" @click="showModal">
					添加
				</a-button>
				<a-button type="danger" style="margin-left:20px;" icon="delete" @click="patchDelete">
					删除
				</a-button>
				<a-button type="primary" icon="reload" style="margin-left:20px;" @click="getSystemList">
					刷新
				</a-button>
			</div>
			<div>
				<a-table :columns="columns" :data-source="data"
					:row-selection="{ selectedRowKeys: deleteList, onChange: onChange }" :defaultCurrent="6"
					:pagination="pagination" @change="tableChange">
					<span slot="operator" slot-scope="text, record">
						<a @click="editRule(record.key)">编辑</a>
						<a-divider type="vertical" />
						<a @click="deleteRule(record.key)">删除</a>
					</span>
				</a-table>
			</div>
		</a-card>
		<a-modal title="添加" :visible="visible" :confirm-loading="confirmLoading" @ok="handleOk" @cancel="handleCancel"
			width="1000px">
			<table class="scanTable">
				<tr>
					<td class="single">
						<div><span class="spanRed">*</span>标题:</div>
					</td>
					<td class="double">
						<a-input class="scanInput" placeholder="请输入标题" v-model="addTitle" />
					</td>
				</tr>
				<tr>
					<td class="single">
						<div>内容:</div>
					</td>
					<td class="double"><a-textarea v-model="addConetnt" /></td>
				</tr>
				<tr>
					<td class="single">
						<div>文件:</div>
					</td>
					<td class="long">
						<a-input class="small" :disabled="true" v-model="fileName"></a-input>
						<a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader"
							:action="url.importImgUrl" @change="handleImportImg">
							<a-button :size="size" icon="import">选择文件</a-button>
						</a-upload>
					</td>
				</tr>
				<tr>
					<td class="single">
						<div>排序:</div>
					</td>
					<td class="double">
						<a-input-number class="scanInput" placeholder="请输入排序" v-model="addListSort" />
					</td>
				</tr>
				<tr>
					<td class="single">
						<div>类别:</div>
					</td>
					<td class="double">
						<a-cascader class="scanInput" :options="addType" placeholder="请选择类别" @change="addTypeChange"
							v-model="addTypeId" />
					</td>
				</tr>
			</table>
			<template slot="footer" class="floor-footer">
				<a-button @click="handleCancel()">取消</a-button>
				<a-button type="primary" @click="handleOk()">确认</a-button>
			</template>
		</a-modal>
		<a-modal title="编辑" :visible="edit" :confirm-loading="confirmLoading" @ok="editOK" @cancel="editCancel"
			width="1000px">
			<table class="scanTable">
				<tr>
					<td class="single">
						<div><span class="spanRed">*</span>标题:</div>
					</td>
					<td class="double">
						<a-input placeholder="请输入标题" v-model="editTitle" />
					</td>
				</tr>
				<tr>
					<td class="single">
						<div>内容:</div>
					</td>
					<td class="double"><a-textarea v-model="editContent" /></td>
				</tr>
				<tr>
					<td class="single">
						<div>文件:</div>
					</td>
					<td class="long">
						<a-input class="small" style="width:200px" :disabled="true" v-model="fileName"></a-input>
						<a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader"
							:action="url.importImgUrl" @change="handleImportImg">
							<a-button :size="size" icon="import">选择文件</a-button>
						</a-upload>
					</td>
				</tr>
				<tr>
					<td class="single">
						<div>排序:</div>
					</td>
					<td class="double">
						<a-input-number class="scanInput" placeholder="请输入排序" v-model="editListSort" />
					</td>
				</tr>
				<tr>
					<td class="single">
						<div>类别:</div>
					</td>
					<td class="double">
						<a-cascader class="scanInput" :options="editType" placeholder="请选择类别" @change="editTypeChange"
							v-model="editTypeId" />
					</td>
				</tr>
			</table>
			<template slot="footer" class="floor-footer">
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
	} from '@/utils/request';
	import {
		EduListMixin
	} from '@/mixins/EduListMixin';
	import {
		downFile
	} from '@/api/common/manage';

	const IconFont = Icon.createFromIconfontCN({
		scriptUrl: '//at.alicdn.com/t/font_2390461_f6v2cx4wmzq.js',
	});

	const columns = [{
			title: '排序',
			dataIndex: 'sort',
			key: 'sort',
		},
		{
			title: '标题',
			dataIndex: 'title',
			key: 'title',
		},
		{
			title: '类别',
			dataIndex: 'type',
			key: 'type',
		},
		{
			title: '用户姓名',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: '发布时间',
			dataIndex: 'time',
			key: 'time',
		},
		{
			width: '20%',
		},
		{
			title: '操作',
			dataIndex: 'operator',
			width: '12%',
			key: 'operator',
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
				/* 表格数据 */
				data,
				columns,
				deleteList: [],
				/* 按钮大小 */
				size: 'small',
				/* 下拉框数据 */
				type: [],
				typeId: [],
				/* 添加-弹出框数据 */
				ModalText: 'Content of the modal',
				visible: false,
				confirmLoading: false,
				title: '',
				addTitle: '',
				addConetnt: '',
				addListSort: '',
				addType: [],
				addTypeId: [],
				editType: [],
				editTypeId: '',
				edit: false,
				editTitle: '',
				editContent: '',
				editListSort: '',
				editId: '',
				fileName: '',
				fileUrl: '',
				fileSize: '',
				url: {
					list: '/dorm/image/impotrColl',
					importImgUrl: window._CONFIG['domianURL'] + '/dorm/image/impotrColl'
				},
			};
		},
		mounted() {
			this.getTypeList();
			this.getSystemList();
		},
		components: {
			IconFont,
		},
		methods: {
			clearAdd() {
				this.addTitle = '';
				this.addConetnt = '';
				this.addListSort = '';
				this.addTypeId = [];
			},
			onChange(selectedRowKeys) {
				this.deleteList = selectedRowKeys;
			},
			showModal() {
				this.clearAdd();
				this.visible = true;
			},
			handleOk(e) {
				this.confirmLoading = true;
				axios({
					url: 'dorm/news/addNews',
					method: 'post',
					params: {
						"title": this.addTitle,
						"content": this.addConetnt,
						"listSort": this.addListSort,
						"typeId": this.addTypeId[0],
						"fileUrl": this.fileUrl,
						"fileSize": this.fileSize,
						"fileName": this.fileName
					}
				}).then(res => {
					this.$message.success(res.message);
					this.visible = false;
					this.getSystemList();
					this.confirmLoading = false;
				}).catch(err => {
					this.$message.warning("此处有异常");
				})
			},
			handleCancel(e) {
				this.visible = false;
			},
			tableChange(pagination, filters, sorter) {
				this.pagination.current = pagination.current;
				this.pagination.pageSize = pagination.pageSize;
			},
			getTypeList() {
				axios({
					url: 'dorm/news/queryByName',
					method: 'post',
					params: {
						"name": ''
					}
				}).then(res => {

					this.type.splice(0, this.type.length);
					this.addType.splice(0, this.addType.length);
					this.editType.splice(0, this.editType.length);
					for (let type of res.result) {
						this.type.push({
							value: type.id,
							label: type.typeName
						});
						this.addType.push({
							value: type.id,
							label: type.typeName
						});
						this.editType.push({
							value: type.id,
							label: type.typeName
						});
					}
				}).catch(err => {
					this.$message.warning("此处有异常");
				})
			},
			typeChange(value) {
				if (value.length == 0) {
					this.typeId = [];
					return;
				}
				this.typeId = [value[0]];
			},
			addTypeChange(value) {
				if (value.length == 0) {
					this.addTypeId = []
					return;
				}
				this.addTypeId = [value[0]];
			},
			editTypeChange(value) {
				if (value.length == 0) {
					return;
				}
				this.editTypeId = [value[0]];
			},
			getSystemList() {
				this.deleteList = []
				let typeId = this.typeId.length == 0 ? '' : this.typeId[0];
				axios({
					url: 'dorm/news/queryNewsByName',
					method: 'post',
					params: {
						"title": this.title,
						"typeId": typeId
					}
				}).then(res => {

					data.splice(0, data.length);
					for (let system of res.result) {
						data.push({
							key: system.id,
							sort: system.listSort,
							title: system.title,
							type: system.typeName,
							name: system.createUserName,
							time: this.dateToFormat(new Date(system.createTime * 1000)),
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
					this.pagination.current = 1;
					this.pagination.total = res.result.length;
				}).catch(err => {
					this.$message.warning("此处有异常");
				})
			},
			dateToFormat(date) {
				let str = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ';
				if (date.getHours() < 10) {
					str += '0' + date.getHours();
				} else {
					str += date.getHours();
				}
				str += ':'
				if (date.getMinutes() < 10) {
					str += '0' + date.getMinutes();
				} else {
					str += date.getMinutes();
				}
				return str;
			},
			resetAll() {
				this.title = '';
				this.typeId = [];
			},
			deleteRule(id) {
				let re = confirm("确认删除?");
				if (re) {
					axios({
						url: 'dorm/news/deleteNews',
						method: 'post',
						params: {
							"id": id
						}
					}).then(res => {
						this.$message.success(res.message);
						this.getSystemList();
					}).catch(err => {
						this.$message.warning("此处有异常");
					})
				}
			},
			patchDelete() {
				let re = confirm("确认批量删除?");
				if (re) {
					let str = '';
					for (let i = 0; i < this.deleteList.length; i++) {
						str += this.deleteList[i];
						if (i < this.deleteList.length - 1) {
							str += ','
						}
					}
					axios({
						url: 'dorm/news/deleteBatchNews',
						method: 'post',
						params: {
							"ids": str
						}
					}).then(res => {
						this.$message.success(res.message);
						this.getSystemList();
					}).catch(err => {
						this.$message.warning("此处有异常");
					})
				}
			},
			editRule(id) {
				this.editId = id;
				this.fileUrl = '';
				this.fileName = '';
				this.fileSize = '';
				axios({
					url: 'dorm/news/updateNewsMessage',
					method: 'post',
					params: {
						"id": id
					}
				}).then(res => {
					console.log(res);
					this.edit = true;
					this.editTitle = res.result.title;
					this.editContent = res.result.content;
					this.editListSort = res.result.listSort;
					this.editTypeId = [res.result.typeId];
					this.fileName = res.result.fileName;
				}).catch(err => {
					this.$message.warning("此处有异常");
				})
			},
			editOK() {
				axios({
					url: 'dorm/news/updateNews',
					method: 'post',
					params: {
						"id": this.editId,
						"title": this.editTitle,
						"content": this.editContent,
						"listSort": this.editListSort,
						"typeId": this.editTypeId[0],
						"fileUrl": this.fileUrl,
						"fileSize": this.fileSize,
						"fileName": this.fileName
					}
				}).then(res => {
					this.$message.success(res.message);
					this.getSystemList();
					this.edit = false;
				}).catch(err => {
					this.$message.warning("此处有异常");
				})
			},
			editCancel() {
				this.edit = false;
			},
			handleImportImg(info) {
				if (info.file.status !== 'uploading') {
					console.log(info);
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
		},
	};
</script>

<style scoped>
	.top {
		margin-bottom:10px;
		display: flex;
		align-items: center;
	}

	.head-span {
		margin: 0 10px;
		text-align: right;
	}
</style>