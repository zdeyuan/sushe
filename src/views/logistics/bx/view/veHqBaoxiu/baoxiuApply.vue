<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-02-14 23:36:16
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-04-05 11:42:39
-->
<template>
  <edu-layout type="table">
    <veHqBaoxiu viewType="apply" slot="table"></veHqBaoxiu>
  </edu-layout>
</template>

<script>
import veHqBaoxiu from './base/veHqBaoxiu';
export default {
  components: {
    veHqBaoxiu
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>
<style lang="less" scoped></style>
