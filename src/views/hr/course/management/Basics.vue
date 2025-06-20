<template>
  <a-row :gutter="10">
    <a-col :sm="24" style="margin-bottom: 20px">
      <a-card :bordered="false">
        <!-- 操作按钮区域 -->
        <a-tabs type="card" @change="callback">
          <a-tab-pane key="1" tab="课程分类管理">
          </a-tab-pane>
          <a-tab-pane key="2" tab="成绩考核项设置">
          </a-tab-pane>
        </a-tabs>
        <div class="table-operator" style="margin: 5px 0 10px 2px" v-if="this.baseNum==0&&this.callNum==1">
          <a-button @click="handleAdd(1)" style="background-color:#00BAD0;color:#fff" icon="plus">添加</a-button>
          <a-button @click="handleopen()" type="primary" icon="plus-square">展开</a-button>
          <a-button @click="handlefold()" style="background-color:#FC8950;color:#fff" icon="minus-square">折叠</a-button>
          <a-button @click="handleRefresh()" style="background-color:#66C3FD;color:#fff" icon="reload">刷新</a-button>
        </div>
        <div class="table-operator" style="margin: 5px 0 10px 2px" v-if="this.baseNum==0&&this.callNum==2">
          <a-button @click="handleAddes(5)" style="background-color:#00BAD0;color:#fff" icon="plus">添加</a-button>
          <a-button @click="handleEnable(1)" style="background-color:#00D09D;color:#fff" icon="plus-square">启用</a-button>
          <a-button @click="handleEnable(0)" style="background-color:#FC8950;color:#fff" icon="minus-square">禁用</a-button>
          <a-button @click="handleRefreshes()" style="background-color:#66C3FD;color:#fff" icon="reload">刷新</a-button>
        </div>
        <div v-if="this.baseNum==0&&this.callNum==1">
          <a-table
            style="height:500px"
            ref="table"
            size="middle"
            rowKey="id"
            :columns="columns"
            :dataSource="sourceData"
            :pagination="ipagination1"
            :loading="loading"
            
            >
          <span slot="action" slot-scope="text, record">
            <a v-if="record.pid==0" @click="handadd(record)" style="color:#00BAD0">添加</a>
            <a-divider type="vertical" v-if="record.pid==0"/>
            <a @click="handleEdit(record)" style="color:#0098F8">编辑</a>
            <a-divider type="vertical"/>
            <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
              <a style="color:#FC8950">删除</a>
            </a-popconfirm>
          </span>
          <span slot="statusaction" slot-scope="text, record">         
            <span v-if="text=='1'">启用</span>
            <span v-else style="color:#FC8950">禁用</span> 
          </span> 
          
          </a-table>
        </div>
        <div v-if="this.baseNum==0&&this.callNum==2">
          <a-table
            style="height:500px"
            ref="table"
            size="middle"
            rowKey="id"
            :columns="columns1"
            :dataSource="achieveData"
            :pagination="ipagination"
            :loading="loading"
            @change="handleTableChange"
            :rowSelection="{onChange: onSelectChange}"
            >
            <a-pagination size="small" :total="50" show-size-changer show-quick-jumper />
          <span slot="action" slot-scope="text, record">
            <a @click="handleModify(record)" style="color:#0098F8">编辑</a>
          </span>
          <span slot="stataction" slot-scope="text, record">         
            <span v-if="text=='1'">启用</span>
            <span v-else style="color:#FC8950">禁用</span> 
          </span>
          </a-table>
        </div>
        <!-- 添加 -->
        <div v-if="this.baseNum==1">
          <div class="imaportBack">
            <div class="imaportants">
              <div style="width:10px; height:30px; background-color:#0098F8"></div>
              <div style="color:#666666;font-size:20px;margin-left: 10px;">添加</div>
            </div>
          </div>
          
          <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 3 }" @submit="handleSubmit">
            <!-- <a-form-item label="上级分类">
              <a-select v-decorator="[ 'pid', {}]" placeholder="请选择上级分类" :getPopupContainer= "(target) => target.parentNode">
                <a-select-option v-for="(item,index) in sourceData" :key="index.id" :value="item.name">{{item.name}}</a-select-option>
              </a-select>
            </a-form-item> -->
            <a-form-item label="上级分类">
              <a-tree-select
                  v-model="pidvalue"
                  style="width: 100%"
                  :tree-data="treeData"
                  :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                  placeholder="顶级分类"
                  allow-clear
                  tree-default-expand-all
                >
              </a-tree-select>
            </a-form-item>  
            <a-form-item label="分类名称">
              <a-input style="width:400px;height: 34px;" placeholder="请输入分类名称" 
                v-decorator.trim="['name', validatorRules.name]" 
              />
            </a-form-item>
            <a-form-item label="排序">
              <a-input style="width:400px;height: 34px;" placeholder="排序"
                v-decorator="['listSort', { rules: [{ required: false, message: '请输入排序' }] }]"
              />
            </a-form-item>
            <a-form-item label="状态">
              <a-radio-group v-decorator="[ 'status', {}]" placeholder="请选择上级分类" :getPopupContainer= "(target) => target.parentNode" >
                <a-radio :value="1">
                  启用
                </a-radio>
                <a-radio :value="0">
                  禁用
                </a-radio>
              </a-radio-group>
            </a-form-item>
            <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
              <a-button type="primary" html-type="submit" style="width:100px;height:40px">
                确定
              </a-button>
              <a-button  class="buttonback"  @click="handReturn">
                返回
              </a-button>
            </a-form-item>
            
          </a-form>  
        </div>
        <!-- 编辑 -->
        <div v-if="this.baseNum==4">
          <div class="imaportBack">
            <div class="imaportants">
              <div style="width:10px; height:30px; background-color:#0098F8"></div>
              <div style="color:#666666;font-size:20px;margin-left: 10px;">编辑</div>
            </div>
          </div>
          <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 3 }" @submit="determine">
            <a-form-item label="上级分类">
              <a-tree-select
                  v-model="pidvalue"
                  style="width: 100%"
                  :tree-data="treeData"
                  :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                  placeholder="顶级分类"
                  allow-clear
                  tree-default-expand-all
                >
              </a-tree-select>
            </a-form-item>  
            <a-form-item label="分类名称">
              <a-input style="width:400px;height: 34px;" placeholder="请输入分类名称" v-decorator.trim="[ 'name', validatorRules.name]" />
            </a-form-item>
            <a-form-item label="排序">
              <a-input style="width:400px;height: 34px;" placeholder="请输入排序" v-decorator.trim="[ 'listsort', validatorRules.listsort]" />
            </a-form-item>
            <a-form-item label="状态">
              <a-radio-group v-decorator.trim="[ 'status', validatorRules.status]" >
                <a-radio :value="1">
                  启用
                </a-radio>
                <a-radio :value="0">
                  禁用
                </a-radio>
              </a-radio-group>
            </a-form-item>
            <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
              <a-button type="primary" @click="determine" html-type="submit" style="width:100px;height:40px">
                确定
              </a-button>
              <a-button  class="buttonback"  @click="handReturn">
                返回
              </a-button>
            </a-form-item>
            
          </a-form>  
        </div>
        <!-- 成绩考核项添加 -->
        <div v-if="this.baseNum==5">
          <div class="imaportBack">
            <div class="imaportants">
              <div style="width:10px; height:30px; background-color:#0098F8"></div>
              <div style="color:#666666;font-size:20px;margin-left: 10px;">添加</div>
            </div>
          </div>
          <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 6 }" @submit="handleSubmit">
            <a-form-item label="标识">
              <a-input style="width:400px;height: 34px;" placeholder="只能使用英文且不能重复"
                v-decorator.trim="['code', validatorRules.code]" 
              />
            </a-form-item>
            <a-form-item label="名称">
              <a-input style="width:400px;height: 34px;" placeholder="1-50个字"
                v-decorator="['name', validatorRules.name]" 
              />
            </a-form-item>
            <a-form-item label="默认权重">
              <a-input-search
                style="width:400px;height: 34px;"
                placeholder="请输入默认权重"
                enter-button="%"
                size="large"
                @search="onSearch"
                v-decorator="['weight', validatorRules.weight]" 
              />
            </a-form-item>
            <a-form-item label="默认满分条件">
              <a-input style="width:400px;height: 34px;" placeholder="0"
                v-decorator="['veCondition', validatorRules.veCondition]" 
              />
            </a-form-item>
            <a-form-item label="计算单位">
              <a-input style="width:400px;height: 34px;" placeholder="0"
                v-decorator="['unit', validatorRules.unit]" 
              />
            </a-form-item>
            <a-form-item label="排序">
              <a-input style="width:400px;height: 34px;" placeholder="10"
                v-decorator="['listsort', validatorRules.listsort]" 
              />
            </a-form-item>
            <a-form-item label="是否关联考试">
              <a-radio-group name="radioGroup" :default-value="1" v-decorator="['isexam', validatorRules.isexam]">
                <a-radio :value="1">
                  是
                </a-radio>
                <a-radio :value="0">
                  否
                </a-radio>
              </a-radio-group>
            </a-form-item>
            <!-- <a-form-item label="所属省份">
              <a-checkbox-group v-model="checkedList" :options="plainData" @change="onChange" style="width:500px"/>
            </a-form-item> -->
            <a-form-item label="备注说明">
              <a-textarea  style="width:600px" placeholder="配置详情说明" :rows="4" v-decorator="['remark', validatorRules.remark]"/>
            </a-form-item>
            <a-form-item label="启用状态">
              <a-radio-group name="radioGroup" :default-value="0" v-decorator="['status', validatorRules.status]">
                <a-radio :value="0">
                  禁用
                </a-radio>
                <a-radio :value="1">
                  启用
                </a-radio>
              </a-radio-group>
            </a-form-item>
            <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
              <a-button type="primary" @click="newSubmit" html-type="submit" style="width:100px;height:40px">
                确定
              </a-button>
              <a-button  class="buttonback"  @click="handReturn">
                返回
              </a-button>
            </a-form-item>
            
          </a-form>  
        </div>
        <!-- 成绩考核项编辑 -->
        <div v-if="this.baseNum==6">
          <div class="imaportBack">
            <div class="imaportants">
              <div style="width:10px; height:30px; background-color:#0098F8"></div>
              <div style="color:#666666;font-size:20px;margin-left: 10px;">编辑</div>
            </div>
          </div>
          <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 6 }" @submit="handleSubmit">
            <a-form-item label="标识">
              <a-input style="width:400px;height: 34px;" placeholder="只能使用英文且不能重复"
                v-decorator.trim="['code', validatorRules.code]" 
              />
            </a-form-item>
            <a-form-item label="名称">
              <a-input style="width:400px;height: 34px;" placeholder="1-50个字"
                v-decorator="['name', validatorRules.name]" 
              />
            </a-form-item>
            <a-form-item label="默认权重">
              <a-input-search
                style="width:400px;height: 34px;"
                placeholder="请输入默认权重"
                enter-button="%"
                size="large"
                @search="onSearch"
                v-decorator="['weight', validatorRules.weight]" 
              />
            </a-form-item>
            <a-form-item label="默认满分条件">
              <a-input style="width:400px;height: 34px;" placeholder="0"
                v-decorator="['veCondition', validatorRules.veCondition]" 
              />
            </a-form-item>
            <a-form-item label="计算单位">
              <a-input style="width:400px;height: 34px;" placeholder="0"
                v-decorator="['unit', validatorRules.unit]" 
              />
            </a-form-item>
            <a-form-item label="排序">
              <a-input style="width:400px;height: 34px;" placeholder="10"
                v-decorator="['listsort', validatorRules.listsort]" 
              />
            </a-form-item>
            <a-form-item label="是否关联考试">
              <a-radio-group name="radioGroup" v-decorator="['isexam', validatorRules.isexam]">
                <a-radio :value="1">
                  是
                </a-radio>
                <a-radio :value="0">
                  否
                </a-radio>
              </a-radio-group>
            </a-form-item>
            <!-- <a-form-item label="所属省份">
              <a-checkbox-group v-model="checkedList" :options="plainData" @change="onChange" style="width:500px"/>
            </a-form-item> -->
            <a-form-item label="备注说明">
              <a-textarea  style="width:600px" placeholder="配置详情说明" :rows="4" v-decorator="['remark', validatorRules.remark]"/>
            </a-form-item>
            <a-form-item label="启用状态">
              <a-radio-group name="radioGroup" v-decorator="['status', validatorRules.status]">
                <a-radio :value="0">
                  禁用
                </a-radio>
                <a-radio :value="1">
                  启用
                </a-radio>
              </a-radio-group>
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
        </div>
      </a-card>
    </a-col>
    <a-col :md="rightColMd" :sm="24" v-if="this.rightcolval == 1">
      <a-card :bordered="false">
        <div style="text-align: right;">
          <a-icon type="close-circle" @click="hideUserList" />
        </div>
        <!-- 查询区域 -->
        <div class="table-page-search-wrapper">
          <a-form layout="inline">
            <a-row :gutter="24">

              <a-col :md="12" :sm="12">
                <a-form-item label="用户账号">
                  <a-input placeholder="" v-model="queryParam2.username"></a-input>
                </a-form-item>
              </a-col>
              <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
            <a-col :md="9" :sm="24">
             <a-button type="primary" @click="searchQuery2" icon="search"  style="margin-right: 10px;">查询</a-button>
              <a-button type="primary" @click="searchReset2" icon="reload" >重置</a-button>

            </a-col>
          </span>
            </a-row>
          </a-form>
        </div>
        <!-- 表单区域 -->
        <role-modal ref="modalForm" @ok="modalFormOk"></role-modal>
        <user-modal ref="modalForm2" @ok="modalFormOk2"></user-modal>
        <Select-User-Modal ref="selectUserModal" @selectFinished="selectOK"></Select-User-Modal>
        
      </a-card>
    </a-col>
  </a-row>
