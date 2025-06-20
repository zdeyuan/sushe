<template>
  <a-spin :spinning="confirmLoading">
    <j-form-container :disabled="formDisabled">
      <a-form :form="form" slot="detail">
        <a-row>
          <!-- <a-col :span="24">
            <a-form-item label="教师id" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number v-decorator="['teacherid']" placeholder="请输入教师id" style="width: 100%" />
            </a-form-item>
          </a-col> -->
          <a-col :span="24">
            <a-form-item label="工号" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['gh', validatorRules.gh]" placeholder="请输入工号"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="姓名" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['jsxm', validatorRules.jsxm]" placeholder="请输入姓名"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="所属学期" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-dict-select-tag type="list" v-decorator="['semid', validatorRules.semid]" :trigger-change="true"
                                 dictCode="ve_base_semester,XQMC,id" placeholder="请选择所属学期" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="出勤次数" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number v-decorator="['cqcs', validatorRules.cqcs]" placeholder="请输入出勤次数" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="旷课次数" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number v-decorator="['kkcs', validatorRules.kkcs]" placeholder="请输入旷课次数" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="迟到次数" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number v-decorator="['cdcs', validatorRules.cdcs]" placeholder="请输入迟到次数" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="早退次数" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number v-decorator="['ztcs', validatorRules.ztcs]" placeholder="请输入早退次数" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="请假次数" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number v-decorator="['qjcs', validatorRules.qjcs]" placeholder="请输入请假次数" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="记勤次数" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number v-decorator="['jqcs', validatorRules.jqcs]" placeholder="请输入记勤次数" style="width: 100%" />
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

import { httpAction, getAction } from '@/api/hr/manage'
import pick from 'lodash.pick'
import { validateDuplicateValue } from '@/utils/util'

export default {
  name: 'VeHrKaoqinForm',
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
        gh: {
          rules: [
            { required: true, message: '请输入工号!' }
          ]
        },
        jsxm: {
          rules: [
            { required: true, message: '请输入教师姓名!' }
          ]
        },
        semid: {
          rules: [
            { required: true, message: '请输入学期id!' }
          ]
        },
        cqcs: {
          rules: [
            { required: true, message: '请输入出勤次数!' }
          ]
        },
        kkcs: {
          rules: [
            { required: true, message: '请输入旷课次数!' }
          ]
        },
        cdcs: {
          rules: [
            { required: true, message: '请输入迟到次数!' }
          ]
        },
        ztcs: {
          rules: [
            { required: true, message: '请输入早退次数!' }
          ]
        },
        qjcs: {
          rules: [
            { required: true, message: '请输入请假次数!' }
          ]
        },
        jqcs: {
          rules: [
            { required: true, message: '请输入记勤次数!' }
          ]
        }
      },
      url: {
        add: '/hr/kaoqin/veHrKaoqin/add',
        edit: '/hr/kaoqin/veHrKaoqin/edit',
        queryById: '/hr/kaoqin/veHrKaoqin/queryById'
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
      this.validatorRules={}
      this.form.resetFields()
      this.model = Object.assign({}, record)
      this.visible = true
      this.$nextTick(() => {
        console.log(this.model)
        this.form.setFieldsValue(pick(this.model,  'gh', 'jsxm', 'semid','cqcs', 'kkcs', 'cdcs', 'ztcs', 'qjcs', 'jqcs'))
        //  'terminalid'
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
      this.form.setFieldsValue(pick(row,  'gh', 'jsxm', 'semid', 'cqcs', 'kkcs', 'cdcs', 'ztcs', 'qjcs', 'jqcs'))
    }
  }
}
</script>