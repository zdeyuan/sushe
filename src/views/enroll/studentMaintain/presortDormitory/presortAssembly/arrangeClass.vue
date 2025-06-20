<template>
	<div>
		<a-row>
			<a-col :span='24'>
				<div class="content-head-type2">
					<div style="margin-bottom: 10px;">
						<span class="title_span">所属年级：</span>
						<j-select-grade placeholder="请选择年级" v-model="gradeId" @change='classListChange'></j-select-grade>
						
						<span class="title_span">院系：</span>
						<a-cascader class="condition" :options="faculty" v-model='facultyId' placeholder="请选择院系"
							@change='specialtyChange' />
						<span class="title_span">专业：</span>
						<a-cascader class="condition" :options="specialty" v-model='specialtyId' placeholder="请选择专业" />
						<span class="title_span">班级：</span>
						<a-cascader class="condition" :options="classList" v-model='classId' placeholder="请选择班级" />
					</div>
					<div style="margin-bottom: 10px;">
						<span class="title_span">分配状态：</span>
						<a-cascader class="condition" :options="stateList" v-model='state' placeholder="请选择分配状态" />
						<span class="title_span">招生类型：</span>
						<a-cascader class="condition" :options="stuType" v-model='stuTypeId' placeholder="请选择招生类型" />
						<span class="title_span">性别：</span>
						<a-cascader class="condition" :options="sexList" v-model='sex' placeholder="请选择性别" />
						<a-button type="primary" icon="search" style="margin-left: 10px;"  
							@click='getArrangeClassList'>
							<span class="flex_box">
								搜索
							</span>
						</a-button>
						<a-button type="danger" style="margin-left: 10px;"   @click='empty'>
							<span class="flex_box">
								<!-- <a-icon type="search" class="icon-img" /> -->
								清空
							</span>
						</a-button>
					</div>
				</div>
			</a-col>
		</a-row>
		<a-row :gutter="[20,20]">
			<a-col :span='15'>
				<a-table :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
					:columns="sex[0] == 0 ? columnsMan : columnsWoman" :data-source="tableData" :defaultCurrent="6" :pagination="pagination"
					:rowKey="(record) => record.id" @change="tableChange" style="margin-top: 10px">
				</a-table>
			</a-col>
			<a-col :span='9'>
				<a-table :columns="columnsMsg" :data-source="tableDataDetermine" :defaultCurrent="6"
					:rowKey="(record) => record.id" @change="tableChange" style="margin-top: 10px">
					<span slot="action" slot-scope="text, record">
						<a style="color: #FC8950;" @click="remoData">删除</a>
					</span>	
				</a-table>
			</a-col>
		</a-row>
		</a-row>
		<a-row>
			<a-col :span='24'>
				<div>
					<span class="nextBtn" @click="nextPage">下一步</span>
				</div>
			</a-col>
		</a-row>
	</div>
</template>

