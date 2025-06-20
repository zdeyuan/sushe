<template>
	<div>
		<a-menu v-model="current" mode="horizontal">
		    <a-menu-item key="zidianleib"> <a-icon type="appstore" />字典基础信息 </a-menu-item>
		    <a-menu-item key="zidianxiangqin" > 
			<span v-if="obj != ''"><a-icon type="appstore" /> {{obj.title}}({{obj.code}})字典详情 </span>
			<span v-else><a-icon type="appstore" /> 字典详情 </span>
			</a-menu-item>
		</a-menu>
		<div class="count">
			<!-- 放入对应页面，根据 current 进行判断显示 -->
			<zidianleib v-if="current == 'zidianleib'" @zidiandi="zidiandi"></zidianleib>
			
			<zidianxiangqin v-if="current == 'zidianxiangqin'"></zidianxiangqin>
			
		</div>
	</div>
</template>

<script>
	import md5 from 'js-md5';
	import { axios } from '@/utils/request';
	import zidianleib from './zidianleib/index.vue'
	import zidianxiangqin from './zidianxiangqin/index.vue'
	export default {
		components:{
			zidianleib,
			zidianxiangqin,
		},
		data() {
			return {
				current:['zidianleib'],
				obj:''
			}
		},
		methods:{
			zidiandi(msg){
				this.obj = msg
				localStorage.setItem('zidianxingqin',JSON.stringify(msg))
				this.current = 'zidianxiangqin'
			}
		}
	}
</script>

<style >
	.count{
		padding: 0px;
		margin-top:10px;
	}
	.tb {
		text-align: left;
	}
	
	.scanTable{
		width:100%;
	}
	
	/* 表行高样式 */
	.tr-style {
		height: 49px;
		border: 1px solid #dee2e6;
	}
	
	/* 行颜色 */
	.tr-color {
		padding-left:10px;
		box-sizing: border-box;
		height: 60px;
		width: 100%;
		background: #66c3fd;
		color:#fff;
	}
	.double{
		padding-right:10px;
		padding-left:10px;
	}
	.input-style-reply {
		color: #666666;
		width: 300px;
		background-color: #ffffff;
		border: 0;
	}
	
	.input-style-replyTwo {
		color: #666666;
		width: 180px;
		background-color: #ffffff;
		border: 0;
		margin-left: 5px;
	}
	
	.td-div {
		padding-left:10px;
		box-sizing: border-box;
		width: 20%;
	}
	
	
	.applyBtn-div {
		width: 100%;
	}
	
	.btn-style {
		width: 100px;
		height: 40px;
		margin-bottom: 33px;
		margin-top: 30px;
	}
	</style>
