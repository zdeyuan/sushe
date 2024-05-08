<template>
  <a-card :bordered="false" >
    <a-tabs type="card" v-if="indexStyle==0" @change="callback">
      <a-tab-pane key="1" tab="课程管理" >
        <div v-if="produceNum==0">
        <div class="table-operator" style="height: 30px;display: inline-block">
          <a-button @click="hangdleCreate" type="primary" style='background-color: #00BAD0;border: none;height: 34px;'><a-icon type="plus" />
            创建课程</a-button>
        </div>
        <div class="table-operator" style="height: 30px;display: inline-block">
          <a-button @click=" " type="primary" style='background-color: #FC8950;border: none;height: 34px;'><a-icon type="plus-square" />批量审核</a-button>
        </div>
        <div class="table-operator" style="height: 30px;display: inline-block">
          <a-button @click="Refresh" type="primary" style='background-color: #66C3FD;border: none;height: 34px;'><a-icon type="sync" />刷新</a-button>
        </div>
        <div class="table-operator" style="height: 30px;display: inline-block">
          <a-button @click="" type="primary" style='background-color: #0098F8;border: none;height: 34px;'>
            <img style="padding-right:8px;margin-top: -4px;" src='../../../assets/specialty/2.png'>删除
          </a-button>
        </div>
        <div class='components-input-demo-size' style='display: inline-block;position:absolute;right: 0'>
          <a-select default-value="lucy" style="display: inline-block;width: 203px;height: 34px;margin-right: 20px">
            <a-select-option value="lucy">课程分类</a-select-option>
          </a-select>
          <a-input style='display: inline-block;width: 182px;height: 34px;margin-right: 20px' placeholder="课程名" />
          <div class="table-operator" style="height: 30px;display: inline-block">
            <a-button @click=" " type="primary" style='background-color: #0098F8;border: none;width: 100px;height: 46px;margin-right: 20px;display: inline-block'>搜索</a-button>
          </div>
        </div>
        <a-table style='margin-top: 20px' :row-selection="rowSelection" :columns="columns" :data-source="sourceData" :loading="loading" :pagination="ipagination">
          <a slot="name" slot-scope="text">{{ text }}</a>
          <span slot="action" slot-scope="text, record">
             <a @click=" " style="color:#00BAD0">预览</a>
               <a-divider type="vertical"/>
            <a @click="examine(record)" style="color:#00D09D">审核</a>
               <a-divider type="vertical"/>
              <a @click="handleEdit(record)" style="color:#00BAD0">编辑</a>
               <a-divider type="vertical"/>
             <a @click="zuoke" style="color:#66C3FD">做课</a>
               <a-divider type="vertical"/>
               <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                <a style="color:#FC8950">删除</a>
               </a-popconfirm>
          </span>
        </a-table>
        </div>
        <!-- 创建课程 -->
        <div v-if="produceNum==1">
          <!-- <creat-modal></creat-modal> -->
          <a-card :bordered="false" @submit="handleSubmit">
            <div class="imaportBack">
              <div class="imaportants">
                <div style="width:10px; height:30px; background-color:#0098F8"></div>
                <div style="color:#666666;font-size:20px;margin-left: 10px;">创建课程</div>
              </div>
            </div>
            <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 6 }" @submit="handleSubmit">
              <a-form-item label="课程分类">
                <a-tree-select
                    v-model="cateIdValue"
                    style="width: 200px"
                    :tree-data="treeData"
                    :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                    placeholder="请选择"
                    allow-clear
                    tree-default-expand-all
                  >
                </a-tree-select>
              </a-form-item>
              <a-form-item label="课程名称">
                <a-input style="width:400px;height: 34px;" placeholder="请输入课程名称"
                  v-decorator.trim="['coursename', validatorRules.coursename]" 
                />
              </a-form-item>
              <a-form-item label="所属专业">
                <a-select v-decorator.trim="['depid', validatorRules.depid]" >
                  <a-select-option v-for="(item,index) in majorData" :key="index.id" :value="item.id">{{item.name}}</a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item label="课程封面" style="">
                <a-upload
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  list-type="picture"
                  :default-file-list="fileList"
                  @change="handleChangeImg"
                >
                  <a-button> <a-icon type="upload" /> 选择文件 </a-button>
                </a-upload>
              </a-form-item>
              <a-form-item label="主讲教师姓名">
                <a-input style="width:400px;height: 34px;" placeholder="请输入主讲教师姓名"
                  v-decorator.trim="['teachername', validatorRules.teachername]" 
                />
              </a-form-item>
              <a-form-item label="课程参与制作人">
                <a-input @click="handleSelect()" style="width:400px;height: 34px;" placeholder="请输入课程参与制作人"
                  v-decorator.trim="['codes', validatorRules.codes]" 
                />
              </a-form-item>
              <a-form-item label="是否共享">
                <a-radio-group name="radioGroup" v-decorator="['isshared', validatorRules.isshared]">
                  <a-radio :value="1">
                    是
                  </a-radio>
                  <a-radio :value="0">
                    否
                  </a-radio>
                </a-radio-group>
              </a-form-item>
              <a-form-item label="课程简介" style="margin-bottom: 200px;">
                <vue-editor v-model="content" style='display: inline-block;line-height:20px;position: absolute;width: 866px;z-index:10'></vue-editor>
              </a-form-item>
              <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
                <a-button type="primary" @click="createSubmit" html-type="submit" style="width:100px;height:40px">
                  确定
                </a-button>
                <a-button  class="buttonback"  @click="handReturn">
                  返回
                </a-button>
              </a-form-item>
            </a-form>
          </a-card>
        </div>
        <!-- 编辑课程 -->
        <div v-if="produceNum==2">
          <a-card :bordered="false" @submit="handleSubmit">
            <div class="imaportBack">
              <div class="imaportants">
                <div style="width:10px; height:30px; background-color:#0098F8"></div>
                <div style="color:#666666;font-size:20px;margin-left: 10px;">编辑课程</div>
              </div>
            </div>
            <a-form :form="textform" :label-col="{ span: 5 }" :wrapper-col="{ span: 6 }">
              <a-form-item label="课程分类">
                <a-tree-select
                    style="width: 200px"
                    :tree-data="treeData"
                    :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                    placeholder="请选择"
                    allow-clear
                    tree-default-expand-all
                  >
                </a-tree-select>
              </a-form-item>
              <a-form-item label="课程名称">
                <a-input style="width:400px;height: 34px;" placeholder="请输入课程名称"
                  v-decorator.trim="['coursename', validatorRules.coursename]" 
                />
              </a-form-item>
              <a-form-item label="所属专业">
                <a-select>
                  <a-select-option v-for="(item,index) in majorData" :key="index.id" :value="item.name">{{item.name}}</a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item label="课程封面" style="">
                <a-upload
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  list-type="picture"
                  :default-file-list="fileList"
                  @change="handleChangeImg"
                >
                  <a-button> <a-icon type="upload" /> 选择文件 </a-button>
                </a-upload>
              </a-form-item>
              <a-form-item label="主讲教师姓名">
                <a-input style="width:400px;height: 34px;" placeholder="请输入主讲教师姓名"
                  v-decorator.trim="['teachername', validatorRules.teachername]" 
                />
              </a-form-item>
              <a-form-item label="课程参与制作人">
                <a-input style="width:400px;height: 34px;" placeholder="请输入课程参与制作人"
                  v-decorator.trim="['code', validatorRules.code]" 
                />
              </a-form-item>
              <a-form-item label="是否共享">
                <a-radio-group name="radioGroup" v-decorator="['isshared', validatorRules.isshared]">
                  <a-radio :value="1">
                    是
                  </a-radio>
                  <a-radio :value="0">
                    否
                  </a-radio>
                </a-radio-group>
              </a-form-item>
              <a-form-item label="课程简介" style="margin-bottom: 200px;">
                <vue-editor v-model="content" style='display: inline-block;line-height:20px;position: absolute;width: 866px;z-index:10'></vue-editor>
              </a-form-item>
              <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
                <a-button type="primary" @click="editSubmit" html-type="submit" style="width:100px;height:40px">
                  确定
                </a-button>
                <a-button  class="buttonback"  @click="handReturn">
                  返回
                </a-button>
              </a-form-item>
            </a-form>
          </a-card>
        </div>
      </a-tab-pane>
      <a-tab-pane key="2" tab="课程回收站">
        <recycleBin></recycleBin>
      </a-tab-pane>

    </a-tabs>
    <div>
      <zIndex v-if="indexStyle==1"></zIndex>
    </div>
    <examine-modal ref="modalForm" @ok="modalFormOk"></examine-modal>
    <producer-modal ref="producerForm" @ok="modalFormOk"></producer-modal>
    <div style="width: 100%;text-align: right;margin-top: 20px">

    </div>
  </a-card>
