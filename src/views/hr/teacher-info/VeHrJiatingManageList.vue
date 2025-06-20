<!--
 * @since: 2021-03-20 14:39:36
 * @lastTime: 2021-03-23 18:05:48
 * @Description: 家庭信息管理
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

          <a-col :xl="8" :lg="7" :md="8" :sm="24">
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
          </a-col>
          <!-- <template > -->
          <a-col :xl="8" :lg="7" :md="8" :sm="24">
            <a-form-item label="编制">
              <j-dict-select-tag
                placeholder="编制"
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
          </a-col>
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
      <!-- <a-button type="primary" style="margin-right: 10px;"   @click="handleExportXls('家庭信息管理')"><icon-text icon="iconbutton-export">导出</icon-text></a-button> -->
      <a-button
        style="margin-right: 10px;"
        type="primary"
        @click="
          handleImport({
            tokenHeader: tokenHeader,
            downFunc: () => modalDownLoad('家庭信息'),
            importExcelUrl: importExcelUrl,
          })
        ">
        <icon-text icon="iconbutton-import"> 导入 </icon-text></a-button>

      <a-button type="primary" style="margin-right: 10px;"   @click="searchQuery"><icon-text icon="iconbutton-refresh">刷新</icon-text></a-button>
    </div>

    <!-- table区域-begin -->
    <div>
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
          <a
            v-if="record.dqztm_dictText === '在职' || record.dqztm_dictText === '返聘'"
            class="blue-txt"
            @click="getModelData(record.gh)"
            >家庭信息</a
          >
        </span>
      </a-table>
    </div>

    <!-- <base-teacher-modal ref="modalForm" @ok="modalFormOk"></base-teacher-modal> -->
    <ve-hr-jiating-modal ref="modalForm" @ok="modalFormOk"></ve-hr-jiating-modal>
    <import-modal ref="importModal" @ok="modalFormOk"></import-modal>
  </a-card>
</template>

<script>
import '@/assets/less/TableExpand.less'
import { mixinDevice } from '@/utils/mixin'
import { EduListMixin } from '@/mixins/EduListMixin'
import { loadCategoryData } from '@/api/hr/api'
import VeHrJiatingModal from './modules/VeHrJiatingModal'
import { getAction } from '@/api/hr/manage'
import ImportModal from '@/components/ImportModal/importModal.vue'

