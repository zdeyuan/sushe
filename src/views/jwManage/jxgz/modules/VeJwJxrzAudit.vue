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
        <a-form-item label="教师姓名" :labelCol="labelCol" :wrapperCol="wrapperCol">
			<j-select-jiaoshi v-model="validatorRules.adduser" :trigger-change="false"></j-select-jiaoshi>
        </a-form-item>
        <a-form-item label="日志日期" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-date v-decorator="['addtime', validatorRules.addtime]" disabled="true" :trigger-change="true" style="width: 100%" />
        </a-form-item>
        <a-form-item label="标题" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['title', validatorRules.title]" disabled="true"  placeholder=""></a-input>
        </a-form-item>
        <a-form-item label="内容" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-textarea v-decorator="['rznrtidText', validatorRules.rznrtidText]" disabled="true" style="width: 100%" />
        </a-form-item>

        <!-- <a-form-item label="评审人" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'verifyuser', validatorRules.verifyuser]" placeholder="请输入评审人" style="width: 100%"/>
        </a-form-item> -->
<!--        <a-form-item label="评审人" :labelCol="labelCol" :wrapperCol="wrapperCol">-->
<!--          <a-input v-decorator="['verifyusername', validatorRules.verifyusername]"></a-input>-->
<!--        </a-form-item>-->
<!--        <a-form-item label="评审时间" :labelCol="labelCol" :wrapperCol="wrapperCol">-->
<!--          <j-date-->
<!--            placeholder="请选择评审时间"-->
<!--            v-decorator="['verifytime', validatorRules.verifytime]"-->
<!--            :trigger-change="true"-->
<!--            style="width: 100%"-->
<!--          />-->
<!--        </a-form-item>-->

        <a-form-item label="评审量值" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number
            v-decorator="['verifyresult', validatorRules.verifyresult]"
            placeholder="请输入评审分数"
            style="width: 100%"
          />
        </a-form-item>
        <a-form-item label="评审说明" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-textarea
            v-decorator="['verifytidText', validatorRules.verifytid]"
            placeholder="请输入评审备注"
            style="width: 100%"
          />
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
import JSelectJiaoshi from '@/components/kwglbiz/JSelectJiaoshi'
export default {
  name: 'VeJwJxrzAudit',
  components: {
    JDate,
	JSelectJiaoshi
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
        // addtime: { rules: [{ required: true, message: '请输入日期!' }] },
        // title: { rules: [{ required: true, message: '请输入标题!' }] },
        // rznrtid: { rules: [{ required: true, message: '请输入内容ID!' }] },
        // adduser: { rules: [{ required: true, message: '请输入记录人!' }] },
        // addusername: { rules: [] },
        // verifyuser: { rules: [] },
        // verifyusername: { rules: [] },
        // verifytime: { rules: [] },
        // verifytype: { rules: [] },
        // verifyresult: { rules: [] },
        // verifytid: { rules: [] },
        // terminalid: { rules: [{ required: true, message: '请输入终端ID!' }] },
      },
      url: {
        add: '/jxgz/veJwJxrz/add',
        edit: '/jxgz/veJwJxrz/edit',
        audit:'/jxgz/veJwJxrz/audit'
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
	  console.log("数据",record)
      this.$nextTick(() => {
        this.form.setFieldsValue(
          pick(
            this.model,
            'addtime',
            'title',
            'rznrtidText',
            'adduser',
            'addusername',
            'verifyuser',
            'verifyusername',
            'verifytime',
            'verifytype',
            'verifyresult',
            'verifytid',
            'verifytidText',
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
          httpAction(this.url.audit, formData, 'put')
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
          'addtime',
          'title',
          'rznrtidText',
          'adduser',
          'addusername',
          'verifyuser',
          'verifyusername',
          'verifytime',
          'verifytype',
          'verifyresult',
          'verifytid',
          'verifytidText',
          'terminalid'
        )
      )
    },
  },
}
</script>