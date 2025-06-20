<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">
          <a-col :md="6" :sm="24">
            <!-- 操作按钮区域 -->
<!--            <div class="table-operator" :md="24" :sm="24" style="margin: -25px 0px 10px 2px">-->
              <!-- <edu-button @click="order" type="primary" icon="shopping-cart" title="采购"></edu-button>
              <edu-button type="1" @click="searchQuery" icon="sync" title="刷新"></edu-button> -->
			  
			  <a-button @click="order" type="primary" icon="plus" style="margin-right: 10px;">采购</a-button>
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
<!--            </div>-->
          </a-col>
          <a-col :md="6" :sm="24">
            <a-form-item label="教材代码">
              <a-input v-model="queryParam.jcdm" placeholder="请输入教材代码"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="24">
            <a-form-item label="教材名称">
              <a-input v-model="queryParam.jcmc"  placeholder="请输入教材名称"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="7" :lg="7" :md="8" :sm="24">
            <a-form-item label="状态">
              <j-dict-select-tag v-model="queryParam.status" placeholder="请选择" dict-code="inventory_state" />
            </a-form-item>
          </a-col>
          <a-col :md="4" :sm="24">
            <span style="float: left; overflow: hidden; margin: 5px 0;" class="table-page-search-submitButtons">
              <!-- <edu-button type="5" @click="searchQuery" icon="search" title="搜索" style="margin-bottom: 0"></edu-button>
			  <edu-button type="7" @click="searchReset" icon="delete" title="清除" style="margin-bottom: 0"></edu-button> -->
			  <a-button @click="searchQuery" type="primary" icon="search" style="margin-right: 10px;">搜索</a-button>
			  <a-button @click="searchReset" type="danger" icon="delete" style="margin-right: 10px;">清除</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
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
		  <a @click="handleEdit(record)" >编辑</a>
		  <a-divider type="vertical" v-show="record.status == 0"/>
		  <a @click="jcorderImport(record.id)" >入库</a>	
		  <a-divider type="vertical" />
		  <a @click="handleDelete(record.id)" >删除</a>	
<!--         <edu-label-button type="2" @click="handleEdit(record)" title="编辑"></edu-label-button>
          <a-divider type="vertical" v-show="record.status == 0" />
          <edu-label-button type="3" @click="jcorderImport(record.id)" v-show="record.status == 0" title="入库"></edu-label-button>
          <a-divider type="vertical" />
          <edu-delete-button @click="handleDelete(record.id)" type="4" title="删除"></edu-delete-button> -->
<!--          <a-dropdown>-->
<!--            <a class="ant-dropdown-link"> 更多 <a-icon type="down" /> </a>-->
<!--            <a-menu slot="overlay">-->
<!--              &lt;!&ndash; <a-menu-item>-->
<!--                <a href="javascript:;" @click="handleDetail(record)">详情</a>-->
<!--              </a-menu-item> &ndash;&gt;-->
<!--              <a-menu-item>-->
<!--                <a @click="jcorderImport(record.id)" v-show="record.status == 0">入库</a>-->
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
    <jw-jiaocai-order-modal ref="modalForm" @ok="modalFormOk"></jw-jiaocai-order-modal>
  </a-card>
</template>

<script>
import '@/assets/scss/usercolor.scss';
import { EduListMixin } from '@/mixins/KwglMixin'
import { getAction } from '@/api/common/manage'
import JwJiaocaiOrderModal from './modules/JwJiaocaiOrderModal.vue'
import { formatDate } from '@/utils/util'
import moment from 'moment'
export default {
  name: 'JwJiaocaiOrderList',
  mixins: [EduListMixin],
  components: {
    JwJiaocaiOrderModal,
  },
  data() {
    return {
      description: '教材订单表管理页面',
      // 表头
      columns: [
        {
          title: '订单号',
          align: 'center',
          dataIndex: 'orderid',
        },
        {
          title: '教材名称',
          align: 'center',
          dataIndex: 'jcid_dictText',
        },

        {
          title: '采购价格',
          align: 'center',
          dataIndex: 'price',
        },
        {
          title: '采购数量',
          align: 'center',
          dataIndex: 'num',
        },
        {
          title: '采购对象',
          align: 'center',
          dataIndex: 'buyobj',
        },
        {
          title: '联系人',
          align: 'center',
          dataIndex: 'contact',
        },
        {
          title: '联系电话',
          align: 'center',
          dataIndex: 'contacttel',
        },

        {
          title: '订购时间',
          align: 'center',
          dataIndex: 'addtime',
		  customRender: (text) => {
			  return  moment(text * 1000).format('YYYY-MM-DD HH:mm:ss')
			},
        },
        {
          title: '是否入库',
          align: 'center',
          dataIndex: 'status_dictText',
        },
        {
          title: '操作',
          dataIndex: 'action',
          width:190,
          align: 'center',
          scopedSlots: { customRender: 'action' },
        },
      ],
      url: {
        list: '/jxzy/jwJiaocaiOrder/list',
        delete: '/jxzy/jwJiaocaiOrder/delete',
        deleteBatch: '/jxzy/jwJiaocaiOrder/deleteBatch',
        exportXlsUrl: '/jxzy/jwJiaocaiOrder/exportXls',
        importExcelUrl: 'jxzy/jwJiaocaiOrder/importExcel',
        orderImport: '/jxzy/jwJiaocaiOrder/orderImport',
      },
      dictOptions: {},
      superFieldList: [],
      isorter: [],
    }
  },
  methods: {
    order: function () {
      this.$refs.modalForm.add()
      this.$refs.modalForm.title = '采购'
      this.$refs.modalForm.disableSubmit = false
      this.$refs.modalForm.editFlag = false
    },

    //教材订单-入库操作
    jcorderImport: function (id) {
      if (!this.url.orderImport) {
        this.$message.error("请设置url.orderImport属性!")
        return
      }
      var that = this;
      getAction(that.url.orderImport, { id: id }).then((res) => {
        if (res.success) {
          that.$message.success(res.message);
          that.loadData();
        } else {
          that.$message.warning(res.message);
        }
      });
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
				 then.$http.delete(then.$http.baseServer + '/jxzy/jwJiaocaiOrder/deleteBatch?ids=' + ids,{}).then(res => {
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
	
	
	jiaocaihandleDelete(id){
		var then = this
		this.$confirm({
			title: '是否删除',
			content: '是否删除这些数据',
			okText: '确认',
			cancelText:'取消',
			onOk() {
				 then.$http.delete(then.$http.baseServer + '/jxzy/jwJiaocaiOrder/deleteBatch?ids=' + id,{}).then(res => {
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
	}


  },
}
</script>
