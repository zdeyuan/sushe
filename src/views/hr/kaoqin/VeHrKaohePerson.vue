<template>
  <div>
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="8" :lg="7" :md="8" :sm="24">
            <a-form-item label="考核类别">
              <j-dict-select-tag v-model="queryParam.khlbm" type="list"
                                 dictCode="ve_dict_dictdata,title,code,modelCode='KHLBM'" placeholder="请选择考核类别" />
            </a-form-item>
          </a-col>
          <a-col :xl="8" :lg="7" :md="8" :sm="24">
            <a-form-item label="考核结果">
              <j-dict-select-tag v-model="queryParam.khjgm" type="list"
                                 dictCode="ve_dict_dictdata,title,code,modelCode='KHJGM'" placeholder="请选择考核结果" />
            </a-form-item>
          </a-col>
          <template v-if="toggleSearchStatus">
            <a-col :xl="12" :lg="11" :md="12" :sm="24">
              <a-form-item label="考核日期">
                <j-date placeholder="请选择开始日期" class="query-group-cust" v-model="queryParam.khrq_begin"></j-date>
                <span class="query-group-split-cust"></span>
                <j-date placeholder="请选择结束日期" class="query-group-cust" v-model="queryParam.khrq_end"></j-date>
              </a-form-item>
            </a-col>
          </template>
          <a-col :xl="8" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
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
    <div>
      <a-table
        ref="table"
        size="middle"
        :scroll="{x:true}"
        bordered
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        class="j-table-force-nowrap"
        @change="handleTableChange">

        <template slot="htmlSlot" slot-scope="text">
          <div v-html="text"></div>
        </template>
        <template slot="imgSlot" slot-scope="text">
          <span v-if="!text" style="font-size: 12px;font-style: italic;">无图片</span>
          <img v-else :src="getImgView(text)" height="25px" alt=""
               style="max-width:80px;font-size: 12px;font-style: italic;" />
        </template>
        <template slot="fileSlot" slot-scope="text">
          <span v-if="!text" style="font-size: 12px;font-style: italic;">无文件</span>
          <a-button
            v-else
            :ghost="true"
            type="primary"
            icon="download"
            size="small"
            @click="downloadFile(text)">
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

    <ve-hr-kaohe-info-modal ref="modalForm" @ok="modalFormOk"></ve-hr-kaohe-info-modal>
  </div>
</template>

<script>

import '@/assets/less/TableExpand.less'
import { mixinDevice } from '@/utils/mixin'
import { EduListMixin } from '@/mixins/EduListMixin'
import VeHrKaoheInfoModal from './modules/VeHrKaoheInfoModal'

export default {
  name: 'VeHrKaoheList',
  mixins: [EduListMixin, mixinDevice],
  components: {
    VeHrKaoheInfoModal
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
      description: 've_hr_kaohe管理页面',
      // 表头
      columns: [
        {
          title: '序号',
          dataIndex: '',
          key: 'rowIndex',
          width: 60,
          align: 'center',
          customRender: function(t, r, index) {
            return parseInt(index) + 1
          }
        },
        {
          title: '工号',
          align: 'center',
          dataIndex: 'gh',
          sorter:true
        },
        {
          title: '姓名',
          align: 'center',
          dataIndex: 'xm'
        },
        {
          title: '考核类别',
          align: 'center',
          dataIndex: 'khlbm_dictText'
        },
        {
          title: '考核结果',
          align: 'center',
          dataIndex: 'khjgm_dictText'
        },
        {
          title: '考核部门',
          align: 'center',
          dataIndex: 'depid_dictText'
        },
        {
          title: '考核日期',
          align: 'center',
          dataIndex: 'khrq'
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          fixed: 'right',
          width: 147,
          scopedSlots: { customRender: 'action' }
        }
      ],
      validatorRules: {
        gh: {
          rules: [
            { required: true, message: '请输入工号!' }
          ]
        },
        xm: {
          rules: [
            { required: true, message: '请输入姓名!' }
          ]
        },
        khlbm: {
          rules: [
            { required: true, message: '请输入考核类别码!' }
          ]
        },
        khjgm: {
          rules: [
            { required: true, message: '请输入考核结果码!' }
          ]
        },
        khnr: {
          rules: [
            { required: true, message: '请输入考核内容!' }
          ]
        },
        khfzrgh: {
          rules: [
            { required: true, message: '请输入考核负责人工号!' }
          ]
        },
        khpy: {
          rules: [
            { required: true, message: '请输入考核评语!' }
          ]
        },
        depid: {
          rules: [
            { required: true, message: '请输入考核部门id!' }
          ]
        }
      },
      url: {
        list: '/hr/kaoqin/veHrKaohe/list',
        delete: '/hr/kaoqin/veHrKaohe/delete',
        deleteBatch: '/hr/kaoqin/veHrKaohe/deleteBatch',
        exportXlsUrl: '/hr/kaoqin/veHrKaohe/exportXls',
        importExcelUrl: '/hr/kaoqin/veHrKaohe/importExcel'

      },
      dictOptions: {},
      superFieldList: []
    }
  },
  created() {
    this.getSuperFieldList()
  },
  mounted(){
    this.queryParam.gh = this.jobNumber
    this.queryParam.teacherid=this.teacherid
    this.searchQuery()
  },
  computed: {
    importExcelUrl: function() {
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
    }
  },
  methods: {
    initDictConfig() {
    },
    getSuperFieldList() {
      let fieldList = []
      fieldList.push({ type: 'int', value: 'teacherid', text: '教师id', dictCode: '' })
      fieldList.push({ type: 'string', value: 'gh', text: '工号', dictCode: '' })
      fieldList.push({ type: 'string', value: 'xm', text: '姓名', dictCode: '' })
      fieldList.push({ type: 'string', value: 'khlbm', text: '考核类别', dictCode: '' })
      fieldList.push({ type: 'string', value: 'khjgm', text: '考核结果', dictCode: '' })
      fieldList.push({ type: 'date', value: 'khrq', text: '考核日期' })
      fieldList.push({ type: 'Text', value: 'khnr', text: '考核内容', dictCode: '' })
      fieldList.push({ type: 'string', value: 'khfzrgh', text: '考核负责人工号', dictCode: '' })
      fieldList.push({ type: 'Text', value: 'khpy', text: '考核评语', dictCode: '' })
      fieldList.push({ type: 'int', value: 'depid', text: '考核部门', dictCode: '' })
      fieldList.push({ type: 'int', value: 'terminalid', text: '系统ID', dictCode: '' })
      this.superFieldList = fieldList
    },
    clearSearch() {
      this.$emit('change', '')
      this.searchReset()
    },
  }
}
</script>
<style scoped>

</style>