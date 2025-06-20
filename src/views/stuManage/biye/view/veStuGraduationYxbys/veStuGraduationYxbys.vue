<template>
  <edu-layout type="table">
    <!-- 表格 -->
    <div slot="table" class="right_table">
      <div>
        <edu-query ref="cwQuery" code="veStuGraduationYxbys" :do-filter="handleFilter">
          <template slot="search">
            <edu-query-item title="学号" pname="code" pop="like" stype="input"> </edu-query-item>
            <edu-query-item title="姓名" pname="name" pop="like" stype="input"> </edu-query-item>
          </template>
        </edu-query>
        <edu-table
          ref="veStuGraduationYxbysTable"
          code="veStuGraduationYxbys"
          :api="veStuGraduationYxbysTable.api"
          :get-params="getParams"
          :config="{
            open: false,
            close: false,
            status: false
          }"
          :to-update="handleUpdate"
          :toDetail="toDetail"
          :do-add="handleCreate"
          isAutoBtn
        >
          <!--         <template slot-scope="text, record, index">
       <span></span>
       </template>-->
          <a-table-column title="姓名" dataIndex="name" width="150px"> </a-table-column>
          <a-table-column title="学号" dataIndex="code" width="150px"> </a-table-column>
          <a-table-column title="身份证号" dataIndex="idcard" width="150px"> </a-table-column>
          <a-table-column title="结束学业年月" dataIndex="jsxyDate" width="150px">
			  <template slot-scope="value">
			    <span>{{formatDate(value)}}</span>
			  </template>
			</a-table-column>
          <a-table-column title="结束学业状态" dataIndex="jsxym" width="150px">
            <template slot-scope="value">
              <edu-dict-text code="byxsStatus" :class="'status' + value" :value="value"></edu-dict-text>
            </template>
          </a-table-column>
          <a-table-column title="所属专业部" dataIndex="falName" width="150px"> </a-table-column>
          <a-table-column title="所属专业" dataIndex="specName" width="150px"> </a-table-column>
          <a-table-column title="所属班级 " dataIndex="bjName" width="150px"> </a-table-column>
          <a-table-column title="毕业证书号" dataIndex="byZsh" width="150px"> </a-table-column>
        </edu-table>
      </div>
      <!-- 编辑页 -->
      <veStuGraduationYxbysShow v-if="showType == 'show'" ref="veStuGraduationYxbysShow" @onOk="editOk" @onCancel="editCancel">
      </veStuGraduationYxbysShow>
    </div>
  </edu-layout>
</template>

<script>
import veStuGraduationYxbysApi from '@/views/stuManage/biye/api/veStuGraduationYxbysApi';
import veStuGraduationYxbysShow from './veStuGraduationYxbysShow';
import moment from 'moment';
export default {
  components: {
    veStuGraduationYxbysEdit,
    veStuGraduationYxbysShow
  },
  data() {
    const data = {
      veStuGraduationYxbysQuery: {},
      showType: 'table'
    };
    data.veStuGraduationYxbysTable = {
      api: veStuGraduationYxbysApi
    };
    return data;
  },
  mounted() {},
  methods: {
	  formatDate(value){
	  	const timestampInMs = value * 1000;
	  	return moment(timestampInMs).format('YYYY-MM-DD');
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
      this.$refs.veStuGraduationYxbysTable.reload();
    },
    /**
     * @msg: 新增事件
     */
    handleCreate() {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veStuGraduationYxbysEdit.doCreate();
      });
    },
    /**
     * @msg: 编辑行事件
     */
    handleUpdate(row) {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veStuGraduationYxbysEdit.doUpdate(row);
      });
    },
    /**
     * @msg: 编辑行事件
     */
    toDetail(row) {
      this.showType = 'show';
      this.$nextTick(() => {
        this.$refs.veStuGraduationYxbysShow.doShow(row);
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
      this.$refs.veStuGraduationYxbysTable.reload();
    }
  }
};
</script>
<style lang="less" scoped></style>
