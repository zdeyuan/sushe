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

      <table v-show="!isAdd">
        <tbody>
          <tr>
            <th>考试人数</th>
            <td>
              <a-input-number :min="1" :max="record.number" placeholder="最多考试人数" style="width: 50%" v-model="bjData.num"/>
            </td>
          </tr>
          <tr>
            <th>班级人数</th>
            <td v-text="record.number" style="padding-left: 17px;">班级人数</td>
          </tr>
          <tr>
            <td colspan="2">
              <a-form :form="form">
                <a-form-item label="考试方式" :labelCol="labelCol" :wrapperCol="wrapperCol">
                  <j-dict-select-tag
                    :disabled="check"
                    v-decorator="['ksfsm', validatorRules.ksfsm]"
                    placeholder="请选择考试方式"
                    dictCode="kwgl_exam_way"
                    :trigger-change="true"
                  ></j-dict-select-tag>
                </a-form-item>

                <a-form-item label="考试性质" :labelCol="labelCol" :wrapperCol="wrapperCol">
                  <j-dict-select-tag
                    :disabled="check"
                    v-decorator="['ksxzm', validatorRules.ksxzm]"
                    placeholder="请选择考试性质"
                    dictCode="kwgl_exam_properties"
                    :trigger-change="true"
                  ></j-dict-select-tag>
                </a-form-item>

                <a-form-item label="考试形式" :labelCol="labelCol" :wrapperCol="wrapperCol">
                  <j-dict-select-tag
                    :disabled="check"
                    v-decorator="['ksxsm', validatorRules.ksxsm]"
                    placeholder="请选择考试形式"
                    dictCode="kwgl_exam_form"
                    :trigger-change="true"
                  ></j-dict-select-tag>
                </a-form-item>

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

                <a-form-item label="最多参加人数" :labelCol="labelCol" :wrapperCol="wrapperCol">
                  <a-input-number
                    v-decorator="['number', validatorRules.number]"
                    placeholder="最多参加人数"
                    style="width: 100%"
                  />
                </a-form-item>

                <a-form-item label="状态" :labelCol="labelCol" :wrapperCol="wrapperCol">
                  <a-radio-group v-decorator="['status', validatorRules.status]">
                    <a-radio :value="1"> 启用</a-radio>
                    <a-radio :value="0"> 禁用</a-radio>
                  </a-radio-group>
                </a-form-item>
              </a-form>
            </td>
          </tr>
        </tbody>
      </table>

      <a-form :form="form" v-show="isAdd">
        <a-form-item label="考试方式" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag
            :disabled="check"
            v-decorator="['ksfsm', validatorRules.ksfsm]"
            placeholder="请选择考试方式"
            dictCode="kwgl_exam_way"
            :trigger-change="true"
          ></j-dict-select-tag>
        </a-form-item>

        <a-form-item label="考试性质" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag
            :disabled="check"
            v-decorator="['ksxzm', validatorRules.ksxzm]"
            placeholder="请选择考试性质"
            dictCode="kwgl_exam_properties"
            :trigger-change="true"
          ></j-dict-select-tag>
        </a-form-item>

        <a-form-item label="考试形式" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag
            :disabled="check"
            v-decorator="['ksxsm', validatorRules.ksxsm]"
            placeholder="请选择考试形式"
            dictCode="kwgl_exam_form"
            :trigger-change="true"
          ></j-dict-select-tag>
        </a-form-item>

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

        <a-form-item label="最多参加人数" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number
            v-decorator="['number', validatorRules.number]"
            placeholder="最多参加人数"
            style="width: 100%"
          />
        </a-form-item>

        <a-form-item label="状态" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-radio-group v-decorator="['status', validatorRules.status]">
            <a-radio :value="1"> 启用</a-radio>
            <a-radio :value="0"> 禁用</a-radio>
          </a-radio-group>
        </a-form-item>
      </a-form>

    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction, getActionCampusById } from '@/api/common/manage'
  import pick from 'lodash.pick'
  import { validateDuplicateValue } from '@/utils/util'
  import JDictSelectTag from '@/components/dict/JDictSelectTag'
  import { getAction } from '@/api/common/manage'
  import { EduListMixin } from '@/mixins/EduListMixin'
  import { EduUtils } from '@/mixins/EduUtils'
  import JSelectKssjd from '@/components/kwglbiz/JSelectKssjd'
  import JSelectJiaoxueKecheng from '@/components/kwglbiz/JSelectJiaoxueKecheng'
  import JSelectZyb from '@/components/kwglbiz/JSelectZyb'
  import JSelectZyByZyb from '@/components/kwglbiz/JSelectZyByZyb'
  import JSelectXueqi from '@/components/kwglbiz/JSelectXueqi'
  import JSelectBanji from '@/components/kwglbiz/JSelectBanji'

  export default {
    name: 'veJwAnPaiKaoshiModel',
    mixins: [EduUtils],
    components: { JSelectBanji, JSelectXueqi, JSelectZyByZyb, JSelectZyb, JSelectJiaoxueKecheng, JSelectKssjd },
    data() {
      return {
        // 是否是普通添加
        isAdd: true,
        // 班级信息
        bjData:{
          // 每班考试人数
          num: 0,
        },
        form: this.$form.createForm(this),
        // eduurl: 'http://159.75.200.65:4010',
        title: '操作',
        flag: true,
        jzs: {},
        jss: {},
        specs: {},
        xiaoquList: {},
        width: 800,
        visible: false,
        model: {
        },
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
          //   name: { rules: [{ required: true, message: '请输入考试名称!' }] },
          falid: { rules: [{ required: true, message: '请选择专业组!' }] },
          specid: { rules: [{ required: true, message: '请选择专业!' }] },
          kcid: { rules: [{ required: true, message: '请选择课程!' }] },
          semid: { rules: [{ required: true, message: '请选择学期!' }] },
          ksfsm: { rules: [{ required: true, message: '请选择考试方式!' }] },
          ksxzm: { rules: [{ required: true, message: '请选择考试性质!' }] },
          ksxsm: { rules: [{ required: true, message: '请选择考试形式!' }] },
          bjid: { rules: [{ required: true, message: '请选择班级!' }] },
          ksrq: { rules: [{ required: true, message: '请选择考试日期' }] },
          kssjdid: { rules: [{ required: true, message: '请选择考试时间段!' }] },
          campusid: { rules: [{ required: true, message: '请选择校区!' }] },
          jzid: { rules: [{ required: true, message: '请选择教学楼!' }] },
          jsid: { rules: [{ required: true, message: '请选择考试教室!' }] },
          number: { rules: [{ required: true, message: '请填写最多参加人数!' }] },
          // ispublish: { rules: [] },
          // status: { rules: [{ required: true, message: '请输入状态（1=启用，0=禁用）!' }] },
          // createuserid: { rules: [{ required: true, message: '请输入创建人ID!' }] },
          // createtime: { rules: [{ required: true, message: '请输入创建时间!' }] },
          // terminalid: { rules: [{ required: true, message: '请输入终端ID!' }] },
          kcmc: { rules: [] },
          cjstatus: { rules: [] }
        },
        url: {
          add: '/kwgl/veJwKaoshi/add',
          edit: '/kwgl/veJwKaoshi/edit',
          getBuildingList: '/jxzy/jwJianzhu/list',
          getClassroomList: '/jxzy/jwJiaoshi/list'
        },
        // 临时存储课程的信息
        record: null,
      }
    },
    created() {
      this.getDepartment()
      this.getXiaoqu()
    },
    methods: {
      zybChange(code) {
        this.form.setFieldsValue(
          pick(
            { specid: '' },
            'specid'))

        if (this.$refs.zyByZyb != null) {
          this.$refs.zyByZyb.initDictData(code)
        }
      },
      add(record) {
        this.record = record;
        this.edit({})
      },
      edit(record) {
        record.semid = record.semid == null ? null : record.semid + ''

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
          if (this.$refs.zyByZyb != null && record.falid != '' && record.falid != null) {
            this.$refs.zyByZyb.initDictData(record.falid)
          }
          this.form.setFieldsValue(
            pick(
              this.model,
              'name',
              'falid',
              'specid',
              'kcid',
              'semid',
              'ksfsm',
              'ksxzm',
              'ksxsm',
              'ksrqsj',
              'ksrq',
              'kssjdid',
              'campusid',
              'jzid',
              'jsid',
              'bjid',
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
      getXiaoqu() {
        getActionCampusById().then((res) => {
          console.log(res)
          if (res.success) {
            this.xiaoquList = res.result
          }
        })
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
            formData.bjid = this.record.id;
            formData.kcid = this.record.kcid;
            formData.semid = this.record.semid;
            formData.falid = this.record.falid;
            formData.specid = this.record.specid;
            formData.bjNumber = this.record.number;
            formData.gradeid = this.record.gradeid;

            // 如果是拆班的话
            if(!this.isAdd){
              formData.maxNumber = this.bjData.num;
            }

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
      campusSelect(value) {
        console.log(value)
        var that = this
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
        var that = this
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
      }
    }
  }
</script>
<style scoped lang="less">
  
  table{
    width: 90%;
    margin: auto;
    th,td{
      padding: 5px;
      border: 1px solid #ddd;
    }
    th{
      background-color: #f0f0f0;
    }
  }
</style>