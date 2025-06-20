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

        <a-form-item label="考试名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'name', validatorRules.name]" placeholder="请输入职业资格考试名称"></a-input>
        </a-form-item>
        <!--<a-form-item label="证书" :labelCol="labelCol" :wrapperCol="wrapperCol">-->
        <!--<a-input-number v-decorator="[ 'ishascert', validatorRules.ishascert]" placeholder="请输入是否有证书（0=无证书，1=有证书）" style="width: 100%"/>-->
        <!--</a-form-item>-->

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="证书">
          <template v-if="seen">
            <a-radio-group v-decorator="['ishascert', validatorRules.ishascert]" placeholder="请选择是否有证书">
              <!--<a-radio value="1">-->
              <!--公司-->
              <!--</a-radio>-->
            </a-radio-group>
          </template>
          <template v-else>
            <a-radio-group v-decorator="['ishascert', validatorRules.ishascert]" placeholder="请选择是否有证书">
              <a-radio value="0">
                无证书
              </a-radio>
              <a-radio value="1">
                有证书
              </a-radio>
            </a-radio-group>
          </template>
        </a-form-item>

        <a-form-item label="证书名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'zsmc', validatorRules.zsmc]" placeholder="请输入证书名称"></a-input>
        </a-form-item>
        <!--<a-form-item label="职业认证等级" :labelCol="labelCol" :wrapperCol="wrapperCol">-->
        <!--<a-input-number v-decorator="[ 'zyrzdj', validatorRules.zyrzdj]" placeholder="请输入职业认证等级：数据字典ID" style="width: 100%"/>-->
        <!--</a-form-item>-->
        <a-form-item label="职业认证等级" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag :disabled="check" v-decorator="[  'zyrzdj', validatorRules.zyrzdj]" placeholder="请选择职业认证等级"
                             dictCode="zyrzdj" :trigger-change="true" ></j-dict-select-tag>
        </a-form-item>

        <a-form-item label="颁证单位" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'bzdw', validatorRules.bzdw]" placeholder="请输入颁证单位"></a-input>
        </a-form-item>
        <!--<a-form-item label="职业考试介绍" :labelCol="labelCol" :wrapperCol="wrapperCol">-->
          <!--<a-input-number v-decorator="[ 'desctid', validatorRules.desctid]" placeholder="请输入职业考试介绍" style="width: 100%"/>-->
        <!--</a-form-item>-->
        <a-form-item label="职业考试介绍" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'desct', validatorRules.desct]" placeholder="请输入职业考试介绍"></a-input>
        </a-form-item>
        <!--<a-form-item label="职业考试介绍" :labelCol="labelCol" :wrapperCol="wrapperCol">-->
        <!--<a-input v-decorator="[ 'zsmc', validatorRules.zsmc]" placeholder="请输入职业考试介绍"></a-input>-->
        <!--</a-form-item>-->
        <!--<a-form-item label="状态" :labelCol="labelCol" :wrapperCol="wrapperCol">-->
        <!--<a-input-number v-decorator="[ 'status', validatorRules.status]" placeholder="请输入状态（0=禁用，1=启用）" style="width: 100%"/>-->
        <!--</a-form-item>-->
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="状态">
          <template v-if="seen">
            <a-radio-group v-decorator="['status', validatorRules.status]" placeholder="请选择状态">

            </a-radio-group>
          </template>
          <template v-else>
            <a-radio-group v-decorator="['status', validatorRules.status]" placeholder="请选择状态">
              <a-radio value="0">
                禁用
              </a-radio>
              <a-radio value="1">
                启用
              </a-radio>
            </a-radio-group>
          </template>
        </a-form-item>

        <!--<a-form-item label="创建时间" :labelCol="labelCol" :wrapperCol="wrapperCol">-->
        <!--<a-input-number v-decorator="[ 'createtime', validatorRules.createtime]" placeholder="请输入创建时间" style="width: 100%"/>-->
        <!--</a-form-item>-->
        <!--<a-form-item label="创建人ID" :labelCol="labelCol" :wrapperCol="wrapperCol">-->
        <!--<a-input-number v-decorator="[ 'createuserid', validatorRules.createuserid]" placeholder="请输入创建人ID" style="width: 100%"/>-->
        <!--</a-form-item>-->
        <!--<a-form-item label="审核状态（0=待审核，1=通过，2=不通过）" :labelCol="labelCol" :wrapperCol="wrapperCol">-->
        <!--<a-input-number v-decorator="[ 'auditstatus', validatorRules.auditstatus]" placeholder="请输入审核状态（0=待审核，1=通过，2=不通过）" style="width: 100%"/>-->
        <!--</a-form-item>-->
        <!--<a-form-item label="审核用户ID" :labelCol="labelCol" :wrapperCol="wrapperCol">-->
        <!--<a-input-number v-decorator="[ 'audituserid', validatorRules.audituserid]" placeholder="请输入审核用户ID" style="width: 100%"/>-->
        <!--</a-form-item>-->
        <!--<a-form-item label="审核时间" :labelCol="labelCol" :wrapperCol="wrapperCol">-->
        <!--<a-input-number v-decorator="[ 'audittime', validatorRules.audittime]" placeholder="请输入审核时间" style="width: 100%"/>-->
        <!--</a-form-item>-->
        <!--<a-form-item label="审核不通过的原因 文本ID" :labelCol="labelCol" :wrapperCol="wrapperCol">-->
        <!--<a-input-number v-decorator="[ 'audittid', validatorRules.audittid]" placeholder="请输入审核不通过的原因 文本ID" style="width: 100%"/>-->
        <!--</a-form-item>-->
        <!--<a-form-item label="文本" :labelCol="labelCol" :wrapperCol="wrapperCol">-->
          <!--<a-input v-decorator="[ 'desct', validatorRules.desct]" placeholder="请输入文本"></a-input>-->
        <!--</a-form-item>-->

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>

  import { httpAction } from '@/api/common/manage'
  import pick from 'lodash.pick'
  import { validateDuplicateValue } from '@/utils/util'

  export default {
    name: "VeJwKsZhiyeModal",
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
            {required: true, message: '请输入职业资格考试名称!'},
          ]},
          ishascert: {rules: [
			  {required: true, message: '选择证书状态'},
          ]},
          zsmc: {rules: [
          ]},
          zyrzdj: {rules: [
			  {required: true, message: '请选择等级'},
          ]},
          bzdw: {rules: [
          ]},
          desctid: {rules: [
          ]},
          status: {rules: [
			  {required: true, message: '请选择状态'},
          ]},
          createtime: {rules: [
            {required: true, message: '请输入创建时间!'},
          ]},
          createuserid: {rules: [
            {required: true, message: '请输入创建人ID!'},
          ]},
          auditstatus: {rules: [
          ]},
          audituserid: {rules: [
          ]},
          audittime: {rules: [
          ]},
          audittid: {rules: [
          ]},
          desct: {rules: [
          ]},
        },
        url: {
          add: "/edu-schedule/jingsaiProject/veJwKsZhiye/add",
          edit: "/edu-schedule/jingsaiProject/veJwKsZhiye/edit",
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
        if(record.status != null){
          record.status = ""+record.status;
        }
        if(record.ishascert != null){
          record.ishascert = ""+record.ishascert;
        }
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'name','ishascert','zsmc','zyrzdj','bzdw','desctid','status','createtime','createuserid','auditstatus','audituserid','audittime','audittid','desct'))
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
        this.form.setFieldsValue(pick(row,'name','ishascert','zsmc','zyrzdj','bzdw','desctid','status','createtime','createuserid','auditstatus','audituserid','audittime','audittid','desct'))
      },


    }
  }
</script>