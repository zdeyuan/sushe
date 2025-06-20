<template>
  <div  class='constbox'>
    <div class="pageContentBox">
      <div class="content-head">
        <div>
          <span class="head-span">模板名称：</span>
          <a-input style="width: 300px;" placeholder="请输入模板名称" v-model.trim="tempName" />
          <a-button  type="primary" icon="search" style="margin-left: 10px;" @click="search">
           
            搜索
          </a-button>

          <a-button  type="danger" style="margin-left: 10px;" @click="empty">
            
            清空
          </a-button>
        </div>
      </div>

      <div class="content-head">
        <div>
          <a-button type="primary" icon="plus" @click="showAddModel()">
            
            添加
          </a-button>

          <a-button  type="primary" icon="plus" style="margin-left: 10px;" @click="showModalAdmit">
            启用
          </a-button>
          <a-modal v-model="visibleReport" title="提示" @ok="handleOkStart" :width="478">
          <template slot="footer">		
           <a-button key="back"  @click="handleOkStart" class="btn">确定 </a-button>
           <a-button key="submit" type="primary"  @click="closeStart"  class="btn-cancle"> 取消 </a-button>
          </template>
            <div class="start-text">确认要启用吗?</div>
          </a-modal>

          <a-modal v-model="visibleDelete" title="提示" @ok="handleOkDelete" :width="478">
            <template slot="footer">		
           <a-button key="back"  @click="handleOkDelete" class="btn">
            确定
           </a-button>
           <a-button key="submit" type="primary"  @click="closeDel"  class="btn-cancle">
            取消
          </a-button>
          </template>
            <div class="delete-text">确认执行删除?</div>
          </a-modal>

          <a-button  type="primary"  icon="reload" style="margin-left: 10px;" @click="refresh">
            
            刷新
          </a-button>
        </div>
      </div>

      <!-- 添加弹窗start -->
      <a-modal v-model="addVisible" title="添加模板" on-ok="handleClose" :width="1073">
        <!-- 弹框按钮区 -->

        <template slot="footer">
          <a-button class="btn" @click="addModel"> 确定 </a-button>
          <a-button type="primary" @click="handleClose" class="btn-cancle"> 关闭 </a-button>
        </template>

        <!--未安装提示 -->
        <div v-html="lodopHtml" v-if="lodopHtml" class="noInstall-tip"></div>
        <table class="scanTable" style="text-align: left">
          <tr class="tr-style">
            <td class="td-div">
              <div class="font-style">模板名称</div>
            </td>
            <td class="temp-td-div">
              <a-input class="input-style-print" v-model.trim="entityObj.name"  />
            </td>
          </tr>

          <tr class="tr-style">
            <td class="td-div">
              <div class="font-style">模板大小</div>
            </td>
            <td class="temp-td-div">
              <a-input class="sizeInput-style" v-model.trim="entityObj.width" v-on:blur="widthCheck()" />
              <span class="tempfont-style">X</span>
              <a-input class="sizeInput-style" v-model.trim="entityObj.height" v-on:blur="heightCheck()" />
              <span class="tempfont-style">(单位：mm)</span>
            </td>
          </tr>

          <tr class="tr-style">
            <td class="td-div">
              <div class="font-style">打印方向</div>
            </td>
            <td class="temp-td-div">
              <a-select
                class="input-style-printSelect"
                :options="direction"
                placeholder="打印方向由操作者自行选择或按打印机缺省设置"
                @change="empty"
                v-model="entityObj.printType"
              />
            </td>
          </tr>

          <tr class="tr-style">
            <td colspan="2">
              <a-button  class="print-btn" @click="modelDesign"> 模板设计 </a-button>
              <a-button  class="print-btn" @click="modelPriview"> 打印预览 </a-button>
            </td>
          </tr>
          <tr class="tr-style">
            <td class="td-div">
              <div class="font-style">打印代码</div>
            </td>
            <td class="temp-td-div">
              <div class="code-div">支持数据：姓名、专业部、专业、层次、学制、身份证号，报名号，模板示例：%姓名%</div>

              <a-textarea class="code-text-style"  rows="5" read-only v-model="entityObj.code" id="S1"/> 
            </td>
          </tr>
          <tr class="tr-style">
            <td class="td-div">
              <div class="font-style">是否启用</div>
            </td>
            <td class="temp-td-div">
              <a-radio-group v-model="entityObj.status" @change="onChangestatus" >
                <a-radio :value="1" class="radio-style"> <span>启用</span> </a-radio>
                <a-radio :value="0" class="radio-style"><span> 禁用</span> </a-radio>
              </a-radio-group>
            </td>
          </tr>
        </table>
      </a-modal>
      <!-- end -->

      <!-- 编辑弹窗start -->
      <a-modal v-model="editVisible" title="编辑模板" on-ok="handleClose" :width="1073">
      <!-- 弹框按钮区 -->

        <template slot="footer">
          <a-button class="btn" @click="editModel"> 确定 </a-button>
          <a-button type="primary" @click="handleClose" class="btn-cancle"> 关闭 </a-button>
        </template>

        <!--未安装提示 -->
        <div v-html="lodopHtml" v-if="lodopHtml" class="noInstall-tip"></div>
        <table class="scanTable" style="text-align: left">
          <tr class="tr-style">
            <td class="td-div">
              <div class="font-style">模板名称</div>
            </td>
            <td class="temp-td-div">
              <a-input class="input-style-print" v-model.trim="entityObj.name"/>
            </td>
          </tr>

          <tr class="tr-style">
            <td class="td-div">
              <div class="font-style">模板大小</div>
            </td>
            <td class="temp-td-div">
              <a-input class="sizeInput-style" v-model.trim="entityObj.width" v-on:blur="widthCheck()" />
              <span class="tempfont-style">X</span>
              <a-input class="sizeInput-style" v-model.trim="entityObj.height" v-on:blur="heightCheck()" />
              <span class="tempfont-style">(单位：mm)</span>
            </td>
          </tr>

          <tr class="tr-style">
            <td class="td-div">
              <div class="font-style">打印方向</div>
            </td>
            <td class="temp-td-div">
              <a-select
                class="input-style-printSelect"
                :options="direction"
                placeholder="打印方向由操作者自行选择或按打印机缺省设置"
                @change="empty"
                v-model="entityObj.printType"
              />
            </td>
          </tr>

          <tr class="tr-style">
            <td colspan="2">
              <a-button  class="print-btn" @click="modelDesign"> 模板设计 </a-button>
              <a-button  class="print-btn" @click="modelPriview"> 打印预览 </a-button>
            </td>
          </tr>
          <tr class="tr-style">
            <td class="td-div">
              <div class="font-style">打印代码</div>
            </td>
            <td class="temp-td-div">
              <div class="code-div">支持数据：姓名、专业部、专业、层次、学制、身份证号，报名号，模板示例：%姓名%</div>

              <a-textarea class="code-text-style" read-only v-model="entityObj.code" id="S1"/>
            </td>
          </tr>
          <tr class="tr-style">
            <td class="td-div">
              <div class="font-style">是否启用</div>
            </td>
            <td class="temp-td-div">
              <a-radio-group v-model="entityObj.status" @change="onChangestatus" class="input-style-reply">
                <a-radio :value="1" class="radio-style"> <span>启用</span> </a-radio>
                <a-radio :value="0" class="radio-style"><span> 禁用</span> </a-radio>
              </a-radio-group>
            </td>
          </tr>
        </table>
      </a-modal>
      <!-- end -->

      <div class="content-head">
        <div></div>
      </div>
      <div>
        <!-- row-selection="rowSelection"  -->
        <a-table
          :columns="columns"
          :data-source="data"
          :row-selection="rowSelection"
          :defaultCurrent="6"
          :pagination="pagination"
          @change="tableChange"
        >
          <span slot="operator" slot-scope="text, record">
            <a  @click="showMsgEdit(record)">编辑</a>
            <a-divider type="vertical" />
            <a  @click="showMsgDelete(record)" class=" text-btn-color4">删除</a>
          </span>
        </a-table>
      </div>
    </div>
  </div>
