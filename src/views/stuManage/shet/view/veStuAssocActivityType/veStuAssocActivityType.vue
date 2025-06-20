<template>
  <edu-layout type="table">
    <!-- 表格 -->
    <div slot="table" class="right_table">
      <div>
        <edu-query ref="cwQuery" code="veStuAssocActivityType" :do-filter="handleFilter">
          <template slot="search">
            <edu-query-item title="活动类型名称" pname="NAME" pop="like" stype="input"> </edu-query-item>
          </template>
        </edu-query>
        <edu-table
          ref="veStuAssocActivityTypeTable"
          code="veStuAssocActivityType"
          :api="veStuAssocActivityTypeTable.api"
          :get-params="getParams"
          :config="{}"
          :to-update="handleUpdate"
          :do-add="handleCreate"
        >
          <!--         <template slot-scope="text, record, index">
       <span></span>
       </template>-->
          <a-table-column title="活动类型名称" dataIndex="name" width="150px"> </a-table-column>
        </edu-table>
      </div>
      <!-- 编辑页 -->
      <veStuAssocActivityTypeEdit v-if="showType == 'edit'" ref="veStuAssocActivityTypeEdit" @onOk="editOk" @onCancel="editCancel">
      </veStuAssocActivityTypeEdit>
      <veStuAssocActivityTypeShow v-if="showType == 'show'" ref="veStuAssocActivityTypeShow" @onOk="editOk" @onCancel="editCancel">
      </veStuAssocActivityTypeShow>
    </div>
  </edu-layout>
</template>

<script>
import veStuAssocActivityTypeApi from '@/views/stuManage/shet/api/veStuAssocActivityTypeApi';
import veStuAssocActivityTypeEdit from './veStuAssocActivityTypeEdit';
import veStuAssocActivityTypeShow from './veStuAssocActivityTypeShow';

export default {
  components: {
    veStuAssocActivityTypeEdit,
    veStuAssocActivityTypeShow
  },
  data() {
    const data = {
      veStuAssocActivityTypeQuery: {},
      showType: 'table'
    };
    data.veStuAssocActivityTypeTable = {
      api: veStuAssocActivityTypeApi
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
      this.$refs.veStuAssocActivityTypeTable.reload();
    },
    /**
     * @msg: 新增事件
     */
    handleCreate() {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veStuAssocActivityTypeEdit.doCreate();
      });
    },
    /**
     * @msg: 编辑行事件
     */
    handleUpdate(row) {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veStuAssocActivityTypeEdit.doUpdate(row);
      });
    },
    /**
     * @msg: 编辑行事件
     */
    toDetail(row) {
      this.showType = 'show';
      this.$nextTick(() => {
        this.$refs.veStuAssocActivityTypeShow.doShow(row);
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
      this.$refs.veStuAssocActivityTypeTable.reload();
    }
  }
};
</script>
<style lang="less" scoped></style>
