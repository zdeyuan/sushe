<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <div>
        <a-form layout="inline">
          <a-row :gutter="24">
            <a-col :md="8" :sm="24">
              <a-form-item label="课程">
				<JSelectKeCen v-model="queryParam.kcid" placeholder="请选择课程"></JSelectKeCen>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="学期">
				<JSelectXueqi v-model="queryParam.semid" placeholder="请选择学期"></JSelectXueqi>
              </a-form-item>
            </a-col>
            <a-col :md="24" :sm="24">
              <span style="float: left; overflow: hidden" class="table-page-search-submitButtons">
                <a-button @click="searchQuery" type="primary" icon="search"
                	style="margin-right: 10px;">搜索</a-button>
                <a-button @click="searchReset" type="danger" icon="delete"
                	style="margin-right: 10px;">清除</a-button>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>
    </div>
    <!-- 查询区域-END -->

    <!-- 操作按钮区域 -->
    <div class="table-operator">
<!--      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>-->
<!--      <a-button type="primary" icon="download" @click="handleExportXls('ve_jw_tj_keshi')">导出</a-button>-->
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
<!--      <a-dropdown v-if="selectedRowKeys.length > 0">-->
<!--        <a-menu slot="overlay">-->
<!--          <a-menu-item key="1" @click="batchDel"><a-icon type="delete" />删除</a-menu-item>-->
<!--        </a-menu>-->
<!--        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>-->
<!--      </a-dropdown>-->
    </div>

    <!-- table区域-begin -->
    <div>
<!--      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px">-->
<!--        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择-->
<!--        <a style="font-weight: 600">{{ selectedRowKeys.length }}</a-->
<!--        >项-->
<!--        <a style="margin-left: 24px" @click="onClearSelected">清空</a>-->
<!--      </div>-->

<!--      :rowSelection="{ fixed: true, selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"-->
      <a-table
        ref="table"
        size="middle"
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
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
          <a @click="handleEdit(record)">编辑</a>

          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>
      </a-table>
    </div>

    <veJwTjKeshi-modal ref="modalForm" @ok="modalFormOk"></veJwTjKeshi-modal>
    <jw-jiaocai-select-course ref="selectForm" @ok="modalFormOk"></jw-jiaocai-select-course>
  </a-card>
</template>

<script>
import { EduListMixin } from '@/mixins/EduListMixin'
import VeJwTjKeshiModal from './modules/VeJwTjKeshiModal'
import JwJiaocaiSelectCourse from '@/views/jwManage/jxzy/modules/JwJiaocaiSelectCourse'
import JSelectKeCen from '@/components/kwglbiz/JSelectKeCen'
import JSelectXueqi from '@/components/kwglbiz/JSelectXueqi'

export default {
  name: 'VeJwTjKeshiList',
  mixins: [EduListMixin],
  components: {
    VeJwTjKeshiModal,
    JwJiaocaiSelectCourse,
	JSelectKeCen,
	JSelectXueqi
  },
  data() {
    return {
      description: 've_jw_tj_keshi管理页面',
      // 表头
      columns: [
        {
          title: '教师姓名',
          align: 'center',
          dataIndex: 'xm',
        },
        {
          title: '课程',
          align: 'center',
          dataIndex: 'kcid_dictText',
        },
        {
          title: '理论课时',
          align: 'center',
          dataIndex: 'llks',
        },
        {
          title: '实践课时',
          align: 'center',
          dataIndex: 'sjks',
        },
        {
          title: '其他课时',
          align: 'center',
          dataIndex: 'qtks',
        },
        {
          title: '总课时',
          align: 'center',
          dataIndex: 'total',
        },
        {
          title: '学期名称',
          align: 'center',
          dataIndex: 'xqmc',
        },
      ],
      url: {
        list: '/jxgz/veJwTjKeshi/list',
        delete: '/jxgz/veJwTjKeshi/delete',
        deleteBatch: '/jxgz/veJwTjKeshi/deleteBatch',
        exportXlsUrl: '/jxgz/veJwTjKeshi/exportXls',
        importExcelUrl: 'jxgz/veJwTjKeshi/importExcel',
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

    onSearchCourse() {
      this.$refs.selectForm.show()
    },

    modalFormOk(row, id) {
      console.log('当前选中课程id', id)
      this.$refs.course.value = row.kcmc

      this.queryParam.kcid = id
    },
  },
}
</script>
<style lang="less" scoped>
  ::v-deep .j-select-biz-component-box {
	  width: 300px;
  }	
  ::v-deep .ant-table-thead > tr > th{
  	background:#66C3FD;
  	color:#FFFFFF;
  }	
  
  
  ::v-deep .sbys .ant-form-item-control{
  	  width: 600px ;
  }
  ::v-deep .table-operator{
  	  margin: 10px 0;
  }
  
  ::v-deep .button_default{
  	  height: 40px;
  	  position: relative;
	  top: 2px;
  }
  
// .auto-tabs /deep/.ant-tabs-bar {
//   margin-bottom: 0;
//   .ant-tabs-tab {
//     color: #999999;
//   }
//   .ant-tabs-tab-active {
//     color: #666666;
//   }
//   .ant-tabs-ink-bar {
//     background: #878787;
//   }
// }
</style>