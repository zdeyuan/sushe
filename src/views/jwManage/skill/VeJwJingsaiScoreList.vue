<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">
            <a-form-item label="项目名称">
              <a-input placeholder="请输入项目名称" v-model="queryParam.name"></a-input>
            </a-form-item>
            <a-form-item label="项目类型">
              <j-dict-select-tag  v-model="queryParam.xmtype" placeholder="请选择项目类型"
                                  dictCode="xmType"  ></j-dict-select-tag>
            </a-form-item>
            <a-form-item label="竞赛类别">
              <j-dict-select-tag  v-model="queryParam.jslb" placeholder="请选择"
                                  dictCode="jslb"  ></j-dict-select-tag>
            </a-form-item>

            <a-form-item label="竞赛级别">
              <j-dict-select-tag  v-model="queryParam.jsjb" placeholder="请选择"
                                  dictCode="jsjb"  ></j-dict-select-tag>
            </a-form-item>
            <span class="table-page-search-submitButtons" >
            <a-button @click="searchQuery" type="primary" icon="search" style="margin-right: 10px;">搜索</a-button>
            <a-button @click="searchReset" type="danger" icon="delete" style="margin-right: 10px;">清除</a-button>
            </span>
        </a-row>
      </a-form>
    </div>


    <!-- table区域-begin -->
    <div>
<!--      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">-->
<!--        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项-->
<!--        <a style="margin-left: 24px" @click="onClearSelected">清空</a>-->
<!--      </div>-->

<!--      :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"-->
      <a-table
        ref="table"
        size="middle"
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <!--<a @click="handleEdit(record)">编辑</a>-->
<!--          <a @click="checkGroupInfo(record)">成绩查看</a>-->
          <a type="2" @click="checkGroupInfo(record)" title="成绩查看">成绩查看</a>
<!--          <a-divider type="vertical"/>-->
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
    <VeJwJingsaiProjectStatisticsModal ref="modalForm" @ok="searchQuery"></VeJwJingsaiProjectStatisticsModal>
    <VeJwJingsaiGroupinfoScoreModal ref="infoModalForm" @ok="searchQuery"></VeJwJingsaiGroupinfoScoreModal>
  </a-card>
</template>

<script>
  import {EduListMixin} from '@/mixins/EduListMixin'
  import {getAction} from '@/api/common/manage'
  import VeJwJingsaiProjectStatisticsModal from './modules/VeJwJingsaiProjectStatisticsModal'
  import VeJwJingsaiGroupinfoScoreModal from './modules/VeJwJingsaiGroupinfoScoreModal'
  import { formatDate } from '@/utils/util'

  export default {
    name: "EduOrderTicketList",
    mixins: [EduListMixin],
    components: {
      VeJwJingsaiProjectStatisticsModal,VeJwJingsaiGroupinfoScoreModal

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
            dataIndex: 'name'
          },
          {
            title:'项目类型',
            align:"center",
            dataIndex: 'xmtype_dictText'
          },
          {
            title:'竞赛类别',
            align:"center",
            dataIndex: 'jslb_dictText'
          },
          {
            title:'竞赛级别',
            align:"center",
            dataIndex: 'jsjb_dictText'
          },
          {
            title:'举办单位',
            align:"center",
            dataIndex: 'jbdw'
          },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' }
          }
        ],
        url: {
          list: "/edu-schedule/jingsaiProject/veJwJingsaiProject/list",
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
      //团队报名-查看名单
      checkGroupInfo:function(record){
        this.$refs.infoModalForm.select(record);
        this.$refs.infoModalForm.title="成绩查看";
        this.$refs.infoModalForm.disableSubmit=false;
      }
    }
  }
</script>
<style lang="less" scoped>
 /deep/ .ant-form-item-control{
	  width:100%!important;
  }
</style>