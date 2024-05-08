<template>
	<div style="background:#E9EDF6; padding:30px">
		<div class="content-title ">
			宿舍分配
		</div>
		<div class="pageContentBox">
			<div class="headTop">宿务管理 > 宿舍分配 ><span class="notTop">查看详情(学生分配)</span></div>
			<div class="content-head">
				<div>
					<a-button :size="size" class="content-button button-lightgreen" style="font-size:16px;width:88px;height:34px;background-color:#3a3aff " @click="showModal">
						<icon-font type="icontianjia" style="color: #FFFFFF;" />
						添加
					</a-button>
					<a-modal title="分配学生" :visible="visible" :confirm-loading="confirmLoading" @ok="handleOk"
						@cancel="handleCancel" :width="900">
						<table class="scanTable">
							<tr>
								<td class="single">
									<div><span class="spanRed">*</span>选择学生:</div>
								</td>
								<td class="long">
									<a-input class="scanInput" placeholder="请选择学生" v-model="chooseName"
										:disabled="true"></a-input>
									<a-button type="danger" :size="size" @click="searchStudent"
										style="margin-left: 10px;">预览</a-button>
									<a-button type="primary" :size="size" style="margin-left: 10px;"
										@click="clearChoose">清空</a-button>
								</td>
							</tr>
							<tr>
								<td class="single">
									<div>床位号:</div>
								</td>
								<td class="long">
									<a-input class="scanInput" placeholder="请输入床位号" v-model="addBedNum"></a-input>
								</td>
							</tr>
							<tr>
								<td class="single">
									<div><span class="spanRed">*</span>入住时间:</div>
								</td>
								<td class="long">
									<input class="scanInput" type="date" v-model="addTime"></input>
								</td>
							</tr>
						</table>
						<template slot="footer">
							<a-button type="primary" style="background-color:#0098f8;font-weight:bold;color:#ffffff" @click="handleOk">确定</a-button>
							<a-button style="background-color:#999999;font-weight:bold;color:#ffffff" @click="handleCancel">取消</a-button>
						</template>
					</a-modal>

					<a-modal title="查找学生" :visible="find" :confirm-loading="confirmLoading" @cancel="findCancel"
						:width="800">
						<div>
							年级:
							<a-cascader class="small" :options="grade" placeholder="请选择年级" v-model="gradeId" />
							院系:
							<a-cascader class="small" :options="depart" placeholder="请选择院系" v-model="departId"
								@change="departChange" />
							专业:
							<a-cascader class="small" :options="major" placeholder="请选择专业" v-model="majorId"
								@change="majorChange" />
							班级:
							<a-cascader class="small" :options="clazz" placeholder="请选择班级" v-model="clazzId" />
						</div>

						<div style="margin-top: 20px;">
							<a-cascader :allowClear="false" style="width: 80px;" :options="way" v-model="wayId" />
							<a-input class="scanInput" placeholder="请输入信息" v-model="message"></a-input>
							<a-button @click="queryStudent" style="margin-left: 30px; height: 24px;background-color:#028be2;color:#ffffff;font-weight:bold">搜索</a-button>
							<a-button @click="clearQuery" style="margin-left: 30px; height: 24px;background-color:#f88600;color:#ffffff;font-weight:bold">清空</a-button>
						</div>

						<a-table :columns="stuCol" :data-source="stuData" :defaultCurrent="6" :pagination="stuPag"
							@change="stuChange">
							<span slot="operator" slot-scope="text, record">
								<a style="color:orange; border-bottom: 1px solid orange;font-weight:bold;font-size:18px" @click="findOK(record)">选择</a>
							</span>
						</a-table>
						<template slot="footer">
							<a-button style="background-color:#999999;color:#ffffff;font-weight:bold" @click="findCancel">取消</a-button>
						</template>
					</a-modal>

					<a-button :size="size" class="content-button button-skyblue button-after" style="font-size:16px;width:88px;height:34px;background-color:#3a3aff " @click="getDormList">
						<icon-font type="iconxindongfang-shuaxintubiao" style="color: #FFFFFF;" />
						刷新
					</a-button>
				</div>

				<div style="min-width: 550px;"></div>
			</div>
			<div>
				<a-table :columns="columns" :data-source="data" :defaultCurrent="6" :pagination="pagination"
					@change="tableChange">
					<span slot="operator" slot-scope="text, record">
						<a style="font-size:18px;color:orange; border-bottom: 1px solid orange;"
							@click="deleteStudent(record.key)">删除</a>
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
	} from "@/utils/request"

	const IconFont = Icon.createFromIconfontCN({
		scriptUrl: '//at.alicdn.com/t/font_2390461_vvis3tohqh.js',
	});

	const columns = [{
			title: '学生姓名',
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
			dataIndex: 'build',
			key: 'build',
		},
		{
			title: '宿舍名称',
			dataIndex: 'dorm',
			key: 'dorm',
		},
		{
			title: '床位',
			dataIndex: 'bed',
			key: 'bed ',
		},
		{
			title: '层数',
			dataIndex: 'floor',
			key: 'floor',
		},
		{
			title: '状态',
			dataIndex: 'state',
			key: 'state',
		},
		{
			width: '20%',
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

	const stuCol = [{
		title: '学号',
		dataIndex: 'id',
		key: 'id',
	}, {
		title: '姓名',
		dataIndex: 'name',
		key: 'name',
	}, {
		title: '性别',
		dataIndex: 'sex',
		key: 'sex',
	}, {
		title: '身份证',
		dataIndex: 'identify',
		key: 'identify',
	}, {
		title: '操作',
		dataIndex: 'operator',
		key: 'operator',
		scopedSlots: {
			customRender: 'operator'
		},
	}, ];

	let data = [];
	let stuData = [];

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
					total: 1
				},
				stuPag: {
					current: 1,
					pageSize: 5,
					pageSizeOptions: ['6', '10'],
					showQuickJumper: true,
					showSizeChanger: true,
					total: 1
				},
				/* 表格数据 */
				data,
				columns,
				stuCol,
				stuData,
				/* 按钮大小 */
				size: 'small',
				/* 下拉框数据 */
				/* 添加-弹出框数据 */
				visible: false,
				confirmLoading: false,
				grade: [],
				gradeId: [],
				depart: [],
				departId: [],
				major: [],
				majorId: [],
				clazz: [],
				clazzId: [],
				student: [],
				studentId: [],
				studentName: '',
				find: false,
				way: [{
					value: 0,
					label: '学号'
				}, {
					value: 1,
					label: '姓名'
				}, {
					value: 2,
					label: '身份证号'
				}],
				wayId: [0],
				sex: ['女', '男'],
				message: '',
				chooseName: '',
				chooseId: '',
				addTime: '',
				addBedNum: '',
			};
		},
		mounted() {
			this.getDepartList();
			this.getGradeList();
			this.getDormList();
		},
		components: {
			IconFont,
		},
		methods: {
			showModal() {
				this.chooseName = '';
				this.chooseId = '';
				this.addBedNum = '';
				this.addTime = '';
				this.visible = true;
			},
			handleOk(e) {
				console.log(1);
				if(this.chooseId == ''){
					this.$message.warning("请选择学生！");
					return
				}
				if(this.addTime  == ''){
					this.$message.warning("请选择入住时间！");
					return
				}
				axios({
					url: 'dorm/allotSuShe/addStudent',
					method: 'post',
					params: {
						stuId: this.chooseId,
						fjbh: sessionStorage.getItem("dormId"),
						cwh: this.addBedNum,
						rzsj: new Date(this.addTime).valueOf() / 1000
					}
				}).then(res => {
					this.$message.success(res.message);
					this.getDormList();
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
			stuChange(pagination, filters, sorter) {
				this.stuPag.current = pagination.current;
				this.stuPag.pageSize = pagination.pageSize;
			},
			searchStudent() {
				this.find = true;
				this.queryStudent();
			},
			findOK(res) {
				var item = sessionStorage.getItem('XBM')
				if(item == 1){
					if(res.sex == '女'){
						this.$message.warning("选择学生性别不合,无法入住");
						return
					}
				}else if(item == 2){
					if(res.sex == '男'){
						this.$message.warning("选择学生性别不合,无法入住");
						return
					}
				}
				this.chooseName = res.name;
				this.chooseId = res.key;
				this.find = false;
			},
			findCancel() {
				this.find = false;
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
			getGradeList() {
				axios({
					url: 'dorm/allotSuShe/getGrade',
					method: 'post',
					params: {}
				}).then(res => {

					this.grade.splice(0, this.grade.length);
					for (let grade of res.result) {
						this.grade.push({
							value: grade.id,
							label: grade.njmc
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
				if (this.depart.length == 0) {
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
				if (this.major.length == 0 || this.grade.length == 0) {
					return;
				}
				console.log(this.gradeId[0], this.majorId[0], this.departId[0]);
				let gradeId = this.gradeId.length == 0 ? '' : this.gradeId[0];
				axios({
					url: 'dorm/allotSuShe/getClass',
					method: 'post',
					params: {
						gradeId: gradeId,
						zyId: this.majorId[0],
						xyId: this.departId[0]
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
			queryStudent() {
				let xh = this.wayId[0] == 0 ? this.message : '';
				let xm = this.wayId[0] == 1 ? this.message : '';
				let sfzh = this.wayId[0] == 2 ? this.message : '';
				let gradeId = this.gradeId.length == 0 ? '' : this.gradeId[0];
				let zyId = this.majorId.length == 0 ? '' : this.majorId[0];
				let xyId = this.departId.length == 0 ? '' : this.departId[0];
				let bjId = this.clazzId.length == 0 ? '' : this.clazzId[0];
				console.log(gradeId, zyId, xyId, bjId);
				axios({
					url: 'dorm/allotSuShe/queryStudent',
					method: 'post',
					params: {
						xh: xh,
						xm: xm,
						sfzh: sfzh,
						gradeId: gradeId,
						zyId: zyId,
						xyId: xyId,
						bjId: bjId
					}
				}).then(res => {

					stuData.splice(0, stuData.length);
					for (let stu of res.result) {
						stuData.push({
							key: stu.id,
							id: stu.xh,
							name: stu.xm,
							sex: stu.xbm == '1' ? '男' : '女',
							identify: stu.sfzh,
						})
					}
					this.stuPag.current = 1;
					this.stuPag.total = stuData.length;
				}).catch(err => {
					this.$message.warning("此处有异常");
				})
			},
			clearChoose() {
				this.chooseName = '';
				this.chooseId = '';
			},
			clearQuery() {
				this.gradeId = [];
				this.departId = [];
				this.major = [];
				this.majorId = [];
				this.clazz = [];
				this.clazzId = [];
				this.message = '';
			},
			getDormList() {
				console.log(sessionStorage.getItem("dormId"));
				axios({
					url: 'dorm/allotSuShe/studentDorm',
					method: 'post',
					params: {
						fjbh: sessionStorage.getItem("dormId")
					}
				}).then(res => {

					data.splice(0, data.length);
					for (let stu of res.result) {
						data.push({
							key: stu.id,
							name: stu.xm,
							id: stu.xh,
							build: stu.jzwmc,
							dorm: stu.fjbm,
							bed: stu.cwh,
							floor: stu.lcname,
							state: "已入住",
						})
					}
					this.pagination.current = 1;
					this.pagination.total = data.length;
				}).catch(err => {
					this.$message.warning("此处有异常");
				})
			},
			deleteStudent(id) {
				let re = confirm("确认删除?");
				if (re) {
					axios({
						url: 'dorm/allotSuShe/deleteStudent',
						method: 'post',
						params: {
							id: id,
							dormId: sessionStorage.getItem("dormId")
						}
					}).then(res => {
						this.$message.success(res.message);
						this.getDormList();
					}).catch(err => {
						this.$message.warning("此处有异常");
					})
				}
			}
		},
	};
</script>

<style>


</style>
