<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="7" :lg="7" :md="8" :sm="24">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="总结类型">
              <j-dict-select-tag
                :disabled="check"
                v-model="queryParam.gzzjlxid"
                dictCode="zjType"
				placeholder="请选择总结类型"
              ></j-dict-select-tag>
            </a-form-item>
          </a-col>

  <!--          <a-col :xl="7" :lg="7" :md="8" :sm="24">-->
  <!--            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="教师名称">-->
  <!--              <j-select-teacher v-model="queryParam.adduser":trigger-change="true"></j-select-teacher>-->
  <!--&lt;!&ndash;              <a-input v-model="queryParam.addusername"></a-input>&ndash;&gt;-->
  <!--            </a-form-item>-->
  <!--          </a-col>-->

          <a-col :xl="16" :lg="13" :md="14" :sm="26">
			  <div class="sbys">
            <a-form-item label="总结录时间">
              <j-date placeholder="请选择开始日期" class="query-group-cust" v-model="queryParam.gzzjrq_begin"></j-date>
              <span class="query-group-split-cust">-</span>
              <j-date placeholder="请选择结束日期" class="query-group-cust" v-model="queryParam.gzzjrq_end"></j-date>
            </a-form-item>
			</div>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <!-- 查询区域-END -->

    <!-- 操作按钮区域 -->
    <div class="table-operator">
	  <a-button @click="searchQuery" type="primary" icon="search" style="margin-right: 10px;">搜索</a-button>
	  <a-button @click="searchReset" type="danger" icon="delete" style="margin-right: 10px;">清除</a-button>	
      <a-button @click="searchQuery" type="primary" icon="sync" style="margin-right: 10px;">刷新</a-button>	
<!--      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>-->
<!--      <a-button type="primary" icon="download" @click="handleExportXls('ve_jw_gzzj')">导出</a-button>-->
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
       <a-button type="danger" @click="delteIds" style="margin-right: 10px;">批量删除</a-button>
     <!-- <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDelConfirm">
            <edu-batch-delete-button ref="batchDelBtn" @del="batchDelAction"  type="4" title="删除"></edu-batch-delete-button>
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
          <a type="2" @click="audit(record)"  v-if="record.isAudited == '0'" title="评审">评审</a>
          <a-divider type="vertical" v-if="record.isAudited == '0'" />
          <a type="1" @click="detail(record)" title="查看">查看</a>
        </span>
      </a-table>
    </div>

    <veJwGzzj-modal ref="modalForm" @ok="modalFormOk"></veJwGzzj-modal>
    <ve-jw-gzzj-audit ref="auditForm" @ok="modalFormOk"></ve-jw-gzzj-audit>
  </a-card>
</template>

<script>
import { EduListMixin } from '@/mixins/EduListMixin'
import VeJwGzzjModal from './modules/VeJwGzzjModal'
import VeJwGzzjAudit from './modules/VeJwGzzjAudit.vue'
import JSelectTeacher from '@/components/kwglbiz/JSelectTeacher'

export default {
  name: 'VeJwGzzjList',
  mixins: [EduListMixin],
  components: {
    JSelectTeacher,
    VeJwGzzjModal,
    VeJwGzzjAudit,
  },
  data() {
    return {
      description: 've_jw_gzzj管理页面',
      // 表头
      columns: [
        {
          title: '总结类型',
          align: 'center',
          dataIndex: 'gzzjlxid_dictText',
        },
        {
          title: '标题',
          align: 'center',
          dataIndex: 'gzzjbt',
        },
        {
          title: '总结日期',
          align: 'center',
          dataIndex: 'gzzjrq',
          customRender: function (text) {
            return !text ? '' : text.length > 10 ? text.substr(0, 10) : text
          },
        },

        {
          title: '教师名称',
          align: 'center',
          dataIndex: 'addusername',
          // customRender:function (t,r,index) {
            // if (t) {
            //   return this.showItemObj.teacherid[t];
            // }
            // return "";
          // }
        },

        {
          title: '评审结果',
          align: 'center',
          dataIndex: 'isAudited_dictText',
        },

        {
          title: '评审人',
          align: 'center',
          dataIndex: 'verifyusername',
        },

        {
          title: '评审时间',
          align: 'center',
          dataIndex: 'verifytime',
          customRender: function (text) {
            return !text ? '' : text.length > 10 ? text.substr(0, 10) : text
          },
        },

        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          scopedSlots: { customRender: 'action' },
        },
      ],
      url: {
        list: '/jxgz/veJwGzzj/list',
        delete: '/jxgz/veJwGzzj/delete',
        deleteBatch: '/jxgz/veJwGzzj/deleteBatch',
        exportXlsUrl: '/jxgz/veJwGzzj/exportXls',
        importExcelUrl: 'jxgz/veJwGzzj/importExcel',
      },
      dictOptions: {},
      isorter: [],
    }
  },
  computed: {
    importExcelUrl: function () {
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
    },
  },
  methods: {
    initDictConfig() {},

    detail: function (record) {
      this.$refs.modalForm.edit(record)
      this.$refs.modalForm.title = '查看工作总结'
      this.$refs.modalForm.disableSubmit = true
    },
    audit: function (record) {
      this.$refs.auditForm.edit(record)
      this.$refs.auditForm.title = '评审工作总结'
      this.$refs.auditForm.disableSubmit = false
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
				 then.$http.delete(then.$http.baseServer + '/jxgz/veJwGzzj/deleteBatch?ids=' + ids,{}).then(res => {
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
<style scoped>
  ::v-deep .sbys .ant-form-item-control{
  	  width: 600px !important;
  }
</style>