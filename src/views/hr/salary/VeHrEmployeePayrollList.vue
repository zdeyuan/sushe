<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="8" :lg="7" :md="8" :sm="24">
            <a-form-item label="人员姓名">
              <a-input placeholder="请输入人员姓名" v-model="queryParam.empName"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="8" :lg="7" :md="8" :sm="24">
            <a-form-item label="工资条日期">
              <j-month placeholder="请选择工资条日期" v-model="queryParam.payrollDate"></j-month>
            </a-form-item>
          </a-col>
          <template v-if="toggleSearchStatus">
            <a-col :xl="8" :lg="7" :md="8" :sm="24">
              <a-form-item label="身份证号">
                <a-input placeholder="请输入身份证号" v-model="queryParam.idCard"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="8" :lg="7" :md="8" :sm="24">
              <a-form-item label="岗位">
                <j-dict-select-tag
                  placeholder="请输选择岗位"
                  v-model="queryParam.post"
                  type="list"
                  dictCode="ve_hr_gangwei,title,id"
                ></j-dict-select-tag>
              </a-form-item>
            </a-col>
          </template>
          <a-col :xl="8" :lg="7" :md="8" :sm="24">
            <span style="float: left; overflow: hidden" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search"  style="margin-right: 10px;">搜索</a-button>
              <a-button type="primary" @click="searchReset" style="margin-right: 10px;" 
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
      <a-button
        style="margin-right: 10px;"
        type="primary"
        @click="
          handleImport({
            tokenHeader: tokenHeader,
            downFunc: () => modalDownLoad('工资表'),
            importExcelUrl: importExcelUrl,
          })
        ">
        <icon-text icon="iconbutton-import"> 导入 </icon-text></a-button>

      <a-button type="primary" style="margin-right: 10px;" @click="handleExportXls('在职人员工资表')"
        ><icon-text icon="iconbutton-export">导出</icon-text></a-button
      >
      <a-button type="primary" style="margin-right: 10px;" @click="searchQuery"
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
          <a class="blue-txt" @click="handleDetail(record)">查看</a>
        </span>
      </a-table>
    </div>

    <ve-hr-employee-payroll-modal ref="modalForm" @ok="modalFormOk"></ve-hr-employee-payroll-modal>
    <import-modal ref="importModal" @ok="modalFormOk"></import-modal>
  </a-card>
</template>

<script>
import '@/assets/less/TableExpand.less'
import { mixinDevice } from '@/utils/mixin'
import { EduListMixin } from '@/mixins/EduListMixin'
import VeHrEmployeePayrollModal from './modules/VeHrEmployeePayrollModal'
import { downFile } from '@/api/hr/manage'
import ImportModal from '@/components/ImportModal/importModal.vue'

