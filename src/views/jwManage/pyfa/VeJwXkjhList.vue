<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="3" :lg="7" :md="8" :sm="24">
            <span style="float: left; overflow: hidden" class="table-page-search-submitButtons">
              <a-button @click="filter" icon="filter" style="margin-right: 8px; background: #f47920; color: white"
                >筛选</a-button
              >
            </span>
          </a-col>

          <a-col :xl="10" :lg="7" :md="8" :sm="24">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="课程">
              <j-select-jiaoxue-kecheng :triggerChange="true" v-model="queryParam.kcid"></j-select-jiaoxue-kecheng>
            </a-form-item>
          </a-col>

          <a-col :xl="7" :lg="7" :md="8" :sm="24">
            <span style="float: left; overflow: hidden" class="table-page-search-submitButtons">
              <a-button @click="searchReset" icon="delete" style="margin-right: 8px; background: #f47920; color: white"
                >清除</a-button
              >
              <a-button type="primary" @click="searchQuery" icon="search">搜索</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <!-- 查询区域-END -->

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button @click="handleAdd" type="primary" icon="plus">添加</a-button>

      <a-button @click="batchDel" type="primary" icon="delete">删除</a-button>
      <a-button @click="searchReset" type="primary" icon="reload">刷新</a-button>

      <a-button @click="recycle" type="danger" icon="delete">回收站</a-button>

<!--      <a-button type="primary" icon="download" @click="handleExportXls('ve_jw_pyfa')">导出</a-button>-->
      <a-upload
        name="file"
        :showUploadList="false"
        :multiple="false"
        :headers="tokenHeader"
        :action="importExcelUrl"
        @change="handleImportExcel"
      >
        <a-button type="primary" icon="import">导入</a-button>
      </a-upload>
    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择
        <a style="font-weight: 600">{{ selectedRowKeys.length }}</a
        >项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>

      <a-table
        ref="table"
        size="middle"
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
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
          <a @click="handleDetail(record)">查看</a>
          <a-divider type="vertical" />
          <a @click="handleEdit(record)">编辑</a>

          <a-divider type="vertical" />
          <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
            <a>删除</a>
          </a-popconfirm>
        </span>

        <span slot="isAble" slot-scope="text, record">
          <a-switch
            default-checked
            @change="changeIsAble(record.id, checked)"
            v-model="record.isAble"
            :active-value="1"
            :inactive-value="0"
          />
        </span>

        <!-- 暂时写死 -->
        <span slot="kcxzm" slot-scope="text, record" style="text-align: center">
          <span v-if="record.kcxzm == 1">公共基础课</span>
          <span v-if="record.kcxzm == 2">学科基础课</span>
          <span v-if="record.kcxzm == 3">专业课</span>
        </span>
      </a-table>
    </div>

    <veJwXkjh-modal ref="modalForm" @ok="modalFormOk"></veJwXkjh-modal>
    <ve-jw-kcjh-filter ref="filter" @ok="filterFormOk"></ve-jw-kcjh-filter>
    <ve-jw-xkjh-recycle-bin ref="recycle"></ve-jw-xkjh-recycle-bin>
  </a-card>
</template>

<script>
import '@/assets/scss/common.scss';
import { EduListMixin } from '@/mixins/EduListMixin'
import VeJwXkjhModal from './modules/VeJwXkjhModal'
import { postAction, getAction } from '@/api/common/manage'
import VeJwKcjhFilter from './modules/VeJwKcjhFilter.vue'
import JSelectJiaoxueKecheng from '@/components/kwglbiz/JSelectJiaoxueKecheng'
import VeJwXkjhRecycleBin from './modules/VeJwXkjhRecycleBin'

