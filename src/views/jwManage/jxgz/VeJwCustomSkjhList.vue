<template>
  <a-card :bordered="false">
    <a-row :gutter="24">
      <a-col :md="7" :sm="12">
    <div class="man-lift" style="width: 100%">
      <div class="query">
        <div class="title">
          <span>教学任务</span>
        </div>
        <div class="content">
          <div class="row">
            <label>学期：</label>
            <j-select-xueqi placeholder="请选择学期" style="flex: 1;" v-model="queryConditions.semid" @input="updateParam"></j-select-xueqi>
          </div>
          <div class="row">
            <label>专业部：</label>
            <j-select-zyb placeholder="请选择专业部" style="flex: 1;" v-model="queryConditions.falid" @input="zybChange"></j-select-zyb>
          </div>
          <div class="row">
            <label>专业：</label>
            <j-select-zy-by-zyb placeholder="请选择专业" style="flex: 1;" ref="zyByZyb" v-model="queryConditions.specid" @input="updateParam"></j-select-zy-by-zyb>
          </div>
        </div>
        <div class="footer">
          <a-pagination size="small" v-model="queryConditions.pageNo" :total="total" :page-size="queryConditions.pageSize" :default-current="1" @change="jump"/>
          <p class="text">显示 {{total > 0 ? (queryConditions.pageNo - 1) * queryConditions.pageSize + 1 : 0}} 到 {{queryConditions.pageNo * queryConditions.pageSize > total ? total : queryConditions.pageNo * queryConditions.pageSize}} 条，共 {{total}} 条记录</p>
        </div>
      </div>
      <div class="list">
        <div class="title">
          <span>教学任务</span>
        </div>
        <div class="content">
          <div class="row" :class="{click:clickIndex==index}" v-for="(item,index) of list" @click="select(index)">
            {{item.name}}
          </div>
        </div>
      </div>
    </div>


      </a-col><a-col :md="17" :sm="12">
    <div class="man-right" v-if="clickIndex >= 0" style="width: 100%">
      <a-spin :spinning="confirmLoadingTs">
        <div class="basic">
          <div class="title">
            <span>基本信息</span>
          </div>
          <table>
            <tbody>
              <tr>
                <th>教学班</th>
                <td v-text="list[clickIndex].classname">班级名称</td>
                <th>执行学期</th>
                <td v-text="list[clickIndex].semester">执行学期</td>
              </tr>
              <tr>
                <th>年级</th>
                <td>{{getGrade(list[clickIndex].gradeid)}}</td>
                <th>授课教师</th>
                <td v-text="list[clickIndex].teachername">教师名称</td>
              </tr>
              <tr>
                <th>课程名称</th>
                <td v-text="list[clickIndex].kcid_dictText">课程名称</td>
                <th>总学时</th>
                <td v-text="list[clickIndex].zxs">学时</td>
              </tr>
              <tr>
                <th>使用教材</th>
                <td colspan="3" v-text="list[clickIndex].jcid_dictText">使用教材</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="plan">
          <div class="title">授课计划</div>
          <div class="content">
            <table>
              <tbody>
                <tr>
                  <th style="width: 100px;">学时</th>
                  <th>授课内容</th>
                </tr>
                <tr v-for="i in list[clickIndex].zxs">
                  <th>{{i}}</th>
                  <td>
                    <a-input v-model="formData.skjhmxList[i-1].content" type="textarea" autoSize/>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>

        <div class="footer">
		  <a-button @click="save" type="primary"  style="margin-right: 10px;">保存</a-button>	
		  <a-button @click="submit" type="primary"  style="margin-right: 10px;">提交</a-button>	
        </div>
      </a-spin>
    </div> </a-col>
    </a-row>
    <veJwSkjh-modal ref="modalForm" @ok="modalFormOk"></veJwSkjh-modal>
  </a-card>
</template>

<script>
import { EduListMixin } from '@/mixins/EduListMixin'
import VeJwSkjhModal from './modules/VeJwSkjhModal'
import JSelectTeacher from '@/components/kwglbiz/JSelectTeacher'
import JSelectXueqi from '@/components/kwglbiz/JSelectXueqi'
import JSelectJiaoxueKecheng from '@/components/kwglbiz/JSelectJiaoxueKecheng'
import JSelectBanji from '@/components/kwglbiz/JSelectBanji'
import pick from 'lodash.pick'
import { httpAction } from '@/api/common/manage'
import JSelectZyByZyb from '@/components/kwglbiz/JSelectZyByZyb'
import JSelectZyb from '@/components/kwglbiz/JSelectZyb'
import { getActionGradeById } from '@/api/common/manage.js'
import { axios } from '@/utils/request'
import { getAction, getActionForBase, postAction } from '@/api/common/manage'

