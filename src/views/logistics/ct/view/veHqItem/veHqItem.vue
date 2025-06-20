<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-03-02 21:16:08
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-03-29 20:58:44
-->
<template>
  <edu-layout type="table">
    <!-- 表格 -->
    <div slot="table" class="right_table veHqItemTable">
      <div>
        <edu-table
          ref="veHqItemTable"
          code="veHqItem"
          :config="{ pageFn: 'all', pagination: false, showNo: false, open: false, close: false, bdelete: false, checkBox: false, status: false }"
          :api="veHqItemTable.api"
          :renderData="renderData"
          :onLoad="onLoad"
          :get-params="getParams"
          :to-update="handleUpdate"
          :do-add="handleCreate"
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
          <a-table-column title="状态码" width="150px" align="center" dataIndex="status">
            <template slot-scope="status">
              <edu-dict-text code="status" :class="'status' + status" :value="status"></edu-dict-text>
            </template>
          </a-table-column>
          <a-table-column title="排序" dataIndex="listSort" width="150px"> </a-table-column>
          <a-table-column title="是否为耗材" dataIndex="sfhc" width="150px">
            <template slot-scope="val">
              <edu-dict-text code="shifou" :value="val"></edu-dict-text>
            </template>
          </a-table-column>
        </edu-table>
      </div>
      <!-- 编辑页 -->
      <veHqItemEdit v-if="showType == 'edit'" :treeList="treeList" ref="veHqItemEdit" @onOk="editOk" @onCancel="editCancel"> </veHqItemEdit>
    </div>
  </edu-layout>
</template>

<script>
import veHqItemApi from '@/views/logistics/ct/api/veHqItemApi';
import veHqItemEdit from './veHqItemEdit';
import $ from 'jquery';

export default {
  components: {
    veHqItemEdit
  },
  data() {
    const data = {
      veHqItemQuery: {},
      showType: 'table'
    };
    data.veHqItemTable = {
      api: veHqItemApi
    };
    data.treeList = [];
    return data;
  },
  mounted() {},
  methods: {
    doImport() {},
    onLoad() {
      setTimeout(() => {
        $('.veHqItemTable tr').click(function(i, e) {
          $('.veHqItemTable tr.selectTr').removeClass('selectTr');
          $(this).addClass('selectTr');
        });
      }, 100);
    },
    doOpen(isOpen) {
      if (isOpen) {
        $('.veHqItemTable tr .ant-table-row-expand-icon.ant-table-row-collapsed').click();
      } else {
        $('.veHqItemTable tr .ant-table-row-expand-icon.ant-table-row-expanded').click();
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
      this.$utils.addPageConditions(params, 'is_del', 'eq', 0);
      return params;
    },
    /**
     * @msg: 搜索事件
     */
    handleFilter() {
      this.$refs.veHqItemTable.reload();
    },
    /**
     * @msg: 新增事件
     */
    handleCreate() {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veHqItemEdit.doCreate();
      });
    },
    /**
     * @msg: 编辑行事件
     */
    handleUpdate(row) {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veHqItemEdit.doUpdate(row);
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
      this.$refs.veHqItemTable.reload();
    },
    renderData(list) {
      this.treeList = this.$utils.copyObject(list);
      return this.$utils.btree(list, 0);
    }
  }
};
</script>
<style lang="less" scoped>
.veHqItemTable {
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
