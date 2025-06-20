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
          <a-col :md="12" :sm="24">
            <a-form-item label="课程" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-select-jiaoxue-kecheng :triggerChange="true" @change="showCourse" v-decorator="['kcid', validatorRules.kcid]">
              </j-select-jiaoxue-kecheng>
            </a-form-item>
          </a-col>


          <a-col :md="12" :sm="24">
            <a-form-item label="课程计划教师" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-select-teacher-user-id
                :triggerChange="true"
                :multiple="true"
                v-decorator="['teachers', validatorRules.teachers]"
              ></j-select-teacher-user-id>
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="课程性质" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <!-- <a-select v-decorator="['kcxzm', validatorRules.kcxzm]">
                <a-select-option value="1">公共基础课</a-select-option>
                <a-select-option value="2">学科基础课</a-select-option>
                <a-select-option value="3">专业课</a-select-option>
              </a-select> -->
              <j-dict-select-tag
                :disabled="check"
                v-decorator="['kcxzm', validatorRules.kcxzm]"
                placeholder="课程性质"
                dictCode="course_type"
                :trigger-change="true"
              ></j-dict-select-tag>
            </a-form-item>
          </a-col>

          <a-col :md="12" :sm="12">
            <a-form-item label="专业部-专业" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-select-zyb style="width: 50%" v-decorator="['falid', validatorRules.falid]" :triggerChange="true" @change="zybChange"></j-select-zyb>
              <j-select-zy-by-zyb ref="zyByZyb" style="width: 50%"  v-decorator="['specid', validatorRules.specid]" :triggerChange="true"></j-select-zy-by-zyb>
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="12">
            <a-form-item label="学制" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-select-xuezhi v-decorator="['xzid', validatorRules.xzid]" :triggerChange="true"></j-select-xuezhi>
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="12">
            <a-form-item label="年级" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-select-grade v-decorator="['gradeid', validatorRules.gradeid]" :triggerChange="true"></j-select-grade>
            </a-form-item>
          </a-col>

          <a-col :md="12" :sm="12">
            <a-form-item label="学期" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-select-xueqi v-decorator="['semid', validatorRules.semid]" :triggerChange="true"></j-select-xueqi>
            </a-form-item>
          </a-col>

          <!--          <a-col :md="12" :sm="24">-->
<!--            <a-form-item label="考试类型" :labelCol="labelCol" :wrapperCol="wrapperCol">-->
<!--              <j-dict-select-tag-->
<!--                :disabled="check"-->
<!--                v-decorator="['kslx', validatorRules.kslx]"-->
<!--                placeholder="考试类型"-->
<!--                dictCode="edu_dev.ve_jw_kslx,name,id"-->
<!--                :trigger-change="true"-->
<!--              ></j-dict-select-tag>-->
<!--            </a-form-item>-->
<!--          </a-col>-->
<!--          <a-col :md="12" :sm="24">-->
<!--            <a-form-item label="成绩类型" :labelCol="labelCol" :wrapperCol="wrapperCol">-->
<!--              <j-dict-select-tag-->
<!--                :disabled="check"-->
<!--                v-decorator="['cjlx', validatorRules.cjlx]"-->
<!--                placeholder="成绩类型"-->
<!--                dictCode="edu_dev.ve_jw_cjlx,name,id"-->
<!--                :trigger-change="true"-->
<!--              ></j-dict-select-tag>-->
<!--            </a-form-item>-->
<!--          </a-col>-->
          <a-col :md="12" :sm="24">
            <a-form-item label="学分" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number v-decorator="['score', validatorRules.score]" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="总学时" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number v-decorator="['zxs', validatorRules.zxs]" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="理论学时" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number v-decorator="['llxs', validatorRules.llxs]" style="width: 100%" />
            </a-form-item>
          </a-col>

          <a-col :md="12" :sm="24">
            <a-form-item label="实践学时" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number v-decorator="['sjxs', validatorRules.sjxs]" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="教师数量" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number v-decorator="['jssl', validatorRules.jssl]" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="合格分数线" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number v-decorator="['hgfsx', validatorRules.hgfsx]" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="优秀分数线" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number v-decorator="['yxfsx', validatorRules.yxfsx]" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="预计开学日期" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-date v-decorator="['beginTime', validatorRules.yxfsx]" date-format="YYYY-MM-DD" />
            </a-form-item>
          </a-col>

          <a-col :md="12" :sm="24">
            <a-form-item label="预计结束日期" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-date v-decorator="['endTime', validatorRules.yxfsx]" date-format="YYYY-MM-DD" />
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="预计总周数" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number v-decorator="['weeks', validatorRules.weeks]" style="width: 100%" />
            </a-form-item>
          </a-col>

          <a-col :md="12" :sm="24">
            <a-form-item label="周课时" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number v-decorator="['zks', validatorRules.zks]" style="width: 100%" />
            </a-form-item>
          </a-col>

          <a-col :md="12" :sm="24">
            <a-form-item label="教室类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
