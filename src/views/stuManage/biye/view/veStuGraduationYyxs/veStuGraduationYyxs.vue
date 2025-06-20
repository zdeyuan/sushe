<template>
    <edu-layout type="table">
      <!-- 表格 -->
      <div slot="table" class="right_table">
        <div>
          <edu-query
            ref="cwQuery"
            code="veStuGraduationYyxs"
            :do-filter="handleFilter"
          >
            <template slot="search">
                <edu-query-item title="这里要改一下" pname="NAME" pop="like" stype="input"> </edu-query-item>
                <edu-query-item title="这里要改一下" pname="TITLE" pop="like" stype="input"> </edu-query-item>
            </template>
          </edu-query>
          <edu-table
            ref="veStuGraduationYyxsTable"
            code="veStuGraduationYyxs"
            :api="veStuGraduationYyxsTable.api"
            :get-params="getParams"
            :exportConfig="{
              url: 'veStuGraduationYyxs/export',
              name: '《优秀毕业生信息导出》'
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
                      <a-table-column title="学生Id" dataIndex="stuId" width="150px">
            </a-table-column>
                        <a-table-column title="备注" dataIndex="remark" width="150px">
            </a-table-column>
                      </edu-table>
        </div>
        <!-- 编辑页 -->
        <veStuGraduationYyxsEdit v-if="showType=='edit'" ref="veStuGraduationYyxsEdit" @onOk="editOk" @onCancel="editCancel"> </veStuGraduationYyxsEdit>
        <veStuGraduationYyxsShow v-if="showType=='show'" ref="veStuGraduationYyxsShow" @onOk="editOk" @onCancel="editCancel"> </veStuGraduationYyxsShow>
      </div>
    </edu-layout>
</template>

<script>
import veStuGraduationYyxsApi from "@/views/stuManage/biye/api/veStuGraduationYyxsApi";
import veStuGraduationYyxsEdit from "./veStuGraduationYyxsEdit";
import veStuGraduationYyxsShow from "./veStuGraduationYyxsShow";

export default {
  components: {
    veStuGraduationYyxsEdit,
    veStuGraduationYyxsShow
  },
  data() {
    const data = {
      veStuGraduationYyxsQuery: {},
      showType: "table",
    };
    data.veStuGraduationYyxsTable = {
      api: veStuGraduationYyxsApi,
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
      this.$refs.veStuGraduationYyxsTable.reload();
    },
    /**
     * @msg: 新增事件
     */
    handleCreate() {
      this.showType = "edit";
      this.$nextTick(() => {
        this.$refs.veStuGraduationYyxsEdit.doCreate();
      });
    },
    /**
     * @msg: 编辑行事件
     */
    handleUpdate(row) {
      this.showType = "edit";
      this.$nextTick(() => {
        this.$refs.veStuGraduationYyxsEdit.doUpdate(row);
      });
    },
    /**
     * @msg: 编辑行事件
     */
    toDetail(row) {
      this.showType = "show";
      this.$nextTick(() => {
        this.$refs.veStuGraduationYyxsShow.doShow(row);
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
      this.$refs.veStuGraduationYyxsTable.reload();
    },
  }
};
</script>
<style lang="less" scoped>

</style>