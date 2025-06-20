<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-02-14 23:36:16
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-06-02 20:39:16
-->
<template>
  <a-tabs class="auto-tabs" @change="changeReload">
    <a-tab-pane tab="安排考试" key="first">
      <edu-layout type="table" :extHeight="50" topName="安排考试">
        <veStuChange slot="table" ></veStuChange>
      </edu-layout>
    </a-tab-pane>
    <a-tab-pane tab="考试信息管理" key="second">
      <edu-layout type="table" :extHeight="50" topName="考试信息管理">
        <veStuChangeZy slot="table" ref="ksItems"></veStuChangeZy>
      </edu-layout>
    </a-tab-pane>
    <a-tab-pane tab="考试监考管理" key="third">
      <edu-layout type="table" :extHeight="50" topName="考试监考管理">
        <veStuChangeBack slot="table"></veStuChangeBack>
      </edu-layout>
    </a-tab-pane>
  </a-tabs>
</template>

<script>
import veStuChange from './VeJwKsArrange';
import veStuChangeZy from './VeJwKaoshiList';
import veStuChangeBack from './VeJwKsJiankaoList';

export default {
  components: {
    veStuChange,
    veStuChangeZy,
    veStuChangeBack
  },
  data() {
    return {
      activeName: 'first'
    };
  },
  mounted() {},
  methods: {
	  changeReload(e){
		  if(e=='second'){
			  this.$refs.ksItems.searchQuery();
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
  ::v-deep .common-layout{
  	  padding:0 15px!important;
  }
  ::v-deep .ant-tabs-bar{
  	  margin-bottom:0;
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