<script>
	import {
		axios
	} from "@/utils/request"

	import {
		Icon
	} from 'ant-design-vue'
	import {
		getFaculty
	} from '@/api/enroll/api'
	import JSelectGrade from '@/components/kwglbiz/JSelectGrade'
	export default {
		components: {
			Icon,
			JSelectGrade
		},
		data() {
			return {
				content: '',
				pagination: {
					showSizeChanger: true,
					showQuickJumper: true,
					current: 1,
					pageSize: 10,
					pageSizeOptions: ['10', '20', '30', '40'],
					total: 1000,
				},
				tableData: [], //表格的数据的数组
				selectedRowKeys: [], //1 。保存已经选中的角标



				faculty: [], //院系选择项
				facultyId: [], // 选择院系ID
				specialty: [], //专业选择项
				specialtyId: [], // 专业选择ID
				grade: [], // 所属年级
				gradeId: [], //选择年级ID
				classList: [], //班级选择项
				classId: [], // 班级选择ID
				// 状态选择项
				stateList: [{
						label: '未分配',
						value: 0,
					},
					{
						label: '已分配',
						value: 1
					}
				],
				state: [], // 状态选择ID
				// 性别选择项
				sexList: [{
						label: '男',
						value: 0,
					},
					{
						label: '女',
						value: 1
					}
				],
				sex: [0], //性别选择ID
				stuType: [{
						label: '统一招生',
						value: 0
					},
					{
						label: '自主招生',
						value: 1
					}
				],
				stuTypeId: [],

				// 表格的字段
				columnsMan: [{
						title: '序号',
						dataIndex: 'id',
						key: 'id',
						align: 'center',
						fixed: 'left'
					},
					{
						title: '院系',
						dataIndex: 'yxmc',
						key: 'yxmc',
						align: 'center',
						fixed: 'left'
					},
					{
						title: '所属年级',
						dataIndex: 'njmc',
						key: 'njmc',
						align: 'center',
					},
					{
						title: '班级',
						dataIndex: 'xzbmc',
						key: 'xzbmc',
						align: 'center',
					},
					{
						title: '需住宿人数(男)',
						dataIndex: 'nansrs',
						key: 'nansrs',
						align: 'center',
					},
				],
				// 表格的字段
				columnsWoman: [{
						title: '序号',
						dataIndex: 'id',
						key: 'id',
						align: 'center',
						fixed: 'left'
					},
					{
						title: '院系',
						dataIndex: 'yxmc',
						key: 'yxmc',
						align: 'center',
						fixed: 'left'
					},
					{
						title: '所属年级',
						dataIndex: 'njmc',
						key: 'njmc',
						align: 'center',
					},
					{
						title: '班级',
						dataIndex: 'xzbmc',
						key: 'xzbmc',
						align: 'center',
					},
					{
						title: '需住宿人数(女)',
						dataIndex: 'nvsrs',
						key: 'nvsrs',
						align: 'center',
					},
				],
				
				// 表数据字段
				columnsMsg:[],
				//年级下拉框数据
				grade: [],
				gradeId: [],
				//院系下拉框数据
				faculty: [],
				facultyId: [],
				//当前下拉框数值
				curGrade: '',
				curFaculty: '',
				tableDataDetermine:[],
			}

		},
		mounted() {
			this.getSearchList()
			this.getArrangeClassList()
		},
		methods: {
			empty(){
				this.gradeId = [],
				this.facultyId = [],
				this.specialtyId = [], // 专业选择ID
				this.classId = [], // 班级选择ID
				this.state = [], // 状态选择ID
				this.sex = [0], //性别选择ID
				this.stuTypeId = []
			},
			
			remoData(){
				this.selectedRowKeys = [],
				this.tableDataDetermine = []
			},
			
			//安排床位的班级显示表格
			getArrangeClassList() {
				axios({
					url: '/enroll/fenSushe/getArrangeClassList',
					method: 'post',
					params: {
						falId: this.facultyId[0] == undefined ? '' : this.facultyId[0],
						gradeId: this.gradeId[0] == undefined ? '' : this.gradeId[0],
						banjiId: this.classId[0] == undefined ? '' : this.classId[0],
						currentPage: this.pagination.current,
						pageSize: this.pagination.pageSize
					},
				}).then((res) => {
					if (res.code == '200') {
						this.tableData = res.result.list
						this.pagination.total = res.result.count
					} else {
						this.$message.warning('获取宿舍信息失败')
					}
				})
			},
			getSearchList() {
				this.getFacultyList()
				// this.getGrade()
			},
			specialtyChange(e) {
        this.specialty = []
				if (e.length > 0) {
					this.specialtyList()
				} else {
					this.specialtyId = []
				}
			},
			classListChange(e) {
				this.classList = []
				if (e.length > 0) {
					this.getClazz()
				} else {
					this.classId = []
				}
			},

			// 获取院系信息
			getFacultyList() {
				getFaculty().then((res) => {
					if (res.code == '200') {
						for (var i = 0; i < res.result.length; i++) {
							this.faculty.push({
								label: res.result[i].yxmc,
								value: res.result[i].id
							})
						}
					} else {
						this.$message.warning('院系信息获取失败')
					}
				})
			},

			// 获取专业信息
			specialtyList() {
				axios({
					url: 'enroll/reportMng/getSpecialty',
					method: 'post',
					params: {
						facultyId: this.facultyId[0],
					},
				}).then((res) => {
					if (res.code == '200') {
						for (var i = 0; i < res.result.length; i++) {
							this.specialty.push({
								label: res.result[i].zymc,
								value: res.result[i].id
							})
						}
					} else {
						this.$message.warning('专业信息获取失败')
					}
				})
			},

			// 获取所属年级
			getGrade() {
				axios({
					url: 'enroll/divideClassMng/getGrade',
					method: 'post',
					params: {},
				}).then((res) => {
					if (res.code == '200') {
						for (var i = 0; i < res.result.length; i++) {
							this.grade.push({
								label: res.result[i].njmc,
								value: res.result[i].id
							})
						}
					} else {
						this.$message.warning('所属年级信息获取失败')
					}
				})
			},

			// 获取班级信息
			getClazz() {
				axios({
					url: 'enroll/divideClassMng/getClazz',
					method: 'post',
					params: {
						gradeId: this.gradeId[0],
						specialtyId: this.specialtyId[0] == undefined ? 0 : this.specialtyId[0]
					},
				}).then((res) => {
					if (res.code == '200') {
						for (var i = 0; i < res.result.length; i++) {
							this.classList.push({
								label: res.result[i].xzbmc,
								value: res.result[i].id
							})
						}
					} else {
						this.$message.warning('班级信息获取失败')
					}
				})
			},

			tableChange(nextPage) {
				console.log(nextPage)
				this.pagination.current = nextPage.current
				this.getArrangeClassList()
			},
			nextPage() {
				sessionStorage.setItem('selectedClass',JSON.stringify(this.tableDataDetermine))
				sessionStorage.setItem('sex',this.sex[0])
				if(this.tableDataDetermine[0] == undefined){
					this.$message.warning('请先选择班级！！')
					return
				}
				this.$emit('pages', 2)
			},

			//获取所有院系
			getFaculty() {

				axios({
					url: 'enroll/reportMng/getFaculty',
					method: 'post',
					params: {

					}
				}).then(res => {

					for (let faculty of res.result) {
						this.faculty.push({
							value: faculty.id,
							label: faculty.yxmc
						})
					}
				}).catch(err => {
					this.$message.warning("获取院系失败");
				})
			},
			onSelectChange(selectedRowKeys) {
				if(selectedRowKeys[0] == undefined){
					return
				}
				if(selectedRowKeys.length > 1 ){
					return
				}
				if(this.tableDataDetermine.length >= 1){
					return
				}
				console.log('执行通过')
				this.selectedRowKeys = selectedRowKeys;
				var data = this.tableData.find(item => item.id == this.selectedRowKeys)
				this.tableDataDetermine.push(data)
				if(this.sex[0] == 0){
					this.columnsMsg = [
					{
						title: '一个班级需要男床位数('+data.nansrs+')',
						dataIndex: 'nansrs',
						key: 'nansrs',
						align: 'center',
					},
					{
						align: 'center',
						title: '清空已选',
						dataIndex: 'X',
						key: 'cId',
						fixed: 'right',
						scopedSlots: {
							customRender: 'action'
						},
					}
				]
				}else{
					this.columnsMsg = 
					[
						{
							title: '一个班级需要女床位数('+data.nvsrs+')',
							dataIndex: 'nvsrs',
							key: 'nvsrs',
							align: 'center',
						},
						{
							align: 'center',
							title: '清空已选',
							dataIndex: 'X',
							key: 'cId',
							scopedSlots: {
								customRender: 'action'
							},
						}
					]
				}
			},
		}
	}
