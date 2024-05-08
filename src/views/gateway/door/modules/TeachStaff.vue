<template>
  <div>
    <div class="table-operator" style="margin: 5px 0 10px 2px">
      <div class="table-operator" style="height: 30px;display: inline-block;">
        <a-button @click="handleCreate" type="primary" style='background-color: #00BAD0;border: none;height: 34px;'><a-icon type="plus" />添加</a-button>
      </div>
      <div class="table-operator" style="height: 30px;display: inline-block">
        <a-button @click="" type="primary" style='background-color: #0098F8;border: none;height: 34px;'><a-icon type="delete" />删除</a-button>
      </div>
      <div class="table-operator" style="height: 30px;display: inline-block">
        <a-button @click=" " type="primary" style='background-color: #00D09D;border: none;height: 34px;'><a-icon type="check-circle" />发布</a-button>
      </div>
      <div class="table-operator" style="height: 30px;display: inline-block">
        <a-button @click="Refresh" type="primary" style='background-color: #FC8950;border: none;height: 34px;'><a-icon type="close-circle" />取消发布</a-button>
      </div>
      <div class="table-operator" style="height: 30px;display: inline-block">
        <a-button @click="Refresh" type="primary" style='background-color: #66C3FD;border: none;height: 34px;'><a-icon type="sync" />刷新</a-button>
      </div>
      <div class='components-input-demo-size' style='display: inline-block;position:absolute;right: 0;margin-top: -10px;'>
        <a-input style='display: inline-block;width: 182px;height: 34px;margin-right: 20px' placeholder="关键字" />
        <div class="table-operator" style="height: 30px;display: inline-block">
          <a-button @click=" " type="primary" style='background-color: #0098F8;border: none;width: 100px;height: 46px;margin-right: 20px;display: inline-block'>搜索</a-button>
        </div>
      </div>
    </div>
    
    <a-table
      ref="table"
      size="middle"
      rowKey="id"
      :columns="columns1"
      :dataSource="contentData"
      :pagination="ipagination"
      @change="handleTableChange"
      :row-selection="rowSelection"
    >
    <span slot="teaction" slot-scope="text, record">
      <a @click="teachEdit(record)" style="color:#0098F8">编辑</a>
      <a-divider type="vertical"/>
      <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
        <a style="color:#FC8950">删除</a>
      </a-popconfirm>
    </span>
    </a-table>
  </div>
</template>
<script>
export default {
  name:'TeachStaff',
  data() {
    return {
      sexcur:0,
      content:'',
      contentNum:0,
      // 查询条件
      queryParam: {
        pageNo: 1,//第几页
        pageSize: 10,//每页中显示数据的条数
      },
      contList:[],
      ipagination: {
        current: 1,
        pageSize: 10,
        pageSizeOptions: ['10', '20', '30'],
        showTotal: (total, range) => {
          return range[0] + '-' + range[1] + ' 共' + total + '条'
        },
        showQuickJumper: true,
        showSizeChanger: true,
      },
      columns1:[{
        title: '标题',
        align: 'center',
        dataIndex: 'title',
        width:200,
      },{
        title: '所属栏目',
        align: 'center',
        dataIndex: 'Column',
        width:200,
      },{
        title: '浏览次数',
        align: 'center',
        dataIndex: 'Number',
        width:200,
      },{
        title: '发布状态',
        align: 'center',
        dataIndex: 'status',
        width:200,
      },{
        title: '更新时间',
        align: 'center',
        dataIndex: 'update',
        width:200,
      },{
          title: '操作',
          dataIndex: 'teaction',
          align: 'center',
          width:200,
          scopedSlots: { customRender: 'teaction' }
      }],
      contentData:[{
        id:1,
        title:'教师培训学习',
        Column:'师资建设',
        Number:10,
        status:'是',
        update:'2020-07-25'
      },{
        id:2,
        title:'自动驾驶技术',
        Column:'师资建设',
        Number:102,
        status:'是',
        update:'2020-07-26'
      },{
        id:2,
        title:'解析零部件',
        Column:'师资建设',
        Number:102,
        status:'是',
        update:'2020-07-26'
      },],
      form:this.$form.createForm(this),
      validatorRules:{
          columnName:{rules: [
            { required: true, message: '请输入栏目名称!' },
          ]},
      },
    }
  },
  created () {
    
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
  methods: {
      select(index){
        this.sexcur=index
        console.log(this.sexcur)
      },
      searchQuery(){
        
      },
      handleSelect(){
        this.$refs.modalForm.edit()
        this.$refs.modalForm.title="查询项目";
      },
      cannerShare(){

      },
      handleopen(){
        
      },
      handleRefresh(){
        // this.getPageList()
      },
      callback(){

      },
      //添加
      handleadd(){
        this.buildNum = 1
      },
      //修改
      handleEdit(){
        this.buildNum = 2
      },
      Refresh(){
        
      },
      handReturn(){
        this.buildNum = 0
      },
      addSubmit(e){
        e.preventDefault();
        this.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
            // let formData = values
            // formData.pid = this.pidvalue
            // console.log(formData)
            // categoryadd(formData).then((res) => {
            //   if (res.code === 200) {
            //     console.log(1122)
            //     this.$message.success("添加成功");
            //     this.baseNum=0
            //     this.geilist();
            //   }
            // });
          }
        });
      },
      // //编辑
      // handleModify(record){
      //   this.buildNum=6
      //   this.ModifyData = record
      //   console.log(this.ModifyData)
      //   this.model = Object.assign({}, record);
      //   this.$nextTick(() => {
      //     this.form.setFieldsValue(pick(this.model,'code', 'name','weight','veCondition','unit','listsort','isexam','remark','status'))
      //   });
      // },

      //内容管理的添加
      handleCreate(){
        this.contentNum = 1
      },
      handleReturn(){
        this.sexcur=0
        this.contentNum=0
      },
      teachEdit(){
        this.contentNum = 2
      },
      
      handleChangeImg(item){
        console.log(item)
        console.log(item.fileList[0].response.thumbUrl)
        this.coverid = item.fileList[0].response.thumbUrl
        console.log(this.coverid)
      },
      handlecontImg(item){
        console.log(item)
        console.log(item.fileList[0].response.thumbUrl)
      },
      handleTableChange(ipagination) {
        console.log(ipagination)
        this.ipagination.current = ipagination.current;
        this.ipagination.pageSize = ipagination.pageSize;
        this.queryParam.pageNo = ipagination.current;
        this.queryParam.pageSize = ipagination.pageSize;
      },
      determine(e){
        e.preventDefault();
        this.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
        });
      },
    }
}
</script>
<style scoped>
  @import '~@assets/less/common.less';
</style>