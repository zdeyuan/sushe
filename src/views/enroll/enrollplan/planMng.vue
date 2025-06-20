<template>
  <div  class='constbox'>
    <div class="pageContentBox">

      <div class="content-head">
        <div>
         
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
          <a-cascader class="condition" :options="specialty" placeholder="请选择" v-model="specialtyId" @click='cascaderChange'/>
          <a-button  type="primary" icon="search" @click="search">
            搜索
          </a-button>

          <a-button  type="danger" style="margin-left: 10px;" @click="empty">
            清空
          </a-button>
		  <div style="margin-top:10px;">
			  <a-button type="primary" icon="plus" style="margin-right:10px;" @click="showAdd()">
			    添加
			  </a-button>
			  
			  <a-button  type="danger"  icon="delete" style="margin-right:10px;" @click="clear">
			    删除
			  </a-button>
			  
			  <a-button  type="primary"  icon="reload" style="margin-right:10px;" @click="refresh">
			    刷新
			  </a-button>
		  </div>
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
            <a class = "text-btn-color3" href="javascript:;" @click="infoClick(text, record)">编辑</a>
            <a-divider type="vertical" />
            <a class = "text-btn-color4" href="javascript:;" @click="deleteRecord(record)">删除</a>
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
          :title="(mode === 'add' ? '添加' : '修改')+'招生计划'"
          on-ok="handleOk"
          :width="1073"
        >
          <template slot="footer">
            <a-button key="back" type="primary" @click="handleCancel" > 确定 </a-button>
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
                <a-cascader class="planMng-select" :options="county" placeholder="请选择" v-model="countyId" />
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
                <a-cascader class="planMng-select" :options="zsnfs" v-model="rxnfs" placeholder="请选择" @change="zsjChange" />
              </td>

              <td class="td-div">
                <div class="font-style">招生季：</div>
              </td>
              <td class="double">
                <a-cascader class="planMng-select" :options="zsjmz" placeholder="请选择" v-model="zsjmzId" @click="checkNf"/>
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
                <!-- <a-upload
                  name="file"
                  :multiple="true"
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  @change="handleChange"
                > -->
                
				    <!--    <a-button> <a-icon type="upload" /> 选择文件 </a-button> -->
				    <!-- <a-button type="primary" icon="plus" >
                  
                  添加
                  </a-button>
                </a-upload> -->
                <a-upload name="file" :multiple="true" :showUploadList='false' :beforeUpload='beforeUpload' @change='customRequest' :action='actionImgUrl' :headers="uploadHeaders" >
					    	  <a-button type="primary" icon="plus" >
                  
                  添加
                  </a-button>
					      </a-upload>
              </td>
            </tr>

            <tr class="tr-style">
              <td class="td-div">
                <div class="font-style">专业对考生的要求：</div>
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
                <div class="font-style">主要专业课程：</div>
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
                <div class="font-style">毕业后去向及备注：</div>
              </td>
              <td colspan="3" class="double">
                <a-textarea  :rows="4" v-model="byqx" class="planMng"/>
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
    title: '所属专业',
    dataIndex: 'ZYMC',
    // key:'name',
	fixed: 'left',
	width: 150,
  },
  {
    title: '招生年份',
    dataIndex: 'ZSNF',
    // key:'age'
	fixed: 'left',
	width: 150,
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
	width: 150,
    // key:'age'
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
      aa:null,
      bjrs: null,
      nsrs: null,
      vsrs: null,
      ksyq: '',
      pymb: '',
      zykc: '',
      bxtj: '',
      byqx: '',
      fileId:0,
      visible: false,
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
      zsjmz: [],
      zsjmzId: [],
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
      MquarterId: '',
      MfacultyId: '',
      MspecialtyId: '',
      //2021.4.21END//
      mode: 'add',
      // modebtn:'add',
      //新的招生季对象
      zsjh: {},
      data: [],
      //上传url
     actionImgUrl: 'http://localhost:9000/enroll/public/uploadFujian',
     //上传文件的id
     fileList: [],

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
   // this.facultyChanges()
  },

  //关于全选与批量
  computed: {
    uploadHeaders () {
      return {
        'Authorization': sessionStorage.getItem('token')
      }
    },
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
    showAdd() {
      //添加的方法
      this.mode = 'add'
      this.visible = true
	  this.nsrs = null
	  this.vsrs = null
	  this.ksyq = ''
	  this.pymb = ''
	  this.bjrs = null
	  this.zykc = ''
	  this.bxtj = ''
	  this.byqx = ''
    this.fileId = 0
	  this.clearArea()
    },

    clear() {
      //批量删除的方法
 if (this.selectedRowKeys.length <= 0 ) {
       this.$message.warning('请选中要批量删除的数据')
        return
      }
      let ids = ''

      for (let i = 0; i < this.selectedRowKeys.length; i++) {
        ids += this.selectedRowKeys[i]
        if (i != this.selectedRowKeys.length - 1) {
          ids += ','
        }
      }

      axios({
        url: 'enroll/planMng/deleteZs',
        method: 'post',
        params: {
          ids: ids,
        },
      })
        .then((res) => {
          this.$message.success(res.result)

          this.getFloorList()
        })
        .catch((err) => {
          this.$message.warning('批量删除失败')
        })
        this.selectedRowKeys=[]
    },
    empty() {
      //清空的方法
      ;(this.quarterId = []), (this.facultyId = []), (this.specialtyId = [])
    },
    refresh() {
      //刷新的方法
      this.selectedRowKeys = []
      this.getFloorList()
    },
    //搜索的方法
    search() {
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
          console.log('quarter::' + res.result[0].year)
          for (let quarter of res.result) {
            this.quarter.push({
              value: quarter.name,
              label: quarter.name,
            })
            console.log(quarter.year+"nianfen"+quarter)
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
    //招生季下拉框根据年份变化
    zsjChange(){
      console.log("zhaoshengjih ")
      console.log(this.zsjmz+"招生年份"+this.rxnfs[0])
      this.zsjmz = [];
      this.zsjmzId = [];
      axios({
        url: 'enroll/reportMng/getQuarter',
        method: 'post',
        params: {},
      })
        .then((res) => {
          //招生季
          for (let zsjmz of res.result) {
            if (this.rxnfs.length>0) {
              if (this.rxnfs[0]==zsjmz.year) {
               this.zsjmz.push({
              value: zsjmz.id,
              label: zsjmz.name,
            })
            }
            }else{
               this.zsjmz.push({
              value: zsjmz.id,
              label: zsjmz.name,
            })
            }
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
      this.visible = false
    },
    //添加界面的确定按钮
    handleCancel(e) {
      console.log('mode是', this.mode)
      if (this.mode == 'add') {
        //调用添加的方法
        this.addnf()
        console.log('添加选的是')
      } else {
        this.bj()
      }

      // this.visible = false
    },
    
    //添加的ajax
    addnf() {
      //院系id
      this.zsjh.falId = this.cityId.length == 0 ? 0:this.cityId[0]
      //报名专业id
      this.zsjh.specId = this.countyId.length == 0 ? 0:this.countyId[0]
      //招生年份
      this.zsjh.ZSNF = this.rxnfs.length == 0 ? 0:this.rxnfs[0]
      //招生季
      this.zsjh.ZSJ = this.zsjmzId.length == 0 ? 0:this.zsjmzId[0]

      //班级数
      this.zsjh.BJS = this.bjrs
      //男生数
      this.zsjh.NANSRS = this.nsrs
      //女生数
      this.zsjh.NVSRS = this.vsrs
      //总人数
      this.zsjh.ZRS = parseInt(this.vsrs) + parseInt(this.nsrs)
      //附件id
      this.zsjh.fileId = this.fileList.length == 0 ? 0:this.fileList[0]
      //专业对考生要求
      this.zsjh.ZYYQ = this.ksyq
      //培养目标
      this.zsjh.PYMB = this.pymb
      //主要专业课程
      this.zsjh.ZYZYKC = this.zykc
      //办学条件：
      this.zsjh.BXTJ = this.bxtj
      //毕业后去向及备注：
      this.zsjh.remark = this.byqx
      //判断是否为空
      if (this.zsjh.falId==0) {
        this.$message.warning("请选择院系")
        return;
      }
      if (this.zsjh.specId==0) {
        this.$message.warning("请选择专业")
        return;
      }
      if (this.zsjh.ZSNF==0) {
        this.$message.warning("请选择招生年份")
        return;
      }
      if (this.zsjh.ZSJ==0) {
        this.$message.warning("请选择招生季")
        return;
      }
      if (this.zsjh.BJS=="") {
        this.$message.warning("请填入班级数")
        return;
      }
      if (this.zsjh.NANSRS=="") {
        this.$message.warning("请填入男生人数")
        return;
      }
      if (this.zsjh.NVSRS=="") {
        this.$message.warning("请填入女生人数")
        return;
      }
      if (this.zsjh.ZYYQ=="") {
        this.$message.warning("请填入专业对考生要求")
        return;
      }
      if (this.zsjh.PYMB=="") {
        this.$message.warning("请填入培养目标")
        return;
      }
      if (this.zsjh.ZYZYKC=="") {
        this.$message.warning("请填入主要专业课程")
        return;
      }
      if (this.zsjh.BXTJ=="") {
        this.$message.warning("请填入办学条件")
        return;
      }
      if (this.zsjh.remark=="") {
        this.$message.warning("请填入毕业后去向及备注")
        return;
      }

      console.log('新的z招生计划', this.zsjh)
      axios({
        url: 'enroll/planMng/ZsjhAdd',
        method: 'post',
        params: this.zsjh,
      }).then((res) => {
        console.log('业务', res)
         if (res.code == 200) {
          this.getFloorList()
          this.$message.warning('添加成功')
          this.visible = false
        }else if (res.code == 500) {
          this.getFloorList()
             this.$message.warning(res.message)
        }
      })
    },

    //删除的弹窗提示
    deleteRecord(zsjh) {
      // if (this.selectedRowKeys.length == 0) {
      //   this.$message.warning('请选择要删除的！')
      //   return
      // }
this.ys=zsjh.key
      this.visibleDelete = true
    },
    //弹窗的清空按钮的方法
    clearArea() {
      (this.cityId = []), (this.countyId = []),
	  (this.rxnfs = []), (this.zsjmzId = [])
    },
    //删除的方法
    Delete() {
      this.deleteStu()
      this.visibleDelete = false
       console.log( '删除后',this.selectedRowKeys.length )
       this.selectedRowKeys=[]
    },
    //删除取消
    closePop(){
     this.visibleDelete = false
     
       this.selectedRowKeys=[]
  },
    //删除的ajax
    deleteStu() {
      // if (this.selectedRowKeys.length <= 0) {
      //   alert('没有选中')
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
      // alert('删除', obj.code)

      axios({
        url: 'enroll/planMng/sczsjh',
        method: 'post',
        params: obj,
      }).then((res) => {
        console.log('删除', res.code)
        if (res.code == 200) {
          this.getFloorList()
          this.$message.warning('删除成功')

        }else if (res.code == 500) {
          this.getFloorList()
             this.$message.warning('删除失败')
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

    //编辑的弹窗事件
    infoClick(zsjh) {
      // if (this.selectedRowKeys.length <= 0 || this.selectedRowKeys.length > 1) {
      //  this.$message.warning(zsjh.key)
      //   return
      // }
      
      this.dys= zsjh.key
console.log('选中后编辑时候的长度',this.selectedRowKeys.length)
      //模式切换
      this.mode = 'edit'
      //班级数
      this.bjrs = zsjh.BJS
      //男生数
      this.nsrs = zsjh.NANSRS
      //女生数
      this.vsrs = zsjh.NVSRS
      //附件id
      this.fileId = zsjh.fileId
      //专业对考生要求
      this.ksyq = zsjh.ZYYQ
      //培养目标
      this.pymb = zsjh.PYMB
      //主要专业课程
      this.zykc = zsjh.ZYZYKC
      //办学条件：
      this.bxtj = zsjh.BXTJ
      //毕业后去向及备注：
      this.byqx = zsjh.remark
      this.visible = true
      console.log('当前编辑的是', zsjh)

      //将编辑对象的信息回显
      //院系id

      console.log('下拉框测试', this.zsjmz)

      for (var i = 0; i < this.city.length; i++) {
        if (this.city[i].label == zsjh.YXMC) {
          this.cityId = []
          this.cityId.push(this.city[i].value)
          console.log('反向显示的a是：', this.city[i].value);
          this.aa= this.city[i].value
        console.log('反向显示获取的aa：', this.aa);
       //  this.facultyChangess();
       
      this.county = []
      this.countyId = []

      console.log('弹窗下获取的aa', this.aa)

      axios({
        url: 'enroll/reportMng/getSpecialty',
        method: 'post',
        params: {
          facultyId: this.aa,
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
     //数据回显
       for (var i = 0; i < this.county.length; i++) {
          console.log('反向显示e：', zsjh.ZYMC)
        if (this.county[i].label == zsjh.ZYMC) {
          console.log('反向显示的e是：', this.county[i].value)
           this.countyId.push(this.county[i].value)
          break
        }
      }
        })
        .catch((err) => {
          this.$message.warning('获取专业失败')
        })
    
          break
        }
      }

      //报名专业id

      // for (var i = 0; i < this.county.length; i++) {
      //   if (this.county[i].label == zsjh.ZYMC) {
      //     this.countyId.push(this.county[i].value)
      //     console.log('反向显示的e是：', this.county[i].value)
      //     //this.b= this.county[i].value

      //     // this.countyId=b
      //     break
      //   }
      // }
      console.log('反向显示的b是：', zsjh.ZSNF)
      //招生年份
      for (var i = 0; i < this.zsnfs.length; i++) {
        if (this.zsnfs[i].label == zsjh.ZSNF) {
          //this.c= this.zsnfs[i].value
          this.rxnfs = []
          this.rxnfs.push(this.zsnfs[i].value)
          console.log('反向显示的c是：', this.zsnfs[i].value)
          //this.rxnfs=c
          break
        }
      }
  console.log('反向显示的d')
      //招生季
      for (var i = 0; i < this.zsjmz.length; i++) {
        console.log('反向显示',zsjh.name)
        if (this.zsjmz[i].label == zsjh.name) {
            console.log('反向显示的d',this.zsjmz[i].label)
          //this.d= this.zsjmz[i].value
          this.zsjmzId = []
          this.zsjmzId.push(this.zsjmz[i].value)
  console.log('反向显示的d是：', this.zsjmz[i].value)
          //this.zsjmzId=d
          break
        }
      }
    },
    //编辑的ajax
    bj() {
      var id = this.dys
      //用于传递的全局变量
      var obj = {}
      for (var i = 0; i < this.data.length; i++) {
        if (id == this.data[i].key) {
          obj = this.data[i]
          
          break
        }
      }

      //院系id
      obj.falId = this.cityId.length == 0 ? 0:this.cityId[0]
      //报名专业id
      obj.specId = this.countyId.length == 0 ? 0:this.countyId[0]
      //招生年份
      obj.ZSNF = this.rxnfs.length == 0 ? 0:this.rxnfs[0]
      //招生季  
      obj.ZSJ = this.zsjmzId.length == 0 ? 0:this.zsjmzId[0]
      //班级数
      obj.BJS = this.bjrs
      //男生数
      obj.NANSRS = this.nsrs
      //女生数
      obj.NVSRS = this.vsrs
      //总人数parseInt强转int
      obj.ZRS = parseInt(this.vsrs) + parseInt(this.nsrs)
      //附件id
      obj.fileId = this.fileList.length == 0 ? this.fileId : this.fileList[0]
      //专业对考生要求
      obj.ZYYQ = this.ksyq
      //培养目标
      obj.PYMB = this.pymb
      //主要专业课程
      obj.ZYZYKC = this.zykc
      //办学条件：
      obj.BXTJ = this.bxtj
      //毕业后去向及备注：
      obj.remark = this.byqx
      //判断是否为空
      let isNull = 0;
      if (obj.falId==0) {
        this.$message.warning("请选择院系")
        this.getFloorList();
        return;
      }
      if (obj.specId==0) {
        this.$message.warning("请选择专业")
        this.getFloorList();
        return;
      }
      if (obj.ZSNF==0) {
        this.$message.warning("请选择招生年份")
        this.getFloorList();
        return;
      }
      if (obj.ZSJ==0) {
        this.$message.warning("请选择招生季")
        this.getFloorList();
        return;
      }
      if (obj.BJS=="") {
        this.$message.warning("请填入班级数")
        this.getFloorList();
        return;
      }
      if (obj.NANSRS=="") {
        this.$message.warning("请填入男生人数")
        this.getFloorList();
        return;
      }
      if (obj.NVSRS=="") {
        this.$message.warning("请填入女生人数")
        this.getFloorList();
        return;
      }
      if (obj.ZYYQ=="") {
        this.$message.warning("请填入专业对考生要求")
        this.getFloorList();
        return;
      }
      if (obj.PYMB=="") {
        this.$message.warning("请填入培养目标")
        this.getFloorList();
        return;
      }
      if (obj.ZYZYKC=="") {
        this.$message.warning("请填入主要专业课程")
        this.getFloorList();
        return;
      }
      if (obj.BXTJ=="") {
        this.$message.warning("请填入办学条件")
        this.getFloorList();
        return;
      }
      if (obj.remark=="") {
        this.$message.warning("请填入毕业后去向及备注")
        this.getFloorList();
        return;
      }
  
      axios({
        url: 'enroll/planMng/ZsjhSet',
        method: 'post',
        params: obj,
      }).then((res) => {
        console.log('业务', res.code)
         if (res.code == 200) {
          this.getFloorList()
          this.$message.warning('编辑成功')
          this.visible = false
        }else if (res.code == 500) {
          this.getFloorList()
             this.$message.warning(res.message)
        }
      })
    },

    tableChange(current, pageSize) {
      console.log(current, pageSize)
      this.getFloorList()
    },
    //2021.4.23//
    getFloorList() {
      console.log('this.quarterId')
      console.log(this.quarterId)
      axios({
        traditional: true,
        url: 'enroll/planMng/planMngShhow',
        method: 'post',
        params: {
          //参数传递
          name: (this.MquarterId = this.quarterId.length == 0 ? '' : this.quarterId[0]),
          //
          YXMC: (this.MfacultyId =
            this.facultyId.length == 0 ? '' : this.faculty.find((v) => v.value === this.facultyId[0]).label),

          ZYMC: (this.MspecialtyId =
            this.specialtyId.length == 0 ? '' : this.specialty.find((v) => v.value === this.specialtyId[0]).label),
        },
      })
        .then((res) => {
          this.data = []
           console.log('招生计划收到的部分', res.result)
          //  ----------------林彬辉，此处缺少返回数据为空时的判断
           if (res.result=='招生计划显示失败') {
             this.$message.warning("当前招生季暂无招生计划！");
             return;
           }
          //  -----------------
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
              ZRS: refuel.plan.nansrs + refuel.plan.nvsrs,
              create_time: refuel.plan.create_time,
              ZYYQ: refuel.plan.zyyq,
              PYMB: refuel.plan.pymb,
              ZYZYKC: refuel.plan.zyzykc,
              BXTJ: refuel.plan.bxtj,
              remark: refuel.plan.remark,
              key: refuel.plan.id,
            })
          }
		  this.data.sort(function(a,b){
		      return a.create_time < b.create_time ? 1 : -1
		  });
        })
        .catch((err) => {
          this.$message.warning('获取信息失败')
        })
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
    cascaderChange(e){
				if(this.facultyId.length < 1){
					this.$message.warning('请先选择专业部！')
				}
				console.log(e)
			},

    //附件上传
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
    // 上传前判断
    beforeUpload(file, fileList){
				if(this.fileList.length > 1){
					this.$message.warning('最多上传1张')
					return false
				}else{
					return true
				}
			},
    // 文件上传
    customRequest(data) {
				if(data.file.status == 'done'){
					if(data.file.response.code == 200){
					this.fileList.push(data.file.response.result)
					}else{
						this.$message.warning('上传错误，请稍后再试')
						return
					}
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

/* 表行高样式 */
.tr-style {
  height: 49px;
  border: 1px solid #dee2e6;
}

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