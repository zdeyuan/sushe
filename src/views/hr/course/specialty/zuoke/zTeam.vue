<template>
  <a-card :bordered="false" >
    <div>
      <div style='background-color: #0098F8;width: 10px;height: 30px;display: inline-block;vertical-align:middle;margin-top: -6px'></div>
      <p style='display: inline-block;color: #666666;font-size: 20px;margin-left: 20px'>做课-轮机电气学（已完成）</p>
    </div>
    <div class="table-operator" style="">
      <a-button @click=" " type="primary" style='position: absolute;right: 0;height: 48px;top: 30px'><a-icon type="caret-right" />课程预览</a-button>
    </div>
    <div class="table-operator" style="height: 30px;display: inline-block">
      <a-button @click="handleAdd" type="primary" style='background-color: #00BAD0;height:35px;border: none'><a-icon type="plus" />添加</a-button>
    </div>
    <div class="table-operator" style="height: 30px;display: inline-block">
      <a-button @click=" " type="primary" style='background-color: #0098F8;height:35px;border: none'><a-icon type="delete" />删除</a-button>
    </div>
    <div class="table-operator" style="height: 30px;display: inline-block">
      <a-button @click=" " type="primary" style='background-color: #66C3FD;height:35px;border: none'><a-icon type="sync" />刷新</a-button>
    </div>
    <a-table style='padding-top: 20px' :row-selection="rowSelection" :columns="columns" :data-source="data">
      <a slot="name" slot-scope="text">{{ text }}</a>
      <span slot="action3" slot-scope="text, record">
        <a @click=" " style="color:#FC8950">删除</a>
      </span>
    </a-table>
    <choice-modal ref="modalForm" @ok="modalFormOk"></choice-modal>
  </a-card>
</template>

<script>
import ChoiceModal from "./modules/ChoiceModal"
const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    scopedSlots: { customRender: 'name' },
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width:'25%',
    scopedSlots:{customRender:'action3'}
  },
];
const data = [
  {
    key: '1',
    name: '李华华',
    operation: '',
  },
  {
    key: '2',
    name: '于洋',
    operation: '',
  },
  {
    key: '3',
    name: '云学天',
    operation: '',
  },
];

export default {
  name: 'zTeam',
  components:{
    ChoiceModal
  },
  data(){
    return{
      columns,
      data,
    };
  },
  computed: {
    rowSelection() {
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
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
  methods: {
    handleAdd(){
      this.$refs.modalForm.add()
      this.$refs.modalForm.title="请选择";
    }
  },
}
</script>

<style scoped>

</style>