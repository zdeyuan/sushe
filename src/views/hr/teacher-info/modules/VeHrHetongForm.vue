<template>
  <a-spin :spinning="confirmLoading">
    <j-form-container :disabled="formDisabled">
      <a-form :form="form" slot="detail">
        <a-row>
          <!-- <a-col :span="24">
            <a-form-item label="老师表id" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number v-decorator="['teacherid', validatorRules.teacherid]" placeholder="请输入老师表id"
                              style="width: 100%" />
            </a-form-item>
          </a-col> -->
          <a-col :span="24">
            <a-form-item label="工号" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input
                v-decorator="['gh', validatorRules.gh]"
                placeholder="请输入工号"
                :disabled="disabledKeys.indexOf('gh') > -1"
              ></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="姓名" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input
                v-decorator="['xm', validatorRules.xm]"
                placeholder="请输入姓名"
                :disabled="disabledKeys.indexOf('xm') > -1"
              ></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="合同开始时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-date
                placeholder="请选择合同开始时间"
                v-decorator="['starttime',validatorRules.starttime]"
                :trigger-change="true"
                style="width: 100%"
              />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="合同结束时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-date
                placeholder="请选择合同结束时间"
                v-decorator="['endtime',validatorRules.endtime]"
                :trigger-change="true"
                style="width: 100%"
              />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="是否为当前合同" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-radio-group v-decorator="['status']">
                <a-radio value="1">是</a-radio>
                <a-radio value="2">否</a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="合同附件" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <!-- <a-input-number v-decorator="['fileUrl', validatorRules.fileid]" placeholder="请输入合同附件"
                              style="width: 100%" /> -->
              <j-upload
                text="可上传文件格式jpg,gif,png,jpeg,doc,docx"
                fileType="file"
                :number="1"
                accept=".jpg,.gif,.png,.jpeg,.doc,.docx"
                v-decorator="['fileUrl']"
                :multiline="false"
                placeholder="可上传文件格式doc,docx"
              />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="描述" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-textarea v-decorator="['content']" rows="4" placeholder="请输入描述" />
            </a-form-item>
          </a-col>
          <!-- <a-col :span="24">
            <a-form-item label="createuserid" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number v-decorator="['createuserid', validatorRules.createuserid]" placeholder="请输入createuserid"
                              style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="createtime" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-date placeholder="请选择createtime" v-decorator="['createtime']" :trigger-change="true"
                      style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="terminalid" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number v-decorator="['terminalid', validatorRules.terminalid]" placeholder="请输入terminalid"
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
  name: 'VeHrHetongForm',
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
        teacherid: {
          rules: [{ required: true, message: '请输入老师表id!' }],
        },
        // gh: {
        //   rules: [{ required: true, message: '请输入工号!' }],
        // },
        // xm: {
        //   rules: [{ required: true, message: '请输入姓名!' }],
        // },
        starttime: {
          rules: [{ required: true, message: '请选择合同开始时间!' }],
        },
        endtime: {
          rules: [{ required: true, message: '请选择合同结束时间!' }],
        },
        fileid: {
          rules: [{ required: true, message: '请输入合同附件id!' }],
        },
        status: {
          rules: [{ required: true, message: '请输入是否为当前合同1当前2非当前!' }],
        },
        createuserid: {
          rules: [{ required: true, message: '请输入createuserid!' }],
        },
        terminalid: {
          rules: [{ required: true, message: '请输入terminalid!' }],
        },
      },
      url: {
        add: '/hr/base/veHrHetong/add',
        edit: '/hr/base/veHrHetong/edit',
        queryById: '/hr/base/veHrHetong/queryById',
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
        if (this.model.fileUrl === '0') {
          this.model.fileUrl = ''
        }
        if (this.model.status) {
          this.model.status = this.model.status.toString()
        }
        if (!this.model.id) {
          this.model.status = '1'
        }
        this.form.setFieldsValue(pick(this.model, 'gh', 'xm', 'starttime', 'status', 'endtime', 'fileUrl', 'content'))
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
      this.form.setFieldsValue(pick(row, 'gh', 'xm', 'starttime', 'status', 'endtime', 'fileUrl', 'content'))
    },
  },
}
</script>