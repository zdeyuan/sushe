<template>
  <div>
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">
          <a-col :xl="8" :lg="7" :md="8" :sm="24">
            <a-form-item label="奖励级别">
              <j-dict-select-tag
                placeholder="请选择奖励级别"
                v-model="queryParam.jljbm"
                type="list"
                dictCode="ve_dict_dictdata,title,code,modelCode='JLJB'"
              />
            </a-form-item>
          </a-col>
          <a-col :xl="8" :lg="7" :md="8" :sm="24">
            <a-form-item label="奖励等级">
              <j-dict-select-tag
                placeholder="请选择奖励等级"
                v-model="queryParam.jldjm"
                type="list"
                dictCode="ve_dict_dictdata,title,code,modelCode='JLDJ'"
              />
            </a-form-item>
          </a-col>
          <a-col :xl="8" :lg="7" :md="8" :sm="24">
            <a-form-item label="获奖类别">
              <j-dict-select-tag
                placeholder="请选择获奖类别"
                v-model="queryParam.hjlbm"
                type="list"
                dictCode="ve_dict_dictdata,title,code,modelCode='JLLB'"
              />
            </a-form-item>
          </a-col>
          <!-- <a-col :xl="8" :lg="7" :md="8" :sm="24">
            <a-form-item label="姓名">
              <a-input placeholder="请输入姓名" v-model="queryParam.xm"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="8" :lg="7" :md="8" :sm="24">
            <a-form-item label="工号">
              <a-input placeholder="请输入工号" v-model="queryParam.gh"></a-input>
            </a-form-item>
          </a-col> -->
          <!-- <template v-if="toggleSearchStatus"> -->

          <a-col :xl="12" :lg="11" :md="12" :sm="24">
            <a-form-item label="获奖日期">
              <j-date placeholder="请选择开始日期" class="query-group-cust" v-model="queryParam.hjrq_begin"></j-date>
              <span class="query-group-split-cust"></span>
              <j-date placeholder="请选择结束日期" class="query-group-cust" v-model="queryParam.hjrq_end"></j-date>
            </a-form-item>
          </a-col>
          <!-- </template> -->
          <a-col :xl="8" :lg="7" :md="8" :sm="24">
            <span style="float: left; overflow: hidden" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search"  style="margin-right: 10px;">搜索</a-button>
              <a-button type="primary" @click="searchReset"   style="margin-right: 10px;"
                ><icon-text icon="iconbutton-clear">清空</icon-text></a-button
              >
              <!-- <a @click="handleToggleSearch" >
                {{ toggleSearchStatus ? '收起' : '展开' }}
                <a-icon :type="toggleSearchStatus ? 'up' : 'down'" />
              </a> -->
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <!-- 查询区域-END -->

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <!-- <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button> -->
      
      <a-button @click="clearSearch" icon="rollback">返回</a-button>
      <a-button @click="handleEdit(extra)" style="margin-right: 10px;" type="primary" icon="plus">新增</a-button>
      <a-button @click="batchDel" style="margin-right: 10px;" type="primary" ><icon-text icon="iconbutton-delete">删除</icon-text></a-button>
      <!-- <a-button type="primary" style="margin-right: 10px;"   @click="handleExportXls('教职工奖金')"><icon-text icon="iconbutton-export">导出</icon-text></a-button> -->
      <a-button @click="searchQuery" style="margin-right: 10px;" type="primary"  ><icon-text icon="iconbutton-refresh">刷新</icon-text></a-button>
      <!-- <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl"
                @change="handleImportExcel">
        <a-button type="primary"   ><icon-text icon="iconbutton-import">导入</icon-text></a-button>
      </a-upload> -->
      <!-- 高级查询区域 -->
      <!-- <j-super-query :fieldList="superFieldList" ref="superQueryModal"
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
      </a-dropdown> -->
    </div>

    <!-- table区域-begin -->
    <div>
      <!-- <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a
        style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div> -->

      <a-table
        ref="table"
        size="middle"
        :scroll="{ x: true }"
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
          <!-- <a @click="handleEdit(record)">编辑</a> -->
          <a @click="handleDetail(record)" class="green-txt">查看</a>
          <a-divider type="vertical" />
          <a @click="handleEdit(record)" class="blue-txt">编辑</a>
          <a-divider type="vertical" />
          <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
            <a class="orange-txt">删除</a>
          </a-popconfirm>

          <!-- <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a @click="handleDetail(record)">查看</a>
              </a-menu-item>
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown> -->
        </span>
      </a-table>
    </div>

    <hq-hr-jiangli-modal ref="modalForm" @ok="modalFormOk"></hq-hr-jiangli-modal>
  </div>