export default {
  name: 'VeHrEmployeePayrollList',
  mixins: [EduListMixin, mixinDevice],
  components: {
    VeHrEmployeePayrollModal,
    ImportModal
  },
  data() {
    return {
      description: '在职人员工资表管理页面',
      tabPaths: ['工资津贴', '工资表'],
      // 表头
      columns: [
        {
          title: '序号',
          fixed: 'left',
          dataIndex: '',
          key: 'rowIndex',
          width: 60,
          align: 'center',
          customRender: function (t, r, index) {
            return parseInt(index) + 1
          },
        },
        {
          title: '姓名',
          fixed: 'left',
          // width: 100,
          align: 'center',
          dataIndex: 'empName',
        },
        {
          title: '身份证号',
          fixed: 'left',
          // width: 100,
          align: 'center',
          dataIndex: 'idCard',
        },
        {
          title: '岗位',
          fixed: 'left',
          // width: 100,
          align: 'center',
          dataIndex: 'post_dictText',
        },
        {
          title: '岗位工资',
          align: 'center',
          dataIndex: 'postPay',
        },
        {
          title: '薪级工资',
          align: 'center',
          dataIndex: 'payScalePay',
        },
        {
          title: '基本工资津贴（10%）',
          align: 'center',
          dataIndex: 'basicPayAllow',
        },
        {
          title: '教龄工资',
          align: 'center',
          dataIndex: 'seniorityPay',
        },
        {
          title: '纪检津贴',
          align: 'center',
          dataIndex: 'jjAllow',
        },
        {
          title: '综治津贴',
          align: 'center',
          dataIndex: 'zzAllow',
        },
        {
          title: '绩效津贴',
          align: 'center',
          dataIndex: 'achievementAllow',
        },
        {
          title: '合计',
          align: 'center',
          dataIndex: 'total',
        },
        {
          title: '取暖费',
          align: 'center',
          dataIndex: 'heatingFee',
        },
        {
          title: '独生子女费',
          align: 'center',
          dataIndex: 'dsznFee',
        },
        {
          title: '班主任津贴',
          align: 'center',
          dataIndex: 'headmasterAllow',
        },
        {
          title: '话费',
          align: 'center',
          dataIndex: 'phoneBill',
        },
        {
          title: '补发工资',
          align: 'center',
          dataIndex: 'reissuePay',
        },
        {
          title: '临时工资',
          align: 'center',
          dataIndex: 'tempPay',
        },
        {
          title: '课时津贴',
          align: 'center',
          dataIndex: 'ksAllow',
        },
        {
          title: '卫生费',
          align: 'center',
          dataIndex: 'hygieneFee',
        },
        {
          title: '本月补发小计',
          align: 'center',
          dataIndex: 'bybfSubtotal',
        },
        {
          title: '工会会费',
          align: 'center',
          dataIndex: 'unionDues',
        },
        {
          title: '公积金',
          align: 'center',
          dataIndex: 'providentFund',
        },
        {
          title: '医保',
          align: 'center',
          dataIndex: 'medicalIns',
        },
        {
          title: '养老保险',
          align: 'center',
          dataIndex: 'endowmentIns',
        },
        {
          title: '职业年金',
          align: 'center',
          dataIndex: 'occpAnnuity',
        },
        {
          title: '专项扣除',
          align: 'center',
          dataIndex: 'specDeduct',
        },
        {
          title: '补扣工会经费',
          align: 'center',
          dataIndex: 'bkGhJf',
        },
        {
          title: '扣公积金-社保',
          align: 'center',
          dataIndex: 'kgjjSb',
        },
        {
          title: '税款',
          align: 'center',
          dataIndex: 'taxes',
        },
        {
          title: '代扣小计',
          align: 'center',
          dataIndex: 'withholdSubtotal',
        },
        {
          title: '财政统发工资数',
          align: 'center',
          dataIndex: 'czTfGzs',
        },
        {
          title: '补发金额',
          align: 'center',
          dataIndex: 'bfJe',
        },
        {
          title: '实发合计',
          align: 'center',
          dataIndex: 'sfTotal',
        },
        {
          title: '工资条日期',
          align: 'center',
          dataIndex: 'payrollDate',
          customRender: function (text) {
            return !text ? '' : text.length > 10 ? text.substr(0, 10) : text
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
        list: '/hr/veHrEmployeePayroll/list',
        delete: '/hr/veHrEmployeePayroll/delete',
        deleteBatch: '/hr/veHrEmployeePayroll/deleteBatch',
        exportXlsUrl: '/hr/veHrEmployeePayroll/exportXls',
        exportXlsTemplateUrl: '/hr/veHrEmployeePayroll/exportXlsTemplate',
        importExcelUrl: 'hr/veHrEmployeePayroll/importExcel',
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
      fieldList.push({ type: 'string', value: 'empName', text: '人员姓名' })
      fieldList.push({ type: 'number', value: 'postPay', text: '岗位工资' })
      fieldList.push({ type: 'number', value: 'payScalePay', text: '薪级工资' })
      fieldList.push({ type: 'number', value: 'basicPayAllow', text: '基本工资津贴（10%）' })
      fieldList.push({ type: 'number', value: 'seniorityPay', text: '教龄工资' })
      fieldList.push({ type: 'number', value: 'jjAllow', text: '纪检津贴' })
      fieldList.push({ type: 'number', value: 'zzAllow', text: '综治津贴' })
      fieldList.push({ type: 'number', value: 'achievementAllow', text: '绩效津贴' })
      fieldList.push({ type: 'number', value: 'total', text: '合计' })
      fieldList.push({ type: 'number', value: 'heatingFee', text: '取暖费' })
      fieldList.push({ type: 'number', value: 'dsznFee', text: '独生子女费' })
      fieldList.push({ type: 'number', value: 'headmasterAllow', text: '班主任津贴' })
      fieldList.push({ type: 'number', value: 'phoneBill', text: '话费' })
      fieldList.push({ type: 'number', value: 'reissuePay', text: '补发工资' })
      fieldList.push({ type: 'number', value: 'tempPay', text: '临时工资' })
      fieldList.push({ type: 'number', value: 'ksAllow', text: '课时津贴' })
      fieldList.push({ type: 'number', value: 'hygieneFee', text: '卫生费' })
      fieldList.push({ type: 'number', value: 'bybfSubtotal', text: '本月补发小计' })
      fieldList.push({ type: 'number', value: 'unionDues', text: '工会会费' })
      fieldList.push({ type: 'number', value: 'providentFund', text: '公积金' })
      fieldList.push({ type: 'number', value: 'medicalIns', text: '医保' })
      fieldList.push({ type: 'number', value: 'endowmentIns', text: '养老保险' })
      fieldList.push({ type: 'number', value: 'occpAnnuity', text: '职业年金' })
      fieldList.push({ type: 'number', value: 'specDeduct', text: '专项扣除' })
      fieldList.push({ type: 'number', value: 'bkGhJf', text: '补扣工会经费' })
      fieldList.push({ type: 'number', value: 'kgjjSb', text: '扣公积金-社保' })
      fieldList.push({ type: 'number', value: 'taxes', text: '税款' })
      fieldList.push({ type: 'number', value: 'withholdSubtotal', text: '代扣小计' })
      fieldList.push({ type: 'number', value: 'czTfGzs', text: '财政统发工资数' })
      fieldList.push({ type: 'number', value: 'bfJe', text: '补发金额' })
      fieldList.push({ type: 'number', value: 'sfTotal', text: '实发合计' })
      fieldList.push({ type: 'date', value: 'payrollDate', text: '工资条日期' })
      fieldList.push({ type: 'string', value: 'idCard', text: '身份证号' })
      fieldList.push({ type: 'string', value: 'post', text: '岗位' })
      this.superFieldList = fieldList
    },

    handleExportXlsTemplate() {
      console.log('handleExportXlsTemplate')
      downFile(this.url.exportXlsTemplateUrl, null).then((data) => {
        if (!data) {
          this.$message.warning('文件下载失败')
          return
        }
        if (typeof window.navigator.msSaveBlob !== 'undefined') {
          window.navigator.msSaveBlob(
            new Blob([data], { type: 'application/vnd.ms-excel' }),
            '在职人员工资表模板' + '.xls'
          )
        } else {
          let url = window.URL.createObjectURL(new Blob([data], { type: 'application/vnd.ms-excel' }))
          let link = document.createElement('a')
          link.style.display = 'none'
          link.href = url
          link.setAttribute('download', '在职人员工资表模板' + '.xls')
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link) //下载完成移除元素
          window.URL.revokeObjectURL(url) //释放掉blob对象
        }
      })
    },
  },
}
</script>
<style scoped>

</style>
