<template>
  <edu-layout type="table">
    <!-- 表格 -->
    <div slot="table" class="right_table">
      <div>
        <edu-query ref="cwQuery" code="hqStuHealthActivities" :do-filter="handleFilter">
          <template slot="search">
            <edu-query-item title="活动标题" pname="title" pop="like" stype="input"> </edu-query-item>
            <edu-query-item title="发布人" pname="name" pop="like" stype="input"> </edu-query-item>
          </template>
        </edu-query>
        <edu-table
          ref="hqStuHealthActivitiesTable"
          code="hqStuHealthActivities"
          :api="hqStuHealthActivitiesTable.api"
          :get-params="getParams"
          :config="{}"
          :to-update="handleUpdate"
          :do-add="handleCreate"
        >
          <!--         <template slot-scope="text, record, index">
       <span></span>
       </template>-->
          <a-table-column title="活动标题" dataIndex="title" width="150px"> </a-table-column>
          <a-table-column title="发布时间" dataIndex="createDate" width="150px"> </a-table-column>
          <a-table-column title="发布人" dataIndex="name" width="150px"> </a-table-column>
          <a-table-column title="排序" dataIndex="listNum" width="150px"> </a-table-column>
        </edu-table>
      </div>
      <!-- 编辑页 -->
      <hqStuHealthActivitiesEdit v-if="showType == 'edit'" ref="hqStuHealthActivitiesEdit" @onOk="editOk" @onCancel="editCancel">
      </hqStuHealthActivitiesEdit>
      <hqStuHealthActivitiesShow v-if="showType == 'show'" ref="hqStuHealthActivitiesShow" @onOk="editOk" @onCancel="editCancel">
      </hqStuHealthActivitiesShow>
    </div>
  </edu-layout>
</template>

<script>
import hqStuHealthActivitiesApi from '../../api/hqStuHealthActivitiesApi';
import hqStuHealthActivitiesEdit from './hqStuHealthActivitiesEdit';
import hqStuHealthActivitiesShow from './hqStuHealthActivitiesShow';

export default {
  components: {
    hqStuHealthActivitiesEdit,
    hqStuHealthActivitiesShow
  },
  data() {
    const data = {
      hqStuHealthActivitiesQuery: {},
      showType: 'table'
    };
    data.hqStuHealthActivitiesTable = {
      api: hqStuHealthActivitiesApi
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
      this.$refs.hqStuHealthActivitiesTable.reload();
    },
    /**
     * @msg: 新增事件
     */
    handleCreate() {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.hqStuHealthActivitiesEdit.doCreate();
      });
    },
    /**
     * @msg: 编辑行事件
     */
    handleUpdate(row) {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.hqStuHealthActivitiesEdit.doUpdate(row);
      });
    },
    /**
     * @msg: 编辑行事件
     */
    toDetail(row) {
      this.showType = 'show';
      this.$nextTick(() => {
        this.$refs.hqStuHealthActivitiesShow.doShow(row);
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
      this.$refs.hqStuHealthActivitiesTable.reload();
    }
  }
};
</script>
<style lang="less" scoped></style>
