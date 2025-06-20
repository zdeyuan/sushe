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
        <a-form-item label="类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-radio-group  v-decorator="['type', validatorRules.type]" v-model="type">
            <a-radio :value="1"> 监考 </a-radio>
            <a-radio :value="2"> 巡考 </a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="教师" :labelCol="labelCol" :wrapperCol="wrapperCol" >
<!--          <a-input-number-->
<!--            v-decorator="['teacherid', validatorRules.teacherid]"-->
<!--            v-model="teacherid"-->
<!--            placeholder="请输入教师ID"-->
<!--            style="width: 100%"-->
<!--          />-->
          <j-select-teacher  v-model="teacherid"  placeholder="请选择教师" ></j-select-teacher>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { httpAction } from '@/api/common/manage'
import pick from 'lodash.pick'
import { validateDuplicateValue } from '@/utils/util'
import JSelectTeacher from '@/components/kwglbiz/JSelectTeacher'

export default {
  name: 'VeJwBkJiankaoModal',
  components: { JSelectTeacher },
  data() {
    return {
      form: this.$form.createForm(this),
      title: '操作',
      bkid: null,
      type: null,
      teacherid: null,
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
        bkid: { rules: [{ required: true, message: '请输入补考考ID!' }] },
        userid: { rules: [{ required: true, message: '请输入教师的用户ID!' }] },
        teacherid: { rules: [{ required: true, message: '请输入教师ID!' }] },
        type: { rules: [{ required: true, message: '请输入参与类型（1=监考，2=巡考）!' }] },
        terminalid: { rules: [{ required: true, message: '请输入终端ID!' }] },
      },
      url: {
        setTeacher: '/kwgl/veJwBkJiankao/setTeacher',
      },
    }
  },
  created() {},
  methods: {
    edit(record) {
      this.form.resetFields()
      this.model = Object.assign({}, record)
      this.visible = true
      this.bkid = record.id
      console.log('补考id:' + bkid)
    },
    close() {
      this.$emit('close')
      this.visible = false
    },
    handleOk() {
      const that = this
      console.log(this.model)
      // 触发表单验证
      this.form.validateFields((err, values) => {
        if (!err) {
          that.confirmLoading = true
          let httpurl = this.url.setTeacher
          let method = 'put'
          httpAction(httpurl, { bkid: this.bkid, type: this.type, teacherid: this.teacherid }, method)
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