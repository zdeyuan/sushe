<template>
  <a-card :bordered="false">
    <a-modal
      :title="title"
      :width="width"
      placement="right"
      okText='确定'
      cancel-text="取消"
      @cancel="handleCancel"
      @ok="handleOk"
      :visible="visible">
      <div style="display: inline-block;">
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
      </div>
      <a-table :columns="columns" :data-source="data" :row-selection="rowSelection" style="margin-top: 20px" :scroll="{ x: 1800 }">
        <span slot="action" slot-scope="text, record">
           <a-switch :defaultChecked="false" default-checked @change="onChange"/>
        </span>
         <span slot="actionS" slot-scope="text, record">
              <a style="color:#17C0C2">查看</a>
              <a-divider type="vertical"/>
              <a style="color:#F88600">销毁</a>
              <a-divider type="vertical"/>
            <a style="color:#17C295">还原</a>
         </span>
      </a-table>


    </a-modal>
  </a-card>
</template>
<script>
import { IconFont } from '@/cas/ico'
const columns = [
  {
    title: '课程组合',
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
  },
  {
    title: '系部限选门数',
    dataIndex: 'time1',
    key: 'time1',
  },
  {
    title: '专业限选门数',
    dataIndex: 'time2',
    key: 'time2',
  },
  {
    title: '限选系部',
    dataIndex: 'time3',
    // key: 'time3',
  },
  {
    title: '限选年级',
    dataIndex: 'time4',
    // key: 'time3',
  },
  {
    title: '限选班级',
    dataIndex: 'time5',
    // key: 'time3',
  },
  {
    title: '学号',
    // dataIndex: 'time6',
    // key: 'time3',
  },
  {
    title: '学生',
    dataIndex: 'time7',
    // key: 'time3',
  },
  {
    title: '描述',
    dataIndex: 'time8',
    // key: 'time3',
  },
  {
    title: '排序码',
    dataIndex: 'time9',
    // key: 'time3',
  },
  {
    title: '创建时间',
    dataIndex: 'time10',
    // key: 'time3',
  },
  {
    title: '最后修改时间',
    dataIndex: 'time11',
    // key: 'time3',
  },
  {
    title: '删除时间',
    dataIndex: 'time12',
    // key: 'time3',
  },
  {
    title: '创建者名称',
    dataIndex: 'time13',
    // key: 'time3',
  },
  {
    title: '课程',
    dataIndex: 'time14',
    // key: 'time3',
  },
  {
    title: '是否有效',
    // dataIndex: 'time6',
    fixed: 'right',
    scopedSlots: { customRender: 'action' }
  },
  {
    title: '操作',
    // dataIndex: 'time3',
    // key: 'time3',
    fixed: 'right',
    scopedSlots: { customRender: 'actionS' }
  },
];

const data = [
  {
    key: '1',
    name: '课程组合十三',
    time1: '2',
    time2: '2',
    time3: '二年级',
    time4: '二年级',
    time5: '八（1）班',
    time6: '2020',
    time7: '王砚稚',
    time8: '啦啦啦啊啊啦啦啦',
    time9: '2',

  },
  {
    key: '2',
    name: '课程组合十三',
    time1: '2',
    time2: '2',
    time3: '二年级',
    time4: '二年级',
    time5: '八（1）班',
    time6: '2020',
    time7: '王砚稚',
    time8: '啦啦啦啊啊啦啦啦',
    time9: '2',
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
    IconFont
  },
  methods: {
    recycle(){
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
  }
}
</script>
<style scoped>

</style>
