<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-02-14 23:36:16
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-04-21 22:55:34
-->
<template>
  <edu-layout type="table">
    <veBaseBanjiBzr viewType="now" slot="table"></veBaseBanjiBzr>
  </edu-layout>
</template>

<script>
import veBaseBanjiBzr from './base/veBaseBanjiBzr';
export default {
  components: {
    veBaseBanjiBzr
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>
<style lang="less" scoped></style>
