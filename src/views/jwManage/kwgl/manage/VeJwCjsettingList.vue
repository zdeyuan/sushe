<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">
          <a-col :md="13" :sm="24">
           <!-- <edu-button @click="handleAdd" type="primary" icon="plus" title="添加"></edu-button>
            <edu-button
              title="启用"
              @click="batchState(1)"
              type="4"
              icon="check-circle"
            ></edu-button>

            <edu-button
              title="禁用"
              @click="batchState(0)"
              type="8"
              icon="close-circle"
            ></edu-button>


            <edu-button type="1" @click="searchQuery" icon="sync" title="刷新"></edu-button> -->
			
			<a-button @click="handleAdd" type="primary" icon="plus" style="margin-right: 10px;">添加</a-button>
			<a-button @click="batchState(1)" type="primary" icon="check-circle" style="margin-right: 10px;">启用</a-button>
			<a-button @click="batchState(0)" type="danger" icon="stop" style="margin-right: 10px;">禁用</a-button>	
			<a-button @click="searchQuery" type="primary" icon="sync" style="margin-right: 10px;">刷新</a-button>
          </a-col>
          <a-col :md="12" :sm="24" style="margin-right: 2.56%">
            <a-form-item label="成绩类型">
              <!-- <j-dict-select-tag v-model="queryParam.cjlxid"  dictCode="edu_dev_open.ve_jw_cjlx,name,id"
                                 placeholder="请选择成绩类型" style="width: 100%"/> -->
				<JSelectCenJi trigger-change="true" v-model="queryParam.cjlxid" placeholder="请选择成绩类型"></JSelectCenJi>				 
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="状态">
              <a-select
                placeholder="请选择状态"
                v-model="queryParam.status">
                <a-select-option value="">全部</a-select-option>
                <a-select-option value="1">启用</a-select-option>
                <a-select-option value="0">禁用</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          <a-col :md="5" :sm="24">
              <span style="float: left; overflow: hidden" class="table-page-search-submitButtons">
                 <!-- <edu-button type="5" @click="searchQuery" icon="search" title="搜索"
                             style="margin-bottom: 0"></edu-button><edu-button type="7" @click="searchReset"
                                                                               icon="delete" title="清除"
                                                                               style="margin-bottom: 0"></edu-button> -->
				 <a-button @click="searchQuery" type="primary" icon="search" style="margin-right: 10px;">搜索</a-button>
				 <a-button @click="searchReset" type="danger" icon="delete" style="margin-right: 10px;">清除</a-button>	
              </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <!-- 查询区域-END -->

    <!-- 操作按钮区域 -->
    <div class="table-operator">
<!--      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>-->
<!--      <a-button-->
<!--        @click="batchState(1)"-->
<!--        type="primary"-->
<!--        icon="check-circle"-->
<!--        style="background: #37d75a; color: white; border: none"-->
<!--      >启用</a-button-->
<!--      >-->
<!--      <a-button-->
<!--        @click="batchState(0)"-->
<!--        type="primary"-->
<!--        icon="close-circle"-->
<!--        style="background: #f47920; color: white; border: none"-->
<!--      >禁用</a-button>-->

<!--      <a-button type="primary" icon="download" @click="handleExportXls('ve_jw_cjlx')">导出</a-button>-->
<!--      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">-->
<!--        <a-button type="primary" icon="import">导入</a-button>-->
<!--      </a-upload>-->
<!--      <a-dropdown v-if="selectedRowKeys.length > 0">-->
<!--        <a-menu slot="overlay">-->
<!--          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>-->
<!--        </a-menu>-->
<!--        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>-->
<!--      </a-dropdown>-->
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
<!--          <a @click="handleEdit(record)">编辑</a>-->
          <edu-label-button type="3" @click="handleEdit(record)" title="编辑"></edu-label-button>
          <!-- <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown> -->
        </span>

      </a-table>
    </div>

    <veJwCjsetting-modal ref="modalForm" @ok="modalFormOk"></veJwCjsetting-modal>
  </a-card>
</template>

<script>

  import { EduListMixin } from '@/mixins/EduListMixin'
  import VeJwCjsettingModal from './modules/VeJwCjsettingModal'
  import { formatDate } from '@/utils/util'
  import JSelectCenJi from '@/components/kwglbiz/JSelectCenJi'
  export default {
    name: "VeJwCjsettingList",
    mixins:[EduListMixin],
    components: {
      VeJwCjsettingModal,
	  JSelectCenJi
    },
    data () {
      return {
        description: 've_jw_cjlx管理页面',
        // 表头
        columns: [
          {
            title:'成绩类型名称',
            align:"center",
            dataIndex: 'cjlxidDictText'
          },
          {
            title:'开始时间',
            align:"center",
            dataIndex: 'starttime',
            customRender: function(text,row,index) {
              return (text ? formatDate(text * 1000, 'yyyy-MM-dd hh:mm:ss') : '')
            },
          },
          {
            title:'结束时间',
            align:"center",
            dataIndex: 'endtime',
            customRender: function(text,row,index) {
              return (text ? formatDate(text * 1000, 'yyyy-MM-dd hh:mm:ss') : '')
            },
          },
          {
            title:'状态',
            align:"center",
            dataIndex: 'statusDictText',
          },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' }
          }
        ],
        url: {
          list: "/kwgl/veJwCjsetting/list",
          delete: "/kwgl/veJwCjsetting/delete",
          deleteBatch: "/kwgl/veJwCjsetting/deleteBatch",
          stateBatch: "/kwgl/veJwCjsetting/stateBatch",
          exportXlsUrl: "/kwgl/veJwCjsetting/exportXls",
          importExcelUrl: "kwgl/veJwCjsetting/importExcel",
        },
        dictOptions:{},
        isorter:[],
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