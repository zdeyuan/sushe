<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">
          <a-col :md="6" :sm="24">
            <a-form-item label="教材代码">
              <a-input v-model="queryParam.jcid" placeholder="请输入教材代码"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="24">
            <a-form-item label="教材名称">
              <a-input v-model="queryParam.jcmc"  placeholder="请输入教材名称"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="24">
            <a-form-item label="第一作者">
              <a-input v-model="queryParam.dyzz"  placeholder="请输入第一作者"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="24">
            <a-form-item label="出版社">
              <a-input v-model="queryParam.cbs"  placeholder="请输入出版社"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="24">
            <a-form-item label="ISBN">
              <a-input v-model="queryParam.isbn"  placeholder="请输入ISBN"></a-input>
            </a-form-item>
          </a-col>

          <a-col :md="6" :sm="24">
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
    <div class="table-operator">
<!--      <a-button @click="addMaterial" type="primary" icon="plus">添加</a-button>-->
<!--      <edu-button @click="addMaterial" type="primary" icon="plus" title="添加"></edu-button>
      <edu-button type="1" @click="searchQuery" icon="sync" title="刷新"></edu-button> -->
	  
	  <a-button @click="handleAdd" type="primary" icon="plus" style="margin-right: 10px;">添加</a-button>
	  <a-button @click="searchQuery" type="primary" icon="sync" style="margin-right: 10px;">刷新</a-button>	
	  <a-button type="danger" @click="delteIds" style="margin-right: 10px;">批量删除</a-button>
      <!-- <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDelConfirm">
            <edu-batch-delete-button ref="batchDelBtn" @del="batchDelAction" type="4"
                                     title="删除"></edu-batch-delete-button>
          </a-menu-item>
        </a-menu>
        <edu-button type="10" title="批量操作" icon="down" style="margin-bottom: 0px" rightIcon="true">
        </edu-button>
      </a-dropdown> -->
    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择
        <a style="font-weight: 600">{{ selectedRowKeys.length }}</a
        >项
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
        :rowSelection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
        @change="handleTableChange"
      >
        <span slot="action" slot-scope="text, record">
          <!-- <edu-label-button @click="handleEdit(record)" type="3" title="编辑"></edu-label-button>

          <a-divider type="vertical"/>
          <edu-delete-button @click="handleDelete(record.id)" type="4" title="删除"></edu-delete-button> -->
		  <a @click="handleEdit(record)" >编辑</a>
		  <a-divider type="vertical"/>
		  <a @click="handleDelete(record.id)" >删除</a>
<!--          <a @click="handleEdit(record)">编辑</a>-->
<!--          <a-divider type="vertical"/>-->
<!--          <a-dropdown>-->
<!--            <a class="ant-dropdown-link"> 更多 <a-icon type="down"/> </a>-->
<!--            <a-menu slot="overlay">-->
<!--              <a-menu-item>-->
<!--                <a href="javascript:;" @click="handleDetail(record)">详情</a>-->
<!--              </a-menu-item>-->

<!--              <a-menu-item>-->
<!--                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">-->
<!--                  <a>删除</a>-->
<!--                </a-popconfirm>-->
<!--              </a-menu-item>-->
<!--            </a-menu>-->
<!--          </a-dropdown>-->
        </span>
      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <jw-jiaocai-modal ref="modalForm" @ok="modalFormOk"></jw-jiaocai-modal>
  </a-card>
</template>

<script>
	import '@/assets/scss/usercolor.scss';
  import { EduListMixin } from '@/mixins/EduListMixin'
  import { getAction } from '@/api/common/manage'
  import { EduUtils } from '@/mixins/EduUtils'
  import JwJiaocaiModal from './modules/JwJiaocaiModal.vue'
  import { formatDate } from '@/utils/util'

  export default {
    name: 'JwJiaocaiList',
    mixins: [EduListMixin,EduUtils],
    components: {
      JwJiaocaiModal
    },
    data() {
      return {
        description: '教材信息表管理页面',
        // 表头
        columns: [
          // {
          //   title: '#',
          //   dataIndex: '',
          //   key:'rowIndex',
          //   width:60,
          //   align:"center",
          //   customRender:function (t,r,index) {
          //     return parseInt(index)+1;
          //   }
          // },
          {
            title: '教材代码',
            align: 'center',
            dataIndex: 'jcdm'
          },
          {
            title: '教材名称',
            align: 'center',
            dataIndex: 'jcmc'
          },
          {
            title: '适用课程',
            align: 'center',
            dataIndex: 'kcid_dictText'
          },
          {
            title: '教材类别',
            align: 'center',
            dataIndex: 'jclb',
            customRender: function(t, r, index) {
              return t==null || t == 0 ? '' : t==1 ? '校本教材':'通用教材'
            }

          },

          {
            title: 'ISBN',
            align: 'center',
            dataIndex: 'isbn'
          },
          {
            title: '第一作者',
            align: 'center',
            dataIndex: 'dyzz'
          },
          {
            title: '其他作者',
            align: 'center',
            dataIndex: 'qtzz'
          },
          {
            title: '版次',
            align: 'center',
            dataIndex: 'bc'
          },
          {
            title: '印次',
            align: 'center',
            dataIndex: 'yc'
          },
          {
            title: '价格',
            align: 'center',
            dataIndex: 'jg'
          },
          {
            title: '出版社',
            align: 'center',
            dataIndex: 'cbs'
          },
          {
            title: '练习册',
            align: 'center',
            dataIndex: 'sfylxc_dictText'
          },
          {
            title: '教参教辅',
            align: 'center',
            dataIndex: 'sfyjcjf_dictText'
          },
          {
            title: '状态',
            align: 'center',
            dataIndex: 'status_dictText'
          },
          {
            width:130,
            title: '操作',
            dataIndex: 'action',
            align: 'center',
            scopedSlots: { customRender: 'action' }
          }
        ],
        url: {
          list: '/jxzy/jwJiaocai/list',
          delete: '/jxzy/jwJiaocai/delete',
          deleteBatch: '/jxzy/jwJiaocai/deleteBatch',
          exportXlsUrl: '/jxzy/jwJiaocai/exportXls',
          importExcelUrl: 'jxzy/jwJiaocai/importExcel'
        },
        dictOptions: {},
        superFieldList: [],
        isorter: []
      }
    },
    methods: {
      addMaterial: function() {
        this.$refs.modalForm.add()
        this.$refs.modalForm.title = '添加教材'
        this.$refs.modalForm.disableSubmit = false
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
	  			 then.$http.delete(then.$http.baseServer + '/jxzy/jwJiaocai/deleteBatch?ids=' + ids,{}).then(res => {
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


