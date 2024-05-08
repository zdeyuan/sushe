<template>
  <a-row :gutter="10">
    <a-col :sm="24" style="margin-bottom: 20px">
      <a-card :bordered="false">
        <a-tabs type="card" @change="callback">
          <a-tab-pane key="1" tab="栏目管理" >
            <div v-if="buildNum==0">
                <div class="table-operator" style="margin: 5px 0 10px 2px">
                  <a-button @click="handleadd()" style="background-color:#00BAD0;color:#fff" icon="plus">添加</a-button>
                  <a-button @click="cannerShare()" type="primary" icon="plus-square">展开</a-button>
                  <a-button @click="handlefold()" style="background-color:#FC8950;color:#fff" icon="minus-square">折叠</a-button>
                  <a-button @click="handleRefresh()" style="background-color:#66C3FD;color:#fff" icon="reload">刷新</a-button>
                </div>
              <a-table
                style="height:500px"
                ref="table"
                size="middle"
                rowKey="id"
                :columns="columns"
                :dataSource="teacherData"
                :pagination="ipagination"
                
                >
              <span slot="action" slot-scope="text, record">
                <a @click="handleEdit()" style="color:#0098F8">编辑</a>
                <a-divider type="vertical"/>
                <a style="color:#FC8950">删除</a>
              </span>
              <!-- <span slot="stataction" slot-scope="text, record">         
                <span v-if="text=='是'" style="color: red">{{record.status}}</span>
                <span v-else style="color:#000000">{{ record.status }}</span> 
              </span> -->
              </a-table>
            </div>
            <!-- 添加 -->
            <div v-if="buildNum==1">
              <div class="imaportBack">
                <div class="imaportants">
                  <div class="columnar"></div>
                  <div class="colsign">添加</div>
                </div>
              </div>
              <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 6 }">
                <a-form-item label="栏目名称">
                  <a-input style="width:400px;height: 34px;" placeholder="请输入栏目名称"
                    v-decorator.trim="['columnName', validatorRules.columnName]" 
                  />
                </a-form-item>
                <a-form-item label="上级栏目">
                  <a-select v-decorator.trim="['depid', validatorRules.depid]" >
                    <a-select-option v-for="(item,index) in SuperiorData" :key="index.columname" :value="item.id">{{item.columname}}</a-select-option>
                  </a-select>
                </a-form-item>
                <a-form-item label="是否共享">
                  <a-radio-group v-decorator="['isshared', validatorRules.isshared]">
                    <a-radio :value="1">
                      是
                    </a-radio>
                    <a-radio :value="0">
                      否
                    </a-radio>
                  </a-radio-group>  
                </a-form-item>
                <a-form-item label="图片" style="">
                  <a-upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    list-type="picture"
                    :default-file-list="fileList"
                    @change="handleChangeImg"
                  >
                    <a-button> <a-icon type="upload" /> 选择文件 </a-button>
                  </a-upload>
                  <div style="color:#999999">如果栏目包括图片,需要上传图片</div>
                </a-form-item>
                <a-form-item label="排序">
                  <a-input style="width:400px;height: 34px;" placeholder="请输入排序"
                    v-decorator.trim="['sort', validatorRules.sort]" 
                  />
                </a-form-item>
                <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
                  <a-button type="primary" @click="addSubmit" style="width:100px;height:40px">
                    确定
                  </a-button>
                  <a-button  class="buttonback"  @click="handReturn">
                    返回
                  </a-button>
                </a-form-item>
              </a-form>
            </div>
            <div v-if="buildNum==2">
              <div class="imaportBack">
                <div class="imaportants">
                  <div class="columnar"></div>
                  <div class="colsign">编辑</div>
                </div>
              </div>
              <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 6 }">
                <a-form-item label="栏目名称">
                  <a-input style="width:400px;height: 34px;" placeholder="请输入栏目名称"
                    v-decorator.trim="['columnName', validatorRules.columnName]" 
                  />
                </a-form-item>
                <a-form-item label="上级栏目">
                  <a-select v-decorator.trim="['depid', validatorRules.depid]" >
                    <a-select-option v-for="(item,index) in SuperiorData" :key="index.columname" :value="item.id">{{item.columname}}</a-select-option>
                  </a-select>
                </a-form-item>
                <a-form-item label="是否共享">
                  <a-radio-group v-decorator="['isshared', validatorRules.isshared]">
                    <a-radio :value="1">
                      是
                    </a-radio>
                    <a-radio :value="0">
                      否
                    </a-radio>
                  </a-radio-group>  
                </a-form-item>
                <a-form-item label="图片" style="">
                  <a-upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    list-type="picture"
                    :default-file-list="fileList"
                    @change="handleChangeImg"
                  >
                    <a-button> <a-icon type="upload" /> 选择文件 </a-button>
                  </a-upload>
                  <div style="color:#999999">如果栏目包括图片,需要上传图片</div>
                </a-form-item>
                <a-form-item label="排序">
                  <a-input style="width:400px;height: 34px;" placeholder="请输入排序"
                    v-decorator.trim="['sort', validatorRules.sort]" 
                  />
                </a-form-item>
                <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
                  <a-button type="primary" @click="addSubmit" style="width:100px;height:40px">
                    确定
                  </a-button>
                  <a-button  class="buttonback"  @click="handReturn">
                    返回
                  </a-button>
                </a-form-item>
              </a-form>
            </div>
          </a-tab-pane>
          <a-tab-pane key="2" tab="内容管理">
            <div class="teamItem">
              <!-- <div class="teamBack">教师团队介绍</div>
              <div class="teamcolor">师资队伍建设成果</div> -->
              <div class="teamcolor" v-for="(item,index) in  sexList" :key="index" :class="sexcur==index?'teamBack':''" @click="select(index)">
                <div class="woldsize">{{item}}</div>
              </div>
            </div>
            <div v-show="sexcur==0&&contentNum==0">
              <div style="margin: 5px 0 10px 2px">
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
                  <a-select default-value="lucy" style="display: inline-block;width: 203px;height: 34px;margin-right: 20px">
                    <a-select-option value="lucy">建设成果</a-select-option>
                  </a-select>
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
            <div v-if="contentNum==1">
              <div class="imaportBack">
                <div class="imaportants">
                  <div class="columnar"></div>
                  <div class="colsign">添加</div>
                </div>
              </div>
              <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 6 }">
                <a-form-item label="标题">
                  <a-input style="width:800px;height: 34px;" placeholder="请输入标题"
                    v-decorator.trim="['columnName', validatorRules.columnName]" 
                  />
                </a-form-item>
                <a-form-item label="图片" style="">
                  <a-upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    list-type="picture"
                    :default-file-list="contList"
                    @change="handlecontImg"
                  >
                    <a-button> <a-icon type="upload" /> 选择文件 </a-button>
                  </a-upload>
                  <div style="color:#999999">如果栏目包括图片,需要上传图片</div>
                </a-form-item>
                <a-form-item label="摘要">
                  <a-input style="width:800px;height: 34px;" placeholder="请输入摘要"
                    v-decorator.trim="['columnName', validatorRules.columnName]" 
                  />
                </a-form-item>
                <a-form-item label="内容">
                  <vue-editor v-model="content" style='width: 866px;z-index:10;line-height:20px'></vue-editor>
                </a-form-item>
                <a-form-item label="是否发布">
                <a-radio-group name="radioGroup" v-decorator="['release', validatorRules.release]">
                  <a-radio :value="1">
                    是
                  </a-radio>
                  <a-radio :value="0">
                    否
                  </a-radio>
                </a-radio-group>
                <div style="color:#999999">发布状态为"是"的信息前台才会显示</div>
              </a-form-item>
              <a-form-item label="发布时间">
                <a-input style="width:800px;height: 34px;" placeholder="请输入摘要"
                  v-decorator.trim="['ReleaseTime', validatorRules.ReleaseTime]" 
                />
                <div style="color:#999999">按发布时间从大到小排序</div>
              </a-form-item>
              <a-form-item label="是否推荐">
                <a-radio-group name="radioGroup" v-decorator="['recommend', validatorRules.recommend]">
                  <a-radio :value="1">
                    是
                  </a-radio>
                  <a-radio :value="0">
                    否
                  </a-radio>
                </a-radio-group>
                <div style="color:#999999">发布状态为"推荐"的信息首页才会显示</div>
              </a-form-item>
              <a-form-item label="是否置顶">
                <a-radio-group name="radioGroup" v-decorator="['top', validatorRules.top]">
                  <a-radio :value="1">
                    是
                  </a-radio>
                  <a-radio :value="0">
                    否
                  </a-radio>
                </a-radio-group>
                <div style="color:#999999">设置为置顶信息将优先排在前面显示</div>
              </a-form-item>
              <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
                <a-button type="primary" @click="determine" style="width:100px;height:40px">
                  确定
                </a-button>
                <a-button  class="buttonback"  @click="handleReturn">
                  返回
                </a-button>
              </a-form-item>
              </a-form>
            </div>
            <div v-if="contentNum==2">
              <div class="imaportBack">
                <div class="imaportants">
                  <div class="columnar"></div>
                  <div class="colsign">编辑</div>
                </div>
              </div>
              <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 6 }">
                <a-form-item label="标题">
                  <a-input style="width:800px;height: 34px;" placeholder="请输入标题"
                    v-decorator.trim="['columnName', validatorRules.columnName]" 
                  />
                </a-form-item>
                <a-form-item label="图片" style="">
                  <a-upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    list-type="picture"
                    :default-file-list="contList"
                    @change="handlecontImg"
                  >
                    <a-button> <a-icon type="upload" /> 选择文件 </a-button>
                  </a-upload>
                  <div style="color:#999999">如果栏目包括图片,需要上传图片</div>
                </a-form-item>
                <a-form-item label="摘要">
                  <a-input style="width:800px;height: 34px;" placeholder="请输入摘要"
                    v-decorator.trim="['columnName', validatorRules.columnName]" 
                  />
                </a-form-item>
                <a-form-item label="内容">
                  <vue-editor v-model="content" style='width: 866px;z-index:10;line-height:20px'></vue-editor>
                </a-form-item>
                <a-form-item label="是否发布">
                <a-radio-group name="radioGroup" v-decorator="['release', validatorRules.release]">
                  <a-radio :value="1">
                    是
                  </a-radio>
                  <a-radio :value="0">
                    否
                  </a-radio>
                </a-radio-group>
                <div style="color:#999999">发布状态为"是"的信息前台才会显示</div>
              </a-form-item>
              <a-form-item label="发布时间">
                <a-input style="width:800px;height: 34px;" placeholder="请输入摘要"
                  v-decorator.trim="['ReleaseTime', validatorRules.ReleaseTime]" 
                />
                <div style="color:#999999">按发布时间从大到小排序</div>
              </a-form-item>
              <a-form-item label="是否推荐">
                <a-radio-group name="radioGroup" v-decorator="['recommend', validatorRules.recommend]">
                  <a-radio :value="1">
                    是
                  </a-radio>
                  <a-radio :value="0">
                    否
                  </a-radio>
                </a-radio-group>
                <div style="color:#999999">发布状态为"推荐"的信息首页才会显示</div>
              </a-form-item>
              <a-form-item label="是否置顶">
                <a-radio-group name="radioGroup" v-decorator="['top', validatorRules.top]">
                  <a-radio :value="1">
                    是
                  </a-radio>
                  <a-radio :value="0">
                    否
                  </a-radio>
                </a-radio-group>
                <div style="color:#999999">设置为置顶信息将优先排在前面显示</div>
              </a-form-item>
              <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
                <a-button type="primary" @click="determine" style="width:100px;height:40px">
                  确定
                </a-button>
                <a-button  class="buttonback"  @click="handleReturn">
                  返回
                </a-button>
              </a-form-item>
              </a-form>
            </div>
            <div v-show="sexcur==1">
              <teach-staff></teach-staff>
            </div>
          </a-tab-pane>
        </a-tabs> 
      </a-card>
    </a-col>
  </a-row>
