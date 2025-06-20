<template>
    <a-modal
      :title="title"
      :width="width"
      :visible="visible"
      :confirmLoading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
      cancelText="关闭">



      <a-table
        ref="table"
        size="middle"
        bordered
        rowKey="id"
        :columns="columns"
        :dataSource="showDataSource"
        :pagination="ipagination"
        :loading="loading"
        :rowSelection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
        @change="handleTableChange"
      >

<!--  <span slot="action" slot-scope="text, record">-->

<!--            <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">-->
<!--            <a>删除</a>-->
<!--            </a-popconfirm>-->

<!--        </span>-->
      </a-table>



    </a-modal>
</template>

<script>
  import { httpAction } from '@/api/common/manage'
  import pick from 'lodash.pick'
  // import { EduListMixin } from '@/mixins/EduListMixin'
  import { EduListMixin } from '@/mixins/KwglMixin'
  import { validateDuplicateValue } from '@/utils/util'

  export default {
    name: 'VeJwJingsaiCheckGroupModal',
    mixins: [EduListMixin],
    components: {},
    data() {
      return {
        disableMixinCreated: true,
        form: this.$form.createForm(this),
        title: '竞赛统计',
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
        description: '竞赛统计',
        // 表头
        columns: [
          {
            title: '#',
            dataIndex: '',
            key: 'rowIndex',
            width: 60,
            align: 'center',
            customRender: function(t, r, index) {
              return parseInt(index) + 1
            },
          },
          {
            title: '用户名',
            align: 'center',
            dataIndex: 'username',
          },
          {
            title: '专业部',
            align: 'center',
            dataIndex: 'ckid_dictText',
          },
          {
            title: '专业',
            align: 'center',
            dataIndex: 'num',
          },
          {
            title: '班级',
            align: 'center',
            dataIndex: 'num',
          },
          {
            title: '成绩',
            align: 'center',
            dataIndex: 'num',
          },
        ],
        url: {
          list: '/edu-schedule/jingsaiProject/veJwJingsaiBaoming/list',
          delete: "/edu-schedule/jingsaiProject/veJwJingsaiBaoming/delete",
        },
        isorter: [],
      }
    },
    created() {
    },
    methods: {
      selectGroup(record) {
        console.log('selectGroup', record)
        this.visible = true
        this.queryParam.projectid = record.id
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
    }
  }
</script>