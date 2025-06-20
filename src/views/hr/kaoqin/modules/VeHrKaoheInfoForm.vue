<template>
  <a-spin :spinning="confirmLoading">
    <j-form-container :disabled="formDisabled">
      <a-form :form="form" slot="detail">
        <a-row>
          <!-- <a-col :span="12">
            <a-form-item label="教师id" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number v-decorator="['teacherid']" placeholder="请输入教师id" style="width: 100%" />
            </a-form-item>
          </a-col> -->
          <a-col :span="12">
            <a-form-item label="工号" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['gh', validatorRules.gh]" placeholder="请输入工号" disabled></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="姓名" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['xm', validatorRules.xm]" placeholder="请输入姓名" disabled></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="考核类别" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-dict-select-tag type="list" v-decorator="['khlbm', validatorRules.khlbm]" :trigger-change="true"
                                 dictCode="ve_dict_dictdata,title,code,modelCode='KHLBM'" placeholder="请选择考核类别" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="考核日期" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-date placeholder="请选择考核日期" v-decorator="['khrq',validatorRules.khrq]" :trigger-change="true" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="考核内容" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-textarea v-decorator="['khnr', validatorRules.khnr]" rows="4" placeholder="请输入考核内容" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="考核结果" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-dict-select-tag type="list" v-decorator="['khjgm', validatorRules.khjgm]" :trigger-change="true"
                                 dictCode="ve_dict_dictdata,title,code,modelCode='KHJGM'" placeholder="请选择考核结果" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="考核评语" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-textarea v-decorator="['khpy', validatorRules.khpy]" rows="4" placeholder="请输入考核评语" />
            </a-form-item>
          </a-col>
          <!-- <a-col :span="12">
            <a-form-item label="考核负责人工号" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['khfzrgh', validatorRules.khfzrgh]" placeholder="请输入考核负责人工号"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="考核部门" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-dict-select-tag type="list" v-decorator="['depid', validatorRules.khjgm]" :trigger-change="true"
                                 dictCode="ve_base_department,JGMC,id" placeholder="请选择部门" />
            </a-form-item>
          </a-col> -->
          <!-- <a-col :span="12">
            <a-form-item label="系统ID" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number v-decorator="['terminalid']" placeholder="请输入系统ID" style="width: 100%" />
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
import moment from 'moment'

export default {
  name: 'VeHrKaoheForm',
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
        khlbm: {
          rules: [
            { required: true, message: '请输入考核类别码!' }
          ]
        },
        khjgm: {
          rules: [
            { required: true, message: '请输入考核结果码!' }
          ]
        },
        khnr: {
          rules: [
            { required: true, message: '请输入考核内容!' }
          ]
        },
        khrq: {
          rules: [
            { required: true, message: '请选择考核日期!' }
          ]
        },
        khfzrgh: {
          rules: [
            { required: true, message: '请输入考核负责人工号!' }
          ]
        },
        khpy: {
          rules: [
            { required: true, message: '请输入考核评语!' }
          ]
        },
        depid: {
          rules: [
            { required: true, message: '请输入考核部门id!' }
          ]
        }
      },
      url: {
        add: '/hr/kaoqin/veHrKaohe/add',
        edit: '/hr/kaoqin/veHrKaohe/edit',
        queryById: '/hr/kaoqin/veHrKaohe/queryById'
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
        // if(!this.model.khrq){
        //   this.model.khrq=moment(new Date()).format("YYYY-MM-DD")
        // }
        this.form.setFieldsValue(pick(this.model, 'gh', 'xm', 'khlbm', 'khjgm', 'khrq', 'khpy','khnr'))
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
					
          var formData = Object.assign(this.model, values)
          var token = window.sessionStorage.getItem('token')
          // 服务器,本地用户信息保存位置不同 需要部署时修改
          if (token !== null) {
          	window.console.log('执行服务器操作')
          	// 服务器
          	var userinfo = JSON.parse(window.sessionStorage.getItem('userInfo'))
          	formData.createusername = userinfo.userName
          	formData.createuserid = userinfo.id
          } else {
          	// 本地
          	window.console.log('执行本地操作')
          	var userinfo = JSON.parse(window.localStorage.getItem('pro__Login_Userinfo'))
          	window.console.log(userinfo)
          	formData.createusername = userinfo.value.username
          	formData.createuserid = userinfo.value.id
          }
          window.console.log(userinfo)
						
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
      this.form.setFieldsValue(pick(row,  'gh', 'xm', 'khlbm', 'khjgm', 'khrq', 'khnr', 'khpy', 'depid'))
    }
  }
}
</script>