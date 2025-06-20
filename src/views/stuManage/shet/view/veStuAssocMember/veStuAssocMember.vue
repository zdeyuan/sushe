<template>
    <edu-layout type="table">
      <!-- 表格 -->
      <div slot="table" class="right_table">
        <div>
          <edu-query
            ref="cwQuery"
            code="veStuAssocMember"
            :do-filter="handleFilter"
          >
            <template slot="search">
                <edu-query-item title="这里要改一下" pname="NAME" pop="like" stype="input"> </edu-query-item>
                <edu-query-item title="这里要改一下" pname="TITLE" pop="like" stype="input"> </edu-query-item>
            </template>
          </edu-query>
          <edu-table
            ref="veStuAssocMemberTable"
            code="veStuAssocMember"
            :api="veStuAssocMemberTable.api"
            :get-params="getParams"
            :exportConfig="{
              url: 'veStuAssocMember/export',
              name: '《社团成员导出》'
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
                        <a-table-column title="学生id" dataIndex="stuId" width="150px">
            </a-table-column>
                        <a-table-column title="成员角色id" dataIndex="roleId" width="150px">
            </a-table-column>
                        <a-table-column title="标签" dataIndex="label" width="150px">
            </a-table-column>
                        <a-table-column title="入团审核状态  0=待审核  1=通过  2=不通过" dataIndex="auditStatus" width="150px">
            </a-table-column>
                        <a-table-column title="入团时间" dataIndex="addTime" width="150px">
            </a-table-column>
                      </edu-table>
        </div>
        <!-- 编辑页 -->
        <veStuAssocMemberEdit v-if="showType=='edit'" ref="veStuAssocMemberEdit" @onOk="editOk" @onCancel="editCancel"> </veStuAssocMemberEdit>
        <veStuAssocMemberShow v-if="showType=='show'" ref="veStuAssocMemberShow" @onOk="editOk" @onCancel="editCancel"> </veStuAssocMemberShow>
      </div>
    </edu-layout>
</template>

<script>
import veStuAssocMemberApi from "@/views/stuManage/shet/api/veStuAssocMemberApi";
import veStuAssocMemberEdit from "./veStuAssocMemberEdit";
import veStuAssocMemberShow from "./veStuAssocMemberShow";

export default {
  components: {
    veStuAssocMemberEdit,
    veStuAssocMemberShow
  },
  data() {
    const data = {
      veStuAssocMemberQuery: {},
      showType: "table",
    };
    data.veStuAssocMemberTable = {
      api: veStuAssocMemberApi,
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
      this.$refs.veStuAssocMemberTable.reload();
    },
    /**
     * @msg: 新增事件
     */
    handleCreate() {
      this.showType = "edit";
      this.$nextTick(() => {
        this.$refs.veStuAssocMemberEdit.doCreate();
      });
    },
    /**
     * @msg: 编辑行事件
     */
    handleUpdate(row) {
      this.showType = "edit";
      this.$nextTick(() => {
        this.$refs.veStuAssocMemberEdit.doUpdate(row);
      });
    },
    /**
     * @msg: 编辑行事件
     */
    toDetail(row) {
      this.showType = "show";
      this.$nextTick(() => {
        this.$refs.veStuAssocMemberShow.doShow(row);
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
      this.$refs.veStuAssocMemberTable.reload();
    },
  }
};
</script>
<style lang="less" scoped>

</style>