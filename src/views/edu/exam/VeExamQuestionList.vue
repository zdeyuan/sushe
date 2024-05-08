<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24"></a-row>
      </a-form>
    </div>
    <!-- 查询区域-END -->

    <a-modal title="Title" :visible="visible" @cancel="handleCancel">
      <SingleChoice no="1" id="1"></SingleChoice>
    </a-modal>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-dropdown>
        <a-menu slot="overlay" @click="handleAddNew">
          <a-menu-item :key="1">
            <a-icon type="plus" />添加单选题
          </a-menu-item>
          <a-menu-item :key="2">
            <a-icon type="plus" />添加多选题
          </a-menu-item>
          <a-menu-item :key="3">
            <a-icon type="plus" />添加判断题
          </a-menu-item>
          <a-menu-item :key="4">
            <a-icon type="plus" />添加填空题
          </a-menu-item>
          <a-menu-item :key="5">
            <a-icon type="plus" />添加大题
          </a-menu-item>
        </a-menu>
        <a-button type="primary" style="margin-left: 8px">
          新增
          <a-icon type="down" />
        </a-button>
      </a-dropdown>
      <a-button type="primary" icon="download" @click="visible = true">测试</a-button>
      <a-button type="primary" icon="download" @click="handleExportXls('ve_exam_question')">导出</a-button>
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
      <!-- 高级查询区域 -->
      <j-super-query
        :fieldList="superFieldList"
        ref="superQueryModal"
        @handleSuperQuery="handleSuperQuery"
      ></j-super-query>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel">
            <a-icon type="delete" />删除
          </a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px">
          批量操作
          <a-icon type="down" />
        </a-button>
      </a-dropdown>
    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择
        <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>

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
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        class="j-table-force-nowrap"
        @change="handleTableChange"
      >
        <!-- 字符串超长截取省略号显示 -->
        <span slot="question" slot-scope="text">
          <j-ellipsis :value="text" :length="25" />
        </span>

        <template slot="htmlSlot" slot-scope="text">
          <div v-html="text"></div>
        </template>
        <template slot="imgSlot" slot-scope="text">
          <span v-if="!text" style="font-size: 12px;font-style: italic;">无图片</span>
          <img
            v-else
            :src="getImgView(text)"
            height="25px"
            alt
            style="max-width:80px;font-size: 12px;font-style: italic;"
          />
        </template>
        <template slot="fileSlot" slot-scope="text">
          <span v-if="!text" style="font-size: 12px;font-style: italic;">无文件</span>
          <a-button
            v-else
            :ghost="true"
            type="primary"
            icon="download"
            size="small"
            @click="downloadFile(text)"
          >下载</a-button>
        </template>

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">编辑</a>

          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">
              更多
              <a-icon type="down" />
            </a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a @click="handleDetail(record)">详情</a>
              </a-menu-item>
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>
      </a-table>
    </div>

    <ve-exam-question-modal ref="modalForm" @ok="modalFormOk"></ve-exam-question-modal>
  </a-card>
</template>

<script>
import '@/assets/less/TableExpand.less'
import { mixinDevice } from '@/utils/mixin'
import { EduListMixin } from '@/mixins/EduListMixin'
import VeExamQuestionModal from './modules/VeExamQuestionModal'
import JSuperQuery from '@/components/edu/JSuperQuery.vue'
import SingleChoice from './components/SingleChoice'

export default {
  name: 'VeExamQuestionList',
  mixins: [EduListMixin, mixinDevice],
  components: {
    VeExamQuestionModal,
    SingleChoice,
    JSuperQuery
  },
  data() {
    return {
      visible: false,
      description: 've_exam_question管理页面',
      // 表头
      columns: [
        {
          title: '#',
          dataIndex: '',
          key: 'rowIndex',
          width: 60,
          align: 'center',
          customRender: function(t, r, index) {
            return parseInt(index) + 1
          }
        },
        {
          title: '标题名称',
          align: 'left',
          dataIndex: 'question',
          scopedSlots: { customRender: 'question' }
        },
        {
          title: '题目类型',
          align: 'center',
          dataIndex: 'typeid'
        },
        {
          title: '难度',
          align: 'center',
          dataIndex: 'complexity'
        },
        {
          title: '分数',
          align: 'center',
          dataIndex: 'score'
        },
        {
          title: '所属课程目录',
          align: 'center',
          dataIndex: 'topicid'
        },
        {
          title: '添加时间',
          align: 'center',
          dataIndex: 'addtime'
        },
        {
          title: '状态',
          align: 'center',
          dataIndex: 'status'
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
        list: '/exam/veExamQuestion/list',
        delete: '/exam/veExamQuestion/delete',
        deleteBatch: '/exam/veExamQuestion/deleteBatch',
        exportXlsUrl: '/exam/veExamQuestion/exportXls',
        importExcelUrl: 'org.edu.module.exam/veExamQuestion/importExcel'
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
    handleCancel(e) {
      console.log('Clicked cancel button')
      this.visible = false
    },
    // 新增点击事件，将typeid传入表单页
    handleAddNew: function(para) {
      this.$refs.modalForm.add()
      this.$refs.modalForm.typeid = para.key
      this.$refs.modalForm.title = '新增'
      this.$refs.modalForm.disableSubmit = false
    },
    initDictConfig() {},
    getSuperFieldList() {
      let fieldList = []
      fieldList.push({ type: 'int', value: 'typeid', text: '问题类型id' })
      fieldList.push({ type: 'int', value: 'topicid', text: '主题id' })
      fieldList.push({ type: 'int', value: 'fileid', text: '附件id' })
      fieldList.push({ type: 'int', value: 'pid', text: '父id' })
      fieldList.push({ type: 'string', value: 'question', text: '问题内容' })
      fieldList.push({ type: 'int', value: 'score', text: '默认分数' })
      fieldList.push({ type: 'int', value: 'complexity', text: '难易度：1=简单，2=一般，3=困难' })
      fieldList.push({ type: 'int', value: 'status', text: '1启用0禁用' })
      fieldList.push({ type: 'int', value: 'adduser', text: '用户Id' })
      fieldList.push({ type: 'int', value: 'addtime', text: '时间' })
      fieldList.push({ type: 'int', value: 'terminalid', text: '终端' })
      fieldList.push({ type: 'int', value: 'placeId', text: '多租户id' })
      this.superFieldList = fieldList
    }
  }
}
</script>
<style scoped>
@import '~@assets/less/common.less';
</style>