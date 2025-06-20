<template>
  <edu-layout type="table">
    <!-- 表格 -->
    <div slot="table" class="right_table">
      <div>
        <edu-query ref="cwQuery" code="veSbzcJzwFloor" :do-filter="handleFilter">
          <template slot="search">
            <edu-query-item title="所属楼宇" pname="d.jzw_id" pop="eq">
              <jzwList ref="jzwList" v-model="veSbzcJzwFloorQuery.xqh" @change="handleFilter"></jzwList>
            </edu-query-item>
            <edu-query-item title="楼层编号" pname="d.code" pop="like" stype="input"> </edu-query-item>
          </template>
        </edu-query>
        <edu-table
          ref="veSbzcJzwFloorTable"
          code="veSbzcJzwFloor"
          :api="veSbzcJzwFloorTable.api"
          :get-params="getParams"
          :exportConfig="{
            url: 'veSbzcJzwFloor/export',
            name: '《楼层表导出》'
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
          <a-table-column title="楼宇编号" dataIndex="jzwCode" width="150px"> </a-table-column>
          <a-table-column title="楼宇名称" dataIndex="jzwName" width="150px"> </a-table-column>
          <a-table-column title="楼层编号" dataIndex="code" width="150px"> </a-table-column>
          <a-table-column title="房间数量" dataIndex="roomCount" width="150px"> </a-table-column>
        </edu-table>
      </div>
      <!-- 编辑页 -->
      <veSbzcJzwFloorEdit v-if="showType == 'edit'" ref="veSbzcJzwFloorEdit" @onOk="editOk" @onCancel="editCancel"> </veSbzcJzwFloorEdit>
      <veSbzcJzwFloorShow v-if="showType == 'show'" ref="veSbzcJzwFloorShow" @onOk="editOk" @onCancel="editCancel"> </veSbzcJzwFloorShow>
    </div>
  </edu-layout>
</template>

<script>
import veSbzcJzwFloorApi from '@/views/sbzc/floor/api/veSbzcJzwFloorApi';
import veSbzcJzwFloorEdit from './veSbzcJzwFloorEdit';
import veSbzcJzwFloorShow from './veSbzcJzwFloorShow';
import jzwList from '@/views/sbzc/floor/component/jzwList';

export default {
  components: {
    veSbzcJzwFloorEdit,
    veSbzcJzwFloorShow,
    jzwList
  },
  data() {
    const data = {
      veSbzcJzwFloorQuery: {},
      showType: 'table'
    };
    data.veSbzcJzwFloorTable = {
      api: veSbzcJzwFloorApi
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
      this.$refs.veSbzcJzwFloorTable.reload();
    },
    /**
     * @msg: 新增事件
     */
    handleCreate() {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veSbzcJzwFloorEdit.doCreate();
      });
    },
    /**
     * @msg: 编辑行事件
     */
    handleUpdate(row) {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veSbzcJzwFloorEdit.doUpdate(row);
      });
    },
    /**
     * @msg: 编辑行事件
     */
    toDetail(row) {
      this.showType = 'show';
      this.$nextTick(() => {
        this.$refs.veSbzcJzwFloorShow.doShow(row);
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
      this.$refs.veSbzcJzwFloorTable.reload();
    }
  }
};
</script>
<style lang="less" scoped></style>
