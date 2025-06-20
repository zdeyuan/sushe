<template>
  <edu-layout type="table" :extHeight="viewType == 'count' ? 50 : 0" topName="惩罚查询">
    <!-- 表格 -->
    <div slot="table" class="right_table">
      <div>
        <edu-query :ext="$hasPer([`system`,`bzr`])?'boxZybmbj':''" :showZybAndnj="$hasPer([`bzr`])?false:true" :nianji="false" ref="cwQuery" code="veStuPunish" :do-filter="handleFilter">
          <template slot="search">
            <edu-query-item title="惩罚类型" width="150px" pname="d.type_id" textKey="title" pop="eq" stype="select" :datas="typeNodes" dtype="datas">
            </edu-query-item>
            <edu-query-item title="姓名" pname="name" pop="like" stype="input" v-if="!$hasPer(['student'])"> </edu-query-item>
            <edu-query-item title="学号" pname="d.code" pop="like" stype="input" v-if="!$hasPer(['student'])"> </edu-query-item>
          </template>
        </edu-query>
        <edu-table
          ref="veStuPunishTable"
          code="veStuPunish"
          :api="veStuPunishTable.api"
          :get-params="getParams"
          :exportConfig="!type?$hasPer(['system','bzr'])?{
            url: 'veStuPunish/export',
            name: '《惩罚信息表导出》'
          }:null:null"
          :config="{
            open: false,
            close:false,
            status: false,
			delete:!type?$hasPer(['system','bzr'])?true:false:false,
			bdelete:!type?$hasPer(['system','bzr'])?true:false:false
          }"
		  :do-add="!type?$hasPer(['system','bzr'])?handleCreate:null:null"
		  :isAutoBtn="!type?$hasPer(['system','bzr'])?viewType == 'count':false:false"
		  :to-update="!type?$hasPer(['system','bzr'])?handleUpdate:null:null"
		  :toDetail="toDetail"
        >
          <!--         <template slot-scope="text, record, index">
       <span></span>-->
          <a-table-column title="学生姓名" dataIndex="name" width="150px"> </a-table-column>
          <a-table-column title="学生学号" dataIndex="code" width="150px"> </a-table-column>
          <a-table-column title="班级" dataIndex="bjText" width="150px"> </a-table-column>
          <a-table-column title="惩罚类型" dataIndex="typeName" width="150px"> </a-table-column>
          <a-table-column title="惩罚时间" dataIndex="punishTime" width="150px"> </a-table-column>
        </edu-table>
      </div>
      <!-- 编辑页 -->
      <veStuPunishEdit :typeNodes="typeNodes" v-if="showType == 'edit'" ref="veStuPunishEdit" @onOk="editOk" @onCancel="editCancel">
      </veStuPunishEdit>
      <veStuPunishShow v-if="showType == 'show'" ref="veStuPunishShow" @onOk="editOk" @onCancel="editCancel"> </veStuPunishShow>
    </div>
  </edu-layout>
</template>

<script>
import veStuPunishApi from '../../api/veStuPunishApi';
import veStuPunishEdit from './veStuPunishEdit';
import veStuPunishShow from './veStuPunishShow';
import veStuPunishTypeApi from '../../api/veStuPunishTypeApi';
export default {
  props: {
    viewType: String,
	type:String
  },
  components: {
    veStuPunishEdit,
    veStuPunishShow
  },
  data() {
    const data = {
      veStuPunishQuery: {},
      showType: 'table',
      typeNodes: []
    };
    data.veStuPunishTable = {
      api: veStuPunishApi
    };
    return data;
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      const sub = {
        conditions: [{ operator: 'eq', column: 'status', value: 1 }]
      };
      veStuPunishTypeApi.all(sub).then(res => {
        this.typeNodes = res.result;
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
      this.$refs.veStuPunishTable.reload();
    },
    /**
     * @msg: 新增事件
     */
    handleCreate() {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veStuPunishEdit.doCreate();
      });
    },
    /**
     * @msg: 编辑行事件
     */
    handleUpdate(row) {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veStuPunishEdit.doUpdate(row);
      });
    },
    /**
     * @msg: 编辑行事件
     */
    toDetail(row) {
      this.showType = 'show';
      this.$nextTick(() => {
        this.$refs.veStuPunishShow.doShow(row);
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
      this.$refs.veStuPunishTable.reload();
    }
  }
};
</script>
<style lang="less" scoped></style>
