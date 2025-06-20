<template>
  <edu-layout type="table">
    <!-- 表格 -->
    <div slot="table" class="right_table">
      <div>
        <edu-query ref="cwQuery" code="veStuCaucus" :do-filter="handleFilter">
          <template slot="search">
            <edu-query-item title="活动标题" pname="title" pop="like" stype="input"> </edu-query-item>
            <edu-query-item title="组织机构" pname="organization" pop="like" stype="input"> </edu-query-item>
          </template>
        </edu-query>
        <edu-table
          ref="veStuCaucusTable"
          code="veStuCaucus"
          :api="veStuCaucusTable.api"
          :get-params="getParams"
          :config="{
            open: false,
            close: false,
            status: false
          }"
          :to-update="handleUpdate"
          :do-add="handleCreate"
        >
          <!--         <template slot-scope="text, record, index">
       <span></span>
       </template>-->
          <a-table-column title="活动标题" dataIndex="title" width="150px"> </a-table-column>
          <a-table-column title="开始时间" dataIndex="startTime" width="150px"> </a-table-column>
          <a-table-column title="结束时间" dataIndex="endTime" width="150px"> </a-table-column>
          <a-table-column title="级别" dataIndex="grade" width="150px">
            <template slot-scope="value">
              <edu-dict-text code="caucusLevel" :class="'status' + value" :value="value"></edu-dict-text>
            </template>
          </a-table-column>
          <a-table-column title="组织机构" dataIndex="organization" width="150px"> </a-table-column>
        </edu-table>
      </div>
      <!-- 编辑页 -->
      <veStuCaucusEdit v-if="showType == 'edit'" ref="veStuCaucusEdit" @onOk="editOk" @onCancel="editCancel"> </veStuCaucusEdit>
      <veStuCaucusShow v-if="showType == 'show'" ref="veStuCaucusShow" @onOk="editOk" @onCancel="editCancel"> </veStuCaucusShow>
    </div>
  </edu-layout>
</template>

<script>
import veStuCaucusApi from '../../api/veStuCaucusApi';
import veStuCaucusEdit from './veStuCaucusEdit';
import veStuCaucusShow from './veStuCaucusShow';

export default {
  components: {
    veStuCaucusEdit,
    veStuCaucusShow
  },
  data() {
    const data = {
      veStuCaucusQuery: {},
      showType: 'table'
    };
    data.veStuCaucusTable = {
      api: veStuCaucusApi
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
      this.$refs.veStuCaucusTable.reload();
    },
    /**
     * @msg: 新增事件
     */
    handleCreate() {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veStuCaucusEdit.doCreate();
      });
    },
    /**
     * @msg: 编辑行事件
     */
    handleUpdate(row) {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veStuCaucusEdit.doUpdate(row);
      });
    },
    /**
     * @msg: 编辑行事件
     */
    toDetail(row) {
      this.showType = 'show';
      this.$nextTick(() => {
        this.$refs.veStuCaucusShow.doShow(row);
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
      this.$refs.veStuCaucusTable.reload();
    }
  }
};
</script>
<style lang="less" scoped></style>
