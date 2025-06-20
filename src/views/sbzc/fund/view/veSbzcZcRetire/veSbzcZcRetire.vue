<template>
    <edu-layout type="table">
        <!-- 表格 -->
        <div slot="table" class="right_table">
            <div>
                <edu-query
                        ref="cwQuery"
                        code="veSbzcZcRetire"
                        :do-filter="handleFilter"
                >
                    <template slot="search">
                        <edu-query-item title="资产编号" pname="ASSET_CODE" pop="like" stype="input"></edu-query-item>
                        <edu-query-item title="资产名称" pname="ASSET_NAME" pop="like" stype="input"></edu-query-item>
                    </template>
                </edu-query>
                <edu-table
                        ref="veSbzcZcRetireTable"
                        code="veSbzcZcRetire"
                        :api="veSbzcZcRetireTable.api"
                        :get-params="getParams"
                        :exportConfig="{
                          url: 'veSbzcZcRetire/export',
                          name: '《设备资产报废表导出》'
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
                    <a-table-column title="报废申请人" dataIndex="retireUserName" width="150px">
                    </a-table-column>
                    <a-table-column title="批准人" dataIndex="checkUserName" width="150px">
                    </a-table-column>
                    <a-table-column title="报废日期" dataIndex="retireDate" width="150px">
                    </a-table-column>
                </edu-table>
            </div>
            <!-- 编辑页 -->
            <veSbzcZcRetireShow v-if="showType=='show'" ref="veSbzcZcRetireShow" @onOk="editOk"
                                @onCancel="editCancel"></veSbzcZcRetireShow>
        </div>
    </edu-layout>
</template>

<script>
  import veSbzcZcRetireApi from '@/views/sbzc/fund/api/veSbzcZcRetireApi';
  import veSbzcZcRetireEdit from './veSbzcZcRetireEdit';
  import veSbzcZcRetireShow from './veSbzcZcRetireShow';

  export default {
    components: {
      veSbzcZcRetireEdit,
      veSbzcZcRetireShow
    },
    data() {
      const data = {
        veSbzcZcRetireQuery: {},
        showType: 'table'
      };
      data.veSbzcZcRetireTable = {
        api: veSbzcZcRetireApi
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
        this.$refs.veSbzcZcRetireTable.reload();
      },
      /**
       * @msg: 新增事件
       */
      handleCreate() {
        this.showType = 'edit';
        this.$nextTick(() => {
          this.$refs.veSbzcZcRetireEdit.doCreate();
        });
      },
      /**
       * @msg: 编辑行事件
       */
      handleUpdate(row) {
        this.showType = 'edit';
        this.$nextTick(() => {
          this.$refs.veSbzcZcRetireEdit.doUpdate(row);
        });
      },
      /**
       * @msg: 编辑行事件
       */
      toDetail(row) {
        this.showType = 'show';
        this.$nextTick(() => {
          this.$refs.veSbzcZcRetireShow.doShow(row);
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
        this.$refs.veSbzcZcRetireTable.reload();
      }
    }
  };
</script>
<style lang="less" scoped>

</style>