<!--              <a-select v-decorator="['jslx', validatorRules.jslx]">-->
<!--                <a-select-option :value="1">普通教室</a-select-option>-->
<!--                <a-select-option :value="2">多媒体教室</a-select-option>-->
<!--              </a-select>-->
              <j-dict-select-tag
                v-decorator="['jslx', validatorRules.jslx]"
                :trigger-change="true"
                placeholder="请选择教室类型"
                dictCode="jslxdm"
              ></j-dict-select-tag>
            </a-form-item>
          </a-col>

          <a-col :md="12" :sm="24">
            <a-form-item label="课程计划教室" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <!-- <a-input-number v-decorator="['jhjs', validatorRules.jhjs]" style="width: 100%" /> -->
              <j-select-jiaoshi  v-decorator="['jhjs', validatorRules.jhjs]" :trigger-change="true"></j-select-jiaoshi>
<!--              <j-dict-select-tag-->
<!--                :disabled="check"-->
<!--                v-decorator="['jhjs', validatorRules.jhjs]"-->
<!--                placeholder="成绩类型"-->
<!--                dictCode="edu_dev.ve_jw_jiaoshi,JSMC,id"-->
<!--                mode="multiple"-->
<!--                :trigger-change="true"-->
<!--              ></j-dict-select-tag>-->
            </a-form-item>
          </a-col>

          <a-col :md="12" :sm="24">
            <a-form-item label="是否合班" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <!-- <a-radio-group v-decorator="['isMerge']">
                <a-radio :value="1"> 是 </a-radio>
                <a-radio :value="0"> 否 </a-radio>
              </a-radio-group> -->

              <a-switch v-decorator="['isMerge']" :active-value="1" :inactive-value="0" />
            </a-form-item>
          </a-col>

          <a-col :md="12" :sm="24">
            <a-form-item label="单双周" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-select v-decorator="['dsz', validatorRules.dsz]">
                <a-select-option :value="0">不限</a-select-option>
                <a-select-option :value="1">单周</a-select-option>
                <a-select-option :value="2">双周</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
<!--          <a-col :md="24" :sm="24">-->
<!--            <a-form-item label="指定周" :labelCol="labelCol" :wrapperCol="wrapperCol">-->
<!--              <a-select v-decorator="['zdz', validatorRules.zdz]">-->
<!--                <a-select-option value="1">1</a-select-option>-->
<!--                <a-select-option value="2">2</a-select-option>-->
          <!--                <a-select-option value="3">3</a-select-option>-->
          <!--                <a-select-option value="4">4</a-select-option>-->
          <!--                <a-select-option value="5">5</a-select-option>-->
          <!--                <a-select-option value="6">6</a-select-option>-->
          <!--                <a-select-option value="7">7</a-select-option>-->
          <!--                <a-select-option value="8">8</a-select-option>-->
          <!--                <a-select-option value="9">9</a-select-option>-->
          <!--              </a-select>-->
          <!--            </a-form-item>-->
          <!--          </a-col>-->
          <a-col :md="24" :sm="24">
            <a-form-item label="描述" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-textarea v-decorator="['description', validatorRules.description]" style="width: 100%" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
    <jw-select-pyfa ref="selectForm" @ok="modalFormOk"></jw-select-pyfa>
  </a-modal>
</template>

<script>
import { httpAction,getActionZhuanyeById } from '@/api/common/manage'
import pick from 'lodash.pick'
import { validateDuplicateValue } from '@/utils/util'

import JSelectJiaoxueKecheng from '@/components/kwglbiz/JSelectJiaoxueKecheng'
import JSelectTeacher from '@/components/kwglbiz/JSelectTeacher'
import JwSelectPyfa from './JwSelectPyfa'
import JSelectJiaoshi from '@/components/kwglbiz/JSelectJiaoshi'
import JSelectZyByZyb from '@/components/kwglbiz/JSelectZyByZyb'
import JSelectZyb from '@/components/kwglbiz/JSelectZyb'
import JSelectXuezhi from '@/components/kwglbiz/JSelectXuezhi'
import JSelectGrade from '@/components/kwglbiz/JSelectGrade'
import JSelectXueqi from '@/components/kwglbiz/JSelectXueqi'
import JSelectTeacherUserId from '@/components/kwglbiz/JSelectTeacherUserId'

