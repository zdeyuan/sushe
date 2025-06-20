<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper" >
      <div>
        <a-form layout="inline">
          <a-row :gutter="24">
              <a-form-item label="仓库名">
                <a-input placeholder="请输入仓库名" v-model="queryParam.name"></a-input>
              </a-form-item>
              <span  class="table-page-search-submitButtons">
				<a-button @click="searchQuery" type="primary" icon="search" style="margin-right: 10px;">搜索</a-button>
				<a-button @click="searchReset" type="danger" icon="delete" style="margin-right: 10px;">清除</a-button>
              </span>
          </a-row>
		  <a-row style="margin-bottom:10px;">
			  <a-button @click="handleAdd" type="primary" icon="plus" style="margin-right: 10px;">添加</a-button>
			  <a-button @click="searchQuery" type="primary" icon="sync" style="margin-right: 10px;">刷新</a-button>	
			  <a-button type="danger" @click="delteIds" style="margin-right: 10px;">批量删除</a-button>
		  </a-row>
        </a-form>
      </div>
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
        :dataSource="showDataSource"
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
          <!--          <a-dropdown>-->
          <!--            <a class="ant-dropdown-link">-->
          <!--              更多 <a-icon type="down"/>-->
          <!--            </a>-->
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
    <jw-cangku-modal ref="modalForm" @ok="modalFormOk"></jw-cangku-modal>
  </a-card>
</template>

<script>
import '@/assets/scss/usercolor.scss';
// import { EduListMixin } from '@/mixins/EduListMixin'
import { EduListMixin } from '@/mixins/KwglMixin'
import { getAction } from '@/api/common/manage'
import JwCangkuModal from './modules/JwCangkuModal'
import { formatDate, filterObj } from '@/utils/util'

export default {
  name: 'JwCangkuList',
  mixins: [EduListMixin],
  components: {
    JwCangkuModal,
  },
  data() {
    return {
      description: '教材仓库表管理页面',
      // 表头
      columns: [
        {
          title: '#',
          dataIndex: '',
          key: 'rowIndex',
          width: 60,
          align: 'center',
          customRender: function (t, r, index) {
            return parseInt(index) + 1
          },
        },
        {
          title: '仓库名称',
          align: 'center',
          dataIndex: 'name',
        },
        {
          title: '仓库位置',
          align: 'center',
          dataIndex: 'location',
        },
        {
          title: '校区',
          align: 'center',
          dataIndex: 'campusidName',
        },
        // {
        //   title: '创建人',
        //   align: 'center',
        //   dataIndex: 'createuseridName',
        // },
        {
          title: '创建时间',
          align: 'center',
          dataIndex: 'createtime',
          customRender: function (t) {
            return t ? formatDate(t * 1000, 'yyyy-MM-dd hh:mm:ss') : ''
          },
        },
        // {
        //   title: '终端Id',
        //   align: 'center',
        //   dataIndex: 'terminalid'
        // },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          scopedSlots: { customRender: 'action' },
        },
      ],
      url: {
        list: '/jxzy/jwCangku/list',
        delete: '/jxzy/jwCangku/delete',
        deleteBatch: '/jxzy/jwCangku/deleteBatch',
        exportXlsUrl: '/jxzy/jwCangku/exportXls',
        importExcelUrl: 'jxzy/jwCangku/importExcel',
      },
      dictOptions: {},
      superFieldList: [],
      isorter: [],
    }
  },
  methods: {
    //时间格式化工具类
    simpleDateFormat(millisecond, format) {
      return formatDate(millisecond, format)
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
				 then.$http.delete(then.$http.baseServer + '/jxzy/jwCangku/deleteBatch?ids=' + ids,{}).then(res => {
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
  },
}
</script>
