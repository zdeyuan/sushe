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
            <div style="height: 40px; background-color: #66c3fe; padding: 10px; color: white; margin: 10px">
              <span>基本信息</span>
            </div>
          </a-col>
          <a-col :md="24" :sm="24">
            <a-form-item label="课程" :labelCol="labelCol" :wrapperCol="wrapperCol">
              {{model.kcidDictText}}
<!--              <j-dict-select-tag-->
<!--                dict-code="edu_dev_open.ve_jw_kecheng,KCMC,id"-->
<!--                v-decorator="['kcid']"-->
<!--                disabled="true"-->
<!--              ></j-dict-select-tag>-->
            </a-form-item>
          </a-col>

          <a-col :md="24" :sm="24">
            <a-form-item label="姓名" :labelCol="labelCol" :wrapperCol="wrapperCol">
              {{model.xm}}
<!--              <a-input v-decorator="['xm', validatorRules.xm]" disabled="true"></a-input>-->
            </a-form-item>
          </a-col>
          <a-col :md="24" :sm="24">
            <a-form-item label="学号" :labelCol="labelCol" :wrapperCol="wrapperCol">
              {{model.xh}}
<!--              <a-input v-decorator="['xh']" disabled="true"></a-input>-->
            </a-form-item>
          </a-col>
          <a-col :md="24" :sm="24">
            <a-form-item label="课程成绩" :labelCol="labelCol" :wrapperCol="wrapperCol" v-if="ksxsid == 1">
              {{model.kccj}}
<!--              <a-input-number v-decorator="['kccj', validatorRules.kccj]" style="width: 100%" disabled="true" />-->
            </a-form-item>
          </a-col>
          <a-col :md="24" :sm="24">
            <a-form-item label="课程成绩/等级" :labelCol="labelCol" :wrapperCol="wrapperCol" v-if="ksxsid == 2">
              {{model.kcdjcjmDictText}}
<!--              <j-dict-select-tag-->
<!--                v-decorator="['kcdjcjm', validatorRules.kcdjcjm]"-->
<!--                dict-code="kwgl_level"-->
<!--                style="width: 100%"-->
<!--                disabled="true"-->
<!--              />-->
            </a-form-item>
          </a-col>
          <a-col :md="24" :sm="24">
            <div style="height: 40px; background-color: #66c3fe; padding: 10px; color: white; margin: 10px">
              <span>修改信息</span>
            </div>
          </a-col>
          <a-col :md="24" :sm="24">
            <a-form-item label="课程成绩" :labelCol="labelCol" :wrapperCol="wrapperCol" v-if="ksxsid == 1">
              <a-input-number v-decorator="['newkccj', validatorRules.newkccj]" style="width: 100%" v-model="newkccj"/>
            </a-form-item>
          </a-col>
          <a-col :md="24" :sm="24">
            <a-form-item label="课程成绩/等级" :labelCol="labelCol" :wrapperCol="wrapperCol" v-if="ksxsid == 2">
              <j-dict-select-tag
                :disabled="check"
                v-model="newkcdjcjm"
                dict-code="kwgl_level"
                style="width: 100%"
              />
            </a-form-item>
          </a-col>
          <a-col :md="24" :sm="24">
            <a-form-item label="修改原因" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-textarea v-decorator="['reasontidText', validatorRules.reasontidText]" style="width: 100%" v-model="reasontidText" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <div style="height: 140px; background-color: #e5f3fc; padding: 10px; color: #5f91af">
        <span>温馨提示</span> <br /><br />
        <span
          >①教学任务的考试形式为[考试]时,成绩的数值范围为0~100，超出该范围，则会被设置为0;考试形式为[考查]时，请选择对应的成绩等级。</span
        ><br />
        <span>②若无关联的考试信息，成绩需填写0。</span><br />
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
  name: 'VeJwCjChangeApply',
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
      newkccj: null,
      newkcdjcjm: null,
      reasontidText: null,
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
        newkccj: { rules: [{ required: true, message: '请输入修改成绩！' }] },
        newkcdjcjm: { rules: [{ required: true, message: '请输入修改成绩！' }] },
      },
      url: {
        changeApply: '/kwgl/veJwCjChange/add',
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
            'kcidDictText',
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
            'newkccj',
            'kcdjcjm',
            'newkcdjcjm',
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

          httpurl += this.url.changeApply
          method = 'post'

          console.log(this.newkccj)
          console.log(this.newkcdjcjm)
          console.log(this.reasontidText)
           let formData = Object.assign(this.model, values)

        //   console.log(formData),
        //   formData.cjid = this.id
        //   console.log(formData.cjid)
        //   if (this.ksxsid == 1) {
        //     formData.kccj = this.newkccj
        //     console.log('修改成绩：' + formData.kccj)
        //   } else if (this.ksxsid == 2) {
        //     formData.kcdjcjm = this.newkcdjcjm
        //     console.log('修改成绩：' + formData.kcdjcjm)
        //   }
        //   console.log('表单提交数据', formData)
          //修改字段

          httpAction(
            httpurl,
            {
              cjid: formData.id,
              ksxsid: formData.ksxsid,
              ksid: formData.ksid,
              kcid: formData.kcid,
              stuid: formData.stuid,
              userid: formData.userid,
              xh: formData.xh,
              xm: formData.xm,
              falid: formData.falid,
              specid: formData.specid,
              xzid: formData.xzid,
              gradeid: formData.gradeid,
              semid: formData.semid,
              jxbid: formData.jxbid,
              xzbid: formData.xzbid,
              kccj: this.newkccj,
              kcdjcjm: this.newkcdjcjm,
              reasontidText: this.reasontidText,
            },
            method
          )
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
          'kcidDictText',
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