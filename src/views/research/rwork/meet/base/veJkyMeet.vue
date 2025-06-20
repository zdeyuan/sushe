<template>
  <!-- 表格 -->
  <div class="right_table">
    <div v-show="showType != 'edit'">
      <edu-query ref="cwQuery" code="veJkyMeet" :do-filter="handleFilter">
        <template slot="search">
          <edu-query-item title="会议主题" pname="title" pop="like" stype="input"> </edu-query-item>
          <edu-query-item title="联系人" pname="contact_Man" pop="like" stype="input"> </edu-query-item>
          <edu-query-item title="项目场地" pname="d.place_id" textKey="name" pop="eq" stype="select"  width="180px"   :datas="placeNodes" dtype="datas">
          </edu-query-item>
          <edu-query-item title="审核状态" v-if="viewType == 'shen'" pname="d.status" pop="eq" stype="select"  width="180px"   code="meetAudit"> </edu-query-item>
        </template>
      </edu-query>
      <edu-table
        ref="veJkyMeetTable"
        code="veJkyMeet"
        :rowBtnShowCallback="rowBtnShowCallback"
        :toDetail="toDetail"
        :opWidth="260"
        :config="{
          open: false,
          close: false,
          status: false,
          bdelete: false,
          checkBox: false
        }"
        :api="veJkyMeetTable.api"
        :get-params="getParams"
        :to-update="handleUpdate"
        :sorts="[
          {
            column: 'd.id',
            asc: false
          }
        ]"
      >
        <template slot="top_bef_btn">
          <edu-pms
            :code="'veJkyMeet-btn-add'"
            v-if="viewType == 'my'"
            type="primary"
            iconfont="plus"
            ext="add"
            name="发布会议申请"
            @click="handleCreate()"
          ></edu-pms>
        </template>
        <!--         <template slot-scope="text, record, index">
       <span></span>
       </template>-->
        <a-table-column title="会议主题" dataIndex="title" width="150px"> </a-table-column>
        <a-table-column title="会议场地" dataIndex="placeName" width="150px"> </a-table-column>
        <a-table-column title="联系人" dataIndex="contactMan" width="150px"> </a-table-column>
        <a-table-column title="联系电话" dataIndex="mobile" width="150px"> </a-table-column>
        <a-table-column title="会议时间" dataIndex="startTime" width="350px">
          <template slot-scope="startTime, row"> {{ startTime }} - {{ row.endTime }} </template>
        </a-table-column>
        <a-table-column title="发起人" dataIndex="createName" width="100px"> </a-table-column>
        <template v-if="viewType != 'apply'">
          <a-table-column title="审核人" dataIndex="markName" width="100px"> </a-table-column>
          <a-table-column title="审核时间" dataIndex="markTime" width="200px"> </a-table-column>
          <a-table-column title="审核状态" dataIndex="status" width="100px">
            <template slot-scope="status">
              <edu-dict-text code="meetAudit" :class="'cstatus' + status" :value="status"></edu-dict-text>
            </template>
          </a-table-column>
        </template>
        <template v-if="viewType == 'apply'">
          <a-table-column title="参会人员" dataIndex="userNames" width="200px">
            <template slot-scope="text, row"> {{ text }}{{ row.otherUser }} </template>
          </a-table-column>
        </template>
        <template slot="af_btn" slot-scope="{ row }">
          <edu-pms v-if="viewType == 'my' && row.status == 1" :code="'aaa'" ext="tedit" name="通知" type="success" size="mini" @click="toNotice(row)">
          </edu-pms>
          <edu-pms v-if="viewType == 'my' && row.status == 1" :code="'aaa'" ext="tedit" name="纪要" type="success" size="mini" @click="toJiyao(row)">
          </edu-pms>
          <edu-pms
            v-if="viewType == 'my' && row.status == 1"
            :code="'aaa'"
            ext="tdelete"
            name="考勤"
            type="success"
            size="mini"
            @click="toKaoqi(row)"
          >
          </edu-pms>
          <edu-pms
            v-if="viewType == 'shen' && row.status == 0"
            :code="'veJkyProject-btn-detail'"
            name="审核"
            ext="tdetil"
            type="success"
            size="mini"
            @click="toShen(row)"
          >
          </edu-pms>
        </template>
      </edu-table>
    </div>
    <!-- 编辑页 -->
    <veJkyMeetEdit v-if="showType == 'edit'" ref="veJkyMeetEdit" :placeNodes="placeNodes" @onOk="editOk" @onCancel="editCancel"> </veJkyMeetEdit>
    <veJkyMeetShow v-if="showType == 'show'" ref="veJkyMeetShow" :placeNodes="placeNodes" @onOk="editOk" @onCancel="editCancel"> </veJkyMeetShow>
    <veJkyMeetKaoqi v-if="showType == 'kaoqi'" ref="veJkyMeetKaoqi" :placeNodes="placeNodes" @onOk="editOk" @onCancel="editCancel"> </veJkyMeetKaoqi>
    <meetSummary v-if="showType == 'summary'" ref="meetSummary" @onOk="editOk" @onCancel="editCancel"> </meetSummary>
    <veJkyMeetRemindEdit v-if="showType == 'remind'" ref="veJkyMeetRemindEdit" @onOk="editOk" @onCancel="editCancel"> </veJkyMeetRemindEdit>
  </div>
