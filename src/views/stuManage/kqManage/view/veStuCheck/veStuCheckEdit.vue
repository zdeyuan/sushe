<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form :title="textMap[dialogStatus]" width="1000px" @ok="viewType === 'create' ? createData() : updateData()" @cancel="handelCancel">
      <a-form-model ref="veStuCheckDataForm" :rules="veStuCheckRules" :model="veStuCheckVo" labelAlign="right">
		 <a-form-model-item label="学期" prop="semId" >
		  <a-select v-model="veStuCheckVo.semId" placeholder="请选择学期">
		  	<a-select-option v-for="item in semesters" :key="item.id" :value="item.id">
		  		{{ item.xqmc }}
		  	</a-select-option>
		  </a-select>
		 </a-form-model-item> 
		 <a-form-model-item label="选择月份" prop="month" >
		  <a-select :options="timesList" placeholder="请选择月份" v-model="veStuCheckVo.month"
		  	@select="getCatalendar" />
		 </a-form-model-item> 
		 <a-form-model-item label="选择时间">
			 <div class="candarContent">
			 	<div v-for="(val,key) in weekday" class="candarWeek">
			 		{{val}}
			 	</div>
			 	<div v-for="(val,key) in datas" class="days" :class="{'curr':activeDay==key}" @click="dayClick(val,key)">
			 		<div style="text-align: center;" v-if="val">
			 			{{val.dates}}
			 		</div>
			 		<div style="text-align: center;" v-if="val">
			 			第{{val.week}}周
			 		</div>
			 	</div>
			 </div>
		 </a-form-model-item> 
        <a-form-model-item label="考勤类型" prop="typeId" required>
          <edu-data v-model="veStuCheckVo.typeId" stype="select" :datas="typeNodes" textKey="title" dtype="datas" />
        </a-form-model-item>
		<a-form-model-item label="班级" prop="bjId">
		 <j-select-banji v-model="veStuCheckVo.bjId" placeholder="请选择班级" ></j-select-banji>
		</a-form-model-item>
        <a-form-model-item label="学生" prop="stuId">
          <stuSelect ref="stuSelect" :bjId="veStuCheckVo.bjId"  v-if="!isBanji"></stuSelect>
		  <edu-data v-model="veStuCheckVo.stuId" stype="select" :datas="students" textKey="name" dtype="datas" v-else/>
        </a-form-model-item>
		<a-form-model-item label="异常时间" prop="checkTime" required>
			<DatePickByCN
				  v-model="veStuCheckVo.checkTime"
				  placeholder="请选择异常时间"  />
		</a-form-model-item>
        <a-form-model-item label="第几节" prop="section" required>
          <edu-data v-model="veStuCheckVo.section" stype="select" dtype="constant" code="checkName" />
        </a-form-model-item>
        <a-form-model-item label="备注" prop="content">
          <a-textarea v-model="veStuCheckVo.content" :maxLength="65535" placeholder="请输入备注" :rows="4" />
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import {
		axios
	} from '@/utils/request';
