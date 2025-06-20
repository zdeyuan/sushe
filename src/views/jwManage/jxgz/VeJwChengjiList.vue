<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <div>
        <a-form layout="inline" :form="form">
          <a-row :gutter="24">
            <a-col :md="7" :sm="24">
              <a-form-item label="年级" :labelCol="labelCol" :wrapperCol="wrapperCol">
				<JSelectGrade v-model="queryParam.gradeid" placeholder="请选择年级"></JSelectGrade>
              </a-form-item>
            </a-col>

            <a-col :md="7" :sm="24">
              <a-form-item label="学期" :labelCol="labelCol" :wrapperCol="wrapperCol">
				<JSelectXueqi v-model="queryParam.semid" placeholder="请选择学期"></JSelectXueqi>
              </a-form-item>
            </a-col>

            <a-col :md="7" :sm="24" style="margin-right: 100px">
              <a-form-item label="学制">
				<JSelectXuezhi v-model="queryParam.xzid" :disabled="check" placeholder="请选择学制"></JSelectXuezhi>
              </a-form-item>
            </a-col>

            <a-col :md="7" :sm="24">
              <a-form-item label="专业部-专业" :labelCol="labelCol" :wrapperCol="wrapperCol">
                <j-select-zyb placeholder="请选择专业部" v-model="queryParam.falid" @input="zybChange"></j-select-zyb>
              </a-form-item>
            </a-col>

            <a-col :md="7" :sm="24">
              <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol">
                <j-select-zy-by-zyb ref="zyByZyb" placeholder="请选择专业" v-model="queryParam.specid" @input="zyChange"></j-select-zy-by-zyb>
              </a-form-item>
            </a-col>

            <a-col :md="7" :sm="24" style="margin-right: 100px">
              <a-form-item label="班级" :labelCol="labelCol" :wrapperCol="wrapperCol">
                <j-select-banji-by-zy ref="banjiByZy" placeholder="请先选择专业"
                                      v-model="queryParam.jxbid"></j-select-banji-by-zy>
              </a-form-item>
            </a-col>

            <a-col :md="7" :sm="24">
              <a-form-item label="学生姓名" :labelCol="labelCol" :wrapperCol="wrapperCol">
                <a-input v-model="queryParam.xm" placeholder="请输入学生姓名"/>
              </a-form-item>
            </a-col>

            <a-col :md="7" :sm="24">
              <a-form-item label="课程" :labelCol="labelCol" :wrapperCol="wrapperCol">
                <j-select-jiaoxue-kecheng placeholder="请选择课程" v-model="queryParam.kcid"></j-select-jiaoxue-kecheng>
                <!--                <a-input-search-->
                <!--                  v-model="queryParam.jcid"-->
                <!--                  ref="course"-->
                <!--                  readOnly-->
                <!--                  unselectable="on"-->
                <!--                  @search="onSearchCourse"-->
                <!--                >-->
                <!--                  <a-button slot="enterButton" :disabled="disabled">选择</a-button>-->
                <!--                </a-input-search>-->
              </a-form-item>
            </a-col>


            <a-col :md="7" :sm="24">
              <span style="float: left; overflow: hidden" class="table-page-search-submitButtons">
               <a-button @click="searchQuery" type="primary" icon="search"
               	style="margin-right: 10px;">搜索</a-button>
               <a-button @click="searchReset" type="danger" icon="delete"
               	style="margin-right: 10px;">清除</a-button>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>
    </div>
    <!-- 查询区域-END -->

    <!-- 操作按钮区域 -->
    <div class="table-operator">
    </div>
    <div>
      <a-table
        ref="table"
        size="middle"
        rowKey="id"
        :columns="columns"
        :dataSource="showDataSource"
        :pagination="ipagination"
        :loading="loading"
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
          <a @click="detail(record)">查看</a>
        </span>
        <span slot="score" slot-scope="text,record">
            <span v-if="record.ksxsid==1">{{ record.kccj }}</span>
            <span v-if="record.ksxsid==2">{{ record.kcdjcjm_dictText }}</span>
        </span>
      </a-table>
    </div>

    <veJwChengji-modal ref="modalForm" @ok="modalFormOk"></veJwChengji-modal>
    <!-- <veJwChengjiEdit-modal ref="editForm" @ok="modalFormOk"></veJwChengjiEdit-modal> -->

  </a-card>
