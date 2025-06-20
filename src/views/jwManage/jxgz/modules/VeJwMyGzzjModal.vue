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
    <template slot="footer">
      <a-button key="back" @click="handleCancel">
        关闭
      </a-button>
      <a-button v-if="!disableSubmit" key="submit" type="primary" @click="handleOk">
        确定
      </a-button>
    </template>
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
<!--        <a-form-item  label="教师姓名" :labelCol="labelCol" :wrapperCol="wrapperCol">-->
<!--          <j-select-teacher :disabled="disableSubmit"  v-decorator="['adduser', validatorRules.teacherid]" :trigger-change="true"></j-select-teacher>-->
<!--          <a-input v-decorator="['addusername', validatorRules.addusername]" ></a-input>-->
<!--        </a-form-item>-->

        <a-form-item label="总结类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
<!--          <a-input v-decorator="['gzzjlxid_dictText', validatorRules.gzzjlxid]"></a-input>-->
          <j-dict-select-tag placeholder="请选择总结类型" :disabled="disableSubmit" dict-code="zjType" v-decorator="['gzzjlxid',validatorRules.gzzjlxid]"  :trigger-change="true"></j-dict-select-tag>
        </a-form-item>
        <a-form-item label="标题" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input placeholder="请输入标题" v-decorator="['gzzjbt', validatorRules.gzzjbt]"></a-input>
        </a-form-item>
        <a-form-item label="内容" :labelCol="labelCol" :wrapperCol="wrapperCol">
           <a-textarea placeholder="请输入内容" :disabled="disableSubmit" v-decorator="['gzzjtidText', validatorRules.gzzjtid]" style="width: 100%" />
<!--          <a-textarea style="width: 100%" value="" />-->
        </a-form-item>
        <a-form-item label="总结状态" placeholder="请选择总结状态"  :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-radio-group :defaultValue="0"  v-decorator="['status', validatorRules.status]">
            <a-radio :value="1">完成 </a-radio>
            <a-radio :value="0">草稿   </a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item :disabled="disableSubmit" label="日期" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-date placeholder="请选择日期" v-decorator="['gzzjrq', validatorRules.gzzjrq]" :trigger-change="true" style="width: 100%" />
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
import JSelectTeacher from '@/components/kwglbiz/JSelectTeacher'

export default {
  name: 'VeJwMyGzzjModal',
  components: {
    JSelectTeacher,
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
        gzzjlxid: { rules: [{ required: true, message: '请输入工作总结类型' }] },
        gzzjbt: { rules: [{ required: true, message: '请输入工作总结标题!' }] },
        gzzjtid: { rules: [{ required: true, message: '请输入工作总结内容!' }] },
        gzzjrq: { rules: [{ required: true, message: '请输入工作总结日期!' }] },
        status: { rules: [{ required: true, message: '请输入状态' }] },
      },
      url: {
        add: '/jxgz/veJwGzzj/add',
        edit: '/jxgz/veJwGzzj/edit',
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
          let httpurl = ''
          let method = ''
          if (!this.model.id) {
            httpurl += this.url.add
            method = 'post'
          } else {
            httpurl += this.url.edit
            method = 'put'
          }
		  var userInfo =  JSON.parse(window.localStorage.getItem('userInfo'))
          this.model.adduser = userInfo.userId;
		  this.model.jsgh= userInfo.userId;
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
          'terminalid'
        )
      )
    },
  },
}
</script>