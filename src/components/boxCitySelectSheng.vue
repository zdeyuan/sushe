<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-03-05 14:28:25
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-04-11 13:27:31
-->
<template>
	<span>
		<!-- <a-select :disabled="disabled" v-model="shenId" :style="{ width: width }" placeholder="请选择省" @change="onShen">
			<a-select-option v-for="item in shenList" :key="item.name" :value="item.name">
				{{ item.name }}
			</a-select-option>
		</a-select>
		<a-select :disabled="disabled" v-model="shiId" :style="{ width: width, marginLeft: '15px' }" placeholder="请选择市"
			@change="onShi">
			<a-select-option v-for="item in shiList" :key="item.name" :value="item.name">
				{{ item.name }}
			</a-select-option>
		</a-select>
		<a-select :disabled="disabled" v-model="quId" :style="{ width: width, marginLeft: '15px' }" placeholder="请选择区县">
			<a-select-option v-for="item in xianList" :key="item" :value="item">
				{{ item }}
			</a-select-option>
		</a-select> -->
		
		<!-- 省份下拉框 -->
		<a-select style="width:200px" :options="shenList" placeholder="请选择省份" @change="cityChange"
			v-model="shenId" :disabled='disabled' />
		
		<!-- 市级下拉框 -->
		<a-select style="width:200px;margin-left:5px;" :options="shiList" placeholder="请选择市区"
			@change="countyChange" v-model="shiId" :disabled='disabled' />
		
		<!-- 县级下拉框 -->
		<a-select style="width:200px;margin-left:5px;" :options="xianList" placeholder="请选择县区"
			v-model="quId" :disabled='disabled' />
		<a-button type="danger" style="margin-left: 20px;" @click="clearArea" v-if="!disabled">
			清除
		</a-button>
	</span>
</template>

<script>
	import {
		axios
	} from '@/utils/request'
	import jsonData from './diqu.json'
	export default {
		props: {
			width: {
				type: String,
				default: '200px'
			},
			disabled: {
				type: Boolean,
				default: false
			}
		},
		data() {
			const data = {
				jsonData,
				addspecialty: [],
				shenList: [],
				shiList: [],
				xianList: [],
				shenId: null,
				shiId: null,
				quId: null,
				flag: false
			};
			return data;
		},
	
		mounted() {
			this.getProvince()
		},
		methods: {
			//获取省份列表
			getProvince() {
				this.shenList = []
				for (let province of this.jsonData) {
					this.shenList.push({
						value: province.id,
						label: province.name,
					})
				}
			},
	
			//获取市区列表
			cityChange() {
				this.shiList = []
				this.xianList = []
				if (!this.flag) {
					this.shiId = null
					this.quId = null
				}
				if (this.shenId != null && this.shenId != '0') {
					var msg = this.jsonData.find(e => e.id == this.shenId)
					if(msg&&msg.children){
						for (let city of msg.children) {
							this.shiList.push({
								value: city.id,
								label: city.name,
							})
						}
					}
					
				}
			},
			//获取县区
			countyChange() {
				this.xianList = []
				if (!this.flag) {
					this.quId = null
				}
				if (this.shenId != null && this.shenId != '0') {
					var msg = this.jsonData.find(e => e.id == this.shenId)
					var arr = msg.children.find(e => e.id == this.shiId)
					if(arr&&arr.children){
						for (let county of arr.children) {
							this.xianList.push({
								value: county.id,
								label: county.name,
							})
						}
					}
					
				}
			},
			clearArea(){
				this.shenList = [],
				this.shiList = [],
				this.xianList =[],
				this.shenId = null,
				this.shiId = null,
				this.quId = null
				this.getProvince()
			},
			setValue(data) {
				this.shenId = data.shengId;
				this.shiId = data.shiId;
				this.quId = data.quId;
				this.flag = true
				this.getProvince()
				this.cityChange()
				this.countyChange()
				this.flag = false
				// this.onShen(() => {
				// 	this.shiId = data.shi;
				// 	this.onShi();
				// 	this.quId = data.qu;
				// });
			},
			getSetValue(data) {
				data.shengId = this.shenId;
				data.shiId = this.shiId;
				data.quId = this.quId;
			},
			onShen(callback) {
				this.shiId = null;
				this.quId = null;
				setTimeout(() => {
					for (let i = 0; i < city.length; i++) {
						const element = city[i];
						if (element.name == this.shenId) {
							this.shiList = element.city;
							if (callback) callback();
							return;
						}
					}
				}, 100);
			},
			onShi() {
				this.quId = null;
				setTimeout(() => {
					for (let i = 0; i < this.shiList.length; i++) {
						const element = this.shiList[i];
						if (element.name == this.shiId) {
							this.xianList = element.districtAndCounty;
							return;
						}
					}
				}, 100);
			}
		}
	};
</script>
<style scoped>
	/* 单选间距 */
	.a-radio {
		margin-right: 10px;
	}

	.title {
		display: inline-block;
		text-align: right;
		padding-right: 5px;
		min-width: 60px;
	}
</style>