</template>

<script>
import '@/assets/less/usercolor.less'
import { VueEditor } from 'vue2-editor';
import zIndex from "./zuoke/zIndex.vue"
import ExamineModal from "./modules/ExamineModal"
import recycleBin from "./modules/recycleBin"
import ProducerModal from "./modules/ProducerModal"
import pick from 'lodash.pick'
import { professional,professionalAdd,Major } from '@/api/professional.js'
import { categoryList } from '@/api/course.js'
const columns = [
  {
    title: '课程名称',
    dataIndex: 'coursename',
    scopedSlots: { customRender: 'name' },
  },
  {
    title: '主讲教师',
    dataIndex: 'teachername',
  },
  {
    title: '是否完成全部',
    dataIndex: 'isfinished',
    customRender: function (text) {
      if (text == 0) {
        return "未发布";
      } else if (text == 1) {
        return "已发布";
      } else if (text == 2) {
        return "已撤销";
      } else {
        return text;
      }
    },
    filters: [
      {
        text: '是',
        value: '0',
      },
      {
        text: '否',
        value: '1',
      },
    ],
    // specify the condition of filtering result
    // here is that finding the name started with `value`

  },
  {
    title: '审核状态',
    dataIndex: 'verifystatus',
    customRender: function (text) {
      if (text == 0) {
        return "未发布";
      } else if (text == 1) {
        return "已发布";
      } else if (text == 2) {
        return "已撤销";
      } else {
        return text;
      }
    },
    filters: [
      {
        text: '待审核',
        value: 'Joe',
      },
      {
        text: '审核通过',
        value: 'Jim',
      },
      {
        text: '审核不通过',
        value: 'mod',
      },
    ],
    // specify the condition of filtering result
    // here is that finding the name started with `value`

  },
  {
    title: '更新时间',
    dataIndex: 'updatetime',
  },
  {
    title: '操作',
    dataIndex: 'address',
    scopedSlots:{customRender:'action'}
  },

];
export default {
  //专业课程管理
  name:'produceIndex',
  components: {
    zIndex,
    ExamineModal,
    VueEditor,
    recycleBin,
    ProducerModal
  },

  data(){
    return{
      columns,
      professional,
      sourceData: [],
      indexStyle:0,
      produceNum:0,
      fileList:[],
      loading:true,
      coverid:'',
      content:'',
      cateIdValue:'',
      veCuzTerminal:{},
      map:{},
      form:this.$form.createForm(this),
      textform:this.$form.createForm(this),
        treeData:[{
          title: 'Node1',
          value: '0-0',
          key: '0-0',
          children: [
            {
              title: 'Child Node1',
              value: '0-0-0',
              key: '0-0-0',
            },
          ],
        },],
       majorData:[
        {
          name:'汽车专业',
          id:1
        }],
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
        validatorRules:{
          coursename:{rules: [
                  { required: true, message: '请输入名称!' },
                ]},
          code:{ rules: [{ required: true, message: '请输入标识!' }] },
          veCondition: { rules: [{ required: true, message: '请输入默认权重!' }] },
          unit: { rules: [{ required: true, message: '请输入计算单位!' }] },
        },
    };
  },
  created() {
    this.getproName()
    this.getlist()
  },
  methods: {
    Refresh(){
      this.getproName()
    },
    zuoke(){
      this.indexStyle=1
    },
    //创建课程
    hangdleCreate(){
      this.produceNum=1
      this.procreate()
      this.gettree()
    },
    //编辑
    handleEdit(record){
      console.log(record)
      this.produceNum=2
      this.model = Object.assign({}, record);
      this.$nextTick(() => {
        this.textform.setFieldsValue(pick(this.model,'coursename', 'teachername','isshared'))
      });
    },
    //审核
    examine(record){
      console.log(record)
      this.$refs.modalForm.examine(record)
      this.$refs.modalForm.title="审核";
      this.model = Object.assign({}, record);
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(this.model,'coursename', 'teachername','isshared'))
      });
      // this.produceNum=3
    },
    handleDelete(){

    },
    getproName(){
      this.loading = true
      professional().then((res)=>{
        this.sourceData = res.result.records
        console.log(this.sourceData)
        this.loading = false
      })
    },
    procreate(){
      Major().then((res)=>{
        this.majorData = res.result
        console.log(this.majorData)
      })
    },
    getlist(){
      categoryList().then((res)=>{
        this.treeData = res.result
        console.log(this.treeData)
      })
    },

    callback(){

    },
    handleChange(value) {
      console.log(`selected ${value}`);
    },
    handleChangeImg(item){
      console.log(item)
      console.log(item.fileList[0].response.url)
      this.coverid = item.fileList[0].response.url
      console.log(this.coverid)
    },
    //添加
    handleSubmit(e) {
      console.log(e) 
    },
    handReturn(){
      this.indexStyle=0;
      this.produceNum=0
    },
    createSubmit(e){
      // console.log(this.coverid)
        e.preventDefault();
        this.form.validateFields((err, values) => {
          if (!err) {
            console.log(values)
            let formData={}
            // let formData = values
            // formData.coverid = this.coverid
            // formData.cateIdValue = this.cateIdValue
            // this.veCuzTerminal= values
            formData.veCuzTerminal = {}
            // formData.map = {}
            // formData.veCuzTerminal = values
            formData = {
              veCuzTerminal:values,
              
              summary :this.content,
              makerId:'1,2'
            }
            // formData.cateIdValue= this.cateIdValue
            // formData.summary= values.name
            // formData = this.map
            console.log(formData)
            professionalAdd(formData).then((res) => {
              if (res.code === 200) {
                console.log(1122)
                this.$message.success("创建成功");
                this.indexStyle=0
                this.getproName();
              }
            });
          }
        });
    },
    editSubmit(e){

    },
    //树形控件
      gettree(){
        console.log(this.treeData)
        this.treeData.forEach((item,index)=>{
          console.log(index)
          if(index==0){
            item.title=item.name
            item.value=item.pid
            item.key = '0-' +index
            var num=-1
            if(item.children==null){
              console.log(12345)
            }else{
              item.children.forEach(item=>{
              num++
              item.title= item.name
              item.value= item.pid
              item.key= '0-' +index+ '-'  + num
            })
            }
            
          } else if(index==1){
            item.title=item.name
            item.value=item.pid
            item.key = '0-' +index
            var num=-1
            if(item.children==null){
              console.log(12345)
            }else{
              item.children.forEach(item=>{
              num++
              item.title= item.name
              item.value= item.pid
              item.key= '0-' +index+ '-'  + num
            })
            }
          } else if(index==2){
            item.title=item.name
            item.value=item.pid
            item.key = '0-' +index
            var num=-1
            if(item.children==null){
              console.log(12345)
            }else{
              item.children.forEach(item=>{
              num++
              item.title= item.name
              item.value=item.pid
              item.key= '0-' +index+ '-'  + num
            })
            }
          }  else if(index==3){
            item.title=item.name
            item.value=item.pid
            item.key = '0-' +index
            console.log(11111111)
            var num=-1
            console.log(item.children)
              if(item.children==null){
                  console.log(222222222)
              }else{
                item.children.forEach(item=>{
                num++
                item.title= item.name
                item.value= item.pid
                item.key= '0-' +index + '-' + num
              })
            }
            
          } else if(index==4){
            item.title=item.name
            item.value=item.pid
            item.key = '0-' +index
            console.log(11111111)
            var num=-1
            console.log(item.children)
              if(item.children==null){
                  console.log(222222222)
              }else{
                item.children.forEach(item=>{
                num++
                item.title= item.name
                item.value= item.pid
                item.key= '0-' +index + '-' + num
              })
            }
          } else if(index==5){
            item.title=item.name
            item.value=item.pid
            item.key = '0-' +index
            console.log(11111111)
            var num=-1
            console.log(item.children)
              if(item.children==null){
                  console.log(222222222)
              }else{
                item.children.forEach(item=>{
                num++
                item.title= item.name
                item.value= item.pid
                item.key= '0-' +index + '-' + num
              })
            }
          } 
          else if(index==6){
            item.title=item.name
            item.value=item.pid
            item.key = '0-' +index
            var num=-1
            console.log(item.children)
              if(item.children==null){
              }else{
                item.children.forEach(item=>{
                num++
                item.title= item.name
                item.value= item.pid
                item.key= '0-' +index + '-' + num
              })
            }
          } 
        })
        console.log(this.treeData)
      },
      handleSelect(){
        this.$refs.producerForm.produceradd()
        this.$refs.producerForm.title="请选择";
      },
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
};
</script>
<style scoped>

</style>