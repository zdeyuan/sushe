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
      :dataSource="dataSource"
      :pagination="ipagination"
      :loading="loading"
      :rowSelection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
      @change="handleTableChange"
    >
    </a-table>
  </a-modal>
</template>

<script>
import { httpAction } from '@/api/common/manage'
import pick from 'lodash.pick'
import { EduListMixin } from '@/mixins/EduListMixin'
import { validateDuplicateValue } from '@/utils/util'

export default {
  name: 'JwJiaocaiKucuninfoModal',
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
          title: '教材名称',
          align: 'center',
          dataIndex: 'jcid_dictText',
        },
        {
          title: '仓库名称',
          align: 'center',
          dataIndex: 'ckid_dictText',
        },
        {
          title: '库存数量',
          align: 'center',
          dataIndex: 'num',
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