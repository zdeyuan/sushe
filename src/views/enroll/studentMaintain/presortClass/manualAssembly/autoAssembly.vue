<template>
	<div>
		<div class="pageContentBox">
			<a-row>
				<a-col :span='24'>
					<div class="tipsBox">
						温馨提示：分班之前需要按专业部、专业和年级搜索未分班学生，再根据专业的班级列表设定好班级，然后批量选中学生，调整到某一个班级里面。
					</div>
				</a-col>
			</a-row>
			<a-row>
				<a-col :span='8'>
					<div class="rangeBox">
						<div>
							<div class="selectionBox">
								分配学生范围
							</div>
							<div>
								<a-row>
									<a-col :span='7'>
										<div class="choiceTop">
											年级
										</div>
									</a-col>
									<a-col :span='14'>
										<j-select-grade placeholder="请选择年级" v-model="gradeId"></j-select-grade>
									</a-col>
									<a-col :span='7'>
										<div class="choiceTop">
											招生类型
										</div>
									</a-col>
									<a-col :span='14'>
										<a-cascader class="condition" :options="stuType" v-model='stuTypeId' placeholder="请选择招生类型" @change='classListChange'/>
									</a-col>
									<a-col :span='7'>
										<div class="choiceTop">
											录取院系
										</div>
									</a-col>
									<a-col :span='14'>
										<a-cascader class="condition" :options="faculty" v-model='facultyId' placeholder="请选择院系" @change='specialtyChange' />
									</a-col>
									<a-col :span='7'>
										<div class="choiceTop">
											专业方向
										</div>
									</a-col>
									<a-col :span='14'>
										<a-cascader class="condition" :options="specialty" v-model='specialtyId' placeholder="请选择专业" @change='classListChange' />
									</a-col>
									<a-col :span='7'>
										<div class="choiceTop">
											生效日期
										</div>
									</a-col>
									<a-col :span='14'>
										<a-date-picker class="condition" @change="onChange" />
									</a-col>
								</a-row>
							</div>
						</div>
						<div class="setCondition">
							<div class="selectionBox">
								分班条件设置：
							</div>
							<div>
								<div class="setBox">
									<div class="conditionTips">
										当分班人数小于计划人数，学生分入班级方式
									</div>
									<div class="selectBox">
										<a-radio-group :options="plainOptions" v-model="value1" @change="onChange1" />
									</div>
								</div>
								<div class="setBox">
									<div class="conditionTips">
										当分班人数达到计划人数，仍有学生未分配时
									</div>
									<div class="selectBox">
										<a-radio-group :options="plainOptions1" v-model="value2" @change="onChange2" />
									</div>
								</div>
								<div class="divisionBtn" @click="fenban">
									<span>开始分班</span>
								</div>
							</div>
						</div>
						<div>
							<a-table :columns="columns2" :data-source="tableData" :defaultCurrent="6"
								:rowKey="(record) => record.id" @change="tableChange" style="margin-top: 10px">
								<div slot="action" slot-scope="id, record">
									<a href="javascript:;" style="color: #028be2">查看</a>
								</div>
							</a-table>
						</div>
					</div>
				</a-col>
				<a-col :span='16'>
					<a-table :scroll="{ x: 1500, y: 300 }" :columns="columns" :data-source="tableDataStu" :defaultCurrent="6" :pagination="pagination"
						:rowKey="(record) => record.id" @change="tableChange" style="margin-top: 10px">
						<div slot="action" slot-scope="id, record">
							<!-- <a href="javascript:;" style="color: #028be2">指定班级</a> -->
							<a style="color: #028be2" @click="(stuId = record.id),(visibleDelete = true)">退班</a>
						</div>
					</a-table>
				</a-col>
			</a-row>
		</div>
		<div>
			<a-modal v-model="visibleDelete" title="删除页面" @ok="closePop">
			     <template slot="footer">		
			        <a-button key="back"  @click="Delete" class="btn"> 确定</a-button>
			        <a-button key="submit" type="primary"  @click="closePop"  class="btn-cancle">取消</a-button>
			        </template>
			
			    <div class="delete-text">确认执行退班?</div>
			</a-modal>
		</div>	
	</div>
</template>

