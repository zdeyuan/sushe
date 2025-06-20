<template>
  <div :style="{ padding: '0 0 32px 32px' }" >
    <h4 :style="{ marginBottom: '20px' }" style="text-align: center">{{ title }}</h4>
    <div class="echart" :id="chartId"  :style="{float:'left',width: '100%', height: height+'px'}"></div>
  </div>
</template>

<script>
  const echarts=require('echarts');
  export default {
    name: 'BarStack',
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
           { name: '默认学院', data: { '专业课': 0, '文化课': 0 } } // 默认值
          ]
      },
      stackType:{
        type:Boolean,
        default:true,
      },
      axisLabelType:{
        type:Boolean,
        default:true
      }
    },
    data(){
      return{

      }
    },
    methods:{
      initChart() {
		 if (!this.dataSeries || this.dataSeries.length === 0) {
		      console.warn('dataSeries 为空，无法渲染图表');
		      return; // 直接返回，避免报错
		    }  
        let _this=this;
        var emphasisStyle = {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0,0,0,0.3)'
          }
        };
        var axisLabel={
          color: '#333',
          //  让x轴文字方向为竖向
          interval: 0,
          formatter: function(value) {
          return value.split('').join('\n')
        }
      }
        let legendData=[];

        for(let item in this.dataSeries[0].data){
          legendData.push(item)
        }
        let xAxisData=[];
        let series=[];
        for(var i=0;i<this.dataSeries.length;i++){
          xAxisData.push(this.dataSeries[i].name);
          if(this.stackType){
            series.push({
              name: legendData[i],
              type: 'bar',
              stack: 'one',
              label:{
                show:true,
                position: 'top'
              },
              emphasis: emphasisStyle,
              data: []
            })
          }else{
            series.push({
              name: legendData[i],
              type: 'bar',
              label:{
                show:true,
                position: 'top'
              },
              emphasis: emphasisStyle,
              data: []
            })
          }

          for(var y=0;y<this.dataSeries.length;y++){
            series[i].data.push(this.dataSeries[y].data[legendData[i]]);
          }
        }
        console.log(legendData,series)
        let myChart = echarts.init(document.getElementById(this.chartId));
        var option = {
          legend: {
            data: legendData,
            bottom: '4',
            left: 'center'
          },
          tooltip: {},
          xAxis: {
            data:xAxisData,
            axisLine: {onZero: true},
            splitLine: {show: false},
            splitArea: {show: false},
            axisLabel:this.axisLabelType?axisLabel:{}
          },
          yAxis: {

          },
          grid: {
            bottom: 100
          },
          series: series
        };
        myChart.on('click', function (params) {
          _this.$emit('select',params);
        })
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