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
<!--          <j-dict-select-tag :disabled="check" v-decorator="[ 'projectid', validatorRules.projectid]" placeholder="请选择项目"-->
<!--                             dictCode="edu_dev_open.ve_jw_jingsai_project,name,id" :trigger-change="true" ></j-dict-select-tag>-->

          <j-select-jingsai-project  :disabled="check" v-decorator="[ 'projectid', validatorRules.projectid]" placeholder="请选择项目" :trigger-change="true"></j-select-jingsai-project>
        </a-form-item>
        <a-form-item label="学生姓名" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-select-student :trigger-change="true" v-decorator="[ 'stuid', validatorRules.stuid]" placeholder="请选择学生"></j-select-student>
<!--          <a-input v-decorator="[ 'username', validatorRules.username]" placeholder="请输入学生姓名"></a-input>-->
        </a-form-item>
        <a-form-item label="指导老师" :labelCol="labelCol" :wrapperCol="wrapperCol">

          <j-select-teacher :trigger-change="true" v-decorator="[ 'teacherid', validatorRules.teacherid]" placeholder="请选择指导教师"></j-select-teacher>
<!--          <a-input v-decorator="[ 'groupid', validatorRules.groupid]" placeholder="请输入指导老师"></a-input>-->
        </a-form-item>

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>

  import { httpAction } from '@/api/common/manage'
  import pick from 'lodash.pick'
  import { validateDuplicateValue } from '@/utils/util'
  import { formatDate } from '@/utils/util'
  import JSelectTeacher from '@/components/kwglbiz/JSelectTeacher'
  import JSelectStudent from '@/components/kwglbiz/JSelectStudent'
  import JSelectJingsaiProject from '@/components/kwglbiz/JSelectJingsaiProject'

  export default {
    name: "VeJwJingsaiProjectModal",
    components: {
      JSelectJingsaiProject,
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
            {required: true, message: '请选择竞赛项目!'},
          ]},
          jslb: {rules: [
          ]},
          jsjb: {rules: [
          ]},
          stuid: {rules: [
            {required: true, message: '请选择学生!'},
          ]},
          teacherid: {rules: [
            {required: true, message: '请选择指导老师!'},
          ]},
        },
        url: {
          // add: "/edu-schedule/jingsaiProject/veJwJingsaiProject/add",
          // edit: "/edu-schedule/jingsaiProject/veJwJingsaiProject/edit",
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


        record.teacherid = record.teacherid == null ? null:record.teacherid+'';
        record.projectid = record.projectid == null ? null:record.projectid+'';
        record.stuid = record.stuid == null ? null:record.stuid+'';


        this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'stuid','teacherid','projectid'))
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

            // that.$message.warning("报名失败");
            // that.confirmLoading = false;
            let formData = Object.assign(this.model, values);

            formData.jsenddate = new Date(formData.jsenddateStr).getTime() / 1000;

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