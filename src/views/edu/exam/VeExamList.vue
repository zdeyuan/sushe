<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
        </a-row>
      </a-form>
    </div>
    <!-- 查询区域-END -->

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>
      <a-button type="primary" icon="download" @click="handleExportXls('ve_exam')">导出</a-button>
      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        <a-button type="primary" icon="import">导入</a-button>
      </a-upload>
      <!-- 高级查询区域 -->
      <j-super-query :fieldList="superFieldList" ref="superQueryModal" @handleSuperQuery="handleSuperQuery"></j-super-query>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>
      </a-dropdown>
    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>

      <a-table
        ref="table"
        size="middle"
        :scroll="{x:true}"
        bordered
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        class="j-table-force-nowrap"
        @change="handleTableChange">

        <template slot="htmlSlot" slot-scope="text">
          <div v-html="text"></div>
        </template>
        <template slot="imgSlot" slot-scope="text">
          <span v-if="!text" style="font-size: 12px;font-style: italic;">无图片</span>
          <img v-else :src="getImgView(text)" height="25px" alt="" style="max-width:80px;font-size: 12px;font-style: italic;"/>
        </template>
        <template slot="fileSlot" slot-scope="text">
          <span v-if="!text" style="font-size: 12px;font-style: italic;">无文件</span>
          <a-button
            v-else
            :ghost="true"
            type="primary"
            icon="download"
            size="small"
            @click="downloadFile(text)">
            下载
          </a-button>
        </template>

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">编辑</a>

          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a @click="handleDetail(record)">详情</a>
              </a-menu-item>
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>

      </a-table>
    </div>

    <ve-exam-modal ref="modalForm" @ok="modalFormOk"></ve-exam-modal>
  </a-card>
</template>

