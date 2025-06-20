<template>
	<div>
		<a-row :gutter="[20,20]">
			<a-col :span='24'>
				<a-table :columns="columns" :data-source="tableData" :defaultCurrent="6" :pagination="pagination"
					:rowKey="(record) => record.id" @change="tableChange" style="margin-top: 10px">
				</a-table>
			</a-col>
		</a-row>
		</a-row>
		<a-row>
			<a-col :span='24'>
				<div>
					<span  class="upBtn" @click="upPage">上一步</span>
					<span class="nextBtn" @click="upDate">提交</span>
				</div>
			</a-col>
		</a-row>
	</div>
</template>

<script>
	import {
		Icon
	} from 'ant-design-vue'
	import {
		axios
	} from "@/utils/request"
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
				// 表格的字段
				columns: [],
			};
		},
		mounted() {
			var selectedClass = JSON.parse(sessionStorage.getItem('selectedClass'))
			var sex = sessionStorage.getItem('sex')
			var selectedBad = JSON.parse(sessionStorage.getItem('selectedBad'))
			this.tableData = selectedClass
			var ids = ''
			var susheName = ''
			for(var i = 0 ; i < selectedBad.length; i++){
				console.log(i)
				if(i == 0){
					ids += selectedBad[i].id
					susheName += selectedBad[i].fjbm+'宿舍('+selectedBad[i].kzrs+')'
				}else{
					ids+=','+selectedBad[i].id
					susheName+=','+selectedBad[i].fjbm+'宿舍('+selectedBad[i].kzrs+')'
				}
			}
			this.tableData[0].suName = susheName
			this.tableData[0].ids = ids
			if(sex == 0){
				this.columns = 
					[
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
						title: '一个班级需要床位数',
						dataIndex: 'nansrs',
						key: 'nansrs',
						align: 'center',
					},
					{
						title: '本次安排入住的寝室及床位数',
						dataIndex: 'suName',
						key: 'suName',
						align: 'center',
					},	
				]
			}else{
				this.columns =
					[
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
						title: '需入住人数'+sex,
						dataIndex: 'nvsrs',
						key: 'nvsrs',
						align: 'center',
					},
					{
						title: '一个班级需要男床位数('+this.tableData.nvsrs+')',
						dataIndex: 'nvsrs',
						key: 'nvsrs',
						align: 'center',
					},
					{
						title: '本次安排入住的寝室及床位数',
						dataIndex: 'suName',
						key: 'suName',
						align: 'center',
					},	
				]
			}
		},
		methods: {
			tableChange(nextPage) {
				console.log(nextPage)
			},
			upPage(){
				this.$emit('pages' , 2)
			},
			// 提交数据 2021/7/22 yxb
			upDate(){
				axios({
				   url: '/enroll/fenSushe/confirmArrangeSushe',
				   method: 'post',
				   params: {
						banjiId:this.tableData[0].id,
						susheId:this.tableData[0].ids
				   },
				 }).then((res)=>{
					if(res.code == '200'){
						this.$message.success('操作成功!')
						// console.log(res)
					}else{
						this.$message.warning(res.message)
					}
				})
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
/* 	.scanTable {
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
