<!--
 * @since: 2021-03-17 16:42:54
 * @lastTime: 2021-03-20 17:31:15
 * @Description: 合同查询个人列表
-->
<template>
  <a-card :bordered="false">
    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button @click="clearSearch" icon="rollback">返回</a-button>
      <a-button @click="handleEdit(extra)" style="margin-right: 10px;" type="primary" icon="plus">新增</a-button>
      <a-button @click="batchDel" style="margin-right: 10px;" type="primary" ><icon-text icon="iconbutton-delete">删除</icon-text></a-button>
      <a-button type="primary" style="margin-right: 10px;"   @click="searchQuery"><icon-text icon="iconbutton-refresh">刷新</icon-text></a-button>
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
        :rowSelection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
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
          <a @click="handleEdit(record)" class="green-txt">编辑</a>
          <a-divider type="vertical" />
          <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
            <a class="orange-txt">删除</a>
          </a-popconfirm>
        </span>
      </a-table>
    </div>

    <ve-hr-hetong-modal ref="modalForm" @ok="modalFormOk"></ve-hr-hetong-modal>
  </a-card>
</template>

<script>
import '@/assets/less/TableExpand.less'
import { mixinDevice } from '@/utils/mixin'
import { EduListMixin } from '@/mixins/EduListMixin'
import VeHrHetongModal from './modules/VeHrHetongModal'

export default {
  name: 'VeHrHetongPersonalList',
  mixins: [EduListMixin, mixinDevice],
  components: {
    VeHrHetongModal,
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
      description: '合同查询个人列表',
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
          title: '合同开始时间',
          align: 'center',
          dataIndex: 'starttime',
          customRender: function (text) {
            return !text ? '' : text.length > 10 ? text.substr(0, 10) : text
          },
        },
        {
          title: '合同结束时间',
          align: 'center',
          dataIndex: 'endtime',
          customRender: function (text) {
            return !text ? '' : text.length > 10 ? text.substr(0, 10) : text
          },
        },
        {
          title: '是否为当前合同',
          align: 'center',
          dataIndex: 'status',
          customRender: function (text) {
            return text == 1 ? '是' : '否'
          },
        },
        {
          title: '合同附件',
          align: 'center',
          dataIndex: 'fileUrl',
          scopedSlots: { customRender: 'fileSlot' },
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
        list: '/hr/base/veHrHetong/list',
        delete: '/hr/base/veHrHetong/delete',
        deleteBatch: '/hr/base/veHrHetong/deleteBatch',
        exportXlsUrl: '/hr/base/veHrHetong/exportXls',
        importExcelUrl: '/hr/base/veHrHetong/importExcel',
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
      fieldList.push({ type: 'int', value: 'teacherid', text: '老师表id', dictCode: '' })
      fieldList.push({ type: 'string', value: 'gh', text: '工号', dictCode: '' })
      fieldList.push({ type: 'string', value: 'xm', text: '姓名', dictCode: '' })
      fieldList.push({ type: 'date', value: 'starttime', text: '合同开始时间' })
      fieldList.push({ type: 'date', value: 'endtime', text: '合同结束时间' })
      fieldList.push({ type: 'int', value: 'fileid', text: '合同附件id', dictCode: '' })
      fieldList.push({ type: 'Text', value: 'content', text: '描述', dictCode: '' })
      fieldList.push({ type: 'int', value: 'status', text: '是否为当前合同1当前2非当前', dictCode: '' })
      fieldList.push({ type: 'int', value: 'createuserid', text: 'createuserid', dictCode: '' })
      fieldList.push({ type: 'date', value: 'createtime', text: 'createtime' })
      fieldList.push({ type: 'int', value: 'terminalid', text: 'terminalid', dictCode: '' })
      this.superFieldList = fieldList
    },
    clearSearch() {
      this.$emit('change', '')
      this.searchReset()
    },
    handleEdit: function(record) {
      this.$refs.modalForm.edit(record,{
        disabledKeys:['gh','xm']
      })
      this.$refs.modalForm.title = '编辑'
      this.$refs.modalForm.disableSubmit = false
    },
  },
}
</script>
<style scoped>

</style>