<script>

  import '@/assets/less/TableExpand.less'
  import { mixinDevice } from '@/utils/mixin'
  import { EduListMixin } from '@/mixins/EduListMixin'
  import VeExamModal from './modules/VeExamModal'
  import JSuperQuery from '@/components/edu/JSuperQuery.vue'

  export default {
    name: 'VeExamList',
    mixins:[EduListMixin, mixinDevice],
    components: {
      VeExamModal,
      JSuperQuery,
    },
    data () {
      return {
        description: 've_exam管理页面',
        // 表头
        columns: [
          {
            title: '#',
            dataIndex: '',
            key:'rowIndex',
            width:60,
            align:"center",
            customRender:function (t,r,index) {
              return parseInt(index)+1;
            }
          },
          {
            title:'阅卷教师ID',
            align:"center",
            dataIndex: 'teacherids'
          },
          {
            title:'考试开始时间',
            align:"center",
            dataIndex: 'starttime'
          },
          {
            title:'考试结束时间',
            align:"center",
            dataIndex: 'endtime'
          },
          {
            title:'成绩公布时间',
            align:"center",
            dataIndex: 'scoretime'
          },
          {
            title:'试卷id',
            align:"center",
            dataIndex: 'paperid'
          },
          {
            title:'考试总用时，以分钟为单位，超出时间自动提交试卷',
            align:"center",
            dataIndex: 'totaltime'
          },
          {
            title:'成绩级别规则',
            align:"center",
            dataIndex: 'scoregrade'
          },
          {
            title:'是否启用：1=启用，0=禁用',
            align:"center",
            dataIndex: 'status'
          },
          {
            title:'考试模式 1 整卷考试  2 逐题考试',
            align:"center",
            dataIndex: 'mode'
          },
          {
            title:'考试名称',
            align:"center",
            dataIndex: 'name'
          },
          {
            title:'考试类型： 0为单元测试 1 为综合考试',
            align:"center",
            dataIndex: 'type'
          },
          {
            title:'题目是否随机顺序 0 为否 1为是',
            align:"center",
            dataIndex: 'israndquestion'
          },
          {
            title:'最多考试次数,0为不限制',
            align:"center",
            dataIndex: 'maxtimes'
          },
          {
            title:'考试时选择题是否随机顺序 0 为否 1为是',
            align:"center",
            dataIndex: 'israndoption'
          },
          {
            title:'考生查看试卷保护状态，1=完全开放，2=保护答案，3=完全保护',
            align:"center",
            dataIndex: 'isviewanswer'
          },
          {
            title:'已参加考试总人数',
            align:"center",
            dataIndex: 'usercount'
          },
          {
            title:'是否自动发布成绩（0否1是）',
            align:"center",
            dataIndex: 'issuescore'
          },
          {
            title:'终端',
            align:"center",
            dataIndex: 'terminalid'
          },
          {
            title:'考试关联模型，exam=课程考试，homework=课程作业',
            align:"center",
            dataIndex: 'rowmodel'
          },
          {
            title:'教学课程ID',
            align:"center",
            dataIndex: 'tcid'
          },
          {
            title:'多租户id',
            align:"center",
            dataIndex: 'placeId'
          },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            fixed:"right",
            width:147,
            scopedSlots: { customRender: 'action' }
          }
        ],
        url: {
          list: "/exam/veExam/list",
          delete: "/exam/veExam/delete",
          deleteBatch: "/exam/veExam/deleteBatch",
          exportXlsUrl: "/exam/veExam/exportXls",
          importExcelUrl: "org.edu.module.exam/veExam/importExcel",
          
        },
        dictOptions:{},
        superFieldList:[],
      }
    },
    created() {
    this.getSuperFieldList();
    },
    computed: {
      importExcelUrl: function(){
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      },
    },
    methods: {
      initDictConfig(){
      },
      getSuperFieldList(){
        let fieldList=[];
        fieldList.push({type:'string',value:'teacherids',text:'阅卷教师ID'})
        fieldList.push({type:'int',value:'starttime',text:'考试开始时间'})
        fieldList.push({type:'int',value:'endtime',text:'考试结束时间'})
        fieldList.push({type:'int',value:'scoretime',text:'成绩公布时间'})
        fieldList.push({type:'int',value:'paperid',text:'试卷id'})
        fieldList.push({type:'int',value:'totaltime',text:'考试总用时，以分钟为单位，超出时间自动提交试卷'})
        fieldList.push({type:'string',value:'scoregrade',text:'成绩级别规则'})
        fieldList.push({type:'int',value:'status',text:'是否启用：1=启用，0=禁用'})
        fieldList.push({type:'int',value:'mode',text:'考试模式 1 整卷考试  2 逐题考试'})
        fieldList.push({type:'string',value:'name',text:'考试名称'})
        fieldList.push({type:'int',value:'type',text:'考试类型： 0为单元测试 1 为综合考试'})
        fieldList.push({type:'int',value:'israndquestion',text:'题目是否随机顺序 0 为否 1为是'})
        fieldList.push({type:'int',value:'maxtimes',text:'最多考试次数,0为不限制'})
        fieldList.push({type:'int',value:'israndoption',text:'考试时选择题是否随机顺序 0 为否 1为是'})
        fieldList.push({type:'int',value:'isviewanswer',text:'考生查看试卷保护状态，1=完全开放，2=保护答案，3=完全保护'})
        fieldList.push({type:'int',value:'usercount',text:'已参加考试总人数'})
        fieldList.push({type:'int',value:'issuescore',text:'是否自动发布成绩（0否1是）'})
        fieldList.push({type:'int',value:'terminalid',text:'终端'})
        fieldList.push({type:'string',value:'rowmodel',text:'考试关联模型，exam=课程考试，homework=课程作业'})
        fieldList.push({type:'int',value:'tcid',text:'教学课程ID'})
        fieldList.push({type:'int',value:'placeId',text:'多租户id'})
        this.superFieldList = fieldList
      }
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less';
</style>