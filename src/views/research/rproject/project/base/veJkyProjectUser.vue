<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-02-16 22:29:29
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-02-17 11:29:49
-->
<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form
      :title="projectVo.name + '-成员列'"
      class="mini-form-item inline-form"
      size="big"
      @ok="handelCancel"
      @cancel="handelCancel"
      width="65%"
      :isShowBtnSure="false"
    >
      <edu-table
        ref="veJkyProjectUserTable"
        code="veJkyProjectUser"
        :api="veJkyProjectUserTable.api"
        :config="{
          bdelete: false,
          checkBox: false,
          status: false
        }"
        :to-update="handleUpdate"
        :sorts="[
          {
            column: 'd.id',
            asc: false
          }
        ]"
        :get-params="getParams"
        :init="false"
      >
        <template slot="top_btn">
          <edu-pms :code="'veJkyProjectUser-btn-add'" type="primary" iconfont="plus" name="添加人员" @click="doAdd"></edu-pms>
        </template>
        <!--         <template slot-scope="text, record, index">
       <span></span>
       </template>-->
        <a-table-column title="成员姓名" dataIndex="userName" width="150px"> </a-table-column>
        <a-table-column title="加入时间" dataIndex="joinTime" width="200px"> </a-table-column>
        <a-table-column title="主要工作及描述" dataIndex="textId"> </a-table-column>
      </edu-table>
    </edu-form>
    <veJkyProjectUserEdit v-if="showType == 'edit'" ref="veJkyProjectUserEdit" @onOk="editOk" @onCancel="editCancel"> </veJkyProjectUserEdit>
  </div>
</template>

<script>
import veJkyProjectUserApi from '@/api/research/rproject/veJkyProjectUserApi';
import veJkyProjectUserEdit from './veJkyProjectUserEdit';
export default {
  components: { veJkyProjectUserEdit },
  props: {},
  data() {
    const data = {
      dialogStatus: 'create',
      showType: 'table'
    };
    data.veJkyProjectUserTable = {
      api: veJkyProjectUserApi
    };
    data.projectVo = {};
    return data;
  },
  mounted() {},
  methods: {
    doAdd() {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veJkyProjectUserEdit.doCreate(this.projectVo);
      });
    },
    /**
     * @msg: 编辑行事件
     */
    handleUpdate(row) {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veJkyProjectUserEdit.doUpdate(row, this.projectVo);
      });
    },
    doShow(projectVo) {
      this.projectVo = projectVo;
      this.handleFilter();
    },
    /**
     * @msg: 表格获取请求数据 必须return 一个对象
     */
    getParams() {
      const params = { conditions: [] };
      this.$utils.addPageConditions(params, 'd.project_id', 'eq', this.projectVo.id);
      return params;
    },
    /**
     * @msg: 搜索事件
     */
    handleFilter() {
      this.$refs.veJkyProjectUserTable.reload();
    },
    editOk() {
      this.showType = 'table';
      this.handleFilter();
    },
    editCancel() {
      this.showType = 'table';
    },
    /**
     * @msg: 编辑页取消
     */
    handelCancel() {
      this.$emit('onCancel');
    }
  }
};
</script>
<style lang="less" scoped></style>
