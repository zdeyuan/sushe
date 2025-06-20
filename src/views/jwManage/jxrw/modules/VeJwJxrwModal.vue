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
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item label="学年" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-select-grade v-decorator="['gradeid', validatorRules.year]" :trigger-change="true" ></j-select-grade>
        </a-form-item>

        <a-form-item label="学期" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-select-xueqi v-decorator="['semid', validatorRules.semid]" :trigger-change="true"></j-select-xueqi>
        </a-form-item>

        <a-form-item label="院系" :labelCol="labelCol" :wrapperCol="wrapperCol">

          <j-select-zyb placeholder="请选择院系" v-decorator="['falid', validatorRules.falid]" :trigger-change="true"
                        @change="zybChange"></j-select-zyb>
          <!--          <a-select v-decorator="['falid', validatorRules.falid]">-->
          <!--            <a-select-option :value="1"> 计算机与科学 </a-select-option>-->
          <!--          </a-select>-->
        </a-form-item>

        <a-form-item label="专业" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-select-zy-by-zyb ref="zyByZyb" v-decorator="['specid', validatorRules.specid]" :trigger-change="true"
                              @change="zyChange"></j-select-zy-by-zyb>
        </a-form-item>

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { httpAction } from '@/api/common/manage'
import pick from 'lodash.pick'
import { validateDuplicateValue } from '@/utils/util'
import JSelectGrade from '@/components/kwglbiz/JSelectGrade'
import JSelectXueqi from '@/components/kwglbiz/JSelectXueqi'
import JSelectZyb from '@/components/kwglbiz/JSelectZyb'
import JSelectZyByZyb from '@/components/kwglbiz/JSelectZyByZyb'
import JSelectBanjiByZy from '@/components/kwglbiz/JSelectBanjiByZy'
import JSelectJiaoxueKecheng from '@/components/kwglbiz/JSelectJiaoxueKecheng'
import JSelectJxbByZy from '@/components/kwglbiz/JSelectJxbByZy'
import JSelectTeacherUserId from '@/components/kwglbiz/JSelectTeacherUserId'
export default {
  name: 'VeJwJxrwModal',
  components: { JSelectJxbByZy,JSelectTeacherUserId, JSelectJiaoxueKecheng, JSelectBanjiByZy, JSelectZyByZyb, JSelectZyb, JSelectXueqi, JSelectGrade },
  data() {
    return {
      form: this.$form.createForm(this),
      title: '操作',
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
        year: { rules: [{ required: true, message: '请选择学年!' }] },
        semid: { rules: [{ required: true, message: '请选择学期!' }] },
        falid: { rules: [{ required: true, message: '请选择院系!' }] },
        specid: { rules: [{ required: true, message: '请选择专业!' }] },
      },
      url: {
        oneButtonPublishing: '/jxrw/veJwJxrw/oneButtonPublishing',
      },
    }
  },
  created() {},
  methods: {
    zybChange(code) {
      if (this.$refs.zyByZyb != null) {
        this.$refs.zyByZyb.initDictData(code)
      }
    },
    zyChange(code) {
      if (this.$refs.banjiByZy != null) {
        this.$refs.banjiByZy.initDictData(code,this.form.getFieldValue("gradeid"),this.form.getFieldValue("semid"))
      }
    },
    edit(record) {
      this.form.resetFields()
      this.model = Object.assign({}, record)
      this.visible = true;
	  // if(isNaN(record.xzbids)){
		 //  record.xzbids=[record.xzbids+''];
	  // }
	  
      this.$nextTick(() => {
        this.form.setFieldsValue(
          pick(
            this.model,
            'name',
            'jxjhid',
            'falid',
            'specid',
            'gradeid',
            'semid',
            'xzid',
            'kcid',
            'jyzid',
            'ksxsid',
            'xkrs',
            'sfhxkc',
            'kcflm',
            'kcsxm',
            'kcxz',
            'kcxf',
            'zxs',
            'createuserid',
            'createtime',
            'teacheruserid',
            'teachername',
            'ismergedclass',
            'type',
            'xzbids',
            'jslxid',
            'jcid',
            'jsid',
            'checkstatus',
            'checkuserid',
            'checktime',
            'checktid',
            'cjstatus',
            'terminalid',
            'fixedjsid'
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
          let formData = Object.assign(this.model, values)
          if(formData.xzbids){
			  formData.xzbids=formData.xzbids.join(',')
		  }
          httpAction(that.url.oneButtonPublishing, formData, 'post')
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
          'name',
          'jxjhid',
          'falid',
          'specid',
          'gradeid',
          'semid',
          'xzid',
          'kcid',
          'jyzid',
          'ksxsid',
          'xkrs',
          'sfhxkc',
          'kcflm',
          'kcsxm',
          'kcxz',
          'kcxf',
          'zxs',
          'createuserid',
          'createtime',
          'teacheruserid',
          'teachername',
          'ismergedclass',
          'xzbids',
          'type',
          'xzbids',
          'jslxid',
          'jcid',
          'jsid',
          'checkstatus',
          'checkuserid',
          'checktime',
          'checktid',
          'cjstatus',
          'terminalid',
          'fixedjsid'
        )
      )
    },
  },
}
</script>