</template>


<script>
import { Icon } from 'ant-design-vue'

import { axios } from '@/utils/request'

import { getLodop } from '@/utils/LodopFuncs'
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2390461_f6v2cx4wmzq.js',
})

const columns = [
  {
    title: '模板名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '是否启用',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
  },

  {
    title: '操作',
    dataIndex: 'operator',
    width: '20%',
    key: 'operator',
    scopedSlots: {
      customRender: 'operator',
    },
  },
]

let data = []

export default {
  data() {
    return {
      pagination: {
        current: 0,
        pageSize: 10,
        showSizeChanger: true,
        pageSizeOptions: ['6', '10', '20'],
        showTotal: (total, range) => {
          return '显示' + range[0] + '到' + range[1] + '条, 共' + total + '条记录'
        },
        showQuickJumper: true,
        total: 0,
      },
      //选中放入的数组
      selectedRowKeys: [],
      /* 页码 */
      currentPage: 1,
      pageSize: 10,

      /* 表格数据 */
      data,
      columns,
      /* 按钮大小 */
      size: 'small',
      /* 下拉框数据 */
      /* 添加-弹出框数据 */
      visibleDelete: false,
      loading: false,
      entityObj: {
        printTypeName: '',
        status: 1,
        code: `LODOP.PRINT_INITA(0,0,794,1077,"录取通知书");
LODOP.SET_PRINT_PAGESIZE(0,2101,2850,"");
LODOP.ADD_PRINT_TEXT(646,53,203,32,"%姓名%");
LODOP.SET_PRINT_STYLEA(0,"FontName","新宋体");
LODOP.SET_PRINT_STYLEA(0,"FontSize",16);
LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
LODOP.SET_PRINT_STYLEA(0,"Bold",1);
LODOP.ADD_PRINT_TEXT(725,97,157,32,"%专业部%");
LODOP.SET_PRINT_STYLEA(0,"FontName","新宋体");
LODOP.SET_PRINT_STYLEA(0,"FontSize",16);
LODOP.SET_PRINT_STYLEA(0,"Bold",1);
LODOP.ADD_PRINT_TEXT(725,275,196,32,"%专业%");
LODOP.SET_PRINT_STYLEA(0,"FontName","新宋体");
LODOP.SET_PRINT_STYLEA(0,"FontSize",16);
LODOP.SET_PRINT_STYLEA(0,"Bold",1);
LODOP.ADD_PRINT_TEXT(726,537,106,32,"%层次%");
LODOP.SET_PRINT_STYLEA(0,"FontName","新宋体");
LODOP.SET_PRINT_STYLEA(0,"FontSize",16);
LODOP.SET_PRINT_STYLEA(0,"Bold",1);
LODOP.ADD_PRINT_TEXT(765,155,103,32,"%学制%");
LODOP.SET_PRINT_STYLEA(0,"FontName","新宋体");
LODOP.SET_PRINT_STYLEA(0,"FontSize",16);
LODOP.SET_PRINT_STYLEA(0,"Bold",1);
LODOP.ADD_PRINT_TEXT(808,201,65,28,"2014");
LODOP.SET_PRINT_STYLEA(0,"FontName","新宋体");
LODOP.SET_PRINT_STYLEA(0,"FontSize",16);
LODOP.SET_PRINT_STYLEA(0,"Bold",1);
LODOP.ADD_PRINT_TEXT(808,282,36,28,"12");
LODOP.SET_PRINT_STYLEA(0,"FontName","新宋体");
LODOP.SET_PRINT_STYLEA(0,"FontSize",16);
LODOP.SET_PRINT_STYLEA(0,"Bold",1);
LODOP.ADD_PRINT_TEXT(809,334,36,28,"25");
LODOP.SET_PRINT_STYLEA(0,"FontName","新宋体");
LODOP.SET_PRINT_STYLEA(0,"FontSize",16);
LODOP.SET_PRINT_STYLEA(0,"Bold",1);
LODOP.ADD_PRINT_TEXT(807,407,63,28,"2014");
LODOP.SET_PRINT_STYLEA(0,"FontName","新宋体");
LODOP.SET_PRINT_STYLEA(0,"FontSize",16);
LODOP.SET_PRINT_STYLEA(0,"Bold",1);
LODOP.ADD_PRINT_TEXT(807,487,37,28,"12");
LODOP.SET_PRINT_STYLEA(0,"FontName","新宋体");
LODOP.SET_PRINT_STYLEA(0,"FontSize",16);
LODOP.SET_PRINT_STYLEA(0,"Bold",1);
LODOP.ADD_PRINT_TEXT(809,531,43,28,"26");
LODOP.SET_PRINT_STYLEA(0,"FontName","新宋体");
LODOP.SET_PRINT_STYLEA(0,"FontSize",16);
LODOP.SET_PRINT_STYLEA(0,"Bold",1);
LODOP.ADD_PRINT_BARCODE(404,505,176,45,"128Auto","%身份证号%");
LODOP.SET_PRINT_STYLEA(0,"ShowBarText",0);
LODOP.ADD_PRINT_TEXT(940,442,61,30,"2014");
LODOP.SET_PRINT_STYLEA(0,"FontName","新宋体");
LODOP.SET_PRINT_STYLEA(0,"FontSize",17);
LODOP.SET_PRINT_STYLEA(0,"Bold",1);
LODOP.ADD_PRINT_TEXT(941,535,37,27,"12");
LODOP.SET_PRINT_STYLEA(0,"FontName","新宋体");
LODOP.SET_PRINT_STYLEA(0,"FontSize",17);
LODOP.SET_PRINT_STYLEA(0,"Bold",1);
LODOP.ADD_PRINT_TEXT(940,592,38,30,"25");
LODOP.SET_PRINT_STYLEA(0,"FontName","新宋体");
LODOP.SET_PRINT_STYLEA(0,"FontSize",17);
LODOP.SET_PRINT_STYLEA(0,"Bold",1);
LODOP.ADD_PRINT_TEXT(390,495,184,20,"考 生 录 取 信 息 码");
LODOP.SET_PRINT_STYLEA(0,"FontName","文鼎习字体");
LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
LODOP.SET_PRINT_STYLEA(0,"Horient",3);
LODOP.ADD_PRINT_TEXT(448,501,170,22,"%录取编号%");
LODOP.SET_PRINT_STYLEA(0,"FontName","新宋体");
LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
LODOP.SET_PRINT_STYLEA(0,"LetterSpacing",8);`,
      },
      //插件对象
      LODOP: {},
      //弹窗对象
      //搜索条件
      curQuarter: 0,
      curFaculty: 0,
      curSpecialty: 0,
      condit: '',
      isCheck: 2,
      /* 关键词 */
      tempName: '',
      visibleReport: false,
      addVisible: false,
      editVisible: false,
      direction: [],
      tempDelID: '',
      searchName: '',
      //插件未装提示信息
      lodopHtml: '',
      tempstatus: '',
      temp:{},
      tempCode:'',
    }
  },
  mounted() {
    this.getModelList()
    this.getPrintType()
  },
  //关于全选与批量
  computed: {
    rowSelection() {
      const selectedRowKeys = this.selectedRowKeys //常量
      return {
        selectedRowKeys,
        onChange: this.onSelectChange,
      }
    },
  },
  components: {
    IconFont,
  },
  methods: {
    //宽度校验
    widthCheck() {
      let width = this.entityObj.width
      let numRule = /^[+-]?(0|([1-9]\d*))(\.\d{1,2})?$/
      if (!numRule.test(width) && width != undefined) {
        this.$message.warning('请输入正确的模板大小（至多两位小数）')
        this.entityObj.width = ''
      }
    },
    //长度校验
    heightCheck() {
      let height = this.entityObj.height
      let numRule = /^[+-]?(0|([1-9]\d*))(\.\d{1,2})?$/
      if (!numRule.test(height) && height != undefined) {
        this.$message.warning('请输入正确的模板大小（至多两位小数）')
        //清除成绩
        this.entityObj.height = ''
      }
    },
    //添加模板
    addModel() {
       this.entityObj.code="";
    this.entityObj.code=document.getElementById('S1').value;
      //表单校验
      let tname = this.entityObj.name
      let width = this.entityObj.width
      let height = this.entityObj.height
      let printID = this.entityObj.printType

      if (
        tname != '' &&
        tname != null &&
        width != '' &&
        width != null &&
        height != '' &&
        height != null &&
        printID != undefined
      ) {
        //获取打印方向
        for (let direction of this.direction) {
          if (direction.value == this.entityObj.printType) {
            this.entityObj.printTypeName = direction.label
          }
        }

        axios({
          url: 'enroll/TemplateMng/addTempModel',
          method: 'post',
          data: { entityObj: this.entityObj },
        })
          .then((res) => {
            if (res.code == 200) {
              this.$message.success(res.message)
              this.cancel()
              this.handleClose();
              this.getModelList();
              return
            }
            this.$message.warning(res.message)
          })
          .catch((err) => {
            this.$message.warning('添加失败！')
          })
      } else {
        this.$message.warning('请完善模板信息！')
      }
    },

    // getLodopHtml(){
    //    //拿到页面的dom节点。
    //   const dom = document.querySelectorAll("font[color='#FF00FF']");
    //   console.log(dom)
    //   if(dom.length){
    //     let str = '';
    //     Array.prototype.forEach.call(dom,v=> str += v.innerHTML);
    //     console.log(str)
    //     this.lodopHtml = str;
    //     console.log(this.lodopHtml,this)
    //   }

    // },

    onSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
      var id = this.selectedRowKeys[0]
      //用于传递的全局变量
      var obj = {}
      for (var i = 0; i < this.data.length; i++) {
        if (id == this.data[i].key) {
          obj = this.data[i]
          this.tempstatus = obj.status
          break
        }
      }
    },
    empty() {
      this.tempName = ''
    },

    search() {
      this.currentPage = 1
      this.searchName = this.tempName
      this.getModelList()
    },
    //显示启用弹窗的方法
    handleOkStart() {
      this.batchStart()
      this.visibleReport = false
    },
    //显示启用弹窗的方法
    closeStart() {
      this.visibleReport = false
    },
    //显示添加弹窗
    showAddModel() {
      this.addVisible = true
     
    },
    handleClose(e) {
      //数据清空
      this.cancel()
      this.addVisible = false
      this.editVisible = false
    },
    cancel() {
      this.entityObj.name = ''
      this.entityObj.width = ''
      this.entityObj.height = ''
      this.entityObj.status = 0
    },

    //启用
    batchStart() {
      //已启用

      if (this.tempstatus == '已启用') {
        this.$message.warning('已经是启用状态了')
        return
      }

      axios({
        url: 'enroll/TemplateMng/batchStart',
        method: 'post',
        params: {
          id: this.selectedRowKeys[0],
        },
      })
        .then((res) => {

          if (res.code == 200) {
            this.$message.success(res.message)
            //清空勾选项
            this.selectedRowKeys = []
            this.getModelList()
            return
          }
          this.$message.warning(res.message)
        })
        .catch((err) => {
          this.$message.warning('启用失败')
        })
    },
    //刷新的方法
    refresh() {
      this.selectedRowKeys = []
      this.getModelList()
    },

    showMsgDelete(a) {
      this.tempDelID = a.key
      this.visibleDelete = true
    },

    //展示编辑弹窗
    showMsgEdit(a) {

      axios({
        url: 'enroll/TemplateMng/infoModel',
        method: 'post',
        params: {
          id: a.key,
        },
      })
        .then((res) => {
          this.entityObj = res.result
          this.entityObj.printType=res.result.printType
          //打印代码修改
          this.entityObj.code = res.result.code.replace(/&quot;/g, '"');

        })
        .catch((err) => {
          this.$message.warning('获取模板信息失败')
        })
      this.editVisible = true
    },
    //编辑模板
    editModel() {
      //表单校验
      let tname = this.entityObj.name
      let width = this.entityObj.width
      let height = this.entityObj.height
      let printID = this.entityObj.printType
      let code = this.entityObj.code

      if (
        tname != '' &&
        tname != null &&
        width != '' &&
        width != null &&
        height != '' &&
        height != null &&
        printID != undefined
      ) {
        //获取打印方向
        for (let direction of this.direction) {
          if (direction.value == this.entityObj.printType) {
            this.entityObj.printTypeName = direction.label
          }
        }

 
        axios({
          url: 'enroll/TemplateMng/editTempModel',
          method: 'post',
          data: { entityObj: this.entityObj },
        })
          .then((res) => {
            if (res.code == 200) {
              this.$message.success(res.message)
              this.cancel();
              this.handleClose();
              this.getModelList();
              return
            }
            this.$message.warning(res.message)
            
          })
          .catch((err) => {
            this.$message.warning('编辑失败！')
          })
      } else {
        this.$message.warning('请完善模板信息！')
      }
    },

    //删除的方法
    handleOkDelete() {
      this.delModel()
      this.visibleDelete = false
    },
    //删除的方法
    closeDel() { 
      this.visibleDelete = false
    },
    //删除学生
    delModel() {
      axios({
        url: 'enroll/TemplateMng/delModel',
        method: 'post',
        params: {
          id: this.tempDelID,
        },
      })
        .then((res) => {
          this.$message.success(res.result)
          this.currentPage = 1
          this.getModelList()
        })
        .catch((err) => {
          this.$message.warning('删除模板失败')
        })
    },
    tableChange(pagination) {
      this.pagination.current = pagination.current
      this.pagination.pageSize = pagination.pageSize
      this.currentPage = pagination.current
      this.pageSize = pagination.pageSize

      this.getModelList()
    },
    showModalAdmit() {
      if (this.selectedRowKeys.length == 0) {
        this.$message.warning('请选择启用的模板！')
        return
      }else if(this.selectedRowKeys.length > 1){
        this.$message.warning('一次只能启用一个模板！')
        return
      }
      this.visibleReport = true
    },
    // 打印设计
    modelDesign() {
      //检查是否安装
      this.CreateFullBill()
      //  this.getLodopHtml();
      //有安装才可以运行

      if (this.LODOP) {
        //设计模板
        this.designModel()
      }
    },

    //打印预览
    modelPriview() {
      //检查是否安装
      this.CreateFullBill()
      //有安装才可以运行
      if (this.LODOP) {
        //预览模板
        this.previewModel()
      }
    },

    //判断是否安装插件
    CreateFullBill() {
      //全局变量赋值
      //  let LODOP=this.LODOP;
      try {
        var res = getLodop()
        if (res.LODOP) {
          let LODOP = res.LODOP
          this.LODOP = LODOP
        }

        if (res.errmsg) {
          this.lodopHtml = res.errmsg
        }
        if (LODOP && LODOP.VERSION) {
          if (LODOP.CVERSION)
            this.$message.success(
              '当前有WEB打印服务C-Lodop可用!\n C-Lodop版本:' + LODOP.CVERSION + '(内含Lodop' + LODOP.VERSION + ')'
            )
          else this.$message.success('本机已成功安装了Lodop控件！\n 版本号:' + LODOP.VERSION)
        }
      } catch (err) {
      }
    },
    //根据文本框代码执行打印、结束后并返回代码
    designModel() {
     
      // LODOP=getLodop();
      let LODOP = this.LODOP
      // eval(document.getElementById('S1').value)
      // if (LODOP.CVERSION)
      //   CLODOP.On_Return = function (TaskID, Value) {
      //     document.getElementById('S1').value = Value
      //   }
      // document.getElementById('S1').value= LODOP.PRINT_DESIGN()
  /**		
		eval(document.getElementById('S1').value); 
		if (LODOP.CVERSION) CLODOP.On_Return=function(TaskID,Value){document.getElementById('S1').value=Value;};
	    LODOP.PRINT_DESIGN();
     this.entityObj.code="";
    this.entityObj.code=document.getElementById('S1').value;
     */    
    	if (LODOP.CVERSION) {
        CLODOP.On_Return = (TaskID,value) =>{
          this.entityObj.code =value;
        } 
      }

      eval(this.entityObj.code); 
      LODOP.PRINT_DESIGN();
   
    },

    
    //用文本框执行打印预览p
    previewModel() {
      //MyData=document.getElementById('data01').value;	//打印前变量重读一下最新值
      let LODOP = this.LODOP
      eval(document.getElementById('S1').value)

      if (LODOP.CVERSION) CLODOP.On_Return = null
      LODOP.PREVIEW()
    },
    
    onChangestatus() {
    },
    //获取打印方向列表
    getPrintType() {
      axios({
        url: 'enroll/ApplyMsgMng/getSysDict',
        method: 'post',
        params: {
          dictCode: 'printType',
        },
      })
        .then((res) => {
          for (let PrintType of res.result) {
            this.direction.push({
              value: PrintType.id,
              label: PrintType.itemText,
            })
          }
        })
        .catch((err) => {
          this.$message.warning('获取打印方向列表失败')
        })
    },
    //获取列表
    getModelList() {
      let currentPage = this.currentPage
      let pageSize = this.pageSize
      axios({
        url: 'enroll/TemplateMng/tempList',
        method: 'post',
        params: {
          currentPage: currentPage,
          pageSize: pageSize,
          name: this.searchName,
        },
      })
        .then((res) => {
          data.splice(0, data.length)

          for (let stu of res.result.list) {
            let status = stu.status == 1 ? '已启用' : '未启用'
            data.push({
              key: stu.id,
              name: stu.name,
              createTime: stu.createTime,
              status: status,
            })
          }
          this.pagination.current = currentPage
          this.pagination.total = res.result.count
        })
        .catch((err) => {
          this.$message.warning('获取通知书模板列表失败')
        })
    },
  },
 
}
</script>
<style >
.tempAdd-button {
  width: 88px;
  height: 34px;
  background: #00bad0;
  border-radius: 5px;
  margin-right: 20px;
}

