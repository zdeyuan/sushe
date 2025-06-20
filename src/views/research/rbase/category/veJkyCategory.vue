<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-02-14 00:54:38
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-03-03 21:54:30
-->
<template>
  <edu-layout type="table">
    <!-- 表格 -->
    <div slot="table" class="right_table categoryTable">
      <div>
        <edu-table
          ref="veJkyCategoryTable"
          code="veJkyCategory"
          :config="{ pageFn: 'all', pagination: false, showNo: false, open: false, close: false, bdelete: false, checkBox: false }"
          :api="veJkyCategoryTable.api"
          :get-params="getParams"
          :renderData="renderData"
          :to-update="handleUpdate"
          :do-add="handleCreate"
          :onLoad="onLoad"
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

          <!--         <template slot-scope="text, record, index">
       <span></span>
       </template>-->
          <a-table-column title="分类名称" dataIndex="name"> </a-table-column>
          <a-table-column title="分类编码" dataIndex="codeNum" width="150px"> </a-table-column>
          <a-table-column title="上级分类" dataIndex="pid" width="150px">
            <template slot-scope="pid">
              <span> {{ getPname(pid) }}</span>
            </template>
          </a-table-column>
          <a-table-column title="排序" dataIndex="listSort" width="150px"> </a-table-column>
        </edu-table>
      </div>
      <!-- 编辑页 -->
      <veJkyCategoryEdit v-if="showType == 'edit'" ref="veJkyCategoryEdit" :treeList="treeList" @onOk="editOk" @onCancel="editCancel">
      </veJkyCategoryEdit>
    </div>
  </edu-layout>
</template>

<script>
import veJkyCategoryApi from '@/api/research/rbase/veJkyCategoryApi';
import veJkyCategoryEdit from './veJkyCategoryEdit';
import $ from 'jquery';

export default {
  components: {
    veJkyCategoryEdit
  },
  data() {
    const data = {
      veJkyCategoryQuery: {},
      showType: 'table'
    };
    data.veJkyCategoryTable = {
      api: veJkyCategoryApi
    };
    data.treeList = [];
    return data;
  },
  mounted() {},
  methods: {
    onLoad() {
      setTimeout(() => {
        $('.categoryTable tr').click(function(i, e) {
          $('.categoryTable tr.selectTr').removeClass('selectTr');
          $(this).addClass('selectTr');
        });
      }, 100);
    },
    doOpen(isOpen) {
      if (isOpen) {
        $('.categoryTable tr .ant-table-row-expand-icon.ant-table-row-collapsed').click();
      } else {
        $('.categoryTable tr .ant-table-row-expand-icon.ant-table-row-expanded').click();
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
      const params = {};
      return params;
    },
    /**
     * @msg: 搜索事件
     */
    handleFilter() {
      this.$refs.veJkyCategoryTable.reload();
    },
    /**
     * @msg: 新增事件
     */
    handleCreate() {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veJkyCategoryEdit.doCreate();
      });
    },
    /**
     * @msg: 编辑行事件
     */
    handleUpdate(row) {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veJkyCategoryEdit.doUpdate(row);
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
      this.$refs.veJkyCategoryTable.reload();
    },
    renderData(list) {
      this.treeList = this.$utils.copyObject(list);
      return this.$utils.btree(list, 0);
    }
  }
};
</script>
<style lang="less" scoped>
.categoryTable {
  /deep/tr.selectTr {
    background: #bfe7f7 !important;
  }
}
</style>
