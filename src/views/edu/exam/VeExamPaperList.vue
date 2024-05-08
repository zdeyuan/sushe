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
      <a-button type="primary" icon="download" @click="handleExportXls('ve_exam_paper')">导出</a-button>
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
          <a @click="handlePreview(record)">预览</a>
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
            <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">手动组卷<a-icon type="down" /></a>
            <a-menu slot="overlay" @click="handleQuestionTransfer(record)">
              <a-menu-item :key="1"> <a-icon type="plus" />添加单选题</a-menu-item>
              <a-menu-item :key="2"> <a-icon type="plus" />添加多选题</a-menu-item>
              <a-menu-item :key="3"> <a-icon type="plus" />添加判断题</a-menu-item>
              <a-menu-item :key="4"> <a-icon type="plus" />添加填空题</a-menu-item>
              <a-menu-item :key="5"> <a-icon type="plus" />添加问答题</a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>

      </a-table>
    </div>

    <ve-exam-paper-modal ref="modalForm" @ok="modalFormOk"></ve-exam-paper-modal>
    <ve-exam-paper-transfer-question-modal ref="paperTransfer" @ok="paperTransferOk"></ve-exam-paper-transfer-question-modal>
    <ve-exam-paper-preview-modal ref="paperPreview" @ok="paperPreviewOk"></ve-exam-paper-preview-modal>
  </a-card>
</template>

<script>

  import '@/assets/less/TableExpand.less'
  import { mixinDevice } from '@/utils/mixin'
  import { EduListMixin } from '@/mixins/EduListMixin'
  import VeExamPaperModal from './modules/VeExamPaperModal'
  import JSuperQuery from '@/components/edu/JSuperQuery.vue'
  import VeExamPaperQuestionModal from "./modules/VeExamPaperQuestionModal__Style#Drawer";
  import VeExamPaperTransferQuestionModal from './modules/VeExamPaperTransferQuestionModal.vue'
  import VeExamPaperPreviewModal from './modules/VeExamPaperPreviewModal'

  export default {
    name: 'VeExamPaperList',
    mixins:[EduListMixin, mixinDevice],
    components: {
      VeExamPaperQuestionModal,
      VeExamPaperModal,
      JSuperQuery,
      VeExamPaperTransferQuestionModal,
      VeExamPaperPreviewModal
    },
    data () {
      return {
        description: 've_exam_paper管理页面',
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
            title:'主题id',
            align:"center",
            dataIndex: 'topicid'
          },
          {
            title:'试卷名称',
            align:"center",
            dataIndex: 'name'
          },
          {
            title:'试卷创建人',
            align:"center",
            dataIndex: 'adduser'
          },
          {
            title:'创建时间',
            align:"center",
            dataIndex: 'addtime'
          },
          {
            title:'是否启用',
            align:"center",
            dataIndex: 'status'
          },
          {
            title:'总分',
            align:"center",
            dataIndex: 'scores'
          },
          {
            title:'试卷使用次数',
            align:"center",
            dataIndex: 'usecount'
          },
          {
            title:'试卷类型：1考试 2 自测 3作业，自测的试卷只能添加客观题;1，2',
            align:"center",
            dataIndex: 'type'
          },
          {
            title:'已设分数',
            align:"center",
            dataIndex: 'nowscore'
          },
          {
            title:'终端ID',
            align:"center",
            dataIndex: 'terminalid'
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
          list: "/exam/veExamPaper/list",
          delete: "/exam/veExamPaper/delete",
          deleteBatch: "/exam/veExamPaper/deleteBatch",
          exportXlsUrl: "/exam/veExamPaper/exportXls",
          importExcelUrl: "org.edu.module.exam/veExamPaper/importExcel",
          
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
        fieldList.push({type:'int',value:'topicid',text:'主题id'})
        fieldList.push({type:'string',value:'name',text:'试卷名称'})
        fieldList.push({type:'int',value:'adduser',text:'试卷创建人'})
        fieldList.push({type:'int',value:'addtime',text:'创建时间'})
        fieldList.push({type:'int',value:'status',text:'是否启用'})
        fieldList.push({type:'int',value:'scores',text:'总分'})
        fieldList.push({type:'int',value:'usecount',text:'试卷使用次数'})
        fieldList.push({type:'string',value:'type',text:'试卷类型：1考试 2 自测 3作业，自测的试卷只能添加客观题;1，2'})
        fieldList.push({type:'int',value:'nowscore',text:'已设分数'})
        fieldList.push({type:'int',value:'terminalid',text:'终端ID'})
        fieldList.push({type:'int',value:'placeId',text:'多租户id'})
        this.superFieldList = fieldList
      },
      handleQuestionTransfer: function (para) {
        console.log(para)
      this.$refs.paperTransfer.add();
      this.$refs.paperTransfer.title = "选择试题";
      this.$refs.paperTransfer.disableSubmit = false;
      this.$refs.paperTransfer.typeid = para.key;
      this.$refs.paperTransfer.paperid = para.id;
    },
      handlePreview(record){
        this.$refs.paperPreview.preview(record);
        this.$refs.paperPreview.title = "试卷预览";
        this.$refs.paperPreview.disableSubmit = false;
      },
      paperTransferOk() {
        // 新增/修改 成功时，重载列表
        this.loadData();
      },
      paperPreviewOk() {
        // 新增/修改 成功时，重载列表
        this.loadData();
      }
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less';
</style>