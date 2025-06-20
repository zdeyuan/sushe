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
            <a-form-item label="岗位" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-dict-select-tag
                type="list"
                v-decorator="['gw', validatorRules.gw]"
                :trigger-change="true"
                dictCode="ve_hr_gangwei,title,id"
                placeholder="请选择岗位"
              />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="基础工资" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number
                v-decorator="['jcgz', validatorRules.jcgz]"
                placeholder="请输入基础工资"
                style="width: 100%"
              />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="职务工资" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number
                v-decorator="['zwgz', validatorRules.zwgz]"
                placeholder="请输入职务工资"
                style="width: 100%"
              />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="工龄津贴" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number
                v-decorator="['gljt', validatorRules.gljt]"
                placeholder="请输入工龄津贴"
                style="width: 100%"
              />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="奖励工资" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number
                v-decorator="['jlgz', validatorRules.jlgz]"
                placeholder="请输入奖励工资"
                style="width: 100%"
              />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="教龄津贴(教师)" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number
                v-decorator="['jljt', validatorRules.jljt]"
                placeholder="请输入教龄津贴(教师)"
                style="width: 100%"
              />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="其他" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number
                v-decorator="['other', validatorRules.other]"
                placeholder="请输入其他"
                style="width: 100%"
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
  name: 'VeHrJingtieForm',
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
      disabledKeys:[],
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
        teacherid: {
          rules: [{ required: true, message: '请输入教师id!' }],
        },
        // gh: {
        //   rules: [{ required: true, message: '请输入工号!' }],
        // },
        // xm: {
        //   rules: [{ required: true, message: '请输入姓名!' }],
        // },
        // gw: {
        //   rules: [{ required: true, message: '请输入岗位!' }],
        // },
        jcgz: {
          rules: [{ required: true, message: '请输入基础工资!' }],
        },
        // zwgz: {
        //   rules: [{ required: true, message: '请输入职务工资!' }],
        // },
        // gljt: {
        //   rules: [{ required: true, message: '请输入工龄津贴!' }],
        // },
        // jlgz: {
        //   rules: [{ required: true, message: '请输入奖励工资!' }],
        // },
        // jljt: {
        //   rules: [{ required: true, message: '请输入教龄津贴(教师)!' }],
        // },
        // other: {
        //   rules: [{ required: true, message: '请输入其他!' }],
        // },
      },
      url: {
        add: '/hr/ganwei/veHrJingtie/add',
        edit: '/hr/ganwei/veHrJingtie/edit',
        queryById: '/hr/ganwei/veHrJingtie/queryById',
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
    edit(record,extra) {
      window.console.log(extra)
	  window.console.log(extra.disabledKeys)
      if(extra.disabledKeys){
        this.disabledKeys=extra.disabledKeys
      }else{
        this.disabledKeys=[]
      }
	window.console.log(record)
      this.form.resetFields()
      this.model = Object.assign({}, record)
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(this.model, 'gh', 'xm', 'gw', 'jcgz', 'zwgz', 'gljt', 'jlgz', 'jljt', 'other'))
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
      this.form.setFieldsValue(pick(row, 'gh', 'xm', 'gw', 'jcgz', 'zwgz', 'gljt', 'jlgz', 'jljt', 'other'))
    },
  },
}
</script>