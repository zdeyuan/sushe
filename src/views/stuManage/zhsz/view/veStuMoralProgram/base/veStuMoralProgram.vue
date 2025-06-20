<template>
  <!-- 表格 -->
  <div slot="table" class="right_table">
    <div>
      <edu-query ref="cwQuery" code="veStuMoralProgram" :do-filter="handleFilter">
        <template slot="search">
          <edu-query-item title="计划标题" pname="title" pop="like" stype="input"> </edu-query-item>
          <edu-query-item title="发布人" pname="push_User_Name" pop="like" stype="input"> </edu-query-item>
        </template>
      </edu-query>
      <edu-table
        ref="veStuMoralProgramTable"
        code="veStuMoralProgram"
        :api="veStuMoralProgramTable.api"
        :get-params="getParams"
        :rowBtnShowCallback="rowBtnShowCallback"
        :config="{
          open: viewType == 'admin',
          close: viewType == 'admin',
          openText: '发布',
          closeText: '未发布',
          status: false,
          bdelete: viewType == 'admin'
        }"
        :to-update="handleUpdate"
        :toDetail="toDetail"
        :do-add="viewType == 'my' ? null : handleCreate"
      >
        <!--         <template slot-scope="text, record, index">
       <span></span>
       </template>-->
        <a-table-column title="计划标题" dataIndex="title" width="150px"> </a-table-column>
        <a-table-column title="发布时间" dataIndex="pushTime" width="150px">
          <template slot-scope="text, record">
            <span>{{ record.status == 1 ? text : '----' }}</span>
          </template>
        </a-table-column>
        <a-table-column title="发布人" dataIndex="pushUserName" width="150px">
          <template slot-scope="text, record">
            <span>{{ record.status == 1 ? text : '----' }}</span>
          </template>
        </a-table-column>
        <a-table-column title="是否发布" dataIndex="status" width="150px">
          <template slot-scope="value">
            <edu-dict-text code="statusFb" :class="'status' + value" :value="value"></edu-dict-text>
          </template>
        </a-table-column>
      </edu-table>
    </div>
    <!-- 编辑页 -->
    <veStuMoralProgramEdit v-if="showType == 'edit'" ref="veStuMoralProgramEdit" @onOk="editOk" @onCancel="editCancel"> </veStuMoralProgramEdit>
    <veStuMoralProgramShow v-if="showType == 'show'" ref="veStuMoralProgramShow" @onOk="editOk" @onCancel="editCancel"> </veStuMoralProgramShow>
  </div>
</template>

<script>
import veStuMoralProgramApi from '../../../api/veStuMoralProgramApi';
import veStuMoralProgramEdit from './veStuMoralProgramEdit';
import veStuMoralProgramShow from './veStuMoralProgramShow';

export default {
  props: {
    viewType: String
  },
  components: {
    veStuMoralProgramEdit,
    veStuMoralProgramShow
  },
  data() {
    const data = {
      veStuMoralProgramQuery: {},
      showType: 'table'
    };
    data.veStuMoralProgramTable = {
      api: veStuMoralProgramApi
    };
    return data;
  },
  mounted() {},
  methods: {
    rowBtnShowCallback(type) {
      if (type == 'detail') {
        if (this.viewType == 'my') {
          return true;
        }
        return false;
      }
      if (this.viewType == 'my') {
        return false;
      } else {
        return true;
      }
    },
    /**
     * @msg: 表格获取请求数据 必须return 一个对象
     */
    getParams() {
      const params = this.$refs['cwQuery'].getQueryData();
      if (this.viewType == 'my') {
        params.params = {
          my: true
        };
      }
      return params;
    },
    /**
     * @msg: 搜索事件
     */
    handleFilter() {
      this.$refs.veStuMoralProgramTable.reload();
    },
    /**
     * @msg: 新增事件
     */
    handleCreate() {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veStuMoralProgramEdit.doCreate();
      });
    },
    /**
     * @msg: 编辑行事件
     */
    handleUpdate(row) {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veStuMoralProgramEdit.doUpdate(row);
      });
    },
    /**
     * @msg: 编辑行事件
     */
    toDetail(row) {
      this.showType = 'show';
      this.$nextTick(() => {
        this.$refs.veStuMoralProgramShow.doShow(row);
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
      this.$refs.veStuMoralProgramTable.reload();
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
