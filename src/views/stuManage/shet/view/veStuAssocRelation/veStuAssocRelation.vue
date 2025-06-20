<template>
    <edu-layout type="table">
      <!-- 表格 -->
      <div slot="table" class="right_table">
        <div>
          <edu-query
            ref="cwQuery"
            code="veStuAssocRelation"
            :do-filter="handleFilter"
          >
            <template slot="search">
                <edu-query-item title="这里要改一下" pname="NAME" pop="like" stype="input"> </edu-query-item>
                <edu-query-item title="这里要改一下" pname="TITLE" pop="like" stype="input"> </edu-query-item>
            </template>
          </edu-query>
          <edu-table
            ref="veStuAssocRelationTable"
            code="veStuAssocRelation"
            :api="veStuAssocRelationTable.api"
            :get-params="getParams"
            :exportConfig="{
              url: 'veStuAssocRelation/export',
              name: '《学生社团关联导出》'
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
                      <a-table-column title="学号" dataIndex="code" width="150px">
            </a-table-column>
                        <a-table-column title="学生id" dataIndex="stuId" width="150px">
            </a-table-column>
                        <a-table-column title="type" dataIndex="type" width="150px">
            </a-table-column>
                        <a-table-column title="1：普通成员，2：组长，3：主席" dataIndex="role" width="150px">
            </a-table-column>
                      </edu-table>
        </div>
        <!-- 编辑页 -->
        <veStuAssocRelationEdit v-if="showType=='edit'" ref="veStuAssocRelationEdit" @onOk="editOk" @onCancel="editCancel"> </veStuAssocRelationEdit>
        <veStuAssocRelationShow v-if="showType=='show'" ref="veStuAssocRelationShow" @onOk="editOk" @onCancel="editCancel"> </veStuAssocRelationShow>
      </div>
    </edu-layout>
</template>

<script>
import veStuAssocRelationApi from "@/views/stuManage/shet/api/veStuAssocRelationApi";
import veStuAssocRelationEdit from "./veStuAssocRelationEdit";
import veStuAssocRelationShow from "./veStuAssocRelationShow";

export default {
  components: {
    veStuAssocRelationEdit,
    veStuAssocRelationShow
  },
  data() {
    const data = {
      veStuAssocRelationQuery: {},
      showType: "table",
    };
    data.veStuAssocRelationTable = {
      api: veStuAssocRelationApi,
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
      this.$refs.veStuAssocRelationTable.reload();
    },
    /**
     * @msg: 新增事件
     */
    handleCreate() {
      this.showType = "edit";
      this.$nextTick(() => {
        this.$refs.veStuAssocRelationEdit.doCreate();
      });
    },
    /**
     * @msg: 编辑行事件
     */
    handleUpdate(row) {
      this.showType = "edit";
      this.$nextTick(() => {
        this.$refs.veStuAssocRelationEdit.doUpdate(row);
      });
    },
    /**
     * @msg: 编辑行事件
     */
    toDetail(row) {
      this.showType = "show";
      this.$nextTick(() => {
        this.$refs.veStuAssocRelationShow.doShow(row);
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
      this.$refs.veStuAssocRelationTable.reload();
    },
  }
};
</script>
<style lang="less" scoped>

</style>