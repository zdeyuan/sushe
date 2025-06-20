<template>
  <a-modal
    :title="title"
    :width="width"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">

        <a-form-item label="班级" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-select-banji  v-decorator="[ 'bjid', validatorRules.bjmc]"  placeholder="请选择班级" :trigger-change="true" ></j-select-banji>
<!--          <a-input v-decorator="[ 'bjid', validatorRules.bjmc]" placeholder="请输入班级名称"></a-input>-->
        </a-form-item>
        <a-form-item label="标题" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'title', validatorRules.title]" placeholder="请输入标题"></a-input>
        </a-form-item>
        <a-form-item label="内容" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-textarea :maxLength="4000" v-decorator="[ 'contenttidText', validatorRules.contenttid]" placeholder="请输入内容" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="发布日期" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-date placeholder="请选择发布日期" v-decorator="[ 'addtime', validatorRules.addtime]" :trigger-change="true" style="width: 100%"/>
        </a-form-item>

<!--        <a-form-item label="班级ID" :labelCol="labelCol" :wrapperCol="wrapperCol">-->
<!--          <a-input-number v-decorator="[ 'bjid', validatorRules.bjid]" placeholder="请输入班级ID" style="width: 100%"/>-->
<!--        </a-form-item>-->
<!--        <a-form-item label="发布人" :labelCol="labelCol" :wrapperCol="wrapperCol">-->
<!--          <a-input-number v-decorator="[ 'adduser', validatorRules.adduser]" placeholder="请输入发布人" style="width: 100%"/>-->
<!--        </a-form-item>-->
<!--        <a-form-item label="发布人姓名" :labelCol="labelCol" :wrapperCol="wrapperCol">-->
<!--          <a-input v-decorator="[ 'addusername', validatorRules.addusername]" placeholder="请输入发布人姓名"></a-input>-->
<!--        </a-form-item>-->
<!--        <a-form-item label="审核人" :labelCol="labelCol" :wrapperCol="wrapperCol">-->
<!--          <a-input-number v-decorator="[ 'verifyuser', validatorRules.verifyuser]" placeholder="请输入审核人" style="width: 100%"/>-->
<!--        </a-form-item>-->
<!--        <a-form-item label="审核人姓名" :labelCol="labelCol" :wrapperCol="wrapperCol">-->
<!--          <a-input v-decorator="[ 'verifyusername', validatorRules.verifyusername]" placeholder="请输入审核人姓名"></a-input>-->
<!--        </a-form-item>-->
<!--        <a-form-item label="审核时间" :labelCol="labelCol" :wrapperCol="wrapperCol">-->
<!--          <j-date placeholder="请选择审核时间" v-decorator="[ 'verifytime', validatorRules.verifytime]" :trigger-change="true" style="width: 100%"/>-->
<!--        </a-form-item>-->
<!--        <a-form-item label="审核状态：1=通过，0=未通过" :labelCol="labelCol" :wrapperCol="wrapperCol">-->
<!--          <a-input-number v-decorator="[ 'verifystatus', validatorRules.verifystatus]" placeholder="请输入审核状态：1=通过，0=未通过" style="width: 100%"/>-->
<!--        </a-form-item>-->
<!--        <a-form-item label="未通过原因" :labelCol="labelCol" :wrapperCol="wrapperCol">-->
<!--          <a-input-number v-decorator="[ 'verifytid', validatorRules.verifytid]" placeholder="请输入未通过原因" style="width: 100%"/>-->
<!--        </a-form-item>-->
<!--        <a-form-item label="终端ID" :labelCol="labelCol" :wrapperCol="wrapperCol">-->
<!--          <a-input-number v-decorator="[ 'terminalid', validatorRules.terminalid]" placeholder="请输入终端ID" style="width: 100%"/>-->
<!--        </a-form-item>-->

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>

  import { httpAction } from '@/api/common/manage'
  import pick from 'lodash.pick'
  import { validateDuplicateValue } from '@/utils/util'
  import JDate from '@/components/edu/JDate'
  import JSelectBanji from '@/components/kwglbiz/JSelectBanji'

  export default {
    name: "VeJwBjggModal",
    components: {
      JSelectBanji,
      JDate,
    },
    data () {
      return {
        form: this.$form.createForm(this),
        title:"操作",
        width:800,
        visible: false,
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
          bjid: {rules: [
            {required: true, message: '请输入班级ID!'},
          ]},
          bjmc: {rules: [
            {required: true, message: '请选择班级!'},
          ]},
          addtime: {rules: [
            {required: true, message: '请输入发布时间!'},
          ]},
          title: {rules: [
            {required: true, message: '请输入标题!'},
          ]},
          contenttid: {rules: [
            {required: true, message: '请输入内容!'},
          ]},
          adduser: {rules: [
            {required: true, message: '请输入发布人!'},
          ]},
          addusername: {rules: [
            {required: true, message: '请输入发布人姓名!'},
          ]},
          verifyuser: {rules: [
          ]},
          verifyusername: {rules: [
            {required: true, message: '请输入审核人姓名!'},
          ]},
          verifytime: {rules: [
          ]},
          verifystatus: {rules: [
          ]},
          verifytid: {rules: [
          ]},
          terminalid: {rules: [
            {required: true, message: '请输入终端ID!'},
          ]},
        },
        url: {
          add: "/jxgz/veJwBjgg/add",
          edit: "/jxgz/veJwBjgg/edit",
        }
      }
    },
    created () {
    },
    methods: {
      add () {
        this.edit({});
      },
      edit (record) {
        if(record.bjid!=null){
          record.bjid+='';
        }
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'bjid','bjmc','addtime','title','contenttid','contenttidText','adduser','addusername','verifyuser','verifyusername','verifytime','verifystatus','verifytid','terminalid'))
        })
      },
      close () {
        this.$emit('close');
        this.visible = false;
      },
      handleOk () {
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
			let user=JSON.parse(window.localStorage.getItem('userInfo'));
            this.model.adduser =user.userId;
            let formData = Object.assign(this.model, values);
            console.log("表单提交数据",formData)
            httpAction(httpurl,formData,method).then((res)=>{
              if(res.success){
                that.$message.success(res.message);
                that.$emit('ok');
                that.close();
              }else{
                that.$message.warning(res.message);
              }
            }).finally(() => {
              that.confirmLoading = false;
            })
          }

        })
      },
      handleCancel () {
        this.close()
      },
      popupCallback(row){
        this.form.setFieldsValue(pick(row,'bjid','bjmc','addtime','title','contenttid','contenttidText','adduser','addusername','verifyuser','verifyusername','verifytime','verifystatus','verifytid','terminalid'))
      },


    }
  }
</script>