<template>
  <!-- 表格 -->
  <div>
    <div>
      <edu-query ref="cwQuery" code="veHqChuruku" :do-filter="handleFilter">
        <template slot="search">
          <edu-query-item title="仓库名称" pname="d.ck_Id" pop="eq">
            <ckList v-model="veHqChurukuQuery.ckId" @change="handleFilter"></ckList>
          </edu-query-item>
          <edu-query-item title="物品名称" pname="d.wp_Id" pop="eq">
            <wpList v-model="veHqChurukuQuery.wpId" @change="handleFilter"></wpList>
          </edu-query-item>
          <edu-query-item :title="viewName + '时间'" pname="d.cr_Time" pop="gt" stype="date"> </edu-query-item>
          <edu-query-item :title="viewName + '人'" pname="d.apply_User_Name" pop="like" stype="input"> </edu-query-item>
        </template>
      </edu-query>
      <edu-table
        ref="veHqChurukuTable"
        code="veHqChuruku"
        :api="veHqChurukuTable.api"
        :get-params="getParams"
        :exportConfig="{
          url: 'veHqChuruku/export',
          name: '《' + viewName + '导出》'
        }"
        :sorts="[
          {
            column: 'd.create_date',
            asc: true
          }
        ]"
        :config="{
          status: false,
          delete: false,
          close: false,
          open: false
        }"
        :to-detail="viewType == 3 ? null : toDetail"
      >
        <template slot="top_bef_btn">
          <edu-pms :code="'veJkyUser-btn-add'" v-if="viewType == 3" type="primary" ext="add" iconfont="plus" name="归还" @click="doBack()"></edu-pms>
          <edu-pms
            :code="'veJkyUser-btn-add'"
            v-if="viewType == 2 || viewType == 3"
            type="primary"
            ext="add"
            iconfont="align-right"
            name="二维码打印"
            @click="doErcode()"
          ></edu-pms>
        </template>
        <!--         <template slot-scope="text, record, index">
       <span></span>
       </template>-->
        <template v-if="viewType == '6'">
          <a-table-column title="调出仓库名称" dataIndex="ckName" width="150px"> </a-table-column>
          <a-table-column title="调入仓库名称" dataIndex="glName" width="150px"> </a-table-column>
        </template>
        <a-table-column v-else title="仓库名称" dataIndex="ckName" width="150px"> </a-table-column>
        <a-table-column title="物品名称" dataIndex="wpName" width="150px"> </a-table-column>
        <a-table-column :title="viewName + '数量'" dataIndex="number" width="150px"> </a-table-column>
        <a-table-column title="归还数量" v-if="viewType == 3" dataIndex="glNum" width="150px"> </a-table-column>
        <a-table-column :title="viewName + '时间'" dataIndex="crTime" width="150px"> </a-table-column>
        <a-table-column :title="viewName + '申请人'" dataIndex="applyUserName" width="150px"> </a-table-column>
        <a-table-column title="经手人" dataIndex="jbUserName" width="150px"> </a-table-column>
        <a-table-column title="批准人" dataIndex="pjUserName" width="150px"> </a-table-column>

        <template slot="af_btn" slot-scope="{ row }" v-if="viewType == 3">
          <span v-if="row.glNum" style="color:#bbb">已归还</span>
          <edu-pms :code="'aaa'" name="归还" v-else ext="tdo" type="success" size="mini" @click="doBack(row)"> </edu-pms>
        </template>
      </edu-table>
    </div>
    <!-- 编辑页 -->
    <veHqChurukuShow v-if="showType == 'show'" :viewType="viewType" :viewName="viewName" ref="veHqChurukuShow" @onOk="editOk" @onCancel="editCancel">
    </veHqChurukuShow>
    <veHqChurukuReturn v-if="showType == 'back'" ref="veHqChurukuReturn" @onOk="editOk" @onCancel="editCancel"> </veHqChurukuReturn>
    <veHqChurukuErcode v-if="showType == 'code'" ref="veHqChurukuErcode" @onOk="editOk" @onCancel="editCancel"> </veHqChurukuErcode>
  </div>
</template>

<script>
import veHqChurukuApi from '@/views/logistics/good/api/veHqChurukuApi';
import veHqChurukuShow from './veHqChurukuShow';
import veHqChurukuReturn from './veHqChurukuReturn';
import veHqChurukuErcode from './veHqChurukuErcode';
import userSelectBox from '@/components/kqManageComponent/userSelectBox';
import ckList from '@/views/logistics/base/component/ckList';
import wpList from '@/views/logistics/good/component/wpList';

export default {
  props: {
    viewType: {
      type: String
    },
    viewName: {
      type: String
    }
  },
  components: {
    veHqChurukuShow,
    veHqChurukuReturn,
    veHqChurukuErcode,
    ckList,
    userSelectBox,
    wpList
  },
  data() {
    const data = {
      veHqChurukuQuery: {},
      showType: 'table'
    };
    data.veHqChurukuTable = {
      api: veHqChurukuApi
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
      this.$utils.addPageConditions(params, 'd.type', 'eq', this.viewType);
      this.$utils.addPageConditions(params, 'd.status', 'eq', 1);

      params.params = {
        viewName: this.viewName
      };

      return params;
    },
    /**
     * @msg: 搜索事件
     */
    handleFilter() {
      this.$refs.veHqChurukuTable.reload();
    },
    /**
     * @msg: 编辑行事件
     */
    doBack(row) {
      let rowList = [];
      if (!row) {
        const list = this.$refs.veHqChurukuTable.getSelectRow();
        for (let i = 0; i < list.length; i++) {
          const item = list[i];
          if (item.returnNum) {
            this.$message.error('有一条数据已经归还,请选择未归还的!');
            return;
          }
        }
        rowList = list;
        if (list.length == 0) {
          this.$message.error('请选择');
          return;
        }
      } else {
        rowList = [row];
      }

      this.showType = 'back';
      this.$nextTick(() => {
        this.$refs.veHqChurukuReturn.doReturn(rowList);
      });
    },
    doErcode(row) {
      let rowList = [];
      if (!row) {
        const list = this.$refs.veHqChurukuTable.getSelectRow();
        for (let i = 0; i < list.length; i++) {
          const item = list[i];
          if (item.returnNum) {
            this.$message.error('有一条数据已经归还,请选择未归还的!');
            return;
          }
        }
        rowList = list;
        if (list.length == 0) {
          this.$message.error('请选择');
          return;
        }
      } else {
        rowList = [row];
      }

      this.showType = 'code';
      this.$nextTick(() => {
        this.$refs.veHqChurukuErcode.doCode(rowList);
      });
    },
    /**
     * @msg: 编辑行事件
     */
    toDetail(row) {
      this.showType = 'show';
      this.$nextTick(() => {
        this.$refs.veHqChurukuShow.doUpdate(row);
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
      this.$refs.veHqChurukuTable.reload();
    }
  }
};
</script>
<style lang="less" scoped></style>