</template>
<script>
  // import { EduListMixin } from '@/mixins/EduListMixin'
  import JDictSelectTag from '@/components/dict/JDictSelectTag.vue'
  import { categoryList,categoryadd,categoryedit,categorydelete,assessList,assessAdd,assessAEdit,stopAdmin } from '@/api/hr/course.js'
  //import SelectUserModal from './modules/SelectUserModal'
  //import RoleModal from './modules/RoleModal'
  //import UserModal from './modules/UserModal'
  import { filterObj } from '@/utils/util'
  //import UserRoleModal from './modules/UserRoleModal'
  import moment from 'moment'
  import pick from 'lodash.pick'
  
  export default {
    name: 'textroleList',
    // mixins: [EduListMixin],
    components: {
    // UserRoleModal,
    // SelectUserModal,
    //RoleModal,
    //UserModal,
      JDictSelectTag,
      moment
    },
    data() {
      return {
        indexStyle:0,
        baseNum:0,
        checkedList:[],
        //tree select 树选择
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
        // 查询条件
        queryParam: {
          pageNo: 1,//第几页
          pageSize: 10,//每页中显示数据的条数
        },
        plainData: ['平时', '随堂测试', '单元测试','期中测试','期末考试'],
        callNum :'1',
        model1: {},
        model2: {},
        currentRoleId: '',
        queryParam2: {},
        sourceData: [{
          number:1,
          ColumnName:'轮机工程技术课程',
          id: 2,
          statusDictText:'启用',
          sort:1,
          children: [
            {
              id: 11,
              number:1.1,
              ColumnName: '轮机工程实时',
              statusDictText:'启用',
              sort:1,
            },
          ],
        }],
        achieveData:[],
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
        ipagination: {
          current: 1,
          pageSize: 10,
          total: 0,
          pageSizeOptions: ['10', '20', '30'],
          showTotal: (total, range) => {
            return range[0] + '-' + range[1] + ' 共' + total + '条'
          },
          showQuickJumper: true,
          showSizeChanger: true,
        },
        isorter1: {
          column: 'createTime',
          order: 'desc'
        },
        isorter2: {
          column: 'createTime',
          order: 'desc'
        },
        filters1: {},
        filters2: {},
        loading: true,
        selectedRowKeys: [],
        selectionRows1: [],
        selectionRows2: [],
        test:{},
        rightcolval:0,
        columns:
          [
            {
              title: '序号',
              align: 'center',
              dataIndex: 'pid',
              key: 'pid',
              width:200,
            },
            {
              title: '栏目名称',
              align: 'center',
              dataIndex: 'name',
              key: 'name',
              width:200,
            },
            {
              title: '状态',
              align: 'center',
              dataIndex: 'status',
              key: 'status',
              width:200,
              scopedSlots: { customRender: 'statusaction' }
            },
            {
              title: '排序',
              align: 'center',
              dataIndex: 'listsort',
              key: 'listsort',
              width:200
            },
            {
              title: '操作',
              dataIndex: 'action',
              align: 'center',
              width:200,
              scopedSlots: { customRender: 'action' }
            }
          ],
        columns1: [{
          title: '标识',
          align: 'center',
          dataIndex: 'code',
          width: 120
          },
          {
            title: '名称',
            align: 'center',
            width: 100,
            dataIndex: 'name'
          },
          {
            title: '默认权重',
            align: 'center',
            width: 80,
            dataIndex: 'weight',
            customRender:function(text,record){
              var weightText
              weightText = text +record.unit
              return weightText
            }
          },
          {
            title: '默认满分条件',
            align: 'center',
            width: 80,
            dataIndex: 'veCondition',
            customRender:function(text,record){
              var conditiText
              conditiText = text +record.unit
              return conditiText
            }
          },
          {
            title: '状态',
            align: 'center',
            width: 80,
            dataIndex: 'status',
            //   customRender: function (text) {
            //   if (text == 0) {
            //     return "禁用";
            //   } else if (text == 1) {
            //     return "启用";
            //   }
            // },
            scopedSlots: { customRender: 'stataction' }
          },
          {
            title: '操作',
            dataIndex: 'action',
            scopedSlots: { customRender: 'action' },
            align: 'center',
            width: 120
          }],
        
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
        pidvalue:'顶级分类',
        recorData:{},
        ModifyData:{},
        EnableId:[],
        current:'',
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
      this.geilist();
    },
    computed: {
    //   importExcelUrl: function() {
    //     return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
    //   },
    },
    
    methods: {
      handleTableChange(ipagination) {
        console.log(ipagination)
        // console.log(ipagination.current)
        this.ipagination.current = ipagination.current;
        // console.log(this.ipagination.current)
        this.ipagination.pageSize = ipagination.pageSize;
        this.queryParam.pageNo = ipagination.current;
        this.queryParam.pageSize = ipagination.pageSize;
        //  console.log(this.queryParam.size)
        this.getassess();
      },
      // getQueryParams() {
      //   var param = Object.assign({}, this.queryParam, this.isorter);
      //   param.field = this.getQueryField();
      //   param.pageNo = this.ipagination.current;
      //   param.pageSize = this.ipagination.pageSize;
      //   if (this.superQueryParams) {
      //     param['superQueryParams'] = encodeURI(this.superQueryParams)
      //     param['superQueryMatchType'] = this.superQueryMatchType
      //   }
      //   return filterObj(param);
      // },
      //列表数据
      geilist(){
        this.loading = true
        categoryList().then((res)=>{
          this.sourceData = res.result
          this.loading = false
          this.treeData = this.sourceData
          console.log(this.treeData)
        })    
      },
      getassess(){
      //  this.params = {
      //     pageNo: this.pageNo,
      //     pageSize:this.pageSize,
      //   }
        assessList(this.queryParam).then((res)=>{
          console.log(res)
          this.achieveData = res.result.records
          this.ipagination.current = res.result.current
          this.ipagination.pageSize = res.result.size
          this.ipagination.total = res.result.total
          console.log(this.achieveData)
        })
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
          
        })
        console.log(this.treeData)
      },
      // handleAdd(record){
      // console.log(record)
      // this.$refs.modal.add(record)
      // this.$refs.modal.title="新增"
      resets() {
        this.form = {

        }
      }, 
      //课程按钮
      callback(key) {
        console.log(key);
        this.callNum = key
        if(this.callNum==1){
          this.geilist();
        }else{
          this.getassess();
        }
      },
      //添加
      handleAdd(item){
        console.log(item)
        this.baseNum = item
        this.gettree()
      },
      handleEdit(record){
        this.baseNum = 4
        console.log(record)
        this.recorData = record
        console.log(this.recorData)
        this.model = Object.assign({}, record);
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'name', 'listsort','status'))
        });
        this.gettree()
        console.log(this.form.values)
      },
      handleAddes(item){
        this.baseNum = item
      },
      handleopen(){
        
      },
      //添加
      handadd(item){
        console.log(item)
        this.form.resetFields();
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
      handlefold(){

      },
      handleRefresh(){
        this.geilist();
      },
      handleRefreshes(){
        this.getassess();
      },
      //返回
      handReturn(){
        this.baseNum=0
      },
      //添加
      handleSubmit(e) {
        console.log(this.pidvalue)
        e.preventDefault();
        this.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
            let formData = values
            formData.pid = this.pidvalue
            console.log(formData)
            categoryadd(formData).then((res) => {
              if (res.code === 200) {
                console.log(1122)
                this.$message.success("添加成功");
                this.baseNum=0
                this.geilist();
              }
            });
          }
        });
      },
      //修改
      determine(e){
        console.log(this.ModifyData)
        e.preventDefault();
        this.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
            let formData = values
            formData.id = this.ModifyData.id
            console.log(formData)
            categoryedit(formData).then((res) => {
              if (res.code === 200) {
                console.log(123)
                this.$message.success("修改成功");
                this.baseNum=0
                this.geilist();
              }
            });
          }
        });
      },
      //删除
      handleDelete: function(id) {
        categorydelete(id, {}).then((res)=>{
          console.log(res)
          this.geilist();
        })
      },
      //成绩考核添加
      newSubmit(e){
        e.preventDefault();
        this.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
            let formData = values
            console.log(formData)
            assessAdd(formData).then((res) => {
              if (res.code === 200) {
                this.$message.success("添加成功");
                this.baseNum=0
                this.getassess();
              }
            });
          }
        });
      },
      //成绩考核编辑
      editSubmit(e){
         e.preventDefault();
        this.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
            let formData = values
            console.log(formData)
            assessAEdit(formData).then((res) => {
              if (res.code === 200) {
                this.$message.success("添加成功");
                this.baseNum=0
                this.getassess();
              }
            });
          }
        });
      },
      //启用
      handleEnable(item){
        var status=''
        status = item
        console.log(status)
        let params = {
          status: status,
          list:this.EnableId,
        }
        stopAdmin(params).then((res)=>{
          if (res.code === 200) {
            this.$message.success("操作成功");
            this.baseNum=0
            this.getassess();
          }
        })
      },
      //禁用

      onSelectChange(row,record){
        console.log(record)
        var recordId = []
        var obj={}
        record.forEach(item=>{
          obj = item.id
          recordId.push(obj)
        })
        this.EnableId = recordId
        console.log(this.EnableId)
      },
      onSearch(value) {
      console.log(value);
      },
      onChange(checkedList) {
        console.log(checkedList)
      },
      
    }
  }
</script>
<style scoped>
  
</style>