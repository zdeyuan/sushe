<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-02-16 01:34:00
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-02-27 21:51:15
-->
<template>
  <!-- 表格 -->
  <div class="right_table">
    <div>
      <edu-query ref="cwQuery" code="veJkyProject" :do-filter="handleFilter">
        <template slot="search">
          <edu-query-item title="分类名称" pname="name" pop="like" stype="input"> </edu-query-item>
        </template>
      </edu-query>
      <edu-table
        ref="veJkyProjectTable"
        code="veJkyProject"
        :api="veJkyProjectTable.api"
        :get-params="getParams"
        :exportConfig="{
          url: 'veJkyGain/countCateExport',
          name: '《成果分类统计导出》'
        }"
        isAutoBtn
        :config="{
          pageFn: 'countCate',
          open: false,
          close: false,
          bdelete: false,
          status: false,
          checkBox: false
        }"
      >
        <a-table-column title="分类名称" dataIndex="name" width="150px"> </a-table-column>
        <a-table-column title="成果数量" dataIndex="num" width="150px"> </a-table-column>
      </edu-table>
    </div>
    <!-- 编辑页 -->
  </div>
</template>

<script>
import veJkyGainApi from '@/api/research/rproject/veJkyGainApi';

export default {
  components: {},
  data() {
    const data = {
      veJkyProjectQuery: {},
      showType: 'table'
    };
    data.veJkyProjectTable = {
      api: veJkyGainApi
    };
    return data;
  },
  mounted() {},
  methods: {
    doExport() {},
    /**
     * @msg: 表格获取请求数据 必须return 一个对象
     */
    getParams() {
      const params = this.$refs['cwQuery'].getQueryData();
      this.$utils.addPageConditions(params, 'status', 'eq', 1);
      return params;
    },
    /**
     * @msg: 搜索事件
     */
    handleFilter() {
      this.$refs.veJkyProjectTable.reload();
    }
  }
};
</script>
<style lang="less" scoped></style>
