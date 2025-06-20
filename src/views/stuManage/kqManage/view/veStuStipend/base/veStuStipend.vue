<template>
  <!-- 表格 -->
  <div slot="table" class="right_table">
    <div>
      <edu-query :ext="$hasPer([`system`,`bzr`])?'boxZybmbj':''" :showZybAndnj="$hasPer([`bzr`])?false:true" bjStart="s." :nianji="false" ref="cwQuery" code="veStuStipend" :do-filter="handleFilter">
        <template slot="search">
          <edu-query-item title="助学金类型" pname="d.type_id" textKey="title" pop="eq" stype="select" :datas="typeNodes" dtype="datas">
          </edu-query-item>
          <edu-query-item title="姓名" pname="s.xm" pop="like" stype="input" v-if="$hasPer([`system`,`teacher`])"> </edu-query-item>
          <edu-query-item title="学号" pname="s.xh" pop="like" stype="input" v-if="$hasPer([`system`,`teacher`])"> </edu-query-item>
          <edu-query-item title="审核状态" code="xjAuditStatus" pname="audit_status" pop="eq" stype="select" v-if="$hasPer([`system`,`teacher`])"> </edu-query-item>
        </template>
      </edu-query>
      <edu-table
        ref="veStuStipendTable"
        code="veStuStipend"
		tfixed="right"
        :api="veStuStipendTable.api"
        :get-params="getParams"
        :doImport="$hasPer(['system','bzr'])?viewType == 'shen' ? null : doImport:null"
        :exportConfig="$hasPer(['system','bzr'])?viewType == 'shen'
            ? null
            : {
                url: 'veStuStipend/export',
                name: '《助学金信息表导出》'
              }:null
        "
        :config="{
          open: false,
          close: false,
          status: false,
		  delete:$hasPer(['system','bzr'])? viewType == 'shen' ? true : false:false,
		  bdelete:$hasPer(['system','bzr'])?true:false,
        }"
		:toDetail="$hasPer(['student','teacher'])?toDetail:null"
        :do-add="$hasPer(['system','bzr'])?handleCreate:null"
        :to-update="$hasPer(['system','bzr'])?handleUpdate:null"
        :rowBtnShowCallback="rowBtnShowCallback" 
      >
        <template slot="top_bef_btn">
          <edu-pms
            :code="'v-add'"
            v-if="viewType == 'shen'"
            type="primary"
            ext="success"
            iconfont="check-circle"
            name="批量通过"
            @click="updateStatus('all', 1)"
          ></edu-pms>
        </template>
        <!--         <template slot-scope="text, record, index">
       <span></span>-->
        <a-table-column title="学生姓名" dataIndex="xm" width="150px"> </a-table-column>
        <a-table-column title="学生学号" dataIndex="xh" width="150px" v-if="$hasPer([`system`,`teacher`])"> </a-table-column>
        <a-table-column title="班级" dataIndex="bjText" width="150px" v-if="$hasPer([`system`,`teacher`])"> </a-table-column>
        <a-table-column title="助学金类型" dataIndex="typeName" width="150px"> </a-table-column>
        <a-table-column title="申请时间" dataIndex="applyTime" width="150px"> </a-table-column>
        <a-table-column title="审核状态" dataIndex="auditStatus" width="150px" v-if="$hasPer([`system`,`teacher`])">
          <template slot-scope="value">
            <edu-dict-text code="xjAuditStatus" :class="'status' + value" :value="value"></edu-dict-text>
          </template>
        </a-table-column>
        <a-table-column title="审核时间" dataIndex="auditTime" width="150px" v-if="$hasPer([`system`,`teacher`])"> </a-table-column>

        <template slot="af_btn" slot-scope="{ row }">
          <edu-pms :code="'aaa'" name="审核" v-if="row.auditStatus == 0&&$hasPer(['system','bzr'])" ext="tedit" type="success" size="mini" @click="toDetailShen(row)"> </edu-pms>
        </template>
      </edu-table>
    </div>
    <!-- 编辑页 -->
    <veStuStipendEdit :typeNodes="typeNodes" v-if="showType == 'edit'" ref="veStuStipendEdit" @onOk="editOk" @onCancel="editCancel">
    </veStuStipendEdit>
    <veStuStipendShow v-if="showType == 'show'" ref="veStuStipendShow" @onOk="editOk" @onCancel="editCancel"> </veStuStipendShow>
	<veStuStipendShen v-if="showType == 'shen'" ref="veStuStipendShen" @onOk="editOk" @onCancel="editCancel"> </veStuStipendShen>
  </div>
