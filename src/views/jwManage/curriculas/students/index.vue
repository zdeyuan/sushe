<template>
  <a-card :bordered="false">
    <g-tools :fields="toolsFields" />
    <g-table
      ref="table"
      size="default"
      rowKey="id"
      :columns="columns"
      :data="loadData"
      :rowSelection="rowSelection"
      showPagination="auto"
      :scroll="{ x: 1000 }"
    >
      <span slot="msName" slot-scope="text">
        {{ text | msNameFilter(xkmsData) }}
      </span>
      <span slot="semName" slot-scope="text">
        {{ text | semNameFilter(semesterData) }}
      </span>
    </g-table>

    <screen-model
      ref="screenModel"
      :semester-data="semesterData"
      :xkms-data="xkmsData"
      :sim-id="queryParam.simid"
      @cancel="handleCancel"
      @ok="handleOk"
      :visible="visible"
      v-if="visible"
    ></screen-model>
  </a-card>
</template>
<script>
import GTable from '@/components/GTable'
import GTools from '@/components/GTools'

import screenModel from '@/views/jwManage/curriculas/students/modules/screenModel'
import { querySemesterList }  from '@/api/base/common-veCommon'
import { apiScheduleClassChoiceXkdj } from '@/api/schedule'
import {apiScheduleClassChoiceXkms} from '@/api/schedule/'

import { childSycId } from '@/config'
const columns = [
  {
    title: '选课模式',
    dataIndex: 'msid',
    key: 'msid',
    scopedSlots: {
      customRender: 'msName',
    },
  },
  {
    title: '学号',
    dataIndex: 'stunum',
    key: 'stunum',
  },
  {
    title: '学生',
    dataIndex: 'stuname',
    key: 'stuname',
  },

  {
    title: '学期',
    dataIndex: 'semid',
    key: 'semid',
    scopedSlots: {
      customRender: 'semName',
    },
  },
  {
    title: '创建时间',
    dataIndex: 'createtime',
    key: 'createtime',
  },
  {
    title: '最后修改时间',
    dataIndex: 'updatetime',
    key: 'updatetime',
  },
  {
    title: '创建者名称',
    dataIndex: 'createusername',
    key: 'createusername',
  },
]

export default {
  name: 'students',
  components: { GTable, GTools, screenModel },
  data() {
    this.columns = columns
    const _this = this
    return {
      // 筛选条件
      queryParam: {
        msid: undefined,
        semid:undefined,
        stuname: '',
      },
      // 头部配置
      toolsFields: [
        { fieldType: 'button', label: '刷新', icon: 'sync', type: 'primary', handler: _this.handleRefresh },
        {
          fieldType: 'button',
          label: '筛选',
          icon: 'filter',
          type: 'success',
          placement: 'right',
          handler: _this.handleFilter,
        },
        {
          placement: 'right',
          render(h) {
            const select = (
              <a-select
                placeholder="请选择学期"
                value={_this.queryParam.semid}
                onChange={_this.handleSelectChange}
                style="width:160px"
                class="g-tools__field"
              >
                {_this.semesterData.map((item) => (
                  <a-select-option key={item.id} value={item.id}>
                    {item.xqmc}
                  </a-select-option>
                ))}
              </a-select>
            )
            return select
          },
        },
        {
          fieldType: 'button',
          label: '搜索',
          icon: 'search',
          type: 'primary',
          placement: 'right',
          handler: _this.handleSearch,
        },
        {
          fieldType: 'button',
          label: '清空',
          icon: 'delete',
          type: 'warning',
          placement: 'right',
          handler: _this.handleReset,
        },
      ],

      // 加载数据方法 必须为 Promise 对象
      loadData: (parameter) => {
        let params = { ...parameter, ...this.queryParam }
        return apiScheduleClassChoiceXkdj.getPageList(params).then((res) => {
          return res.result
        })
      },
      selectedRowKeys: [], //列表选择key
      selectedRows: [], //列表选择数据
      semesterData: [], //学期数据
      visible: false, // 筛选弹框
      xkmsData: [], //选课模式数据
    }
  },
  created() {
    this.getSemesterList()
    this.getXkmsData()
  },
  computed: {
    rowSelection() {
      return {
        selectedRowKeys: this.selectedRowKeys,
        onChange: this.onSelectChange,
      }
    },
  },
  filters: {
    semNameFilter(val, list) {
      let _obj = list.find((item) => item.id == val)
      return _obj ? _obj.xqmc : '-'
    },
    msNameFilter(val,list) {
      let _obj = list.find((item) => item.id == val)
      return _obj ? _obj.name : '-'
    },
  },
  methods: {
    // 刷新
    handleRefresh() {
      this.$refs.table.refresh(true)
    },
    // 筛选
    handleFilter() {
      this.visible = true
    },
    // 搜索
    handleSearch() {
      this.$refs.table.refresh(true)
    },
    // 清空
    handleReset() {
      this.queryParam = {
        msid: undefined,
        semid: undefined,
        stuname: '',
      }
    },
    // 选择学期
    handleSelectChange(val) {
      this.queryParam.semid = val
    },
    // 记录选择
    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },

    // 学期数据
    getSemesterList() {
      querySemesterList(childSycId).then((res) => {
        if (res.code == 200) {
          this.semesterData = res.result
        }
      })
    },

    // 筛选回调
    handleOk(vals) {
      this.visible = false;
      this.queryParam = {...vals};
      console.log(vals)
      this.$refs.table.refresh(true)
    },
    // 筛选取消
    handleCancel() {
      this.visible = false
    },

    // 获取选课模式列表
    getXkmsData() {
      let params = {
        pageNo: 1,
        pageSize: 500,
      }
      apiScheduleClassChoiceXkms.getPageList(params).then((res) => {
        if (res.code == 200) {
          this.xkmsData = res.result.records || []
        }
      })
    },
  },
}
</script>
<style src="" scoped>
</style>
