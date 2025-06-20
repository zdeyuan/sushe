<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="8" :lg="7" :md="8" :sm="24">
            <a-form-item label="姓名">
              <a-input placeholder="请输入姓名" v-model="queryParam.jsxm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="8" :lg="7" :md="8" :sm="24">
            <a-form-item label="工号">
              <a-input placeholder="请输入工号" v-model="queryParam.gh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="8" :lg="7" :md="8" :sm="24">
            <a-form-item label="学期">
              <j-dict-select-tag
                v-model="queryParam.semid"
                type="list"
                dictCode="ve_base_semester,XQMC,id"
                placeholder="请选择学期"
              />
            </a-form-item>
          </a-col>
          <a-col :xl="8" :lg="7" :md="8" :sm="24">
            <span style="float: left; overflow: hidden" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search"  style="margin-right: 10px;">搜索</a-button>
              <a-button type="primary" @click="searchReset"  style="margin-right: 10px;"
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
      <a-button type="primary" @click="handleExportXls('ve_hr_kaohe')" style="margin-right: 10px;"
        ><icon-text icon="iconbutton-export">导出</icon-text></a-button
      >
      <a-button @click="searchQuery" style="margin-right: 10px;" type="primary"
        ><icon-text icon="iconbutton-refresh">刷新</icon-text></a-button
      >
    </div>

    <!-- table区域-begin -->
    <div>
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
        </span>
      </a-table>
    </div>

    <ve-hr-kaoqin-person-record-modal ref="modalForm" @ok="modalFormOk"></ve-hr-kaoqin-person-record-modal>
  </a-card>
</template>

<script>
import '@/assets/less/TableExpand.less'
import { mixinDevice } from '@/utils/mixin'
import { EduListMixin } from '@/mixins/EduListMixin'
import VeHrKaoqinPersonRecordModal from './modules/VeHrKaoqinPersonRecordModal'
import { getAction } from '@/api/hr/manage'

export default {
  name: 'VeHrKaoqinList',
  mixins: [EduListMixin, mixinDevice],
  components: {
    VeHrKaoqinPersonRecordModal,
  },
  data() {
    return {
      description: 've_hr_kaoqin管理页面',
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
          title: '教师姓名',
          align: 'center',
          dataIndex: 'jsxm',
        },
        {
          title: '学期',
          align: 'center',
          dataIndex: 'semid_dictText',
        },
        {
          title: '出勤次数',
          align: 'center',
          dataIndex: 'cqcs',
        },
        {
          title: '旷课次数',
          align: 'center',
          dataIndex: 'kkcs',
        },
        {
          title: '迟到次数',
          align: 'center',
          dataIndex: 'cdcs',
        },
        {
          title: '早退次数',
          align: 'center',
          dataIndex: 'ztcs',
        },
        {
          title: '请假次数',
          align: 'center',
          dataIndex: 'qjcs',
        },
        {
          title: '记勤次数',
          align: 'center',
          dataIndex: 'jqcs',
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
      validatorRules: {
        gh: {
          rules: [{ required: true, message: '请输入工号!' }],
        },
        jsxm: {
          rules: [{ required: true, message: '请输入教师姓名!' }],
        },
        semid: {
          rules: [{ required: true, message: '请输入学期id!' }],
        },
        cqcs: {
          rules: [{ required: true, message: '请输入出勤次数!' }],
        },
        kkcs: {
          rules: [{ required: true, message: '请输入旷课次数!' }],
        },
        cdcs: {
          rules: [{ required: true, message: '请输入迟到次数!' }],
        },
        ztcs: {
          rules: [{ required: true, message: '请输入早退次数!' }],
        },
        qjcs: {
          rules: [{ required: true, message: '请输入请假次数!' }],
        },
        jqcs: {
          rules: [{ required: true, message: '请输入记勤次数!' }],
        },
      },
      url: {
        list: '/hr/kaoqin/veHrKaoqin/list',
        delete: '/hr/kaoqin/veHrKaoqin/delete',
        deleteBatch: '/hr/kaoqin/veHrKaoqin/deleteBatch',
        exportXlsUrl: '/hr/kaoqin/veHrKaoqin/exportXls',
        importExcelUrl: '/hr/kaoqin/veHrKaoqin/importExcel',
        personUrl: '/hr/kaoqin/veHrKaoqinJilu/list',
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
      fieldList.push({ type: 'string', value: 'jsxm', text: '教师姓名', dictCode: '' })
      fieldList.push({ type: 'int', value: 'semid', text: '学期id', dictCode: '' })
      fieldList.push({ type: 'int', value: 'cqcs', text: '出勤次数', dictCode: '' })
      fieldList.push({ type: 'int', value: 'kkcs', text: '旷课次数', dictCode: '' })
      fieldList.push({ type: 'int', value: 'cdcs', text: '迟到次数', dictCode: '' })
      fieldList.push({ type: 'int', value: 'ztcs', text: '早退次数', dictCode: '' })
      fieldList.push({ type: 'int', value: 'qjcs', text: '请假次数', dictCode: '' })
      fieldList.push({ type: 'int', value: 'jqcs', text: '记勤次数', dictCode: '' })
      fieldList.push({ type: 'int', value: 'terminalid', text: '系统ID', dictCode: '' })
      this.superFieldList = fieldList
    },
    handleDetail: function (record) {
      this.$refs.modalForm.edit(record)
      this.$refs.modalForm.title = '详细记录'
      this.$refs.modalForm.disableSubmit = true
    },
  },
}
</script>
<style scoped>

</style>