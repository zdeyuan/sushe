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
      <a-button @click="handleAdd" style="margin-right: 10px;" type="primary" icon="plus">新增</a-button>
      <a-button @click="batchDel" style="margin-right: 10px;" type="primary" ><icon-text icon="iconbutton-delete">删除</icon-text></a-button>
      <a-button @click="searchQuery" style="margin-right: 10px;" type="primary"  ><icon-text icon="iconbutton-refresh">刷新</icon-text></a-button>
      
    </div>

    <!-- table区域-begin -->
    <div>
      

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
          <a @click="handleEdit(record)" class="blue-txt">编辑</a>

          <!-- <a-divider type="vertical" />
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

    <ve-hr-performance-rule-modal ref="modalForm" @ok="modalFormOk"></ve-hr-performance-rule-modal>
  </a-card>
</template>

<script>

import '@/assets/less/TableExpand.less'
import { mixinDevice } from '@/utils/mixin'
import { EduListMixin } from '@/mixins/EduListMixin'
import VeHrPerformanceRuleModal from './modules/VeHrPerformanceRuleModal'

export default {
  mixins: [EduListMixin, mixinDevice],
  components: {
    VeHrPerformanceRuleModal
  },
  data() {
    return {
      description: 've_hr_performance_rule管理页面',
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
          title: '规则名称',
          align: 'center',
          dataIndex: 'name'
        },
        {
          title: '转换比例',
          align: 'center',
          dataIndex: 'proportion'
        },
        {
          title: '备注',
          align: 'center',
          dataIndex: 'intro'
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
        list: '/hr/kaoqin/veHrPerformanceRule/list',
        delete: '/hr/kaoqin/veHrPerformanceRule/delete',
        deleteBatch: '/hr/kaoqin/veHrPerformanceRule/deleteBatch',
        exportXlsUrl: '/hr/kaoqin/veHrPerformanceRule/exportXls',
        importExcelUrl: '/hr/kaoqin/veHrPerformanceRule/importExcel'

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
      fieldList.push({ type: 'string', value: 'name', text: '规则名称', dictCode: '' })
      fieldList.push({ type: 'BigDecimal', value: 'proportion', text: '转换比例', dictCode: '' })
      fieldList.push({ type: 'Text', value: 'intro', text: '备注', dictCode: '' })
      fieldList.push({ type: 'int', value: 'updateuserid', text: '规则修改人用户id', dictCode: '' })
      fieldList.push({ type: 'date', value: 'updatetime', text: '规则修改时间' })
      fieldList.push({ type: 'int', value: 'terminalid', text: '终端id', dictCode: '' })
      this.superFieldList = fieldList
    }
  }
}
</script>
<style scoped>

</style>