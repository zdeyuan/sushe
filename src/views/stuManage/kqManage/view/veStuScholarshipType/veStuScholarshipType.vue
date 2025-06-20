<template>
  <edu-layout type="table">
    <!-- 表格 -->
    <div slot="table" class="right_table">
      <div>
        <edu-query ref="cwQuery" code="veStuScholarshipType" :do-filter="handleFilter">
          <template slot="search">
            <edu-query-item title="奖学金名称" pname="title" pop="like" stype="input"> </edu-query-item>
            <edu-query-item title="奖学金代码" pname="code" pop="like" stype="input"> </edu-query-item>
          </template>
        </edu-query>
        <edu-table
          ref="veStuScholarshipTypeTable"
          code="veStuScholarshipType"
          :api="veStuScholarshipTypeTable.api"
          :get-params="getParams"
          :config="{}"
          :to-update="handleUpdate"
          :do-add="handleCreate"
        >
          <!--         <template slot-scope="text, record, index">
       <span></span>
       </template>-->
          <a-table-column title="奖学金名称" dataIndex="title" width="150px"> </a-table-column>
          <a-table-column title="奖学金代码" dataIndex="code" width="150px"> </a-table-column>
        </edu-table>
      </div>
      <!-- 编辑页 -->
      <veStuScholarshipTypeEdit v-if="showType == 'edit'" ref="veStuScholarshipTypeEdit" @onOk="editOk" @onCancel="editCancel">
      </veStuScholarshipTypeEdit>
      <veStuScholarshipTypeShow v-if="showType == 'show'" ref="veStuScholarshipTypeShow" @onOk="editOk" @onCancel="editCancel">
      </veStuScholarshipTypeShow>
    </div>
  </edu-layout>
</template>

<script>
import veStuScholarshipTypeApi from '../../api/veStuScholarshipTypeApi';
import veStuScholarshipTypeEdit from './veStuScholarshipTypeEdit';
import veStuScholarshipTypeShow from './veStuScholarshipTypeShow';

export default {
  components: {
    veStuScholarshipTypeEdit,
    veStuScholarshipTypeShow
  },
  data() {
    const data = {
      veStuScholarshipTypeQuery: {},
      showType: 'table'
    };
    data.veStuScholarshipTypeTable = {
      api: veStuScholarshipTypeApi
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
      this.$refs.veStuScholarshipTypeTable.reload();
    },
    /**
     * @msg: 新增事件
     */
    handleCreate() {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veStuScholarshipTypeEdit.doCreate();
      });
    },
    /**
     * @msg: 编辑行事件
     */
    handleUpdate(row) {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veStuScholarshipTypeEdit.doUpdate(row);
      });
    },
    /**
     * @msg: 编辑行事件
     */
    toDetail(row) {
      this.showType = 'show';
      this.$nextTick(() => {
        this.$refs.veStuScholarshipTypeShow.doShow(row);
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
      this.$refs.veStuScholarshipTypeTable.reload();
    }
  }
};
</script>
<style lang="less" scoped></style>
