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
          <div style="background: rgb(103,194,252);color: white;padding: 10px;font-size: 18px;font-weight: bold">
            学生信息
          </div>
          <a-col :md="12" :sm="24">
            <a-form-item label="姓名" :labelCol="labelCol" :wrapperCol="wrapperCol">
              {{model.xm}}
            </a-form-item>
          </a-col>
          <a-col :md="12" sm="24">
            <a-form-item label="学号" :labelCol="labelCol" :wrapperCol="wrapperCol">
              {{model.xh}}
            </a-form-item>
          </a-col>

          <a-col :md="12" :sm="24">
            <a-form-item label="专业" :labelCol="labelCol" :wrapperCol="wrapperCol">
              {{model.specidName}}
            </a-form-item>
          </a-col>

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
          <a-col :md="12" :sm="24">
            <a-form-item label="行政班" :labelCol="labelCol" :wrapperCol="wrapperCol">
              {{model.xzbidName}}
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="课程" :labelCol="labelCol" :wrapperCol="wrapperCol">
              {{model.kcidDictText}}
            </a-form-item>
          </a-col>
          <a-col :md="24" :sm="24">
            <div style="background: rgb(103,194,252);color: white;padding: 10px;font-size: 18px;font-weight: bold">
              成绩信息
            </div>
          </a-col>
          <a-col :md="24" :sm="24">
            <a-form-item label="课程成绩" :labelCol="labelCol" :wrapperCol="wrapperCol"  v-if="ksxsid == 1">
              {{model.chengji.fslkscj}}
            </a-form-item>
          </a-col>
          <a-col :md="24" :sm="24">
            <a-form-item label="课程成绩/等级" :labelCol="labelCol" :wrapperCol="wrapperCol"  v-if="ksxsid == 2">
              {{model.chengji.djlkscj}}
            </a-form-item>
          </a-col>
          <a-col :md="24" :sm="24">
            <div style="background: rgb(103,194,252);color: white;padding: 10px;font-size: 18px;font-weight: bold">
              修改信息
            </div>
          </a-col>
          <a-col :md="24" :sm="24">
            <a-form-item label="课程成绩" :labelCol="labelCol" :wrapperCol="wrapperCol" v-if="ksxsid == 1">
              {{model.kccj}}
            </a-form-item>
          </a-col>
          <a-col :md="24" :sm="24">
            <a-form-item label="课程成绩/等级" :labelCol="labelCol" :wrapperCol="wrapperCol" v-if="ksxsid == 2">
              <j-dict-select-tag
                v-decorator="['kcdjcjm', validatorRules.kcdjcjm]"
                dict-code="kwgl_level"
                style="width: 100%;background: white"
                disabled="true"
              />
            </a-form-item>
          </a-col>
          <a-col :md="24" :sm="24">
<!--            v-if="ksxsid == 2"-->
            <a-form-item label="申请成绩修改的原因" :labelCol="labelCol" :wrapperCol="wrapperCol" >
              {{model.reasontidText}}
            </a-form-item>
          </a-col>

          <!-- <a-form-item label="申请成绩修改的原因（大文本字段ID）" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number
            v-decorator="['reasontid', validatorRules.reasontid]"
            placeholder="请输入申请成绩修改的原因（大文本字段ID）"
            style="width: 100%"
          />
        </a-form-item> -->
          <a-col :md="24" :sm="24">
            <div style="background: rgb(103,194,252);color: white;padding: 10px;font-size: 18px;font-weight: bold">
              审核信息
            </div>
          </a-col>
          <a-col :md="24" :sm="24">
            <a-form-item label="审核状态" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <!-- <a-input-number
            v-decorator="['auditstatus', validatorRules.auditstatus]"
            placeholder="请输入审核状态（0=待审核，1=通过，2=不通过）"
            style="width: 100%"
          /> -->
              <a-radio-group

                v-decorator="['auditstatus', validatorRules.auditstatus]"
                @change="auditChange"
              >
                <a-radio :value="1"> 通过 </a-radio>
                <a-radio :value="2"> 不通过 </a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>

          <a-col :md="24" :sm="24">
            <a-form-item label="不通过的原因" :labelCol="labelCol" :wrapperCol="wrapperCol" v-if="refuse">
              <a-textarea v-decorator="['audittidText', validatorRules.audittidText]" style="width: 100%" />
            </a-form-item>
