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
          <a-col :md="8" :sm="24">
            <a-form-item label="课程" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-select-jiaoxue-kecheng :triggerChange="true" v-model="kcid"></j-select-jiaoxue-kecheng>
            </a-form-item>
          </a-col>

          <a-col :md="8" :sm="24" v-if="flag">
            <a-form-item label="培养方案" :labelCol="labelCol" :wrapperCol="wrapperCol" >
              <a-input-search v-model="pyfaId" readOnly unselectable="on" @search="onSearchPyfa">
                <a-button slot="enterButton" :disabled="disabled">选择</a-button>
              </a-input-search>
            </a-form-item>
          </a-col>

          <a-col :md="8" :sm="24">
            <a-form-item label="课程计划教师" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-select-teacher-user-id :triggerChange="true" :multiple="true" v-model="teachers"></j-select-teacher-user-id>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="课程性质" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-dict-select-tag
                v-model="kcxzm"
                placeholder="课程性质"
                dictCode="course_type"
              ></j-dict-select-tag>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="学分" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number style="width: 100%" v-model="score" />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="总学时" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number style="width: 100%" v-model="zxs" />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="理论学时" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number style="width: 100%" v-model="llxs" />
            </a-form-item>
          </a-col>

          <a-col :md="8" :sm="24">
            <a-form-item label="实践学时" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number style="width: 100%" v-model="sjxs" />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="教师数量" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number style="width: 100%" v-model="jssl" />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="合格分数线" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number style="width: 100%" v-model="hgfsx" />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="优秀分数线" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number style="width: 100%" v-model="yxfsx" />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="预计开学日期" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-date date-format="YYYY-MM-DD" v-model="beginTime" width="100%" />
            </a-form-item>
          </a-col>

          <a-col :md="8" :sm="24">
            <a-form-item label="预计结束日期" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-date date-format="YYYY-MM-DD" v-model="endTime" width="100%" />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="预计总周数" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number style="width: 100%" v-model="weeks" />
            </a-form-item>
          </a-col>

          <a-col :md="8" :sm="24">
            <a-form-item label="周课时" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number style="width: 100%" v-model="zks" />
            </a-form-item>
          </a-col>

          <a-col :md="8" :sm="24">
            <a-form-item label="教室类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-dict-select-tag
                v-model="jslx"
                placeholder="请选择教室类型"
                dictCode="jslxdm"
              ></j-dict-select-tag>
            </a-form-item>
          </a-col>

          <a-col :md="8" :sm="24">
          <a-form-item label="课程计划教室" :labelCol="labelCol" :wrapperCol="wrapperCol">
                        <j-select-jiaoshi v-model="jhjs" ></j-select-jiaoshi>
                      </a-form-item>
          </a-col>

          <a-col :md="8" :sm="24">
            <a-form-item label="是否合班" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <!-- <a-radio-group v-decorator="['isMerge']">
                <a-radio :value="1"> 是 </a-radio>
                <a-radio :value="0"> 否 </a-radio>
              </a-radio-group> -->

              <a-switch v-model="isMerge" :active-value="1" :inactive-value="0" />
            </a-form-item>
          </a-col>

          <a-col :md="8" :sm="24">
            <a-form-item label="单双周" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-select v-model="dsz">
                <a-select-option :value="0">不限</a-select-option>
                <a-select-option :value="1">单周</a-select-option>
                <a-select-option :value="2">双周</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          <a-col :md="8" :sm="24">
            <a-form-item label="指定周" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-select mode="multiple" v-model="zdz">
                <a-select-option value="1">1</a-select-option>
                <a-select-option value="2">2</a-select-option>
                <a-select-option value="3">3</a-select-option>
                <a-select-option value="4">4</a-select-option>
                <a-select-option value="5">5</a-select-option>
                <a-select-option value="6">6</a-select-option>
                <a-select-option value="7">7</a-select-option>
                <a-select-option value="8">8</a-select-option>
                <a-select-option value="9">9</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="24" :sm="24">
            <a-form-item label="描述" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-textarea style="width: 100%" v-model="description" />
            </a-form-item>
          </a-col>
        </a-row>
        <div style="text-align: center">
          <a-button @click="modalReset" type="primary" icon="reload">刷新</a-button>
        </div>
      </a-form>
    </a-spin>
    <jw-select-pyfa ref="selectForm" @ok="modalFormOk"></jw-select-pyfa>
  </a-modal>
</template>

<script>
import { httpAction } from '@/api/common/manage'
import pick from 'lodash.pick'
import { validateDuplicateValue } from '@/utils/util'
import { EduListMixin } from '@/mixins/EduListMixin'
import JSelectJiaoxueKecheng from '@/components/kwglbiz/JSelectJiaoxueKecheng'
import JSelectTeacher from '@/components/kwglbiz/JSelectTeacher'
import JwSelectPyfa from './JwSelectPyfa'
import JSelectTeacherUserId from '@/components/kwglbiz/JSelectTeacherUserId'
import JSelectJiaoshi from '@/components/kwglbiz/JSelectJiaoshi'
export default {
  name: 'VeJwKcjhFilter',
  components: { JSelectTeacherUserId,JSelectJiaoshi, JSelectJiaoxueKecheng, JSelectTeacher, JwSelectPyfa },
  mixins: [EduListMixin],
  data() {
    return {
      form: this.$form.createForm(this),
      disableMixinCreated: true,
      flag: true,
      kcid: null,
      pyfaId: null,
      teachers: null,
      kcxzm: null,
      kslx: null,
      cjlx: null,
      score: null,
      zxs: null,
      llxs: null,
      sjxs: null,
      jssl: null,
      hgfsx: null,
      yxfsx: null,
	  disabled:false,
	  check:false,
      beginTime: null,
      endTime: null,
      weeks: null,
      zks: null,
      jslx: null,
      jhjs: null,
      isMerge: null,
      dsz: null,
      description: null,
      zdz: null,
      title: '操作',
      width: 1200,
      visible: false,
      model: {},
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
      confirmLoading: false,
    }
  },
  created() {},
  methods: {
    onSearchPyfa() {
      this.$refs.selectForm.show()
    },

    modalFormOk(row, id) {
      console.log('当前选中陪养方案:', row)
      this.pyfaId=id
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
      const that = this;
	  console.log("this.jhjs",this.jhjs)
      //回送信息
      this.$emit(
        'ok',
        this.kcid,
        this.pyfaId,
        this.teachers,
        this.kcxzm,
        this.kslx,
        this.cjlx,
        this.score,
        this.zxs,
        this.llxs,
        this.sjxs,
        this.jssl,
        this.hgfsx,
        this.yxfsx,
        this.beginTime,
        this.endTime,
        this.weeks,
        this.zks,
        this.jslx,
        this.jhjs,
        this.isMerge,
        this.dsz,
        this.description,
        this.zdz
      )
      this.close()
    },
    handleCancel() {
      this.close()
    },
    //清空表单
    modalReset() {
      this.kcid = null
      this.pyfaId = null
      this.teachers = null
      this.kcxzm = null
      this.kslx = null
      this.cjlx = null
      this.score = null
      this.zxs = null
      this.llxs = null
      this.sjxs = null
      this.jssl = null
      this.hgfsx = null
      this.yxfsx = null
      this.beginTime = null
      this.endTime = null
      this.weeks = null
      this.zks = null
      this.jslx = null
      this.jhjs = null
      this.isMerge = null
      this.dsz = null
      this.description = null
      this.zdz = null
    },
  },
}
</script>