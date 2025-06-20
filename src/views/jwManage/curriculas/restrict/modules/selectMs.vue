<template>
  <a-card :bordered="false">
    <a-modal
      :title="title"
      :width="width"
      placement="right"
      okText='确定选中'
      cancel-text="取消"
      @cancel="handleCancel"
      @ok="handleOk"
      :visible="visible">
      <div style="display: inline-block;margin-bottom: 20px">
        <a-button style="background-color: #66C3FD;color: #FFFFFF">
          <IconFont style="font-weight: bold;" type="iconshuaxin" />
            刷新
        </a-button>
      </div>
      <div style="display: inline-block;float: right;margin-bottom: 20px">
        <a-button @click="screen" style="color: #FFFFFF;background-color: #00BAD0;margin-right: 15px">
          <IconFont style="font-weight: bold;" type="iconshaixuan" />
          筛选
        </a-button>
<!--         <a-input/>-->
        <a-button style="color: #FFFFFF;background-color: #028BE2;margin-right: 15px">
          <IconFont style="font-weight: bold;" type="iconsousuo" />
          搜索
        </a-button>
        <a-button style="color: #FFFFFF;background-color: #F88600;margin-right: 15px">
          <IconFont style="font-weight: bold;" type="iconshanchu" />
          清空
        </a-button>
      </div>
      <a-table :columns="columns" :data-source="data" :row-selection="rowSelection">
        <span slot="action" slot-scope="text, record">
          <a style="color:#17C295">选择</a>
        </span>
      </a-table>
    </a-modal>
    <select-screen-model ref="selectScreenModel"></select-screen-model>
  </a-card>
</template>
<script>
import { IconFont } from '@/cas/ico'
import selectScreenModel from '@/views/jwManage/curriculas/restrict/modules/selectScreenModel'
const columns = [
  {
    title: '入学年份',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '院系',
    dataIndex: 'time1',
    key: 'time1',
  },
  {
    title: '专业',
    dataIndex: 'time2',
    key: 'time2',
  },
  {
    title: '班级',
    dataIndex: 'time3',
    // key: 'time3',
  },
  {
    title: '头像',
    dataIndex: 'time4',
    // key: 'time3',
  },
  {
    title: '姓名',
    dataIndex: 'time5',
    // key: 'time3',
  },
  {
    title: '学号',
    dataIndex: 'time6',
    // key: 'time3',
  },
  {
    title: '英文姓名',
    dataIndex: 'time7',
    // key: 'time3',
  },
  {
    title: '身份证件号',
    dataIndex: 'time8',
    // key: 'time3',
    ellipsis: true,
  },
  {
    title: '操作',
    // dataIndex: 'time3',
    // key: 'time3',
    scopedSlots: { customRender: 'action' }
  },
];

const data = [
  {
    key: '1',
    name: '2020-2021学年',
    time1: '测试',
    time2: '测试',
    time3: '八（1）班',
    time4: '二年级',
    time5: '测试数据',
    time6: '2021123',
    time7: 'agaeraa',
    time8: '123456789123456789',
  },
  {
    key: '2',
    name: '2020-2021学年',
    time1: '测试',
    time2: '测试',
    time3: '八（1）班',
    time4: '二年级',
    time5: '测试数据',
    time6: '2021123',
    time7: 'agaeraa',
    time8: '123456789123456789',
  },
];
export default {
  name: '',
  data() {
    return {
      data,
      columns,
      width:1200,
      title:'',
      visible: false,
      form:this.$form.createForm(this),
    }
  },
  created() {

  },
  computed: {
    rowSelection() {
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
          // this.selectedRowKeys = selectedRows
          var arr=[]
          var obj={}
          selectedRows.forEach(item=>{
            obj = item.id
            arr.push(obj)
          })
          this.EnableId = arr
          console.log(this.EnableId)
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
  components: {
    IconFont,
    selectScreenModel
  },
  methods: {
    select(){
      this.visible = true;
    },
    handleCancel() {
      this.visible = false;
    },
    handleOk(){
      this.visible = false;
    },
    onChange(value) {
      console.log('changed', value);
    },
    screen(){
      this.$refs.selectScreenModel.scre()
      this.$refs.selectScreenModel.title='筛选'
    }
  }
}
</script>
<style scoped>

</style>
