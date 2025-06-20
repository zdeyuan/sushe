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
      <a-button type="primary" icon="download" @click="handleExportXls('ve_jw_cj_bukao')">导出</a-button>
      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        <a-button type="primary" icon="import">导入</a-button>
      </a-upload>
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
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :rowSelection="{fixed:true,selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"

        @change="handleTableChange">

        <template slot="htmlSlot" slot-scope="text">
          <div v-html="text"></div>
        </template>
        <template slot="imgSlot" slot-scope="text">
          <span v-if="!text" style="font-size: 12px;font-style: italic;">无此图片</span>
          <img v-else :src="getImgView(text)" height="25px" alt="图片不存在" style="max-width:80px;font-size: 12px;font-style: italic;"/>
        </template>
        <template slot="fileSlot" slot-scope="text">
          <span v-if="!text" style="font-size: 12px;font-style: italic;">无此文件</span>
          <a-button
            v-else
            :ghost="true"
            type="primary"
            icon="download"
            size="small"
            @click="uploadFile(text)">
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
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>

      </a-table>
    </div>

    <veJwCjBukao-modal ref="modalForm" @ok="modalFormOk"></veJwCjBukao-modal>
  </a-card>
</template>

<script>

  import { EduListMixin } from '@/mixins/EduListMixin'

  export default {
    name: "VeJwCjBukaoList",
    mixins:[EduListMixin],
    components: {
    },
    data () {
      return {
        description: 've_jw_cj_bukao管理页面',
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
            title:'教学任务ID',
            align:"center",
            dataIndex: 'jxrwid'
          },
          {
            title:'是否关联补考（1=有补考，0=无补考）',
            align:"center",
            dataIndex: 'hasexam'
          },
          {
            title:'补考ID',
            align:"center",
            dataIndex: 'bkid'
          },
          {
            title:'院系ID',
            align:"center",
            dataIndex: 'falid'
          },
          {
            title:'专业ID',
            align:"center",
            dataIndex: 'specid'
          },
          {
            title:'学制ID',
            align:"center",
            dataIndex: 'xzid'
          },
          {
            title:'年级ID',
            align:"center",
            dataIndex: 'gradeid'
          },
          {
            title:'学期ID',
            align:"center",
            dataIndex: 'semid'
          },
          {
            title:'课程ID',
            align:"center",
            dataIndex: 'kcid'
          },
          {
            title:'学生ID',
            align:"center",
            dataIndex: 'stuid'
          },
          {
            title:'学生用户ID',
            align:"center",
            dataIndex: 'userid'
          },
          {
            title:'学号',
            align:"center",
            dataIndex: 'xh'
          },
          {
            title:'学生姓名',
            align:"center",
            dataIndex: 'xm'
          },
          {
            title:'行政班ID',
            align:"center",
            dataIndex: 'xzbid'
          },
          {
            title:'教学班ID',
            align:"center",
            dataIndex: 'jxbid'
          },
          {
            title:'考试日期',
            align:"center",
            dataIndex: 'ksrq'
          },
          {
            title:'考试日期（时间）',
            align:"center",
            dataIndex: 'ksrqsj'
          },
          {
            title:'课程成绩',
            align:"center",
            dataIndex: 'kccj'
          },
          {
            title:'是否及格（1=及格，0=不及格）',
            align:"center",
            dataIndex: 'ispass'
          },
          {
            title:'成绩录入人ID',
            align:"center",
            dataIndex: 'recorduserid'
          },
          {
            title:'成绩录入人号',
            align:"center",
            dataIndex: 'cjlrrh'
          },
          {
            title:'成绩录入日期时间（原日期时间合并）',
            align:"center",
            dataIndex: 'cjlrrqsj',
            customRender:function (text) {
              return !text?"":(text.length>10?text.substr(0,10):text)
            }
          },
          {
            title:'审核状态（0=待审核，1=通过，2=不通过）',
            align:"center",
            dataIndex: 'auditstatus'
          },
          {
            title:'审核人用户ID',
            align:"center",
            dataIndex: 'audituserid'
          },
          {
            title:'审核时间',
            align:"center",
            dataIndex: 'audittime'
          },
          {
            title:'终端ID',
            align:"center",
            dataIndex: 'terminalid'
          },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' }
          }
        ],
        url: {
          list: "/kwgl/veJwCjBukao/list",
          delete: "/kwgl/veJwCjBukao/delete",
          deleteBatch: "/kwgl/veJwCjBukao/deleteBatch",
          exportXlsUrl: "/kwgl/veJwCjBukao/exportXls",
          importExcelUrl: "kwgl/veJwCjBukao/importExcel",
        },
        dictOptions:{},
      }
    },
    computed: {
      importExcelUrl: function(){
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    methods: {
      initDictConfig(){
      }
    }
  }
</script>
<style lang="less" scoped>
  
</style>