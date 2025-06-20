<template>
	<div>
		<a-row>
			<a-col :span='24'>
				<div class="content-head-type2">
					<div>
						<span class="title_span">院系：</span>
						<a-cascader class="condition" :options="faculty" v-model='facultyId' placeholder="请选择院系"/>
						<span class="title_span">楼栋：</span>
						<a-cascader class="condition" :options="floor"  v-model='floorId' placeholder="请选择楼栋" />
						<span class="title_span">楼层号：</span>
						<a-cascader class="condition" :options="storey" v-model='storeyId' placeholder="请选择楼层号" />
					</div>
					<div>
						<span class="title_span">宿舍号：</span>
						<a-input class="search-text" v-model='dormitoryCode'></a-input>
						<a-button type="primary" icon="search" style="margin-left: 10px;"  @click='getArrangeSusheList'>
							<span class="flex_box">
								搜索
							</span>
						</a-button>
						<a-button type="danger" style="margin-left: 10px;" >
							<span class="flex_box">
								清空
							</span>
						</a-button>
					</div>
				</div>	
			</a-col>
		</a-row>
		<a-row :gutter="[20,20]">
			<a-col :span='15'>
				<a-table :columns="columns" :data-source="tableData" :defaultCurrent="6" :pagination="pagination" 
					:row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
					:rowKey="(record) => record.id" @change="tableChange" style="margin-top: 10px">
				</a-table>
			</a-col>
			<a-col :span='9'>
				<a-table :columns="columnsMsg" :data-source="tableDataBad" :defaultCurrent="6"
					:rowKey="(record) => record.id" @change="tableChange" style="margin-top: 10px">
					<span slot="kzrs" slot-scope="text, record">
						{{record.fjbm}}宿舍（{{record.kzrs}})人
					</span>
				</a-table>
			</a-col>
		</a-row>
		</a-row>
		<a-row>
			<a-col :span='24'>
				<div>
					<span  class="upBtn" @click="upPage">上一步</span>
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
	import { getFaculty } from '@/api/enroll/api'
	export default {
		components: {
			Icon
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
				
				
				faculty:[], // 选择院系
				facultyId:[], // 选择院系ID
				floor:[], // 选择楼栋
				floorId:[], // 楼栋ID
				storey:[], // 选择楼层
				storeyId:[], // 选择楼层ID
				dormitoryCode:'',
				classMsg:[],
				sex:'',
				
				tableDataBad:[],
				// 表格的字段
				columns: [{
						title: '序号',
						dataIndex: 'id',
						key: 'id',
						align: 'center',
						fixed: 'left'
					},
					{
						title: '楼栋楼层号',
						dataIndex: 'lch',
						key: 'lch',
						align: 'center',
						fixed: 'left'
					},
					{
						title: '宿舍类型',
						dataIndex: 'sslx',
						key: 'sslx',
						align: 'center',
					},
					{
						title: '宿舍号',
						dataIndex: 'fjbm',
						key: 'fjbm',
						align: 'center',
					},
					{
						title: '可住人数',
						dataIndex: 'kzrs',
						key: 'kzrs',
						align: 'center',
					},
					{
						title: '入住人数',
						dataIndex: 'yzrs',
						key: 'yzrs',
						align: 'center',
					},
					{
						title: '入住性别',
						dataIndex: 'sex',
						key: 'sex',
						align: 'center',
					}
				],
				columnsMsg: []
			};
		},
		mounted() {
			this.classMsg = JSON.parse(sessionStorage.getItem('selectedClass'))
			this.sex = sessionStorage.getItem('sex')
			if(this.sex[0] == 0){
				this.columnsMsg = [{
					title: '一个班级需要男床位数('+this.classMsg[0].nansrs+')',
					dataIndex: 'kzrs',
					key: 'kzrs',
					align: 'center',
					scopedSlots: {
						customRender: 'kzrs'
					},
				}
			]
			}else{
				this.columnsMsg = 
				[
					{
						title: '一个班级需要女床位数('+this.classMsg[0].nvsrs+')',
						dataIndex: 'kzrs',
						key: 'kzrs',
						align: 'center',
					}
				]
			}
			this.getFacultyList()
			this.getArrangeSusheList()
		},
		methods: {
			remoData(id){
				console.log(id)
				var index = this.tableDataBad.findIndex(item => item.id = id)
				console.log(index)
				this.tableDataBad.splice(index, 1)
				console.log(this.tableDataBad)
				// var index2 = this.selectedRowKeys.findIndex(item => item = id)
				// console.log(index2)
				// this.tableDataBad.splice(index, 1)
				// console.log(this.tableDataBad)
				// var msg = JSON.parse(JSON.stringify(this.selectedRowKeys))
				// msg.splice(index2,1)
				// this.selectedRowKeys = msg
				// console.log(this.selectedRowKeys)
			},
			//选择要安排入住的寝室表格
			getArrangeSusheList(){
				axios({
				   url: '/enroll/fenSushe/getArrangeSusheList',
				   method: 'post',
				   params: {
				     jzwmc: this.floorId[0] == undefined ? '' : this.floorId[0],
					 lch:this.storeyId[0] == undefined ? '' : this.storeyId[0],
					 fjbm:this.dormitoryCode,
					 currentPage:this.pagination.current,
					 pageSize:this.pagination.pageSize,
					 kzrs:'',
					 ssrs: 0,
					 sfwk: 0,
					 xb:this.sex == 0 ? 1 : 2
				   },
				 }).then((res)=>{
					if(res.code == '200'){
						for(let i = 0 ; i< res.result.list.length; i++){
							res.result.list[i].sslx = res.result.list[i].kzrs+'人宿舍'
							res.result.list[i].sex = res.result.list[i].rzxb == 1 ? '男' : '女'
						}
						this.tableData = res.result.list
						this.pagination.total = res.result.count
						console.log(res)
					}else{
						this.$message.warning('宿舍信息获取失败')
					}
				})
			},
			tableChange(nextPage) {
				console.log(nextPage)
				this.pagination.current = nextPage.current
				this.getArrangeSusheList()
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
			
			onSelectChange(selectedRowKeys) {
				console.log('执行通过')
				this.selectedRowKeys = selectedRowKeys;
				this.tableDataBad = []
				for(let i = 0 ; i < this.selectedRowKeys.length ; i++){
					var data = this.tableData.find(item => item.id == this.selectedRowKeys[i])
					this.tableDataBad.push(data)
				}
				console.log(this.tableDataBad)
			},
			
			
			
			// 上一步下一步操作
			nextPage(){	
				sessionStorage.setItem('selectedBad',JSON.stringify(this.tableDataBad))
				if(this.tableDataBad[0] == undefined){
					this.$message.warning('请先选择宿舍！！')
					return
				}
				this.$emit('pages' , 3)
			},
			upPage(){
				this.$emit('pages' , 1)
			}
		}
	}
</script>

<style scoped>
	

	.pageContentBox {
		padding: 30px;
	}

	.nextBtn,.upBtn{
		display: inline-block;
		margin-right: 20px;
	}
	
	.nextBtn {
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
	
	.upBtn{
		width: 120px;
		height: 40px;
		border-radius: 5px;
		font-size: 18px;
		font-family: Microsoft YaHei;
		color: #ffffff;
		text-align: center;
		border: 1px solid #028BE2;
		color: #028BE2;
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
		width: 190px;
		height: 34px;
		background: #ffffff;
		border: 1px solid rgba(166, 177, 194, 0.3);
		border-radius: 4px;
		position: relative;
		top: -2px;
		margin-right: 20px;
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
