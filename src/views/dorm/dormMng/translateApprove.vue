<template>
	<div>
		<a-card :bordered="false">
			<div class="top">
				<span class="head-span">学生姓名：</span>
				<div>
					<a-input class="condition" placeholder="请输入姓名" v-model="name"
						onkeyup="this.value=this.value.replace(/[, ]/g,'')" />
				</div>

				<span class="head-span">留宿类型：</span>
				<div>
					<a-select class="condition" :options="type" placeholder="请选择类型" v-model="typeId" />
				</div>
				<a-button type="primary" icon="search" style="margin-left:20px" @click="getTranslateList">
					搜索
				</a-button>
				<a-button type="danger" icon="reset" style="margin-left:20px" @click="clearAll">
					清空
				</a-button>
			</div>
			<a-button type="primary" icon="plus" v-if="$hasPer(['student'])" style="margin-left:20px;margin-bottom:10px;" @click="showType='add'">
				留宿申请
			</a-button>
			<a-button type="primary" v-else icon="upload" style="margin-left:20px" @click="changeSuam">
				导出
			</a-button>
			
			<a-button type="primary" icon="reload" style="margin-left:20px" @click="getTranslateList">
				刷新
			</a-button>
			<div>
				<a-table :columns="columns" :data-source="data" :defaultCurrent="6" :pagination="pagination"
					@change="tableChange">
					<span slot="operator" slot-scope="text, record">
						<a @click="showTrans(record.key)">查看</a>
						<a-divider type="vertical" />
						<a 	@click="showModal(record.key)" v-if="$hasPer(['system'])">审核</a>
					</span>
				</a-table>
			</div>
			<a-modal title="查看" :visible="show" :confirm-loading="confirmLoading" @cancel="showCancel"
				width="872px">
				<table class="scanTable">
					<tr>
						<td class="single">院系名称:</td>
						<td class="long">
							<a-input :disabled="true" class="scanInput" v-model="addDepart"></a-input>
						</td>
					</tr>
					<tr>
						<td class="single">专业名称:</td>
						<td class="long">
							<a-input :disabled="true" class="scanInput" v-model="addMajor"></a-input>
						</td>
					</tr>
					<tr>
						<td class="single">班级名称:</td>
						<td class="long">
							<a-input :disabled="true" class="scanInput" v-model="addClazz"></a-input>
						</td>
					</tr>
					<tr>
						<td class="single">学号:</td>
						<td class="long">
							<a-input :disabled="true" class="scanInput" v-model="addStuId"></a-input>
						</td>
					</tr>
					<tr>
						<td class="single">姓名:</td>
						<td class="long">
							<a-input :disabled="true" class="scanInput" v-model="addName"></a-input>
						</td>
					</tr>
					<tr>
						<td class="single">宿舍名称:</td>
						<td class="long">
							<a-input :disabled="true" class="scanInput" v-model="addDorm"></a-input>
						</td>
					</tr>
					<tr>
						<td class="single">留宿类型:</td>
						<td class="long">
							<a-select class="condition" :options="type" placeholder="请选择类型" v-model="addType" />
						</td>
					</tr>
					<tr>
						<td class="single">申请时间:</td>
						<td class="long">
							<a-input :disabled="true" class="scanInput" v-model="addTime"></a-input>
						</td>
					</tr>
					<tr>
						<td class="single">留宿原因:</td>
						<td class="long">
							<a-input :disabled="true" class="scanInput" v-model="addCause"></a-input>
						</td>
					</tr>
					<tr>
						<td class="single">审核状态:</td>
						<td class="long">
							<label v-for="(item) in radioName"> {{ item.value }}
								<input :disabled="true" type="radio" name="approveResult"
									:value="item.index" v-model="checkedValue">
							</label>
						</td>
					</tr>
					<tr>
						<td class="single">不通过原因:</td>
						<td class="long">
							<textarea :disabled="true" v-model="refuseCause"></textarea>
						</td>
					</tr>
				</table>
				<template slot="footer">
					<a-button  @click="showCancel" class="buttonCancel">取消</a-button>
				</template>
			</a-modal>
			<a-modal title="审核" :visible="add" :confirm-loading="confirmLoading" @cancel="addCancel" width="872px">
				<table class="scanTable">
					<tr>
						<td class="single">院系名称:</td>
						<td class="long">
							<a-input :disabled="true" class="scanInput" v-model="addDepart"></a-input>
						</td>
					</tr>
					<tr>
						<td class="single">专业名称:</td>
						<td class="long">
							<a-input :disabled="true" class="scanInput" v-model="addMajor"></a-input>
						</td>
					</tr>
					<tr>
						<td class="single">班级名称:</td>
						<td class="long">
							<a-input :disabled="true" class="scanInput" v-model="addClazz"></a-input>
						</td>
					</tr>
					<tr>
						<td class="single">学号:</td>
						<td class="long">
							<a-input :disabled="true" class="scanInput" v-model="addStuId"></a-input>
						</td>
					</tr>
					<tr>
						<td class="single">姓名:</td>
						<td class="long">
							<a-input :disabled="true" class="scanInput" v-model="addName"></a-input>
						</td>
					</tr>
					<tr>
						<td class="single">宿舍名称:</td>
						<td class="long">
							<a-input :disabled="true" class="scanInput" v-model="addDorm"></a-input>
						</td>
					</tr>
					<tr>
						<td class="single">留宿类型:</td>
						<td class="long">
							<a-input :disabled="true" class="scanInput" v-model="addType"></a-input>
						</td>
					</tr>
					<tr>
						<td class="single">申请时间:</td>
						<td class="long">
							<a-input :disabled="true" class="scanInput" v-model="addTime"></a-input>
						</td>
					</tr>
					<tr>
						<td class="single">留宿原因:</td>
						<td class="long">
							<a-input :disabled="true" class="scanInput" v-model="addCause"></a-input>
						</td>
					</tr>
					<tr>
						<td class="single">审核状态:</td>
						<td class="long">
							<label v-for="(item) in radioName"> {{ item.value }}
								<input type="radio" name="approveResult" :value="item.index" v-model="checkedValue">
							</label>
						</td>
					</tr>
					<tr>
						<td class="single">不通过原因:</td>
						<td class="long">
							<textarea v-model="refuseCause"></textarea>
						</td>
					</tr>
				</table>

				<template slot="footer">
					<a-button @click="addCancel()" class="buttonCancel">取消</a-button>
					<a-button type="primary" @click="addOK()" class="buttonOk">确认</a-button>
				</template>
			</a-modal>
		</a-card>
		<translateApproveEdit v-if="showType == 'add'" ref="translateApproveEdit" @onOk="editOk" @onCancel="editCancel"> </translateApproveEdit>
	</div>


