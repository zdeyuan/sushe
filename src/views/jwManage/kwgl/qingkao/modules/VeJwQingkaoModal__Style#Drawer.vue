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

        <a-form-item label="清考名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'name', validatorRules.name]" placeholder="请输入清考名称"></a-input>
        </a-form-item>
        <a-form-item label="课程ID" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'kcid', validatorRules.kcid]" placeholder="请输入课程ID" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="考试方式码" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'ksfsm', validatorRules.ksfsm]" placeholder="请输入考试方式码"></a-input>
        </a-form-item>
        <a-form-item label="考试性质码" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'ksxzm', validatorRules.ksxzm]" placeholder="请输入考试性质码"></a-input>
        </a-form-item>
        <a-form-item label="考试形式" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'ksxsm', validatorRules.ksxsm]" placeholder="请输入考试形式"></a-input>
        </a-form-item>
        <a-form-item label="考试日期时间（原日期时间合并）" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'ksrqsj', validatorRules.ksrqsj]" placeholder="请输入考试日期时间（原日期时间合并）"></a-input>
        </a-form-item>
        <a-form-item label="考试日期" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'ksrq', validatorRules.ksrq]" placeholder="请输入考试日期"></a-input>
        </a-form-item>
        <a-form-item label="考试时间段ID" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'kssjdid', validatorRules.kssjdid]" placeholder="请输入考试时间段ID" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="校区ID" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'campusid', validatorRules.campusid]" placeholder="请输入校区ID" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="建筑物（教学楼）Id" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'jzid', validatorRules.jzid]" placeholder="请输入建筑物（教学楼）Id" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="考试教室ID" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'jsid', validatorRules.jsid]" placeholder="请输入考试教室ID" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="考试人数" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'number', validatorRules.number]" placeholder="请输入考试人数" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="发布状态（1=已发布，0=未发布）" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'ispublish', validatorRules.ispublish]" placeholder="请输入发布状态（1=已发布，0=未发布）" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="状态（1=启用，0=禁用）" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'status', validatorRules.status]" placeholder="请输入状态（1=启用，0=禁用）" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="创建人ID" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'createuserid', validatorRules.createuserid]" placeholder="请输入创建人ID" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="创建时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'createtime', validatorRules.createtime]" placeholder="请输入创建时间" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="终端ID" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'terminalid', validatorRules.terminalid]" placeholder="请输入终端ID" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="课程名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'kcmc', validatorRules.kcmc]" placeholder="请输入课程名称"></a-input>
        </a-form-item>
        <a-form-item label="清考成绩录入状态（1=已录入，2=已提交）" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'cjstatus', validatorRules.cjstatus]" placeholder="请输入清考成绩录入状态（1=已录入，2=已提交）" style="width: 100%"/>
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
    name: "VeJwQingkaoModal",
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
            {required: true, message: '请输入清考名称!'},
          ]},
          kcid: {rules: [
            {required: true, message: '请输入课程ID!'},
          ]},
          ksfsm: {rules: [
          ]},
          ksxzm: {rules: [
          ]},
          ksxsm: {rules: [
          ]},
          ksrqsj: {rules: [
          ]},
          ksrq: {rules: [
          ]},
          kssjdid: {rules: [
            {required: true, message: '请输入考试时间段ID!'},
          ]},
          campusid: {rules: [
            {required: true, message: '请输入校区ID!'},
          ]},
          jzid: {rules: [
            {required: true, message: '请输入建筑物（教学楼）Id!'},
          ]},
          jsid: {rules: [
            {required: true, message: '请输入考试教室ID!'},
          ]},
          number: {rules: [
            {required: true, message: '请输入考试人数!'},
          ]},
          ispublish: {rules: [
          ]},
          status: {rules: [
            {required: true, message: '请输入状态（1=启用，0=禁用）!'},
          ]},
          createuserid: {rules: [
            {required: true, message: '请输入创建人ID!'},
          ]},
          createtime: {rules: [
            {required: true, message: '请输入创建时间!'},
          ]},
          terminalid: {rules: [
            {required: true, message: '请输入终端ID!'},
          ]},
          kcmc: {rules: [
          ]},
          cjstatus: {rules: [
          ]},
        },
        url: {
          add: "/kwgl/veJwQingkao/add",
          edit: "/kwgl/veJwQingkao/edit",
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
          this.form.setFieldsValue(pick(this.model,'name','kcid','ksfsm','ksxzm','ksxsm','ksrqsj','ksrq','kssjdid','campusid','jzid','jsid','number','ispublish','status','createuserid','createtime','terminalid','kcmc','cjstatus'))
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
        this.form.setFieldsValue(pick(row,'name','kcid','ksfsm','ksxzm','ksxsm','ksrqsj','ksrq','kssjdid','campusid','jzid','jsid','number','ispublish','status','createuserid','createtime','terminalid','kcmc','cjstatus'))
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