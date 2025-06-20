<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-04-18 17:42:55
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-04-20 20:59:03
-->
<template>
  <!-- 表格 -->
  <div slot="table" class="right_table">
    <div :style="{padding:$hasPer(['system'])?'0':'10px'}">
      <edu-query ref="cwQuery" code="veStuMoralActive" :do-filter="handleFilter">
        <template slot="search">
          <edu-query-item title="活动标题" pname="title" pop="like" stype="input"> </edu-query-item>
          <edu-query-item title="发布人" pname="push_User_Name" pop="like" stype="input"> </edu-query-item>
        </template>
      </edu-query>
      <edu-table
        ref="veStuMoralActiveTable"
        code="veStuMoralActive"
        :api="veStuMoralActiveTable.api"
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
        <a-table-column title="活动类型" dataIndex="type" width="80px">
          <template slot-scope="text">
            <span>{{ text == 1 ? '校级' : '班级' }}</span>
          </template>
        </a-table-column>
        <a-table-column title="活动标题" dataIndex="title" width="250px" :ellipsis="true"> </a-table-column>
		<a-table-column title="开始时间" dataIndex="startTime" width="150px">
		</a-table-column>
		<a-table-column title="结束时间" dataIndex="endTime" width="150px">
		</a-table-column>
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
        <a-table-column title="是否发布" dataIndex="status" width="150px" v-if="$hasPer(['system'])">
          <template slot-scope="value">
            <edu-dict-text code="statusFb" :class="'status' + value" :value="value"></edu-dict-text>
          </template>
        </a-table-column>
        <a-table-column title="参与者" dataIndex="userNames" width="150px"> </a-table-column>
      </edu-table>
    </div>
    <!-- 编辑页 -->
    <veStuMoralActiveEdit v-if="showType == 'edit'" ref="veStuMoralActiveEdit" @onOk="editOk" @onCancel="editCancel"> </veStuMoralActiveEdit>
    <veStuMoralActiveShow v-if="showType == 'show'" ref="veStuMoralActiveShow" @onOk="editOk" @onCancel="editCancel"> </veStuMoralActiveShow>
  </div>
</template>

<script>
import veStuMoralActiveApi from '../../../api/veStuMoralActiveApi';
import veStuMoralActiveEdit from './veStuMoralActiveEdit';
import veStuMoralActiveShow from './veStuMoralActiveShow';

export default {
  props: {
    viewType: String
  },
  components: {
    veStuMoralActiveEdit,
    veStuMoralActiveShow
  },
  data() {
    const data = {
      veStuMoralActiveQuery: {},
      showType: 'table'
    };
    data.veStuMoralActiveTable = {
      api: veStuMoralActiveApi
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
      this.$refs.veStuMoralActiveTable.reload();
    },
    /**
     * @msg: 新增事件
     */
    handleCreate() {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veStuMoralActiveEdit.doCreate();
      });
    },
    /**
     * @msg: 编辑行事件
     */
    handleUpdate(row) {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veStuMoralActiveEdit.doUpdate(row);
      });
    },
    /**
     * @msg: 编辑行事件
     */
    toDetail(row) {
      this.showType = 'show';
      this.$nextTick(() => {
        this.$refs.veStuMoralActiveShow.doShow(row);
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
      this.$refs.veStuMoralActiveTable.reload();
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
