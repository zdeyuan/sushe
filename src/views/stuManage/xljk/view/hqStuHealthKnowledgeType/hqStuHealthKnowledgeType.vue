<template>
  <edu-layout type="table">
    <!-- 表格 -->
    <div slot="table" class="right_table">
      <div>
        <edu-query ref="cwQuery" code="hqStuHealthKnowledgeType" :do-filter="handleFilter">
          <template slot="search">
            <edu-query-item title="类型名称" pname="type_name" pop="like" stype="input"> </edu-query-item>
            <edu-query-item title="状态" pname="status"  pop="like" stype="select" code="status"> </edu-query-item>
          </template>
        </edu-query>
        <edu-table
          ref="hqStuHealthKnowledgeTypeTable"
          code="hqStuHealthKnowledgeType"
          :api="hqStuHealthKnowledgeTypeTable.api"
          :get-params="getParams"
          :config="{}"
          :to-update="handleUpdate"
          :do-add="handleCreate"
        >
          <!--         <template slot-scope="text, record, index">
       <span></span>
       </template>-->
          <a-table-column title="类型名称" dataIndex="typeName" width="150px"> </a-table-column>
        </edu-table>
      </div>
      <!-- 编辑页 -->
      <hqStuHealthKnowledgeTypeEdit v-if="showType == 'edit'" ref="hqStuHealthKnowledgeTypeEdit" @onOk="editOk" @onCancel="editCancel">
      </hqStuHealthKnowledgeTypeEdit>
      <hqStuHealthKnowledgeTypeShow v-if="showType == 'show'" ref="hqStuHealthKnowledgeTypeShow" @onOk="editOk" @onCancel="editCancel">
      </hqStuHealthKnowledgeTypeShow>
    </div>
  </edu-layout>
</template>

<script>
import hqStuHealthKnowledgeTypeApi from '../../api/hqStuHealthKnowledgeTypeApi';
import hqStuHealthKnowledgeTypeEdit from './hqStuHealthKnowledgeTypeEdit';
import hqStuHealthKnowledgeTypeShow from './hqStuHealthKnowledgeTypeShow';

export default {
  components: {
    hqStuHealthKnowledgeTypeEdit,
    hqStuHealthKnowledgeTypeShow
  },
  data() {
    const data = {
      hqStuHealthKnowledgeTypeQuery: {},
      showType: 'table'
    };
    data.hqStuHealthKnowledgeTypeTable = {
      api: hqStuHealthKnowledgeTypeApi
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 表格获取请求数据 必须return 一个对象
     */
    getParams() {
      const params = this.$refs['cwQuery'].getQueryData();
      return params;
    },
    /**
     * @msg: 搜索事件
     */
    handleFilter() {
      this.$refs.hqStuHealthKnowledgeTypeTable.reload();
    },
    /**
     * @msg: 新增事件
     */
    handleCreate() {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.hqStuHealthKnowledgeTypeEdit.doCreate();
      });
    },
    /**
     * @msg: 编辑行事件
     */
    handleUpdate(row) {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.hqStuHealthKnowledgeTypeEdit.doUpdate(row);
      });
    },
    /**
     * @msg: 编辑行事件
     */
    toDetail(row) {
      this.showType = 'show';
      this.$nextTick(() => {
        this.$refs.hqStuHealthKnowledgeTypeShow.doShow(row);
      });
    },
    /**
     * @msg: 编辑页取消事件
     */
    editCancel() {
      this.showType = 'table';
    },
    /**
     * @msg: 编辑页成功事件
     */
    editOk() {
      this.showType = 'table';
      this.$refs.hqStuHealthKnowledgeTypeTable.reload();
    }
  }
};
</script>
<style lang="less" scoped></style>
