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
                <a-select-option value="1"></a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="6">
            <a-form-model-item label="所属年级">
              <a-select v-model="searchParams.gradeId" style="width: 100%">
                <a-select-option value="1">1</a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span="11">
            <a-form-model-item label="专业部·专业">
              <a-select v-model="searchParams.depId" style="width: 150px; margin-right: 10px">
                <a-select-option value="1">1</a-select-option>
              </a-select>
              <a-select v-model="searchParams.specId" style="width: 150px;">
                <a-select-option value="1">1</a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span="7" style="margin-top: 4px">
            <a-button type="primary" icon="search" @click="onClickSearch">搜索</a-button>
            <a-button type="warning" icon="rest" @click="onClickClean">清空</a-button>
          </a-col>
        </a-row>
      </a-form-model>
      <g-table :columns="columns" :data="loadData" :row-selection="rowSelection" />
    </a-modal>
  </div>
</template>
<script>
const columns = [
  { title: '名称', dataIndex: 'name', key: 'name' },
  { title: '年级', dataIndex: 'time1', key: 'time1' },
  { title: '专业', dataIndex: 'time2', key: 'time2' },
  { title: '校区', dataIndex: 'time3', key: 'time3' },
]

const searchParams = {
  xzbmc: '',
  campusId: undefined, //	校区ID
  depId: undefined, //	机构部门ID
  specId: undefined, //	专业ID
  gradeId: undefined, // 年纪id
  status: 1, // 1可用2不可用
}
export default {
  props: {
    visible: { type: Boolean },
    values: { type: Array, default: () => [] },
  },
  data() {
    return {
      columns,
      width: 1200,
      selected: [], // 已选学期，用于批量操作
      // selectedRowKeys: [], // 已选学期，值
      searchParams: { ...searchParams }, // 筛选数据
    }
  },
  created() {},
  computed: {
    rowSelection() {
      return {
        selectedRowKeys: this.selectedRowKeys,
        onChange: (selectedRowKeys, selectedRows) => {
          // this.selectedRowKeys = selectedRowKeys
          this.selected = selectedRows
        },
      }
    },
    selectedRowKeys: {
      get() {
        return this.selected.map((o) => o.id)
      },
    },
    selected: {
      get() {
        return this.values
      },
      set(val) {
        this.$emit('update:values', val)
      },
    },
  },
  components: {},
  methods: {
    handleCancel() {
      this.visible$1 = false
    },
    handleOk() {
      this.visible$1 = false
    },
    onClickSearch() {
      this.refreshTable(1)
    },
onClickClean() {

},
    // 刷新表格
    refreshTable(b = 0) {
      this.$refs.refTable.refresh(b)
      this.selected = []
    },
    // 表格拉取数据
    loadData(params) {
      params = { ...params, ...this.searchParams }
      // TODO
      return apiScheduleClassSwitchTiaoke.getPageList(params).then((res) => res.result)
    },
  },
}
</script>
