<template>
    <edu-layout type="table">
      <!-- 表格 -->
      <div slot="table" class="right_table">
        <div>
          <edu-query
            ref="cwQuery"
            code="veStuCaucusUser"
            :do-filter="handleFilter"
          >
            <template slot="search">
                <edu-query-item title="这里要改一下" pname="name" pop="like" stype="input"> </edu-query-item>
                <edu-query-item title="这里要改一下" pname="title" pop="like" stype="input"> </edu-query-item>
            </template>
          </edu-query>
          <edu-table
            ref="veStuCaucusUserTable"
            code="veStuCaucusUser"
            :api="veStuCaucusUserTable.api"
            :get-params="getParams"
            :exportConfig="{
              url: 'veStuCaucusUser/export',
              name: '《党团活动学生关联表导出》'
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
                        <a-table-column title="活动Id" dataIndex="cId" width="150px">
            </a-table-column>
                      </edu-table>
        </div>
        <!-- 编辑页 -->
        <veStuCaucusUserEdit v-if="showType=='edit'" ref="veStuCaucusUserEdit" @onOk="editOk" @onCancel="editCancel"> </veStuCaucusUserEdit>
        <veStuCaucusUserShow v-if="showType=='show'" ref="veStuCaucusUserShow" @onOk="editOk" @onCancel="editCancel"> </veStuCaucusUserShow>
      </div>
    </edu-layout>
</template>

<script>
import veStuCaucusUserApi from "../../api/veStuCaucusUserApi";
import veStuCaucusUserEdit from "./veStuCaucusUserEdit";
import veStuCaucusUserShow from "./veStuCaucusUserShow";

export default {
  components: {
    veStuCaucusUserEdit,
    veStuCaucusUserShow
  },
  data() {
    const data = {
      veStuCaucusUserQuery: {},
      showType: "table",
    };
    data.veStuCaucusUserTable = {
      api: veStuCaucusUserApi,
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
      this.$refs.veStuCaucusUserTable.reload();
    },
    /**
     * @msg: 新增事件
     */
    handleCreate() {
      this.showType = "edit";
      this.$nextTick(() => {
        this.$refs.veStuCaucusUserEdit.doCreate();
      });
    },
    /**
     * @msg: 编辑行事件
     */
    handleUpdate(row) {
      this.showType = "edit";
      this.$nextTick(() => {
        this.$refs.veStuCaucusUserEdit.doUpdate(row);
      });
    },
    /**
     * @msg: 编辑行事件
     */
    toDetail(row) {
      this.showType = "show";
      this.$nextTick(() => {
        this.$refs.veStuCaucusUserShow.doShow(row);
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
      this.$refs.veStuCaucusUserTable.reload();
    },
  }
};
</script>
<style lang="less" scoped>

</style>