<template>
  <a-spin :spinning="confirmLoading">
    <j-form-container :disabled="formDisabled">
      <a-form :form="form" slot="detail">
        <a-row>
          <a-col :span="24">
            <a-form-item label="导入模板" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <div @click="info.downFunc" class="href-txt" style="padding-left: 2px">点击下载</div>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="选择Excel表格:" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-upload accept=".xls,.xlsx" :file-list="fileList" :remove="handleRemove" :before-upload="beforeUpload">
                <a-button> <a-icon type="upload" /> 选择文件 </a-button>
              </a-upload>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </j-form-container>
  </a-spin>
</template>

<script>
import { httpAction, getAction, downFile } from '@/api/common/manage'
import reqwest from 'reqwest'
import pick from 'lodash.pick'

import { validateDuplicateValue } from '@/utils/util'

export default {
  name: 'HqHrChengfaForm',
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
      fileList: [],
      uploading: false,
      info: {
        tokenHeader: {},
        downFunc: () => {},
      },

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
        //   rules: [
        //     { required: true, message: '请输入工号!' }
        //   ]
        // },
        // xm: {
        //   rules: [
        //     { required: true, message: '请输入姓名!' }
        //   ]
        // },
        ccmcm: {
          rules: [{ required: true, message: '请输入惩处名称!' }],
        },
        jlcfm: {
          rules: [{ required: true, message: '请输入纪律处分码!' }],
        },
        ccyy: {
          rules: [{ required: true, message: '请输入惩处原因!' }],
        },
        ccnr: {
          rules: [{ required: true, message: '请输入惩处内容!' }],
        },
        ccwh: {
          rules: [{ required: true, message: '请输入惩处文号!' }],
        },
        ccrq: {
          rules: [{ required: true, message: '请选择惩处日期!' }],
        },
        ccdw: {
          rules: [{ required: true, message: '请输入惩处单位!' }],
        },
      },
      url: {
        add: '/hr/rewardpublish/hqHrChengfa/add',
        edit: '/hr/rewardpublish/hqHrChengfa/edit',
        queryById: '/hr/rewardpublish/hqHrChengfa/queryById',
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
    edit(info) {
      this.info = info
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
    handleRemove(file) {
      const index = this.fileList.indexOf(file)
      const newFileList = this.fileList.slice()
      newFileList.splice(index, 1)
      this.fileList = newFileList
    },
    beforeUpload(file) {
      this.fileList = [...this.fileList, file]
      return false
    },
    handleUpload() {
      if (this.fileList.length <= 0) {
        this.$message.warn('请选择要上传的excel表格!')
        return
      }
      const { fileList } = this
      const formData = new FormData()
      fileList.forEach((file) => {
        formData.append('files[]', file)
      })

      this.uploading = true
      this.confirmLoading = true
      reqwest({
        url: this.info.importExcelUrl,
        method: 'post',
        headers: this.info.tokenHeader,
        processData: false,
        data: formData,
        success: (e) => {
          if (e.success) {
            this.fileList = []
            this.uploading = false
            this.confirmLoading = false
            this.$message.success(e.message)
            this.$emit('ok')
          } else {
            this.uploading = false
            this.confirmLoading = false
            this.$message.error(e.message)
          }
        },
        error: () => {
          this.uploading = false
          this.confirmLoading = false
          this.$message.error('导入失败！')
        },
      })
    },
    submitForm() {
      this.handleUpload()
    },
    popupCallback(row) {
      this.form.setFieldsValue(
        pick(row, 'gh', 'xm', 'ccmcm', 'jlcfm', 'ccyy', 'ccnr', 'ccwh', 'ccdw', 'ccrq', 'cccxrq', 'cccxwh', 'cccxyy')
      )
    },
  },
}
</script>