import veStuCheckApi from '../../api/veStuCheckApi';
import veBaseStudentApi from '@/api/stu/veBaseStudentApi';
import stuSelect from '@/components/kqManageComponent/stuSelect';
import JSelectBanji from '@/components/kwglbiz/JSelectBanji'
export default {
  components: { stuSelect,JSelectBanji },
  props: {
    typeNodes: Array,
	isBanji:{
		type:Boolean,
		default:false
	}
  },
  data() {
    let validateUser = (rule, value, callback) => {
		if(!this.isBanji){
			const data = this.$refs.stuSelect.getValue();
			if (data && data.length > 0) {
			  callback();
			} else {
			  callback(new Error('请选择学生'));
			}
		}else{
			if (value) {
			  callback();
			} else {
			  callback(new Error('请选择学生'));
			}
		}
      
    };
	let validateBJ = (rule, value, callback) => {
	  const data = this.veStuCheckVo.bjId;
	  if (data!='') {
	    callback();
	  } else {
	    callback(new Error('请选择班级'));
	  }
	};
    const data = {
      veStuCheckVo: this.resetveStuCheckVo(),
      textMap: {
        update: '编辑考勤信息',
        create: '新增考勤信息'
      },
      dialogStatus: 'create',
	  semesters:[],
	  timesList: [],
	  datas:[],
	  activeDay:-1,
	  year:'',
	  showType:'',
	  month:'',
	  weekday: ['周一', '周二', '周三', '周四', '周五', '周六','周天'],
	  students:[],
      veStuCheckRules: {
		  typeId: [
		    {
		      required: true,
		      message: '请选择考勤类型',
		      trigger: 'change',
		    }
		  ],
		  section: [
		    {
		      required: true,
		      message: '请填写第几节',
		      trigger: 'change',
		    }
		  ],
		  checkTime: [
		    {
		      required: true,
		      message: '请选择异常时间',
		      trigger: 'change',
		    }
		  ],
        stuId: [{ validator: validateUser, trigger: 'change', required: true }],
		bjId:[{  validator: validateBJ, trigger: 'change', required: true }],
      }
    };
    return data;
  },
  watch:{
	  'veStuCheckVo.bjId'(val){
		  console.log("改变了",val,this.isBanji)
		  if(this.isBanji){
			  this.bjChange()
		  }
	  }
  },
  mounted() {
	  
  },
  methods: {
    /**
     * @msg: 重置数据
     */
    resetveStuCheckVo() {
      return {
		semId:'',
		calendarId:'',
        stuId: '', // 学生id
        name: '', // 姓名
        code: '', // 学号
        specId: 0, // 专业id
        bjId: "", // 班级id
        jxbjId: '', // 教学班级id
        typeId: '', // 考勤类型id
        courseId: '', // 考勤名称id（-1早自习、-2晚自习为系统内定，其他为课堂id）
        courseName: '', // 考勤名称
        checkTime: '', // 异常时间
        content: '' // 备注
      };
    },
    /**
     * @msg: 初始化新增
     */
    doCreate() {
      this.viewType = 'create';
	  this.getSemesters();
      this.veStuCheckVo = this.resetveStuCheckVo();
      this.$nextTick(() => {
        this.$refs.veStuCheckDataForm.clearValidate();
      });
    },
	bjChange(){
		if(this.isBanji){
			this.students=[];
			veBaseStudentApi.findByBjIds(this.veStuCheckVo.bjId).then(po=>{
				this.students=po.result.list.map(e=>{
					return{
						id: e.id,
						name: e.xm
					}
				});
			})
		}
	},
    /**
     * @msg: 初始化修改
     */
    doUpdate(row) {
	  this.getSemesters();
	  row.bjId=row.bjId+'';
	  setTimeout(() => {
	    if (this.$refs.stuSelect) this.$refs.stuSelect.setValue(row.stuId);
	  }, 100);
	  this.veStuCheckVo=Object.assign({},row);
	  // 获取原始的月份值
	  const originalMonth = this.veStuCheckVo.month;
	  this.veStuCheckVo.month=this.veStuCheckVo.year+'-'+originalMonth;
	  this.veStuCheckVo.semId=parseInt(this.veStuCheckVo.semId);
      this.viewType = 'update';
      this.$nextTick(() => {
        this.$refs.veStuCheckDataForm.clearValidate();
      });
    },
    /**
     * @msg: 编辑页取消
     */
    handelCancel() {
      this.$emit('onCancel');
	  this.$nextTick(() => {
	    this.$refs.veStuCheckDataForm.clearValidate();
	  });
    },
    /**
     * @msg: 获取提交的数据 新增和 修改复用
     */
    getSubData(isUpdate) {
		if(!this.veStuCheckVo.calendarId){
			this.$message.warning('请选择日期');
			return;
		}
      const tempData = Object.assign({}, this.veStuCheckVo);
	  if(!this.isBanji){
		  const stus = this.$refs.stuSelect.getObj()[0];
		  tempData.stuId = stus.id;
	  }
      console.log("tempData",tempData)
	  delete tempData.month;
      return tempData;
    },
    /**
     * @msg: 调用Api创建数据
     */
    createData() {
      this.$refs.veStuCheckDataForm.validate(valid => {
		  console.log("valid",valid)
        if (valid) {
          const subData = this.getSubData(false);
          if (subData == null) {
            return;
          }
          veStuCheckApi.add(subData).then(res => {
            this.$notification.success({
              message: '数据新增成功',
              description: '新增了一条数据'
            });
            this.$emit('onOk');
          });
        }
      });
    },
    /**
     * @msg: 调用Api修改数据
     */
    updateData() {
      this.$refs.veStuCheckDataForm.validate(valid => {
        if (valid) {
          const subData = this.getSubData(true);
          if (subData == null) {
            return;
          }
          veStuCheckApi.update(subData).then(() => {
            this.$notification.success({
              message: '数据修改成功',
              description: '修改了一条数据'
            });
            this.$emit('onOk');
          });
        }
      });
    },
	//获取学期信息
	getSemesters() {
		var getSemesters = '/common/veCommon/querySemesterList'
		let id = '09d5e1e7f9b049008eee645c783a1d67';
		var arr = []
		this.timesList = []
		axios({
				url: getSemesters,
				method: 'get',
				params: {
					id,
					interfaceUserId: id
				}
			}).then((res) => {
				if (res.success) {
					this.semesters = res.result;
						this.semesters.forEach(e => {
							if(this.viewType=='create'){
								if (e.iscurrent == 0) {
									this.veStuCheckVo.semId = e.id;
									let arr = this.getMonthsBetweenDates(e.xqksrq, e.xqjsrq);
									for (var i = 0; i < arr.length; i++) {
										var obj = {
											label: arr[i],
											value: arr[i]
										}
										this.timesList.push(obj)
									}
									this.veStuCheckVo.month = arr[0];
									this.getCatalendar()
								}
							}else{
								if(e.id==this.veStuCheckVo.semId){
									let arr = this.getMonthsBetweenDates(e.xqksrq, e.xqjsrq);
									for (var i = 0; i < arr.length; i++) {
										var obj = {
											label: arr[i],
											value: arr[i]
										}
										this.timesList.push(obj)
									}
									this.getCatalendar()
								}
							}
							
						})
					
				} else {
					this.$message.warning(res.message)
				}
			})
			.finally(() => {})
	
	},
	dayClick(val,key){
		if(val){
			this.activeDay=key;
			this.veStuCheckVo.calendarId=val.id;
		}
		
	},
	handleFilter() {
		this.getCatalendar();
	},
	editOk() {
		this.showType = 'table';
	},
	handleCancel() {
		this.$emit('onCancel')
	},
	goup(e) {
		this.getCatalendar()
	},
	getMonthsBetweenDates(startTimestamp, endTimestamp) {
		const startDate = new Date(startTimestamp * 1000);
		const endDate = new Date(endTimestamp * 1000);
		const result = [];
		let currentDate = new Date(startDate);
		while (currentDate <= endDate) {
			const year = currentDate.getFullYear();
			const month = String(currentDate.getMonth() + 1).padStart(2, '0');
			result.push(`${year}-${month}`);
			currentDate.setMonth(currentDate.getMonth() + 1);
		}
		return result;
	},
	
	getCatalendar() {
		axios({
			url: '/common/veBase/queryCalendarListBySemId',
			method: 'get',
			params: {
				semId:this.veStuCheckVo.semId,
				times:this.veStuCheckVo.month,
			}
		}).then(res => {
			if (res.code == 200) {
				this.datas = this.days(res.result);
				this.datas.forEach((e,index)=>{
					if(e){
						if(e.id==this.veStuCheckVo.calendarId){
							this.activeDay=index;
						}
					}
					
				})
				// this.pagination.total = res.result.total
			}
		}).catch(err => {
			console.log("错误", err)
	
		})
	},
	// 当前年份
	currentYear() {
		return new Date(this.veStuCheckVo.month).getFullYear();
	},
	// 当前月份（0-11）
	currentMonth() {
		return new Date(this.veStuCheckVo.month).getMonth();
	},
	// 获取当前月份的天数
	daysInMonth() {
		return new Date(this.currentYear(), this.currentMonth() + 1, 0).getDate();
	},
	firstDayOfMonth() {
		if (new Date(this.currentYear(), this.currentMonth(), 1).getDay() == 0) {
			return 6
		} else {
			return new Date(this.currentYear(), this.currentMonth(), 1).getDay() - 1;
		}
	},
	days(obj) {
		const days = [];
		// 填充前面的空白（上个月的日期）
		for (let i = 0; i < this.firstDayOfMonth(); i++) {
			days.push(null);
		}
		// 填充当前月份的日期
		for (let i = 0; i < obj.length; i++) {
			days.push(obj[i]);
		}
		return days;
	},
  }
};
</script>
<style lang="less" scoped>
	/deep/.show-div {
		width: 150px;
	}
	
	.candarContent {
		padding: 20px;
		display: flex;
		flex-wrap: wrap;
	
		.candarWeek {
			width: 14%;
			background-color: #66c3fd;
			padding: 5px 10px;
			// border: 1px solid #e6e6e6;
			color: #fff;
			font-size: 14px;
			text-align: center;
		}
		.days {
			cursor: pointer;
			width: 14%;
			padding: 5px 10px;
			line-height:30px;
			border-left: 1px solid #e6e6e6;
			border-bottom: 1px solid #e6e6e6;
			font-size: 14px;
			&:nth-child(7n),&:last-child{
				border-right: 1px solid #e6e6e6;
			}
			&:hover,&.curr{
				background-color:rgba(102,195,253,.2);
			}
		}
	}
</style>
