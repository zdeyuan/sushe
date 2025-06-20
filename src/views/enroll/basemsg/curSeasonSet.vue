<template>
<div  class='constbox'>
    <div class="pageContentBox">
      <div class="content-head">
        <div>
          <!-- 内容区 -->
          <!-- 传入需要进行设置的年份参数 -->
           <a-button type="primary" icon="plus" @click="batchReport()">
            <!--  -->
             设为当前招生季 </a-button>

         
          <a-button type="primary" style="margin-left: 10px;" @click="showModal"> 
            添加 
          </a-button>

         <a-button type="primary" icon="reload" style="margin-left: 10px;" @click="noSelect" > 
            刷新 
          </a-button>
        </div>
      </div>
      <div>
        <!-- type: 'radio', -->
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
      <a-modal v-model="visibleDelete" title="删除页面" @ok="Delete">
           <template slot="footer">		
              <a-button key="back"  @click="Delete" class="btn"> 确定</a-button>
              <a-button key="submit" type="primary"  @click="closePop"  class="btn-cancle">取消</a-button>
              </template>

          <div class="delete-text">确认执行删除?</div>
        </a-modal>

        <!-- 添加的弹窗和编辑的弹窗 -->
        <a-modal v-model="visible" :title=" (mode==='add'?'添加':'修改') +  '招生季'" on-ok="handleOk" :width="636">
          <template slot="footer">
         <a-button key="submit" type="primary" @click="handleOk()" class="btn"> 确定 </a-button>
            <a-button key="back" @click="handleCancel" class="btn-cancle"> 返回 </a-button>
          </template>
          <table class="scanTable" style="text-align: left">
            <tr class="tr-style">
              <td class="td-div-sea">
                <div class="font-style-sea">招生季名称：</div>
              </td>
              <td colspan="3" class="double">
                <a-input class="input-style-reply" v-model="zsjmc"></a-input>
              </td>
            </tr>

            <tr class="tr-style">
              <td class="td-div-sea">
                <div class="font-style-sea">入学年份：</div>
              </td>
              <td colspan="3" class="double">
                <a-select 
                :options="zsnf" v-model="rxnfs" placeholder="请选择" />
              </td>
            </tr>

            <tr class="tr-style">
              <td class="td-div-sea">
                <div class="font-style-sea">入学年月：</div>
              </td>
              <td colspan="3" class="double">
				  <DatePickByCN
					displayFormat="YYYY-MM-DD HH:mm:ss"
				        v-model="rq"
				        placeholder="请选择入学年月"
				      />
              </td>
            </tr>

            <tr class="tr-style">
              <td class="td-div-sea">
                <div class="font-style-sea">代码：</div>
              </td>
              <td colspan="3" class="double">
                <a-input class="input-style-reply" v-model="daima" oninput="value=value.replace(/[^\d]/g,'')"></a-input>
              </td>
            </tr>

            <tr class="tr-style">
              <td class="td-div-sea">
                <div class="font-style-sea">报名开始时间：</div>
              </td>
              <td colspan="3" class="double">
				 <DatePickByCN
				   v-model="startValue"
				   placeholder="请选择报名开始时间"
				  displayFormat="YYYY-MM-DD HH:mm:ss"
				 /> 
              <!--  <a-date-picker
                  v-model="startValue"
                  :disabled-date="disabledStartDate"
                  :show-time="{ format: 'HH:MM:SS' }"
                  format="YYYY-MM-DD HH:mm:ss"
                  placeholder="Start"
                  @openChange="handleStartOpenChange"
                /> -->
              </td>
            </tr>

            <tr class="tr-style">
              <td class="td-div-sea">
                <div class="font-style-sea">报名结束时间：</div>
              </td>
              <td colspan="3" class="double">
				  <DatePickByCN
				        v-model="endValue"
				        placeholder="请选择报名结束时间"
				  	  displayFormat="YYYY-MM-DD HH:mm:ss"
				      />
                <!-- <a-date-picker
                  v-model="endValue"
                  :disabled-date="disabledEndDate"
                    :show-time="{ format: 'HH:MM:SS' }"
                  format="YYYY-MM-DD HH:mm:ss"
                  placeholder="End"
                  :open="endOpen"
                  @openChange="handleEndOpenChange" -->
              </td>
            </tr>

            <tr class="tr-style">
              <td class="td-div">
                <div class="font-style-sea">当前招生季：</div>
              </td>
              <td colspan="3" class="double">
                <a-radio-group name="radioGroup" v-model="iscur" slot="addonAfter" type="setting">
                  <a-radio :value="1"> 是 </a-radio>
                  <a-radio :value="0"> 否 </a-radio>
                </a-radio-group>
              </td>
            </tr>
          </table>
        </a-modal>
        <!--  -->
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
    title: '年份',
    dataIndex: 'year',
    // key:'name',
  },
  {
    title: '招生季名称',
    dataIndex: 'name',
    // key:'age'
  },
  {
    title: '入学年月',
    dataIndex: 'RXNY',
    // key:'age'
  },
  {
    title: '代码',
    dataIndex: 'code',
    // key:'age'
  },
  {
    title: '报名开始时间',
    dataIndex: 'start_Time',
    // key:'age'
  },
  {
    title: '报名截止时间',
    dataIndex: 'end_Time',
    // key:'age'
  },
  {
    title: '当前招生季',
    dataIndex: 'isCur',
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

      mode:'add',
   // modebtn:'add',
      //输入框招生季名称
      zsjmc: null,
      rxnfs: null,
      daima: null,
      rq: null,
      // 报名时间开始和结束模块
      startValue: null,
      endValue: null,
      endOpen: false,
      // 添加的弹窗模块
      // loading: false,
      visible: false,
      // 编辑弹窗中的是否选项的对象
      iscur: null,
      nfdm: null,
      //新的招生季对象
      zsj: {},
      data: [],
      //c存放入学年份的数据
      zsnf: [],
      //
      columns,
      selectedRowKeys: [], // Check here to configure the default column  //1 。保存已经选中的key
      //     myPageData: {
      //       defaultPageSize: 5,
      //       total: 30,
      //       showTotal: (total) => `共 ${total} 条数据`,
      //       showSizeChanger: true,
      //       pageSizeOptions: ['2', '5', '10', '20'],
      //       onShowSizeChange: (current, pageSize) => {
      //         console.log(current, pageSize)//current当前页码
      //         this.pageSize = pageSize
      //         this.data = []
      // //for循环部分改成ajax
      //         let start = current * pageSize
      //         for (var i = start; i < start + pageSize; i++) {
      //           if (i < data1.length) {
      //             this.data.push(data1[i])
      //           }
      //         }
      //         console.log(this.data)
      //         this.myPageData.total = 100 // data1.length;总数据数
      //       },
      //       onChange: (current) => {
      //         console.log('onchange', current)
      //         console.log(current, this.myPageData.pageSize)
      //         this.pageSize = this.myPageData.pageSize
      //         this.data = []
      //         let start = current * this.myPageData.pageSize
      //         for (var i = start; i < start + this.myPageData.pageSize; i++) {
      //           if (i < data1.length) {
      //             this.data.push(data1[i])
      //           }
      //         }
      //         console.log(this.data)
      //         this.myPageData.total = 100 // data1.length;
      //       },
      myPageData: {
        defaultPageSize: 10, //设置默认一页table里多少个条目
        // total: '',
        //总数据显示
        showTotal: (total) => `共 ${total} 条数据`,
        //页面是否显示页数下拉框，是否可以改变 pageSize
        showSizeChanger: false,
        //设置每页显示多少数据
        pageSizeOptions: ['2', '5', '10', '20'],
        //onShowSizeChange:()=>{} 点击切换每页可以展示多少条的下拉框，会触发这个方法,可以理解为监听“xx条/页”下拉框的方法
        onShowSizeChange: (current, pageSize) => {
            
          // console.log(current, pageSize)//current当前页码
          this.pageSize = pageSize
          let start = current * pageSize
          for (var i = start; i < start + pageSize; i++) {
            if (i < data.length) {
              this.data.push(data[i])
            }
          }
          this.myPageData.total = data.length // data1.length;总数据数
        },
        // onChange: (current) => {
        //   this.pageSize = this.myPageData.pageSize //每页显示条数

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
      //接收查到的所有招生季数据
      obj: {},
      //删除的弹窗
      visibleDelete: false,
    }
  },
  // 报名时间开始和结束模块
  watch: {
    startValue(val) {
      console.log('startValue', val)
    },
    endValue(val) {
      console.log('endValue', val)
    },
  },
  //
  mounted() {
    this.getFloorList() //调用显示方法
    this.getrxnf() //下拉框获取入学年份
  },
  //方法发这
  //给图标命名的
    components: {
		IconFont,
	},
  methods: {
    //日期拉框
    addDate(date, dateString) {
      //v——model双向绑定，值通过rq来取值
      console.log('日期', this.rq)
    },

    //报名时间开始和结束模块
    disabledStartDate(startValue) {
      const endValue = this.endValue
      if (!startValue || !endValue) {
        return false
      }
      return startValue.valueOf() > endValue.valueOf()
    },
    disabledEndDate(endValue) {
      const startValue = this.startValue
      if (!endValue || !startValue) {
        return false
      }
      return startValue.valueOf() >= endValue.valueOf()
    },
    handleStartOpenChange(open) {
      if (!open) {
        this.endOpen = true
      }
    },
    handleEndOpenChange(open) {
      this.endOpen = open
    },

    //添加招生季的弹窗
    showModal() {
      // this.getrxnf();//下拉框获取入学年份

      this.visible = true //显示添加弹窗
this.mode = 'add'
//this.modebtn = 'add'
      console.log('下拉框数据')
    },
    //添加界面的确定按钮
    handleOk(e) {
      console.log('mode是', this.mode)
      if(this.mode == 'add'){
     //调用添加的方法
      this.addnf()
       console.log('添加选的是', this.zsj.isCur)
      }else{
this.bj()
      }
 
      this.visible = false
      
    },
    //  //编辑
    // handleOkDelete() {
   
    //   this.visible = false
    // },
    //编辑界面的确定按钮事件
    bj() {
     console.log(this.selectedRowKeys)
      // if (this.selectedRowKeys.length <= 0 || this.selectedRowKeys.length > 1) {
    
      //       this.$message.warning('没有选中')
      //   return
      // }
      var id = this.dys

      var obj = {}
      for (var i = 0; i < this.data.length; i++) {
        if (id == this.data[i].key) {
          obj = this.data[i]
          break
        }
      }
     // 招生季名称'
  obj.name  = this.zsjmc
     //入学年份
    obj.year =this.rxnfs 
      //转换字符串
      if (this.rq == '' || this.rq == undefined) {
        this.rq == ''
      } else {
        let d = new Date(this.rq)
        let youWant = 
        d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
        this.rq = youWant
        console.log('转换的', this.rq)
      }
     obj.RXNY = this.rq 
    obj.code  = this.daima 


 // 报名开始时间',

      //转换字符串
      if (this.startValue == '' || this.startValue == undefined) {
        this.startValue == ''
      } else {
        let d = new Date(this.startValue)
        let youWant = 
        d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
        this.startValue = youWant
        console.log('转换的', this.startValue)
      }
    obj.start_Time  =this.startValue  

      //报名截止时间',

      //转换字符串
      if (this.endValue == '' || this.endValue == undefined) {
        this.endValue == ''
      } else {
        let d = new Date(this.endValue)
        let youWant = 
        d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
        this.endValue = youWant

        console.log('转换的', this.endValue)
      }
     
     obj.end_Time   = this.endValue

    
 obj.isCur  = this.iscur   

    
      console.log('新的', obj)

        axios({
          url: 'enroll/cur/EDIT',
          method: 'post',
          params: obj,
        }).then((res) => {
           console.log("业务",res.code)
          if (res.code == 200) {
            this.getFloorList()
             this.$message.warning('编辑成功')
          }else if (res.code == 500) {
          this.getFloorList()
             this.$message.warning('编辑失败')
        }
        })
       console.log('你猜对了')
        this.selectedRowKeys=[]
    },
    //添加界面的关闭按钮
    handleCancel(e) {
      // console.log('车市', this.zsj.isCur)
       console.log('传到后端的对象', this.zsj)
      this.visible = false
    },
//删除取消
    closePop(){
     this.visibleDelete = false
     
       this.selectedRowKeys=[]
  },
    //添加
    addnf() {

      // 招生季名称'
      this.zsj.name = this.zsjmc
      console.log('输入的名称', this.zsjmc)
      //入学年份
      this.zsj.year = this.rxnfs
      console.log('选中的入学年份', this.rxnfs)

      //入学年月',

      //转换字符串
      if (this.rq == '' || this.rq == undefined) {
        this.rq == ''
      } else {
        let d = new Date(this.rq)
        let youWant = 
        d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
        this.rq = youWant
        console.log('转换的', this.rq)
      }
     
      this.zsj.RXNY = this.rq

      // 代码',
      this.zsj.code = this.daima
      console.log('输入的代码', this.daima)

      // 报名开始时间',

      //转换字符串
      if (this.startValue == '' || this.startValue == undefined) {
        this.startValue == ''
      } else {
        let d = new Date(this.startValue)
        let youWant = 
        d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
        this.startValue = youWant
        console.log('转换的', this.startValue)
      }
      this.zsj.start_Time = this.startValue

      //报名截止时间',

      //转换字符串
      if (this.endValue == '' || this.endValue == undefined) {
        this.endValue == ''
      } else {
        let d = new Date(this.endValue)
        let youWant = 
        d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
        this.endValue = youWant

        console.log('转换的', this.endValue)
      }
      this.zsj.end_Time = this.endValue


    //this.isCur == '是' ? 1 : 0
     this.zsj.isCur = this.iscur
      console.log('选的是', this.iscur)

      console.log('传到后端的对象', this.zsj)
      
      axios({
        url: 'enroll/cur/admissions',
        method: 'post',
        params: this.zsj,
      }).then((res) => {
        console.log(res.code)
        if (res.code == 200) {
          this.getFloorList()
        }
      })
    },

    //删除的弹窗提示
    deleteRecord(zsj) {
      //   if (this.selectedRowKeys.length <= 0 || this.selectedRowKeys.length > 1) {
      //   this.$message.warning('请选择要删除的！')
      //   return
      // }
//this.$message.warning(zsj.key)
this.ys=zsj.key
      this.visibleDelete = true
    },

    //删除的方法
    Delete() {
      this.deleteStu()
      this.visibleDelete = false
    },
    //删除的ajax
    deleteStu() {
      //   if (this.selectedRowKeys.length <= 0 || this.selectedRowKeys.length > 1) {
      
      //    this.$message.warning('没有选中')
      //   return
      // }
      var id = this.ys
      //用于传递的全局变量
      var obj = {}
      for (var i = 0; i < this.data.length; i++) {
        if (id == this.data[i].key) {
          obj = this.data[i]
          break
        }
      }
   //   alert('删除', obj.code)

      axios({
        url: 'enroll/cur/sczsj',
        method: 'post',
        params: obj,
      }).then((res) => {
        console.log('删除', res.code)
        if (res.code == 200) {
          this.getFloorList()
           this.$message.warning('删除成功')
        }
      })
         this.selectedRowKeys=[]
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
    infoClick(zsj) {
      //   if (this.selectedRowKeys.length <= 0 || this.selectedRowKeys.length > 1) {
      //   this.$message.warning('没有选中或多选了')
      //   return
      // }
      console.log('当前编辑的是', this.rxnfs , zsj.code + ',' + zsj.isCur
      + ',' + zsj.name+ ',' + zsj.year+ ',' + zsj.start_Time+ ',' + zsj.end_Time
      + ',' + zsj.key)
  this.mode = 'edit'
  //  this.modebtn = 'edit'
this.dys= zsj.key
     //将编辑对象的信息回显
       // 招生季名称'
    this.zsjmc= zsj.name 
     //入学年份
     this.rxnfs = zsj.year
      this.rq = zsj.RXNY
      this.daima = zsj.code
      this.startValue = zsj.start_Time
        this.endValue= zsj.end_Time 
    this.iscur = zsj.isCur == '是' ? 1 : 0


      this.visible = true
     
    },
 


    tableChange(current, pageSize) {
      console.log(current, pageSize)
      this.getFloorList()
    },

    getFloorList() {
      axios({
        url: 'enroll/cur/zsjxs',
        method: 'post',
        params: {
          //参数传递
        },
      })
        .then((res) => {
          this.data = []
          console.log('招生季', res.result)
          for (let refuel of res.result) {
            this.data.push({
              //解析后端发来的数据存入物件
              is_deleted: refuel.is_deleted,

              year: refuel.year,

              name: refuel.name,
              RXNY: refuel.rxny,
              code: refuel.code,
              start_Time: refuel.start_Time,
              end_Time: refuel.end_Time,

              isCur: refuel.isCur == 1 ? '是' : '否',
              key: refuel.id,
            })
          }
        })
        .catch((err) => {
          this.$message.warning('aa')
        })
    },

    //设为当前年份的方法
    batchReport() {
      console.log(this.selectedRowKeys)
       if (this.selectedRowKeys.length <= 0 || this.selectedRowKeys.length > 1) {
      this.$message.warning('没有选中或多选')
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
      obj.isCur = obj.isCur == '是' ? 1 : 0
      //alert(obj.code, obj.name)
      // console.log(this.cdcs)
      axios({
        url: 'enroll/cur/szdqzsj',
        method: 'post',
        params: obj,
      }).then((res) => {
        console.log(res.code)
        if (res.code == 200) {
            this.$message.warning('设置成功')
          this.getFloorList()
        }
      })

      console.log(obj)
      // console.log(params)
      this.selectedRowKeys=[]
    },

    //获取入学年份的方法
    getrxnf() {
      axios({
        url: 'enroll/cur/zsjnf',
        method: 'post',
        params: {
          //参数传递
        },
      })
        .then((res) => {
          this.zsnf = []
          //  console.log(res.result)
          for (let refuel of res.result) {
            //用谷歌下拉框主体调用
            this.zsnf.push({
              //解析后端发来的数据存入物件
              value: refuel.code,
              label: refuel.code,
            })
          }
        })
        .catch((err) => {
          this.$message.warning('aa')
        })
    },
  },
}
</script>
<style>
.tb {
  text-align: left;
}

/* 标题样式 */
.title-style {
  width: 76px;
  height: 19px;
  font-size: 18px;
  font-family: Microsoft YaHei;
  font-weight: 700;
  margin-left: 23px;
  color: #ffffff;
  line-height: 24px;
}
/* 字体样式1 */
.font-style-sea {
  width: 134px;
  height: 18px;
  color: #666666;
  line-height: 24px;
  text-align: right;
  margin-left: 100px;
}

/* 表行高样式 */
.tr-style {
  height: 49px;
  border: 1px solid #dee2e6;
}
/* 行颜色 */
/* .tr-color {
  height: 48px;
  background: #66c3fd;
} */
.delete-href-sea{
  color: #FC8950;
}



.input-style-select{
  width: 102px;
height: 15px;
background: rgba(255, 255, 255, 0);
border: 1px solid rgba(217, 237, 244, 0.3);
border-radius: 2px;
}

.td-div-sea {
  width: 209px;
  background: #F6F6F6;
border: 0px solid #E5E5E5;
}


.add-season-btn{
  width: 88px;
height: 34px;
background: #00BAD0;
border-radius: 5px;

}

.add-season-btn,
.add-season-btn:hover,
.add-season-btn:active,
.add-season-btn:focus {
  color: white;
  background-color: #00BAD0;
}

.set-season-btn{
  width: 161px;
height: 34px;
background: #00BAD0;
border-radius: 5px;
margin-right: 20px;
}

.set-season-btn,
.set-season-btn:hover,
.set-season-btn:active,
.set-season-btn:focus {
  color: white;
  background-color: #00BAD0;
}

.refresh-season-btn{
  width: 88px;
height: 34px;
background: #66C3FD;
border-radius: 5px;
}

.refresh-season-btn,
.refresh-season-btn:hover,
.refresh-season-btn:active,
.refresh-season-btn:focus {
  color: white;
  background-color: #66C3FD;
}

</style>