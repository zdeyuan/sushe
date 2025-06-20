<template>
  <a-modal
    :width="width"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    :closable="false"
    @cancel="handleCancel"
    okText="确认"  cancelText="取消"
    :footer="null"
  >
<!--    :title="title"-->
    <p style="position: absolute;height: 60px;background-color: rgb(54,139,219);width: 100%;margin-left: -24px;margin-top: -24px;
      font-size: 24px;font-family: Microsoft YaHei;font-weight: 400;
      border-top-right-radius: 3px;border-top-left-radius: 3px;color:white;line-height: 60px;padding:0 10px 0 20px;">
      查看考试信息
      <img style="float: right;width: 30px;margin-top: 22px;cursor:pointer;" @click="visible=false" src="@/assets/icon/icon_del.png" />
    </p>
    <a-spin :spinning="confirmLoading" style="margin-top: 60px">
      <a-form :form="form">
        <a-row :gutter="24">
          <a-col :md="24" :sm="24">
            <div style="height: 40px; background-color: #66c3fe; padding: 10px; color: white; margin:0 10px">
              <span>基本信息</span>
            </div>
          </a-col>
          <a-col :md="24" :sm="24" >
            <table id="table" style="width: calc(100% - 20px);margin:0 10px" border="1" cellspacing="0">
              <tr>
                <td class="titleTd">考试名称</td>
                <td colspan="3" class="rightThreeTd">{{model.name}}</td>
              </tr>
              <tr>
                <td class="titleTd">课程</td>
                <td colspan="3" class="rightThreeTd">{{model.kcidDictText}}</td>
              </tr>

              <tr>
                <td class="titleTd">时间</td>
                <td colspan="3" class="rightThreeTd">{{model.ksrq}}</td>
              </tr>
              <tr>
                <td class="titleTd">地点</td>
                <td colspan="3" class="rightThreeTd">{{model.campusidName }} {{ model.jzidDictText }} {{ model.jsidDictText }}</td>
              </tr>

              <tr>
                <td class="titleTd">考试人数</td>
                <td class="rightTd">{{model.number}}</td>
                <td class="titleTd">考试方式</td>
                <td class="rightTd">{{model.ksfsmDictText}}</td>
              </tr>
              <tr>
                <td class="titleTd">考试性质</td>
                <td class="rightTd">{{model.ksxzmDictText}}</td>
                <td class="titleTd">考试形式</td>
                <td class="rightTd">{{model.ksxsmDictText}}</td>
              </tr>
            </table>
          </a-col>
<!--          <a-col :md="24" :sm="24">-->
<!--            <a-form-item label="考试名称" :labelCol="labelCol" :wrapperCol="wrapperCol">-->

<!--            </a-form-item>-->
<!--          </a-col>-->
<!--          <a-col :md="24" :sm="24">-->
<!--            <a-form-item label="课程" :labelCol="labelCol" :wrapperCol="wrapperCol">-->
<!--              {{model.kcidDictText}}-->
<!--            </a-form-item>-->
<!--          </a-col>-->
<!--          <a-col :md="24" :sm="24">-->
<!--            <a-form-item label="时间" :labelCol="labelCol" :wrapperCol="wrapperCol">-->
<!--              {{model.ksrq}}-->
<!--            </a-form-item>-->
<!--          </a-col>-->
<!--          <a-col :md="24" :sm="24">-->
<!--            <a-form-item label="地点" :labelCol="labelCol" :wrapperCol="wrapperCol">-->
<!--              {{model.campusidName }} {{ model.jzidDictText }} {{ model.jsidDictText }}-->
<!--            </a-form-item>-->
<!--          </a-col>-->
<!--          <a-col :md="12" :sm="24">-->
<!--            <a-form-item label="考试人数" :labelCol="labelCol" :wrapperCol="wrapperCol">-->
<!--              {{model.number}}-->
<!--            </a-form-item>-->
<!--          </a-col>-->
<!--          <a-col :md="12" :sm="24">-->
<!--            <a-form-item label="考试方式" :labelCol="labelCol" :wrapperCol="wrapperCol">-->
<!--              {{model.ksfsmDictText}}-->
<!--            </a-form-item>-->
<!--          </a-col>-->
<!--          <a-col :md="12" :sm="24">-->
<!--            <a-form-item label="考试性质" :labelCol="labelCol" :wrapperCol="wrapperCol">-->
<!--              {{model.ksxzmDictText}}-->
<!--            </a-form-item>-->
<!--          </a-col>-->
<!--          <a-col :md="12" :sm="24">-->
<!--            <a-form-item label="考试形式" :labelCol="labelCol" :wrapperCol="wrapperCol">-->
<!--              {{model.ksxsmDictText}}-->
<!--            </a-form-item>-->
<!--          </a-col>-->
        </a-row>
      </a-form>
    </a-spin>

    <div style="text-align: center;border: 0px;margin-top: 40px">
