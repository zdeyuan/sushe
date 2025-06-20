<template>
  <edu-layout type="table">
    <!-- 表格 -->
    <div slot="table" class="right_table">
      <div>
        <edu-query ref="cwQuery" code="veStuCheckType" :do-filter="handleFilter">
          <template slot="search" >
           <div style="display:inline-block;">
			   <edu-query-item title="考勤类型" pname="NAME" pop="like" stype="input" > </edu-query-item>
			   <edu-query-item title="考勤代码" pname="TITLE" pop="like" stype="input" > </edu-query-item>
			   <edu-query-item title="状态" pname="status" pop="eq" stype="select" code="status" width="159px"> </edu-query-item>
		   </div>
		  
          </template>
        </edu-query>
        <edu-table
          ref="veStuCheckTypeTable"
          code="veStuCheckType"
          :api="veStuCheckTypeTable.api"
          :get-params="getParams"
          :config="{}"
          :to-update="handleUpdate"
          :do-add="handleCreate"
        >
          <!--         <template slot-scope="text, record, index">
       <span></span>
       </template>-->
          <a-table-column title="名称" dataIndex="title" width="150px"> </a-table-column>
          <a-table-column title="代码" dataIndex="code" width="150px"> </a-table-column>
        </edu-table>
      </div>
      <!-- 编辑页 -->
      <veStuCheckTypeEdit v-if="showType == 'edit'" ref="veStuCheckTypeEdit" @onOk="editOk" @onCancel="editCancel"> </veStuCheckTypeEdit>
      <veStuCheckTypeShow v-if="showType == 'show'" ref="veStuCheckTypeShow" @onOk="editOk" @onCancel="editCancel"> </veStuCheckTypeShow>
    </div>
  </edu-layout>
</template>

<script>
import veStuCheckTypeApi from '../../api/veStuCheckTypeApi';
import veStuCheckTypeEdit from './veStuCheckTypeEdit';
import veStuCheckTypeShow from './veStuCheckTypeShow';

export default {
  components: {
    veStuCheckTypeEdit,
    veStuCheckTypeShow
  },
  data() {
    const data = {
      veStuCheckTypeQuery: {},
      showType: 'table'
    };
    data.veStuCheckTypeTable = {
      api: veStuCheckTypeApi
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
      this.$refs.veStuCheckTypeTable.reload();
    },
    /**
     * @msg: 新增事件
     */
    handleCreate() {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veStuCheckTypeEdit.doCreate();
      });
    },
    /**
     * @msg: 编辑行事件
     */
    handleUpdate(row) {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veStuCheckTypeEdit.doUpdate(row);
      });
    },
    /**
     * @msg: 编辑行事件
     */
    toDetail(row) {
      this.showType = 'show';
      this.$nextTick(() => {
        this.$refs.veStuCheckTypeShow.doShow(row);
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
      this.$refs.veStuCheckTypeTable.reload();
    }
  }
};
</script>
<style lang="less" scoped></style>
