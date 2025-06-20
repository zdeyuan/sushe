<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-02-16 22:29:29
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-02-20 21:08:24
-->
<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form
      :title="projectVo.name + '-工作管理'"
      class="mini-form-item inline-form"
      size="big"
      @ok="handelCancel"
      @cancel="handelCancel"
      width="65%"
      :isShowBtnSure="false"
    >
      <edu-table
        ref="veJkyProjectWorkTable"
        code="veJkyProjectWork"
        :api="veJkyProjectWorkTable.api"
        :get-params="getParams"
        :toDetail="toDetail"
        :to-update="handleUpdate"
        :do-add="handleCreate"
        :init="false"
        :config="{ close: false, open: false, status: false }"
        :sorts="[
          {
            column: 'd.id',
            asc: false
          }
        ]"
      >
        <!--         <template slot-scope="text, record, index">
       <span></span>
       </template>-->
        <a-table-column title="工作名称" dataIndex="title" width="150px"> </a-table-column>
        <a-table-column title="工作进度" dataIndex="progress" width="150px">
          <template slot-scope="progress">
            {{ progress }}%
            <span></span>
          </template>
        </a-table-column>
        <a-table-column title="工作人员" dataIndex="userNames" width="150px"> </a-table-column>
        <a-table-column title="工作开始时间" dataIndex="startTime" width="150px"> </a-table-column>
        <a-table-column title="工作结束时间" dataIndex="endTime" width="150px"> </a-table-column>
      </edu-table>
    </edu-form>
    <veJkyProjectWorkEdit v-if="showType == 'edit'" :projectVo="projectVo" ref="veJkyProjectWorkEdit" @onOk="editOk" @onCancel="editCancel">
    </veJkyProjectWorkEdit>
    <veJkyProjectWorkShow v-if="showType == 'show'" ref="veJkyProjectWorkShow" @onOk="editOk" @onCancel="editCancel"> </veJkyProjectWorkShow>
  </div>
</template>

<script>
import veJkyProjectWorkApi from '@/api/research/rproject/veJkyProjectWorkApi';
import veJkyProjectWorkEdit from '@/views/research/rproject/projectWork/veJkyProjectWorkEdit';
import veJkyProjectWorkShow from '@/views/research/rproject/projectWork/veJkyProjectWorkShow';

export default {
  components: { veJkyProjectWorkShow, veJkyProjectWorkEdit },
  props: {},
  data() {
    const data = {
      veJkyProjectWorkQuery: {},
      showType: 'table'
    };
    data.veJkyProjectWorkTable = {
      api: veJkyProjectWorkApi
    };
    data.projectVo = {};
    return data;
  },
  mounted() {},
  methods: {
    doShow(projectVo) {
      this.projectVo = projectVo;
      this.handleFilter();
    },
    /**
     * @msg: 编辑页取消
     */
    handelCancel() {
      this.$emit('onCancel');
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
      this.$refs.veJkyProjectWorkTable.reload();
    },
    /**
     * @msg: 新增事件
     */
    handleCreate() {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veJkyProjectWorkEdit.doCreate();
      });
    },
    /**
     * @msg: 编辑行事件
     */
    handleUpdate(row) {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veJkyProjectWorkEdit.doUpdate(row);
      });
    },
    /**
     * @msg: 编辑行事件
     */
    toDetail(row) {
      this.showType = 'show';
      this.$nextTick(() => {
        this.$refs.veJkyProjectWorkShow.doShow(row);
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
      this.$refs.veJkyProjectWorkTable.reload();
    }
  }
};
</script>
<style lang="less" scoped></style>
