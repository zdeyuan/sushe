<template>
  <a-spin :spinning="confirmLoading">
    <j-form-container :disabled="formDisabled">
      <a-form :form="form" slot="detail">
        <a-row>
          <a-col :span="24">
            <a-form-item label="用户id" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number v-decorator="['userid', validatorRules.userid]" placeholder="请输入用户id" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="考生姓名" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['username', validatorRules.username]" placeholder="请输入考生姓名"  ></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="考试ID" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number v-decorator="['examid', validatorRules.examid]" placeholder="请输入考试ID" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="考试得分" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number v-decorator="['score', validatorRules.score]" placeholder="请输入考试得分" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="客观题得分" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number v-decorator="['objectivescore', validatorRules.objectivescore]" placeholder="请输入客观题得分" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="成绩级别" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['grade', validatorRules.grade]" placeholder="请输入成绩级别"  ></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="考试时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number v-decorator="['addtime', validatorRules.addtime]" placeholder="请输入考试时间" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="提交时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number v-decorator="['submittime', validatorRules.submittime]" placeholder="请输入提交时间" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="是否提交，1未提交2手动提交3自动提交" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number v-decorator="['issubmit', validatorRules.issubmit]" placeholder="请输入是否提交，1未提交2手动提交3自动提交" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="节点id" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number v-decorator="['nodeid']" placeholder="请输入节点id" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="第几次考试" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number v-decorator="['examtimes', validatorRules.examtimes]" placeholder="请输入第几次考试" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="试卷号" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number v-decorator="['paperid', validatorRules.paperid]" placeholder="请输入试卷号" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="是否最终成绩（0否，1是）" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number v-decorator="['isfinalscore', validatorRules.isfinalscore]" placeholder="请输入是否最终成绩（0否，1是）" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="是否批阅0否1是" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number v-decorator="['ismark', validatorRules.ismark]" placeholder="请输入是否批阅0否1是" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="考试用时（单位分钟）" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number v-decorator="['usetime', validatorRules.usetime]" placeholder="请输入考试用时（单位分钟）" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="终端" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number v-decorator="['terminalid', validatorRules.terminalid]" placeholder="请输入终端" style="width: 100%" />
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
    name: 'VeExamRecordForm',
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
          userid: {
            rules: [
              { required: true, message: '请输入用户id!'},
            ]
          },
          username: {
            rules: [
              { required: true, message: '请输入考生姓名!'},
            ]
          },
          examid: {
            rules: [
              { required: true, message: '请输入考试ID!'},
            ]
          },
          score: {
            rules: [
              { required: true, message: '请输入考试得分!'},
            ]
          },
          objectivescore: {
            rules: [
              { required: true, message: '请输入客观题得分!'},
            ]
          },
          grade: {
            rules: [
              { required: true, message: '请输入成绩级别!'},
            ]
          },
          addtime: {
            rules: [
              { required: true, message: '请输入考试时间!'},
            ]
          },
          submittime: {
            rules: [
              { required: true, message: '请输入提交时间!'},
            ]
          },
          issubmit: {
            rules: [
              { required: true, message: '请输入是否提交，1未提交2手动提交3自动提交!'},
            ]
          },
          examtimes: {
            rules: [
              { required: true, message: '请输入第几次考试!'},
            ]
          },
          paperid: {
            rules: [
              { required: true, message: '请输入试卷号!'},
            ]
          },
          isfinalscore: {
            rules: [
              { required: true, message: '请输入是否最终成绩（0否，1是）!'},
            ]
          },
          ismark: {
            rules: [
              { required: true, message: '请输入是否批阅0否1是!'},
            ]
          },
          usetime: {
            rules: [
              { required: true, message: '请输入考试用时（单位分钟）!'},
            ]
          },
          terminalid: {
            rules: [
              { required: true, message: '请输入终端!'},
            ]
          },
        },
        url: {
          add: "/exam/veExamRecord/add",
          edit: "/exam/veExamRecord/edit",
          queryById: "/exam/veExamRecord/queryById"
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
          this.form.setFieldsValue(pick(this.model,'userid','username','examid','score','objectivescore','grade','addtime','submittime','issubmit','nodeid','examtimes','paperid','isfinalscore','ismark','usetime','terminalid','placeId'))
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
        this.form.setFieldsValue(pick(row,'userid','username','examid','score','objectivescore','grade','addtime','submittime','issubmit','nodeid','examtimes','paperid','isfinalscore','ismark','usetime','terminalid','placeId'))
      },
    }
  }
</script>