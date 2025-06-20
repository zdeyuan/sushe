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

        <a-form-item label="竞赛项目" :labelCol="labelCol" :wrapperCol="wrapperCol">
<!--          <j-dict-select-tag :disabled="check" v-decorator="[ 'projectid', validatorRules.projectid]" placeholder="请选择"-->
<!--                             dictCode="edu_dev_open.ve_jw_jingsai_project,name,id" :trigger-change="true" ></j-dict-select-tag>-->
<!--          -->
          <j-select-jingsai-project :xmtype="'2'" :disabled="check" v-decorator="[ 'projectid', validatorRules.projectid]" placeholder="请选择竞赛项目" :trigger-change="true" ></j-select-jingsai-project>
        </a-form-item>
        <a-form-item label="团队名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'name', validatorRules.name]" placeholder="请输入团队名称"></a-input>
        </a-form-item>
        <a-form-item label="团队成员" :labelCol="labelCol" :wrapperCol="wrapperCol">
<!--          <a-input v-decorator="[ 'username', validatorRules.username]" placeholder="请输入团队成员名字"></a-input>-->
          <j-select-student v-if="visible" :multiple="true" :trigger-change="true" placeholder="请选择团队人员" v-decorator="[ 'teamStudentIds', validatorRules.teamStudentIds]"></j-select-student>
        </a-form-item>
<!--        <a-form-item label="团队成员" :labelCol="labelCol" :wrapperCol="wrapperCol">-->
<!--          <a-input-number v-decorator="[ 'username', validatorRules.username]" placeholder="请输入团队成员名字" style="width: 100%"/>-->
<!--        </a-form-item>-->
        <a-form-item label="指导教师" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-select-teacher :trigger-change="true" v-decorator="[ 'teacherid', validatorRules.teacherid]" placeholder="请选择指导教师"></j-select-teacher>
<!--          <a-input-number v-decorator="[ 'terminalid', validatorRules.terminalid]" placeholder="请输入指导教师名字" style="width: 100%"/>-->
        </a-form-item>
        <!--<a-form-item label="所属项目Id" :labelCol="labelCol" :wrapperCol="wrapperCol">-->
          <!--<a-input-number v-decorator="[ 'projectid', validatorRules.projectid]" placeholder="请输入所属项目Id" style="width: 100%"/>-->
        <!--</a-form-item>-->
        <!--<a-form-item label="建立时间" :labelCol="labelCol" :wrapperCol="wrapperCol">-->
          <!--<a-input-number v-decorator="[ 'createtime', validatorRules.createtime]" placeholder="请输入建立时间" style="width: 100%"/>-->
        <!--</a-form-item>-->
        <!--<a-form-item label="终端Id" :labelCol="labelCol" :wrapperCol="wrapperCol">-->
          <!--<a-input-number v-decorator="[ 'terminalid', validatorRules.terminalid]" placeholder="请输入终端Id" style="width: 100%"/>-->
        <!--</a-form-item>-->

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>

  import { httpAction } from '@/api/common/manage'
  import pick from 'lodash.pick'
  import { validateDuplicateValue } from '@/utils/util'
  import JSelectStudent from '@/components/kwglbiz/JSelectStudent'
  import JSelectTeacher from '@/components/kwglbiz/JSelectTeacher'
  import JSelectJingsaiProject from '@/components/kwglbiz/JSelectJingsaiProject'

  export default {
    name: "VeJwJingsaiGroupModal",
    components: {
      JSelectJingsaiProject,
      JSelectTeacher,
      JSelectStudent
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
            {required: true, message: '请输入团队名称!'},
          ]},
          projectid: {rules: [
            {required: true, message: '请选择竞赛项目!'},
          ]},
          teamStudentIds: {rules: [
            {required: true, message: '请选择团队成员!'},
          ]},
          teacherid: {rules: [
            {required: true, message: '请选择指导老师'},
          ]},
        },
        url: {
          add: "/edu-schedule/jingsaiProject/veJwJingsaiGroup/add",
          edit: "/edu-schedule/jingsaiProject/veJwJingsaiGroup/edit",
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
        if(record.projectid!=null){
          record.projectid +='';
        }
        if(record.teacherid!=null){
          record.teacherid +='';
        }
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'name','projectid','teamStudentIds','createtime','teacherid'))
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
        this.form.setFieldsValue(pick(row,'name','projectid','createtime','terminalid'))
      },


    }
  }
</script>