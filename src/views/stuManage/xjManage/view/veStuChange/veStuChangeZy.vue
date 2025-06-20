<template>
  <!-- 表格 -->
  <div slot="table" class="right_table">
    <a-row>
      <a-col :span="8">
        <div class="tree_layout">
          <div>
           <div style="width:100%;margin-bottom:10px;"> <j-select-banji width="200px" v-model="searchInfo.bjId"  placeholder="请选择班级" :trigger-change="true" ></j-select-banji></div>
            <a-table ref="veBaseStudentTable" code="veBaseStudent" :data-source="stuList" :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }">
              <a-table-column title="学号" fixed="left" dataIndex="xh" width="150px"> </a-table-column>
              <a-table-column title="姓名" fixed="left" dataIndex="xm" width="100px"> </a-table-column>
            </a-table>
          </div>
        </div>
      </a-col>
      <a-col :span="16">
        <div class="common-layout table-layout">
          <veStuChangeZyEdit  ref="veStuChangeEdit"> </veStuChangeZyEdit>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import veStuChangeApi from '@/views/stuManage/xjManage/api/veStuChangeApi';
import veStuChangeZyEdit from './veStuChangeZyEdit';
import JSelectBanji from '@/components/kwglbiz/JSelectBanji'
export default {
  components: {
    veStuChangeZyEdit,
	JSelectBanji
  },
  data() {
    const data = {
      veStuChangeQuery: {},
	  searchInfo:{},
      showType: 'table',
	  stuList: [],
	  selectedRowKeys: [],
    };
    data.veStuChangeTable = {
      api: veStuChangeApi
    };
    return data;
  },
  mounted() {},
 //  watch:{
	// 'searchInfo.bjId'(val){
	// 	this.$refs.veStuChangeEdit.doChange(this.searchInfo);
	// }  
 //  },
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
	 onSelectChange(selectedRowKeys) {
	      console.log('selectedRowKeys changed: ', selectedRowKeys);
	      this.selectedRowKeys = selectedRowKeys;
	    },
    handleFilter() {
      this.$refs.veStuChangeTable.reload();
    },
	customRow(record, index) {
	  return {
	    on: {
	      // 事件
	      click:() => {
			  this.select=record.id
	      }, // 点击行
	      dblclick: event => {},
	      contextmenu: event => {},
	      mouseenter: event => {}, // 鼠标移入行
	      mouseleave: event => {}
	    }
	  };
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
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veStuChangeEdit.doChange(row);
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
