<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-03-02 21:16:08
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-03-09 22:17:14
-->
<template>
  <edu-layout type="table">
    <!-- 表格 -->
    <div slot="table" class="right_table veSbzcCdCategoryTable">
      <div>
        <edu-table
          ref="veSbzcCdCategoryTable"
          code="veSbzcCdCategory"
          :config="{ pageFn: 'all', pagination: false, showNo: false, open: false, close: false, bdelete: false, checkBox: false, status: false }"
          :api="veSbzcCdCategoryTable.api"
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
          <a-table-column title="分类编码" dataIndex="code"> </a-table-column>
          <a-table-column title="是否启用" width="150px" align="center" dataIndex="status">
            <template slot-scope="status">
              <edu-dict-text code="status" :class="'status' + status" :value="status"></edu-dict-text>
            </template>
          </a-table-column>
          <a-table-column title="排序" dataIndex="listSort" width="150px"> </a-table-column>
        </edu-table>
      </div>
      <!-- 编辑页 -->
      <veSbzcCdCategoryEdit v-if="showType == 'edit'" :treeList="treeList" ref="veSbzcCdCategoryEdit" @onOk="editOk" @onCancel="editCancel">
      </veSbzcCdCategoryEdit>
    </div>
  </edu-layout>
</template>

<script>
import veSbzcCdCategoryApi from '@/views/sbzc/place/api/veSbzcCdCategoryApi';
import veSbzcCdCategoryEdit from './veSbzcCdCategoryEdit';
import $ from 'jquery';

export default {
  components: {
    veSbzcCdCategoryEdit
  },
  data() {
    const data = {
      veSbzcCdCategoryQuery: {},
      showType: 'table'
    };
    data.veSbzcCdCategoryTable = {
      api: veSbzcCdCategoryApi
    };
    data.treeList = [];
    return data;
  },
  mounted() {},
  methods: {
    doImport() {
      return { implName: 'veSbzcCdCategoryServiceImpl.importExcel' };
    },
    onLoad() {
      setTimeout(() => {
        $('.veSbzcCdCategoryTable tr').click(function(i, e) {
          $('.veSbzcCdCategoryTable tr.selectTr').removeClass('selectTr');
          $(this).addClass('selectTr');
        });
      }, 100);
    },
    doOpen(isOpen) {
      if (isOpen) {
        $('.veSbzcCdCategoryTable tr .ant-table-row-expand-icon.ant-table-row-collapsed').click();
      } else {
        $('.veSbzcCdCategoryTable tr .ant-table-row-expand-icon.ant-table-row-expanded').click();
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
      this.$refs.veSbzcCdCategoryTable.reload();
    },
    /**
     * @msg: 新增事件
     */
    handleCreate() {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veSbzcCdCategoryEdit.doCreate();
      });
    },
    /**
     * @msg: 编辑行事件
     */
    handleUpdate(row) {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veSbzcCdCategoryEdit.doUpdate(row);
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
      this.$refs.veSbzcCdCategoryTable.reload();
    },
    renderData(list) {
      this.treeList = this.$utils.copyObject(list);
      return this.$utils.btree(list, 0);
    }
  }
};
</script>
<style lang="less" scoped>
.veSbzcCdCategoryTable {
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
