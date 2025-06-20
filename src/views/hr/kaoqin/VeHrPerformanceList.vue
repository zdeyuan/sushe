<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <!-- <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-col :xl="8" :lg="7" :md="8" :sm="24">
          <a-form-item label="姓名">
            <a-input placeholder="姓名" v-model="queryParam.userid"></a-input>
          </a-form-item>
        </a-col>
        <a-row :gutter="24">
          <a-col :xl="12" :lg="11" :md="12" :sm="24">
            <a-form-item label="考勤日期">
              <j-date placeholder="请选择开始日期" class="query-group-cust" v-model="queryParam.kqrq_begin"></j-date>
              <span class="query-group-split-cust"></span>
              <j-date placeholder="请选择结束日期" class="query-group-cust" v-model="queryParam.kqrq_end"></j-date>
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
    </div> -->

    <!-- table区域-begin -->
    <div>
      <a-table
        ref="table"
        size="middle"
        :scroll="{ x: true }"
        bordered
        rowKey="kqrq"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="false"
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
        <template slot="zb" slot-scope="text, record">
          <a-radio-group v-model="record.zb">
            <a-radio :value="1">是</a-radio>
            <a-radio :value="0">否</a-radio>
          </a-radio-group>
        </template>
        <template slot="sw" slot-scope="text, record">
          <a-radio-group v-model="record.sw">
            <a-radio :value="1">在职</a-radio>
            <a-radio :value="0">不在职</a-radio>
          </a-radio-group>
        </template>
        <template slot="xw" slot-scope="text, record">
          <a-radio-group v-model="record.xw">
            <a-radio :value="1">在职</a-radio>
            <a-radio :value="0">不在职</a-radio>
          </a-radio-group>
        </template>
        <template slot="ws" slot-scope="text, record">
          <a-radio-group v-model="record.ws">
            <a-radio :value="1">在职</a-radio>
            <a-radio :value="0">不在职</a-radio>
          </a-radio-group>
        </template>

        <span slot="action" slot-scope="text, record">
          <!-- &&isToday(record.kqrq) -->
          <a-button v-if="!record.id&&isToday(record.kqrq)" @click="addPerformance(record)" type="primary" style="margin-right: 10px;">提交</a-button>
        </span>
      </a-table>
    </div>

    <ve-hr-performance-modal ref="modalForm" @ok="modalFormOk"></ve-hr-performance-modal>
  </a-card>
</template>

<script>
import '@/assets/less/TableExpand.less'
import { mixinDevice } from '@/utils/mixin'
import { EduListMixin } from '@/mixins/EduListMixin'
import moment from 'moment'
import VeHrPerformanceModal from './modules/VeHrPerformanceModal'

import { postAction } from '@/api/hr/manage'

export default {
  mixins: [EduListMixin, mixinDevice],
  components: {
    VeHrPerformanceModal,
  },
  data() {
    return {
      description: 've_hr_performance管理页面',
      // 表头
      columns: [
        // {
        //   title: '#',
        //   dataIndex: '',
        //   key: 'rowIndex',
        //   width: 60,
        //   align: 'center',
        //   customRender: function (t, r, index) {
        //     return parseInt(index) + 1
        //   },
        // },
        // {
        //   title: '考勤日期',
        //   align: 'center',
        //   dataIndex: 'kqrq',
        //   customRender: function(text) {
        //     return !text ? '' : (text.length > 10 ? text.substr(0, 10) : text)
        //   }
        // },
        {
          title: '时间',
          align: 'center',
          dataIndex: 'kqrq',
          customRender: function (text, record) {
            return record.weekName + '\n' + record.kqrq
          },
        },
        {
          title: '值班 ',
          align: 'center',
          dataIndex: 'zb',
          scopedSlots: {
            customRender: 'zb',
          },
        },
        {
          title: '上午',
          align: 'center',
          dataIndex: 'sw',
          // customRender: function(text) {
          //   return text === 1 ? '在职' : (text === 0 ? '不在职' : '')
          // }
          scopedSlots: {
            customRender: 'sw',
          },
        },
        {
          title: '下午',
          align: 'center',
          dataIndex: 'xw',
          scopedSlots: {
            customRender: 'xw',
          },
        },
        {
          title: '晚上',
          align: 'center',
          dataIndex: 'ws',
          scopedSlots: {
            customRender: 'ws',
          },
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
        list: '/hr/kaoqin/veHrPerformance/myList',
        // delete: '/hr/kaoqin/veHrPerformance/delete',
        // deleteBatch: '/hr/kaoqin/veHrPerformance/deleteBatch',
        // exportXlsUrl: '/hr/kaoqin/veHrPerformance/exportXls',
        // importExcelUrl: '/hr/kaoqin/veHrPerformance/importExcel'
        addPerformance: '/hr/kaoqin/veHrPerformance/addMy',
      },
      dictOptions: {},
      superFieldList: [],
    }
  },
  created() {
    this.getSuperFieldList()
  },
  mounted() {
    // this.addPerformance()
  },
  computed: {
    importExcelUrl: function () {
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
    },
    isToday() {
      return function (date) {
        let day = moment(new Date(date)).format('YYYY-MM-DD')
        let today = moment(new Date()).format('YYYY-MM-DD')
        return day === today
      }
    },
  },
  methods: {
    initDictConfig() {},
    getSuperFieldList() {
      let fieldList = []
      fieldList.push({ type: 'date', value: 'kqrq', text: '考勤日期' })
      fieldList.push({ type: 'int', value: 'userid', text: '考勤用户id', dictCode: '' })
      fieldList.push({ type: 'int', value: 'zb', text: '是否值班', dictCode: '' })
      fieldList.push({ type: 'int', value: 'sw', text: '上午是否在职 ', dictCode: '' })
      fieldList.push({ type: 'int', value: 'xw', text: '下午是否在职 ', dictCode: '' })
      fieldList.push({ type: 'int', value: 'ws', text: '晚上是否在职  1=是  0=否', dictCode: '' })
      fieldList.push({ type: 'int', value: 'terminalid', text: '终端id', dictCode: '' })
      this.superFieldList = fieldList
    },
    addPerformance(record) {
      let that = this
      this.$customModel({
        title: '提示',
        content: '是否正确记录考勤？',
        cancelBtn: true,
        hasIcon: false,
        confirm: function () {
          let params = that.getQueryParams()
          params.pageNo = 1
          params.zb = record.zb
          params.sw = record.sw
          params.xw = record.xw
          params.ws = record.ws
          params.kqrq = record.kqrq

          // that.loading = true
          postAction(that.url.addPerformance, params).then((res) => {
            // that.loading = false
            if (res.success) {
              // that.$nextTick(()=>{
              that.searchQuery()
              // })
            }
          })
        },
      })
    },
  },
}
</script>
<style scoped>

</style>