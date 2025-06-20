<template>
  <edu-layout type="table">
    <!-- 表格 -->
    <div slot="table" class="right_table">
      <div>
        <edu-query ref="cwQuery" code="veStuMoralCount" :do-filter="handleFilter">
          <template slot="search">
            <edu-query-item title="学期" pname="sem_id" pop="eq">
              <termList ref="termList" v-model="veStuMoralCountQuery.xqh" @change="handleFilter"></termList>
            </edu-query-item>
          </template>
        </edu-query>
        <edu-table
          ref="veStuMoralCountTable"
          code="veStuMoralCount"
          :api="veStuMoralCountTable.api"
          :get-params="getParams"
          isAutoBtn
          :config="{
            open: false,
            close: false,
            status: false
          }"
        >
          <!--         <template slot-scope="text, record, index">
       <span></span>
       </template>-->
          <a-table-column title="学期名称" dataIndex="semId" width="150px">
            <template slot-scope="text">
              {{ getName(text) }}
            </template>
          </a-table-column>
          <a-table-column title="班级编码" dataIndex="bjCode" width="150px"> </a-table-column>
          <a-table-column title="班级名称" dataIndex="bjName" width="250px"> </a-table-column>
          <a-table-column title="班级德育分数/全校总分数" dataIndex="dyscore"> </a-table-column>
          <a-table-column title="班级德育比" dataIndex="id" width="150px"> </a-table-column>
        </edu-table>
      </div>
      <!-- 编辑页 -->
      <veStuMoralCountShow v-if="showType == 'show'" ref="veStuMoralCountShow" @onOk="editOk" @onCancel="editCancel"> </veStuMoralCountShow>
    </div>
  </edu-layout>
</template>

<script>
import veStuMoralCountApi from '../../api/veStuMoralCountApi';
import veStuMoralCountShow from './veStuMoralCountShow';
import termList from '@/components/termList';
export default {
  components: {
    veStuMoralCountShow,
    termList
  },
  data() {
    const data = {
      veStuMoralCountQuery: {},
      showType: 'table'
    };
    data.veStuMoralCountTable = {
      api: veStuMoralCountApi
    };
    return data;
  },
  mounted() {},
  methods: {
    getName(dataId) {
      const list = this.$refs.termList.getList() || [];
      for (let i = 0; i < list.length; i++) {
        const element = list[i];
        if (element.id == dataId) return element.name;
      }
      return '-';
    },
    doImport() {
      return {
        temp: ['学期名称' /* semId */, '班级id' /* bjId */, '班级名称' /* bjName */, '班级编码' /* bjCode */, '班级德育总分' /* dyscore */],
        tempName: '德育统计表',
        implName: 'veStuMoralCountServiceImpl.importExcel'
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
      this.$refs.veStuMoralCountTable.reload();
    },
    /**
     * @msg: 编辑行事件
     */
    toDetail(row) {
      this.showType = 'show';
      this.$nextTick(() => {
        this.$refs.veStuMoralCountShow.doShow(row);
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
      this.$refs.veStuMoralCountTable.reload();
    }
  }
};
</script>
<style lang="less" scoped></style>
