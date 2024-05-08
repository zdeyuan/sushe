<template>
	<div style="background:#E9EDF6; padding:30px">
		<div class="content-title">
			宿舍资产管理
		</div>
		<div class="pageContentBox">
			<div class="headTop">资产管理 > 宿舍选择 ><span class="notTop">宿舍资产管理</span></div>
			<div class="content-head">
				<div>
					<a-button :size="size" class="content-button button-lightgreen"
						style="font-size:16px;width:88px;height:34px;background-color:#3a3aff " @click="addAsset">
						<icon-font type="icontianjia" style="color: #FFFFFF;" />
						添加
					</a-button>
					<a-modal title="添加宿舍资产" :visible="add" :confirm-loading="confirmLoading" @cancel="addCancel"
						width="872px">
						<table class="scanTable">
							<tr>
								<td class="single">
									<div>资产名称:</div>
								</td>
								<td class="long">
									<a-input class="scanInput" placeholder="请输入资产名称" v-model="addName"></a-input>
								</td>
							</tr>
							<tr>
								<td class="single">
									<div>资产个数:</div>
								</td>
								<td class="long">
									<a-input-number class="scanInput" placeholder="请输入资产个数" v-model="addNum">
									</a-input-number>
								</td>
							</tr>
							<tr>
								<td class="single">
									<div>描述说明:</div>
								</td>
								<td class="long">
									<textarea v-model="addDetail"></textarea>
								</td>
							</tr>
							<tr>
								<td class="single">
									<div>图片:</div>
								</td>
								<td class="long">
									<a-input class="small" :disabled="true" v-model="fileName"></a-input>
									<a-upload name="file" :showUploadList="false" :multiple="false"
										:headers="tokenHeader" :action="url.importImgUrl" @change="handleImportImg">
										<a-button :size="size" icon="import">选择文件</a-button>
									</a-upload>
								</td>
							</tr>
							<tr>
								<td class="single">
									<div>排序:</div>
								</td>
								<td class="long">
									<a-input-number class="scanInput" placeholder="请输入排序" v-model="addListSort">
									</a-input-number>
								</td>
							</tr>
							<tr>
								<td class="single">
									<div>资产类别:</div>
								</td>
								<td class="long">
									<a-cascader class="small" :options="addType" placeholder="请选择资产类别"
										v-model="addTypeId" />
								</td>
							</tr>
							<tr>
								<td class="single">
									<div>状态:</div>
								</td>
								<td class="long">
									<label v-for="(item) in state"> {{ item.label }}
										<input type="radio" name="approveResult" :value="item.value"
											v-model="checkedValue">
									</label>
								</td>
							</tr>
						</table>

						<template slot="footer" class="floor-footer">
							<a-button type="primary" style="background-color:#028be2;color:#ffffff;font-weight:bold"
								@click="addOK()">确定</a-button>
							<a-button style="background-color:#999999;color:#ffffff;font-weight:bold"
								@click="addCancel()">取消</a-button>
						</template>
					</a-modal>
					<a-button :size="size" class="content-button button-skyblue button-after"
						style="font-size:16px;width:88px;height:34px;background-color:#3a3aff " @click="getAsset()">
						<icon-font type="iconxindongfang-shuaxintubiao" style="color: #FFFFFF;" />
						刷新
					</a-button>
				</div>

				<div style="width: 120px;"></div>

				<div>
					<span class="head-span">资产名称</span>
					<a-input class="condition" placeholder="请输入名称" v-model="assetName" />
				</div>

				<div>
					<span class="head-span">资产类别</span>
					<a-cascader class="condition" :options="type" placeholder="请选择资产类别" v-model="typeId" />
				</div>

				<div>
					<span class="head-span">资产状态</span>
					<a-cascader class="condition" :options="state" placeholder="请选择资产状态" v-model="stateId" />
				</div>

				<div>
					<a-button :size="size" class="content-button button-blue"
						style="font-size:16px;width:88px;height:34px;background-color:#1AE642 " @click="getAsset()">
						<icon-font type="iconsousuo" style="color: #FFFFFF;" />
						搜索
					</a-button>

					<a-button :size="size" class="content-button button-orange button-after"
						style="font-size:16px;width:88px;height:34px;background-color:#E61A1A " @click="resetAll()">
						<icon-font type="iconqingkong1" style="color: #FFFFFF;" />
						清空
					</a-button>
				</div>
			</div>
			<div>
				<a-table :columns="columns" :data-source="data" :defaultCurrent="6" :pagination="pagination"
					@change="tableChange">
					<span slot="operator" slot-scope="text, record">
						<a style="font-size:18px;font-weigth:bold;color: #0098f8; border-bottom: 1px solid #0098f8;"
							@click="editAsset(record.key)">编辑</a>
						<span> | </span>
						<a style="font-size:18px;font-weigth:bold;color: #fc8950;border-bottom: 1px solid #fc8950;"
							@click="deleteAsset(record.key)">删除</a>
					</span>
				</a-table>
			</div>
		</div>
		<a-modal title="编辑宿舍资产" :visible="edit" :confirm-loading="confirmLoading" @cancel="editCancel" width="872px">
			<table class="scanTable">
				<tr>
					<td class="single">
						<div>资产名称:</div>
					</td>
					<td class="long">
						<a-input class="scanInput" placeholder="请输入资产名称" v-model="editName"></a-input>
					</td>
				</tr>
				<tr>
					<td class="single">
						<div>资产个数:</div>
					</td>
					<td class="long">
						<a-input-number class="scanInput" placeholder="请输入资产个数" v-model="editNum"></a-input-number>
					</td>
				</tr>
				<tr>
					<td class="single">
						<div>描述说明:</div>
					</td>
					<td class="long">
						<textarea v-model="editDetail"></textarea>
					</td>
				</tr>
				<tr>
					<td class="single">
						<div>图片:</div>
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
					<td class="long">
						<a-input-number class="scanInput" placeholder="请输入排序" v-model="editListSort"></a-input-number>
					</td>
				</tr>
				<tr>
					<td class="single">
						<div>资产类别:</div>
					</td>
					<td class="long">
						<a-cascader class="small" :options="editType" placeholder="请选择资产类别" v-model="editTypeId" />
					</td>
				</tr>
				<tr>
					<td class="single">
						<div>状态:</div>
					</td>
					<td class="long">
						<label v-for="(item) in state"> {{ item.label }}
							<input type="radio" name="approveResult" :value="item.value" v-model="checkedValue">
						</label>
					</td>
				</tr>
			</table>

			<template slot="footer" class="floor-footer">
				<a-button style="background-color:#028be2;color:#ffffff;font-weight:bold" type="primary"
					@click="editOK()">确定</a-button>
				<a-button style="background-color:#999999;color:#ffffff;font-weight:bold" @click="editCancel()">取消
				</a-button>
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
	} from "@/utils/request"
	import {
		EduListMixin
	} from '@/mixins/EduListMixin';
	import {
		downFile
	} from '@/api/manage'

	const IconFont = Icon.createFromIconfontCN({
		scriptUrl: '//at.alicdn.com/t/font_2390461_vvis3tohqh.js',
	});

	let deleteList = [];

	const columns = [{
			title: '资产名称',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: '宿舍',
			dataIndex: 'dorm',
			key: 'dorm',
		},
		{
			title: '资产个数',
			dataIndex: 'num',
			key: 'num',
		},
		{
			title: '资产类别',
			dataIndex: 'type',
			key: 'type',
		},
		{
			title: '资产状态',
			dataIndex: 'state',
			key: 'state',
		},
		{
			width: '35%',
		},
		{
			title: '操作',
			dataIndex: 'operator',
			key: 'operator',
			scopedSlots: {
				customRender: 'operator'
			},
		},
	];

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
				assetName: '',
				state: [{
					value: 1,
					label: '正常',
				}, {
					value: 2,
					label: '维修',
				}, {
					value: 3,
					label: '报废',
				}, ],
				stateId: [],
				checkedValue: '',
				typeId: [],
				type: [],
				/* 表格数据 */
				data: [],
				columns,
				/* 按钮大小 */
				size: 'small',
				/* 下拉框数据 */
				/* 添加-弹出框数据 */
				add: false,
				confirmLoading: false,
				addName: '',
				addType: [],
				addTypeId: [],
				addListSort: '',
				addNum: '',
				addDetail: '',

				editName: '',
				editDetail: '',
				editNum: '',
				editType: [],
				editTypeId: [],
				editId: '',
				edit: false,
				editListSort: '',
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
			this.getAssetType();
			this.getAsset();
		},
		components: {
			IconFont,
		},
		methods: {
			addAsset() {
				this.addName = '';
				this.addNum = '';
				this.addDetail = '';
				this.addListSort = '';
				this.addTypeId = [];
				this.dormId = [];
				this.buildId = [];
				this.schoolId = [];
				this.checkedValue = '';
				this.fileName = '';
				this.fileUrl = '';
				this.fileSize = '';
				this.add = true;
			},
			addOK(e) {
				if (this.addName == '' || this.addNum == '' || this.addDetail == '' || this.addListSort == '' ||
					this.checkedValue == '' || this.addTypeId.length == 0) {
					this.$message.warning("请将信息输入完整");
					return;
				}
				this.confirmLoading = true;
				axios({
					url: 'dorm/suSheLou/addAssert',
					method: 'post',
					params: {
						"ssId": sessionStorage.getItem("dormId"),
						"zcName": this.addName,
						"nums": this.addNum,
						"listSort": this.addListSort,
						"zcType": this.addTypeId[0],
						"status": this.checkedValue,
						"content": this.addDetail,
						"imageUrl": this.fileUrl,
						"imageSize": this.fileSize,
						"imageName": this.fileName
					}
				}).then(res => {
					this.$message.success(res.message);
					this.getAsset();
					this.add = false;
					this.confirmLoading = false;
				}).catch(err => {
					this.$message.warning("添加资产失败");
				})
			},
			addCancel(e) {
				this.add = false;
			},
			tableChange(pagination, filters, sorter) {
				this.pagination.current = pagination.current;
				this.pagination.pageSize = pagination.pageSize;
			},
			// 获取资产类型列表
			getAssetType() {
				axios({
					url: 'dorm/assetType/assetMessage',
					method: 'post',
					params: {

					}
				}).then(res => {
					this.type.splice(0, this.type.length);
					this.addType.splice(0, this.addType.length);
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
					this.$message.warning("获取资产类型列表失败");
				})
			},
			// 查询
			getAsset() {
				let zcType = this.typeId.length == 0 ? '' : this.typeId[0];
				let status = this.stateId.length == 0 ? '' : this.stateId[0];

				axios({
					url: 'dorm/suSheLou/suSheQueryBySsId',
					method: 'post',
					params: {
						"ssId": sessionStorage.getItem("dormId"),
						"zcName": this.assetName,
						"zcType": zcType,
						"status": status
					}
				}).then(res => {

					this.data.length = 0;
					for (let asset of res.result) {
						this.data.push({
							key: asset.id,
							name: asset.zcName,
							dorm: asset.fjbm,
							num: asset.nums,
							type: asset.typeName,
							state: this.state[asset.status - 1].label
						})
					}
					this.pagination.current = 1;
					this.pagination.total = res.result.length;
				}).catch(err => {
					this.$message.warning("获取资产列表失败");
				})
			},
			/* 清空 */
			resetAll() {
				this.assetName = '';
				this.stateId = [];
				this.typeId = [];
			},
			deleteAsset(id) {
				let re = confirm("确认删除?");
				if (re) {
					axios({
						url: 'dorm/suSheLou/deleteAssert',
						method: 'post',
						params: {
							"id": id
						}
					}).then(res => {
						this.$message.success(res.message);
						this.getAsset();
					}).catch(err => {
						this.$message.warning("删除失败");
					})
				}
			},
			editAsset(id) {
				this.editId = id;
				this.fileUrl = '';
				this.fileName = '';
				this.fileSize = '';
				axios({
					url: 'dorm/suSheLou/updateMessage',
					method: 'post',
					params: {
						"id": id
					}
				}).then(res => {
					console.log(res);
					this.editName = res.result.zcName;
					this.editDetail = res.result.content;
					this.editNum = res.result.nums;
					this.editListSort = res.result.listSort;
					this.checkedValue = res.result.status;
					this.editTypeId = [parseInt(res.result.zcType)];
					this.fileName = res.result.fileName;
					this.fileUrl = res.result.sourceFile;
					this.fileSize = res.result.fileSize;
					this.edit = true;
				}).catch(err => {
					console.log(err);
					this.$message.warning("获取该资产信息失败");
				})
			},
			editOK() {
				if (this.editName == '' || this.editNum == '' || this.editListSort == '' ||
					this.editTypeId.length == 0 || this.checkedValue == 0 || this.editDetail == '') {
					this.$message.warning("请将信息输入完整");
					return;
				}
				axios({
					url: 'dorm/suSheLou/updateAssert',
					method: 'post',
					params: {
						"id": this.editId,
						"zcName": this.editName,
						"nums": this.editNum,
						"listSort": this.editListSort,
						"zcType": this.editTypeId[0],
						"status": this.checkedValue,
						"content": this.editDetail,
						"imageName": this.fileName,
						"imageUrl": this.fileUrl,
						"imageSize": this.fileSize
					}
				}).then(res => {
					this.$message.success(res.message);
					this.getAsset();
					this.edit = false;
				}).catch(err => {
					this.$message.warning("修改资产失败");
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

<style>
	textarea {
		resize: none;
		width: 650px;
		height: 200px;
		border: 1px solid #D9D9D9;
		outline: #D9D9D9;
		outline-width: 1px;
	}
</style>
