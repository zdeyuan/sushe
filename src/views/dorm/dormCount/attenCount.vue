<template>
	<div>
		<a-card :bordered="false">
			<div class="top">
				<span class="head-span">考勤类型</span>
				<div>
					<a-cascader class="condition" :options="type" placeholder="请选择类型" v-model="typeId" />
				</div>
				<span class="head-span">宿舍楼</span>
				<div>
					<a-cascader class="condition" :options="build" placeholder="请选择宿舍楼" v-model="buildId" />
				</div>
				<span class="head-span">房间</span>
				<div>
					<a-input class="condition" placeholder="请输入房间号" v-model="dorm" />
				</div>
			</div>
			<div class="top">
				<div>
					<span class="head-span">专 业 部</span>
					<a-cascader class="condition" :options="depart" placeholder="请选择专业部" @change="departChange"
						v-model="departId" />
				</div>

				<div>
					<span class="head-span">专 业</span>
					<a-cascader class="condition" :options="major" placeholder="请选择专业" @change="majorChange"
						v-model="majorId" />
				</div>

				<div>
					<span class="head-span">班级</span>
					<a-cascader class="condition" :options="clazz" placeholder="请选择班级" v-model="clazzId" />
				</div>
				<a-button type="primary" @click="getAttenList" icon="search" style="margin-left: 20px;">
					搜索
				</a-button>
				<a-button type="danger" style="margin-left:20px;" icon="reset" @click="clearAll">
					清空
				</a-button>
				<a-button type="primary" icon="reload" style="margin-left:20px;" @click="getAttenList">
					刷新
				</a-button>

			</div>
			<div>
				<a-table :columns="columns" :data-source="data" :defaultCurrent="6" :pagination="pagination"
					@change="tableChange">
				</a-table>
			</div>
		</a-card>
	</div>


</template>

<script>
	import {
		Icon
	} from 'ant-design-vue';
	import {
		axios
	} from '@/utils/request';

	const IconFont = Icon.createFromIconfontCN({
		scriptUrl: '//at.alicdn.com/t/font_2390461_f6v2cx4wmzq.js',
	});

	const columns = [{
			title: '姓名',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: '学号',
			dataIndex: 'stuId',
			key: 'stuId',
		},
		{
			title: '专业部',
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
			title: '宿舍楼',
			dataIndex: 'build',
			key: 'build',
		},
		{
			title: '房间号',
			dataIndex: 'dorm',
			key: 'dorm',
		},
		{
			title: '考勤类型',
			dataIndex: 'type',
			key: 'type',
		},
		{
			title: '考勤时间',
			dataIndex: 'time',
			key: 'time',
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
				type: [{
					value: 3,
					label: '晚归'
				}, {
					value: 4,
					label: '夜不归宿',
				}],
				typeId: [],
				build: [],
				buildId: [],
				dorm: '',
				depart: [],
				departId: [],
				major: [],
				majorId: [],
				clazz: [],
				clazzId: [],
				/* 添加-弹出框数据 */
				visible: false,
				confirmLoading: false,
			};
		},
		mounted() {
			this.getAttenList();
			this.getBuildList();
			this.getDepartList();
		},
		components: {
			IconFont,
		},
		methods: {
			showModal() {
				this.visible = true;
			},
			handleOk(e) {
				this.confirmLoading = true;
				setTimeout(() => {
					this.visible = false;
					this.confirmLoading = false;
				}, 2000);
			},
			handleCancel(e) {
				this.visible = false;
			},
			tableChange(pagination, filters, sorter) {
				this.pagination.current = pagination.current;
				this.pagination.pageSize = pagination.pageSize;
			},
			getAttenList() {
				let checkRuleId = this.typeId.length == 0 ? 0 : this.typeId[0];
				let sslId = this.buildId.length == 0 ? 0 : this.buildId[0];
				let facultyId = this.departId.length == 0 ? 0 : this.departId[0];
				let specialtyId = this.majorId.length == 0 ? 0 : this.majorId[0];
				let banjiId = this.clazzId.length == 0 ? 0 : this.clazzId[0];
				axios({
					url: '/dorm/suSheTJ/checkCount',
					method: 'post',
					params: {
						checkRuleId: checkRuleId,
						sslId: sslId,
						facultyId: facultyId,
						specialtyId: specialtyId,
						banjiId: banjiId,
						FJBM: this.dorm
					},
				}).then(res => {
					console.log(res);
					data.splice(0, data.length);
					for (let atten of res.result) {
						data.push({
							key: atten.id,
							name: atten.xm,
							stuId: atten.xh,
							depart: atten.yxmc,
							major: atten.zymc,
							class: atten.xzbmc,
							build: atten.jzwmc,
							dorm: atten.fjbm,
							type: atten.checkName,
							time: this.dateToFormat(new Date(atten.checkTime * 1000))
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
			}, //李少君+
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
							value: build.id,
							label: build.jzwmc
						})
					}
				})
			},
			getDepartList() {
				axios({
					url: 'dorm/allotSuShe/getCollege',
					method: 'post',
					params: {}
				}).then(res => {

					this.depart.splice(0, this.depart.length);
					for (let depart of res.result) {
						this.depart.push({
							value: depart.id,
							label: depart.yxmc
						})
					}
				}).catch(err => {
					this.$message.warning("此处有异常");
				})
			},
			departChange() {
				this.major = [];
				this.majorId = [];
				this.clazz = [];
				this.clazzId = [];
				console.log(this.departId[0])
				if (this.depart.length == 0 || this.departId[0] == undefined) {
					return;
				}
				axios({
					url: 'dorm/allotSuShe/getMajor',
					method: 'post',
					params: {
						xyId: this.departId[0]
					}
				}).then(res => {

					this.major.splice(0, this.major.length);
					for (let major of res.result) {
						this.major.push({
							value: major.id,
							label: major.zymc
						})
					}
				}).catch(err => {
					this.$message.warning("此处有异常");
				})
			},
			majorChange() {
				console.log('获取班级')
				this.clazz = [];
				this.clazzId = [];
				console.log(this.major)
				console.log(this.clazzId)
				if (this.major.length == 0) {
					return;
				}
				axios({
					url: 'dorm/allotSuShe/getClass',
					method: 'post',
					params: {
						// gradeId: this.major[1].value,
						zyId: this.majorId[0],
						xyId: this.departId[0]
					}
				}).then(res => {
					console.log(res)
					this.clazz.splice(0, this.clazz.length);
					for (let clazz of res.result) {
						this.clazz.push({
							value: clazz.id,
							label: clazz.xzbmc
						})
					}
				}).catch(err => {
					this.$message.warning("此处有异常");
				})
			},
			clearAll() {
				this.typeId = [];
				this.buildId = [];
				this.departId = [];
				this.major = [];
				this.majorId = [];
				this.clazz = [];
				this.clazzId = [];
				this.dorm = '';
			}
		},
	};
</script>

<style scoped>
	.top {
		padding-bottom: 10px;
		display: flex;
		align-items: center;
	}

	.head-span {
		margin: 0 10px;
		width: 90px;
		text-align: right;
	}
</style>