<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">
            <a-form-item label="项目名称">
              <a-input placeholder="请输入项目名" v-model="queryParam.name"></a-input>
            </a-form-item>
            <a-form-item label="项目类型">
              <j-dict-select-tag v-model="queryParam.xmtype" placeholder="请选择项目类型"
                                  dictCode="xmType"  ></j-dict-select-tag>
            </a-form-item>
            <span   class="table-page-search-submitButtons">
              <a-button @click="searchQuery" type="primary" icon="search" style="margin-right: 10px;">搜索</a-button>
              <a-button @click="searchReset" type="danger" icon="delete" style="margin-right: 10px;">清除</a-button>
            </span>
        </a-row>
      </a-form>
    </div>
    <!-- 操作按钮区域 -->
    <div class="table-operator" :md="24" :sm="24" style="margin: 0px 0px 10px 2px">
	  <a-button @click="handleAdd" type="primary" icon="plus" style="margin-right: 10px;">添加</a-button>
	  <a-button @click="batchState(1)" type="primary" icon="check-circle" style="margin-right: 10px;">启用</a-button>
	  <a-button @click="batchState(0)" type="danger" icon="stop" style="margin-right: 10px;">禁用</a-button>	
	  <a-button @click="searchQuery" type="primary" icon="sync" style="margin-right: 10px;">刷新</a-button>	
	  <a-button type="danger" @click="delteIds" style="margin-right: 10px;">批量删除</a-button>
	  
      <!-- <edu-button @click="handleAdd" type="3" icon="plus" title="添加"/> -->
<!--      <a-button style="float: right" @click="handleSubmit" type="primary" htmlType="button" icon="form">应用</a-button>-->

<!--      <edu-button
        title="启用"
        @click="batchState(1)"
        type="4"
        icon="check-circle"
      ></edu-button>

      <edu-button
        title="禁用"
        @click="batchState(0)"
        type="8"
        icon="close-circle"
      ></edu-button>

      <edu-button-delete type="7" ref="batchDelBtn" @del="batchDelAction" @click="batchDelConfirm" icon="delete" title="删除"></edu-button-delete>

      <edu-button type="1" @click="searchQuery" icon="sync" title="刷新"></edu-button> -->

<!--      <a-dropdown v-if="selectedRowKeys.length > 0">-->
<!--        <a-menu slot="overlay">-->
<!--          <a-menu-item key="1" @click="batchDel">-->
<!--            <a-icon type="check-circle"/>-->
<!--            启用-->
<!--          </a-menu-item>-->
<!--          <a-menu-item key="2" @click="batchDel">-->
<!--            <a-icon type="close-circle"/>-->
<!--            禁用-->
<!--          </a-menu-item>-->
<!--          <a-menu-item key="3" @click="batchDel">-->
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
          <a type="3" @click="handleEdit(record)" title="编辑">编辑</a>
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
    <VeJwJingsaiProjectModal ref="modalForm" @ok="modalFormOk"></VeJwJingsaiProjectModal>
  </a-card>
</template>

<script>
  import {EduListMixin} from '@/mixins/KwglMixin'
  import {getAction,putAction} from '@/api/common/manage'
  import VeJwJingsaiProjectModal from './modules/VeJwJingsaiProjectModal'
  import { formatDate } from '@/utils/util'

  export default {
    name: "EduOrderTicketList",
    mixins: [EduListMixin],
    components: {
      VeJwJingsaiProjectModal,
    },
    data() {
      return {
        description: 've_jw_jingsai_project管理页面',
        // 表头
        columns: [
          {
            title: '序号',
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

          // {
          //   title:'指导教师',
          //   align:"center",
          //   dataIndex: 'teacher'
          // },

          // {
          //   title:'是否启用0：不启用  1：启用',
          //   align:"center",
          //   dataIndex: 'status'
          // },
          {
            title:'报名时间',
            align:"center",
            dataIndex: 'begindate',
            customRender: function(text,row,index) {
              return (row.begindate ? formatDate(row.begindate * 1000, 'yyyy-MM-dd') : '') + "至"+ (row.enddate ? formatDate(row.enddate * 1000, 'yyyy-MM-dd') : '')
            }
          },
          // {
          //   title:'结束报名时间',
          //   align:"center",
          //   dataIndex: 'enddate'
          // },
          {
            title:'竞赛时间',
            align:"center",
            dataIndex: 'jsbegindate',
            customRender: function(text,row,index) {
              return (row.jsbegindate ? formatDate(row.jsbegindate * 1000, 'yyyy-MM-dd') : '') + "至"+ (row.jsenddate ? formatDate(row.jsenddate * 1000, 'yyyy-MM-dd') : '')
            }
          },
          {
            title:'状态',
            align:"center",
            dataIndex: 'status_dictText'
          },
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
          stateBatch: "/edu-schedule/jingsaiProject/veJwJingsaiProject/stateBatch",
          deleteBatch: "/edu-schedule/jingsaiProject/veJwJingsaiProject/deleteBatch",
          exportXlsUrl: "/edu-schedule/jingsaiProject/veJwJingsaiProject/exportXls",
          importExcelUrl: "jingsaiProject/veJwJingsaiProject/importExcel",
        },
        dictOptions:{},
        isorter: []
      }
    },
    methods: {
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
					 then.$http.delete(then.$http.baseServer + '/edu-schedule/jingsaiProject/veJwJingsaiProject/deleteBatch?ids=' + ids,{}).then(res => {
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