<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <div>
        <a-form layout="inline">
          <a-row :gutter="24">
            <a-col :md="7" :sm="24">
              <a-form-item label="院系" :labelCol="labelCol" :wrapperCol="wrapperCol">
                <a-select v-model="queryParam.falId">
                  <a-select-option v-for="item in deps" :key="item.id" :value="item.id">
                    {{ item.yxmc }}
                  </a-select-option>
                </a-select>
                <!--<j-select-zyb placeholder="请选择院系" v-decorator="['falId']" :trigger-change="true"></j-select-zyb>-->
              </a-form-item>
            </a-col>
            <a-col :md="7" :sm="24">
              <a-form-item label="学期" :labelCol="labelCol" :wrapperCol="wrapperCol">
                <!--<j-select-grade v-model="queryParam.gradeId" :trigger-change="true" ></j-select-grade>-->
                <a-select v-model="queryParam.semId" @change="getSemNow">
                  <a-select-option v-for="item in sems" :key="item.id" :value="item.id">
                    {{ item.xqmc }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <!--<a-col :md="7" :sm="24">
              <a-form-item label="学年" :labelCol="labelCol" :wrapperCol="wrapperCol">
                &lt;!&ndash;<j-select-grade v-model="queryParam.gradeId" :trigger-change="true" ></j-select-grade>&ndash;&gt;
                <a-select v-model="queryParam.gradeId">
                  <a-select-option v-for="item in grades" :key="item.id" :value="item.id">
                    {{ item.njmc }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>-->
            <a-col :md="7" :sm="24">
              <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="月份">
                <!--<a-select v-model="queryParam.yf">-->
                <!--<a-select-option value="0">当月</a-select-option>-->
                <!--<a-select-option v-for="(item,key) in monthList" :value="item.yf" > {{item.yfName}} </a-select-option>-->
                <!--</a-select>-->
                <!--<a-month-picker placeholder="请选择月份" v-model="queryParam.yf"/>-->
				<DatePickByCN
				   v-model="queryParam.yf"
				   mode="month"
				   displayFormat="YYYY-MM"
				  placeholder="请选择月份"  />
              <!--  <a-date-picker
                  :open="open"
                  @openChange="openChange"
                  @panelChange="panelChange"
                  mode="month"
                  :value="queryParam.yf"
                  format="yyyy-MM"
                  valueFormat="yyyy-MM"
                  placeholder="请先选择学期"
                ></a-date-picker> -->
              </a-form-item>
            </a-col>
            <a-col :md="7" :sm="24">
              <span style="float: left; overflow: hidden" class="table-page-search-submitButtons">
				<a-button @click="searchQuery" type="primary" icon="search" style="margin-right: 10px;">搜索</a-button>
				<a-button @click="searchReset" type="danger" icon="delete" style="margin-right: 10px;">清除</a-button>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>
    </div>
    <!-- 查询区域-END -->
    <!-- 操作按钮区域 -->
    <div class="table-operator">
	  <a-button @click="handleExportXls('《教师考勤信息导出》')" type="primary" icon="download" style="margin-right: 10px;">导出</a-button>
	  <a-button @click="searchReset" type="primary" icon="reload" style="margin-right: 10px;">刷新</a-button>
	  
      <!--<a-upload-->
      <!--name="file"-->
      <!--:showUploadList="false"-->
      <!--:multiple="false"-->
      <!--:headers="tokenHeader"-->
      <!--:action="importExcelUrl"-->
      <!--@change="handleImportExcel"-->
      <!--&gt;-->
      <!--<a-button type="primary" icon="import">导入</a-button>-->
      <!--</a-upload>-->
    </div>
    <!-- table区域-begin -->
    <div>
      <a-table
        ref="table"
        size="middle"
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        @change="handleTableChange"
      >
      <span slot="action" slot-scope="text, record">
        <a @click="handleDetail(record)">查看详情</a>
      </span>
      </a-table>
    </div>
  </a-card>
</template>

<script>
  import { EduListMixin } from '@/mixins/EduListMixin'
  import { postAction, getAction, getActionXueqiById } from '@/api/common/manage'
  import JSelectXueqi from '@/components/kwglbiz/JSelectXueqi'
  import JSelectZyb from '@/components/kwglbiz/JSelectZyb'
  import JSelectZyByZyb from '@/components/kwglbiz/JSelectZyByZyb'
  import JSelectBanjiByZy from '@/components/kwglbiz/JSelectBanjiByZy'
  import JSelectJiaoxueKecheng from '@/components/kwglbiz/JSelectJiaoxueKecheng'
  import JSelectGrade from '@/components/kwglbiz/JSelectGrade'

  export default {
    name: 'workList',
    mixins: [EduListMixin],
    components: { JSelectGrade, JSelectJiaoxueKecheng, JSelectBanjiByZy, JSelectZyByZyb, JSelectZyb, JSelectXueqi },
    data() {
      return {
        interfaceUserId:'interfaceUserId',
        pageName: 'current',
        sizeName: 'size',
        description: '课时统计列表页面',
        disableMixinCreated: false,
        semNow:null,
        eduurl: window._CONFIG['domianBaseURL'],
        id:'09d5e1e7f9b049008eee645c783a1d67',
        sems:[],
        grades:[],
        deps:[],
        queryParam:{
          // falId:1,
          // specId:1,
          // gradeId:14,
          // yf:null,
        },
        // validatorRules: {
        //   xnid: { rules: [{ required: true, message: '请选择学年!' }] },
        //   yxid: { rules: [{ required: true, message: '请选择院系!' }] },
        //   yf: { rules: [{ required: true, message: '请选择月份!' }] },
        // },
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        monthList:[],
        weekNumList:[],
        // 表头
        columns: [
          {
            title: '教师姓名',
            align: 'center',
            dataIndex: 'jsxm',
          },
          {
            title: '应上课时',
            align: 'center',
            dataIndex: 'ysks',
          },
          {
            title: '实上课时',
            align: 'center',
            dataIndex: 'ssks',
          },
          {
            title: '迟到',
            align: 'center',
            dataIndex: 'chidao',
          },
          {
            title: '早退',
            align: 'center',
            dataIndex: 'zaotui',
          },
          {
            title: '事假',
            align: 'center',
            dataIndex: 'shijia',
          },
          {
            title: '病假',
            align: 'center',
            dataIndex: 'bingjia',
          },
          /*{
            title: '操作',
            dataIndex: 'action',
            align: "center",
            scopedSlots: {customRender: 'action'},
          }*/
        ],
        url: {
          list: '/edu-sanming/sanming/veJwTjJskq/list',
          getSemNow:'/edu-sanming/sanming/veJwTjJskq/getNowSem',
          exportXlsUrl:'/edu-sanming/sanming/veJwTjJskq/export',
        },
        dictOptions: {},
        isorter: [],
        month:'',
        open: false,
      }
    },
    created() {
      this.getSems();
      // this.getSemNow();
      this.getDepartment();
      // this.getGrades();
    },
    methods: {
      openChange(status) {
        if (this.semNow == null) {
          this.$message.warning("请先选择学期")
          return
        }
        if (status) {
          this.open = true;
        } else {
          this.open = false;
        }
      },
      panelChange(value) {
        this.queryParam.yf = value ? value.format('yyyy-MM') : '';
        this.open = false;
        this.getWeek(this.queryParam.yf);
        console.log(this.weekNumList)
        this.queryParam.weekNumList = this.weekNumList.toString()
      },
      getParam(){
        let param = {};
        param[this.interfaceUserId] = this.id
        return param;
      },
      // 获取学期
      getSems() {
        var getSems = this.$http.baseServer + '/common/veCommon/querySemesterList'
        getAction(getSems,this.getParam())
          .then((res) => {
            if (res.success) {
              this.sems = res.result
              console.log(this.sems)
            } else {
              this.$message.warning(res.message)
            }
          })
          .finally(() => {
            this.loading = false
          })
      },
      //获取专业部门信息
      getDepartment() {
        var getDepartmentUrl = this.$http.baseServer + '/common/veCommon/queryFacultyList'
        getAction(getDepartmentUrl,this.getParam())
          .then((res) => {
            if (res.success) {
              this.deps = res.result
              console.log('------------------------')
              console.log(this.deps)
            } else {
              this.$message.warning(res.message)
            }
          })
          .finally(() => {
            this.loading = false
          })
      },
      //获取年级信息
      getGrades() {
        var getGrades = this.$http.baseServer + '/common/veCommon/queryGradeList'
        getAction(getGrades,this.getParam())
          .then((res) => {
            if (res.success) {
              this.grades = res.result
              console.log(this.grades)
            } else {
              this.$message.warning(res.message)
            }
          })
          .finally(() => {
            this.loading = false
          })
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
          if (i > 0)
            weekNumList.push(i);
        }
        this.weekNumList = weekNumList;
      },
      // 获取当前学期
      getSemNow(){
        getAction(this.url.getSemNow,this.queryParam.semId).then((res) => {
          if (res.success) {
            // this.$message.success(res.message)
            this.semNow = res.result
            // this.queryParam.semId = this.semNow.id TODO
            // this.queryParam.semId = 22
            console.log(this.semNow);
            // this.getMonthList();
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
      getJskqList(){
        // 获取月份所属周数
        this.getWeek(this.queryParam.yf);
        getAction(this.url.list, this.queryParam).then((res) => {
          if (res.success) {
            console.log( res.result);
            this.$message.success(res.message)
          } else {
            this.$message.warning(res.message)
          }
        }).finally(() => {
          this.loading = false
        })
      },

    },
  }
</script>
<style scoped>
  
</style>