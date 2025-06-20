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
        <a-form-item label="成绩类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
		  <JSelectCenJi trigger-change="true" v-decorator="['cjlxid', validatorRules.cjlxid]" v-model="cjlxid"  placeholder="请选择成绩类型"></JSelectCenJi>					 
        </a-form-item>

        <a-form-item label="开始时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-date placeholder="请选择开始时间" v-decorator="['starttimeStr', validatorRules.starttimeStr]" :trigger-change="true" :show-time="true" date-format="YYYY-MM-DD HH:mm:ss" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="结束时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-date placeholder="请选择结束时间" v-decorator="['endtimeStr', validatorRules.endtimeStr]" :trigger-change="true" :show-time="true" date-format="YYYY-MM-DD HH:mm:ss" style="width: 100%"/>
        </a-form-item>

        <a-form-item label="状态" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-radio-group  v-decorator="['status', validatorRules.status]" >
            <a-radio :value="1"> 启用 </a-radio>
            <a-radio :value="0"> 禁用 </a-radio>
          </a-radio-group>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { httpAction } from '@/api/common/manage'
import pick from 'lodash.pick'
import { validateDuplicateValue } from '@/utils/util'
import { formatDate } from '@/utils/util'
import JSelectCenJi from '@/components/kwglbiz/JSelectCenJi'
export default {
  name: 'VeJwCjsettingModal',
  components: {
	  JSelectCenJi
  },
  data() {
    return {
      form: this.$form.createForm(this),
	  cjlxid:'',
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
        cjlxid: { rules: [{ required: true, message: '请选择成绩类型!' }] },
        status: { rules: [{ required: true, message: '请选择状态!' }] },
        istongji: { rules: [{ required: true, message: '请选择是否计入统计 0：不统计  1：统计!' }] },
        starttimeStr: { rules: [{ required: true, message: '请选择开始时间!' }] },
        endtimeStr: { rules: [{ required: true, message: '请选择结束时间!' }] },
      },
	  cjlxid:'',
      url: {
        add: '/kwgl/veJwCjsetting/add',
        edit: '/kwgl/veJwCjsetting/edit',
      },
    }
  },
  created() {
	  console.log(this.form,'form?????')
  },
  methods: {
    add() {
      this.edit({status:1})
    },
    edit(record) {

      record.starttimeStr = record.starttime == null ? '':formatDate(record.starttime * 1000, 'yyyy-MM-dd hh:mm:ss');
      record.endtimeStr = record.endtime == null ? '':formatDate(record.endtime * 1000, 'yyyy-MM-dd hh:mm:ss');
      console.log(record);
	  this.cjlxid = record.cjlxid+''
	  console.log(this.cjlxid,'this.cjlxid？？？？？');
      this.form.resetFields()
      this.model = Object.assign({}, record)
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue(
          pick(this.model, 'cjlxid', 'status', 'starttimeStr', 'endtimeStr')
        )
      })
    },
    close() {
	  this.cjlxid = ''
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
		  formData.cjlxid = this.cjlxid
          formData.starttime = new Date(formData.starttimeStr).getTime() / 1000;
          formData.endtime = new Date(formData.endtimeStr).getTime() / 1000;
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
      this.form.setFieldsValue(pick(row, 'name', 'status', 'istongji', 'createuserid', 'createtime', 'terminalid'))
    },
  },
}
</script>