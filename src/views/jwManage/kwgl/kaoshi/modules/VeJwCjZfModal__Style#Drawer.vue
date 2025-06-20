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

        <a-form-item label="学制ID" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'xzid', validatorRules.xzid]" placeholder="请输入学制ID" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="学期ID" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'semid', validatorRules.semid]" placeholder="请输入学期ID" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="学生ID" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'stuid', validatorRules.stuid]" placeholder="请输入学生ID" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="学生用户ID" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'userid', validatorRules.userid]" placeholder="请输入学生用户ID" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="（学生的）年级ID" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'gradeid', validatorRules.gradeid]" placeholder="请输入（学生的）年级ID" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="（学生的）院系ID" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'falid', validatorRules.falid]" placeholder="请输入（学生的）院系ID" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="专业的父Id" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'specpid', validatorRules.specpid]" placeholder="请输入专业的父Id" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="（学生的）专业ID" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'specid', validatorRules.specid]" placeholder="请输入（学生的）专业ID" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="行政班ID" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'xzbid', validatorRules.xzbid]" placeholder="请输入行政班ID" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="成绩类型ID（根据成绩类型表，若为0，则表示为综合成绩）" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'cjlxid', validatorRules.cjlxid]" placeholder="请输入成绩类型ID（根据成绩类型表，若为0，则表示为综合成绩）" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="总分" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'score', validatorRules.score]" placeholder="请输入总分" style="width: 100%"/>
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
    name: "VeJwCjZfModal",
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
          xzid: {rules: [
            {required: true, message: '请输入学制ID!'},
          ]},
          semid: {rules: [
            {required: true, message: '请输入学期ID!'},
          ]},
          stuid: {rules: [
            {required: true, message: '请输入学生ID!'},
          ]},
          userid: {rules: [
            {required: true, message: '请输入学生用户ID!'},
          ]},
          gradeid: {rules: [
            {required: true, message: '请输入（学生的）年级ID!'},
          ]},
          falid: {rules: [
            {required: true, message: '请输入（学生的）院系ID!'},
          ]},
          specpid: {rules: [
          ]},
          specid: {rules: [
            {required: true, message: '请输入（学生的）专业ID!'},
          ]},
          xzbid: {rules: [
            {required: true, message: '请输入行政班ID!'},
          ]},
          cjlxid: {rules: [
          ]},
          score: {rules: [
          ]},
          terminalid: {rules: [
            {required: true, message: '请输入终端ID!'},
          ]},
        },
        url: {
          add: "/kwgl/veJwCjZf/add",
          edit: "/kwgl/veJwCjZf/edit",
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
          this.form.setFieldsValue(pick(this.model,'xzid','semid','stuid','userid','gradeid','falid','specpid','specid','xzbid','cjlxid','score','terminalid'))
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
        this.form.setFieldsValue(pick(row,'xzid','semid','stuid','userid','gradeid','falid','specpid','specid','xzbid','cjlxid','score','terminalid'))
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