<template>
  <edu-layout type="table">
    <!-- 表格 -->
    <div slot="table" class="right_table">
      <div>
        <edu-query ref="cwQuery" code="veStuAssocLabel" :do-filter="handleFilter">
          <template slot="search">
            <edu-query-item title="名称" pname="NAME" pop="like" stype="input"> </edu-query-item>
          </template>
        </edu-query>
        <edu-table
          ref="veStuAssocLabelTable"
          code="veStuAssocLabel"
          :api="veStuAssocLabelTable.api"
          :get-params="getParams"
          :config="{}"
          :to-update="handleUpdate"
          :do-add="handleCreate"
        >
          <!--         <template slot-scope="text, record, index">
       <span></span>
       </template>-->
          <a-table-column title="名称" dataIndex="name" width="150px"> </a-table-column>
        </edu-table>
      </div>
      <!-- 编辑页 -->
      <veStuAssocLabelEdit v-if="showType == 'edit'" ref="veStuAssocLabelEdit" @onOk="editOk" @onCancel="editCancel"> </veStuAssocLabelEdit>
      <veStuAssocLabelShow v-if="showType == 'show'" ref="veStuAssocLabelShow" @onOk="editOk" @onCancel="editCancel"> </veStuAssocLabelShow>
    </div>
  </edu-layout>
</template>

<script>
import veStuAssocLabelApi from '@/views/stuManage/shet/api/veStuAssocLabelApi';
import veStuAssocLabelEdit from './veStuAssocLabelEdit';
import veStuAssocLabelShow from './veStuAssocLabelShow';

export default {
  components: {
    veStuAssocLabelEdit,
    veStuAssocLabelShow
  },
  data() {
    const data = {
      veStuAssocLabelQuery: {},
      showType: 'table'
    };
    data.veStuAssocLabelTable = {
      api: veStuAssocLabelApi
    };
    return data;
  },
  mounted() {},
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
      this.$refs.veStuAssocLabelTable.reload();
    },
    /**
     * @msg: 新增事件
     */
    handleCreate() {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veStuAssocLabelEdit.doCreate();
      });
    },
    /**
     * @msg: 编辑行事件
     */
    handleUpdate(row) {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veStuAssocLabelEdit.doUpdate(row);
      });
    },
    /**
     * @msg: 编辑行事件
     */
    toDetail(row) {
      this.showType = 'show';
      this.$nextTick(() => {
        this.$refs.veStuAssocLabelShow.doShow(row);
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
      this.$refs.veStuAssocLabelTable.reload();
    }
  }
};
</script>
<style lang="less" scoped></style>
