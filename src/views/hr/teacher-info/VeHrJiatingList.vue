<!--
 * @since: 2021-03-17 16:42:54
 * @lastTime: 2021-03-20 15:27:34
 * @Description: 家庭信息查询
-->
<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="8" :lg="7" :md="8" :sm="24">
            <a-form-item label="姓名">
              <a-input placeholder="请输入姓名" v-model="queryParam.xm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="8" :lg="7" :md="8" :sm="24">
            <a-form-item label="工号">
              <a-input placeholder="请输入工号" v-model="queryParam.gh"></a-input>
            </a-form-item>
          </a-col>
          <!-- <a-col :xl="8" :lg="7" :md="8" :sm="24">
            <a-form-item label="身份证件号">
              <a-input placeholder="请输入身份证件号" v-model="queryParam.sfzjh"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="8" :lg="7" :md="8" :sm="24">
            <a-form-item label="当前状态">
              <j-dict-select-tag
                type="list"
                placeholder="当前状态"
                v-model="queryParam.dqztm"
                dictCode="ve_dict_dictdata,title,code,modelCode='JZGDQZT'"
                pcode=""
              />
            </a-form-item>
          </a-col> -->
          <!-- <template > -->
          <!-- <a-col :xl="8" :lg="7" :md="8" :sm="24">
            <a-form-item label="编制类别">
              <j-dict-select-tag
                placeholder="编制类别"
                type="list"
                dictCode="ve_dict_dictdata,title,code,modelCode='BZLB'"
                v-model="queryParam.bzlbm"
              ></j-dict-select-tag>
            </a-form-item>
          </a-col>
          <a-col :xl="8" :lg="7" :md="8" :sm="24">
            <a-form-item label="部门">
              <j-dict-select-tag
                placeholder="部门"
                type="list"
                dictCode="ve_base_department,JGMC,id"
                v-model="queryParam.depid"
              ></j-dict-select-tag>
            </a-form-item>
          </a-col>
          <a-col :xl="8" :lg="7" :md="8" :sm="24">
            <a-form-item label="专业组">
              <j-dict-select-tag
                placeholder="专业组"
                type="list"
                dictCode="ve_base_jyz,JYZMC,id"
                v-model="queryParam.jyzid"
              ></j-dict-select-tag>
            </a-form-item>
          </a-col>
          <a-col :xl="8" :lg="7" :md="8" :sm="24">
            <a-form-item label="教职工类别">
              <j-dict-select-tag
                placeholder="教职工类别"
                type="list"
                dictCode="ve_dict_dictdata,title,code,modelCode='JZGLB'"
                v-model="queryParam.jzglbm"
              ></j-dict-select-tag>
            </a-form-item>
          </a-col> -->
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
      <a-button type="primary" style="margin-right: 10px;"   @click="handleExportXls('教职工信息')"><icon-text icon="iconbutton-export">导出</icon-text></a-button>
      <a-button type="primary" style="margin-right: 10px;"   @click="searchQuery"><icon-text icon="iconbutton-refresh">刷新</icon-text></a-button>
    </div>

    <!-- table区域-begin -->
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
          <a class="green-txt" @click="handleDetail(record)">查看</a>
        </span>

      </a-table>
    </div>

    <ve-hr-jiating-modal ref="modalForm" @ok="modalFormOk"></ve-hr-jiating-modal>
  </a-card>
</template>

<script>

import '@/assets/less/TableExpand.less'
import { mixinDevice } from '@/utils/mixin'
import { EduListMixin } from '@/mixins/EduListMixin'
import VeHrJiatingModal from './modules/VeHrJiatingModal'

export default {
  name: 'VeHrJiatingList',
  mixins: [EduListMixin, mixinDevice],
  components: {
    VeHrJiatingModal
  },
  data() {
    return {
      description: 've_hr_jiating管理页面',
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
          title: '家庭电话',
          align: 'center',
          dataIndex: 'jtdh'
        },
        {
          title: '家庭联系人',
          align: 'center',
          dataIndex: 'jtlxr'
        },
        {
          title: '家庭住址',
          align: 'center',
          dataIndex: 'jtzz'
        },
        {
          title: '邮政编码',
          align: 'center',
          dataIndex: 'jtyzbm'
        },
        {
          title: '家庭人口',
          align: 'center',
          dataIndex: 'jtrk'
        },
        {
          title: '主要收入来源',
          align: 'center',
          dataIndex: 'jtzysrly'
        },
        {
          title: '月收入金额 ',
          align: 'center',
          dataIndex: 'jtysrje'
        },
        {
          title: '年收入金额',
          align: 'center',
          dataIndex: 'jtnsrje'
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
      url: {
        list: '/hr/base/veHrJiating/list',
        delete: '/hr/base/veHrJiating/delete',
        deleteBatch: '/hr/base/veHrJiating/deleteBatch',
        exportXlsUrl: '/hr/base/veHrJiating/exportXls',
        importExcelUrl: '/hr/base/veHrJiating/importExcel'

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
      fieldList.push({ type: 'int', value: 'teacherid', text: '教师id', dictCode: '' })
      fieldList.push({ type: 'string', value: 'gh', text: '工号', dictCode: '' })
      fieldList.push({ type: 'string', value: 'xm', text: '姓名', dictCode: '' })
      fieldList.push({ type: 'string', value: 'jtzz', text: '家庭住址', dictCode: '' })
      fieldList.push({ type: 'string', value: 'jtyzbm', text: '家庭邮政编码', dictCode: '' })
      fieldList.push({ type: 'string', value: 'jtdh', text: '家庭电话', dictCode: '' })
      fieldList.push({ type: 'string', value: 'jtlxr', text: '家庭联系人', dictCode: '' })
      fieldList.push({ type: 'int', value: 'jtrk', text: '家庭人口', dictCode: '' })
      fieldList.push({ type: 'string', value: 'jtzysrly', text: '家庭主要收入来源', dictCode: '' })
      fieldList.push({ type: 'string', value: 'jtysrje', text: '家庭月收入金额 ', dictCode: '' })
      fieldList.push({ type: 'string', value: 'jtnsrje', text: '家庭年收入金额', dictCode: '' })
      fieldList.push({ type: 'int', value: 'terminalid', text: '系统ID', dictCode: '' })
      this.superFieldList = fieldList
    }
  }
}
</script>
<style scoped>

</style>
