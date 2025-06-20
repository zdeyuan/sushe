<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="7" :lg="7" :md="8" :sm="24">
            <a-form-item label="名称">
              <a-input placeholder="请输入名称" v-model="queryParam.jsmc"></a-input>
            </a-form-item>
          </a-col>

          <a-col :xl="7" :lg="7" :md="8" :sm="24">
            <a-form-item label="状态">
              <j-dict-select-tag v-model="queryParam.status" placeholder="请选择状态" dict-code="classroom_status" />
            </a-form-item>
          </a-col>

          <a-col :xl="7" :lg="7" :md="8" :sm="24">
            <a-form-item label="校区" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <!-- <a-input-number v-decorator="[ 'campusid', validatorRules.campusid]" placeholder="请选择校区" style="width: 100%"/> -->
<!--              <j-dict-select-tag-->
<!--                :disabled="check"-->
<!--                v-decorator="['campusid']"-->
<!--                v-model="queryParam.campusid"-->
<!--                placeholder="请选择校区"-->
<!--                dictCode="edu_dev.ve_jw_xiaoqu,XQMC,id"-->
<!--              ></j-dict-select-tag>-->
                <j-select-xiaoqu v-model="queryParam.campusid" placeholder="请选择校区"></j-select-xiaoqu>


            </a-form-item>
          </a-col>

          <a-col :xl="7" :lg="7" :md="8" :sm="24">
            <a-form-item label="类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <!-- <a-input-number v-decorator="[ 'campusid', validatorRules.campusid]" placeholder="请选择校区" style="width: 100%"/> -->
              <j-dict-select-tag
                :disabled="check"
                v-decorator="['jslxdm']"
                v-model="queryParam.jslxdm"
                placeholder="请选择教室类型"
                dictCode="jslxdm"
              ></j-dict-select-tag>
            </a-form-item>
          </a-col>

          <a-col :xl="7" :lg="7" :md="8" :sm="24">
            <span style="float: left; overflow: hidden" class="table-page-search-submitButtons">
			   <a-button @click="searchQuery" type="primary" icon="search" style="margin-right: 10px;">搜索</a-button>
			   <a-button @click="searchReset" type="danger" icon="delete" style="margin-right: 10px;">清除</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <!-- 查询区域-END -->

    <!-- 操作按钮区域 -->
    <div class="table-operator">
		
	  <a-button @click="handleAdd" type="primary" icon="plus" style="margin-right: 10px;">添加</a-button>
	  <a-button @click="batchAble" type="primary" icon="check-circle" style="margin-right: 10px;">启用</a-button>
	  <a-button @click="batchDisable" type="danger" icon="stop" style="margin-right: 10px;">禁用</a-button>	
	  <a-button @click="searchQuery" type="primary" icon="sync" style="margin-right: 10px;">刷新</a-button>
	  <a-button type="primary" icon="download" @click="handleExportXls('教室信息表')">导出</a-button>
	   <a-upload
		 name="file"
		 :showUploadList="false"
		  :multiple="false"
		  :headers="tokenHeader"
		  :action="url.importExcelUrl"
		 @change="handleImportExcel"
	   >
		 <a-button type="primary" icon="import">导入</a-button>
		</a-upload>
<!--      <edu-button @click="handleAdd" type="primary" icon="plus" title="添加"></edu-button>
      <edu-button
        title="启用"
        @click="batchAble"
        type="4"
        icon="check-circle"
      ></edu-button>

      <edu-button
        title="禁用"
        @click="batchDisable"
        type="8"
        icon="close-circle"
      ></edu-button>
      <edu-button type="1" @click="searchQuery" icon="sync" title="刷新"></edu-button>
<!--      <a-button type="primary" icon="download" @click="handleExportXls('教室信息表')">导出</a-button>-->
<!--      <a-upload-->
<!--        name="file"-->
<!--        :showUploadList="false"-->
<!--        :multiple="false"-->
<!--        :headers="tokenHeader"-->
<!--        :action="importExcelUrl"-->
<!--        @change="handleImportExcel"-->
<!--      >-->
<!--        <a-button type="primary" icon="import">导入</a-button>-->
<!--      </a-upload>-->
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
	  <a-button type="danger" @click="delteIds" style="margin-right: 10px;">批量删除</a-button>
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
        :rowSelection="{ fixed: true, selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
        @change="handleTableChange"
      >
        <template slot="htmlSlot" slot-scope="text">
          <div v-html="text"></div>
        </template>
        <template slot="imgSlot" slot-scope="text">
          <span v-if="!text" style="font-size: 12px; font-style: italic">无此图片</span>
          <img
            v-else
            :src="getImgView(text)"
            height="25px"
            alt="图片不存在"
            style="max-width: 80px; font-size: 12px; font-style: italic"
          />
        </template>
        <template slot="fileSlot" slot-scope="text">
          <span v-if="!text" style="font-size: 12px; font-style: italic">无此文件</span>
          <a-button v-else :ghost="true" type="primary" icon="download" size="small" @click="uploadFile(text)">
            下载
          </a-button>
        </template>

        <span slot="action" slot-scope="text, record">
           <!-- <edu-label-button @click="handleEdit(record)" type="3" title="编辑"></edu-label-button>

          <a-divider type="vertical"/>
          <edu-delete-button @click="handleDelete(record.id)" type="4" title="删除"></edu-delete-button> -->
		  <a @click="handleEdit(record)" >编辑</a>
		  <a-divider type="vertical"/>
		  <a @click="handleDelete(record.id)" >删除</a>
