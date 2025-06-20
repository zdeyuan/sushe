<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">
          <a-col :md="2" :sm="24">
            <!-- 操作按钮区域 -->
            <!-- <edu-button type="1" @click="searchQuery" icon="sync" title="刷新"></edu-button> -->
			<a-button @click="searchQuery" type="primary" icon="sync" style="margin-right: 10px;">刷新</a-button>	
<!--            <a-dropdown v-if="selectedRowKeys.length > 0">-->
<!--              <a-menu slot="overlay">-->
<!--                <a-menu-item key="1" @click="batchDelConfirm">-->
<!--                  <edu-batch-delete-button ref="batchDelBtn" @del="batchDelAction" type="4"-->
<!--                                           title="删除"></edu-batch-delete-button>-->
<!--                </a-menu-item>-->
<!--              </a-menu>-->
<!--              <edu-button type="10" title="批量操作" icon="down" style="margin-bottom: 0px" rightIcon="true">-->
<!--              </edu-button>-->
<!--            </a-dropdown>-->
          </a-col>
          <a-col :md="6" :sm="24" style="margin-left: 2.56%">
            <a-form-item label="教材代码">
              <a-input v-model="queryParam.jcdm" placeholder="请输入教材代码"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="24">
            <a-form-item label="教材名称">
              <a-input v-model="queryParam.jcmc"  placeholder="请输入教材名称"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="7" :lg="7" :md="8" :sm="24">
            <a-form-item label="操作标识">
              <j-dict-select-tag v-model="queryParam.type" placeholder="请选择" dict-code="material_operation" />
            </a-form-item>
          </a-col>
          <a-col :md="3" :sm="24">
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
<!--    <div class="table-operator" :md="24" :sm="24" style="margin: -25px 0px 10px 2px">-->


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
<!--    </div>-->

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
        @change="handleTableChange"
      >
        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">编辑</a>
          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link"> 更多 <a-icon type="down" /> </a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a href="javascript:;" @click="handleDetail(record)">详情</a>
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
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <jw-jiaocai-log-modal ref="modalForm" @ok="modalFormOk"></jw-jiaocai-log-modal>
  </a-card>
</template>

<script>
import '@/assets/scss/usercolor.scss';
import { EduListMixin } from '@/mixins/EduListMixin'
import { getAction } from '@/api/common/manage'
import JwJiaocaiLogModal from './modules/JwJiaocaiLogModal.vue'
import { formatDate } from '@/utils/util'

export default {
  name: 'JwJiaocaiOutLogList',
  mixins: [EduListMixin],
  components: {
    JwJiaocaiLogModal,
  },
  data() {
    return {
      description: '仓库出入库记录表管理页面',
      // 表头
      columns: [
        {
          title: '教材名称',
          align: 'center',
          dataIndex: 'jcid_dictText',
        },
        {
          title: '仓库名称',
          align: 'center',
          dataIndex: 'ckid_dictText',
        },
        {
          title: '操作标识',
          align: 'center',
          dataIndex: 'type_dictText',
        },
        {
          title: '数量',
          align: 'center',
          dataIndex: 'num',
        },
        {
          title: '供应商',
          align: 'center',
          dataIndex: 'supplierid_dictText',
        },
        {
          title: ' 操作时间',
          align: 'center',
          dataIndex: 'addtime',
          customRender: function(text,row,index) {
            return (text ? formatDate(text * 1000, 'yyyy-MM-dd hh:mm:ss') : '')
          }
        },
        {
          title: '出/入库日期',
          align: 'center',
          dataIndex: 'adddate',
        },
        {
          title: '操作人',
          align: 'center',
          dataIndex: 'addusername',
        },
        {
          title: '订单号',
          align: 'center',
          dataIndex: 'orderid',
        },
        //
        // {
        //   title: '操作',
        //   dataIndex: 'action',
        //   align: 'center',
        //   scopedSlots: { customRender: 'action' },
        // },
      ],
      url: {
        list: '/jxzy/jwJiaocaiLog/list',
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
    //时间格式化工具类
    simpleDateFormat(millisecond, format) {
      return formatDate(millisecond, format)
    },
  },
}
</script>
