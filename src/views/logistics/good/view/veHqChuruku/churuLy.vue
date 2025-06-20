<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-02-14 23:36:16
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-03-06 21:59:43
-->
<template>
  <edu-layout type="table">
    <veHqChuruku viewType="2" viewName="领用" slot="table"></veHqChuruku>
  </edu-layout>
</template>

<script>
import veHqChuruku from './base/veHqChuruku';
export default {
  components: {
    veHqChuruku
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>
<style lang="less" scoped></style>
