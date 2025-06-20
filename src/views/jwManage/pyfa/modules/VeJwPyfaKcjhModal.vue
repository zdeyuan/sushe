<template>
  <a-modal
    :title="title"
    :width="width"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
	okText="确认"
    cancelText="取消"
  >
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
           <span style="float: left; overflow: hidden" class="table-page-search-submitButtons">
              <a-button @click="handleAdd" icon="filter" type="primary" style="margin-right: 8px;">选课</a-button >
            </span>
            <a-form-item label="课程">
              <j-select-jiaoxue-kecheng :triggerChange="true" v-model="queryParam.kcid"></j-select-jiaoxue-kecheng>
            </a-form-item>

            <span  class="table-page-search-submitButtons">
              <a-button @click="searchResetNow" type="danger" icon="delete" style="margin-right: 8px;"
                >清除</a-button>
              <a-button type="primary" @click="searchQuery" icon="search">搜索</a-button>
            </span>
      </a-form>
    </div>
    <a-table
      ref="table"
      size="middle"
      rowKey="id"
      :columns="columns"
      :dataSource="dataSource"
      :pagination="ipagination"
      :loading="loading"
      :rowSelection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
      @change="handleTableChange"
    >
      <span slot="action" slot-scope="text, record">
<!--        <a @click="handleDetail(record)">查看</a>-->
<!--        <a-divider type="vertical" />-->
<!--        <a @click="handleEdit(record)">编辑</a>-->

<!--        <a-divider type="vertical" />-->
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
    </a-table>
	<VeJwXkjhModal ref="modalForm" @ok="modalFormOk"/>
    <ve-jw-kcjh-filter ref="filter" @ok="filterFormOk"></ve-jw-kcjh-filter>
  </a-modal>
</template>

<script>
import { httpAction } from '@/api/common/manage'
import pick from 'lodash.pick'
import { EduListMixin } from '@/mixins/EduListMixin'
import { validateDuplicateValue } from '@/utils/util'
import VeJwKcjhFilter from './VeJwKcjhFilter.vue'
import JSelectJiaoxueKecheng from '@/components/kwglbiz/JSelectJiaoxueKecheng'
import VeJwXkjhModal from './VeJwXkjhModal'
export default {
  name: 'VeJwPyfaKcjhModal',
  mixins: [EduListMixin],
  components: { JSelectJiaoxueKecheng, VeJwKcjhFilter,VeJwXkjhModal },
  data() {
    return {
      disableMixinCreated: true,
      form: this.$form.createForm(this),
      title: '操作',
      width: '70%',
      visible: false,
      model: {},
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
      confirmLoading: false,
      description: '教材库存表管理页面',
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
          dataIndex: 'kcxzm_dictText',
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
          dataIndex: 'score'
        },
        {
          title: '总学时',
          align: 'center',
          dataIndex: 'zxs'
        },
        {
          title: '理论学时',
          align: 'center',
          dataIndex: 'llxs'
        },
        {
          title: '实践学时',
          align: 'center',
          dataIndex: 'sjxs'
        },
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
        list: '/jxgz/veJwKcjh/list',
        delete: '/jxgz/veJwKcjh/delete',
        deleteBatch: '/jxgz/veJwKcjh/deleteBatch',
        exportXlsUrl: '/jxgz/veJwKcjh/exportXls',
        importExcelUrl: 'jxgz/veJwKcjh/importExcel',
        updateIsAble: '/jxgz/veJwKcjh/updateIsAble',
      },
      isorter: [],
      record:{},
    }
  },
  created() {},
  methods: {
    searchResetNow(){
      this.queryParam = {};
      this.select(this.record);
    },
    select(record) {
      console.log('select', record)
      this.dataSource=[];
      this.record = record;
      this.visible = true

      // this.queryParam.pyfaId = record.id

      this.queryParam.falid = record.falid
      this.queryParam.specid = record.specid

      this.queryParam.semid = record.semid
      this.queryParam.gradeid = record.gradeid
      this.queryParam.xzid = record.xzid

      this.searchQuery()
    },
    close() {
      this.$emit('close')
      this.visible = false
    },

    handleOk() {
      this.close()
    },
    handleCancel() {
      this.close()
    },

    //筛选
    filter: function () {
      console.log('1111')
      this.$refs.filter.edit()
      this.$refs.filter.flag = false
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
	  console.log("教学计划",jhjs)
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