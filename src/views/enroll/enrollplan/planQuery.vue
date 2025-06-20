<template>
  <div  class='constbox'>
    <div class="pageContentBox">

      <div class="content-head">
        <div>
<!--          <a-button type="primary" icon="plus" @click="showAdd()">
            
            添加
          </a-button>

          <a-button  type="danger"  icon="delete" style="margin-right:10px;" @click="clear">
            
            删除
          </a-button> -->

        
          <!-- 下拉框条件部分 -->
          <span class="head-span palnTitle">招生季：</span>
          <a-cascader class="condition" :options="quarter" placeholder="默认当前招生季" v-model="quarterId" />

          <span class="head-span">专业部：</span>
          <a-cascader
            class="condition"
            :options="faculty"
            placeholder="请选择"
            @change="facultyChange"
            v-model="facultyId"
          />

          <span class="head-span">专业：</span>
          <a-cascader class="condition" :options="specialty" placeholder="请选择" v-model="specialtyId" @click='cascaderChange1'/>
          <a-button  type="primary" icon="search" style="margin-left: 10px;" @click="search">
           
            搜索
          </a-button>

          <a-button  type="danger" style="margin-left: 10px;" @click="empty">
            
            清空
          </a-button>
		  <a-button  type="primary"  icon="reload" @click="refresh">
		    刷新
		  </a-button>
        </div>
      </div>
      <div>
        <a-table
          :columns="columns"
          :data-source="data"
          :row-selection="{ onChange: onSelectChange, selectedRowKeys }"
          :defaultCurrent="6"
          :pagination="myPageData"
		  :scroll="{ x: 1500, y: 300 }"
        >
          <span slot="action" slot-scope="text, record">
            <a class = "text-btn-color2" href="javascript:;" @click="infoClick(text, record)">查看</a>
          </span>
        </a-table>
        <a-modal v-model="visibleDelete" title="删除页面" @ok="Delete">
           <template slot="footer">		
              <a-button key="back"  @click="Delete" class="btn"> 确定</a-button>
              <a-button key="submit" type="primary"  @click="closePop"  class="btn-cancle">取消</a-button>
              </template>
          <div class="delete-text">确认执行删除?</div>
        </a-modal>
        <!--  -->
           <a-modal
          v-model="visible"
          :title="(mode === 'add' ? '添加' : '修改') + '招生季'"
          on-ok="handleOk"
          :width="1073"
        >
          <template slot="footer">
            <a-button key="back" @click="handleCancel" class="btn"> 确定 </a-button>
            <a-button key="submit" type="primary" @click="handleOk" class="btn-cancle"> 关闭 </a-button>
          </template>
          <table class="scanTable" style="text-align: left">
            <tr class="tr-style">
              <td class="td-div">
                <div class="font-style">招生专业：</div>
              </td>
              <td colspan="3" class="double">
                <a-cascader
                  class="planMng-select"
                  :options="city"
                  placeholder="请选择"
                  v-model="cityId"
                  @change="facultyChanges"
                />
                <!-- 专业的下拉框 -->
                <a-cascader class="planMng-select" :options="county" placeholder="请选择" v-model="countyId" @click='cascaderChange'/>
                <a-button type="primary" icon="search" style="margin-left: 10px;" @click="clearArea">
                  
                  清除
                </a-button>
              </td>
            </tr>

            <tr class="tr-style">
              <td class="td-div">
                <div class="font-style">招生年份：</div>
              </td>
              <td class="double">
                <a-cascader class="planMng-select" :options="zsnfs" v-model="rxnfs" placeholder="请选择" />
              </td>

              <td class="td-div">
                <div class="font-style">招生季：</div>
              </td>
              <td class="double">
                <a-cascader class="planMng-select" :options="zsjmz" placeholder="请选择" v-model="zsjmzId" />
              </td>
            </tr>

            <tr class="tr-style">
              <td class="td-div">
                <div class="font-style">班级数：</div>
              </td>
              <td colspan="3" class="double">
                <!-- 班级数的输入框 -->
                <a-input class="planMng-input" oninput="value=value.replace(/[^\d]/g,'')" v-model="bjrs"></a-input>
              </td>
            </tr>

            <tr class="tr-style">
              <td class="td-div">
                <div class="font-style">男生人数：</div>
              </td>
              <td class="double">
                <a-input class="planMng-input" oninput="value=value.replace(/[^\d]/g,'')" v-model="nsrs"></a-input>
              </td>
              <td class="td-div">
                <div class="font-style">女生人数：</div>
              </td>
              <td class="double">
                <a-input class="planMng-input" oninput="value=value.replace(/[^\d]/g,'')" v-model="vsrs"></a-input>
              </td>
            </tr>

            <tr class="tr-style">
              <td class="td-div">
                <div class="font-style">上传附件</div>
              </td>
              <td colspan="3" class="double">
                <a-input :disabled="true" class="planMng-input-long"></a-input>
                <!--  :headers="headers" -->
                <a-upload
                  name="file"
                  :multiple="true"
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  @change="handleChange"
                >
                
				    <!--    <a-button> <a-icon type="upload" /> 选择文件 </a-button> -->
				    <a-button type="primary" icon="plus" >
                  
                  添加
                  </a-button>
                </a-upload>
              </td>
            </tr>

            <tr class="tr-style">
              <td class="td-div">
                <div class="font-style-planMng">专业对考生的要求：</div>
              </td>
              <td colspan="3" class="double">
                <a-textarea  :rows="4" v-model="ksyq" class="planMng"/>
              </td>
            </tr>

            <tr class="tr-style">
              <td class="td-div">
                <div class="font-style">培养目标：</div>
              </td>
              <td colspan="3" class="double">
                <a-textarea  :rows="4" v-model="pymb" class="planMng" />
              </td>
            </tr>

            <tr class="tr-style">
              <td class="td-div">
                <div class="font-style-planMng">主要专业课程：</div>
              </td>
              <td colspan="3" class="double">
                <a-textarea  :rows="4" v-model="zykc" class="planMng"/>
              </td>
            </tr>

            <tr class="tr-style">
              <td class="td-div">
                <div class="font-style">办学条件：</div>
              </td>
              <td colspan="3" class="double">
                <a-textarea  :rows="4" v-model="bxtj" class="planMng"/>
              </td>
            </tr>
            <tr class="tr-style">
              <td class="td-div">
                <div class="font-style-planMng">毕业后去向及备注：</div>
              </td>
              <td colspan="3" class="double">
                <a-textarea  :rows="4" v-model="byqx" class="planMng"/>
              </td>
            </tr>
          </table>
        </a-modal>
      <!--  -->
          <!-- start  查看-弹窗 -->
  
		<!-- 查看界面 -->
 		<a-modal v-model="visibleck" title="查看招生计划管理" on-ok="handleClose" :width="1073">
		
      <template slot="footer" >
		  
        <a-button key="back" class="btn" v-print="'#printContent'">
          打印
        </a-button>
        <a-button key="submit" type="primary" :loading="loading" @click="handleClose"  class="btn">
          关闭
        </a-button>
		  
      </template>
	 	<div>
          <table class="scanTable " style="text-align:left" ref="print" id="printContent">
           
			
        <tr class="tr-style">
          <td class=" td-div">
            <div class="font-style ">所属专业部</div>
          </td>
          <td class="double" >
            <a-input read-only class=" input-style"  v-model="YXMC_Print"></a-input>
          </td>
          <td class=" td-div">
            <div class="font-style">所属专业</div>
          </td>
          <td class="double">
            <a-input read-only class=" input-style" v-model="ZYMC_Print"></a-input>
          </td>
        </tr>

           <tr class="tr-style">
          <td class=" td-div">
            <div class="font-style">招生年份</div>
          </td>
          <td class="double">
            <a-input read-only class=" input-style" v-model="ZSNF_Print"></a-input>
          </td>
          <td class=" td-div">
            <div class="font-style">学制</div>
          </td>
          <td class="double">
            <a-input read-only class=" input-style" v-model="XZMC_Print"></a-input>
          </td>
					
        </tr>
           <tr class="tr-style">
          <td class=" td-div">
            <div class="font-style">男生人数</div>
          </td>
          <td class="double">
            <a-input read-only class=" input-style" v-model="NANSRS_Print"></a-input>
          </td>
          <td class=" td-div">
            <div class="font-style">女生人数</div>
          </td>
          <td class="double">
            <a-input read-only class=" input-style" v-model="NVSRS_Print"></a-input>
          </td>
        </tr>
     
           <tr class="tr-style">
          <td class=" td-div">
            <div class="font-style">班级数</div>
          </td>
          <td class="double">
            <a-input read-only class=" input-style" v-model="BJS_Print"></a-input>
          </td>
          <td class=" td-div">
            <div class="font-style">下载附件</div>
          </td>
          <td class="double">
            <a-input ref="text" read-only class=" input-style" v-model="fileName" v-show="fileName=='未上传附件'"></a-input>
            <a :href="fileId_Print" class=" input-style" ref="a"  v-show="fileName!='未上传附件'">{{fileName}}</a>
          </td>
        </tr>

           <tr class="tr-style">
          <td class=" td-div">
            <div class="font-style">专业考生要求</div>
          </td>
          <td class="double">
            <a-input read-only class=" input-style" v-model="ZYYQ_Print"></a-input>
          </td>
          <td class=" td-div">
            <div class="font-style"></div>
          </td>
          <td class="double">
            <a-input read-only class=" input-style"></a-input>
          </td>
        </tr>

           <tr class="tr-style">
          <td class=" td-div">
            <div class="font-style">培养目标</div>
          </td>
          <td class="double">
            <a-input read-only class=" input-style" v-model="PYMB_Print"></a-input>
          </td>
         <td class=" td-div">
            <div class="font-style"></div>
          </td>
          <td class="double">
            <a-input read-only class=" input-style"></a-input>
          </td>
        </tr>

           <tr class="tr-style">
          <td class=" td-div">
            <div class="font-style">主要专业课程</div>
          </td>
          <td class="double">
            <a-input read-only class=" input-style" v-model="ZYZYKC_Print"></a-input>
          </td>
         <td class=" td-div">
            <div class="font-style"></div>
          </td>
          <td class="double">
            <a-input read-only class=" input-style"></a-input>
          </td>
        </tr>

   <tr class="tr-style">
          <td class=" td-div">
            <div class="font-style">办学条件</div>
          </td>
          <td class="double">
            <a-input read-only class=" input-style" v-model="BXTJ_Print"></a-input>
          </td>
         <td class=" td-div">
            <div class="font-style"></div>
          </td>
          <td class="double">
            <a-input read-only class=" input-style"></a-input>
          </td>
        </tr>

         <tr class="tr-style">
          <td class=" td-div">
            <div class="font-style">毕业后去向及备注</div>
          </td>
          <td class="double">
            <a-input read-only class=" input-style" v-model="remark_Print"></a-input>
          </td>
         <td class=" td-div">
            <div class="font-style"></div>
          </td>
          <td class="double">
            <a-input read-only class=" input-style"></a-input>
          </td>
        </tr>
     	
      </table>

      
	  </div>	
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
  // {
	// title: '所属专业部',
	// dataIndex: 'yxmc',
  // },
  {
    title: '所属专业',
    dataIndex: 'ZYMC',
    // key:'name',
	fixed: 'left',
	width: 150,
  },
  {
    title: '招生季年份',
    dataIndex: 'ZSNF',
	fixed: 'left',
	width: 150,
    // key:'age'
  },
  {
    title: '招生季',
    dataIndex: 'name',
	width: 150,
    // key:'age'
  },
  {
    title: '学制',
    dataIndex: 'XZMC',
	width: 150,
    // key:'age'
  },
  {
    title: '班级数',
    dataIndex: 'BJS',
    // key:'age'
	width: 150,
  },
  {
    title: '男生人数',
    dataIndex: 'NANSRS',
	width: 150,
    // key:'age'
  },
  {
    title: '女生人数',
    dataIndex: 'NVSRS',
	width: 150,
    // key:'age'
  },
  {
    title: '总人数',
    dataIndex: 'ZRS',
	width: 150,
    // key:'age'
  },
  {
    title: '发布时间',
    dataIndex: 'create_time',
	width: 250,
    // key:'age'
  },
  {
    title: '操作',
    key: 'action',
	fixed: 'right',
	width: 200,
    scopedSlots: { customRender: 'action' },
  },
]
export default {

  data() {
    return {
      a:0,
       b:null,
        c:null,
         d:null,
      bjrs:null,
      nsrs:null,
      vsrs:null,
      ksyq:'',
      pymb:'',
      zykc:'',
      bxtj:'',
      byqx:'',
      visible:false,
      visibleck:false,
				loading: false,
      //2021.4.21//
      	/* 按钮大小 */
				size: 'small',
      /* 下拉框数据 */
      //招生季的 下拉框数据
      quarter: [],
       zsnfs: [],
        rxnfs: null,
      quarterId: [],
      //招生年份
      zsjmz:[],
      zsjmzId:[],
      //专业部的下拉框数据
      faculty: [],
      facultyId: [],
      city: [],
      cityId: [],
      //专业下拉框的数据
      county: [],
        countyId: [],
      specialty: [],
      specialtyId: [],
           MquarterId:'',
      MfacultyId:'',
      MspecialtyId:'',
      //2021.4.21END//
      mode: 'add',
      // modebtn:'add',
      //新的招生季对象
      zsjh: {},
      data: [],
//打印的数据绑定
//班级数
BJS_Print:'',
//男生数
NANSRS_Print:'',
//女生数
NVSRS_Print:'',
//附件id
fileId_Print:'',
//附件名
fileName:'',
//专业对考生要求
ZYYQ_Print:'',
//培养目标
PYMB_Print:'',
//主要专业课程
ZYZYKC_Print:'',
//办学条件：
BXTJ_Print:'',
//毕业后去向及备注：
remark_Print:'',
      //院系id
YXMC_Print:'',
XZMC_Print:'',
//报名专业id
ZYMC_Print:'',
ZSNF_Print:'',
ZSJ_Print:'',

      //
      columns,
      selectedRowKeys: [], // Check here to configure the default column  //1 。保存已经选中的key

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
      },
      ModalText: 'Content of the modal',

      confirmLoading: false,
      //接收查到的所有招生季数据
      obj: {},
      //删除的弹窗
      visibleDelete: false,
    }
  },

  //
  //2014.4.21//
  mounted() {
    this.getFloorList() //调用显示方法
     this.getrxnf() //下拉框获取入学年份
    this.getFaculty() //下拉框获取专业部
    this.getQuarter() //下拉框获取招生季
    this.facultyChanges()
  },

  //关于全选与批量
  computed: {
    rowSelection() {
      const selectedRowKeys = this.selectedRowKeys //常量
      console.log('selectedRowKeys:', selectedRowKeys, this.selectedRowKeys)
      return {
        selectedRowKeys,
        onChange: this.onSelectChange,
      }
    },
  },
  //2021.4.21END//
  components: {
    IconFont,
  },
  //方法发这
  methods: {
    showAdd(){
    //添加的方法
    this.mode = 'add'
        this.visible = true
},
    //删除取消
    closePop(){
     this.visibleDelete = false
     
       this.selectedRowKeys=[]
  },
clear(){
  if (this.selectedRowKeys.length <= 0 ) {
       this.$message.warning('请选中要批量删除的数据')
        return
      }
    //批量删除的方法
    		
				let ids = '';
				
				for (let i = 0; i < this.selectedRowKeys.length; i++) {
					ids += this.selectedRowKeys[i];
					if (i != this.selectedRowKeys.length - 1) {
						ids += ',';
					}
				}

				axios({
					
					url: 'enroll/planMng/deleteZs',
					method: 'post',
					params: {
						 "ids": ids,
					}
				}).then(res => {

					this.$message.success(res.result);
					
					this.getFloorList();

				}).catch(err => {
					this.$message.warning("批量删除失败");
				})
this.selectedRowKeys=[]
},
empty(){
  //清空的方法
  this. quarterId=[],
this.  facultyId= [],
  this. specialtyId= []
},
refresh(){
    //刷新的方法
       this.selectedRowKeys = []
      this.getFloorList()
},
    //搜索的方法
    search(){
      
       console.log('招生计划下拉框的部分', this.quarterId)
        console.log('招生计划专业下拉框的部分', this.specialtyId)

    
          console.log('招生计划专业下拉框的部分', this.facultyId)

         this.getFloorList() //调用显示方法
    },
    //2021.4.21//
    //三个下拉框的数据解析和获取
    getQuarter() {
      axios({
        url: 'enroll/reportMng/getQuarter',
        method: 'post',
        params: {},
      })
        .then((res) => {
          console.log('quarter::' + res.result)
          for (let quarter of res.result) {
            this.quarter.push({
              value: quarter.name,
              label: quarter.name,
            })
          }
          //招生季
             for (let zsjmz of res.result) {
            this.zsjmz.push({
              value: zsjmz.id,
              label: zsjmz.name,
            })
          }
        })
        .catch((err) => {
          this.$message.warning('获取招生季失败')
        })
    },
    getFaculty() {
      axios({
        url: 'enroll/reportMng/getFaculty',
        method: 'post',
        params: {},
      })
        .then((res) => {
          //this.faculty.splice(0, this.faculty.length);
          for (let faculty of res.result) {
            this.faculty.push({
              value: faculty.id,
              label: faculty.yxmc,
            })
          }
            for (let city of res.result) {
            this.city.push({
              value: city.id,
              label: city.yxmc,
            })
          }
        })
        .catch((err) => {
          this.$message.warning('获取专业部失败')
        })
    },
    facultyChange(value) {
      console.log('facultyChange' + value)

      this.specialty = []
      this.specialtyId = []


      if (value.length == 0) {
        return
      }

      axios({
        url: 'enroll/reportMng/getSpecialty',
        method: 'post',
        params: {
          facultyId: this.facultyId[0],
        },
      })
        .then((res) => {
          this.specialty.splice(0, this.specialty.length)
          for (let specialty of res.result) {
            this.specialty.push({
              value: specialty.id,
              label: specialty.zymc,
            })
          }

        })
        .catch((err) => {
          this.$message.warning('获取专业失败')
        })
    },


        facultyChanges(value) {

       this.county = []
      this.countyId = []

      if (value.length == 0) {
        return
      }
 console.log('招生计划弹窗下拉框的部分', this.cityId)

      axios({
        url: 'enroll/reportMng/getSpecialty',
        method: 'post',
        params: {
          facultyId: this.cityId[0],
        },
      })
        .then((res) => {
          this.county.splice(0, this.county.length)
          for (let county of res.result) {
            this.county.push({
              value: county.id,
              label: county.zymc,
            })
          }
          
        })
        .catch((err) => {
          this.$message.warning('获取专业失败')
        })
    },
    //2021.4.21END//

 
    //添加界面的关闭按钮
    
    handleOk(e) {
     this.visible=false
    },
    //添加界面的确定按钮
    handleCancel(e) {
            console.log('mode是', this.mode)
      if(this.mode == 'add'){
     //调用添加的方法
      this.addnf()
       console.log('添加选的是')
      }else{
//this.bj()
      }
 
      this.visible = false
      
    },

    //添加的ajax
    addnf() {
      //院系id
this.zsjh.falId=this.cityId[0]
//报名专业id
this.zsjh.specId=this.countyId[0]
//招生年份
this.zsjh.ZSNF=this.rxnfs[0]
//招生季
this.zsjh.ZSJ=this.countyId[0]

//班级数
this.zsjh.BJS=this.bjrs
//男生数
this.zsjh.NANSRS=this.nsrs
//女生数
this.zsjh.NVSRS=this.vsrs
//总人数
this.zsjh.ZRS=this.vsrs+this.nsrs
//附件id
this.zsjh.fileId=1
//专业对考生要求
this.zsjh.ZYYQ=this.ksyq
//培养目标
this.zsjh.PYMB=this.pymb
//主要专业课程
this.zsjh.ZYZYKC=this.zykc
//办学条件：
this.zsjh.BXTJ=this.bxtj
//毕业后去向及备注：
this.zsjh.remark=this.byqx
console.log('新的z招生计划', this.zsjh)
  axios({
          url: 'enroll/planMng/ZsjhAdd',
          method: 'post',
          params: this.zsjh,
        }).then((res) => {
           console.log("业务",res.code)
          if (res.code == 200) {
            this.getFloorList()
          }else if (res.code == 500) {
          this.getFloorList()
        }
        })
    },

    //删除的弹窗提示
    deleteRecord(selectedRowKeys) {
      if (this.selectedRowKeys.length == 0) {
        this.$message.warning('请选择要删除的！')
        return
      }

      this.visibleDelete = true
    },
//弹窗的清空按钮的方法
clearArea(){
this.  cityId= [],
  this. countyId= []
},
    //删除的方法
    Delete() {
      this.deleteStu()
      this.visibleDelete = false
    },
    //删除的ajax
    deleteStu() {
      if (this.selectedRowKeys.length <= 0) {
        alert('没有选中')
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
      alert('删除', obj.code)

      axios({
           url: 'enroll/planMng/sczsjh',
           method: 'post',
           params: obj,
         }).then((res) => {
           console.log('删除', res.code)
           if (res.code == 200) {
           this.getFloorList()
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
 
    relSelect() {
      let newSelect = []
      for (let i = 0; i < this.data.length; i++) {
        if (this.selectedRowKeys.indexOf(i) < 0) {
          newSelect.push(i)
        }
      }
      this.selectedRowKeys = newSelect
    },

    //编辑查看的弹窗事件
    infoClick(zsjh) {
           this.visibleck = true;
      this.dys= zsjh.key
    
      this.XZMC_Print=zsjh.XZMC
//男生数
//班级数
this.BJS_Print=zsjh.BJS
//男生数
this.NANSRS_Print=zsjh.NANSRS
//女生数
this.NVSRS_Print=zsjh.NVSRS
//附件id
if (zsjh.fileId=="/未上传附件") {
  // this.fileId_Print = "#"
}else{
this.fileId_Print=zsjh.fileId
}


console.log(this.fileId_Print+"url")
//附件名
var urlStr = this.fileId_Print+""
const index = urlStr.lastIndexOf("/")
this.fileName = urlStr.substring(index+1)
//专业对考生要求
this.ZYYQ_Print=zsjh.ZYYQ
//培养目标
this.PYMB_Print=zsjh.PYMB
//主要专业课程
this.ZYZYKC_Print=zsjh.ZYZYKC
//办学条件：
this.BXTJ_Print=zsjh.BXTJ
//毕业后去向及备注：
this.remark_Print=zsjh.remark
      this.visibleck = true
     console.log('当前查看的是',zsjh)

       //将编辑对象的信息回显
      //院系id
   

this.YXMC_Print=zsjh.YXMC

//报名专业id
this.ZYMC_Print=zsjh.ZYMC

this.ZSNF_Print=zsjh.ZSNF
this.ZSJ_Print=zsjh.ZSJ

    },
    		handleClose(e) {
      			setTimeout(() => {
        			this.visibleck = false;
        			this.loading = false;
      			});
    		},
    //编辑的ajax
//     bj(){
   
//       var id = this.selectedRowKeys[0]
//         //用于传递的全局变量
//       var obj = {}
//       for (var i = 0; i < this.data.length; i++) {
//         if (id == this.data[i].key) {
//           obj = this.data[i]
//           break
//         }
           
//       }
     
// //院系id
// obj.falId=this.cityId[0]
// //报名专业id
//  obj.specId=this.countyId[0]
// //招生年份
//  obj.ZSNF=this.rxnfs[0]
// //招生季
// obj.ZSJ=this.countyId[0]

// //班级数
// obj.BJS=this.bjrs
// //男生数
// obj.NANSRS=this.nsrs
// //女生数
// obj.NVSRS=this.vsrs
// //总人数
// obj.ZRS=this.vsrs+this.nsrs
// //附件id
// obj.fileId=1
// //专业对考生要求
// obj.ZYYQ=this.ksyq
// //培养目标
// obj.PYMB=this.pymb
// //主要专业课程
// obj.ZYZYKC=this.zykc
// //办学条件：
// obj.BXTJ=this.bxtj
// //毕业后去向及备注：
// obj.remark=this.byqx
//   axios({
//           url: 'enroll/planMng/ZsjhSet',
//           method: 'post',
//           params: obj,
//         }).then((res) => {
//            console.log("业务",res.code)
//           if (res.code == 200) {
//             this.getFloorList()
//           }else if (res.code == 500) {
//           this.getFloorList()
//         }
//         })
//     },

    tableChange(current, pageSize) {
      console.log(current, pageSize)
      this.getFloorList()
    },
    //2021.4.23//
    getFloorList() {
console.log("this.quarterId")
      console.log(this.quarterId)
      axios({
        traditional: true,
        url: 'enroll/planMng/planMngShhow',
        method: 'post',
        params: {
          //参数传递
          name:  this.MquarterId =this.quarterId.length == 0 ? '' : this.quarterId[0],
               //
          YXMC: this.MfacultyId= this.facultyId.length == 0 ? '' :this.faculty.find(v=>v.value === this.facultyId[0]).label,
      
          ZYMC: this. MspecialtyId= this.specialtyId.length == 0 ? '' : this.specialty.find(v=>v.value === this.specialtyId[0]).label,
  
        },
      })
        .then((res) => {
          this.data = []
          // -------林彬辉，此处缺少返回数据为空的判断
          if (res.result=='招生计划显示失败') {
            this.$message.warning("当前招生季暂无招生计划！");
            return;
          }
          // ----------
         console.log('招生计划收到的部分', res)
          for (let refuel of res.result) {
            this.data.push({
              //解析后端发来的数据存入物件
              is_deleted: refuel.plan.is_deleted,
              ZYMC: refuel.plan.zymc,
              ZSNF: refuel.plan.zsnf,
              YXMC: refuel.plan.yxmc,
              name: refuel.plan.name,
              XZMC: refuel.plan.xzmc,
              BJS: refuel.plan.bjs,
              NANSRS: refuel.plan.nansrs,
              NVSRS: refuel.plan.nvsrs,
              ZRS: refuel.plan.nansrs+refuel.plan.nvsrs,
              create_time: refuel.plan.create_time,
              ZYYQ:refuel.plan.zyyq,
      PYMB:refuel.plan.pymb,
       ZYZYKC:refuel.plan.zyzykc,
       BXTJ:refuel.plan.bxtj,
       remark:refuel.plan.remark,
              key: refuel.plan.id,
              fileId:refuel.url
            })
          }
        })
        .catch((err) => {
          this.$message.warning('获取信息失败')
        })
    },
      cascaderChange(e){
				if(this.cityId.length < 1){
					this.$message.warning('请先选择专业部！')
				}
				console.log(e)
			},
      cascaderChange1(e){
				if(this.facultyId.length < 1){
					this.$message.warning('请先选择专业部！')
				}
				console.log(e)
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
          this.zsnfs = []
          //  console.log(res.result)
          for (let refuel of res.result) {
            //用谷歌下拉框主体调用
            this.zsnfs.push({
              //解析后端发来的数据存入物件
              value: refuel.code,
              label: refuel.code,
            })
          }
        })
        .catch((err) => {
          this.$message.warning('获取入学年份失败')
        })
    },

    //附件上传
 handleChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        this.$message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        this.$message.error(`${info.file.name} file upload failed.`);
      }
    },
 
  },
}
</script>

