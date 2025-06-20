<template>
    <edu-layout type="table">
      <!-- 表格 -->
      <div slot="table" class="right_table">
        <div>
          <edu-query
            ref="cwQuery"
            code="veSbzcZcPurchase"
            :do-filter="handleFilter"
          >
            <template slot="search">
                <edu-query-item title="资产编号" pname="ASSET_CODE" pop="like" stype="input"></edu-query-item>
                <edu-query-item title="资产名称" pname="ASSET_NAME" pop="like" stype="input"></edu-query-item>
            </template>
          </edu-query>
          <edu-table
            ref="veSbzcZcPurchaseTable"
            code="veSbzcZcPurchase"
            :api="veSbzcZcPurchaseTable.api"
            :get-params="getParams"
            :exportConfig="{
              url: 'veSbzcZcPurchase/export',
              name: '《资产采购表导出》'
            }"
            :config="{
            }"
            :to-update="handleUpdate"
            :toDetail="toDetail"
            :do-add="handleCreate"
          >
            <!--         <template slot-scope="text, record, index">
       <span></span>
       </template>-->
                      <a-table-column title="资产id" dataIndex="assetId" width="150px">
            </a-table-column>
                        <a-table-column title="资产编号" dataIndex="assetCode" width="150px">
            </a-table-column>
                        <a-table-column title="资产名称" dataIndex="assetName" width="150px">
            </a-table-column>
                        <a-table-column title="采购数量" dataIndex="count" width="150px">
            </a-table-column>
                        <a-table-column title="所属部门" dataIndex="deptOwn" width="150px">
            </a-table-column>
                        <a-table-column title="批准人" dataIndex="checkUserId" width="150px">
            </a-table-column>
                        <a-table-column title="批准人姓名" dataIndex="checkUserName" width="150px">
            </a-table-column>
                        <a-table-column title="创建时间" dataIndex="createTime" width="150px">
            </a-table-column>
                        <a-table-column title="备注" dataIndex="remark" width="150px">
            </a-table-column>
                        <a-table-column title="创建人id" dataIndex="createUserId" width="150px">
            </a-table-column>
                        <a-table-column title="创建人姓名" dataIndex="createUserName" width="150px">
            </a-table-column>
                      </edu-table>
        </div>
        <!-- 编辑页 -->
        <veSbzcZcPurchaseEdit v-if="showType=='edit'" ref="veSbzcZcPurchaseEdit" @onOk="editOk" @onCancel="editCancel"> </veSbzcZcPurchaseEdit>
        <veSbzcZcPurchaseShow v-if="showType=='show'" ref="veSbzcZcPurchaseShow" @onOk="editOk" @onCancel="editCancel"> </veSbzcZcPurchaseShow>
      </div>
    </edu-layout>
</template>

<script>
import veSbzcZcPurchaseApi from "@/views/sbzc/fund/api/veSbzcZcPurchaseApi";
import veSbzcZcPurchaseEdit from "./veSbzcZcPurchaseEdit";
import veSbzcZcPurchaseShow from "./veSbzcZcPurchaseShow";

export default {
  components: {
    veSbzcZcPurchaseEdit,
    veSbzcZcPurchaseShow
  },
  data() {
    const data = {
      veSbzcZcPurchaseQuery: {},
      showType: "table",
    };
    data.veSbzcZcPurchaseTable = {
      api: veSbzcZcPurchaseApi,
    };
    return data;
  },
  mounted() {},
  methods: {
     /**
     * @msg: 表格获取请求数据 必须return 一个对象
     */
    getParams() {
      const params = this.$refs["cwQuery"].getQueryData();
      return params;
    },
    /**
     * @msg: 搜索事件
     */
    handleFilter() {
      this.$refs.veSbzcZcPurchaseTable.reload();
    },
    /**
     * @msg: 新增事件
     */
    handleCreate() {
      this.showType = "edit";
      this.$nextTick(() => {
        this.$refs.veSbzcZcPurchaseEdit.doCreate();
      });
    },
    /**
     * @msg: 编辑行事件
     */
    handleUpdate(row) {
      this.showType = "edit";
      this.$nextTick(() => {
        this.$refs.veSbzcZcPurchaseEdit.doUpdate(row);
      });
    },
    /**
     * @msg: 编辑行事件
     */
    toDetail(row) {
      this.showType = "show";
      this.$nextTick(() => {
        this.$refs.veSbzcZcPurchaseShow.doShow(row);
      });
    },
    /**
     * @msg: 编辑页取消事件
     */
    editCancel(){
       this.showType = 'table';
    },
    /**
     * @msg: 编辑页成功事件
     */
    editOk(){
       this.showType = 'table';
      this.$refs.veSbzcZcPurchaseTable.reload();
    },
  }
};
</script>
<style lang="less" scoped>

</style>