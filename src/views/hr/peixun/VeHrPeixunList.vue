<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="8" :lg="7" :md="8" :sm="24">
            <a-form-item label="工号">
              <a-input placeholder="请输入工号" v-model="queryParam.gh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="8" :lg="7" :md="8" :sm="24">


            <a-form-item label="参加继续教育方式" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-dict-select-tag v-model="queryParam.jxjyfsm" type="list"
                                 dictCode="ve_dict_dictdata,title,code,modelCode='CJJXJYFS'"
                                 placeholder="请选择参加继续教育方式" />
            </a-form-item>
          </a-col>
          <template v-if="toggleSearchStatus">
            <a-col :xl="8" :lg="7" :md="8" :sm="24">

              <a-form-item label="进修学历" :labelCol="labelCol" :wrapperCol="wrapperCol">
                <j-dict-select-tag v-model="queryParam.jxxlm" type="list"
                                   dictCode="ve_dict_dictdata,title,code,modelCode='XL'" placeholder="请选择进修学历" />
              </a-form-item>
            </a-col>
            <a-col :xl="12" :lg="11" :md="12" :sm="24">
              <a-form-item label="申请时间">
                <j-date placeholder="请选择开始日期" class="query-group-cust" v-model="queryParam.applytime_begin"></j-date>
                <span class="query-group-split-cust"></span>
                <j-date placeholder="请选择结束日期" class="query-group-cust" v-model="queryParam.applytime_end"></j-date>
              </a-form-item>
            </a-col>
            <a-col :xl="12" :lg="11" :md="12" :sm="24">
              <a-form-item label="审核时间">
                <j-date placeholder="请选择开始日期" class="query-group-cust" v-model="queryParam.audittime_begin"></j-date>
                <span class="query-group-split-cust"></span>
                <j-date placeholder="请选择结束日期" class="query-group-cust" v-model="queryParam.audittime_end"></j-date>
              </a-form-item>
            </a-col>
            <a-col :xl="8" :lg="7" :md="8" :sm="24">
              <a-form-item label="审核状态 ">
                <a-input placeholder="请输入审核状态 " v-model="queryParam.auditstatus"></a-input>
              </a-form-item>
            </a-col>
          </template>
          <a-col :xl="8" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search"  style="margin-right: 10px;">查询</a-button>
              <a-button type="primary" @click="searchReset"   >重置</a-button>
              <a @click="handleToggleSearch" >
                {{ toggleSearchStatus ? '收起' : '展开' }}
                <a-icon :type="toggleSearchStatus ? 'up' : 'down'" />
              </a>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <!-- 查询区域-END -->

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>
      <a-button type="primary"   @click="handleExportXls('ve_hr_peixun')"><icon-text icon="iconbutton-export">导出</icon-text></a-button>
      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl"
                @change="handleImportExcel">
        <a-button type="primary"   ><icon-text icon="iconbutton-import">导入</icon-text></a-button>
      </a-upload>
      <!-- 高级查询区域 -->
      <j-super-query :fieldList="superFieldList" ref="superQueryModal"
                     @handleSuperQuery="handleSuperQuery"></j-super-query>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel">
            <a-icon type="delete" />
            删除
          </a-menu-item>
        </a-menu>
        <a-button > 批量操作
          <a-icon type="down" />
        </a-button>
      </a-dropdown>
    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a
        style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>

      <a-table
        ref="table"
        size="middle"
        :scroll="{x:true}"
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
          <a @click="handleEdit(record)">编辑</a>

          <a-divider type="vertical" />
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
          </a-dropdown>
        </span>

      </a-table>
    </div>

    <ve-hr-peixun-modal ref="modalForm" @ok="modalFormOk"></ve-hr-peixun-modal>
  </a-card>
</template>

<script>

import '@/assets/less/TableExpand.less'
import { mixinDevice } from '@/utils/mixin'
import { EduListMixin } from '@/mixins/EduListMixin'
import VeHrPeixunModal from './modules/VeHrPeixunModal'

