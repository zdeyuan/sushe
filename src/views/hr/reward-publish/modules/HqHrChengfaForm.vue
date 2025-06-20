<template>
  <a-spin :spinning="confirmLoading">
    <j-form-container :disabled="formDisabled">
      <a-form :form="form" slot="detail">
        <a-row>
          <a-col :span="12">
            <a-form-item label="工号" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['gh', validatorRules.gh]" placeholder="请输入工号" :disabled="disabledKeys.indexOf('gh')>-1"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="姓名" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['xm', validatorRules.xm]" placeholder="请输入姓名" :disabled="disabledKeys.indexOf('xm')>-1"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="惩处名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-dict-select-tag type="list" v-decorator="['ccmcm',validatorRules.ccmcm]" :trigger-change="true"
                                 dictCode="ve_hr_jiangli_type,jlName,jlCode,jlType='2'" placeholder="请选择惩处名称" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="纪律处分" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-dict-select-tag type="list" v-decorator="['jlcfm', validatorRules.jlcfm]" :trigger-change="true"
                                 dictCode="ve_dict_dictdata,title,code,modelCode='JLCF'" placeholder="请选择纪律处分码" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="惩处原因" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-textarea v-decorator="['ccyy', validatorRules.ccyy]" rows="4" placeholder="请输入惩处原因"></a-textarea>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="惩处内容" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-textarea v-decorator="['ccnr', validatorRules.ccnr]" rows="4" placeholder="请输入惩处内容" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="惩处文号" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['ccwh', validatorRules.ccwh]" placeholder="请输入惩处文号"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="惩处日期" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-date placeholder="请选择惩处日期" v-decorator="['ccrq',validatorRules.ccrq]" :trigger-change="true" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="惩处单位" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['ccdw', validatorRules.ccdw]" placeholder="请输入惩处单位" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="撤销日期" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-date placeholder="请选择撤销日期" v-decorator="['cccxrq']" :trigger-change="true" style=" width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="撤消文号" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['cccxwh']" placeholder="请输入撤消文号"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="撤消原因" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-textarea v-decorator="['cccxyy']" rows="4" placeholder="请输入撤消原因" />
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
  name: 'HqHrChengfaForm',
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
        ccmcm: {
          rules: [
            { required: true, message: '请输入惩处名称!' }
          ]
        },
        jlcfm: {
          rules: [
            { required: true, message: '请输入纪律处分码!' }
          ]
        },
        ccyy: {
          rules: [
            { required: true, message: '请输入惩处原因!' }
          ]
        },
        ccnr: {
          rules: [
            { required: true, message: '请输入惩处内容!' }
          ]
        },
        ccwh: {
          rules: [
            { required: true, message: '请输入惩处文号!' }
          ]
        },
        ccrq: {
          rules: [
            { required: true, message: '请选择惩处日期!' }
          ]
        },
        ccdw: {
          rules: [
            { required: true, message: '请输入惩处单位!' }
          ]
        }
      },
      url: {
        add: '/hr/rewardpublish/hqHrChengfa/add',
        edit: '/hr/rewardpublish/hqHrChengfa/edit',
        queryById: '/hr/rewardpublish/hqHrChengfa/queryById'
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
        this.form.setFieldsValue(pick(this.model, 'gh', 'xm',  'ccmcm', 'jlcfm', 'ccyy', 'ccnr', 'ccwh', 'ccdw', 'ccrq', 'cccxrq', 'cccxwh', 'cccxyy'))
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
      this.form.setFieldsValue(pick(row, 'gh', 'xm',  'ccmcm', 'jlcfm', 'ccyy', 'ccnr', 'ccwh', 'ccdw', 'ccrq', 'cccxrq', 'cccxwh', 'cccxyy'))
    }
  }
}
</script>