<template>
  <edu-layout type="table">
    <!-- 表格 -->
    <div slot="table" class="right_table">
      <div>
        <edu-query ref="cwQuery" code="veStuRewardType" :do-filter="handleFilter">
          <template slot="search">
            <edu-query-item title="奖励名称" pname="title" pop="like" stype="input"> </edu-query-item>
            <edu-query-item title="奖励代码" pname="code" pop="like" stype="input"> </edu-query-item>
            <edu-query-item title="状态" pname="status" pop="eq" width="150px" stype="select" code="status"> </edu-query-item>
          </template>
        </edu-query>
        <edu-table
          ref="veStuRewardTypeTable"
          code="veStuRewardType"
          :api="veStuRewardTypeTable.api"
          :get-params="getParams"
          :config="{}"
          :to-update="handleUpdate"
          :do-add="handleCreate"
        >
          <!--         <template slot-scope="text, record, index">
       <span></span>
       </template>-->
          <a-table-column title="奖励名称" dataIndex="title" width="150px"> </a-table-column>
          <a-table-column title="奖励代码" dataIndex="code" width="150px"> </a-table-column>
          <a-table-column title="奖励级别" dataIndex="level" width="150px">
            <template slot-scope="value">
              <edu-dict-text code="jlJb" :class="'status' + value" :value="value"></edu-dict-text>
            </template>
          </a-table-column>
          <a-table-column title="奖励属性" dataIndex="attribute" width="150px">
            <template slot-scope="value">
              <edu-dict-text code="jllb" :class="'status' + value" :value="value"></edu-dict-text>
            </template>
          </a-table-column>
        </edu-table>
      </div>
      <!-- 编辑页 -->
      <veStuRewardTypeEdit v-if="showType == 'edit'&&$hasPer(['system','teacher'])" ref="veStuRewardTypeEdit" @onOk="editOk" @onCancel="editCancel"> </veStuRewardTypeEdit>
      <veStuRewardTypeShow v-if="showType == 'show'" ref="veStuRewardTypeShow" @onOk="editOk" @onCancel="editCancel"> </veStuRewardTypeShow>
    </div>
  </edu-layout>
</template>

<script>
import veStuRewardTypeApi from '../../api/veStuRewardTypeApi';
import veStuRewardTypeEdit from './veStuRewardTypeEdit';
import veStuRewardTypeShow from './veStuRewardTypeShow';

export default {
  components: {
    veStuRewardTypeEdit,
    veStuRewardTypeShow
  },
  data() {
    const data = {
      veStuRewardTypeQuery: {},
      showType: 'table'
    };
    data.veStuRewardTypeTable = {
      api: veStuRewardTypeApi
    };
    return data;
  },
  mounted() {},
  methods: {
    doImport() {
      return {
        temp: [
          '学生id(个人)',
          '学生姓名',
          '学生学号',
          '院系id',
          '专业id',
          '奖励类型id',
          '班级id(集体)或学生所属班级id',
          '文件id（申请材料）',
          '获奖时间',
          '获奖描述'
        ],
        tempName: '奖励信息',
        implName: 'veStuRewardServiceImpl.importExcel'
      };
    },
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
      this.$refs.veStuRewardTypeTable.reload();
    },
    /**
     * @msg: 新增事件
     */
    handleCreate() {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veStuRewardTypeEdit.doCreate();
      });
    },
    /**
     * @msg: 编辑行事件
     */
    handleUpdate(row) {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veStuRewardTypeEdit.doUpdate(row);
      });
    },
    /**
     * @msg: 编辑行事件
     */
    toDetail(row) {
      this.showType = 'show';
      this.$nextTick(() => {
        this.$refs.veStuRewardTypeShow.doShow(row);
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
      this.$refs.veStuRewardTypeTable.reload();
    }
  }
};
</script>
<style lang="less" scoped></style>
