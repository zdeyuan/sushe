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
    <div class="table-operator">
<!--      <a-button @click="add" type="primary" icon="plus">新增</a-button>-->
<!--      <a-button type="primary" icon="download" @click="handleExportXls('ve_jw_qingkao')">导出</a-button>-->
<!--      <a-upload-->
<!--        name="file"-->
<!--        :showUploadList="false"-->
<!--        :multiple="false"-->
<!--        :headers="tokenHeader"-->
<!--        :action="importExcelUrl"-->
<!--        @change="handleImportExcel"-->
<!--      >-->
<!--        <a-button type="primary" icon="import">导入</a-button>-->
<!--      </a-upload>-->
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete" />移除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>
      </a-dropdown>
    </div>

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
      <span slot="action" slot-scope="text, record">
        <a-popconfirm title="确定移除该学生吗?" @confirm="() => handleDelete(record.id)">
          <a>移除</a>
        </a-popconfirm>
      </span>
    </a-table>
  </a-modal>
</template>

<script>
import { httpAction } from '@/api/common/manage'
import pick from 'lodash.pick'
import { EduListMixin } from '@/mixins/EduListMixin'
import { validateDuplicateValue } from '@/utils/util'

export default {
  name: 'VeJwQkStudentModal',
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
      description: '学生列表',
      // 表头
      columns: [
        // {
        //   title: '清考id',
        //   align: 'center',
        //   dataIndex: 'qkid',
        // },
        {
          title: '姓名',
          align: 'center',
          dataIndex: 'xm',
        },
        {
          title: '学号',
          align: 'center',
          dataIndex: 'xh',
        },
        // {
        //   title: '补考id',
        //   align: 'center',
        //   dataIndex: 'bkid',
        // },
        {
          title: '补考成绩',
          align: 'center',
          dataIndex: 'cjbk',
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          scopedSlots: { customRender: 'action' },
        },
      ],
      url: {
        list: '/kwgl/veJwQkXuesheng/list',
        delete: '/kwgl/veJwQkXuesheng/delete'
      },
      isorter: [],
    }
  },
  created() {},
  methods: {
    select(record) {
      console.log('select', record)
      this.visible = true
      this.queryParam.qkid = record.id
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