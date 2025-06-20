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

        <a-form-item label="年级ID" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'gradeid', validatorRules.gradeid]" placeholder="请输入年级ID" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="学期ID" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'semid', validatorRules.semid]" placeholder="请输入学期ID" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="描述" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'description', validatorRules.description]" placeholder="请输入描述"></a-input>
        </a-form-item>
        <a-form-item label="是否毕业" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'isGraduate', validatorRules.isGraduate]" placeholder="请输入是否毕业" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="是否有效" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'isAble', validatorRules.isAble]" placeholder="请输入是否有效" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="状态（备用）" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'status', validatorRules.status]" placeholder="请输入状态（备用）" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="是否删除（1=已删除，0=未删除）" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'delFlag', validatorRules.delFlag]" placeholder="请输入是否删除（1=已删除，0=未删除）" style="width: 100%"/>
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
    name: "VeJwPyfaModal",
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
          gradeid: {rules: [
          ]},
          semid: {rules: [
          ]},
          description: {rules: [
          ]},
          isGraduate: {rules: [
          ]},
          isAble: {rules: [
          ]},
          status: {rules: [
          ]},
          delFlag: {rules: [
          ]},
        },
        url: {
          add: "/jxgz/veJwPyfa/add",
          edit: "/jxgz/veJwPyfa/edit",
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
          this.form.setFieldsValue(pick(this.model,'gradeid','semid','description','isGraduate','isAble','status','delFlag'))
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
        this.form.setFieldsValue(pick(row,'gradeid','semid','description','isGraduate','isAble','status','delFlag'))
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