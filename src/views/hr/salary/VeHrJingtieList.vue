<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="8" :lg="7" :md="8" :sm="24">
            <a-form-item label="姓名">
              <a-input placeholder="请输入姓名" v-model="queryParam.xm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="8" :lg="7" :md="8" :sm="24">
            <a-form-item label="工号">
              <a-input placeholder="请输入工号" v-model="queryParam.gh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="8" :lg="7" :md="8" :sm="24">
            <a-form-item label="岗位">
              <j-dict-select-tag placeholder="请输选择岗位" v-model="queryParam.gw" type="list" dictCode="ve_hr_gangwei,title,id"></j-dict-select-tag>
            </a-form-item>
          </a-col>
          <a-col :xl="8" :lg="7" :md="8" :sm="24">
            <span style="float: left; overflow: hidden" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search"  style="margin-right: 10px;">搜索</a-button>
              <a-button type="primary" @click="searchReset"   style="margin-right: 10px;"><icon-text icon="iconbutton-clear">清空</icon-text></a-button>
              <!-- <a @click="handleToggleSearch" >
                {{ toggleSearchStatus ? '收起' : '展开' }}
                <a-icon :type="toggleSearchStatus ? 'up' : 'down'" />
              </a> -->
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <!-- 查询区域-END -->

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <!-- <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button> -->
      <a-button type="primary"  style="margin-right: 10px;" @click="handleExportXls('ve_hr_jingtie')"><icon-text icon="iconbutton-export">导出</icon-text></a-button>
      <a-button @click="searchQuery" style="margin-right: 10px;" type="primary"  ><icon-text icon="iconbutton-refresh">刷新</icon-text></a-button>
      <!-- <a-upload
        name="file"
        :showUploadList="false"
        :multiple="false"
        :headers="tokenHeader"
        :action="importExcelUrl"
        @change="handleImportExcel"
      >
        <a-button type="primary"   ><icon-text icon="iconbutton-import">导入</icon-text></a-button>
      </a-upload> -->
      <!-- 高级查询区域 -->
      <!-- <j-super-query
        :fieldList="superFieldList"
        ref="superQueryModal"
        @handleSuperQuery="handleSuperQuery"
      ></j-super-query>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel">
            <a-icon type="delete" />
            删除
          </a-menu-item>
        </a-menu>
        <a-button >
          批量操作
          <a-icon type="down" />
        </a-button>
      </a-dropdown> -->
    </div>

    <!-- table区域-begin -->
    <div>
      <!-- <div class="ant-alert ant-alert-info" style="margin-bottom: 16px">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择
        <a style="font-weight: 600">{{ selectedRowKeys.length }}</a
        >项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div> -->

      <a-table
        ref="table"
        size="middle"
        :scroll="{ x: true }"
        bordered
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        class="j-table-force-nowrap"
        @change="handleTableChange"
      >
        <template slot="htmlSlot" slot-scope="text">
          <div v-html="text"></div>
        </template>
        <template slot="imgSlot" slot-scope="text">
          <span v-if="!text" style="font-size: 12px; font-style: italic">无图片</span>
          <img
            v-else
            :src="getImgView(text)"
            height="25px"
            alt=""
            style="max-width: 80px; font-size: 12px; font-style: italic"
          />
        </template>
        <template slot="fileSlot" slot-scope="text">
          <span v-if="!text" style="font-size: 12px; font-style: italic">无文件</span>
          <a-button v-else :ghost="true" type="primary" icon="download" size="small" @click="downloadFile(text)">
            下载
          </a-button>
        </template>

        <span slot="action" slot-scope="text, record">
          <a @click="handleDetail(record)" class="green-txt">查看</a>
          <!-- <a @click="handleEdit(record)">编辑</a> -->

          <!-- <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a @click="handleDetail(record)">详情</a>
              </a-menu-item>
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown> -->
        </span>
      </a-table>
    </div>

    <ve-hr-jingtie-modal ref="modalForm" @ok="modalFormOk"></ve-hr-jingtie-modal>
  </a-card>
