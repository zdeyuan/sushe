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

        <a-form-item label="教师名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
			{{ model.addusername }}
          <!-- <a-input :disabled="roleDisabled" v-decorator="[ 'addusername', validatorRules.addusername]" placeholder="请输入发布人姓名"></a-input> -->
        </a-form-item>
        <a-form-item label="班级" :labelCol="labelCol" :wrapperCol="wrapperCol">
			{{ model.bjmc }}
          <!-- <a-input :disabled="roleDisabled" v-decorator="[ 'bjmc', validatorRules.bjmc]" placeholder="请输入班级名称"></a-input> -->
        </a-form-item>
        <a-form-item label="标题" :labelCol="labelCol" :wrapperCol="wrapperCol">
			{{ model.title }}
          <!-- <a-input :disabled="roleDisabled" v-decorator="[ 'title', validatorRules.title]" placeholder="请输入标题"></a-input> -->
        </a-form-item>
        <a-form-item label="内容" :labelCol="labelCol" :wrapperCol="wrapperCol">
			{{ model.contenttidText }}
          <!-- <a-textarea :disabled="roleDisabled" maxLength="4000" v-decorator="[ 'contenttidText', validatorRules.contenttidText]" placeholder="请输入内容" style="width: 100%"/> -->
        </a-form-item>
<!--        <a-form-item label="审核状态" :labelCol="labelCol" :wrapperCol="wrapperCol">-->
<!--          <a-input-number v-decorator="[ 'verifystatus', validatorRules.verifystatus]" placeholder="请输入审核状态：1=通过，0=未通过" style="width: 100%"/>-->
<!--        </a-form-item>-->
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="审核状态">
          <template v-if="seen">
            <a-radio-group v-decorator="['verifystatus', validatorRules.verifystatus]" placeholder="请选择状态">

            </a-radio-group>
          </template>
          <template v-else>
            <a-radio-group v-decorator="['verifystatus', validatorRules.verifystatus]" placeholder="请选择状态">
              <a-radio :value="1">
                通过
              </a-radio>
              <a-radio :value="0">
                不通过
              </a-radio>
            </a-radio-group>
          </template>
        </a-form-item>

        <a-form-item label="审核说明" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'verifytidText', validatorRules.verifytidText]" placeholder="输入审核说明" style="width: 100%"/>
        </a-form-item>

<!--        <a-form-item label="发布日期" :labelCol="labelCol" :wrapperCol="wrapperCol">-->
<!--          <j-date placeholder="请选择发布日期" v-decorator="[ 'addtime', validatorRules.addtime]" :trigger-change="true" style="width: 100%"/>-->
<!--        </a-form-item>-->
<!--        <a-form-item label="班级ID" :labelCol="labelCol" :wrapperCol="wrapperCol">-->
<!--          <a-input-number v-decorator="[ 'bjid', validatorRules.bjid]" placeholder="请输入班级ID" style="width: 100%"/>-->
<!--        </a-form-item>-->
<!--        <a-form-item label="发布人" :labelCol="labelCol" :wrapperCol="wrapperCol">-->
<!--          <a-input-number v-decorator="[ 'adduser', validatorRules.adduser]" placeholder="请输入发布人" style="width: 100%"/>-->
<!--        </a-form-item>-->
<!--        <a-form-item label="审核人" :labelCol="labelCol" :wrapperCol="wrapperCol">-->
<!--          <a-input-number v-decorator="[ 'verifyuser', validatorRules.verifyuser]" placeholder="请输入审核人" style="width: 100%"/>-->
<!--        </a-form-item>-->
<!--        <a-form-item label="审核人姓名" :labelCol="labelCol" :wrapperCol="wrapperCol">-->
<!--          <a-input v-decorator="[ 'verifyusername', validatorRules.verifyusername]" placeholder="请输入审核人姓名"></a-input>-->
<!--        </a-form-item>-->
<!--        <a-form-item label="审核时间" :labelCol="labelCol" :wrapperCol="wrapperCol">-->
<!--          <j-date placeholder="请选择审核时间" v-decorator="[ 'verifytime', validatorRules.verifytime]" :trigger-change="true" style="width: 100%"/>-->
<!--        </a-form-item>-->
<!--        <a-form-item label="终端ID" :labelCol="labelCol" :wrapperCol="wrapperCol">-->
<!--          <a-input-number v-decorator="[ 'terminalid', validatorRules.terminalid]" placeholder="请输入终端ID" style="width: 100%"/>-->
<!--        </a-form-item>-->

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
    name: "VeJwBjggManageModal",
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
          verifystatus: {rules: [
			  {required: true, message: '请选择审核状态!'},
          ]},
          verifytidText: {rules: [
			  {required: true, message: '请输入审核说明!'},
          ]}
        },
        url: {
          add: "/jxgz/veJwBjgg/add",
          edit: "/jxgz/veJwBjgg/edit",
          audit: "/jxgz/veJwBjgg/audit",
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
		delete record.bjmc_dictText;
		delete record.verifystatus_dictText;
		delete record.verifyusername;
        this.model = Object.assign({}, record);
		
        this.visible = true;
        //编辑页面禁止修改角色编码
        if(this.model.id){
          this.roleDisabled = true;
        }else{
          this.roleDisabled = false;
        }
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'verifystatus','verifytidText'))
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
            httpurl+=this.url.audit;
             method = 'put';
            this.model.verifyuser = window.localStorage.getItem('userInfo').id;
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
        this.form.setFieldsValue(pick(row,'verifystatus','verifytidText'))
      },


    }
  }
</script>