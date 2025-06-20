<template>
  <edu-layout type="table">
    <!-- 表格 -->
    <div slot="table" class="right_table">
      <div>
        <edu-query ref="cwQuery" code="veBaseBanji" :banji="false" ext="boxZybmbj" :do-filter="handleFilter">
          <template slot="search">
            <edu-query-item title="班级名称" pname="xzbmc" pop="like" stype="input"> </edu-query-item>
          </template>
        </edu-query>
        <edu-table
          ref="veBaseBanjiTable"
          code="veBaseBanji"
          :api="veBaseBanjiTable.api"
          :get-params="getParams"
          :config="{
            open: false,
            close: false,
            status: false,
            bdelete: false
          }"
          isAutoBtn
        >
          <template slot="top_bef_btn">
            <edu-pms
              :code="'v-add'"
              type="primary"
              ext="success"
              iconfont="check-circle"
              name="设置为毕业班级"
              @click="updateStatus('all', 1)"
            ></edu-pms>
          </template>
          <!--         <template slot-scope="text, record, index">
       <span></span>
       </template>-->
          <a-table-column title="毕业班级" dataIndex="bystatus" width="150px">
            <template slot-scope="text">
              <span v-if="text == 0" class="status0">否</span>
              <span v-else class="status1">是</span>
            </template>
          </a-table-column>
          <a-table-column title="行政班代码" dataIndex="xzbdm" width="150px"> </a-table-column>
          <a-table-column title="行政班名称" dataIndex="xzbmc" width="150px"> </a-table-column>
          <a-table-column title="所属专业" dataIndex="specText" width="150px"> </a-table-column>
          <a-table-column title="所属年级" dataIndex="gradeText" width="150px"> </a-table-column>
          <a-table-column title="毕业时间" dataIndex="bysj" width="150px">
            <template slot-scope="text">
              <span>{{ $date.formatData(text * 1000, 'YYYY-MM-DD') }}</span>
            </template>
          </a-table-column>
          <a-table-column title="校区" dataIndex="xqmc" width="150px"> </a-table-column>
          <a-table-column title="总人数" dataIndex="zrs" width="150px"> </a-table-column>
        </edu-table>
      </div>
      <!-- 编辑页 -->
    </div>
  </edu-layout>
</template>

<script>
import veBaseBanjiApi from '@/views/stuManage/biye/api/veBaseBanjiApi';

export default {
  components: {},
  data() {
    const data = {
      veBaseBanjiQuery: {},
      showType: 'table'
    };
    data.veBaseBanjiTable = {
      api: veBaseBanjiApi
    };
    return data;
  },
  mounted() {},
  methods: {
    updateStatus(id, status) {
      let ssids = [id];
      if (id == 'all') {
        const ids = [];
        const datas = this.$refs.veBaseBanjiTable.getSelectRow();
        if (!datas || datas.length == 0) {
          this.$message.error('请选择一项');
          return;
        }
        for (let i = 0; i < datas.length; i++) {
          const element = datas[i];
          if (element.bystatus != 0) {
            this.$message.error('请选择未毕业的数据');
            return;
          }
          ids.push(element.id);
        }
        ssids = ids;
      }
      const sub = {
        ids: ssids,
        status: status
      };
      veBaseBanjiApi.updateStatus(sub).then(res => {
        this.$notification.success({
          message: '设置成功',
          description: `成功设置[${ssids.length}]条数据`
        });
        this.$refs.veBaseBanjiTable.reload();
      });
    },
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
      this.$refs.veBaseBanjiTable.reload();
    },
    /**
     * @msg: 新增事件
     */
    handleCreate() {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veBaseBanjiEdit.doCreate();
      });
    },
    /**
     * @msg: 编辑行事件
     */
    handleUpdate(row) {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veBaseBanjiEdit.doUpdate(row);
      });
    },
    /**
     * @msg: 编辑行事件
     */
    toDetail(row) {
      this.showType = 'show';
      this.$nextTick(() => {
        this.$refs.veBaseBanjiShow.doShow(row);
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
      this.$refs.veBaseBanjiTable.reload();
    }
  }
};
</script>
<style lang="less" scoped>
.status1 {
  color: #039471;
}
.status0 {
  color: rgb(212, 117, 117);
}
</style>
