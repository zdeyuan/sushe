<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-03-02 21:16:08
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-05-02 23:15:55
-->
<template>
  <edu-layout type="table">
    <!-- 表格 -->
    <div slot="table" class="right_table veStuIdxTable">
      <div style="padding-top:8px">
        <edu-table
          ref="veStuIdxTable"
          code="veStuIdx"
          :config="{
            pageFn: 'all',
            pagination: false,
            showNo: false,
            bdelete: false,
            status: true,
            delete: false
          }"
          :api="veStuIdxTable.api"
          :renderData="renderData"
          :onLoad="onLoad"
          :get-params="getParams"
          :to-update="handleUpdate"
          :sorts="[
            {
              column: 'list_sort',
              asc: true
            }
          ]"
        >
          <template slot="top_af_btn">
            <edu-pms :code="'veJkyUser-btn-add'" type="primary" iconfont="iconzhankai mini" name="展开" @click="doOpen(true)"></edu-pms>
            <edu-pms
              :code="'veJkyUser-btn-add'"
              type="primary"
              ext="delete"
              iconfont="iconshuzhedie mini"
              name="折叠"
              @click="doOpen(false)"
            ></edu-pms>
          </template>
          <!--       -->
          <a-table-column title="分类名称" dataIndex="name"> </a-table-column>
          <a-table-column title="排序" dataIndex="listSort" width="150px"> </a-table-column>
        </edu-table>
      </div>
      <!-- 编辑页 -->
      <veStuIdxEdit v-if="showType == 'edit'" :treeList="treeList" ref="veStuIdxEdit" @onOk="editOk" @onCancel="editCancel"> </veStuIdxEdit>
    </div>
  </edu-layout>
</template>

<script>
import veStuIdxApi from '@/views/stuManage/jis/api/veStuIdxApi';
import veStuIdxEdit from './veStuIdxEdit';
import $ from 'jquery';

export default {
  components: {
    veStuIdxEdit
  },
  data() {
    const data = {
      veStuIdxQuery: {},
      showType: 'table'
    };
    data.veStuIdxTable = {
      api: veStuIdxApi
    };
    data.treeList = [];
    return data;
  },
  mounted() {},
  methods: {
    doImport() {},
    onLoad() {
      setTimeout(() => {
        $('.veStuIdxTable tr').click(function(i, e) {
          $('.veStuIdxTable tr.selectTr').removeClass('selectTr');
          $(this).addClass('selectTr');
        });
        this.doOpen(true);
      }, 100);
    },
    doOpen(isOpen) {
      if (isOpen) {
        $('.veStuIdxTable tr .ant-table-row-expand-icon.ant-table-row-collapsed').click();
      } else {
        $('.veStuIdxTable tr .ant-table-row-expand-icon.ant-table-row-expanded').click();
      }
    },
    getPname(pid) {
      for (let i = 0; i < this.treeList.length; i++) {
        const element = this.treeList[i];
        if (element.id == pid) {
          return element.name;
        }
      }
      return '-';
    },
    /**
     * @msg: 表格获取请求数据 必须return 一个对象
     */
    getParams() {
      const params = { conditions: [] };
      //  this.$utils.addPageConditions(params, 'is_del', 'eq', 0);
      return params;
    },
    /**
     * @msg: 搜索事件
     */
    handleFilter() {
      this.$refs.veStuIdxTable.reload();
    },
    /**
     * @msg: 新增事件
     */
    handleCreate() {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veStuIdxEdit.doCreate();
      });
    },
    /**
     * @msg: 编辑行事件
     */
    handleUpdate(row) {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veStuIdxEdit.doUpdate(row);
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
      this.$refs.veStuIdxTable.reload();
    },
    renderData(list) {
      this.treeList = this.$utils.copyObject(list);
      return this.$utils.btree(list, 0);
    }
  }
};
</script>
<style lang="less" scoped>
.veStuIdxTable {
  /deep/tr.selectTr {
    background: #bfe7f7 !important;
  }
}
.status1 {
  color: #039471;
}
.status0 {
  color: rgb(212, 117, 117);
}
</style>
