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

        <a-form-item label="教师" :labelCol="labelCol" :wrapperCol="wrapperCol">
<!--          <a-select v-model="teacheruserid">-->
<!--            <a-select-option :value="3828"> 侯燕红</a-select-option>-->
<!--            <a-select-option :value="3849"> 张林</a-select-option>-->
<!--          </a-select>-->
            <j-select-teacher  v-model="teacheruserid"></j-select-teacher>
        </a-form-item>

        <a-form-item label="教室" :labelCol="labelCol" :wrapperCol="wrapperCol">
<!--          <j-dict-select-tag v-model="jsid" type="list" dictCode="edu_dev.ve_jw_jiaoshi,JSMC,id" />-->
          <j-select-jiaoshi v-model="jsid" :multiple="false"></j-select-jiaoshi>
        </a-form-item>

        <a-form-item label="学年" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-select-grade v-model="year"></j-select-grade>
<!--          <j-dict-select-tag type="list" v-model="year" dictCode="jxrw_years" />-->
        </a-form-item>

        <a-form-item label="学期" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-select-xueqi v-model="semid"></j-select-xueqi>
<!--          <a-select v-model="semid">-->
<!--            <a-select-option :value="19"> 2019-2020上学期 </a-select-option>-->
<!--            <a-select-option :value="20"> 2019-2020下学期 </a-select-option>-->
<!--            <a-select-option :value="23"> 2020-2021上学期 </a-select-option>-->
<!--          </a-select>-->
        </a-form-item>

        <a-form-item label="院系" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-select-zyb placeholder="请选择专业部" v-model="falid" @input="zybChange"></j-select-zyb>
        </a-form-item>

        <a-form-item label="专业" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-select-zy-by-zyb ref="zyByZyb" placeholder="请选择专业" v-model="specid" @input="zyChange"></j-select-zy-by-zyb>
        </a-form-item>

        <a-form-item label="班级" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-select-banji-by-zy ref="banjiByZy" v-model="xzbids" ></j-select-banji-by-zy>
        </a-form-item>

        <a-form-item label="课程" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-select-jiaoxue-kecheng  v-model="kcid"> </j-select-jiaoxue-kecheng>
        </a-form-item>
        <div style="text-align: center">
          <a-button @click="modalReset" type="primary" icon="reload">刷新</a-button>
        </div>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { httpAction } from '@/api/common/manage'
import pick from 'lodash.pick'
import { validateDuplicateValue } from '@/utils/util'
import { EduListMixin } from '@/mixins/EduListMixin'
import JSelectGrade from '@/components/kwglbiz/JSelectGrade'
import JSelectXueqi from '@/components/kwglbiz/JSelectXueqi'
import JSelectZyb from '@/components/kwglbiz/JSelectZyb'
import JSelectBanjiByZy from '@/components/kwglbiz/JSelectBanjiByZy'
import JSelectJiaoxueKecheng from '@/components/kwglbiz/JSelectJiaoxueKecheng'
import JSelectTeacher from '@/components/kwglbiz/JSelectTeacher'
import JSelectZyByZyb from '@/components/kwglbiz/JSelectZyByZyb'
import JSelectJiaoshi from '@/components/kwglbiz/JSelectJiaoshi'

export default {
  name: 'VeJwJxrwGenerate',
  components: { JSelectJiaoshi, JSelectZyByZyb, JSelectTeacher, JSelectJiaoxueKecheng, JSelectBanjiByZy, JSelectZyb, JSelectXueqi, JSelectGrade },
  mixins: [EduListMixin],
  data() {
    return {
      form: this.$form.createForm(this),
      disableMixinCreated: true,
      teacheruserid: null,
      jsid: null,
      year: null,
      semid: null,
      falid: null,
      specid: null,
      xzbids:null,
      jxbid: null,
      kcid: null,
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
    zyChange(code){
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
      //回送信息
      this.$emit(
        'ok',
        this.teacheruserid,
        this.jsid,
        this.year,
        this.semid,
        this.falid,
        this.specid,
        this.jxbid,
        this.kcid,
        this.xzbids,
      )
      this.close()
    },
    handleCancel() {
      this.close()
    },
    //清空表单
    modalReset() {
      this.teacheruserid = null
      this.jsid = null
      this.year = null
      this.semid = null
      this.falid = null
      this.specid = null
      this.xzbids=null
      this.jxbid = null
      this.kcid = null
    },
  },
}
</script>