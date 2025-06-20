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
            <a-form-item label="学期" :labelCol="labelCol" :wrapperCol="wrapperCol">
<!--              <a-input v-decorator="['semid']"></a-input>-->
              {{model.semidName}}
<!--              <a-input v-decorator="['semid']"></a-input>-->
            </a-form-item>
          </a-col>
          <a-col :md="24" :sm="24">
            <a-form-item label="课程" :labelCol="labelCol" :wrapperCol="wrapperCol">
              {{model.kcidDictText}}
<!--              <a-input v-decorator="['kcidDictText']"></a-input>-->
            </a-form-item>
          </a-col>
          <a-col :md="24" :sm="24">
<!--            教学班-->
            <a-form-item label="行政班" :labelCol="labelCol" :wrapperCol="wrapperCol">
<!--              <a-input v-decorator="['jxbid']"></a-input>-->
              {{model.bjidName}}
            </a-form-item>
          </a-col>
          <a-col :md="24" :sm="24">
            <a-form-item label="课程总分" :labelCol="labelCol" :wrapperCol="wrapperCol">
              {{model.ksfs}}
<!--              <a-input v-decorator="['ksfs']"></a-input>-->
            </a-form-item>
          </a-col>
          <a-col :md="24" :sm="24">
            <a-form-item label="考试时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
              {{model.ksrq}}
            </a-form-item>
          </a-col>
		  <a-col :md="24" :sm="24">
		    <a-form-item label="成绩模板下载" :labelCol="labelCol" :wrapperCol="wrapperCol">
		      <a  href="/excel/成绩模板.xls">模板下载</a>
		    </a-form-item>
		  </a-col>
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
  name: 'VeJwCjPutinModal',
  mixins: [EduListMixin],
  components: {
    JDate,
    JDictSelectTag,
  },
  data() {
    return {
      form: this.$form.createForm(this),
      title: '操作',
      disableMixinCreated: true,
      width: 800,
      visible: false,
      ksid: null,
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
        add: '/kwgl/veJwChengji/add',
        edit: '/kwgl/veJwChengji/edit',
        exportXls: '/kwgl/veJwChengji/exportXlsKaoshi',
        importExcelUrl: '/kwgl/veJwChengji/importExcelKaoshi',
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
    edit(record) {
      this.ksid = record.id
      this.kcmc = record.kcidDictText
      this.form.resetFields()
      this.model = Object.assign({}, record)
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(this.model, 'kcmc', 'kcidDictText', 'kcid', 'ksrqsj', 'jxbid', 'semid'))
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
      formData.append('ksid',this.ksid);
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

    putout(fileName) {
      if (!fileName || typeof fileName != 'string') {
        fileName = this.kcmc + '-考试成绩信息'
      }
      let param = {
        ksid: this.ksid,
      }
      console.log('导出参数', param)
      downFile(this.url.exportXls, param).then((data) => {
        if (!data) {
          this.$message.warning('文件下载失败')
          return
        }
        if (typeof window.navigator.msSaveBlob !== 'undefined') {
          window.navigator.msSaveBlob(new Blob([data], { type: 'application/vnd.ms-excel' }), fileName + '.xls')
        } else {
          let url = window.URL.createObjectURL(new Blob([data], { type: 'application/vnd.ms-excel' }))
          let link = document.createElement('a')
          link.style.display = 'none'
          link.href = url
          link.setAttribute('download', fileName + '.xls')
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link) //下载完成移除元素
          window.URL.revokeObjectURL(url) //释放掉blob对象
        }
      })
    },
  },
}
</script>