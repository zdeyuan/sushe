<template>
  <!-- 必须有一层父元素 -->
 <div  class='constbox'>
    <div class="pageContentBox">
      <div class="content-head">
        <div>
          <!-- 内容区 -->

          <a-button type="primary" icon="plus"  @click="infoupda()"> 
            添加 
          </a-button>

          <!-- 传入需要进行设置的年份参数 -->
          <a-button type="primary" style="margin-left: 10px;" @click="batchReport()">
            <!--  -->
            
            设为当前年份
          </a-button>

          <a-button type="primary" icon="reload" style="margin-left: 10px;" @click="noSelect"> 
            刷新 
          </a-button>
        </div>
      </div>
      <div>
        <!--  :row-selection="{type:'radio',onChange:onSelectChange,selectedRowKeys}" -->
        <a-table
          :row-selection="{  onChange: onSelectChange, selectedRowKeys }"
          :pagination="myPageData"
          :columns="columns"
          :data-source="data"
        >
          <span slot="action" slot-scope="text, record">
            <a class = "text-btn-color3" href="javascript:;" @click="infoClick(text, record)">编辑</a>
            <a-divider type="vertical" />
            <a href="javascript:;" @click="deleteRecord(record)" class="delete-href-sea text-btn-color4">删除</a>
          </span>
        </a-table>

        <a-modal v-model="addtable" title="添加" @ok="addok">
		 <template slot="footer">
            
            <a-button key="submit" type="primary" @click="addok()" class="btn"> 确定 </a-button>
            <a-button key="back" @click="addCancel" class="btn-cancle"> 返回 </a-button>
          </template>
          <tr class="tr-style-year">
                 <td class="td-div-left" style="width:130px">
                 <div class="font-style-year">年份代码</div>
              </td>
          <td colspan="2" class="double-year">
			  <DatePickByCN
			     v-model="xnfdm"
			        placeholder="请选择年份代码"
				  mode="year"
			      />
			  <!-- <a-date-picker
			    :open="open"
			    @openChange="openChange"
			    @panelChange="panelChange"
			    mode="year"
			    :value="xnfdm"
			    format="YYYY"
			    valueFormat="YYYY"
			  /> -->
               <!-- <a-input
                default-value=""
                v-model="xnfdm"
                oninput = "value=value.replace(/[^\d]/g,'')"
                /><font class="tip-year">必须为年份，如2015</font>
              --></td> 
            </tr>
           <tr class="tr-style-year">
              <td class="td-div-left" style="width:130px">
               <div class="font-style-year">当前年份</div>
              </td>
           <td colspan="2" class="double-year">
                <a-radio-group name="radioGroup" v-model="iscur" slot="addonAfter" type="setting">
                  <a-radio :value="1"> 是 </a-radio>
                  <a-radio :value="0"> 否 </a-radio>
                </a-radio-group>
              </td>
            </tr>
        </a-modal>
 <a-modal v-model="visibleDelete" title="删除页面" @ok="Delete">
           <template slot="footer">		
              <a-button key="back"  @click="Delete" class="btn"> 确定</a-button>
              <a-button key="submit" type="primary"  @click="closePop"  class="btn-cancle">取消</a-button>
              </template>

          <div class="delete-text">确认执行删除?</div>
        </a-modal>

        <a-modal v-model="visible" title="编辑" @ok="handleOkDelete" :width="1073">
                <template slot="footer">
				  <a-button key="submit" type="primary" @click="handleOkDelete()" class="btn"> 确定 </a-button>
            <a-button key="back" @click="handleCancel" class="btn-cancle"> 返回 </a-button>
          </template>
			 <tr class="tr-style-year">
                 <td class="td-div-left">
                 <div class="font-style-year">年份代码</div>
              </td>
          <td colspan="2" class="double-year">
			  <DatePickByCN   v-model="nfdm"   placeholder="请选择年份代码"  mode="year"/>
              </td>
            </tr>
       <tr class="tr-style-year">
              <td class="td-div-left">
               <div class="font-style-year">当前年份</div>
              </td>
           <td colspan="2" class="double-year">
                <a-radio-group name="radioGroup" v-model="iscur" slot="addonAfter" type="setting">
                  <a-radio :value="1"> 是 </a-radio>
                  <a-radio :value="0"> 否 </a-radio>
                </a-radio-group>
              </td>
            </tr>
        </a-modal>
      </div>
    </div>
  </div>
