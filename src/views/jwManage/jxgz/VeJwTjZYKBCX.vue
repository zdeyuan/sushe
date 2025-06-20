<template>
  <div class="schedule">

    <a-row>
      <a-col :span="24">
        <a-card :bordered="false" size="small" class="schedule-right boxshadow">
          <!-- 查询区域 -->
          <div class="table-page-search-wrapper">
            <div>
              <a-form layout="inline">
                <a-row :gutter="24">
                  <a-col :md="7" :sm="24">
                    <a-form-item label="专业部">
                      <j-select-zyb placeholder="请选择专业部" v-model="queryParam.falid" @input="zybChange"></j-select-zyb>
                    </a-form-item>
                  </a-col>

                  <a-col :md="7" :sm="24">
                    <a-form-item label="专业">
                      <j-select-zy-by-zyb ref="zyByZyb" placeholder="请选择专业" v-model="queryParam.specid" @input="zyChange"></j-select-zy-by-zyb>
                    </a-form-item>
                  </a-col>
                  <a-col :md="7" :sm="24">
                    <a-form-item label="学期">
                      <j-select-xueqi placeholder="请选择学期" v-model="queryParam.semid" ></j-select-xueqi>
                    </a-form-item>
                  </a-col>
                  <a-col  :md="4" :sm="24">
                    <span style="float: left; overflow: hidden;margin-left: 10px" class="table-page-search-submitButtons">
<!--                      <a-button type="primary"  icon="printer">打印</a-button>-->
						<a-button  @click="handleExportXls" type="primary" icon="upload" style="margin-right: 10px;">导出</a-button>
                      <!-- <edu-button type="4" icon="upload" @click="handleExportXls" title="导出" style="margin-bottom:0px"></edu-button> -->
                    </span>
                  </a-col>
                </a-row>
              </a-form>
            </div>
          </div>
          <!-- 查询区域-END -->


          <!--          课表区域-->
          <div class="schedule-main">
            <a-table :columns="columns" rowKey="id" :loading="!loading" :data-source="data2" bordered :scroll="{ x: 7300 }">

              <template v-for="col in ['1','2','3','4','5','6','7']" :slot="col" slot-scope="text,record,index">
                <div v-if="index==0" style="display: flex;justify-content: center;align-items: center;width: 100%">
                  <div v-for="n in 10" style="width: calc(100% / 10);padding: 0 5px;">第{{n}}节</div>
                </div>
                <div v-else style="display: flex;justify-content: center;align-items: center;width: 100%">
                  <div v-for="n in 10" style="width: calc(100% / 10);padding: 0 5px;">
                    <div class="table-td__inner" v-show="text[n]">
                      {{ (text[n] && text[n].kcmc) || '-' }}
                      <div class="table-td__label">
                        {{ (text[n] && text[n].jsmc) || '-' }} {{ (text[n] && text[n].jsxm) || '-' }}
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </a-table>
          </div>
        </a-card>
      </a-col>
    </a-row>

  </div>
</template>

