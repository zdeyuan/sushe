<template>
	<div>
		<a-menu v-model="current" mode="horizontal">
		    <a-menu-item key="schoolInfo"> 学校基础信息 </a-menu-item>
		    <a-menu-item key="schoollMsg" > 校区信息 </a-menu-item>
			<a-menu-item key="schoolSystem" > 学制管理 </a-menu-item>
			<a-menu-item key="semester" > 学期管理 </a-menu-item>
			<a-menu-item key="schoolFaculties" > 院系管理 </a-menu-item>
			<a-menu-item key="zyzInfo" > 专业组管理 </a-menu-item>
			<a-menu-item key="schoolClass" > 年级管理 </a-menu-item>
			<a-menu-item key="schoolSpecialized" > 专业管理 </a-menu-item>
			<a-menu-item key="classManage" > 班级管理 </a-menu-item>
			<a-menu-item key="teacherinfo" > 教师管理 </a-menu-item>
			<a-menu-item key="stuInfo" > 学生管理 </a-menu-item>
		</a-menu>
		<div class="count">
			<!-- 放入对应页面，根据 current 进行判断显示 -->
			<schoolInfo v-if="current == 'schoolInfo'"></schoolInfo>
			<schoollMsg v-if="current == 'schoollMsg'"></schoollMsg>
			<classManage v-if="current == 'classManage'"></classManage>
			<schoolSystem v-if="current == 'schoolSystem'"></schoolSystem>
			<semester v-if="current == 'semester'"></semester>
			<schoolSpecialized v-if="current == 'schoolSpecialized'"></schoolSpecialized>
			<zyzInfo v-if="current == 'zyzInfo'"></zyzInfo>
			<schoolFaculties v-if="current == 'schoolFaculties'"></schoolFaculties>
			<schoolClass v-if="current == 'schoolClass'"></schoolClass>
			<teacherinfo v-if="current == 'teacherinfo'" ></teacherinfo>
		</div>
	</div>
</template>

<script>
	import md5 from 'js-md5';
	import { axios } from '@/utils/request';
	// import stuInfo from '@/views/stuManage/xjManage/view/veBaseStudent/veBaseStudent'
	import stuInfo from './stuInfo/index.vue'
	import classManage from './classManage/index.vue'
	import schoollMsg from './schoollMsg/index.vue'
	import schoolInfo from './schoolInfo/index.vue'
	import zyzInfo from './zyz/index.vue'
	import schoolSystem from './schoolSystem/index.vue'
	import semester from './semester/index.vue'
	import schoolClass from './schoolClass/index.vue'
	import schoolFaculties from './schoolFaculties/index.vue'
	import schoolSpecialized from './schoolSpecialized/index.vue'
	import teacherinfo from './teacherinfo/index.vue'
	export default {
		components:{
			stuInfo,
			classManage,
			zyzInfo,
			schoollMsg,
			schoolInfo,
			schoolSystem,
			semester,
			schoolSpecialized,
			schoolFaculties,
			schoolClass,
			teacherinfo
		},
		data() {
			return {
				current:['schoolInfo']
			}
		},
		methods:{

		}
	}
</script>

<style lang="less" scoped>
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
	
	
	.date-style-Apply .ant-input {
		width: 300px;
	}
	
	.r-style {
		
	}
	
	.icon-img {
		margin-bottom: 5px;
		margin-right: 1px;
	}
	
	.info-tip {
		width: 94px;
		height: 19px;
		
		font-family: Microsoft YaHei;
		font-weight: 700;
		color: #666666;
		line-height: 24px;
	}
	
	.tip-star{
		color: #a83939;
		line-height: 24px;
		display:inline-block;
		vertical-align: middle;
	}
	.tableClean-button {
		width: 88px;
		height: 34px;
		margin-right: 0px;
		margin-left: 10px;
		background: #028BE2;
		border-radius: 5px;
		color:#fff;
		&:hover{
			background: #028BE2;
			color:#fff;
		}
	}
</style>
