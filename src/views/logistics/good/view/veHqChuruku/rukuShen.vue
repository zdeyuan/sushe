<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-02-14 23:36:16
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-05-19 23:28:24
-->
<template>
  <edu-layout type="table">
    <veHqShen viewType="shen" viewName="报废" slot="table"></veHqShen>
  </edu-layout>
</template>

<script>
import veHqShen from './base/veHqShen';
export default {
  components: {
    veHqShen
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>
<style lang="less" scoped></style>