export default {
  mixins: [EduListMixin, mixinDevice],
  components: { VeHrJiatingModal,
    ImportModal },
  data() {
    return {
      description: '教职工信息页面',
      isPerson: false,
      jobNumber: '',
      teacherid:'',
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
          title: '家庭信息',
          dataIndex: 'action',
          align: 'center',
          width: 147,
          scopedSlots: { customRender: 'action' },
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
          title: '所属部门',
          align: 'center',
          dataIndex: 'depid_dictText',
        },
        {
          title: '编制类别',
          align: 'center',
          dataIndex: 'bzlbm_dictText',
        },
        {
          title: '所属专业组',
          align: 'center',
          dataIndex: 'jyzid_dictText',
        },
        {
          title: '教职工类别',
          align: 'center',
          dataIndex: 'jzglbm_dictText',
        },
        {
          title: '当前状态', // 11默认在职
          align: 'center',
          dataIndex: 'dqztm_dictText',
        },
        {
          title: '身份证件类型',
          align: 'center',
          dataIndex: 'sfzjlxm_dictText',
        },
        {
          title: '身份证件号',
          align: 'center',
          dataIndex: 'sfzjh',
          sorter: true,
        },
      ],
      url: {
        list: '/hr/base/baseTeacher/list',
        delete: '/hr/base/baseTeacher/delete',
        deleteBatch: '/hr/base/baseTeacher/deleteBatch',
        exportXlsUrl: '/hr/base/baseTeacher/exportXls',
        importExcelUrl: 'hr/base/veHrJiating/importExcel',
        exportXlsTemplateUrl: '/hr/base/veHrJiating/exportXlsTemplate',
        personInfo: '/hr/base/veHrJiating/list',
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
    jumpToDetail(record) {
      this.isPerson = true
      this.jobNumber = record.gh;this.teacherid=record.userid;
    },
    initDictConfig() {
      loadCategoryData({ code: '' }).then((res) => {
        if (res.success) {
          this.$set(this.dictOptions, 'depid', res.result)
        }
      })
    },
    getSuperFieldList() {
      let fieldList = []
      fieldList.push({ type: 'int', value: 'userid', text: '教师用户id', dictCode: '' })
      fieldList.push({ type: 'string', value: 'gh', text: '工号', dictCode: '' })
      fieldList.push({ type: 'string', value: 'xm', text: '姓名', dictCode: '' })
      fieldList.push({ type: 'string', value: 'cym', text: '曾用名', dictCode: '' })
      fieldList.push({ type: 'string', value: 'sfzjlxm', text: '身份证件类型码 （数据字典）', dictCode: '' })
      fieldList.push({ type: 'string', value: 'sfzjh', text: '身份证件号', dictCode: '' })
      fieldList.push({ type: 'int', value: 'csrq', text: '出生日期', dictCode: '' })
      fieldList.push({ type: 'int', value: 'depid', text: '部门' })
      fieldList.push({ type: 'int', value: 'jyzid', text: '教研组ID', dictCode: '' })
      fieldList.push({ type: 'string', value: 'xbm', text: '性别码', dictCode: '' })
      fieldList.push({ type: 'string', value: 'mzm', text: '民族码', dictCode: '' })
      fieldList.push({ type: 'string', value: 'jkzkm', text: '健康状况码', dictCode: '' })
      fieldList.push({ type: 'string', value: 'zzmmm', text: '政治面貌码', dictCode: '' })
      fieldList.push({ type: 'string', value: 'gatqwm', text: '港澳台侨外码', dictCode: '' })
      fieldList.push({ type: 'string', value: 'jg', text: '籍贯', dictCode: '' })
      fieldList.push({ type: 'string', value: 'sfsldrk', text: '是否是流动 人口', dictCode: '' })
      fieldList.push({ type: 'string', value: 'hklbm', text: '户口类别码', dictCode: '' })
      fieldList.push({ type: 'string', value: 'dqzz', text: '当前住址', dictCode: '' })
      fieldList.push({ type: 'string', value: 'dqzzyzbm', text: '当前住址邮政编码 ', dictCode: '' })
      fieldList.push({ type: 'int', value: 'cjgzny', text: '参加工作年月', dictCode: '' })
      fieldList.push({ type: 'int', value: 'cjny', text: '从教年月', dictCode: '' })
      fieldList.push({ type: 'int', value: 'lxny', text: '来校年月', dictCode: '' })
      fieldList.push({ type: 'string', value: 'bzlbm', text: '编制类别码', dictCode: '' })
      fieldList.push({ type: 'string', value: 'zwm', text: '职务码', dictCode: '' })
      fieldList.push({ type: 'string', value: 'jzglbm', text: '教职工类别码', dictCode: '' })
      fieldList.push({ type: 'string', value: 'gwlbm', text: '岗位类别码', dictCode: '' })
      fieldList.push({ type: 'int', value: 'sfjzjs', text: '是否兼职教师', dictCode: '' })
      fieldList.push({ type: 'int', value: 'sfssxjs', text: '是否双师型教师', dictCode: '' })
      fieldList.push({ type: 'string', value: 'zp', text: '照片', dictCode: '' })
      fieldList.push({ type: 'string', value: 'lxdh', text: '联系电话', dictCode: '' })
      fieldList.push({ type: 'string', value: 'dzxx', text: '联系邮箱', dictCode: '' })
      fieldList.push({ type: 'string', value: 'yzbm', text: '邮政编码', dictCode: '' })
      fieldList.push({ type: 'string', value: 'dqztm', text: '当前状态码 11默认在职', dictCode: '' })
      fieldList.push({ type: 'int', value: 'status', text: '状态;1可用2不可用', dictCode: '' })
      fieldList.push({ type: 'int', value: 'terminalid', text: '系统ID', dictCode: '' })
      this.superFieldList = fieldList
    },
    // 工资津贴弹窗数据获取
    getModelData(gh) {
      let params = this.getQueryParams()
      params.pageNo = 1
      params.gh = gh
      params.field = 'id,,,gh,xm,jtdh,jtlxr,jtzz,jtyzbm,jtrk,jtzysrly,jtysrje,jtnsrje,action'
      getAction(this.url.personInfo, params).then((res) => {
        if (res.success) {
          let dataSource = res.result.records || res.result
          this.$refs.modalForm.edit(dataSource[0], {
            disabledKeys: ['gh', 'xm'],
          })
          this.$refs.modalForm.title = '编辑'
          this.$refs.modalForm.disableSubmit = false
        }
        if (res.code === 510) {
          this.$message.warning(res.message)
        }
      })
    },
  },
}
</script>
<style scoped>

</style>
