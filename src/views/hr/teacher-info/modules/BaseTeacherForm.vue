<template>
  <a-spin :spinning="confirmLoading">
    <j-form-container :disabled="formDisabled">
      <a-form :form="form" slot="detail">
        <a-row>
          <a-col :span="12">
            <a-form-item label="工号" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['gh', validatorRules.gh]" placeholder="请输入工号"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="姓名" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['xm', validatorRules.xm]" placeholder="请输入姓名"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="身份证件类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-dict-select-tag type="list" v-decorator="['sfzjlxm']" :trigger-change="true"
                                 dictCode="ve_dict_dictdata,title,code,modelCode='SFZJLX'" placeholder="请选择身份证件类型" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="身份证号" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['sfzjh', validatorRules.sfzjh]" placeholder="请输入身份证号"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="曾用名" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['cym']" placeholder="请输入曾用名"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="性别" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-radio-group v-decorator="['xbm']">
                <a-radio value="1">男</a-radio>
                <a-radio value="2">女</a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="籍贯" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['jg']" placeholder="请输入籍贯"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="出生日期" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-date placeholder="请输入出生日期" v-decorator="['csrq']" :trigger-change="true" style=" width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="民族" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-dict-select-tag type="list" v-decorator="['mzm']" :trigger-change="true"
                                 dictCode="ve_dict_dictdata,title,code,modelCode='MZ'" placeholder="请选择民族" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="政治面貌" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-dict-select-tag type="list" v-decorator="['zzmmm']" :trigger-change="true"
                                 dictCode="ve_dict_dictdata,title,code,modelCode='ZZMM'" placeholder="请选择政治面貌" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="编制类别" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-dict-select-tag type="list" v-decorator="['bzlbm',validatorRules.bzlbm]" :trigger-change="true"
                                 dictCode="ve_dict_dictdata,title,code,modelCode='BZLB'" placeholder="请选择编制类别" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="教职工类别" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-dict-select-tag type="list" v-decorator="['jzglbm']" :trigger-change="true"
                                 dictCode="ve_dict_dictdata,title,code,modelCode='JZGLB'" placeholder="请选择教职工类别" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="参加工作年月" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-month v-decorator="['cjgzny']" placeholder="请输入参加工作年月" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="从教年月" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-month v-decorator="['cjny']" placeholder="请输入从教年月" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="来校年月" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-month v-decorator="['lxny']" placeholder="请输入来校年月" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="所属部门" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-tree-select v-decorator="['depid']" dict="ve_base_department,JGMC,id" pcode="" placeholder="请选择所属部门" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="所属专业组" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-tree-select type="list" v-decorator="['jyzid']" dict="ve_base_jyz,JYZMC,id" pcode=""
                             placeholder="请选择所属专业组" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="联系电话" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['lxdh',validatorRules.lxdh]" placeholder="请输入联系电话"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="电子邮箱" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['dzxx',validatorRules.dzxx]" placeholder="请输入电子邮箱"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="当前住址" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['dqzz']" placeholder="请输入当前住址"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="邮政编码" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['yzbm']" placeholder="请输入邮政编码"></a-input>
            </a-form-item>
          </a-col>
          
          <a-col :span="12">
            <a-form-item label="港澳台侨外" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-dict-select-tag type="list" v-decorator="['gatqwm']" :trigger-change="true"
                                 dictCode="ve_dict_dictdata,title,code,modelCode='GATQWM'" placeholder="请选择港澳台侨外" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="健康状况" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-dict-select-tag type="list" v-decorator="['jkzkm']" :trigger-change="true"
                                 dictCode="ve_dict_dictdata,title,code,modelCode='JKZK'" placeholder="请选择健康状况" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="户口类别" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-dict-select-tag type="list" v-decorator="['hklbm']" :trigger-change="true"
                                 dictCode="ve_dict_dictdata,title,code,modelCode='HKLX'" placeholder="请选择户口类别" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="是否是流动人口" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-dict-select-tag type="list" v-decorator="['sfsldrk']" :trigger-change="true"
                                 dictCode="ve_dict_dictdata,title,code,modelCode='SFSLDRK'" placeholder="请选择是否是流动人口" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="岗位类别" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-dict-select-tag type="list" v-decorator="['gwlbm']" :trigger-change="true"
                                 dictCode="ve_dict_dictdata,title,code,modelCode='GWLB'" placeholder="请选择岗位类别" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="职务" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-dict-select-tag type="list" v-decorator="['zwm']" :trigger-change="true"
                                 dictCode="ve_dict_dictdata,title,code,modelCode='ZW'" placeholder="请选择职务" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="是否兼职教师" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-radio-group v-decorator="['sfjzjs']">
                <a-radio :value="1">是</a-radio>
                <a-radio :value="0">否</a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="当前状态" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-dict-select-tag type="list" v-decorator="['dqztm']" :trigger-change="true"
                                 dictCode="ve_dict_dictdata,title,code,modelCode='JZGDQZT'" placeholder="请选择当前状态" />
            </a-form-item>
          </a-col>
		  <a-col :span="12">
		    <a-form-item label="省市级专业带头人" :labelCol="labelCol" :wrapperCol="wrapperCol">
		      <j-dict-select-tag type="list" v-decorator="['sfssjzydtr']" :trigger-change="true"
		                         dictCode="ve_dict_dictdata,title,code,modelCode='SFSSJZYDTR'" placeholder="请选择当前状态" />
		    </a-form-item>
		  </a-col>
		  <a-col :span="12">
		    <a-form-item label="骨干教师" :labelCol="labelCol" :wrapperCol="wrapperCol">
		      <j-dict-select-tag type="list" v-decorator="['sfggjs']" :trigger-change="true"
		                         dictCode="ve_dict_dictdata,title,code,modelCode='SFGGJS'" placeholder="请选择当前状态" />
		    </a-form-item>
		  </a-col>
		  <a-col :span="12">
		    <a-form-item label="高级专业技术职务教师" :labelCol="labelCol" :wrapperCol="wrapperCol">
		      <j-dict-select-tag type="list" v-decorator="['sfgjzyjszwjs']" :trigger-change="true"
		                         dictCode="ve_dict_dictdata,title,code,modelCode='SFGJZYJSZWJS'" placeholder="请选择当前状态" />
		    </a-form-item>
		  </a-col>
		  <a-col :span="12">
		    <a-form-item label="双师型教师" :labelCol="labelCol" :wrapperCol="wrapperCol">
		      <j-dict-select-tag type="list" v-decorator="['sfssxjs']" :trigger-change="true"
		                         dictCode="ve_dict_dictdata,title,code,modelCode='SFSSXJS'" placeholder="请选择当前状态" />
		    </a-form-item>
		  </a-col>
          <!-- <a-col :span="12">
            <a-form-item label="状态" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-radio-group v-decorator="['status']">
                <a-radio :value="1">可用</a-radio>
                <a-radio :value="2">不可用</a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col> -->
          <a-col :span="24">
            <a-form-item label="图片" :labelCol="labelCol24" :wrapperCol="wrapperCol24">
              <j-image-upload :isMultiple="false" :number="1" v-decorator="['zp']"></j-image-upload>
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
import moment from 'dayjs'
import { validateDuplicateValue } from '@/utils/util'

