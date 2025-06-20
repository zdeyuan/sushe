<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-03-06 21:25:07
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-05-16 14:54:44
-->
<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-03-06 21:25:07
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-03-06 22:56:27
-->
<template>
  <edu-layout type="table">
    <!-- 表格 -->
    <div slot="table" class="right_table">
      <div>
        <edu-query ref="cwQuery" code="veHqChuruku" :do-filter="handleFilter">
          <template slot="search">
            <edu-query-item title="仓库名称" pname="b.id" pop="eq">
              <ckList v-model="veHqChurukuQuery.ckId" @change="handleFilter"></ckList>
            </edu-query-item>
            <edu-query-item title="物品名称" pname="a.id" pop="eq">
              <wpList v-model="veHqChurukuQuery.wpId" @change="handleFilter"></wpList>
            </edu-query-item>
          </template>
        </edu-query>
        <edu-table
          ref="veHqChurukuTable"
          code="veHqChuruku"
          :api="veHqChurukuTable.api"
          :get-params="getParams"
          :exportConfig="{
            url: 'veHqChuruku/kcpageexport',
            name: '《库存导出》'
          }"
          :sorts="[
            {
              column: 'number',
              asc: false
            }
          ]"
          :config="{
            pageFn: 'kcpage',
            status: false,
            delete: false,
            close: false,
            open: false
          }"
          :to-detail="handleShow"
        >
          <!--         <template slot-scope="text, record, index">
       <span></span>
       </template>-->
          <a-table-column title="仓库名称" align="center" dataIndex="ckName" width="150px"> </a-table-column>
          <a-table-column title="物品名称" align="center" dataIndex="wpName" width="150px"> </a-table-column>
          <a-table-column title="库存数量 " align="center" dataIndex="number" width="150px"> </a-table-column>
        </edu-table>
      </div>
      <!-- 编辑页 -->
      <kuShow v-if="showType == 'show'" ref="kuShow" @onOk="editOk" @onCancel="editCancel"> </kuShow>
    </div>
  </edu-layout>
</template>

<script>
import veHqChurukuApi from '@/views/logistics/good/api/veHqChurukuApi';
import kuShow from './base/kuShow';
import ckList from '@/views/logistics/base/component/ckList';
import wpList from '@/views/logistics/good/component/wpList';

export default {
  components: {
    kuShow,
    ckList,
    wpList
  },
  data() {
    const data = {
      veHqChurukuQuery: {},
      showType: 'table'
    };
    data.veHqChurukuTable = {
      api: veHqChurukuApi
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
      this.$refs.veHqChurukuTable.reload();
    },
    /**
     * @msg: 编辑行事件
     */
    handleShow(row) {
      this.showType = 'show';
      this.$nextTick(() => {
        this.$refs.kuShow.doUpdate(row);
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
      this.$refs.veHqChurukuTable.reload();
    }
  }
};
</script>
<style lang="less" scoped></style>
