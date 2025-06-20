<template>
  <a-card :bordered="false">
    <div v-if="contentNum==0">
    <div>
      <div style='background-color: #0098F8;width: 10px;height: 30px;display: inline-block;vertical-align:middle;margin-top: -6px'></div>
      <p style='display: inline-block;color: #666666;font-size: 20px;margin-left: 20px'>做课-轮机电气学（已完成）</p>
    </div>
    <div class="table-operator" style="">
      <a-button @click=" " type="primary" style='position: absolute;right: 130px;height:48px;top: 30px'>学习内容</a-button>
      <a-button @click=" " type="primary" style='position: absolute;right: 0;height: 48px;top: 30px'><a-icon type="caret-right" />课程预览</a-button>
    </div>
    <div style='margin-top: 50px'>
      <div class="table-operator" style="height: 30px;display: inline-block">
        <a-button @click="clickUpload" type="primary" style='background-color: #00BAD0;height:35px;border: none'><a-icon type="plus" />上传资源</a-button>
      </div>
      <div class="table-operator" style="height: 30px;display: inline-block">
        <a-button @click="handlebatch" type="primary" style='background-color: #FC8950;height:35px;border: none'><a-icon type="plus-square" />批量上传</a-button>
      </div>
      <div class="table-operator" style="height: 30px;display: inline-block">
        <a-button @click="AddText" type="primary" style='background-color: #00D09D;height:35px;border: none'><a-icon type="plus" />添加图文</a-button>
      </div>
      <div class="table-operator" style="height: 30px;display: inline-block">
        <a-button @click="handleSystem" type="primary" style='background-color: #66C3FD;height:35px;border: none'><a-icon type="check-circle" />选择系统</a-button>
      </div>
      <div class="table-operator" style="height: 30px;position:absolute;right:50px;display: inline-block">
        <a-button @click=" " type="primary" style='background-color: #00BAD0;height:46px;border: none'>轮电机</a-button>
        <a-button @click=" " type="primary" style='background-color: #00BAD0;height:46px;border: none'>轮机电气</a-button>
        <a-button @click=" " type="primary" style='background-color: #00BAD0;height:46px;border: none'>轮机</a-button>
        <a-button @click=" " type="primary" style='background-color: #00BAD0;height:46px;border: none'>轮机电</a-button>
        <a-button @click=" " type="primary" style='background-color: #00BAD0;height:46px;border: none'>轮机电气</a-button>
        <a-button @click="turbine" type="primary" style='background-color: #00BAD0;height:46px;border: none'>轮机</a-button>
        <a-icon @click='' type="right" />
      </div>
    </div>
    <a-table style='padding-top: 20px;' :columns="columns" :data-source="data" :row-selection="rowSelection" >
        <span slot="action4" slot-scope="text, record">
        <a @click=" " style=" color:#0098F8" >预览</a>
            <a-divider type="vertical"/>
          <a @click=" " style="color:#FC8950">删除</a>
            <a-divider type="vertical" v-if="record.type=='图文'"/>
          <a @click="handleEdit" style="color: #00BAD0" v-if="record.type=='图文'">编辑</a>
      </span>
    </a-table>
    </div>
    <!-- <creat-modal></creat-modal> -->
    <div v-if="contentNum==1">
      <a-card :bordered="false">
        <div class="imaportBack">
          <div class="imaportants">
            <div style="width:10px; height:30px; background-color:#0098F8"></div>
            <div style="color:#666666;font-size:20px;margin-left: 10px;">做课-轮机电子学（已完成）-第一章节</div>
          </div>
          <div class="table-operator" style="">
            <a-button @click=" " type="primary" style='position: absolute;right: 0;height: 48px;top: 30px'><a-icon type="caret-right" />课程预览</a-button>
          </div>
        </div>
        <a-tabs type="card" @change="callback">
          <a-tab-pane key="1" tab="第一节">
            <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 6 }" @submit="determine" >
              <a-form-item :wrapper-col="{ span: 12, offset:3 }" >
                <a-form-item label="资源文件" style="">
                  <a-upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    list-type="picture"
                    :default-file-list="fileList"
                    @change="handleChangeImg"
                  >
                    <a-button> <a-icon type="upload" /> 选择文件 </a-button>
                  </a-upload>
                </a-form-item>
                <a-form-item label="应用类型">
                  <a-select v-decorator="['type', validatorRules.type]" placeholder="应用类型" style="width:300px">
                    <a-select-option v-for="(item,index) in typeData" :key="index.id" :value="item.type">{{item.type}}</a-select-option>
                  </a-select>
                </a-form-item>
                <a-form-item label="资源分类">
                  <a-input style="width:400px;height: 34px;" placeholder="请输入资源分类"
                    v-decorator.trim="['classification', validatorRules.classification]" 
                  />
                </a-form-item>
                <a-form-item label="是否共享" @change="onChange">
                  <a-radio-group name="radioGroup" v-decorator="['isshared', validatorRules.isshared]">
                    <a-radio :value="1">
                      是
                    </a-radio>
                    <a-radio :value="0">
                      否
                    </a-radio>
                  </a-radio-group>
                </a-form-item>
                <a-form-item label="注意事项" style="color:#999999;" :wrapper-col="{ span: 12, offset:0 }">
                  <div>上传须知</div>
                  <div style="width:400px">1.支持web网页大文件上传，最大不能超过2G</div>
                  <div>2.水系统目前支持以下的系统格式文档：</div>
                  <div style="width:400px">文档类：doc，docx，pdf，xls，xlsx，ppt，pptx，wps</div>
                  <div>图形/图像类：jpg，png，jpeg</div>
                  <div>音视频类：mp3，wav，wma</div>
                  <div>视频类：wmv，wma，asf，flv，mpg，avi，rm，rmvb，mp4，mp3</div>
                  <div>动画类：swf</div> 
                  <div>其他：zip，rar</div> 
                  <div style="width:410px;line-height: 20px;">需要转换的格式有文档类、视频类、动画类、其他的格式不需要转
                    换。如果平台没有启用转换功能，则视频只支持的文件扩展名只允
                    许map4格式并且编码格式必须是H.264</div> 
                </a-form-item>
                <a-button type="primary" @click="determine" html-type="submit" style="width:100px;height:40px">
                  确定
                </a-button>
                <a-button  class="buttonback"  @click="handReturn">
                  返回
                </a-button>
              </a-form-item>
            </a-form>
          </a-tab-pane>
          <a-tab-pane key="2" tab="第二节">
          </a-tab-pane>
        </a-tabs>
        
      </a-card>
    </div>
    <div v-if="contentNum==2">
      <a-card :bordered="false">
        <div class="imaportBack">
          <div class="imaportants">
            <div style="width:10px; height:30px; background-color:#0098F8"></div>
            <div style="color:#666666;font-size:20px;margin-left: 10px;">做课-轮机电子学（已完成）-第一章节</div>
          </div>
          <div class="table-operator" style="">
            <a-button @click=" " type="primary" style='position: absolute;right: 0;height: 48px;top: 30px'><a-icon type="caret-right" />课程预览</a-button>
          </div>
        </div>
        <a-tabs type="card" @change="callback">
          <a-tab-pane key="1" tab="第一节">
            <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 6 }" @submit="determine" >
              <a-form-item :wrapper-col="{ span: 12, offset:2 }" >
                <a-form-item label="标题">
                  <a-input style="width:400px;height: 34px;" placeholder="请输入标题"
                    v-decorator.trim="['titleName', validatorRules.titleName]" 
                  />
                </a-form-item>
                <a-form-item label="课程简介" style="margin-bottom: 200px;">
                  <vue-editor v-model="content" style='display: inline-block;position: absolute;width: 866px;z-index:10'></vue-editor>
                </a-form-item>
                <a-button type="primary" @click="determine" html-type="submit" style="width:100px;height:40px;margin-left: 120px;">
                  确定
                </a-button>
                <a-button  class="buttonback"  @click="handReturn">
                  返回
                </a-button>
              </a-form-item>
            </a-form>
          </a-tab-pane>
          <a-tab-pane key="2" tab="第二节">
          </a-tab-pane>
        </a-tabs>
      </a-card>
    </div>
    <!-- 编辑 -->
    <div v-if="contentNum==4">
      <a-card :bordered="false">
        <div class="imaportBack">
          <div class="imaportants">
            <div style="width:10px; height:30px; background-color:#0098F8"></div>
            <div style="color:#666666;font-size:20px;margin-left: 10px;">做课-轮机电子学（已完成）-第一章节</div>
          </div>
          <div class="table-operator" style="">
            <a-button @click=" " type="primary" style='position: absolute;right: 0;height: 48px;top: 30px'><a-icon type="caret-right" />课程预览</a-button>
          </div>
        </div>
        <a-tabs type="card" @change="callback">
          <a-tab-pane key="1" tab="第一节">
            <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 6 }" @submit="determine" >
              <a-form-item :wrapper-col="{ span: 12, offset:2 }" >
                <a-form-item label="标题">
                  <a-input style="width:400px;height: 34px;" placeholder="请输入标题"
                    v-decorator.trim="['titleName', validatorRules.titleName]" 
                  />
                </a-form-item>
                <a-form-item label="课程简介" style="margin-bottom: 200px;">
                  <vue-editor v-model="content" style='display: inline-block;position: absolute;width: 866px;z-index:10'></vue-editor>
                </a-form-item>
                <a-button type="primary" @click="determine" html-type="submit" style="width:100px;height:40px;margin-left: 120px;">
                  确定
                </a-button>
                <a-button  class="buttonback"  @click="handReturn">
                  返回
                </a-button>
              </a-form-item>
            </a-form>
          </a-tab-pane>
          <a-tab-pane key="2" tab="第二节">
          </a-tab-pane>
        </a-tabs>
      </a-card>
    </div>
    <!-- 轮机 -->
    <div v-if="contentNum==3">
      <a-card :bordered="false">
        <div class="imaportBack">
          <div class="imaportants">
            <div style="width:10px; height:30px; background-color:#0098F8"></div>
            <div style="color:#666666;font-size:20px;margin-left: 10px;">做课-轮机电子学（已完成）-第一章节</div>
          </div>
          <div class="table-operator" style="">
            <a-button @click=" " type="primary" style='position: absolute;right: 126px;height: 48px;top: 30px'><a-icon type="caret-right" />学习内容</a-button>
            <a-button @click=" " type="primary" style='position: absolute;right: 0;height: 48px;top: 30px'><a-icon type="caret-right" />课程预览</a-button>
          </div>
        </div>
        
        <a-tabs type="card" @change="callback">
          <a-tab-pane key="1" tab="第一节">
            <div v-if="oneNum==1">
              <div style='margin-top: 50px'>
                <div class="table-operator" style="height: 30px;display: inline-block">
                  <a-button @click="clickturbine" type="primary" style='background-color: #00BAD0;height:35px;border: none'><a-icon type="plus" />添加</a-button>
                </div>
                <div class="table-operator" style="height: 30px;right: 30px;position:absolute;display: inline-block">
                  <a-button @click=" " type="primary" style='background-color: #00BAD0;height:46px;border: none'>轮电机</a-button>
                  <a-button @click=" " type="primary" style='background-color: #00BAD0;height:46px;border: none'>轮机电气</a-button>
                  <a-button @click=" " type="primary" style='background-color: #00BAD0;height:46px;border: none'>轮机</a-button>
                  <a-button @click=" " type="primary" style='background-color: #00BAD0;height:46px;border: none'>轮机电</a-button>
                  <a-button @click=" " type="primary" style='background-color: #00BAD0;height:46px;border: none'>轮机电气</a-button>
                  <a-button @click="turbine" type="primary" style='background-color: #00BAD0;height:46px;border: none'>轮机</a-button>
                  <a-icon @click=' ' type="right" />
                </div>
              </div>
              <a-table
                style="height:500px;padding-top: 20px;"
                ref="table"
                size="middle"
                rowKey="id"
                :columns="columns1"
                :dataSource="projectData"
                :pagination="ipagination1"
                :loading="loading"
                :row-selection="rowSelection"
                >
              <span slot="titleaction" slot-scope="text, record">
                <a @click="clickedit" style="color:#0098F8">编辑</a>
                <a-divider type="vertical"/>
                <a style="color:#FC8950">删除</a>
              </span>
              </a-table>
            </div>
            <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 6 }" @submit="determine" v-if="oneNum==2">
            <a-form-item :wrapper-col="{ span: 12, offset:2 }" >
              <a-form-item label="标题">
                <a-input style="width:400px;height: 34px;" placeholder="请输入标题"
                  v-decorator.trim="['titleName', validatorRules.titleName]" 
                />
              </a-form-item>
              <a-form-item label="课程简介" style="margin-bottom: 200px;">
                <vue-editor v-model="content" style='display: inline-block;position: absolute;width: 866px;z-index:10'></vue-editor>
              </a-form-item>
              <a-button type="primary" @click="determine" html-type="submit" style="width:100px;height:40px;margin-left: 120px;">
                确定
              </a-button>
              <a-button  class="buttonback"  @click="clickreturn">
                返回
              </a-button>
            </a-form-item>
          </a-form>
          <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 6 }" @submit="determine" v-if="oneNum==3">
            <a-form-item :wrapper-col="{ span: 12, offset:2 }" >
              <a-form-item label="标题">
                <a-input style="width:400px;height: 34px;" placeholder="请输入标题"
                  v-decorator.trim="['titleName', validatorRules.titleName]" 
                />
              </a-form-item>
              <a-form-item label="课程简介" style="margin-bottom: 200px;">
                <vue-editor v-model="content" style='display: inline-block;position: absolute;width: 866px;z-index:10'></vue-editor>
              </a-form-item>
              <a-button type="primary" @click="determine" html-type="submit" style="width:100px;height:40px;margin-left: 120px;">
                确定
              </a-button>
              <a-button  class="buttonback"  @click="clickreturn">
                返回
              </a-button>
            </a-form-item>
          </a-form>
          </a-tab-pane>
          
          <a-tab-pane key="2" tab="第二节">
          </a-tab-pane>
        </a-tabs>

      </a-card>
    </div>
    
    <upload-modal ref="upForm" @ok="modalFormOk"></upload-modal>
    <selection-modal ref="modalForm" @ok="modalFormOk"></selection-modal>
  </a-card>
