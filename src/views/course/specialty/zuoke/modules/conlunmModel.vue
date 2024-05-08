<template>
  <a-card :bordered="false">
    <div>
      <div style='background-color: #0098F8;width: 10px;height: 30px;display: inline-block;vertical-align:middle;margin-top: -6px'></div>
      <p style='display: inline-block;color: #666666;font-size: 20px;margin-left: 20px'>做课-轮机电气学（已完成）</p>
    </div>
    <div class="table-operator" style="">
      <a-button @click=" " type="primary" style='position: absolute;right: 0;height: 48px;top: 30px'><a-icon type="caret-right" />课程预览</a-button>
    </div>
    <div class="table-operator" style="height: 30px;display: inline-block">
      <!--            <a-button @click="showModal" type="primary" style='background-color: #00BAD0;height: 34px;border: none'><a-icon type="plus" />添加</a-button>-->
      <tianJIa></tianJIa>
    </div>
    <div class="table-operator" style="height: 30px;display: inline-block">
      <a-button @click=" " type="primary" style='background-color: #00BAD0;border: none;height: 34px;'><a-icon type="plus" />添加</a-button>
      <a-button @click=" " type="primary" style='background-color: #FC8950;border: none;height: 34px;'><a-icon type="close" />禁用</a-button>
      <a-button @click=" " type="primary" style='background-color: #0098F8;border: none;height: 34px;'><a-icon type="delete" />删除</a-button>
    </div>
    <a-table :row-selection="rowSelection" :columns="columns" :data-source="data">

      <span slot="action" slot-scope="text, record">
             <a @click=" " style="color:#0098F8">编辑</a>
               <a-divider type="vertical"/>
            <a @click="examine(record)" style="color:#FC8950">删除</a>
               <a-divider type="vertical"/>
              <a @click="handleEdit(record)" style="color:#00BAD0">内容管理</a>
               <a-divider type="vertical"/>
          </span>
    </a-table>
  </a-card>
</template>

<script>
const columns = [
  {
    title: '栏目名称',
    dataIndex: 'name',
    scopedSlots: { customRender: 'name' },
  },
  {
    title: '栏目类型',
    dataIndex: 'age',
  },
  {
    title: '是否启用',
    dataIndex: 'address',
  },
  {
  title: '排序',
  dataIndex: 'dasdas',
  },
  {
    title: '操作',
    dataIndex: 'ytryrt',
    scopedSlots:{customRender:'action'}
  }
];
const data = [
  {
    key: '1',
    name: '轮机',
    age: '信息列表',
    address: '是',
    dasdas: '1',
    ytryrt: ''
  },
  {
    key: '2',
    name: '电气学',
    age: '信息列表',
    address: '是',
    dasdas: '10',
    ytryrt: ''
  },
  {
    key: '3',
    name: '轮机',
    age: '单页模型',
    address: '是',
    dasdas: '1',
    ytryrt: ''
  },
];

export default {
  data() {
    return {
      data,
      columns,
    };
  },
  computed: {
    rowSelection() {
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: record => ({
          props: {
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
            name: record.name,
          },
        }),
      };
    },
  },
};
</script>

<style scoped>

</style>