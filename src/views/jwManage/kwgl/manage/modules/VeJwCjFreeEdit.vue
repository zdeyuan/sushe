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

          <a-col :md="12" :sm="24">
            <a-form-item label="专业部" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['falid']"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="专业" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['specid']"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="学期" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['semester']"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="24" :sm="24">
            <a-form-item label="课程" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-search
                ref="course"
                v-decorator="['kcid', validatorRules.kcid]"
                readOnly
                unselectable="on"
                @search="onSearchCourse"
              >
                <a-button slot="enterButton" :disabled="disabled">选择</a-button>
              </a-input-search>
            </a-form-item>
          </a-col>
          <a-col :md="24" :sm="24" v-if="auditstatus != 0">
            <a-form-item label="教学班" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-dict-select-tag
                dictCode="edu_dev_open.ve_jw_jxb,BJMC,id"
                v-decorator="['jxbid', validatorRules.jxbid]"
                :trigger-change="true"
              ></j-dict-select-tag>

              <j-select-banji-by-zy  :trigger-change="true" ref="banjiByZy" placeholder="请班级" v-decorator="['jxbid', validatorRules.jxbid]" ></j-select-banji-by-zy>
            </a-form-item>
          </a-col>

          <a-col :md="24" :sm="24">
            <div style="height: 40px; background-color: #66c3fe; padding: 10px; color: white; margin: 10px">
              <span>免缓缺信息</span>
            </div>
          </a-col>
          <a-col :md="24" :sm="24">
            <a-form-item label="考试时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <!-- <j-dict-select-tag dict-code="kwgl_free_type" v-decorator="['ksrq',validatorRules.ksrq]"></j-dict-select-tag> -->
              <j-date v-decorator="['ksrq', validatorRules.ksrq]" date-format="YYYY-MM-DD"></j-date>
            </a-form-item>
          </a-col>

          <a-col :md="24" :sm="24">
            <a-form-item label="类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-radio-group defaultValue="0" v-decorator="['type']">
                <a-radio :value="1">免考</a-radio>
                <a-radio :value="2">缓考</a-radio>
                <a-radio :value="3">缺考</a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
          <a-col :md="24" :sm="24">
            <a-form-item label="原因" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-textarea v-decorator="['reasontid', validatorRules.reasontid]" style="width: 100%" v-model="reason" />
            </a-form-item>
          </a-col>

          <a-col :md="24" :sm="24">
            <div style="height: 40px; background-color: #66c3fe; padding: 10px; color: white; margin: 10px">
              <span>成绩信息</span>
            </div>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="成绩类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <sapn>占成绩的百分比</sapn>
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="分数" :labelCol="labelCol" :wrapperCol="wrapperCol"> </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="成绩等级" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['freeXs.ratio']" style="width: 100%" v-model="reason" />
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="分数" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['freeXs.score']" style="width: 100%" v-model="reason" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
    <jw-jiaocai-select-course ref="selectForm" @ok="modalFormOk"></jw-jiaocai-select-course>
  </a-modal>
</template>

<script>
import { httpAction } from '@/api/common/manage'
import pick from 'lodash.pick'
import { validateDuplicateValue } from '@/utils/util'
import JwJiaocaiSelectCourse from '@/views/jwManage/jxzy/modules/JwJiaocaiSelectCourse'

export default {
  name: 'VeJwCjFreeEdit',
  components: { JwJiaocaiSelectCourse },
  data() {
    return {
      form: this.$form.createForm(this),
      title: '操作',
      width: 800,
      visible: false,
      auditstatus: null,
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
        hasexam: { rules: [] },
        ksid: { rules: [{ required: true, message: '请输入考试ID!' }] },
        stuid: { rules: [{ required: true, message: '请输入学生ID!' }] },
        userid: { rules: [] },
        xh: { rules: [{ required: true, message: '请输入学号!' }] },
        xm: { rules: [{ required: true, message: '请输入学生姓名!' }] },
        falid: { rules: [{ required: true, message: '请输入院系ID!' }] },
        ksrq: {  rules: [{ required: true, message: '请选择考试时间!'  }]},
        gradeid: { rules: [] },
        semid: { rules: [] },
        kcid: { rules: [{ required: true, message: '请输入课程ID!' }] },
        jxbid: { rules: [{ requireL: true, message: '请选择教学班！' }] },
        xzbid: { rules: [{ requireL: true, message: '请选择考试时间！' }] },

        type: { rules: [{ required: true, message: '请选择免缓缺类型!' }] },
        reasontid: { rules: [{ required: true, message: '请输入免缓缺登记的原因（大文本字段ID）!' }] },
        createuserid: { rules: [{ required: true, message: '请输入登记用户ID!' }] },
        createtime: { rules: [{ required: true, message: '请输入登记时间!' }] },
      },
      url: {
        add: '/kwgl/veJwCjFree/add',
        edit: '/kwgl/veJwCjFree/edit',
      },
    }
  },
  created() {},
  methods: {
    add() {
      this.edit({})
    },

    onSearchCourse() {
      this.$refs.selectForm.show()
    },

    modalFormOk(row, id) {
      console.log('当前选中课程id', id)
      this.$refs.course.value = row.kcmc

      this.form.setFieldsValue(pick({ kcid: id }, 'kcid'))
    },
    edit(record) {

      if(record.ksid!=null){ record.ksid+='';}
      if(record.falid!=null){record.falid+='';}
      if(record.specid!=null){record.specid+='';}
      if(record.gradeid!=null){record.gradeid+='';}
      if(record.semid!=null){record.semid+='';}
      if(record.kcid!=null){record.kcid+='';}
      if(record.xzbid!=null){record.xzbid+='';}

      this.form.resetFields()
      this.auditstatus = record.auditstatus
      this.model = Object.assign({}, record)
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue(
          pick(
            this.model,
            'jxrwid',
            'ksxsid',
            'hasexam',
            'ksid',
            'ksidDictText',
            'stuid',
            'userid',
            'xh',
            'xm',
            'falid',
            'specid',
            'gradeid',
            'semid',
            'kcid',
            'jxbid',
            'xzbid',
            'ksrq',
            'pscj',
            'fslkscj',
            'kccj',
            'kcdjcjm',
            'type',
            'reasontid',
            'createuserid',
            'createtime',
            'auditstatus',
            'audituserid',
            'audittid',
            'terminalid',
            'freeXs'
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
      //触发表单验证
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
    handleCancel() {
      this.close()
    },
    popupCallback(row) {
      this.form.setFieldsValue(
        pick(
          row,
          'jxrwid',
          'ksxsid',
          'hasexam',
          'ksid',
          'stuid',
          'userid',
          'xh',
          'xm',
          'falid',
          'specid',
          'gradeid',
          'semid',
          'kcid',
          'jxbid',
          'xzbid',
          'ksrq',
          'pscj',
          'fslkscj',
          'kccj',
          'kcdjcjm',
          'type',
          'reasontid',
          'createuserid',
          'createtime',
          'auditstatus',
          'audituserid',
          'audittid',
          'terminalid'
        )
      )
    },
  },
}
</script>