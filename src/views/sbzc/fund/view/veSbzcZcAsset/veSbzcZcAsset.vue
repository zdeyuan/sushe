<template>
  <edu-layout type="table">
    <!-- 表格 -->
    <div slot="table" class="right_table">
      <div>
        <edu-query ref="cwQuery" code="veSbzcZcAsset" :do-filter="handleFilter">
          <template slot="search">
            <edu-query-item title="编号" pname="CODE" pop="like" stype="input"></edu-query-item>
            <edu-query-item title="名称" pname="NAME" pop="like" stype="input"></edu-query-item>
            <edu-query-item title="型号" pname="MODEL" pop="like" stype="input"></edu-query-item>
            <edu-query-item title="所属部门" pname="DEPT_OWN" pop="like" stype="input"></edu-query-item>
            <edu-query-item title="状态" pname="STATUS" pop="eq" stype="select" code="zcStatus"> </edu-query-item>
          </template>
        </edu-query>
        <edu-table
          ref="veSbzcZcAssetTable"
          code="veSbzcZcAsset"
          :api="veSbzcZcAssetTable.api"
          :get-params="getParams"
          :exportConfig="{
            url: 'veSbzcZcAsset/export',
            name: '《设备资产表导出》'
          }"
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
          <a-table-column title="资产编号" dataIndex="code" width="220px"> </a-table-column>
          <a-table-column title="资产分类" dataIndex="cateId" width="150px"> </a-table-column>
          <a-table-column title="资产名称" dataIndex="name" width="150px"> </a-table-column>
          <a-table-column title="规格型号" dataIndex="model" width="150px"> </a-table-column>
          <a-table-column title="单位" dataIndex="unit" width="150px"> </a-table-column>
          <a-table-column title="单价" dataIndex="price" width="150px"> </a-table-column>
          <a-table-column title="数量" dataIndex="count" width="150px"> </a-table-column>
          <a-table-column title="金额" dataIndex="totalPrice" width="150px"> </a-table-column>
          <a-table-column title="状态" dataIndex="status" width="150px">
            <template slot-scope="text">
              <edu-dict-text code="zcStatus" :value="text"></edu-dict-text>
            </template>
          </a-table-column>
          <a-table-column title="所属部门" dataIndex="deptOwn" width="150px"> </a-table-column>
          <a-table-column title="仓库管理员" dataIndex="ckUserName" width="150px"> </a-table-column>
          <a-table-column title="责任人" dataIndex="responseUserName" width="150px"> </a-table-column>
          <template slot="af_btn" slot-scope="{ row }">
            <edu-pms :code="'aaa'" name="借领" ext="tdo" type="success" size="mini" @click="doApply(row, 3)"> </edu-pms>
            <edu-pms :code="'aaa'" name="报废" ext="tdetil" type="success" size="mini" @click="doRetire(row, 4)"> </edu-pms>
            <edu-pms :code="'aaa'" name="调拨" ext="tdetil" type="success" size="mini" @click="doAllocate(row, 6)"> </edu-pms>
            <edu-pms :code="'aaa'" name="维修" ext="tdetil" type="success" size="mini" @click="doMaintain(row, 6)"> </edu-pms>
            <edu-pms :code="'aaa'" name="采购" ext="tedit" type="success" size="mini" @click="doPurchase(row, 1)"> </edu-pms>
          </template>
        </edu-table>
      </div>
      <!-- 编辑页 -->
      <veSbzcZcAssetEdit v-if="showType == 'edit'" ref="veSbzcZcAssetEdit" @onOk="editOk" @onCancel="editCancel"></veSbzcZcAssetEdit>
      <veSbzcZcAssetShow v-if="showType == 'show'" ref="veSbzcZcAssetShow" @onOk="editOk" @onCancel="editCancel"></veSbzcZcAssetShow>
      <ve-sbzc-zc-retire-edit v-if="showType == 'retire'" ref="veSbzcZcRetireEdit" @onOk="editOk" @onCancel="editCancel"></ve-sbzc-zc-retire-edit>
      <ve-sbzc-zc-apply-edit v-if="showType == 'apply'" ref="veSbzcZcApplyEdit" @onOk="editOk" @onCancel="editCancel"></ve-sbzc-zc-apply-edit>
      <ve-sbzc-zc-maintain-edit
        v-if="showType == 'maintain'"
        ref="veSbzcZcMaintainEdit"
        @onOk="editOk"
        @onCancel="editCancel"
      ></ve-sbzc-zc-maintain-edit>
      <ve-sbzc-zc-allocate-edit
        v-if="showType == 'allocate'"
        ref="veSbzcZcAllocateEdit"
        @onOk="editOk"
        @onCancel="editCancel"
      ></ve-sbzc-zc-allocate-edit>
      <ve-sbzc-zc-purchase-edit
        v-if="showType == 'purchase'"
        ref="veSbzcZcPurchaseEdit"
        @onOk="editOk"
        @onCancel="editCancel"
      ></ve-sbzc-zc-purchase-edit>
    </div>
  </edu-layout>
