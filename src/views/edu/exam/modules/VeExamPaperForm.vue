<template>
  <a-spin :spinning="confirmLoading">
    <j-form-container :disabled="formDisabled">
      <a-form :form="form" slot="detail">
        <a-row>
          <a-col :span="24">
            <a-form-item label="试卷名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['name', validatorRules.name]" placeholder="请输入试卷名称"  ></a-input>
            </a-form-item>
          </a-col>
            <a-col :span="24">
            <a-form-item label="试卷类型：" :labelCol="labelCol" :wrapperCol="wrapperCol">
<!--              <a-input v-decorator="['type', validatorRules.type]" placeholder="请输入试卷类型：1考试 2 自测 3作业，自测的试卷只能添加客观题;1，2"  ></a-input>-->
              <j-dict-select-tag  v-decorator="['type', {}]" placeholder="请输入试卷类型" :type="'select'" :triggerChange="true" dictCode="paper_type"/>
            </a-form-item>
          </a-col>
           <a-col :span="24">
            <a-form-item label="总分" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number v-decorator="['scores', validatorRules.scores]" placeholder="请输入总分" style="width: 100%" />
            </a-form-item>
          </a-col>
         
           <a-col :span="24">
            <a-form-item label="是否启用" :labelCol="labelCol" :wrapperCol="wrapperCol">
               <a-switch  v-decorator="['status', validatorRules.status]" default-checked @change="onChange" />
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
    name: 'VeExamPaperForm',
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
          topicid: {
            rules: [
              { required: true, message: '请输入主题id!'},
            ]
          },
          name: {
            rules: [
              { required: true, message: '请输入试卷名称!'},
            ]
          },
          adduser: {
            rules: [
              { required: true, message: '请输入试卷创建人!'},
            ]
          },
          addtime: {
            rules: [
              { required: true, message: '请输入创建时间!'},
            ]
          },
          status: {
            rules: [
              { required: true, message: '请输入是否启用!'},
            ]
          },
          scores: {
            rules: [
              { required: true, message: '请输入总分!'},
            ]
          },
          usecount: {
            rules: [
              { required: true, message: '请输入试卷使用次数!'},
            ]
          },
          type: {
            rules: [
              { required: true, message: '请输入试卷类型：1考试 2 自测 3作业，自测的试卷只能添加客观题;1，2!'},
            ]
          },
          nowscore: {
            rules: [
              { required: true, message: '请输入已设分数!'},
            ]
          },
          terminalid: {
            rules: [
              { required: true, message: '请输入终端ID!'},
            ]
          },
        },
        url: {
          add: "/exam/veExamPaper/add",
          edit: "/exam/veExamPaper/edit",
          queryById: "/exam/veExamPaper/queryById"
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
          this.form.setFieldsValue(pick(this.model,'topicid','name','adduser','addtime','status','scores','usecount','type','nowscore','terminalid','placeId'))
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
        this.form.setFieldsValue(pick(row,'topicid','name','adduser','addtime','status','scores','usecount','type','nowscore','terminalid','placeId'))
      },
      onChange(checked) {
      console.log(`a-switch to ${checked}`);
    },
    }
  }
</script>