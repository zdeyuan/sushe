<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <div>
        <a-form layout="inline">
          <a-row :gutter="24">
            <a-col :md="8" :sm="24">
              <a-form-item label="校区" :labelCol="labelCol" :wrapperCol="wrapperCol">
                <!-- <j-dict-select-tag
                  placeholder="请选择校区"
                  dictCode="edu_dev_open.ve_jw_xiaoqu,XQMC,id"
                  v-model="queryParam.campusid"
                  @change="campusSelect"
                ></j-dict-select-tag> -->
                <j-select-xiaoqu placeholder="请选择校区"  v-model="queryParam.campusid" @input="campusSelect"></j-select-xiaoqu>
<!--                <a-select v-model="queryParam.campusid" @change="campusSelect">-->
<!--                  <a-select-option v-for="item in campus" :key="item.id" :value="item.id">-->
<!--                    {{ item.xqmc }}-->
<!--                  </a-select-option>-->
<!--                </a-select>-->
              </a-form-item>
            </a-col>

            <a-col :md="8" :sm="24">
              <a-form-item label="教学楼" :labelCol="labelCol" :wrapperCol="wrapperCol">
                <a-select @change="buildingSelect" v-model="queryParam.jzid" placeholder="请选择教学楼">
                  <a-select-option v-for="item in jzs" :key="item.id" :value="item.id" placeholder="教学楼">
                    {{ item.jzwmc }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>

            <a-col :md="8" :sm="24">
              <a-form-item label="教室">
                <a-select v-model="queryParam.jsid" :disabled="check" placeholder="请选择教室">
                  <a-select-option v-for="item in jss" :key="item.id" :value="item.id" placeholder="教室">
                    {{ item.jsmc }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>

            <a-col :md="7" :sm="24">
              <a-form-item label="课程">
<!--                <j-dict-select-tag-->
<!--                  :disabled="check"-->
<!--                  placeholder="请选择课程"-->
<!--                  dictCode="edu_dev_open.ve_jw_kecheng,KCMC,id"-->
<!--                  v-model="queryParam.kcid"-->
<!--                ></j-dict-select-tag>-->

                <j-select-jiaoxue-kecheng placeholder="请选择课程" v-model="queryParam.kcid"></j-select-jiaoxue-kecheng>
              </a-form-item>
            </a-col>

            <a-col :md="7" :sm="24">
              <a-form-item label="状态">
                <j-dict-select-tag
                  :disabled="check"
                  placeholder="请选择状态"
                  dictCode="kwgl_qingkao_status"
                  v-model="queryParam.status"
                ></j-dict-select-tag>
              </a-form-item>
            </a-col>

            <a-col :md="7" :sm="24">
              <span style="float: left; overflow: hidden" class="table-page-search-submitButtons">
                 <!-- <edu-button type="5" @click="searchQuery" icon="search" title="搜索" style="margin-bottom: 0"></edu-button>
				 <edu-button type="7" @click="searchReset" icon="delete" title="清除" style="margin-bottom: 0"></edu-button> -->
				 <a-button @click="searchQuery" type="primary" icon="search" style="margin-right: 10px;">搜索</a-button>
				 <a-button @click="searchReset" type="danger" icon="delete" style="margin-right: 10px;">清除</a-button>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>
    </div>
    <!-- 查询区域-END -->

    <!-- 操作按钮区域 -->
    <div class="table-operator" style="margin: 10px 0;">
<!--      <a-button @click="add" type="primary" icon="plus">新增</a-button>-->
<!--      <a-button-->
<!--        @click="batchAble"-->
<!--        type="primary"-->
<!--        icon="check-circle"-->
<!--        style="background: #37d75a; color: white; border: none"-->
<!--        >启用</a-button-->
<!--      >-->
<!--      <a-button-->
<!--        @click="batchDisable"-->
<!--        type="primary"-->
<!--        icon="close-circle"-->
<!--        style="background: #f47920; color: white; border: none"-->
<!--        >禁用</a-button-->
<!--      >-->
	  <a-button @click="add" type="primary" icon="plus" style="margin-right: 10px;">添加</a-button>
	  <a-button @click="batchAble" type="primary" icon="check-circle" style="margin-right: 10px;">启用</a-button>
	  <a-button @click="batchDisable" type="danger" icon="stop" style="margin-right: 10px;">禁用</a-button>	
	  <a-button @click="searchQuery" type="primary" icon="sync" style="margin-right: 10px;">刷新</a-button>
	  
<!--      <edu-button @click="add" type="primary" icon="plus" title="添加"></edu-button>
      <edu-button
        title="启用"
        @click="batchAble"
        type="4"
        icon="check-circle"
      ></edu-button>

      <edu-button
        title="禁用"
        @click="batchDisable"
        type="8"
        icon="close-circle"
      ></edu-button>

      <edu-button type="1" @click="searchQuery" icon="sync" title="刷新"></edu-button> -->
<!--      <a-button type="primary" icon="download" @click="handleExportXls('ve_jw_qingkao')">导出</a-button>-->
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
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDelConfirm">
            <edu-batch-delete-button ref="batchDelBtn" @del="batchDelAction"  type="4" title="删除"></edu-batch-delete-button>
          </a-menu-item>
        </a-menu>
        <edu-button type="10" title="批量操作" icon="down" style="margin-bottom: 0px" rightIcon="true">
        </edu-button>
      </a-dropdown>
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
<!--          <a @click="edit(record)" v-if="record.ispublish == 0">编辑</a>-->
<!--          <a-divider v-if="record.ispublish == 0" type="vertical" />-->
<!--          <a @click="publish(record)" v-if="record.status == 1 && record.ispublish == 0">发布</a>-->
<!--          <a-divider v-if="record.status == 1" type="vertical" />-->
<!--          <a @click="getStudents(record)" v-if="record.status == 1">名单</a>-->
<!--          <a-divider v-if="record.status == 1 && record.ispublish == 1" type="vertical" />-->
<!--          <a @click="dispublish(record)" v-if="record.status == 1 && record.ispublish == 1">取消发布</a>-->


          <edu-label-button type="3" @click="edit(record)" v-if="record.ispublish == 0" title="编辑"></edu-label-button>
          <a-divider v-if="record.ispublish == 0" type="vertical" />
          <edu-label-button @click="publish(record)" type="1" v-if="record.status == 1 && record.ispublish == 0" title="发布"></edu-label-button>
          <a-divider v-if="record.status == 1 && record.ispublish == 0" type="vertical" />
          <edu-label-button type="2" @click="getStudents(record)" v-if="record.status == 1" title="名单"></edu-label-button>
          <a-divider v-if="record.status == 1 && record.ispublish == 1" type="vertical" />
          <edu-label-button type="5" @click="dispublish(record)" v-if="record.status == 1 && record.ispublish == 1" title="取消发布"></edu-label-button>

<!--           <edu-label-button type="3" @click="handleEdit(record)" title="编辑" v-if="record.ispublish == 0"></edu-label-button>-->
<!--          <a-divider v-if="record.status == 1 && record.ispublish == 0" type="vertical"/>-->
<!--          <edu-label-button type="2" @click="publish(record)" v-if="record.status == 1 && record.ispublish == 0" title="发布"></edu-label-button>-->
<!--          <edu-label-button type="5" @click="dispublish(record)" v-if="record.status == 1 && record.ispublish == 1" title="取消发布"></edu-label-button>-->
        </span>

        <span slot="place" slot-scope="text, record">
          <span>{{ record.campusidName }} {{ record.jzidDictText }} {{ record.jsidDictText }}</span>
        </span>

        <span slot="ksrqsj" slot-scope="text, record">
          <span>{{ record.ksrq }} {{ record.ksrqsj }}</span>
        </span>
      </a-table>
    </div>

    <veJwBukao-modal ref="modalForm" @ok="modalFormOk"></veJwBukao-modal>
    <veJwBk-student-modal ref="studentsForm" @ok="modalFormOk"></veJwBk-student-modal>
  </a-card>
</template>

<script>
// import { EduListMixin } from '@/mixins/EduListMixin'
import { EduListMixin } from '@/mixins/KwglMixin'
import { EduUtils } from '@/mixins/EduUtils'
import VeJwBukaoModal from './modules/VeJwBukaoModal'
import JDictSelectTag from '@/components/dict/JDictSelectTag'
import { getAction } from '@/api/common/manage'
import VeJwBkStudentModal from './modules/VeJwBkStudentModal'
import JSelectXiaoqu from '@/components/kwglbiz/JSelectXiaoqu'
import JSelectJiaoxueKecheng from '@/components/kwglbiz/JSelectJiaoxueKecheng'

export default {
  name: 'VeJwBukaoList',
  mixins: [EduListMixin,EduUtils],
  components: {
    JSelectJiaoxueKecheng,
    JSelectXiaoqu,
    VeJwBukaoModal,
    VeJwBkStudentModal,
  },
  data() {
    return {
      description: 've_jw_bukao管理页面',
      // eduurl: 'http://159.75.200.65:4010',
      // 表头
      columns: [
        {
          title: '状态',
          align: 'center',
          dataIndex: 'statusDictText',
        },
        {
          title: '发布状态',
          align: 'center',
          dataIndex: 'ispublishDictText',
        },
        {
          title: '课程名称',
          align: 'center',
          dataIndex: 'kcmc',
        },
        {
          title: '监考教师',
          align: 'center',
          dataIndex: 'jiankaoName',
        },

        {
          title: '巡考教师',        // {
          //   title: '考试性质',
          //   align: 'center',
          //   dataIndex: 'ksxzmDictText',
          // },
          //
          // {
          //   title: '考试形式',
          //   align: 'center',
          //   dataIndex: 'ksxsmDictText',
          // },
          align: 'center',
          dataIndex: 'xunkaoName',
        },
        {
          title: '考试方式',
          align: 'center',
          dataIndex: 'ksfsmDictText',
        },

        {
          title: '考试时间',
          align: 'center',
          dataIndex: 'ksrqsj',
          scopedSlots: { customRender: 'ksrqsj' },
        },

        {
          title: '考试地点',
          dataIndex: 'action',
          align: 'center',
          scopedSlots: { customRender: 'place' },
        },
        {
          title: '最多参加人数',
          align: 'center',
          dataIndex: 'number',
        },

        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          scopedSlots: { customRender: 'action' },
        },
      ],
      url: {
        list: '/kwgl/veJwBukao/list',
        delete: '/kwgl/veJwBukao/delete',
        deleteBatch: '/kwgl/veJwBukao/deleteBatch',
        exportXlsUrl: '/kwgl/veJwBukao/exportXls',
        importExcelUrl: 'kwgl/veJwBukao/importExcel',
        changePublish: '/kwgl/veJwBukao/changePublishById',
        updateStatusBatch: '/kwgl/veJwBukao/updateStatusBatch',
        getBuildingList: '/jxzy/jwJianzhu/list',
        getClassroomList: '/jxzy/jwJiaoshi/list',
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
  created() {
    this.getCampus()
  },
  methods: {
	modalFormOk(){
		this.searchQuery();
	},
    initDictConfig() {},

    // getCampus() {
    //   var getDeparementUrl = this.eduurl + '/common/veCommon/queryCampusList'
    //   getAction(getDeparementUrl)
    //     .then((res) => {
    //       if (res.success) {
    //         this.campus = res.result
    //         console.log('------------------------')
    //         console.log(this.campus)
    //       } else {
    //         this.$message.warning(res.message)
    //       }
    //     })
    //     .finally(() => {
    //       this.loading = false
    //     })
    // },

    edit: function (record) {
      this.$refs.modalForm.edit(record)
      this.$refs.modalForm.title = '编辑'
      this.$refs.modalForm.disableSubmit = false
      this.$refs.modalForm.flag = false
    },
    add: function () {
      this.$refs.modalForm.add()
      this.$refs.modalForm.title = '新增'
      this.$refs.modalForm.disableSubmit = false
      this.$refs.modalForm.flag = true
    },

    getStudents: function (record) {
      this.$refs.studentsForm.select(record)
      this.$refs.studentsForm.title = '查看名单'
      this.$refs.studentsForm.disableSubmit = false
    },
    publish(record) {
      if (!this.url.changePublish) {
        this.$message.error('请设置url.changePublish属性!')
        return
      }
      var that = this
      this.$confirm({
        title: '发布',
        content: '是否发布此补考信息?',
		okText: '确认',
		cancelText:'取消',
        onOk: function () {
          that.loading = true
          getAction(that.url.changePublish, { id: record.id, status: 1 })
            .then((res) => {
              if (res.success) {
                that.$message.success(res.message)
                that.loadData()
              } else {
                that.$message.warning(res.message)
              }
            })
            .finally(() => {
              that.loading = false
            })
        },
      })
    },

    dispublish(record) {
      if (!this.url.changePublish) {
        this.$message.error('请设置url.changePublish属性!')
        return
      }
      var that = this
      this.$confirm({
        title: '取消发布',
        content: '是否取消发布此补考信息?',
		okText: '确认',
		cancelText:'取消',
        onOk: function () {
          that.loading = true
          getAction(that.url.changePublish, { id: record.id, status: 0 })
            .then((res) => {
              if (res.success) {
                that.$message.success(res.message)
                that.loadData()
              } else {
                that.$message.warning(res.message)
              }
            })
            .finally(() => {
              that.loading = false
            })
        },
      })
    },

    //批量禁用
    batchDisable: function () {
      if (!this.url.updateStatusBatch) {
        this.$message.error('请设置url.updateStatusBatch属性!')
        return
      }
      if (this.selectedRowKeys.length <= 0) {
        this.$message.warning('请选择一条记录！')
        return
      } else {
        var ids = ''
        for (var a = 0; a < this.selectedRowKeys.length; a++) {
          ids += this.selectedRowKeys[a] + ','
        }
        var that = this
        this.$confirm({
          title: '确认禁用',
          content: '是否禁用选中数据?',
		  okText: '确认',
		  cancelText:'取消',
          onOk: function () {
            that.loading = true
            getAction(that.url.updateStatusBatch, { ids: ids, status: 0 })
              .then((res) => {
                if (res.success) {
                  that.$message.success(res.message)
                  that.loadData()
                  that.onClearSelected()
                } else {
                  that.$message.warning(res.message)
                }
              })
              .finally(() => {
                that.loading = false
              })
          },
        })
      }
    },
    //批量启用
    batchAble: function () {
      if (!this.url.updateStatusBatch) {
        this.$message.error('请设置url.updateStatusBatch属性!')
        return
      }
      if (this.selectedRowKeys.length <= 0) {
        this.$message.warning('请选择一条记录！')
        return
      } else {
        var ids = ''
        for (var a = 0; a < this.selectedRowKeys.length; a++) {
          ids += this.selectedRowKeys[a] + ','
        }
        var that = this
        this.$confirm({
          title: '确认启用',
          content: '是否启用选中数据?',
		  okText: '确认',
		  cancelText:'取消',
          onOk: function () {
            that.loading = true
            getAction(that.url.updateStatusBatch, { ids: ids, status: 1 })
              .then((res) => {
                if (res.success) {
                  that.$message.success(res.message)
                  that.loadData()
                  that.onClearSelected()
                } else {
                  that.$message.warning(res.message)
                }
              })
              .finally(() => {
                that.loading = false
              })
          },
        })
      }
    },
  },
}
</script>
