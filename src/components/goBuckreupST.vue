<template>
	<a-select style="width:100%" :options="list" :placeholder="'请选择'+name" v-model="id" :disabled='disabled' />
</template>

<script>
	import {
		axios
	} from '@/utils/request'
	export default {
		model: {
		  // prop即 父组件使用 v-model 绑定的属性,这个名称是自定义的
		  prop: 'value',
		  // event即 子组件会向父组件触发的事件,父组件的 v-model可以监听到这个事件,并将vlaue赋值给v-model绑定的属性
		  event: 'input'
		},
		props: {
			code: {
				type: String,
			},
			name:{
				type: String,
			},
			disabled: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				list: [],
				id:undefined
			}
		},
		mounted() {
			this.list = []
			axios({
					url: '/common/veCommon/queryDictDataByModelCode?modelCode='+this.code,
					method: 'get',
					params: {
						interfaceUserId: '09d5e1e7f9b049008eee645c783a1d66'
						// dictCode: 'politic',
					},
				})
				.then((res) => {
					for (let politic of res.result) {
						this.list.push({
							value: politic.code,
							label: politic.title,
						})
					}
				})
				.catch((err) => {
					this.$message.warning('获取'+this.name+'字典失败')
				})
		},
		methods:{
			getOutcome(data,type){
				data[type] = this.id
			},
			setOutcome(data,type){
				console.log('??????????')
				this.id = data[type]
			}
		}
	}
</script>

<style>
</style>