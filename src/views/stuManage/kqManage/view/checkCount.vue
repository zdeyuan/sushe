<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-02-14 23:36:16
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-04-27 21:11:30
-->
<template>
  <a-tabs class="auto-tabs">
    <a-tab-pane tab="考勤统计" key="first">
      <edu-layout type="table" :extHeight="50" topName="考勤统计">
        <veStuCheckCount slot="table"></veStuCheckCount>
      </edu-layout>
    </a-tab-pane>
    <a-tab-pane tab="考勤查询" key="second">
      <veStuCheck viewType="count"></veStuCheck>
    </a-tab-pane>
  </a-tabs>
</template>

<script>
import veStuCheck from './veStuCheck/veStuCheck';
import veStuCheckCount from './veStuCheck/veStuCheckCount';

export default {
  components: {
    veStuCheck,
    veStuCheckCount
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
