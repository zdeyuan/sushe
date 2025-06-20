<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">

          <a-col :xl="7" :lg="7" :md="8" :sm="24">
            <a-form-item label="项目名称">
              <j-dict-select-tag  v-model="queryParam.projectid" placeholder="请选择项目"
                                  dictCode="edu_dev_open.ve_jw_jingsai_project,name,id"  ></j-dict-select-tag>
            </a-form-item>
          </a-col>
          <!--<a-col :md="6" :sm="24">-->
            <!--<a-form-item label="项目名称">-->
              <!--<a-input placeholder="请输入项目名" v-model="queryParam.projectid"></a-input>-->
            <!--</a-form-item>-->
          <!--</a-col>-->
          <a-col :md="6" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
            </span>
          </a-col>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator" :md="24" :sm="24" style="margin: 0px 0px 10px 2px">
      <a-button @click="handleAdd" type="primary" icon="plus">添加个人报名</a-button>

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
          <a @click="handleEdit(record)">查看名单</a>
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
    <ve-jw-jingsai-baoming-modal ref="modalForm" @ok="modalFormOk"></ve-jw-jingsai-baoming-modal>
  </a-card>
</template>

<script>
  import {EduListMixin} from '@/mixins/EduListMixin'
  import {getAction} from '@/api/common/manage'
  import VeJwJingsaiBaomingModal from './modules/VeJwJingsaiBaomingModal'

  export default {
    name: "EduOrderTicketList",
    mixins: [EduListMixin],
    components: {
      VeJwJingsaiBaomingModal,
    },
    data() {
      return {
        description: 've_jw_jingsai_baoming管理页面',
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
          //   title:'项目Id',
          //   align:"center",
          //   dataIndex: 'projectid'
          // },
          // {
          //   title:'学生的stuId',
          //   align:"center",
          //   dataIndex: 'stuid'
          // },
          {
            title:'学生姓名',
            align:"center",
            dataIndex: 'username'
          },
          // {
          //   title:'组Id',
          //   align:"center",
          //   dataIndex: 'groupid'
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
          list: "/edu-schedule/jingsaiProject/veJwJingsaiBaoming/list",
          delete: "/edu-schedule/jingsaiProject/veJwJingsaiBaoming/delete",
          deleteBatch: "/edu-schedule/jingsaiProject/veJwJingsaiBaoming/deleteBatch",
          exportXlsUrl: "/edu-schedule/jingsaiProject/veJwJingsaiBaoming/exportXls",
          importExcelUrl: "jingsaiProject/veJwJingsaiBaoming/importExcel",
        },
        dictOptions:{},
        isorter: []
      }
    },
    methods: {

      // clearSelectedDepartKeys() {
      //   this.checkedKeys = [];
      //   this.selectedKeys = [];
      //   this.currentDeptId = '';
      //   this.$refs.DeptUserInfo.currentDeptId='';
      //   this.$refs.DeptRoleInfo.currentDeptId='';
      // },
      // handleOpen(record) {
      //   this.rightcolval = 1
      //   this.selectedRowKeys1 = [record.id]
      //   this.model1 = Object.assign({}, record)
      //   this.currentRoleId = record.id
      //   this.onClearSelected2()
      //   this.loadData2()
      // },
    },

  }
</script>
<style scoped>

</style>