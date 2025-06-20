<template>
  <div :style="{ padding: '0 0 32px 32px' }" style="width: 100%" >
    <h4 :style="{ marginBottom: '20px' }" style="text-align: center">{{ title }}</h4>
    <div class="echart" :id="chartId" style="width: 100% !important;" :style="{float:'left', height: height+'px'}"></div>
  </div>
</template>

<script>
  const echarts=require('echarts');
  export default {
    name: 'pieChart',
    props:{
      title: {
        type: String,
        default: ''
      },
      chartId:{
        type: String,
        default: 'myChart'
      },
      height: {
        type: Number,
        default: 254
      },
      dataSeries:{
        type:Array,
        default:()=>[
          {value: 40, name: 'rose 1'},
          {value: 33, name: 'rose 2'},
          {value: 28, name: 'rose 3'},
          {value: 22, name: 'rose 4'},
          {value: 20, name: 'rose 5'},
          {value: 15, name: 'rose 6'},
          {value: 12, name: 'rose 7'},
          {value: 20, name: 'rose 8'}
        ]
      },
      subtext:{
        type: String,
        default: '纯属虚构'
      },

    },
    data(){
      return{

      }
    },
    methods:{
      initChart() {
        let _this=this;
        let myChart = echarts.init(document.getElementById(this.chartId));
        var option = {
          title: {
            subtext: this.subtext,
            left: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{b0}: {c0}'
          },
          legend: {
            bottom: '4',
            left: 'center'
          },
          series: [
            {
              name: '半径模式',
              type: 'pie',
              radius: [50, 140],
              label: {
                position: 'inner',
                fontSize: 14,
              },
              data: this.dataSeries
            },
          ]
        };
        myChart.setOption(option);
        //随着屏幕大小调节图表
        window.addEventListener("resize", () => {
          myChart.resize();
        });
      },
    },
    created() {

    },
    mounted() {
      this.initChart()
    }
  }
</script>

<style scoped>

</style>