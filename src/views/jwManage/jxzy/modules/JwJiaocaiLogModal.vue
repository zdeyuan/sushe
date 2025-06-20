<template>
  <a-modal
    :title="title"
    :width="width"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    okText="确认"  cancelText="取消"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-row :gutter="24">
          <a-col :md="12" :sm="24">
            <a-form-item label="教材Id" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number
                v-decorator="['jcid', validatorRules.jcid]"
                placeholder="请输入教材Id"
                style="width: 100%"
              />
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="仓库Id" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number
                v-decorator="['ckid', validatorRules.ckid]"
                placeholder="请输入仓库Id"
                style="width: 100%"
              />
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="班级ID" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number
                v-decorator="['bjid', validatorRules.bjid]"
                placeholder="请输入班级ID"
                style="width: 100%"
              />
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="操作类型" :labelCol="labelCol" :wrapperCol="wrapperCol">

              <j-dict-select-tag
                v-decorator="['type', validatorRules.type]"
                placeholder="请选择操作类型"
                dict-code="material_operation"
              />
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="出入库数量" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number
                v-decorator="['num', validatorRules.num]"
                placeholder="请输入出入库数量"
                style="width: 100%"
              />
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label=" 操作时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number
                v-decorator="['addtime', validatorRules.addtime]"
                placeholder="请输入 操作时间"
                style="width: 100%"
              />
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="经办用户id" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number
                v-decorator="['adduserid', validatorRules.adduserid]"
                placeholder="请输入经办用户id"
                style="width: 100%"
              />
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="操作人" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['addusername', validatorRules.addusername]" placeholder="请输入操作人"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="如果入库的有订单号，则标注订单号" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input
                v-decorator="['orderid', validatorRules.orderid]"
                placeholder="请输入如果入库的有订单号，则标注订单号"
              ></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="入库日期" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['adddate', validatorRules.adddate]" placeholder="请输入入库日期"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="经办人" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['adduser', validatorRules.adduser]" placeholder="请输入经办人"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="备注" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['memo', validatorRules.memo]" placeholder="请输入备注"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="终端id" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number
                v-decorator="['terminalid', validatorRules.terminalid]"
                placeholder="请输入终端id"
                style="width: 100%"
              />
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="供应商ID" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number
                v-decorator="['supplierid', validatorRules.supplierid]"
                placeholder="请输入供应商ID"
                style="width: 100%"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { httpAction } from '@/api/common/manage'
import pick from 'lodash.pick'
import { validateDuplicateValue } from '@/utils/util'

export default {
  name: 'JwJiaocaiLogModal',
  components: {},
  data() {
    return {
      form: this.$form.createForm(this),
      title: '操作',
      width: '70%',
      visible: false,
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
        jcid: {
          rules: [{ required: true, message: '请输入教材Id!' }],
        },
        ckid: {
          rules: [{ required: true, message: '请输入仓库Id!' }],
        },
        bjid: {
          rules: [{ required: true, message: '请输入班级ID!' }],
        },
        type: {
          rules: [{ required: true, message: '请输入操作类型 1：入库 2：出库!' }],
        },
        num: {
          rules: [{ required: true, message: '请输入出入库数量!' }],
        },
        addtime: {
          rules: [{ required: true, message: '请输入 操作时间!' }],
        },
        adduserid: {
          rules: [{ required: true, message: '请输入经办用户id!' }],
        },
        addusername: {
          rules: [{ required: true, message: '请输入操作人!' }],
        },
        orderid: {
          rules: [{ required: true, message: '请输入如果入库的有订单号，则标注订单号!' }],
        },
        adddate: {
          rules: [{ required: true, message: '请输入入库日期!' }],
        },
        adduser: {
          rules: [{ required: true, message: '请输入经办人!' }],
        },
        memo: {
          rules: [{ required: true, message: '请输入备注!' }],
        },
        terminalid: {
          rules: [{ required: true, message: '请输入终端id!' }],
        },
        supplierid: {
          rules: [],
        },
      },
      url: {
        add: '/jxzy/jwJiaocaiLog/add',
        edit: '/jxzy/jwJiaocaiLog/edit',
      },
    }
  },
  created() {},
  methods: {
    add() {
      this.edit({})
    },
    edit(record) {
      this.form.resetFields()
      this.model = Object.assign({}, record)
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue(
          pick(
            this.model,
            'jcid',
            'ckid',
            'bjid',
            'type',
            'num',
            'addtime',
            'adduserid',
            'addusername',
            'orderid',
            'adddate',
            'adduser',
            'memo',
            'terminalid',
            'supplierid'
          )
        )
      })
    },
    close() {
      this.$emit('close')
      this.visible = false
    },
    handleOk() {
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
                that.close()
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
    handleCancel() {
      this.close()
    },
    popupCallback(row) {
      this.form.setFieldsValue(
        pick(
          row,
          'jcid',
          'ckid',
          'bjid',
          'type',
          'num',
          'addtime',
          'adduserid',
          'addusername',
          'orderid',
          'adddate',
          'adduser',
          'memo',
          'terminalid',
          'supplierid'
        )
      )
    },
  },
}
</script>