.tempAdd-button,
.tempAdd-button:hover,
.tempAdd-button:active,
.tempAdd-button:focus {
  color: white;
  background-color: #00bad0;
}

.temp-input {
  width: 203px;
  height: 34px;
  background: rgba(255, 255, 255, 0);
  border: 1px solid rgba(217, 237, 244);
  border-radius: 3px;
}

.start-button {
  width: 88px;
  height: 34px;
  background: #00d09d;
  border-radius: 5px;
}

.start-button,
.start-button:hover,
.start-button:active,
.start-button:focus {
  color: white;
  background-color: #00d09d;
}

.start-text {
  width: 153px;
  height: 19px;
  font-size: 18px;
  font-family: Microsoft YaHei;
  font-weight: 700;
  color: #666666;
  line-height: 24px;
  margin-top: 20px;
  margin-left: 160px;
}

.sizeInput-style {
  width: 150px;
  height: 34px;
  margin-left: 10px;
  margin-right: 10px;
  background: #ffffff;
  border: 1px solid rgb(217, 237, 244);
  border-radius: 3px;
  font-size: 18px;
}

.tempfont-style {
  height: 18px;
  font-size: 18px;
  font-family: Microsoft YaHei;
  font-weight: 700;
  color: #666666;
  line-height: 24px;
  margin-left: 0px;
}