<!--            <a-form-item label="终端ID" :labelCol="labelCol" :wrapperCol="wrapperCol">-->
<!--              <a-input-number-->
<!--                v-decorator="['terminalid', validatorRules.terminalid]"-->
<!--                placeholder="请输入终端ID"-->
<!--                style="width: 100%"-->
<!--              />-->
<!--            </a-form-item>-->
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
import JDate from '@/components/edu/JDate.vue'

export default {
  name: 'VeJwCjChangeStatus',
  components: { JDate },
  data() {
    return {
      form: this.$form.createForm(this),
      title: '编辑',
      refuse: false,
      ksxsid: null,
      width: 800,
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
        cjid: { rules: [] },
        ksxsid: { rules: [] },
        ksid: { rules: [] },
        kcid: { rules: [] },
        stuid: { rules: [] },
        userid: { rules: [] },
        xh: { rules: [] },
        xm: { rules: [] },
        falid: { rules: [] },
        specid: { rules: [] },
        xzid: { rules: [] },
        gradeid: { rules: [] },
        semid: { rules: [] },
        jxbid: { rules: [] },
        xzbid: { rules: [] },
        kccj: { rules: [] },
        kcdjcjm: { rules: [] },
        reasontid: { rules: [] },
        applyuserid: { rules: [{ required: true, message: '请输入申请用户ID!' }] },
        applytime: { rules: [{ required: true, message: '请输入申请时间!' }] },
        auditstatus: { rules: [] },
        audituserid: { rules: [] },
        audittime: { rules: [] },
        audittid: { rules: [] },
        terminalid: { rules: [{ required: true, message: '请输入终端ID!' }] },
        audittidText:{rules: [{ required: true, message: '请输入不通过原因!' }] },
      },
      url: {
        // add: '/kwgl/veJwCjChange/add',
        edit: '/kwgl/veJwCjChange/audit',
      },
    }
  },
  created() {},
  methods: {
    auditChange(e) {
      console.log(e.target.value)
      if (e.target.value == 2) {
        this.refuse = true
      } else {
        this.refuse = false
      }
    },

    add() {
      this.edit({})
    },
    edit(record) {
      this.form.resetFields()
      this.ksxsid = record.ksxsid
      this.model = Object.assign({}, record)
      this.visible = true
      if (record.auditstatus == 2) {
        this.refuse = true
      }
      this.$nextTick(() => {
        this.form.setFieldsValue(
          pick(
            this.model,
            'cjid',
            'ksxsid',
            'ksid',
            'kcid',
            'kcidDictText',
            'stuid',
            'userid',
            'xh',
            'xm',
            'falid',
            'specid',
            'xzid',
            'gradeid',
            'semid',
            'jxbid',
            'xzbid',
            'kccj',
            'kcdjcjm',
            'reasontid',
            'applyuserid',
            'applytime',
            'auditstatus',
            'audituserid',
            'audittime',
            'audittid',
            'terminalid',
            'chengji'
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
          'cjid',
          'ksxsid',
          'ksid',
          'kcid',
          'kcidDictText',
          'stuid',
          'userid',
          'xh',
          'xm',
          'falid',
          'specid',
          'xzid',
          'gradeid',
          'semid',
          'jxbid',
          'xzbid',
          'kccj',
          'kcdjcjm',
          'reasontid',
          'applyuserid',
          'applytime',
          'auditstatus',
          'audituserid',
          'audittime',
          'audittid',
          'terminalid',
          'chengji'
        )
      )
    },
  },
}
</script>