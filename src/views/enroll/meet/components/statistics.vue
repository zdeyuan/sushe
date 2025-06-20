<template>
  <div id="myChart" :style="{height:'700px',width:'100%'}"></div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  props: ["data"],
  mounted() {
    this.gofunnel();
  },
  watch: {
    data(newval) {
      this.gofunnel();
    },
  },
  methods: {
    gofunnel() {
    //   console.log("这个数据"+"ddd"+this.data[1][1]);
	  let theoryNum = [];//应到
	  let realityNum =[];//实到
	  let statisticsName = [];//x轴名称
	  let absentNum = [];//未到
	  let legendData = ['应到人数', '实到人数', '未到人数'];
	  for(let theory of this.data){

		theoryNum.push(""+theory[0]);
		realityNum.push(""+theory[1]);
		
		absentNum.push(""+theory[3]);
		
		statisticsName.push(theory[2]);
	  }
	  console.log(","+theoryNum[0]+",")
	  if (theoryNum[0]=='') {
		  legendData=['实到人数']
	  }
	  console.log(statisticsName+"mingzi"+theoryNum+"yingdao"+absentNum)
	  let myChart = echarts.getInstanceByDom(document.getElementById("myChart"))
		if (myChart == null) { // 如果不存在，就进行初始化
   			 myChart = echarts.init(document.getElementById("myChart"));
		}

    //   let myChart = echarts.init(document.getElementById("myChart"));
	  
      myChart.setOption({
		 tooltip: {
		        trigger: 'axis',
		        axisPointer: {
		            type: 'shadow'
		        }
		    },
		    legend: {
		        data: legendData,
				bottom: '1%'
		    },
			title:{
				text:'学院报道情况统计',
				color:'#333333',
				left: 'center',
			},
		    toolbox: {
		        show: true,
		        orient: 'vertical',
		        left: 'right',
		        bottom: 'center',
		        feature: {
		            mark: {show: true},
		            dataView: {show: true, readOnly: false},
		            magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
		            restore: {show: true},
		            saveAsImage: {show: true}
		        }
		    },
		    xAxis: [
		        {
		            type: 'category',
		            axisTick: {show: false},
		            data: statisticsName
					// ['旅游与服务学院', '经济管理学院', '商务管理学院' , '酒店管理学院', '物流管理学院']
		        }
		    ],
		    yAxis: 
			[
		        {
		            // type: 'value'
		        }
		    ]
			,
		    series: [
		        {
		            name: '应到人数',
		            type: 'bar',
		            barGap: 0,
		            label: '测试标题1',
		            emphasis: {
		                focus: 'series'
		            },
					color:'#5A8FEF',
		            data:theoryNum
		        },
		        {
		            name: '实到人数',
		            type: 'bar',
		            label: '测试标题2',
		            emphasis: {
		                focus: 'series'
		            },
					color:'#2EC7C9',
		            data: realityNum
					// [585, 570, 627, 700, 685, 580, 800, 500]
		        },
		        {
		            name: '未到人数',
		            type: 'bar',
		            label: '测试标题3',
		            emphasis: {
		                focus: 'series'
		            },
					color:'#B6A2DE',
		            data: absentNum
					// [15, 10, 23, 40, 20, 20, 20, 54]
		        },
		    ]
      });
    },
  },
};
</script>

<style>
	.ms{
		margin-bottom: ;
	}
</style>