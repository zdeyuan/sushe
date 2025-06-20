<template>
	<a-radio-group name="radioGroup" :default-value="1" v-model="id" :disabled='disabled'>
		<a-radio v-for="(val,key) in list" :value="val.value">
			{{val.label}}
		</a-radio>
	</a-radio-group>
</template>

<script>
	import {
		axios
	} from '@/utils/request'
	export default {
		props: {
			code: {
				type: String,
			},
			name: {
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
				id: undefined
			}
		},
		mounted() {
			this.list = []
			axios({
					url: '/common/veCommon/queryDictDataByModelCode?modelCode=' + this.code,
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
					this.$message.warning('获取' + this.name + '字典失败')
				})
		},
		methods: {
			getOutcome(data, type) {
				console.log(data,'？？？？')
				console.log(type,'？？？？')
				data[type] = this.id
			},
			setOutcome(data, type) {
				this.id = data[type]
			}
		}
	}
</script>

<style>
</style>