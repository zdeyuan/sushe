<template>
  <a-modal
    :title="title"
    :width="width"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-row :gutter="24">
          <a-col :md="24" :sm="24">
            <a-form-item label="学期ID" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number
                v-decorator="['semid', validatorRules.semid]"
                placeholder="请输入学期ID"
                style="width: 100%"
              />
            </a-form-item>
          </a-col>
          <a-col :md="24" :sm="24">
            <a-form-item label="教学班ID" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number
                v-decorator="['jxbid', validatorRules.jxbid]"
                placeholder="请输入教学班ID"
                style="width: 100%"
              />
            </a-form-item>
          </a-col>
          <a-col :md="24" :sm="24">
            <a-form-item label="课程" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-search
                v-model="jcid"
                ref="course"
                v-decorator="['kcid', validatorRules.kcid]"
                readOnly
                unselectable="on"
                @search="onSearchCourse"
              >
                <a-button slot="enterButton" :disabled="disabled">选择</a-button>
              </a-input-search>
            </a-form-item>
          </a-col>
          <a-col :md="24" :sm="24">
            <a-form-item label="考试日期" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-date v-decorator="['ksrq', validatorRules.ksrq]" placeholder="请输入考试日期" date-format="YYYY-MM-DD"></j-date>
            </a-form-item>
          </a-col>

          <a-col :md="24" :sm="24">
            <a-form-item label="学生姓名" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['xm', validatorRules.xm]" placeholder="请输入学生姓名"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="24" :sm="24">
            <a-form-item label="课程成绩" :labelCol="labelCol" :wrapperCol="wrapperCol" v-if="ksxsid == 1">
              <a-input-number v-decorator="['kccj', validatorRules.kccj]" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :md="24" :sm="24">
            <a-form-item label="课程成绩/等级" :labelCol="labelCol" :wrapperCol="wrapperCol" v-if="ksxsid == 2">
              <j-dict-select-tag v-decorator="['kcdjcjm', validatorRules.kcdjcjm]" dict-code="kwgl_level" style="width: 100%" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <div style="height: 160px; background-color: #e5f3fc; padding: 10px; color: #5f91af">
        <span>温馨提示</span> <br /><br />
        <span
          >①教学任务的考试形式为[考试]时,成绩的数值范围为0~100，超出该范围，则会被设置为0;考试形式为[考查]时，请选择对应的成绩等级。</span
        ><br />
        <span>②若无关联的考试信息，成绩需填写0。</span><br />
        <span>③.成绩录入完成后，请选择教学任务成绩的录入状态。</span>
      </div>
    </a-spin>
    <jw-jiaocai-select-course ref="selectForm" @ok="modalFormOk"></jw-jiaocai-select-course>
  </a-modal>
</template>

<script>
import { httpAction } from '@/api/common/manage'
import pick from 'lodash.pick'
import { validateDuplicateValue } from '@/utils/util'
import JDate from '@/components/edu/JDate'
import JwJiaocaiSelectCourse from '@/views/jwManage/jxzy/modules/JwJiaocaiSelectCourse'
import JDictSelectTag from '@/components/dict/JDictSelectTag'


export default {
  name: 'VeJwChengjiEditModal',
  components: {
    JDate,
    JwJiaocaiSelectCourse,
    JDictSelectTag,
  },
  data() {
    return {
      form: this.$form.createForm(this),
      title: '操作',
      width: 800,
      visible: false,
      ksxsid: null,
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
        jxrwid: { rules: [] },
        ksxsid: { rules: [] },
        xzid: { rules: [] },
        hasexam: { rules: [] },
        ksid: { rules: [] },
        ksrq: { rules: [] },
        falid: { rules: [] },
        specid: { rules: [] },
        gradeid: { rules: [] },
        semid: { rules: [] },
        kcid: { rules: [{ required: true, message: '请输入课程ID!' }] },
        stuid: { rules: [{ required: true, message: '请输入学生ID!' }] },
        userid: { rules: [] },
        xh: { rules: [{ required: true, message: '请输入学号!' }] },
        xm: { rules: [] },
        xzbid: { rules: [] },
        jxbid: { rules: [] },
        ksrqsj: { rules: [] },
        pscj: { rules: [] },
        fslkscj: { rules: [] },
        djlkscj: { rules: [] },
        kccj: { rules: [] },
        kcdjcjm: { rules: [] },
        jgcj: { rules: [] },
        sfjg: { rules: [] },
        teacherid: { rules: [] },
        rkjsgh: { rules: [] },
        recorduserid: { rules: [] },
        cjlrrh: { rules: [] },
        cjlrrqsj: { rules: [] },
        auditstatus: { rules: [] },
        audituserid: { rules: [] },
        audittime: { rules: [] },
        audittid: { rules: [] },
        terminalid: { rules: [{ required: true, message: '请输入终端ID!' }] },
      },
      url: {
        add: '/kwgl/veJwChengji/add',
        edit: '/kwgl/veJwChengji/edit',
      },
    }
  },
  created() {},
  methods: {
    add() {
      this.edit({})
    },
    edit(record) {
      this.ksxsid = record.ksxsid
      this.form.resetFields()
      this.model = Object.assign({}, record)
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue(
          pick(
            this.model,
            'jxrwid',
            'ksxsid',
            'xzid',
            'hasexam',
            'ksid',
            'ksrq',
            'falid',
            'specid',
            'gradeid',
            'semid',
            'kcid',
            'kcid_dictText',
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
          'jxrwid',
          'ksxsid',
          'xzid',
          'hasexam',
          'ksid',
          'ksrq',
          'falid',
          'specid',
          'gradeid',
          'semid',
          'kcid',
          'kcid_dictText',
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

    onSearchCourse() {
      this.$refs.selectForm.show()
    },

    modalFormOk(row, id) {
      console.log('当前选中课程id', id)
      this.$refs.course.value = row.kcmc

      this.form.setFieldsValue(pick({ kcid: id }, 'kcid'))
    },
  },
}
</script>