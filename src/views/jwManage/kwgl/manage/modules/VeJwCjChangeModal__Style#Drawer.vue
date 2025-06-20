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

        <a-form-item label="成绩记录ID" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'cjid', validatorRules.cjid]" placeholder="请输入成绩记录ID" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="考试形式ID（数据字典）" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'ksxsid', validatorRules.ksxsid]" placeholder="请输入考试形式ID（数据字典）" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="考试ID" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'ksid', validatorRules.ksid]" placeholder="请输入考试ID" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="课程ID" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'kcid', validatorRules.kcid]" placeholder="请输入课程ID" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="学生ID" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'stuid', validatorRules.stuid]" placeholder="请输入学生ID" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="用户ID" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'userid', validatorRules.userid]" placeholder="请输入用户ID" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="学号" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'xh', validatorRules.xh]" placeholder="请输入学号"></a-input>
        </a-form-item>
        <a-form-item label="姓名" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'xm', validatorRules.xm]" placeholder="请输入姓名"></a-input>
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
        <a-form-item label="教学班ID" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'jxbid', validatorRules.jxbid]" placeholder="请输入教学班ID" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="行政班ID" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'xzbid', validatorRules.xzbid]" placeholder="请输入行政班ID" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="课程成绩" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'kccj', validatorRules.kccj]" placeholder="请输入课程成绩" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="课程等级成绩码（依据数据字典）" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'kcdjcjm', validatorRules.kcdjcjm]" placeholder="请输入课程等级成绩码（依据数据字典）" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="申请成绩修改的原因（大文本字段ID）" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'reasontid', validatorRules.reasontid]" placeholder="请输入申请成绩修改的原因（大文本字段ID）" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="申请用户ID" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'applyuserid', validatorRules.applyuserid]" placeholder="请输入申请用户ID" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="申请时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'applytime', validatorRules.applytime]" placeholder="请输入申请时间" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="审核状态（0=待审核，1=通过，2=不通过）" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'auditstatus', validatorRules.auditstatus]" placeholder="请输入审核状态（0=待审核，1=通过，2=不通过）" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="审核人ID" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'audituserid', validatorRules.audituserid]" placeholder="请输入审核人ID" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="审核时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'audittime', validatorRules.audittime]" placeholder="请输入审核时间" style="width: 100%"/>
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
    name: "VeJwCjChangeModal",
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
          cjid: {rules: [
          ]},
          ksxsid: {rules: [
          ]},
          ksid: {rules: [
          ]},
          kcid: {rules: [
          ]},
          stuid: {rules: [
          ]},
          userid: {rules: [
          ]},
          xh: {rules: [
          ]},
          xm: {rules: [
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
          jxbid: {rules: [
          ]},
          xzbid: {rules: [
          ]},
          kccj: {rules: [
          ]},
          kcdjcjm: {rules: [
          ]},
          reasontid: {rules: [
          ]},
          applyuserid: {rules: [
            {required: true, message: '请输入申请用户ID!'},
          ]},
          applytime: {rules: [
            {required: true, message: '请输入申请时间!'},
          ]},
          auditstatus: {rules: [
          ]},
          audituserid: {rules: [
          ]},
          audittime: {rules: [
          ]},
          audittid: {rules: [
          ]},
          terminalid: {rules: [
            {required: true, message: '请输入终端ID!'},
          ]},
        },
        url: {
          add: "/kwgl/veJwCjChange/add",
          edit: "/kwgl/veJwCjChange/edit",
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
          this.form.setFieldsValue(pick(this.model,'cjid','ksxsid','ksid','kcid','stuid','userid','xh','xm','falid','specid','xzid','gradeid','semid','jxbid','xzbid','kccj','kcdjcjm','reasontid','applyuserid','applytime','auditstatus','audituserid','audittime','audittid','terminalid'))
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
        this.form.setFieldsValue(pick(row,'cjid','ksxsid','ksid','kcid','stuid','userid','xh','xm','falid','specid','xzid','gradeid','semid','jxbid','xzbid','kccj','kcdjcjm','reasontid','applyuserid','applytime','auditstatus','audituserid','audittime','audittid','terminalid'))
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