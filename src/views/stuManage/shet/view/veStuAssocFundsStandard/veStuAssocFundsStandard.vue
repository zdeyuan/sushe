<template>
  <edu-layout type="table">
    <!-- 表格 -->
    <div slot="table" class="right_table">
      <div>
        <edu-query ref="cwQuery" code="veStuAssocFundsStandard" :do-filter="handleFilter">
          <template slot="search">
            <edu-query-item title="缴费名称" pname="NAME" pop="like" stype="input"> </edu-query-item>
            <edu-query-item title="学期" pname="semester_id" pop="eq">
              <termList ref="termList" v-model="veStuAssocFundsStandardQuery.xqh" @change="handleFilter"></termList>
            </edu-query-item>
          </template>
        </edu-query>
        <edu-table
          ref="veStuAssocFundsStandardTable"
          code="veStuAssocFundsStandard"
          :api="veStuAssocFundsStandardTable.api"
          :get-params="getParams"
          :config="{
            open: false,
            close: false,
            status: false,
            bdelete: false
          }"
          :to-update="handleUpdate"
          :do-add="handleCreate"
        >
          <!--         <template slot-scope="text, record, index">
       <span></span>
       </template>-->
          <a-table-column title="学期" dataIndex="semesterId" width="150px">
            <template slot-scope="text">
              {{ getName(text) }}
            </template>
          </a-table-column>
          <a-table-column title="缴费名称" dataIndex="name" width="150px"> </a-table-column>
          <a-table-column title="应缴费金额" dataIndex="money" width="150px"> </a-table-column>
          <a-table-column title="创建时间" dataIndex="addTime" width="150px"> </a-table-column>
        </edu-table>
      </div>
      <!-- 编辑页 -->
      <veStuAssocFundsStandardEdit v-if="showType == 'edit'" ref="veStuAssocFundsStandardEdit" @onOk="editOk" @onCancel="editCancel">
      </veStuAssocFundsStandardEdit>
      <veStuAssocFundsStandardShow v-if="showType == 'show'" ref="veStuAssocFundsStandardShow" @onOk="editOk" @onCancel="editCancel">
      </veStuAssocFundsStandardShow>
    </div>
  </edu-layout>
</template>

<script>
import veStuAssocFundsStandardApi from '@/views/stuManage/shet/api/veStuAssocFundsStandardApi';
import veStuAssocFundsStandardEdit from './veStuAssocFundsStandardEdit';
import veStuAssocFundsStandardShow from './veStuAssocFundsStandardShow';
import termList from '@/components/termList';

export default {
  components: {
    veStuAssocFundsStandardEdit,
    veStuAssocFundsStandardShow,
    termList
  },
  data() {
    const data = {
      veStuAssocFundsStandardQuery: {},
      showType: 'table'
    };
    data.veStuAssocFundsStandardTable = {
      api: veStuAssocFundsStandardApi
    };
    return data;
  },
  mounted() {},
  methods: {
    getName(dataId) {
      const list = this.$refs.termList.getList() || [];
      for (let i = 0; i < list.length; i++) {
        const element = list[i];
        if (element.id == dataId) return element.name;
      }
      return '-';
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
      this.$refs.veStuAssocFundsStandardTable.reload();
    },
    /**
     * @msg: 新增事件
     */
    handleCreate() {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veStuAssocFundsStandardEdit.doCreate();
      });
    },
    /**
     * @msg: 编辑行事件
     */
    handleUpdate(row) {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veStuAssocFundsStandardEdit.doUpdate(row);
      });
    },
    /**
     * @msg: 编辑行事件
     */
    toDetail(row) {
      this.showType = 'show';
      this.$nextTick(() => {
        this.$refs.veStuAssocFundsStandardShow.doShow(row);
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
      this.$refs.veStuAssocFundsStandardTable.reload();
    }
  }
};
</script>
<style lang="less" scoped></style>
