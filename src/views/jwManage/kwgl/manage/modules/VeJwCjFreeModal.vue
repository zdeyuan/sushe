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
    <template slot="footer">
      <a-button @click="handleCancel">关闭</a-button>
    </template>
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-row :gutter="24">
          <a-col :md="24" :sm="24">
            <div style="height: 40px; background-color: #66c3fe; padding: 10px; color: white; margin: 10px">
              <span>基本信息</span>
            </div>
          </a-col>

          <a-col :md="10" :sm="24" style="margin-left: 12%">
            <a-form-item label="姓名" :labelCol="labelCol" :wrapperCol="wrapperCol">
              {{model.xm}}
<!--              <a-input v-decorator="['xm']"></a-input>-->
            </a-form-item>
          </a-col>
          <a-col :md="10" :sm="24">
            <a-form-item label="学号" :labelCol="labelCol" :wrapperCol="wrapperCol">
              {{model.xh}}
<!--              <a-input v-decorator="['xh']"></a-input>-->
            </a-form-item>
          </a-col>
          <a-col :md="10" :sm="24" style="margin-left: 12%">
            <a-form-item label="年级" :labelCol="labelCol" :wrapperCol="wrapperCol">
              {{model.gradeidName}}
<!--              <a-input v-decorator="['grade']"></a-input>-->
            </a-form-item>
          </a-col>
          <a-col :md="10" :sm="24">
            <a-form-item label="学期" :labelCol="labelCol" :wrapperCol="wrapperCol">
              {{model.semidName}}
<!--              <a-input v-decorator="['semester']"></a-input>-->
            </a-form-item>
          </a-col>
          <a-col :md="24" :sm="24">
            <a-form-item label="课程" :labelCol="labelCol" :wrapperCol="wrapperCol">
              {{model.kcidDictText}}
<!--              <j-dict-select-tag dict-code="edu_dev_open.ve_jw_kecheng,KCMC,id" v-decorator="['kcid']"></j-dict-select-tag>-->
            </a-form-item>
          </a-col>
          <a-col :md="24" :sm="24" v-if="auditstatus != 0">

            <a-form-item label="考试" :labelCol="labelCol" :wrapperCol="wrapperCol">
<!--              <div style="width: 600px">-->
                {{model.ksidDictText}}
<!--              </div>-->
<!--              <a-input v-decorator="['ksidDictText']"></a-input>-->
            </a-form-item>
          </a-col>
          <a-col :md="24" :sm="24">
            <div style="height: 40px; background-color: #66c3fe; padding: 10px; color: white; margin: 10px">
              <span>免缓缺信息</span>
            </div>
          </a-col>
          <a-col :md="24" :sm="24">
            <a-form-item label="类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
                {{model.typeDictText}}
<!--              <j-dict-select-tag dict-code="kwgl_free_type" v-decorator="['type']"></j-dict-select-tag>-->
            </a-form-item>
          </a-col>
          <a-col :md="24" :sm="24">
            <a-form-item label="原因" :labelCol="labelCol" :wrapperCol="wrapperCol">
              {{model.reasontidText }}
            </a-form-item>
          </a-col>
          <a-col :md="24" :sm="24">
            <div style="height: 40px; background-color: #66c3fe; padding: 10px; color: white; margin: 10px">
              <span>成绩信息</span>
            </div>
          </a-col>
<!--          <a-col :md="12" :sm="24">-->
<!--            <a-form-item label="成绩类型" :labelCol="labelCol" :wrapperCol="wrapperCol">-->
<!--              <sapn>占成绩的百分比</sapn>-->
<!--            </a-form-item>-->
<!--          </a-col>-->
<!--          <a-col :md="12" :sm="24">-->
<!--            <a-form-item label="分数" :labelCol="labelCol" :wrapperCol="wrapperCol"> </a-form-item>-->
<!--          </a-col>-->
          <a-col :md="10" :sm="24" style="margin-left: 12%">
            <a-form-item label="成绩类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <sapn>占成绩的百分比</sapn>
            </a-form-item>
            <a-form-item label="成绩等级" :labelCol="labelCol" :wrapperCol="wrapperCol">
              {{model.freeXs!=null ? model.freeXs.ratio:''}}
<!--              <a-input-number v-decorator="['freeXs.ratio']" style="width: 100%" v-model="reason" />-->
            </a-form-item>
          </a-col>
          <a-col :md="10" :sm="24">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" style="padding-left: 35px">
              <sapn >分数</sapn>
            </a-form-item>
            <a-form-item label="分数" :labelCol="labelCol" :wrapperCol="wrapperCol">
              {{model.freeXs!=null ? model.freeXs.score:''}}
