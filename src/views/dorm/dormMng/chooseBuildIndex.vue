<template>
	<a-card :bordered="false">
			<a-menu v-model="current" mode="horizontal">
			    <a-menu-item key="chooseBuild"> 宿舍分配管理 </a-menu-item>
			    <a-menu-item key="dormInvoking" > 宿舍调换 </a-menu-item>
				<a-menu-item key="dormBedChange" > 学生床位更换 </a-menu-item>
				<a-menu-item key="dormDistributionQuery" > 宿舍分配查询 </a-menu-item>
			</a-menu>
		<div class="count">
			<!-- 放入对应页面，根据 current 进行判断显示 -->
			<chooseBuild v-if="current == 'chooseBuild'"></chooseBuild>
			<dormInvoking v-if="current == 'dormInvoking'"></dormInvoking>
			<dormDistributionQuery v-if="current == 'dormDistributionQuery'"></dormDistributionQuery>
			<dormBedChange v-if="current == 'dormBedChange'"></dormBedChange>
		</div>
		<!-- <div class="pageContentBox">
			<div class="content-content">
				<build-sub v-for="item in build" :key="item.key" :sextype="item.sex" :buildId="item.buildId"
					:residueBedNum="item.residueBedNum" :liveratio="item.liveratio" :allFloorNum="item.allFloorNum"
					:allRoomNum="item.allRoomNum" :allBedNum="item.allBedNum" :livePeopleNum="item.livePeopleNum" :url="item.url"
					@clickquery="clickquery(item.key, item.buildId)">
				</build-sub>
			</div>
		</div> -->
	</a-card>


</template>

<script>
	import {
		axios
	} from '@/utils/request';
	import BuildSub from '@/views/dorm/dormMng/buildSub.vue';
	import dormInvoking from '@/views/dorm/dormMng/dormInvoking'
	import dormBedChange from '@/views/dorm/dormMng/dormBedChange'
	import dormDistributionQuery from '@/views/dorm/dormMng/dormDistributionQuery'
	import chooseBuild from '@/views/dorm/dormMng/chooseBuild'

	export default {
		components:{
			dormInvoking,
			dormBedChange,
			dormDistributionQuery,
			chooseBuild
		},
		data() {
			return {
				build: [],
				dormName: '',
				dormSumlName: '',
				current:['chooseBuild']
			};
		},
		mounted() {
		},
		methods: {
			
		},
	};
</script>

<style scoped="scoped">
	.content-content {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		align-items: space;
		justify-content: flex-start;
	}

	.dorm-modify-top {
		width: 1000px;
		height: 80px;
		border: 0px;
		background-color: #E9EDF6;

	}

	.aottom {
		border-bottom: 3px solid #666;
	}

	.dorm-modify-item {
		width: 150px;
	}

	.dorm-modify-after {
		margin-left: 30px;
	}

	.link {
		font-family: "MicrosoftYaHei";
		font-size: 20px;
		text-align: center;
		font-weight: bold;
		color: #999999 !important;
	}

	.link-active {
		font-family: "MicrosoftYaHei";
		font-size: 20px;
		text-align: center;
		font-weight: bold;
		color: #666666 !important;
	}

	.long-table tr {
		font-size: 20px;
	}
</style>
