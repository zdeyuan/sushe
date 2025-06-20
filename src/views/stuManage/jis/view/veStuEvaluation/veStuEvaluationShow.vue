<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-02-14 23:36:16
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-04-21 23:01:54
-->
<template>
  <edu-layout type="table">
    <veStuEvaluation viewType="show" slot="table"></veStuEvaluation>
  </edu-layout>
</template>

<script>
import veStuEvaluation from './base/veStuEvaluation';
export default {
  components: {
    veStuEvaluation
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>
<style lang="less" scoped></style>
