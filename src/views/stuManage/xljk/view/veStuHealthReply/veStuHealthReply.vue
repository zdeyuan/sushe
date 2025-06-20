<template>
    <edu-layout type="table">
      <!-- 表格 -->
      <div slot="table" class="right_table">
        <div>
          <edu-query
            ref="cwQuery"
            code="veStuHealthReply"
            :do-filter="handleFilter"
          >
            <template slot="search">
                <edu-query-item title="这里要改一下" pname="NAME" pop="like" stype="input"> </edu-query-item>
                <edu-query-item title="这里要改一下" pname="TITLE" pop="like" stype="input"> </edu-query-item>
            </template>
          </edu-query>
          <edu-table
            ref="veStuHealthReplyTable"
            code="veStuHealthReply"
            :api="veStuHealthReplyTable.api"
            :get-params="getParams"
            :exportConfig="{
              url: 'veStuHealthReply/export',
              name: '《保险理赔咨询回复表导出》'
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
                      <a-table-column title="回复内容" dataIndex="answer" width="150px">
            </a-table-column>
                        <a-table-column title="咨询内容Id" dataIndex="aId" width="150px">
            </a-table-column>
                        <a-table-column title="回复人Id" dataIndex="answerUserId" width="150px">
            </a-table-column>
                        <a-table-column title="" dataIndex="answerUserName" width="150px">
            </a-table-column>
                        <a-table-column title="回复时间" dataIndex="answerTime" width="150px">
            </a-table-column>
                      </edu-table>
        </div>
        <!-- 编辑页 -->
        <veStuHealthReplyEdit v-if="showType=='edit'" ref="veStuHealthReplyEdit" @onOk="editOk" @onCancel="editCancel"> </veStuHealthReplyEdit>
        <veStuHealthReplyShow v-if="showType=='show'" ref="veStuHealthReplyShow" @onOk="editOk" @onCancel="editCancel"> </veStuHealthReplyShow>
      </div>
    </edu-layout>
</template>

<script>
import veStuHealthReplyApi from "../../api/veStuHealthReplyApi";
import veStuHealthReplyEdit from "./veStuHealthReplyEdit";
import veStuHealthReplyShow from "./veStuHealthReplyShow";

export default {
  components: {
    veStuHealthReplyEdit,
    veStuHealthReplyShow
  },
  data() {
    const data = {
      veStuHealthReplyQuery: {},
      showType: "table",
    };
    data.veStuHealthReplyTable = {
      api: veStuHealthReplyApi,
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
      this.$refs.veStuHealthReplyTable.reload();
    },
    /**
     * @msg: 新增事件
     */
    handleCreate() {
      this.showType = "edit";
      this.$nextTick(() => {
        this.$refs.veStuHealthReplyEdit.doCreate();
      });
    },
    /**
     * @msg: 编辑行事件
     */
    handleUpdate(row) {
      this.showType = "edit";
      this.$nextTick(() => {
        this.$refs.veStuHealthReplyEdit.doUpdate(row);
      });
    },
    /**
     * @msg: 编辑行事件
     */
    toDetail(row) {
      this.showType = "show";
      this.$nextTick(() => {
        this.$refs.veStuHealthReplyShow.doShow(row);
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
      this.$refs.veStuHealthReplyTable.reload();
    },
  }
};
</script>
<style lang="less" scoped>

</style>