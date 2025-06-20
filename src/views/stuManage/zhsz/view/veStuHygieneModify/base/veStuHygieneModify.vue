<template>
  <!-- 表格 -->
  <div slot="table" class="right_table">
    <div>
      <edu-query
        :ext="viewType == 'my' ? 'boxZybmbj' : ''"
        bjStart="s."
        :nianji="false"
        ref="cwQuery"
        code="veStuHygieneModify"
        :do-filter="handleFilter"
      >
        <template slot="search">
          <edu-query-item title="姓名" pname="s.xm" pop="like" stype="input"> </edu-query-item>
          <edu-query-item title="学号" pname="s.xh" pop="like" stype="input"> </edu-query-item>
        </template>
      </edu-query>

      <edu-table
        ref="veStuHygieneModifyTable"
        code="veStuHygieneModify"
        :api="veStuHygieneModifyTable.api"
        :get-params="getParams"
        :config="{
          open: false,
          close: false,
          status: false,
          bdelete: false
        }"
        :do-add="viewType == 'admin' ? null : handleCreate"
        :isAutoBtn="viewType == 'admin'"
      >
        <template slot="top_bef_btn" v-if="viewType == 'admin'">
          <edu-pms :code="'v-add'" type="primary" ext="success" iconfont="check-circle" name="同意修改" @click="updateStatus('all', 1)"></edu-pms>
          <edu-pms :code="'veJn-add'" type="primary" ext="delete" iconfont="stop" name="不同意修改" @click="updateStatus('all', 2)"></edu-pms>
        </template>
        <!--        :to-update="handleUpdate"
        :toDetail="toDetail"    <template slot-scope="text, record, index">
       <span></span>
       </template>-->
        <a-table-column title="项目" dataIndex="itemName" width="150px"> </a-table-column>
        <a-table-column title="学生姓名" dataIndex="xm" width="150px"> </a-table-column>
        <a-table-column title="学生学号" dataIndex="xh" width="150px"> </a-table-column>
        <a-table-column title="申请修改原因" dataIndex="reason" width="150px"> </a-table-column>
        <a-table-column title="是否同意修改" dataIndex="status" width="150px">
          <template slot-scope="text">
            <span v-if="text == 0" class="status2">待审核</span>
            <span v-else class="status1">已通过</span>
          </template>
        </a-table-column>
      </edu-table>
    </div>
    <!-- 编辑页 -->
    <veStuHygieneModifyEdit v-if="showType == 'edit'" ref="veStuHygieneModifyEdit" @onOk="editOk" @onCancel="editCancel"> </veStuHygieneModifyEdit>
    <veStuHygieneModifyShow v-if="showType == 'show'" ref="veStuHygieneModifyShow" @onOk="editOk" @onCancel="editCancel"> </veStuHygieneModifyShow>
  </div>
</template>

<script>
import veStuHygieneModifyApi from '../../../api/veStuHygieneModifyApi';
import veStuHygieneModifyEdit from './veStuHygieneModifyEdit';
import veStuHygieneModifyShow from './veStuHygieneModifyShow';
import { baseMixins } from '@/mixins/baseMixins';

export default {
  mixins: [baseMixins],
  props: {
    viewType: String
  },
  components: {
    veStuHygieneModifyEdit,
    veStuHygieneModifyShow
  },
  data() {
    const data = {
      veStuHygieneModifyQuery: {},
      showType: 'table'
    };
    data.veStuHygieneModifyTable = {
      api: veStuHygieneModifyApi
    };
    return data;
  },
  mounted() {},
  methods: {
    updateStatus(id, status) {
      let ssids = [id];
      if (id == 'all') {
        const ids = [];
        const datas = this.$refs.veStuHygieneModifyTable.getSelectRow();
        if (!datas || datas.length == 0) {
          this.$message.error('请选择一项');
          return;
        }
        for (let i = 0; i < datas.length; i++) {
          const element = datas[i];
          if (element.status != 0) {
            this.$message.error('请选择未审核的数据');
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
      veStuHygieneModifyApi.updateStatus(sub).then(res => {
        this.$notification.success({
          message: '审核成功',
          description: `成功审核[${ssids.length}]条数据`
        });
        this.$refs.veStuHygieneModifyTable.reload();
      });
    },
    /**
     * @msg: 表格获取请求数据 必须return 一个对象
     */
    getParams() {
      const params = this.$refs['cwQuery'].getQueryData({ base: true });
      if (this.viewType == 'my') {
        // this.$utils.addPageConditions(params, 'd.create_by', 'eq', this.loginInfo.userId);
      }
      return params;
    },
    /**
     * @msg: 搜索事件
     */
    handleFilter() {
      this.$refs.veStuHygieneModifyTable.reload();
    },
    /**
     * @msg: 新增事件
     */
    handleCreate() {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veStuHygieneModifyEdit.doCreate();
      });
    },
    /**
     * @msg: 编辑行事件
     */
    handleUpdate(row) {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veStuHygieneModifyEdit.doUpdate(row);
      });
    },
    /**
     * @msg: 编辑行事件
     */
    toDetail(row) {
      this.showType = 'show';
      this.$nextTick(() => {
        this.$refs.veStuHygieneModifyShow.doShow(row);
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
      this.$refs.veStuHygieneModifyTable.reload();
    }
  }
};
</script>
<style lang="less" scoped>
.status1 {
  color: #039471;
}
.status2 {
  color: rgb(212, 117, 117);
}
</style>
