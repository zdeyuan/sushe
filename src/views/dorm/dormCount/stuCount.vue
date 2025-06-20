<template>
	<div>
		<a-card :bordered="false">
		<div class="pageContentBox">
			<div class="content-head">
				<div id="myChart" :style="{height:'700px',width:'100%'}"></div>
			</div>
		</div>
		</a-card>
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
				kzrs: [],
				yzrs: [],
			}
		},
		mounted() {
			this.drawLine();
		},
		methods: {
			//获取宿舍楼
			drawLine() {
				axios({
					url: 'dorm/suSheTJ/studentCount',
					method: 'post',
					params: {

					},
				}).then(res => {

					for (let count of res.result) {
						this.susheLou.push(count.jzwmc);
						this.kzrs.push(count.kzrs);
						this.yzrs.push(count.yzrs);
					}
					// 基于准备好的dom，初始化echarts实例
					let myChart = echarts.init(document.getElementById('myChart'))
					// 绘制图表
					myChart.setOption({
						legend: {
							data: ['总床位数', '已住人数']
						},
						tooltip: {
							trigger: 'axis',
							// 鼠标移动柱状图是提示文字
							show: true,
							axisPointer: {
								type: 'shadow'
							}
						},
						xAxis: {
							data: JSON.parse(JSON.stringify(this.susheLou))

						},
						yAxis: {

						},
						series: [{
								name: '总床位数',
								type: 'bar',
								data: JSON.parse(JSON.stringify(this.kzrs)),
								itemStyle: {
									normal: {
										color: '#4ECB8D'
									}
								}
							},
							{
								name: '已住人数',
								type: 'bar',
								data: JSON.parse(JSON.stringify(this.yzrs)),
								itemStyle: {
									normal: {
										color: '#1BB2F3'
									}
								}
							}
						]
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