</template>
<script>
import { Icon } from 'ant-design-vue'

import { axios } from '@/utils/request'

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2390461_f6v2cx4wmzq.js',
})
const columns = [
  {
    title: '年份代码',
    dataIndex: 'code',
	defaultSortOrder: 'descend',
	sorter: (a, b) => a.code - b.code,
    // key:'name',
  },
  {
    title: '是否为当前年份',
    dataIndex: 'curYear',
    // key:'age'
  },
  {
    title: '操作',
    key: 'action',
    scopedSlots: { customRender: 'action' },
  },
]
export default {
  data() {
    return {
	  open: false,
      iscur: '',
      nfdm: '',
      xnfdm: '',
      data: [],
      columns,
      selectedRowKeys: [], // Check here to configure the default column  //1 。保存已经选中的key
      myPageData: {
        defaultPageSize: 10,//设置默认一页table里多少个条目
      //  total: "",
        //总数据显示
        showTotal: (total) => `共 ${total} 条数据`,
        //页面是否显示页数下拉框，是否可以改变 pageSize
        showSizeChanger: false,
        //设置每页显示多少数据
      //  pageSizeOptions: ['2', '5', '10', '20'],
        //onShowSizeChange:()=>{} 点击切换每页可以展示多少条的下拉框，会触发这个方法,可以理解为监听“xx条/页”下拉框的方法
        onShowSizeChange: (current, pageSize) => {
          // console.log(current, pageSize)//current当前页码
          this.pageSize = pageSize
  //         this.data = []
  // //for循环部分改成ajax
          let start = current * pageSize
          for (var i = start; i < start + pageSize; i++) {
            if (i < data.length) {
              this.data.push(data[i])
            }
          }
          // console.log(this.data)
          this.myPageData.total = data.length // data1.length;总数据数
        },
        //翻页下拉框部分
        // onChange: (current) => {
         
        //   this.pageSize = this.myPageData.pageSize//每页显示条数
           
          
        //   let start = current * this.myPageData.pageSize
        //   for (var i = start; i < start + this.myPageData.pageSize; i++) {
        //     if (i < data.length) {
        //       this.data.push(data[i])
        //     }
        //   }
          
        // },
     
      },
      ModalText: 'Content of the modal',

      confirmLoading: false,
      obj: {},
      //删除的弹窗
      visibleDelete: false,
      //编辑和添加的弹窗
      visible: false,
      addtable: false,
    }
  },
  mounted() {
    this.getFloorList() //调用显示方法
  },
  components: {
		IconFont,
	},
  methods: {
	  openChange(status) {
	    if (status) {
	      this.open = true;
	    } else {
	      this.open = false;
	    }
	  },
	  panelChange(value) {
	     this.xnfdm=value ? value.format('YYYY') : '';;
	     this.open = false;
	  },
      addCancel(){
      this.addtable = false;
    },
    handleCancel(){
      this.visible = false;
    },
    //删除的弹窗提示
    deleteRecord(obj) {
    //  if (this.selectedRowKeys.length <= 0 || this.selectedRowKeys.length > 1) {
      //   this.$message.warning(obj.key)
    //     return
    //   }
this.dys= obj.key
      this.visibleDelete = true
    },

    //删除的方法
    Delete() {
      this.deleteStu()
      this.visibleDelete = false
    },
     //删除取消
    closePop(){
     this.visibleDelete = false
     
       this.selectedRowKeys=[]
  },
    //删除的ajax
    deleteStu() {
    //  if (this.selectedRowKeys.length <= 0 || this.selectedRowKeys.length > 1) {
    //     this.$message.warning('没有选中或多选了')
    //     return
    //   }
      var id = this.dys
       //用于传递的全局变量
       var obj = {}
      for (var i = 0; i < this.data.length; i++) {
        if (id == this.data[i].key) {
          obj = this.data[i]
          break
        }
      }
     // alert('删除', obj.code)

      axios({
        url: 'enroll/curSeasonSet/del',
        method: 'post',
        params: obj,
      }).then((res) => {
        console.log('删除', res.code)
        if (res.code == 200) {
          this.getFloorList()
          this.$message.warning('删除成功')
        }else{
		  this.$message.warning(res.message)
		}
      })
      this.selectedRowKeys=[]
    },
    //编辑
    handleOkDelete() {
      this.bjnf()
      this.visible = false
      this.selectedRowKeys=[];

    },
 
    //添加
    addok() {
       if (this.xnfdm=="") {
        this.$message.warning('请填写年份代码')
        return;
      }
      this.addnf()
      this.addtable = false
    },

    addnf() {
      console.log('输入的', this.xnfdm)
      var cod ={}
      cod.code =this.xnfdm
      cod.iscur = this.iscur
      axios({
        url: 'enroll/curSeasonSet/add',
        method: 'post',
        params: cod
      }).then((res) => {
        console.log(res.code)
        if (res.code == 200) {
          this.getFloorList()
          this.$message.warning('添加成功')
          this.xnfdm = '';
        }else if (res.code == 500) {
          this.$message.warning('添加失败！请检查年份代码是否超过四位或者已存在')
        }
      })
    },

    onSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
      console.log('selectedRowKeys changed: ', selectedRowKeys)
    },
    allSelect() {
      console.log(this.data)
      for (var i = 0; i < this.data.length; i++) {
        this.selectedRowKeys.push(this.data[i].id)
      }
     
    },
    //刷新的方法
    noSelect() {
      this.selectedRowKeys = []
      this.getFloorList()
    },
    relSelect() {
      let newSelect = []
      for (let i = 0; i < this.data.length; i++) {
        if (this.selectedRowKeys.indexOf(i) < 0) {
          newSelect.push(i)
        }
      }
      this.selectedRowKeys = newSelect
    },

    //编辑的弹窗事件
    infoClick(obj) {
  
      // if (this.selectedRowKeys.length <= 0 || this.selectedRowKeys.length > 1) {
      //   this.$message.warning('没有选中或多选了')
      //   return
      // }
      console.log('当前编辑的是', obj.code + ',' + obj.curYear+','+obj.key)
      this.iscur = obj.curYear == '是' ? 1 : 0
      this.nfdm = obj.code
     // alert(obj.code + ',' + obj.curYear + ',' + this.iscur)
     
this.ys = obj.key
      this.visible = true
    },
    //添加的弹窗事件
    infoupda() {
      this.iscur = 1;
      this.addtable = true
    },
 //编辑的ajax
    bjnf() {
      console.log(this.selectedRowKeys)
      // if (this.selectedRowKeys.length <= 0) {
      //   alert('没有选中')
      //   return
      // }
    
      var obj = {}
      // for (var i = 0; i < this.data.length; i++) {
      //   if (id == this.data[i].key) {
      //     obj = this.data[i]
      //      console.log( obj,"匹配到的是")
      //     break
      //   }
      // }
      var lss = obj.curYear== '是' ? 1 : 0
    var ls =obj.code
    var a = -1
    var b = 0
      if( lss==this.iscur){
       a=1
     console.log( obj.curYear,"ww",this.iscur,"a",a)
   
   
      }
      if(ls==this.xnfdm){
b=1
     console.log( obj.curYear,"ww",this.iscur,"b",b)
      }
      if(a==b){
         alert('相同')
return
      }
      obj.curYear = this.iscur
      console.log("现在选到的编辑框是"+this.iscur)
      obj.code = this.nfdm
      // 取出临时数据，也就是源数据中的表示赋予
       // obj.curYear = obj.curYear == '是' ? 1 : 0
      obj.key=this.ys
      console.log('新的', obj.curYear)
      // console.log(params)
           console.log('新的', obj)
      axios({
        url: 'enroll/curSeasonSet/bianji',
        method: 'post',
        params: obj,
      }).then((res) => {
        console.log(res)
        console.log("业务",res.code)
        if (res.code == 200) {
          this.getFloorList()
          this.$message.warning('编辑成功')
        }else if (res.code == 500) {
          this.getFloorList()
          this.$message.warning('编辑失败')
        }
      })
      this.selectedRowKeys=[]
    },

//分页相关，表格事件器
    tableChange(current, pageSize) {
      console.log(current, pageSize)
      this.getFloorList()
      
    },
    //
    //显示的方法
    getFloorList() {
      //免验证码
      // let xqId = this.schoolId.length == 0 ? null : this.schoolId[0];
      // let sslId = this.buildId.length == 0 ? null : this.buildId[0];

      axios({
        url: 'enroll/curSeasonSet/cess',
        method: 'post',
        params: {
          //参数传递
        },
      })
        .then((res) => {
          this.data = []
          //  console.log(res.result)
          for (let refuel of res.result) {
            this.data.push({
              //解析后端发来的数据存入物件
              is_deleted: refuel.is_deleted,
              code: refuel.code,
              curYear: refuel.curYear == 1 ? '是' : '否',
              key: refuel.id,
            })
          }
        })
        .catch((err) => {
          this.$message.warning('获取信息失败')
        })
    },

    //设为当前年份的方法
    batchReport() {
      console.log(this.selectedRowKeys)
  if (this.selectedRowKeys.length <= 0 || this.selectedRowKeys.length > 1) {
        this.$message.warning('没有选中或多选了')
        return
      }
      var id = this.selectedRowKeys[0]
      //用于传递的全局变量
      var obj = {}
      for (var i = 0; i < this.data.length; i++) {
        if (id == this.data[i].key) {
          obj = this.data[i]
          break
        }
      }
      obj.curYear = obj.curYear == '是' ? 1 : 0
      this.$message.warning('设置成功!')
      // console.log(this.cdcs)
      axios({
        url: 'enroll/curSeasonSet/EditYear',
        method: 'post',
        params: obj,
        //  {
        //                 //参数传递this.cdcs.unfdm
        //                 obj
        // // 'curYear':this.cdcs.utype  this.cdcs.uid
        //               },
      }).then((res) => {
        console.log(res)
        if (res.code == 200) {
          this.getFloorList()
        }
      })

      console.log(obj)
      // console.log(params)
      this.selectedRowKeys=[]
    },
  },
}
</script>

