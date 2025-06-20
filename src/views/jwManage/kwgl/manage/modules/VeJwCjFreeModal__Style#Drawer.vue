<template>
  <a-drawer
    :title="title"
    :width="width"
    placement="right"
    :closable="false"
    @close="close"
    :visible="visible">

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">

        <a-form-item label="教学任务" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'jxrwid', validatorRules.jxrwid]" placeholder="请输入教学任务" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="考试形式ID" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'ksxsid', validatorRules.ksxsid]" placeholder="请输入考试形式ID" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="是否有考试（1=有，0=无）" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'hasexam', validatorRules.hasexam]" placeholder="请输入是否有考试（1=有，0=无）" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="考试ID" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'ksid', validatorRules.ksid]" placeholder="请输入考试ID" style="width: 100%"/>
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
        <a-form-item label="院系ID" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'falid', validatorRules.falid]" placeholder="请输入院系ID" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="专业ID" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'specid', validatorRules.specid]" placeholder="请输入专业ID" style="width: 100%"/>
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
        <a-form-item label="教学班ID" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'jxbid', validatorRules.jxbid]" placeholder="请输入教学班ID" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="行政班ID" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'xzbid', validatorRules.xzbid]" placeholder="请输入行政班ID" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="考试日期" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'ksrq', validatorRules.ksrq]" placeholder="请输入考试日期"></a-input>
        </a-form-item>
        <a-form-item label="平时成绩" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'pscj', validatorRules.pscj]" placeholder="请输入平时成绩" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="分数类考试成绩" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'fslkscj', validatorRules.fslkscj]" placeholder="请输入分数类考试成绩" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="课程成绩（最终成绩）" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'kccj', validatorRules.kccj]" placeholder="请输入课程成绩（最终成绩）" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="课程等级成绩码" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'kcdjcjm', validatorRules.kcdjcjm]" placeholder="请输入课程等级成绩码" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="免缓缺类型（1=免考，2=缓考，3=缺考）" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'type', validatorRules.type]" placeholder="请输入免缓缺类型（1=免考，2=缓考，3=缺考）" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="免缓缺登记的原因（大文本字段ID）" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'reasontid', validatorRules.reasontid]" placeholder="请输入免缓缺登记的原因（大文本字段ID）" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="登记用户ID" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'createuserid', validatorRules.createuserid]" placeholder="请输入登记用户ID" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="登记时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'createtime', validatorRules.createtime]" placeholder="请输入登记时间" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="审核状态（0=待审核，1=通过，2=不通过）" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'auditstatus', validatorRules.auditstatus]" placeholder="请输入审核状态（0=待审核，1=通过，2=不通过）" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="审核人ID" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'audituserid', validatorRules.audituserid]" placeholder="请输入审核人ID" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="审核不通过的原因（大文本字段ID）" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'audittid', validatorRules.audittid]" placeholder="请输入审核不通过的原因（大文本字段ID）" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="终端ID" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'terminalid', validatorRules.terminalid]" placeholder="请输入终端ID" style="width: 100%"/>
        </a-form-item>

      </a-form>
    </a-spin>
    <a-button type="primary" @click="handleOk">确定</a-button>
    <a-button type="primary" @click="handleCancel">取消</a-button>
  </a-drawer>
</template>

<script>

  import { httpAction } from '@/api/common/manage'
  import pick from 'lodash.pick'
  import { validateDuplicateValue } from '@/utils/util'

  export default {
    name: "VeJwCjFreeModal",
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
          jxrwid: {rules: [
          ]},
          ksxsid: {rules: [
          ]},
          hasexam: {rules: [
          ]},
          ksid: {rules: [
            {required: true, message: '请输入考试ID!'},
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
            {required: true, message: '请输入学生姓名!'},
          ]},
          falid: {rules: [
            {required: true, message: '请输入院系ID!'},
          ]},
          specid: {rules: [
          ]},
          gradeid: {rules: [
          ]},
          semid: {rules: [
          ]},
          kcid: {rules: [
            {required: true, message: '请输入课程ID!'},
          ]},
          jxbid: {rules: [
          ]},
          xzbid: {rules: [
          ]},
          ksrq: {rules: [
          ]},
          pscj: {rules: [
          ]},
          fslkscj: {rules: [
          ]},
          kccj: {rules: [
          ]},
          kcdjcjm: {rules: [
          ]},
          type: {rules: [
            {required: true, message: '请输入免缓缺类型（1=免考，2=缓考，3=缺考）!'},
          ]},
          reasontid: {rules: [
            {required: true, message: '请输入免缓缺登记的原因（大文本字段ID）!'},
          ]},
          createuserid: {rules: [
            {required: true, message: '请输入登记用户ID!'},
          ]},
          createtime: {rules: [
            {required: true, message: '请输入登记时间!'},
          ]},
          auditstatus: {rules: [
          ]},
          audituserid: {rules: [
          ]},
          audittid: {rules: [
          ]},
          terminalid: {rules: [
            {required: true, message: '请输入终端ID!'},
          ]},
        },
        url: {
          add: "/kwgl/veJwCjFree/add",
          edit: "/kwgl/veJwCjFree/edit",
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
          this.form.setFieldsValue(pick(this.model,'jxrwid','ksxsid','hasexam','ksid','stuid','userid','xh','xm','falid','specid','gradeid','semid','kcid','jxbid','xzbid','ksrq','pscj','fslkscj','kccj','kcdjcjm','type','reasontid','createuserid','createtime','auditstatus','audituserid','audittid','terminalid'))
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
        this.form.setFieldsValue(pick(row,'jxrwid','ksxsid','hasexam','ksid','stuid','userid','xh','xm','falid','specid','gradeid','semid','kcid','jxbid','xzbid','ksrq','pscj','fslkscj','kccj','kcdjcjm','type','reasontid','createuserid','createtime','auditstatus','audituserid','audittid','terminalid'))
      }

    }
  }
</script>

<style lang="less" scoped>
/** Button按钮间距 */
  .ant-btn {
    margin-left: 30px;
    margin-bottom: 30px;
    float: right;
  }
</style>