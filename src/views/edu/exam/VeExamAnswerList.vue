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
      <a-button type="primary" icon="download" @click="handleExportXls('ve_exam_answer')">导出</a-button>
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

    <ve-exam-answer-modal ref="modalForm" @ok="modalFormOk"></ve-exam-answer-modal>
  </a-card>
</template>

<script>

  import '@/assets/less/TableExpand.less'
  import { mixinDevice } from '@/utils/mixin'
  import { EduListMixin } from '@/mixins/EduListMixin'
  import VeExamAnswerModal from './modules/VeExamAnswerModal'
  import JSuperQuery from '@/components/edu/JSuperQuery.vue'

  export default {
    name: 'VeExamAnswerList',
    mixins:[EduListMixin, mixinDevice],
    components: {
      VeExamAnswerModal,
      JSuperQuery,
    },
    data () {
      return {
        description: 've_exam_answer管理页面',
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
            title:'参加考试的用户ID',
            align:"center",
            dataIndex: 'userid'
          },
          {
            title:'考试ID',
            align:"center",
            dataIndex: 'examid'
          },
          {
            title:'考试记录ID',
            align:"center",
            dataIndex: 'recordid'
          },
          {
            title:'试题ID',
            align:"center",
            dataIndex: 'questionid'
          },
          {
            title:'答案',
            align:"center",
            dataIndex: 'answer'
          },
          {
            title:'对错',
            align:"center",
            dataIndex: 'isright'
          },
          {
            title:'得分',
            align:"center",
            dataIndex: 'score'
          },
          {
            title:'状态（交卷1、批改2） 默认为0',
            align:"center",
            dataIndex: 'status'
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
          list: "/exam/veExamAnswer/list",
          delete: "/exam/veExamAnswer/delete",
          deleteBatch: "/exam/veExamAnswer/deleteBatch",
          exportXlsUrl: "/exam/veExamAnswer/exportXls",
          importExcelUrl: "org.edu.module.exam/veExamAnswer/importExcel",
          
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
        fieldList.push({type:'int',value:'userid',text:'参加考试的用户ID'})
        fieldList.push({type:'int',value:'examid',text:'考试ID'})
        fieldList.push({type:'int',value:'recordid',text:'考试记录ID'})
        fieldList.push({type:'int',value:'questionid',text:'试题ID'})
        fieldList.push({type:'string',value:'answer',text:'答案'})
        fieldList.push({type:'int',value:'isright',text:'对错'})
        fieldList.push({type:'int',value:'score',text:'得分'})
        fieldList.push({type:'int',value:'status',text:'状态（交卷1、批改2） 默认为0'})
        fieldList.push({type:'int',value:'terminalid',text:'终端ID'})
        fieldList.push({type:'int',value:'placeId',text:'多租户id'})
        this.superFieldList = fieldList
      }
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less';
</style>