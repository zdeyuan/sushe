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
       <a-button @click="handleShow" type="primary" style="margin-left: 10px">{{disableSubmit ? '查看课程详情':'编辑课程详情'}}</a-button>
    </template>
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-row :gutter="24">
          <a-col :md="24" :sm="12">
            <a-form-item label="名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['name', validatorRules.name]" placeholder="请输入培养方案名称"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="24" :sm="12">
            <a-form-item label="专业部-专业" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-select-zyb style="width: 50%" v-decorator="['falid', validatorRules.falid]" :triggerChange="true" @change="zybChange"></j-select-zyb>
              <j-select-zy-by-zyb ref="zyByZyb" style="width: 50%"  v-decorator="['specid', validatorRules.specid]" :triggerChange="true"></j-select-zy-by-zyb>
            </a-form-item>
          </a-col>
          <a-col :md="24" :sm="12">
            <a-form-item label="学制" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-select-xuezhi v-decorator="['xzid', validatorRules.xzid]" :triggerChange="true"></j-select-xuezhi>
            </a-form-item>
          </a-col>
          <a-col :md="24" :sm="12">
            <a-form-item label="年级" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-select-grade v-decorator="['gradeid', validatorRules.gradeid]" :triggerChange="true"></j-select-grade>
            </a-form-item>
          </a-col>
          <a-col :md="24" :sm="12">
            <a-form-item label="学期" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-select-xueqi v-decorator="['semid', validatorRules.semid]" :triggerChange="true"></j-select-xueqi>
            </a-form-item>
          </a-col>
          <a-col :md="24" :sm="12">
            <a-form-item label="专业方向" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-textarea v-decorator="['zyfx', validatorRules.zyfx]" maxLength="200" placeholder="专业方向"></a-textarea>
            </a-form-item>
          </a-col>
          <a-col :md="24" :sm="12">
            <a-form-item label="描述" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-textarea v-decorator="['description', validatorRules.description]" maxLength="4000" placeholder="请输入描述"></a-textarea>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>

    <ve-jw-pyfa-kcxq-modal v-if="visible" ref="kcForm" @ok="handleSave"></ve-jw-pyfa-kcxq-modal>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/common/manage'
  import pick from 'lodash.pick'
  import { validateDuplicateValue } from '@/utils/util'
  import JSelectGrade from '@/components/kwglbiz/JSelectGrade'
  import JSelectXueqi from '@/components/kwglbiz/JSelectXueqi'
  import JSelectXuezhi from '@/components/kwglbiz/JSelectXuezhi'
  import JSelectZyb from '@/components/kwglbiz/JSelectZyb'
  import JSelectZyByZyb from '@/components/kwglbiz/JSelectZyByZyb'
  import VeJwPyfaKcxqModal from './VeJwPyfaKcxqModal'
  import VeJwXkjhModal from './VeJwXkjhModal'

  export default {
    name: 'VeJwPyfaModal',
    components: { JSelectZyByZyb, JSelectZyb, JSelectXuezhi, JSelectGrade, JSelectXueqi,VeJwPyfaKcxqModal},
    data() {
      return {
        disableSubmit:false,
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
          gradeid: { rules: [{ required: true, message: '请选择年级' }] },
          semid: { rules: [{ required: true, message: '请选择学期!' }] },
          specid: { rules: [{ required: true, message: '请选择专业!' }] },
          falid: { rules: [{ required: true, message: '请选择专业组!' }] },
          xzid: { rules: [{ required: true, message: '请选择学制!' }] },


          description: { rules: [] },
          isGraduate: { rules: [] },
          isAble: { rules: [] },
          status: { rules: [] },
          delFlag: { rules: [] }
        },
        url: {
          add: '/jxgz/veJwPyfa/add',
          edit: '/jxgz/veJwPyfa/edit'
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
      add() {
        this.edit({})
      },
      edit(record) {
        if(record.falid){
          record.falid+="";
        }
        if(record.specid){
          record.specid+="";
        }
        this.form.resetFields()
        this.model = Object.assign({}, record)
        this.visible = true
        this.$nextTick(() => {
          if(record.falid){
            this.zybChange(record.falid);
          }
          this.form.setFieldsValue(
            pick(this.model,'name','zyfx', 'falid', 'specid','xzid','gradeid', 'semid', 'description', 'isGraduate', 'isAble', 'status', 'delFlag')
          )
        })
      },
      handleShow(){
        const that = this
        // 触发表单验证
        this.form.validateFields((err, values) => {
          if (!err) {
            let formData = Object.assign(this.model, values);
            that.$refs.kcForm.edit(formData)
            that.$refs.kcForm.title = '课程详情'
            that.$refs.kcForm.disableSubmit = that.disableSubmit
          }
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
      handleSave() {
        this.$emit('ok')
        this.close();
      },
      handleCancel() {
        this.close()
      },
      popupCallback(row) {
        this.form.setFieldsValue(
          pick(row, 'gradeid', 'semid', 'description', 'isGraduate', 'isAble', 'status', 'delFlag')
        )
      }
    }
  }
</script>