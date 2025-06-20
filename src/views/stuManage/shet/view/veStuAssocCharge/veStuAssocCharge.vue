<template>
    <edu-layout type="table">
      <!-- 表格 -->
      <div slot="table" class="right_table">
        <div>
          <edu-query
            ref="cwQuery"
            code="veStuAssocCharge"
            :do-filter="handleFilter"
          >
            <template slot="search">
                <edu-query-item title="这里要改一下" pname="NAME" pop="like" stype="input"> </edu-query-item>
                <edu-query-item title="这里要改一下" pname="TITLE" pop="like" stype="input"> </edu-query-item>
            </template>
          </edu-query>
          <edu-table
            ref="veStuAssocChargeTable"
            code="veStuAssocCharge"
            :api="veStuAssocChargeTable.api"
            :get-params="getParams"
            :exportConfig="{
              url: 'veStuAssocCharge/export',
              name: '《社团负责人导出》'
            }"
            :config="{
               open:false,
               close:false,
               status:false
            }"
            :to-update="handleUpdate"
            :toDetail="toDetail"
            :do-add="handleCreate"
          >
            <!--         <template slot-scope="text, record, index">
       <span></span>
       </template>-->
                      <a-table-column title="社团id" dataIndex="assocId" width="150px">
            </a-table-column>
                        <a-table-column title="社团负责人id" dataIndex="stuId" width="150px">
            </a-table-column>
                        <a-table-column title="负责人用户姓名" dataIndex="stuName" width="150px">
            </a-table-column>
                      </edu-table>
        </div>
        <!-- 编辑页 -->
        <veStuAssocChargeEdit v-if="showType=='edit'" ref="veStuAssocChargeEdit" @onOk="editOk" @onCancel="editCancel"> </veStuAssocChargeEdit>
        <veStuAssocChargeShow v-if="showType=='show'" ref="veStuAssocChargeShow" @onOk="editOk" @onCancel="editCancel"> </veStuAssocChargeShow>
      </div>
    </edu-layout>
</template>

<script>
import veStuAssocChargeApi from "@/views/stuManage/shet/api/veStuAssocChargeApi";
import veStuAssocChargeEdit from "./veStuAssocChargeEdit";
import veStuAssocChargeShow from "./veStuAssocChargeShow";

export default {
  components: {
    veStuAssocChargeEdit,
    veStuAssocChargeShow
  },
  data() {
    const data = {
      veStuAssocChargeQuery: {},
      showType: "table",
    };
    data.veStuAssocChargeTable = {
      api: veStuAssocChargeApi,
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
      this.$refs.veStuAssocChargeTable.reload();
    },
    /**
     * @msg: 新增事件
     */
    handleCreate() {
      this.showType = "edit";
      this.$nextTick(() => {
        this.$refs.veStuAssocChargeEdit.doCreate();
      });
    },
    /**
     * @msg: 编辑行事件
     */
    handleUpdate(row) {
      this.showType = "edit";
      this.$nextTick(() => {
        this.$refs.veStuAssocChargeEdit.doUpdate(row);
      });
    },
    /**
     * @msg: 编辑行事件
     */
    toDetail(row) {
      this.showType = "show";
      this.$nextTick(() => {
        this.$refs.veStuAssocChargeShow.doShow(row);
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
      this.$refs.veStuAssocChargeTable.reload();
    },
  }
};
</script>
<style lang="less" scoped>

</style>