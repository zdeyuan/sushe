<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-02-14 23:36:16
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-02-16 22:09:52
-->
<template>
  <edu-layout type="table">
    <veJkyProject viewType="user" slot="table"></veJkyProject>
  </edu-layout>
</template>

<script>
import veJkyProject from './base/veJkyProject';
export default {
  components: {
    veJkyProject
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>
<style lang="less" scoped></style>
