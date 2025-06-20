<template>
  <a-spin :spinning="confirmLoading">
    <j-form-container :disabled="formDisabled">
      <a-form :form="form" slot="detail">
        <a-row>
          <a-col :span="12">
            <a-form-item label="工号" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input
                v-if="!disabledFormKeys['gh']"
                v-decorator="['gh', validatorRules.gh]"
                placeholder="请输入工号"
              ></a-input>
              <div v-else>{{ model['gh'] }}</div>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="姓名" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input
                v-if="!disabledFormKeys['xm']"
                v-decorator="['xm', validatorRules.xm]"
                placeholder="请输入姓名"
              ></a-input>
              <div v-else>{{ model['xm'] }}</div>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="联系电话" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['telphone', validatorRules.telphone]" placeholder="请输入联系电话"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="教育方式" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-dict-select-tag
                type="list"
                v-decorator="['jxjyfsm', validatorRules.jxjyfsm]"
                :trigger-change="true"
                dictCode="ve_dict_dictdata,title,code,modelCode='CJJXJYFS'"
                placeholder="请选择教育方式"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="报考院校" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['school', validatorRules.school]" placeholder="请输入报考院校"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="报考专业" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['profession', validatorRules.profession]" placeholder="请输入报考专业"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="进修学历" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-dict-select-tag
                type="list"
                v-decorator="['jxxlm', validatorRules.jxxlm]"
                :trigger-change="true"
                dictCode="ve_dict_dictdata,title,code,modelCode='XL'"
                placeholder="请选择进修学历"
              />
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item label="导师姓名" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['dsxm', validatorRules.dsxm]" placeholder="请输入导师姓名"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="导师电话" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['dslxdh', validatorRules.dslxdh]" placeholder="请输入导师电话"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="进修时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
              {{ model.jxkssj }} - {{ model.jxjssj }}
              <!-- <j-date placeholder="开始时间" v-decorator="['jxkssj']" :trigger-change="true" style="width: 50%" />
              <j-date placeholder="结束时间" v-decorator="['jxjssj']" :trigger-change="true" style="width: 50%" /> -->
            </a-form-item>
          </a-col>
          <!-- <a-col :span="12">
            <a-form-item label="进修结束时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-date placeholder="请选择进修结束时间" v-decorator="['jxjssj']" :trigger-change="true" style="width: 100%" />
            </a-form-item>
          </a-col> -->
          <a-col :span="12">
            <a-form-item label="报考目的" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-textarea v-decorator="['target', validatorRules.target]" rows="4" placeholder="请输入报考目的" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="申请理由" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-textarea v-decorator="['reason']" rows="4" placeholder="请输入申请理由" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="申请时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-date
                placeholder="请选择申请时间"
                v-decorator="['applytime']"
                :trigger-change="true"
                style="width: 100%"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12" v-if="!hidFormKeys['auditstatus']">
            <a-form-item label="审核状态 " :labelCol="labelCol" :wrapperCol="wrapperCol">
              <!-- <j-dict-select-tag
                type="list"
                v-decorator="['auditstatus']"
                :trigger-change="true"
                dictCode=""
                placeholder="请选择审核状态 "
              /> -->
              <a-radio-group v-decorator="['auditstatus']">
                <a-radio value="0">待审核</a-radio>
                <a-radio value="1">通过</a-radio>
                <a-radio value="2">不通过</a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
          <a-col :span="12" v-if="!hidFormKeys['auditxm']">
            <a-form-item label="审核人" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['auditxm']" placeholder="请输入审核人"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="12" v-if="!hidFormKeys['audityj']">
            <a-form-item label="审核人意见" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-textarea v-decorator="['audityj']" rows="4" placeholder="请输入审核人意见" />
            </a-form-item>
          </a-col>
          <!-- <a-col :span="12">
            <a-form-item label="审核时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-date placeholder="请选择审核时间" v-decorator="['audittime']" :trigger-change="true" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="审核人工号" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['auditgh']" placeholder="请输入审核人工号"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="系统id" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number v-decorator="['terminalid']" placeholder="请输入系统id" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="教师id" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number v-decorator="['teacherid']" placeholder="请输入教师id" style="width: 100%" />
            </a-form-item>
          </a-col> -->
          <!-- <a-col :span="24">
            <a-form-item label="附件" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-upload
                text="可上传文件格式doc,docx"
                fileType="file"
                :number="1"
                accept=".doc,.docx"
                v-decorator="['fileUrl']"
                :multiline="false"
                placeholder="可上传文件格式doc,docx"
              />
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
import JUpload from '@/components/edu/JUpload.vue'

