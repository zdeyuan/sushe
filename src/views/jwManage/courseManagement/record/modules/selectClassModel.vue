<template>
  <div>
    <a-modal :width="width" title="教学班列表" okText="确定" cancel-text="取消" @cancel="handleCancel" @ok="handleOk" :visible="visible$1">
      <a-form-model :model="searchParams" :label-col="{ span: 7 }" :wrapper-col="{ span: 17 }">
        <a-row>
          <a-col :span="6">
            <a-form-model-item label="名称">
              <a-input v-model="searchParams.xzbmc" placeholder="请输入名称"></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="6">
            <a-form-model-item label="校区">
              <a-select v-model="searchParams.campusId" style="width: 120px" placeholder="请选择校区">
                <a-select-option v-for="(o, i) in capmsList" :key="i" :value="o.id">{{o.xqmc}}</a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="6">
            <a-form-model-item label="所属年级">
              <a-select v-model="searchParams.gradeId" style="width: 100%" placeholder="请选择所属年级">
                <a-select-option v-for="(o, i) in gradeList" :key="i" :value="o.id">{{o.njmc}}</a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span="11">
            <a-form-model-item label="专业部·专业">
              <a-select v-model="searchParams.falId" style="width: 150px; margin-right: 10px" placeholder="请选择专业部">
                <a-select-option v-for="(o, i) in falList" :key="i" :value="o.id">{{o.yxmc}}</a-select-option>
              </a-select>
              <a-select v-model="searchParams.specId" style="width: 150px;" placeholder="请选择专业">
                <a-select-option v-for="(o, i) in specList" :key="i" :value="o.id">{{o.zymc}}</a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span="7" style="margin-top: 4px">
            <a-button type="primary" icon="search" @click="onClickSearch">搜索</a-button>
            <a-button type="warning" icon="rest" @click="onClickClean">清空</a-button>
          </a-col>
        </a-row>
      </a-form-model>

      <g-table ref="refTable" :columns="columns" :data="loadData" :row-selection="rowSelection" row-key="id"/>
    </a-modal>
  </div>
</template>
<script>
import apiBaseCommonVeCommon from '@/api/base/common-veCommon.js'
import GTools from '@/components/GTools'
import GTable from '@/components/GTable'
const columns = [
  { title: '名称', dataIndex: 'xzbmc', key: 'xzbmc' },
  { title: '年级', dataIndex: 'njmc', key: 'njmc' },
  { title: '专业', dataIndex: 'specName', key: 'specName' },
  { title: '校区', dataIndex: 'campusName', key: 'campusName' },
]

const searchParams = {
  xzbmc: '',
  campusId: undefined, //	校区ID
  falId: undefined, //	院系ID
  specId: undefined, //	专业ID
  gradeId: undefined, // 年级id
  status: undefined, 
  // status: 1, // 1可用 2不可用
}
export default {
  props: {
    visible: { type: Boolean },
    // values: { type: Array, default: () => [] },
  },
  data() {
    return {
      columns,
      width: 1200,
      selected: [], // 已选学期，用于批量操作
      selectedRowKeys: [], // 已选学期，值
      searchParams: { ...searchParams }, // 筛选数据
      capmsList: [], // 校区列表
      gradeList: [], // 年级列表
      falList: [], // 院系列表
      specList: [], // 专业列表，根据院系改变
    }
  },
  created() {
    this.initData()
  },
  computed: {
    rowSelection() {
      return {
        selectedRowKeys: this.selectedRowKeys,
        onChange: (selectedRowKeys, selectedRows) => {
          this.selectedRowKeys = selectedRowKeys;
          this.selected = selectedRows
        },
      }
    },
    // selectedRowKeys: {
    //   get() {
    //     return this.selected.map((o) => o.id)
    //   },
    // },
    // selected: {
    //   get() {
    //     return this.values
    //   },
    //   set(val) {
    //     this.$emit('update:values', val)
    //   },
    // },
    visible$1: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', val)
      },
    },
  },
  watch: {
    'searchParams.falId'(n) {
      if (n) {
        this.specList = []
        this.getSpecList(n)
      } else {
        this.specList = []
      }
    },
  },
  components: {
    GTools,
    GTable,
  },
  methods: {
    handleCancel() {
      this.visible$1 = false
    },
    handleOk() {
      this.visible$1 = false
      this.$emit('ok', this.selected)
    },
    onClickSearch() {
      this.refreshTable(1)
    },
    onClickClean() {
      this.searchParams = { ...searchParams } // 筛选数据
    },
    // 刷新表格
    refreshTable(b = 0) {
      this.$refs.refTable.refresh(b)
      this.selected = []
    },
    // 表格拉取数据
    loadData(params) {
      params = { ...params, ...this.searchParams }
      return apiBaseCommonVeCommon.queryBanJiPageList(params).then((res) => res.result)
    },
    initData() {
      this.getCapmsList()
      this.getGradeList()
      this.getFalList()
    },
    // 获取校区
    getCapmsList() {
      apiBaseCommonVeCommon.queryCampusList({}).then((res) => {
        this.capmsList = res.result || []
      })
    },
    // 获取年级
    getGradeList() {
      apiBaseCommonVeCommon.queryGradeList({}).then((res) => {
        this.gradeList = res.result || []
      })
    },
    // 获取院系
    getFalList() {
      apiBaseCommonVeCommon.queryFacultyList({}).then((res) => {
        this.falList = res.result || []
      })
    },
    // 获取专业
    getSpecList(id) {
      const params = { falId: id }
      apiBaseCommonVeCommon.querySpecialtyListByFalId(params).then((res) => {
        this.specList = res.result || []
      })
    },
  },
}
</script>
