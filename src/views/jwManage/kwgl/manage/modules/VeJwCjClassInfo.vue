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
    <a-table
      ref="table"
      size="middle"
      rowKey="id"
      :columns="columns"
      :dataSource="showDataSource"
      :pagination="ipagination"
      :loading="loading"
      :rowSelection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
      @change="handleTableChange"
    >
      <span slot="score" slot-scope="text, record">
        <span v-if="record.ksxsid == 1">{{ record.kccj }}</span>
        <span v-if="record.ksxsid == 2">{{ record.kcdjcjmDictText }}</span>
      </span>
    </a-table>
  </a-modal>
</template>

<script>
import { httpAction } from '@/api/common/manage'
import pick from 'lodash.pick'
// import { EduListMixin } from '@/mixins/EduListMixin'
import { EduListMixin } from '@/mixins/KwglMixin'
import { validateDuplicateValue } from '@/utils/util'

export default {
  name: 'VeJwCjClassInfo',
  mixins: [EduListMixin],
  components: {},
  data() {
    return {
      disableMixinCreated: true,
      form: this.$form.createForm(this),
      title: '操作',
      width: '70%',
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
      description: '教材库存表管理页面',
      // 表头
      columns: [
        {
          title: '考试方式',
          align: 'center',
          dataIndex: 'ksxsidDictText',
        },
        {
          title: '学生',
          align: 'center',
          dataIndex: 'xm',
        },
        {
          title: '学号',
          align: 'center',
          dataIndex: 'xh',
        },

        {
          title: '课程',
          align: 'center',
          dataIndex: 'kcidDictText',
        },
        {
          title: '成绩',
          align: 'center',
          scopedSlots: { customRender: 'score' },
        },

        {
          title: '年级',
          align: 'center',
          dataIndex: 'gradeidName',
        },
        {
          title: '学期',
          align: 'center',
          dataIndex: 'semidName',
        },
        {
          title: '学制',
          align: 'center',
          dataIndex: 'xzidName',
        },

        {
          title: '院系',
          align: 'center',
          dataIndex: 'falidName',
        },
        {
          title: '专业',
          align: 'center',
          dataIndex: 'specidName',
        },

        {
          title: '行政班',
          align: 'center',
          dataIndex: 'xzbidName',
        },

        // {
        //   title:'考试日期',
        //   align:"center",
        //   dataIndex: 'ksrqsj'
        // },
        // {
        //   title:'平时成绩',
        //   align:"center",
        //   dataIndex: 'pscj'
        // },
        // {
        //   title:'分数类考试成绩',
        //   align:"center",
        //   dataIndex: 'fslkscj'
        // },
        // {
        //   title:'等级类考试成绩',
        //   align:"center",
        //   dataIndex: 'djlkscj'
        // },

        {
          title: '审核状态',
          align: 'center',
          dataIndex: 'auditstatusDictText',
        },
      ],
      url: {
        list: '/jxzy/jwJiaocaiKucun/list',
      },
      isorter: [],
    }
  },
  created() {},
  methods: {
    select(record) {
      console.log('select', record)
      this.visible = true
      this.queryParam.jcid = record.id
      this.searchQuery()
    },
    close() {
      this.$emit('close')
      this.visible = false
    },

    handleOk() {
      this.close()
    },
    handleCancel() {
      this.close()
    },
  },
}
</script>