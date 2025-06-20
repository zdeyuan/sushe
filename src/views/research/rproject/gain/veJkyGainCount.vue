<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-02-14 23:34:32
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-02-17 13:47:07
-->
<template>
  <edu-layout type="table">
    <a-tabs slot="table">
      <a-tab-pane key="1" tab="按人员统计">
        <gainCountUser></gainCountUser>
      </a-tab-pane>
      <a-tab-pane key="2" tab="按分类统计">
        <gainCountCate></gainCountCate>
      </a-tab-pane>
    </a-tabs>
  </edu-layout>
</template>

<script>
import gainCountUser from './count/gainCountUser';
import gainCountCate from './count/gainCountCate';

export default {
  components: {
    gainCountUser,
    gainCountCate
  },
  data() {
    const data = {};
    return data;
  },
  mounted() {},
  methods: {}
};
</script>
<style lang="less" scoped></style>