<script>
  import JSelectXueqi from '@/components/kwglbiz/JSelectXueqi'
  import JSelectZyb from '@/components/kwglbiz/JSelectZyb'
  import JSelectZyByZyb from '@/components/kwglbiz/JSelectZyByZyb'
  import JSelectBanjiByZy from '@/components/kwglbiz/JSelectBanjiByZy'
  import ACol from 'ant-design-vue/es/grid/Col'
  import { getAction, deleteAction, putAction, postAction, httpAction } from '@/api/common/manage'
  import { downFile } from '@/api/common/manage'
  export default {
    name: 'manual',
    components: {
      ACol,
      JSelectZyb,
      JSelectZyByZyb,
      JSelectBanjiByZy,
      JSelectXueqi,
    },
    data() {
      const columns=[
        {
          title: '班级/课程/星期',
          dataIndex: 'left',
          fixed: 'left',
          align:'center',
          width: 300,
          scopedSlots: { customRender: 'left' },
        },
        {
          title: '星期一',
          dataIndex: '1',
          align:'center',
          width: 1000,
          scopedSlots: { customRender: '1' },
        },
        {
          title: '星期二',
          dataIndex: '2',
          align:'center',
          width: 1000,
          scopedSlots: { customRender: '2' },
        },
        {
          title: '星期三',
          dataIndex: '3',
          align:'center',
          width: 1000,
          scopedSlots: { customRender: '3' },
        },
        {
          title: '星期四',
          dataIndex: '4',
          align:'center',
          width: 1000,
          scopedSlots: { customRender: '4' },
        },
        {
          title: '星期五',
          dataIndex: '5',
          align:'center',
          width: 1000,
          scopedSlots: { customRender: '5' },
        },
        {
          title: '星期六',
          dataIndex: '6',
          align:'center',
          width: 1000,
          scopedSlots: { customRender: '6' },
        },
        {
          title: '星期日',
          dataIndex: '7',
          align:'center',
          width: 1000,
          scopedSlots: { customRender: '7' },
        },
      ]

      return {
        columns:columns,
        data:[
          {
            id:'111',
            left:'',
            '1':{

            },
            '2':{

            },
            '3':{

            },
            '4':{

            },
            '5':{

            },
            '6':{

            },
            '7':{

            }
          }
        ],
        data2:[],
        loading:true,
        queryParam:{
          falid:'',
          specid:'',
          semid:''
        },
        dateFormatList: ['YYYY-MM-DD', 'YYYY-MM-DD'],
        // 树搜索条件
        keyword: '',
        //树数据
        treeData: [],

        // 学期数据
        semesterData: [],
        // 学期信息
        semsterInfo: {},
        // 学期id
        semesterId: undefined,
        // 院系列表
        facultyList: [],
        // 专业列表
        specisltyList: [],
        //班级列表
        classesList: [],
        // 班级信息
        classInfo: {},
        // 排课id
        pkId: null,
        //
        // 星期表格
        weekData: [
          { id: 1, weekName: '星期一', course: {} },
          { id: 2, weekName: '星期二', course: {} },
          { id: 3, weekName: '星期三', course: {} },
          { id: 4, weekName: '星期四', course: {} },
          { id: 5, weekName: '星期五', course: {} },
          { id: 6, weekName: '星期六', course: {} },
          { id: 7, weekName: '星期日', course: {} },
        ],

        // 排课节数据
        scheduleNodeData: [],
        // 排课节上午数据
        scheduleNodeMorningData: [
          {section:'第一节',kssj:'08:00',jssj:'8:45'},
          {section:'第二节',kssj:'09:00',jssj:'9:45'},
          {section:'第三节',kssj:'10:00',jssj:'10:45'},
          {section:'第四节',kssj:'11:00',jssj:'11:45'},
        ],
        // 排课节下午数据
        scheduleNodeAfternoonData: [
          {section:'第五节',kssj:'14:00',jssj:'14:45'},
          {section:'第六节',kssj:'15:00',jssj:'15:45'},
          {section:'第七节',kssj:'16:00',jssj:'16:45'},
          {section:'第八节',kssj:'17:00',jssj:'17:45'},
        ],
        // 排课节晚自习数据
        scheduleNodeNightData: [
          {section:'第九节',kssj:'19:00',jssj:'19:45'},
          {section:'第十节',kssj:'20:00',jssj:'20:45'},
        ],

        // 排课课表数据
        scheduleData: [],

        // 排课课表明细数据
        scheduleDetail: [],

        // 弹框
        visible: false,

        // 是否是新增
        isAdd: false,

        url:{
          exportExcel: "/jxrw/kbcx/exportKbsExcel"
        }
      }
    },
    created() {

    },
    watch:{
      'queryParam.specid'(){
        this.bjkb()
      },
      'queryParam.semid'(){
        this.bjkb()
      }
    },
    computed: {
      scheduleTitle() {
        return this.semesterId ? `${this.classInfo.name || ''}（${this.semsterInfo.xqmc}）排课` : '暂无排课'
      },
    },
    methods: {
      // 导出
      handleExportXls(fileName){
        if(!fileName || typeof fileName != "string"){
          fileName = "专业课表"
        }
        let param = this.queryParam;
        console.log("导出参数", param)
        downFile(this.url.exportExcel, param).then((data)=>{
          if (!data) {
            this.$message.warning("文件下载失败")
            return
          }
          if (typeof window.navigator.msSaveBlob !== 'undefined') {
            window.navigator.msSaveBlob(new Blob([data],{type: 'application/vnd.ms-excel'}), fileName+'.xls')
          }else{
            let url = window.URL.createObjectURL(new Blob([data],{type: 'application/vnd.ms-excel'}))
            let link = document.createElement('a')
            link.style.display = 'none'
            link.href = url
            link.setAttribute('download', fileName+'.xls')
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link); //下载完成移除元素
            window.URL.revokeObjectURL(url); //释放掉blob对象
          }
        })
      },
      bjkb(){
        if(this.queryParam.specid==''||this.queryParam.semid==''){
          return
        }
        let _this=this;
        this.loading=false;
        var  ar=JSON.stringify(this.data);
        this.data2=JSON.parse(ar);
        let data={
          zyid:this.queryParam.specid,
          semid:this.queryParam.semid,
        }
        getAction('/jxrw/kbcx/qxkb',data).then(res=>{
          console.log(res);
          if(res.success){
            let arr=res.result.data;
            arr.forEach(ret=>{
              let json=JSON.parse(ar)[0];
              json.left=ret.xzbmc;
              json.id=ret.id;
              ret.kbs.forEach(a=>{
                json[a.week][a.section-1]=a;
              })
              _this.data2.push(json);
            })
            console.log(_this.data2);
          }
          _this.loading=true;
        })
      },
      zybChange(code) {
        if (this.$refs.zyByZyb != null) {
          this.$refs.zyByZyb.initDictData(code)
        }
      },
      zyChange(code){
        if (this.$refs.banjiByZy != null) {
          this.$refs.banjiByZy.initDictData(code)
        }
      },
    },
    created() {
      this.data2=this.data;
    }
  }
