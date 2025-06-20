<template>
  <a-row :gutter="10">
    <a-col :sm="24" style="margin-bottom: 20px">
      <a-card :bordered="false">
        <div style="display:flex;">
          <div class="table-operator" style="margin: 5px 0 10px 2px">
            <a-button @click="handleShare()" style="background-color:#00BAD0;color:#fff" icon="plus">共享</a-button>
            <a-button @click="cannerShare()" type="primary" icon="plus-square">取消共享</a-button>
            <a-button @click="handleRefresh()" style="background-color:#66C3FD;color:#fff" icon="reload">刷新</a-button>
          </div>
          <div>
            <a-form layout="inline" @keyup.enter.native="searchQuery" >
              <a-row :gutter="24" style="display:flex;align-items: center;">
                <a-col :xxl="{span: 8,offset: 22}" :xl="8" :lg="6" :md="3" :sm="4">
                  <a-form-item label="">
                    <a-input @click="handleSelect()" placeholder="请选择项目" v-model="queryParam.code" style="width:140px;height:34px;"></a-input>
                    <!-- <a-select v-model="queryParam.sex" placeholder="请选择项目" style="width:140px;height:34px;">
                      <a-select-option value="">请选择</a-select-option>
                    </a-select> -->
                  </a-form-item>
                </a-col>
                <a-col :xxl="8" :xl="8" :lg="6" :md="3" :sm="4">
                  <a-form-item label="">
                    <a-select v-model="queryParam.sex" placeholder="课程分类" style="width:140px;height:34px;">
                      <a-select-option value="">请选择</a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
                <a-col :xxl="8" :xl="8" :lg="6" :md="3" :sm="4" >  
                  <a-form-item label="">
                    <a-input placeholder="请输入课程名" v-model="queryParam.code" style="width:140px;height:34px;"></a-input>
                  </a-form-item>
                </a-col>  
                <a-col :xxl="8" :xl="8" :lg="6" :md="3" :sm="4">
                  <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
                    <a-button @click="searchQuery" type="primary">搜索</a-button>
                  </span>
                </a-col>

              </a-row>
            </a-form>
          </div>
          
        </div>
          <a-table
            style="height:500px"
            ref="table"
            size="middle"
            rowKey="id"
            :columns="columns"
            :dataSource="projectData"
            :pagination="ipagination1"
            :loading="loading"
            :row-selection="rowSelection"
            >
          <span slot="action" slot-scope="text, record">
            <!-- <projectModal></projectModal> -->
            <!-- <a  @click="handpreview(record)" style="color:#00BAD0">预览</a> -->
            <a style="color:#00BAD0">预览</a>
          </span>
          
          </a-table>
          
       <projects-modal ref="modalForm"></projects-modal>
      </a-card>
       
    </a-col>
  </a-row>
</template>
<script>
  import moment from 'moment'
  import pick from 'lodash.pick'
  import projectModal from './modules/projectModal'
  import projectsModal from './modules/projectsModal'
  import { teachPageList } from '@/api/hr/course.js'
  export default {
    name: 'courseView',
    components: {
      moment,
      projectModal,
      projectsModal
    },
    data() {
      return {
        projectnum:'',
        indexStyle:0,
        baseNum:0,
        // 查询条件
        queryParam: {
          pageNo: 1,//第几页
          pageSize: 10,//每页中显示数据的条数
        },
        queryParam2: {},
        projectData: [{
          name:'轮机电气学',
          teacher:'李老师',
          Project: '创建教育',
          status:'已完成',
          sharestatus:'是',
        },],
        ipagination: {
          current: 1,
          pageSize: 10,
          pageSizeOptions: ['10', '20', '30'],
          showTotal: (total, range) => {
            return range[0] + '-' + range[1] + ' 共' + total + '条'
          },
          showQuickJumper: true,
          showSizeChanger: true,
          total: 0,
        },
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
        loading: true,
        columns:
          [
            {
              title: '课程名称',
              align: 'center',
              dataIndex: 'coursename',
              key: 'coursename',
              width:200,
            },
            {
              title: '主讲教师',
              align: 'center',
              dataIndex: 'teachername',
              key: 'teachername',
              width:200,
            },
            {
              title: '所属项目',
              align: 'center',
              dataIndex: 'Project',
              key: 'Project',
              width:200,
            },
            {
              title: '是否完成全部',
              align: 'center',
              dataIndex: 'isfinished',
              key: 'isfinished',
              width:200,
              filters: [
                { text: '全部', value: '全部' },
                { text: '已完成', value: '已完成' },
                { text: '未完成', value: '未完成' },
              ],
            },
            {
              title: '共享状态全部',
              align: 'center',
              dataIndex: 'isshared',
              key: 'isshared',
              width:200,
              filters: [
                { text: '全部', value: '全部' },
                { text: '已共享', value: '已共享' },
                { text: '未共享', value: '未共享' },
              ],
            },
            {
              title: '操作',
              dataIndex: 'action',
              align: 'center',
              width:200,
              scopedSlots: { customRender: 'action' }
            }
          ],  
        // 高级查询参数
        superQueryParams2: '',
        // 高级查询拼接条件
        superQueryMatchType2: 'and',
        form:this.$form.createForm(this),
        // rowSelection,
        pageNo:1,
        pageSize:10,
        treeExpandedKeys: [],
        value: undefined,
        recorData:{},
        ModifyData:{},
        EnableId:[],
        validatorRules:{
          name:{rules: [
                  { required: true, message: '请输入名称!' },
                  { min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur' }
                ]},
          code:{ rules: [{ required: true, message: '请输入标识!' }] },
          veCondition: { rules: [{ required: true, message: '请输入默认权重!' }] },
          unit: { rules: [{ required: true, message: '请输入计算单位!' }] },
        },
      }
    },
    created () {
      this.getPageList()
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
      searchQuery(){
        
      },
      // handpreview(record){
      //   console.log(record)
      //   // this.projectnum=1
      //   this.$refs.modalForm.edit()
      //   this.$refs.modalForm.title="预览";
      // },
      handleSelect(){
        this.$refs.modalForm.edit()
        this.$refs.modalForm.title="查询项目";
      },
      //共享
      handleShare(){
        
      },
      cannerShare(){

      },
      handleopen(){
        
      },
      handleRefresh(){
        this.getPageList()
      },
      //添加
      handadd(item){
        console.log(item)
        this.baseNum = 1
        this.gettree()
      },
      //编辑
      handleModify(record){
        this.baseNum=6
        this.ModifyData = record
        console.log(this.ModifyData)
        this.model = Object.assign({}, record);
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'code', 'name','weight','veCondition','unit','listsort','isexam','remark','status'))
        });
      },
      // preview(record){
      //   this.$refs.modal.add(record)
      //   this.$refs.modal.title="新增"
      // }
      getPageList(){
        this.loading = true
        teachPageList(this.queryParam).then((res)=>{
          this.projectData = res.result.records
          console.log(this.projectData)
          this.loading = false
        })
      },
     
    }
  }
</script>
<style scoped>
  
</style>