</template>

<script>
import '@/assets/less/TableExpand.less'
import { mixinDevice } from '@/utils/mixin'
import { EduListMixin } from '@/mixins/EduListMixin'
import VeHrJingtieModal from './modules/VeHrJingtieModal'

export default {
  name: 'VeHrJingtieList',
  mixins: [EduListMixin, mixinDevice],
  components: {
    VeHrJingtieModal,
  },
  data() {
    return {
      tabPaths: ['工资津贴', '工资津贴查询 '],
      description: 've_hr_jingtie管理页面',
      // 表头
      columns: [
        {
          title: '序号',
          dataIndex: '',
          key: 'rowIndex',
          width: 60,
          align: 'center',
          customRender: function (t, r, index) {
            return parseInt(index) + 1
          },
        },
        // {
        //   title: '教师id',
        //   align: 'center',
        //   dataIndex: 'teacherid',
        // },
        {
          title: '工号',
          align: 'center',
          dataIndex: 'gh',
          sorter:true
        },
        {
          title: '姓名',
          align: 'center',
          dataIndex: 'xm',
        },
        {
          title: '岗位',
          align: 'center',
          dataIndex: 'gw_dictText',
        },
        {
          title: '基础工资',
          align: 'center',
          dataIndex: 'jcgz',
        },
        {
          title: '职务工资',
          align: 'center',
          dataIndex: 'zwgz',
        },
        {
          title: '工龄津贴',
          align: 'center',
          dataIndex: 'gljt',
        },
        {
          title: '奖励工资',
          align: 'center',
          dataIndex: 'jlgz',
        },
        {
          title: '教龄津贴',
          align: 'center',
          dataIndex: 'jljt',
        },
        {
          title: '其他',
          align: 'center',
          dataIndex: 'other',
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          fixed: 'right',
          width: 147,
          scopedSlots: { customRender: 'action' },
        },
      ],
      url: {
        list: '/hr/ganwei/veHrJingtie/list',
        delete: '/hr/ganwei/veHrJingtie/delete',
        deleteBatch: '/hr/ganwei/veHrJingtie/deleteBatch',
        exportXlsUrl: '/hr/ganwei/veHrJingtie/exportXls',
        importExcelUrl: '/hr/ganwei/veHrJingtie/importExcel',
      },
      dictOptions: {},
      superFieldList: [],
    }
  },
  created() {
    this.getSuperFieldList()
  },
  computed: {
    importExcelUrl: function () {
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
    },
  },
  methods: {
    initDictConfig() {},
    getSuperFieldList() {
      let fieldList = []
      fieldList.push({ type: 'int', value: 'teacherid', text: '教师id', dictCode: '' })
      fieldList.push({ type: 'string', value: 'gh', text: '工号', dictCode: '' })
      fieldList.push({ type: 'string', value: 'xm', text: '姓名', dictCode: '' })
      fieldList.push({ type: 'int', value: 'gw', text: '岗位', dictCode: '' })
      fieldList.push({ type: 'BigDecimal', value: 'jcgz', text: '基础工资', dictCode: '' })
      fieldList.push({ type: 'BigDecimal', value: 'zwgz', text: '职务工资', dictCode: '' })
      fieldList.push({ type: 'BigDecimal', value: 'gljt', text: '工龄津贴', dictCode: '' })
      fieldList.push({ type: 'BigDecimal', value: 'jlgz', text: '奖励工资', dictCode: '' })
      fieldList.push({ type: 'BigDecimal', value: 'jljt', text: '教龄津贴(教师)', dictCode: '' })
      fieldList.push({ type: 'BigDecimal', value: 'other', text: '其他', dictCode: '' })
      this.superFieldList = fieldList
    },
  },
}
</script>
<style scoped>

</style>