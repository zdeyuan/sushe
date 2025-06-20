<template>
  <a-modal
    :title="title"
    :width="width"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item label="教师姓名" :labelCol="labelCol" :wrapperCol="wrapperCol" disabled="true">
          <a-input disabled="true" v-decorator="['addusername', validatorRules.addusername]"></a-input>
        </a-form-item>

        <a-form-item label="总结类型" :labelCol="labelCol" :wrapperCol="wrapperCol" disabled="true">
          <a-input disabled="true" v-decorator="['gzzjlxid_dictText', validatorRules.gzzjlxid]"></a-input>
        </a-form-item>
        <a-form-item label="标题" :labelCol="labelCol" :wrapperCol="wrapperCol" disabled="true">
          <a-input disabled="true" v-decorator="['gzzjbt', validatorRules.gzzjbt]"></a-input>
        </a-form-item>
        <a-form-item label="内容" :labelCol="labelCol" :wrapperCol="wrapperCol" disabled="true">
           <a-textarea disabled="true" v-decorator="['gzzjtidText', validatorRules.gzzjtid]" style="width: 100%" />
<!--          <a-textarea style="width: 100%" value="测试内容" />-->
        </a-form-item>
        <a-form-item label="总结日期" :labelCol="labelCol" :wrapperCol="wrapperCol" disabled="true">
          <j-date disabled="true" v-decorator="['gzzjrq', validatorRules.gzzjrq]" :trigger-change="true" style="width: 100%" />
        </a-form-item>

<!--        <a-form-item label="评审人" :labelCol="labelCol" :wrapperCol="wrapperCol">-->
<!--          <a-input v-decorator="['verifyusername', validatorRules.verifyusername]"></a-input>-->
<!--        </a-form-item>-->
        <a-form-item label="评审量值（1-10分）" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="['verifyresult', validatorRules.verifyresult]" min="0" max="10" style="width: 100%" />
        </a-form-item>
        <a-form-item label="评审备说明" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-textarea v-decorator="['verifytid', validatorRules.verifytid]" style="width: 100%" />
        </a-form-item>
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
  name: 'VeJwGzzjAudit',
  components: {
    JDate,
  },
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
        // adduser: { rules: [{ required: true, message: '请输入记录人（教师）ID!' }] },
        // addusername: { rules: [] },
        // jsgh: { rules: [{ required: true, message: '请输入教师工号!' }] },
        // gzzjlxid: { rules: [{ required: true, message: '请输入工作总结类型code!' }] },
        // gzzjbt: { rules: [{ required: true, message: '请输入工作总结标题!' }] },
        // gzzjtid: { rules: [{ required: true, message: '请输入工作总结内容（大文本字段ID）!' }] },
        // gzzjrq: { rules: [{ required: true, message: '请输入工作总结日期（时间）!' }] },
        // status: { rules: [{ required: true, message: '请输入状态：1=完成，0=草稿!' }] },
        // verifyuser: { rules: [] },
        // verifyusername: { rules: [] },
        verifyresult: { rules: [{ required: true, message: '请进行评分!' }] },
        // verifytime: { rules: [] },
        verifytid: { rules: [] },
        // terminalid: { rules: [{ required: true, message: '请输入终端ID!' }] },
      },
      url: {
        add: '/jxgz/veJwGzzj/add',
        edit: '/jxgz/veJwGzzj/edit',
        audit: '/jxgz/veJwGzzj/audit/',
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
          pick(
            this.model,
            'adduser',
            'addusername',
            'jsgh',
            'gzzjlxid',
            'gzzjlxid_dictText',
            'gzzjbt',
            'gzzjtid',
            'gzzjtidText',
            'gzzjrq',
            'status',
            'verifyuser',
            'verifyusername',
            'verifyresult',
            'verifytime',
            'verifytid',
            'isAudited',
            'terminalid'
          )
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
          this.model.verifyuser = window.localStorage.getItem('userId');
          let formData = Object.assign(this.model, values)
          console.log('表单提交数据', formData)
          httpAction(that.url.audit, formData, 'put')
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
      this.form.setFieldsValue(
        pick(
          row,
          'adduser',
          'addusername',
          'jsgh',
          'gzzjlxid',
          'gzzjbt',
          'gzzjtid',
          'gzzjtidText',
          'gzzjrq',
          'status',
          'verifyuser',
          'verifyusername',
          'verifyresult',
          'verifytime',
          'verifytid',
          'isAudited',
          'terminalid'
        )
      )
    },
  },
}
</script>