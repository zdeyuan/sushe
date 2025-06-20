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
        <div style="background: rgb(103,194,252);color: white;padding: 10px;font-size: 18px;font-weight: bold">
          清考信息
        </div>
        <a-form-item label="课程" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <!--          <a-input-number v-decorator="[ 'kcid', validatorRules.kcid]" placeholder="请输入课程ID" style="width: 100%"/>-->
          <span>{{model.kcidDictText}}</span>
        </a-form-item>

        <a-form-item label="考试日期" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <span>{{model.ksrq}}</span>
          <!--          <j-date v-decorator="[ 'ksrq', validatorRules.ksrq]" placeholder="请输入考试日期" date-format="YYYY-MM-DD "></j-date>-->
        </a-form-item>
        <div style="background: rgb(103,194,252);color: white;padding: 10px;font-size: 18px;font-weight: bold">
          学生成绩信息
        </div>
        <a-form-item label="姓名" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <span>{{model.xm}}</span>
          <!--          <a-input v-decorator="[ 'xm', validatorRules.xm]" placeholder="请输入姓名"></a-input>-->
        </a-form-item>

        <a-form-item label="及格状态" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <span>{{model.ispass == 1?'及格':'不及格'}}</span>
        </a-form-item>
        <div style="background: rgb(103,194,252);color: white;padding: 10px;font-size: 18px;font-weight: bold">
          审核处理
        </div>
        <a-form-item label="状态" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-radio-group  v-decorator="['auditstatus', validatorRules.auditstatus]">
            <a-radio :value="1"> 通过 </a-radio>
            <a-radio :value="2"> 不通过 </a-radio>
          </a-radio-group>
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
  name: 'VeJwCjBukaoStatus',
  components: {},
  data() {
    return {
      form: this.$form.createForm(this),
      title: '审核',
      //   bkid: null,
      //   type: null,
      //   teacherid: null,
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
        auditstatus: { rules: [{ required: true, message: '请选择状态!' }] },
      },
      url: {
        edit: '/kwgl/veJwCjQingkao/audit',
      },
    }
  },
  created() {},
  methods: {
    edit(record) {
      this.form.resetFields()
      this.model = Object.assign({}, record)
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue(
          pick(
            this.model,
            'auditstatus',
          )
        )
      })
      //   this.bkid = record.id
      //   console.log('补考id:' + bkid)
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
      this.form.setFieldsValue(pick(row, 'bkid', 'userid', 'teacherid', 'type', 'terminalid'))
    },
  },
}
</script>