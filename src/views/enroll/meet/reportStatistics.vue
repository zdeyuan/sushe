<template>
	<div  class='constbox'>
		
		<div class="pageContentBox">
			<div class="content-head">

				<div>
					<span class="head-span">学校：</span>
					<a-cascader class="condition" :options="school" v-model="schoolId" placeholder="请选择学校" />
				
					<j-select-zyb placeholder="请选择院系" v-model="facultyId"  :trigger-change="false" ></j-select-zyb>
					
					<span class="head-span">专业：</span>
					<j-select-zy-by-zyb ref="zyByZyb" placeholder="请选择专业" v-model="specialtyId"  :trigger-change="false"></j-select-zy-by-zyb>
									
					<span class="head-span">班级：</span>
					<j-select-banji-by-zy ref="banjiByZy" placeholder="请先选择专业"
					                      v-model="clazzId"></j-select-banji-by-zy>
					
					<span class="head-span">日期：</span>
					<!-- <a-cascader class="condition" :options="schoolDate" placeholder="请选择日期"  /> -->
					<DatePickByCN
					   v-model="curDate"
					  placeholder="请选择日期"
					    />
					<a-button  type="primary" icon="search" style="margin-top: 10px;" @click="search">
						搜索
					</a-button>
					<a-button  type="danger" style="margin-left: 10px;"  @click="clean" >
						清空
					</a-button>
				</div>
				
			</div>
			<div class="statisticsBox">
				<statistics :data = 'statisticsData'/>
			</div>	
		</div>	
	</div>
</template>


<script>
import statistics from './components/statistics.vue'
import { Icon } from 'ant-design-vue'
import {axios} from "@/utils/request"
import JSelectBanjiByZy from '@/components/kwglbiz/JSelectBanjiByZy'
	import JSelectZyb from '@/components/kwglbiz/JSelectZyb'
	import JSelectZyByZyb from '@/components/kwglbiz/JSelectZyByZyb'
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2390461_f6v2cx4wmzq.js',
})

export default{
	
	
	mounted() {	
			this.getSchool();		
			this.getFaculty();
			this.getStatistics();
		},
	components:{
		statistics,
		JSelectZyByZyb,
		JSelectZyb,
		JSelectBanjiByZy
	},	
	data ( ) {
		
		return {
			statisticsData:[],
			
			school:[],
			
			department:[],
			
			schoolClass:[],
			
			// schoolDate:[],
			
			curSchool:'',

			curFaculty: 0,

			curClazz: 0,

			curDate:'',
			//专业部的下拉框数据
      		faculty: [],
      		facultyId: [],
			schoolId:'',
    		//班级的下拉框数据
			clazz: [],
			clazzId: [],
		}
		
	},
	methods: {
			getSchool(){
				this.school.push({
					value:0,
					label:'',
				})

			},
			getFaculty() {
				this.faculty = [];
				this.facultyId = [];
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
					this.$message.warning("获取专业部失败");
				})
			},
			facultyChange(value){
				console.log(value+"value")
				// this.schoolClass = [];
				this.clazz = [];
				this.clazzId = [];
				let facultyId = value[0];
				if (value.length == 0) {
					return;
				}
			
				axios({
					url: 'enroll/reportStatistics/selectClassByFacultyId',
					method: 'post',
					params: {

						"facultyId":facultyId,

					}
				}).then(res => {

					// this.clazz.splice(0, this.clazz.length);
					console.log(this.clazz+"clazz");
					for (let clazz of res.result) {
						this.clazz.push({
							value: clazz.id,
							label: clazz.xzbmc
						})
					}
				}).catch(err => {
					this.$message.warning("获取班级失败");
				})
			},
			// classChange(){

			// },
			search(){			
						
				// this.curFaculty = this.facultyId;
				
				// this.curClazz = this.clazzId.length == 0 ? 0 : this.clazzId[0];

				this.getStatistics();

			},
			getStatistics(){
				this.statisticsData = [];
				if (this.curDate == null) {
					this.curDate = '';
					console.log("curdate=null");
				}
				//出生日期格式修改
				if (this.curDate == '' || this.curDate == undefined) {
				this.curDate == ''
				} else {
				let d = new Date(this.curDate)
				let youWant = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
					this.curDate = youWant
				}
				
				axios({
					url: 'enroll/reportStatistics/getStatistics',
					method: 'post',
					params: {
						"school":this.schoolId,
						"facultyId": this.facultyId.length==0?0:this.facultyId,
						"classId":this.clazzId.length==0?0:this.clazzId,
						"dateTime":this.curDate,
					}
				}).then(res => {
					if (this.curClazz==0) {
						console.log(res.result);
					}
					console.log(res.result+"clas");
					// this.specialty.splice(0, this.specialty.length);
					for (let statistics of res.result) {
						console.log(statistics.theoryNum+"应到");
						let statisticsName = [];
						if (this.curClazz == 0 && this.curFaculty != 0) {
							statisticsName = [statistics.specialtyName];
							console.log("zhuanye")
						}else if (this.curClazz != 0) {
							statisticsName = [statistics.className];
							console.log("banji")
						}else if (this.curFaculty == 0) {
							statisticsName = [statistics.facultyName];
							console.log("yuanxi")
						}
						console.log("名字"+statistics.facultyName+"statisticsName:"+statisticsName)
						if (this.curDate == "") {//是否单日统计判断
							this.statisticsData.push([
							[statistics.theoryNum],[statistics.realityNum],statisticsName,[statistics.theoryNum-statistics.realityNum]
						])
						}else{
							this.statisticsData.push([
							[],[statistics.realityNum],statisticsName,[]
						])
						}
						
					}
				}).catch(err => {
					this.$message.warning("获取统计数据失败");
				})
			},
			clean(){
				this.curDate = '';
				this.school = [];
				this.clazz= [];
				this.clazzId = [];
				this.facultyId = [];
				this.faculty = [];
				this.getSchool();
				this.getFaculty();
				this.getStatistics();
			},
			// 日期选择器
    		onChangeDate(date, dateString) {
    		},

	}
}
</script>

<style scoped>
	.statisticsBox{
		text-align: center;
		margin: 50px 0;
	}
	.date-style-Apply .ant-input {
		width: 300px;
		height: 34px;
	}
	.input-style-reply {
		color: #666666;
		width: 300px;
		height: 34px;
		background-color: #ffffff;
		border: 0;
		margin-left: 5px;
	}
</style>