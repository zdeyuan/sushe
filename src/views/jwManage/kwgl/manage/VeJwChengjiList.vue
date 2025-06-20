<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <div>
        <a-form layout="inline">
          <a-row :gutter="24">
            <a-col :md="7" :sm="24">
              <a-form-item  label="年级">
                <j-select-grade placeholder="请选择年级" v-model="queryParam.gradeid"></j-select-grade>
              </a-form-item>
            </a-col>
            <a-col :md="7" :sm="24">
              <a-form-item  label="学期">
                <j-select-xueqi placeholder="请选择学期" v-model="queryParam.semid"></j-select-xueqi>
              </a-form-item>
            </a-col>
            <a-col :md="7" :sm="24" style="margin-right: 100px">
              <a-form-item label="学制">
                <j-select-xuezhi placeholder="请选择学制"  v-model="queryParam.xzid"></j-select-xuezhi>
              </a-form-item>
            </a-col>

            <a-col :md="7" :sm="24">
              <a-form-item  label="专业部">
                <j-select-zyb placeholder="请选择专业部" v-model="queryParam.falid" @input="zybChange"></j-select-zyb>
              </a-form-item>
            </a-col>
            <a-col :md="7" :sm="24">
              <a-form-item  label="专业">
                <j-select-zy-by-zyb ref="zyByZyb" placeholder="请选择专业" v-model="queryParam.specid" @input="zyChange"></j-select-zy-by-zyb>
              </a-form-item>
            </a-col>
            <a-col :md="7" :sm="24" style="margin-right: 100px">
              <a-form-item  label="班级">
                <j-select-banji-by-zy ref="banjiByZy" v-model="queryParam.xzbid"  placeholder="请选择班级"></j-select-banji-by-zy>
              </a-form-item>
            </a-col>
            <a-col :md="7" :sm="24">
              <a-form-item label="课程">
                <j-select-jiaoxue-kecheng placeholder="请选择课程" v-model="queryParam.kcid"></j-select-jiaoxue-kecheng>
              </a-form-item>
            </a-col>
            <a-col :md="7" :sm="24">
              <a-form-item label="学生姓名">
               <a-input placeholder="请输入学生姓名"  v-model="queryParam.xm"></a-input>
              </a-form-item>
            </a-col>
            <a-col :md="7" :sm="24">
              <a-form-item label="状态">
                <a-select v-model="queryParam.auditstatus" placeholder="请选择状态">
                  <a-select-option :value="undefined">请选择</a-select-option>
                  <a-select-option value="0">待审核</a-select-option>
                  <a-select-option value="1">通过</a-select-option>
                  <a-select-option value="2">不通过</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>

            <a-col :md="7" :sm="24">
              <span style="float: left; overflow: hidden" class="table-page-search-submitButtons">
                <a-button @click="searchQuery" type="primary" icon="search" style="margin-right: 10px;">搜索</a-button>
                <a-button @click="searchReset" type="danger" icon="delete" style="margin-right: 10px;">清除</a-button>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>
    </div>
    <!-- 查询区域-END -->
    <div class="table-operator" >
      <!-- <edu-button type="1" @click="searchQuery" icon="sync" title="刷新"></edu-button> -->
	  <!-- <a-button @click="add" type="primary" icon="plus" style="margin-right: 10px;">添加</a-button> -->
    </div>
<!--    &lt;!&ndash; 操作按钮区域 &ndash;&gt;-->
<!--    <div class="table-operator">-->
<!--      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>-->
<!--      <a-button type="primary" icon="download" @click="handleExportXls('ve_jw_chengji')">导出</a-button>-->
<!--      <a-upload-->
<!--        name="file"-->
<!--        :showUploadList="false"-->
<!--        :multiple="false"-->
<!--        :headers="tokenHeader"-->
<!--        :action="importExcelUrl"-->
<!--        @change="handleImportExcel"-->
<!--      >-->
<!--        <a-button type="primary" icon="import">导入</a-button>-->
<!--      </a-upload>-->
<!--      <a-dropdown v-if="selectedRowKeys.length > 0">-->
<!--        <a-menu slot="overlay">-->
<!--          <a-menu-item key="1" @click="batchDel"><a-icon type="delete" />删除</a-menu-item>-->
<!--        </a-menu>-->
<!--        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>-->
<!--      </a-dropdown>-->
<!--    </div>-->

    <!-- table区域-begin -->
    <div>
<!--      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px">-->
<!--        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择-->
<!--        <a style="font-weight: 600">{{ selectedRowKeys.length }}</a-->
<!--        >项-->
<!--        <a style="margin-left: 24px" @click="onClearSelected">清空</a>-->
<!--      </div>-->

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
          <edu-label-button type="2" @click="detail(record)" title="查看"></edu-label-button>
<!--          <a-divider type="vertical" />-->
<!--          <a @click="edit(record)">编辑</a>-->
          <a-divider type="vertical" />
          <edu-label-button type="1" @click="apply(record)" title="申请修改"></edu-label-button>
        </span>
        <span slot="score" slot-scope="text,record">
            <span v-if="record.ksxsid==1">{{ record.kccj }}</span>
            <span v-if="record.ksxsid==2">{{ record.kcdjcjmDictText }}</span>
        </span>
      </a-table>
    </div>

    <veJwChengji-modal ref="modalForm" @ok="modalFormOk"></veJwChengji-modal>
    <veJwChengjiEdit-modal ref="editForm" @ok="modalFormOk"></veJwChengjiEdit-modal>
    <ve-jw-cj-change-apply ref="applyForm" @ok="modalFormOk"></ve-jw-cj-change-apply>
  </a-card>
</template>

<script>
  // import { EduListMixin } from '@/mixins/EduListMixin'
 import { EduListMixin } from '@/mixins/KwglMixin'
import VeJwChengjiModal from './modules/VeJwChengjiModal'
import VeJwChengjiEditModal from './modules/VeJwChengjiEditModal'
import VeJwCjChangeApply from './modules/VeJwCjChangeApply'
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
    VeJwChengjiModal,
    VeJwChengjiEditModal,
    VeJwCjChangeApply
  },
  data() {
    return {
      description: 've_jw_chengji管理页面',
      // 表头
      columns: [
        {
          title: '考试方式',
          align: 'center',
          dataIndex: 'ksxsidDictText',
        },
        {
          title: '学生',
          align: 'center',
          dataIndex: 'xm',
        },
        {
          title: '学号',
          align: 'center',
          dataIndex: 'xh',
        },

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
          title: '年级',
          align: 'center',
          dataIndex: 'gradeidName',
        },
        {
          title: '学期',
          align: 'center',
          dataIndex: 'semidName',
        },
        {
          title: '学制',
          align: 'center',
          dataIndex: 'xzidName',
        },

        {
          title: '院系',
          align: 'center',
          dataIndex: 'falidName',
        },
        {
          title: '专业',
          align: 'center',
          dataIndex: 'specidName',
        },

        {
          title: '行政班',
          align: 'center',
          dataIndex: 'xzbidName',
        },

        // {
        //   title:'考试日期',
        //   align:"center",
        //   dataIndex: 'ksrqsj'
        // },
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

        {
          title: '审核状态',
          align: 'center',
          dataIndex: 'auditstatusDictText',
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