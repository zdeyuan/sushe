<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-02-14 22:29:59
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-02-17 22:13:55
-->
<template>
  <edu-layout type="table">
    <!-- 表格 -->
    <div slot="table" class="right_table">
      <div>
        <edu-query ref="cwQuery" code="veJkyPaper" :do-filter="handleFilter">
          <template slot="search">
            <edu-query-item title="发布起始时间" pname="stime">
				<DatePickByCN
				   v-model="veJkyPaperQuery.sTime"
				  placeholder="请选择发布起始时间"  />
            </edu-query-item>
            <edu-query-item title="发布结束时间">
				<DatePickByCN
				   v-model="veJkyPaperQuery.eTime"
				  placeholder="请选择结束时间"  />
            </edu-query-item>
          </template>
        </edu-query>
        <div class="count-div">
          <div id="paperChart" style="width: 60%;height:400px;margin: 0 auto;"> </div>
        </div>
      </div>
      <!-- 编辑页 -->
    </div>
  </edu-layout>
</template>

<script>
import veJkyPaperApi from '@/api/research/rpaper/veJkyPaperApi';
import * as echarts from 'echarts';

export default {
  components: {},
  data() {
    const data = {
      veJkyPaperQuery: {},
      myChart: null
    };
    return data;
  },
  mounted() {
    this.myChart = echarts.init(document.getElementById('paperChart'));
    this.initData();
  },
  beforeDestroy() {
    if (this.myChart != null) {
      this.myChart.dispose();
      this.myChart = null;
    }
  },
  methods: {
    handleFilter() {
      this.initData();
    },
    initData() {
      const sub = {
        sTime: this.veJkyPaperQuery.sTime,
        eTime: this.veJkyPaperQuery.eTime
      };
      veJkyPaperApi.countDept(sub).then(res => {
        //
        const names = res.result.map(item => item.name);
        const nums = res.result.map(item => item.num);
        this.initChart(names, nums);
      });
    },
    initChart(names, nums) {
      // 指定图表的配置项和数据
      let option = {
        title: {
          text: '按部门统计论文发表柱状图'
        },
        tooltip: {},
        legend: {
          data: ['部门']
        },
        xAxis: {
          data: names
        },
        yAxis: {
          minInterval: 1
        },
        series: [
          {
            name: '部门名称',
            type: 'bar',
            data: nums,
            itemStyle: {
              normal: {
                color: '#1b7de4',
                label: {
                  show: false,
                  color: '#fff'
                }
              }
            }
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      this.myChart.setOption(option);
    }
  }
};
</script>
<style lang="less" scoped>
.count-div {
  padding: 30px;
}
</style>