export default {
  name: 'VeHrPeixunForm',
  components: { JUpload },
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
      //额外控制配置
      extra: {},
      hidFormKeys: {},
      disabledFormKeys: {},
      form: this.$form.createForm(this),
      model: {},
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
        gh: {
          rules: [{ required: true, message: '请输入工号!' }],
        },
        xm: {
          rules: [{ required: true, message: '请输入姓名!' }],
        },
        telphone: {
          rules: [{ required: true, message: '请输入联系电话!' }],
        },
        jxjyfsm: {
          rules: [{ required: true, message: '请输入参加继续教育方式!' }],
        },
        school: {
          rules: [{ required: true, message: '请输入报考院校!' }],
        },
        profession: {
          rules: [{ required: true, message: '请输入报考专业!' }],
        },
        jxxlm: {
          rules: [{ required: true, message: '请输入进修学历码!' }],
        },
        dsxm: {
          rules: [{ required: true, message: '请输入导师姓名!' }],
        },
        dslxdh: {
          rules: [{ required: true, message: '请输入导师联系电话!' }],
        },
        target: {
          rules: [{ required: true, message: '请输入报考目的!' }],
        },
      },
      url: {
        add: '/hr/peixun/veHrPeixun/add',
        edit: '/hr/peixun/veHrPeixun/edit',
        queryById: '/hr/peixun/veHrPeixun/queryById',
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
    fileUpload(e) {
      console.log('文件上传', e)
    },
    add() {
      this.edit({})
    },
    edit(record, extra) {
      this.validatorRules={}
      let pickKeys = [
        'gh',
        'xm',
        'telphone',
        'jxjyfsm',
        'school',
        'profession',
        'jxxlm',
        'dsxm',
        'dslxdh',
        'target',
        'reason',
        'applytime',
        'auditxm',
        'auditstatus',
        'audityj',
      ]
      if (extra.hidFormKeys) {
        this.hidFormKeys = extra.hidFormKeys
        for (let k in this.hidFormKeys) {
          if (this.hidFormKeys) {
            let index = pickKeys.indexOf(k)
            if (index > -1) {
              pickKeys.splice(index, 1)
            }
          }
        }
      } else {
        this.hidFormKeys = {}
      }
      this.form.resetFields()
      this.model = Object.assign({}, record)
      if (record.disabledFormKeys) {
        this.disabledFormKeys = record.disabledFormKeys
      } else {
        this.disabledFormKeys = {}
      }
      this.visible = true
      this.$nextTick(() => {
        if (this.model.auditstatus) {
          this.model.auditstatus = this.model.auditstatus.toString()
        }
        if (!this.model.auditstatus) {
          this.model.auditstatus = '0'
        }

        this.form.setFieldsValue(pick(this.model, ...pickKeys))
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
          'telphone',
          'jxjyfsm',
          'school',
          'profession',
          'jxxlm',
          'dsxm',
          'dslxdh',
          'target',
          'jxkssj',
          'jxjssj',
          'reason',
          'applytime',
          'audittime',
          'auditgh',
          'auditxm',
          'auditstatus',
          'audityj',
          'terminalid',
          'teacherid',
          'fileid'
        )
      )
    },
  },
}
</script>