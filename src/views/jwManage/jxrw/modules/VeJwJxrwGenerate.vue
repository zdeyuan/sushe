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
        <!-- <a-form-item  :labelCol="labelCol" :wrapperCol="wrapperCol" >
          <span style="color: red" >专业，班级皆未给表</span>
        </a-form-item> -->

        <a-form-item label="学年" :labelCol="labelCol" :wrapperCol="wrapperCol">
<!--          <j-dict-select-tag-->
<!--            type="list"-->
<!--            v-decorator="['year', validatorRules.year]"-->
<!--            :trigger-change="true"-->
<!--            dictCode="jxrw_years"-->
<!--          />-->
          <j-select-grade v-decorator="['gradeid', validatorRules.year]" :trigger-change="true" ></j-select-grade>
        </a-form-item>

        <a-form-item label="学期" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <!-- <j-dict-select-tag
            type="list"
            v-decorator="['semester', validatorRules.semester]"
            :trigger-change="true"
            dictCode="jxrw_semester"
          /> -->
          <j-select-xueqi v-decorator="['semid', validatorRules.semid]" :trigger-change="true"></j-select-xueqi>
          <!--          <a-select v-decorator="['semid', validatorRules.semid]">-->
          <!--            <a-select-option :value="19"> 2019-2020上学期 </a-select-option>-->
          <!--            <a-select-option :value="20"> 2019-2020下学期 </a-select-option>-->
          <!--            <a-select-option :value="23"> 2020-2021上学期 </a-select-option>-->
          <!--          </a-select>-->
        </a-form-item>
        <a-form-item label="院系" :labelCol="labelCol" :wrapperCol="wrapperCol">

          <j-select-zyb placeholder="请选择院系" v-decorator="['falid', validatorRules.falid]" :trigger-change="true"
                        @change="zybChange"></j-select-zyb>
        </a-form-item>
		
        <a-form-item label="专业" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-select-zy-by-zyb ref="zyByZyb" v-decorator="['specid', validatorRules.specid]" :trigger-change="true"
                              @change="zyChange"></j-select-zy-by-zyb>
        </a-form-item>

        <a-form-item label="班级"  :labelCol="labelCol" :wrapperCol="wrapperCol">
        	<j-select-banji-by-zy mode="multiple" style="width:300px" ref="banjiByZy" placeholder="请先选择班级"
        	                      v-decorator="['xzbids', validatorRules.xzbids]" :trigger-change="true"></j-select-banji-by-zy>
        </a-form-item>
        <a-form-item label="教师" :labelCol="labelCol" :wrapperCol="wrapperCol">
				  <j-select-teacher-user-id v-decorator="['teacheruserid', validatorRules.teacheruserid]" :trigger-change="true"></j-select-teacher-user-id>
				</a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/common/manage'
  import pick from 'lodash.pick'
  import { validateDuplicateValue } from '@/utils/util'
  import JSelectXueqi from '@/components/kwglbiz/JSelectXueqi'
  import JSelectZyb from '@/components/kwglbiz/JSelectZyb'
  import JSelectZyByZyb from '@/components/kwglbiz/JSelectZyByZyb'
  import JSelectBanjiByZy from '@/components/kwglbiz/JSelectBanjiByZy'
  import JSelectJiaoxueKecheng from '@/components/kwglbiz/JSelectJiaoxueKecheng'
  import JSelectGrade from '@/components/kwglbiz/JSelectGrade'
import JSelectTeacherUserId from '@/components/kwglbiz/JSelectTeacherUserId'
  export default {
    name: 'VeJwJxrwGenerate',
    components: { JSelectGrade,JSelectTeacherUserId, JSelectJiaoxueKecheng, JSelectBanjiByZy, JSelectZyByZyb, JSelectZyb, JSelectXueqi },
    data() {
      return {
        form: this.$form.createForm(this),
        title: '操作',
        width: 800,
        visible: false,
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
          year: { rules: [{ required: true, message: '请选择学年!' }] },
          semid: { rules: [{ required: true, message: '请选择学期!' }] },
          falid: { rules: [{ required: true, message: '请选择院系!' }] },
          specid: { rules: [{ required: true, message: '请选择专业!' }] },
          xzbids: { rules: [{ required: true, message: '请选择班级!' }] },
		  teacheruserid: { rules: [{ required: true, message: '请选择教师!' }] },
        },
        url: {
          // oneButtonPublishing: '/jxrw/veJwJxrw/oneButtonPublishing',
          oneButtonPublishing: '/jxgz/veJwPyfa/checkPyfa'
        }
      }
    },
    created() {
    },
    methods: {
      zybChange(code) {
        if (this.$refs.zyByZyb != null) {
          this.$refs.zyByZyb.initDictData(code)
        }
      },
      zyChange(code) {
        if (this.$refs.banjiByZy != null) {
          this.$refs.banjiByZy.initDictData(code)
        }
      },
      edit(record) {
        this.form.resetFields()
        this.model = Object.assign({}, record)
        this.visible = true
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
            console.log('表单提交数据', formData)
            // return
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
            'jxbid',
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
      }
    }
  }
</script>