</template>

<script>
	import {
		Icon
	} from 'ant-design-vue';
	import translateApproveEdit from './base/translateApproveEdit';
	import {
		axios
	} from '@/utils/request';
	import {
		EduListMixin
	} from '@/mixins/EduListMixin';

	const IconFont = Icon.createFromIconfontCN({
		scriptUrl: '//at.alicdn.com/t/font_2390461_f6v2cx4wmzq.js',
	});

	const columns = [{
			title: '院系',
			dataIndex: 'depart',
			key: 'depart',
		},
		{
			title: '专业',
			dataIndex: 'major',
			key: 'major',
		},
		{
			title: '班级',
			dataIndex: 'class',
			key: 'class',
		},
		{
			title: '学号',
			dataIndex: 'XH',
			key: 'XH',
		},
		{
			title: '姓名',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: '宿舍名称',
			dataIndex: 'dorm',
			key: 'dorm',
		},
		{
			title: '留宿类型',
			dataIndex: 'type',
			key: 'type',

		},
		{
			title: '留宿开始时间',
			dataIndex: 'stime',
			key: 'stime',
		},
		{
			title: '留宿结束时间',
			dataIndex: 'etime',
			key: 'etime',
		},
		{
			title: '审核状态',
			dataIndex: 'state',
			key: 'state',
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
		components: {
		  translateApproveEdit,
		},
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
				showType: 'table',
				applyObj:{},
				columns,
				/* 按钮大小 */
				size: 'small',
				/* 下拉框数据 */
				type: [{
					value: 0,
					label: '暑假留宿',
				}, {
					value: 1,
					label: '寒假留宿'
				}],
				typeId: [],
				/* 添加-弹出框数据 */
				add: false,
				confirmLoading: false,
				name: '',
				checkedValue: '',
				radioName: [{
					index: 1,
					value: '不通过',
				}, {
					index: 2,
					value: '通过'
				}],
				addDepart: '',
				addMajor: '',
				addClazz: '',
				addStuId: '',
				addName: '',
				addDorm: '',
				addType: '',
				addTime: '',
				addCause: '',
				addId: '',
				refuseCause: '',
				url: {
					list: '/sys/role/list',
					exportXlsUrl: 'dorm/change/export',
					importExcelUrl: 'sys/role/importExcel'
				},
				show: false,
			};
		},
		components: {
			IconFont,
		},
		mounted() {
			this.getTranslateList();
		},
		methods: {
			applyDorm(){
				this.apply=true;
			},
			// 留宿时间
			applyChange(val){
				this.applyObj.stime=val[0];
				this.applyObj.etime=val[1]
			},
			changeSuam() {
				var arr = []
				let type = this.typeId.length == 0 ? '' : this.typeId[0];
				arr.push({
					key: "xm",
					value: this.name
				})
				arr.push({
					key: "type",
					value: type
				})
				this.handleExportXls('留宿审核', arr)
			},
			editCancel() {
			  this.showType = 'table';
			},
			/**
			 * @msg: 编辑页成功事件
			 */
			editOk() {
			  this.showType = 'table';
			  this.$refs.hqStuPositionTable.reload();
			},
			showModal(id) {
				this.addId = id;
				axios({
					url: 'dorm/change/selectById',
					method: 'post',
					params: {
						id: id
					}
				}).then(res => {

					this.addDepart = res.result[0].yxmc;
					this.addMajor = res.result[0].zymc;
					this.addClazz = res.result[0].xzbmc;
					this.addStuId = res.result[0].xh;
					this.addName = res.result[0].xm;
					this.addDorm = res.result[0].fjbm;
					this.addType = this.type[res.result[0].type].label;
					this.addTime = this.dateToFormat(new Date(res.result[0].audittime * 1000));
					this.addCause = res.result[0].remark;
					this.checkedValue = '';
					this.refuseCause = '';
					this.add = true;
				}).catch(err => {
					this.$message.warning("此处有异常");
				})
			},
			addOK(e) {
				this.confirmLoading = true;
				if (this.checkedValue == '') {
					this.$message.warning("请选择审核结果");
					return;
				}
				if (this.checkedValue == 1 && this.refuseCause == '') {
					this.$message.warning("请输入不通过原因");
					return;
				}
				axios({
					url: 'dorm/change/audit',
					method: 'post',
					params: {
						id: this.addId,
						auditStatus: this.checkedValue - 1,
						auditRemark: this.refuseCause,
					}
				}).then(res => {
					this.$message.success(res.message);
					this.getTranslateList();
					this.add = false;
					this.confirmLoading = false;
				}).catch(err => {
					this.$message.warning("此处有异常");
				})
			},
			addCancel(e) {
				this.add = false;
			},
			onChange(value) {
				console.log(value);
			},
			tableChange(pagination, filters, sorter) {
				this.pagination.current = pagination.current;
				this.pagination.pageSize = pagination.pageSize;
			},
			getTranslateList() {
				let type = this.typeId.length == 0 ? '' : this.typeId[0];
				axios({
					url: 'dorm/change/lodgingAuditTable',
					method: 'post',
					params: {
						xm: this.name,
						type: type
					}
				}).then(res => {
					let status = ['不通过', '通过'];
					data.splice(0, data.length);
					for (let approve of res.result) {
						data.push({
							key: approve.id,
							depart: approve.yxmc,
							major: approve.zymc,
							class: approve.xzbmc,
							XH: approve.xh,
							name: approve.xm,
							dorm: approve.fjbm,
							type: this.type[approve.type].label,
							stime: this.dateToFormat(new Date(approve.startTime * 1000)),
							etime: this.dateToFormat(new Date(approve.endTime * 1000)),
							state: status[approve.auditStatus]
						})
					}
					this.pagination.current = 1;
					this.pagination.total = data.length;
				}).catch(err => {
					this.$message.warning("此处有异常");
				})
			},
			clearAll() {
				this.typeId = [];
				this.name = '';
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
			showTrans(id) {
				axios({
					url: 'dorm/change/selectById',
					method: 'post',
					params: {
						id: id
					}
				}).then(res => {

					this.addDepart = res.result[0].yxmc;
					this.addMajor = res.result[0].zymc;
					this.addClazz = res.result[0].xzbmc;
					this.addStuId = res.result[0].xh;
					this.addName = res.result[0].xm;
					this.addDorm = res.result[0].fjbm;
					this.addType = this.type[res.result[0].type].label;
					this.addTime = this.dateToFormat(new Date(res.result[0].audittime * 1000));
					this.addCause = res.result[0].remark;
					this.refuseCause = res.result[0].auditremark;
					this.checkedValue = res.result[0].auditStatus + 1;
					this.show = true;
				}).catch(err => {
					this.$message.warning("此处有异常");
				})
			},
			showCancel() {
				this.show = false;
			}
		},
	};
</script>

<style scoped>
	.top {
		padding: 20px;
		padding-top: 0;
		display: flex;
		align-items: center;
	}

	.head-span {
		width: 90px;
		text-align: right;
	}
</style>