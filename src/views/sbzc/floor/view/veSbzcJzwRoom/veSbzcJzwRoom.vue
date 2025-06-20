<template>
  <edu-layout type="table">
    <!-- 表格 -->
    <div slot="table" class="right_table">
      <div>
        <edu-query ref="cwQuery" code="veSbzcJzwRoom" :do-filter="handleFilter">
          <template slot="search">
            <edu-query-item title="所属楼宇" pname="a.id" pop="eq">
              <jzwList v-model="veSbzcJzwRoomQuery.jzwId" style="width:300px" @change="changeJzw"></jzwList>
            </edu-query-item>
            <edu-query-item title="所属楼层" pname="b.id" pop="eq">
              <floorList ref="floorList" v-model="veSbzcJzwRoomQuery.floorId" @change="handleFilter" style="width:300px"></floorList>
            </edu-query-item>
            <edu-query-item title="楼宇编号" pname="a.code" pop="like" stype="input"> </edu-query-item>
            <edu-query-item title="楼层编号" pname="b.code" pop="like" stype="input"> </edu-query-item>
          </template>
        </edu-query>
        <edu-table
          ref="veSbzcJzwRoomTable"
          code="veSbzcJzwRoom"
          :api="veSbzcJzwRoomTable.api"
          :get-params="getParams"
          :exportConfig="{
            url: 'veSbzcJzwRoom/export',
            name: '《房间信息表（参照JCBX0203）导出》'
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
          <a-table-column title="楼宇名称" dataIndex="jzwName" width="120px"> </a-table-column>
          <a-table-column title="楼层编号" dataIndex="floorCode" width="120px">
            <template slot-scope="text"> {{ text }}楼</template></a-table-column
          >
          <a-table-column title="房间编号" dataIndex="code" width="150px"> </a-table-column>
          <a-table-column title="房间名称" dataIndex="name" width="150px"> </a-table-column>
          <a-table-column title="房间用途" dataIndex="cateName" width="150px"> </a-table-column>
          <a-table-column title="房间建筑面积" dataIndex="fjjzmj" width="150px"> </a-table-column>
          <a-table-column title="房间使用面积" dataIndex="fjsymj" width="150px"> </a-table-column>
        </edu-table>
      </div>
      <!-- 编辑页 -->
      <veSbzcJzwRoomEdit v-if="showType == 'edit'" ref="veSbzcJzwRoomEdit" @onOk="editOk" @onCancel="editCancel"> </veSbzcJzwRoomEdit>
      <veSbzcJzwRoomShow v-if="showType == 'show'" ref="veSbzcJzwRoomShow" @onOk="editOk" @onCancel="editCancel"> </veSbzcJzwRoomShow>
    </div>
  </edu-layout>
</template>

<script>
import veSbzcJzwRoomApi from '@/views/sbzc/floor/api/veSbzcJzwRoomApi';
import veSbzcJzwRoomEdit from './veSbzcJzwRoomEdit';
import veSbzcJzwRoomShow from './veSbzcJzwRoomShow';
import jzwList from '@/views/sbzc/floor/component/jzwList';
import floorList from '@/views/sbzc/floor/component/floorList';

export default {
  components: {
    veSbzcJzwRoomEdit,
    veSbzcJzwRoomShow,
    jzwList,
    floorList
  },
  data() {
    const data = {
      veSbzcJzwRoomQuery: {},
      showType: 'table'
    };
    data.veSbzcJzwRoomTable = {
      api: veSbzcJzwRoomApi
    };
    return data;
  },
  mounted() {},
  methods: {
    changeJzw() {
      setTimeout(() => {
        this.$refs.floorList.init(this.veSbzcJzwRoomQuery.jzwId);
        this.handleFilter();
      }, 0);
    },
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
      this.$refs.veSbzcJzwRoomTable.reload();
    },
    /**
     * @msg: 新增事件
     */
    handleCreate() {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veSbzcJzwRoomEdit.doCreate();
      });
    },
    /**
     * @msg: 编辑行事件
     */
    handleUpdate(row) {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veSbzcJzwRoomEdit.doUpdate(row);
      });
    },
    /**
     * @msg: 编辑行事件
     */
    toDetail(row) {
      this.showType = 'show';
      this.$nextTick(() => {
        this.$refs.veSbzcJzwRoomShow.doShow(row);
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
      this.$refs.veSbzcJzwRoomTable.reload();
    }
  }
};
</script>
<style lang="less" scoped></style>
