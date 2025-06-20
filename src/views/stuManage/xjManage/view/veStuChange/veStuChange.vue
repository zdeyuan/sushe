<template>
  <!-- 表格 -->
  <div type="table">
    <div slot="table" class="right_table">
      <div>
        <edu-query ref="cwQuery" code="veBaseStudent" ext="boxZybmbj" :do-filter="handleFilter">
          <template slot="search">
            <edu-query-item title="学号" pname="xh" pop="like" stype="input"> </edu-query-item>
            <edu-query-item title="姓名" pname="xm" pop="like" stype="input"> </edu-query-item>
            <edu-query-item title="身份证号" pname="zfzh" pop="like" stype="input" v-if="$hasPer(['system'])"> </edu-query-item>
            <edu-query-item title="学生状态" width="150px" pname="xsdqztm" pop="like" stype="select" code="stuStatye"> </edu-query-item>
          </template>
        </edu-query>
        <edu-table
          ref="veBaseStudentTable"
          code="veBaseStudent"
          :api="veBaseStudentTable.api"
          :get-params="getParams"
          :config="{
            open: false,
            close: false,
            status: false,
            delete: false,
            bdelete: false
          }"
          :sorts="[
            {
             column: 'xh',
             asc: true
            }
          ]"
		  :tableX="2000"
        >
          <a-table-column title="学号" dataIndex="xh" width="150px"> </a-table-column>
          <a-table-column title="姓名" dataIndex="xm" width="100px"> </a-table-column>
          <a-table-column title="性别" dataIndex="xbm" width="60px">
            <template slot-scope="value">
              <edu-dict-text code="sexStr" :value="value"></edu-dict-text>
            </template>
          </a-table-column>
          <a-table-column title="身份证号" dataIndex="sfzh" width="200px"> </a-table-column>
          <a-table-column title="学生状态" dataIndex="xsdqztm" width="100px">
            <template slot-scope="value">
              <edu-dict-text code="stuStatye" :value="value"></edu-dict-text>
            </template>
          </a-table-column>
          <a-table-column title="所属专业部" dataIndex="falText" width="150px"> </a-table-column>
          <a-table-column title="所属专业" dataIndex="specText" width="150px"> </a-table-column>
          <a-table-column title="所属班级" dataIndex="bjText" width="150px"> </a-table-column>
          <a-table-column title="学生联系电话" dataIndex="xslxdh" width="150px"> </a-table-column>
		  <template slot="af_btn" slot-scope="{ row }">
		    <edu-pms
		      :code="'aaa'"
		      name="学籍异动"
		      ext="tedit"
		      type="success"
		      size="mini"
		      @click="handleUpdate(row)" v-if="row.isChange==0">
		    </edu-pms>
		  </template>
        </edu-table>
      </div>
      <!-- 编辑页 -->
      <veStuChangeEdit family v-if="showType == 'edit'" ref="veStuChangeEdit" @onOk="editOk" @onCancel="editCancel"> </veStuChangeEdit>
    </div>
  </div>
</template>

<script>
import veBaseStudentApi from '@/views/stuManage/xjManage/api/veBaseStudentApi';
import veStuChangeEdit from './veStuChangeEdit';

export default {
  components: {
    veStuChangeEdit
  },
  data() {
    const data = {
      veBaseStudentQuery: {},
      showType: 'table'
    };
    data.veBaseStudentTable = {
      api: veBaseStudentApi
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 表格获取请求数据 必须return 一个对象
     */
    getParams() {
      const params = this.$refs['cwQuery'].getQueryData({ base: true });
      return params;
    },
    /**
     * @msg: 搜索事件
     */
    handleFilter() {
      this.$refs.veBaseStudentTable.reload();
    },
	/**
	 * @msg: 新增事件
	 */
	handleCreate() {
	  this.showType = 'edit';
	  this.$nextTick(() => {
	    this.$refs.veStuChangeEdit.doCreate();
	  });
	},
    /**
     * @msg: 编辑行事件
     */
    handleUpdate(row) {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veStuChangeEdit.doChange(row);
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
      this.$refs.veBaseStudentTable.reload();
    }
  }
};
</script>
<style lang="less" scoped></style>
