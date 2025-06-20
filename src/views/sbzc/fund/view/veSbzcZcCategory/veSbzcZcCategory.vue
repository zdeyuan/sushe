<template>
  <edu-layout type="table">
    <!-- 表格 -->
    <div slot="table" class="right_table veSbzcZcCategoryTable">
      <div>
        <edu-table
          ref="veSbzcZcCategoryTable"
          code="veSbzcZcCategory"
          :api="veSbzcZcCategoryTable.api"
          :renderData="renderData"
          :doImport="doImport"
          :onLoad="onLoad"
          :get-params="getParams"
          :config="{
            pageFn: 'all',
            pagination: false,
            showNo: false,
            open: false,
            close: false,
            bdelete: false,
            checkBox: false,
            status: false
          }"
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
          <a-table-column title="分类名称" dataIndex="name" width="150px"> </a-table-column>
          <a-table-column title="分类编码" dataIndex="code" width="150px"> </a-table-column>
          <a-table-column title="上级分类" width="150px" align="center" dataIndex="pid">
            <template slot-scope="pid">
              {{ getPname(pid) }}
            </template>
          </a-table-column>
          <a-table-column title="排序" dataIndex="listSort" width="150px"> </a-table-column>
          <!--                    <a-table-column title="路径" dataIndex="path" width="150px">-->
          <!--                    </a-table-column>-->
        </edu-table>
      </div>
      <!-- 编辑页 -->
      <veSbzcZcCategoryEdit
        v-if="showType == 'edit'"
        ref="veSbzcZcCategoryEdit"
        :treeList="treeList"
        @onOk="editOk"
        @onCancel="editCancel"
      ></veSbzcZcCategoryEdit>
    </div>
  </edu-layout>
</template>

<script>
import veSbzcZcCategoryApi from '@/views/sbzc/fund/api/veSbzcZcCategoryApi';
import veSbzcZcCategoryEdit from './veSbzcZcCategoryEdit';
import $ from 'jquery';

export default {
  components: {
    veSbzcZcCategoryEdit
  },
  data() {
    const data = {
      veSbzcZcCategoryQuery: {},
      showType: 'table'
    };
    data.veSbzcZcCategoryTable = {
      api: veSbzcZcCategoryApi
    };
    data.treeList = [];
    return data;
  },
  mounted() {},
  methods: {
    doImport() {
      return { implName: 'veSbzcZcCategoryServiceImpl.importExcel' };
    },
    onLoad() {
      setTimeout(() => {
        $('.veSbzcZcCategoryTable tr').click(function(i, e) {
          $('.veSbzcZcCategoryTable tr.selectTr').removeClass('selectTr');
          $(this).addClass('selectTr');
        });
      }, 100);
    },
    doOpen(isOpen) {
      if (isOpen) {
        $('.veSbzcZcCategoryTable tr .ant-table-row-expand-icon.ant-table-row-collapsed').click();
      } else {
        $('.veSbzcZcCategoryTable tr .ant-table-row-expand-icon.ant-table-row-expanded').click();
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
      this.$refs.veSbzcZcCategoryTable.reload();
    },
    /**
     * @msg: 新增事件
     */
    handleCreate() {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veSbzcZcCategoryEdit.doCreate();
      });
    },
    /**
     * @msg: 编辑行事件
     */
    handleUpdate(row) {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veSbzcZcCategoryEdit.doUpdate(row);
      });
    },
    /**
     * @msg: 编辑行事件
     */
    toDetail(row) {
      this.showType = 'show';
      this.$nextTick(() => {
        this.$refs.veSbzcZcCategoryShow.doShow(row);
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
      this.$refs.veSbzcZcCategoryTable.reload();
    },
    renderData(list) {
      this.treeList = this.$utils.copyObject(list);
      return this.$utils.btree(list, 0);
    }
  }
};
</script>
<style lang="less" scoped>
.veSbzcZcCategoryTable {
  /deep/tr.selectTr {
    background: #bfe7f7 !important;
  }
}
</style>