<!--      <edu-caozuo-button type="11" @click="handleOk" title="确定" ></edu-caozuo-button>-->
      <edu-caozuo-button type="15" @click="visible=false" title="返回" ></edu-caozuo-button>
    </div>
  </a-modal>
</template>

<style lang="less" scoped>

  #table{
    border-top: 1px solid #dddddd;
    border-left: 1px solid #dddddd;
    border-collapse: collapse; /*设置单元格的边框合并为1*/
  }
  #table td {
    border-bottom: 1px solid #dddddd;
    border-right: 1px solid #dddddd;
  }

  .titleTd {
    min-height: 48px;
    background-color: rgb(248,248,248);
    width: 25%;
    text-align: center;
    color: #666;
    font-weight: bold;
  }

  .rightThreeTd {
    min-height: 48px;
    padding-left: 12px;
    height: 48px;
    background-color: white;
    width: 75%;
  }

  .rightTd {
    padding-left: 12px;
    height: 48px;
    background-color: white;
    width: 25%;
  }
</style>

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
    name: 'VeJwKaoshiModal',
    mixins: [EduUtils],
    components: { JSelectBanji, JSelectXueqi, JSelectZyByZyb, JSelectZyb, JSelectJiaoxueKecheng, JSelectKssjd },
    data() {
      return {
        form: this.$form.createForm(this),
        // eduurl: 'http://159.75.200.65:4010',
        title: '操作',
        flag: true,
        jzs: {},
        jss: {},
        specs: {},
        xiaoquList: {},
        width: "70%",
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
        }
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
      add() {
        this.edit({})
      },
      edit(record) {
        // record.ksfsm = record.ksfsm == null ? null : record.ksfsm + ''
        // record.ksxzm = record.ksxzm == null ? null : record.ksxzm + ''

        // record.falid =  record.falid == null ? null : record.falid + ''
        // record.specid =  record.specid == null ? null : record.specid + ''

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
      //
      // getDepartment() {
      //   var getDeparementUrl = window._CONFIG['domianBaseURL'] + '/common/veCommon/queryFacultyList'
      //   getAction(getDeparementUrl)
      //     .then((res) => {
      //       if (res.success) {
      //         this.deps = res.result
      //         console.log('------------------------')
      //         console.log(this.deps)
      //       } else {
      //         this.$message.warning(res.message)
      //       }
      //     })
      //     .finally(() => {
      //       this.loading = false
      //     })
      // },
      //
      // depSelect(value) {
      //   console.log(value)
      //   var getSpecUrl = this.eduurl + '/common/veCommon/querySpecialtyListByFalId'
      //   getAction(getSpecUrl, { id: this.id, falId: value })
      //     .then((res) => {
      //       if (res.success) {
      //         this.specs = res.result
      //         console.log(this.specs)
      //       } else {
      //         this.$message.warning(res.message)
      //       }
      //     })
      //     .finally(() => {
      //       this.loading = false
      //     })
      // },

      campusSelect(value) {
        console.log(value)
        var that = this
        getAction(this.url.getBuildingList, { campusid: value, pageSize: 9999 })
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
        getAction(this.url.getClassroomList, { jzid: value, pageSize: 9999 })
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