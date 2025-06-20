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
              <a-input
                v-decorator="['gh']"
                placeholder="请输入工号"
                :disabled="disabledKeys.indexOf('gh') > -1"
              ></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="姓名" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input
                v-decorator="['xm']"
                placeholder="请输入姓名"
                :disabled="disabledKeys.indexOf('xm') > -1"
              ></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="考勤类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <!-- <j-dict-select-tag type="list" v-decorator="['kqtype']" :trigger-change="true"
                                 dictCode="ve_dgsx_dictdata,title,code,modelCode='attendanceType'"
                                 placeholder="请选择考勤类型" /> -->
              <a-select
                v-decorator="['kqtype', validatorRules.kqtype]"
                placeholder="考勤类型"
                :disabled="disabledKeys.indexOf('kqtype') > -1"
              >
                <a-select-option value="1">出勤</a-select-option>
                <a-select-option value="2">旷课</a-select-option>
                <a-select-option value="3">迟到</a-select-option>
                <a-select-option value="4">早退</a-select-option>
                <a-select-option value="5">请假</a-select-option>
                <a-select-option value="6">记勤</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="考勤时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-date
                placeholder="请选择考勤时间"
                v-decorator="['kqtime', validatorRules.kqtime]"
                :trigger-change="true"
                style="width: 100%"
              />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="所属学期" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-dict-select-tag
                :disabled="disabledKeys.indexOf('semid') > -1"
                type="list"
                v-decorator="['semid', validatorRules.semid]"
                :trigger-change="true"
                dictCode="ve_base_semester,XQMC,id"
                placeholder="请选择所属学期码"
              />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="考勤描述" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-textarea v-decorator="['kqdesc']" rows="4" placeholder="请输入考勤描述" />
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
  name: 'VeHrKaoqinJiluForm',
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
        kqtype: {
          rules: [{ required: true, message: '请选择考勤类型!' }],
        },
        kqtime: {
          rules: [{ required: true, message: '请选择考勤时间!' }],
        },
        semid: {
          rules: [{ required: true, message: '请选择所属学期!' }],
        },
      },
      url: {
        add: '/hr/kaoqin/veHrKaoqinJilu/add',
        edit: '/hr/kaoqin/veHrKaoqinJilu/edit',
        queryById: '/hr/kaoqin/veHrKaoqinJilu/queryById',
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
        if (this.model.kqtype) {
          this.model.kqtype = this.model.kqtype.toString()
        }
        this.form.setFieldsValue(pick(this.model, 'xm', 'gh', 'kqtype', 'kqdesc', 'kqtime', 'semid'))
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
      this.form.setFieldsValue(pick(row, 'xm', 'gh', 'kqtype', 'kqdesc', 'kqtime', 'semid'))
    },
  },
}
</script>