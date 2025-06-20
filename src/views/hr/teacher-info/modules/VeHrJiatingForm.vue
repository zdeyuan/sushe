<template>
  <a-spin :spinning="confirmLoading">
    <j-form-container :disabled="formDisabled">
      <a-form :form="form" slot="detail">
        <a-row>
          <!-- <a-col :span="24">
            <a-form-item label="教师id" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number v-decorator="['teacherid', validatorRules.teacherid]" placeholder="请输入教师id"
                              style="width: 100%" />
            </a-form-item>
          </a-col> -->
          <a-col :span="24">
            <a-form-item label="工号" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['gh', validatorRules.gh]" placeholder="请输入工号" :disabled="disabledKeys.indexOf('gh')>-1"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="姓名" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['xm', validatorRules.xm]" placeholder="请输入姓名" :disabled="disabledKeys.indexOf('xm')>-1"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="家庭住址" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['jtzz', validatorRules.jtzz]" placeholder="请输入家庭住址"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="家庭邮政编码" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['jtyzbm', validatorRules.jtyzbm]" placeholder="请输入家庭邮政编码"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="家庭电话" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['jtdh', validatorRules.jtdh]" placeholder="请输入家庭电话"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="家庭联系人" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['jtlxr', validatorRules.jtlxr]" placeholder="请输入家庭联系人"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="家庭人口" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number v-decorator="['jtrk', validatorRules.jtrk]" placeholder="请输入家庭人口" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="家庭主要收入来源" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['jtzysrly', validatorRules.jtzysrly]" placeholder="请输入家庭主要收入来源"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="家庭月收入金额 " :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['jtysrje', validatorRules.jtysrje]" placeholder="请输入家庭月收入金额 "></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="家庭年收入金额" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['jtnsrje', validatorRules.jtnsrje]" placeholder="请输入家庭年收入金额"></a-input>
            </a-form-item>
          </a-col>
          <!-- <a-col :span="24">
            <a-form-item label="系统ID" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number v-decorator="['terminalid', validatorRules.terminalid]" placeholder="请输入系统ID"
                              style="width: 100%" />
            </a-form-item>
          </a-col> -->
          <a-col v-if="showFlowSubmitButton" :span="24" style="text-align: center">
            <a-button @click="submitForm">提 交</a-button>
          </a-col>
        </a-row>
      </a-form>
    </j-form-container>
  </a-spin>
</template>

<script>

import { httpAction, getAction } from '@/api/hr/manage'
import pick from 'lodash.pick'
import { validateDuplicateValue } from '@/utils/util'

export default {
  name: 'VeHrJiatingForm',
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
      disabledKeys:[],
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
        teacherid: {
          rules: [
            { required: true, message: '请输入教师id!' }
          ]
        },
        // gh: {
        //   rules: [
        //     { required: true, message: '请输入工号!' }
        //   ]
        // },
        // xm: {
        //   rules: [
        //     { required: true, message: '请输入姓名!' }
        //   ]
        // },
        jtzz: {
          rules: [
            { required: true, message: '请输入家庭住址!' }
          ]
        },
        jtyzbm: {
          rules: [
            { required: true, message: '请输入家庭邮政编码!' }
          ]
        },
        jtdh: {
          rules: [
            { required: true, message: '请输入家庭电话!' }
          ]
        },
        jtlxr: {
          rules: [
            { required: true, message: '请输入家庭联系人!' }
          ]
        },
        jtrk: {
          rules: [
            { required: true, message: '请输入家庭人口!' }
          ]
        },
        jtzysrly: {
          rules: [
            { required: true, message: '请输入家庭主要收入来源!' }
          ]
        },
        jtysrje: {
          rules: [
            { required: true, message: '请输入家庭月收入金额 !' }
          ]
        },
        jtnsrje: {
          rules: [
            { required: true, message: '请输入家庭年收入金额!' }
          ]
        },
        terminalid: {
          rules: [
            { required: true, message: '请输入系统ID!' }
          ]
        }
      },
      url: {
        add: '/hr/base/veHrJiating/add',
        edit: '/hr/base/veHrJiating/edit',
        queryById: '/hr/base/veHrJiating/queryById'
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
    edit(record,extra) {
      if(extra.disabledKeys){
        this.disabledKeys=extra.disabledKeys
      }else{
        this.disabledKeys=[]
      }
      this.form.resetFields()
      this.model = Object.assign({}, record)
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(this.model, 'gh', 'xm', 'jtzz', 'jtyzbm', 'jtdh', 'jtlxr', 'jtrk', 'jtzysrly', 'jtysrje', 'jtnsrje'))
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
      this.form.setFieldsValue(pick(row,  'gh', 'xm', 'jtzz', 'jtyzbm', 'jtdh', 'jtlxr', 'jtrk', 'jtzysrly', 'jtysrje', 'jtnsrje'))
    }
  }
}
</script>