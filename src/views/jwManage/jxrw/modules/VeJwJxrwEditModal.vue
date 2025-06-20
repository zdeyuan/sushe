<template>
  <a-modal
    :title="title"
    :width="width"
    :visible="visible"
	
    :confirmLoading="confirmLoading"
    @cancel="handleCancel"
    cancelText="取消"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-row :gutter="24">
          <a-col :md="12" :sm="24">
            <a-form-item label="院系" :labelCol="labelCol" :wrapperCol="wrapperCol">
<!--              <j-dict-select-tag-->
<!--                type="list"-->
<!--                v-decorator="['falid']"-->
<!--                :trigger-change="true"-->
<!--                dictCode=""-->
<!--              />-->
              <j-select-zyb placeholder="请选择院系" :disabled="true" v-decorator="['falid']"  :trigger-change="true"  @change="zybChange"></j-select-zyb>
            </a-form-item>
          </a-col>

          <a-col :md="12" :sm="24">
            <a-form-item label="专业" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-select-zy-by-zyb ref="zyByZyb" v-decorator="['specid']"  :trigger-change="true" @change="zyChange"></j-select-zy-by-zyb>
            </a-form-item>
          </a-col>

          <a-col :md="12" :sm="24">
            <a-form-item label="班级" :labelCol="labelCol"  :wrapperCol="wrapperCol">
              <j-select-banji-by-zy mode="multiple" ref="banjiByZy" placeholder="请先选择班级"
                                    v-decorator="['xzbids']" :trigger-change="true"></j-select-banji-by-zy>
            </a-form-item>
          </a-col>

          <a-col :md="12" :sm="24">
            <a-form-item label="教室" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-select-jiaoshi v-decorator="['jsid']" :trigger-change="true"></j-select-jiaoshi>
            </a-form-item>
          </a-col>

          <a-col :md="12" :sm="24">
            <a-form-item label="课程" :labelCol="labelCol" :wrapperCol="wrapperCol">
<!--              <j-dict-select-tag-->
<!--                type="list"-->
<!--                v-decorator="['kcid']"-->
<!--                :trigger-change="true"-->
<!--                dictCode="edu_dev.ve_jw_kecheng,KCMC,id"-->
<!--              />-->
              <j-select-jiaoxue-kecheng  v-decorator="['kcid']" :trigger-change="true"></j-select-jiaoxue-kecheng>
            </a-form-item>
          </a-col>

          <a-col :md="12" :sm="24">
            <a-form-item label="教师" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-select-teacher-user-id v-decorator="['teacheruserid']" :trigger-change="true"></j-select-teacher-user-id>
<!--              <j-dict-select-tag-->
<!--                type="list"-->
<!--                v-decorator="['teacheruserid']"-->
<!--                :trigger-change="true"-->
<!--                dictCode="edu_dev.ve_jw_gongzuo,JSXM,teacherId"-->
<!--              />-->
            </a-form-item>
          </a-col>

          <a-col :md="12" :sm="24">
            <a-form-item label="周课时" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number v-decorator="['wtime']"/>
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
import JSelectZyb from '@/components/kwglbiz/JSelectZyb'
import JSelectZyByZyb from '@/components/kwglbiz/JSelectZyByZyb'
import JSelectBanjiByZy from '@/components/kwglbiz/JSelectBanjiByZy'
import JSelectTeacher from '@/components/kwglbiz/JSelectTeacher'
import JSelectJiaoxueKecheng from '@/components/kwglbiz/JSelectJiaoxueKecheng'
import JSelectJiaoshi from '@/components/kwglbiz/JSelectJiaoshi'
import JSelectTeacherUserId from '@/components/kwglbiz/JSelectTeacherUserId'

export default {
  name: 'VeJwJxrwEditModal',
  components: { JSelectTeacherUserId, JSelectJiaoshi, JSelectJiaoxueKecheng, JSelectTeacher, JSelectBanjiByZy, JSelectZyByZyb, JSelectZyb },
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

      },
      url: {
        add: '/jxrw/veJwJxrw/add',
        edit: '/jxrw/veJwJxrw/edit',
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
    zyChange(code){
      if (this.$refs.banjiByZy != null) {
        this.$refs.banjiByZy.initDictData(code)
      }
    },
    add() {
      this.edit({})
    },
    edit(record) {
      if(record.specid!=null){
        record.specid=record.specid+'';
        this.zyChange(record.specid);
      }
      if(record.teacheruserid!=null && record.teacheruserid!=0){
        record.teacheruserid+="";
      }
      if(record.jsid!=null){
        record.jsid+="";
      }
	  if(record.xzbids.indexOf(',')!=-1){
	  	 record.xzbids=record.xzbids.split(',');
	  }
      this.form.resetFields()
      this.model = Object.assign({}, record);
	  if(this.model.kcid){
	    this.model.kcid+='';
	  }
      this.visible = true
      this.$nextTick(() => {
        if(record.specid!=null){
          this.zyChange(record.specid);
        }
        if(record.falid!=null){
          this.zybChange(record.falid);
        }
        this.form.setFieldsValue(
          pick(
            this.model,
            'falid',
            'specid',
            'classname',
            'kcid',
            'jsid',
			'xzbids',
            'teacheruserid',
            'wtime',
          )
        )
      })
    },
    close() {
      this.$emit('close')
      this.visible = false
    },
    handleOk() {
      const that = this;
	  
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
          let formData = Object.assign(this.model, values);
		  if(formData.xzbids){
		  	formData.xzbids=formData.xzbids.join(',')
		  }
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
          'falid',
          'specid',
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
          'fixedjsid',
          'wtime'
        )
      )
    },
  },
}
</script>