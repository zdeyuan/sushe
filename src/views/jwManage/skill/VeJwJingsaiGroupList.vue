<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">

            <a-form-item label="项目名称">
              <a-input placeholder="请输入项目名称" v-model="queryParam.name"></a-input>
            </a-form-item>
            <a-form-item label="项目类别">
              <j-dict-select-tag  v-model="queryParam.jsle" placeholder="请选择项目类型"
                                  dictCode="jslb"  ></j-dict-select-tag>
            </a-form-item>
            <span  class="table-page-search-submitButtons">
                 <a-button @click="searchQuery" type="primary" icon="search" style="margin-right: 10px;">搜索</a-button>
                 <a-button @click="searchReset" type="danger" icon="delete" style="margin-right: 10px;">清除</a-button>
            </span>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator" :md="8" :sm="8" style="margin: 0px 0px 10px 2px">
      
	  <a-button @click="handleAdd" type="primary" icon="plus" style="margin-right: 10px;">新增团队</a-button>
	  <a-button @click="searchQuery" type="primary" icon="sync" style="margin-right: 10px;">刷新</a-button>	
	  <a-button type="danger" @click="delteIds" style="margin-right: 10px;">批量删除</a-button>
	  
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
        :dataSource="showDataSource"
        :pagination="ipagination"
        :loading="loading"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a type="3" @click="handleEdit(record)" title="编辑">编辑</a>
          <a-divider type="vertical"/>
          <a type="2" @click="checkGroupInfo(record)" title="查看名单">查看名单</a>
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
    <ve-jw-jingsai-Group-modal ref="modalForm" @ok="modalFormOK"></ve-jw-jingsai-Group-modal>
    <VeJwJingsaiGroupinfoModal ref="infoModalForm" @ok="modalFormOK"></VeJwJingsaiGroupinfoModal>
  </a-card>
</template>

<script>
  // import {EduListMixin} from '@/mixins/EduListMixin'
  import {EduListMixin} from '@/mixins/KwglMixin'
  import {getAction} from '@/api/common/manage'
  import VeJwJingsaiGroupModal from './modules/VeJwJingsaiGroupModal'
  import { formatDate } from '@/utils/util'
  import VeJwJingsaiGroupinfoModal from './modules/VeJwJingsaiGroupinfoModal'
  export default {
    name: "EduOrderTicketList",
    mixins: [EduListMixin],
    components: {
      VeJwJingsaiGroupinfoModal,
      VeJwJingsaiGroupModal,
    },
    data() {
      return {
        description: 've_jw_jingsai_group管理页面',
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
            title:'团队名称',
            align:"center",
            dataIndex: 'name'
          },
          // {
          //   title:'所属项目Id',
          //   align:"center",
          //   dataIndex: 'projectid'
          // },
          {
            title:'报名时间',
            align:"center",
            dataIndex: 'createtime',
            customRender: function(text,row,index) {
              return (row.createtime ? formatDate(row.createtime * 1000, 'yyyy-MM-dd hh:mm:ss') : '')
            }
          },
          {
            title:'项目名称',
            align:"center",
            dataIndex: 'projectid_dictText'
          },
          {
            title:'指导教师',
            align:"center",
            dataIndex: 'teacheridName'
          },
          // {
          //   title:'终端Id',
          //   align:"center",
          //   dataIndex: 'terminalid'
          // },
          // {
          //   title:'竞赛时间',
          //   align:"center",
          //   dataIndex: 'jstime',
          //   customRender: function(text,row,index) {
          //     return (row.jstime ? formatDate(row.jstime * 1000, 'yyyy-MM-dd') : '')
          //   }
          // },
          {
            title:'竞赛时间',
            align:"center",
            dataIndex: 'project.jsbegindate',
            customRender: function(text,row,index) {
              return (row.project.jsbegindate ? formatDate(row.project.jsbegindate * 1000, 'yyyy-MM-dd') : '') + "至"+ (row.project.jsenddate ? formatDate(row.project.jsenddate * 1000, 'yyyy-MM-dd') : '')
            }
          },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' }
          }
        ],
        url: {
          list: "/edu-schedule/jingsaiProject/veJwJingsaiGroup/list?xmtype=2",
          delete: "/edu-schedule/jingsaiProject/veJwJingsaiGroup/delete",
          deleteBatch: "/edu-schedule/jingsaiProject/veJwJingsaiGroup/deleteBatch",
          exportXlsUrl: "/edu-schedule/jingsaiProject/veJwJingsaiGroup/exportXls",
          importExcelUrl: "jingsaiProject/veJwJingsaiGroup/importExcel",
        },
        dictOptions:{},
        isorter: []
      }
    },
    methods: {
      modalFormOK(){
        console.log("modalFormOK");
        this.searchQuery();
      },
      //团队报名-查看名单
      checkGroupInfo:function(record){
        this.$refs.infoModalForm.select(record);
        this.$refs.infoModalForm.title="查看名单";
        this.$refs.infoModalForm.disableSubmit=false;
      },
	  
	  delteIds() {
	  	if (this.selectedRowKeys.length == 0) {
	  		this.$message.warning("请先选择信息");
	  		return
	  	}
	  	var then = this
	  	this.$confirm({
	  		title: '是否删除',
	  		content: '是否删除这些数据',
	  		okText: '确认',
	  		cancelText:'取消',
	  		onOk() {
	  			let ids = ''
	  			for (let i = 0; i < then.selectedRowKeys.length; i++) {
	  				if (i == 0) {
	  					ids += then.selectedRowKeys[i]
	  				} else {
	  					ids += ',' + then.selectedRowKeys[i]
	  				}
	  			}
	  				console.log(then.$http,'then.$http?????????')
	  			 then.$http.delete(then.$http.baseServer + '/edu-schedule/jingsaiProject/veJwJingsaiGroup/deleteBatch?ids=' + ids,{}).then(res => {
	  				then.selectedRowKeys = []
	  				if (res.code == 200) {
	  					then.searchReset()
	  				}
	  			
	  			}).catch(err => {
	  				then.$message.warning("获取年级失败");
	  			})
	  		},
	  		onCancel() {},
	  	});
	  },

    }
  }
</script>


<style lang="less" scoped>
 /deep/ .ant-form-item-control{
	  width:100%!important;
  }
</style>