<style>

/* .td-div-left{
   width: 259px;
height: 48px;
background: #F8F8F9;
border: 1px solid #dee2e6;
}

.tip-year{
  height: 19px;
font-size: 18px;
font-family: Microsoft YaHei;
font-weight: 700;
color: #666666;
line-height: 24px;
}

.double-year{
  width: 773px;
border: 1px solid #DEE2E6;
}

.tr-style-year{
border: 1px solid #DEE2E6;
}

.year-input{
  width: 237px;
height: 34px;
background: rgba(255, 255, 255, 0);
border: 1px solid rgba(217, 237, 244, 0.3);
border-radius: 3px;
}

.font-style-year{
  height: 18px;
font-size: 18px;
font-family: Microsoft YaHei;
font-weight: 700;
color: #666666;
line-height: 24px;
margin-top: 10px;
}

.delete-href-sea{
  color: #FC8950;
}

.add-year-btn{
  width: 88px;
height: 34px;
background: #00BAD0;
border-radius: 5px;
}

.add-year-btn,
.add-year-btn:hover,
.add-year-btn:active,
.add-year-btn:focus {
  color: white;
  background-color: #00BAD0;
}

.set-year-btn{
  width: 161px;
height: 34px;
background: #00BAD0;
border-radius: 5px;
}

.set-year-btn,
.set-year-btn:hover,
.set-year-btn:active,
.set-year-btn:focus {
  color: white;
  background-color: #00BAD0;
}

.refresh-year-btn{
  width: 88px;
height: 34px;
background: #66C3FD;
border-radius: 5px;
}

.refresh-year-btn,
.refresh-year-btn:hover,
.refresh-year-btn:active,
.refresh-year-btn:focus {
  color: white;
  background-color: #66C3FD;
}

.ant-table-thead > tr > th{
	 background-color: #66C3FD!important;
} */


</style>