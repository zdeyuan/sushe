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
            <a-form-item label="专业部" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-select-zyb placeholder="请选择专业部" v-model="dataObj.zyb" @input="zyChange"></j-select-zyb>
            </a-form-item>
          </a-col>
          <a-col :md="24" :sm="24">

            <a-form-item label="专业" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-select-zy-by-zyb ref="zyByZyb" placeholder="请选择专业" v-model="dataObj.zy" @input="zybChange"></j-select-zy-by-zyb>
            </a-form-item>
          </a-col>
          <a-col :md="24" :sm="24">
            <a-form-item label="班级" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-select-banji-by-zy ref="banjiByZy"  placeholder="请选择班级" v-model="dataObj.bj"></j-select-banji-by-zy>
            </a-form-item>
          </a-col>
          <a-col :md="24" :sm="24">
            <a-form-item label="职业认证考试" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-dict-select-tag
                v-model="dataObj.zyksid"
                placeholder="请选择"
                dictCode="edu_dev_open.ve_jw_ks_zhiye,name,id,state=1"
              ></j-dict-select-tag>
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
  </a-modal>
</template>

<script>
import { httpAction } from '@/api/common/manage'
import pick from 'lodash.pick'
import { validateDuplicateValue } from '@/utils/util'
import JDate from '@/components/edu/JDate'
import JDictSelectTag from '@/components/dict/JDictSelectTag'
import JSelectZyb from '@/components/kwglbiz/JSelectZyb'
import JSelectZyByZyb from '@/components/kwglbiz/JSelectZyByZyb'
import JSelectBanjiByZy from '@/components/kwglbiz/JSelectBanjiByZy'


export default {
  name: 'VeJwZhiyeExcelBanjiModal',
  components: {
    JSelectBanjiByZy,
    JSelectZyByZyb,
    JSelectZyb,
    JDate,
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
      dataObj:{zyb:'',zy:'',bj:'',ks:''},
    }
  },
  created() {},
  methods: {
    add() {
      this.edit({})
    },
    select(type){
      this.dataObj=type;
      this.visible = false;
    },
    close() {
      this.$emit('close')
      this.visible = false
    },
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
    handleCancel () {
      this.close()
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
                that.$emit('ok');
                that.close();
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
  },
}
</script>