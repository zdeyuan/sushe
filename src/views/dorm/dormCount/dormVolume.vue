<template>
	<div style="background:#E9EDF6; padding:30px">
		<div class="content-title">
			宿舍容量统计
		</div>
		<div class="pageContentBox">
			<div class="headTop">宿舍统计 > <span class="notTop">宿舍容量统计</span></div>
			<div class="content-head">
				<div id="myChart" :style="{height:'700px',width:'100%'}"></div>
			</div>
		</div>
	</div>


</template>

<script>
	import {
		axios
	} from "@/utils/request"
	import * as echarts from 'echarts';
	export default {
		name: 'hello',
		data() {
			return {
				msg: 'Welcome to Your Vue.js App',
				susheLou: [],
				susheCount: [],
			}
		},
		mounted() {
			this.drawLine();
		},
		methods: {
			//获取宿舍楼
			drawLine() {
				axios({
					url: 'dorm/suSheTJ/dormCount',
					method: 'post',
					params: {

					},
				}).then(res => {

					for (let count of res.result) {
						this.susheLou.push(count.jzwmc);
						this.susheCount.push(count.susheCount);

					}
					// 基于准备好的dom，初始化echarts实例
					let myChart = echarts.init(document.getElementById('myChart'))
					// 绘制图表
					myChart.setOption({
						legend: {
							data: ['宿舍个数']
						},
						tooltip: {},
						xAxis: {
							data: this.susheLou,
						},
						yAxis: {},
						series: [{
							name: '宿舍个数',
							type: 'bar',
							data: this.susheCount,
							itemStyle: {
								normal: {
									color: '#1BB2F3'
								}
							},
							barWidth: 50,
						}]
					});

				}).catch(err => {
					this.$message.warning("此处有异常");
				})





			}
		}
	}
</script>

<style>

</style>
