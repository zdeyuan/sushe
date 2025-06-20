<template>
	<div >
			<div class="top">

					<span class="head-span">校区：</span>
					<a-cascader class="condition selsctStyle" :options="school" placeholder="请选择校区" v-model="campus" @change="editOldSchoolChange" />
					<span class="head-span">宿舍：</span>
					<a-cascader class="condition selsctStyle" :options="Build" placeholder="请选择宿舍" v-model="floor" @change="editOldBuildChange"/>
					<span class="head-span">房间：</span>
					<a-cascader class="condition selsctStyle" :options="Dorm" placeholder="请选择房间" v-model="room" @change="editOldDormChange"/>
					<span class="head-span">姓名：</span>
					<a-cascader class="condition selsctStyle" :options="stuName" placeholder="请选择学生" v-model="name" />

					<a-button  type="primary" style="margin-left: 20px;" icon="search" @click="getDistriList">
						搜索
					</a-button>

					<a-button style="margin-left: 20px;"  @click="resetAll" type="danger" icon="reset">
						清空
					</a-button>
			</div>
			<div>
				<a-table :columns="columns" :data-source="data" :defaultCurrent="6" :pagination="pagination"
					@change="tableChange" class="long-table">
				</a-table>
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
	const columns = [
		{
			title: '学生姓名',
			dataIndex: 'xm',
			key: 'xm',
		},
		{
			title: '学号',
			dataIndex: 'xh',
			key: 'xh',
		},
		{
			title: '宿舍楼',
			dataIndex: 'jzwmc',
			key: 'jzwmc',
		},
		{
			title: '层数',
			dataIndex: 'lcname',
			key: 'lcname',
		},
		{
			title: '宿舍名称',
			dataIndex: 'fjbm',
			key: 'fjbm',
		},
		{
			title: '状态',
			dataIndex: 'cwh',
			key: 'cwh',
		},
	];
	export default {
		components: {
			IconFont,
		},
		data(){
			return{
				campus:[],
				floor:[],
				room:[],
				name:[],
				data:[],
				columns,
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
				school:[],
				Build:[],
				Dorm:[],
				stuName:[],
				
			}
		},
		mounted() {
			this.getDistriList()
			this.getSchoolList()
		},
		methods:{
			tableChange(pagination, filters, sorter) {
				this.pagination.current = pagination.current;
				this.pagination.pageSize = pagination.pageSize;
			},
			getModifyQuery(){
				console.log("点击了搜索")
			},
			resetAll(){
				this.school = [],
				this.Build = [],
				this.Dorm = [],
				this.stuName = [],
				console.log("点击了清空")
			},
			
			
			getDistriList(){
				axios({
					url: 'dorm/allotSuShe/list',
					method: 'post',
					params: {
						XQH:this.campus[0],
						SSLH:this.floor[0],
						fjbh:this.room[0],
						stuId:this.name[0]
					}
				}).then(res => {
					console.log(res)
					if(res.code == '200'){
						this.data = res.result
						console.log(res)
						this.pagination.total = res.result.length
						
					}
				}).catch(err => {
					this.$message.warning("此处有异常");
				})
			},
			
			
			
			
			// 学校列表操作
			getSchoolList() {
				axios({
					url: 'dorm/laiFang/xiaoQu',
					method: 'post',
					params: {}
				}).then(res => {
					for (let school of res.result) {
						this.school.push({
							value: school.id,
							label: school.name
						});
					}
				}).catch(err => {
					this.$message.warning("此处有异常");
				})
			},
			// 校区操作事件
			editOldSchoolChange(val){
				this.schoolChange(val)
			},
			editOldBuildChange(val){
				this.buildChange(val)
			},
			editOldDormChange(val){
				this.dormChange(val)
			},
			
			
			/* 通过校区ID获取宿舍楼列表 */
			schoolChange(value, selectedOptions) {
				console.log(value.length)
				if (value.length == 0) {
					return;
				}
				axios({
					url: 'dorm/laiFang/suSheLou',
					method: 'post',
					params: {
						"XQBH": this.campus[0]
					}
				}).then(res => {
					this.Build.splice(0, this.Build.length);
			
					for (let build of res.result) {
						this.Build.push({
							value: build.id,
							label: build.name
						})
					}
				}).catch(err => {
					this.$message.warning("此处有异常");
				})
			},
			
			/* 通过校区ID、宿舍楼ID获取宿舍列表 */
			buildChange(value, selectedOptions) {
				if (value.length == 0) {
					return;
				}
				axios({
					url: 'dorm/laiFang/suShe',
					method: 'post',
					params: {
						"XQBH": this.campus[0],
						"SSLBH": this.floor[0]
					}
				}).then(res => {
					this.Dorm = [];
			
					for (let dorm of res.result) {
						this.Dorm.push({
							value: dorm.id,
							label: dorm.name
						})
					}
				}).catch(err => {
					this.$message.warning("此处有异常");
				})
			},
			
			/* 通过校区ID、宿舍楼ID、宿舍ID获取学生列表 */
			dormChange(value) {
				this.studentId = [];
				this.stuName = [];
				if (value.length == 0) {
					return;
				}
				axios({
					url: 'dorm/laiFang/student',
					method: 'post',
					params: {
						"XQBH": this.campus[0],
						"SSLBH": this.floor[0],
						"SSBH": this.room[0]
					}
				}).then(res => {
					this.stuName = [];
			
					for (let stu of res.result) {
						this.stuName.push({
							value: stu.id,
							label: stu.name
						})
					}
				}).catch(err => {
					this.$message.warning("此处有异常");
				})
			},
		}
	}
</script>

<style scoped>
	.top {
		padding:20px;
		display: flex;
		align-items: center;
	}
	.head-span{
		text-align:right;
		width:90px;
		display: inline-block;
	}
</style>
