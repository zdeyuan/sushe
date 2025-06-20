<template>
  <a-card :bordered="false">
    <a-modal
      :title="title"
      :width="width"
      :visible="visible$1"
      placement="right"
      okText="确定"
      cancel-text="取消"
      @cancel="handleCancel"
      @ok="handleOk"
    >
      <div style="display: inline-block;">
        <a-button style="background-color: #F88600;color: #FFFFFF;margin-right: 20px" @click="handleOff">
          <IconFont type="iconziliaodanganwupinxiaohuishenpibiao"></IconFont>
          销毁
        </a-button>
        <a-button style="background-color: #00D09D;color: #FFFFFF;margin-right: 20px" @click="handleRevert">
          <IconFont type="iconhuanyuanmulu"></IconFont>
          还原
        </a-button>
        <a-button style="background-color: #66C3FD;color: #FFFFFF;" @click="loadData(1)">
          <IconFont type="iconshuaxin"></IconFont>
          刷新
        </a-button>
      </div>

      <div style="display: inline-block;float: right">
        <a-select v-model="queryParam.semid" style="width: 160px" placeholder="学期">
          <a-select-option v-for="item in semesters" :key="item.id" :value="item.id">
            {{ item.xqmc }}
          </a-select-option>
        </a-select>
        <a-button style="background-color: #028BE2;color: #FFFFFF;margin-right: 10px" @click="loadData()">
          <IconFont type="iconsousuo"></IconFont>
          搜索
        </a-button>
        <a-button style="background-color: #F88600;color: #FFFFFF" @click="handleReset">
          <IconFont type="iconshanchu"></IconFont>
          清空
        </a-button>
      </div>
      <a-table
        ref="table"
        size="middle"
        bordered
        rowKey="id"
        :columns="columns"
        :data-source="dataSource"
        :row-selection="rowSelection"
        :pagination="ipagination"
        :loading="loading"
        @change="handleTableChange"
        style="margin-top: 20px"
      >
        <span slot="action" slot-scope="text, record">
          <a style="color:#17C0C2" @click="handleView(record)">查看</a>
          <a-divider type="vertical" />
          <a style="color:#F88600" @click="handleOff(record)">销毁</a>
          <a-divider type="vertical" />
          <a style="color:#17C295" @click="handleRevert(record)">还原</a>
        </span>
      </a-table>
    </a-modal>
  </a-card>
</template>
<script>
import { IconFont } from '@/cas/ico'
import apiScheduleClassChoiceXkms from '@/api/schedule/classChoice-xkms'
import { EduListMixin } from '@/mixins/EduListMixin'

const columns = [
  {
    title: '模式',
    dataIndex: 'name'
  },
  {
    title: '课程',
    dataIndex: 'kcmc'
  },
  {
    title: '描述',
    width: 200,
    dataIndex: 'remark'
  },
  {
    title: '操作',
    align: 'center',
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  name: 'recycleModel',
  mixins: [EduListMixin],
  components: {
    IconFont
  },
  props: {
    semesters: {
      type: Array
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      columns,
      width: 1000,
      title: '回收站',
      form: this.$form.createForm(this),
      isorter: [],
      queryParam: {},
      selectedRows: []
    }
  },
  computed: {
    visible$1: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', val)
      }
    },
    rowSelection() {
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          this.selectedRows = selectedRows
        },
        getCheckboxProps: record => ({
          props: {
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
            name: record.name
          }
        })
      }
    }
  },
  watch: {
    visible(val) {
      if (val) {
        this.loadData()
      }
    }
  },
  methods: {
    getQueryParams() {
      //获取查询条件
      const param = { ...this.queryParam }
      param.pageNo = this.ipagination.current
      param.pageSize = this.ipagination.pageSize
      param.isdelete = 1
      return param
    },
    loadData(arg) {
      if (arg === 1) {
        this.ipagination.current = 1
        this.selectedRows = []
      }
      const params = this.getQueryParams()
      this.loading = true
      apiScheduleClassChoiceXkms.getPageList(params).then(res => {
        const { success, result, message } = res
        if (success) {
          const { records, total } = result
          this.dataSource = records
          this.ipagination.total = total
        } else {
          this.$message.warning(message)
        }
        this.loading = false
      })
    },
    handleCancel() {
      this.visible$1 = false
    },
    handleOk() {
      this.visible$1 = false
    },
    handleView(record) {
      this.$emit('examine', record)
    },
    successCallback(res) {
      if (res.success) {
        this.$message.success('提交成功！')
        this.loadData(1)
        this.$emit('refresh-data')
      } else {
        this.$message.warning(res.message)
      }
    },
    handleOff(record) {
      let ids = []
      if (record.id) {
        ids = [record.id]
      } else {
        ids = this.selectedRows.map(row => row.id)
      }
      if (!ids.length) {
        return this.$message.warning('请至少选择一条记录！')
      }
      const _this = this
      this.$confirm({
        title: '提示',
        content: '此操作将选中记录销毁, 是否继续?',
        onOk() {
          return new Promise((resolve, reject) => {
            apiScheduleClassChoiceXkms.batchOff({ ids: ids.join(',') }).then(res => {
              _this.successCallback(res)
              resolve()
            })
          })
        },
        onCancel() {}
      })
    },
    handleRevert(record) {
      let ids = []
      if (record.id) {
        ids = [record.id]
      } else {
        ids = this.selectedRows.map(row => row.id)
      }
      if (!ids.length) {
        return this.$message.warning('请至少选择一条记录！')
      }
      apiScheduleClassChoiceXkms.batchReverse({ ids: ids.join(',') }).then(this.successCallback)
    },
    handleReset() {
      this.queryParam = {}
    }
  }
}
</script>
<style scoped></style>