export default {
  name: 'VeJwCustomSkjhList',
  mixins: [EduListMixin],
  components: {
    JSelectBanji,
    JSelectJiaoxueKecheng,
    JSelectXueqi,
    JSelectTeacher,
    VeJwSkjhModal,
    JSelectZyb,
    JSelectZyByZyb,
  },
  data() {
    return {
      confirmLoadingTs: false,
      // 年级列表
      gradeList: [],
      // 选中的下标，默认没选中
      clickIndex:-1,
      // 查询条件
      queryConditions: {
        // 学期
        semid: null,
        // 专业组
        fixedjsid: null,
        // 专业
        specid: null,
        // 页号
        pageNo: 1,
        // 页显示数
        pageSize: 4
      },
      // 总记录数
      total: 0,
      // 教学任务列表
      list: [],
      // 授课计划 保存或提交 参数
      formData:{
        // 授课ID
        id: null,
        // 教学任务ID
        jxrwid: null,
        // 学期ID
        semid: null,
        // 教学班ID
        jxbid: null,
        // 课程ID
        kcid: null,
        // 总学时
        zxs: null,
        // 授课教师userId
        teacheruserid: null,
        // 完成状态
        iscomplete: null,
        // 授课计划
        skjhmxList: []
      },
      description: 've_jw_skjh管理页面',
      form: this.$form.createForm(this),
      model: {},
      confirmLoading: false,
      validatorRules: {
        jxjhid: { rules: [{ required: true, message: '请输入教学计划ID!' }] },
        jxrwid: { rules: [{ required: true, message: '请输入教学任务ID!' }] },
        semid: { rules: [{ required: true, message: '请选择学期!' }] },
        jxbid: { rules: [{ required: true, message: '请选择教学班!' }] },
        kcid: { rules: [{ required: true, message: '请选择课程' }] },
        zxs: { rules: [{ required: true, message: '请输入总学时!' }] },
        teacheruserid: { rules: [{ required: true, message: '请选择授课教师!' }] },
        iscomplete: { rules: [{ required: true, message: '请输入完成状态 0制定中，1已完成!' }] },
        completetime: { rules: [{ required: true, message: '请输入完成时间!' }] },
        createtime: { rules: [{ required: true, message: '请输入创建时间!' }] },
        terminalid: { rules: [{ required: true, message: '请输入终端系统ID!' }] },
      },
      url: {
        list: '/jxgz/veJwSkjh/list',
        add: '/jxgz/veJwSkjh/add',
        edit: '/jxgz/veJwSkjh/edit',
        getJxrw: '/jxrw/veJwJxrw/my/list',
        detailList: '/jxgz/veJwSkjhmx/detailList/',
      },
      dictOptions: {},
    }
  },
  created(){
    this.getJxrw();
    this.getActionGradeList();
  },
  computed: {
    importExcelUrl: function () {
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
    },
  },
  methods: {
    // 获取年级信息
    getGrade(id){
      for(let item of this.gradeList){
        if(item.value == id){
          return item.text;
        }
      }
      return "";
    },
    // 获取年级列表
    getActionGradeList: function(id){
      //根据字典Code, 初始化字典数组
      getActionForBase('/common/veCommon/queryGradeList',{},'id').then((res) => {
        if (res.success) {
          let array =res.result;
          let target = []
          for(let i=0;i<array.length;i++){
            target.push({value:array[i].id.toString(),text:array[i].njmc})
          }
          this.gradeList = target;
          console.log(this.gradeList)
        }
      })
    },
    add() {
      this.edit({})
    },
    edit(record) {
      this.form.resetFields()
      this.model = Object.assign({}, record)
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue(
          pick(
            this.model,
            'jxjhid',
            'jxrwid',
            'semid',
            'jxbid',
            'kcid',
            'kcid_dictText',
            'zxs',
            'teacheruserid',
            'iscomplete',
            'completetime',
            'createtime',
            'terminalid'
          )
        )
      })
    },
    handleOk() {
      const that = this
      // 触发表单验证
      this.form.validateFields((err, values) => {
        if (!err) {
          that.confirmLoading = true
          let httpurl = ''
          let method = ''
          if (!this.model.id) {
            httpurl += this.url.add
            method = 'post'
          } else {
            httpurl += this.url.edit
            method = 'put'
          }
          let formData = Object.assign(this.model, values)
          console.log('表单提交数据', formData)
          httpAction(httpurl, formData, method)
            .then((res) => {
              if (res.success) {
                that.$message.success(res.message)
                that.$emit('ok')
                this.add();
              } else {
                that.$message.warning(res.message)
              }
            })
            .finally(() => {
              that.confirmLoading = false
              that.close()
            })
        }
      })
    },
    zybChange(code) {
      if (this.$refs.zyByZyb != null) {
        this.$refs.zyByZyb.initDictData(code)
        this.getJxrw();
      }
    },
    // 选中
    select(index){
      this.clickIndex = index;
      // 获取表单数据
      this.getFormData();
      // 获取授课计划详情列表
      this.getSkjhmxList(this.list[this.clickIndex].id);
    },
    // 修改参数时
    updateParam(){
      this.queryConditions.pageNo = 1;
      this.getJxrw();
    },
    // 获取教学任务列表
    getJxrw(){
      this.clickIndex = -1;
      let that = this;
      getAction(this.url.getJxrw, this.queryConditions).then(res=>{
        if(res.success){
          that.list = res.result.records;
          that.queryConditions.pageNo = res.result.current;
          that.queryConditions.pageSize = res.result.size;
          that.total = res.result.total;
        }
      });
    },
    // 获取授课计划详情列表
    getSkjhmxList(jxrweId){
      let url = this.url.detailList + jxrweId,
          that = this;
      getAction(url).then(res=>{
        if(res.success){
          this.formData.skjhmxList = res.result;
          // 授课id
          this.formData.id = res.result[0].skjhid;
        }
        // 如果未制定过授课计划，则创建
        else {
          this.formData.skjhmxList = [];
          for(let i = 1; i <= that.list[that.clickIndex].zxs; i++){
            that.formData.skjhmxList.push({
              xueshi: i,
              content: ''
            });
          }
        }
      });
    },
    // 跳转分页时
    jump(){
      this.clickIndex = -1,
      this.getJxrw();
    },
    // 获取表单数据
    getFormData(){
      let i = this.clickIndex,
          jxrw = this.list[i],
          data = {
            // 教学任务ID
            jxrwid: jxrw.id,
            // 学期ID
            semid: jxrw.semid,
            // 教学班ID
            jxbid: jxrw.jxbid,
            // 课程ID
            kcid: jxrw.kcid,
            // 总学时
            zxs: jxrw.zxs,
            // 授课教师userId
            teacheruserid: jxrw.teacheruserid,
            skjhmxList: this.formData.skjhmxList
          };

      this.formData = data;
    },
    // 保存
    save(){

      this.confirmLoadingTs = true
      // 设置状态为未完成
      this.formData.iscomplete = 0;

      postAction(this.url.add, this.formData).then((res)=>{
        if(res.success){
          this.$message.success(res.message)
          // 获取授课计划详情列表
          this.getSkjhmxList(this.list[this.clickIndex].id);
        } else {
          this.$message.warning(res.message)
        }
      }).finally(() => {
        this.confirmLoadingTs = false
      })
    },
    // 提交
    submit(){
      let that = this
      this.$confirm({
        title: '确认操作',
        content: '提交授课计划后将不能修改，确定要提交吗?',
        onOk: function () {
          that.confirmLoadingTs = true

          // 设置状态为完成
          that.formData.iscomplete = 1;

          postAction(that.url.add, that.formData).then((res)=>{
            if(res.success){
              that.$message.success(res.message)
            } else {
              that.$message.warning(res.message)
            }
          }).finally(() => {
              that.confirmLoadingTs = false
          })
        },
      })



    }
  },
}
</script>
<style scoped lang="less">
  
  .man-lift {
    width: 28%;
    height: 800px;
    background: #ffffff;
    box-shadow: 0px 1px 8px 0px #e9edf6;
    border-radius: 2px;
    padding: 15px 10px;
    display: inline-block;
    vertical-align: bottom;
    margin-right: 20px;
  }
  .man-right {
    min-width: 70%;
    height: 800px;
    background: #ffffff;
    box-shadow: 0px 1px 8px 0px #e9edf6;
    border-radius: 2px;
    padding: 15px 10px;
    display: inline-block;
    vertical-align: bottom;
  }
  .man-lift .title{
    border-bottom: 2px solid rgb(175,201,234);
    padding: 10px 10px;
    color: #888;
    font-weight: bold;
    font-size: 16px;
  }
  .man-lift{
    .query{
      display: block;

      .row{
        margin: 14px 0;
        display: flex;
      }
      label{
        text-align: right;
        display: inline-block;
        width: 55px;
        line-height: 30px;
        margin-right: 5px;
        color: rgba(0, 0, 0, 0.85);
        font-size: 14px;
      }

      .footer{
        text-align: center;

        .text{
          line-height: 50px;
          margin: 0;
        }
      }
    }
    .list {
      .content{
        height: 450px;
        overflow-y: auto;
        margin-top: 15px;

        .row{
          background-color: rgb(244,247,249);
          padding: 5px 8px;
          border: 1px dotted #aaa;
          margin-bottom: -1px;
        }
        .click{
          background-color: rgb(102,195,253);
          color: #fff;
        }
      }
    }
  }
  .man-right{
    table{
      width: 100%;
      th,td{
        padding: 5px;
        border: 1px solid #ddd;
      }
      th{
        background-color: #f0f0f0;
      }
    }
    .title{
      height: 40px;
      background-color: #66c3fe;
      padding: 10px;
      color: white;
    }

    .basic th{
      width: 150px;
    }

    .plan{
      margin-top: 10px;

      .content{
        height: 500px;
        overflow-y: auto;
      }
      table{
        text-align: center;
      }
    }

    .footer{
      margin-top: 18px;
      display: flex;
      flex-direction: row;
    }
  }
</style>