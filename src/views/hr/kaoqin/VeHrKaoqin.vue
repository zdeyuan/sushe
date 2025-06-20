
<template>
  <a-card :bordered="false">
    <div class="flex-column">
      <a-tabs class="tabs-inside" @change="onTabChange">
        <a-tab-pane key="1" tab="考勤管理">
            <ve-hr-kaoqin-manager-list />
        </a-tab-pane>
        <a-tab-pane key="2" tab="考勤统计">
            <ve-hr-kaoqin-list />
          <!-- <hq-hr-jiangli-list /> -->
        </a-tab-pane>
        <a-tab-pane key="3" tab="考勤查询">
            <ve-hr-kaoqin-jilu-list />
          <!-- <hq-hr-jiangli-list /> -->
        </a-tab-pane>
      </a-tabs>
    </div>
  </a-card>
</template>

<script>
import VeHrKaoqinJiluList from './VeHrKaoqinJiluList.vue'
import VeHrKaoqinList from './VeHrKaoqinList.vue'
import VeHrKaoqinManagerList from './VeHrKaoqinManagerList.vue'
export default {
  components: { VeHrKaoqinJiluList ,VeHrKaoqinList, VeHrKaoqinManagerList},
  data() {
    return {
      activeKey:0,
      grayTab:'考情考核管理>考勤管理',
      tabPaths: ['>考勤管理','>考勤统计','>考勤查询'],
    }
  },
  methods:{
     onTabChange(e){
      this.activeKey=e-1
    }
  }
}
</script>

<style>
</style>