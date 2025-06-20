<template>
    <edu-layout type="table">
      <!-- 表格 -->
      <div slot="table" class="right_table">
        <div>
          <edu-query
            ref="cwQuery"
            code="veStuAssocActivityApply"
            :do-filter="handleFilter"
          >
            <template slot="search">
                <edu-query-item title="这里要改一下" pname="NAME" pop="like" stype="input"> </edu-query-item>
                <edu-query-item title="这里要改一下" pname="TITLE" pop="like" stype="input"> </edu-query-item>
            </template>
          </edu-query>
          <edu-table
            ref="veStuAssocActivityApplyTable"
            code="veStuAssocActivityApply"
            :api="veStuAssocActivityApplyTable.api"
            :get-params="getParams"
            :exportConfig="{
              url: 'veStuAssocActivityApply/export',
              name: '《社团活动申请导出》'
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
                      <a-table-column title="活动id" dataIndex="activityId" width="150px">
            </a-table-column>
                        <a-table-column title="学生id" dataIndex="stuId" width="150px">
            </a-table-column>
                        <a-table-column title="审核状态 0=待审核  1=通过 2=不通过" dataIndex="auditStatus" width="150px">
            </a-table-column>
                        <a-table-column title="审核时间" dataIndex="auditTime" width="150px">
            </a-table-column>
                        <a-table-column title="申请时间" dataIndex="addTime" width="150px">
            </a-table-column>
                      </edu-table>
        </div>
        <!-- 编辑页 -->
        <veStuAssocActivityApplyEdit v-if="showType=='edit'" ref="veStuAssocActivityApplyEdit" @onOk="editOk" @onCancel="editCancel"> </veStuAssocActivityApplyEdit>
        <veStuAssocActivityApplyShow v-if="showType=='show'" ref="veStuAssocActivityApplyShow" @onOk="editOk" @onCancel="editCancel"> </veStuAssocActivityApplyShow>
      </div>
    </edu-layout>
</template>

<script>
import veStuAssocActivityApplyApi from "@/views/stuManage/shet/api/veStuAssocActivityApplyApi";
import veStuAssocActivityApplyEdit from "./veStuAssocActivityApplyEdit";
import veStuAssocActivityApplyShow from "./veStuAssocActivityApplyShow";

export default {
  components: {
    veStuAssocActivityApplyEdit,
    veStuAssocActivityApplyShow
  },
  data() {
    const data = {
      veStuAssocActivityApplyQuery: {},
      showType: "table",
    };
    data.veStuAssocActivityApplyTable = {
      api: veStuAssocActivityApplyApi,
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
      this.$refs.veStuAssocActivityApplyTable.reload();
    },
    /**
     * @msg: 新增事件
     */
    handleCreate() {
      this.showType = "edit";
      this.$nextTick(() => {
        this.$refs.veStuAssocActivityApplyEdit.doCreate();
      });
    },
    /**
     * @msg: 编辑行事件
     */
    handleUpdate(row) {
      this.showType = "edit";
      this.$nextTick(() => {
        this.$refs.veStuAssocActivityApplyEdit.doUpdate(row);
      });
    },
    /**
     * @msg: 编辑行事件
     */
    toDetail(row) {
      this.showType = "show";
      this.$nextTick(() => {
        this.$refs.veStuAssocActivityApplyShow.doShow(row);
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
      this.$refs.veStuAssocActivityApplyTable.reload();
    },
  }
};
</script>
<style lang="less" scoped>

</style>