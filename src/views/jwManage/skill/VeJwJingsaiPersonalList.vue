<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">
            
            <a-form-item label="项目名称">
              <a-input placeholder="请输入项目名" v-model="queryParam.projectName" style="width: 300px;"></a-input>
            </a-form-item>

            <span class="table-page-search-submitButtons">
              <a-button @click="searchQuery" type="primary" icon="search" style="margin-right: 10px;">搜索</a-button>
              <a-button @click="searchReset" type="danger" icon="delete" style="margin-right: 10px;">清除</a-button>
            </span>

        </a-row>
      </a-form>
    </div>
    <!-- 操作按钮区域 -->
    <div class="table-operator" :md="24" :sm="24" style="margin: 0px 0px 10px 2px">
	<a-button @click="handleAdd" type="primary" icon="plus" style="margin-right: 10px;">添加个人报名</a-button>

      <!--      <a-button @click="handleAdd"  icon="plus"  type="success" style="background: rgb(5,186,209) ; color: white"  >添加个人报名</a-button>-->
      <!--      type="danger"-->

      <!--      <a-dropdown v-if="selectedRowKeys.length > 0">-->
      <!--        <a-menu slot="overlay">-->
      <!--          <a-menu-item key="1" @click="batchDel">-->
      <!--            <a-icon type="delete"/>-->
      <!--            删除-->
      <!--          </a-menu-item>-->
      <!--        </a-menu>-->
      <!--        <a-button style="margin-left: 8px"> 批量操作-->
      <!--          <a-icon type="down"/>-->
      <!--        </a-button>-->
      <!--      </a-dropdown>-->
    </div>

    <!-- table区域-begin -->
    <div>
      <!--      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">-->
      <!--        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项-->
      <!--        <a style="margin-left: 24px" @click="onClearSelected">清空</a>-->
      <!--      </div>-->

      <a-table
        ref="table"
        size="middle"
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a type="2" @click="checkInfo(record)" title="查看名单">查看名单</a>
          <!--          <a @click="personalProject(record)">查看名单</a>-->
          <!--          <a-divider type="vertical"/>-->
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <VeJwJingsaiPersonalModal ref="modalForm" @ok="modalFormOk"></VeJwJingsaiPersonalModal>
    <VeJwJingsaiPersonalinfoModal ref="infoModalForm" @ok="modalFormOk"></VeJwJingsaiPersonalinfoModal>
    <!--    <VeJwJingsaiBaomingModal ref="modalForm" @ok="modalFormOk"></VeJwJingsaiBaomingModal>-->
  </a-card>
</template>

<script>
  import { EduListMixin } from '@/mixins/EduListMixin'
  import { getAction } from '@/api/common/manage'
  import VeJwJingsaiPersonalModal from './modules/VeJwJingsaiPersonalModal'
  import VeJwJingsaiPersonalinfoModal from './modules/VeJwJingsaiPersonalinfoModal'
  // import VeJwJingsaiBaomingModal from './modules/VeJwJingsaiBaomingModal'
  import { formatDate } from '@/utils/util'
  import ACol from 'ant-design-vue/es/grid/Col'

  export default {
    name: 'EduOrderTicketList',
    mixins: [EduListMixin],
    components: {
      ACol,
      VeJwJingsaiPersonalModal,
      VeJwJingsaiPersonalinfoModal
      // VeJwJingsaiBaomingModal,
    },
    data() {
      return {
        description: 've_jw_jingsai_project管理页面',
        // 表头
        columns: [
          {
            title: '#',
            dataIndex: '',
            key: 'rowIndex',
            width: 60,
            align: 'center',
            customRender: function(t, r, index) {
              return parseInt(index) + 1
            }
          },
          {
            title: '项目名称',
            align: 'center',
            dataIndex: 'projectName'
          },
          {
            title: '举办单位',
            align: 'center',
            dataIndex: 'jbdw'
          },
          {
            title: '项目类型',
            align: 'center',
            dataIndex: 'xmtype_dictText'
          },
          // {
          //   title:'指导教师',
          //   align:"center",
          //   dataIndex: 'teacher'
          // },
          {
            title: '报名时间',
            align: 'center',
            dataIndex: 'begindate',
            customRender: function(text, row, index) {
              return (row.begindate ? formatDate(row.begindate * 1000, 'yyyy-MM-dd') : '') + '至' + (row.enddate ? formatDate(row.enddate * 1000, 'yyyy-MM-dd') : '')
            }
          },
          {
            title: '操作',
            dataIndex: 'action',
            align: 'center',
            scopedSlots: { customRender: 'action' }
          }
        ],
        url: {
          list: '/edu-schedule/jingsaiProject/veJwJingsaiProject/list?xmtype=1',
          delete: '/edu-schedule/jingsaiProject/veJwJingsaiProject/delete',
          deleteBatch: '/edu-schedule/jingsaiProject/veJwJingsaiProject/deleteBatch',
          exportXlsUrl: '/edu-schedule/jingsaiProject/veJwJingsaiProject/exportXls',
          importExcelUrl: 'jingsaiProject/veJwJingsaiProject/importExcel'
        },
        dictOptions: {},
        isorter: []
      }
    },
    methods: {
      //个人报名-查看名单
      checkInfo: function(record) {
        this.$refs.infoModalForm.selectPersonal(record)
        this.$refs.infoModalFrom.title = '查看名单'
        this.$refs.infoModalFrom.disableSubmit = false
      }

    }

  }
</script>


<style lang="less" scoped>
 /deep/ .ant-form-item-control{
	  width:100%!important;
  }
</style>