</script>
<style scoped lang="less">
  .tree-wrp {
    max-height: 937px;
    margin-top: 10px;
    overflow-y: auto;
  }
  .schedule {
    background-color: #fff;
    padding: 15px;
    .boxshadow {
      box-shadow: 0px 1px 8px 0px #e9edf6;
    }
    &-breadcrumb {
      padding-bottom: 15px;
    }
    &-left {
      &__search {
        display: flex;
        padding: 10px 0;
        .search-input {
          margin-right: 10px;
        }
      }
      &__form {
        display: flex;
        align-items: center;
        .form-label {
          padding-right: 10px;
        }
        .form-value {
          flex: 1;
        }
      }
    }
    &-right {
      margin-left: 15px;
    }
    &-main {
      &__title {
        font-size: 18px;
        text-align: center;
        padding: 15px 0;
      }
      &__table {
        text-align: center;
        .table-row {
          &__body {
            border-right: 1px solid #e6e6e6;
            border-bottom: 1px solid #e6e6e6;
          }
        }
        .table-th {
          background-color: #66c3fd;
          color: #fff;
          line-height: 30px;
        }

        .table-td {
          padding: 5px;
          min-height: 80px;
          border-left: 1px solid #e6e6e6;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          &.disabled{
            background-color: #f1f1f1;
            cursor:default
          }
          &__inner {
            width: 100%;
            height: 100%;
          }
          &__label {
            color: #fc620e;
            padding-top: 5px;
          }
        }
        .table-section {
          background-color: #f8f8f8;
          color: #666;

          &__time {
          }
        }
      }
    }
  }
</style>