</template>
<script>
  import moment from 'moment'
  import '@/assets/less/usercolor.less'
  import { VueEditor } from 'vue2-editor';
  import TeachStaff from './modules/TeachStaff'
  export default {
    name: 'teachers',
    components: {
      moment,
      VueEditor,
      TeachStaff
    },
    data() {
      return {
        sexcur:0,
        projectnum:'',
        indexStyle:0,
        buildNum:0,
        content:'',
        contentNum:0,
        // 查询条件
        queryParam: {
          pageNo: 1,//第几页
          pageSize: 10,//每页中显示数据的条数
        },
        queryParam2: {},
        teacherData: [{
          Serial:'1',
          columnName:'师资建设',
          columnID: '367',
          columnType:'基础分类',
          status:'是',
          sort:'1',
          children: [{
            Serial:'1.1',
            columnName:'教师团队介绍',
            columnID: '368',
            columnType:'信息分类',
            status:'否',
            sort:'1.1',
          }]
        },],
        SuperiorData:[{
          id:1,
          columname:'关于我们'
        },{
          id:2,
          columname:'专业介绍'
        }],
        sexList:['教师团队介绍','师资队伍建设','教师培训需求','兼职教师人才','教师企业实践','师工作室建设'],
        fileList:[],
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
        loading: true,
        columns:[
          {
            title: '序号',
            align: 'center',
            dataIndex: 'Serial',
            width:200,
          },
          {
            title: '栏目名称',
            align: 'center',
            dataIndex: 'columnName',
            width:200,
          },
          {
            title: '栏目ID',
            align: 'center',
            dataIndex: 'columnID',
            width:200,
          },
          {
            title: '栏目类型',
            align: 'center',
            dataIndex: 'columnType',
            width:200,
          },
          {
            title: '前台是否显示',
            align: 'center',
            dataIndex: 'status',
            width:200,
            scopedSlots: { customRender: 'stataction' }
          },
          {
            title: '排序',
            align: 'center',
            dataIndex: 'sort',
            width:200,
          },
          {
            title: '操作',
            dataIndex: 'action',
            align: 'center',
            width:200,
            scopedSlots: { customRender: 'action' }
          }
        ],
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