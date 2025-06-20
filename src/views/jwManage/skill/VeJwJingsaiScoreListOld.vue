<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">
          <a-col :xl="7" :lg="6" :md="8" :sm="24" >
            <a-form-item label="项目名称">
              <a-input placeholder="请输入项目名称" v-model="queryParam.name"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="7" :lg="6" :md="2" :sm="24">
            <a-form-item label="项目类型">
              <j-dict-select-tag  v-model="queryParam.xmtype" placeholder="请选择项目类型"
                                  dictCode="xmType"  ></j-dict-select-tag>
            </a-form-item>
          </a-col>


        </a-row>

        <a-row :gutter="24">
          <a-col :xl="7" :lg="6" :md="8" :sm="24">
            <a-form-item label="竞赛类别">
              <j-dict-select-tag  v-model="queryParam.jslb" placeholder="请选择"
                                  dictCode="jslb"  ></j-dict-select-tag>
            </a-form-item>
          </a-col>

          <a-col :xl="7" :lg="6" :md="8" :sm="24">
            <a-form-item label="竞赛级别">
              <j-dict-select-tag  v-model="queryParam.jsjb" placeholder="请选择"
                                  dictCode="jsjb"  ></j-dict-select-tag>
            </a-form-item>
          </a-col>

          <a-col :xl="7" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons" >

              <a-button type="primary" @click="batchDel" icon="delete" style="background:#f47920;color:white">清空</a-button>
              <a-button type="primary" @click="searchQuery" icon="search" style="margin-left: 8px">搜索</a-button>
              <!--              <a @click="handleToggleSearch" style="margin-left: 8px">-->
              <!--                {{ toggleSearchStatus ? '收起' : '展开' }}-->
              <!--                <a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>-->
              <!--              </a>-->
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator" :md="24" :sm="24" style="margin: -25px 0px 10px 2px">
      <!--<a-button @click="handleAdd" type="primary" icon="plus">添加</a-button>-->

      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel">
            <a-icon type="delete"/>
            删除
          </a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作
          <a-icon type="down"/>
        </a-button>
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
        bordered
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <!--<a @click="handleEdit(record)">编辑</a>-->
          <a @click="handleDetail(record)">统计</a>
          <a-divider type="vertical"/>
          <!--<a-dropdown>-->
          <!--<a class="ant-dropdown-link">-->
          <!--更多 <a-icon type="down"/>-->
          <!--</a>-->
          <!--<a-menu slot="overlay">-->
          <!--<a-menu-item>-->
          <!--<a href="javascript:;" @click="handleDetail(record)">详情</a>-->
          <!--</a-menu-item>-->

          <!--<a-menu-item>-->
          <!--<a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">-->
          <!--<a>删除</a>-->
          <!--</a-popconfirm>-->
          <!--</a-menu-item>-->
          <!--</a-menu>-->
          <!--</a-dropdown>-->
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <VeJwJingsaiProjectStatisticsModal ref="modalForm" @ok="modalFormOk"></VeJwJingsaiProjectStatisticsModal>
  </a-card>
</template>

<script>
  import {EduListMixin} from '@/mixins/EduListMixin'
  import {getAction} from '@/api/common/manage'
  import VeJwJingsaiProjectStatisticsModal from './modules/VeJwJingsaiProjectStatisticsModal'
  import { formatDate } from '@/utils/util'

  export default {
    name: "EduOrderTicketList",
    mixins: [EduListMixin],
    components: {
      VeJwJingsaiProjectStatisticsModal,
    },
    data() {
      return {
        description: 've_jw_jingsai_score管理页面',
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
            title:'项目名称',
            align:"center",
            dataIndex: 'projectid_dictText'
          },
          {
            title:'参赛小组/成员名',
            align:"center",
            dataIndex: 'groupid_dictText'
          },
          // {
          //   title:'学生的stuId',
          //   align:"center",
          //   dataIndex: 'stuid_dictText'
          // },
          {
            title:'成绩',
            align:"center",
            dataIndex: 'rank'
          },
          // {
          //   title:'获奖日期',
          //   align:"center",
          //   dataIndex: 'adddate'
          // },
          // {
          //   title:'终端Id',
          //   align:"center",
          //   dataIndex: 'terminalid'
          // },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' }
          }
        ],
        url: {
          list: "/edu-schedule/jingsaiProject/veJwJingsaiScore/list",
          delete: "/edu-schedule/jingsaiProject/veJwJingsaiScore/delete",
          deleteBatch: "/edu-schedule/jingsaiProject/veJwJingsaiScore/deleteBatch",
          exportXlsUrl: "/edu-schedule/jingsaiProject/veJwJingsaiScore/exportXls",
          importExcelUrl: "jingsaiProject/veJwJingsaiScore/importExcel",
        },
        dictOptions:{},
        isorter: []
      }
    },
    methods: {

    }
  }
</script>
<style scoped>
  
</style>