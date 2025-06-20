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

        <a-form-item label="学期ID" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'semid', validatorRules.semid]" placeholder="请输入学期ID" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="年级ID" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'gradeid', validatorRules.gradeid]" placeholder="请输入年级ID" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="学院ID" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'falid', validatorRules.falid]" placeholder="请输入学院ID" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="专业父Id,0为顶级，二级专业父specId" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'specpid', validatorRules.specpid]" placeholder="请输入专业父Id,0为顶级，二级专业父specId" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="专业Id" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'specid', validatorRules.specid]" placeholder="请输入专业Id" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="行政班Id" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'xzbid', validatorRules.xzbid]" placeholder="请输入行政班Id" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="课程Id" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'kcid', validatorRules.kcid]" placeholder="请输入课程Id" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="总参加考试人数" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'zrs', validatorRules.zrs]" placeholder="请输入总参加考试人数" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="及格人数" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'jgrs', validatorRules.jgrs]" placeholder="请输入及格人数" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="终端Id" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'terminalid', validatorRules.terminalid]" placeholder="请输入终端Id" style="width: 100%"/>
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
    name: "VeJwTjJigeModal",
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
          semid: {rules: [
            {required: true, message: '请输入学期ID!'},
          ]},
          gradeid: {rules: [
            {required: true, message: '请输入年级ID!'},
          ]},
          falid: {rules: [
            {required: true, message: '请输入学院ID!'},
          ]},
          specpid: {rules: [
            {required: true, message: '请输入专业父Id,0为顶级，二级专业父specId!'},
          ]},
          specid: {rules: [
            {required: true, message: '请输入专业Id!'},
          ]},
          xzbid: {rules: [
            {required: true, message: '请输入行政班Id!'},
          ]},
          kcid: {rules: [
            {required: true, message: '请输入课程Id!'},
          ]},
          zrs: {rules: [
            {required: true, message: '请输入总参加考试人数!'},
          ]},
          jgrs: {rules: [
            {required: true, message: '请输入及格人数!'},
          ]},
          terminalid: {rules: [
            {required: true, message: '请输入终端Id!'},
          ]},
        },
        url: {
          add: "/jxgz/veJwTjJige/add",
          edit: "/jxgz/veJwTjJige/edit",
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
          this.form.setFieldsValue(pick(this.model,'semid','gradeid','falid','specpid','specid','xzbid','kcid','zrs','jgrs','terminalid'))
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
        this.form.setFieldsValue(pick(row,'semid','gradeid','falid','specpid','specid','xzbid','kcid','zrs','jgrs','terminalid'))
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