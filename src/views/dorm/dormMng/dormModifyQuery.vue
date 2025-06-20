<template>
	<div>
		<div class="pageContentBox">
			<div class="top">

				<span class="head-span">姓名：</span>
				<div>
					<a-input class="condition" placeholder="请输入姓名" v-model="name"
						onkeyup="this.value=this.value.replace(/[, ]/g,'')" />
				</div>
				<div>
					<a-button type="primary" style="margin-left:20px" icon="search" @click="getModifyQuery">
						搜索
					</a-button>
					<a-button type="danger" style="margin-left:20px" @click="resetAll">
						清空
					</a-button>
				</div>
			</div>
			<div>
				<a-table :columns="columns" :data-source="data" :defaultCurrent="6" :pagination="pagination"
					@change="tableChange" class="long-table">
					<span slot="operator" slot-scope="text, record">
						<a @click="upMsg(record)">查看</a>
					</span>
				</a-table>
			</div>
			<a-modal title="查看" :visible="visible" :confirm-loading="confirmLoading" @cancel="handleCancel"
				width='700px'>
				<div class="systemSeeBox">
					<div class="systemReleaseMsg">
						<span class="msgs">
							<a-row>
								<a-col :span='5'>
									<div class="lCount">
										学生：
									</div>
								</a-col>
								<a-col :span='12'>
									<div class="rCount">
										姓名：{{doingMsg.name}} （学号：{{doingMsg.id}}）
									</div>
								</a-col>
							</a-row>
						</span>
						<span class="msgs">
							<a-row>
								<a-col :span='5'>
									<div class="lCount">
										原宿舍：
									</div>
								</a-col>
								<a-col :span='12'>
									<div class="rCount">
										{{doingMsg.oldSchool}} {{doingMsg.oldBuild}} {{doingMsg.oldDorm}}
									</div>
								</a-col>
							</a-row>
						</span>
						<span class="msgs">
							<a-row>
								<a-col :span='5'>
									<div class="lCount">
										申请情况：
									</div>
								</a-col>
								<a-col :span='19'>
									<div class="rCount">
										申请人：{{doingMsg.name}} 申请时间：{{doingMsg.applyTime}}
									</div>
								</a-col>
							</a-row>
						</span>
						<span class="msgs">
							<a-row>
								<a-col :span='5'>
									<div class="lCount">
										审批结果：
									</div>
								</a-col>
								<a-col :span='12'>
									<div class="rCount red">
										{{doingMsg.state}}
									</div>
								</a-col>
							</a-row>
						</span>
						<span class="msgs">
							<a-row>
								<a-col :span='5'>
									<div class="lCount">
										审批情况：
									</div>
								</a-col>
								<a-col :span='19'>
									<div class="rCount">
										审批人：{{doingMsg.approveName}} 审批时间：{{doingMsg.approveTime}}
									</div>
								</a-col>
							</a-row>
						</span>
						<span class="msgs">
							<a-row>
								<a-col :span='5'>
									<div class="lCount">
										新宿舍：
									</div>
								</a-col>
								<a-col :span='12'>
									<div class="rCount">
										{{doingMsg.newSchool}} {{doingMsg.newBuild}}
										{{doingMsg.newDorm == null ? '暂无' : doingMsg.newDorm}}
									</div>
								</a-col>
							</a-row>
						</span>
					</div>
				</div>
				<template slot="footer" class="floor-footer">
					<a-button @click="handleCancel">关闭</a-button>
				</template>
			</a-modal>
		</div>
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
			title: '学号',
			dataIndex: 'id',
			key: 'id',
		},
		{
			title: '姓名',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: '原校区',
			dataIndex: 'oldSchool',
			key: 'oldSchool',
			width: '100px',
		},
		{
			title: '原宿舍楼',
			dataIndex: 'oldBuild',
			key: 'oldBuild',
			width: '100px',
		},
		{
			title: '原宿舍',
			dataIndex: 'oldDorm',
			key: 'oldDorm',
		},
		{
			title: '新校区',
			dataIndex: 'newSchool',
			key: 'newSchool',
			width: '100px',
		},
		{
			title: '新宿舍楼',
			dataIndex: 'newBuild',
			key: 'newBuild',
			width: '100px',
		},
		{
			title: '新宿舍',
			dataIndex: 'newDorm',
			key: 'newDorm',
		},
		{
			title: '状态',
			dataIndex: 'state',
			key: 'state',
		},
		{
			title: '申请人',
			dataIndex: 'applyName',
			key: 'applyName',
		},
		{
			title: '申请时间',
			dataIndex: 'applyTime',
			key: 'applyTime',
		},
		{
			title: '审批人',
			dataIndex: 'approveName',
			key: 'approveName',
		},
		{
			title: '审批时间',
			dataIndex: 'approveTime',
			key: 'approveTime',
		},
		{
			title: '操作',
			dataIndex: 'operator',
			key: 'operator',
			width: '8%',
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
				ModalText: 'Content of the modal',
				visible: false,
				confirmLoading: false,
				name: '',
				state: ['申请', '审批通过', '驳回', '已执行'],
				doingMsg: ''
			};
		},
		components: {
			IconFont,
		},
		mounted() {
			this.getModifyQuery();
		},
		methods: {
			showModal() {
				this.visible = true;
			},
			handleCancel(e) {
				console.log('Clicked cancel button');
				this.visible = false;
			},
			onChange(value) {
				console.log(value);
			},
			tableChange(pagination, filters, sorter) {
				this.pagination.current = pagination.current;
				this.pagination.pageSize = pagination.pageSize;
			},
			clearShcoolType() {
				console.log(this.$refs.school);
			},
			getModifyQuery() {
				axios({
					url: 'dorm/change/queryByName',
					method: 'post',
					params: {
						"name": this.name
					}
				}).then(res => {
					data.length = 0;
					for (let change of res.result) {
						let spsj = change.spsj == null ? '' : this.dateToFormat(new Date(change.spsj * 1000));
						let spr = change.spr == null ? '' : '管理员';
						data.push({
							key: change.id,
							id: change.xh,
							name: change.xm,
							oldSchool: change.xqm,
							oldBuild: change.sslm,
							oldFloor: change.lch,
							oldDorm: change.ssm,
							newSchool: change.xxqm,
							newBuild: change.xsslm,
							newFloor: change.xlch,
							newDorm: change.xssm,
							state: this.state[change.bdzt],
							applyName: change.xm,
							applyTime: this.dateToFormat(new Date(change.sqsj * 1000)),
							approveName: spr,
							approveTime: this.dateToFormat(new Date(change.spsj * 1000))
						})
					}
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
				this.name = '';
			},
			upMsg(msg) {
				console.log(msg)
				this.doingMsg = msg
				this.confirmLoading = true;
				setTimeout(() => {
					this.visible = true;
					this.confirmLoading = false;
				}, 500);
			}
		},
	};
</script>

<style scoped>
	.top {
		padding: 30px;
		display: flex;
		align-items: center;
	}

	.lCount {
		margin: 10px 0;
		text-align: right;
	}

	.rCount {
		margin: 10px 0;
		text-align: left;
	}

	.red {
		color: red;
	}
</style>