export default {
  name: 'VeJwKcjhModal',
  components: { getActionZhuanyeById,JSelectTeacherUserId, JSelectXueqi, JSelectGrade, JSelectXuezhi, JSelectZyb, JSelectZyByZyb, JSelectJiaoshi, JSelectJiaoxueKecheng, JSelectTeacher, JwSelectPyfa },
  data() {
    return {
      form: this.$form.createForm(this),
      title: '操作',
      width: 1000,
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
        kcid: { rules: [{ required: true, message: '请选择课程' }] },
        teachers: { rules: [{ required: true, message: '请选择教师' }] },
        kcxzm: { rules: [{ required: true, message: '请选择课程性质' }] },
        kslx: { rules: [{ required: true, message: '请选择考试类型' }] },
        cjlx: { rules: [{ required: true, message: '请选择成绩类型' }] },
        falid: { rules: [{ required: true, message: '请选择专业组' }] },
        specid: { rules: [{ required: true, message: '请选择专业' }] },
        gradeid: { rules: [{ required: true, message: '请选择年级' }] },
        semid: { rules: [{ required: true, message: '请选择学期' }] },
        xzid: { rules: [{ required: true, message: '请选择学制' }] },
        score: { rules:  [{ required: true, message: '请填写学分' }]  },
        zxs: { rules: [{ required: true, message: '请填写总学时' }] },
        llxs: { rules: [] },
        sjxs: { rules: [] },
        jssl: { rules: [] },
        hgfsx: { rules: [] },
        yxfsx: { rules: [] },
        beginTime: { rules: [{ required: true, message: '请选择预计开学日期' }] },
        endTime: { rules: [{ required: true, message: '请选择预计结束日期' }] },
        weeks: { rules: [] },
        zks: { rules: [] },
        jslx: { rules: [{ required: true, message: '请选择教室类型' }] },
        jhjs: { rules: [{ required: true, message: '请选课课程教室' }] },
        isMerge: { rules: [] },
        dsz: { rules: [] },
        zdz: { rules: [] },
        pyfaId: { rules: [{ required: true, message: '请选择对应的培养方案' }] },
      },
      url: {
        add: '/jxgz/veJwKcjh/add',
        edit: '/jxgz/veJwKcjh/edit',
        getCourse: '/jxzy/jwKecheng/queryById',
      },
    }
  },
  created() {},
  methods: {
    showCourse(record){
      if (!record) return;
      let httpurl = this.url.getCourse+'?id='+record;
      httpAction(httpurl, {}, 'get')
        .then((res) => {
          if (res.success) {
            console.log(res.result)
            let course = res.result;
            if(course.falid!=null){
              this.zybChange(course.falid);
            }
            if (course.specid!=null){
              getActionZhuanyeById(course.specid).then(resu => {
                if (resu.success && resu.result != null) {
                  console.log(resu.result)
                  course.xz = resu.result.xz
                  this.form.setFieldsValue({
                    xzid:course.xz==null?'':course.xz+'',
                  })
                }
              })
            }
            this.form.setFieldsValue({
              kcxzm:course.kcxz+'',
              falid:course.falid==null?'':course.falid+'',
              specid:course.specid==null?'':course.specid+'',
              score:course.xf,
              zxs:course.zxs,
              llxs:course.llxs,
              sjxs:course.sjxs,
            })
          }
        }).finally(() => {
        })
    },
    onSearchPyfa() {
      this.$refs.selectForm.show()
    },

    modalFormOk(row, id) {
      console.log('当前选中培养方案:', row)
      this.form.setFieldsValue(pick({ pyfaId: id,pyfaIdName:row.name }, 'pyfaId','pyfaIdName'))
    },

    add() {
      this.edit({})
    },
    edit(record) {
      // alert( record.kcxzm)
      record.kcid = record.kcid == null ? null : record.kcid + ''
      record.kcxzm = record.kcxzm == null ? null : record.kcxzm + ''
      this.form.resetFields()
      this.model = Object.assign({}, record)
      this.visible = true
      this.$nextTick(() => {
        if(record.falid!=null){
          this.zybChange(record.falid);
        }
        this.form.setFieldsValue(
          pick(
            this.model,
            'kcid',
            'teachers',
            'kcxzm',
            'kslx',
            'cjlx',
            'falid',
            'gradeid',
            'xzid',
            'specid',
            'semid',
            'zxs',
            'llxs',
            'sjxs',
            'jssl',
            'hgfsx',
            'yxfsx',
            'beginTime',
            'endTime',
            'weeks',
            'zks',
            'jslx',
            'jhjs',
            'isMerge',
            'dsz',
            'zdz',
            'pyfaId',
            'description'
          )
        )
      })
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
          console.log('表单提交数据', this.model,values)
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
          'kcid',
          'teachers',
          'kcxzm',
          'kslx',
          'cjlx',
          'score',
          'zxs',
          'llxs',
          'sjxs',
          'jssl',
          'hgfsx',
          'yxfsx',
          'beginTime',
          'endTime',
          'weeks',
          'zks',
          'jslx',
          'jhjs',
          'isMerge',
          'dsz',
          'zdz',
          'pyfaId',
          'description'
        )
      )
    },
  },
}
</script>