<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-02-14 23:36:16
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-02-18 14:00:53
-->
<template>
  <edu-layout type="table">
    <veStuStipend viewType="shen" slot="table"></veStuStipend>
  </edu-layout>
</template>

<script>
import veStuStipend from './base/veStuStipend';
export default {
  components: {
    veStuStipend
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>
<style lang="less" scoped></style>
