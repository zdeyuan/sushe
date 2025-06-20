<template>
  <div>
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="8" :lg="7" :md="8" :sm="24">
            <a-form-item label="部门">
              <j-dict-select-tag
                v-model="queryParam.departId"
                type="list"
                dictCode="ve_base_department,JGMC,id"
                placeholder="请选择部门"
              />
            </a-form-item>
          </a-col>
          <a-col :xl="8" :lg="7" :md="8" :sm="24">
            <a-form-item label="姓名">
              <a-input placeholder="请输入姓名" v-model="queryParam.xm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="12" :lg="11" :md="12" :sm="24">
            <a-form-item label="统计时间(选择的日期的那一周)">
              <j-date placeholder="请选择日期" class="query-group-cust" v-model="queryParam.kqrq"></j-date>
            </a-form-item>
          </a-col>

          <a-col :xl="8" :lg="7" :md="8" :sm="24">
            <span style="float: left; overflow: hidden" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search"  style="margin-right: 10px;">搜索</a-button>
              <!-- <a-button type="primary" @click="searchReset"  style="margin-right: 10px;"><icon-text icon="iconbutton-clear">清空</icon-text></a-button> -->
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <!-- table区域-begin -->
    <div>
      <a-table
        ref="table"
        size="middle"
        :scroll="{ x: true }"
        bordered
        rowKey="userid"
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
      </a-table>
    </div>

    <ve-hr-kaoqin-jilu-modal ref="modalForm" @ok="modalFormOk"></ve-hr-kaoqin-jilu-modal>
  </div>
</template>

<script>
import '@/assets/less/TableExpand.less'
import { mixinDevice } from '@/utils/mixin'
import { EduListMixin } from '@/mixins/EduListMixin'
import moment from 'moment'
import VeHrKaoqinJiluModal from './modules/VeHrKaoqinJiluModal'

export default {
  mixins: [EduListMixin, mixinDevice],
  components: {
    VeHrKaoqinJiluModal,
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
          title: '部门',
          align: 'center',
          dataIndex: 'depid_dictText',
        },
        {
          title: '姓名',
          align: 'center',
          dataIndex: 'userid_dictText',
        },
        {
          title: '周一',
          align: 'center',
          dataIndex: 'weekStatisticVOS.0.dayTotal',
          customRender: function (text) {
            return text || '0'
          },
        },
        {
          title: '周二',
          align: 'center',
          dataIndex: 'weekStatisticVOS.1.dayTotal',
          customRender: function (text) {
            return text || '0'
          },
        },
        {
          title: '周三',
          align: 'center',
          dataIndex: 'weekStatisticVOS.2.dayTotal',
          customRender: function (text) {
            return text || '0'
          },
        },
        {
          title: '周四',
          align: 'center',
          dataIndex: 'weekStatisticVOS.3.dayTotal',
          customRender: function (text) {
            return text || '0'
          },
        },
        {
          title: '周五',
          align: 'center',
          dataIndex: 'weekStatisticVOS.4.dayTotal',
          customRender: function (text) {
            return text || '0'
          },
        },
        {
          title: '周六',
          align: 'center',
          dataIndex: 'weekStatisticVOS.5.dayTotal',
          customRender: function (text) {
            return text || '0'
          },
        },
        {
          title: '周日',
          align: 'center',
          dataIndex: 'weekStatisticVOS.6.dayTotal',
          customRender: function (text) {
            return text || '0'
          },
        },
        {
          title: '总计',
          align: 'center',

          dataIndex: 'weekTotal',
          customRender: function (text) {
            return text || '0'
          },
        },
      ],
      url: {
        list: '/hr/kaoqin/veHrPerformance/weekStatistic',
        // delete: '/hr/kaoqin/veHrKaoqinJilu/delete',
        // deleteBatch: '/hr/kaoqin/veHrKaoqinJilu/deleteBatch',
        // exportXlsUrl: '/hr/kaoqin/veHrKaoqinJilu/exportXls',
        // importExcelUrl: '/hr/kaoqin/veHrKaoqinJilu/importExcel'
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
    let today = moment(new Date()).format('YYYY-MM-DD')
    this.queryParam.kqrq = today
    this.loadData()
  },
  methods: {
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
  },
}
</script>
<style scoped>

</style>