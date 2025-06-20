<template>
  <!-- 表格 -->
  <div slot="table" class="right_table">
    <div >
      <edu-query ref="cwQuery" code="veStuLiteraryAwardItem" :do-filter="handleFilter">
        <template slot="search">
          <edu-query-item title="奖励名称" pname="name" pop="like" stype="input"> </edu-query-item>
        </template>
      </edu-query>
      <edu-table
        ref="veStuLiteraryAwardItemTable"
        code="veStuLiteraryAwardItem"
        :api="veStuLiteraryAwardItemTable.api"
        :get-params="getParams"
        :config="{}"
        :to-update="handleUpdate"
        :do-add="handleCreate"
      >
        <!--         <template slot-scope="text, record, index">
       <span></span>
       </template>-->
        <a-table-column title="奖励名称" dataIndex="name" width="150px"> </a-table-column>
        <a-table-column title="奖项类型" dataIndex="type" width="150px">
          <template slot-scope="value">
            <edu-dict-text code="jllb2" :class="'status' + value" :value="value"></edu-dict-text>
          </template>
        </a-table-column>
      </edu-table>
    </div>
    <!-- 编辑页 -->
    <veStuLiteraryAwardItemEdit v-if="showType == 'edit'" ref="veStuLiteraryAwardItemEdit" @onOk="editOk" @onCancel="editCancel">
    </veStuLiteraryAwardItemEdit>
    <veStuLiteraryAwardItemShow v-if="showType == 'show'" ref="veStuLiteraryAwardItemShow" @onOk="editOk" @onCancel="editCancel">
    </veStuLiteraryAwardItemShow>
  </div>
</template>

<script>
import veStuLiteraryAwardItemApi from '../../api/veStuLiteraryAwardItemApi';
import veStuLiteraryAwardItemEdit from './veStuLiteraryAwardItemEdit';
import veStuLiteraryAwardItemShow from './veStuLiteraryAwardItemShow';

export default {
  components: {
    veStuLiteraryAwardItemEdit,
    veStuLiteraryAwardItemShow
  },
  data() {
    const data = {
      veStuLiteraryAwardItemQuery: {},
      showType: 'table'
    };
    data.veStuLiteraryAwardItemTable = {
      api: veStuLiteraryAwardItemApi
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
      this.$refs.veStuLiteraryAwardItemTable.reload();
    },
    /**
     * @msg: 新增事件
     */
    handleCreate() {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veStuLiteraryAwardItemEdit.doCreate();
      });
    },
    /**
     * @msg: 编辑行事件
     */
    handleUpdate(row) {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veStuLiteraryAwardItemEdit.doUpdate(row);
      });
    },
    /**
     * @msg: 编辑行事件
     */
    toDetail(row) {
      this.showType = 'show';
      this.$nextTick(() => {
        this.$refs.veStuLiteraryAwardItemShow.doShow(row);
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
      this.$refs.veStuLiteraryAwardItemTable.reload();
    }
  }
};
</script>
<style lang="less" scoped></style>
