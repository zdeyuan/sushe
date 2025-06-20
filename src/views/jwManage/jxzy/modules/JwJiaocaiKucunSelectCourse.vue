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
            <a-col :xl="4" :lg="7" :md="8" :sm="24">
              <a-form-item>
                <a-input placeholder="课程号" v-model="queryParam.kch"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="4" :lg="7" :md="8" :sm="24">
              <a-form-item>
                <a-input placeholder="课程名称" v-model="queryParam.kcmc"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="4" :lg="7" :md="8" :sm="24">
              <a-form-item>
                <j-dict-select-tag
                  :disabled="check"
                  v-decorator="['kcid']"
                  placeholder="专业组/未给表"
                  dictCode="edu_dev.ve_jw_kecheng,KCMC,id"
                  :trigger-change="true"
                ></j-dict-select-tag>
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
      <div style="display: flex">
        <!-- 左侧选择 -->
        <div>
          <a-table
            ref="table"
            size="middle"
            rowKey="id"
            :columns="columns"
            :dataSource="dataSource"
            :rowSelection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
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

        <!-- 中间按钮 -->
        <div>
          <div>
            <a-button type="primary" @click="selectAll" class="course-button" style="margin-top: 5rem"
              >选择全部</a-button
            >
          </div>
          <div>
            <a-button type="primary" @click="handleSelect" class="course-button">选择勾选</a-button>
          </div>
          <div>
            <a-button type="primary" @click="cleanAll" class="course-button">取消全部</a-button>
          </div>
          <div>
            <a-button type="primary" @click="removeSelect" class="course-button">取消勾选</a-button>
          </div>
        </div>
        <!-- 右侧添加 -->
        <div>
          <a-table
            ref="table"
            size="middle"
            style="float: left"
            rowKey="id"
            :columns="columns"
            :dataSource="dataSourceSelect"
            :loading="loading"
            :rowSelection="{ selectedRowKeys: selectedRowKeysRight, onChange: onSelectChangeRight }"
            @change="handleTableChange"
          >
          </a-table>
        </div>
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
  name: 'JwJiaocaiKucunSelectCourse',
  mixins: [EduListMixin],
  components: {},
  data() {
    return {
      confirmLoading: false,
      title: '选择课程',
      width: '90%',
      visible: false,
      nowSelectData: [], // 左边选中列表数据
      nowSelectRightData: [], // 右边选中列表数据
      targetModel: {},
      ids: '',
      // 表头
      columns: [
        {
          title: '课程号',
          align: 'center',
          dataIndex: 'kch',
        },
        {
          title: '课程名称',
          align: 'center',
          dataIndex: 'kcmc',
        },

        {
          title: '专业id（对应表未给且全未赋值）',
          align: 'center',
          dataIndex: 'specid',
        },
        ,
      ],
      url: {
        list: '/jxzy/jwKecheng/list',
      },
      dictOptions: {},
      isorter: [],
      selectedRowKeys: [],
      selectedRowKeysRight: [],
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
        this.$message.warning('未选择课程')
        return
      }

      //回送所选教材信息
      this.$emit('ok', this.targetModel, this.targetModel.id)
      this.close()
    },
    show(ids) {
      this.visible = true
      this.searchQuery()

      this.targetModel = {}
    },

    //左侧勾选
    onSelectChange(e) {
      this.selectedRowKeys = e
      console.log(e)
      console.log(this.dataSource)

      var page=  this.ipagination.current;
      var size= this.ipagination.pageSize;
      console.log(page)
       console.log(size)


      this.nowSelectData = this.dataSource.filter((_, index) =>
        this.selectedRowKeys.some((value) => (index + 1) == value%size)
      )

      console.log(this.nowSelectData)
    },

    //右侧勾选
    onSelectChangeRight(e) {
      this.selectedRowKeysRight = e
      console.log(this.selectedRowKeysRight)
    },

    test() {
      console.log(this.selectedRowKeys)
    },

    handleSelect() {
      if (this.nowSelectData.length == 0) {
        this.$message.warning('未选择数据')
        return
      } else {
        this.dataSourceSelect = this.nowSelectData
        this.loadData()
      }
    },

    selectAll() {
      this.selectedRowKeys = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      this.nowSelectData = this.dataSource
      this.loadData()
    },

    cleanAll() {
      this.selectedRowKeys = []
      this.nowSelectData = []
      this.dataSourceSelect = []
      this.loadData()
    },

    removeSelect() {
      if (this.selectedRowKeysRight.length == 0) {
        this.$message.warning('未选择数据')
        return
      } else {
        console.log(this.selectedRowKeysRight)
        console.log(this.selectedRowKeys)

        //左边-右边
        const temp = this.selectedRowKeys.filter((id) => this.selectedRowKeysRight.every((selectId) => selectId !== id))

        this.nowSelectRightData = this.dataSource.filter((_, index) => temp.some((value) => index + 1 == value))

        this.dataSourceSelect = this.nowSelectRightData

        this.loadData()
      }
    },

    handleOk() {
      if (this.dataSourceSelect.length == 0||this.dataSourceSelect==[]) {
        this.$message.warning('未选择课程')
        return
      }

      //回送所选教材信息
      this.$emit('ok', this.dataSourceSelect)
      this.close()
    },
  },
}
</script>
<style scoped>

.course-button {
  margin: 1rem 2rem 0 2rem;
}
</style>