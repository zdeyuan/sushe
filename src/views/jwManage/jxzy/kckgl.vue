<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-02-14 23:36:16
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-06-02 20:39:16
-->
<template>
  <a-tabs class="auto-tabs" @change="tabChange">
    <a-tab-pane tab="添加课程" key="first">
      <edu-layout type="table" :extHeight="50" topName="添加课程">
        <veStuChange slot="table"></veStuChange>
      </edu-layout>
    </a-tab-pane>
    <a-tab-pane tab="课程管理" key="second">
      <edu-layout type="table" :extHeight="50" topName="课程管理">
        <veStuChangeZy slot="table" ref="kecheng"></veStuChangeZy>
      </edu-layout>
    </a-tab-pane>
  </a-tabs>
</template>

<script>
import veStuChange from './JwKechengAdd';
import veStuChangeZy from './JwKechengList';

export default {
  components: {
    veStuChange,
    veStuChangeZy,
  },
  data() {
    return {
      activeName: 'first'
    };
  },
  mounted() {},
  methods: {
	  tabChange(e){
		  if(e=='second'){
			  this.$refs.kecheng.searchQuery();
		  }
	  }
  }
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
  
  ::v-deep .table-operator{
	  margin: 10px 0;
  }
  
  ::v-deep .button_default{
  	  height: 40px;
  	  position: relative;
	  top: 2px;
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
