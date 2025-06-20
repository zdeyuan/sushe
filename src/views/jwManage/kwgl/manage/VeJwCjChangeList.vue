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
                <!-- <edu-button type="5" @click="searchQuery" icon="search" title="搜索"
                            style="margin-bottom: 0"></edu-button>
							<edu-button type="7" @click="searchReset"
                                                                              icon="delete" title="清除"
                                                                              style="margin-bottom: 0"></edu-button> -->
				<a-button @click="searchQuery" type="primary" icon="search" style="margin-right: 10px;">搜索</a-button>
				<a-button @click="searchReset" type="danger" icon="delete" style="margin-right: 10px;">清除</a-button>	
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <!-- <edu-button type="1" @click="searchQuery" icon="sync" title="刷新"></edu-button> -->
	  <a-button @click="searchQuery" type="primary" icon="sync" style="margin-right: 10px;">刷新</a-button>
<!--      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>-->
<!--      <a-button type="primary" icon="download" @click="handleExportXls('ve_jw_cj_change')">导出</a-button>-->
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
<!--          <a-menu-item key="1" @click="batchDel">-->
<!--            <a-icon type="delete"/>-->
<!--            删除-->
<!--          </a-menu-item>-->
<!--        </a-menu>-->
<!--        <a-button style="margin-left: 8px"> 批量操作-->
<!--          <a-icon type="down"/>-->
<!--        </a-button>-->
<!--      </a-dropdown>-->
    </div>

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
          <edu-label-button type="2" v-if="record.auditstatus != 1" @click="audit(record)" title="审核"></edu-label-button>

          <a-divider v-if="record.auditstatus != 1" type="vertical"/>
          <edu-label-button type="1" @click="detail(record)" title="查看"></edu-label-button>
        </span>
      </a-table>
    </div>

    <veJwCjChange-modal ref="modalForm" @ok="modalFormOk"></veJwCjChange-modal>
    <veJwCjChange-status ref="auditForm" @ok="modalFormOk"></veJwCjChange-status>
  </a-card>
</template>

<script>
  // import { EduListMixin } from '@/mixins/EduListMixin'
  import { EduListMixin } from '@/mixins/KwglMixin'
  import VeJwCjChangeModal from './modules/VeJwCjChangeModal'
  import VeJwCjChangeStatus from './modules/VeJwCjChangeStatus'
  import JSelectGrade from '@/components/kwglbiz/JSelectGrade'
  import JSelectXueqi from '@/components/kwglbiz/JSelectXueqi'
  import JSelectXuezhi from '@/components/kwglbiz/JSelectXuezhi'
  import JSelectZyb from '@/components/kwglbiz/JSelectZyb'
  import JSelectZyByZyb from '@/components/kwglbiz/JSelectZyByZyb'
  import JSelectBanjiByZy from '@/components/kwglbiz/JSelectBanjiByZy'
  import JSelectJiaoxueKecheng from '@/components/kwglbiz/JSelectJiaoxueKecheng'

  export default {
    name: 'VeJwCjChangeList',
    mixins: [EduListMixin],
    components: {
      JSelectJiaoxueKecheng,
      JSelectBanjiByZy,
      JSelectZyByZyb,
      JSelectZyb,
      JSelectXuezhi,
      JSelectXueqi,
      JSelectGrade,
      VeJwCjChangeModal,
      VeJwCjChangeStatus
    },
    data() {
      return {
        description: 've_jw_cj_change管理页面',
        // 表头
        columns: [
          {
            title: '姓名',
            align: 'center',
            dataIndex: 'xm'
          },
          {
            title: '学号',
            align: 'center',
            dataIndex: 'xh'
          },
          {
            title: '课程成绩',
            align: 'center',
            dataIndex: 'kccj'
          },
          {
            title: '课程',
            align: 'center',
            dataIndex: 'kcidDictText'
          },
          {
            title: '学生',
            align: 'center',
            dataIndex: 'stuidName'
          },
          {
            title: '用户',
            align: 'center',
            dataIndex: 'useridName'
          },

          {
            title: '院系',
            align: 'center',
            dataIndex: 'falidName'
          },
          {
            title: '专业',
            align: 'center',
            dataIndex: 'specidName'
          },
          {
            title: '学制',
            align: 'center',
            dataIndex: 'xzidName'
          },
          {
            title: '年级',
            align: 'center',
            dataIndex: 'gradeidName'
          },
          {
            title: '学期',
            align: 'center',
            dataIndex: 'semidName'
          },

          {
            title: '行政班',
            align: 'center',
            // dataIndex: 'xzbidDictText',
            dataIndex: 'xzbidName'
          },

          {
            title: '状态',
            align: 'center',
            dataIndex: 'auditstatusDictText'
          },

          {
            title: '操作',
            dataIndex: 'action',
            align: 'center',
            scopedSlots: { customRender: 'action' }
          }
        ],
        url: {
          list: '/kwgl/veJwCjChange/list',
          delete: '/kwgl/veJwCjChange/delete',
          deleteBatch: '/kwgl/veJwCjChange/deleteBatch',
          exportXlsUrl: '/kwgl/veJwCjChange/exportXls',
          importExcelUrl: 'kwgl/veJwCjChange/importExcel'
        },
        dictOptions: {},
        isorter: []
      }
    },
    computed: {
      importExcelUrl: function() {
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
      }
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
      initDictConfig() {
      },
      audit(record) {
        this.$refs.auditForm.edit(record)
        this.$refs.modalForm.title = '审核（' + record.xm + '）成绩信息'
        this.$refs.auditForm.disableSubmit = false
      },
      detail(record) {
        this.$refs.modalForm.edit(record)
        this.$refs.modalForm.title = '查看（' + record.xm + '）成绩修改信息'
        this.$refs.modalForm.disableSubmit = true
      }
    }
  }
</script>
<style lang="less" scoped>
  
</style>