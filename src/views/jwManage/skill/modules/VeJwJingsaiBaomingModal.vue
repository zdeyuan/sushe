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
          <j-dict-select-tag :disabled="check" v-decorator="[ 'projectid', validatorRules.projectid]" placeholder="请选择竞赛活动"
                             dictCode="edu_dev_open.ve_jw_jingsai_project,name,id" :trigger-change="true" ></j-dict-select-tag>
        </a-form-item>
        <a-form-item label="学生姓名" :labelCol="labelCol" :wrapperCol="wrapperCol">
<!--          <a-input v-decorator="[ 'username', validatorRules.username]" placeholder="请输入学生姓名"></a-input>-->
          <j-select-student v-decorator="[ 'username', validatorRules.username]"></j-select-student>
        </a-form-item>
        <a-form-item label="指导老师" :labelCol="labelCol" :wrapperCol="wrapperCol">
<!--          <a-input v-decorator="[ 'groupid', validatorRules.groupid]" placeholder="请输入指导老师"></a-input>-->

          <j-select-teacher v-decorator="[ 'groupid', validatorRules.groupid]"></j-select-teacher>
        </a-form-item>

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>

  import { httpAction } from '@/api/common/manage'
  import pick from 'lodash.pick'
  import { validateDuplicateValue } from '@/utils/util'
  import JSelectTeacher from '@/components/kwglbiz/JSelectTeacher'
  import JSelectStudent from '@/components/kwglbiz/JSelectStudent'

  export default {
    name: "VeJwJingsaiBaomingModal",
    components: {
      JSelectStudent,
      JSelectTeacher
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
          name: {rules: [
            {required: true, message: '请输入项目名称!'},
          ]},
          stuid: {rules: [
            {required: true, message: '请输入学生的stuId!'},
          ]},
          username: {rules: [
            {required: true, message: '请输入学生姓名!'},
          ]},
          groupid: {rules: [
            {required: true, message: '请输入组Id!'},
          ]},
          terminalid: {rules: [
            {required: true, message: '请输入终端Id!'},
          ]},
        },
        url: {
          add: "/edu-schedule/jingsaiProject/veJwJingsaiBaoming/add",
          edit: "/edu-schedule/jingsaiProject/veJwJingsaiBaoming/edit",
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
          this.form.setFieldsValue(pick(this.model,'projectid','stuid','username','groupid','terminalid'))
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
            that.$message.warning("报名失败");
            that.confirmLoading = false;
            // let formData = Object.assign(this.model, values);
            // console.log("表单提交数据",formData)
            // httpAction(httpurl,formData,method).then((res)=>{
            //   if(res.success){
            //     that.$message.success(res.message);
            //     that.$emit('ok');
            //   }else{
            //     that.$message.warning(res.message);
            //   }
            // }).finally(() => {
            //   that.confirmLoading = false;
            //   that.close();
            // })
          }

        })
      },
      handleCancel () {
        this.close()
      },
      popupCallback(row){
        this.form.setFieldsValue(pick(row,'projectid','stuid','username','groupid','terminalid'))
      },


    }
  }
</script>