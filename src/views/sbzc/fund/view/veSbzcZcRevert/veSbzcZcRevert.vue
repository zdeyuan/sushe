<template>
    <edu-layout type="table">
        <!-- 表格 -->
        <div slot="table" class="right_table">
            <div>
                <edu-query
                        ref="cwQuery"
                        code="veSbzcZcRevert"
                        :do-filter="handleFilter"
                >
                    <template slot="search">
                        <edu-query-item title="资产编号" pname="ASSET_CODE" pop="like" stype="input"></edu-query-item>
                        <edu-query-item title="资产名称" pname="ASSET_NAME" pop="like" stype="input"></edu-query-item>
                    </template>
                </edu-query>
                <edu-table
                        ref="veSbzcZcRevertTable"
                        code="veSbzcZcRevert"
                        :api="veSbzcZcRevertTable.api"
                        :get-params="getParams"
                        :exportConfig="{
                          url: 'veSbzcZcRevert/export',
                          name: '《设备资产归还表导出》'
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
                    <a-table-column title="归还人姓名" dataIndex="revertUserName" width="150px">
                    </a-table-column>
                    <a-table-column title="批准人姓名" dataIndex="checkUserName" width="150px">
                    </a-table-column>
                    <a-table-column title="归还时间" dataIndex="revertTime" width="150px">
                    </a-table-column>
                </edu-table>
            </div>
            <!-- 编辑页 -->
            <veSbzcZcRevertEdit v-if="showType=='edit'" ref="veSbzcZcRevertEdit" @onOk="editOk"
                                @onCancel="editCancel"></veSbzcZcRevertEdit>
            <veSbzcZcRevertShow v-if="showType=='show'" ref="veSbzcZcRevertShow" @onOk="editOk"
                                @onCancel="editCancel"></veSbzcZcRevertShow>
        </div>
    </edu-layout>
</template>

<script>
  import veSbzcZcRevertApi from '@/views/sbzc/fund/api/veSbzcZcRevertApi';
  import veSbzcZcRevertEdit from './veSbzcZcRevertEdit';
  import veSbzcZcRevertShow from './veSbzcZcRevertShow';

  export default {
    components: {
      veSbzcZcRevertEdit,
      veSbzcZcRevertShow
    },
    data() {
      const data = {
        veSbzcZcRevertQuery: {},
        showType: 'table'
      };
      data.veSbzcZcRevertTable = {
        api: veSbzcZcRevertApi
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
        this.$refs.veSbzcZcRevertTable.reload();
      },
      /**
       * @msg: 新增事件
       */
      handleCreate() {
        this.showType = 'edit';
        this.$nextTick(() => {
          this.$refs.veSbzcZcRevertEdit.doCreate();
        });
      },
      /**
       * @msg: 编辑行事件
       */
      handleUpdate(row) {
        this.showType = 'edit';
        this.$nextTick(() => {
          this.$refs.veSbzcZcRevertEdit.doUpdate(row);
        });
      },
      /**
       * @msg: 编辑行事件
       */
      toDetail(row) {
        this.showType = 'show';
        this.$nextTick(() => {
          this.$refs.veSbzcZcRevertShow.doShow(row);
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
        this.$refs.veSbzcZcRevertTable.reload();
      }
    }
  };
</script>
<style lang="less" scoped>

</style>