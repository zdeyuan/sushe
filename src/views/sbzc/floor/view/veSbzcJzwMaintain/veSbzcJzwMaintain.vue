<template>
  <edu-layout type="table">
    <!-- 表格 -->
    <div slot="table" class="right_table">
      <div>
        <edu-query ref="cwQuery" code="veSbzcJzwMaintain" :do-filter="handleFilter">
          <template slot="search">
            <edu-query-item title="建筑名称" pname="a.NAME" pop="like" stype="input"> </edu-query-item>
            <edu-query-item title="楼层编号" pname="b.code" pop="like" stype="input"> </edu-query-item>
            <edu-query-item title="房间号" pname="r.code" pop="like" stype="input"> </edu-query-item>
            <edu-query-item title="修缮单位" pname="d.org" pop="like" stype="input"> </edu-query-item>
            <edu-query-item title="经费来源" pname="d.jf_Source" pop="eq" stype="select" code="mainTain"> </edu-query-item>
            <edu-query-item title="检查人" pname="d.jb_User_Name" pop="like" stype="input"> </edu-query-item>
          </template>
        </edu-query>
        <edu-table
          ref="veSbzcJzwMaintainTable"
          code="veSbzcJzwMaintain"
          :api="veSbzcJzwMaintainTable.api"
          :get-params="getParams"
          :exportConfig="{
            url: 'veSbzcJzwMaintain/export',
            name: '《修理记录表导出》'
          }"
          :sorts="[
            {
              column: 'd.create_date',
              asc: true
            }
          ]"
          :config="{
            open: false,
            close: false,
            status: false
          }"
          :to-update="handleUpdate"
          :toDetail="toDetail"
          :do-add="handleCreate"
        >
          <!--         <template slot-scope="text, record, index">
       <span></span>
       </template>-->
          <a-table-column title="建筑名称" dataIndex="jzwName" width="150px"> </a-table-column>
          <a-table-column title="楼层编号" dataIndex="floorCode" width="100px"> </a-table-column>
          <a-table-column title="房间号" dataIndex="roomCode" width="100px"> </a-table-column>
          <a-table-column title="修缮开始日期" dataIndex="startDate" width="150px"> </a-table-column>
          <a-table-column title="修缮结束日期" dataIndex="endDate" width="150px"> </a-table-column>
          <a-table-column title="修缮内容" dataIndex="content" width="150px"> </a-table-column>
          <a-table-column title="修缮经费" dataIndex="money" width="150px">
            <template slot-scope="text">
              {{ text }}
            </template>
          </a-table-column>
          <a-table-column title="修缮单位" dataIndex="org" width="150px"> </a-table-column>
          <a-table-column title="经费来源" dataIndex="jfSource" width="150px">
            <template slot-scope="text">
              <edu-dict-text code="mainTain" :value="text"></edu-dict-text>
            </template>
          </a-table-column>
          <a-table-column title="经办人" dataIndex="jbUserName" width="150px"> </a-table-column>
        </edu-table>
      </div>
      <!-- 编辑页 -->
      <veSbzcJzwMaintainEdit v-if="showType == 'edit'" ref="veSbzcJzwMaintainEdit" @onOk="editOk" @onCancel="editCancel"> </veSbzcJzwMaintainEdit>
      <veSbzcJzwMaintainShow v-if="showType == 'show'" ref="veSbzcJzwMaintainShow" @onOk="editOk" @onCancel="editCancel"> </veSbzcJzwMaintainShow>
    </div>
  </edu-layout>
</template>

<script>
import veSbzcJzwMaintainApi from '@/views/sbzc/floor/api/veSbzcJzwMaintainApi';
import veSbzcJzwMaintainEdit from './veSbzcJzwMaintainEdit';
import veSbzcJzwMaintainShow from './veSbzcJzwMaintainShow';

export default {
  components: {
    veSbzcJzwMaintainEdit,
    veSbzcJzwMaintainShow
  },
  data() {
    const data = {
      veSbzcJzwMaintainQuery: {},
      showType: 'table'
    };
    data.veSbzcJzwMaintainTable = {
      api: veSbzcJzwMaintainApi
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
      this.$refs.veSbzcJzwMaintainTable.reload();
    },
    /**
     * @msg: 新增事件
     */
    handleCreate() {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veSbzcJzwMaintainEdit.doCreate();
      });
    },
    /**
     * @msg: 编辑行事件
     */
    handleUpdate(row) {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veSbzcJzwMaintainEdit.doUpdate(row);
      });
    },
    /**
     * @msg: 编辑行事件
     */
    toDetail(row) {
      this.showType = 'show';
      this.$nextTick(() => {
        this.$refs.veSbzcJzwMaintainShow.doShow(row);
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
      this.$refs.veSbzcJzwMaintainTable.reload();
    }
  }
};
</script>
<style lang="less" scoped></style>
