<template>
	<div>
		<a-card :bordered="false">
			<div class="top">
					<span class="head-span">姓名</span>
				<div>
					<a-input class="condition" placeholder="请输入姓名" v-model="name"
						onkeyup="this.value=this.value.replace(/[, ]/g,'')" />
				</div>
					<span class="head-span">学号</span><div>
					<a-input class="condition" placeholder="请输入学号" v-model="stuId"
						onkeyup="this.value=this.value.replace(/[, ]/g,'')" />
				</div>
					<span class="head-span">宿舍楼</span><div>
					<a-cascader class="condition" :options="build" placeholder="请选择宿舍楼" v-model="buildId" />
				</div>
				<div>
					<a-button type="primary" @click="getStuList" icon="search" style="margin-left: 20px;">
						搜索
					</a-button>
					<a-button type="danger" style="margin-left:20px;" icon="reset" @click="clearAll">
						清空
					</a-button>
				</div>
			</div>
			<div>
				<router-link to="/dormLodging/attenSetting">
					<a-button type="primary">
						<icon-font type="iconshezhi" style="color: #FFFFFF;" />
						考勤设置
					</a-button>
				</router-link>
				<a-button type="primary" icon="reload" @click="getStuList" style="margin-left: 20px;">
					刷新
				</a-button>
			</div>
			<div>
				<a-table :columns="columns" :data-source="data" :defaultCurrent="6" :pagination="pagination"
					@change="tableChange">
					<span slot="operator" slot-scope="text, record">
						<a  @click="showModal(record.key)">添加考勤</a>
					</span>
				</a-table>
			</div>
		</a-card>
		<a-modal title="添加违纪信息" :visible="visible" :confirm-loading="confirmLoading" width="800px"
			@cancel="handleCancel">
			<table class="scanTale">
				<tr>
					<td class="single">姓名:</td>
					<a-input class="scanInput" :disabled="true" v-model="addName"></a-input>
				</tr>
				<tr>
					<td class="single">学号:</td>
					<a-input class="scanInput" :disabled="true" v-model="addStuId"></a-input>
				</tr>
				<tr>
					<td class="single">宿舍楼:</td>
					<a-input class="scanInput" :disabled="true" v-model="addBuildId"></a-input>
				</tr>
				<tr>
					<td class="single">房间号:</td>
					<a-input class="scanInput" :disabled="true" v-model="addDormId"></a-input>
				</tr>
				<tr>
					<td class="single"><span class="spanRed">*</span>考勤状态:</td>
					<td class="long">
						<label v-for="item in radioName"> {{ item.value }}
							<input type="radio" name="approveResult" :value="item.index" v-model="checkedValue">
						</label>
					</td>
				</tr>
			</table>
			<template slot="footer" class="floor-footer">
				<a-button  @click="handleCancel">取消</a-button>
				<a-button type="primary" @click="handleOk">确认</a-button>
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
	import moment from 'moment';

	const IconFont = Icon.createFromIconfontCN({
		scriptUrl: '//at.alicdn.com/t/font_2390461_p27mhrdyg1k.js',
	});

	const columns = [{
			title: '姓名',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: '学号',
			dataIndex: 'id',
			key: 'id',
		},
		{
			title: '宿舍楼',
			dataIndex: 'dorm',
			key: 'dorm',
		},
		{
			title: '房间号',
			dataIndex: 'room',
			key: 'room',
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
					total: 0
				},
				build: [],
				buildId: [],
				name: '',
				stuId: '',
				/* 表格数据 */
				data,
				columns,
				/* 按钮大小 */
				size: 'small',
				/* 添加-弹出框数据 */
				visible: false,
				confirmLoading: false,
				radioName: [{
					index: 'wg',
					value: '晚归'
				}, {
					index: 'ybgs',
					value: '夜不归宿'
				}],
				checkedValue: '',
				addName: '',
				addBuildId: '',
				addDormId: '',
				addStuId: '',
				addId: '',
				wgTime: moment('11:30:00', 'HH:mm:ss'),
				ybgsTime: moment('11:30:00', 'HH:mm:ss'),
			};
		},
		components: {
			IconFont,
		},
		mounted() {
			this.getStuList();
			this.getBuildList();
			this.getDefaultTime();
		},
		methods: {
			showModal(id) {
				this.checkedValue = '';
				axios({
					url: 'dorm/check/selectById',
					method: 'post',
					params: {
						id: id
					}
				}).then(res => {
					this.addName = res.result.xm;
					this.addStuId = res.result.xh;
					this.addBuildId = res.result.jzwmc;
					this.addDormId = res.result.fjbm;
					this.addId = res.result.stuId;
					this.visible = true;
				}).catch(err => {
					this.$message.warning("添加资产类型失败");
				})
			},
			handleOk(e) {
				this.confirmLoading = true;
				if (this.checkedValue == '') {
					this.$message.warning("请选择考勤类型");
					return;
				}
				let nowTime = moment();
				let zeroTime = moment('00:00:00', 'HH:mm:ss');
				let lastTime = moment('06:00:00', 'HH:mm:ss');
				console.log(nowTime > lastTime, nowTime < this.ybgsTime);
				console.log(nowTime > lastTime, nowTime < this.wgTime);
				// 判断是否属于考勤时间，当日在次日凌晨六点前统计完毕，否则记为非考勤时间段
				if (this.checkedValue == 'ybgs') {
					// 当时间属于凌晨
					if (this.ybgsTime >= zeroTime && this.ybgsTime <= lastTime) {
						// 小于夜不归宿时间 或者 大于6:00视为非考勤阶段
						if (nowTime > lastTime || nowTime < this.ybgsTime) {
							this.$message.warning("当前不属于夜不归宿时间");
							return;
						}
					} else {
						if (nowTime > lastTime && nowTime < this.ybgsTime) {
							this.$message.warning("当前不属于夜不归宿时间");
							return;
						}
					}
				}
				if (this.checkedValue == 'wg') {
					// 当时间属于凌晨
					if (this.wgTime >= zeroTime && this.wgTime <= lastTime) {
						// 小于晚归时间 或者 大于6:00视为非考勤阶段
						if (nowTime > lastTime || nowTime < this.wgTime) {
							this.$message.warning("当前不属于晚归时间");
							return;
						}
					} else {
						if (nowTime > lastTime && nowTime < this.wgTime) {
							this.$message.warning("当前不属于晚归时间");
							return;
						}
					}
				}
				axios({
					url: 'dorm/check/insert',
					method: 'post',
					params: {
						stuId: this.addId,
						checkCode: this.checkedValue
					}
				}).then(res => {
					this.$message.success(res.message);
					this.visible = false;
					this.confirmLoading = false;
				}).catch(err => {
					this.$message.warning("添加考勤信息失败");
				})
			},
			handleCancel(e) {
				this.visible = false;
			},
			tableChange(pagination, filters, sorter) {
				this.pagination.current = pagination.current;
				this.pagination.pageSize = pagination.pageSize;
			},
			getStuList() {
				let sslbm = this.buildId.length == 0 ? 0 : this.buildId[0];
				axios({
					url: 'dorm/check/selectList',
					method: 'post',
					params: {
						XM: this.name,
						XH: this.stuId,
						SSLBM: sslbm
					}
				}).then(res => {
					data.splice(0, data.length);
					for (let stu of res.result) {
						data.push({
							key: stu.id,
							name: stu.xm,
							id: stu.xh,
							dorm: stu.jzwmc,
							room: stu.fjbm
						})
					}
					this.pagination.current = 1;
					this.pagination.total = data.length;
				}).catch(err => {
					this.$message.warning("获取学生列表失败");
				})
			},
			getBuildList() {
				axios({
					url: '/dorm/bulidMng/querySuSheLou',
					method: 'post',
					params: {
						"jzwmc": ''
					},
				}).then(res => {
					this.build.splice(0, this.build.length);
					for (let build of res.result) {
						this.build.push({
							label: build.jzwmc,
							value: build.id,
						})
					}
				}).catch(err => {
					this.$message.warning("获取宿舍楼列表失败");
				})
			},
			clearAll() {
				this.name = '';
				this.stuId = '';
				this.buildId = [];
			},
			getDefaultTime() {
				axios({
					url: 'dorm/checkRule/selectAllCheckType',
					method: 'post',
					params: {}
				}).then(res => {
					for (let type of res.result) {
						if (type.name == '晚归') {
							this.wgTime = moment(type.limitTime, 'HH:mm:ss');
							console.log(this.wgTime);
						} else if (type.name == '夜不归宿') {
							this.ybgsTime = moment(type.limitTime, 'HH:mm:ss');
							console.log(this.ybgsTime);
						}
					}
				}).catch(err => {
					this.$message.warning("获取违规时间失败");
				})
			},
		},
	};
</script>
<style scoped>
	.top {
		display: flex;
		align-items: center;
	}
	.head-span {
		margin: 0 10px;
		width:60px;
		line-height:40px;
		text-align:right;
	}
</style>