</template>

<script>
import veStuStipendApi from '../../../api/veStuStipendApi';
import veStuStipendEdit from './veStuStipendEdit';
import veStuStipendShow from './veStuStipendShow';
import veStuStipendShen from './veStuStipendShen';
import veStuStipendTypeApi from '../../../api/veStuStipendTypeApi';
export default {
  components: {
    veStuStipendEdit,
    veStuStipendShow,
	veStuStipendShen
  },
  props: {
    viewType: String
  },
  data() {
    const data = {
      veStuStipendQuery: {},
      showType: 'table',
      typeNodes: []
    };
    data.veStuStipendTable = {
      api: veStuStipendApi
    };
    return data;
  },
  mounted() {
    this.initData();
  },
  methods: {
    updateStatus(id, status) {
      let ssids = [id];
      if (id == 'all') {
        const ids = [];
        const datas = this.$refs.veStuStipendTable.getSelectRow();
        if (!datas || datas.length == 0) {
          this.$message.error('请选择一项');
          return;
        }
        for (let i = 0; i < datas.length; i++) {
          const element = datas[i];
          if (element.auditStatus != 0) {
            this.$message.error('请选择未审核的数据');
            return;
          }
          ids.push(element.id);
        }
        ssids = ids;
      }
      const sub = {
        ids: ssids,
        auditStatus: status,
        auditReason: ''
      };
      veStuStipendApi.audit(sub).then(res => {
        this.$notification.success({
          message: '审核成功',
          description: `成功审核[${ssids.length}]条数据`
        });
        this.$refs.veStuStipendTable.reload();
      });
    },
    rowBtnShowCallback(type, row) {
      if (this.viewType == 'shen') {
        return false;
      }
	 if(this.$hasPer([`student`])){
		 return true
	 }

      //|| type == 'delete'
      if (type == 'update') {
        //如果审核通过不可以删除
        if (row.auditStatus == 1) {
          return false;
        }
      }
      return true;
    },
    doImport() {
      return {
        temp: ['学生姓名', '学生学号', '班级', '助学金类型', '获得时间'],
        tempName: '助学金信息',
        implName: 'veStuStipendServiceImpl.importExcel'
      };
    },
    initData() {
      const sub = {
        conditions: [{ operator: 'eq', column: 'status', value: 1 }]
      };
      veStuStipendTypeApi.all(sub).then(res => {
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
      this.$refs.veStuStipendTable.reload();
    },
    /**
     * @msg: 新增事件
     */
    handleCreate() {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veStuStipendEdit.doCreate();
      });
    },
    /**
     * @msg: 编辑行事件
     */
    handleUpdate(row) {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veStuStipendEdit.doUpdate(row);
      });
    },
    /**
     * @msg: 编辑行事件
     */
    toDetail(row) {
      this.showType = 'show';
      this.$nextTick(() => {
        this.$refs.veStuStipendShow.doShow(row);
      });
    },
	/**
	 * @msg: 编辑行事件
	 */
	toDetailShen(row) {
	  this.showType = 'shen';
	  this.$nextTick(() => {
	    this.$refs.veStuStipendShen.doShow(row);
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
      this.$refs.veStuStipendTable.reload();
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
