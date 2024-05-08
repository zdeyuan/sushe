<template>
	<div style="background:#E9EDF6; padding:30px">
<!-- 		<span class="content-title">
			<a-menu mode="horizontal" class="dorm-modify-top">
				<a-menu-item key="chooseBuild" class="dorm-modify-item">
					<router-link class="link" to="/dorm/chooseBuild?type=2">宿舍分配管理</router-link>
				</a-menu-item>
				<a-menu-item key="dormInvoking" class="dorm-modify-item dorm-modify-after aottom">
					<router-link class="link-active" to="/dorm/dormInvoking">宿舍调换</router-link>
				</a-menu-item>
				<a-menu-item key="3" class="dorm-modify-item dorm-modify-after">
					<router-link class="link" to="/dorm/dormBedChange">学生床位更换</router-link>
				</a-menu-item>
				<a-menu-item key="4" class="dorm-modify-item dorm-modify-after">
					<router-link class="link" to="/dorm/dormDistributionQuery">宿舍分配查询</router-link>
				</a-menu-item>
				<router-view></router-view>
			</a-menu>
		</span> -->
		<span>
			<!-- <a-menu mode="horizontal" class="dorm-modify-top"> -->
			<div class="content-title not-title">
				<router-link class="link-active" to="/dorm/chooseBuild?type=2">宿舍分配管理</router-link>
			</div>
			<div class="content-title">
				<router-link class="link" to="/dorm/dormInvoking">宿舍调用</router-link>
			</div>
			<div class="content-title not-title">
				<router-link class="link" to="/dorm/dormBedChange">学生床位更换</router-link>
			</div>
			<div class="content-title not-title">
				<router-link class="link" to="/dorm/dormDistributionQuery">宿舍分配查询</router-link>
			</div>
			<!-- 				<router-view></router-view>
					</a-menu> -->
		</span>
		<!-- <hr align="left" color=#878787 SIZE=2 style="margin-left: 185px; width: 125px;" /> -->
		<div class="pageContentBox">
			<div class="headTop">宿舍分配 > <span class="notTop">宿舍调换</span></div>
			<div class="content-head">
			</div>
			<div class="content-content">
				<div class="selsctBox">
					<span class="names">宿舍一</span>
					<a-cascader class="condition selsctStyle" :options="oldSchool" placeholder="请选择校区" v-model="campus" @change="editOldSchoolChange" />
					<a-cascader class="condition selsctStyle" :options="oldBuild" placeholder="请选择宿舍" v-model="floor" @change="editOldBuildChange"/>
					<a-cascader class="condition selsctStyle" :options="oldDorm" placeholder="请选择房间" v-model="room" />
				</div>
				<div class="selsctBox">
					<span class="names">宿舍二</span>
					<a-cascader class="condition selsctStyle" :options="newSchool" placeholder="请选择校区" v-model="campus2" @change="editNewSchoolChange" />
					<a-cascader class="condition selsctStyle" :options="newBuild" placeholder="请选择宿舍" v-model="floor2" @change="editNewBuildChange"  />
					<a-cascader class="condition selsctStyle" :options="newDorm" placeholder="请选择房间" v-model="room2" />
				</div>
				<div class="btns">
					<a-button type="primary" style="background-color:#028be2;color:#ffffff;font-weight:bold" @click='changeDormitory'>
					      提交
					</a-button>
					<a-button style="background-color:#999999;color:#ffffff;font-weight:bold" @click='reset'>重置</a-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		axios
	} from "@/utils/request"
	export default {
		data(){
			return{
				campus:[],
				floor:[],
				room:[],
				campus2:[],
				floor2:[],
				room2:[],
				oldSchool:[],
				newSchool:[],
				oldBuild:[],
				newBuild:[],
				oldDorm:[],
				newDorm:[],
				stuName:[],
				stuName2:[],
				options:[
					{
						label:'1',
						value:'1'
					},
					{
						label:'2',
						value:'2'
					},
					{
						label:'3',
						value:'3'
					}
				]
			}
		},
		mounted() {
			this.getSchoolList()
		},
		methods:{
			// 旧校区操作事件
			editOldSchoolChange(val){
				this.oldSchoolChange(val)
			},
			editOldBuildChange(val){
				this.oldBuildChange(val)
			},
			editOldDormChange(val){
				this.oldDormChange(val)
			},
			/* 获取校区列表 */
			getSchoolList() {
				axios({
					url: 'dorm/laiFang/xiaoQu',
					method: 'post',
					params: {}
				}).then(res => {
					for (let school of res.result) {
						this.oldSchool.push({
							value: school.id,
							label: school.name
						});
						this.newSchool.push({
							value: school.id,
							label: school.name
						});
					}
				}).catch(err => {
					this.$message.warning("此处有异常");
				})
			},
			/* 通过校区ID获取宿舍楼列表 */
			oldSchoolChange(value, selectedOptions) {
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
					this.oldBuild.splice(0, this.oldBuild.length);
			
					for (let build of res.result) {
						this.oldBuild.push({
							value: build.id,
							label: build.name
						})
					}
				}).catch(err => {
					this.$message.warning("此处有异常");
				})
			},
			/* 通过校区ID、宿舍楼ID获取宿舍列表 */
			oldBuildChange(value, selectedOptions) {
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
					this.oldDorm = [];
			
					for (let dorm of res.result) {
						this.oldDorm.push({
							value: dorm.id,
							label: dorm.name
						})
					}
				}).catch(err => {
					this.$message.warning("此处有异常");
				})
			},
			/* 通过校区ID、宿舍楼ID、宿舍ID获取学生列表 */
			oldDormChange(value) {
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
			
			
			
			
			
			
			
			// 新宿舍操作事件
			editNewSchoolChange(val){
				this.newSchoolChange(val)
			},
			editNewBuildChange(val){
				this.newBuildChange(val)
			},
			editNewDormChange(val){
				this.newDormChange(val)
			},
			/* 通过校区ID获取宿舍楼列表 */
			newSchoolChange(value, selectedOptions) {
				console.log(value.length)
				if (value.length == 0) {
					return;
				}
				axios({
					url: 'dorm/laiFang/suSheLou',
					method: 'post',
					params: {
						"XQBH": this.campus2[0]
					}
				}).then(res => {
					this.newBuild.splice(0, this.newBuild.length);
			
					for (let build of res.result) {
						this.newBuild.push({
							value: build.id,
							label: build.name
						})
					}
				}).catch(err => {
					this.$message.warning("此处有异常");
				})
			},
			/* 通过校区ID、宿舍楼ID获取宿舍列表 */
			newBuildChange(value, selectedOptions) {
				if (value.length == 0) {
					return;
				}
				axios({
					url: 'dorm/laiFang/suShe',
					method: 'post',
					params: {
						"XQBH": this.campus2[0],
						"SSLBH": this.floor2[0]
					}
				}).then(res => {
					this.newDorm = [];
			
					for (let dorm of res.result) {
						this.newDorm.push({
							value: dorm.id,
							label: dorm.name
						})
					}
				}).catch(err => {
					this.$message.warning("此处有异常");
				})
			},
			/* 通过校区ID、宿舍楼ID、宿舍ID获取学生列表 */
			newDormChange(value) {
				if (value.length == 0) {
					return;
				}
				axios({
					url: 'dorm/laiFang/student',
					method: 'post',
					params: {
						"XQBH": this.campus2[0],
						"SSLBH": this.floor2[0],
						"SSBH": this.room2[0]
					}
				}).then(res => {
					this.stuName2 = [];
			
					for (let stu of res.result) {
						this.stuName2.push({
							value: stu.id,
							label: stu.name
						})
					}
				}).catch(err => {
					this.$message.warning("此处有异常");
				})
			},
			
			// 重置操作
			reset(){
				this.oldSchool = [],
				this.newSchool = [],
				this.oldBuild = [],
				this.newBuild = [],
				this.oldDorm = [],
				this.newDorm = [],
				this.stuName = [],
				this.stuName2 = [],
				this.getSchoolList()
			},
			
			
			changmsg(arr){
				if(arr.length < 1){
					return false
				}
				return true
			},
			
			// 提交操作
			changeDormitory(){
				if(!this.changmsg(this.room[0]) && !this.changmsg(this.room2[0])){
					this.$message.warning("请选择房间信息");
				}
				var arr = []
				axios({
					url: 'dorm/allotSuShe/replaceSuShe',
					method: 'post',
					params:{
						ssId1:this.room[0],
						ssId2:this.room2[0],
					},
				}).then(res => {
					console.log(res)
					if(res.code== '200'){
						this.$message.success("宿舍调换成功");
					}else{
						this.$message.warning(res.message)
					}
				}).catch(err => {
					this.$message.warning("此处有异常");
				})
			}
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
