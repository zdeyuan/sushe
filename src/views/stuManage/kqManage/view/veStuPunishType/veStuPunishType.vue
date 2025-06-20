<template>
  <edu-layout type="table">
    <!-- 表格 -->
    <div slot="table" class="right_table">
      <div>
        <edu-query ref="cwQuery" code="veStuPunishType" :do-filter="handleFilter">
          <template slot="search">
            <edu-query-item title="惩罚名称" pname="title" pop="like" stype="input"> </edu-query-item>
            <edu-query-item title="惩罚代码" pname="code" pop="like" stype="input"> </edu-query-item>
            <edu-query-item title="状态" pname="status" width="150px" pop="eq" stype="select" code="status"> </edu-query-item>
          </template>
        </edu-query>
        <edu-table
          ref="veStuPunishTypeTable"
          code="veStuPunishType"
          :api="veStuPunishTypeTable.api"
          :get-params="getParams"
          :config="{}"
          :to-update="handleUpdate"
          :do-add="handleCreate"
        >
          <!--         <template slot-scope="text, record, index">
       <span></span>
       </template>-->
          <a-table-column title="惩罚名称" dataIndex="title" width="150px"> </a-table-column>
          <a-table-column title="惩罚代码" dataIndex="code" width="150px"> </a-table-column>
        </edu-table>
      </div>
      <!-- 编辑页 -->
      <veStuPunishTypeEdit v-if="showType == 'edit'" ref="veStuPunishTypeEdit" @onOk="editOk" @onCancel="editCancel"> </veStuPunishTypeEdit>
      <veStuPunishTypeShow v-if="showType == 'show'" ref="veStuPunishTypeShow" @onOk="editOk" @onCancel="editCancel"> </veStuPunishTypeShow>
    </div>
  </edu-layout>
</template>

<script>
import veStuPunishTypeApi from '../../api/veStuPunishTypeApi';
import veStuPunishTypeEdit from './veStuPunishTypeEdit';
import veStuPunishTypeShow from './veStuPunishTypeShow';

export default {
  components: {
    veStuPunishTypeEdit,
    veStuPunishTypeShow
  },
  data() {
    const data = {
      veStuPunishTypeQuery: {},
      showType: 'table'
    };
    data.veStuPunishTypeTable = {
      api: veStuPunishTypeApi
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
      this.$refs.veStuPunishTypeTable.reload();
    },
    /**
     * @msg: 新增事件
     */
    handleCreate() {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veStuPunishTypeEdit.doCreate();
      });
    },
    /**
     * @msg: 编辑行事件
     */
    handleUpdate(row) {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veStuPunishTypeEdit.doUpdate(row);
      });
    },
    /**
     * @msg: 编辑行事件
     */
    toDetail(row) {
      this.showType = 'show';
      this.$nextTick(() => {
        this.$refs.veStuPunishTypeShow.doShow(row);
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
      this.$refs.veStuPunishTypeTable.reload();
    }
  }
};
</script>
<style lang="less" scoped></style>