</template>

<script>
  // import { EduListMixin } from '@/mixins/EduListMixin'
  import { EduListMixin } from '@/mixins/KwglMixin'
  import { EduUtils } from '@/mixins/EduUtils'
  import VeJwChengjiModal from './modules/VeJwChengjiModal'
  import VeJwChengjiEditModal from './modules/VeJwChengjiEditModal'
  import JSelectJiaoxueKecheng from '@/components/kwglbiz/JSelectJiaoxueKecheng'
  import JSelectZyb from '@/components/kwglbiz/JSelectZyb'
  import JSelectZyByZyb from '@/components/kwglbiz/JSelectZyByZyb'
  import JSelectXueqi from '@/components/kwglbiz/JSelectXueqi'
  import JSelectBanjiByZy from '@/components/kwglbiz/JSelectBanjiByZy'
  import JSelectGrade from '@/components/kwglbiz/JSelectGrade'
  import JSelectXuezhi from '@/components/kwglbiz/JSelectXuezhi'

  export default {
    name: 'VeJwChengjiList',
    mixins: [EduListMixin,EduUtils],
    components: {
      JSelectZyByZyb,
	  JSelectXueqi,
	  JSelectXuezhi,
	  JSelectGrade,
      JSelectZyb,
      JSelectJiaoxueKecheng,
      JSelectBanjiByZy,
      VeJwChengjiModal,
      VeJwChengjiEditModal
    },
    data() {
      return {
        description: 've_jw_chengji管理页面',
        // 表头
        columns: [
          {
            title: '考试方式',
            align: 'center',
            dataIndex: 'ksxsid_dictText'
          },
          {
            title: '学生',
            align: 'center',
            dataIndex: 'xm'
          },
          {
            title: '学号',
            align: 'center',
            dataIndex: 'xh'
          },

          {
            title: '课程',
            align: 'center',
            dataIndex: 'kcid_dictText'
          },
          {
            title: '成绩',
            align: 'center',
            scopedSlots: { customRender: 'score' }
          },

          {
            title: '年级',
            align: 'center',
            dataIndex: 'gradeid_dictText'
          },
          {
            title: '学期',
            align: 'center',
            dataIndex: 'semidName'
          },
          {
            title: '学制',
            align: 'center',
            dataIndex: 'xzidName'
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
            title: '行政班',
            align: 'center',
            dataIndex: 'xzbidName'
          },
          {
            title: '审核状态',
            align: 'center',
            dataIndex: 'auditstatus_dictText'
          },
        ],
        url: {
          list: '/kwgl/veJwChengji/list',
          delete: '/kwgl/veJwChengji/delete',
          deleteBatch: '/kwgl/veJwChengji/deleteBatch',
          exportXlsUrl: '/kwgl/veJwChengji/exportXls',
          importExcelUrl: 'kwgl/veJwChengji/importExcel'
        },
        dictOptions: {},
        isorter: []
      }
    },
    created() {
      this.getDepartment()
      // this.getGrades()
      // this.getSemesters()
      // this.getEduTypes()
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
      zyChange() {
        if (this.$refs.banjiByZy != null) {
          this.$refs.banjiByZy.initDictData(this.queryParam.specid)
        }
      },
      initDictConfig() {
      },
      detail(record) {
        this.$refs.modalForm.edit(record)
        this.$refs.modalForm.title = '审核（' + record.xm + '）成绩信息'
        this.$refs.modalForm.disableSubmit = true
      }

    }
  }
</script>
<style scoped>
  
</style>