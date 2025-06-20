<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-02-14 23:36:16
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-03-18 22:29:23
-->
<template>
  <a-tabs class="auto-tabs">
    <a-tab-pane tab="楼宇分类管理" key="first">
      <edu-layout type="table" :extHeight="50" topName="楼宇分类管理">
        <veSbzcJzwBuildcate slot="table"></veSbzcJzwBuildcate>
      </edu-layout>
    </a-tab-pane>
    <a-tab-pane tab="房间用途" key="second">
      <edu-layout type="table" :extHeight="50" topName="房间用途">
        <veSbzcJzwRoomcate slot="table"></veSbzcJzwRoomcate>
      </edu-layout>
    </a-tab-pane>
    <a-tab-pane tab="检查类别" key="third">
      <edu-layout type="table" :extHeight="50" topName="检查类别">
        <veSbzcJzwInspecttype slot="table"></veSbzcJzwInspecttype>
      </edu-layout>
    </a-tab-pane>
  </a-tabs>
</template>

<script>
import veSbzcJzwBuildcate from './veSbzcJzwBuildcate/veSbzcJzwBuildcate';
import veSbzcJzwInspecttype from './veSbzcJzwInspecttype/veSbzcJzwInspecttype';
import veSbzcJzwRoomcate from './veSbzcJzwRoomcate/veSbzcJzwRoomcate';

export default {
  components: {
    veSbzcJzwBuildcate,
    veSbzcJzwInspecttype,
    veSbzcJzwRoomcate
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
