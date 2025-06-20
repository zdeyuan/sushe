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
            <a-form-item label="姓名" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['xm', validatorRules.xm]" placeholder="请输入姓名" disabled></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="工号" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['gh', validatorRules.gh]" placeholder="请输入工号" disabled></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="变动类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-dict-select-tag type="list" v-decorator="['bdcode', validatorRules.bdcode]" :trigger-change="true"
                                 dictCode="ve_dict_dictdata,title,code,modelCode='RSBDLX'" placeholder="请选择变动类型" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="变动时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-date placeholder="请选择变动时间" v-decorator="['createTime',validatorRules.createTime]" :trigger-change="true" style="width: 100%" />
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
  name: 'VeHrChangeForm',
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
    },
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
        createTime: {
          rules: [
            { required: true, message: '请选择变动时间!' }
          ]
        },
        bdcode: {
          rules: [
            { required: true, message: '请输入变动类型代码!' }
          ]
        },
        // dbdesc: {
        //   rules: [
        //     { required: true, message: '请输入变动说明!' }
        //   ]
        // },
        createuserid: {
          rules: [
            { required: true, message: '请输入操作人id!' }
          ]
        },
        createusername: {
          rules: [
            { required: true, message: '请输入操作人姓名!' }
          ]
        },
        terminalid: {
          rules: [
            { required: true, message: '请输入系统ID!' }
          ]
        }
      },
      url: {
        add: '/hr/change/veHrChange/add',
        edit: '/hr/change/veHrChange/edit',
        queryById: '/hr/change/veHrChange/queryById'
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
        // console.log('this.model数据',this.model)
        this.form.setFieldsValue(pick(this.model,  'gh', 'xm', 'bdcode', 'createTime', 'dbdesc'))
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
          httpAction(httpurl, formData, method).then((res) => {
            if (res.success) {
			  window.console.log('执行成功！')
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
      this.form.setFieldsValue(pick(row, 'gh', 'xm', 'bdcode', 'createTime', 'dbdesc'))
    }
  }
}
</script>