<style>
/* 添加按钮底色 */
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
.font-style-planMng {
  margin-left: 23px;
  width: 170px;
  height: 18px;
  font-size: 18px;
  font-family: Microsoft YaHei;
  font-weight: 700;
  color: #666666;
  line-height: 24px;
}
.font-style-queryPlan
{
  margin-left: 23px;
  width: 146px;
  height: 18px;
  font-size: 18px;
  font-family: Microsoft YaHei;
  font-weight: 700;
  color: #666666;
  line-height: 24px;
}
/* 表行高样式 */
.tr-style {
  height: 49px;
  border: 1px solid #dee2e6;
}
/* 行颜色 */

.input-styles {
  background-color: #ffffff;
  border: 0;
}

.td-div {
  width: 259px;
}


textarea.planMng{
width: 512px;
height: 62px;
background: rgba(255, 255, 255, 0);
border: 1px solid rgba(217, 237, 244, 0.3);
border-radius: 3px;
}

.planMng-input {
width: 203px;
height: 34px;
background: rgba(255, 255, 255, 0);
border: 1px solid rgba(217, 237, 244, 0.3);
border-radius: 3px;
}

a-cascader.planMng-select{
width: 203px;
height: 34px;
background: rgba(255, 255, 255, 0);
border: 1px solid rgba(217, 237, 244, 0.3);
border-radius: 3px;
}

.planMng-input-long{
width: 288px;
height: 34px;
background: rgba(255, 255, 255, 0);
border: 1px solid rgba(217, 237, 244, 0.3);
border-radius: 3px;
margin-right: 8px;
}

.palnTitle{
  margin-left: 10px;
}
</style>