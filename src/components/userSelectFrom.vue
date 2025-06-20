<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-02-14 17:57:41
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-05-20 20:49:25
-->
<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form title="教职工列表" size="big" width="75%" @ok="onOk" @cancel="handelCancel">
      <div>
        <edu-query ref="cwQuery" code="veJkyAdmin" :do-filter="handleFilter">
          <template slot="search">
            <edu-query-item title="工号" pname="gh" stype="input"> </edu-query-item>
            <edu-query-item title="姓名" pname="xm" stype="input"> </edu-query-item>
            <edu-query-item title="身份证件号" pname="sfzjh" stype="input"> </edu-query-item>
            <!--   <edu-query-item title="部门/专业组" pname="depart" stype="input"> </edu-query-item>
            <edu-query-item title="教职工类别" pname="depart" stype="input"> </edu-query-item>
            <edu-query-item title="编制类别" pname="depart" stype="input"> </edu-query-item> -->
          </template>
        </edu-query>
        <edu-table
          :config="{
            checkType: check ? 'checkbox' : 'radio',
            pageFn: 'getTeaData'
          }"
          ref="veJkyAdminTable"
          code="veJkyAdmin"
          listName="list"
          class="userSelectFrom"
          :onLoad="onLoad"
          :api="veJkyAdminTable.api"
          :get-params="getParams"
          :isShowTopBtn="false"
          isAutoBtn
        >
          <!--         <template slot-scope="text, record, index">
       <span></span>
       </template>-->
          <a-table-column title="姓名" dataIndex="xm" width="150px"> </a-table-column>
          <a-table-column title="电话" dataIndex="lxdh" width="150px"> </a-table-column>
          <a-table-column title="工号" dataIndex="gh" width="150px"> </a-table-column>
          <a-table-column title="部门" dataIndex="dep_name" width="150px"> </a-table-column>
          <a-table-column title="职务" dataIndex="zwm" width="150px"> </a-table-column>
        </edu-table>
      </div>
    </edu-form>
  </div>
</template>

<script>
import sysUserApi from '@/api/common/sysUserApi';
import $ from 'jquery';

export default {
  props: {
    check: {
      type: Boolean,
      default: false
    }
  },
  components: {},
  data() {
    const data = {
      veJkyAdminQuery: {},
      showType: 'table'
    };
    data.veJkyAdminTable = {
      api: sysUserApi
    };
    return data;
  },
  mounted() {},
  methods: {
    onLoad() {
      setTimeout(() => {
        $('.userSelectFrom .ant-table-row-cell-break-word').click(function() {
          $(this)
            .parent()
            .find('.ant-table-selection-column .ant-radio')
            .trigger('click');
        });
      }, 100);
    },
    getParams() {
      const params = this.$refs['cwQuery'].getQueryData();
      return params;
    },
    handleFilter() {
      this.$refs.veJkyAdminTable.reload();
    },
    onOk() {
      let select = this.$refs.veJkyAdminTable.getSelectRow();
      this.$emit('ok', select);
    },
    handelCancel() {
      this.$emit('cancel');
    }
  }
};
</script>
<style lang="less" scoped></style>
