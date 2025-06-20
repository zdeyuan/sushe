<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="8" :lg="7" :md="8" :sm="24">
            <a-form-item label="名称">
              <a-input placeholder="请输入名称" v-model="queryParam.jlname"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="8" :lg="7" :md="8" :sm="24">
            <a-form-item label="代码">
              <a-input placeholder="请输入代码" v-model="queryParam.jlcode"></a-input>
            </a-form-item>
          </a-col>
            <a-col :xl="8" :lg="7" :md="8" :sm="24">
              <a-form-item label="类型">
                <a-select v-model="queryParam.jltype" allowClear>
                  <a-select-option value="">全部</a-select-option>
                  <a-select-option value="1">奖励</a-select-option>
                  <a-select-option value="2">惩罚</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          <a-col :xl="8" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" style="margin-right: 10px;" icon="search" >搜索</a-button>
              <a-button type="primary" @click="searchReset"  style="margin-right: 10px;"
                ><icon-text icon="iconbutton-clear">清空</icon-text></a-button
              >
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <!-- 查询区域-END -->

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button @click="handleAdd" style="margin-right: 10px;" type="primary" icon="plus">新增</a-button>
      <a-button @click="batchDel" style="margin-right: 10px;" type="primary"><icon-text icon="iconbutton-delete">删除</icon-text></a-button>
      <a-button @click="searchQuery" style="margin-right: 10px;" type="primary"  ><icon-text icon="iconbutton-refresh">刷新</icon-text></a-button>
      <!-- <a-button type="primary"   @click="handleExportXls('惩罚奖励类型')"><icon-text icon="iconbutton-export">导出</icon-text></a-button>
      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl"
                @change="handleImportExcel">
        <a-button type="primary"   ><icon-text icon="iconbutton-import">导入</icon-text></a-button>
      </a-upload> -->
      <!-- 高级查询区域 -->
      <!-- <j-super-query :fieldList="superFieldList" ref="superQueryModal"
                     @handleSuperQuery="handleSuperQuery"></j-super-query>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel">
            <a-icon type="delete" />
            删除
          </a-menu-item>
        </a-menu>
        <a-button > 批量操作
          <a-icon type="down" />
        </a-button>
      </a-dropdown> -->
    </div>

    <!-- table区域-begin -->
    <div>
      <!-- <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a
        style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div> -->

      <a-table
        ref="table"
        size="middle"
        :scroll="{x:true}"
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
          <img v-else :src="getImgView(text)" height="25px" alt=""
               style="max-width:80px;font-size: 12px;font-style: italic;" />
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
          <!-- <a @click="handleDetail(record)" class="green-txt">查看</a>
          <a-divider type="vertical" /> -->
          <a @click="handleEdit(record)" class="blue-txt">编辑</a>
          <a-divider type="vertical" />
          <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
            <a class="orange-txt">删除</a>
          </a-popconfirm>
          <!-- <a @click="handleEdit(record)">编辑</a>

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
          </a-dropdown> -->
        </span>

      </a-table>
    </div>

    <hq-hr-jiangli-type-modal ref="modalForm" @ok="modalFormOk"></hq-hr-jiangli-type-modal>
  </a-card>
</template>

<script>

import '@/assets/less/TableExpand.less'
import { mixinDevice } from '@/utils/mixin'
import { EduListMixin } from '@/mixins/EduListMixin'
import HqHrJiangliTypeModal from './modules/HqHrJiangliTypeModal'
import { filterMultiDictText } from '@/components/dict/JDictSelectUtil'

export default {
  name: 'HqHrJiangliTypeList',
  mixins: [EduListMixin, mixinDevice],
  components: {
    HqHrJiangliTypeModal
  },
  data() {
    return {
      description: '惩罚奖励类型管理页面',
      tabPaths:['奖惩管理','奖惩分类'],
      // 表头
      columns: [
        {
          title: '序号',
          dataIndex: '',
          key: 'rowIndex',
          width: 60,
          align: 'center',
          customRender: function(t, r, index) {
            return parseInt(index) + 1
          }
        },
        {
          title: '名称',
          align: 'center',
          dataIndex: 'jlname'
        },
        {
          title: '代码',
          align: 'center',
          dataIndex: 'jlcode'
        },
        {
          title: '类型',
          align: 'center',
          dataIndex: 'jltype',
          customRender: function(text) {
            return text === 1 ? '奖励' : '惩罚'
          }
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          fixed: 'right',
          width: 147,
          scopedSlots: { customRender: 'action' }
        }
      ],
      url: {
        list: '/hr/rewardpublish/hqHrJiangliType/list',
        delete: '/hr/rewardpublish/hqHrJiangliType/delete',
        deleteBatch: '/hr/rewardpublish/hqHrJiangliType/deleteBatch',
        exportXlsUrl: '/hr/rewardpublish/hqHrJiangliType/exportXls',
        importExcelUrl: '/hr/rewardpublish/hqHrJiangliType/importExcel'

      },
      dictOptions: {},
      superFieldList: []
    }
  },
  created() {
    this.getSuperFieldList()
  },
  computed: {
    importExcelUrl: function() {
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
    }
  },
  methods: {
    initDictConfig() {
    },
    getSuperFieldList() {
      let fieldList = []
      fieldList.push({ type: 'string', value: 'jlname', text: '变动类型名称', dictCode: '' })
      fieldList.push({ type: 'string', value: 'jlcode', text: '变动类型代码', dictCode: '' })
      fieldList.push({ type: 'int', value: 'jltype', text: '类型', dictCode: 'rewardpublish' })
      fieldList.push({ type: 'Text', value: 'content', text: '奖励描述', dictCode: '' })
      this.superFieldList = fieldList
    }
  }
}
</script>
<style scoped>

</style>