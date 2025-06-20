<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-02-14 23:36:16
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-04-27 20:44:13
-->
<template>
  <a-tabs class="auto-tabs">
    <a-tab-pane tab="奖励统计" key="first">
      <edu-layout type="table" :extHeight="50" topName="惩罚统计">
        <veStuRewardCount slot="table" ></veStuRewardCount>
      </edu-layout>
    </a-tab-pane>
    <a-tab-pane tab="奖励查询" key="second">
      <veStuReward viewType="count" type="count"></veStuReward>
    </a-tab-pane>
    <a-tab-pane tab="惩罚统计" key="third">
      <edu-layout type="table" :extHeight="50" topName="奖励统计">
        <veStuPunishCount slot="table" ></veStuPunishCount>
      </edu-layout>
    </a-tab-pane>
    <a-tab-pane tab="惩罚查询" key="thirdaa">
      <veStuPunish viewType="count" type="count"></veStuPunish>
    </a-tab-pane>
  </a-tabs>
</template>

<script>
import veStuPunish from './veStuPunish/veStuPunish';
import veStuPunishCount from './veStuPunish/veStuPunishCount';
import veStuReward from './veStuReward/veStuReward';
import veStuRewardCount from './veStuReward/veStuRewardCount';

export default {
  components: {
    veStuPunish,
    veStuPunishCount,
    veStuReward,
    veStuRewardCount
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
