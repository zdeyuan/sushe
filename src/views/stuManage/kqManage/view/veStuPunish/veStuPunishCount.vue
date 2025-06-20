<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-02-14 22:29:59
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-04-27 21:07:21
-->
<template>
  <!-- 表格 -->
  <div slot="table" class="right_table">
    <div>
      <edu-query ref="cwQuery" ext="boxZybmbj" :nianji="true" code="veJkyPaper" :do-filter="handleFilter"> </edu-query>
      <div class="count-div">
        <div id="veStuPunishCount" style="width: 60%;height:400px;margin: 0 auto;"> </div>
      </div>
    </div>
    <!-- 编辑页 -->
  </div>
</template>

<script>
import veStuPunishApi from '../../api/veStuPunishApi';
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
    this.myChart = echarts.init(document.getElementById('veStuPunishCount'));
    this.initData();
  },
  beforeDestroy() {
    if (this.myChart != null) {
      this.myChart.dispose();
      this.myChart = null;
    }
  },
  methods: {
    /**
     * @msg: 表格获取请求数据 必须return 一个对象
     */
    getParams() {
      const params = this.$refs['cwQuery'].getQueryData();
      return params;
    },
    handleFilter() {
      this.initData();
    },
    initData() {
      veStuPunishApi.countBy(this.getParams()).then(res => {
        const names = res.result.map(item => item.name);
        const nums = res.result.map(item => item.num);
        res.result.forEach(element => {
          element.value = element.num;
        });
        this.initChart(res.result);
      });
    },
    initChart(datas) {
      // 指定图表的配置项和数据
      let option = {
        title: {
          text: '惩罚统计',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        label: {
          normal: {
            show: true,
            formatter: '{b}: {c}({d}%)'
          }
        },
        series: [
          {
            name: '惩罚统计',
            type: 'pie',
            radius: '50%',
            data: datas,
            label: {
              normal: {
                show: true,
                formatter: '{b}: {c}({d}%)'
              }
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
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
