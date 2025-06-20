<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">
			
            <a-form-item label="类型名称">
              <a-input placeholder="请输入类型名称" v-model="queryParam.name"></a-input>
            </a-form-item>
            <a-form-item label="状态">
              <a-select
                placeholder="请选择状态"
                v-model="queryParam.status">
                <a-select-option value="">全部</a-select-option>
                <a-select-option value="1">启用</a-select-option>
                <a-select-option value="0">禁用</a-select-option>
              </a-select>
            </a-form-item>
              <span class="table-page-search-submitButtons">
                <!-- <edu-button type="5" @click="searchQuery" icon="search" title="搜索"
                             style="margin-bottom: 0"></edu-button>
							 <edu-button type="7" @click="searchReset"
                                                                               icon="delete" title="清除"
                                                                               style="margin-bottom: 0"></edu-button> -->
				 <a-button @click="searchQuery" type="primary" icon="search" style="margin-right: 10px;">搜索</a-button>
				 <a-button @click="searchReset" type="danger" icon="delete" style="margin-right: 10px;">清除</a-button>	
              </span>
        </a-row>
		<a-row>
			<a-button @click="handleAdd" type="primary" icon="plus" style="margin-right: 10px;">添加</a-button>
			<a-button @click="batchState(1)" type="primary" icon="check-circle" style="margin-right: 10px;">启用</a-button>
			<a-button @click="batchState(0)" type="danger" icon="stop" style="margin-right: 10px;">禁用</a-button>	
			<a-button @click="searchQuery" type="primary" icon="sync" style="margin-right: 10px;">刷新</a-button>
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
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{
        selectedRowKeys.length }}</a>项
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
          <img v-else :src="getImgView(text)" height="25px" alt="图片不存在"
               style="max-width:80px;font-size: 12px;font-style: italic;"/>
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

    <veJwCjlx-modal ref="modalForm" @ok="modalFormOk"></veJwCjlx-modal>
  </a-card>
</template>

<script>

  import { EduListMixin } from '@/mixins/EduListMixin'
  import VeJwCjlxModal from './modules/VeJwCjlxModal'

  export default {
    name: 'VeJwCjlxList',
    mixins: [EduListMixin],
    components: {
      VeJwCjlxModal
    },
    data() {
      return {
        description: 've_jw_cjlx管理页面',
        // 表头
        columns: [
          {
            title: '类型名称',
            align: 'center',
            dataIndex: 'name'
          },
          {
            title: '状态',
            align: 'center',
            dataIndex: 'statusDictText'
          },
          {
            title: '是否计入统计',
            align: 'center',
            dataIndex: 'istongjiDictText'
          },

          {
            title: '操作',
            dataIndex: 'action',
            align: 'center',
            scopedSlots: { customRender: 'action' }
          }
        ],
        url: {
          list: '/kwgl/veJwCjlx/list',
          delete: '/kwgl/veJwCjlx/delete',
          deleteBatch: '/kwgl/veJwCjlx/deleteBatch',
          stateBatch: '/kwgl/veJwCjlx/stateBatch',
          exportXlsUrl: '/kwgl/veJwCjlx/exportXls',
          importExcelUrl: 'kwgl/veJwCjlx/importExcel'
        },
        dictOptions: {},
        isorter: []
      }
    },
    computed: {
      importExcelUrl: function() {
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
      }
    },
    methods: {
      initDictConfig() {
      }
    }
  }
</script>
<style lang="less" scoped>
  
</style>