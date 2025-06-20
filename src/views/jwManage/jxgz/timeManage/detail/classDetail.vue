<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="7" :lg="7" :md="8" :sm="24">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="名称">
              <a-input v-model="queryParam.jsxm" ></a-input>
              <!--v-decorator="['jsxm', { rules: [{ required: true, message: 'Please input your note!' }] }]"-->
            </a-form-item>
          </a-col>
          <a-col :xl="7" :lg="7" :md="8" :sm="24">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="工号">
              <a-input v-model="queryParam.jsgh"></a-input>
            </a-form-item>
          </a-col>
          <!--<a-col :xl="7" :lg="7" :md="8" :sm="24">
            <a-form-item label="教师">
              <j-select-teacher placeholder="请选择教师" v-model="queryParam.teacherid"></j-select-teacher>
            </a-form-item>
          </a-col>-->
          <a-col :xl="7" :lg="7" :md="8" :sm="24">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="月份">
              <a-select v-model="queryParam.yf">
                <a-select-option value="0">当月</a-select-option>
                <a-select-option v-for="(item,key) in monthList" :value="item.yf" :key="key"> {{item.yfName}} </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xl="7" :lg="7" :md="8" :sm="24">
            <span style="float: left; overflow: hidden" class="table-page-search-submitButtons">
              <a-button @click="searchQuery" type="primary" icon="search" style="margin-right: 10px;">搜索</a-button>
              <a-button @click="getCourseList()" type="danger" icon="delete" style="margin-right: 10px;">清除</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <!-- 查询区域-END -->

    <div>
      <div>
        <p style=" text-align:center;font-size: 18px;font-weight: bold;">{{teacherName}}课时情况统计</p>
      </div>
      <div class="class-table">
        <div class="table-wrapper">
          <div class="tabel-container">
            <week v-for="(item,key) in courseMonthMap" :key="key" :weekNum="key" :courseList="item" :semId="semNow" :editable="2"></week>
            <div>
              <table style="border: 0px;width:65%;font-family: 'Microsoft YaHei'">
                <tr>
                  <td><IconFont style="width:18px; height:18px; color: #FCD418;" type="iconyingshangbaorenwushu"/><span>应上课时:{{jskqTotal.ysks}}</span></td>
                  <td><IconFont style="width:18px; height:18px; color: #AEFC18;" type="iconshijigongshi"/><span>实上课时:{{jskqTotal.ssks}}</span></td>
                  <td><IconFont style="width:18px; height:18px; color: #FC9918;" type="iconchidaox"/><span>迟到:{{jskqTotal.chidao}}</span></td>
                  <td><IconFont style="width:18px; height:18px; color: #FCB918;" type="iconzaotui"/><span>早退:{{jskqTotal.zaotui}}</span></td>
                  <td><IconFont style="width:18px; height:18px; color: #FCF918;" type="iconshijia"/><span>事假:{{jskqTotal.shijia}}</span></td>
                  <td><IconFont style="width:18px; height:18px; color: #FC4D18;" type="iconxinchou_bingjiakoukuan"/><span>病假:{{jskqTotal.bingjia}}</span></td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </a-card>
