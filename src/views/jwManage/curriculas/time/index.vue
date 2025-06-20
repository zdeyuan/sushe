<template>
  <a-card :bordered="false">
<!--    <div>-->
<!--      <p style="font-weight: bold;color: #999999;font-size: 18px">学期选课时间</p>-->
<!--    </div>-->
    <g-tools :fields="toolsFields" />

    <g-table ref="refTable" :columns="columns" :data="loadData" :scroll="scroll" :row-selection="rowSelection" row-key="id">
      <span slot="action" slot-scope="a,b">
        <a-switch :checked="b.status == 1" @change="onClickChangeStatus(b)" />
      </span>
      <span slot="actionS" slot-scope="a,b">
        <a @click="onClickView(b)" style="color:#17C295">查看</a>
        <a-divider type="vertical" />
        <a @click="onClickEdit(b)" style="color:#0098F8">编辑</a>
        <a-divider type="vertical" />
        <a @click="onClickDel(b)" style="color:#FC8950">删除</a>
      </span>
    </g-table>
    <!-- 新增编辑 -->
    <add-model :data="editData" :mode="editMode" :visible.sync="editVisible" @success-callback="onEditSuccessCallback" ref="addModel" />
    <examine-model ref="examineModel" />
    <!-- 回收 -->
    <recycle-model :visible.sync="recycleVisible" ref="recycleModel" @view="onRecycleView" @update="onRecycleUpdate" />
    <!-- 筛选 -->
    <screen-model :data.sync="searchParams" :visible.sync="screenVisible" @ok="onScreenSearchOk" ref="screenModel" />
  </a-card>
</template>
<script>
import { IconFont } from '@/cas/ico'
import GTable from '@/components/GTable/'
import GTools from '@/components/GTools/'
import addModel from '@/views/jwManage/curriculas/time/modules/addModel'
import examineModel from '@/views/jwManage/curriculas/time/modules/examineModel'
import recycleModel from '@/views/jwManage/curriculas/time/modules/recycleModel'
import screenModel from '@/views/jwManage/curriculas/time/modules/screenModel'
import { apiScheduleClassChoiceXksj } from '@/api/schedule/index'
import { childSycId } from '@/config'