</template>

<script>
import '@/assets/less/TableExpand.less'
import { mixinDevice } from '@/utils/mixin'
import { EduListMixin } from '@/mixins/EduListMixin'
import HqHrJiangliModal from './modules/HqHrJiangliModal'
import { filterMultiDictText } from '@/components/dict/JDictSelectUtil'

export default {
  mixins: [EduListMixin, mixinDevice],
  components: {
    HqHrJiangliModal,
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
      description: '教职工奖金管理页面',
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
          title: '奖励级别',
          align: 'center',
          dataIndex: 'jljbm_dictText',
        },
        {
          title: '奖励等级',
          align: 'center',
          dataIndex: 'jldjm_dictText',
        },
        {
          title: '获奖类别',
          align: 'center',
          dataIndex: 'hjlbm_dictText',
        },
        {
          title: '获奖日期',
          align: 'center',
          dataIndex: 'hjrq',
          customRender: function (text) {
            return !text ? '' : text.length > 10 ? text.substr(0, 10) : text
          },
        },
        {
          title: '奖励名称',
          align: 'center',
          dataIndex: 'jlmc',
        },
        {
          title: '获奖项目',
          align: 'center',
          dataIndex: 'hjxm',
        },
        {
          title: '奖励方式',
          align: 'center',
          dataIndex: 'jlfsm_dictText',
        },
        {
          title: '颁奖单位',
          align: 'center',
          dataIndex: 'bjdw',
        },
        {
          title: '荣誉称号',
          align: 'center',
          dataIndex: 'rychm_dictText',
        },
        // {
        //   title: '获奖角色',
        //   align: 'center',
        //   dataIndex: 'hjjsm_dictText'
        // },
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
        list: '/hr/rewardpublish/hqHrJiangli/list',
        delete: '/hr/rewardpublish/hqHrJiangli/delete',
        deleteBatch: '/hr/rewardpublish/hqHrJiangli/deleteBatch',
        exportXlsUrl: '/hr/rewardpublish/hqHrJiangli/exportXls',
        importExcelUrl: '/hr/rewardpublish/hqHrJiangli/importExcel',
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
      fieldList.push({ type: 'string', value: 'gh', text: '工号', dictCode: '' })
      fieldList.push({ type: 'string', value: 'xm', text: '姓名', dictCode: '' })
      fieldList.push({ type: 'string', value: 'jljbm', text: '奖励级别码', dictCode: '' })
      fieldList.push({ type: 'string', value: 'jldjm', text: '奖励等级码', dictCode: '' })
      fieldList.push({ type: 'string', value: 'hjlbm', text: '获奖类别码', dictCode: '' })
      fieldList.push({ type: 'date', value: 'hjrq', text: '获奖日期' })
      fieldList.push({ type: 'string', value: 'jlmc', text: '奖励名称', dictCode: '' })
      fieldList.push({ type: 'string', value: 'jlmcm', text: '奖励名称码', dictCode: '' })
      fieldList.push({ type: 'string', value: 'hjxm', text: '获奖项目', dictCode: '' })
      fieldList.push({ type: 'string', value: 'jlfsm', text: '奖励方式码', dictCode: '' })
      fieldList.push({ type: 'string', value: 'hjyy', text: '获奖原因', dictCode: '' })
      fieldList.push({ type: 'string', value: 'jlnr', text: '奖励内容', dictCode: '' })
      fieldList.push({ type: 'string', value: 'bjdw', text: '颁奖单位', dictCode: '' })
      fieldList.push({ type: 'string', value: 'rychm', text: '荣誉称号码', dictCode: '' })
      fieldList.push({ type: 'string', value: 'hjjsm', text: '获奖角色码', dictCode: '' })
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