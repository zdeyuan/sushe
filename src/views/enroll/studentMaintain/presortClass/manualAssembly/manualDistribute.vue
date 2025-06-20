<template>
	<div>
		<div class="pageContentBox">
			<a-row>
				<a-col :span='24'>
					<div class="content-head-type2">
						<div style="margin-bottom: 10px;">
							<span class="title_span">所属年级：</span>
							<a-cascader class="condition" :options="grade"  v-model='gradeId' placeholder="请选择年级" />
							<span class="title_span">院系：</span>
							<a-cascader class="condition" :options="faculty" v-model='facultyId' placeholder="请选择院系" @change='specialtyChange' />
							<span class="title_span">专业：</span>
							<a-cascader class="condition" :options="specialty" v-model='specialtyId' placeholder="请选择专业" />
							<span class="title_span">分配状态：</span>
							<a-cascader class="condition" :options="stateList" v-model='state' placeholder="请选择分配状态" />
						</div>
						<div>
							<span class="title_span">招生类型：</span>
							<a-cascader class="condition" :options="stuType" v-model='stuTypeId' placeholder="请选择招生类型" />
							<a-button type="primary" icon="search" style="margin-left: 10px;"  @click='getFenbanShow'>
								<span class="flex_box">
									搜索
								</span>
							</a-button>
							<a-button type="danger" style="margin-left: 10px;"  @click = 'empty'>
								<span class="flex_box">
									清空
								</span>
							</a-button>
						</div>
					</div>	
				</a-col>
				<a-col :span='24'>
					<div style="margin-top: 10px;">
					<!-- <a-button type="primary" style="margin-right:10px;"  @click="handleExportXls('新生信息')">
						<span class="flex_box">
							
							导出
						</span>
					</a-button> -->
					<a-button type="primary" style="margin-right:10px;" >
						<span class="flex_box">
							打印
						</span>
					</a-button>
					<a-button type="primary" style="margin-right:10px;" @click='(classShow = true),(classType = 2)'>
						<span class="flex_box">
							指定班级
						</span>
					</a-button>
					<a-button type="primary"  icon="reload" @click='getFenbanShow'>
						<span class="flex_box">
							刷新
						</span>
					</a-button>
					</div>
				</a-col>
			</a-row>
			<a-table :scroll="{ x: 1500, y: 300 }" :columns="columns" :data-source="tableData" :defaultCurrent="6" :pagination="pagination"
				:rowKey="(record) => record.id" @change="tableChange" style="margin-top: 10px"
				:row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }">
				<div slot="statuId" slot-scope="id, record">
					{{record.statuId == 0 ? '未分配' : '已分配'}}
				</div>	
				<div slot="action" slot-scope="id, record">
					<a style="color: #028be2" v-if='record.xzbmc == null' @click="(classShow = true),(classType = 1),(stuId = record.id)">指定班级</a>
					<a style="color: #028be2" v-if='record.xzbmc !== null' @click="(stuId = record.id),(visibleDelete = true)">退班</a>
				</div>
			</a-table>
			<br />
			</a-row>
		</div>
		<div class="popBox">
			<a-modal v-model="classShow" title="指定班级"
				on-ok="handleOk" :width="872">
				<template slot="footer">
					<a-button key="submit" type="primary" @click="handleOk"> 确定 </a-button>
					<a-button key="back" @click="cancel"> 返回 </a-button>
				</template>
				<a-row>
					<a-col :span='7'>
						<div class="choiceTop">
							年级
						</div>
					</a-col>
					<a-col :span='14'>
						<j-select-grade placeholder="请选择年级" v-model="gradeId" @change="classListChange"></j-select-grade>
					</a-col>
					<a-col :span='7'>
						<div class="choiceTop">
							招生类型
						</div>
					</a-col>
					<a-col :span='14'>
						<a-cascader class="condition" :options="stuType" v-model='stuTypeId2' placeholder="请选择招生类型" />
					</a-col>
					<a-col :span='7'>
						<div class="choiceTop">
							录取院系
						</div>
					</a-col>
					<a-col :span='14'>
						<a-cascader class="condition" :options="faculty" v-model='facultyId2' placeholder="请选择院系" @change='specialtyChange2' />
					</a-col>
					<a-col :span='7'>
						<div class="choiceTop">
							录取专业方向
						</div>
					</a-col>
					<a-col :span='14'>
						<a-cascader class="condition" :options="specialty" v-model='specialtyId2' placeholder="请选择专业" @change='classListChange'/>
					</a-col>
					<a-col :span='7'>
						<div class="choiceTop">
							班级
						</div>
					</a-col>
					<a-col :span='14'>
						<a-cascader class="condition" :options="classList" v-model='classId2' placeholder="请选择班级" />
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
			</a-modal>
			
			
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
	import JSelectGrade from '@/components/kwglbiz/JSelectGrade'
	import { getFaculty } from '@/api/enroll/api'
	const IconFont = Icon.createFromIconfontCN({
		scriptUrl: '//at.alicdn.com/t/font_2390461_f6v2cx4wmzq.js',
	})
	import {
		EduListMixin
	} from '@/mixins/EduListMixin';
	export default {
		mixins: [EduListMixin],
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
				
				
				faculty:[], //院系选择项
				facultyId:[], // 选择院系ID
				facultyId2:[], // 选择院系ID
				specialty:[], //专业选择项
				specialtyId:[], // 专业选择ID
				specialtyId2:[], // 专业选择ID
				grade:[], // 所属年级
				gradeId:[], //选择年级ID
				gradeId2:[], //选择年级ID
				stateList:[
					{
						label:'未分配',
						value:0,
					},
					{
						label:'已分配',
						value:1
					}
				], 
				state:[], // 状态选择ID
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
				stuTypeId:[],
				stuTypeId2:[],
				url: {
					list: 'enroll/fenban/fenbanShow',
					exportXlsUrl: 'enroll/fenbanImport/export',
					//importExcelUrl: 'enroll/stuInfoQuery/jiayouUploading',
				},
				classShow:false,
				classType:'',
				classList:[],//班级列表
				classId2:[], //班级id
				stuId:'',
				visibleDelete: false, //退班弹框
				
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
						width: 250,
						align: 'center',
					},
					{
						title: '所属年级',
						dataIndex: 'njmc',
						key: 'njmc',
						width: 150,
						align: 'center',
					},
					{
						title: '入学年份',
						dataIndex: 'njdm',
						key: 'njdm',
						width: 150,
						align: 'center',
					},
					{
						title: '招生类型',
						dataIndex: 'enrollType',
						key: 'enrollType',
						width: 150,
						align: 'center',
					},
					{
						title: '录取批次',
						dataIndex: 'luqu',
						width: 150,
						key: 'luqu',
						align: 'center',
					},
					{
						title: '录取校区',
						dataIndex: 'xqmc',
						key: 'xqmc',
						width: 150,
						align: 'center',
					},
					{
						title: '录取专业',
						dataIndex: 'zymc',
						key: 'zymc',
						width: 150,
						align: 'center',
					},
					{
						title: '分配班级',
						dataIndex: 'xzbmc',
						key: 'xzbmc',
						width: 150,
						align: 'center',
					},
					{
						title: '分配状态',
						dataIndex: 'statuId',
						key: 'statuId',
						width: 150,
						align: 'center',
						scopedSlots: {
							customRender: 'statuId'
						},
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
			};
		},
		mounted() {
			this.getSearchList()
			this.getFenbanShow()
		},
		methods: {
			empty(){
				this.facultyId = [] // 选择院系ID
				this.specialtyId = [] // 专业选择ID
				this.gradeId = [] //选择年级ID
				this.state = [] // 状态选择ID
				this.stuTypeId = []
				this.getFenbanShow()
			},
			classListChange(e) {
				if (e.length > 0) {
					this.classId = []
					this.getClazz()
				} else {
					this.classId = []
				}
			},
			
			onSelectChange(selectedRowKeys) {
			    this.selectedRowKeys = selectedRowKeys;
			},
			
			// 获取班级信息
			getClazz() {
				axios({
					url: 'enroll/divideClassMng/getClazz',
					method: 'post',
					params: {
						gradeId: this.gradeId2[0],
						specialtyId: this.specialtyId2[0] == undefined ? 0 : this.specialtyId2[0]
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
			
			getFenbanShow(){
				console.log(this.facultyId[0] )
				axios({
				   url: '/enroll/fenban/fenbanShow',
				   method: 'post',
				   params: {
				     falId: this.facultyId[0] == undefined ? '' : this.facultyId[0],
					 gradeId:this.gradeId[0] == undefined ? '' : this.gradeId[0],
					 enrollType:this.stuTypeId[0] == undefined ? '' : this.stuTypeId[0],
					 specId:this.specialtyId[0] == undefined ? '' : this.specialtyId[0],
					 statuId:this.state[0] == undefined ? '' : this.state[0],
					 currentPage:this.pagination.current,
					 pageSize:this.pagination.pageSize
				   },
				 }).then((res)=>{
					if(res.code == '200'){
						console.log(res)
						this.tableData = res.result.list
						this.pagination.total = res.result.count == null ? this.tableData.length : res.result.count
					}else{
						this.$message.warning('专业信息获取失败')
					}
				})
			},
			tableChange(nextPage) {
				this.pagination.current = nextPage.current
				this.getFenbanShow()
				console.log(nextPage)
			},
			// 字典接口整合，开始时调用
			getSearchList(){
				this.getFacultyList()
			},
			// 院系点击时判断
			specialtyChange(e){
				console.log('执行')
				if(e.length > 0){
					this.specialtyId = []
					this.specialty = []
					this.specialtyList()
				}else{
					this.specialtyId = []
					this.specialtyId2 = []
				}
			},
			specialtyChange2(e){
				console.log('执行')
				if(e.length > 0){
					this.specialtyId2 = []
					this.specialty = []
					this.specialtyList2()
				}else{
					this.specialtyId = []
					this.specialtyId2 = []
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
			specialtyList2(){
				axios({
				   url: 'enroll/reportMng/getSpecialty',
				   method: 'post',
				   params: {
				     facultyId: this.facultyId2[0],
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
			
			// 获取所属年级
			getGrade(){
				axios({
				   url: 'enroll/divideClassMng/getGrade',
				   method: 'post',
				   params: {},
				 }).then((res)=>{
					if(res.code == '200'){
						for( var i = 0 ;  i < res.result.length ; i++ ){
							this.grade.push({
								label:res.result[i].njmc,
								value:res.result[i].id
							})
						}
					}else{
						this.$message.warning('所属年级信息获取失败')
					}
				})
			},
			
			// 手动指定班级
			fenbanToStu(){
				axios({
				   url: 'enroll/fenban/fenbanToStu',
				   method: 'post',
				   params: {
					   id:this.stuId,
					   banjiId:this.classId2[0]
				   },
				 }).then((res)=>{
					if(res.code == '200'){
						this.$message.success('指定班级成功')
						this.getFenbanShow()
					}else{
						this.$message.warning('所属年级信息获取失败')
					}
				})
			},
			
			
			// 手动多个指定班级
			fenbanToStus(){
				var ids =''
				for(let i = 0 ; i< this.selectedRowKeys.length ; i++){
					if(i == 0){
						ids += this.selectedRowKeys[i]
					}else{
						ids += ','+this.selectedRowKeys[i]
					}
				}
				axios({
				   url: 'enroll/fenban/fenbanMoreToStu',
				   method: 'post',
				   params: {
					   id:ids,
					   banjiId:this.classId2[0]
				   },
				 }).then((res)=>{
					if(res.code == '200'){
						this.$message.success('指定班级成功')
						this.selectedRowKeys = []
						this.getFenbanShow()
					}else{
						this.$message.warning('所属年级信息获取失败')
					}
				})
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
						this.getFenbanShow()
					}else{
						this.$message.warning('退班失败')
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
			
			handleOk(){
				if(this.classType == 1 ){
					this.fenbanToStu()
				}else if(this.classType == 2){
					this.fenbanToStus()
				}
				this.classShow = false
			},
			cancel(){
				this.classShow = false
			},
			onChange(date, dateString) {
			   console.log(date, dateString);
			},
		}
	}
</script>

<style scoped>
	

	/* .condition,
	.choiceTop {
		margin-bottom: 15px;
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
	} */

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

	/* .single,
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
	} */
</style>
