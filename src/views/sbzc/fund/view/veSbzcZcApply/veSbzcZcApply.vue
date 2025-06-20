<template>
    <edu-layout type="table">
        <!-- 表格 -->
        <div slot="table" class="right_table">
            <div>
                <edu-query
                        ref="cwQuery"
                        code="veSbzcZcApply"
                        :do-filter="handleFilter"
                >
                    <template slot="search">
                        <edu-query-item title="资产编号" pname="ASSET_CODE" pop="like" stype="input"></edu-query-item>
                        <edu-query-item title="资产名称" pname="ASSET_NAME" pop="like" stype="input"></edu-query-item>
                    </template>
                </edu-query>
                <edu-table
                        ref="veSbzcZcApplyTable"
                        code="veSbzcZcApply"
                        :api="veSbzcZcApplyTable.api"
                        :get-params="getParams"
                        :exportConfig="{
                          url: 'veSbzcZcApply/export',
                          name: '《设备资产借领表导出》'
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
                    <a-table-column title="资产名称" dataIndex="assetName" align="center" width="150px">
                    </a-table-column>
                    <a-table-column title="所属部门" dataIndex="deptOwn" width="150px">
                    </a-table-column>
                    <a-table-column title="借领性质" dataIndex="applyFor" width="150px">
                        <template slot-scope="text">
                            <edu-dict-text code="applyFor" :value="text"></edu-dict-text>
                        </template>
                    </a-table-column>
                    <a-table-column title="借领人" dataIndex="applyUserName" width="100px">
                    </a-table-column>
                    <a-table-column title="批准人" dataIndex="checkUserName" width="100px">
                    </a-table-column>
                    <a-table-column title="借领时间" dataIndex="applyTime" width="150px">
                    </a-table-column>
                    <a-table-column title="是否归还" dataIndex="isRevert" width="100px">
                        <template slot-scope="text">
                            <edu-dict-text code="revertStatus" :value="text"></edu-dict-text>
                        </template>
                    </a-table-column>
                    <a-table-column title="归还时间" dataIndex="revertTime" width="150px">
                    </a-table-column>
                    <template slot="af_btn" slot-scope="{ row }">
                        <edu-pms :code="'aaa'" name="归还" ext="tdo" type="success" size="mini" @click="doRevert(row)"> </edu-pms>
                    </template>
                </edu-table>
            </div>
            <!-- 编辑页 -->
            <veSbzcZcApplyEdit v-if="showType=='edit'" ref="veSbzcZcApplyEdit" @onOk="editOk"
                               @onCancel="editCancel"></veSbzcZcApplyEdit>
            <veSbzcZcApplyShow v-if="showType=='show'" ref="veSbzcZcApplyShow" @onOk="editOk"
                               @onCancel="editCancel"></veSbzcZcApplyShow>
            <ve-sbzc-zc-revert-edit v-if="showType=='revert'" ref="veSbzcZcRevertEdit" @onOk="editOk"
                                    @onCancel="editCancel"></ve-sbzc-zc-revert-edit>
        </div>
    </edu-layout>
</template>

<script>
  import veSbzcZcApplyApi from '@/views/sbzc/fund/api/veSbzcZcApplyApi';
  import veSbzcZcApplyEdit from './veSbzcZcApplyEdit';
  import veSbzcZcApplyShow from './veSbzcZcApplyShow';
  import veSbzcZcRevertEdit from '../veSbzcZcRevert/veSbzcZcRevertEdit';

  export default {
    components: {
      veSbzcZcApplyEdit,
      veSbzcZcApplyShow,
      veSbzcZcRevertEdit
    },
    data() {
      const data = {
        veSbzcZcApplyQuery: {},
        showType: 'table'
      };
      data.veSbzcZcApplyTable = {
        api: veSbzcZcApplyApi
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
        this.$refs.veSbzcZcApplyTable.reload();
      },
      /**
       * @msg: 新增事件
       */
      handleCreate() {
        this.showType = 'edit';
        this.$nextTick(() => {
          this.$refs.veSbzcZcApplyEdit.doCreate();
        });
      },
      /**
       * @msg: 编辑行事件
       */
      handleUpdate(row) {
        this.showType = 'edit';
        this.$nextTick(() => {
          this.$refs.veSbzcZcApplyEdit.doUpdate(row);
        });
      },
      /**
       * @msg: 编辑行事件
       */
      toDetail(row) {
        this.showType = 'show';
        this.$nextTick(() => {
          this.$refs.veSbzcZcApplyShow.doShow(row);
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
        this.$refs.veSbzcZcApplyTable.reload();
      },
      /**
       * @msg:归还
       */
      doRevert(row) {
        this.showType = 'revert';
        this.$nextTick(() => {
          this.$refs.veSbzcZcRevertEdit.doCreate(row);
        });
      },
    }
  };
</script>
<style lang="less" scoped>

</style>