<template>
  <edu-layout type="table">
    <!-- 表格 -->
    <div slot="table" class="right_table">
      <div>
        <edu-query ref="cwQuery" code="veJkyFundType" :do-filter="handleFilter">
          <template slot="search">
            <edu-query-item title="名称" pname="NAME" pop="like" stype="input"> </edu-query-item>
            <edu-query-item title="代码" pname="code_Num" pop="like" stype="input"> </edu-query-item>
          </template>
        </edu-query>
        <edu-table
          ref="veJkyFundTypeTable"
          code="veJkyFundType"
          :api="veJkyFundTypeTable.api"
          :get-params="getParams"
          :to-update="handleUpdate"
          :do-add="handleCreate"
        >
          <!--         <template slot-scope="text, record, index">
       <span></span>
       </template>-->
          <a-table-column title="名称" dataIndex="name" width="150px"> </a-table-column>
          <a-table-column title="代码" dataIndex="codeNum" width="150px"> </a-table-column>
          <a-table-column title="排序" dataIndex="listSort" width="150px"> </a-table-column>
        </edu-table>
      </div>
      <!-- 编辑页 -->
      <veJkyFundTypeEdit v-if="showType == 'edit'" ref="veJkyFundTypeEdit" @onOk="editOk" @onCancel="editCancel"> </veJkyFundTypeEdit>
    </div>
  </edu-layout>
</template>

<script>
import veJkyFundTypeApi from '@/api/research/rfunds/veJkyFundTypeApi';
import veJkyFundTypeEdit from './veJkyFundTypeEdit';

export default {
  components: {
    veJkyFundTypeEdit
  },
  data() {
    const data = {
      veJkyFundTypeQuery: {},
      showType: 'table'
    };
    data.veJkyFundTypeTable = {
      api: veJkyFundTypeApi
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
      this.$refs.veJkyFundTypeTable.reload();
    },
    /**
     * @msg: 新增事件
     */
    handleCreate() {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veJkyFundTypeEdit.doCreate();
      });
    },
    /**
     * @msg: 编辑行事件
     */
    handleUpdate(row) {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veJkyFundTypeEdit.doUpdate(row);
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
      this.$refs.veJkyFundTypeTable.reload();
    }
  }
};
</script>
<style lang="less" scoped></style>
