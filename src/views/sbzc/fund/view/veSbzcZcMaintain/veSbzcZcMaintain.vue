<template>
    <edu-layout type="table">
        <!-- 表格 -->
        <div slot="table" class="right_table">
            <div>
                <edu-query
                        ref="cwQuery"
                        code="veSbzcZcMaintain"
                        :do-filter="handleFilter"
                >
                    <template slot="search">
                        <edu-query-item title="资产编号" pname="ASSET_CODE" pop="like" stype="input"></edu-query-item>
                        <edu-query-item title="资产名称" pname="ASSET_NAME" pop="like" stype="input"></edu-query-item>
                    </template>
                </edu-query>
                <edu-table
                        ref="veSbzcZcMaintainTable"
                        code="veSbzcZcMaintain"
                        :api="veSbzcZcMaintainTable.api"
                        :get-params="getParams"
                        :exportConfig="{
                          url: 'veSbzcZcMaintain/export',
                          name: '《设备资产维修表导出》'
                        }"
                        :config="{
                          showNo: false, open: false, close: false, delete: false, status: false
                        }"
                        :toDetail="toDetail"
                >
                    <!--         <template slot-scope="text, record, index">
               <span></span>
               </template>-->
                    <template slot="top_bef_btn">
                        <edu-pms :code="'veSbzcZcMaintain-btn-mainOver'" type="primary" iconfont="ok mini" name="维修完成" @click="mainTainOver()"></edu-pms>
                    </template>
                    <a-table-column title="资产编号" dataIndex="assetCode" width="150px">
                    </a-table-column>
                    <a-table-column title="资产名称" dataIndex="assetName" width="150px">
                    </a-table-column>
                    <a-table-column title="所属部门" dataIndex="deptOwn" width="150px">
                    </a-table-column>
                    <a-table-column title="维修部门" dataIndex="deptMaintain" width="150px">
                    </a-table-column>
                    <a-table-column title="维修状态" dataIndex="status" width="100px">
                        <template slot-scope="text">
                            <edu-dict-text code="zcWxStatus" :value="text"></edu-dict-text>
                        </template>
                    </a-table-column>
                    <a-table-column title="维修人" dataIndex="maintainUserName" width="100px">
                    </a-table-column>
                    <a-table-column title="批准人" dataIndex="checkUserName" width="100px">
                    </a-table-column>
                    <a-table-column title="维修时间" dataIndex="maintainDate" width="150px">
                    </a-table-column>
                    <a-table-column title="维修完成时间" dataIndex="maintainFinishDate" width="150px">
                    </a-table-column>
                </edu-table>
            </div>
            <!-- 编辑页 -->
            <veSbzcZcMaintainEdit v-if="showType=='edit'" ref="veSbzcZcMaintainEdit" @onOk="editOk"
                                  @onCancel="editCancel"></veSbzcZcMaintainEdit>
            <veSbzcZcMaintainShow v-if="showType=='show'" ref="veSbzcZcMaintainShow" @onOk="editOk"
                                  @onCancel="editCancel"></veSbzcZcMaintainShow>
        </div>
    </edu-layout>
</template>

<script>
  import veSbzcZcMaintainApi from '@/views/sbzc/fund/api/veSbzcZcMaintainApi';
  import veSbzcZcMaintainEdit from './veSbzcZcMaintainEdit';
  import veSbzcZcMaintainShow from './veSbzcZcMaintainShow';

  export default {
    components: {
      veSbzcZcMaintainEdit,
      veSbzcZcMaintainShow
    },
    data() {
      const data = {
        veSbzcZcMaintainQuery: {},
        showType: 'table'
      };
      data.veSbzcZcMaintainTable = {
        api: veSbzcZcMaintainApi
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
        this.$refs.veSbzcZcMaintainTable.reload();
      },
      /**
       * @msg: 新增事件
       */
      handleCreate() {
        this.showType = 'edit';
        this.$nextTick(() => {
          this.$refs.veSbzcZcMaintainEdit.doCreate();
        });
      },
      /**
       * @msg: 编辑行事件
       */
      handleUpdate(row) {
        this.showType = 'edit';
        this.$nextTick(() => {
          this.$refs.veSbzcZcMaintainEdit.doUpdate(row);
        });
      },
      /**
       * @msg: 编辑行事件
       */
      toDetail(row) {
        this.showType = 'show';
        this.$nextTick(() => {
          this.$refs.veSbzcZcMaintainShow.doShow(row);
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
        this.$refs.veSbzcZcMaintainTable.reload();
      },
      /**
       * @msg: 维修完成
       */
      mainTainOver() {
        var ids = this.$refs.veSbzcZcMaintainTable.getSelectRowIds();
        veSbzcZcMaintainApi.updateStatus({ids: ids,
          status: 1}).then(() => {
          this.$notification.success({
            message: '数据修改成功',
            description: '修改了一条数据'
          });
          this.$refs.veSbzcZcMaintainTable.reload();
        });
        //this.showType = 'table';

      }
    }
  };
</script>
<style lang="less" scoped>

</style>