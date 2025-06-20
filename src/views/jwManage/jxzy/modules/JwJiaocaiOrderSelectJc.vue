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
      <div class="table-page-search-wrapper">
        <a-form layout="inline" @keyup.enter.native="searchQuery">
          <a-row :gutter="24">
            <a-col :xl="7" :lg="7" :md="8" :sm="24">
              <a-form-item label="教材代码">
                <a-input v-model="queryParam.jcdm"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="7" :lg="7" :md="8" :sm="24">
              <a-form-item label="教材名称">
                <a-input v-model="queryParam.jcmc"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="7" :lg="7" :md="8" :sm="24">
              <span style="float: left; overflow: hidden" class="table-page-search-submitButtons">
                <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
                <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
                <!--              <a @click="handleToggleSearch" style="margin-left: 8px">-->
                <!--                {{ toggleSearchStatus ? '收起' : '展开' }}-->
                <!--                <a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>-->
                <!--              </a>-->
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>

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

import { formatDate } from '@/utils/util'

export default {
  name: 'JwJiaocaiOrderSelectJc',
  mixins: [EduListMixin],
  components: {},
  data() {
    return {
      confirmLoading: false,
      title: '选择课程',
      width: '90%',
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
          title: '适用课程',
          align: 'center',
          dataIndex: 'kcid_dictText',
        },
        {
          title: '教材名称',
          align: 'center',
          dataIndex: 'jcmc',
        },
,
      ],
      url: {
        list: '/jxzy/jwJiaocai/list',
        delete: '/jxzy/jwJiaocai/delete',
        deleteBatch: '/jxzy/jwJiaocai/deleteBatch',
        exportXlsUrl: '/jxzy/jwJiaocai/exportXls',
        importExcelUrl: 'jxzy/jwJiaocai/importExcel',
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
    close() {
      this.visible = false
    },
    handleOk() {
      if (this.targetModel.id == null) {
        this.$message.warning('未选择教材')
        return
      }
     

      //回送所选教材信息
      this.$emit('ok', this.targetModel, this.targetModel.id);
      this.close()
      
    },
    show(ids) {
      this.visible = true
      this.searchQuery()

      this.targetModel = {}
    },
  },
}
</script>
