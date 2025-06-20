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

        <a-form-item label="日期" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-date placeholder="请选择日期" v-decorator="[ 'addtime', validatorRules.addtime]" :trigger-change="true" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="标题" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'title', validatorRules.title]" placeholder="请输入标题"></a-input>
        </a-form-item>
        <a-form-item label="内容ID" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'rznrtid', validatorRules.rznrtid]" placeholder="请输入内容ID" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="记录人" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'adduser', validatorRules.adduser]" placeholder="请输入记录人" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="日志人姓名" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'addusername', validatorRules.addusername]" placeholder="请输入日志人姓名"></a-input>
        </a-form-item>
        <a-form-item label="评审人" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'verifyuser', validatorRules.verifyuser]" placeholder="请输入评审人" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="审核人姓名" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'verifyusername', validatorRules.verifyusername]" placeholder="请输入审核人姓名"></a-input>
        </a-form-item>
        <a-form-item label="评审时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-date placeholder="请选择评审时间" v-decorator="[ 'verifytime', validatorRules.verifytime]" :trigger-change="true" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="0:未评审   1:已评审" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'verifytype', validatorRules.verifytype]" placeholder="请输入0:未评审   1:已评审" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="评审分数" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'verifyresult', validatorRules.verifyresult]" placeholder="请输入评审分数" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="评审备注" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'verifytid', validatorRules.verifytid]" placeholder="请输入评审备注" style="width: 100%"/>
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
  import JDate from '@/components/edu/JDate'

  export default {
    name: "VeJwJxrzModal",
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
          addtime: {rules: [
            {required: true, message: '请输入日期!'},
          ]},
          title: {rules: [
            {required: true, message: '请输入标题!'},
          ]},
          rznrtid: {rules: [
            {required: true, message: '请输入内容ID!'},
          ]},
          adduser: {rules: [
            {required: true, message: '请输入记录人!'},
          ]},
          addusername: {rules: [
          ]},
          verifyuser: {rules: [
          ]},
          verifyusername: {rules: [
          ]},
          verifytime: {rules: [
          ]},
          verifytype: {rules: [
          ]},
          verifyresult: {rules: [
          ]},
          verifytid: {rules: [
          ]},
          terminalid: {rules: [
            {required: true, message: '请输入终端ID!'},
          ]},
        },
        url: {
          add: "/jxgz/veJwJxrz/add",
          edit: "/jxgz/veJwJxrz/edit",
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
          this.form.setFieldsValue(pick(this.model,'addtime','title','rznrtid','adduser','addusername','verifyuser','verifyusername','verifytime','verifytype','verifyresult','verifytid','terminalid'))
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
        this.form.setFieldsValue(pick(row,'addtime','title','rznrtid','adduser','addusername','verifyuser','verifyusername','verifytime','verifytype','verifyresult','verifytid','terminalid'))
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