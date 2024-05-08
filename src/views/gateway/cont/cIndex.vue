<template>
  <a-card :bordered="false" >
    <a-tabs type="card" @change="callback">
      <a-tab-pane key="1" tab="专业介绍">
        <clntr v-if="this.indexStyle==1"></clntr>
      </a-tab-pane>
      <a-tab-pane key="2" tab="专业建设动态">
        <cProfess v-if="this.indexStyle==2"></cProfess>
      </a-tab-pane>
      <a-tab-pane key="3" tab="友情链接">
        <cLink v-if="this.indexStyle==3"></cLink>
      </a-tab-pane>
      <a-tab-pane key="4" tab="云资源下载图片链接">
        <cResource v-if="this.indexStyle==4"></cResource>
      </a-tab-pane>
      <a-tab-pane key="5" tab="首页banner">
        <cBanner v-if="this.indexStyle==5"></cBanner>
      </a-tab-pane>
    </a-tabs>
  </a-card>
</template>

<script>
// 第一页
import clntr from './cIntr.vue';
// 第二页
import cProfess from './cProfess.vue';
// 第三页
import cLink from './cLink.vue';
// 第四页
import cResource from './cResource';
//第五页
import cBanner from './cBanner';
export default {
  name: 'cIndex',
  components: {
    clntr,
    cProfess,
    cLink,
    cResource,
    cBanner
  },
  data(){
    return{
      indexStyle: 1,
    };
  },
  methods: {
    callback(key) {
      console.log(key);
      this.indexStyle = key
    },
  },
};
</script>

<style scoped>

</style>