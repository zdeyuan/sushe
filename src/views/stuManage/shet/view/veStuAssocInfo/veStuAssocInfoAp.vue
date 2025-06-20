<template>
  <edu-layout type="table">
    <!-- 表格 -->
    <div slot="table" class="right_table">
      <div>
        <edu-query ref="cwQuery" code="veStuAssocInfo" :do-filter="handleFilter">
          <template slot="search">
            <edu-query-item title="社团名称" pname="NAME" pop="like" stype="input"> </edu-query-item>
          </template>
        </edu-query>
        <edu-table
          ref="veStuAssocInfoTable"
          code="veStuAssocInfo"
          :api="veStuAssocInfoTable.api"
          :get-params="getParams"
          :config="{
            openText: '恢复社团',
            closeText: '社团注销'
          }"
          :to-update="handleUpdate"
          :toDetail="toDetail"
          :do-add="handleCreate"
        >
          <!--         <template slot-scope="text, record, index">
       <span></span>
       </template>-->
          <a-table-column title="社团名称" dataIndex="name" width="150px"> </a-table-column>
          <a-table-column title="创建时间" dataIndex="addTime" width="150px"> </a-table-column>
        </edu-table>
      </div>
      <!-- 编辑页 -->
      <veStuAssocInfoEdit v-if="showType == 'edit'" ref="veStuAssocInfoEdit" @onOk="editOk" @onCancel="editCancel"> </veStuAssocInfoEdit>
      <veStuAssocInfoShow v-if="showType == 'show'" ref="veStuAssocInfoShow" @onOk="editOk" @onCancel="editCancel"> </veStuAssocInfoShow>
    </div>
  </edu-layout>
</template>

<script>
import veStuAssocInfoApi from '@/views/stuManage/shet/api/veStuAssocInfoApi';
import veStuAssocInfoEdit from './veStuAssocInfoEdit';
import veStuAssocInfoShow from './veStuAssocInfoShow';

export default {
  components: {
    veStuAssocInfoEdit,
    veStuAssocInfoShow
  },
  data() {
    const data = {
      veStuAssocInfoQuery: {},
      showType: 'table'
    };
    data.veStuAssocInfoTable = {
      api: veStuAssocInfoApi
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
      this.$refs.veStuAssocInfoTable.reload();
    },
    /**
     * @msg: 新增事件
     */
    handleCreate() {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veStuAssocInfoEdit.doCreate();
      });
    },
    /**
     * @msg: 编辑行事件
     */
    handleUpdate(row) {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veStuAssocInfoEdit.doUpdate(row);
      });
    },
    /**
     * @msg: 编辑行事件
     */
    toDetail(row) {
      this.showType = 'show';
      this.$nextTick(() => {
        this.$refs.veStuAssocInfoShow.doShow(row);
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
      this.$refs.veStuAssocInfoTable.reload();
    }
  }
};
</script>
<style lang="less" scoped></style>
