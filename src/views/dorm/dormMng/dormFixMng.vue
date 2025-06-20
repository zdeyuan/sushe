<template>
	<div >
		<a-card :bordered="false">
			<div >
				<div class="top">
					<span class="head-span">维修信息：</span>
					<a-input class="condition magin" style="width:200px" placeholder="" v-model="repairMsg" />
					<a-button type="primary" @click="getFixList" icon="search" style="margin-left: 20px;">
						搜索
					</a-button>
					<a-modal title="添加宿舍维修" :visible="visible" :confirm-loading="confirmLoading" @ok="handleOk"
						@cancel="handleCancel" :width="900">
						<table class="scanTable">
							<tr>
								<td class="single">维修信息:</td>
								<td class="long">
									<a-input class="scanInput" placeholder="请输入维修信息" v-model="addName"></a-input>
								</td>
							</tr>
							<tr>
								<td class="single">维修内容:</td>
								<td class="long">
									<textarea v-model="addContent" class="area"></textarea>
								</td>
							</tr>
							<tr>
								<td class="single">维修时间:</td>
								<td class="long">
									<DatePickByCN
									      v-model="addTime"
									      placeholder="请选择维修时间"
									    />
								</td>
							</tr>
						</table>
						<template slot="footer">
							<a-button  @click="handleCancel()">取消</a-button>
							<a-button type="primary" @click="handleOk()">确认</a-button>
						</template>
					</a-modal>
					
				</div>

			</div>
			<a-button type="primary" icon="arrow-left" @click="$router.go(-1);" style="margin-right:10px;">
				返回
			</a-button>
			<a-button type="primary" @click="showModal" icon="plus" style="margin-right:20px;">
				添加
			</a-button>
			<a-button type="primary" icon="reload" @click="getFixList" style="margin-right: 20px;">
				刷新
			</a-button>
			<div class="table-useful">
				<a-table :columns="columns" :data-source="data" :defaultCurrent="6" :pagination="pagination"
					@change="tableChange">
					<span slot="operator" slot-scope="text, record">
						<a   @click="showEdit(record.key)">编辑</a>
						<a-divider type="vertical" />
						<a  @click="deleteFix(record.key)">删除</a>
					</span>
				</a-table>
			</div>
		</a-card>
		<a-modal title="添加宿舍维修" :visible="edit" :confirm-loading="confirmLoading" @cancel="editCancel" :width="900">
			<table class="scanTable">
				<tr>
					<td class="single">维修信息:</td>
					<td class="long">
						<a-input class="scanInput" placeholder="请输入维修信息" v-model="addName"></a-input>
					</td>
				</tr>
				<tr>
					<td class="single">维修内容:</td>
					<td class="long">
						<textarea v-model="addContent" class="area"></textarea>
					</td>
				</tr>
				<tr>
					<td class="single">维修时间:</td>
					<td class="long">
						<DatePickByCN
						      v-model="addTime"
						      placeholder="请选择维修时间"
						    />
						<!-- <input class="scanInput" v-model="addTime" type="date"></input> -->
					</td>
				</tr>
			</table>
			<template slot="footer">
				<a-button @click="editCancel">取消</a-button>
				<a-button type="primary" @click="editOK">确认</a-button>
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

	const IconFont = Icon.createFromIconfontCN({
		scriptUrl: '//at.alicdn.com/t/font_2390461_vvis3tohqh.js',
	});

	const columns = [{
			title: '宿舍',
			dataIndex: 'dorm',
			key: 'dorm',
		},
		{
			title: '维修信息',
			dataIndex: 'message',
			key: 'message',
		},
		{
			title: '维修时间',
			dataIndex: 'time',
			key: 'time',
		},
		{
			title: '登记人',
			dataIndex: 'djr',
			key: 'djr',
		},
		{
			title: '登记时间',
			dataIndex: 'djsj',
			key: 'djsj ',
		},
		{
			title: '操作',
			dataIndex: 'operator',
			key: 'operator',
			align:'center',
			scopedSlots: {
				customRender: 'operator'
			},
		},
	];

	let data = [];


	export default {
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
				/* 按钮大小 */
				size: 'small',
				/* 下拉框数据 */
				/* 添加-弹出框数据 */
				visible: false,
				confirmLoading: false,
				addName: '',
				addContent: '',
				addTime: '',
				editId: '',
				edit: false,
				repairMsg:''
			};
		},
		mounted() {
			this.getFixList();
		},
		components: {
			IconFont,
		},
		methods: {
			showModal() {
				this.addName = '';
				this.addContent = '';
				this.addTime = '';
				this.visible = true;
			},
			handleOk(e) {
				if (this.addName == '' || this.addContent == '' || this.addTime == '') {
					this.$message.warning("请将信息输入完整");
					return;
				}
				axios({
					url: 'dorm/weixiu/addWeiXiu',
					method: 'post',
					params: {
						ssId: sessionStorage.getItem("dormId"),
						title: this.addName,
						content: this.addContent,
						addTime: parseInt(new Date(this.addTime).valueOf() / 1000),
						createUserId: 0,
						createTime: parseInt(new Date().valueOf() / 1000)
					}
				}).then(res => {
					this.$message.success(res.message);
					this.getFixList();
					this.visible = false;
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
			getFixList() {
				console.log(sessionStorage.getItem("dormId"));
				axios({
					url: 'dorm/weixiu/weiXiuTable',
					method: 'post',
					params: {
						ssId: sessionStorage.getItem("dormId"),
						title: this.repairMsg
					}
				}).then(res => {

					data.splice(0, data.length);
					for (let fix of res.result) {
						data.push({
							key: fix.id,
							dorm: fix.fjbm,
							message: fix.title,
							time: this.dateToFormat(new Date(fix.addtime * 1000)),
							djr: '管理员',
							djsj: this.dateToFormat(new Date(fix.createtime * 1000))
						})
					}
					this.pagination.current = 1;
					this.pagination.total = data.length;
				}).catch(err => {
					this.$message.warning("此处有异常");
				})
			},
			dateToFormat(date) {
				let str = date.getFullYear() + '-';
				if (date.getMonth() + 1 < 10) {
					str += '0' + (date.getMonth() + 1);
				} else {
					str += (date.getMonth() + 1);
				}
				str += '-';
				if (date.getDate() < 10) {
					str += '0' + date.getDate();
				} else {
					str += date.getDate();
				}
				return str;
			},
			deleteFix(id) {
				let re = confirm("确认删除?");
				if (re) {
					axios({
						url: 'dorm/weixiu/deleteWeiXiu',
						method: 'post',
						params: {
							id: id
						}
					}).then(res => {
						this.$message.success(res.message);
						this.getFixList();
					}).catch(err => {
						this.$message.warning("此处有异常");
					})
				}
			},
			showEdit(id) {
				axios({
					url: 'dorm/weixiu/getEditInfo',
					method: 'post',
					params: {
						id: id
					}
				}).then(res => {

					this.editId = id;
					this.addName = res.result.title;
					this.addContent = res.result.content;
					this.addTime = this.dateToFormat(new Date(res.result.addtime * 1000));
					this.edit = true;
				}).catch(err => {
					this.$message.warning("此处有异常");
				})
			},
			editOK() {
				axios({
					url: 'dorm/weixiu/editWeiXiu',
					method: 'post',
					params: {
						id: this.editId,
						ssId: sessionStorage.getItem("dormId"),
						title: this.addName,
						content: this.addContent,
						addTime: parseInt(new Date(this.addTime).valueOf() / 1000),
						createUserId: 0,
						createTime: parseInt(new Date().valueOf() / 1000)
					}
				}).then(res => {
					this.$message.success(res.message);
					this.getFixList();
					this.edit = false;
				}).catch(err => {
					this.$message.warning("此处有异常");
				})
			},
			editCancel() {
				this.edit = false;
			}
		},
	};
</script>

<style lang="less" scoped>
	.area {
		resize: none;
		width: 650px;
		height: 200px;
		border: 1px solid #D9D9D9;
		outline-color: #D9D9D9;
	}
	.magin{
		margin-right: 10px;
	}
	.top {
		display: flex;
		align-items: center;
		margin: 10px 0;
	}
	
	.head-span {
		margin: 0 10px;
	}
</style>
