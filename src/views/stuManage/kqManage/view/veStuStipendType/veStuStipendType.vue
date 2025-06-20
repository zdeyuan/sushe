<template>
  <edu-layout type="table">
    <!-- 表格 -->
    <div slot="table" class="right_table">
      <div>
        <edu-query ref="cwQuery" code="veStuStipendType" :do-filter="handleFilter">
          <template slot="search">
            <edu-query-item title="助学金名称" pname="title" pop="like" stype="input"> </edu-query-item>
            <edu-query-item title="助学金代码" pname="code" pop="like" stype="input"> </edu-query-item>
          </template>
        </edu-query>
        <edu-table
          ref="veStuStipendTypeTable"
          code="veStuStipendType"
          :api="veStuStipendTypeTable.api"
          :get-params="getParams"
          :config="{}"
          :to-update="handleUpdate"
          :do-add="handleCreate"
        >
          <!--         <template slot-scope="text, record, index">
       <span></span>
       </template>-->
          <a-table-column title="助学金名称" dataIndex="title" width="150px"> </a-table-column>
          <a-table-column title="助学金代码" dataIndex="code" width="150px"> </a-table-column>
        </edu-table>
      </div>
      <!-- 编辑页 -->
      <veStuStipendTypeEdit v-if="showType == 'edit'" ref="veStuStipendTypeEdit" @onOk="editOk" @onCancel="editCancel"> </veStuStipendTypeEdit>
      <veStuStipendTypeShow v-if="showType == 'show'" ref="veStuStipendTypeShow" @onOk="editOk" @onCancel="editCancel"> </veStuStipendTypeShow>
    </div>
  </edu-layout>
</template>

<script>
import veStuStipendTypeApi from '../../api/veStuStipendTypeApi';
import veStuStipendTypeEdit from './veStuStipendTypeEdit';
import veStuStipendTypeShow from './veStuStipendTypeShow';

export default {
  components: {
    veStuStipendTypeEdit,
    veStuStipendTypeShow
  },
  data() {
    const data = {
      veStuStipendTypeQuery: {},
      showType: 'table'
    };
    data.veStuStipendTypeTable = {
      api: veStuStipendTypeApi
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
      this.$refs.veStuStipendTypeTable.reload();
    },
    /**
     * @msg: 新增事件
     */
    handleCreate() {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veStuStipendTypeEdit.doCreate();
      });
    },
    /**
     * @msg: 编辑行事件
     */
    handleUpdate(row) {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veStuStipendTypeEdit.doUpdate(row);
      });
    },
    /**
     * @msg: 编辑行事件
     */
    toDetail(row) {
      this.showType = 'show';
      this.$nextTick(() => {
        this.$refs.veStuStipendTypeShow.doShow(row);
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
      this.$refs.veStuStipendTypeTable.reload();
    }
  }
};
</script>
<style lang="less" scoped></style>