export default {
  name: 'VeJwKcjhList',
  mixins: [EduListMixin],
  components: {
    VeJwXkjhModal,
    VeJwKcjhFilter,
    JSelectJiaoxueKecheng,
    VeJwXkjhRecycleBin,
  },
  data() {
    return {
      description: '课程计划管理页面',
      // 表头
      columns: [
        {
          title: '课程',
          align: 'center',
          dataIndex: 'kcid_dictText',
        },
        // {
        //   title:'课程计划教师',
        //   align:"center",
        //   dataIndex: 'teachers'
        // },
        {
          title: '课程性质',
          align: 'center',
          dataIndex: 'kcxzm',
          scopedSlots: { customRender: 'kcxzm' },
        },
        // {
        //   title: '考试类型',
        //   align: 'center',
        //   dataIndex: 'kslx_dictText',
        // },
        // {
        //   title: '成绩类型',
        //   align: 'center',
        //   dataIndex: 'cjlx_dictText',
        // },
        {
          title: '学分',
          align: 'center',
          dataIndex: 'score',
        },
        {
          title: '总学时',
          align: 'center',
          dataIndex: 'zxs',
        },
        {
          title: '理论学时',
          align: 'center',
          dataIndex: 'llxs',
        },
        {
          title: '实验实训学时',
          align: 'center',
          dataIndex: 'sjxs',
        },
        // {
        //   title:'上课教师数量',
        //   align:"center",
        //   dataIndex: 'jssl'
        // },
        // {
        //   title:'合格分数线',
        //   align:"center",
        //   dataIndex: 'hgfsx'
        // },
        // {
        //   title:'优秀分数线 ',
        //   align:"center",
        //   dataIndex: 'yxfsx'
        // },
        // {
        //   title:'预计开学日期',
        //   align:"center",
        //   dataIndex: 'beginTime'
        // },
        // {
        //   title:'预计结束日期',
        //   align:"center",
        //   dataIndex: 'endTime'
        // },
        // {
        {
          title: '预计周数',
          align: 'center',
          dataIndex: 'weeks'
        },
        {
          title: '周课时',
          align: 'center',
          dataIndex: 'zks'
        },
        // {
        //   title:'教室类型',
        //   align:"center",
        //   dataIndex: 'jslx'
        // },
        // {
        //   title:'课程计划教室',
        //   align:"center",
        //   dataIndex: 'jhjs'
        // },
        // {
        {
          title: '是否合班',
          align: 'center',
          dataIndex: 'isMerge',
          customRender:function (t,r,index) {
            return t == true ? '是':'否';
          }
        },
        // {
        //   title:'单双周',
        //   align:"center",
        //   dataIndex: 'dsz'
        // },
        // {
        //   title:'指定周',
        //   align:"center",
        //   dataIndex: 'zdz'
        // },
        // {
        //   title:'培养方案ID',
        //   align:"center",
        //   dataIndex: 'pyfaId'
        // },

        {
          title: '是否有效',
          align: 'center',
          dataIndex: 'isAble',
          scopedSlots: { customRender: 'isAble' },
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          scopedSlots: { customRender: 'action' },
        },
      ],
      url: {
        list: '/jxgz/veJwXkjh/list',
        delete: '/jxgz/veJwXkjh/delete',
        deleteBatch: '/jxgz/veJwXkjh/deleteBatch',
        exportXlsUrl: '/jxgz/veJwXkjh/exportXls',
        importExcelUrl: 'jxgz/veJwXkjh/importExcel',
        updateIsAble: '/jxgz/veJwXkjh/updateIsAble',
      },
      dictOptions: {},
    }
  },

  computed: {
    importExcelUrl: function () {
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
    },
  },
  methods: {
    initDictConfig() {},

    //回收站
    recycle: function () {
      this.$refs.recycle.show()
      this.$refs.recycle.title = '回收站'
      this.$refs.recycle.disableSubmit = false
    },

    //更新是否有效
    changeIsAble(id, checked) {
      this.loading = true
      postAction(this.url.updateIsAble, { id: id })
        .then((res) => {
          if (res.success) {
            this.$message.success(res.message)
            this.loadData()
            this.onClearSelected()
          } else {
            this.$message.warning(res.message)
          }
        })
        .finally(() => {
          this.loading = false
        })
    },

    //筛选
    filter: function () {
      console.log('1111')
      this.$refs.filter.edit()
      this.$refs.filter.title = '筛选'
      this.$refs.filter.disableSubmit = false
    },

    //接收所筛选条件
    filterFormOk(
      kcid,
      pyfa,
      teachers,
      kcxzm,
      kslx,
      cjlx,
      score,
      zxs,
      llxs,
      sjxs,
      jssl,
      hgfsx,
      yxfsx,
      beginTime,
      endTime,
      weeks,
      zks,
      jslx,
      jhjs,
      isMerge,
      dsz,
      description,
      zdz
    ) {
      //this.jcid=id

      this.queryParam = {}
      if (kcid != null) {
        this.queryParam.kcid = kcid
      }
      if (pyfa != null) {
        this.queryParam.pyfa = pyfa
      }
      if (teachers != null) {
        this.queryParam.teachers = teachers
      }
      if (kcxzm != null) {
        this.queryParam.kcxzm = kcxzm
      }
      if (kslx != null) {
        this.queryParam.kslx = kslx
      }
      if (cjlx != null) {
        this.queryParam.cjlx = cjlx
      }
      if (score != null) {
        this.queryParam.score = score
      }
      if (zxs != null) {
        this.queryParam.zxs = zxs
      }
      if (llxs != null) {
        this.queryParam.llxs = llxs
      }
      if (sjxs != null) {
        this.queryParam.sjxs = sjxs
      }
      if (jssl != null) {
        this.queryParam.jssl = jssl
      }
      if (hgfsx != null) {
        this.queryParam.hgfsx = hgfsx
      }
      if (yxfsx != null) {
        this.queryParam.yxfsx = yxfsx
      }
      if (beginTime != null) {
        this.queryParam.beginTime = beginTime
      }
      if (endTime != null) {
        this.queryParam.endTime = endTime
      }
      if (weeks != null) {
        this.queryParam.weeks = weeks
      }

      if (zks != null) {
        this.queryParam.zks = zks
      }
      if (jslx != null) {
        this.queryParam.jslx = jslx
      }
      if (jhjs != null) {
        this.queryParam.jhjs = jhjs
      }
      if (isMerge != null) {
        this.queryParam.isMerge = isMerge
      }
      if (dsz != null) {
        this.queryParam.dsz = dsz
      }
      if (description != null) {
        this.queryParam.description = description
      }
      if (zdz != null) {
        this.queryParam.zdz = zdz
      }

      this.loadData()
    },
  },
}
</script>