</template>

<script>
import UploadModal from './modules/UploadModal.vue';
import SelectionModal from './modules/SelectionModal.vue';
import { VueEditor } from 'vue2-editor';
const columns = [
  {
    title: '章节名称',
    dataIndex: 'name',
    width: '20%',
    key: 'name',
  },
  {
    title: '内容名称',
    dataIndex: 'cName',
    key: 'cName',
    width: '20%',
  },
  {
    title: '类型',
    dataIndex: 'type',
    width: '20%',
    key: 'type',
  },
  {
    title: '排序',
    dataIndex: 'sort',
    width: '20%',
    key: 'sort',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: '20%',
    key: 'operation',
    scopedSlots:{customRender:'action4'}
  },
];
const data = [
  {
    key: 1,
    name: '第一章',
    cName: '',
    type: '',
    sort: '',
    operation: '',
    children: [
      {
        key: 11,
        name: '第一节',
        cName: '教学系统',
        type: '资源',
        sort: '11',
        operation: '',
        children: [
          {
            key: 111,
            name: '',
            cName: '第一课',
            type: '图文',
            sort: '13',
            operation: '',
          }
        ],
      },
      {
        key: 12,
        name: '第二节',
        cName: '总清单',
        type: '资源',
        sort: '13',
        operation: '',
        children: [
          {
            key: 121,
            name: '',
            cName: '第一课',
            type: '图文',
            sort: '13',
            operation: '',
          }
        ],
      },
    ],
  },
  {
    key: 2,
    name: '第二章',
    cName: '',
    type: '',
    sort: '',
    operation: '',
    children: [
      {
        key: 21,
        name: '第一节',
        cName: '教学系统',
        type: '资源',
        sort: '11',
        operation: '',
        children: [
          {
            key: 211,
            name: '',
            cName: '第一课',
            type: '图文',
            sort: '13',
            operation: '',
          }
        ],
      },
      {
        key: 22,
        name: '第二节',
        cName: '总清单',
        type: '资源',
        sort: '13',
        operation: '',
        children: [
          {
            key: 221,
            name: '',
            cName: '第一课',
            type: '图文',
            sort: '13',
            operation: '',
          }
        ],
      },
    ],
  },
];
export default {
  name: 'zContent',
  components:{
    UploadModal,
    SelectionModal,
    VueEditor,
  },
  data() {

    return {
      value: 1,
      form:this.$form.createForm(this),
      fileList:[],
      columns,
      data,
      contentNum:0,
      oneNum:1,
      typeData:[{
        id:1,
        type:'电子教材'
      },{
        id:1,
        type:'实训指导书'
      },],
      projectData: [{
          id:'1',
          titlename:'轮机',
          status:'已完成',
        },{
          id:'2',
          titlename:'轮机1',
          status:'已完成',
        }],
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
      validatorRules:{
        type: { rules: [{ required: true, message: '请输入应用类型!' }] },
        classification:{ rules: [{ required: true, message: '请输入资源分类!' }] },
      },
      columns1:[
        {
          title: '标题',
          dataIndex: 'titlename',
          align: 'center',
        },
        {
          title: '发布状态',
          dataIndex: 'status',
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          width:200,
          scopedSlots: { customRender: 'titleaction' }
        }
      ]
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
    
  methods:{
    onChange(e) {
      console.log('radio checked', e.target.value);
    },
    callback(){

    },
    handleChangeImg(item){
      console.log(item)
      
    },
    //上传资源
    clickUpload(){
      this.$refs.upForm.addResources()
      this.$refs.upForm.title="请选择";
    },
    handleSystem(){
      this.$refs.modalForm.selectSys()
      this.$refs.modalForm.title="请选择";
    },
    clickturbine(){
      this.oneNum = 2
    },
    clickedit(){
      this.oneNum = 3
    },
    clickreturn(){
      this.oneNum = 1
    },
    //批量上传
    handlebatch(){
      this.contentNum = 1
    },
    //添加图文
    AddText(){
      this.contentNum = 2
    },
    //返回
    handReturn(){
      this.contentNum = 0
    },
    //轮机
    turbine(){
      this.contentNum = 3
      console.log(this.contentNum)
    },
    //编辑
    handleEdit(){
       this.contentNum = 4
    },
    //修改
      determine(e){
        console.log(this.ModifyData)
        // e.preventDefault();
        // this.form.validateFields((err, values) => {
        //   if (!err) {
        //     console.log('Received values of form: ', values);
        //     let formData = values
        //     formData.id = this.ModifyData.id
        //     console.log(formData)
        //     categoryedit(formData).then((res) => {
        //       if (res.code === 200) {
        //         console.log(123)
        //         this.$message.success("修改成功");
        //         this.baseNum=0
        //         this.geilist();
        //       }
        //     });
        //   }
        // });
      },
  },
}
</script>

<style scoped>

</style>