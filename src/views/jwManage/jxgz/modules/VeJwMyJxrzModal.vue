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

        <a-form-item label="标题" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['title', validatorRules.title]" placeholder="请输入标题" :disabled="disableSubmit"></a-input>
        </a-form-item>
        <a-form-item label="内容" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-textarea v-decorator="['rznrtidText', validatorRules.rznrtidText]" :disabled="disableSubmit" style="width: 100%" />
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
import moment from 'moment'
export default {
  name: 'VeJwMyJxrzModal',
  components: {
    JDate,
  },
  data() {
    return {
      form: this.$form.createForm(this),
      title: '操作',
      width: 800,
	  disableSubmit:false,
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
        rznrtidText: { rules: [{ required: true, message: '请输入内容!' }] }
      },
      url: {
        add: '/jxgz/veJwJxrz/add',
        edit: '/jxgz/veJwJxrz/edit',
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
	  let userInfo=JSON.parse(window.sessionStorage.getItem('userInfo'));
	  this.model.adduser = userInfo.userId;
	  this.model.title=`【${moment(new Date()).format('YYYY-MM-DD')}】${userInfo.realName}的教学日志`;
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue(
          pick(
            this.model,
			'title',
            'rznrtidText',
            
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
          'addtime',
          'title',
          'rznrtid',
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