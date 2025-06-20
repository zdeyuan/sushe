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
              <a-form-item label="年级">
                <j-select-grade placeholder="请选择年级" width="150px" v-model="queryParam.gradeid"></j-select-grade>
              </a-form-item>
              <a-form-item label="学期">
<!--                <a-input placeholder="课程名称" v-model="queryParam.kcmc"></a-input>-->
                <j-select-xueqi placeholder="请选择学期" width="150px" v-model="queryParam.semid"></j-select-xueqi>
              </a-form-item>
              <span class="table-page-search-submitButtons">
                <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
                <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
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
            <a @click="handleDetail(record)">详情</a>
          </span>
          <span slot="radio" style="padding-left: 10px" slot-scope="text, record">
            <a-radio @click="targetModel = record" :checked="targetModel.id == record.id"></a-radio>
          </span>

          <span slot="isGraduate" slot-scope="text, record">
            <a-switch :disabled="true" v-model="record.isGraduate" :active-value="1" :inactive-value="0" />
          </span>

          <span slot="isAble" slot-scope="text, record">
            <a-switch :disabled="true" v-model="record.isAble" :active-value="1" :inactive-value="0" />
          </span>
        </a-table>
      </div>
    </a-card>
  </a-modal>
</template>

<script>
import '@/assets/scss/common.scss';
import { EduListMixin } from '@/mixins/KwglMixin'
import { httpAction } from '@/api/common/manage'
import { formatDate } from '@/utils/util'
import JSelectGrade from '@/components/kwglbiz/JSelectGrade'
import JSelectXueqi from '@/components/kwglbiz/JSelectXueqi'
import JSelectXuezhi from '@/components/kwglbiz/JSelectXuezhi'

export default {
  name: 'JwSelectPyfa',
  mixins: [EduListMixin],
  components: { JSelectXuezhi, JSelectXueqi, JSelectGrade },
  data() {
    return {
      confirmLoading: false,
      title: '选择课程',
      width: '80%',
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
          title: '专业',
          align: 'center',
          dataIndex: 'specidName',
        },
        {
          title: '学制',
          align: 'center',
          dataIndex: 'xzidName',
        },
        {
          title: '描述',
          align: 'center',
          dataIndex: 'description',
        },

        {
          title: '创建时间',
          align: 'center',
          dataIndex: 'createTime',
        },
        {
          title: '是否毕业',
          align: 'center',
          dataIndex: 'isGraduate',
          scopedSlots: { customRender: 'isGraduate' },
        },
        {
          title: '是否有效',
          align: 'center',
          dataIndex: 'isAble',
          scopedSlots: { customRender: 'isAble' },
        },
      ],
      url: {
        list: '/jxgz/veJwPyfa/tlist',
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
    this.getDeps()
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
        this.$message.warning('未选择课程')
        return
      }
		console.log(this.targetModel, this.targetModel.id)
      //回送所选教材信息
      this.$emit('ok', this.targetModel, this.targetModel.id)
      this.close()
    },
    show(ids) {
      this.visible = true
      this.searchQuery()

      this.targetModel = {}
    },
    getDeps() {
      var getSpecUrl = this.eduurl + '/common/veCommon/querySpecialtyListByFalId'
	   httpAction(getSpecUrl, { falId: '001', id: this.id }, 'get').then((res) => {
          if (res.success) {
            this.specs = res.result
            console.log(this.specs)
          } else {
            this.$message.warning(res.message)
          }
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
}
</script>
