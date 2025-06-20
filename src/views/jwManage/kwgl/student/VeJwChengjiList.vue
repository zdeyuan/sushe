<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <div>
        <a-form layout="inline">
          <a-row :gutter="24">
			  <a-form-item label="课程">
			    <j-select-jiaoxue-kecheng placeholder="请选择课程" v-model="queryParam.kcid"></j-select-jiaoxue-kecheng>
			  </a-form-item>
			  <a-form-item  label="学期">
			    <j-select-xueqi placeholder="请选择学期" v-model="queryParam.semid"></j-select-xueqi>
			  </a-form-item>
			  <a-button type="primary" @click="searchQuery" icon="search" style="margin-right:10px;" >搜索</a-button>
			  <a-button type="danger" @click="searchReset" icon="delete" >清除</a-button>
          </a-row>
		  <a-row>
			  <a-button type="primary"  @click="searchQuery" icon="reload" >刷新</a-button>
		  </a-row>
        </a-form>
      </div>
    </div>

<!--    -->
    <div>
      <a-table
        ref="table"
        size="middle"
        rowKey="id"
        :columns="columns"
        :dataSource="showDataSource"
        :pagination="ipagination"
        :loading="loading"
        :rowSelection="{ fixed: true, selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
        @change="handleTableChange"
      >
        <template slot="htmlSlot" slot-scope="text">
          <div v-html="text"></div>
        </template>
        <template slot="imgSlot" slot-scope="text">
          <span v-if="!text" style="font-size: 12px; font-style: italic">无此图片</span>
          <img
            v-else
            :src="getImgView(text)"
            height="25px"
            alt="图片不存在"
            style="max-width: 80px; font-size: 12px; font-style: italic"
          />
        </template>
        <template slot="fileSlot" slot-scope="text">
          <span v-if="!text" style="font-size: 12px; font-style: italic">无此文件</span>
          <a-button v-else :ghost="true" type="primary" icon="download" size="small" @click="uploadFile(text)">
            下载
          </a-button>
        </template>

        <span slot="action" slot-scope="text, record">
          <edu-label-button type="3" @click="detail(record)" title="查看"></edu-label-button>
        </span>
        <span slot="score" slot-scope="text,record">
            <span v-if="record.ksxsid==1">{{ record.kccj }}</span>
            <span v-if="record.ksxsid==2">{{ record.kcdjcjmDictText }}</span>
        </span>
      </a-table>
    </div>

    <veJwChengji-modal ref="modalForm" @ok="modalFormOk"></veJwChengji-modal>
  </a-card>
</template>

<script>
  // import { EduListMixin } from '@/mixins/EduListMixin'
 import { EduListMixin } from '@/mixins/KwglMixin'
import VeJwChengjiModal from './modules/VeJwChengjiModal'
import { getActionGradeById,getActionXueqiById,getActionZhuanyeById,
  getActionYuanxiById,getActionUserById,getActionXuezhiById,getActionTeacherById,getActionBanjiById} from '@/api/common/manage'
  import JSelectXueqi from '@/components/kwglbiz/JSelectXueqi'
  import JSelectXuezhi from '@/components/kwglbiz/JSelectXuezhi'
  import JSelectJiaoxueKecheng from '@/components/kwglbiz/JSelectJiaoxueKecheng'
  import JSelectGrade from '@/components/kwglbiz/JSelectGrade'
  import JSelectZyb from '@/components/kwglbiz/JSelectZyb'
  import JSelectZyByZyb from '@/components/kwglbiz/JSelectZyByZyb'
  import JSelectBanjiByZy from '@/components/kwglbiz/JSelectBanjiByZy'


