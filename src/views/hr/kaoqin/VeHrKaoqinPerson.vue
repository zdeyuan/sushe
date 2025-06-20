<template>
  <div>
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="8" :lg="8" :md="9" :sm="24">
            <a-form-item label="所属学期">
              <j-dict-select-tag
                v-model="queryParam.semid"
                type="list"
                dictCode="ve_base_semester,XQMC,id"
                placeholder="请选择所属学期"
              />
            </a-form-item>
          </a-col>
          <a-col :xl="8" :lg="8" :md="8" :sm="24">
            <a-form-item label="考勤类型">
              <!-- <j-dict-select-tag
                v-model="queryParam.kqtype"
                type="list"
                dictCode="ve_dgsx_dictdata,title,code,modelCode='attendanceType'"
                placeholder="请选择考勤类型"
              /> -->
              <a-select v-model="queryParam.kqtype" placeholder="全部">
                <a-select-option value="">全部</a-select-option>
                <a-select-option value="1">出勤</a-select-option>
                <a-select-option value="2">旷课</a-select-option>
                <a-select-option value="3">迟到</a-select-option>
                <a-select-option value="4">早退</a-select-option>
                <a-select-option value="5">请假</a-select-option>
                <a-select-option value="6">记勤</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <template>
            <a-col :xl="12" :lg="13" :md="14" :sm="24">
              <a-form-item label="考勤时间">
                <j-date
                  placeholder="请选择开始日期"
                  class="query-group-cust"
                  v-model="queryParam.kqtime_begin"
                ></j-date>
                <span class="query-group-split-cust"></span>
                <j-date placeholder="请选择结束日期" class="query-group-cust" v-model="queryParam.kqtime_end"></j-date>
              </a-form-item>
            </a-col>
          </template>
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
      <a-button @click="batchDel" style="margin-right: 10px;" type="primary"><icon-text icon="iconbutton-delete">删除</icon-text></a-button>
      <a-button @click="searchQuery" style="margin-right: 10px;" type="primary"  ><icon-text icon="iconbutton-refresh">刷新</icon-text></a-button>
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
          <a @click="realEdit(record)" class="blue-txt">编辑</a>
          <a-divider type="vertical" />
          <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
            <a class="orange-txt">删除</a>
          </a-popconfirm>
        </span>
      </a-table>
    </div>

    <ve-hr-kaoqin-jilu-modal ref="modalForm" @ok="modalFormOk"></ve-hr-kaoqin-jilu-modal>
  </div>
</template>

<script>
import '@/assets/less/TableExpand.less'
import { mixinDevice } from '@/utils/mixin'
import { EduListMixin } from '@/mixins/EduListMixin'
import VeHrKaoqinJiluModal from './modules/VeHrKaoqinJiluModal'

export default {
  name: 'VeHrKaoqinJiluList',
  mixins: [EduListMixin, mixinDevice],
  components: {
    VeHrKaoqinJiluModal,
  },
  model: {
    prop: 'jobNumber',
    event: 'change',
  },
  props: {
    jobNumber: '',
      teacherid:'',
    extra: {
      default() {
        return {}
      },
      type: Object,
    },
  },
  data() {
    return {
      disableMixinCreated: true,
      description: 've_hr_kaoqin_jilu管理页面',
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
          title: '考勤类型',
          align: 'center',
          dataIndex: 'kqtype_dictText',
        },
        {
          title: '考勤时间',
          align: 'center',
          dataIndex: 'kqtime',
          customRender: function (text) {
            return !text ? '' : text.length > 10 ? text.substr(0, 10) : text
          },
        },
        {
          title: '所属学期',
          align: 'center',
          dataIndex: 'semid_dictText',
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
        list: '/hr/kaoqin/veHrKaoqinJilu/list',
        delete: '/hr/kaoqin/veHrKaoqinJilu/delete',
        deleteBatch: '/hr/kaoqin/veHrKaoqinJilu/deleteBatch',
        exportXlsUrl: '/hr/kaoqin/veHrKaoqinJilu/exportXls',
        importExcelUrl: '/hr/kaoqin/veHrKaoqinJilu/importExcel',
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
  mounted() {
    this.queryParam.gh = this.jobNumber
     this.queryParam.teacherid=this.teacherid
    this.searchQuery()
  },
  methods: {
    initDictConfig() {},
    getSuperFieldList() {
      let fieldList = []
      fieldList.push({ type: 'int', value: 'teacherid', text: '教师id', dictCode: '' })
      fieldList.push({ type: 'string', value: 'xm', text: '教师姓名', dictCode: '' })
      fieldList.push({ type: 'string', value: 'gh', text: '工号', dictCode: '' })
      fieldList.push({ type: 'int', value: 'kqtype', text: '考勤类型', dictCode: '' })
      fieldList.push({ type: 'Text', value: 'kqdesc', text: '考勤描述', dictCode: '' })
      fieldList.push({ type: 'date', value: 'kqtime', text: '考勤时间' })
      fieldList.push({ type: 'int', value: 'semid', text: '所属学期码', dictCode: '' })
      fieldList.push({ type: 'int', value: 'createuserid', text: '记录人', dictCode: '' })
      fieldList.push({ type: 'date', value: 'createtime', text: '记录时间' })
      fieldList.push({ type: 'int', value: 'terminalid', text: '系统ID', dictCode: '' })
      this.superFieldList = fieldList
    },
    handleEdit: function(record) {
      this.$refs.modalForm.edit(record,{
        disabledKeys:['gh','xm']
      })
      this.$refs.modalForm.title = '编辑'
      this.$refs.modalForm.disableSubmit = false
    },
    realEdit:function(record) {
      this.$refs.modalForm.edit(record,{
        disabledKeys:['gh','xm','semid','kqtype']
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