<script>
	import {
		axios
	} from "@/utils/request"

	import {
		Icon
	} from 'ant-design-vue'
	import { getFaculty } from '@/api/enroll/api'
	import JSelectGrade from '@/components/kwglbiz/JSelectGrade'
	const IconFont = Icon.createFromIconfontCN({
		scriptUrl: '//at.alicdn.com/t/font_2390461_f6v2cx4wmzq.js',
	})
	export default {
		components: {
			IconFont,
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
					showTotal: (total, range) => {
						return '显示' + range[0] + '到' + range[1] + '条, 共' + total + '条记录'
					},

					total: 1000,
				},
				tableData: [], //表格的数据的数组
				selectedRowKeys: [], //1 。保存已经选中的角标
				
				
				stuId:'',
				campusList:[] ,//校区选择项
				campusId:[], //校区选择ID
				grade:[], //年级选择项
				gradeId:[] ,//年级选择ID
				//招生类型选择项
				stuType:[
					{
						label:'统一招生',
						value:0
					},
					{
						label:'自主招生',
						value:1
					}
				],
				stuTypeId:[], // 招生选择ID
				specialty:[], // 专业选择项
				specialtyId:[], // 专业选择ID				
				faculty:[], //院系选择项
				facultyId:[], // 选择院系ID
				classList: [], //班级选择项
				classId: [], // 班级选择ID
				visibleDelete: false, //退班弹框
				
				
				
				
				quarter: [{
					value: 'zhejiang',
					label: 'Zhejiang',
				}, ],
				plainOptions: [
					{
						label: '一个班级排满再排下一个班级',
						value: 1
					},
					{
						label: '每个班级人数大致平均',
						value: 2
					},
				],
				plainOptions1:[
					{
						label: '停止分配',
						value: 3
					},
					{
						label: '强制分配（平均）',
						value: 4
					},
				],
				value1: 1,
				value2: 3,
				tableDataStu:[],
				zidongFenbanShowMsg:[],
				// 表格的字段
				columns: [{
						title: '序号',
						dataIndex: 'id',
						key: 'id',
						align: 'center',
						fixed: 'left',
						width: 150,
					},
					{
						title: '姓名',
						dataIndex: 'xm',
						key: 'xm',
						align: 'center',
						fixed: 'left',
						width: 150,
					},
					{
						title: '学号',
						dataIndex: 'xh',
						key: 'xh',
						align: 'center',
						width: 250,
					},
					{
						title: '年级',
						dataIndex: 'njmc',
						key: 'njmc',
						align: 'center',
						width: 150,
					},
					{
						title: '录取校区',
						dataIndex: 'xqmc',
						key: 'xqmc',
						align: 'center',
						width: 150,
					},
					{
						title: '录取专业',
						dataIndex: 'zymc',
						key: 'zymc',
						align: 'center',
						width: 150,
					},
					{
						align: 'center',
						title: '操作',
						dataIndex: 'X',
						key: 'cId',
						fixed: 'right',
						width: 200,
						scopedSlots: {
							customRender: 'action'
						},
					},
				],
				columns2: [
					{
						title: '年级',
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
						title: '人数',
						dataIndex: 'zrs',
						key: 'zrs',
						align: 'center',
					},
				]
			};
		},
		mounted() {
			this.getSearchList()
			this.zidongFenbanShow()
		},
		methods: {
			classListChange(e) {
				if (e.length > 0) {
					this.classId = []
					this.classList = []
					this.getClazz()
				} else {
					this.classId = []
				}
			},
			tableChange(nextPage) {
				this.pagination.current = nextPage.current
				this.zidongFenbanShow()
			},
			getSearchList(){
				this.getFacultyList()
			},
			specialtyChange(e){
				if(e.length > 0){
					this.specialty = []
					this.specialtyId = []
					this.classId = []
					this.classList = []
					this.specialtyList()
					this.getClazz()
				}else{
					this.specialtyId = []
				}
			},
			
			// 获取院系信息
			getFacultyList(){
				getFaculty().then((res)=>{
					if(res.code == '200'){
						for( var i = 0 ;  i < res.result.length ; i++ ){
							this.faculty.push({
								label:res.result[i].yxmc,
								value:res.result[i].id
							})
						}
					}else{
						this.$message.warning('院系信息获取失败')
					}
				})
			},
			
			// 获取专业信息
			specialtyList(){
				axios({
				   url: 'enroll/reportMng/getSpecialty',
				   method: 'post',
				   params: {
				     facultyId: this.facultyId[0],
				   },
				 }).then((res)=>{
					if(res.code == '200'){
						for( var i = 0 ;  i < res.result.length ; i++ ){
							this.specialty.push({
								label:res.result[i].zymc,
								value:res.result[i].id
							})
						}
					}else{
						this.$message.warning('专业信息获取失败')
					}
				})
			},
				
			//自动分班
			fenban(){
				axios({
				   url: 'enroll/fenban/fenban',
				   method: 'post',
				   params: {
					   id:'',
					   choose1:this.value1,
					   choose2:this.value2,
					   gradeId:this.gradeId[0] == undefined ? '' : this.gradeId[0],
					   specId:this.specialtyId[0] == undefined ? '' : this.specialtyId[0],
					   falId:this.facultyId[0] == undefined ? '' : this.facultyId[0],
					   banjiId:'',
					   enrollType:this.stuTypeId[0] == undefined ? '' : this.stuTypeId[0],
				   },
				 }).then((res)=>{
					if(res.code == '200'){
						this.$message.warning('分班成功！')
						this.zidongFenbanShow()
						console.log(res)
					}else{
						this.$message.warning(res.message)
					}
				})
			},
			
			// enroll/fenban/zidongFenbanShow 显示分班后表格
			zidongFenbanShow(){
				axios({
				   url: 'enroll/fenban/zidongFenbanShow',
				   method: 'post',
				   params: {
					   gradeId:this.gradeId[0] == undefined ? '' : this.gradeId[0],
					   specId:this.specialtyId[0] == undefined ? '' : this.specialtyId[0],
					   falId:this.facultyId[0] == undefined ? '' : this.facultyId[0],
					   enrollType:this.stuTypeId[0] == undefined ? '' : this.stuTypeId[0],
					   currentPage: this.pagination.current,
					   pageSize: this.pagination.pageSize
				   },
				 }).then((res)=>{
					if(res.code == '200'){
						this.pagination.total = res.result.count
						this.tableDataStu = res.result.list
					}else{
						this.$message.warning(res.message)
					}
				})
			},
			
			closePop(){
				this.visibleDelete = false
			},
			
			Delete(){
				this.fenbanExit()
				this.visibleDelete = false
			},
			
			// 退班
			fenbanExit(){
				axios({
				   url: 'enroll/fenban/fenbanExit',
				   method: 'post',
				   params: {
					   id:this.stuId,
				   },
				 }).then((res)=>{
					if(res.code == '200'){
						this.$message.success('指定班级退班成功')
						this.zidongFenbanShow()
					}else{
						this.$message.warning('退班失败')
					}
				})
			},
			
			
			// 获取班级信息
			getClazz() {
				axios({
					url: 'enroll/fenban/ShowList',
					method: 'post',
					params: {
						gradeId: this.gradeId[0] == undefined ? '' : this.gradeId[0],
						specId: this.specialtyId[0] == undefined ? '' : this.specialtyId[0],
						enrollType:this.stuTypeId[0] == undefined ? '' : this.stuTypeId[0],
						falId:this.facultyId[0] == undefined ? '' : this.facultyId[0]
					},
				}).then((res) => {
					if (res.code == '200') {
						this.tableData = res.result
					} else {
						this.$message.warning('班级信息获取失败')
					}
				})
			},
			
			onChange1(e) {
				console.log('radio1 checked', e.target.value);
			},
			onChange2(e) {
				console.log('radio1 checked', e.target.value);
			},
			onChange(date, dateString) {
			   console.log(date, dateString);
			},
		}
	}
