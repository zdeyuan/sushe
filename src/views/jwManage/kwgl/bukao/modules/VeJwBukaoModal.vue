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
        <a-form-item label="课程" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-select-jiaoxue-kecheng :disabled="check"
                                    v-decorator="['kcid', validatorRules.kcid]"
                                    placeholder="请选择课程" :trigger-change="true"></j-select-jiaoxue-kecheng>
        </a-form-item>

        <a-form-item label="考试方式" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag
            :disabled="check"
            v-decorator="['ksfsm', validatorRules.ksfsm]"
            placeholder="请选择考试方式"
            dictCode="kwgl_exam_way"
            :trigger-change="true"
          ></j-dict-select-tag>
        </a-form-item>

<!--        <a-form-item label="考试性质" :labelCol="labelCol" :wrapperCol="wrapperCol">-->
<!--          <j-dict-select-tag-->
<!--            :disabled="check"-->
<!--            v-decorator="['ksxzm', validatorRules.ksxzm]"-->
<!--            placeholder="请选择考试性质"-->
<!--            dictCode="kwgl_exam_properties"-->
<!--            :trigger-change="true"-->
<!--          ></j-dict-select-tag>-->
<!--        </a-form-item>-->

<!--        <a-form-item label="考试形式" :labelCol="labelCol" :wrapperCol="wrapperCol">-->
<!--          <j-dict-select-tag-->
<!--            :disabled="check"-->
<!--            v-decorator="['ksxsm', validatorRules.ksxsm]"-->
<!--            placeholder="请选择考试形式"-->
<!--            dictCode="kwgl_exam_form"-->
<!--            :trigger-change="true"-->
<!--          ></j-dict-select-tag>-->
<!--        </a-form-item>-->

        <a-form-item label="考试日期" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-date
            :disabled="check"
            placeholder="请选择考试日期"
            v-decorator="['ksrq', validatorRules.ksrq]"
            :show-time="true"
            :trigger-change="true"
            date-format="YYYY-MM-DD"
            v-model="time"
            style="width: 100%"
          />
        </a-form-item>

        <a-form-item label="考试时间段" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-select-kssjd
            :disabled="check"
            v-decorator="['kssjdid', validatorRules.kssjdid]"
            placeholder="请选择考试时间段"
            :trigger-change="true"
          ></j-select-kssjd>
        </a-form-item>


        <a-form-item label="考试地点" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-select style="display: inline-block;width: 33%" v-decorator="['campusid', validatorRules.campusid]"
                    @change="campusSelect" placeholder="请选择校区">
            <a-select-option :value="undefined">请选择</a-select-option>
            <a-select-option v-for="item in xiaoquList" :key="item.id" :value="item.id">
              {{ item.xqmc }}
            </a-select-option>
          </a-select>
          <a-select style="display: inline-block;width: 33%" v-decorator="['jzid', validatorRules.jzid]"
                    @change="buildingSelect" placeholder="请选择教学楼">
            <a-select-option :value="undefined">请选择</a-select-option>
            <a-select-option v-for="item in jzs" :key="item.id" :value="item.id">
              {{ item.jzwmc }}
            </a-select-option>
          </a-select>
          <a-select style="display: inline-block;width: 33%" v-decorator="['jsid', validatorRules.jsid]"
                    placeholder="请选择教室">
            <a-select-option :value="undefined">请选择</a-select-option>
            <a-select-option v-for="item in jss" :key="item.id" :value="item.id">
              {{ item.jsmc }}
            </a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item label="状态" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-radio-group v-decorator="['status', validatorRules.status]">
            <a-radio :value="1"> 启用 </a-radio>
            <a-radio :value="0"> 禁用 </a-radio>
          </a-radio-group>
        </a-form-item>

        <a-form-item label="最多参加人数" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number
            v-decorator="['number', validatorRules.number]"
            placeholder="最多参加人数"
            style="width: 100%"
          />
        </a-form-item>

        <a-form-item  label="参加人" :labelCol="labelCol" :wrapperCol="wrapperCol"
         >
          <!-- <a-input-number
            v-decorator="['number', validatorRules.number]"
            placeholder="最多参加人数"
            style="width: 100%"
          /> -->

          <j-select-bukao-xuesheng :multiple="true" v-decorator="['studentIds', validatorRules.studentIds]"></j-select-bukao-xuesheng>

<!--          <a-select-->
<!--            mode="multiple"-->
<!--            v-decorator="['students', validatorRules.students]"-->
<!--            placeholder="最多参加人数(测试写死数据)"-->
<!--            style="width: 100%"-->
<!--            @change="studentsChange"-->
<!--          >-->
<!--            <a-select-option v-for="i in 25" :key="i">-->
<!--              {{ i }}-->
<!--            </a-select-option>-->
<!--          </a-select>-->
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { httpAction,getActionCampusById } from '@/api/common/manage'
import pick from 'lodash.pick'
import { validateDuplicateValue } from '@/utils/util'
import JDictSelectTag from '@/components/dict/JDictSelectTag'
import { getAction } from '@/api/common/manage'
import { EduListMixin } from '@/mixins/EduListMixin'
import JSelectJiaoxueKecheng from '@/components/kwglbiz/JSelectJiaoxueKecheng'
import JSelectKssjd from '@/components/kwglbiz/JSelectKssjd'
import JSelectBukaoXuesheng from '@/components/kwglbiz/JSelectBukaoXuesheng'

