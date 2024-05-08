<template>
  <a-spin :spinning="confirmLoading">
    <j-form-container :disabled="formDisabled">
      <a-form :form="form" slot="detail">
        <a-row>
          <a-col :span="24">
            <a-form-item label="A\B\C\D\E" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['options', validatorRules.options]" placeholder="请输入A\B\C\D\E"  ></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="问题id" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number v-decorator="['questionid', validatorRules.questionid]" placeholder="请输入问题id" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="内容" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-textarea v-decorator="['content', validatorRules.content]" rows="4" placeholder="请输入内容" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="附件id" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number v-decorator="['fileid']" placeholder="请输入附件id" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="是否这正确答案选项，1是0否" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number v-decorator="['isanswer', validatorRules.isanswer]" placeholder="请输入是否这正确答案选项，1是0否" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="添加用户" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number v-decorator="['adduser', validatorRules.adduser]" placeholder="请输入添加用户" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="添加时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number v-decorator="['addtime', validatorRules.addtime]" placeholder="请输入添加时间" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="终端ID" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number v-decorator="['terminalid', validatorRules.terminalid]" placeholder="请输入终端ID" style="width: 100%" />
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
    name: 'VeExamQuestionOptionForm',
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
          options: {
            rules: [
              { required: true, message: '请输入A\B\C\D\E!'},
            ]
          },
          questionid: {
            rules: [
              { required: true, message: '请输入问题id!'},
            ]
          },
          content: {
            rules: [
              { required: true, message: '请输入内容!'},
            ]
          },
          isanswer: {
            rules: [
              { required: true, message: '请输入是否这正确答案选项，1是0否!'},
            ]
          },
          adduser: {
            rules: [
              { required: true, message: '请输入添加用户!'},
            ]
          },
          addtime: {
            rules: [
              { required: true, message: '请输入添加时间!'},
            ]
          },
          terminalid: {
            rules: [
              { required: true, message: '请输入终端ID!'},
            ]
          },
        },
        url: {
          add: "/exam/veExamQuestionOption/add",
          edit: "/exam/veExamQuestionOption/edit",
          queryById: "/exam/veExamQuestionOption/queryById"
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
          this.form.setFieldsValue(pick(this.model,'options','questionid','content','fileid','isanswer','adduser','addtime','terminalid','placeId'))
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
        this.form.setFieldsValue(pick(row,'options','questionid','content','fileid','isanswer','adduser','addtime','terminalid','placeId'))
      },
    }
  }
</script>