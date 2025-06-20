<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-02-14 23:36:16
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-04-22 23:08:12
-->
<template>
  <edu-layout type="table">
    <veStuReservation viewType="shen" slot="table"></veStuReservation>
  </edu-layout>
</template>

<script>
import veStuReservation from './base/veStuReservation';
export default {
  components: {
    veStuReservation
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>
<style lang="less" scoped></style>
