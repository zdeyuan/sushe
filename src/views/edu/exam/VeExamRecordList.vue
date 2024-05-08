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
      <a-button type="primary" icon="download" @click="handleExportXls('ve_exam_record')">导出</a-button>
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

    <ve-exam-record-modal ref="modalForm" @ok="modalFormOk"></ve-exam-record-modal>
  </a-card>
</template>

<script>

  import '@/assets/less/TableExpand.less'
  import { mixinDevice } from '@/utils/mixin'
  import { EduListMixin } from '@/mixins/EduListMixin'
  import VeExamRecordModal from './modules/VeExamRecordModal'
  import JSuperQuery from '@/components/edu/JSuperQuery.vue'

  export default {
    name: 'VeExamRecordList',
    mixins:[EduListMixin, mixinDevice],
    components: {
      VeExamRecordModal,
      JSuperQuery,
    },
    data () {
      return {
        description: 've_exam_record管理页面',
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
            title:'用户id',
            align:"center",
            dataIndex: 'userid'
          },
          {
            title:'考生姓名',
            align:"center",
            dataIndex: 'username'
          },
          {
            title:'考试ID',
            align:"center",
            dataIndex: 'examid'
          },
          {
            title:'考试得分',
            align:"center",
            dataIndex: 'score'
          },
          {
            title:'客观题得分',
            align:"center",
            dataIndex: 'objectivescore'
          },
          {
            title:'成绩级别',
            align:"center",
            dataIndex: 'grade'
          },
          {
            title:'考试时间',
            align:"center",
            dataIndex: 'addtime'
          },
          {
            title:'提交时间',
            align:"center",
            dataIndex: 'submittime'
          },
          {
            title:'是否提交，1未提交2手动提交3自动提交',
            align:"center",
            dataIndex: 'issubmit'
          },
          {
            title:'节点id',
            align:"center",
            dataIndex: 'nodeid'
          },
          {
            title:'第几次考试',
            align:"center",
            dataIndex: 'examtimes'
          },
          {
            title:'试卷号',
            align:"center",
            dataIndex: 'paperid'
          },
          {
            title:'是否最终成绩（0否，1是）',
            align:"center",
            dataIndex: 'isfinalscore'
          },
          {
            title:'是否批阅0否1是',
            align:"center",
            dataIndex: 'ismark'
          },
          {
            title:'考试用时（单位分钟）',
            align:"center",
            dataIndex: 'usetime'
          },
          {
            title:'终端',
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
          list: "/exam/veExamRecord/list",
          delete: "/exam/veExamRecord/delete",
          deleteBatch: "/exam/veExamRecord/deleteBatch",
          exportXlsUrl: "/exam/veExamRecord/exportXls",
          importExcelUrl: "org.edu.module.exam/veExamRecord/importExcel",
          
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
        fieldList.push({type:'int',value:'userid',text:'用户id'})
        fieldList.push({type:'string',value:'username',text:'考生姓名'})
        fieldList.push({type:'int',value:'examid',text:'考试ID'})
        fieldList.push({type:'int',value:'score',text:'考试得分'})
        fieldList.push({type:'int',value:'objectivescore',text:'客观题得分'})
        fieldList.push({type:'string',value:'grade',text:'成绩级别'})
        fieldList.push({type:'int',value:'addtime',text:'考试时间'})
        fieldList.push({type:'int',value:'submittime',text:'提交时间'})
        fieldList.push({type:'int',value:'issubmit',text:'是否提交，1未提交2手动提交3自动提交'})
        fieldList.push({type:'int',value:'nodeid',text:'节点id'})
        fieldList.push({type:'int',value:'examtimes',text:'第几次考试'})
        fieldList.push({type:'int',value:'paperid',text:'试卷号'})
        fieldList.push({type:'int',value:'isfinalscore',text:'是否最终成绩（0否，1是）'})
        fieldList.push({type:'int',value:'ismark',text:'是否批阅0否1是'})
        fieldList.push({type:'int',value:'usetime',text:'考试用时（单位分钟）'})
        fieldList.push({type:'int',value:'terminalid',text:'终端'})
        fieldList.push({type:'int',value:'placeId',text:'多租户id'})
        this.superFieldList = fieldList
      }
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less';
</style>