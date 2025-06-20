<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <!-- <a-col :xl="8" :lg="7" :md="8" :sm="24">
            <a-form-item label="变动类型">
              <j-dict-select-tag
                placeholder="请选择变动类型"
                v-model="queryParam.bdcode"
                dictCode="ve_dict_dictdata,title,code,modelCode='RSBDLX'"
              ></j-dict-select-tag>
            </a-form-item>
          </a-col>
          <a-col :xl="12" :lg="11" :md="12" :sm="24">
            <a-form-item label="变动时间">
              <j-date placeholder="请选择开始日期" class="query-group-cust" v-model="queryParam.hjrq_begin"></j-date>
              <span class="query-group-split-cust"></span>
              <j-date placeholder="请选择结束日期" class="query-group-cust" v-model="queryParam.hjrq_end"></j-date>
            </a-form-item>
          </a-col> -->
          <!-- <a-col :xl="8" :lg="7" :md="8" :sm="24">
            <span style="float: left; overflow: hidden" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search"  style="margin-right: 10px;">搜索</a-button>
              <a-button type="primary" @click="searchReset"   style="margin-right: 10px;"
                ><icon-text icon="iconbutton-clear">清空</icon-text></a-button
              >
            </span>
          </a-col> -->
        </a-row>
      </a-form>
    </div>
    <!-- 查询区域-END -->

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      
      <a-button @click="clearSearch" icon="rollback">返回</a-button>
      <a-button @click="handleEdit(extra)" style="margin-right: 10px;" type="primary" icon="plus">新增</a-button>
      <a-button @click="batchDel" style="margin-right: 10px;" type="primary" ><icon-text icon="iconbutton-delete">删除</icon-text></a-button>
      <a-button
        style="margin-right: 10px;"
        type="primary"
        @click="
          handleImport({
            tokenHeader: tokenHeader,
            downFunc: () => modalDownLoad('人事变动管理'),
            importExcelUrl: importExcelUrl,
          })
        ">
        <icon-text icon="iconbutton-import"> 导入 </icon-text></a-button>
      <a-button type="primary"   @click="handleExportXls('ve_hr_change')" style="margin-right: 10px;"
        ><icon-text icon="iconbutton-export">导出</icon-text></a-button
      >
      <a-button @click="searchQuery" style="margin-right: 10px;" type="primary"  ><icon-text icon="iconbutton-refresh">刷新</icon-text></a-button>
      
    </div>

    <!-- table区域-begin -->
    <div>

      <a-table
        ref="table"
        size="middle"
        :scroll="{ x: true }"
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :rowSelection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
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
          <a @click="handleEdit(record)" class="blue-txt">编辑</a>
          <a-divider type="vertical" />
          <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
            <a class="orange-txt">删除</a>
          </a-popconfirm>
        </span>
      </a-table>
    </div>

    <ve-hr-change-modal ref="modalForm" @ok="modalFormOk"></ve-hr-change-modal>
    <import-modal ref="importModal" @ok="modalFormOk"></import-modal>
  </a-card>
</template>

<script>
import '@/assets/less/TableExpand.less'
import { mixinDevice } from '@/utils/mixin'
import { EduListMixin } from '@/mixins/EduListMixin'
import VeHrChangeModal from './modules/VeHrChangeModal'
import ImportModal from '@/components/ImportModal/importModal.vue'

export default {
  name: 'VeHrChangeList',
  mixins: [EduListMixin, mixinDevice],
  components: {
    VeHrChangeModal,
    ImportModal
  },
  model: {
    prop: 'jobNumber',
    event: 'change',
  },
  props: {
    jobNumber: '',
      teacherid:'',
    extra:{
      default(){
        return {}
      },
      type:Object
    }
  },
  data() {
    return {
      description: 've_hr_change管理页面-个人详细',
      
      disableMixinCreated: true,
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
        //   dataIndex: 'teacherid'
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
          title: '变动类型',
          align: 'center',
          dataIndex: 'bdcode_dictText',
        },
        {
          title: '变动时间',
          align: 'center',
          dataIndex: 'createTime',
          customRender: function (text) {
            return !text ? '' : text.length > 10 ? text.substr(0, 10) : text
          },
        },
        // {
        //   title: '变动说明',
        //   align: 'center',
        //   dataIndex: 'dbdesc'
        // },
        // {
        //   title: '操作人id',
        //   align: 'center',
        //   dataIndex: 'createuserid'
        // },
        {
          title: '操作人姓名',
          align: 'center',
          dataIndex: 'createusername',
        },
        // {
        //   title: '系统ID',
        //   align: 'center',
        //   dataIndex: 'terminalid'
        // },
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
        list: '/hr/change/veHrChange/list',
        delete: '/hr/change/veHrChange/delete',
        deleteBatch: '/hr/change/veHrChange/deleteBatch',
        exportXlsUrl: '/hr/change/veHrChange/exportXls',
        importExcelUrl: 'hr/change/veHrChange/importExcel',
        exportXlsTemplateUrl: '/hr/change/veHrChange/exportXlsTemplate',
      },
      dictOptions: {},
      superFieldList: [],
    }
  },
  created() {
    this.getSuperFieldList()
  },
  mounted() {
    this.queryParam.gh = this.jobNumber; this.queryParam.teacherid=this.teacherid
    this.searchQuery()
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
      fieldList.push({ type: 'string', value: 'bdcode', text: '变动类型代码', dictCode: '' })
      fieldList.push({ type: 'date', value: 'createTime', text: '变动时间' })
      fieldList.push({ type: 'Text', value: 'dbdesc', text: '变动说明', dictCode: '' })
      fieldList.push({ type: 'int', value: 'createuserid', text: '操作人id', dictCode: '' })
      fieldList.push({ type: 'string', value: 'createusername', text: '操作人姓名', dictCode: '' })
      fieldList.push({ type: 'int', value: 'terminalid', text: '系统ID', dictCode: '' })
      this.superFieldList = fieldList
    },
    clearSearch() {
      this.$emit('change', '')
      this.searchReset()
    },
  },
}
</script>
<style scoped>

</style>