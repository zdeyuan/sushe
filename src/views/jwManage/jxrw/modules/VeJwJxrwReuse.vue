<template>
  <a-modal
    :title="title"
    :width="width"
    :visible="visible"
    :confirmLoading="confirmLoading"

    @ok="handleOk"
    @cancel="handleCancel"
    okText="确认"
    cancelText="取消"
  >
    <a-spin :spinning="confirmLoading" >
      <a-form :form="form">
        <a-row :gutter="24">
          <a-col :md="24" :sm="24">
            <a-form-item label="复用学年" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-dict-select-tag type="list" v-decorator="['falid']" :trigger-change="true" dictCode="" />
            </a-form-item>
          </a-col>

          <a-col :md="24" :sm="24">
            <a-form-item label="复用学期" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-select v-model="sfrom">
                <a-select-option :value="12"> 2016-2017上学期 </a-select-option>
                <a-select-option :value="19"> 2019-2020上学期 </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          <a-col :md="24" :sm="24">
            <a-form-item label="当前学年" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-dict-select-tag type="list" v-decorator="['classname']" :trigger-change="true" dictCode="" />
            </a-form-item>
          </a-col>

          <a-col :md="24" :sm="24">
            <a-form-item label="当前学期" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-select v-model="sto">
                <a-select-option :value="22"> 2021-2022上学期</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { httpAction, getAction } from '@/api/common/manage'
import pick from 'lodash.pick'
import { validateDuplicateValue } from '@/utils/util'

export default {
  name: 'VeJwJxrwReuse',
  components: {},
  data() {
    return {
      form: this.$form.createForm(this),
      title: '操作',
      width: 800,
      sfrom: null,
      sto: null,
      confirmLoading:false,
      loading: false,
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
      validatorRules: {},
      url: {
        add: '/jxrw/veJwJxrw/add',
        edit: '/jxrw/veJwJxrw/edit',
        reuse: '/jxrw/veJwJxrw/reuse',
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
          pick(this.model, 'falid', 'specid', 'classname', 'kcid', 'jsid', 'teacheruserid', 'wtime')
        )
      })
    },
    close() {
      this.$emit('close')
      this.visible = false
    },
    handleOk() {
      const that = this

      console.log('-------------')
      console.log('复用学期id：' + that.sfrom)
      console.log('当前学期id：' + that.sto)
      this.$confirm({
        title: '确认复用',
        content: '是否复用教学计划?',
        onOk: function () {
          that.confirmLoading = true
          getAction(that.url.reuse, { sfrom: that.sfrom, sto: that.sto })
            .then((res) => {
              if (res.success) {
                that.$message.success(res.message)
                that.loadData()
              } else {
                that.$message.warning(res.message)
              }
            })
            .finally(() => {
              that.confirmLoading = false
              this.close()
            })
        },
      })
    },
    handleCancel() {
      this.close()
    },
    // popupCallback(row) {
    //   this.form.setFieldsValue(
    //     pick(
    //       row,
    //       'falid',
    //       'specid',
    //       'kcid',
    //       'jyzid',
    //       'ksxsid',
    //       'xkrs',
    //       'sfhxkc',
    //       'kcflm',
    //       'kcsxm',
    //       'kcxz',
    //       'kcxf',
    //       'zxs',
    //       'createuserid',
    //       'createtime',
    //       'teacheruserid',
    //       'teachername',
    //       'ismergedclass',
    //       'xzbids',
    //       'type',
    //       'jxbid',
    //       'jslxid',
    //       'jcid',
    //       'jsid',
    //       'checkstatus',
    //       'checkuserid',
    //       'checktime',
    //       'checktid',
    //       'cjstatus',
    //       'terminalid',
    //       'fixedjsid',
    //       'wtime'
    //     )
    //   )
    // },
  },
}
</script>