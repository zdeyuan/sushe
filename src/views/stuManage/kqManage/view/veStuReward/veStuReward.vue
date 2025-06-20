<template>
  <edu-layout type="table" :extHeight="viewType == 'count' ? 50 : 0" topName="奖励查询">
    <!-- 表格 -->
    <div slot="table" class="right_table">
      <div>
        <edu-query :ext="$hasPer([`system`,`bzr`])?'boxZybmbj':''" :showZybAndnj="$hasPer([`bzr`])?false:true" :nianji="false" ref="cwQuery" code="veStuReward" :do-filter="handleFilter">
          <template slot="search">
            <edu-query-item title="奖励类型" width="150px" pname="d.type_id" textKey="title" pop="eq" stype="select" :datas="typeNodes" dtype="datas">
            </edu-query-item>
            <edu-query-item title="姓名" pname="name" pop="like" stype="input"> </edu-query-item>
            <edu-query-item title="学号" pname="code" pop="like" stype="input"> </edu-query-item>
          </template>
        </edu-query>
        <edu-table
          ref="veStuRewardTable"
          code="veStuReward"
          :api="veStuRewardTable.api"
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
       <span></span>
               list.add(new ExcelPo("奖励对象","name"));
        list.add(new ExcelPo("班级","bjText"));
        list.add(new ExcelPo("奖励类型","typeName"));
        list.add(new ExcelPo("学生学号","code"));
        list.add(new ExcelPo("属性","attribute","jllb"));
        list.add(new ExcelPo("级别","level","jlJb"));
        list.add(new ExcelPo("获奖时间","rewardTime"));
        list.add(new ExcelPo("获奖描述","content"));
       </template>-->
          <a-table-column title="奖励对象" dataIndex="name" width="150px"> </a-table-column>
          <a-table-column title="班级" dataIndex="bjText" width="150px"> </a-table-column>
          <a-table-column title="奖励类型" dataIndex="typeName" width="150px"> </a-table-column>
          <a-table-column title="属性" dataIndex="attribute" width="150px">
            <template slot-scope="value">
              <edu-dict-text code="jllb" :value="value"></edu-dict-text>
            </template>
          </a-table-column>
          <a-table-column title="级别" dataIndex="level" width="150px">
            <template slot-scope="value">
              <edu-dict-text code="jlJb" :value="value"></edu-dict-text>
            </template>
          </a-table-column>
          <a-table-column title="获奖时间" dataIndex="rewardTime" width="150px"> </a-table-column>
        </edu-table>
      </div>
      <!-- 编辑页 -->
      <veStuRewardEdit :typeNodes="typeNodes" v-if="showType == 'edit'" ref="veStuRewardEdit" @onOk="editOk" @onCancel="editCancel">
      </veStuRewardEdit>
      <veStuRewardShow v-if="showType == 'show'" ref="veStuRewardShow" @onOk="editOk" @onCancel="editCancel"> </veStuRewardShow>
    </div>
  </edu-layout>
</template>

<script>
import veStuRewardApi from '../../api/veStuRewardApi';
import veStuRewardEdit from './veStuRewardEdit';
import veStuRewardShow from './veStuRewardShow';
import veStuRewardTypeApi from '../../api/veStuRewardTypeApi';
export default {
  props: {
    viewType: String,
	type:String
  },
  components: {
    veStuRewardEdit,
    veStuRewardShow
  },
  data() {
    const data = {
      veStuRewardQuery: {},
      showType: 'table',
      typeNodes: []
    };
    data.veStuRewardTable = {
      api: veStuRewardApi
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
      veStuRewardTypeApi.all(sub).then(res => {
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
      this.$refs.veStuRewardTable.reload();
    },
    /**
     * @msg: 新增事件
     */
    handleCreate() {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veStuRewardEdit.doCreate();
      });
    },
    /**
     * @msg: 编辑行事件
     */
    handleUpdate(row) {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veStuRewardEdit.doUpdate(row);
      });
    },
    /**
     * @msg: 编辑行事件
     */
    toDetail(row) {
      this.showType = 'show';
      this.$nextTick(() => {
        this.$refs.veStuRewardShow.doShow(row);
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
      this.$refs.veStuRewardTable.reload();
    }
  }
};
</script>
<style lang="less" scoped></style>
