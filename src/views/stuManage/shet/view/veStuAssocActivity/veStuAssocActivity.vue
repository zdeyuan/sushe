<template>
    <edu-layout type="table">
      <!-- 表格 -->
      <div slot="table" class="right_table">
        <div>
          <edu-query
            ref="cwQuery"
            code="veStuAssocActivity"
            :do-filter="handleFilter"
          >
            <template slot="search">
                <edu-query-item title="这里要改一下" pname="NAME" pop="like" stype="input"> </edu-query-item>
                <edu-query-item title="这里要改一下" pname="TITLE" pop="like" stype="input"> </edu-query-item>
            </template>
          </edu-query>
          <edu-table
            ref="veStuAssocActivityTable"
            code="veStuAssocActivity"
            :api="veStuAssocActivityTable.api"
            :get-params="getParams"
            :exportConfig="{
              url: 'veStuAssocActivity/export',
              name: '《社团活动导出》'
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
                        <a-table-column title="活动类型id" dataIndex="typeId" width="150px">
            </a-table-column>
                        <a-table-column title="活动主题" dataIndex="theme" width="150px">
            </a-table-column>
                        <a-table-column title="活动开始时间" dataIndex="startTime" width="150px">
            </a-table-column>
                        <a-table-column title="活动结束时间" dataIndex="endTime" width="150px">
            </a-table-column>
                        <a-table-column title="活动地点" dataIndex="place" width="150px">
            </a-table-column>
                        <a-table-column title="活动费用" dataIndex="price" width="150px">
            </a-table-column>
                        <a-table-column title="活动介绍" dataIndex="intro" width="150px">
            </a-table-column>
                        <a-table-column title="添加学生id" dataIndex="addStuId" width="150px">
            </a-table-column>
                        <a-table-column title="" dataIndex="addStuName" width="150px">
            </a-table-column>
                        <a-table-column title="添加时间" dataIndex="addTime" width="150px">
            </a-table-column>
                        <a-table-column title="活动查看次数" dataIndex="viewCount" width="150px">
            </a-table-column>
                      </edu-table>
        </div>
        <!-- 编辑页 -->
        <veStuAssocActivityEdit v-if="showType=='edit'" ref="veStuAssocActivityEdit" @onOk="editOk" @onCancel="editCancel"> </veStuAssocActivityEdit>
        <veStuAssocActivityShow v-if="showType=='show'" ref="veStuAssocActivityShow" @onOk="editOk" @onCancel="editCancel"> </veStuAssocActivityShow>
      </div>
    </edu-layout>
</template>

<script>
import veStuAssocActivityApi from "@/views/stuManage/shet/api/veStuAssocActivityApi";
import veStuAssocActivityEdit from "./veStuAssocActivityEdit";
import veStuAssocActivityShow from "./veStuAssocActivityShow";

export default {
  components: {
    veStuAssocActivityEdit,
    veStuAssocActivityShow
  },
  data() {
    const data = {
      veStuAssocActivityQuery: {},
      showType: "table",
    };
    data.veStuAssocActivityTable = {
      api: veStuAssocActivityApi,
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
      this.$refs.veStuAssocActivityTable.reload();
    },
    /**
     * @msg: 新增事件
     */
    handleCreate() {
      this.showType = "edit";
      this.$nextTick(() => {
        this.$refs.veStuAssocActivityEdit.doCreate();
      });
    },
    /**
     * @msg: 编辑行事件
     */
    handleUpdate(row) {
      this.showType = "edit";
      this.$nextTick(() => {
        this.$refs.veStuAssocActivityEdit.doUpdate(row);
      });
    },
    /**
     * @msg: 编辑行事件
     */
    toDetail(row) {
      this.showType = "show";
      this.$nextTick(() => {
        this.$refs.veStuAssocActivityShow.doShow(row);
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
      this.$refs.veStuAssocActivityTable.reload();
    },
  }
};
</script>
<style lang="less" scoped>

</style>