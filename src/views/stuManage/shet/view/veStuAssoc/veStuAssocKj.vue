<template>
  <edu-layout type="table">
    <!-- 表格 -->
    <div slot="table" class="right_table">
      <div>
        <edu-query ref="cwQuery" code="veStuAssoc" :do-filter="handleFilter">
          <template slot="search">
            <edu-query-item title="社团名称" pname="NAME" pop="like" stype="input"> </edu-query-item>
          </template>
        </edu-query>
        <edu-table
          ref="veStuAssocTable"
          code="veStuAssoc"
          :api="veStuAssocTable.api"
          :get-params="getParams"
          :config="{
            open: false,
            close: false,
            status: false,
            delete: false
          }"
          isAutoBtn
        >
          <!--         <template slot-scope="text, record, index">
       <span></span>
       </template>-->
          <a-table-column title="社团名称" dataIndex="name" width="150px"> </a-table-column>
          <a-table-column title="成立时间" dataIndex="code" width="150px"> </a-table-column>
        </edu-table>
      </div>
      <!-- 编辑页 -->
      <veStuAssocEdit v-if="showType == 'edit'" ref="veStuAssocEdit" @onOk="editOk" @onCancel="editCancel"> </veStuAssocEdit>
      <veStuAssocShow v-if="showType == 'show'" ref="veStuAssocShow" @onOk="editOk" @onCancel="editCancel"> </veStuAssocShow>
    </div>
  </edu-layout>
</template>

<script>
import veStuAssocApi from '@/views/stuManage/shet/api/veStuAssocApi';
import veStuAssocEdit from './veStuAssocEdit';
import veStuAssocShow from './veStuAssocShow';

export default {
  components: {
    veStuAssocEdit,
    veStuAssocShow
  },
  data() {
    const data = {
      veStuAssocQuery: {},
      showType: 'table'
    };
    data.veStuAssocTable = {
      api: veStuAssocApi
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

      this.$utils.addPageConditions(params, 'id', 'eq', -99);
      return params;
    },
    /**
     * @msg: 搜索事件
     */
    handleFilter() {
      this.$refs.veStuAssocTable.reload();
    },
    /**
     * @msg: 新增事件
     */
    handleCreate() {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veStuAssocEdit.doCreate();
      });
    },
    /**
     * @msg: 编辑行事件
     */
    handleUpdate(row) {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veStuAssocEdit.doUpdate(row);
      });
    },
    /**
     * @msg: 编辑行事件
     */
    toDetail(row) {
      this.showType = 'show';
      this.$nextTick(() => {
        this.$refs.veStuAssocShow.doShow(row);
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
      this.$refs.veStuAssocTable.reload();
    }
  }
};
</script>
<style lang="less" scoped></style>
