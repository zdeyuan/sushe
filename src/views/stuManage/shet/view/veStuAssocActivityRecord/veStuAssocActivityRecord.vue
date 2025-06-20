<template>
    <edu-layout type="table">
      <!-- 表格 -->
      <div slot="table" class="right_table">
        <div>
          <edu-query
            ref="cwQuery"
            code="veStuAssocActivityRecord"
            :do-filter="handleFilter"
          >
            <template slot="search">
                <edu-query-item title="这里要改一下" pname="NAME" pop="like" stype="input"> </edu-query-item>
                <edu-query-item title="这里要改一下" pname="TITLE" pop="like" stype="input"> </edu-query-item>
            </template>
          </edu-query>
          <edu-table
            ref="veStuAssocActivityRecordTable"
            code="veStuAssocActivityRecord"
            :api="veStuAssocActivityRecordTable.api"
            :get-params="getParams"
            :exportConfig="{
              url: 'veStuAssocActivityRecord/export',
              name: '《社团活动记录导出》'
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
                        <a-table-column title="活动id" dataIndex="activityId" width="150px">
            </a-table-column>
                        <a-table-column title="活动内容" dataIndex="content" width="150px">
            </a-table-column>
                        <a-table-column title="活动内容文件(视频内容等)" dataIndex="fileId" width="150px">
            </a-table-column>
                        <a-table-column title="审核状态 0=待审核 1=通过 2=不通过" dataIndex="auditStatus" width="150px">
            </a-table-column>
                        <a-table-column title="审核时间" dataIndex="auditTime" width="150px">
            </a-table-column>
                        <a-table-column title="添加时间" dataIndex="addTime" width="150px">
            </a-table-column>
                        <a-table-column title="添加的学生的id" dataIndex="addStuId" width="150px">
            </a-table-column>
                        <a-table-column title="添加的学生的id" dataIndex="addStuName" width="150px">
            </a-table-column>
                      </edu-table>
        </div>
        <!-- 编辑页 -->
        <veStuAssocActivityRecordEdit v-if="showType=='edit'" ref="veStuAssocActivityRecordEdit" @onOk="editOk" @onCancel="editCancel"> </veStuAssocActivityRecordEdit>
        <veStuAssocActivityRecordShow v-if="showType=='show'" ref="veStuAssocActivityRecordShow" @onOk="editOk" @onCancel="editCancel"> </veStuAssocActivityRecordShow>
      </div>
    </edu-layout>
</template>

<script>
import veStuAssocActivityRecordApi from "@/views/stuManage/shet/api/veStuAssocActivityRecordApi";
import veStuAssocActivityRecordEdit from "./veStuAssocActivityRecordEdit";
import veStuAssocActivityRecordShow from "./veStuAssocActivityRecordShow";

export default {
  components: {
    veStuAssocActivityRecordEdit,
    veStuAssocActivityRecordShow
  },
  data() {
    const data = {
      veStuAssocActivityRecordQuery: {},
      showType: "table",
    };
    data.veStuAssocActivityRecordTable = {
      api: veStuAssocActivityRecordApi,
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
      this.$refs.veStuAssocActivityRecordTable.reload();
    },
    /**
     * @msg: 新增事件
     */
    handleCreate() {
      this.showType = "edit";
      this.$nextTick(() => {
        this.$refs.veStuAssocActivityRecordEdit.doCreate();
      });
    },
    /**
     * @msg: 编辑行事件
     */
    handleUpdate(row) {
      this.showType = "edit";
      this.$nextTick(() => {
        this.$refs.veStuAssocActivityRecordEdit.doUpdate(row);
      });
    },
    /**
     * @msg: 编辑行事件
     */
    toDetail(row) {
      this.showType = "show";
      this.$nextTick(() => {
        this.$refs.veStuAssocActivityRecordShow.doShow(row);
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
      this.$refs.veStuAssocActivityRecordTable.reload();
    },
  }
};
</script>
<style lang="less" scoped>

</style>