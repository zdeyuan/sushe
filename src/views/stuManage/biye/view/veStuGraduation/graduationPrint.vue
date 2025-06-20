<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-06-10 22:44:53
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-06-10 22:47:16
-->
<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-02-14 23:36:16
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-04-27 20:44:13
-->
<template>
  <a-tabs class="auto-tabs">
    <a-tab-pane tab="毕业证书打印" key="first">
      <edu-layout type="table" :extHeight="50" topName="毕业证书打印">
        <graduationPrintZs slot="table"></graduationPrintZs>
      </edu-layout>
    </a-tab-pane>
    <a-tab-pane tab="毕业成绩单打印" key="two">
      <edu-layout type="table" :extHeight="50" topName="毕业成绩单打印">
        <graduationPrintCj slot="table"></graduationPrintCj>
      </edu-layout>
    </a-tab-pane>
  </a-tabs>
</template>

<script>
import graduationPrintZs from './graduationPrintZs';
import graduationPrintCj from './graduationPrintCj';

export default {
  components: {
    graduationPrintZs,
    graduationPrintCj
  },
  data() {
    return {
      activeName: 'first'
    };
  },
  mounted() {},
  methods: {}
};
</script>
<style lang="less" scoped>
// .auto-tabs /deep/.ant-tabs-bar {
//   margin-bottom: 0;
//   .ant-tabs-tab {
//     color: #999999;
//   }
//   .ant-tabs-tab-active {
//     color: #666666;
//   }
//   .ant-tabs-ink-bar {
//     background: #878787;
//   }
// }
</style>
