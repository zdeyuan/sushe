<template>
  <a-modal
    :title="title"
    :width="width"
    placement="right"
    :closable="false"
    okText='确认'
    cancel-text="取消"
    @cancel="handleCancel"
    @ok="handleOk"
    :visible="visible">
    <a-form layout='vertical' :form="textform" style='position: relative'>
        <a-input style='width: 236px;height: 34px;margin-right: 20px;margin-bottom:20px' placeholder="项目名称" />
        <div style='position: absolute;right: 0;top: 0px;right: 10px'>
          <a-button style='width: 100px;height: 34px;background-color: #66C3FD;color: white'><a-icon type="sync" />刷新</a-button>
          <a-button style='width: 100px;height: 34px;background-color: #028BE2;color: white;'>搜索</a-button>
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
</template>

<script>
//   import VeExamQuestionForm from './VeExamQuestionForm'
  export default {
    name: 'projectsModal',
    components: {
    //   VeExamQuestionForm
    },
    data () {
      return {
        title:"操作",
        width:800,
        visible: false,
        disableSubmit: false,
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
        },],
        ipagination1: {
          current: 1,
          pageSize: 10,
          pageSizeOptions: ['10', '20', '30'],
          showTotal: (total, range) => {
            return range[0] + '-' + range[1] + ' 共' + total + '条'
          },
          showQuickJumper: true,
          showSizeChanger: true,
          
        },
        textform:this.$form.createForm(this),
      }
    },
    methods: {
      
      // add () {
      //   this.visible=true
      //   this.$nextTick(()=>{
      //     this.$refs.realForm.add();
      //   })
      // },
      edit () {
        this.visible=true
        // this.$nextTick(()=>{
        //   this.$refs.realForm.edit();
        // });
      },
      close () {
        this.$emit('close');
        this.visible = false;
      },
      handleCancel() {
        this.visible = false;
      },
      submitCallback(){
        this.$emit('ok');
        this.visible = false;
      },
      handleOk () {
        this.$refs.realForm.submitForm();
      },
      handleCancel () {
        this.close()
      }
    }
  }
</script>

<style lang="less" scoped>
/** Button按钮间距 */
  .ant-btn {
    margin-left: 30px;
    margin-bottom: 30px;
    float: right;
  }
  .drawer-footer{
    position: absolute;
    bottom: -8px;
    width: 100%;
    border-top: 1px solid #e8e8e8;
    padding: 10px 16px;
    text-align: right;
    left: 0;
    background: #fff;
    border-radius: 0 0 2px 2px;
  }
</style>