export default {
  name: 'VeHrPeixunList',
  mixins: [EduListMixin, mixinDevice],
  components: {
    VeHrPeixunModal
  },
  data() {
    return {
      description: 've_hr_peixun管理页面',
      // 表头
      columns: [
        {
          title: '#',
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
          title: '联系电话',
          align: 'center',
          dataIndex: 'telphone'
        },
        {
          title: '参加继续教育方式码',
          align: 'center',
          dataIndex: 'jxjyfsm_dictText'
        },
        {
          title: '报考院校',
          align: 'center',
          dataIndex: 'school'
        },
        {
          title: '报考专业',
          align: 'center',
          dataIndex: 'profession'
        },
        {
          title: '进修学历',
          align: 'center',
          dataIndex: 'jxxlm_dictText'
        },
        {
          title: '导师姓名',
          align: 'center',
          dataIndex: 'dsxm'
        },
        {
          title: '导师联系电话',
          align: 'center',
          dataIndex: 'dslxdh'
        },
        {
          title: '报考目的',
          align: 'center',
          dataIndex: 'target'
        },
        {
          title: '进修开始时间',
          align: 'center',
          dataIndex: 'jxkssj',
          customRender: function(text) {
            return !text ? '' : (text.length > 10 ? text.substr(0, 10) : text)
          }
        },
        {
          title: '进修结束时间',
          align: 'center',
          dataIndex: 'jxjssj',
          customRender: function(text) {
            return !text ? '' : (text.length > 10 ? text.substr(0, 10) : text)
          }
        },
        {
          title: '申请理由',
          align: 'center',
          dataIndex: 'reason'
        },
        {
          title: '申请时间',
          align: 'center',
          dataIndex: 'applytime',
          customRender: function(text) {
            return !text ? '' : (text.length > 10 ? text.substr(0, 10) : text)
          }
        },
        {
          title: '审核时间',
          align: 'center',
          dataIndex: 'audittime',
          customRender: function(text) {
            return !text ? '' : (text.length > 10 ? text.substr(0, 10) : text)
          }
        },
        {
          title: '审核人工号',
          align: 'center',
          dataIndex: 'auditgh'
        },
        {
          title: '审核人姓名',
          align: 'center',
          dataIndex: 'auditxm'
        },
        {
          title: '审核状态 ',
          align: 'center',
          dataIndex: 'auditstatus_dictText'
        },
        {
          title: '审核人意见',
          align: 'center',
          dataIndex: 'audityj'
        },
        {
          title: '系统id',
          align: 'center',
          dataIndex: 'terminalid'
        },
        {
          title: '教师id',
          align: 'center',
          dataIndex: 'teacherid'
        },
        {
          title: '文件',
          align: 'center',
          dataIndex: 'fileid',
          scopedSlots: { customRender: 'fileSlot' }
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
        telphone: {
          rules: [
            { required: true, message: '请输入联系电话!' }
          ]
        },
        jxjyfsm: {
          rules: [
            { required: true, message: '请输入参加继续教育方式码!' }
          ]
        },
        school: {
          rules: [
            { required: true, message: '请输入报考院校!' }
          ]
        },
        profession: {
          rules: [
            { required: true, message: '请输入报考专业!' }
          ]
        },
        jxxlm: {
          rules: [
            { required: true, message: '请输入进修学历码!' }
          ]
        },
        dsxm: {
          rules: [
            { required: true, message: '请输入导师姓名!' }
          ]
        },
        dslxdh: {
          rules: [
            { required: true, message: '请输入导师联系电话!' }
          ]
        },
        target: {
          rules: [
            { required: true, message: '请输入报考目的!' }
          ]
        }
      },
      url: {
        list: '/hr/peixun/veHrPeixun/list',
        delete: '/hr/peixun/veHrPeixun/delete',
        deleteBatch: '/hr/peixun/veHrPeixun/deleteBatch',
        exportXlsUrl: '/hr/peixun/veHrPeixun/exportXls',
        importExcelUrl: '/hr/peixun/veHrPeixun/importExcel'

      },
      dictOptions: {},
      superFieldList: []
    }
  },
  created() {
    this.getSuperFieldList()
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
      fieldList.push({ type: 'string', value: 'gh', text: '工号', dictCode: '' })
      fieldList.push({ type: 'string', value: 'xm', text: '姓名', dictCode: '' })
      fieldList.push({ type: 'string', value: 'telphone', text: '联系电话', dictCode: '' })
      fieldList.push({ type: 'string', value: 'jxjyfsm', text: '参加继续教育方式码', dictCode: '' })
      fieldList.push({ type: 'string', value: 'school', text: '报考院校', dictCode: '' })
      fieldList.push({ type: 'string', value: 'profession', text: '报考专业', dictCode: '' })
      fieldList.push({ type: 'string', value: 'jxxlm', text: '进修学历码', dictCode: '' })
      fieldList.push({ type: 'string', value: 'dsxm', text: '导师姓名', dictCode: '' })
      fieldList.push({ type: 'string', value: 'dslxdh', text: '导师联系电话', dictCode: '' })
      fieldList.push({ type: 'Text', value: 'target', text: '报考目的', dictCode: '' })
      fieldList.push({ type: 'date', value: 'jxkssj', text: '进修开始时间' })
      fieldList.push({ type: 'date', value: 'jxjssj', text: '进修结束时间' })
      fieldList.push({ type: 'Text', value: 'reason', text: '申请理由', dictCode: '' })
      fieldList.push({ type: 'date', value: 'applytime', text: '申请时间' })
      fieldList.push({ type: 'date', value: 'audittime', text: '审核时间' })
      fieldList.push({ type: 'string', value: 'auditgh', text: '审核人工号', dictCode: '' })
      fieldList.push({ type: 'string', value: 'auditxm', text: '审核人姓名', dictCode: '' })
      fieldList.push({ type: 'int', value: 'auditstatus', text: '审核状态 ', dictCode: '' })
      fieldList.push({ type: 'Text', value: 'audityj', text: '审核人意见', dictCode: '' })
      fieldList.push({ type: 'int', value: 'terminalid', text: '系统id', dictCode: '' })
      fieldList.push({ type: 'int', value: 'teacherid', text: '教师id', dictCode: '' })
      fieldList.push({ type: 'int', value: 'fileid', text: '文件', dictCode: '' })
      this.superFieldList = fieldList
    }
  }
}
</script>
<style scoped>

</style>