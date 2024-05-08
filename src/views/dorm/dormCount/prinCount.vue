<template>
	<div style="background:#E9EDF6; padding:30px">
				<div class="content-title">
					违纪统计
				</div>
		<div class="pageContentBox">
			<div class="headTop">宿舍统计 > <span class="notTop">违纪统计</span></div>
			<div class="content-head">

				<div style="min-width: 450px;"></div>
				<div>
					<span class="head-span">违纪类型</span>
					<a-cascader class="condition" :options="type" placeholder="请选择类型" v-model="typeId" />
				</div>

				<div>
					<span class="head-span">宿舍楼</span>
					<a-cascader class="condition" :options="build" placeholder="请选择宿舍楼" v-model="buildId" />
				</div>

				<div>
					<span class="head-span">房间</span>
					<a-input class="condition" placeholder="请输入房间号" v-model="dorm" />
				</div>

				<a-button :size="size" class="content-button button-orange" style="font-size:16px;width:88px;height:34px;background-color:#E61A1A " @click="clearAll">
					<icon-font type="iconqingkong1" style="color: #FFFFFF;" />
					清空
				</a-button>
			</div>
			<div class="content-head" style="margin-top: 8px;">
				<a-button :size="size" class="content-button button-skyblue" style="font-size:16px;width:88px;height:34px;background-color:#3a3aff " @click="getPrinList">
					<icon-font type="iconxindongfang-shuaxintubiao" style="color: #FFFFFF;" />
					刷新
				</a-button>

				<div style="min-width: 320px;"></div>

				<div>
					<span class="head-span">专业部</span>
					<a-cascader class="condition" :options="depart" placeholder="请选择专业部" @change="departChange"
						v-model="departId" />
				</div>

				<div>
					<span class="head-span">专业</span>
					<a-cascader class="condition" :options="major" placeholder="请选择专业" @change="majorChange"
						v-model="majorId" />
				</div>

				<div>
					<span class="head-span">班级</span>
					<a-cascader class="condition" :options="clazz" placeholder="请选择班级" v-model="clazzId" />
				</div>

				<a-button :size="size" class="content-button button-blue" style="font-size:16px;width:88px;height:34px;background-color:#1AE642 " @click="getPrinList">
					<icon-font type="iconsousuo" style="color: #FFFFFF;" />
					搜索
				</a-button>
			</div>
			<div>
				<a-table :columns="columns" :data-source="data" :defaultCurrent="6" :pagination="pagination"
					@change="tableChange">
					<span slot="operator">
						<a style="border-bottom: 1px solid #66C3FD;">编辑</a>
						<span>|</span>
						<a style="color:orange; border-bottom: 1px solid orange;">删除</a>
					</span>
				</a-table>
			</div>
		</div>
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
			title: '违纪类型',
			dataIndex: 'type',
			key: 'type',
		},
		{
			title: '违纪时间',
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
				type: [],
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
			this.getBuildList();
			this.getDepartList();
			this.getPrinList();
			this.getTypeList();
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
				console.log('Clicked cancel button');
				this.visible = false;
			},
			tableChange(pagination, filters, sorter) {
				this.pagination.current = pagination.current;
				this.pagination.pageSize = pagination.pageSize;
			},
			getTypeList() {
				axios({
					url: 'dorm/disciplineType/selectList',
					method: 'post',
					params: {
						name: '',
						status: 1
					}
				}).then(res => {

					this.type.splice(0, this.type.length);
					for (let type of res.result) {
						this.type.push({
							value: type.id,
							label: type.name,
						})
					}
				}).catch(err => {
					this.$message.warning("此处有异常");
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
				this.clazz = [];
				this.clazzId = [];
				if (this.major.length == 0) {
					return;
				}
				axios({
					url: 'dorm/allotSuShe/getClass',
					method: 'post',
					params: {
						zyId: this.majorId[0],
					}
				}).then(res => {

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
			},
			getPrinList() {
				let disciplineTypeId = this.typeId.length == 0 ? 0 : this.typeId[0];
				let sslId = this.buildId.length == 0 ? 0 : this.buildId[0];
				let facultyId = this.departId.length == 0 ? 0 : this.departId[0];
				let specialtyId = this.majorId.length == 0 ? 0 : this.majorId[0];
				let banjiId = this.clazzId.length == 0 ? 0 : this.clazzId[0];
				axios({
					url: '/dorm/suSheTJ/disciplineCount',
					method: 'post',
					params: {
						disciplineTypeId: disciplineTypeId,
						sslId: sslId,
						facultyId: facultyId,
						specialtyId: specialtyId,
						banjiId: banjiId,
						FJBM: this.dorm
					},
				}).then(res => {

					data.splice(0, data.length);
					for (let prin of res.result) {
						data.push({
							key: prin.id,
							name: prin.xm,
							stuId: prin.xh,
							depart: prin.yxmc,
							major: prin.zymc,
							class: prin.xzbmc,
							build: prin.jzwmc,
							dorm: prin.fjbm,
							type: prin.wjName,
							time: this.dateToFormat(new Date(prin.wjsj * 1000))
						})
					}
					this.pagination.current = 1;
					this.pagination.total = data.length;
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
		},
	};
</script>

<style>

</style>
