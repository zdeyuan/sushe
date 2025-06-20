<template>
  <edu-layout type="table">
    <!-- 表格 -->
    <div slot="table" class="right_table">
      <div>
        <edu-query ref="cwQuery" code="veJkyOrganize" :do-filter="handleFilter">
          <template slot="search">
            <edu-query-item title="组织名称" pname="d.NAME" pop="like" stype="input"> </edu-query-item>
            <edu-query-item title="专业组长" pname="u.realname" pop="like" stype="input"> </edu-query-item>
          </template>
        </edu-query>
        <edu-table
          ref="veJkyOrganizeTable"
          code="veJkyOrganize"
          :api="veJkyOrganizeTable.api"
          :get-params="getParams"
          :to-update="handleUpdate"
          :do-add="handleCreate"
          :sorts="[
            {
              column: 'd.id',
              asc: false
            }
          ]"
        >
          <!--         <template slot-scope="text, record, index">
       <span></span>
       </template>-->
          <a-table-column title="组织名称" dataIndex="name"> </a-table-column>
          <a-table-column title="专业组长" dataIndex="masterName"> </a-table-column>
          <a-table-column title="组织成员" ellipsis dataIndex="userNames"> </a-table-column>
          <!--     <a-table-column title="说明" dataIndex="mark" width="150px"> </a-table-column> -->
          <a-table-column title="成立时间" dataIndex="foundTime" width="150px"> </a-table-column>
          <!--   <a-table-column title="添加时间" dataIndex="createTime" width="200px"> </a-table-column> -->
        </edu-table>
      </div>
      <!-- 编辑页 -->
      <veJkyOrganizeEdit v-if="showType == 'edit'" ref="veJkyOrganizeEdit" @onOk="editOk" @onCancel="editCancel"> </veJkyOrganizeEdit>
    </div>
  </edu-layout>
</template>

<script>
import veJkyOrganizeApi from '@/api/research/rbase/veJkyOrganizeApi';
import veJkyOrganizeEdit from './veJkyOrganizeEdit';

export default {
  components: {
    veJkyOrganizeEdit
  },
  data() {
    const data = {
      veJkyOrganizeQuery: {},
      showType: 'table'
    };
    data.veJkyOrganizeTable = {
      api: veJkyOrganizeApi
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 表格获取请求数据 必须return 一个对象
     */
    getParams() {
      var params = this.$refs['cwQuery'].getQueryData();
      return params;
    },
    /**
     * @msg: 搜索事件
     */
    handleFilter() {
      this.$refs.veJkyOrganizeTable.reload();
    },
    /**
     * @msg: 新增事件
     */
    handleCreate() {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veJkyOrganizeEdit.doCreate();
      });
    },
    /**
     * @msg: 编辑行事件
     */
    handleUpdate(row) {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veJkyOrganizeEdit.doUpdate(row);
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
      this.$refs.veJkyOrganizeTable.reload();
    }
  }
};
</script>
<style lang="less" scoped></style>
