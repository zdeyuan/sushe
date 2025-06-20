<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-03-02 21:16:08
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-03-18 22:35:57
-->
<template>
  <!-- 表格 -->
  <div class="right_table veSbzcJzwInspecttypeTable">
    <div>
      <edu-table
        ref="veSbzcJzwInspecttypeTable"
        code="veSbzcJzwInspecttype"
        :config="{ pageFn: 'all', pagination: false, showNo: false, open: false, close: false, bdelete: false, checkBox: false, status: false }"
        :api="veSbzcJzwInspecttypeTable.api"
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
          <edu-pms :code="'veJkyUser-btn-add'" type="primary" ext="delete" iconfont="iconshuzhedie mini" name="折叠" @click="doOpen(false)"></edu-pms>
        </template>
        <!--         <template slot-scope="text, record, index">
       <span></span>
       </template>-->
        <a-table-column title="分类名称" dataIndex="name"> </a-table-column>
        <a-table-column title="分类编码" dataIndex="code"> </a-table-column>
        <a-table-column title="上级分类" width="150px" align="center" dataIndex="pid">
          <template slot-scope="pid">
            {{ getPname(pid) }}
          </template>
        </a-table-column>
        <a-table-column title="排序" dataIndex="listSort" width="150px"> </a-table-column>
      </edu-table>
    </div>
    <!-- 编辑页 -->
    <veSbzcJzwInspecttypeEdit v-if="showType == 'edit'" :treeList="treeList" ref="veSbzcJzwInspecttypeEdit" @onOk="editOk" @onCancel="editCancel">
    </veSbzcJzwInspecttypeEdit>
  </div>
</template>

<script>
import veSbzcJzwInspecttypeApi from '@/views/sbzc/floor/api/veSbzcJzwInspecttypeApi';
import veSbzcJzwInspecttypeEdit from './veSbzcJzwInspecttypeEdit';
import $ from 'jquery';

export default {
  components: {
    veSbzcJzwInspecttypeEdit
  },
  data() {
    const data = {
      veSbzcJzwInspecttypeQuery: {},
      showType: 'table'
    };
    data.veSbzcJzwInspecttypeTable = {
      api: veSbzcJzwInspecttypeApi
    };
    data.treeList = [];
    return data;
  },
  mounted() {},
  methods: {
    doImport() {
      return { implName: 'veSbzcJzwInspecttypeServiceImpl.importExcel' };
    },
    onLoad() {
      setTimeout(() => {
        $('.veSbzcJzwInspecttypeTable tr').click(function(i, e) {
          $('.veSbzcJzwInspecttypeTable tr.selectTr').removeClass('selectTr');
          $(this).addClass('selectTr');
        });
      }, 100);
    },
    doOpen(isOpen) {
      if (isOpen) {
        $('.veSbzcJzwInspecttypeTable tr .ant-table-row-expand-icon.ant-table-row-collapsed').click();
      } else {
        $('.veSbzcJzwInspecttypeTable tr .ant-table-row-expand-icon.ant-table-row-expanded').click();
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
      return params;
    },
    /**
     * @msg: 搜索事件
     */
    handleFilter() {
      this.$refs.veSbzcJzwInspecttypeTable.reload();
    },
    /**
     * @msg: 新增事件
     */
    handleCreate() {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veSbzcJzwInspecttypeEdit.doCreate();
      });
    },
    /**
     * @msg: 编辑行事件
     */
    handleUpdate(row) {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veSbzcJzwInspecttypeEdit.doUpdate(row);
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
      this.$refs.veSbzcJzwInspecttypeTable.reload();
    },
    renderData(list) {
      this.treeList = this.$utils.copyObject(list);
      return this.$utils.btree(list, 0);
    }
  }
};
</script>
<style lang="less" scoped>
.veSbzcJzwInspecttypeTable {
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
