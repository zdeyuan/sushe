<template>
  <a-spin :spinning="confirmLoading">
    <j-form-container :disabled="formDisabled">
      <a-form :form="form" slot="detail">
        <a-row>
          <a-col :span="12">
            <!-- todo 添加时需要回填且不可更改，除了新建，是否还有其它方法。（其他几个manager进个人的地方类似） -->
            <a-form-item label="工号" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input
                v-decorator="['gh', validatorRules.gh]"
                placeholder="请输入工号"
                :disabled="disabledKeys.indexOf('gh') > -1"
              ></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="姓名" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input
                v-decorator="['xm', validatorRules.xm]"
                placeholder="请输入姓名"
                :disabled="disabledKeys.indexOf('xm') > -1"
              ></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="获奖项目" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['hjxm', validatorRules.hjxm]" placeholder="请输入获奖项目"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="奖励级别" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-dict-select-tag
                type="list"
                v-decorator="['jljbm', validatorRules.jljbm]"
                :trigger-change="true"
                dictCode="ve_dict_dictdata,title,code,modelCode='JLJB'"
                placeholder="请选择奖励级别"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="奖励等级" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-dict-select-tag
                type="list"
                v-decorator="['jldjm', validatorRules.jldjm]"
                :trigger-change="true"
                dictCode="ve_dict_dictdata,title,code,modelCode='JLDJ'"
                placeholder="请选择奖励等级"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="获奖类别" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-dict-select-tag
                type="list"
                v-decorator="['hjlbm', validatorRules.hjlbm]"
                :trigger-change="true"
                dictCode="ve_dict_dictdata,title,code,modelCode='JLLB'"
                placeholder="请选择获奖类别"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="奖励方式" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-dict-select-tag
                type="list"
                v-decorator="['jlfsm', validatorRules.jlfsm]"
                :trigger-change="true"
                dictCode="ve_dict_dictdata,title,code,modelCode='JLFS'"
                placeholder="请选择奖励方式"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="奖励名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-dict-select-tag
                type="list"
                v-decorator="['jlmcm', validatorRules.jlmcm]"
                :trigger-change="true"
                dictCode="ve_hr_jiangli_type,jlName,jlCode,jlType='1'"
                placeholder="请选择奖励名称"
              ></j-dict-select-tag>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="获奖原因" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-textarea v-decorator="['hjyy', validatorRules.hjyy]" rows="4" placeholder="请输入获奖原因" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="奖励内容" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-textarea v-decorator="['jlnr', validatorRules.jlnr]" rows="4" placeholder="请输入奖励内容" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="颁奖单位" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['bjdw', validatorRules.bjdw]" placeholder="请选择颁奖单位" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="获奖日期" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-date placeholder="请选择获奖日期" v-decorator="['hjrq']" :trigger-change="true" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="荣誉称号" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-dict-select-tag
                type="list"
                v-decorator="['rychm', validatorRules.rychm]"
                :trigger-change="true"
                dictCode="ve_dict_dictdata,title,code,modelCode='RYCH'"
                placeholder="请选择荣誉称号"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="获奖角色" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-dict-select-tag
                type="list"
                v-decorator="['hjjsm', validatorRules.hjjsm]"
                :trigger-change="true"
                dictCode="ve_dict_dictdata,title,code,modelCode='HJJS'"
                placeholder="请选择获奖角色"
              />
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
  name: 'HqHrJiangliForm',
  components: {},
  props: {
    //流程表单data
    formData: {
      type: Object,
      default: () => {},
      required: false,
    },
    //表单模式：true流程表单 false普通表单
    formBpm: {
      type: Boolean,
      default: false,
      required: false,
    },
    //表单禁用
    disabled: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  data() {
    return {
      form: this.$form.createForm(this),
      model: {},
      disabledKeys: [],
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
        // gh: {
        //   rules: [{ required: true, message: '请输入工号!' }],
        // },
        // xm: {
        //   rules: [{ required: true, message: '请输入姓名!' }],
        // },
        jljbm: {
          rules: [{ required: true, message: '请输入奖励级别码!' }],
        },
        jldjm: {
          rules: [{ required: true, message: '请输入奖励等级码!' }],
        },
        hjlbm: {
          rules: [{ required: true, message: '请输入获奖类别码!' }],
        },
        // jlmcm: {
        //   rules: [{ required: true, message: '请输入奖励名称码!' }],
        // },
        hjxm: {
          rules: [{ required: true, message: '请输入获奖项目!' }],
        },
        jlfsm: {
          rules: [{ required: true, message: '请输入奖励方式码!' }],
        },
        hjyy: {
          rules: [{ required: true, message: '请输入获奖原因!' }],
        },
        jlnr: {
          rules: [{ required: true, message: '请输入奖励内容!' }],
        },
        bjdw: {
          rules: [{ required: true, message: '请输入颁奖单位!' }],
        },
        rychm: {
          rules: [{ required: true, message: '请输入荣誉称号码!' }],
        },
        hjjsm: {
          rules: [{ required: true, message: '请输入获奖角色码!' }],
        },
      },
      url: {
        add: '/hr/rewardpublish/hqHrJiangli/add',
        edit: '/hr/rewardpublish/hqHrJiangli/edit',
        queryById: '/hr/rewardpublish/hqHrJiangli/queryById',
      },
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
    },
  },
  created() {
    //如果是流程中表单，则需要加载流程表单data
    this.showFlowData()
  },
  methods: {
    add() {
      this.edit({})
    },
    edit(record, extra) {
        
      if (extra.disabledKeys) {
        this.disabledKeys = extra.disabledKeys
      } else {
        this.disabledKeys = []
      }

      this.form.resetFields()
      this.model = Object.assign({}, record)
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue(
          pick(
            this.model,
            'gh',
            'xm',
            'jljbm',
            'jldjm',
            'hjlbm',
            'hjrq',
            'jlmcm',
            'hjxm',
            'jlfsm',
            'hjyy',
            'jlnr',
            'bjdw',
            'rychm',
            'hjjsm'
          )
        )
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
          httpAction(httpurl, formData, method)
            .then((res) => {
              if (res.success) {
                that.$message.success(res.message)
                that.$emit('ok')
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
    popupCallback(row) {
      this.form.setFieldsValue(
        pick(
          row,
          'gh',
          'xm',
          'jljbm',
          'jldjm',
          'hjlbm',
          'hjrq',
          'jlmcm',
          'hjxm',
          'jlfsm',
          'hjyy',
          'jlnr',
          'bjdw',
          'rychm',
          'hjjsm'
        )
      )
    },
  },
}
</script>