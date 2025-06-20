<template>
  <a-modal
    :title="title"
    :width="width"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">

        <a-form-item label="教研组父Id" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'jyzpid', validatorRules.jyzpid]" placeholder="请输入教研组父Id" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="教研组Id" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'jyzid', validatorRules.jyzid]" placeholder="请输入教研组Id" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="老师用户id" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'teacheruserid', validatorRules.teacheruserid]" placeholder="请输入老师用户id" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="教师姓名" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'xm', validatorRules.xm]" placeholder="请输入教师姓名"></a-input>
        </a-form-item>
        <a-form-item label="理论课时" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'llks', validatorRules.llks]" placeholder="请输入理论课时" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="实践课时" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'sjks', validatorRules.sjks]" placeholder="请输入实践课时" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="其他课时" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'qtks', validatorRules.qtks]" placeholder="请输入其他课时" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="总课时" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'total', validatorRules.total]" placeholder="请输入总课时" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="课程ID" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'kcid', validatorRules.kcid]" placeholder="请输入课程ID" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="学期Id" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'semid', validatorRules.semid]" placeholder="请输入学期Id" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="学期名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'xqmc', validatorRules.xqmc]" placeholder="请输入学期名称"></a-input>
        </a-form-item>
        <a-form-item label="终端Id" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'terminalid', validatorRules.terminalid]" placeholder="请输入终端Id" style="width: 100%"/>
        </a-form-item>

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>

  import { httpAction } from '@/api/common/manage'
  import pick from 'lodash.pick'
  import { validateDuplicateValue } from '@/utils/util'

  export default {
    name: "VeJwTjKeshiModal",
    components: {
    },
    data () {
      return {
        form: this.$form.createForm(this),
        title:"操作",
        width:1000,
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
          jyzpid: {rules: [
            {required: true, message: '请输入教研组父Id!'},
          ]},
          jyzid: {rules: [
            {required: true, message: '请输入教研组Id!'},
          ]},
          teacheruserid: {rules: [
            {required: true, message: '请输入老师用户id!'},
          ]},
          xm: {rules: [
            {required: true, message: '请输入教师姓名!'},
          ]},
          llks: {rules: [
            {required: true, message: '请输入理论课时!'},
          ]},
          sjks: {rules: [
            {required: true, message: '请输入实践课时!'},
          ]},
          qtks: {rules: [
          ]},
          total: {rules: [
            {required: true, message: '请输入总课时!'},
          ]},
          kcid: {rules: [
            {required: true, message: '请输入课程ID!'},
          ]},
          semid: {rules: [
            {required: true, message: '请输入学期Id!'},
          ]},
          xqmc: {rules: [
            {required: true, message: '请输入学期名称!'},
          ]},
          terminalid: {rules: [
            {required: true, message: '请输入终端Id!'},
          ]},
        },
        url: {
          add: "/jxgz/veJwTjKeshi/add",
          edit: "/jxgz/veJwTjKeshi/edit",
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
          this.form.setFieldsValue(pick(this.model,'jyzpid','jyzid','teacheruserid','xm','llks','sjks','qtks','total','kcid','semid','xqmc','terminalid'))
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
        this.form.setFieldsValue(pick(row,'jyzpid','jyzid','teacheruserid','xm','llks','sjks','qtks','total','kcid','semid','xqmc','terminalid'))
      },


    }
  }
</script>