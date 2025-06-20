<template>
  <a-card :bordered="false">
    <a-modal
      :width="width"
      title="教学班列表"
      okText='确定'
      cancel-text="取消"
      @cancel="handleCancel"
      @ok="handleOk"
      :visible="visible">
    <a-form :form="form" :label-col="{ span: 7 }" :wrapper-col="{ span: 17 }">

      <a-row>
        <a-col :span="5">
          <a-form-item label="名称">
            <a-input></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="5">
          <a-form-item label="校区">
            <a-select default-value="1" style="width: 120px">
              <a-select-option value="1">
                请选择
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="6">
          <a-form-item label="所属年级">
            <a-select default-value="1" style="width: 140px">
              <a-select-option value="1">
                1
              </a-select-option>
            </a-select>
          </a-form-item>

        </a-col>
        <a-col :span="11">
          <a-form-item label="专业部·专业">
            <a-select default-value="1" style="width: 120px;margin-right: 10px">
              <a-select-option value="1">
                1
              </a-select-option>
            </a-select>
            <a-select default-value="1" style="width: 120px;">
              <a-select-option value="1">
                1
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="7" style="margin-top: 4px">
          <a-button style="background-color: #F88600;color: #FFFFFF;margin-right: 10px">
            <IconFont type="iconshanchu"></IconFont>
            清除
          </a-button>
          <a-button style="background-color: #028BE2;color: #FFFFFF;margin-right: 10px">
            <IconFont type="iconsousuo"></IconFont>
            搜索
          </a-button>
          <a-button style="background-color: #F88600;color: #FFFFFF">
            <IconFont type="iconshanchu"></IconFont>
            清空
          </a-button>
        </a-col>
      </a-row>
    </a-form>
      <a-table :columns="columns" :data-source="data" :row-selection="rowSelection">
      </a-table>

    </a-modal>
  </a-card>
</template>
<script>
const columns = [
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年级',
    dataIndex: 'time1',
    key: 'time1',
  },
  {
    title: '专业',
    dataIndex: 'time2',
    key: 'time2',
  },
  {
    title: '校区',
    dataIndex: 'time3',
    key: 'time3',
  },
];

const data = [
  {
    key: '1',
    name: '20级学前教育二年制班',
    time1: '2020级',
    time2: '学前教育二年制',
    time3: '鹰潭职业技术学院',
  },
  {
    key: '2',
    name: '20级学前教育二年制班',
    time1: '2020级',
    time2: '学前教育二年制',
    time3: '鹰潭职业技术学院',
  },
];
import { IconFont } from '@/cas/ico'
export default {
  name: '',
  data() {
    return {
      data,
      columns,
      width:1000,
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
  },
  methods: {
    handleCancel(){
      this.visible = false;
    },
    handleOk(){
      this.visible = false;
    },
    search(){
      this.visible = true;
    },
  }
}
</script>
<style scoped lang="less">
:global {
.ant-form-item{
  //display: inline-block;
}
}
</style>
