<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-02-14 23:36:16
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-04-28 23:15:45
-->
<template>
  <edu-layout type="table">
    <veStuGraduation viewType="wj" slot="table"></veStuGraduation>
  </edu-layout>
</template>

<script>
import veStuGraduation from './base/veStuGraduation';
export default {
  components: {
    veStuGraduation
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>
<style lang="less" scoped></style>
