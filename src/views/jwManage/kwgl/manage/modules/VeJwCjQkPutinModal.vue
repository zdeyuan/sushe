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
          <a-col :md="24" :sm="24">
            <a-form-item label="课程" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['kcmc']"></a-input>
            </a-form-item>
          </a-col>

          <a-col :md="24" :sm="24">
            <a-form-item label="课程总分" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-model="ksfs"></a-input>
            </a-form-item>
          </a-col>
<!--          <a-col :md="24" :sm="24">-->
<!--            <a-form-item label="考试时间" :labelCol="labelCol" :wrapperCol="wrapperCol">-->
<!--              <j-date v-decorator="ksrqsj" date-format="YYYY-MM-DD HH:mm:ss" />-->
<!--            </a-form-item>-->
<!--          </a-col>-->
          <a-col :md="24" :sm="24">
            <a-form-item label="可导入的成绩" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <input v-if="visible" style="height: 40px" type="file" id="inputFile" accept=".xls,.xlsx"></input>
<!--              <span style="margin-right: 10px">期末成绩</span>-->
<!--              <a-upload-->
<!--                name="file"-->
<!--                :showUploadList="false"-->
<!--                :multiple="false"-->
<!--                :headers="tokenHeader"-->
<!--                :action="importExcelUrl"-->
<!--                @change="handleImportExcel"-->
<!--              >-->
<!--                <a>选择文件</a>-->
<!--              </a-upload>-->
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { httpAction } from '@/api/common/manage'
import { EduListMixin } from '@/mixins/EduListMixin'
import pick from 'lodash.pick'
import { validateDuplicateValue } from '@/utils/util'
import JDate from '@/components/edu/JDate'
import JDictSelectTag from '@/components/dict/JDictSelectTag'
import { postAction, downFile } from '@/api/common/manage'

export default {
  name: 'VeJwCjBkPutinModal',
  mixins: [EduListMixin],
  components: {
    JDate,
    JDictSelectTag,
  },
  data() {
    return {
      form: this.$form.createForm(this),
      disableMixinCreated: true,
      title: '操作',
      width: 800,
      visible: false,
      bkid: null,
      kcid: null,
      ksfs: null,
      kcmc: null,
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
        add: '/kwgl/veJwCjQingkao/add',
        edit: '/kwgl/veJwCjQingkao/edit',
        exportXls: '/kwgl/veJwCjQingkao/exportXls',
        importExcelUrl: '/kwgl/veJwCjQingkao/importExcel',
      },
    }
  },
  computed: {
    importExcelUrl: function () {
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
    },
  },
  created() {},
  methods: {
    add() {
      this.edit({})
    },
    edit(ksfs, record) {
      this.ksfs = ksfs
      this.bkid = record.id
      this.kcid = record.kcid
      console.log('bkid:' + this.bkid)
      this.kcmc = record.kcmc
      this.form.resetFields()
      this.model = Object.assign({}, record)
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(this.model, 'kcmc', 'kcidDictText', 'kcid', 'ksrqsj'))
      })
    },
    close() {
      this.$emit('close')
      this.visible = false
    },
    handleOk() {
      const that = this
      if( document.getElementById("inputFile").files == null ||document.getElementById("inputFile").files.length == 0 ){
        that.$message.warning('未选择文件')
        return;
      }
      let formData = new FormData();
      let fileObj = document.getElementById("inputFile").files[0];
      formData.append('file', fileObj);
      formData.append('kcid',this.kcid);
      that.confirmLoading = true
      let httpurl = ''
      let method = ''
      httpurl += this.url.importExcelUrl
      method = 'post'
      httpAction(httpurl, formData, method).then((res) => {
        if (res.success) {
          that.$message.success(res.message)
          that.$emit('ok')
          that.close()
        } else {
          that.$message.warning(res.message)
        }
      }).finally(() => {
        that.confirmLoading = false
      })
      // const that = this
      // // 触发表单验证
      // this.form.validateFields((err, values) => {
      //   if (!err) {
      //     that.confirmLoading = true
      //     let httpurl = ''
      //     let method = ''
      //     if (!this.model.id) {
      //       httpurl += this.url.add
      //       method = 'post'
      //     } else {
      //       httpurl += this.url.edit
      //       method = 'put'
      //     }
      //     let formData = Object.assign(this.model, values)
      //     console.log('表单提交数据', formData)
      //     httpAction(httpurl, formData, method)
      //       .then((res) => {
      //         if (res.success) {
      //           that.$message.success(res.message)
      //           that.$emit('ok')
      //         } else {
      //           that.$message.warning(res.message)
      //         }
      //       })
      //       .finally(() => {
      //         that.confirmLoading = false
      //         that.close()
      //       })
      //   }
      // })

      this.$emit('close')
      this.visible = false
    },
    handleCancel() {
      this.close()
    },
    popupCallback(row) {
      this.form.setFieldsValue(
        pick(
          row,
          'jxrwid',
          'ksxsid',
          'xzid',
          'hasexam',
          'ksid',
          'ksidDictText',
          'ksrq',
          'falid',
          'specid',
          'gradeid',
          'semid',
          'kcid',
          'stuid',
          'userid',
          'xh',
          'xm',
          'xzbid',
          'jxbid',
          'ksrqsj',
          'pscj',
          'fslkscj',
          'djlkscj',
          'kccj',
          'kcdjcjm',
          'jgcj',
          'sfjg',
          'teacherid',
          'rkjsgh',
          'recorduserid',
          'cjlrrh',
          'cjlrrqsj',
          'auditstatus',
          'audituserid',
          'audittime',
          'audittid',
          'terminalid'
        )
      )
    },
  },
}
</script>