</script>

<style scoped>
	
	
	.setCondition{
		padding-bottom: 30px;
		border-bottom: 2px solid #3779CA;
	}
	
	.divisionBtn{
		color: #FFFFFF;
		text-align: center;
		font-size: 22px;
		font-family: Microsoft YaHei;
		font-weight: bold;
	}
	.divisionBtn span{
		width: 140px;
		height: 46px;
		background: #4ECB8D;
		border-radius: 5px;
		display: inline-block;
		line-height: 46px;
	}

	.setBox{
		margin-bottom: 10px;
	}

	.conditionTips {
		font-size: 18px;
		font-family: Microsoft YaHei;
		font-weight: bold;
		color: #666666;
	}
	
	.condition,
	.choiceTop {
		margin-bottom: 15px;
	}

	.choiceTop {
		text-align: right;
		font-size: 18px;
		font-family: Microsoft YaHei;
		font-weight: bold;
		color: #666666;
		height: 34px;
		margin-right: 10px;
		line-height: 34px;
	}

	.rangeBox {
		margin-top: 20px;
		padding: 10px 25px;
	}

	.selectionBox {
		height: 60px;
		line-height: 60px;
		color: #999999;
		font-size: 18px;
		font-family: Adobe Heiti Std;
		font-weight: bold;
		border-bottom: 2px solid #3779CA;
		margin-bottom: 20px;
	}

	.tipsBox {
		height: 60px;
		line-height: 60px;
		color: #3581A6;
		background: #E5F3FC;
		border: 1px solid #DEE2E6;
		font-size: 18px;
		font-family: Microsoft YaHei;
		font-weight: bold;
		padding: 0 15px;
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
	.scanTable {
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
	}
	
	.delete-img{
		width: 60px;
		height: 60px;
	}
</style>
