<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-02-14 22:29:59
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-04-18 10:37:27
-->
<template>
  <edu-layout type="table">
    <!-- 表格 -->
    <div slot="table" class="right_table">
      <div>
        <edu-query ref="cwQuery" code="veJkyPaper" :do-filter="handleFilter" @refreshBack="refreshBack">
          <template slot="search">
            <edu-query-item title="年份" pname="stime">
				<DatePickByCN  mode="year"  v-model="year"  placeholder="请选择出生日期"/>
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
import veBaseStudentApi from '@/views/stuManage/xjManage/api/veBaseStudentApi';
import * as echarts from 'echarts';

export default {
  components: {},
  data() {
    const data = {
      open: false,
      year: '',
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
    refreshBack() {
      this.veJkyPaperQuery.sTime = undefined;
      this.year = '';
    },
    //Ant Design封装年份选择组件
    openChange(status) {
      if (status) {
        this.open = true;
      } else {
        this.open = false;
      }
    },
    panelChange(value) {
      this.veJkyPaperQuery.sTime = value;
      this.year = value ? value.format('YYYY') : '';
      this.open = false;
    },
    handleFilter() {
      this.initData();
    },
    initData() {
      veBaseStudentApi.countKns(this.year).then(res => {
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
          text: '按年份统计困难生人数的柱状图'
        },
        tooltip: {},
        legend: {
          data: ['年份']
        },
        xAxis: {
          data: names
        },
        yAxis: {
          minInterval: 1
        },
        series: [
          {
            name: '年份',
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
