<template>
  <a-modal
    :title="title"
    :width="width"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    okText="确认"
    cancelText="取消">
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">

        <a-form-item label="学期ID" :labelCol="labelCol" :wrapperCol="wrapperCol">
<!--          <a-input-number v-decorator="[ 'semid', validatorRules.semid]" placeholder="请输入学期ID" style="width: 100%"/>-->
          <j-select-xueqi v-decorator="[ 'semid', validatorRules.semid]" placeholder="请选择学期"></j-select-xueqi>
        </a-form-item>
        <a-form-item label="周几" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'week', validatorRules.week]" placeholder="请输入周几" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="节" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'section', validatorRules.section]" placeholder="请输入节" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="任课教师" :labelCol="labelCol" :wrapperCol="wrapperCol">
<!--          <a-input-number v-decorator="[ 'teacherid', validatorRules.teacherid]" placeholder="请输入任课教师userId" style="width: 100%"/>-->

          <j-select-teacher :trigger-change="true" v-decorator="[ 'teacherid', validatorRules.teacherid]" placeholder="请选择任课教师"></j-select-teacher>
        </a-form-item>
<!--        <a-form-item label="教师姓名" :labelCol="labelCol" :wrapperCol="wrapperCol">-->
<!--          <a-input v-decorator="[ 'jsxm', validatorRules.jsxm]" placeholder="请输入教师姓名"></a-input>-->
<!--        </a-form-item>-->
        <a-form-item label="教室ID" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'jsid', validatorRules.jsid]" placeholder="请输入教室ID" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="教室名" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'jsmc', validatorRules.jsmc]" placeholder="请输入教室名"></a-input>
        </a-form-item>
        <a-form-item label="课程ID" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-select-jiaoxue-kecheng v-decorator="[ 'kcid', validatorRules.kcid]"></j-select-jiaoxue-kecheng>
<!--          <a-input-number v-decorator="[ 'kcid', validatorRules.kcid]" placeholder="请输入课程ID" style="width: 100%"/>-->
        </a-form-item>
        <a-form-item label="课程名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'kcmc', validatorRules.kcmc]" placeholder="请输入课程名称"></a-input>
        </a-form-item>
        <a-form-item label="终端ID" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'terminalid', validatorRules.terminalid]" placeholder="请输入终端ID" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="排课主表ID" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'pkid', validatorRules.pkid]" placeholder="请输入排课主表ID" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="实际上的周数" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'pknum', validatorRules.pknum]" placeholder="请输入实际上的周数" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="开始周" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'pkstartweek', validatorRules.pkstartweek]" placeholder="请输入开始周" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="结束周" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'pkendweek', validatorRules.pkendweek]" placeholder="请输入结束周" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="教学任务Id" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'jxrwid', validatorRules.jxrwid]" placeholder="请输入教学任务Id" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="行政班id，多个行政班用，隔开" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'xzbids', validatorRules.xzbids]" placeholder="请输入行政班id，多个行政班用，隔开"></a-input>
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
  import JSelectXueqi from '@/components/kwglbiz/JSelectXueqi'
  import JSelectJiaoxueKecheng from '@/components/kwglbiz/JSelectJiaoxueKecheng'

  export default {
    name: "VeJwPkmxModal",
    components: {
      JSelectJiaoxueKecheng,
      JSelectXueqi,
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
          semid: {rules: [
            {required: true, message: '请输入学期ID!'},
          ]},
          week: {rules: [
            {required: true, message: '请输入周几!'},
          ]},
          section: {rules: [
            {required: true, message: '请输入节!'},
          ]},
          teacherid: {rules: [
            {required: true, message: '请输入任课教师userId!'},
          ]},
          jsxm: {rules: [
            {required: true, message: '请输入教师姓名!'},
          ]},
          jsid: {rules: [
            {required: true, message: '请输入教室ID!'},
          ]},
          jsmc: {rules: [
            {required: true, message: '请输入教室名!'},
          ]},
          kcid: {rules: [
            {required: true, message: '请输入课程ID!'},
          ]},
          kcmc: {rules: [
            {required: true, message: '请输入课程名称!'},
          ]},
          terminalid: {rules: [
            {required: true, message: '请输入终端ID!'},
          ]},
          pkid: {rules: [
            {required: true, message: '请输入排课主表ID!'},
          ]},
          pknum: {rules: [
          ]},
          pkstartweek: {rules: [
          ]},
          pkendweek: {rules: [
          ]},
          jxrwid: {rules: [
          ]},
          xzbids: {rules: [
          ]},
        },
        url: {
          add: "/jxrw/veJwPkmx/add",
          edit: "/jxrw/veJwPkmx/edit",
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
          this.form.setFieldsValue(pick(this.model,'semid','week','section','teacherid','jsxm','jsid','jsmc','kcid','kcmc','terminalid','pkid','pknum','pkstartweek','pkendweek','jxrwid','xzbids'))
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
        this.form.setFieldsValue(pick(row,'semid','week','section','teacherid','jsxm','jsid','jsmc','kcid','kcmc','terminalid','pkid','pknum','pkstartweek','pkendweek','jxrwid','xzbids'))
      },


    }
  }
</script>