<template>
  <div>
    <!--添加按钮和模态框-->
    <div @click="showModal"  style='color:#00BAD0;font-size:14px'>预览</div>
    <a-modal
      width='50%'
      :visible="visible"
      :title= "modelTitle"
      okText='确认'
      cancel-text="取消"
      @cancel="handleCancel"
      @ok="handleOk">
      <a-form layout='vertical' :form="form" style='position: relative'>
        <a-input style='width: 236px;height: 34px;margin-right: 20px;margin-bottom:20px' placeholder="项目名称" />
        <div style='position: absolute;right: 0;top: 0px;right: 70px'>
          <a-button style='width: 100px;height: 34px;background-color: #028BE2;color: white;margin-right: 20px'>搜索</a-button>
          <a-button style='width: 100px;height: 34px;background-color: #66C3FD;color: white'><a-icon type="sync" />刷新</a-button>
        </div>
          <a-table
            style="height:500px"
            ref="table"
            size="middle"
            rowKey="id"
            :columns="columns"
            :dataSource="tableData"
            :pagination="ipagination1"
            >
          </a-table>

      </a-form>
    </a-modal>
  </div>
</template>

<script>
export default {
  //el 创建前
  beforeCreate() {
    //创建表单
    this.form = this.$form.createForm(this, { name: 'form_in_modal' });
  },
  data() {
    return {
      visible: false,
      modelTitle: '查询项目',
      columns:[
        {
          title: '项目名称',
          align: 'center',
          dataIndex: 'name',
          key: 'name',
          width:200,
        },
        {
          title: '项目类型',
          align: 'center',
          dataIndex: 'type',
          key: 'teacher',
          width:200,
        },
      ],
      tableData:[{
        name:'测试项目',
        type:'1'
      },{
        name:'创业教育',
        type:'2'
      },]
    };
  },
  methods: {
    handleChange(value) {
      console.log(`selected ${value}`);
    },
    showModal() {
      this.visible = true;
    },
    handleCancel() {
      this.visible = false;
    },
    handleOk() {
      const form = this.form;
      form.validateFields((err, values) => {
        if (err) {
          return;
        }
        console.log('form 表单内容: ', values);
        form.resetFields();
        this.visible = false;
      });
    },
  },
};
</script>
