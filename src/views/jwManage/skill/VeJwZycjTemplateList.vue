<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">

            <a-form-item label="模板名称">
              <a-input placeholder="请输入模板名称" v-model="queryParam.name"></a-input>
            </a-form-item>
            <span  class="table-page-search-submitButtons">
              <a-button @click="searchQuery" type="primary" icon="search" style="margin-right: 10px;">搜索</a-button>
              <a-button @click="searchReset" type="danger" icon="delete" style="margin-right: 10px;">清除</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator" :md="24" :sm="24" style="margin: 0px 0px 10px 2px">
	  <a-button @click="handleAdd" type="primary" icon="plus" style="margin-right: 10px;">添加</a-button>
	  <a-button @click="searchQuery" type="primary" icon="sync" style="margin-right: 10px;">刷新</a-button>	
	  <a-button type="danger" @click="delteIds" style="margin-right: 10px;">批量删除</a-button>
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
<!--          <a @click="handleEdit(record)">编辑</a>-->
<!--          <a-divider type="vertical"/>-->
<!--          <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">-->
<!--          <a>删除</a>-->
<!--          </a-popconfirm>-->
           <a @click="handleEdit(record)" type="3" title="编辑">编辑</a>
          <a-divider type="vertical"/>
          <a @click="handleDelete(record.id)" type="4" title="删除">删除</a>
<!--          <a-dropdown>-->
<!--          <a class="ant-dropdown-link">-->
<!--          更多 <a-icon type="down"/>-->
<!--          </a>-->
<!--          <a-menu slot="overlay">-->
<!--          &lt;!&ndash;<a-menu-item>&ndash;&gt;-->
<!--          &lt;!&ndash;<a href="javascript:;" @click="handleDetail(record)">详情</a>&ndash;&gt;-->
<!--          &lt;!&ndash;</a-menu-item>&ndash;&gt;-->

<!--          <a-menu-item>-->
<!--          -->
<!--          </a-menu-item>-->
<!--          </a-menu>-->
<!--          </a-dropdown>-->
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <veJwZycjTemplate-modal ref="modalForm" @ok="modalFormOk"></veJwZycjTemplate-modal>
  </a-card>
</template>

<script>
  import {EduListMixin} from '@/mixins/EduListMixin'
  import {getAction} from '@/api/common/manage'
  import VeJwZycjTemplateModal from './modules/VeJwZycjTemplateModal'
  import { formatDate } from '@/utils/util'

  export default {
    name: "EduOrderTicketList",
    mixins: [EduListMixin],
    components: {
      VeJwZycjTemplateModal,
    },
    data() {
      return {
        description: 've_jw_zycj_template管理页面',
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
            title:'职业认证考试',
            align:"center",
            dataIndex: 'zyksid_dictText'
          },
          {
            title:'模板名称',
            align:"center",
            dataIndex: 'name'
          },
          // {
          //   title:'图片ID',
          //   align:"center",
          //   dataIndex: 'fileid'
          // },
          // {
          //   title:'打印代码',
          //   align:"center",
          //   dataIndex: 'codetidText'
          // },
          {
            title:'状态',
            align:"center",
            dataIndex: 'status_dictText'
          },
          // {
          //   title:'模板类型(zycj=职业认证成绩)',
          //   align:"center",
          //   dataIndex: 'type'
          // },
          {
            title:'创建时间',
            align:"center",
            dataIndex: 'createtime',
            customRender: function(text,row,index) {
              return (row.createtime ? formatDate(row.createtime * 1000, 'yyyy-MM-dd') : '')
            }
          },
          // {
          //   title:'创建用户ID',
          //   align:"center",
          //   dataIndex: 'createuserid'
          // },
          // {
          //   title:'终端系统ID',
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
          list: "/edu-schedule/jingsaiProject/veJwZycjTemplate/list",
          delete: "/edu-schedule/jingsaiProject/veJwZycjTemplate/delete",
          deleteBatch: "/edu-schedule/jingsaiProject/veJwZycjTemplate/deleteBatch",
          exportXlsUrl: "/edu-schedule/jingsaiProject/veJwZycjTemplate/exportXls",
          importExcelUrl: "jingsaiProject/veJwZycjTemplate/importExcel",
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
					 then.$http.delete(then.$http.baseServer + '/edu-schedule/jingsaiProject/veJwZycjTemplate/deleteBatch?ids=' + ids,{}).then(res => {
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
<style scoped>
  
</style>