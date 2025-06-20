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
      <a-button type="primary" v-if="!disableSubmit" style="margin-left: 10px" @click="handleOk">保存</a-button>
    </template>
    <!--    :rowSelection="{ fixed: true, selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"-->
    <a-spin :spinning="confirmLoading">
      <a-table
        ref="table"
        size="middle"
        style="min-height: 500px"
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="false"
        :loading="loading"
        :scroll="{x:3000}"
        @change="handleTableChange"
      >
        <template slot="htmlSlot" slot-scope="text">
          <div v-html="text"></div>
        </template>
        <template slot="imgSlot" slot-scope="text">
          <span v-if="!text" style="font-size: 12px; font-style: italic">无此图片</span>
          <img
            v-else
            :src="getImgView(text)"
            height="25px"
            alt="图片不存在"
            style="max-width: 80px; font-size: 12px; font-style: italic"
          />
        </template>

        <template slot="kcxzm" slot-scope="text,record">
          <j-dict-select-tag
            style="width: 150px"
            v-model="record.kcxzm"
            placeholder="课程性质"
            dictCode="course_type"
          ></j-dict-select-tag>
        </template>

        <template slot="teachers" slot-scope="text,record">
          <j-select-teacher-user-id
            :multiple="true"
            v-model="record.teachers"
          ></j-select-teacher-user-id>
        </template>

        <template slot="jslx" slot-scope="text,record">
<!--          <a-select v-model="record.jslx" style="width: 150px">-->
<!--            <a-select-option :value="1">普通教室</a-select-option>-->
<!--            <a-select-option :value="2">多媒体教室</a-select-option>-->
<!--          </a-select>-->

          <j-dict-select-tag
            style="width: 150px"
            v-model="record.jslx"
            placeholder="请选择教室类型"
            dictCode="jslxdm"
          ></j-dict-select-tag>
        </template>

        <template slot="jhjs" slot-scope="text,record">
          <j-select-jiaoshi
            :multiple="true"
            v-model="record.jhjs"
          ></j-select-jiaoshi>
        </template>

        <template slot="jssl" slot-scope="text,record">
          <a-input-number min="1"
                          v-model="record.jssl"
          ></a-input-number>
        </template>

        <template slot="score" slot-scope="text,record">
          <a-input-number min="0"
            v-model="record.score"
          ></a-input-number>
        </template>

        <template slot="zxs" slot-scope="text,record">
          <a-input-number min="0"
                          v-model="record.zxs"
          ></a-input-number>
        </template>

        <template slot="zks" slot-scope="text,record">
          <a-input-number min="0"
                          v-model="record.zks"
          ></a-input-number>
        </template>

        <template slot="weeks" slot-scope="text,record">
          <a-input-number min="0"
                          v-model="record.weeks"
          ></a-input-number>
        </template>

        <template slot="llxs" slot-scope="text,record">
          <a-input-number min="0"
                          v-model="record.llxs"
          ></a-input-number>
        </template>


        <template slot="sjxs" slot-scope="text,record">
          <a-input-number min="0"
                          v-model="record.sjxs"
          ></a-input-number>
        </template>


        <template slot="hgfsx" slot-scope="text,record">
          <a-input-number min="0"
                          v-model="record.hgfsx"
          ></a-input-number>
        </template>

        <template slot="yxfsx" slot-scope="text,record">
          <a-input-number min="0"
                          v-model="record.yxfsx"
          ></a-input-number>
        </template>

        <span slot="action" slot-scope="text, record,recordIndex">
          <a-popconfirm title="确定删除吗?" @confirm="() => deleteData(recordIndex)">
            <a>删除</a>
          </a-popconfirm>
        </span>



        <span slot="isMerge" slot-scope="text, record">
          <a-switch
            v-model="record.isMerge"
            :active-value="1"
            :inactive-value="0"
          />
        </span>

        <span slot="isAble" slot-scope="text, record">
          <a-switch
            v-model="record.isAble"
            :active-value="1"
            :inactive-value="0"
          />
        </span>

        <template slot="beginTime" slot-scope="text, record">
          <j-date v-model="record.beginTime" width="100%" date-format="YYYY-MM-DD" />
        </template>

        <template slot="endTime" slot-scope="text, record">
          <j-date v-model="record.endTime"  width="100%" date-format="YYYY-MM-DD" />
        </template>

        <template slot="dsz" slot-scope="text, record">
          <a-select v-model="record.dsz">
            <a-select-option :value="0">不限</a-select-option>
            <a-select-option :value="1">单周</a-select-option>
            <a-select-option :value="1">双周</a-select-option>
          </a-select>
        </template>