export default {
  name: 'VeJwChengjiList',
  mixins: [EduListMixin],
  components: {
    JSelectBanjiByZy,
    JSelectZyByZyb,
    JSelectZyb,
    JSelectGrade,
    JSelectJiaoxueKecheng,
    JSelectXuezhi,
    JSelectXueqi,
    VeJwChengjiModal
  },
  data() {
    return {
      description: 've_jw_chengji管理页面',
      // 表头
      columns: [
        {
          title: '课程',
          align: 'center',
          dataIndex: 'kcidDictText',
        },
        {
          title: '成绩',
          align: 'center',
          scopedSlots: { customRender: 'score' },
        },
        {
          title: '学期',
          align: 'center',
          dataIndex: 'semidName',
        },
        // {
        //   title: '考试方式',
        //   align: 'center',
        //   dataIndex: 'ksxsidDictText',
        // },
        {
          title: '学生',
          align: 'center',
          dataIndex: 'xm',
        },
        // {
        //   title: '学号',
        //   align: 'center',
        //   dataIndex: 'xh',
        // },
        //
        // {
        //   title: '年级',
        //   align: 'center',
        //   dataIndex: 'gradeidName',
        // },
        // {
        //   title: '学期',
        //   align: 'center',
        //   dataIndex: 'semidName',
        // },
        // {
        //   title: '学制',
        //   align: 'center',
        //   dataIndex: 'xzidName',
        // },
        //
        // {
        //   title: '院系',
        //   align: 'center',
        //   dataIndex: 'falidName',
        // },
        // {
        //   title: '专业',
        //   align: 'center',
        //   dataIndex: 'specidName',
        // },
        //
        // {
        //   title: '行政班',
        //   align: 'center',
        //   dataIndex: 'xzbidName',
        // },
        // {
        //   title:'考试名称',
        //   align:"center",
        //   dataIndex: 'ksidDictText'
        // },
        {
          title:'考试日期',
          align:"center",
          dataIndex: 'ksrq'
        },
        // {
        //   title:'平时成绩',
        //   align:"center",
        //   dataIndex: 'pscj'
        // },
        // {
        //   title:'分数类考试成绩',
        //   align:"center",
        //   dataIndex: 'fslkscj'
        // },
        // {
        //   title:'等级类考试成绩',
        //   align:"center",
        //   dataIndex: 'djlkscj'
        // },
        //
        // {
        //   title: '审核状态',
        //   align: 'center',
        //   dataIndex: 'auditstatusDictText',
        // },
        {
          title:'录入时间',
          align:"center",
          dataIndex: 'cjlrrqsj'
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          scopedSlots: { customRender: 'action' },
        },
      ],
      url: {
        list: '/kwgl/veJwChengji/list',
        delete: '/kwgl/veJwChengji/delete',
        deleteBatch: '/kwgl/veJwChengji/deleteBatch',
        exportXlsUrl: '/kwgl/veJwChengji/exportXls',
        importExcelUrl: 'kwgl/veJwChengji/importExcel',
      },
      dictOptions: {},
      isorter: [],
    }
  },
  computed: {
    importExcelUrl: function () {
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
    },
  },
  methods: {
    zybChange(code) {
      if (this.$refs.zyByZyb != null) {
        this.$refs.zyByZyb.initDictData(code)
      }
    },
    zyChange(code){
      if (this.$refs.banjiByZy != null) {
        this.$refs.banjiByZy.initDictData(code)
      }
    },
    initDictConfig() {},
    detail(record) {
      this.$refs.modalForm.edit(record)
      this.$refs.modalForm.title = '查看（' + record.xm + '）成绩信息'
      this.$refs.modalForm.disableSubmit = true
    },
    edit(record) {
      this.$refs.editForm.edit(record)
      this.$refs.editForm.title = ' 编辑（' + record.xm + '）成绩信息'
      this.$refs.editForm.disableSubmit = false
    },
    apply(record) {
      this.$refs.applyForm.edit(record)
      this.$refs.applyForm.title = '审核（' + record.xm + '）修改成绩信息'
      this.$refs.applyForm.disableSubmit = false
    },
  },
}
</script>
<style lang="less" scoped>

</style>