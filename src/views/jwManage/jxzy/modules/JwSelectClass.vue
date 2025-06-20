<template>
  <a-modal
    :title="title"
    :width="width"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    okText="确认"  cancelText="取消"
  >
    <a-card :bordered="false">
      <!-- 查询区域 -->
      

      <!-- table区域-begin -->
      <div>
        <a-table
          ref="table"
          size="middle"
          rowKey="id"
          :columns="columns"
          :dataSource="dataSource"
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
            <a @click="handleDetail(record)">详情</a>
          </span>
          <span slot="radio" style="padding-left: 10px" slot-scope="text, record">
            <a-radio @click="targetModel = record" :checked="targetModel.id == record.id"></a-radio>
          </span>
        </a-table>
      </div>
    </a-card>
  </a-modal>
</template>

<script>
import '@/assets/scss/common.scss';
import { EduListMixin } from '@/mixins/EduListMixin'
import { getAction } from '@/api/common/manage'
import { postAction } from '@/api/common/manage'

import { formatDate } from '@/utils/util'

export default {
  name: 'JwSelectClass',
  mixins: [EduListMixin],

  components: {},
  data() {
    return {
      confirmLoading: false,
      title: '选择班级',
      disableMixinCreated: true,
      width: '60%',
      visible: false,
      targetModel: {},
      ids: '',
      // 表头
      columns: [
        {
          title: '',
          dataIndex: '',
          key: 'id',
          width: 50,
          align: 'center',
          scopedSlots: { customRender: 'radio' },
        },
        {
          title: '班级名称',
          align: 'center',
          dataIndex: 'name',
        },
        ,
      ],
      url: {
        bjlist: '/jxzy/edu-teach/teach/veBaseBanji/list',
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
    initDictConfig() {},
    handleCancel() {
      this.close()
    },

    loadBjData(arg) {
      if (!this.url.bjlist) {
        this.$message.error('请设置url.bjlist!')
        return
      }

      postAction(this.url.bjlist).then((res) => {
        if (res.success) {
          //update-begin---author:zhangyafei    Date:20201118  for：适配不分页的数据列表------------
          console.log(res.success)
          this.dataSource = res.result.records || res.result
          if (res.result.total) {
            this.ipagination.total = res.result.total
          }
          //update-end---author:zhangyafei    Date:20201118  for：适配不分页的数据列表------------
        }
        if (res.code === 510) {
          this.$message.warning(res.message)
        }
        this.loading = false
      })
    },

    close() {
      this.visible = false
    },
    handleOk() {
      if (this.targetModel.id == null) {
        this.$message.warning('未选择班级')
        return
      }

      //回送所选班级信息
      this.$emit('ok', this.targetModel, this.targetModel.id)
      this.close()
    },
    show(ids) {
      this.visible = true
      //this.searchQuery()
      this.loadBjData()
      //初始化字典配置 在自己页面定义
      this.initDictConfig()
      this.targetModel = {}
    },
  },
}
</script>
