<template>
  <edu-layout type="table">
    <!-- 表格 -->
    <div slot="table" class="right_table">
      <div>
        <edu-query ref="cwQuery" code="veJkyUser" :do-filter="handleFilter">
          <template slot="search">
            <edu-query-item title="姓名" pname="realname" pop="like" stype="input"> </edu-query-item>
            <edu-query-item title="职称" pname="pro_Call" pop="eq" stype="select"  width="180px"   code="zhichen"> </edu-query-item>
            <edu-query-item title="身份证号" pname="id_Card" pop="like" stype="input"> </edu-query-item>
            <edu-query-item title="人员类型" pname="type_Num" pop="eq" stype="select"  width="180px"   code="userType"> </edu-query-item>
          </template>
        </edu-query>
        <edu-table
          ref="veJkyUserTable"
          code="veJkyUser"
          :api="veJkyUserTable.api"
          :get-params="getParams"
          :config="{
            open: false,
            close: false,
            status: false
          }"
          :to-update="handleUpdate"
          :exportConfig="{
            url: 'veJkyUser/export',
            name: '《人员导出》'
          }"
        >
          <template slot="top_bef_btn">
            <edu-pms :code="'veJkyUser-btn-add'" type="primary" ext="add" iconfont="plus" name="添加校内人员" @click="handleCreate('in')"></edu-pms>
            <edu-pms :code="'veJkyUser-btn-add'" type="primary" ext="add" iconfont="plus" name="添加校外人员" @click="handleCreate('out')"></edu-pms>
          </template>
          <!--         <template slot-scope="text, record, index">
       <span></span>
       </template>-->
          <a-table-column title="姓名" dataIndex="realname" width="150px"> </a-table-column>
          <a-table-column title="人员类型" dataIndex="typeNum" width="150px">
            <template slot-scope="text">
              <edu-dict-text code="userType" :value="text"></edu-dict-text>
            </template>
          </a-table-column>
          <a-table-column title="职称" dataIndex="proCall" width="150px">
            <template slot-scope="text">
              <edu-dict-text code="zhichen" :value="text"></edu-dict-text>
            </template>
          </a-table-column>
          <a-table-column title="性别" dataIndex="sexNum" width="150px">
            <template slot-scope="text">
              <edu-dict-text code="sex" :value="text"></edu-dict-text>
            </template>
          </a-table-column>
          <a-table-column title="年龄" dataIndex="birthday" width="150px">
            <template slot-scope="text">
              <span>{{ $utils.getAgeByBirthday(text) }}</span>
            </template>
          </a-table-column>
          <a-table-column title="联系电话" dataIndex="phone" width="150px"> </a-table-column>
          <a-table-column title="毕业院校" dataIndex="graCollege" width="150px"> </a-table-column>
          <a-table-column title="学历" dataIndex="educate" width="150px">
            <template slot-scope="text">
              <edu-dict-text code="xueli" :value="text"></edu-dict-text>
            </template>
          </a-table-column>
          <a-table-column title="身份证号" dataIndex="idCard" width="200px"> </a-table-column>
        </edu-table>
      </div>
      <!-- 编辑页 -->
      <veJkyUserEdit v-if="showType == 'edit'" ref="veJkyUserEdit" @onOk="editOk" @onCancel="editCancel"> </veJkyUserEdit>
    </div>
  </edu-layout>
</template>

<script>
import veJkyUserApi from '@/api/research/rbase/veJkyUserApi';
import veJkyUserEdit from './veJkyUserEdit';

export default {
  components: {
    veJkyUserEdit
  },
  data() {
    const data = {
      veJkyUserQuery: {},
      showType: 'table'
    };
    data.veJkyUserTable = {
      api: veJkyUserApi
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 表格获取请求数据 必须return 一个对象
     */
    getParams() {
      var params = this.$refs['cwQuery'].getQueryData();
      return params;
    },
    /**
     * @msg: 搜索事件
     */
    handleFilter() {
      this.$refs.veJkyUserTable.reload();
    },
    /**
     * @msg: 新增事件
     */
    handleCreate(type) {
      if (type == 'in') {
        this.$message.error('未对接');
        return;
      }
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veJkyUserEdit.doCreate(type);
      });
    },
    /**
     * @msg: 编辑行事件
     */
    handleUpdate(row) {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veJkyUserEdit.doUpdate(row);
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
      this.$refs.veJkyUserTable.reload();
    }
  }
};
</script>
<style lang="less" scoped></style>
