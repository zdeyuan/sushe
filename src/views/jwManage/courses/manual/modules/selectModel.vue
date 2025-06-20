<template>
  <a-modal
    :title="`${title}排课`"
    :width="640"
	okText="确认"
	cancelText="取消"
    :visible="visible"
    @ok="
      () => {
        handleSubmit()
      }
    "
    @cancel="
      () => {
        handleCancel()
      }
    "
  >
    <a-spin :spinning="loading">
      <a-form-model ref="ruleForm" :model="form" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-model-item label="周" prop="week">
          <a-select v-model="form.week" placeholder="请选择周">
            <a-select-option v-for="item in weekData" :key="item.id" :value="item.id">{{
              item.weekName
            }}</a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="节" prop="section">
          <a-select v-model="form.section" placeholder="请选择节">
            <a-select-option v-for="item in nodeData" :key="item.id" :value="item.id">{{
              item.section
            }}</a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="课程" prop="kcid">
          <a-select v-model="form.kcid" placeholder="请选择课程" @change="handleCourseChange">
            <a-select-option v-for="item in courseData" :key="item.kcid" :value="item.kcid">{{
              item.kcmc
            }}</a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="上课教室" prop="campusId" class="form-item">
          <a-select
            class="form-item__control"
            v-model="form.campusId"
            placeholder="请选择校区"
            @change="handleCampusChange"
          >
            <a-select-option v-for="(item,index) in campusData" :key="index" :value="item.id">{{
              item.xqmc
            }}</a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item prop="buildId" class="form-item" :wrapper-col="{ span: 14, offset: 6 }">
          <a-select
            class="form-item__control"
            v-model="form.jzid"
            placeholder="请选择楼栋"
            @change="handleBuildChange"
          >
            <a-select-option v-for="item in buildingData" :key="item.id" :value="item.id">{{
              item.jzwmc
            }}</a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item prop="jsid" class="form-item" :wrapper-col="{ span: 14, offset: 6 }">
          <a-select class="form-item__control" v-model="form.jsid" placeholder="请选择教室" @change="handleClassRoomChange">
            <a-select-option v-for="item in classRoomData" :key="item.id" :value="item.id">{{
              item.jsmc
            }}</a-select-option>
          </a-select>
        </a-form-model-item>
      </a-form-model>
    </a-spin>
  </a-modal>
