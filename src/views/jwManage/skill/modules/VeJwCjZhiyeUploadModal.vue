<template>
  <!--@ok="handleOk"-->

  <!--cancelText="关闭"-->
  <a-modal
    :title="title"
    :width="width"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭"
  >

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <j-image-upload text="上传" v-model="fileList" :isMultiple="true"></j-image-upload>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>

  import { httpAction } from '@/api/common/manage'
  import pick from 'lodash.pick'
  import { validateDuplicateValue } from '@/utils/util'
  import JDate from '@/components/edu/JDate'

  export default {
    name: "VeJwCjZhiyeUploadModal",
    components: {
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
          zyksid: {rules: [
            {required: true, message: '请输入职业认证考试ID!'},
          ]},
          falid: {rules: [
          ]},
          specid: {rules: [
          ]},
          xzid: {rules: [
          ]},
          gradeid: {rules: [
          ]},
          xzbid: {rules: [
          ]},
          stuid: {rules: [
          ]},
          userid: {rules: [
          ]},
          xh: {rules: [
            {required: true, message: '请输入学号!'},
          ]},
          xm: {rules: [
          ]},
          zkzh: {rules: [
          ]},
          zsh: {rules: [
          ]},
          llcj: {rules: [
          ]},
          sccj: {rules: [
          ]},
          kscj: {rules: [
          ]},
          ispass: {rules: [
            {required: true, message: '请输入是否及格（0=不及格，1=及格）!'},
          ]},
          createuserid: {rules: [
          ]},
          cjlrrqsj: {rules: [
          ]},
          status: {rules: [
            {required: true, message: '请输入状态（0=初始，1=已录入，2=已提交）!'},
          ]},
          terminalid: {rules: [
            {required: true, message: '请输入终端ID!'},
          ]},
        },
        url: {
          add: "/edu-schedule/jingsaiProject/veJwCjZhiye/add",
          edit: "/edu-schedule/jingsaiProject/veJwCjZhiye/edit",
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
        if(record.ispass != null){
          record.ispass = ""+record.ispass;
        }
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'photo'))
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
            let httpurl = this.url.edit;
            let method  = 'put';
            let formData = Object.assign(this.model, values);
            console.log("表单提交数据",formData)
            httpAction(httpurl,{
              id:this.model.id,
              photo:this.fileList,
            },method).then((res)=>{
              if(res.success){
                that.model.photo = that.fileList;
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
        this.form.setFieldsValue(pick(row,'zyksid','falid','specid','xzid','gradeid','xzbid','stuid','userid','xh','xm','zkzh','zsh','llcj','sccj','kscj','ispass','createuserid','cjlrrqsj','status','terminalid'))
      },
      select(record) {
        this.visible = true
        this.model = record;
        this.fileList = record.photo;
      },
    }
  }
</script>