</script>

<style scoped>
	

	.pageContentBox {
		padding: 30px;
	}

	.nextBtn {
		display: inline-block;
		width: 120px;
		height: 40px;
		background: #0098f8;
		border-radius: 5px;
		font-size: 18px;
		font-family: Microsoft YaHei;
		color: #ffffff;
		text-align: center;
		line-height: 40px;
	}

	.icon_gblue {
		background: #00bad0;
	}

	.icon_btn {
		color: #ffffff;
		font-size: 16px;
		margin-right: 20px;
		width: 88px;
		height: 34px;
	}

	.icon_btn_type_2 {
		color: #ffffff;
		font-size: 16px;
		margin-right: 20px;
		height: 34px;
	}

	.icon-img {
		width: 15px;
		height: 17px;
		margin-right: 5px;
	}

	.icon_gree {
		background: #00d09d;
	}

	.icon_orange {
		background: #f88600;
	}

	.icon_dark_blue {
		background: #00bad0;
	}

	.icon_red {
		background: #fc8950;
	}

	.cambridge_blue {
		background: #66c3fd;
	}

	.input_wrap {
		width: 91px;
		height: 17px;
		margin-right: 15px;
	}

	.page {
		margin: 71px auto;
		display: flex;
		justify-content: space-between;
		/*弹性布局的左右居中*/
		align-items: center;
	}

	/* 详情样式 */
	.table_detail {
		border: 1px solid #dee2e6;
		background: #ffffff;
		border-radius: 4px;
		width: 100%;
		min-width: 1200px;
	}

	.table_detail .table_list {
		border-bottom: 1px solid #dee2e6;
		display: flex;
		align-items: center;
		height: 49px;
	}

	/*table_list 倒数第一个的下边框设置炜0*/
	.table_detail .table_list:nth-last-child(1) {
		border-bottom: 0;
	}

	.table_list .table_item {
		display: flex;
		align-items: center;
	}

	.table_list .table_item:nth-of-type(2) {
		margin-left: 117px;
	}

	.table_detail .table_list .table_lable {
		background: #f8f8f9;
		width: 259px;
		height: 48px;
		line-height: 48px;
		padding-right: 75px;
		color: #666;
		font-size: 18px;
		font-family: 'Adobe Heiti Std R';
		text-align: right;
	}

	.table_list .table_item .table_input {
		padding: 8px 23px;
		padding-right: 0;
		height: 49px;
	}

	.table_lable .ant-input {
		width: 300px;
		height: 34px;
	}

	.table_lable {
		font-size: 18px;
		font-family: Adobe Heiti Std;
		font-weight: bold;
		color: #666666;
	}

	.long-text {
		width: 800px;
		height: 34px;
		background: rgba(34, 206, 139, 0);
		border: 1px solid rgba(166, 177, 194, 0.3);
		border-radius: 3px;
		font-size: 20px;
		font-family: Adobe Heiti Std;
		font-weight: bold;
		color: #999999;
	}

	/* 斑马纹的样式 */
	.table-row-odd {
		background-color: #f4f7f9;
	}

	.search-text {
		width: 182px;
		height: 34px;
		background: #ffffff;
		border: 1px solid rgba(166, 177, 194, 0.3);
		border-radius: 4px;
	}

	/* 状态下拉框样式 */
	.state-box {
		margin: 0 29px;
	}

	/* 表格 */
	/* .scanTable {
		margin: 5px auto;
	}

	.single,
	.double,
	.long {
		border: 1px solid #e5e5e5;
		height: 30px;
		font-size: 12px;
		font-family: '宋体';
	}

	.single {
		background-color: #f5f5f5;
		width: 130px;
		margin-right: 30px;
		text-align: right;
	}

	.single div {
		width: 100px;
	}

	.double {
		background-color: white;
		width: 230px;
		vertical-align: middle;
		text-align: center;
	}

	.single div {
		width: 100px;
	}

	.single {
		background-color: #f5f5f5;
		width: 130px;
		margin-right: 30px;
		text-align: right;
	}

	.flex_box {
		display: flex;
		align-items: center;
		justify-content: center;
	} */
</style>