</template>

<script>
import veJkyMeetApi from '@/api/research/rwork/veJkyMeetApi';
import veJkyMeetPlaceApi from '@/api/research/rwork/veJkyMeetPlaceApi';
import veJkyMeetEdit from './veJkyMeetEdit';
import veJkyMeetShow from './veJkyMeetShow';
import veJkyMeetKaoqi from './veJkyMeetKaoqi';
import meetSummary from '@/views/research/rwork/meetSummary/meetSummary';
import veJkyMeetRemindEdit from '@/views/research/rwork/meetRemind/veJkyMeetRemindEdit';
import { baseMixins } from '@/mixins/baseMixins';

export default {
  props: {
    viewType: String
  },
  components: {
    veJkyMeetEdit,
    meetSummary,
    veJkyMeetKaoqi,
    veJkyMeetShow,
    veJkyMeetRemindEdit
  },
  data() {
    const data = {
      veJkyMeetQuery: {},
      showType: 'table',
      placeNodes: []
    };
    data.veJkyMeetTable = {
      api: veJkyMeetApi
    };
    return data;
  },
  mixins: [baseMixins],
  mounted() {
    veJkyMeetPlaceApi.all({}).then(res => {
      this.placeNodes = res.result;
    });
  },
  methods: {
    toNotice(row) {
      this.showType = 'remind';
      this.$nextTick(() => {
        this.$refs.veJkyMeetRemindEdit.doCreate(row);
      });
    },
    toJiyao(row) {
      this.showType = 'summary';
      this.$nextTick(() => {
        this.$refs.meetSummary.doShow(row);
      });
    },
    toKaoqi(row) {
      this.showType = 'kaoqi';
      this.$nextTick(() => {
        this.$refs.veJkyMeetKaoqi.doShow(row, 'shen');
      });
    },

    rowBtnShowCallback(type, row) {
      if (type == 'detail') {
        return true;
      }
      if (this.viewType == 'my' && row.status != 1) {
        return true;
      }
      return false;
    },
    /**
     * @msg: 表格获取请求数据 必须return 一个对象
     */
    getParams() {
      const params = this.$refs['cwQuery'].getQueryData();
      if (this.viewType == 'my') {
        this.$utils.addPageConditions(params, 'd.create_uid', 'eq', this.loginInfo.userId);
      } else if (this.viewType == 'apply') {
        this.$utils.addPageConditions(params, 'd.status', 'eq', 1);
        params.params = {
          apply: 'apply'
        };
      }
      return params;
    },
    /**
     * @msg: 搜索事件
     */
    handleFilter() {
      this.$refs.veJkyMeetTable.reload();
    },
    /**
     * @msg: 新增事件
     */
    handleCreate() {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veJkyMeetEdit.doCreate();
      });
    },
    /**
     * @msg: 编辑行事件
     */
    handleUpdate(row) {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veJkyMeetEdit.doUpdate(row);
      });
    },

    /**
     * @msg: 编辑行事件
     */
    toDetail(row) {
      this.showType = 'show';
      this.$nextTick(() => {
        this.$refs.veJkyMeetShow.doShow(row, 'show');
      });
    },
    toShen(row) {
      this.showType = 'show';
      this.$nextTick(() => {
        this.$refs.veJkyMeetShow.doShow(row, 'shen');
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
      this.$refs.veJkyMeetTable.reload();
    }
  }
};
</script>

<style lang="less" scoped>
.cstatus1 {
  color: #039471;
}
.cstatus2 {
  color: rgb(212, 117, 117);
}
.cstatus0 {
  color: #999;
}
</style>
