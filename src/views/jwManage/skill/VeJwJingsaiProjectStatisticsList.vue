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

            <span  class="table-page-search-submitButtons" >
               <a-button @click="searchQuery" type="primary" icon="search" style="margin-right: 10px;">搜索</a-button>
               <a-button @click="searchReset" type="danger" icon="delete" style="margin-right: 10px;">清除</a-button>
            </span>
        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator" :md="8" :sm="24" style="margin: 0px 0px 10px 2px">
      <!--<a-button @click="handleAdd" type="primary" icon="plus">添加</a-button>-->
<!--      <edu-button type="4" icon="download"  @click="handleExportXls('竞赛成绩')" title="导出"></edu-button>

      <edu-button type="1" @click="searchQuery" icon="sync" title="刷新"></edu-button> -->
      <a-button @click="handleExportXls('竞赛成绩')" type="primary" icon="download" style="margin-right: 10px;">导出</a-button>
      <a-button @click="searchQuery" type="primary" icon="sync" style="margin-right: 10px;">刷新</a-button>	
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
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <!--<a @click="handleEdit(record)">编辑</a>-->
          <a @click="checkPersonaltest(record)" title="统计" type="3">统计</a>
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
    <VeJwJingsaiProjectStatisticsModal ref="modalForm" @ok="modalFormOk"></VeJwJingsaiProjectStatisticsModal>
    <VeJwJingsaiCheckGroupModal ref="checkGroupModalForm" @ok="modalFormOk"></VeJwJingsaiCheckGroupModal>
    <VeJwJingsaiCheckPersonalModal ref="CheckPersonalModalFrom" @ok="modalFormOk"></VeJwJingsaiCheckPersonalModal>
  </a-card>
</template>

<script>
  import {EduListMixin} from '@/mixins/EduListMixin'
  import {getAction} from '@/api/common/manage'
  import VeJwJingsaiProjectStatisticsModal from './modules/VeJwJingsaiProjectStatisticsModal'
  import VeJwJingsaiCheckGroupModal from './modules/VeJwJingsaiCheckGroupModal'
  import { formatDate } from '@/utils/util'
  import VeJwJingsaiCheckPersonalModal from './modules/VeJwJingsaiCheckPersonalModal'

  export default {
    name: "EduOrderTicketList",
    mixins: [EduListMixin],
    components: {
      VeJwJingsaiProjectStatisticsModal,
      VeJwJingsaiCheckGroupModal,
      VeJwJingsaiCheckPersonalModal,
    },
    data() {
      return {
        description: 've_jw_jingsai_project管理页面',
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
          // {
          //   title:'id',
          //   align:"center",
          //   dataIndex: 'xmtype'
          // },
          {
            title:'项目名称',
            align:"center",
            dataIndex: 'name'
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
            title:'项目类型',
            align:"center",
            dataIndex: 'xmtype_dictText'
          },
          // {
          //   title:'指导教师',
          //   align:"center",
          //   dataIndex: 'teacher'
          // },

          {
            title:'状态',
            align:"center",
            dataIndex: 'status_dictText'
          },
          // {
          //   title:'报名时间',
          //   align:"center",
          //   dataIndex: 'begindate',
          //   customRender: function(text,row,index) {
          //     return (row.begindate ? formatDate(row.begindate * 1000, 'yyyy-MM-dd') : '') + "至"+ (row.enddate ? formatDate(row.enddate * 1000, 'yyyy-MM-dd') : '')
          //   }
          // },
          // {
          //   title:'结束报名时间',
          //   align:"center",
          //   dataIndex: 'enddate'
          // },
          // {
          //   title:'竞赛时间',
          //   align:"center",
          //   dataIndex: 'jsbegindate',
          //   customRender: function(text,row,index) {
          //     return (row.jsbegindate ? formatDate(row.jsbegindate * 1000, 'yyyy-MM-dd') : '') + "至"+ (row.jsenddate ? formatDate(row.jsenddate * 1000, 'yyyy-MM-dd') : '')
          //   }
          // },
          // {
          //   title:'竞赛结束时间',
          //   align:"center",
          //   dataIndex: 'jsenddate'
          // },
          // {
          //   title:'参赛说明',
          //   align:"center",
          //   dataIndex: 'cssm'
          // },
          // {
          //   title:'终端id',
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
          list: "/edu-schedule/jingsaiProject/veJwJingsaiProject/list",
          delete: "/edu-schedule/jingsaiProject/veJwJingsaiProject/delete",
          deleteBatch: "/edu-schedule/jingsaiProject/veJwJingsaiProject/deleteBatch",
          exportXlsUrl: "/edu-schedule/jingsaiProject/veJwJingsaiProject/exportXls",
          importExcelUrl: "jingsaiProject/veJwJingsaiProject/importExcel",
        },
        dictOptions:{},
        isorter: []
      }
    },
    methods: {
      //竞赛统计-查看个人项目名单
      checkPersonal:function(record){
        this.$refs.CheckPersonalModalForm.selectPersonal(record);
        this.$refs.CheckPersonalModalForm.title="统计";
        this.$refs.CheckPersonalModalForm.disableSubmit=false;
      },
      //竞赛统计-查看团队项目名单
      checkGroup:function(record){
        this.$refs.checkGroupModalForm.selectGroup(record);
        this.$refs.checkGroupModalForm.title="统计";
        this.$refs.checkGroupModalForm.disableSubmit=false;
      },

      checkPersonaltest:function(record){
        if (record.xmtype == 1){
          this.$refs.CheckPersonalModalFrom.selectPersonal(record);
          this.$refs.CheckPersonalModalFrom.title="团队成员名单";
          this.$refs.CheckPersonalModalFrom.disableSubmit=false;
        }else if(record.xmtype==2){
          this.$refs.CheckPersonalModalFrom.selectPersonal(record);
          this.$refs.CheckPersonalModalFrom.title="竞赛统计";
          this.$refs.CheckPersonalModalFrom.disableSubmit=false;


          // this.$refs.checkGroupModalForm.selectGroup(record);
          // this.$refs.checkGroupModalForm.title="竞赛统计";
          // this.$refs.checkGroupModalForm.disableSubmit=false;
        }
      },


      //判断个人项目/团队项目
      // judgeType:function(record) {
      //   if (xmtype == 1){
      //     this.checkPersonal(record);
      //   }else {
      //     this.checkGroup(record);
      //   }
      // }
    }
  }
</script>
<style lang="less" scoped>
 /deep/ .ant-form-item-control{
	  width:100%!important;
  }
</style>