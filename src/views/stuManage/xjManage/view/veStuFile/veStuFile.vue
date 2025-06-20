<template>
    <edu-layout type="table">
      <!-- 表格 -->
      <div slot="table" class="right_table">
        <div>
          <edu-query
            ref="cwQuery"
            code="veStuFile"
            :do-filter="handleFilter"
          >
            <template slot="search">
                <edu-query-item title="这里要改一下" pname="NAME" pop="like" stype="input"> </edu-query-item>
                <edu-query-item title="这里要改一下" pname="TITLE" pop="like" stype="input"> </edu-query-item>
            </template>
          </edu-query>
          <edu-table
            ref="veStuFileTable"
            code="veStuFile"
            :api="veStuFileTable.api"
            :get-params="getParams"
            :exportConfig="{
              url: 'veStuFile/export',
              name: '《导出》'
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
                      <a-table-column title="扩展名" dataIndex="ext" width="150px">
            </a-table-column>
                        <a-table-column title="名称" dataIndex="name" width="150px">
            </a-table-column>
                        <a-table-column title="文件名" dataIndex="fileName" width="150px">
            </a-table-column>
                        <a-table-column title="路径" dataIndex="path" width="150px">
            </a-table-column>
                        <a-table-column title="保存路径 0  本地 1 阿里云" dataIndex="saveType" width="150px">
            </a-table-column>
                        <a-table-column title="业务ID" dataIndex="serviceId" width="150px">
            </a-table-column>
                        <a-table-column title="业务类型" dataIndex="serviceType" width="150px">
            </a-table-column>
                      </edu-table>
        </div>
        <!-- 编辑页 -->
        <veStuFileEdit v-if="showType=='edit'" ref="veStuFileEdit" @onOk="editOk" @onCancel="editCancel"> </veStuFileEdit>
        <veStuFileShow v-if="showType=='show'" ref="veStuFileShow" @onOk="editOk" @onCancel="editCancel"> </veStuFileShow>
      </div>
    </edu-layout>
</template>

<script>
import veStuFileApi from "@/views/stuManage/xjManage/api/veStuFileApi";
import veStuFileEdit from "./veStuFileEdit";
import veStuFileShow from "./veStuFileShow";

export default {
  components: {
    veStuFileEdit,
    veStuFileShow
  },
  data() {
    const data = {
      veStuFileQuery: {},
      showType: "table",
    };
    data.veStuFileTable = {
      api: veStuFileApi,
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
      this.$refs.veStuFileTable.reload();
    },
    /**
     * @msg: 新增事件
     */
    handleCreate() {
      this.showType = "edit";
      this.$nextTick(() => {
        this.$refs.veStuFileEdit.doCreate();
      });
    },
    /**
     * @msg: 编辑行事件
     */
    handleUpdate(row) {
      this.showType = "edit";
      this.$nextTick(() => {
        this.$refs.veStuFileEdit.doUpdate(row);
      });
    },
    /**
     * @msg: 编辑行事件
     */
    toDetail(row) {
      this.showType = "show";
      this.$nextTick(() => {
        this.$refs.veStuFileShow.doShow(row);
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
      this.$refs.veStuFileTable.reload();
    },
  }
};
</script>
<style lang="less" scoped>

</style>