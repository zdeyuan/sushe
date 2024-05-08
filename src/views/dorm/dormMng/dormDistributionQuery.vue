<template>
	<div style="background:#E9EDF6; padding:30px">
<!-- 		<span class="content-title">
			<a-menu mode="horizontal" class="dorm-modify-top">
				<a-menu-item key="chooseBuild" class="dorm-modify-item">
					<router-link class="link" to="/dorm/chooseBuild?type=2">宿舍分配管理</router-link>
				</a-menu-item>
				<a-menu-item key="dormInvoking" class="dorm-modify-item dorm-modify-after">
					<router-link class="link" to="/dorm/dormInvoking">宿舍调用</router-link>
				</a-menu-item>
				<a-menu-item key="3" class="dorm-modify-item dorm-modify-after">
					<router-link class="link" to="/dorm/dormBedChange">学生床位更换</router-link>
				</a-menu-item>
				<a-menu-item key="4" class="dorm-modify-item dorm-modify-after aottom">
					<router-link class="link-active" to="/dorm/dormDistributionQuery">宿舍分配查询</router-link>
				</a-menu-item>
				<router-view></router-view>
			</a-menu>
		</span> -->
		<span>
			<!-- <a-menu mode="horizontal" class="dorm-modify-top"> -->
			<div class="content-title not-title">
				<router-link class="link-active" to="/dorm/chooseBuild?type=2">宿舍分配管理</router-link>
			</div>
			<div class="content-title not-title">
				<router-link class="link" to="/dorm/dormInvoking">宿舍调用</router-link>
			</div>
			<div class="content-title not-title">
				<router-link class="link" to="/dorm/dormBedChange">学生床位更换</router-link>
			</div>
			<div class="content-title ">
				<router-link class="link" to="/dorm/dormDistributionQuery">宿舍分配查询</router-link>
			</div>
			<!-- 				<router-view></router-view>
					</a-menu> -->
		</span>
		<!-- <hr align="left" width=147 color=#878787 SIZE=2 style="margin-left: 540px;" /> -->
		<div class="pageContentBox">
			<div class="headTop">宿舍分配 > <span class="notTop">宿舍分配查询</span></div>
			<div class="content-head">

				<!-- <div style="min-width: 1000px;"></div> -->

				<div>
					<span class="head-span">校区</span>
					<a-cascader class="condition selsctStyle" :options="school" placeholder="请选择校区" v-model="campus" @change="editOldSchoolChange" />
				</div>
				
				<div>
					<span class="head-span">宿舍</span>
					<a-cascader class="condition selsctStyle" :options="Build" placeholder="请选择宿舍" v-model="floor" @change="editOldBuildChange"/>
				</div>
				
				<div>
					<span class="head-span">房间</span>
					<a-cascader class="condition selsctStyle" :options="Dorm" placeholder="请选择房间" v-model="room" @change="editOldDormChange"/>
				</div>


				<div>
					<span class="head-span">姓名</span>
					<a-cascader class="condition selsctStyle" :options="stuName" placeholder="请选择学生" v-model="name" />
				</div>

				<div>
					<a-button  class="content-button button-blue" style="font-size:16px;width:88px;height:34px;background-color:#1AE642 " @click="getDistriList">
						<icon-font type="iconsousuo" style="color: #FFFFFF;" />
						搜索
					</a-button>

					<a-button  class="content-button button-orange button-after" style="font-size:16px;width:88px;height:34px;background-color:#E61A1A " @click="resetAll">
						<icon-font type="iconqingkong1" style="color: #FFFFFF;" />
						清空
					</a-button>
				</div>
			</div>
			<div>
				<a-table :columns="columns" :data-source="data" :defaultCurrent="6" :pagination="pagination"
					@change="tableChange" class="long-table">
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

<style scoped="scoped">
	.dorm-modify-top {
		width: 1000px;
		height: 80px;
		border: 0px;
		background-color: #E9EDF6;
		
	}
	.aottom{
		border-bottom: 3px solid #666;
	}

	.dorm-modify-item {
		width: 150px;
	}

	.dorm-modify-after {
		margin-left: 30px;
	}

	.link {
		font-family: "MicrosoftYaHei";
		font-size: 20px;
		text-align: center;
		font-weight: bold;
		color: #999999 !important;
	}

	.link-active {
		font-family: "MicrosoftYaHei";
		font-size: 20px;
		text-align: center;
		font-weight: bold;
		color: #666666 !important;
	}

	.long-table tr {
		font-size: 20px;
	}
	
	.content-content{
		padding: 30px;
		min-height: 500px;
	}
	
	.selsctBox{
		margin: 10px 0;
		height: 50px;
		line-height: 50px;
	}
	.names{
		font-size: 20px;
		font-weight: 700;
		margin-right: 20px;
	}
	.selsctStyle{
		margin: 0 15px;
	}
	.btns{
		margin-top: 300px;
		text-align: center;
	}
	.btns button{
		margin: 0 10px;
	}
</style>
