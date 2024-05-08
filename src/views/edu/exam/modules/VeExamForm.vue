<template>
  <a-spin :spinning="confirmLoading">
    <j-form-container :disabled="formDisabled">
      <a-form :form="form" slot="detail">
        <a-row>
          <a-col :span="24">
            <a-form-item label="阅卷教师ID" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['teacherids']" placeholder="请输入阅卷教师ID"  ></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="考试开始时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number v-decorator="['starttime', validatorRules.starttime]" placeholder="请输入考试开始时间" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="考试结束时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number v-decorator="['endtime', validatorRules.endtime]" placeholder="请输入考试结束时间" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="成绩公布时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number v-decorator="['scoretime', validatorRules.scoretime]" placeholder="请输入成绩公布时间" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="试卷id" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number v-decorator="['paperid', validatorRules.paperid]" placeholder="请输入试卷id" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="考试总用时，以分钟为单位，超出时间自动提交试卷" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number v-decorator="['totaltime', validatorRules.totaltime]" placeholder="请输入考试总用时，以分钟为单位，超出时间自动提交试卷" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="成绩级别规则(array(array('fail'=>60,'exp' => 'lt'),array('pass'=>60,'exp' => 'egt'),array('pass'=>good,'exp' => 'egt')))，分别是不及格（小于），及格（大于等于），优秀（大于等于）" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['scoregrade', validatorRules.scoregrade]" placeholder="请输入成绩级别规则(array(array('fail'=>60,'exp' => 'lt'),array('pass'=>60,'exp' => 'egt'),array('pass'=>good,'exp' => 'egt')))，分别是不及格（小于），及格（大于等于），优秀（大于等于）"  ></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="是否启用：1=启用，0=禁用" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number v-decorator="['status', validatorRules.status]" placeholder="请输入是否启用：1=启用，0=禁用" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="考试模式 1 整卷考试  2 逐题考试" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number v-decorator="['mode', validatorRules.mode]" placeholder="请输入考试模式 1 整卷考试  2 逐题考试" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="考试名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['name', validatorRules.name]" placeholder="请输入考试名称"  ></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="考试类型： 0为单元测试 1 为综合考试" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number v-decorator="['type', validatorRules.type]" placeholder="请输入考试类型： 0为单元测试 1 为综合考试" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="题目是否随机顺序 0 为否 1为是" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number v-decorator="['israndquestion', validatorRules.israndquestion]" placeholder="请输入题目是否随机顺序 0 为否 1为是" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="最多考试次数,0为不限制" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number v-decorator="['maxtimes', validatorRules.maxtimes]" placeholder="请输入最多考试次数,0为不限制" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="考试时选择题是否随机顺序 0 为否 1为是" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number v-decorator="['israndoption', validatorRules.israndoption]" placeholder="请输入考试时选择题是否随机顺序 0 为否 1为是" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="考生查看试卷保护状态，1=完全开放，2=保护答案，3=完全保护" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number v-decorator="['isviewanswer', validatorRules.isviewanswer]" placeholder="请输入考生查看试卷保护状态，1=完全开放，2=保护答案，3=完全保护" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="已参加考试总人数" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number v-decorator="['usercount', validatorRules.usercount]" placeholder="请输入已参加考试总人数" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="是否自动发布成绩（0否1是）" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number v-decorator="['issuescore', validatorRules.issuescore]" placeholder="请输入是否自动发布成绩（0否1是）" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="终端" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number v-decorator="['terminalid', validatorRules.terminalid]" placeholder="请输入终端" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="考试关联模型，exam=课程考试，homework=课程作业" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['rowmodel', validatorRules.rowmodel]" placeholder="请输入考试关联模型，exam=课程考试，homework=课程作业"  ></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="教学课程ID" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number v-decorator="['tcid']" placeholder="请输入教学课程ID" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="多租户id" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number v-decorator="['placeId']" placeholder="请输入多租户id" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col v-if="showFlowSubmitButton" :span="24" style="text-align: center">
            <a-button @click="submitForm">提 交</a-button>
          </a-col>
        </a-row>
      </a-form>
    </j-form-container>
  </a-spin>
</template>

