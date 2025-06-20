<template>
    <edu-layout type="table">
      <!-- 表格 -->
      <div slot="table" class="right_table">
        <div>
          <edu-query
            ref="cwQuery"
            code="veStuEvaluationCaoxing"
            :do-filter="handleFilter"
          >
            <template slot="search">
                <edu-query-item title="这里要改一下" pname="NAME" pop="like" stype="input"> </edu-query-item>
                <edu-query-item title="这里要改一下" pname="TITLE" pop="like" stype="input"> </edu-query-item>
            </template>
          </edu-query>
          <edu-table
            ref="veStuEvaluationCaoxingTable"
            code="veStuEvaluationCaoxing"
            :api="veStuEvaluationCaoxingTable.api"
            :get-params="getParams"
            :exportConfig="{
              url: 'veStuEvaluationCaoxing/export',
              name: '《操行评分导出》'
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
                      <a-table-column title="" dataIndex="semesterId" width="150px">
            </a-table-column>
                        <a-table-column title="" dataIndex="stuId" width="150px">
            </a-table-column>
                        <a-table-column title="" dataIndex="score" width="150px">
            </a-table-column>
                      </edu-table>
        </div>
        <!-- 编辑页 -->
        <veStuEvaluationCaoxingEdit v-if="showType=='edit'" ref="veStuEvaluationCaoxingEdit" @onOk="editOk" @onCancel="editCancel"> </veStuEvaluationCaoxingEdit>
        <veStuEvaluationCaoxingShow v-if="showType=='show'" ref="veStuEvaluationCaoxingShow" @onOk="editOk" @onCancel="editCancel"> </veStuEvaluationCaoxingShow>
      </div>
    </edu-layout>
</template>

<script>
import veStuEvaluationCaoxingApi from "@/views/stuManage/jis/api/veStuEvaluationCaoxingApi";
import veStuEvaluationCaoxingEdit from "./veStuEvaluationCaoxingEdit";
import veStuEvaluationCaoxingShow from "./veStuEvaluationCaoxingShow";

export default {
  components: {
    veStuEvaluationCaoxingEdit,
    veStuEvaluationCaoxingShow
  },
  data() {
    const data = {
      veStuEvaluationCaoxingQuery: {},
      showType: "table",
    };
    data.veStuEvaluationCaoxingTable = {
      api: veStuEvaluationCaoxingApi,
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
      this.$refs.veStuEvaluationCaoxingTable.reload();
    },
    /**
     * @msg: 新增事件
     */
    handleCreate() {
      this.showType = "edit";
      this.$nextTick(() => {
        this.$refs.veStuEvaluationCaoxingEdit.doCreate();
      });
    },
    /**
     * @msg: 编辑行事件
     */
    handleUpdate(row) {
      this.showType = "edit";
      this.$nextTick(() => {
        this.$refs.veStuEvaluationCaoxingEdit.doUpdate(row);
      });
    },
    /**
     * @msg: 编辑行事件
     */
    toDetail(row) {
      this.showType = "show";
      this.$nextTick(() => {
        this.$refs.veStuEvaluationCaoxingShow.doShow(row);
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
      this.$refs.veStuEvaluationCaoxingTable.reload();
    },
  }
};
</script>
<style lang="less" scoped>

</style>