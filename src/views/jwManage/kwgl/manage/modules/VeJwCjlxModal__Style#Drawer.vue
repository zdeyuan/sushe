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

        <a-form-item label="类型名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'name', validatorRules.name]" placeholder="请输入类型名称"></a-input>
        </a-form-item>
        <a-form-item label="状态（1=启用，0=禁用）" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'status', validatorRules.status]" placeholder="请输入状态（1=启用，0=禁用）" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="是否计入统计 0：不统计  1：统计" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'istongji', validatorRules.istongji]" placeholder="请输入是否计入统计 0：不统计  1：统计" style="width: 100%"/>
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
    name: "VeJwCjlxModal",
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
            {required: true, message: '请输入类型名称!'},
          ]},
          status: {rules: [
            {required: true, message: '请输入状态（1=启用，0=禁用）!'},
          ]},
          istongji: {rules: [
            {required: true, message: '请输入是否计入统计 0：不统计  1：统计!'},
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
        },
        url: {
          add: "/kwgl/veJwCjlx/add",
          edit: "/kwgl/veJwCjlx/edit",
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
          this.form.setFieldsValue(pick(this.model,'name','status','istongji','createuserid','createtime','terminalid'))
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
        this.form.setFieldsValue(pick(row,'name','status','istongji','createuserid','createtime','terminalid'))
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