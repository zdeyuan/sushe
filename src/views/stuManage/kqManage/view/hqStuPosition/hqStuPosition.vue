<template>
  <edu-layout type="table">
    <!-- 表格 -->
    <div slot="table" class="right_table">
      <div>
        <edu-query ref="cwQuery" code="hqStuPosition" :do-filter="handleFilter" @refreshBack="refreshBack">
          <template slot="search">
            <edu-query-item title="职位名称" pname="title" pop="like" stype="input"> </edu-query-item>
            <edu-query-item title="职位编号" pname="code" pop="like" stype="input"> </edu-query-item>
            <edu-query-item title="学期" pname="semester_id" pop="eq">
              <termList ref="termList" v-model="hqStuPositionQuery.xqh" @change="handleFilter"></termList>
            </edu-query-item>
            <edu-query-item title="发布部门" stype="costom">
              <deptTree ref="deptTree" width="150px"></deptTree>
            </edu-query-item>
          </template>
        </edu-query>
        <edu-table
          ref="hqStuPositionTable"
          code="hqStuPosition"
          :api="hqStuPositionTable.api"
          :get-params="getParams"
          :config="{
            open: $hasPer(['system','bzr'])?true:false,
            close: $hasPer(['system','bzr'])?true:false,
            openText: $hasPer(['system','bzr'])?'发布':'',
            closeText: $hasPer(['system','bzr'])?'取消发布':'',
            status: false,
			delete:$hasPer(['student'])?false:true,
			bdelete:$hasPer(['student'])?false:true
          }"
         :do-add="$hasPer(['system','bzr'])?handleCreate:null"
         :isAutoBtn="$hasPer(['system','bzr'])?viewType == 'count':false"
         :to-update="$hasPer(['system','bzr'])?handleUpdate:null"
         :toDetail="toDetail"
        >
          <!--         <template slot-scope="text, record, index">
       <span></span>
       </template>-->
          <a-table-column title="职位名称" dataIndex="title" min-width="200px"> </a-table-column>
          <a-table-column title="需要人数" dataIndex="num" width="80px"> </a-table-column>
          <a-table-column title="已批人数" dataIndex="hasNum" width="80px"> </a-table-column>
          <a-table-column title="学期" dataIndex="semesterId" width="150px">
            <template slot-scope="text">
              {{ getName(text) }}
            </template>
          </a-table-column>
          <a-table-column title="薪资(元/月) " dataIndex="money" width="100px"> </a-table-column>
          <a-table-column title="是否需要面试" dataIndex="isView" width="120px">
            <template slot-scope="value">
              <edu-dict-text code="shifou" :value="value"></edu-dict-text>
            </template>
          </a-table-column>
          <a-table-column title="发布状态" dataIndex="status" width="120px">
            <template slot-scope="value">
              <edu-dict-text code="statusFb" :class="'status' + value" :value="value"></edu-dict-text>
            </template>
          </a-table-column>
		  <template slot="af_btn" slot-scope="{ row }" v-if="$hasPer(['student'])">
		    <edu-pms :code="'aaa'" name="申请"  ext="tedit" type="success" size="mini" @click="toDetail(row)" v-if="!row.content"> </edu-pms>
			<span>已申请</span>
		  </template>
        </edu-table>
      </div>
      <!-- 编辑页 -->
      <hqStuPositionEdit v-if="showType == 'edit'" ref="hqStuPositionEdit" @onOk="editOk" @onCancel="editCancel"> </hqStuPositionEdit>
      <hqStuPositionShow v-if="showType == 'show'" ref="hqStuPositionShow" @onApply="applyOk" @onCancel="editCancel"> </hqStuPositionShow>
    </div>
  </edu-layout>
</template>

<script>
import hqStuPositionApi from '../../api/hqStuPositionApi';
import hqStuPositionEdit from './hqStuPositionEdit';
import hqStuPositionShow from './hqStuPositionShow';
import termList from '@/components/kqManageComponent/termList';
import deptTree from '@/components/kqManageComponent/deptTree';

export default {
  components: {
    hqStuPositionEdit,
    hqStuPositionShow,
    termList,
    deptTree
  },
  data() {
    const data = {
      hqStuPositionQuery: {},
      showType: 'table'
    };
    data.hqStuPositionTable = {
      api: hqStuPositionApi
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
    refreshBack() {
      this.$refs.deptTree.setValue([]);
    },
    /**
     * @msg: 表格获取请求数据 必须return 一个对象
     */
    getParams() {
      const params = this.$refs['cwQuery'].getQueryData();
	  if(!this.$hasPer(['system'])){
		  this.$utils.addPageConditions(params, 'status', 'eq', 1);
	  }
      const tres = this.$refs.deptTree.getValue();
      if (tres && tres.length > 0) {
        this.$utils.addPageConditions(params, 'department_id', 'eq', tres[0]);
      }

      return params;
    },
    /**
     * @msg: 搜索事件
     */
    handleFilter() {
      this.$refs.hqStuPositionTable.reload();
    },
    /**
     * @msg: 新增事件
     */
    handleCreate() {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.hqStuPositionEdit.doCreate();
      });
    },
    /**
     * @msg: 编辑行事件
     */
    handleUpdate(row) {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.hqStuPositionEdit.doUpdate(row);
      });
    },
    /**
     * @msg: 编辑行事件
     */
    toDetail(row) {
      this.showType = 'show';
      this.$nextTick(() => {
        this.$refs.hqStuPositionShow.doShow(row);
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
      this.$refs.hqStuPositionTable.reload();
    },
	/**
	 * @msg: 编辑页成功事件
	 */
	editOk() {
	  this.showType = 'apply';
	  this.$refs.hqStuPositionTable.reload();
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