<script>

  import { httpAction, getAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import { validateDuplicateValue } from '@/utils/util'
  import JFormContainer from '@/components/edu/JFormContainer'

  export default {
    name: 'VeExamForm',
    components: {
      JFormContainer,
    },
    props: {
      //流程表单data
      formData: {
        type: Object,
        default: ()=>{},
        required: false
      },
      //表单模式：true流程表单 false普通表单
      formBpm: {
        type: Boolean,
        default: false,
        required: false
      },
      //表单禁用
      disabled: {
        type: Boolean,
        default: false,
        required: false
      }
    },
    data () {
      return {
        form: this.$form.createForm(this),
        model: {},
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        confirmLoading: false,
        validatorRules: {
          starttime: {
            rules: [
              { required: true, message: '请输入考试开始时间!'},
            ]
          },
          endtime: {
            rules: [
              { required: true, message: '请输入考试结束时间!'},
            ]
          },
          scoretime: {
            rules: [
              { required: true, message: '请输入成绩公布时间!'},
            ]
          },
          paperid: {
            rules: [
              { required: true, message: '请输入试卷id!'},
            ]
          },
          totaltime: {
            rules: [
              { required: true, message: '请输入考试总用时，以分钟为单位，超出时间自动提交试卷!'},
            ]
          },
          scoregrade: {
            rules: [
              { required: true, message: '请输入成绩级别规则'},
            ]
          },
          status: {
            rules: [
              { required: true, message: '请输入是否启用：1=启用，0=禁用!'},
            ]
          },
          mode: {
            rules: [
              { required: true, message: '请输入考试模式 1 整卷考试  2 逐题考试!'},
            ]
          },
          name: {
            rules: [
              { required: true, message: '请输入考试名称!'},
            ]
          },
          type: {
            rules: [
              { required: true, message: '请输入考试类型： 0为单元测试 1 为综合考试!'},
            ]
          },
          israndquestion: {
            rules: [
              { required: true, message: '请输入题目是否随机顺序 0 为否 1为是!'},
            ]
          },
          maxtimes: {
            rules: [
              { required: true, message: '请输入最多考试次数,0为不限制!'},
            ]
          },
          israndoption: {
            rules: [
              { required: true, message: '请输入考试时选择题是否随机顺序 0 为否 1为是!'},
            ]
          },
          isviewanswer: {
            rules: [
              { required: true, message: '请输入考生查看试卷保护状态，1=完全开放，2=保护答案，3=完全保护!'},
            ]
          },
          usercount: {
            rules: [
              { required: true, message: '请输入已参加考试总人数!'},
            ]
          },
          issuescore: {
            rules: [
              { required: true, message: '请输入是否自动发布成绩（0否1是）!'},
            ]
          },
          terminalid: {
            rules: [
              { required: true, message: '请输入终端!'},
            ]
          },
          rowmodel: {
            rules: [
              { required: true, message: '请输入考试关联模型，exam=课程考试，homework=课程作业!'},
            ]
          },
        },
        url: {
          add: "/exam/veExam/add",
          edit: "/exam/veExam/edit",
          queryById: "/exam/veExam/queryById"
        }
      }
    },
    computed: {
      formDisabled(){
        if(this.formBpm===true){
          if(this.formData.disabled===false){
            return false
          }
          return true
        }
        return this.disabled
      },
      showFlowSubmitButton(){
        if(this.formBpm===true){
          if(this.formData.disabled===false){
            return true
          }
        }
        return false
      }
    },
    created () {
      //如果是流程中表单，则需要加载流程表单data
      this.showFlowData();
    },
    methods: {
      add () {
        this.edit({});
      },
      edit (record) {
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'teacherids','starttime','endtime','scoretime','paperid','totaltime','scoregrade','status','mode','name','type','israndquestion','maxtimes','israndoption','isviewanswer','usercount','issuescore','terminalid','rowmodel','tcid','placeId'))
        })
      },
      //渲染流程表单数据
      showFlowData(){
        if(this.formBpm === true){
          let params = {id:this.formData.dataId};
          getAction(this.url.queryById,params).then((res)=>{
            if(res.success){
              this.edit (res.result);
            }
          });
        }
      },
      submitForm () {
        const that = this;
        // 触发表单验证
        this.form.validateFields((err, values) => {
          if (!err) {
            that.confirmLoading = true;
            let httpurl = '';
            let method = '';
            if(!this.model.id){
              httpurl+=this.url.add;
              method = 'post';
            }else{
              httpurl+=this.url.edit;
               method = 'put';
            }
            let formData = Object.assign(this.model, values);
            console.log("表单提交数据",formData)
            httpAction(httpurl,formData,method).then((res)=>{
              if(res.success){
                that.$message.success(res.message);
                that.$emit('ok');
              }else{
                that.$message.warning(res.message);
              }
            }).finally(() => {
              that.confirmLoading = false;
            })
          }
         
        })
      },
      popupCallback(row){
        this.form.setFieldsValue(pick(row,'teacherids','starttime','endtime','scoretime','paperid','totaltime','scoregrade','status','mode','name','type','israndquestion','maxtimes','israndoption','isviewanswer','usercount','issuescore','terminalid','rowmodel','tcid','placeId'))
      },
    }
  }
</script>