<template>
  <!-- 表格 -->
  <div slot="table" class="right_table">
    <div>
      <edu-query ref="cwQuery" code="veStuChange" :do-filter="handleFilter">
        <template slot="search">
          <edu-query-item title="学生学号" pname="NAME" pop="like" stype="input"> </edu-query-item>
          <edu-query-item title="学生姓名" pname="TITLE" pop="like" stype="input"> </edu-query-item>
        </template>
      </edu-query>
      <edu-table
        ref="veStuChangeTable"
        code="veStuChange"
        :api="veStuChangeTable.api"
        :get-params="getParams"
        :config="{
          open: false,
          close: false,
          status: false,
		   delete:false,
		  bdelete:false
        }"
        :toDetail="toDetail"
      >
        <!--         <template slot-scope="text, record, index">
       <span></span>
       </template>-->
        <a-table-column title="学生学号" dataIndex="code" width="150px"> </a-table-column>
        <a-table-column title="学生姓名" dataIndex="name" width="150px"> </a-table-column>
        <a-table-column title="异动类别" dataIndex="ydlbm" width="150px"> 
		<template slot-scope="value">
		  <edu-dict-text code="ydlbm" :value="value"></edu-dict-text>
		</template>
		</a-table-column>
        <a-table-column title="异动日期" dataIndex="ydDate" width="150px"> </a-table-column>
        <a-table-column title="原年级" dataIndex="ogradeTest" width="150px"> </a-table-column>
        <a-table-column title="原专业码" dataIndex="ospecText" width="150px"> </a-table-column>
        <a-table-column title="原班级 " dataIndex="objText" width="150px"> </a-table-column>
        <a-table-column title="现年级" dataIndex="gradeText" width="150px"> </a-table-column>
        <a-table-column title="现专业 " dataIndex="specText" width="150px"> </a-table-column>
        <a-table-column title="现班级" dataIndex="bjText" width="150px"> </a-table-column>
        <!-- <a-table-column title="异动去向" dataIndex="ydqxxm" width="150px"> </a-table-column> -->
		<template slot="af_btn" slot-scope="{ row }" >
		  <edu-pms :code="'ttt'" name="异动恢复" type="primary" size="mini" @click="handleUpdate(row,'change')" v-if="row.isRecover==0"> </edu-pms>
		  <edu-pms :code="'veJn-add'" type="primary" ext="delete"  name="异动已恢复" v-else></edu-pms>
		</template>
      </edu-table>
    </div>
    <!-- 编辑页 -->
    <veStuChangeEdit v-if="showType == 'edit'" ref="veStuChangeEdit" @onOk="editOk" @onCancel="editCancel"> </veStuChangeEdit>
    <veStuChangeShow v-if="showType == 'show'" ref="veStuChangeShow" @onOk="editOk" @onCancel="editCancel"> </veStuChangeShow>
  </div>
</template>

<script>
import veStuChangeApi from '@/views/stuManage/xjManage/api/veStuChangeApi';
import veStuChangeEdit from './veStuChangeEdit';
import veStuChangeShow from './veStuChangeShow';

export default {
  components: {
    veStuChangeEdit,
    veStuChangeShow
  },
  data() {
    const data = {
      veStuChangeQuery: {},
      showType: 'table'
    };
    data.veStuChangeTable = {
      api: veStuChangeApi
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
      this.$refs.veStuChangeTable.reload();
    },
    /**
     * @msg: 新增事件
     */
    handleCreate() {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veStuChangeEdit.doCreate();
      });
    },
    /**
     * @msg: 编辑行事件
     */
    handleUpdate(row) {
      let data={
      	stuId:row.stuId,
      	id:row.id
      }
      veStuChangeApi.update(data).then(() => {
      	this.$notification.success({
      		message: '异动恢复成功',
      		description: '修改了一条数据'
      	});
      	this.editOk();
      });
    },
    /**
     * @msg: 编辑行事件
     */
    toDetail(row) {
      this.showType = 'show';
      this.$nextTick(() => {
        this.$refs.veStuChangeShow.doShow(row);
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
      this.$refs.veStuChangeTable.reload();
    }
  }
};
</script>
<style lang="less" scoped></style>