<!--        &lt;!&ndash; 暂时写死 &ndash;&gt;-->
<!--        <span slot="kcxzm" slot-scope="text, record" style="text-align: center">-->
<!--          <span v-if="record.kcxzm == 1">公共基础课</span>-->
<!--          <span v-if="record.kcxzm == 2">学科基础课</span>-->
<!--          <span v-if="record.kcxzm == 3">专业课</span>-->
<!--        </span>-->
      </a-table>
    </a-spin>
  </a-modal>
</template>
<style scoped>
  .ant-table-body{
    min-height: 500px;
  }
</style>
<script>
  import { httpAction } from '@/api/common/manage'
  import { EduListMixin } from '@/mixins/EduListMixin'
  import pick from 'lodash.pick'
  import { validateDuplicateValue } from '@/utils/util'
  import JSelectGrade from '@/components/kwglbiz/JSelectGrade'
  import JSelectXueqi from '@/components/kwglbiz/JSelectXueqi'
  import JSelectTeacher from '@/components/kwglbiz/JSelectTeacher'
  import JSelectJiaoshi from '@/components/kwglbiz/JSelectJiaoshi'
  import JSelectTeacherUserId from '@/components/kwglbiz/JSelectTeacherUserId'

  export default {
    name: 'VeJwPyfaKcxqModal',
    mixins: [EduListMixin],
    components: { JSelectTeacherUserId, JSelectJiaoshi, JSelectTeacher, JSelectGrade, JSelectXueqi },
    data() {
      return {
        postData: {},
        form: this.$form.createForm(this),
        title: '操作',
        width: '90%',
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
        disableSubmit: false,
        confirmLoading: false,
        validatorRules: {
          gradeid: { rules: [{ required: true, message: '请选择年级' }] },
          semid: { rules: [{ required: true, message: '请选择学期!' }] },
          description: { rules: [] },
          isGraduate: { rules: [] },
          isAble: { rules: [] },
          status: { rules: [] },
          delFlag: { rules: [] }
        },
        columns: [
          {
            title: '课程',
            align: 'center',
            dataIndex: 'kcidName'
            // fixed:"left"
          },
          {
            title: '上课教师数量',
            align: 'center',
            dataIndex: 'jssl',
            scopedSlots: { customRender: 'jssl' },
          },
          {
            title: '课程计划教师',
            align: 'center',
            dataIndex: 'teachers',
            width:300,
            scopedSlots: { customRender: 'teachers' },
          },
          {
            title: '课程性质',
            align: 'center',
            width:180,
            dataIndex: 'kcxzm',
            scopedSlots: { customRender: 'kcxzm' },
          },
          {
            title: '教室类型',
            align: 'center',
            width:180,
            dataIndex: 'jslx',
            scopedSlots: { customRender: 'jslx' },
          },
          {
            title: '课程计划教室',
            align: 'center',
            width:300,
            dataIndex: 'jhjs',
            scopedSlots: { customRender: 'jhjs' },
          },
          // {
          //   title: '考试类型',
          //   align: 'center',
          //   dataIndex: 'kslx_dictText',
          // },
          // {
          //   title: '成绩类型',
          //   align: 'center',
          //   dataIndex: 'cjlx_dictText',
          // },
          {
            title: '学分',
            align: 'center',
            dataIndex: 'score',
            scopedSlots: { customRender: 'score' },
          },
          {
            title: '总学时',
            align: 'center',
            dataIndex: 'zxs',
            scopedSlots: { customRender: 'zxs' },
          },
          {
            title: '理论学时',
            align: 'center',
            dataIndex: 'llxs',
            scopedSlots: { customRender: 'llxs' },
          },
          {
            title: '实践学时',
            align: 'center',
            dataIndex: 'sjxs',
            scopedSlots: { customRender: 'sjxs' },
          },
          {
            title: '合格分数线',
            align: 'center',
            dataIndex: 'hgfsx',
            scopedSlots: { customRender: 'hgfsx' },
          },
          {
            title: '优秀分数线 ',
            align: 'center',
            dataIndex: 'yxfsx',
            scopedSlots: { customRender: 'yxfsx' },
          },
          {
            title: '预计开学日期',
            align: 'center',
            dataIndex: 'beginTime',
            scopedSlots: { customRender: 'beginTime' },
          },
          {
            title: '预计结束日期',
            align: 'center',
            dataIndex: 'endTime',
            scopedSlots: { customRender: 'endTime' },
          },
          {
            title: '预计周数',
            align: 'center',
            dataIndex: 'weeks',
            scopedSlots: { customRender: 'weeks' },
          },
          {
            title: '周课时',
            align: 'center',
            dataIndex: 'zks',
            scopedSlots: { customRender: 'zks' },
          },
          {
            title: '是否合班',
            align: 'center',
            dataIndex: 'isMerge',
            scopedSlots: { customRender: 'isMerge' }
          },
          {
            title: '单双周',
            align: 'center',
            dataIndex: 'dsz',
            scopedSlots: { customRender: 'dsz' }
          },
          // {
          //   title: '指定周',
          //   align: 'center',
          //   dataIndex: 'zdz'
          // },
          // {
          //   title: '培养方案ID',
          //   align: 'center',
          //   dataIndex: 'pyfaId'
          // },
          {
            title: '是否有效',
            align: 'center',
            dataIndex: 'isAble',
            scopedSlots: { customRender: 'isAble' }
          },
          {
            title: '操作',
            dataIndex: 'action',
            align: 'center',
            fixed: 'right',
            scopedSlots: { customRender: 'action' }
          }
        ],
        isorter: [],
        url: {
          list: '/jxgz/veJwKcjh/allList',
          add: '/jxgz/veJwPyfa/add',
          edit: '/jxgz/veJwPyfa/edit'
        },
        disableMixinCreated: true
      }
    },
    created() {
    },
    methods: {
      deleteData(index) {
        this.dataSource.splice(index, 1)
      },
      add() {
        this.edit({})
      },
      edit(record) {
        this.postData = record
        // if (record.id == null) {
        //   this.queryParam.pyfaId = null
        // } else {
        //   this.queryParam.pyfaId = record.id
        // }
        this.queryParam.falid = record.falid
        this.queryParam.specid = record.specid

        this.queryParam.semid = record.semid
        this.queryParam.gradeid = record.gradeid
        this.queryParam.xzid = record.xzid

        this.searchQuery()
        // this.form.resetFields()
        // this.model = Object.assign({}, record)
        this.visible = true
        // this.$nextTick(() => {
        //   this.form.setFieldsValue(
        //     pick(this.model, 'gradeid', 'semid', 'description', 'isGraduate', 'isAble', 'status', 'delFlag')
        //   )
        // })
      },
      close() {
        this.$emit('close')
        this.visible = false
      },
      handleOk() {
        const that = this
        // 触发表单验证
        // this.form.validateFields((err, values) => {
        //   if (!err) {
        that.confirmLoading = true
        let httpurl = ''
        let method = ''
        if (!this.postData.id) {
          httpurl += this.url.add
          method = 'post'
        } else {
          httpurl += this.url.edit
          method = 'put'
        }
        this.postData.chlidKcjhList = this.dataSource;
        // let formData = Object.assign(this.model, values)
        // console.log('表单提交数据', formData)
        httpAction(httpurl, this.postData, method)
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
        // }
        // })
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