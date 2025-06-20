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
      <a-button type="primary" icon="download" @click="handleExportXls('ve_jw_ks_xuesheng')">导出</a-button>
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

    <veJwKsXuesheng-modal ref="modalForm" @ok="modalFormOk"></veJwKsXuesheng-modal>
  </a-card>
</template>

<script>

    import { EduListMixin } from '@/mixins/EduListMixin'
  import VeJwKsXueshengModal from './modules/VeJwKsXueshengModal'

  export default {
    name: "VeJwKsXueshengList",
    mixins:[EduListMixin],
    components: {
      VeJwKsXueshengModal
    },
    data () {
      return {
        description: 've_jw_ks_xuesheng管理页面',
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
            title:'考试ID',
            align:"center",
            dataIndex: 'ksid'
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
            title:'教学班ID',
            align:"center",
            dataIndex: 'jxbid'
          },
          {
            title:'行政班ID',
            align:"center",
            dataIndex: 'xzbid'
          },
          {
            title:'学生ID',
            align:"center",
            dataIndex: 'stuid'
          },
          {
            title:'用户ID',
            align:"center",
            dataIndex: 'userid'
          },
          {
            title:'学号',
            align:"center",
            dataIndex: 'xh'
          },
          {
            title:'姓名',
            align:"center",
            dataIndex: 'xm'
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
          list: "/kwgl/veJwKsXuesheng/list",
          delete: "/kwgl/veJwKsXuesheng/delete",
          deleteBatch: "/kwgl/veJwKsXuesheng/deleteBatch",
          exportXlsUrl: "/kwgl/veJwKsXuesheng/exportXls",
          importExcelUrl: "kwgl/veJwKsXuesheng/importExcel",
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