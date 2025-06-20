<template>
  <edu-layout type="table">
    <!-- 表格 -->
    <div slot="table" class="right_table">
      <div>
        <edu-query ref="cwQuery" code="veStuYyproject" :do-filter="handleFilter">
          <template slot="search">
            <edu-query-item title="预约项目对象" width="200px" pname="type" pop="eq" stype="select" code="yyType"> </edu-query-item>
          </template>
        </edu-query>
        <edu-table
          ref="veStuYyprojectTable"
          code="veStuYyproject"
          :api="veStuYyprojectTable.api"
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
		  :do-add="$hasPer(['system'])?handleCreate:null"
		  :to-update="$hasPer(['system'])?handleUpdate:null"
        >
          <!--         <template slot-scope="text, record, index">
       <span></span>
       </template>-->
          <a-table-column title="预约项目对象" dataIndex="type" width="150px">
            <template slot-scope="value">
              <edu-dict-text code="yyType" :value="value"></edu-dict-text>
            </template>
          </a-table-column>
          <a-table-column title="场地名称" width="250px" >
            <template slot-scope="text, row">
              {{ row.xqmc }} - {{ row.jzwmc }} - {{ row.jsmc }}
            </template>
          </a-table-column>
          <a-table-column title="预约设备" dataIndex="sbName" width="150px"> </a-table-column>
          <!-- <a-table-column title="项目负责人" dataIndex="projectIdText" width="150px"> </a-table-column> -->
          <a-table-column title="限制人数" dataIndex="limitNum" width="150px"> 
		  <template slot-scope="value">
		     {{value}}人
		  </template>
		  </a-table-column>
          <a-table-column title="开始时间" dataIndex="statusTime" width="150px"> </a-table-column>
          <a-table-column title="结束时间" dataIndex="endTime" width="150px"> </a-table-column>
          <a-table-column title="预约形式" dataIndex="yyType" width="150px">
            <template slot-scope="value">
              <edu-dict-text code="yyXinz" :value="value"></edu-dict-text>
            </template>
          </a-table-column>
          <a-table-column title="发布状态" dataIndex="status" width="150px">
            <template slot-scope="value">
              <edu-dict-text code="statusFb" :value="value"></edu-dict-text>
            </template>
          </a-table-column>
		  <template slot="af_btn" slot-scope="{ row }" v-if="$hasPer(['student'])">
		    <edu-pms :code="'aaa'" name="预约" ext="tedit" type="success" v-if="row.yyType==1" size="mini" @click="toYy(row)"> </edu-pms>
			<edu-pms :code="'aaa'" name="已预约" ext="tedit" type="success" v-else size="mini"> </edu-pms>
		  </template>
        </edu-table>
      </div>
      <!-- 编辑页 -->
      <veStuYyprojectEdit v-if="showType == 'edit'" ref="veStuYyprojectEdit" @onOk="editOk" @onCancel="editCancel"> </veStuYyprojectEdit>
      <veStuYyprojectShow v-if="showType == 'show'" ref="veStuYyprojectShow" @onOk="editOk" @onCancel="editCancel"> </veStuYyprojectShow>
	  <veStuYyprojectYy v-if="showType == 'yy'" ref="veStuYyprojectyy" @onOk="editOk" @onCancel="editCancel"> </veStuYyprojectYy>
    </div>
  </edu-layout>
</template>

<script>
import veStuYyprojectApi from '@/views/stuManage/jis/api/veStuYyprojectApi';
import veStuYyprojectEdit from './veStuYyprojectEdit';
import veStuYyprojectShow from './veStuYyprojectShow';
import veStuYyprojectYy from './veStuYyprojectYy';

export default {
  components: {
    veStuYyprojectEdit,
    veStuYyprojectShow,
	veStuYyprojectYy
  },
  data() {
    const data = {
      veStuYyprojectQuery: {},
      showType: 'table'
    };
    data.veStuYyprojectTable = {
      api: veStuYyprojectApi
    };
    return data;
  },
  mounted() {},
  methods: {
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
      this.$refs.veStuYyprojectTable.reload();
    },
    /**
     * @msg: 新增事件
     */
    handleCreate() {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veStuYyprojectEdit.doCreate();
      });
    },
    /**
     * @msg: 编辑行事件
     */
    handleUpdate(row) {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veStuYyprojectEdit.doUpdate(row);
      });
    },
    /**
     * @msg: 编辑行事件
     */
    toDetail(row) {
      this.showType = 'show';
      this.$nextTick(() => {
        this.$refs.veStuYyprojectShow.doShow(row);
      });
    },
	toYy(row){
		this.showType = 'yy';
		this.$nextTick(() => {
		  this.$refs.veStuYyprojectyy.doShow(row);
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
      this.$refs.veStuYyprojectTable.reload();
    }
  }
};
</script>
<style lang="less" scoped></style>
