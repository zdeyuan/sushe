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
        <a-form-item label="年级" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <!-- <a-input-number
            v-decorator="['gradeid', validatorRules.gradeid]"
            placeholder="请输入年级ID"
            style="width: 100%"
          /> -->
          <j-select-grade v-decorator="['gradeid', validatorRules.gradeid]" :triggerChange="true"> </j-select-grade>
        </a-form-item>
        <a-form-item label="学期" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <!-- <a-input-number
            v-decorator="['semid', validatorRules.semid]"
            placeholder="请输入学期ID"
            style="width: 100%"
          /> -->
          <j-select-xueqi v-decorator="['semid', validatorRules.semid]" :triggerChange="true"></j-select-xueqi>
        </a-form-item>
        <a-form-item label="描述" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-textarea v-decorator="['description', validatorRules.description]" placeholder="请输入描述"></a-textarea>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { httpAction } from '@/api/common/manage'
import pick from 'lodash.pick'
import { validateDuplicateValue } from '@/utils/util'
import JSelectGrade from '@/components/kwglbiz/JSelectGrade'
import JSelectXueqi from '@/components/kwglbiz/JSelectXueqi'

export default {
  name: 'VeJwPyfaExcelModal',
  components: { JSelectGrade, JSelectXueqi },
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
        gradeid: { rules: [{ required: true, message: '请选择年级' }] },
        semid: { rules: [{ required: true, message: '请选择学期!' }] },
        description: { rules: [] },
        isGraduate: { rules: [] },
        isAble: { rules: [] },
        status: { rules: [] },
        delFlag: { rules: [] },
      },
      url: {
        add: '/jxgz/veJwPyfa/add',
        edit: '/jxgz/veJwPyfa/edit',
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
          pick(this.model, 'gradeid', 'semid', 'description', 'isGraduate', 'isAble', 'status', 'delFlag')
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
          console.log('表单提交数据', formData)
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
      this.form.setFieldsValue(
        pick(row, 'gradeid', 'semid', 'description', 'isGraduate', 'isAble', 'status', 'delFlag')
      )
    },
  },
}
</script>