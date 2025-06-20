<template>
  <a-modal
    :title="title"
    :width="width"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    okText="确认"  cancelText="取消">
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">

        <a-form-item label="教学任务ID" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'jxrwid', validatorRules.jxrwid]" placeholder="请输入教学任务ID" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="是否关联补考（1=有补考，0=无补考）" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'hasexam', validatorRules.hasexam]" placeholder="请输入是否关联补考（1=有补考，0=无补考）" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="补考ID" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'bkid', validatorRules.bkid]" placeholder="请输入补考ID" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="院系ID" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'falid', validatorRules.falid]" placeholder="请输入院系ID" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="专业ID" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'specid', validatorRules.specid]" placeholder="请输入专业ID" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="学制ID" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'xzid', validatorRules.xzid]" placeholder="请输入学制ID" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="年级ID" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'gradeid', validatorRules.gradeid]" placeholder="请输入年级ID" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="学期ID" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'semid', validatorRules.semid]" placeholder="请输入学期ID" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="课程ID" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'kcid', validatorRules.kcid]" placeholder="请输入课程ID" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="学生ID" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'stuid', validatorRules.stuid]" placeholder="请输入学生ID" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="学生用户ID" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'userid', validatorRules.userid]" placeholder="请输入学生用户ID" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="学号" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'xh', validatorRules.xh]" placeholder="请输入学号"></a-input>
        </a-form-item>
        <a-form-item label="学生姓名" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'xm', validatorRules.xm]" placeholder="请输入学生姓名"></a-input>
        </a-form-item>
        <a-form-item label="行政班ID" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'xzbid', validatorRules.xzbid]" placeholder="请输入行政班ID" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="教学班ID" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'jxbid', validatorRules.jxbid]" placeholder="请输入教学班ID" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="考试日期" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'ksrq', validatorRules.ksrq]" placeholder="请输入考试日期"></a-input>
        </a-form-item>
        <a-form-item label="考试日期（时间）" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'ksrqsj', validatorRules.ksrqsj]" placeholder="请输入考试日期（时间）"></a-input>
        </a-form-item>
        <a-form-item label="课程成绩" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'kccj', validatorRules.kccj]" placeholder="请输入课程成绩" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="是否及格（1=及格，0=不及格）" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'ispass', validatorRules.ispass]" placeholder="请输入是否及格（1=及格，0=不及格）" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="成绩录入人ID" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'recorduserid', validatorRules.recorduserid]" placeholder="请输入成绩录入人ID" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="成绩录入人号" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'cjlrrh', validatorRules.cjlrrh]" placeholder="请输入成绩录入人号"></a-input>
        </a-form-item>
        <a-form-item label="成绩录入日期时间（原日期时间合并）" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-date placeholder="请选择成绩录入日期时间（原日期时间合并）" v-decorator="[ 'cjlrrqsj', validatorRules.cjlrrqsj]" :trigger-change="true" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="审核状态（0=待审核，1=通过，2=不通过）" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'auditstatus', validatorRules.auditstatus]" placeholder="请输入审核状态（0=待审核，1=通过，2=不通过）" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="审核人用户ID" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'audituserid', validatorRules.audituserid]" placeholder="请输入审核人用户ID" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="审核时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'audittime', validatorRules.audittime]" placeholder="请输入审核时间" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="终端ID" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'terminalid', validatorRules.terminalid]" placeholder="请输入终端ID" style="width: 100%"/>
        </a-form-item>

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
    name: "VeJwCjBukaoModal",
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
          jxrwid: {rules: [
          ]},
          hasexam: {rules: [
          ]},
          bkid: {rules: [
          ]},
          falid: {rules: [
          ]},
          specid: {rules: [
          ]},
          xzid: {rules: [
          ]},
          gradeid: {rules: [
          ]},
          semid: {rules: [
          ]},
          kcid: {rules: [
            {required: true, message: '请输入课程ID!'},
          ]},
          stuid: {rules: [
            {required: true, message: '请输入学生ID!'},
          ]},
          userid: {rules: [
          ]},
          xh: {rules: [
            {required: true, message: '请输入学号!'},
          ]},
          xm: {rules: [
          ]},
          xzbid: {rules: [
          ]},
          jxbid: {rules: [
          ]},
          ksrq: {rules: [
          ]},
          ksrqsj: {rules: [
          ]},
          kccj: {rules: [
          ]},
          ispass: {rules: [
          ]},
          recorduserid: {rules: [
          ]},
          cjlrrh: {rules: [
          ]},
          cjlrrqsj: {rules: [
          ]},
          auditstatus: {rules: [
          ]},
          audituserid: {rules: [
          ]},
          audittime: {rules: [
          ]},
          terminalid: {rules: [
            {required: true, message: '请输入终端ID!'},
          ]},
        },
        url: {
          add: "/kwgl/veJwCjBukao/add",
          edit: "/kwgl/veJwCjBukao/edit",
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
          this.form.setFieldsValue(pick(this.model,'jxrwid','hasexam','bkid','falid','specid','xzid','gradeid','semid','kcid','stuid','userid','xh','xm','xzbid','jxbid','ksrq','ksrqsj','kccj','ispass','recorduserid','cjlrrh','cjlrrqsj','auditstatus','audituserid','audittime','terminalid'))
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
        this.form.setFieldsValue(pick(row,'jxrwid','hasexam','bkid','falid','specid','xzid','gradeid','semid','kcid','stuid','userid','xh','xm','xzbid','jxbid','ksrq','ksrqsj','kccj','ispass','recorduserid','cjlrrh','cjlrrqsj','auditstatus','audituserid','audittime','terminalid'))
      },


    }
  }
</script>