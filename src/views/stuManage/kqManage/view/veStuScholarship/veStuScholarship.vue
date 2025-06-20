<template>
  <edu-layout type="table">
    <!-- 表格 -->
    <div slot="table" class="right_table">
      <div>
        <edu-query :ext="$hasPer([`system`,`bzr`])?'boxZybmbj':''" :showZybAndnj="$hasPer([`bzr`])?false:true" bjStart="s." :nianji="false" ref="cwQuery" code="veStuScholarship" :do-filter="handleFilter">
          <template slot="search">
            <edu-query-item title="奖学金类型" pname="d.type_id" textKey="title" pop="eq" stype="select" :datas="typeNodes" dtype="datas">
            </edu-query-item>
            <edu-query-item title="姓名" pname="s.xm" pop="like" stype="input" v-if="$hasPer([`system`,`teacher`])"> </edu-query-item>
            <edu-query-item title="学号" pname="s.xh" pop="like" stype="input" v-if="$hasPer([`system`,`teacher`])"> </edu-query-item>
          </template>
        </edu-query>
        <edu-table
          ref="veStuScholarshipTable"
          code="veStuScholarship"
          :api="veStuScholarshipTable.api"
          :get-params="getParams"
          :doImport="!$hasPer(['student','teacher'])?doImport:null"
          :exportConfig="!$hasPer(['student','teacher'])?{
            url: 'veStuScholarship/export',
            name: '《奖学金信息表导出》'
          }:null"
          :config="{
            open: false,
            close: false,
            status: false,
            delete:$hasPer(['system','bzr'])?true:false,
            bdelete:$hasPer(['system','bzr'])?true:false
          }"
		  :toDetail="$hasPer(['student','teacher'])?toDetail:null"
         :do-add="$hasPer(['system','bzr'])?handleCreate:null"
         :to-update="$hasPer(['system','bzr'])?handleUpdate:null"
        >
          <!--         <template slot-scope="text, record, index">
       <span></span>-->
          <a-table-column title="学生姓名" dataIndex="xm" width="150px" > </a-table-column>
          <a-table-column title="学生学号" dataIndex="xh" width="150px"  v-if="!$hasPer(['student'])"> </a-table-column>
          <a-table-column title="班级" dataIndex="bjText" width="150px" v-if="!$hasPer(['student'])"> </a-table-column>
          <a-table-column title="奖学金类型" dataIndex="typeName" width="150px"> </a-table-column>
          <a-table-column title="获得时间" dataIndex="actionTime" width="150px"> </a-table-column>
        </edu-table>
      </div>
      <!-- 编辑页 -->
      <veStuScholarshipEdit :typeNodes="typeNodes" v-if="showType == 'edit'" ref="veStuScholarshipEdit" @onOk="editOk" @onCancel="editCancel">
      </veStuScholarshipEdit>
      <veStuScholarshipShow v-if="showType == 'show'" ref="veStuScholarshipShow" @onOk="editOk" @onCancel="editCancel"> </veStuScholarshipShow>
    </div>
  </edu-layout>
</template>

<script>
import veStuScholarshipApi from '../../api/veStuScholarshipApi';
import veStuScholarshipEdit from './veStuScholarshipEdit';
import veStuScholarshipShow from './veStuScholarshipShow';
import veStuScholarshipTypeApi from '../../api/veStuScholarshipTypeApi';
export default {
  components: {
    veStuScholarshipEdit,
    veStuScholarshipShow
  },
  data() {
    const data = {
      veStuScholarshipQuery: {},
      showType: 'table',
      typeNodes: []
    };
    data.veStuScholarshipTable = {
      api: veStuScholarshipApi
    };
    return data;
  },
  mounted() {
    this.initData();
  },
  methods: {
    doImport() {
      return {
        temp: ['学生姓名' /* stuId */, '学生学号' /* typeId */, '班级' /* actionTime */, '奖学金类型' /* content */, '获得时间' /* giveTime */],
        tempName: '奖学金信息',
        implName: 'veStuScholarshipServiceImpl.importExcel'
      };
    },
    initData() {
      const sub = {
        conditions: [{ operator: 'eq', column: 'status', value: 1 }]
      };
      veStuScholarshipTypeApi.all(sub).then(res => {
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
      this.$refs.veStuScholarshipTable.reload();
    },
    /**
     * @msg: 新增事件
     */
    handleCreate() {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veStuScholarshipEdit.doCreate();
      });
    },
    /**
     * @msg: 编辑行事件
     */
    handleUpdate(row) {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veStuScholarshipEdit.doUpdate(row);
      });
    },
    /**
     * @msg: 编辑行事件
     */
    toDetail(row) {
      this.showType = 'show';
      this.$nextTick(() => {
        this.$refs.veStuScholarshipShow.doShow(row);
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
      this.$refs.veStuScholarshipTable.reload();
    }
  }
};
</script>
<style lang="less" scoped></style>
