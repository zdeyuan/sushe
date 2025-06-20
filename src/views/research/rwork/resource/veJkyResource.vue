<template>
  <edu-layout type="table">
    <!-- 表格 -->
    <div slot="table" class="right_table">
      <div>
        <edu-query ref="cwQuery" code="veJkyResource" :do-filter="handleFilter">
          <template slot="search">
            <edu-query-item title="标题" pname="title" pop="like" stype="input"> </edu-query-item>
          </template>
        </edu-query>
        <edu-table
          ref="veJkyResourceTable"
          code="veJkyResource"
          :api="veJkyResourceTable.api"
          :get-params="getParams"
          :to-update="handleUpdate"
          :toDetail="toDetail"
          :config="{ status: false, closeText: '未发布', openText: '发布' }"
          :do-add="handleCreate"
        >
          <!--         <template slot-scope="text, record, index">
       <span></span>
       </template>-->
          <a-table-column title="标题" dataIndex="title"> </a-table-column>
          <a-table-column title="创建用户" dataIndex="createName" width="120px"> </a-table-column>
          <a-table-column title="添加时间" dataIndex="createTime" width="200px"> </a-table-column>
          <a-table-column title="状态" width="100px" align="center" dataIndex="status">
            <template slot-scope="status">
              <edu-dict-text code="statusFb" :class="'status' + status" :value="status"></edu-dict-text>
            </template>
          </a-table-column>
        </edu-table>
      </div>
      <veJkyResourceEdit v-if="showType == 'edit'" ref="veJkyResourceEdit" @onOk="editOk" @onCancel="editCancel"> </veJkyResourceEdit>
      <veJkyResourceShow v-if="showType == 'show'" ref="veJkyResourceShow" @onOk="editOk" @onCancel="editCancel"> </veJkyResourceShow>
    </div>
  </edu-layout>
</template>

<script>
import veJkyResourceApi from '@/api/research/rwork/veJkyResourceApi';
import veJkyResourceEdit from './veJkyResourceEdit';
import veJkyResourceShow from './veJkyResourceShow';

export default {
  components: {
    veJkyResourceEdit,
    veJkyResourceShow
  },
  data() {
    const data = {
      veJkyResourceQuery: {},
      showType: 'table'
    };
    data.veJkyResourceTable = {
      api: veJkyResourceApi
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
      this.$refs.veJkyResourceTable.reload();
    },
    /**
     * @msg: 新增事件
     */
    handleCreate() {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veJkyResourceEdit.doCreate();
      });
    },
    /**
     * @msg: 编辑行事件
     */
    handleUpdate(row) {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veJkyResourceEdit.doUpdate(row);
      });
    },
    toDetail(row) {
      this.showType = 'show';
      this.$nextTick(() => {
        this.$refs.veJkyResourceShow.doShow(row);
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
      this.$refs.veJkyResourceTable.reload();
    }
  }
};
</script>
<style lang="less" scoped>
.status1 {
  color: #039471;
}
.status0 {
  color: rgb(212, 117, 117);
}
</style>
