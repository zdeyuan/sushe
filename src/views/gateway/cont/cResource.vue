<template>
  <a-card :bordered="false">
    <div style="position: relative;margin-bottom: 50px">
      <div class="table-operator" style="height: 30px;display: inline-block">
        <a-button @click="hangdleCreate" type="primary" style='background-color: #00BAD0;border: none;height: 34px;'><a-icon type="plus" />添加</a-button>
        <a-button @click="hangdleCreate" type="primary" style='background-color: #0098F8;border: none;height: 34px;'><IconFont type="iconshanchu" />删除</a-button>
        <a-button @click="hangdleCreate" type="primary" style='background-color: #66C3FD;border: none;height: 34px;'><IconFont type="iconshuaxin" />刷新</a-button>
      </div>
      <div style="position: absolute;display: inline-block;right: 0">
        <a-input style="width: 150px;margin-right: 30px" placeholder="关键字"></a-input>
        <a-button style="height: 46px;width: 100px" type="primary">搜索</a-button>
      </div>
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
    title: '序号',
    dataIndex: 'dsadas',
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
    name: '云资源下载',
    age: '云资源下载图片链接',
    dsadas: '50',
  },
  {
    key: '2',
    name: '云资源下载1',
    age: '云资源下载图片链接',
    dsadas: '50',
  },
  {
    key: '3',
    name: '云资源下载2',
    age: '云资源下载图片链接',
    dsadas: '50',
  },
  {
    key: '4',
    name: '云资源下载3',
    age: '云资源下载图片链接',
    dsadas: '50',
  },
  {
    key: '5',
    name: '云资源下载4',
    age: '云资源下载图片链接',
    dsadas: '50',
  },
];
export default {
  name: "",
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