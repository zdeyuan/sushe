<template>
  <a-spin :spinning="confirmLoading">
    <j-form-container :disabled="formDisabled">
      <a-form :form="form" slot="detail">
        <a-row>
          <a-col :span="24">
            <a-form-item label="人员姓名" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['empName']" placeholder="请输入人员姓名"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="岗位工资" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number v-decorator="['postPay']" placeholder="请输入岗位工资" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="薪级工资" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number v-decorator="['payScalePay']" placeholder="请输入薪级工资" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="基本工资津贴（10%）" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number v-decorator="['basicPayAllow']" placeholder="请输入基本工资津贴（10%）" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="教龄工资" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number v-decorator="['seniorityPay']" placeholder="请输入教龄工资" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="纪检津贴" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number v-decorator="['jjAllow']" placeholder="请输入纪检津贴" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="综治津贴" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number v-decorator="['zzAllow']" placeholder="请输入综治津贴" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="绩效津贴" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number v-decorator="['achievementAllow']" placeholder="请输入绩效津贴" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="合计" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number v-decorator="['total']" placeholder="请输入合计" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="取暖费" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number v-decorator="['heatingFee']" placeholder="请输入取暖费" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="独生子女费" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number v-decorator="['dsznFee']" placeholder="请输入独生子女费" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="班主任津贴" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number v-decorator="['headmasterAllow']" placeholder="请输入班主任津贴" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="话费" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number v-decorator="['phoneBill']" placeholder="请输入话费" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="补发工资" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number v-decorator="['reissuePay']" placeholder="请输入补发工资" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="临时工资" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number v-decorator="['tempPay']" placeholder="请输入临时工资" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="课时津贴" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number v-decorator="['ksAllow']" placeholder="请输入课时津贴" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="卫生费" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number v-decorator="['hygieneFee']" placeholder="请输入卫生费" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="本月补发小计" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number v-decorator="['bybfSubtotal']" placeholder="请输入本月补发小计" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="工会会费" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number v-decorator="['unionDues']" placeholder="请输入工会会费" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="公积金" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number v-decorator="['providentFund']" placeholder="请输入公积金" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="医保" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number v-decorator="['medicalIns']" placeholder="请输入医保" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="养老保险" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number v-decorator="['endowmentIns']" placeholder="请输入养老保险" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="职业年金" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number v-decorator="['occpAnnuity']" placeholder="请输入职业年金" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="专项扣除" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number v-decorator="['specDeduct']" placeholder="请输入专项扣除" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="补扣工会经费" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number v-decorator="['bkGhJf']" placeholder="请输入补扣工会经费" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="扣公积金-社保" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number v-decorator="['kgjjSb']" placeholder="请输入扣公积金-社保" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="税款" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number v-decorator="['taxes']" placeholder="请输入税款" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="代扣小计" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number v-decorator="['withholdSubtotal']" placeholder="请输入代扣小计" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="财政统发工资数" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number v-decorator="['czTfGzs']" placeholder="请输入财政统发工资数" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="补发金额" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number v-decorator="['bfJe']" placeholder="请输入补发金额" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="实发合计" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number v-decorator="['sfTotal']" placeholder="请输入实发合计" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="工资条日期" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-date placeholder="请选择工资条日期" v-decorator="['payrollDate']" :trigger-change="true" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="身份证号" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['idCard']" placeholder="请输入身份证号"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="岗位" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['post']" placeholder="请输入岗位"></a-input>
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
  name: 'VeHrEmployeePayrollForm',
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
      validatorRules: {},
      url: {
        add: '/hr/veHrEmployeePayroll/add',
        edit: '/hr/veHrEmployeePayroll/edit',
        queryById: '/hr/veHrEmployeePayroll/queryById'
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
        this.form.setFieldsValue(pick(this.model, 'empName', 'postPay', 'payScalePay', 'basicPayAllow', 'seniorityPay', 'jjAllow', 'zzAllow', 'achievementAllow', 'total', 'heatingFee', 'dsznFee', 'headmasterAllow', 'phoneBill', 'reissuePay', 'tempPay', 'ksAllow', 'hygieneFee', 'bybfSubtotal', 'unionDues', 'providentFund', 'medicalIns', 'endowmentIns', 'occpAnnuity', 'specDeduct', 'bkGhJf', 'kgjjSb', 'taxes', 'withholdSubtotal', 'czTfGzs', 'bfJe', 'sfTotal', 'payrollDate', 'idCard', 'post'))
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
      this.form.setFieldsValue(pick(row, 'empName', 'postPay', 'payScalePay', 'basicPayAllow', 'seniorityPay', 'jjAllow', 'zzAllow', 'achievementAllow', 'total', 'heatingFee', 'dsznFee', 'headmasterAllow', 'phoneBill', 'reissuePay', 'tempPay', 'ksAllow', 'hygieneFee', 'bybfSubtotal', 'unionDues', 'providentFund', 'medicalIns', 'endowmentIns', 'occpAnnuity', 'specDeduct', 'bkGhJf', 'kgjjSb', 'taxes', 'withholdSubtotal', 'czTfGzs', 'bfJe', 'sfTotal', 'payrollDate', 'idCard', 'post'))
    }
  }
}
</script>