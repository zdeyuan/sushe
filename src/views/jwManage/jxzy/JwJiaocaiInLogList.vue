<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row>
          <a-col :md="6" :sm="24">
            <a-form-item label="教材代码">
              <a-input v-model="queryParam.jcdm" placeholder="请输入教材代码"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="24">
            <a-form-item label="教材名称">
              <a-input v-model="queryParam.jcmc" placeholder="请输入教材名称"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="4" :sm="24">
            <span style="float: left; overflow: hidden" class="table-page-search-submitButtons">
              <!-- <edu-button type="5" @click="searchQuery" icon="search" title="搜索" style="margin-bottom: 0"></edu-button>
			  <edu-button type="7" @click="searchReset" icon="delete" title="清除" style="margin-bottom: 0"></edu-button> -->
			  
			  <a-button @click="searchQuery" type="primary" icon="search" style="margin-right: 10px;">搜索</a-button>
			  <a-button @click="searchReset" type="danger" icon="delete" style="margin-right: 10px;">清除</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator" :md="24" :sm="24" style="margin: 0px 0px 10px 2px">
<!--      <a-dropdown v-if="selectedRowKeys.length > 0">-->
<!--        <a-menu slot="overlay">-->
<!--          <a-menu-item key="1" @click="batchDel">-->
<!--            <a-icon type="delete" />-->
<!--            删除-->
<!--          </a-menu-item>-->
<!--        </a-menu>-->
<!--        <a-button style="margin-left: 8px">-->
<!--          批量操作-->
<!--          <a-icon type="down" />-->
<!--        </a-button>-->
<!--      </a-dropdown>-->
    </div>

    <!-- table区域-begin -->
    <div>
<!--      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px">-->
<!--        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择-->
<!--        <a style="font-weight: 600">{{ selectedRowKeys.length }}</a-->
<!--        >项-->
<!--        <a style="margin-left: 24px" @click="onClearSelected">清空</a>-->
<!--      </div>-->

<!--      :rowSelection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"-->
      <a-table
        ref="table"
        size="middle"
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :rowSelection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
        @change="handleTableChange"
      >
        <span slot="action" slot-scope="text, record">

          <a  @click="handlePutin(record)" >入库</a>
<!--          <a @click="handlePutin(record)">入库</a>-->
          <a-divider type="vertical" />
          <a  @click="handleKucun(record)" >库存</a>
<!--          <a @click="handleKucun(record)">库存</a>-->
        </span>
      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <jw-jiaocai-putin-modal ref="putModalForm" @ok="modalFormOk"></jw-jiaocai-putin-modal>
    <jw-jiaocai-kucuninfo-modal ref="kucunModalForm" @ok="modalFormOk"></jw-jiaocai-kucuninfo-modal>
  </a-card>
</template>

<script>
import '@/assets/scss/usercolor.scss';
import { EduListMixin } from '@/mixins/EduListMixin'
import { getAction } from '@/api/common/manage'
import JwJiaocaiPutinModal from './modules/JwJiaocaiPutinModal.vue'
import JwJiaocaiKucuninfoModal from './modules/JwJiaocaiKucuninfoModal'
import { formatDate } from '@/utils/util'

export default {
  name: 'JwJiaocaiLogList',
  mixins: [EduListMixin],
  components: {
    JwJiaocaiPutinModal,
    JwJiaocaiKucuninfoModal,
  },
  data() {
    return {
      description: '仓库出入库记录表管理页面',
      // 表头
      columns: [
        {
          title: '教材代码',
          align: 'center',
          dataIndex: 'jcdm',
        },
        {
          title: '教材名称',
          align: 'center',
          dataIndex: 'jcmc',
        },

        {
          title: '出版号',
          align: 'center',
          dataIndex: 'cbh',
        },

        {
          title: 'ISBN',
          align: 'center',
          dataIndex: 'isbn',
        },
        {
          title: '第一作者',
          align: 'center',
          dataIndex: 'dyzz',
        },
        {
          title: '其他作者',
          align: 'center',
          dataIndex: 'qtzz',
        },
        {
          title: '版次',
          align: 'center',
          dataIndex: 'bc',
        },
        {
          title: '印次',
          align: 'center',
          dataIndex: 'yc',
        },
        {
          title: '价格',
          align: 'center',
          dataIndex: 'jg',
        },
        {
          title: '出版社',
          align: 'center',
          dataIndex: 'cbs',
        },
        {
          title: '开本',
          align: 'folio',
          dataIndex: 'folio ',
        },
        {
          title: '包装',
          align: 'center',
          dataIndex: 'packaging',
        },
        {
          title: '状态',
          align: 'center',
          dataIndex: 'status_dictText',
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          scopedSlots: { customRender: 'action' },
        },
      ],
      url: {
        list: '/jxzy/jwJiaocai/list',
        delete: '/jxzy/jwJiaocaiLog/delete',
        deleteBatch: '/jxzy/jwJiaocaiLog/deleteBatch',
        exportXlsUrl: '/jxzy/jwJiaocaiLog/exportXls',
        importExcelUrl: 'jxzy/jwJiaocaiLog/importExcel',
      },
      dictOptions: {},
      superFieldList: [],
      isorter: [],
    }
  },
  methods: {
    //教材管理-打开入库操作modal
    handlePutin: function (record) {
      this.$refs.putModalForm.edit(record)
      this.$refs.putModalForm.title = '教材入库'
      this.$refs.putModalForm.disableSubmit = false
    },

    //教材管理-查看库存
    handleKucun: function (record) {
      this.$refs.kucunModalForm.select(record)
      this.$refs.kucunModalForm.title = '查看库存'
      this.$refs.kucunModalForm.disableSubmit = false
    },
  },
}
</script>
