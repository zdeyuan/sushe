<template>
  <a-modal
    :title="title"
    :width="width"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    okText="确认"  cancelText="取消"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item label="供应商名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input
            :disabled="check"
            v-decorator="['name', { rules: [{ required: true, message: '请输入供应商名称' }] }]"
            placeholder="请输入供应商名称"
          ></a-input>
        </a-form-item>
        <a-form-item label="联系方式" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['tel', validatorRules.tel]" placeholder="请输入联系方式"></a-input>
        </a-form-item>
        <a-form-item label="地址" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['address', validatorRules.address]" placeholder="请输入地址"></a-input>
        </a-form-item>

        <a-form-item label="状态" :labelCol="labelCol" :wrapperCol="wrapperCol">
		  <edu-data v-model="validatorRules.status" stype="radio" code="qstatus" />
        </a-form-item>
        <a-form-item label="通知内容" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-textarea  v-decorator="['remark', validatorRules.remark]" placeholder="请输入通知内容"></a-textarea >
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
  name: 'JwJiaocaiSupplierModal',
  components: {},
  data() {
    return {
      form: this.$form.createForm(this),
      title: '操作',
      width: 800,
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
        name: { rules: [] },
        tel: { rules: [] },
        remark: { rules: [] },
        createtime: { rules: [] },
        terminalid: { rules: [] },
        status: { rules: [] },
        address: { rules: [] },
      },
      url: {
        add: '/jxzy/jwJiaocaiSupplier/add',
        edit: '/jxzy/jwJiaocaiSupplier/edit',
      },
    }
  },
  created() {},
  methods: {
    add() {
      this.edit({})
    },
    edit(record) {
      this.form.resetFields()
      this.model = Object.assign({}, record)
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue(
          pick(this.model, 'name', 'tel', 'remark', 'createtime', 'terminalid', 'status', 'address')
        )
      })
    },
    close() {
      this.$emit('close')
      this.visible = false
    },
    handleOk() {
      const that = this
      // 触发表单验证
      this.form.validateFields((err, values) => {
        if (!err) {
          that.confirmLoading = true
          let httpurl = ''
          let method = ''
          if (!this.model.id) {
            httpurl += this.url.add
            method = 'post'
          } else {
            httpurl += this.url.edit
            method = 'put'
          }
          let formData = Object.assign(this.model, values)
		  formData.status=this.validatorRules.status;
          httpAction(httpurl, formData, method)
            .then((res) => {
              if (res.success) {
                that.$message.success(res.message)
                that.$emit('ok')
                that.close()
              } else {
                that.$message.warning(res.message)
              }
            })
            .finally(() => {
              that.confirmLoading = false
            })
        }
      })
    },
    handleCancel() {
      this.close()
    },
    popupCallback(row) {
      this.form.setFieldsValue(pick(row, 'name', 'tel', 'remark', 'createtime', 'terminalid', 'status', 'address'))
    },
  },
}
</script>