export default {
  name: 'baseTeacherForm',
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
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 }
      },
      labelCol24: {
        xs: { span: 24 },
        sm: { span: 4 }
      },
      wrapperCol24: {
        xs: { span: 24 },
        sm: { span: 14 }
      },
      confirmLoading: false,
      validatorRules: {
        gh: {
          rules: [
            { required: true, message: '请输入工号!' }
          ]
        },
        xm: {
          rules: [
            { required: true, message: '请输入姓名!' }
          ]
        },
        // sfzjh: {
        //   rules: [
        //     { required: true, message: '请输入身份证件号!' }
        //   ]
        // },
        bzlbm: {
          rules: [
            { required: true, message: '请选择编制类别!' }
          ]
        },
        lxdh: {
          rules: [
            { required: true, message: '请输入联系电话!' }
          ]
        },
        dzxx: {
          rules: [
            { required: true, message: '请输入电子邮箱!' }
          ]
        }
      },
      url: {
        add: '/hr/base/baseTeacher/add',
        edit: '/hr/base/baseTeacher/edit',
        queryById: '/hr/base/baseTeacher/queryById'
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
	window.console.log(this.formData)
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
        this.model.depid = this.model.depid.toString()
        this.model.jyzid = this.model.jyzid.toString()
        this.model.csrq = moment(this.model.csrq * 1000).format('YYYY-MM-DD')
        this.model.cjgzny = moment(this.model.cjgzny * 1000).format('YYYY-MM')
        this.model.cjny = moment(this.model.cjny * 1000).format('YYYY-MM')
        this.model.lxny = moment(this.model.lxny * 1000).format('YYYY-MM')
        this.form.setFieldsValue(pick(this.model,'gh', 'xm', 'cym', 'sfzjlxm', 'sfzjh', 'csrq', 'depid', 'jyzid', 'xbm', 'mzm', 'jkzkm', 'zzmmm', 'gatqwm', 'jg', 'sfsldrk', 'hklbm', 'dqzz', 'cjgzny', 'cjny', 'lxny', 'bzlbm', 'zwm', 'jzglbm', 'gwlbm', 'sfjzjs', 'sfssxjs', 'zp', 'lxdh', 'dzxx', 'yzbm', 'dqztm','sfssjzydtr','sfggjs','sfgjzyjszwjs'))
      })
    },
    //渲染流程表单数据
    showFlowData() {
      if (this.formBpm === true) {
        let params = { id: this.formData.dataId }
        getAction(this.url.queryById, params).then((res) => {
          if (res.success) {
			window.console.log('2333333333333')
			window.console.log(res.result)
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
          values.csrq = new Date(values.csrq).getTime() / 1000
          values.cjgzny = new Date(values.cjgzny).getTime() / 1000
          values.cjny = new Date(values.cjny).getTime() / 1000
          values.lxny = new Date(values.lxny).getTime() / 1000
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
      this.form.setFieldsValue(pick(row,'gh', 'xm', 'cym', 'sfzjlxm', 'sfzjh', 'csrq', 'depid', 'jyzid', 'xbm', 'mzm', 'jkzkm', 'zzmmm', 'gatqwm', 'jg', 'sfsldrk', 'hklbm', 'dqzz', 'cjgzny', 'cjny', 'lxny', 'bzlbm', 'zwm', 'jzglbm', 'gwlbm', 'sfjzjs', 'sfssxjs', 'zp', 'lxdh', 'dzxx', 'yzbm', 'dqztm','sfssjzydtr','sfggjs','sfgjzyjszwjs'))
    },
    handleCategoryChange(value, backObj) {
      this.form.setFieldsValue(backObj)
    }
  }
}
</script>