.input-style-print {
  margin-left: 10px;
  width: 237px;
  height: 34px;
  background: #ffffff;
  border: 1px solid rgb(217, 237, 244);
  border-radius: 3px;
  font-size: 18px;
}

.input-style-printSelect {
  margin-left: 10px;
  width: 529px;
  height: 34px;
  background: rgba(255, 255, 255, 0);
  border: 1px solid rgba(217, 237, 244, 0.3);
  border-radius: 3px;
}

.print-btn {
  width: 119px;
  height: 40px;
  font-size: 18px;
  font-family: Microsoft YaHei;
  font-weight: 700;
  color: #ffffff;
  line-height: 24px;
  background: #0098f8;
  border-radius: 5px;
  margin: 10px auto 10px 22px;
}
.print-btn,
.print-btn:hover,
.print-btn:active,
.print-btn:focus {
  color: white;
  background-color: #0098f8;
}
.noInstall-tip {
  margin-top: -40px;
  font-size: 18px;
  font-family: Microsoft YaHei;
}
.code-div {
  width: 736px;
  height: 20px;
  font-size: 18px;
  font-family: Microsoft YaHei;
  font-weight: 700;
  color: #666666;
  line-height: 24px;
  margin-left: 10px;
}



.radio-style {
  font-size: 18px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #666666;
  margin-left: 10px;
}

.a-del-color {
  width: 37px;
  height: 20px;
  font-size: 18px;
  font-family: Adobe Heiti Std;
  font-weight: 400;
  text-decoration: underline;
  color: #fc8950;
}

.a-edit-color {
  width: 37px;
  height: 20px;
  font-size: 18px;
  font-family: Adobe Heiti Std;
  font-weight: 400;
  text-decoration: underline;
  color: #0098f8;
}

textarea.code-text-style {
  width: 584px;
  height: 231px;
  background: rgba(255, 255, 255, 0);
  border: 1px solid rgb(217, 237, 244);
  border-radius: 3px;
  margin-left: 10px;
  margin-top: 5px;
}

.code-text-style .ant-input{
  width: 584px;
  height: 231px;
}
</style>
