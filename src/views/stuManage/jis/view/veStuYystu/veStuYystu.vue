<template>
  <edu-layout type="table">
    <!-- 表格 -->
    <div slot="table" class="right_table">
      <div>
        <edu-query ref="cwQuery" code="veStuYystu" :do-filter="handleFilter">
          <template slot="search">
            <edu-query-item title="预约项目对象" width="200px" pname="type" pop="eq" stype="select" code="yyType"> </edu-query-item>
          </template>
        </edu-query>
        <edu-table
          ref="veStuYystuTable"
          code="veStuYystu"
          :api="veStuYystuTable.api"
          :get-params="getParams"
          :config="{
            open: $hasPer(['system'])?true:false,
            close: $hasPer(['system'])?true:false,
            openText: '发布',
            closeText: '取消发布',
            status: false,
            delete:$hasPer(['student'])?false:true,
            bdelete:$hasPer(['student'])?false:true
          }"
		   :toDetail="$hasPer(['system'])?toDetail:null"
        >
          <!--         <template slot-scope="text, record, index">
       <span></span>
       </template>-->
          <a-table-column title="预约项目对象" dataIndex="type" width="150px">
            <template slot-scope="value">
              <edu-dict-text code="yyType" :value="value"></edu-dict-text>
            </template>
          </a-table-column>
          <a-table-column title="场地名称" dataIndex="address" width="150px"> </a-table-column>
          <a-table-column title="预约设备" dataIndex="sbName" width="150px"> </a-table-column>
		  <a-table-column title="学号" dataIndex="xh" width="150px"> </a-table-column>
		  <a-table-column title="姓名" dataIndex="xm" width="150px"> </a-table-column>
          <!-- <a-table-column title="项目负责人" dataIndex="projectIdText" width="150px"> </a-table-column> -->
          <a-table-column title="限制人数" dataIndex="limitNum" width="150px"> </a-table-column>
          <a-table-column title="开始时间" dataIndex="statusTime" width="150px"> 
			<template slot-scope="value">
			  <span>{{ moment(value).format("YYYY-MM-DD")}}</span>
			</template>
		  </a-table-column>
          <a-table-column title="结束时间" dataIndex="endTime" width="150px"> 
		  <template slot-scope="value">
		    <span>{{ moment(value).format("YYYY-MM-DD")}}</span>
		  </template>
		  </a-table-column>
          <a-table-column title="预约开始时间" dataIndex="yystartTime" width="150px">
            <template slot-scope="text, record">
              <span>{{ record.yystartTime }} - {{ record.yyendTime }}</span>
            </template>
          </a-table-column>
		  <a-table-column title="审核结果" dataIndex="yyauthStatus" width="150px">
		    <template slot-scope="value">
				<edu-dict-text :value="value" code="shetAuditStatus" /></td>
		    </template>
		  </a-table-column>
          <template slot="af_btn" slot-scope="{ row }" >
            <template v-if="!$hasPer(['system'])">
				<span v-if="row.yyauthStatus == 0" style="color:rgb(212, 117, 117)">不通过</span>
				<span v-else-if="row.yyauthStatus == 1" style="color:#039471">已通过</span>
				<edu-pms :code="'aaa'" name="查看" ext="tdo" type="success" size="mini" @click="toDetail(row)"> </edu-pms>
			</template>
            <template v-if="$hasPer(['system'])&&(row.yyauthStatus!=0&&row.yyauthStatus!=1)">
              <edu-pms :code="'aaa'" name="通过" ext="tdo" type="success" size="mini" @click="updateStatus(row.id, 1)"> </edu-pms>
              <edu-pms :code="'aaa'" name="不通过" ext="tdo" type="success" size="mini" @click="updateStatus(row.id, 0)"> </edu-pms>
            </template>
          </template>
        </edu-table>
      </div>
      <!-- 编辑页 -->
      <veStuYystuEdit v-if="showType == 'edit'" ref="veStuYystuEdit" @onOk="editOk" @onCancel="editCancel"> </veStuYystuEdit>
      <veStuYystuShow v-if="showType == 'show'" ref="veStuYystuShow" @onOk="editOk" @onCancel="editCancel"> </veStuYystuShow>
    </div>
  </edu-layout>
</template>

<script>
import veStuYystuApi from '@/views/stuManage/jis/api/veStuYystuApi';
import veStuYystuEdit from './veStuYystuEdit';
import veStuYystuShow from './veStuYystuShow';
import moment from 'moment';

export default {
  components: {
    veStuYystuEdit,
    veStuYystuShow
  },
  data() {
    const data = {
      veStuYystuQuery: {},
      showType: 'table'
    };
    data.veStuYystuTable = {
      api: veStuYystuApi
    };
    return data;
  },
  mounted() {},
  methods: {
	  moment,
    updateStatus(id, status) {
      let ssids = [id];
      if (id == 'all') {
        const ids = this.$refs.veStuYystuTable.getSelectRowIds();
        if (!ids || ids.length == 0) {
          this.$message.error('请选择一项');
          return;
        }
        ssids = ids;
      }
      const sub = {
        ids: ssids,
        status: status
      };
      veStuYystuApi.updateStatus(sub).then(res => {
        this.$notification.success({
          message: '成功',
          description: `成功[${ssids.length}]条数据`
        });
        this.$refs.veStuYystuTable.reload();
      });
    },
    /**
     * @msg: 表格获取请求数据 必须return 一个对象
     */
    getParams() {
      const params = this.$refs['cwQuery'].getQueryData();
      return params;
    },
    /**
     * @msg: 搜索事件
     */
    handleFilter() {
      this.$refs.veStuYystuTable.reload();
    },
    /**
     * @msg: 新增事件
     */
    handleCreate() {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veStuYystuEdit.doCreate();
      });
    },
    /**
     * @msg: 编辑行事件
     */
    handleUpdate(row) {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veStuYystuEdit.doUpdate(row);
      });
    },
    /**
     * @msg: 编辑行事件
     */
    toDetail(row) {
      this.showType = 'show';
      this.$nextTick(() => {
        this.$refs.veStuYystuShow.doShow(row);
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
      this.$refs.veStuYystuTable.reload();
    }
  }
};
</script>
<style lang="less" scoped></style>