export default {
  name: 'VeJwBukaoModal',
  components: { JSelectBukaoXuesheng, JSelectKssjd, JSelectJiaoxueKecheng },
  data() {
    return {
      form: this.$form.createForm(this),
      title: '操作',
      flag:true,
      jzs:{},
      jss:{},
      xiaoquList: {},
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
        kcid: { rules: [{ required: true, message: '请选择课程!' }] },
        ksfsm: { rules: [{ required: true, message: '请选择考试方式!' }] },
        ksxzm: { rules: [{ required: true, message: '请选择考试性质!' }] },
        ksxsm: { rules: [{ required: true, message: '请选择考试形式!' }] },
        // ksrqsj: { rules: [{ required: true, message: '请输入考试时间!' }] },
        // ksrq: { rules: [{ required: true, message: '请选择考试日期' }] },
        kssjdid: { rules: [{ required: true, message: '请选择考试时间段!' }] },
        campusid: { rules: [{ required: true, message: '请选择校区!' }] },
        jzid: { rules: [{ required: true, message: '请选择建筑物!' }] },
        jsid: { rules: [{ required: true, message: '请选择考试教室!' }] },
        number: { rules: [{ required: true, message: '请输入最多参加人数!' }] },
        // ispublish: { rules: [] },
        status: { rules: [{ required: true, message: '请选择状态!' }] },
        studentIds: { rules: [{ required: true, message: '请选择补考学生!' }] },
        // createuserid: { rules: [{ required: true, message: '请输入创建人ID!' }] },
        // createtime: { rules: [{ required: true, message: '请输入创建时间!' }] },
        // terminalid: { rules: [{ required: true, message: '请输入终端ID!' }] },
        // kcmc: { rules: [] },
        // cjstatus: { rules: [] },
      },
      url: {
        add: '/kwgl/veJwBukao/add',
        edit: '/kwgl/veJwBukao/edit',
        getBuildingList: '/jxzy/jwJianzhu/list',
        getClassroomList: '/jxzy/jwJiaoshi/list',
      },
    }
  },
  created() {
    this.getXiaoqu();
  },
  methods: {
    add() {
      this.edit({})
    },
    edit(record) {
      record.kcid = record.kcid == null ? null : record.kcid + ''
      record.kssjdid = record.kssjdid == null ? null : record.kssjdid + ''
      record.bjid = record.bjid == null ? null : record.bjid + ''

      if (record.campusid != null) {
        this.campusSelect(record.campusid)
      }
      if (record.jzid != null) {
        this.buildingSelect(record.jzid)
      }
      this.form.resetFields()
      this.model = Object.assign({}, record)
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue(
          pick(
            this.model,
            'name',
            'kcid',
            'ksfsm',
            'ksxzm',
            'ksxsm',
            'ksrqsj',
            'ksrq',
            'kssjdid',
            'campusid',
            'jzid',
            'jsid',
            'students',
            'number',
            'ispublish',
            'status',
            'createuserid',
            'createtime',
            'terminalid',
            'kcmc',
            'cjstatus'
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
          formData.students = formData.studentIds.split(",");
          console.log('表单提交数据', formData)
          httpAction(httpurl, formData, method)
            .then((res) => {
              if (res.success) {
                that.$message.success(res.message)
                that.close()
                that.$emit('ok')
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
          'kcid',
          'ksfsm',
          'ksxzm',
          'ksxsm',
          'ksrqsj',
          'ksrq',
          'kssjdid',
          'campusid',
          'jzid',
          'jsid',
          'number',
          'ispublish',
          'status',
          'createuserid',
          'createtime',
          'terminalid',
          'kcmc',
          'cjstatus'
        )
      )
    },
    getXiaoqu() {
      getActionCampusById().then((res) => {
        console.log(res)
        if (res.success) {
          this.xiaoquList = res.result
        }
      })
    },
    campusSelect(value) {
      console.log(value)
      getAction(this.url.getBuildingList, { campusid: value,pageSize:9999 })
        .then((res) => {
          if (res.success) {
            this.jzs = res.result.records
            console.log(this.jzs)
          } else {
            that.$message.warning(res.message)
          }
        })
        .finally(() => {
          that.loading = false
        })
    },

    buildingSelect(value) {
      console.log(value)
      getAction(this.url.getClassroomList, { jzid: value,pageSize:9999 })
        .then((res) => {
          if (res.success) {
            this.jss = res.result.records
          } else {
            that.$message.warning(res.message)
          }
        })
        .finally(() => {
          that.loading = false
        })
    },

    studentsChange(values) {},
  },
}
</script>