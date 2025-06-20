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
    <div>
      <edu-query ref="cwQuery" code="veStuLiteraryActive" :do-filter="handleFilter">
        <template slot="search">
          <edu-query-item title="活动标题" pname="title" pop="like" stype="input"> </edu-query-item>
          <edu-query-item title="发布人" pname="push_User_Name" pop="like" stype="input"> </edu-query-item>
        </template>
      </edu-query>
      <edu-table
        ref="veStuLiteraryActiveTable"
        code="veStuLiteraryActive"
        :api="veStuLiteraryActiveTable.api"
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
        <a-table-column title="活动级别" dataIndex="grade" width="150px">
          <template slot-scope="value">
			   <edu-dict-text code="whhdjb"  :value="value"></edu-dict-text>
          </template>
        </a-table-column>
        <a-table-column title="活动标题" dataIndex="title" width="150px"> </a-table-column>
        <a-table-column title="发布时间" dataIndex="pushTime" width="150px">
          <template slot-scope="text, record">
            <span>{{ record.status == 1 ? text : '----' }}</span>
          </template>
        </a-table-column>
        <a-table-column title="发布人" dataIndex="createName" width="150px">
          <template slot-scope="text, record">
            <span>{{ record.status == 1 ? text : '----' }}</span>
          </template>
        </a-table-column>
        <a-table-column title="是否发布" dataIndex="status" width="150px">
          <template slot-scope="value">
            <edu-dict-text code="statusFb" :class="'status' + value" :value="value"></edu-dict-text>
          </template>
        </a-table-column>
        <a-table-column title="参与者" dataIndex="userNames" width="150px"> </a-table-column>
      </edu-table>
    </div>
    <!-- 编辑页 -->
    <veStuLiteraryActiveEdit v-if="showType == 'edit'" ref="veStuLiteraryActiveEdit" @onOk="editOk" @onCancel="editCancel"> </veStuLiteraryActiveEdit>
    <veStuLiteraryActiveShow v-if="showType == 'show'" ref="veStuLiteraryActiveShow" @onOk="editOk" @onCancel="editCancel"> </veStuLiteraryActiveShow>
  </div>
</template>

<script>
import veStuLiteraryActiveApi from '../../../api/veStuLiteraryActiveApi';
import veStuLiteraryActiveEdit from './veStuLiteraryActiveEdit';
import veStuLiteraryActiveShow from './veStuLiteraryActiveShow';

export default {
  props: {
    viewType: String
  },
  components: {
    veStuLiteraryActiveEdit,
    veStuLiteraryActiveShow
  },
  data() {
    const data = {
      veStuLiteraryActiveQuery: {},
      showType: 'table'
    };
    data.veStuLiteraryActiveTable = {
      api: veStuLiteraryActiveApi
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
      this.$refs.veStuLiteraryActiveTable.reload();
    },
    /**
     * @msg: 新增事件
     */
    handleCreate() {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veStuLiteraryActiveEdit.doCreate();
      });
    },
    /**
     * @msg: 编辑行事件
     */
    handleUpdate(row) {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veStuLiteraryActiveEdit.doUpdate(row);
      });
    },
    /**
     * @msg: 编辑行事件
     */
    toDetail(row) {
      this.showType = 'show';
      this.$nextTick(() => {
        this.$refs.veStuLiteraryActiveShow.doShow(row);
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
      this.$refs.veStuLiteraryActiveTable.reload();
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
