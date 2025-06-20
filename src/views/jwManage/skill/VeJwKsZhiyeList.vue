<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">
            <a-form-item label="项目名称">
              <a-input placeholder="请输入项目名" v-model="queryParam.name"></a-input>
            </a-form-item>
            <span class="table-page-search-submitButtons">
                <a-button @click="searchQuery" type="primary" icon="search" style="margin-right: 10px;">搜索</a-button>
                <a-button @click="searchReset" type="danger" icon="delete" style="margin-right: 10px;">清除</a-button>
            </span>
        </a-row>
		<div class="table-operator" :md="24" :sm="24" style="margin: 0px 0px 10px 2px">
					
					<a-button @click="handleAdd" type="primary" icon="plus" style="margin-right: 10px;">添加</a-button>
					<a-button @click="searchQuery" type="primary" icon="sync" style="margin-right: 10px;">刷新</a-button>	
					<a-button type="danger" @click="delteIds" style="margin-right: 10px;">批量删除</a-button>
		</div>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->


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
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <veJwKsZhiye-modal ref="modalForm" @ok="modalFormOk"></veJwKsZhiye-modal>
  </a-card>
</template>

<script>
  import {EduListMixin} from '@/mixins/EduListMixin'
  import {getAction} from '@/api/common/manage'
  import VeJwKsZhiyeModal from './modules/VeJwKsZhiyeModal'

  export default {
    name: "EduOrderTicketList",
    mixins: [EduListMixin],
    components: {
      VeJwKsZhiyeModal,
    },
    data() {
      return {
        description: 've_jw_ks_zhiye管理页面',
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
            title:'考试名称',
            align:"center",
            dataIndex: 'name'
          },
          {
            title:'证书',
            align:"center",
            dataIndex: 'ishascert_dictText'
          },
          {
            title:'等级',
            align:"center",
            dataIndex: 'zyrzdj_dictText'
          },
          {
            title:'证书名称',
            align:"center",
            dataIndex: 'zsmc'
          },

          {
            title:'颁证单位',
            align:"center",
            dataIndex: 'bzdw'
          },
          // {
          //   title:'职业考试介绍的大文本ID',
          //   align:"center",
          //   dataIndex: 'desctid'
          // },
          {
            title:'状态',
            align:"center",
            dataIndex: 'status_dictText'
          },
          // {
          //   title:'创建时间',
          //   align:"center",
          //   dataIndex: 'createtime'
          // },
          // {
          //   title:'创建人ID',
          //   align:"center",
          //   dataIndex: 'createuserid'
          // },
          // {
          //   title:'审核状态（0=待审核，1=通过，2=不通过）',
          //   align:"center",
          //   dataIndex: 'auditstatus'
          // },
          // {
          //   title:'审核用户ID',
          //   align:"center",
          //   dataIndex: 'audituserid'
          // },
          // {
          //   title:'审核时间',
          //   align:"center",
          //   dataIndex: 'audittime'
          // },
          // {
          //   title:'审核不通过的原因 文本ID',
          //   align:"center",
          //   dataIndex: 'audittid'
          // },
          // {
          //   title:'文本',
          //   align:"center",
          //   dataIndex: 'desct'
          // },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' }
          }
        ],
        url: {
          list: "/edu-schedule/jingsaiProject/veJwKsZhiye/list",
          delete: "/edu-schedule/jingsaiProject/veJwKsZhiye/delete",
          deleteBatch: "/edu-schedule/jingsaiProject/veJwKsZhiye/deleteBatch",
          exportXlsUrl: "/edu-schedule/jingsaiProject/veJwKsZhiye/exportXls",
          importExcelUrl: "jingsaiProject/veJwKsZhiye/importExcel",
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
					 then.$http.delete(then.$http.baseServer + '/edu-schedule/jingsaiProject/veJwKsZhiye/deleteBatch?ids=' + ids,{}).then(res => {
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