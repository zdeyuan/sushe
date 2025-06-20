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

        <a-form-item label="项目名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'name', validatorRules.name]" placeholder="请输入项目名称"></a-input>
        </a-form-item>
        <a-form-item label="竞赛类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'jslb', validatorRules.jslb]" placeholder="请输入竞赛类型"></a-input>
        </a-form-item>
        <a-form-item label="竞赛级别" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'jsjb', validatorRules.jsjb]" placeholder="请输入竞赛级别"></a-input>
        </a-form-item>
        <a-form-item label="是否启用0：不启用  1：启用" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'status', validatorRules.status]" placeholder="请输入是否启用0：不启用  1：启用" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="举办单位" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'jbdw', validatorRules.jbdw]" placeholder="请输入举办单位"></a-input>
        </a-form-item>
        <a-form-item label="开始报名时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'begindate', validatorRules.begindate]" placeholder="请输入开始报名时间" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="结束报名时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'enddate', validatorRules.enddate]" placeholder="请输入结束报名时间" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="竞赛开始时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'jsbegindate', validatorRules.jsbegindate]" placeholder="请输入竞赛开始时间" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="竞赛结束时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'jsenddate', validatorRules.jsenddate]" placeholder="请输入竞赛结束时间" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="1:个人项目 2团体项目" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'xmtype', validatorRules.xmtype]" placeholder="请输入1:个人项目 2团体项目" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="参赛说明" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'cssm', validatorRules.cssm]" placeholder="请输入参赛说明"></a-input>
        </a-form-item>
        <a-form-item label="终端id" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'terminalid', validatorRules.terminalid]" placeholder="请输入终端id" style="width: 100%"/>
        </a-form-item>

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>

  import { httpAction } from '@/api/common/manage'
  import pick from 'lodash.pick'
  import { validateDuplicateValue } from '@/utils/util'

  export default {
    name: "VeJwJingsaiProjectModal",
    components: {
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
          name: {rules: [
            {required: true, message: '请输入项目名称!'},
          ]},
          jslb: {rules: [
          ]},
          jsjb: {rules: [
          ]},
          status: {rules: [
            {required: true, message: '请输入是否启用0：不启用  1：启用!'},
          ]},
          jbdw: {rules: [
            {required: true, message: '请输入举办单位!'},
          ]},
          begindate: {rules: [
            {required: true, message: '请输入开始报名时间!'},
          ]},
          enddate: {rules: [
            {required: true, message: '请输入结束报名时间!'},
          ]},
          jsbegindate: {rules: [
            {required: true, message: '请输入竞赛开始时间!'},
          ]},
          jsenddate: {rules: [
            {required: true, message: '请输入竞赛结束时间!'},
          ]},
          xmtype: {rules: [
            {required: true, message: '请输入1:个人项目 2团体项目!'},
          ]},
          cssm: {rules: [
            {required: true, message: '请输入参赛说明!'},
          ]},
          terminalid: {rules: [
            {required: true, message: '请输入终端id!'},
          ]},
        },
        url: {
          add: "/edu-schedule/jingsaiProject/veJwJingsaiProject/add",
          edit: "/edu-schedule/jingsaiProject/veJwJingsaiProject/edit",
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
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'name','jslb','jsjb','status','jbdw','begindate','enddate','jsbegindate','jsenddate','xmtype','cssm','terminalid'))
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
        this.form.setFieldsValue(pick(row,'name','jslb','jsjb','status','jbdw','begindate','enddate','jsbegindate','jsenddate','xmtype','cssm','terminalid'))
      },


    }
  }
</script>