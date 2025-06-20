<template>
    <edu-layout type="table">
      <!-- 表格 -->
      <div slot="table" class="right_table">
        <div>
          <edu-query
            ref="cwQuery"
            code="veStuGraduationXuhao"
            :do-filter="handleFilter"
          >
            <template slot="search">
                <edu-query-item title="这里要改一下" pname="NAME" pop="like" stype="input"> </edu-query-item>
                <edu-query-item title="这里要改一下" pname="TITLE" pop="like" stype="input"> </edu-query-item>
            </template>
          </edu-query>
          <edu-table
            ref="veStuGraduationXuhaoTable"
            code="veStuGraduationXuhao"
            :api="veStuGraduationXuhaoTable.api"
            :get-params="getParams"
            :exportConfig="{
              url: 'veStuGraduationXuhao/export',
              name: '《毕业证结业证流水号表导出》'
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
                      <a-table-column title="byz =>毕业证编号，jyz=>结业证编号" dataIndex="category" width="150px">
            </a-table-column>
                        <a-table-column title="结束学业年份" dataIndex="year" width="150px">
            </a-table-column>
                        <a-table-column title="专业ID" dataIndex="specId" width="150px">
            </a-table-column>
                        <a-table-column title="最大序号" dataIndex="maxNumber" width="150px">
            </a-table-column>
                      </edu-table>
        </div>
        <!-- 编辑页 -->
        <veStuGraduationXuhaoEdit v-if="showType=='edit'" ref="veStuGraduationXuhaoEdit" @onOk="editOk" @onCancel="editCancel"> </veStuGraduationXuhaoEdit>
        <veStuGraduationXuhaoShow v-if="showType=='show'" ref="veStuGraduationXuhaoShow" @onOk="editOk" @onCancel="editCancel"> </veStuGraduationXuhaoShow>
      </div>
    </edu-layout>
</template>

<script>
import veStuGraduationXuhaoApi from "@/views/stuManage/biye/api/veStuGraduationXuhaoApi";
import veStuGraduationXuhaoEdit from "./veStuGraduationXuhaoEdit";
import veStuGraduationXuhaoShow from "./veStuGraduationXuhaoShow";

export default {
  components: {
    veStuGraduationXuhaoEdit,
    veStuGraduationXuhaoShow
  },
  data() {
    const data = {
      veStuGraduationXuhaoQuery: {},
      showType: "table",
    };
    data.veStuGraduationXuhaoTable = {
      api: veStuGraduationXuhaoApi,
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
      this.$refs.veStuGraduationXuhaoTable.reload();
    },
    /**
     * @msg: 新增事件
     */
    handleCreate() {
      this.showType = "edit";
      this.$nextTick(() => {
        this.$refs.veStuGraduationXuhaoEdit.doCreate();
      });
    },
    /**
     * @msg: 编辑行事件
     */
    handleUpdate(row) {
      this.showType = "edit";
      this.$nextTick(() => {
        this.$refs.veStuGraduationXuhaoEdit.doUpdate(row);
      });
    },
    /**
     * @msg: 编辑行事件
     */
    toDetail(row) {
      this.showType = "show";
      this.$nextTick(() => {
        this.$refs.veStuGraduationXuhaoShow.doShow(row);
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
      this.$refs.veStuGraduationXuhaoTable.reload();
    },
  }
};
</script>
<style lang="less" scoped>

</style>