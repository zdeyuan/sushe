<template>
	<div >
		<a-card :bordered="false">
			<div class="content-head">
				

				<!-- <div style="width: 120px;"></div> -->

				<div class="top">
					<div class="head-label">
						<span class="head-span">资产名称</span>
						<a-input class="condition"  v-model="assetName" onkeyup="this.value=this.value.replace(/[, ]/g,'')" />
					</div>
					
					<div class="head-label">
						<span class="head-span">资产类别</span>
						<a-cascader class="condition" :options="type" placeholder="请选择资产类别" v-model="typeId" />
					</div>
					
					<div class="head-label">
						<span class="head-span">资产状态</span>
						<a-cascader class="condition" :options="state" placeholder="" v-model='stateId' />
					</div>
					<a-button type="primary" @click="getAsset" icon="search" style="margin-left: 20px;">
						搜索
					</a-button>
					<a-button type="danger" @click="resetAll" style="margin-left: 20px;">
						清空
					</a-button>
				</div>
				<div>
					
				</div>
			</div>
			<div style="margin-bottom:10px;">
				<!-- <a-button type="primary" @click="changeSuam" icon="export" style="margin-right:10px;">
					导出
				</a-button> -->
				<a-button type="primary"  icon="reload" @click="getAsset">
					刷新
				</a-button>
			</div>
			<div class="table-useful">
				<a-table :columns="columns" :data-source="data" :defaultCurrent="6" :pagination="pagination"
					@change="tableChange">
					<span slot="operator" slot-scope="text, record">
						<a @click="showModal(record.key)">查看</a>
					</span>
				</a-table>
			</div>
		</a-card>
		<a-modal title="查看" :visible="show" :confirm-loading="confirmLoading" @cancel="showCancel" width="872px">
			<table class="scanTable">
				<tr>
					<td class="single">
						<div>资产名称:</div>
					</td>
					<td class="long">
						<a-input :disabled="true" style="width:200px" class="scanInput" placeholder="请输入资产名称" v-model="editName"></a-input>
					</td>
				</tr>
				<tr>
					<td class="single">
						<div>资产个数:</div>
					</td>
					<td class="long">
						<a-input-number :disabled="true" style="width:200px" class="scanInput" placeholder="请输入资产个数" v-model="editNum">
						</a-input-number>
					</td>
				</tr>
				<tr>
					<td class="single">
						<div>描述说明:</div>
					</td>
					<td class="long">
						<a-input :disabled="true" class="scanInput" placeholder="请输入描述说明" v-model="editDetail">
						</a-input>
					</td>
				</tr>
				<tr>
					<td class="single">
						<div>图片:</div>
					</td>
					<td class="long">
						<img :src='fileName' />
						<!-- <a-input class="small" :disabled="true" v-model="fileName"></a-input> -->
					</td>
				</tr>
				<tr>
					<td class="single">
						<div>排序:</div>
					</td>
					<td class="long">
						<a-input-number :disabled="true" style="width:200px" class="scanInput" placeholder="请输入排序" v-model="editListSort">
						</a-input-number>
					</td>
				</tr>
				<tr>
					<td class="single">
						<div>资产类别:</div>
					</td>
					<td class="long">
						<a-cascader :disabled="true" class="small" :options="editType" placeholder="请选择资产类别"
							v-model="editTypeId" />
					</td>
				</tr>
				<tr>
					<td class="single">
						<div>状态:</div>
					</td>
					<td class="long">
						<a-cascader :disabled="true" class="small" :options="editState" placeholder="请选择状态"
							v-model="editStateId" />
					</td>
				</tr>
			</table>

			<template slot="footer" class="floor-footer">
				<a-button @click="showCancel">取消</a-button>
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

	const IconFont = Icon.createFromIconfontCN({
		scriptUrl: '//at.alicdn.com/t/font_2390461_vvis3tohqh.js',
	});

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
				stateId: [],
				state: [{
					value: '0',
					label: '未指定',
				}, {
					value: '1',
					label: '正常',
				}, {
					value: '2',
					label: '维修',
				}, {
					value: '3',
					label: '报废',
				}, ],
				typeId: [],
				type: [],
				typeName: '',
				stateName: '',
				/* 表格数据 */
				data: [],
				columns,
				/* 按钮大小 */
				size: 'small',
				/* 下拉框数据 */
				/* 添加-弹出框数据 */
				visible: false,
				confirmLoading: false,
				url: {
					list: '/sys/role/list',
					exportXlsUrl: 'dorm/assetType/export',
					importExcelUrl: 'sys/role/importExcel'
				},
				editState: [{
					value: 0,
					label: '未指定',
				}, {
					value: 1,
					label: '正常',
				}, {
					value: 2,
					label: '维修',
				}, {
					value: 3,
					label: '报废',
				}, ],
				editName: '',
				editDetail: '',
				editNum: '',
				editType: [],
				editId: '',
				editStateId: [],
				editTypeId: [],
				editListSort: '',
				show: false,
				fileName: '',
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
			changeSuam() {
				var arr = []
				let zcType = this.typeId.length == 0 ? '' : this.typeId[0];
				let status = this.stateId.length == 0 ? '' : this.stateId[0];
				arr.push({
					key: "zcName",
					value: this.assetName
				})
				arr.push({
					key: "zcType",
					value: zcType
				})
				arr.push({
					key: "status",
					value: status
				})
				this.handleExportXls('资产查询', arr)
			},
			showModal(id) {
				axios({
					url: 'dorm/suSheLou/updateMessage',
					method: 'post',
					params: {
						"id": id
					}
				}).then(res => {

					this.editName = res.result.zcName;
					this.editDetail = res.result.content;
					this.editNum = res.result.nums;
					this.editListSort = res.result.listSort;
					this.editStateId = [res.result.status];
					this.editTypeId = [parseInt(res.result.zcType)];
					this.fileName = res.result.sourceFile;
					this.show = true;
				}).catch(err => {
					this.$message.warning("获取该资产信息失败");
				})
			},
			showOK(e) {
				this.confirmLoading = true;
				setTimeout(() => {
					this.show = false;
					this.confirmLoading = false;
				}, 2000);
			},
			showCancel(e) {
				this.show = false;
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

					this.type.length = 0;
					this.editType.splice(0, this.editType.length);
					for (let type of res.result) {
						this.type.push({
							value: type.id,
							label: type.typeName
						});
						this.editType.push({
							value: type.id,
							label: type.typeName
						})
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
					url: 'dorm/suSheLou/suSheQueryByName',
					method: 'post',
					params: {
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
							state: this.state[asset.status].label
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
				this.typeName = '';
				this.stateName = '';
			},
		},
	};
</script>

<style lang="less" scoped>
	.top {
		display: flex;
		align-items: center;
		margin: 10px 0;
	}
	.head-label{
		display: flex;
		align-items: center;
	}
	.head-span {
		margin: 0 10px;
		width:100px;
	}
</style>
