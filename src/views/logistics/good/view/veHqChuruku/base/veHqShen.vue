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
        </template>
      </edu-query>
      <edu-table
        ref="veHqChurukuTable"
        code="veHqChuruku"
        :api="veHqChurukuTable.api"
        :get-params="getParams"
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
          <edu-pms
            :code="'v-add'"
            v-if="viewType == 'shen'"
            type="primary"
            ext="success"
            iconfont="check-circle"
            name="批量通过"
            @click="updateStatus('all', 1)"
          ></edu-pms>
          <edu-pms
            :code="'veJn-add'"
            v-if="viewType == 'shen'"
            type="primary"
            ext="delete"
            iconfont="stop"
            name="批量不通过"
            @click="updateStatus('all', 0)"
          ></edu-pms>
        </template>

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

        <a-table-column title="仓库名称" dataIndex="ckName" width="150px"> </a-table-column>
        <a-table-column title="调入仓库名称" dataIndex="glName" width="150px"> </a-table-column>
        <a-table-column title="物品名称" dataIndex="wpName" width="150px"> </a-table-column>
        <a-table-column :title="'操作数量'" dataIndex="number" width="150px"> </a-table-column>
        <a-table-column title="归还数量" dataIndex="glNum" width="150px"> </a-table-column>
        <a-table-column :title="'操作时间'" dataIndex="crTime" width="150px"> </a-table-column>
        <a-table-column :title="'操作申请人'" dataIndex="applyUserName" width="150px"> </a-table-column>
        <a-table-column title="经手人" dataIndex="jbUserName" width="150px"> </a-table-column>
        <a-table-column title="批准人" dataIndex="pjUserName" width="150px"> </a-table-column>
        <a-table-column title="类型" dataIndex="type" width="150px">
          <template slot-scope="text">
            {{ getTypeName(text) }}
          </template>
        </a-table-column>
        <a-table-column title="状态" dataIndex="status" width="150px">
          <template slot-scope="value">
            <edu-dict-text code="shetAuditStatus" :class="'status' + value" :value="value"></edu-dict-text>
          </template>
        </a-table-column>
        <template slot="af_btn" slot-scope="{ row }" v-if="viewType == 3">
          <span v-if="row.glNum" style="color:#bbb">已归还</span>
          <edu-pms :code="'aaa'" name="归还" v-else ext="tdo" type="success" size="mini" @click="doBack(row)"> </edu-pms>
        </template>
      </edu-table>
    </div>
    <!-- 编辑页 -->
    <veHqChurukuShow
      v-if="showType == 'show'"
      :viewType="sviewType"
      :viewName="sviewName"
      ref="veHqChurukuShow"
      @onOk="editOk"
      @onCancel="editCancel"
    >
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
import { baseMixins } from '@/mixins/baseMixins';
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
  mixins: [baseMixins],
  data() {
    const data = {
      veHqChurukuQuery: {},
      showType: 'table',
      sviewType: '',
      sviewName: ''
    };
    data.veHqChurukuTable = {
      api: veHqChurukuApi
    };
    return data;
  },
  mounted() {},
  methods: {
    updateStatus(id, status) {
      let ssids = [id];
      if (id == 'all') {
        const ids = [];
        const datas = this.$refs.veHqChurukuTable.getSelectRow();
        if (!datas || datas.length == 0) {
          this.$message.error('请选择一项');
          return;
        }
        for (let i = 0; i < datas.length; i++) {
          const element = datas[i];
          if (element.status != 2) {
            this.$message.error('请选择未审核的数据');
            return;
          }
          ids.push(element.id);
        }
        ssids = ids;
      }
      const sub = {
        ids: ssids,
        status: status
      };
      veHqChurukuApi.updateStatus(sub).then(res => {
        this.$notification.success({
          message: '审核成功',
          description: `成功审核[${ssids.length}]条数据`
        });
        this.$refs.veHqChurukuTable.reload();
      });
    },
    getTypeName(type) {
      //操作类型：1=入库，2=领用，3=借用、4=报废、5=归还、6=调拨
      if (type == 1) {
        return '入库';
      }
      if (type == 2) {
        return '领用';
      }
      if (type == 3) {
        return '借用';
      }
      if (type == 4) {
        return '报废';
      }
      if (type == 5) {
        return '归还';
      }
      if (type == 6) {
        return '调拨';
      }
      return '';
    },
    /**
     * @msg: 表格获取请求数据 必须return 一个对象
     */
    getParams() {
      const params = this.$refs['cwQuery'].getQueryData();
      //  this.$utils.addPageConditions(params, 'd.type', 'eq', this.viewType);
      if (this.viewType == 'my') {
        this.$utils.addPageConditions(params, 'd.create_name', 'eq', this.loginInfo.realname);
      } else if (this.viewType == 'shen') {
        this.$utils.addPageConditions(params, 'd.status', 'eq', 2);
      }

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
      this.sviewType = row.type;
      this.sviewName = this.getTypeName(row.type);
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
<style lang="less" scoped>
.status1 {
  color: #039471;
}
.status0 {
  color: rgb(212, 117, 117);
}
.status2 {
  color: #999;
}
</style>
