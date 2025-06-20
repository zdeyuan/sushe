<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-03-02 21:16:08
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-05-01 19:27:32
-->
<template>
  <!-- 表格 -->
  <div slot="table" class="right_table veStuCheckNormTable">
    <div style="padding-top:8px">
      <edu-table
        ref="veStuCheckNormTable"
        code="veStuCheckNorm"
        :config="{ pageFn: 'all', pagination: false, showNo: false, open: false, close: false, bdelete: false, checkBox: false, status: false }"
        :api="veStuCheckNormTable.api"
        :renderData="renderData"
        :onLoad="onLoad"
        :get-params="getParams"
        :to-update="handleUpdate"
        :do-add="handleCreate"
		:scrollWidth="800"
        :sorts="[
          {
            column: 'list_sort',
            asc: true
          }
        ]"
      >
        <template slot="top_af_btn" >
          <edu-pms :code="'veJkyUser-btn-add'" type="primary" iconfont="iconzhankai mini" name="展开" @click="doOpen(true)"></edu-pms>
          <edu-pms :code="'veJkyUser-btn-add'" type="primary" ext="delete" iconfont="iconshuzhedie mini" name="折叠" @click="doOpen(false)"></edu-pms>
        </template>
        <!--       -->
        <a-table-column title="分类名称" dataIndex="name" width="300px"> </a-table-column>
        <a-table-column title="上级分类" dataIndex="pid">
          <template slot-scope="text">
            {{ getPname(text) }}
          </template>
        </a-table-column>
        <a-table-column title="排序" dataIndex="listSort" width="150px"> </a-table-column>
      </edu-table>
    </div>
    <!-- 编辑页 -->
    <veStuCheckNormEdit v-if="showType == 'edit'" :treeList="treeList" ref="veStuCheckNormEdit" @onOk="editOk" @onCancel="editCancel">
    </veStuCheckNormEdit>
  </div>
</template>

<script>
import veStuCheckNormApi from '../../api/veStuCheckNormApi';
import veStuCheckNormEdit from './veStuCheckNormEdit';
import $ from 'jquery';

export default {
  components: {
    veStuCheckNormEdit
  },
  data() {
    const data = {
      veStuCheckNormQuery: {},
      showType: 'table'
    };
    data.veStuCheckNormTable = {
      api: veStuCheckNormApi
    };
    data.treeList = [];
    return data;
  },
  mounted() {},
  methods: {
    doImport() {},
    onLoad() {
      setTimeout(() => {
        $('.veStuCheckNormTable tr').click(function(i, e) {
          $('.veStuCheckNormTable tr.selectTr').removeClass('selectTr');
          $(this).addClass('selectTr');
        });
        this.doOpen(true);
      }, 100);
    },
    doOpen(isOpen) {
      if (isOpen) {
        $('.veStuCheckNormTable tr .ant-table-row-expand-icon.ant-table-row-collapsed').click();
      } else {
        $('.veStuCheckNormTable tr .ant-table-row-expand-icon.ant-table-row-expanded').click();
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
      this.$refs.veStuCheckNormTable.reload();
    },
    /**
     * @msg: 新增事件
     */
    handleCreate() {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veStuCheckNormEdit.doCreate();
      });
    },
    /**
     * @msg: 编辑行事件
     */
    handleUpdate(row) {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veStuCheckNormEdit.doUpdate(row);
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
      this.$refs.veStuCheckNormTable.reload();
    },
    renderData(list) {
      this.treeList = this.$utils.copyObject(list);
      return this.$utils.btree(list, 0);
    }
  }
};
</script>
<style lang="less" scoped>
.veStuCheckNormTable {
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
