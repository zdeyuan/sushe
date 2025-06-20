
<template>
  <a-card :bordered="false">
    <div class="flex-column">
      <a-tabs class="tabs-inside" @change="onTabChange">
        <a-tab-pane key="1" tab="我的考勤">
          <ve-hr-performance-list />
        </a-tab-pane>
        <a-tab-pane key="2" tab="考勤统计(按周)">
          <ve-hr-performance-week />
        </a-tab-pane>
        <a-tab-pane key="3" tab="考勤统计(按天)">
          <ve-hr-performance-day />
        </a-tab-pane>
        <a-tab-pane key="4" tab="考勤规则">
          <ve-hr-performance-rule-list />
        </a-tab-pane>
      </a-tabs>
    </div>
  </a-card>
</template>

<script>
import VeHrPerformanceDay from './VeHrPerformanceDay.vue'
import VeHrPerformanceList from './VeHrPerformanceList.vue'
import VeHrPerformanceRuleList from './VeHrPerformanceRuleList.vue'
import VeHrPerformanceWeek from './VeHrPerformanceWeek.vue'
export default {
  components: {VeHrPerformanceRuleList, VeHrPerformanceList, VeHrPerformanceWeek, VeHrPerformanceDay },
  data() {
    return {
      activeKey: 0,
      grayTab: '考情考核管理>绩效考勤管理',
      tabPaths: ['>我的考勤', '>考勤统计(按周)', '>考勤统计(按天)', '>考勤规则']
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