</template>
<script>
  import {
    queryFacultyList,
    querySpecialtyListByFalId,
    queryBanJiListBySpecId,
    querySemesterList,
  } from '@/api/base/common-veCommon'
  import JSelectTeacher from '@/components/kwglbiz/JSelectTeacher'
  import { EduListMixin } from '@/mixins/EduListMixin'
  import { postAction, getAction } from '@/api/common/manage'
  import weekCourseModel from '../modules/weekCourseModel.vue'
  import { IconFont } from '@/cas/ico'
  import { getActionTeacherById } from '@/api/common/manage.js'
  import { semester,majorS,major,classSchedule,classGrade,detail,classScheduleAdd,nodeSet,dellClass } from '@/api/kw/scheduling'
  export default {
    mixins: [EduListMixin],
    data() {
      return {
        formLayout: 'horizontal',
        form: this.$form.createForm(this, { name: 'coordinated' }),
        nowMonth:'0',
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        jskqTotal:{
          ysks:0,
          ssks:0,
          chidao:0,
          zaotui:0,
          shijia:0,
          bingjia:0,
        },
        teacherName:'教师',
        /*courseWeekList:{
          1:[[{}, {}, {}, {}], // 单个上午课程
            [{}, {}, {}, {}],
            [{}, {}, {}, {}],
            [{}, {}, {}, {}],
            [{}, {}, {}, {}],
            [{}, {}, {}, {}],
            [{}, {}, {}, {}],]
        },*/
        semNow:0,
        monthList:[],
        weekNumList:[1],
        courseWeekList:
          [[{}, {}, {}, {}], // 单个上午课程
            [{}, {}, {}, {}],
            [{}, {}, {}, {}],
            [{}, {}, {}, {}],
            [{}, {}, {}, {}],
            [{}, {}, {}, {}],
            [{}, {}, {}, {}]]
        ,
        courseMonthMap:{
          1:[[{}, {}, {}, {}], // 单个上午课程
            [{}, {}, {}, {}],
            [{}, {}, {}, {}],
            [{}, {}, {}, {}],
            [{}, {}, {}, {}],
            [{}, {}, {}, {}],
            [{}, {}, {}, {}]],
        },
        queryParam:{
          yf:'0',
          // teacherid:1,
        },
        url:{
          add: '/edu-sanming/sanming/veJwTjJskq/add',
          list:'/edu-sanming/sanming/veJwTjJskq/detail',
          getSemNow:'/edu-sanming/sanming/veJwTjJskq/getNowSem',
          getKstjNum:'/edu-sanming/sanming/veJwTjJskq/getKstjNum',
        }
      }
    },
    created() {
      this.getSemNow();
    },

    // 组件声明
    components: {
      IconFont,
      week:weekCourseModel,
      JSelectTeacher,
      queryFacultyList,
      querySpecialtyListByFalId,
      queryBanJiListBySpecId,
      querySemesterList,
      semester,majorS,major,classSchedule,classGrade,detail,classScheduleAdd,nodeSet,dellClass,
    },
    computed: {},
    methods: {
      handleSubmit(e) {
        e.preventDefault();
        this.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
        });
      },
      // 获取当前学期
      getSemNow(){
        getAction(this.url.getSemNow).then((res) => {
          if (res.success) {
            // this.$message.success(res.message)
            this.semNow = res.result
            // this.queryParam.semId = this.semNow.id TODO
            this.queryParam.semId = 12
            this.getMonthList();
          } else {
            this.$message.warning(res.message)
          }
        }).finally(() => {
          this.loading = false
        })
      },
      // 获取学期包含月份
      getMonthList(){
        var start = this.semNow.xqksrqName
        var end = this.semNow.xqjsrqName

        var result = [];
        var s = start.split("-");
        var e = end.split("-");
        var min = new Date();
        var max = new Date();
        min.setFullYear(s[0],s[1]);
        max.setFullYear(e[0],e[1]);
        var curr = min;
        while(curr <= max){
          var month = curr.getMonth();
          var str=curr.getFullYear()+"-"+(month);
          var s=curr.getFullYear()+"-0";
          if(str==s){
            str=curr.getFullYear()+"-12";
          }
          let strName = str.replace('-','年')+'月'
          result.push({yf:str,yfName:strName});
          curr.setMonth(month+1);
        }

        this.monthList = result;
      },
      // 格式化月份参数
      getMonthString(monthParam) {
        return monthParam.substring(0,4)+'-'+monthParam.substring(4,monthParam.length);
      },
      getWeek(monthParam) {
        // 0默认当月
        let monthDate = new Date();
        console.log(monthParam)
        if ('0'!=monthParam){
          // monthParam = this.getMonthString(monthParam);
          monthDate = new Date(monthParam);
        }
        // 1学期开始日期
        let dSemBegin = new Date(this.semNow.xqksrqName);
        dSemBegin.setMonth(dSemBegin.getMonth());
        dSemBegin.setDate(3);//3 周一为本周第一天；2 周日为本周第一天；1 周六为本周第一天

        // 2查询月份起始日期

        var fullYear = monthDate.getFullYear();
        var month = monthDate.getMonth() + 1; // getMonth 方法返回 0-11，代表1-12月
        var endOfMonth = new Date(fullYear, month, 0).getDate(); // 获取本月最后一天

        var starDate = monthDate.setDate(1);//当月第一天
        var endDate = new Date(monthDate.setDate(endOfMonth));//当月最后一天

        // 3获取月份起始周数
        let rqBegin = starDate - dSemBegin;
        let daysBegin = Math.ceil(rqBegin / (24 * 60 * 60 * 1000));
        let numBegin = Math.ceil(daysBegin / 7) + 1;

        // 去除最后一月多余的周数
        let dSemEnd = new Date(this.semNow.xqjsrqName);
        if(dSemEnd.getTime() <= endDate.getTime()){
          endDate = dSemEnd
        }
        let rqEnd = endDate - dSemBegin;
        let daysEnd = Math.ceil(rqEnd / (24 * 60 * 60 * 1000));
        let numEnd = Math.ceil(daysEnd / 7) + 1;

        // 4生成周数列表
        let weekNumList = []
        for(var i = numBegin; i <= numEnd; i++ ){
          weekNumList.push(i);
        }
        if (weekNumList.length > 0)
          this.weekNumList = weekNumList;
      },
      //课程获取
      getCourseList(){
        if (!(this.queryParam.jsxm || this.queryParam.jsgh)) {
          this.$message.warning('请选择教师')
          return
        }

        // 0获取教师信息
        /*var tid = this.queryParam.teacherid;
        if (!tid) {
          this.$message.warning('请选择教师')
          return
        }
        getActionTeacherById(tid).then(res => {
          if (res.success && res.result != null) {
            this.teacherName = res.result.xm;
          }
        })*/

        // 1获取月份所属周数
        this.getWeek(this.queryParam.yf);
        this.queryParam.weekNumList = this.weekNumList;
        // 2获取当前学期所属课程
        postAction(this.url.list, this.queryParam).then((res) => {
          if (res.success) {
            console.log( res.result);
            this.$message.success(res.message)
            if (res.result.courseListByMonth)
              this.courseMonthMap = res.result.courseListByMonth
            if (res.result.jskqTotal)
              this.jskqTotal = res.result.jskqTotal
          } else {
            this.$message.warning(res.message)
          }
        }).finally(() => {
          this.loading = false
        })
      },
      digital2Chinese(num, identifier) {
        const character = ['一','二', '三', '四', '五', '六','日'];
        return identifier === 'week' && (num === 0 || num === 7) ? '一' : character[num];
      },
      digital2ChineseS(num, identifier) {
        const character = ['五', '六', '七', '八', '九'];
        return identifier === 'week' && (num === 0 || num === 7) ? '一' : character[num];
      },
    }
  }
</script>
<style scoped>
  span, .select {
    /*font-size: 12px;*/
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #666666;
    line-height: 24px;
    margin-left:12px;
  }
</style>