<!--              <a-input-number v-decorator="['freeXs.score']" style="width: 100%" v-model="reason" />-->
            </a-form-item>
          </a-col>
          <a-col :md="24" :sm="24" v-if="ksxsid == 1">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="课程成绩">
              {{model.kccj}}
<!--              <a-input v-decorator="['kccj']" style="width: 100%" />-->
            </a-form-item>
          </a-col>
          <a-col :md="24" :sm="24">
            <a-form-item label="课程成绩/等级" :labelCol="labelCol" :wrapperCol="wrapperCol" v-if="ksxsid == 2">
              <j-dict-select-tag
                v-decorator="['kcdjcjm', validatorRules.kcdjcjm]"
                dict-code="kwgl_level"
                style="width: 100%"
                disabled="true"
              />
            </a-form-item>
          </a-col>
          <a-col :md="24" :sm="24" v-if="auditstatus != 0">
            <div style="height: 40px; background-color: #66c3fe; padding: 10px; color: white; margin: 10px">
              <span>审核结果</span>
            </div>
          </a-col>
          <a-col :md="24" :sm="24">
            <a-form-item label="审核结果" :labelCol="labelCol" :wrapperCol="wrapperCol" v-if="auditstatus != 0">
              {{model.auditstatusDictText}}
            </a-form-item>
          </a-col>
          <a-col :md="24" :sm="24" v-if="model.auditstatus != 1">
            <a-form-item label="原因" :labelCol="labelCol" :wrapperCol="wrapperCol">
              {{model.audittidTextText}}
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
  name: 'VeJwCjFreeModal',
  components: {},
  data() {
    return {
      form: this.$form.createForm(this),
      title: '操作',
      width: 800,
      visible: false,
      auditstatus: null,
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
        hasexam: { rules: [] },
        ksid: { rules: [{ required: true, message: '请输入考试ID!' }] },
        stuid: { rules: [{ required: true, message: '请输入学生ID!' }] },
        userid: { rules: [] },
        xh: { rules: [{ required: true, message: '请输入学号!' }] },
        xm: { rules: [{ required: true, message: '请输入学生姓名!' }] },
        falid: { rules: [{ required: true, message: '请输入院系ID!' }] },
        specid: { rules: [] },
        gradeid: { rules: [] },
        semid: { rules: [] },
        kcid: { rules: [{ required: true, message: '请输入课程ID!' }] },
        jxbid: { rules: [] },
        xzbid: { rules: [] },
        ksrq: { rules: [] },
        pscj: { rules: [] },
        fslkscj: { rules: [] },
        kccj: { rules: [] },
        kcdjcjm: { rules: [] },
        type: { rules: [{ required: true, message: '请输入免缓缺类型（1=免考，2=缓考，3=缺考）!' }] },
        reasontid: { rules: [{ required: true, message: '请输入免缓缺登记的原因（大文本字段ID）!' }] },
        createuserid: { rules: [{ required: true, message: '请输入登记用户ID!' }] },
        createtime: { rules: [{ required: true, message: '请输入登记时间!' }] },
        auditstatus: { rules: [] },
        audituserid: { rules: [] },
        audittid: { rules: [] },
        terminalid: { rules: [{ required: true, message: '请输入终端ID!' }] },
      },
      url: {
        add: '/kwgl/veJwCjFree/add',
        edit: '/kwgl/veJwCjFree/edit',
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
      this.auditstatus = record.auditstatus
      this.model = Object.assign({}, record)
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue(
          pick(
            this.model,
            'jxrwid',
            'ksxsid',
            'hasexam',
            'ksid',
            'ksidDictText',
            'stuid',
            'userid',
            'xh',
            'xm',
            'falid',
            'specid',
            'gradeid',
            'semid',
            'kcid',
            'jxbid',
            'xzbid',
            'ksrq',
            'pscj',
            'fslkscj',
            'kccj',
            'kcdjcjm',
            'type',
            'reasontid',
            'createuserid',
            'createtime',
            'auditstatus',
            'audituserid',
            'audittid',
            'terminalid',
            'freeXs'
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
          'hasexam',
          'ksid',
          'stuid',
          'userid',
          'xh',
          'xm',
          'falid',
          'specid',
          'gradeid',
          'semid',
          'kcid',
          'jxbid',
          'xzbid',
          'ksrq',
          'pscj',
          'fslkscj',
          'kccj',
          'kcdjcjm',
          'type',
          'reasontid',
          'createuserid',
          'createtime',
          'auditstatus',
          'audituserid',
          'audittid',
          'terminalid'
        )
      )
    },
  },
}
</script>