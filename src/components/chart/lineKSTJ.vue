<template>
  <div :style="{ padding: '0 0 32px 32px' }" >
    <h4 :style="{ marginBottom: '20px' }" style="text-align: center">{{ title }}</h4>
    <div class="echart" :id="chartId" :style="{float:'left',width: '100%', height: height+'px'}"></div>
  </div>
</template>

<script>
  /**
   *
   * */
  const echarts=require('echarts');
  // import echarts from  "echarts";
  export default {
    name: 'lineKSTJ',
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
          {name:'李易峰',data:{Mon:10,Tue:20,Wed:30,Thu:20}},
        ]
      },
      areaStyleType:{
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
          let _this=this;
          let legendData=[];
          let xAxisData=[];
          for(let item in this.dataSeries[0].data){
            xAxisData.push(item)
          }
          let series=[];
          for(var i=0;i<this.dataSeries.length;i++){
            legendData.push(this.dataSeries[i].name);
            if(this.areaStyleType){
              series.push({
                name:this.dataSeries[i].name,
                type: 'line',
                areaStyle: {},
                data: []
              })
            }else{
              series.push({
                name:this.dataSeries[i].name,
                type: 'line',
                data: []
              })
            }

            for(let item in this.dataSeries[i].data){
              series[i].data.push(this.dataSeries[i].data[item]);
            }
          }
          console.log(legendData);
          let getchart = echarts.init(document.getElementById(this.chartId));
          var option = {
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              bottom: '4',
              left: 'center',
              data: legendData
            },
            xAxis: {
              boundaryGap: false,
              data: xAxisData,
              axisLabel: {
                color: '#333',
                //  让x轴文字方向为竖向
                interval: 0,
                formatter: function(value) {
                  return value.split('').join('\n')
                }
              }
            },
            yAxis: {
              type: 'value'
            },
            series:series
          };

          getchart.setOption(option);
          //随着屏幕大小调节图表
          window.addEventListener("resize", () => {
            getchart.resize();
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