</template>
<script>
import { getCourseList, scheduleDetailAdd, scheduleDetailEdit } from '@/api/schedule/classSchedule'
import { queryCampusList } from '@/api/base/common-veCommon'
import {queryBuildListByCampusId, getClassRoomList } from '@/api/schedule/pub'
import { childSycId } from '@/config'
import { mapGetters } from 'vuex'
import { nodeSet,noNode,node } from '@/api/kw/scheduling'
export default {
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    isAdd: {
      type: Boolean,
      required: true,
    },
    model: {
      type: Object,
      default: () => null,
    },
   
    weekData: {
      type: Array,
      default: () => {
        return []
      },
    },
    nodeData: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  data() {
    return {
      labelCol: {
        span: 6,
      },
      wrapperCol: {
        span: 14,
      },
	  nosetArr:[],
      form: {
        jsid: undefined, //	教室ID
        jsmc: '', //教室名
        jsxm: '', //教师姓名
        jxrwid: undefined, //	教学任务Id
        kcid: undefined, //课程id
        kcmc: '', //课程名称
        pkendweek: undefined, //结束周
        pkid: undefined, //排课id
        pknum: undefined, //实际上的周数
        pkstartweek: undefined, //	开始周
        section: undefined, //节
        semid: undefined, //学期id
        teacherid: undefined, //老师id
        terminalid: undefined, //终端id
        week: undefined, //周几
        xzbids: undefined, //行政班id
        campusId: undefined, //校区
        buildId: undefined, //楼栋
        buildName: undefined,
      },

      courseData: [], //课程列表
      campusData: [], //校区列表
      buildingData: [], //楼栋列表
      classRoomData: [], //教室列表

      loading: false,
      title: '',
    }
  },
  created() {
    if (this.model) {
      this.form = {
        ...this.model,
      }
	  console.log("this.form ",this.form )
      // this.getClassRoomList();
    } else {
      // this.form.uId = this.id
    }
    console.log("this.model",this.model)

    this.title = !this.isAdd ? '编辑' : '新增'
    this.getCampusList()
    this.getCourseList()
	this.getNoKc();
  },
  computed: {
    rules() {
      return {
        week: [
          {
            required: true,
            message: '请选择周',
            trigger: 'change',
          },
        ],

        section: [
          {
            required: true,
            message: '请选择节码',
            trigger: 'change',
          },
        ],

        kcid: [
          {
            required: true,
            message: '请选择课程',
            trigger: 'change',
          },
        ],
        campusId: [
          {
            required: false,
            message: '请选择校区',
            trigger: 'change',
          },
        ],
        buildId: [
          {
            required: false,
            message: '请选择楼栋',
            trigger: 'change',
          },
        ],
        jsid: [
          {
            required: false,
            message: '请选择教室',
            trigger: 'change',
          },
        ],
      }
    },
  },
  methods: {
    handleCourseChange(val){
      let _obj = this.courseData.find(item => item.kcid == val);
      this.form.jxrwid = _obj.jxrwid;
      this.form.jxbid = _obj.jxbid;
      this.form.kcid = _obj.kcid;
      this.form.kcmc = _obj.kcmc;
      this.form.teacherid = _obj.teacheruserid;
      this.form.jsxm = _obj.teachername;
      this.form.xzbids = _obj.xzbids
    },
	getNoKc(){
		nodeSet().then((res)=>{
		  this.nosetArr = res.result.records
		})
	},
    // 获取校区
    getCampusList() {
      queryCampusList().then((res) => {
        if (res.code == 200) {
          this.campusData = res.result || [];
		  this.getBuildList()
        }
      })
    },
    handleCampusChange() {
      this.form.jzid = undefined;
      this.form.jsid = undefined;
      this.getBuildList()
    },
    // 获取楼栋
    getBuildList() {
      queryBuildListByCampusId(this.form.campusId).then((res) => {
        if (res.code == 200) {
          this.buildingData = res.result.records || []
          this.getClassRoomList();
        }
      })
    },
    // 楼栋修改获取教室
    handleBuildChange(val) {
      this.form.jsid = undefined
      this.getClassRoomList()
    },
    // 获取教室
    getClassRoomList() {
		console.log("获取教室",this.model.campusId,this.model.jzid)
       let params = {
        campusId: this.model.campusId,
        jzid:this.model.jzid
      }
      getClassRoomList(params).then((res) => {
        if (res.code == 200) {
          this.classRoomData = res.result.records || []
        }
      })
    },
   // 获取教室名称
    handleClassRoomChange(val){
      let _obj = this.classRoomData.find(item => item.id == val);
      this.form.jsmc = _obj.jsmc;
    },
    // 获取课程
    getCourseList() {
      getCourseList(this.model.semid, this.model.jxbid).then((res) => {
        if (res.code == 200) {
          this.courseData = res.result.records || [];

          if(!this.isAdd && !this.form.jsxm){
            this.handleCourseChange(this.form.kcid)
          }
        }
      })
    },
 
    // 提交
    handleSubmit() {
      let _formData =  {
        jsid: this.form.jsid, //	教室ID
        jsmc: this.form.jsmc, //教室名
        jsxm: this.form.jsxm, //教师姓名
        jxrwid: this.form.jxrwid, //	教学任务Id
        kcid: this.form.kcid, //课程id
        kcmc: this.form.kcmc, //课程名称
        pkendweek: undefined, //结束周
        pkid: this.form.pkid, //排课id
        pknum: undefined, //实际上的周数
        pkstartweek: undefined, //	开始周
        section: this.form.section, //节
        semid: this.form.semid, //学期id
        teacherid: this.form.teacherid, //老师id
        terminalid: this.form.teacherid, //终端id
        week: this.form.week, //周几
        xzbids: this.form.xzbids, //行政班id
      };
	  let bool=false;
	  this.nosetArr.forEach(e=>{
		  if(e.section.indexOf(_formData.section)!=-1&&e.kcId==_formData.kcid){
			  bool=true;
			  this.$message.warning(e.section+"不排"+e.kcmc);
			  return;
		  }
	  });
	  if(bool) return;
      if(!this.isAdd){
        _formData.id = this.model.id;
      }
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.loading = true
          let _method = !this.isAdd ? scheduleDetailEdit : scheduleDetailAdd
          _method({
            ..._formData,
          }).then((res) => {
            this.loading = false
            if (res.code == 200) {
              this.$message.info(`${!this.isAdd ? '编辑' : '新增'}成功`)
              this.$emit('ok')
            } else {
              this.$message.warning(res.message)
            }
          })
        } else {
          return false
        }
      })
    },
    handleCancel() {
      this.$emit('cancel')
    },
  },
}
</script>
