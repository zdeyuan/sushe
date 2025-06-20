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
        <a-form-item label="教师姓名" :labelCol="labelCol" :wrapperCol="wrapperCol">
<!--          <j-select-teacher :disabled="disableSubmit"  v-decorator="['adduser', validatorRules.teacherid]" :trigger-change="true"></j-select-teacher>-->
          <a-input :disabled="disableSubmit" v-decorator="['addusername', validatorRules.addusername]"></a-input>
        </a-form-item>

        <a-form-item label="总结类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag :disabled="disableSubmit"  dict-code="edu_dev_open.ve_jw_gzzjlx,LXMC,LXM" v-decorator="['gzzjlxid',validatorRules.gzzjlxid]"  :trigger-change="true"></j-dict-select-tag>
<!--          <a-select placeholder="请选择总结类型" v-decorator="['gzzjlxid_dictText', validatorRules.gzzjlxid]" >-->
<!--            <a-select-option value="YDZJ">月度总结</a-select-option>-->
<!--            <a-select-option value="JDZJ">季度总结</a-select-option>-->
<!--            <a-select-option value="NDZJ">年度总结</a-select-option>-->
<!--            <a-select-option value="ZZJ">周总结</a-select-option>-->
<!--          </a-select>-->

<!--          <a-input v-decorator="['gzzjlxid_dictText', validatorRules.gzzjlxid]"></a-input>-->
        </a-form-item>
        <a-form-item label="标题" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input :disabled="disableSubmit" v-decorator="['gzzjbt', validatorRules.gzzjbt]"></a-input>
        </a-form-item>
        <a-form-item label="内容" :labelCol="labelCol" :wrapperCol="wrapperCol">
           <a-textarea :disabled="disableSubmit" v-decorator="['gzzjtidText', validatorRules.gzzjtid]" style="width: 100%" />
<!--          <a-textarea :disabled="disableSubmit" style="width: 100%"  value=""/>-->
        </a-form-item>
        <a-form-item label="日志时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-date :disabled="disableSubmit" v-decorator="['gzzjrq', validatorRules.gzzjrq]" :trigger-change="true" style="width: 100%" />
        </a-form-item>

        <a-form-item label="评审人" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input :disabled="disableSubmit" v-decorator="['verifyusername', validatorRules.verifyusername]"></a-input>
        </a-form-item>

        <a-form-item label="评审时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-date
            :disabled="disableSubmit"
            v-decorator="['verifytime', validatorRules.verifytime]"
            :trigger-change="true"
            style="width: 100%"
          />
        </a-form-item>
        <a-form-item label="评审量值" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number
            :disabled="disableSubmit"
            v-decorator="['verifyresult', validatorRules.verifyresult]"
            style="width: 100%"
          />
        </a-form-item>
        <a-form-item label="评审备说明" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-textarea
            :disabled="disableSubmit"
            v-decorator="['verifytid', validatorRules.verifytid]"
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
import JSelectTeacher from '@/components/kwglbiz/JSelectTeacher'

export default {
  name: 'VeJwGzzjModal',
  disableSubmit:false,
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
        // verifyresult: { rules: [] },
        // verifytime: { rules: [] },
        // verifytid: { rules: [] },
        // terminalid: { rules: [{ required: true, message: '请输入终端ID!' }] },
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