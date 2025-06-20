<template>
  <a-spin :spinning="confirmLoading">
    <j-form-container :disabled="formDisabled">
      <a-form :form="form" slot="detail">
        <a-row>
          <a-col :span="24">
            <a-form-item label="名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['jlname', validatorRules.jlname]" placeholder="请输入变动类型名称"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="代码" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['jlcode', validatorRules.jlcode]" placeholder="请输入变动类型代码"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <!--              <j-dict-select-tag type="radio" v-decorator="['jltype', validatorRules.jltype]" :trigger-change="true"  placeholder="请选择类型" />-->
              <a-radio-group v-decorator="['jltype', validatorRules.jltype]">
                <a-radio value="1">奖励</a-radio>
                <a-radio value="2">惩罚</a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="描述" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-textarea v-decorator="['content']" rows="4" placeholder="请输入描述" />
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
  name: 'HqHrJiangliTypeForm',
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
        jlname: {
          rules: [{ required: true, message: '请输入变动类型名称!' }],
        },
        jlcode: {
          rules: [
            { required: true, message: '请输入变动类型代码!' },
            {
              validator: (rule, value, callback) =>
                validateDuplicateValue('ve_hr_jiangli_type', 'jlCode', value, this.model.id, callback),
            },
          ],
        },
        // jltype: {
        //   rules: [{ required: true, message: '请选择类型!' }],
        // },
      },
      url: {
        add: '/hr/rewardpublish/hqHrJiangliType/add',
        edit: '/hr/rewardpublish/hqHrJiangliType/edit',
        queryById: '/hr/rewardpublish/hqHrJiangliType/queryById',
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
    edit(record) {
        
      this.form.resetFields()
      this.model = Object.assign({}, record)
      this.visible = true
      this.$nextTick(() => {
        if (this.model.jltype) {
          this.model.jltype = this.model.jltype.toString()
        }
        if(!this.model.id){
          //没id，表示新增，则给默认值
          this.model.jltype='1'
        }
        this.form.setFieldsValue(pick(this.model, 'jlname', 'jlcode', 'jltype', 'content'))
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
      this.form.setFieldsValue(pick(row, 'jlname', 'jlcode', 'jltype', 'content'))
    },
  },
}
</script>