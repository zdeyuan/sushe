<template>
    <edu-layout type="table">
        <!-- 表格 -->
        <div slot="table" class="right_table">
            <div>
                <edu-query
                        ref="cwQuery"
                        code="veSbzcZcAllocate"
                        :do-filter="handleFilter"
                >
                    <template slot="search">
                        <edu-query-item title="资产编号" pname="ASSET_CODE" pop="like" stype="input"></edu-query-item>
                        <edu-query-item title="资产名称" pname="ASSET_NAME" pop="like" stype="input"></edu-query-item>
                    </template>
                </edu-query>
                <edu-table
                        ref="veSbzcZcAllocateTable"
                        code="veSbzcZcAllocate"
                        :api="veSbzcZcAllocateTable.api"
                        :get-params="getParams"
                        :exportConfig="{
                          url: 'veSbzcZcAllocate/export',
                          name: '《设备资产调拨表导出》'
                        }"
                        :config="{
                          showNo: false, open: false, close: false, delete: false, checkBox: false, status: false
                        }"
                        :toDetail="toDetail"
                >
                    <!--         <template slot-scope="text, record, index">
               <span></span>
               </template>-->
                    <a-table-column title="资产编号" dataIndex="assetCode" width="150px">
                    </a-table-column>
                    <a-table-column title="资产名称" dataIndex="assetName" align="center">
                    </a-table-column>
                    <a-table-column title="所属部门" dataIndex="deptOwn" width="150px">
                    </a-table-column>
                    <a-table-column title="批准人" dataIndex="checkUserName" width="150px">
                    </a-table-column>
                    <a-table-column title="现在所属部门" dataIndex="allocateDept" width="150px">
                    </a-table-column>
                    <a-table-column title="调拨日期" dataIndex="allocateDate" width="150px">
                    </a-table-column>
                </edu-table>
            </div>
            <!-- 编辑页 -->
            <veSbzcZcAllocateEdit v-if="showType=='edit'" ref="veSbzcZcAllocateEdit" @onOk="editOk"
                                  @onCancel="editCancel"></veSbzcZcAllocateEdit>
            <veSbzcZcAllocateShow v-if="showType=='show'" ref="veSbzcZcAllocateShow" @onOk="editOk"
                                  @onCancel="editCancel"></veSbzcZcAllocateShow>
        </div>
    </edu-layout>
</template>

<script>
  import veSbzcZcAllocateApi from '@/views/sbzc/fund/api/veSbzcZcAllocateApi';
  import veSbzcZcAllocateEdit from './veSbzcZcAllocateEdit';
  import veSbzcZcAllocateShow from './veSbzcZcAllocateShow';

  export default {
    components: {
      veSbzcZcAllocateEdit,
      veSbzcZcAllocateShow
    },
    data() {
      const data = {
        veSbzcZcAllocateQuery: {},
        showType: 'table'
      };
      data.veSbzcZcAllocateTable = {
        api: veSbzcZcAllocateApi
      };
      return data;
    },
    mounted() {
    },
    methods: {
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
        this.$refs.veSbzcZcAllocateTable.reload();
      },
      /**
       * @msg: 新增事件
       */
      handleCreate() {
        this.showType = 'edit';
        this.$nextTick(() => {
          this.$refs.veSbzcZcAllocateEdit.doCreate();
        });
      },
      /**
       * @msg: 编辑行事件
       */
      handleUpdate(row) {
        this.showType = 'edit';
        this.$nextTick(() => {
          this.$refs.veSbzcZcAllocateEdit.doUpdate(row);
        });
      },
      /**
       * @msg: 编辑行事件
       */
      toDetail(row) {
        this.showType = 'show';
        this.$nextTick(() => {
          this.$refs.veSbzcZcAllocateShow.doShow(row);
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
        this.$refs.veSbzcZcAllocateTable.reload();
      }
    }
  };
</script>
<style lang="less" scoped>

</style>