<template>
  <!-- 表格 -->
  <div slot="table" class="right_table">
    <div>
      <edu-query ref="cwQuery" :ext="$hasPer([`system`,`bzr`])?'boxZybmbj':''" :showZybAndnj="$hasPer([`bzr`])?false:true" :nianji="false" bjStart="s." code="hqStuPositionApply" :do-filter="handleFilter">
        <template slot="search">
          <edu-query-item title="姓名" pname="xm" pop="like" stype="input"v-if="$hasPer([`system`,`teacher`])"> </edu-query-item>
          <edu-query-item title="学号" pname="xh" pop="like" stype="input" v-if="$hasPer([`system`,`teacher`])"> </edu-query-item>
          <edu-query-item title="职位名称" pname="a.title" pop="like" stype="input"> </edu-query-item>
          <edu-query-item title="学期" pname="semester_id" pop="eq">
            <termList ref="termList" v-model="hqStuPositionApplyQuery.xqh" @change="handleFilter"></termList>
          </edu-query-item>
          <edu-query-item title="审核状态" pname="d.status" pop="eq" stype="select" code="xjAuditStatus"> </edu-query-item>
        </template>
      </edu-query>
      <edu-table
        ref="hqStuPositionApplyTable"
        code="hqStuPositionApply"
        :api="hqStuPositionApplyTable.api"
        :get-params="getParams"
        :exportConfig="
          $hasPer(['system','bzr'])?viewType == 'shen'
            ? null
            : {
                url: 'hqStuPositionApply/export',
                name: '《学生职位申请表导出》'
              }:null
        "
        :config="{
          open:false,
          close:false,
          status: false,
          delete:false,
          bdelete:false
        }"
        :toDetail="toDetail"
      >
        <template slot="top_bef_btn" v-if="viewType == 'shen'">
          <edu-pms :code="'v-add'" type="primary" ext="success" iconfont="check-circle" name="审批通过" @click="updateStatus('all', 1)"></edu-pms>
          <edu-pms :code="'veJn-add'" type="primary" ext="delete" iconfont="stop" name="审批未通过" @click="updateStatus('all', 2)"></edu-pms>
        </template>
        <!--         <template slot-scope="text, record, index">
       <span></span>
       </template>-->

        <a-table-column title="学生姓名" dataIndex="xm" width="150px"> </a-table-column>
        <a-table-column title="学生学号" dataIndex="xh" width="150px" v-if="$hasPer(['system'])"> </a-table-column>
        <a-table-column title="所属专业" dataIndex="specText" width="150px" v-if="$hasPer(['system'])"> </a-table-column>
        <a-table-column title="所属班级" dataIndex="bjText" width="150px" v-if="$hasPer(['system'])"> </a-table-column>
        <a-table-column title="职位名称" dataIndex="positionName" width="150px"> </a-table-column>
        <a-table-column title="薪资(元/月)" dataIndex="money" width="150px"> </a-table-column>
        <a-table-column title="学期" dataIndex="termName" width="150px"> </a-table-column>
        <a-table-column title="申请时间" dataIndex="applyTime" width="150px"> </a-table-column>
        <a-table-column title="申请状态" dataIndex="status" width="150px" >
          <template slot-scope="value">
            <edu-dict-text code="xjAuditStatus" :class="'status' + value" :value="value"></edu-dict-text>
          </template>
        </a-table-column>
      </edu-table>
    </div>
    <!-- 编辑页 -->
    <hqStuPositionApplyEdit v-if="showType == 'edit'" ref="hqStuPositionApplyEdit" @onOk="editOk" @onCancel="editCancel"> </hqStuPositionApplyEdit>
    <hqStuPositionApplyShow v-if="showType == 'show'" ref="hqStuPositionApplyShow" @onOk="editOk" @onCancel="editCancel"> </hqStuPositionApplyShow>
  </div>
</template>

<script>
import hqStuPositionApplyApi from '../../../api/hqStuPositionApplyApi';
import hqStuPositionApplyEdit from './hqStuPositionApplyEdit';
import hqStuPositionApplyShow from './hqStuPositionApplyShow';
import termList from '@/components/kqManageComponent/termList';
export default {
  props: {
    viewType: String
  },
  components: {
    hqStuPositionApplyEdit,
    termList,
    hqStuPositionApplyShow
  },
  data() {
    const data = {
      hqStuPositionApplyQuery: {},
      showType: 'table'
    };
    data.hqStuPositionApplyTable = {
      api: hqStuPositionApplyApi
    };
    return data;
  },
  mounted() {},
  methods: {
    updateStatus(id, status) {
      let ssids = [id];
      if (id == 'all') {
        const ids = [];
        const datas = this.$refs.hqStuPositionApplyTable.getSelectRow();
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
      hqStuPositionApplyApi.updateStatus(sub).then(res => {
        this.$notification.success({
          message: '审核成功',
          description: `成功审核[${ssids.length}]条数据`
        });
        this.$refs.hqStuPositionApplyTable.reload();
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
      this.$refs.hqStuPositionApplyTable.reload();
    },
    /**
     * @msg: 新增事件
     */
    handleCreate() {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.hqStuPositionApplyEdit.doCreate();
      });
    },
    /**
     * @msg: 编辑行事件
     */
    handleUpdate(row) {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.hqStuPositionApplyEdit.doUpdate(row);
      });
    },
    /**
     * @msg: 编辑行事件
     */
    toDetail(row) {
      this.showType = 'show';
      this.$nextTick(() => {
        this.$refs.hqStuPositionApplyShow.doShow(row);
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
      this.$refs.hqStuPositionApplyTable.reload();
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
.status0 {
  color: #999;
}
</style>
