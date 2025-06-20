<template>
    <edu-layout type="table">
      <!-- 表格 -->
      <div slot="table" class="right_table">
        <div>
          <edu-query
            ref="cwQuery"
            code="veStuGraduationJyzbhRule"
            :do-filter="handleFilter"
          >
            <template slot="search">
                <edu-query-item title="这里要改一下" pname="NAME" pop="like" stype="input"> </edu-query-item>
                <edu-query-item title="这里要改一下" pname="TITLE" pop="like" stype="input"> </edu-query-item>
            </template>
          </edu-query>
          <edu-table
            ref="veStuGraduationJyzbhRuleTable"
            code="veStuGraduationJyzbhRule"
            :api="veStuGraduationJyzbhRuleTable.api"
            :get-params="getParams"
            :exportConfig="{
              url: 'veStuGraduationJyzbhRule/export',
              name: '《结业证生成规则表导出》'
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
                      <a-table-column title="规则名称" dataIndex="name" width="150px">
            </a-table-column>
                        <a-table-column title="规则编码：year=年份（默认4位），zy=专业（默认按学生所属专业代码），bj=班级（默认按学生所属班级代码），number=流水号（默认4位）" dataIndex="code" width="150px">
            </a-table-column>
                        <a-table-column title="位数" dataIndex="digit" width="150px">
            </a-table-column>
                        <a-table-column title="规则编码序号从小到大" dataIndex="listSort" width="150px">
            </a-table-column>
                        <a-table-column title="是否启用1是0否" dataIndex="status" width="150px">
            </a-table-column>
                      </edu-table>
        </div>
        <!-- 编辑页 -->
        <veStuGraduationJyzbhRuleEdit v-if="showType=='edit'" ref="veStuGraduationJyzbhRuleEdit" @onOk="editOk" @onCancel="editCancel"> </veStuGraduationJyzbhRuleEdit>
        <veStuGraduationJyzbhRuleShow v-if="showType=='show'" ref="veStuGraduationJyzbhRuleShow" @onOk="editOk" @onCancel="editCancel"> </veStuGraduationJyzbhRuleShow>
      </div>
    </edu-layout>
</template>

<script>
import veStuGraduationJyzbhRuleApi from "@/views/stuManage/biye/api/veStuGraduationJyzbhRuleApi";
import veStuGraduationJyzbhRuleEdit from "./veStuGraduationJyzbhRuleEdit";
import veStuGraduationJyzbhRuleShow from "./veStuGraduationJyzbhRuleShow";

export default {
  components: {
    veStuGraduationJyzbhRuleEdit,
    veStuGraduationJyzbhRuleShow
  },
  data() {
    const data = {
      veStuGraduationJyzbhRuleQuery: {},
      showType: "table",
    };
    data.veStuGraduationJyzbhRuleTable = {
      api: veStuGraduationJyzbhRuleApi,
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
      this.$refs.veStuGraduationJyzbhRuleTable.reload();
    },
    /**
     * @msg: 新增事件
     */
    handleCreate() {
      this.showType = "edit";
      this.$nextTick(() => {
        this.$refs.veStuGraduationJyzbhRuleEdit.doCreate();
      });
    },
    /**
     * @msg: 编辑行事件
     */
    handleUpdate(row) {
      this.showType = "edit";
      this.$nextTick(() => {
        this.$refs.veStuGraduationJyzbhRuleEdit.doUpdate(row);
      });
    },
    /**
     * @msg: 编辑行事件
     */
    toDetail(row) {
      this.showType = "show";
      this.$nextTick(() => {
        this.$refs.veStuGraduationJyzbhRuleShow.doShow(row);
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
      this.$refs.veStuGraduationJyzbhRuleTable.reload();
    },
  }
};
</script>
<style lang="less" scoped>

</style>