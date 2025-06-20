<template>
  <a-spin :spinning="confirmLoading">
    <j-form-container :disabled="formDisabled">
      <a-form :form="form" slot="detail">
        <a-row>
          <a-col :span="24">
            <a-form-item label="姓名" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['xm', validatorRules.xm]" placeholder="请输入姓名"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="工号" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['gh', validatorRules.gh]" placeholder="请输入工号"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="变动类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['bdcode_dictText', validatorRules.bdcode_dictText]" placeholder="请输入变动类型"></a-input>
            </a-form-item>
          </a-col>
           <a-col :span="24">
            <a-form-item label="变动时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-date placeholder="请选择变动时间" v-decorator="['createTime']" :trigger-change="true" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="变动说明" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-textarea v-decorator="['dbdesc', validatorRules.dbdesc]" rows="4" placeholder="请输入变动说明" />
            </a-form-item>
          </a-col>
          <a-col v-if="showFlowSubmitButton" :span="24" style="text-align: center">
            <a-button @click="submitForm">提 交</a-button>
          </a-col>
        </a-row>
      </a-form>
    </j-form-container>
  </a-spin>
</template>

<script>

import { getAction, httpAction } from '@/api/hr/manage'
import pick from 'lodash.pick'

export default {
  name: 'VeHrChangeTypeForm',
  components: {},
  props: {
    //流程表单data
    formData: {
      type: Object,
      default: () => {
      },
      required: false
    },
    //表单模式：true流程表单 false普通表单
    formBpm: {
      type: Boolean,
      default: false,
      required: false
    },
    //表单禁用
    disabled: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  data() {
    return {
      form: this.$form.createForm(this),
      model: {},
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      confirmLoading: false,
      validatorRules: {
        // bdname: {
        //   rules: [
        //     { required: true, message: '请输入变动类型名称!' }
        //   ]
        // },
        bdcode: {
          rules: [
            { required: true, message: '请输入变动类型代码!' }
          ]
        }
      },
      url: {
        add: '/change/veHrChangeType/add',
        edit: '/change/veHrChangeType/edit',
        queryById: '/change/veHrChangeType/queryById'
      }
    }
  },
  computed: {
    formDisabled() {
      if (this.formBpm === true) {
        if (this.formData.disabled === false) {
          return false
        }
        return true
      }
      return this.disabled
    },
    showFlowSubmitButton() {
      if (this.formBpm === true) {
        if (this.formData.disabled === false) {
          return true
        }
      }
      return false
    }
  },
  created() {
    //如果是流程中表单，则需要加载流程表单data
    this.showFlowData()
  },
  methods: {
    add() {
      this.edit({})
    },
    edit(record) {
      this.form.resetFields()
      this.model = Object.assign({}, record)
      this.visible = true
      this.$nextTick(() => {
        console.log(this.model)
        this.form.setFieldsValue(pick(this.model,'xm','gh', 'bdcode_dictText',  'createTime','dbdesc'))
      })
    },
    //渲染流程表单数据
    showFlowData() {
      if (this.formBpm === true) {
        let params = { id: this.formData.dataId }
        getAction(this.url.queryById, params).then((res) => {
          if (res.success) {
            this.edit(res.result)
          }
        })
      }
    },
    submitForm() {
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
          httpAction(httpurl, formData, method).then((res) => {
            if (res.success) {
              that.$message.success(res.message)
              that.$emit('ok')
            } else {
              that.$message.warning(res.message)
            }
          }).finally(() => {
            that.confirmLoading = false
          })
        }

      })
    },
    popupCallback(row) {
      this.form.setFieldsValue(pick(row, 'xm','gh', 'bdcode_dictText', 'createTime','dbdesc'))
    }
  }
}
</script>