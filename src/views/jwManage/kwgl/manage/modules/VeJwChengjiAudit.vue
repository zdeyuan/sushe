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
      <a-button type="primary" @click="handleOk">提交</a-button>
    </template>
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-row :gutter="24">

          <a-col :md="24" :sm="24">
            <div style="height: 40px; background-color: #66c3fe; padding: 10px; color: white; margin: 10px">
              <span>基本信息</span>
            </div>
          </a-col>
          <a-row :gutter="24">
            <a-col :md="12" :sm="24">
              <a-form-item label="姓名" :labelCol="labelCol" :wrapperCol="wrapperCol">
                {{model.xm}}
              </a-form-item>
            </a-col>
            <a-col :md="12" :sm="24">
              <a-form-item label="学号" :labelCol="labelCol" :wrapperCol="wrapperCol">
                {{model.xh == null || model.xh == '' ? ' ':model.xh}}
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :md="12" :sm="24">
              <a-form-item label="院系" :labelCol="labelCol" :wrapperCol="wrapperCol">
                {{model.falidName}}
              </a-form-item>
            </a-col>
            <a-col :md="12" :sm="24">
              <a-form-item label="专业" :labelCol="labelCol" :wrapperCol="wrapperCol">
                {{model.specidName}}
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :md="12" :sm="24">
              <a-form-item label="年级" :labelCol="labelCol" :wrapperCol="wrapperCol">
                {{model.gradeidName}}
              </a-form-item>
            </a-col>
            <a-col :md="12" :sm="24">
              <a-form-item label="学期" :labelCol="labelCol" :wrapperCol="wrapperCol">
                {{model.semidName}}
              </a-form-item>
            </a-col>
          </a-row>
          <a-col :md="12" :sm="24">
            <a-form-item label="课程" :labelCol="labelCol" :wrapperCol="wrapperCol">
              {{model.kcidDictText}}
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="行政班" :labelCol="labelCol" :wrapperCol="wrapperCol">
              {{model.xzbidName}}
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="考试日期" :labelCol="labelCol" :wrapperCol="wrapperCol">
              {{model.ksrq}}
            </a-form-item>
          </a-col>
          <!--          <a-col :md="24" :sm="24">-->
          <!--            <a-form-item label="教学班" :labelCol="labelCol" :wrapperCol="wrapperCol">-->
          <!--              {{model.jxbidDictText}}-->
          <!--            </a-form-item>-->
          <!--          </a-col>-->
          <!--          <a-col :md="12" :sm="24">-->
          <!--            <a-form-item label="录入时间" :labelCol="labelCol" :wrapperCol="wrapperCol">-->
          <!--              <j-date-->
          <!--                placeholder="请选择成绩录入日期时间（原日期时间合并）"-->
          <!--                v-decorator="['cjlrrqsj', validatorRules.cjlrrqsj]"-->
          <!--                :trigger-change="true"-->
          <!--                style="width: 100%"-->
          <!--              />-->
          <!--            </a-form-item>-->
          <!--          </a-col>-->
          <!--          <a-col :md="12" :sm="24">-->
          <!--            <a-form-item label="状态" :labelCol="labelCol" :wrapperCol="wrapperCol">-->
          <!--              <j-dict-select-tag-->
          <!--                dict-code="kwgl_auditStatus"-->
          <!--                v-decorator="['auditstatus', validatorRules.auditstatus]"-->
          <!--                placeholder="请输入职业认证考试"-->
          <!--                style="width: 100%"-->
          <!--              />-->
          <!--            </a-form-item>-->
          <!--          </a-col>-->
        </a-row>
        <a-row :gutter="24">
          <a-col :md="24" :sm="24">
            <div style="height: 40px; background-color: #66c3fe; padding: 10px; color: white; margin: 10px">
              <span>成绩信息</span>
            </div>
          </a-col>
          <a-col :md="24" :sm="24">
            <a-form-item label="课程成绩" :labelCol="labelCol" :wrapperCol="wrapperCol" v-if="ksxsid == 1">
              {{model.kccj}}
              <!--              <a-input-number v-decorator="['kccj', validatorRules.kccj]" style="width: 100%" />-->
            </a-form-item>
          </a-col>
          <a-col :md="24" :sm="24">
            <a-form-item label="课程成绩/等级" :labelCol="labelCol" :wrapperCol="wrapperCol" v-if="ksxsid == 2">
              {{model.kcdjcjmDictText}}
              <!--              <j-dict-select-tag v-decorator="['kcdjcjm', validatorRules.kcdjcjm]" dict-code="kwgl_level" style="width: 100%" />-->
            </a-form-item>
          </a-col>
        </a-row>

        <a-col :md="24" :sm="24" v-if="auditstatus != 0">
          <div style="height: 40px; background-color: #66c3fe; padding: 10px; color: white; margin: 10px">
            <span>审核结果</span>
          </div>
        </a-col>
        <a-col :md="24" :sm="24">
          <a-form-item label="审核" :labelCol="labelCol" :wrapperCol="wrapperCol" v-if="auditstatus != 1">
            <a-radio-group v-decorator="['auditstatus', validatorRules.auditstatus]">
              <a-radio :value="1">通过</a-radio>
              <a-radio :value="2">不通过</a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>
        <a-col :md="24" :sm="24" v-if="auditstatus != 1">
          <a-form-item label="原因" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-textarea v-decorator="['audittidText', validatorRules.audittidText]" style="width: 100%" />
          </a-form-item>
        </a-col>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/common/manage'
  import pick from 'lodash.pick'
  import { validateDuplicateValue } from '@/utils/util'
  import JDate from '@/components/edu/JDate'
  import JDictSelectTag from '@/components/dict/JDictSelectTag'

  export default {
    name: 'VeJwChengjiModal',
    components: {
      JDate,
      JDictSelectTag
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
          sm: { span: 5 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 }
        },
        confirmLoading: false,
        validatorRules: {
          // jxrwid: { rules: [] },
          // ksxsid: { rules: [] },
          // xzid: { rules: [] },
          // hasexam: { rules: [] },
          // ksid: { rules: [] },
          // ksrq: { rules: [] },
          // falid: { rules: [] },
          // specid: { rules: [] },
          // gradeid: { rules: [] },
          // semid: { rules: [] },
          // kcid: { rules: [{ required: true, message: '请输入课程ID!' }] },
          // stuid: { rules: [{ required: true, message: '请输入学生ID!' }] },
          // userid: { rules: [] },
          // xh: { rules: [{ required: true, message: '请输入学号!' }] },
          // xm: { rules: [] },
          // xzbid: { rules: [] },
          // jxbid: { rules: [] },
          // ksrqsj: { rules: [] },
          // pscj: { rules: [] },
          // fslkscj: { rules: [] },
          // djlkscj: { rules: [] },
          // kccj: { rules: [] },
          // kcdjcjm: { rules: [] },
          // jgcj: { rules: [] },
          // sfjg: { rules: [] },
          // teacherid: { rules: [] },
          // rkjsgh: { rules: [] },
          // recorduserid: { rules: [] },
          // cjlrrh: { rules: [] },
          // cjlrrqsj: { rules: [] },
          // auditstatus: { rules: [] },
          // audituserid: { rules: [] },
          // audittime: { rules: [] },
          // audittid: { rules: [] },
          // terminalid: { rules: [{ required: true, message: '请输入终端ID!' }] },
        },
        url: {
          add: '/kwgl/veJwChengji/add',
          edit: '/kwgl/veJwChengji/audit'
        }
      }
    },
    created() {
    },
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
        // this.$emit('close')
        // this.visible = false
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
      }
    }
  }
</script>