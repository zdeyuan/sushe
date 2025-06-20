<template>
  <!-- 表格 -->
  <edu-layout type="table">
  <div slot="table" class="right_table">
    <div>
      <edu-query ref="cwQuery" ext="boxZybmbj" :nianji="false" code="veStuGraduation" :do-filter="handleFilter">
        <template slot="search">
         <edu-query-item title="学期">
         <j-select-xueqi placeholder="请选择学期" v-model="queryParam.semid"></j-select-xueqi>
         </edu-query-item>
         <edu-query-item title="课程">
           <j-select-jiaoxue-kecheng placeholder="请选择课程" v-model="queryParam.kcid"></j-select-jiaoxue-kecheng>
         </edu-query-item>
		 <edu-query-item title="教师">
		    <j-select-jiaoshi v-model="queryParam.jsid" :trigger-change="false"></j-select-jiaoshi>
		 </edu-query-item>
          <edu-query-item title="确认状态" pname="qrstatus" code="qrStatus" pop="eq" stype="select"> </edu-query-item>
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
                name: '《教学任务导出》'
              }
        "
        :config="{
          open: false,
          close: false,
          delete: false,
          status: false
        }"
		:toDetail="toDetail"
      >
        <template slot="top_bef_btn" >
          <edu-pms :code="'v-add'" type="primary" ext="success" iconfont="plus" name="必修课教学任务" @click="updateStatus('all', 1)"></edu-pms>
          <edu-pms :code="'veJn-add'" type="info" ext="success" iconfont="plus" name="选修课教学任务" @click="updateStatus('all', 2)"></edu-pms>
        </template>
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
		<template slot="af_btn" slot-scope="{ row }"  >
		  <edu-pms :code="'aaa'" name="确认" ext="tedit" type="success" size="mini" @click="handleUpdate(row)"> </edu-pms>
		</template>
      </edu-table>
    </div>

    <!-- 编辑页 -->
    <veJwJxrwEdit v-if="showType == 'edit'" ref="veStuGraduationEdit" @onOk="editOk" @onCancel="editCancel"> </veJwJxrwEdit>
    <veJwJxrwBy v-if="showType == 'by'" ref="veStuGraduationBy" @onOk="editOk" @onCancel="editCancel"> </veJwJxrwBy>
    <veJwJxrwShow v-if="showType == 'show'" ref="veStuGraduationShow" @onOk="editOk" @onCancel="editCancel"> </veJwJxrwShow>
  </div>
  	 </edu-layout>
</template>

<script>
import veStuGraduationApi from '@/views/stuManage/biye/api/veStuGraduationApi';
import veJwJxrwEdit from './modules/veJwJxrwEdit';
import veJwJxrwBy from './modules/veJwJxrwBy';
import veJwJxrwShow from './modules/veJwJxrwShow';
import JSelectJiaoxueKecheng from '@/components/kwglbiz/JSelectJiaoxueKecheng'
import JSelectxueqi from '@/components/kwglbiz/JSelectXueqi'

import moment from 'moment';
export default {
  components: {
    veJwJxrwEdit,
    veJwJxrwBy,
    veJwJxrwShow,
	JSelectJiaoxueKecheng,
	JSelectxueqi
  },
  data() {
    const data = {
      queryParam: {},
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
      const params = this.$refs['cwQuery'].getQueryData();
      if (this.queryParam.semid) {
        this.$utils.addPageConditions(params, 'semid', 'eq', this.queryParam.semid);
      }
	  if (this.queryParam.kcid) {
	    this.$utils.addPageConditions(params, 'kcid', 'eq', this.queryParam.kcid);
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