import exportXls from '@/utils/exportXls'
const columns = [
  { title: '学期', dataIndex: 'semid', key: 'semid', width: 100 },
  { title: '开始选课日期', dataIndex: 'starttime', key: 'starttime', width: 250 },
  { title: '停止选课日期', dataIndex: 'endtime', key: 'endtime', width: 250 },
  { title: '排序码', dataIndex: 'ordernum', key: 'ordernum', width: 100 },
  { title: '创建时间', dataIndex: 'createtime', key: 'createtime', width: 200 },
  {
    title: '是否有效',
    dataIndex: 'status',
    key: 'status',
    fixed: 'right',
    width: 120,
    scopedSlots: { customRender: 'action' },
  },
  { title: '操作', fixed: 'right', key: 'actions', width: 250, scopedSlots: { customRender: 'actionS' } },
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
  isdelete: 0, // 是否删除
  ordernum: undefined, // 排序
  // pageNo: '', // pageNo
  // pageSize: '', // pageSize
  remark: undefined, // 描述
  semid: undefined, // 学期ID
  // semname: '', // 学期
  status: undefined, // 是否有效
  terminalid: undefined, // 终端系统ID
}
export default {
  data() {
    const _t = this
    return {
      columns,
      toolsFields: [
        { fieldType: 'button', label: '添加', icon: 'plus', type: 'primary', handler: _t.onClickToolAddition },
        { fieldType: 'button', label: '导出', icon: 'export', type: 'success', handler: _t.onClickToolExport },
        { fieldType: 'button', label: '回收站', icon: 'rest', type: 'warning', handler: _t.onClickToolRecycle },
        {
          fieldType: 'menus',
          label: '批量操作',
          type: 'primary',
          children: [{ label: '选中启用' }, { label: '选中禁用' }],
          handler: _t.onClickToolOnClickMenus,
        },
        { fieldType: 'button', label: '删除', icon: 'delete', type: 'danger', handler: _t.onClickToolDel },
        { fieldType: 'button', label: '刷新', icon: 'sync', type: 'primary', handler: _t.onClickToolRefresh },
        {
          fieldType: 'button',
          label: '筛选',
          icon: 'filter',
          type: 'warning',
          placement: 'right',
          handler: _t.onClickToolScreen,
        },
        {
          placement: 'right',
          render(h) {
            const Options = _t.semesterData.map((o, i) =>
              h(
                'a-select-option',
                {
                  props: {
                    value: o.id,
                  },
                  key: i,
                },
                o.xqmc
              )
            )
            return h(
              'a-select',
              {
                props: { placeholder: '请选择学期', value: _t.searchParams.semid, allowClear: true },
                on: {
                  change(val) {
                    _t.searchParams.semid = val
                  },
                },
                style: { width: '150px' },
                class: ['g-tools__field'],
              },
              [Options]
            )
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
          type: 'primary',
          handler: _t.onClickToolClear,
        },
      ],
      scroll: { x: 1200 },
      selected: [], // 已选学期，用于批量操作
      selectedRowKeys: [], // 已选学期，值
      semesterData: [], // 学期列表
      searchParams: { ...searchParams }, // 筛选数据
      screenVisible: false,
      editVisible: false, // 编辑弹框； 新增 编辑 查看 共用
      editData: null, // 编辑查看数据
      editMode: 1, // 编辑模式： 1 新增 / 2 编辑 / 3 查看
      recycleVisible: false, // 回收站
    }
  },
  created() {
    this.getSemesterList()
  },
  components: {
    GTable,
    GTools,
    IconFont,
    addModel,
    examineModel,
    recycleModel,
    screenModel,
  },
  computed: {
    rowSelection() {
      return {
        selectedRowKeys: this.selectedRowKeys,
        onChange: (selectedRowKeys, selectedRows) => {
          this.selectedRowKeys = selectedRowKeys
          this.selected = selectedRows
        },
        // getCheckboxProps: (record) => ({
        //   props: {
        //     disabled: record.name === 'Disabled User', // Column configuration not to be checked
        //     name: record.name,
        //   },
        // }),
      }
    },
    searchParams$1() {
      const { createtime, deletetime, starttime, endtime, updatetime, ...params } = this.searchParams
      const [createstarttime, createendtime] = createtime || []
      const [deletestarttime, deleteendtime] = deletetime || []
      const [startstarttime, starttendime] = starttime || []
      const [endstarttime, endtimende] = endtime || []
      const [updatestarttime, updateendtime] = updatetime || []
      const r = {
        ...params,
        createstarttime,
        createendtime,
        deletestarttime,
        deleteendtime,
        startstarttime,
        starttendime,
        endstarttime,
        endtimende,
        updatestarttime,
        updateendtime,
      }
      return r
    },
  },
  methods: {
    // 筛选搜索
    onScreenSearchOk() {
      this.refreshTable(1)
    },
    // tools 事件
    onClickToolAddition() {
      this.openEdit(1, null)
    },
    onClickToolExport() {
      const field = this.columns
        .map((o) => o.dataIndex)
        .filter((o) => o)
        .join(',')
      const { current, pageSize } = this.$refs.refTable.localPagination
      const params = { current, pageSize, ...this.searchParams$1 }

      // 导出
      exportXls({
        url: '/edu-schedule/classChoise/veJwXksj/exportXls',
        params: params,
        field: field,
      })
      // this.$message.info('功能开发中...')
    },
    onClickToolRecycle() {
      this.recycleVisible = true
    },
    onClickToolOnClickMenus({ item }, b) {
      const i = item.index
      if (!this.selected || !this.selected.length) {
        this.$message.info('请选择需要操作的学期')
      }
      const ids = this.selected.map((o) => o.id)
      switch (i) {
        case 0:
          this.batchValidStatus(ids)
          break
        case 1:
          this.batchInvalidStatus(ids)
          break
      }
    },
    onClickToolDel() {
      if (!this.selected || !this.selected.length) {
        this.$message.info('请选择需要删除的学期')
      }
      const ids = this.selected.map((o) => o.id).join(',')
      this.batchDel(ids)
    },
    onClickToolRefresh() {
      this.refreshTable()
    },
    onClickToolScreen() {
      this.screenVisible = true
    },
    onClickToolSearch() {
      this.refreshTable(1)
    },
    onClickToolClear() {
      this.searchParams = { ...searchParams } // 筛选数据
    },

    // 表格事件
    onClickChangeStatus(record) {
      const ids = record.id
      if (record.status === 1) {
        this.batchInvalidStatus(ids)
      } else {
        this.batchValidStatus(ids)
      }
    },
    onClickView(record) {
      this.openEdit(3, record)
    },
    onClickEdit(record) {
      this.openEdit(2, record)
    },

    onClickDel(b) {
      const ids = b.id
      this.batchDel(ids)
    },

    // 添加 编辑 回调
    onEditSuccessCallback() {
      this.refreshTable()
    },

    openEdit(mode, data) {
      this.editVisible = true
      this.editData = data
      this.editMode = mode
    },

    // 回收站时间
    onRecycleView(record) {
      this.onClickView(record)
    },
    onRecycleUpdate() {
      this.refreshTable()
    },

    // 刷新表格
    refreshTable(b = 0) {
      this.$refs.refTable.refresh(b)
      this.selectedRowKeys = []
    },
    // 拉取所有学期
    getSemesterList() {
      const params = { id: childSycId }
      apiScheduleClassChoiceXksj.getSemesterList(params).then((res) => {
        if (res.success) {
          this.semesterData = res.result || []
        }
      })
    },
    // 表格拉取数据
    loadData(params) {
      params = { ...params, ...this.searchParams$1 }
      return apiScheduleClassChoiceXksj.getPageList(params).then((res) => res.result)
    },

    batchDel(ids) {
      return apiScheduleClassChoiceXksj.batchDel(ids).then(() => {
        this.refreshTable()
        this.$message.info('操作成功')
      })
    },
    batchInvalidStatus(ids) {
      return apiScheduleClassChoiceXksj.batchInvalidStatus(ids).then(() => {
        this.refreshTable()
        this.$message.info('操作成功')
      })
    },
    batchValidStatus(ids) {
      return apiScheduleClassChoiceXksj.batchValidStatus(ids).then(() => {
        this.refreshTable()
        this.$message.info('操作成功')
      })
    },
  },
}
</script>
<style scoped>
</style>
