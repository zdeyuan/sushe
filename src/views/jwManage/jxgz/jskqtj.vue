<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-02-14 23:36:16
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-06-02 20:39:16
-->
<template>
  <a-tabs class="auto-tabs">
    <a-tab-pane tab="课时上报" key="1">
      <edu-layout type="table" :extHeight="50" topName="课时上报">
        <veStuChange slot="table"></veStuChange>
      </edu-layout>
    </a-tab-pane>
    <a-tab-pane tab="教师考勤统计" key="2">
      <edu-layout type="table" :extHeight="50" topName="教师考勤统计">
        <veStuChangeZy slot="table"></veStuChangeZy>
      </edu-layout>
    </a-tab-pane>
	<a-tab-pane tab="教师考勤详情" key="3">
	  <edu-layout type="table" :extHeight="50" topName="教师考勤详情">
	    <classDetail slot="table"></classDetail>
	  </edu-layout>
	</a-tab-pane>
  </a-tabs>
</template>

<script>
import veStuChange from './timeManage/add/classReport';
import veStuChangeZy from './timeManage/list/workList';
import classDetail from './timeManage/detail/classDetail';

export default {
  components: {
    veStuChange,
    veStuChangeZy,
	classDetail
  },
  data() {
    return {
      activeName: 'first'
    };
  },
  mounted() {},
  methods: {}
};
</script>
<style lang="less" scoped>
  ::v-deep .j-select-biz-component-box {
	  width: 300px;
  }	
  ::v-deep .ant-table-thead > tr > th{
  	background:#66C3FD;
  	color:#FFFFFF;
  }	
  
  
  ::v-deep .sbys .ant-form-item-control{
  	  width: 600px ;
  }
  ::v-deep .common-layout{
  	  padding:0 15px!important;
  }
  ::v-deep .ant-tabs-bar{
  	  margin-bottom:0;
  }
  ::v-deep .table-operator{
  	  margin: 10px 0;
  }
  
  ::v-deep .button_default{
  	  height: 40px;
  	  position: relative;
	  top: 2px;
  }
  
  
  ::v-deep th{
  	  background: #66C3FD;
	  font-size: 20px;
	  font-weight: 700;
	  color: white;
  	  width: 200px;
  	  text-align: center;
  }
  
  ::v-deep td{
  	  border: 1px solid #e6e6e6;
  	  width: 200px;
  	  text-align: center;
  }
  
  ::v-deep p{
  	  margin-bottom: 5px;
  }
  
  
// .auto-tabs /deep/.ant-tabs-bar {
//   margin-bottom: 0;
//   .ant-tabs-tab {
//     color: #999999;
//   }
//   .ant-tabs-tab-active {
//     color: #666666;
//   }
//   .ant-tabs-ink-bar {
//     background: #878787;
//   }
// }
</style>
