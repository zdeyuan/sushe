<template>
  <a-card :bordered="false">
    <div class="table-operator" style="height: 30px;display: inline-block">
      <a-button @click="hangdleCreate" type="primary" style='background-color: #00BAD0;border: none;height: 34px;'><a-icon type="plus" />创建课程</a-button>
      <a-button @click="hangdleCreate" type="primary" style='background-color: #0098F8;border: none;height: 34px;'><IconFont type="iconshanchu" />删除</a-button>
      <a-button @click="hangdleCreate" type="primary" style='background-color: #00D09D;border: none;height: 34px;'><IconFont type="iconqiyong" />发布</a-button>
      <a-button @click="hangdleCreate" type="primary" style='background-color: #FC8950;border: none;height: 34px;'><IconFont type="iconguanbi" />取消发布</a-button>
      <a-button @click="hangdleCreate" type="primary" style='background-color: #66C3FD;border: none;height: 34px;'><IconFont style="color: black" type="iconshuaxin" />刷新</a-button>
    </div>
    <a-table :row-selection="rowSelection" :columns="columns" :data-source="data">
      <a slot="name" slot-scope="text">{{ text }}</a>
      <span slot="action" slot-scope="text, record">
        <a @click=" " style="color:#00BAD0">编辑</a>
        <a-divider type="vertical"/>
        <a @click=" " style="color:#FC8950">删除</a>
      </span>
    </a-table>
  </a-card>
</template>

<script>
import '@/assets/less/usercolor.less'
import { IconFont } from '@/cas/ico.js'
const columns = [
  {
    title: '标题',
    dataIndex: 'name',
    scopedSlots: { customRender: 'name' },
  },
  {
    title: '所属栏目',
    dataIndex: 'age',
  },
  {
    title: '浏览次数',
    dataIndex: 'address',
  },
  {
    title: '发布状态',
    dataIndex: 'dsadas',
  },
  {
    title: '更新时间',
    dataIndex: 'ewqeqw',
  },
  {
    title: '操作',
    dataIndex: 'qeqwewq',
    scopedSlots:{customRender:'action'}
  },
];
const data = [
  {
    key: '1',
    name: '如何打造共赢的充电产业发展平台',
    age: '建设动态',
    address: '18',
    dsadas: '是',
    ewqeqw: '2020-07-25',
  },
  {
    key: '2',
    name: '百舸争流奋楫者先——透视中国一汽“十三五规划”',
    age: '建设动态',
    address: '18',
    dsadas: '是',
    ewqeqw: '2020-07-25',
  },
  {
    key: '3',
    name: '教育部财政部国家发改委联合发布《关于高等学校加快“...',
    age: '建设动态',
    address: '18',
    dsadas: '是',
    ewqeqw: '2020-07-25',
  },
  {
    key: '4',
    name: '自动驾驶技术，互联汽车的钥匙？',
    age: '建设动态',
    address: '18',
    dsadas: '是',
    ewqeqw: '2020-07-25',
  },
  {
    key: '5',
    name: '解析零部件细分行业年报',
    age: '建设动态',
    address: '18',
    dsadas: '是',
    ewqeqw: '2020-07-25',
  },
];
export default {
  name: 'cLink',
  components:{
    IconFont,
  },
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
}
</script>

<style scoped>

</style>