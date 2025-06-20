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

        <a-form-item label="项目Id" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'projectid', validatorRules.projectid]" placeholder="请输入项目Id" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="组Id" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'groupid', validatorRules.groupid]" placeholder="请输入组Id" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="学生的stuId" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'stuid', validatorRules.stuid]" placeholder="请输入学生的stuId" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="名次" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'rank', validatorRules.rank]" placeholder="请输入名次"></a-input>
        </a-form-item>
        <a-form-item label="获奖日期" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'adddate', validatorRules.adddate]" placeholder="请输入获奖日期" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="终端Id" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'terminalid', validatorRules.terminalid]" placeholder="请输入终端Id" style="width: 100%"/>
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
    name: "VeJwJingsaiScoreModal",
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
          projectid: {rules: [
            {required: true, message: '请输入项目Id!'},
          ]},
          groupid: {rules: [
            {required: true, message: '请输入组Id!'},
          ]},
          stuid: {rules: [
            {required: true, message: '请输入学生的stuId!'},
          ]},
          rank: {rules: [
            {required: true, message: '请输入名次!'},
          ]},
          adddate: {rules: [
            {required: true, message: '请输入获奖日期!'},
          ]},
          terminalid: {rules: [
            {required: true, message: '请输入终端Id!'},
          ]},
        },
        url: {
          add: "/edu-schedule/jingsaiProject/veJwJingsaiScore/add",
          edit: "/edu-schedule/jingsaiProject/veJwJingsaiScore/edit",
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
          this.form.setFieldsValue(pick(this.model,'projectid','groupid','stuid','rank','adddate','terminalid'))
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
        this.form.setFieldsValue(pick(row,'projectid','groupid','stuid','rank','adddate','terminalid'))
      },


    }
  }
</script>