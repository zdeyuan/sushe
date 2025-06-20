<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-02-14 22:29:59
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-04-27 21:15:38
-->
<template>
  <!-- 表格 -->
  <div slot="table" class="right_table">
    <div>
      <edu-query ref="cwQuery" ext="boxZybmbj" :nianji="true" code="veJkyPaper" :do-filter="handleFilter"> </edu-query>
      <div class="count-div">
        <div id="veStuCount" style="width: 60%;height:400px;margin: 0 auto;"> </div>
      </div>
    </div>
    <!-- 编辑页 -->
  </div>
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
    this.myChart = echarts.init(document.getElementById('veStuCount'));
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
      veBaseStudentApi.getAtSchoolStudent(this.getParams()).then(res => {
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
          text: '奖励统计',
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
            name: '在校生统计',
            type: 'pie',
            radius: '50%',
            data: datas,
            label: {
              normal: {
                show: true,
                formatter: function (params) {
					// 手动换行，假设超过 8 个字符就换行
					let name = params.name;
					if (name.length > 8) {
						name = name.slice(0, 8) + '\n' + name.slice(8);
					}
					return `${name}: ${params.value}个(${params.percent}%)`;
				},
				width: 150, // 增大标签宽度
				overflow: 'break' // 超过宽度自动换行
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