<!--          <a-dropdown>-->
<!--            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>-->
<!--            <a-menu slot="overlay">-->
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

    <jwJiaoshi-modal ref="modalForm" @ok="modalFormOk"></jwJiaoshi-modal>
  </a-card>
</template>

<script>
import '@/assets/scss/usercolor.scss';
import JwJiaoshiModal from './modules/JwJiaoshiModal'
import JDictSelectTag from '@/components/dict/JDictSelectTag.vue'
// import { EduListMixin } from '@/mixins/EduListMixin'
import { EduListMixin } from '@/mixins/KwglMixin'
import { getAction } from '@/api/common/manage'
import { formatDate } from '@/utils/util'
import JSelectXiaoqu from '@/components/kwglbiz/JSelectXiaoqu'

export default {
  name: 'JwJiaoshiList',
  mixins: [EduListMixin],
  components: {
    JSelectXiaoqu,
    JDictSelectTag,
    JwJiaoshiModal,
  },
  data() {
    return {
      description: '教室信息表管理页面',
      // 表头
      columns: [
        {
          title: '名称',
          align: 'center',
          dataIndex: 'jsmc',
        },
        {
          title: '所属校区',
          align: 'center',
          dataIndex: 'campusidName',
        },
        {
          title: '教学楼',
          align: 'center',
          dataIndex: 'jzid_dictText',
        },

        {
          title: '实际容量',
          align: 'center',
          dataIndex: 'sjrl',
        },
        {
          title: '最大排课量',
          align: 'center',
          dataIndex: 'zdpkrl',
        },
        {
          title: '网络状态',
          align: 'center',
          dataIndex: 'wlzt_dictText',
        },
        {
          title: '多媒体教室',
          align: 'center',
          dataIndex: 'sfdmtjs_dictText',
        },
        {
          title: '考试可用',
          align: 'center',
          dataIndex: 'isforexam_dictText',
        },

        {
          title: '状态',
          align: 'center',
          dataIndex: 'status_dictText',
        },

        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          scopedSlots: { customRender: 'action' },
        },
      ],
      url: {
        list: '/jxzy/jwJiaoshi/list',
        delete: '/jxzy/jwJiaoshi/delete',
        deleteBatch: '/jxzy/jwJiaoshi/deleteBatch',
        exportXlsUrl: '/jxzy/jwJiaoshi/exportXls',
        importExcelUrl: process.env.VUE_APP_API_BASE_URL+'/jxzy/jwJiaoshi/importExcel',
        updateStatusBatch: '/jxzy/jwJiaoshi/updateStatusBatch',
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

    //批量禁用
    batchDisable: function () {
      if (!this.url.updateStatusBatch) {
        this.$message.error('请设置url.updateStatusBatch属性!')
        return
      }
      if (this.selectedRowKeys.length <= 0) {
        this.$message.warning('请选择一条记录！')
        return
      } else {
        var ids = ''
        for (var a = 0; a < this.selectedRowKeys.length; a++) {
          ids += this.selectedRowKeys[a] + ','
        }
        var that = this
        this.$confirm({
          title: '确认禁用',
          content: '是否禁用选中数据?',
		  okText: '确认',
		  cancelText:'取消',
          onOk: function () {
            that.loading = true
            getAction(that.url.updateStatusBatch, { ids: ids, status: 0 })
              .then((res) => {
                if (res.success) {
                  that.$message.success(res.message)
                  that.loadData()
                  that.onClearSelected()
                } else {
                  that.$message.warning(res.message)
                }
              })
              .finally(() => {
                that.loading = false
              })
          },
        })
      }
    },
    //批量启用
    batchAble: function () {
      if (!this.url.updateStatusBatch) {
        this.$message.error('请设置url.updateStatusBatch属性!')
        return
      }
      if (this.selectedRowKeys.length <= 0) {
        this.$message.warning('请选择一条记录！')
        return
      } else {
        var ids = ''
        for (var a = 0; a < this.selectedRowKeys.length; a++) {
          ids += this.selectedRowKeys[a] + ','
        }
        var that = this
        this.$confirm({
          title: '确认启用',
          content: '是否启用选中数据?',
		  okText: '确认',
		  cancelText:'取消',
          onOk: function () {
            that.loading = true
            getAction(that.url.updateStatusBatch, { ids: ids, status: 1 })
              .then((res) => {
                if (res.success) {
                  that.$message.success(res.message)
                  that.loadData()
                  that.onClearSelected()
                } else {
                  that.$message.warning(res.message)
                }
              })
              .finally(() => {
                that.loading = false
              })
          },
        })
      }
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
				 then.$http.delete(then.$http.baseServer + '/jxzy/jwJiaoshi/deleteBatch?ids=' + ids,{}).then(res => {
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
