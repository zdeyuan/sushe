<template>
  <a-card :bordered="false" >
    <a-tabs type="card" @change="callback">
      <a-tab-pane key="1"  tab="基本信息">
        <zMessage v-if="this.indexStyle==1"></zMessage>
      </a-tab-pane>
      <a-tab-pane key="2" tab="制作团队">
        <div v-if="this.indexStyle==2"><zTeam></zTeam></div>
      </a-tab-pane>
      <a-tab-pane key="3" tab="课程目录">
        <zCat v-if="this.indexStyle==3"></zCat>
      </a-tab-pane>
      <a-tab-pane key="4" tab="课程内容">
        <zContent v-if="this.indexStyle==4"></zContent>
      </a-tab-pane>
      <a-tab-pane key="5" tab="试题管理">
        <zTest v-if="this.indexStyle==5"></zTest>
      </a-tab-pane>
      <a-tab-pane key="6" tab="课程网站">
        <zWeb v-if="this.indexStyle==6"></zWeb>
      </a-tab-pane>
    </a-tabs>
  </a-card>
</template>

<script>
// 第一页
import zMessage from './zMessage'
// 第二页
import zCat from './zCat';
// 第三页
import zTeam from './zTeam';
// 第四页
import zContent from './zContent';
// 第五页
import zTest from './zTest';
// 第六页
import zWeb from './zWeb'


export default {
  //基本信息
  name: 'zIndex',
  components: {
    zMessage,
    zCat,
    zTeam,
    zContent,
    zTest,
    zWeb
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
}
</script>

<style scoped>

</style>