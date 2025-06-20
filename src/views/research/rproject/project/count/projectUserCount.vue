<template>
  <!-- 表格 -->
  <div class="right_table">
    <div>
      <edu-query ref="cwQuery" code="veJkyUser" :do-filter="handleFilter">
        <template slot="search">
          <edu-query-item title="姓名" pname="d.realname" pop="like" stype="input"> </edu-query-item>
        </template>
      </edu-query>
      <edu-table
        ref="veJkyUserTable"
        code="veJkyUser"
        :api="veJkyUserTable.api"
        :get-params="getParams"
        :toDetail="toDetail"
        :exportConfig="{
          url: 'veJkyProject/countProjectUserExport',
          name: '《项目统计导出表》'
        }"
        :config="{
          pageFn: 'countProjectUser',
          open: false,
          close: false,
          status: false,
          bdelete: false,
          delete: false,
          checkBox: false
        }"
        :doExport="doExport"
      >
        <!--         <template slot-scope="text, record, index">
       <span></span>
       </template>-->
        <a-table-column title="姓名" dataIndex="realname" width="150px"> </a-table-column>
        <a-table-column title="毕业院校" dataIndex="graCollege" width="150px"> </a-table-column>
        <a-table-column title="学历" dataIndex="educate" width="150px">
          <template slot-scope="text">
            <edu-dict-text code="xueli" :value="text"></edu-dict-text>
          </template>
        </a-table-column>
        <a-table-column title="职称" dataIndex="proCall" width="150px">
          <template slot-scope="text">
            <edu-dict-text code="zhichen" :value="text"></edu-dict-text>
          </template>
        </a-table-column>
        <a-table-column title="科研方向" dataIndex="direction" width="200px"> </a-table-column>
        <a-table-column title="参与项目个数" dataIndex="projectNum" width="150px"> </a-table-column>
        <a-table-column title="项目成果个数" dataIndex="fruitNum" width="150px"> </a-table-column>
        <a-table-column title="工作个数" dataIndex="workNums" width="150px"> </a-table-column>
      </edu-table>
    </div>
    <!-- 编辑页 -->
    <projectUserCountShow v-if="showType == 'show'" ref="projectUserCountShow" @onOk="editOk" @onCancel="editCancel"> </projectUserCountShow>
  </div>
</template>

<script>
import veJkyProjectApi from '@/api/research/rproject/veJkyProjectApi';
import projectUserCountShow from './projectUserCountShow';

export default {
  components: {
    projectUserCountShow
  },
  data() {
    const data = {
      veJkyUserQuery: {},
      showType: 'table'
    };
    data.veJkyUserTable = {
      api: veJkyProjectApi
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 表格获取请求数据 必须return 一个对象
     */
    getParams() {
      var params = this.$refs['cwQuery'].getQueryData();
      return params;
    },
    /**
     * @msg: 搜索事件
     */
    handleFilter() {
      this.$refs.veJkyUserTable.reload();
    },
    doExport() {},
    /**
     * @msg: 编辑行事件
     */
    toDetail(row) {
      this.showType = 'show';
      this.$nextTick(() => {
        this.$refs.projectUserCountShow.doShow(row);
      });
    },
    /**
     * @msg: 编辑页取消事件
     */
    editCancel() {
      this.showType = 'table';
    },
    /**
     * @msg: 编辑页成功事件
     */
    editOk() {
      this.showType = 'table';
      this.$refs.veJkyUserTable.reload();
    }
  }
};
</script>
<style lang="less" scoped></style>
