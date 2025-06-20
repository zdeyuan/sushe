<template>
  <div>
    <a-modal title="回收站" :width="1000" placement="right" okText="确定" cancel-text="取消" @cancel="handleCancel" @ok="handleOk" :visible="visible$1">
      <g-tools :fields="toolsFields" />
      <!-- <div style="display: inline-block;">
        <a-button style="background-color: #F88600;color: #FFFFFF;margin-right: 20px">
          <IconFont type="iconziliaodanganwupinxiaohuishenpibiao"></IconFont>
          销毁
        </a-button>
        <a-button style="background-color: #00D09D;color: #FFFFFF;margin-right: 20px">
          <IconFont type="iconhuanyuanmulu"></IconFont>
          还原
        </a-button>
        <a-button style="background-color: #66C3FD;color: #FFFFFF;">
          <IconFont type="iconshuaxin"></IconFont>
          刷新
        </a-button>
      </div>

      <div style="display: inline-block;float: right">
        <a-input style="width: 120px;margin-right: 10px"></a-input>
        <a-button style="background-color: #028BE2;color: #FFFFFF;margin-right: 10px">
          <IconFont type="iconsousuo"></IconFont>
          搜索
        </a-button>
        <a-button style="background-color: #F88600;color: #FFFFFF">
          <IconFont type="iconshanchu"></IconFont>
          清空
        </a-button>
      </div>-->
      <g-table ref="refTable" :columns="columns" :data="loadData" :scroll="scroll" :row-selection="rowSelection" row-key="id">
        <span slot="actionS">
          <a style="color:#17C0C2">查看</a>
          <a-divider type="vertical" />
          <a style="color:#F88600">销毁</a>
          <a-divider type="vertical" />
          <a style="color:#17C295">还原</a>
        </span>
      </g-table>
    </a-modal>
  </div>
</template>
<script>
import { apiScheduleClassChoiceXksj } from '@/api/schedule/index'
import GTable from '@/components/GTable/'
import GTools from '@/components/GTools/'
const columns = [
  { title: '学期', dataIndex: 'semid', key: 'semid', width: 100 },
  { title: '开始选课日期', dataIndex: 'starttime', key: 'starttime', width: 120 },
  { title: '停止选课日期', dataIndex: 'endtime', key: 'endtime', width: 120 },
  { title: '描述', dataIndex: 'remark', key: 'remark', width: 150 },
  { title: '排序码', dataIndex: 'ordernum', key: 'ordernum', width: 100 },
  { title: '创建时间', dataIndex: 'k6', key: 'k6', width: 120 },
  { title: '操作', fixed: 'right', key: 'actions', width: 160, scopedSlots: { customRender: 'actionS' } },
]

const searchParams = {
  createtime: undefined, // 创建时间
  deletetime: undefined, // 删除时间
  starttime: undefined, // 选课开始时间
  endtime: undefined, // 选课结束时间
  updatetime: undefined, // 修改时间
  createuserid: undefined, // 创建用户id
  createusername: '', // 创建用户名
  // id: '', // 自增长主键ID
  isdelete: 1, // 是否删除
  ordernum: undefined, // 排序
  // pageNo: '', // pageNo
  // pageSize: '', // pageSize
  remark: undefined, // 描述
  semid: undefined, // 学期ID
  semname: '', // 学期
  status: undefined, // 是否有效
  terminalid: undefined, // 终端系统ID
}

export default {
  name: 'XksjRecycle',
  props: {
    visible: { type: Boolean },
  },
  data() {
    const _t = this
    return {
      columns,
      scroll: { x: 1200 },
      selected: [], // 已选学期，用于批量操作
      selectedRowKeys: [], // 已选学期，值
      searchParams: { ...searchParams },
      toolsFields: [
        { fieldType: 'button', label: '销毁', icon: 'fire', type: 'warning', handler: _t.onClickToolAddition },
        { fieldType: 'button', label: '还原', icon: 'undo', type: 'success', handler: _t.onClickToolExport },
        { fieldType: 'button', label: '刷新', icon: 'sync', type: 'primary', handler: _t.onClickToolRecycle },
        {
          placement: 'right',
          render(h) {
            return h('a-input', {
              props: { placeholder: '请输入', value: _t.searchParams.semname, allowClear: true },
              on: {
                'change.value'(e) {
                  _t.searchParams.semname = e
                },
              },
              style: { width: '150px' },
              class: ['g-tools__field'],
            })
          },
        },
        {
          fieldType: 'button',
          label: '搜索',
          icon: 'search',
          placement: 'right',
          type: 'primary',
          handler: _t.onClickToolSearch,
        },
        {
          fieldType: 'button',
          label: '清空',
          icon: 'rest',
          placement: 'right',
          type: 'warning',
          handler: _t.onClickToolClear,
        },
      ],
    }
  },
  created() {},
  computed: {
    visible$1: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', val)
      },
    },
    rowSelection() {
      return {
        selectedRowKeys: this.selectedRowKeys,
        onChange: (selectedRowKeys, selectedRows) => {
          this.selectedRowKeys = selectedRowKeys
          this.selected = selectedRows
        },
      }
    },
    selectedIds() {
      return this.selectedRowKeys.map((o) => o.id)
    },
  },
  components: {
    GTable,
    GTools,
  },
  watch: {
    visible(n) {
      if (n) {
        this.$nextTick(this.refreshTable)
      }
    },
  },
  methods: {
    onClickToolDestory() {
      if (!this.selectedIds.length) {
        this.$message.info('请选择需要操作的学期')
      }
      const ids = this.selectedIds.join(',')
      this.batchDestory(ids)
    },
    onClickToolReverse() {
      if (!this.selectedIds.length) {
        this.$message.info('请选择需要操作的学期')
      }
      const ids = this.selectedIds.join(',')
      this.batchReverse(ids)
    },
    onClickToolRefresh() {
      this.refreshTable()
    },
    onClickToolSearch() {
      this.refreshTable(1)
    },
    onClickToolClear() {
      this.searchParams = { ...searchParams } // 筛选数据
    },
    handleCancel() {
      this.visible$1 = false
    },
    // 表格事件
    onClickView(record) {
      this.$emit('view', record)
    },
    onClickDestory(record) {
      const ids = record.id
      this.batchDestory(ids)
    },
    onClickReverse(record) {
      const ids = record.id
      this.batchReverse(ids)
    },

    handleOk() {
      this.visible$1 = false
      this.$emit('ok')
    },
    // 刷新表格
    refreshTable(b = 0) {
      this.selectedRowKeys = []
      this.$refs.refTable.refresh(b)
    },
    // 表格拉取数据
    loadData(params) {
      params = { ...params, ...this.searchParams }
      return apiScheduleClassChoiceXksj.getPageList(params).then((res) => res.result)
    },
    batchDestory(ids) {
      return apiScheduleClassChoiceXksj.batchDestory(ids).then(() => {
        this.selectedRowKeys = []
        this.$emit('update')
      })
    },
    batchReverse(ids) {
      return apiScheduleClassChoiceXksj.batchReverse(ids).then(() => {
        this.selectedRowKeys = []
        this.$emit('update')
      })
    },
  },
}
</script>
