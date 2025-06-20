<template>
  <div :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="8" :lg="9" :md="10" :sm="24">
            <a-form-item label="惩处文号">
              <a-input placeholder="请输入惩处文号" v-model="queryParam.ccwh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="8" :lg="9" :md="10" :sm="24">
            <a-form-item label="纪律处分">
              <j-dict-select-tag
                placeholder="纪律处分"
                type="list"
                dictCode="ve_dict_dictdata,title,code,modelCode='JLCF'"
                v-model="queryParam.jlcfm"
              ></j-dict-select-tag>
            </a-form-item>
          </a-col>
          <a-col :xl="12" :lg="11" :md="12" :sm="24">
            <a-form-item label="惩处日期">
              <j-date placeholder="请选择开始日期" class="query-group-cust" v-model="queryParam.ccrq_begin"></j-date>
              <span class="query-group-split-cust"></span>
              <j-date placeholder="请选择结束日期" class="query-group-cust" v-model="queryParam.ccrq_end"></j-date>
            </a-form-item>
          </a-col>
          <a-col :xl="8" :lg="7" :md="8" :sm="24">
            <span style="float: left; overflow: hidden" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search"  style="margin-right: 10px;">搜索</a-button>
              <a-button type="primary" @click="searchReset"   style="margin-right: 10px;"
                ><icon-text icon="iconbutton-clear">清空</icon-text></a-button
              >
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <!-- 查询区域-END -->

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      
      <a-button @click="clearSearch" icon="rollback">返回</a-button>
      <a-button @click="handleEdit(extra)" style="margin-right: 10px;" type="primary" icon="plus">新增</a-button>
      <a-button @click="batchDel" style="margin-right: 10px;" type="primary" ><icon-text icon="iconbutton-delete">删除</icon-text></a-button>
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
          <a @click="handleDetail(record)" class="green-txt">查看</a>
          <a-divider type="vertical" />
          <a @click="handleEdit(record)" class="blue-txt">编辑</a>
          <a-divider type="vertical" />
          <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
            <a class="orange-txt">删除</a>
          </a-popconfirm>

         
        </span>
      </a-table>
    </div>

    <hq-hr-chengfa-modal ref="modalForm" @ok="modalFormOk"></hq-hr-chengfa-modal>
  </div>
</template>

<script>
import '@/assets/less/TableExpand.less'
import { mixinDevice } from '@/utils/mixin'
import { EduListMixin } from '@/mixins/EduListMixin'
import HqHrChengfaModal from './modules/HqHrChengfaModal'

export default {
  name: 'HqHrChengFaPerson',
  mixins: [EduListMixin, mixinDevice],
  components: {
    HqHrChengfaModal,
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
      disableMixinCreated: true,
      description: '惩罚表管理页面',
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
        {
          title: '工号',
          align: 'center',
          dataIndex: 'gh',
          sorter: true,
        },
        {
          title: '姓名',
          align: 'center',
          dataIndex: 'xm',
        },
        {
          title: '惩处名称',
          align: 'center',
          dataIndex: 'ccmc',
        },
        {
          title: '纪律处分',
          align: 'center',
          dataIndex: 'jlcfm_dictText',
        },
        {
          title: '惩处单位',
          align: 'center',
          dataIndex: 'ccdw',
        },
        {
          title: '惩处文号',
          align: 'center',
          dataIndex: 'ccwh',
        },
        {
          title: '惩处日期',
          align: 'center',
          dataIndex: 'ccrq',
          customRender: function (text) {
            return !text ? '' : text.length > 10 ? text.substr(0, 10) : text
          },
        },
        {
          title: '惩处撤销日期',
          align: 'center',
          dataIndex: 'cccxrq',
          customRender: function (text) {
            return !text ? '' : text.length > 10 ? text.substr(0, 10) : text
          },
        },
        {
          title: '惩处撤消文号',
          align: 'center',
          dataIndex: 'cccxwh',
          sorter: true,
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
        list: '/hr/rewardpublish/hqHrChengfa/list',
        delete: '/hr/rewardpublish/hqHrChengfa/delete',
        deleteBatch: '/hr/rewardpublish/hqHrChengfa/deleteBatch',
        exportXlsUrl: '/hr/rewardpublish/hqHrChengfa/exportXls',
        importExcelUrl: '/hr/rewardpublish/hqHrChengfa/importExcel',
      },
      dictOptions: {},
      superFieldList: [],
    }
  },
  mounted() {
    this.queryParam.gh = this.jobNumber
    this.queryParam.teacherid=this.teacherid
    // this.$nextTick(()=>{
    this.searchQuery()
    // })
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
      fieldList.push({ type: 'string', value: 'gh', text: '工号', dictCode: '' })
      fieldList.push({ type: 'string', value: 'xm', text: '姓名', dictCode: '' })
      fieldList.push({ type: 'string', value: 'ccmc', text: '惩处名称', dictCode: '' })
      fieldList.push({ type: 'string', value: 'ccmcm', text: '惩处名称码', dictCode: '' })
      fieldList.push({ type: 'string', value: 'jlcfm', text: '纪律处分码', dictCode: '' })
      fieldList.push({ type: 'string', value: 'ccyy', text: '惩处原因', dictCode: '' })
      fieldList.push({ type: 'Text', value: 'ccnr', text: '惩处内容', dictCode: '' })
      fieldList.push({ type: 'string', value: 'ccwh', text: '惩处文号', dictCode: '' })
      fieldList.push({ type: 'string', value: 'ccdw', text: '惩处单位', dictCode: '' })
      fieldList.push({ type: 'date', value: 'ccrq', text: '惩处日期' })
      fieldList.push({ type: 'date', value: 'cccxrq', text: '惩处撤销日期' })
      fieldList.push({ type: 'string', value: 'cccxwh', text: '惩处撤消文号', dictCode: '' })
      fieldList.push({ type: 'Text', value: 'cccxyy', text: '惩处撤消原因', dictCode: '' })
      this.superFieldList = fieldList
    },
    handleEdit: function(record) {
      this.$refs.modalForm.edit(record,{
        disabledKeys:['gh','xm']
      })
      this.$refs.modalForm.title = '编辑'
      this.$refs.modalForm.disableSubmit = false
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