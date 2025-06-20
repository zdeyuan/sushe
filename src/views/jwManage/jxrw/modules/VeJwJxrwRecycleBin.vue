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
    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button
        @click="destroyBatch"
        type="primary"
        icon="close-circle"
        style="background: #f47920; color: white; border: none"
        >销毁</a-button
      >
      <a-button
        @click="restoreBatch"
        type="primary"
        icon="check-circle"
        style="background: #37d75a; color: white; border: none"
        >还原</a-button
      >

      <a-button @click="modalReset" type="primary" icon="reload">刷新</a-button>
    </div>

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="7" :lg="7" :md="8" :sm="24">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-model="queryParam.specid" placeholder="请输入专业id"> </a-input>
            </a-form-item>
          </a-col>

          <a-col :xl="7" :lg="7" :md="8" :sm="24">
            <span style="float: left; overflow: hidden" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">搜索</a-button>
              <a-button @click="modalReset" icon="delete" style="margin-right: 8px; background: #f47920; color: white"
                >清空</a-button
              >
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <!-- 查询区域-END -->

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
          <a @click="detail(record)">查看</a>

          <a-divider type="vertical" />
          <a @click="destroy(record)" style="color: orange">销毁</a>
          <a-divider type="vertical" />
          <a @click="restore(record)">还原</a>
        </span>

        <span slot="ismerged" slot-scope="text, record">
          <a-switch
            default-checked
            @change="changeIsmerged(record.id, checked)"
            v-model="record.ismergedclass"
            :active-value="1"
            :inactive-value="0"
          />
        </span>

        <span slot="ispublish" slot-scope="text, record">
          <a-switch
            default-checked
            @change="changeIsPublish(record.id, checked)"
            v-model="record.ispublish"
            :active-value="1"
            :inactive-value="0"
          />
        </span>
      </a-table>
    </div>

    <ve-jw-jxrw-edit-modal ref="modalForm"></ve-jw-jxrw-edit-modal>
  </a-modal>
</template>

<script>
import '@/assets/scss/common.scss';
// import { EduListMixin } from '@/mixins/EduListMixin'
import { EduListMixin } from '@/mixins/KwglMixin'
import { postAction, getAction, deleteAction } from '@/api/common/manage'
import VeJwJxrwEditModal from './VeJwJxrwEditModal.vue'

export default {
  name: 'VeJwJxrwRecycleBin',
  mixins: [EduListMixin],
  components: { VeJwJxrwEditModal },
  data() {
    return {
      description: 've_jw_jxrw管理页面',
      disableMixinCreated: true,
      visible: false,
      queryParam:{delflag: "1",},
      width: 1200,
	  labelCol: {
	    xs: { span: 24 },
	    sm: { span: 5 },
	  },
	  wrapperCol: {
	    xs: { span: 24 },
	    sm: { span: 16 },
	  },
      // 表头
      columns: [
        {
          title: '学年',
          align: 'center',
          dataIndex: 'semester',
        },

        {
          title: '课程性质',
          align: 'center',
          dataIndex: 'kcxz_dictText',
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
          title: '班级',
          align: 'center',
          dataIndex: 'classname',
        },

        {
          title: '课程',
          align: 'center',
          dataIndex: 'kcid_dictText',
        },

        {
          title: '合班',
          align: 'center',
          dataIndex: 'ismergedclass',
          scopedSlots: { customRender: 'ismerged' },
        },

        {
          title: '状态',
          align: 'center',
          dataIndex: 'checkstatus_dictText',
        },
        {
          title: '发布',
          align: 'center',
          dataIndex: 'ispublish',
          scopedSlots: { customRender: 'ispublish' },
        },

        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          scopedSlots: { customRender: 'action' },
        },
      ],
      url: {
        list: '/jxrw/veJwJxrw/list',
        destroy: '/jxrw/veJwJxrw/destroy',
        destroyBatch: '/jxrw/veJwJxrw/destroyBatch',
        restore: '/jxrw/veJwJxrw/restore',
        restoreBatch: '/jxrw/veJwJxrw/restoreBatch',
      },
      dictOptions: {},
      isorter: [],
    }
  },
//   created() {
//     this.queryParam.delflag = '1'
//     this.loadData(1)
//   },
  computed: {
    importExcelUrl: function () {
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
    },
  },
  methods: {
    initDictConfig() {},

    detail: function (record) {
      this.$refs.modalForm.edit(record)
      this.$refs.modalForm.title = '查看'
      this.$refs.modalForm.disableSubmit = false
    },
    show() {
      this.visible = true
                this.loadData(1)
    },
    close() {
      this.$emit('close')
      this.visible = false

    },

    //批量销毁
    destroyBatch: function () {
      if (!this.url.destroyBatch) {
        this.$message.error('请设置url.destroyBatch!')
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
          title: '确认销毁',
          content: '是否销毁选中数据?',
		  okText: '确认',
		  cancelText:'取消',
          onOk: function () {
            that.loading = true
            deleteAction(that.url.destroyBatch, { ids: ids, status: 0 })
              .then((res) => {
                if (res.success) {
                  that.$message.success(res.message)
                  that.modalReset()
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

    //批量还原
    restoreBatch: function () {
      if (!this.url.restoreBatch) {
        this.$message.error('请设置url.restoreBatch!')
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
          title: '确认还原',
          content: '是否还原选中数据?',
		  okText: '确认',
		  cancelText:'取消',
          onOk: function () {
            that.loading = true
            getAction(that.url.restoreBatch, { ids: ids, status: 0 })
              .then((res) => {
                if (res.success) {
                  that.$message.success(res.message)
                  that.modalReset()
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

    //销毁
    destroy(record) {
      var that = this
      this.$confirm({
        title: '确认销毁',
        content: '是否销毁此教学任务?',
        onOk: function () {
          that.confirmLoading = true
          deleteAction(that.url.destroy, { id: record.id })
            .then((res) => {
              if (res.success) {
                that.$message.success(res.message)
                that.modalReset()
              } else {
                that.$message.warning(res.message)
              }
            })
            .finally(() => {
              that.confirmLoading = false
              this.close()
            })
        },
      })
    },

    //还原
    restore(record) {
      var that = this
      this.$confirm({
        title: '确认还原',
        content: '是否还原此教学任务?',
		okText: '确认',
		cancelText:'取消',
        onOk: function () {
          that.confirmLoading = true
          getAction(that.url.restore, { id: record.id })
            .then((res) => {
              if (res.success) {
                that.$message.success(res.message)
                that.modalReset()
              } else {
                that.$message.warning(res.message)
              }
            })
            .finally(() => {
              that.confirmLoading = false
              this.close()
            })
        },
      })
    },

    handleOk() {
      this.close()
    },
    handleCancel() {
      this.close()
    },

    //重置
    modalReset() {
      this.queryParam = {}
      this.queryParam.delflag = '1'
      console.log(this.queryParam)
      this.loadData(1)
    },
  },
}
</script>
