<template>
  <a-modal
    :title="title"
    :width="width"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭"
  >
    <a-card :bordered="false">
      <!-- 查询区域 -->
      <div class="table-page-search-wrapper">
        <a-form layout="inline" @keyup.enter.native="searchQuery">
          <a-row :gutter="24">
            <a-col :span="8">
              <a-form-item>
                <a-input placeholder="课程号" v-model="queryParam.kch"></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item>
                <a-input placeholder="课程名称" v-model="queryParam.kcmc"></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <span style="float: left; overflow: hidden" class="table-page-search-submitButtons">
                <a-button type="primary" @click="searchQuery" icon="search" style="margin-left: 8px">查询</a-button>
                <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>
      <a-table
        ref="table"
        size="middle"
        bordered
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        @change="handleTableChange"
      >
        <span slot="radio" style="padding-left: 10px" slot-scope="record">
          <a-radio @click="targetModel = record" :checked="targetModel.id == record.id"></a-radio>
        </span>
        <span slot="action" slot-scope="text, record">
          <a style="color:#17C0C2" @click="handleSelect(record)">选择</a>
        </span>
      </a-table>
    </a-card>
  </a-modal>
</template>

<script>
import { EduListMixin } from '@/mixins/EduListMixin'
import { getKCPageList } from '@/api/kw/veIntegration'

export default {
  name: 'SelectCourseModule',
  mixins: [EduListMixin],
  components: {},
  data() {
    return {
      confirmLoading: false,
      title: '选择课程',
      width: 800,
      visible: false,
      targetModel: {},
      specs: [],
      ids: '',
      columns: [
        {
          title: '',
          dataIndex: '',
          key: 'id',
          width: 50,
          align: 'center',
          scopedSlots: { customRender: 'radio' }
        },
        {
          title: '课程号',
          align: 'center',
          dataIndex: 'kch'
        },
        {
          title: '课程名称',
          align: 'center',
          dataIndex: 'kcmc'
        },
        {
          title: '操作',
          align: 'center',
          scopedSlots: { customRender: 'action' }
        }
      ],
      dictOptions: {},
      isorter: []
    }
  },
  methods: {
    loadData(arg) {
      if (arg === 1) {
        this.ipagination.current = 1
      }
      const params = this.getQueryParams()
      this.loading = true
      getKCPageList(params).then(res => {
        const { success, result, message } = res
        if (success) {
          const { records, total } = result
          this.dataSource = records
          this.ipagination.total = total
        } else {
          this.$message.warning(message)
        }
        this.loading = false
      })
    },
    handleCancel() {
      this.close()
    },
    close() {
      this.visible = false
    },
    handleSelect(record) {
      //回送所选教材信息
      this.$emit('select', record)
      this.close()
    },
    handleOk() {
      if (this.targetModel.id == null) {
        this.$message.warning('未选择课程')
        return
      }
      //回送所选教材信息
      this.$emit('select', this.targetModel)
      this.close()
    },
    show(ids) {
      this.visible = true
      this.searchQuery()
      this.targetModel = {}
    }
  }
}
</script>
