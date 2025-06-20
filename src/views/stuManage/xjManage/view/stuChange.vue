<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-02-14 23:36:16
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-06-02 20:39:16
-->
<template>
  <a-tabs class="auto-tabs">
    <a-tab-pane tab="学籍异动" key="first" v-if="$hasPer(['system'])">
      <edu-layout type="table" :extHeight="50" topName="学籍异动">
        <veStuChange slot="table"></veStuChange>
      </edu-layout>
    </a-tab-pane>
 <!--  <a-tab-pane tab="专业分流" key="second" >
      <edu-layout type="table" :extHeight="50" topName="专业分流">
        <veStuChangeZy slot="table"></veStuChangeZy>
      </edu-layout>
    </a-tab-pane> -->
    <a-tab-pane tab="异动恢复" key="third" v-if="$hasPer(['system'])">
      <edu-layout type="table" :extHeight="50" topName="异动恢复">
        <veStuChangeBack slot="table"></veStuChangeBack>
      </edu-layout>
    </a-tab-pane>
	<a-tab-pane tab="我的学籍异动" key="third" v-if="$hasPer('student')">
	  <edu-layout type="table" :extHeight="50" topName="我的学籍异动">
	    <veStuChangeBack slot="table"></veStuChangeBack>
	  </edu-layout>
	</a-tab-pane>
  </a-tabs>
</template>

<script>
import veStuChange from './veStuChange/veStuChange';
import veStuChangeZy from './veStuChange/veStuChangeZy';
import veStuChangeBack from './veStuChange/veStuChangeBack';

export default {
  components: {
    veStuChange,
    veStuChangeZy,
    veStuChangeBack
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
</style>