</template>

<script>
import veSbzcZcAssetApi from '@/views/sbzc/fund/api/veSbzcZcAssetApi';
import veSbzcZcAssetEdit from './veSbzcZcAssetEdit';
import veSbzcZcAssetShow from './veSbzcZcAssetShow';
import veSbzcZcApplyEdit from '../veSbzcZcApply/veSbzcZcApplyEdit';
import veSbzcZcRetireEdit from '../veSbzcZcRetire/veSbzcZcRetireEdit';
import veSbzcZcAllocateEdit from '../veSbzcZcAllocate/veSbzcZcAllocateEdit';
import veSbzcZcMaintainEdit from '../veSbzcZcMaintain/veSbzcZcMaintainEdit';
import veSbzcZcPurchaseEdit from '../veSbzcZcPurchase/veSbzcZcPurchaseEdit';

export default {
  components: {
    veSbzcZcAssetEdit,
    veSbzcZcAssetShow,
    veSbzcZcApplyEdit,
    veSbzcZcRetireEdit,
    veSbzcZcAllocateEdit,
    veSbzcZcMaintainEdit,
    veSbzcZcPurchaseEdit
  },
  data() {
    const data = {
      veSbzcZcAssetQuery: {},
      showType: 'table'
    };
    data.veSbzcZcAssetTable = {
      api: veSbzcZcAssetApi
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
      this.$refs.veSbzcZcAssetTable.reload();
    },
    /**
     * @msg: 新增事件
     */
    handleCreate() {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veSbzcZcAssetEdit.doCreate();
      });
    },
    /**
     * @msg: 编辑行事件
     */
    handleUpdate(row) {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veSbzcZcAssetEdit.doUpdate(row);
      });
    },
    /**
     * @msg: 编辑行事件
     */
    toDetail(row) {
      this.showType = 'show';
      this.$nextTick(() => {
        this.$refs.veSbzcZcAssetShow.doShow(row);
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
      this.$refs.veSbzcZcAssetTable.reload();
    },
    doRetire(row, type) {
      if (row.status != 'unallocated') {
        this.$message.error('该资产不在闲置状态，不能进行报废操作!');
        return;
      }
      this.showType = 'retire';
      this.$nextTick(() => {
        this.$refs.veSbzcZcRetireEdit.doCreate(row);
      });
    },
    doApply(row, type) {
      if (row.status != 'unallocated') {
        this.$message.error('该资产不在闲置状态，不能进行借领!');
        return;
      }
      this.showType = 'apply';
      this.$nextTick(() => {
        this.$refs.veSbzcZcApplyEdit.doCreate(row);
      });
    },
    doAllocate(row, type) {
      this.showType = 'allocate';
      this.$nextTick(() => {
        this.$refs.veSbzcZcAllocateEdit.doCreate(row);
      });
    },
    doMaintain(row, type) {
      if (row.status != 'unallocated') {
        this.$message.error('该资产不在闲置状态，不能进行维修操作!');
        return;
      }
      this.showType = 'maintain';
      this.$nextTick(() => {
        this.$refs.veSbzcZcMaintainEdit.doCreate(row);
      });
    },
    doPurchase(row, type) {
      if (row.status === 'retire') {
        this.$message.error('该资产已报废，请新建资产进行采购!');
        return;
      }
      this.showType = 'purchase';
      this.$nextTick(() => {
        this.$refs.veSbzcZcPurchaseEdit.doCreate(row);
      });
    }
  }
};
</script>
<style lang="less" scoped></style>
