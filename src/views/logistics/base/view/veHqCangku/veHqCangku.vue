<template>
  <edu-layout type="table">
    <!-- 表格 -->
    <div slot="table" class="right_table">
      <div>
        <edu-query ref="cwQuery" code="veHqCangku" :do-filter="handleFilter">
          <template slot="search">
            <edu-query-item title="仓库名称" pname="name" pop="like" stype="input"> </edu-query-item>
            <edu-query-item title="仓库地址" pname="address" pop="like" stype="input"> </edu-query-item>
            <edu-query-item title="负责人" pname="fzr_Text" pop="like" stype="input"> </edu-query-item>
          </template>
        </edu-query>
        <edu-table
          ref="veHqCangkuTable"
          code="veHqCangku"
          :api="veHqCangkuTable.api"
          :get-params="getParams"
          :to-update="handleUpdate"
          :doImport="doImport"
          :config="{ bdelete: false }"
          :exportConfig="{
            url: 'veHqCangku/export',
            name: '《仓库导出》'
          }"
          :do-add="handleCreate"
        >
          <!--         <template slot-scope="text, record, index">
       <span></span>
       </template>-->
          <a-table-column title="仓库名称" dataIndex="name" width="150px"> </a-table-column>
          <a-table-column title="仓库地址" dataIndex="address" width="150px"> </a-table-column>
          <a-table-column title="联系电话" dataIndex="phone" width="150px"> </a-table-column>
          <a-table-column title="负责人" dataIndex="fzrText" width="150px"> </a-table-column>
        </edu-table>
      </div>
      <!-- 编辑页 -->
      <veHqCangkuEdit v-if="showType == 'edit'" ref="veHqCangkuEdit" @onOk="editOk" @onCancel="editCancel"> </veHqCangkuEdit>
    </div>
  </edu-layout>
</template>

<script>
import veHqCangkuApi from '@/views/logistics/base/api/veHqCangkuApi';
import veHqCangkuEdit from './veHqCangkuEdit';

export default {
  components: {
    veHqCangkuEdit
  },
  data() {
    const data = {
      veHqCangkuQuery: {},
      showType: 'table'
    };
    data.veHqCangkuTable = {
      api: veHqCangkuApi
    };
    return data;
  },
  mounted() {},
  methods: {
    doImport() {
      return {
        temp: ['仓库名称', '仓库地址', '负责人工号', '负责人', '联系电话', '备注'],
        tempName: '仓库',
        implName: 'veHqCangkuServiceImpl.importExcel'
      };
    },
    /**
     * @msg: 表格获取请求数据 必须return 一个对象
     */
    getParams() {
      const params = this.$refs['cwQuery'].getQueryData();
      return params;
    },
    /**
     * @msg: 搜索事件
     */
    handleFilter() {
      this.$refs.veHqCangkuTable.reload();
    },
    /**
     * @msg: 新增事件
     */
    handleCreate() {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veHqCangkuEdit.doCreate();
      });
    },
    /**
     * @msg: 编辑行事件
     */
    handleUpdate(row) {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veHqCangkuEdit.doUpdate(row);
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
      this.$refs.veHqCangkuTable.reload();
    }
  }
};
</script>
<style lang="less" scoped></style>
