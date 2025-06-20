<template>
  <!-- 表格 -->
  <div slot="table" class="right_table">
    <div>
      <edu-query ref="cwQuery" ext="boxZybmbj" :nianji="false" code="veStuGraduation" :do-filter="handleFilter">
        <template slot="search">
          <edu-query-item title="姓名" pname="name" pop="like" stype="input"> </edu-query-item>
          <edu-query-item title="学号" pname="code" pop="like" stype="input"> </edu-query-item>
          <edu-query-item title="结束学业状态" pname="jsxym" code="byxsStatus" pop="eq" stype="select"> </edu-query-item>
        </template>
      </edu-query>
      <edu-table
        ref="veStuGraduationTable"
        code="veStuGraduation"
        :api="veStuGraduationTable.api"
        :get-params="getParams"
        :exportConfig="
          print
            ? null
            : {
                url: 'veStuGraduation/export',
                name: '《毕业查询管理导出》'
              }
        "
        :config="{
          open: false,
          close: false,
          delete: false,
          status: false
        }"
        :do-add="viewType == 'wj' ? handleCreate : null"
        :to-update="viewType == 'wj' ? handleUpdate : null"
        :toDetail="viewType == 'admin' ? toDetail : null"
      >
        <template slot="top_bef_btn" v-if="viewType == 'yj'">
          <edu-pms :code="'v-add'" type="primary" ext="success" iconfont="check-circle" name="批量毕业" @click="updateStatus('all', 1)"></edu-pms>
          <edu-pms :code="'veJn-add'" type="primary" ext="success" iconfont="stop" name="批量结业" @click="updateStatus('all', 2)"></edu-pms>
        </template>
        <template slot="bef_btn" slot-scope="{ row }">
          <edu-pms :code="'v-add'" v-if="viewType == 'yj'" type="primary" ext="success" name="数据维护" @click="handleBy(row)"></edu-pms>
          <edu-pms :code="'v-add'" v-if="print" type="primary" ext="success" name="打印" @click="doPrint(row)"></edu-pms>
        </template>

        <!--         <template slot-scope="text, record, index">
       <span></span>
       </template>-->
        <a-table-column title="姓名" dataIndex="name" width="150px"> </a-table-column>
        <a-table-column title="学号" dataIndex="code" width="150px"> </a-table-column>
        <a-table-column title="结束学业年月" dataIndex="jsxyDate" width="150px">
        			  <template slot-scope="value">
        			    <span>{{formatDate(value)}}</span>
        			  </template>
        			</a-table-column>

        <a-table-column title="结束学业类型" dataIndex="jsxym" width="150px">
          <template slot-scope="value">
            <edu-dict-text code="byxsStatus" :class="'status' + value" :value="value"></edu-dict-text>
          </template>
        </a-table-column>
        <a-table-column title="毕业证书号" dataIndex="byZsh" width="150px"> </a-table-column>
        <a-table-column title="获毕业证书日期" dataIndex="byDate" width="150px"> </a-table-column>
        <a-table-column title="结业证书号" dataIndex="jyZsh" width="150px"> </a-table-column>
        <a-table-column title="获结业证书日期" dataIndex="jyDate" width="150px"> </a-table-column>
      </edu-table>
    </div>
    <!-- 编辑页 -->
    <veStuGraduationEdit v-if="showType == 'edit'" ref="veStuGraduationEdit" @onOk="editOk" @onCancel="editCancel"> </veStuGraduationEdit>
    <veStuGraduationBy v-if="showType == 'by'" ref="veStuGraduationBy" @onOk="editOk" @onCancel="editCancel"> </veStuGraduationBy>
    <veStuGraduationShow v-if="showType == 'show'" ref="veStuGraduationShow" @onOk="editOk" @onCancel="editCancel"> </veStuGraduationShow>
  </div>
</template>

<script>
import veStuGraduationApi from '@/views/stuManage/biye/api/veStuGraduationApi';
import veStuGraduationEdit from './veStuGraduationEdit';
import veStuGraduationBy from './veStuGraduationBy';
import veStuGraduationShow from './veStuGraduationShow';
import moment from 'moment';
export default {
  props: {
    viewType: String,
    print: {
      type: Boolean,
      default: false
    }
  },
  components: {
    veStuGraduationEdit,
    veStuGraduationBy,
    veStuGraduationShow
  },
  data() {
    const data = {
      veStuGraduationQuery: {},
      showType: 'table'
    };
    data.veStuGraduationTable = {
      api: veStuGraduationApi
    };
    return data;
  },
  mounted() {},
  methods: {
	formatDate(value){
		const timestampInMs = value * 1000;
		return moment(timestampInMs).format('YYYY-MM-DD');
	},
    updateStatus(id, status) {
      let ssids = [id];
      if (id == 'all') {
        const ids = [];
        const datas = this.$refs.veStuGraduationTable.getSelectRow();
        if (!datas || datas.length == 0) {
          this.$message.error('请选择一项');
          return;
        }
        for (let i = 0; i < datas.length; i++) {
          const element = datas[i];
          /*       if (element.status != 2) {
            this.$message.error('请选择未审核的数据');
            return;
          } */
          ids.push(element.id);
        }
        ssids = ids;
      }
      const sub = {
        ids: ssids,
        status: status
      };
      veStuGraduationApi.updateStatus(sub).then(res => {
        this.$notification.success({
          message: '审核成功',
          description: `成功审核[${ssids.length}]条数据`
        });
        this.$refs.veStuGraduationTable.reload();
      });
    },
    /**
     * @msg: 表格获取请求数据 必须return 一个对象
     */
    getParams() {
      const params = this.$refs['cwQuery'].getQueryData({base:true});
      if (this.viewType == 'wj') {
        this.$utils.addPageConditions(params, 'stu_id', 'eq', 0);
      }
      if (this.viewType == 'yj') {
        this.$utils.addPageConditions(params, 'stu_id', 'gt', 0);
      }
      return params;
    },
    /**
     * @msg: 搜索事件
     */
    handleFilter() {
      this.$refs.veStuGraduationTable.reload();
    },
    /**
     * @msg: 新增事件
     */
    handleCreate() {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veStuGraduationEdit.doCreate();
      });
    },
    /**
     * @msg: 编辑行事件
     */
    handleUpdate(row) {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veStuGraduationEdit.doUpdate(row);
      });
    },
    /**
     * @msg: 编辑行事件
     */
    handleBy(row) {
      this.showType = 'by';
      this.$nextTick(() => {
        this.$refs.veStuGraduationBy.doUpdate(row);
      });
    },
    doPrint(row) {},
    /**
     * @msg: 编辑行事件
     */
    toDetail(row) {
      this.showType = 'show';
      this.$nextTick(() => {
        this.$refs.veStuGraduationShow.doShow(row);
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
      this.$refs.veStuGraduationTable.reload();
    }
  }
};
</script>
<style lang="less" scoped></style>
